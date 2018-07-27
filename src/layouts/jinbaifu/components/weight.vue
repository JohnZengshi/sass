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
    seekProductPropertyList
    } from "Api/commonality/seek"
export default {
    data () {
        return {
            dataObj: {},
            firstList: [],
            secondList: [],
            thirdList: [],
            fourList: [],
            fiveList: [],
            inputTarget: '', // 输入框的目标节点
            numValue: '', // 数值
            addName: false, // 添加替换名
            goldColorList: [], // 含金量列表
            barFlag: false,
            hanFlag: false,
            pinFlag: false,
            kuanFlag: false,
            scFlag: false,
            scdwFlag: false,
            scdwFlag1: false,
            beiFlag: false,

        }
    },
    props: ['ruleOptionDia'],
    watch: {
        ruleOptionDia (val) {
            // console.log(val)
            if (val) {
                this.productPropertyList(3) // 金属颜色
                this.getImportSetting()  
            }
        }
    },
    created () {
        this.productPropertyList(3) // 金属颜色
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
                this.inputTarget.value = val.classesName
                item.replaced = val.classesName
            }
        // console.log(this.inputTarget)
        },
        getFlagType (name, type) {
            if (type == 1) {
                switch (name) {
                    case 'totalWeight':
                        return this.barFlag;
                    case 'netWeight':
                        return this.hanFlag;
                    case 'heavyCode':
                        return this.pinFlag;
                    case 'goldCost':
                        return this.kuanFlag;
                    case 'goldPrice':
                        return this.scFlag;
                    case 'goldColor':
                        return this.scdwFlag;
                    case 'goldE':
                        return this.beiFlag;
                }
            } else {
                switch (name) {
                    case 'goldColor':
                        return this.scdwFlag1;
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
        },
        showNew (name, type) {
            if (type == 1) {
                switch (name) {
                    case 'totalWeight':
                        this.barFlag = true
                        break;
                    case 'netWeight':
                        this.hanFlag = true
                        break;
                    case 'heavyCode':
                        this.pinFlag = true
                        break;
                    case 'goldCost':
                        this.kuanFlag = true
                        break;
                    case 'goldPrice':
                        this.scFlag = true
                        break;
                    case 'goldColor':
                        this.scdwFlag = true
                        break;
                    case 'goldE':
                        this.beiFlag = true
                        break;
                }
            } else {
                switch (name) {
                    case 'goldColor':
                        this.scdwFlag1 = true;
                        break;
                }
            }
            
        },
        cancelNew (name, type) { // 取消新增
            if (type == 1) {
                switch (name) {
                    case 'totalWeight':
                        this.barFlag = false
                        break;
                    case 'netWeight':
                        this.hanFlag = false
                        break;
                    case 'heavyCode':
                        this.pinFlag = false
                        break;
                    case 'goldCost':
                        this.kuanFlag = false
                        break;
                    case 'goldPrice':
                        this.scFlag = false
                        break;
                    case 'goldColor':
                        this.scdwFlag = false
                        break;
                    case 'goldE':
                        this.beiFlag = false
                        break;
                }
            } else {
                switch (name) {
                    case 'goldColor':
                        this.scdwFlag1 = false;
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
            console.log(item)
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
                    if (type == 3) {
                        this.goldColorList = res.data.data.list
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
                if (item.coreName == 'goldColor') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        numFlag: false,
                        replaced: '',
                        addFlag: false,
                        dataList: this.goldColorList
                    })
                } else {
                    Object.assign(item, {
                        isNumTrans: 'N',
                        addName: '',
                        isInput: false,
                        addFlag: false,
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
                    if (item.name == '重量') {
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
