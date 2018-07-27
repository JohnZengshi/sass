<template>
    <div class="main-wrap">
        <div class="data-list-1 data-list" v-for="(itemAll, indexAll) in [firstList, secondList, thirdList, fourList, fiveList]" :key="indexAll" :style="indexAll == 4 ? 'margin-right: 0;' : ''">
            <!-- <div  v-for="(itemAll, indexAll) in [firstList, secondList, thirdList, fourList, fiveList]" > -->
                <div class="item" v-for="(item, index) in itemAll" :key="index">
                    <div class="item-title">
                        <i></i>
                        {{item.className}}
                    </div>
                    <!--       **************************** 可识别列名 ***************************************                 -->
                    <div class="Recognizable-title">
                        可识别列名
                        <i class="iconfont icon-jia" @click="showNew(item.coreName, 1)"></i>
                    </div>

                    <ul class="Recognizable-list">
                        <dl>
                            <dd v-for="(t, f) in item.classList" v-if="t.type == 1 && t.editable == 0" :key="f">{{t.aliasName}}</dd>
                            <span></span>
                        </dl>
                        <li v-for="(t, f) in item.classList" v-if="t.type == 1 && t.editable == 1" :key="f">
                            <input type="text" v-model="t.aliasName" placeholder="名称替换" @focus="oldValue = t.aliasName" @blur="amendNameAct(t)">
                            <i class="iconfont icon-jian" @click="delImportSetting(t)"></i>
                        </li>
                        <li class="add-input" v-if="getFlagType(item.coreName, 1)">
                            <input type="text" v-model="item.addName" placeholder="名称替换" @blur="addNameAct(1, item)">
                            <i class="iconfont icon-jian" @click="cancelNew(item.coreName, 1)"></i>
                        </li>
                    </ul>
                    <!--       **************************** 数值转换 ***************************************                 -->
                    <div class="numerical-title" v-if="item.isNumTrans == 'Y'">
                        数值转换
                        <i class="iconfont icon-jia" @click="showNew(item.coreName, 2)"></i>
                    </div>

                    <ul class="numerical-list" v-if="item.isNumTrans == 'Y'">
                        <li v-for="(t, f) in item.classList" v-if="t.type == 2" :key="f">
                            <div class="input-wrap" :class="{disabled: t.editable==0}">
                                <input :disabled="t.editable==0" :class="{disabled: t.editable==0}" class="inp1" type="text" placeholder="输入..." v-model="t.aliasName">
                                <i class="iconfont icon-zhuanhuan"></i>
                                <input :disabled="t.editable==0" :class="{disabled: t.editable==0}" v-model="t.replacedValue" class="inp2" type="text">
                                <em class="iconfont icon-arrow-down" v-if="item.dataList"></em>
                                <ul class="drop-list" v-if="item.dataList">
                                    <li v-for="(lit, i) in item.dataList" :key="i">{{lit.classesName}}</li>
                                </ul>
                            </div>
                            <i class="iconfont icon-jian" @click="delImportSetting(t)"></i>
                        </li>

                        <li v-if="getFlagType(item.coreName, 2)">
                            <div class="input-wrap">
                                <input class="inp1" type="text" placeholder="输入..." v-model="item.numName">
                                <i class="iconfont icon-zhuanhuan"></i>
                                <input class="inp2" :placeholder="item.className" type="text" @focus="inputFocus($event)" v-model="item.replaced" @keyup="isAllowChange(item, $event)" @blur="inputBlur($event, 2, item)">
                                <em class="iconfont icon-arrow-down" v-if="item.dataList"></em>
                                <ul class="drop-list" v-if="item.dataList">
                                    <li v-for="(lit, i) in item.dataList" @click="valueBack(lit, item)" :key="i">{{lit.classesName}}</li>
                                </ul>
                            </div>
                            <i class="iconfont icon-jian" @click="cancelNew(item.coreName, 2)"></i>
                        </li>
                    </ul>

                    <div class="item-footer">
                        <div class="footer-title"><i class="iconfont icon-qc-required"></i>约束条件</div>
                        <p>{{item.remark}}</p>
                    </div>

                </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import {
    seekGetImportSetting,
    seekAddImportSetting,
    seekAmendImportSetting,
    seekDelImportSetting,
    seekShowhCertificateList
    } from "Api/commonality/seek"
export default {

    data () {
        return {
            dataObj: {},
            firstList: [],
            secondList: [],
            thirdList: [],
            inputTarget: '', // 输入框的目标节点
            fourList: [],
            fiveList: [],
            numValue: '', // 数值
            addName: false, // 添加替换名
            certificatetList: [], // 含金量列表
            brandList: [], // 品牌列表
            barFlag: false,
            hanFlag: false,
            pinFlag: false,
            pinFlag1: false,
            kuanFlag: false,
            scFlag: false,
            scdwFlag: false,
            beiFlag: false,
            beiFlag1: false,
            beiFlag2: false,
            beiFlag3: false,
            feeFlag: false

        }
    },
    props: ['ruleOptionDia'],
    watch: {
        ruleOptionDia (val) {
            // console.log(val)
            if (val) {
                this.showhCertificateList() // 含金量
                this.getImportSetting()  
            }
        }
    },
    created () {
        this.showhCertificateList() // 含金量
        this.getImportSetting()  
    },
    methods: {
        isAllowChange (item, el) { // 输入框值得变化
            console.log(item)
            if (!item.isInput) {
                console.log(111)
                item.replaced = ''
                el.target.value = ''
                return
            }
        },
        valueBack (val, item) {  // 下拉框数据回填
        if (val) {
            this.inputTarget.value = val.certificateName
            item.replaced = val.certificateName
            //console.log(val)
            //console.log(item)
            //this.addNameAct(2, item)
        }
       // console.log(this.inputTarget)
            
        },
        getFlagType (name, type) {
            if (type == 1) {
                switch (name) {
                    case 'certifiNo':
                        return this.barFlag;
                    case 'certifiAuthNo':
                        return this.hanFlag;
                    case 'certifiName':
                        return this.pinFlag;
                    case 'orgName':
                        return this.kuanFlag;
                    case 'website':
                        return this.scFlag;
                    case 'phone':
                        return this.scdwFlag;
                    case 'stand1':
                        return this.beiFlag;
                    case 'stand2':
                        return this.beiFlag1;
                    case 'stand3':
                        return this.beiFlag2;
                    case 'certifiFee':
                        return this.feeFlag;
                }
            } else {
                switch (name) {
                    case 'certifiName':
                        return this.pinFlag1;
                }
            }
            
        },
        inputFocus (el) {
            this.inputTarget = el.target    
            if (el.target.offsetParent.children[4]) {
                el.target.offsetParent.children[4].className = 'drop-list active'
            }
        },
        inputBlur (el, type, item) {
            let time = setTimeout(() => {
                if (el.target.offsetParent.children[4]) {
                    el.target.offsetParent.children[4].className = 'drop-list'
                }
                if (item.replaced == '' && item.numName == '') {

                } else {
                    this.addNameAct(type, item)
                } 
            }, 500)
            //el.target.offsetParent.children[4].className = 'drop-list'
        },
        showNew (name, type) {
            if (type == 1) {
                switch (name) {
                    case 'certifiNo':
                        this.barFlag = true
                        break;
                    case 'certifiAuthNo':
                        this.hanFlag = true
                        break;
                    case 'certifiName':
                        this.pinFlag = true
                        break;
                    case 'orgName':
                        this.kuanFlag = true
                        break;
                    case 'website':
                        this.scFlag = true
                        break;
                    case 'phone':
                        this.scdwFlag = true
                        break;
                    case 'stand1':
                        this.beiFlag = true
                        break;
                    case 'stand2':
                        this.beiFlag1 = true
                        break;
                    case 'stand3':
                        this.beiFlag2 = true
                        break;
                    case 'certifiFee':
                        this.feeFlag = true
                        break;
                }
            } else {
                switch (name) {
                    case 'certifiName':
                        this.pinFlag1 = true
                        break;
                }
            }
            
        },
        cancelNew (name, type) { // 取消新增
            if (type == 1) {
                switch (name) {
                    case 'certifiNo':
                        this.barFlag = false
                        break;
                    case 'certifiAuthNo':
                        this.hanFlag = false
                        break;
                    case 'certifiName':
                        this.pinFlag = false
                        break;
                    case 'orgName':
                        this.kuanFlag = false
                        break;
                    case 'website':
                        this.scFlag = false
                        break;
                    case 'phone':
                        this.scdwFlag = false
                        break;
                    case 'stand1':
                        this.beiFlag = false
                        break;
                    case 'stand2':
                        this.beiFlag1 = false
                        break;
                    case 'stand3':
                        this.beiFlag2 = false
                        break;
                    case 'certifiFee':
                        this.feeFlag = false
                        break;
                }
            } else {
                switch (name) {
                    case 'certifiName':
                        this.pinFlag1 = false
                        break;
                }
            }
        },
        // 新增数据
        addNameAct (type, item) {
            if (!item.addName) {
                return
            }
            let options = {
                workId: item.id,
                type: type,
                aliasName: item.addName,
                newValue: item.numName,
                replacedValue: item.replaced
            }
            seekAddImportSetting(options).then((res) => {
                if (res.data.state == 200) {
                    this.initData()
                    this.getImportSetting()
                    this.$message({
                        message: "新增成功",
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
            }, (res) => {

            })
        },
        // 修改数据（新增）
        amendNameAct (item){
            if (!item.aliasName || this.oldValue == item.aliasName) {
                return
            }
            let options = {
                workId: item.id,
                newValue: item.aliasName,
            }
            seekAmendImportSetting(options).then((res)=>{
                if (res.data.state == 200) {
                    this.initData()
                    this.getImportSetting()
                    this.$message({
                        message: "修改成功",
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
            })
        },
        initData () {
            this.barFlag = false
            this.hanFlag = false
            this.hanFlag1 = false
            this.pinFlag = false
            this.pinFlag1 = false
            this.kuanFlag = false
            this.scFlag = false
            this.scdwFlag = false
            this.scdwFlag1 = false
            this.beiFlag = false

            this.djFlag=false
            this.ztFlag=false
            this.cpFlag=false
            this.jsFlag=false
            this.bsFlag=false
            this.ssFlag=false
            this.jjFlag=false
            this.jzFlag=false
            this.bjFlag=false
            this.sjFlag=false
            this.zkFlag=false
            this.cbFlag=false

            this.gfFlag=false
            this.tradeManFlag=false
            this.createTimeFlag=false
            this.cashTimeFlag=false
            this.cashierFlag=false
            this.memberNumFlag=false
            this.memberNameFlag=false
            this.memberPhoneFlag=false
            this.memberSexFlag=false
            this.supplierFlag=false
            this.certifiNoFlag=false
            this.sectionNumFlag=false
            this.fusWeightFlag=false
            this.neatnessFlag=false
            this.colorFlag=false
            this.orderRemarkFlag=false
            this.mainWeightFlag=false
            this.payWeixinFlag=false
            this.payAlipayFlag=false
            this.payUnionpayFlag=false
            this.payOtherFlag=false
            this.payCashFlag=false
        },
        delImportSetting (item) { // 删除数据
            //console.log(item)
            let options = {
                workId: item.id
            }
            seekDelImportSetting(options).then((res) => {
                if (res.data.state == 200) {
                    this.getImportSetting()
                }
            }, (res) => {

            })
        },
        showhCertificateList (type) { // 证书
            seekShowhCertificateList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    let arrList = res.data.data.list
                    arrList.forEach((item, index) => {
                        Object.assign(item, {
                            classesName: item.certificateName
                        })
                    })
                    this.certificatetList = arrList
                    console.log(this.certificatetList)
                }
            }, (res) => {

            })
        },
        dataTransfer () { // 瀑布流数据中转
            this.firstList = []
            this.secondList = []
            this.thirdList = []
            this.fourList = []
            this.fiveList = []
            let i = 0
            this.dataObj.nameList.forEach((item, index) => {
                i++
                if (item.coreName == 'certifiName') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: true,
                        dataList: this.certificatetList
                    })
                } else {
                    Object.assign(item, {
                        isNumTrans: 'N',
                        isInput: false,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                    })
                }
                // console.log(item)
                if (i==1) {
                    this.firstList.push(item)
                } else if (i==2) {
                    this.secondList.push(item)
                    
                } else if (i==3) {
                    this.thirdList.push(item)
                } else if (i==4) {
                    this.fourList.push(item)
                } else if (i==5) {
                    this.fiveList.push(item)
                    i = 0
                }
                
            })
            // console.log(this.firstList)
            // console.log(this.secondList)
            // console.log(this.thirdList)
            // console.log(this.fourList)
            // console.log(this.fiveList)
        },
        getImportSetting () { // 获取当前类数据
            seekGetImportSetting().then((res) => {
                console.log(res)
                res.data.data.dataList.forEach((item, index) => {
                    //console.log(item)
                    if (item.name == '证书') {
                        this.dataObj = item
                        this.dataTransfer()
                    }
                })
            }, (res) => {

            })
        }
    }
}
</script>

<style lang="scss" scoped src="./comCss.scss">
</style>
