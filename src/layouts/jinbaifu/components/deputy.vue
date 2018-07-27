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
    seekProductPropertyList,
    seekProductClassList // 大小类列表
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
            goldContentList: [], // 含金量列表
            brandList: [], // 品牌列表
            mainUnit: [ // 主石单位
                {
                    classesName: 'g'
                },
                {
                    classesName: 'ct'
                }
            ],
            priceFun: [ // 计价方式
                {
                    classesName: '计重'
                },
                {
                    classesName: '计件'
                }
            ],
            ggList: [],
            barFlag: false,
            hanFlag: false,
            hanFlag1: false,
            pinFlag: false,
            kuanFlag: false,
            scFlag: false,
            scFlag1: false,
            scdwFlag: false,
            beiFlag: false,
            beiFlag1: false,
            feeFlag: false,
            // 输入框获取焦点时的值
            oldValue:null

        }
    },
    props: ['ruleOptionDia'],
    watch: {
        ruleOptionDia (val) {
            // console.log(val)
            if (val) {
                this.productClassList() // 含金量
            }
        }
    },
    created () {
        this.productClassList() // 含金量
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
        productClassList () {
            seekProductClassList({type: 4}).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    res.data.data.list.forEach((item, index) => {
                        if (item.classesName == '规格' || item.classesName == '宝石规格') {
                            this.ggList = item.childrenList
                            //console.log(this.ggList)
                        }
                    })
                    this.getImportSetting()
                } else {

                }
                //console.log(this.ggList)
            }, (res) => {
                console.log(res)
            })
        },
        valueBack (val, item) {  // 下拉框数据回填
        if (val) {
            this.inputTarget.value = val.classesName
            item.replaced = val.classesName
            //console.log(val)
            //console.log(item)
            //this.addNameAct(2, item)
        }
       // console.log(this.inputTarget)
            
        },
        getFlagType (name, type) {
            if (type == 1) {
                switch (name) {
                    case 'fusName':
                        return this.barFlag;
                    case 'fusSpec':
                        return this.hanFlag;
                    case 'fusCount':
                        return this.pinFlag;
                    case 'fusWeight':
                        return this.kuanFlag;
                    case 'fusWeightUnit':
                        return this.scFlag;
                    case 'fusPrice':
                        return this.scdwFlag;
                    case 'fusMethod':
                        return this.beiFlag;
                    case 'fusTotalPrice':
                        return this.feeFlag;
                }
            } else {
                switch (name) {
                    case 'fusWeightUnit':
                        return this.scFlag1;
                    case 'fusMethod':
                        return this.beiFlag1;
                    case 'fusSpec':
                        return this.hanFlag1;
                }
            }
            
        },
        inputFocus (el) {
            this.inputTarget = el.target
            //console.log(el)
            //console.log(el.target.offsetParent.children[4])
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
                    case 'fusName':
                        this.barFlag = true
                        break;
                    case 'fusSpec':
                        this.hanFlag = true
                        break;
                    case 'fusCount':
                        this.pinFlag = true
                        break;
                    case 'fusWeight':
                        this.kuanFlag = true
                        break;
                    case 'fusWeightUnit':
                        this.scFlag = true
                        break;
                    case 'fusPrice':
                        this.scdwFlag = true
                        break;
                    case 'fusMethod':
                        this.beiFlag = true
                        break;
                    case 'fusTotalPrice':
                        this.feeFlag = true
                        break;
                }
            } else {
                switch (name) {
                    case 'fusWeightUnit':
                        this.scFlag1 = true
                        break;
                    case 'fusMethod':
                        this.beiFlag1 = true
                        break;
                    case 'fusSpec':
                        this.hanFlag1 = true
                        break;
                }
            }  
        },
        cancelNew (name, type) { // 取消新增
            if (type == 1) {
                switch (name) {
                    case 'fusName':
                        this.barFlag = false
                        break;
                    case 'fusSpec':
                        this.hanFlag = false
                        break;
                    case 'fusCount':
                        this.pinFlag = false
                        break;
                    case 'fusWeight':
                        this.kuanFlag = false
                        break;
                    case 'fusWeightUnit':
                        this.scFlag = false
                        break;
                    case 'fusPrice':
                        this.scdwFlag = false
                        break;
                    case 'fusMethod':
                        this.beiFlag = false
                        break;
                    case 'fusTotalPrice':
                        this.feeFlag = false
                        break;
                }
            } else {
                switch (name) {
                    case 'fusWeightUnit':
                        this.scFlag1 = false
                        break;
                    case 'fusMethod':
                        this.beiFlag1 = false
                        break;
                    case 'fusSpec':
                        this.hanFlag1 = false
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
        productPropertyList (type) { // 品牌和含金量数据获取
            let options = {
                type: type
            }
            seekProductPropertyList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    if (type == 1) {
                        this.goldContentList = res.data.data.list
                    } else if (type == 2) {
                        this.brandList = res.data.data.list
                    }
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
                if (item.coreName == 'fusWeightUnit') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: false,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.mainUnit
                    })
                } else if (item.coreName == 'fusMethod') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: false,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.priceFun
                    })
                } else if (item.coreName == 'fusSpec') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.ggList
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
                    if (item.name == '副石') {
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
