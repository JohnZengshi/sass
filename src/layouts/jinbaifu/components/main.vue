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
                            <dd v-for="(t, f) in item.classList" v-if="t.type == 1 && t.editable == 0">{{t.aliasName}}</dd>
                            <span></span>
                        </dl>
                        <li v-for="(t, f) in item.classList" v-if="t.type == 1 && t.editable == 1">
                            <input type="text" v-model="t.aliasName" placeholder="名称替换">
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
                        <li v-for="(t, f) in item.classList" v-if="t.type == 2">
                            <div class="input-wrap" :class="{disabled: t.editable==0}">
                                <input :disabled="t.editable==0" :class="{disabled: t.editable==0}" class="inp1" type="text" placeholder="输入..." v-model="t.aliasName">
                                <i class="iconfont icon-zhuanhuan"></i>
                                <input :disabled="t.editable==0" :class="{disabled: t.editable==0}" v-model="t.replacedValue" class="inp2" type="text">
                                <em class="iconfont icon-arrow-down" v-if="item.dataList"></em>
                                <ul class="drop-list" v-if="item.dataList">
                                    <li v-for="(lit, i) in item.dataList">{{lit.classesName}}</li>
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
                                    <li v-for="(lit, i) in item.dataList" @click="valueBack(lit, item)">{{lit.classesName}}</li>
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
            colorFlag: false,
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
            xzFlag: false,
            xzFlag1: false,
            ysFlag: false,
            ysFlag1: false,
            jdFlag: false,
            jdFlag1: false,
            qgFlag: false,
            qgFlag1: false,
            pgFlag: false,
            pgFlag1: false,
            dcFlag: false,
            dcFlag1: false,
            ygFlag: false,
            ygFlag1: false,
            feeFlag: false,
            qgList: [],
            ggList: [],
            xzList: [],
            ysList: [],
            jdList: [],
            pgList: [],
            dcList: [],
            ygList: [],

        }
    },
    props: ['ruleOptionDia'],
    watch: {
        ruleOptionDia (val) {
            if (val) {
                this.productClassList() // 宝石属性 
            }
        }
    },
    created () {
        this.productClassList() // 宝石属性 
    },
    methods: {
        isAllowChange (item, el) { // 输入框值得变化
            if (!item.isInput) {
                item.replaced = ''
                el.target.value = ''
                return
            }
        },
        productClassList () {
            seekProductClassList({type: 4}).then((res) => {
                if (res.data.state == 200) {
                    res.data.data.list.forEach((item, index) => {
                        if (item.classesName == '形状') {
                            this.xzList = item.childrenList
                        } else if (item.classesName == '颜色') {
                            this.ysList = item.childrenList
                        } else if (item.classesName == '净度') {
                            this.jdList = item.childrenList
                        } else if (item.classesName == '抛光') {
                            this.pgList = item.childrenList
                        } else if (item.classesName == '对称') {
                            this.dcList = item.childrenList
                        } else if (item.classesName == '荧光') {
                            this.ygList = item.childrenList
                        } else if (item.classesName == '切工') {
                            this.qgList = item.childrenList
                        } else if (item.classesName == '规格' || item.classesName == '宝石规格') {
                            this.ggList = item.childrenList
                        }
                    })
                    this.getImportSetting()
                } else {

                }
            }, (res) => {
            })
        },
        valueBack (val, item) {  // 下拉框数据回填
            if (val) {
                this.inputTarget.value = val.classesName
                item.replaced = val.classesName
                //this.addNameAct(2, item)
            }
            
        },
        getFlagType (name, type) {
            if (type == 1) {
                switch (name) {
                    case 'mainColor':
                        return this.colorFlag;
                    case 'mainName':
                        return this.barFlag;
                    case 'mainSpec':
                        return this.hanFlag;
                    case 'mainCount':
                        return this.pinFlag;
                    case 'mainWeight':
                        return this.kuanFlag;
                    case 'mainWeightUnit':
                        return this.scFlag;
                    case 'mainPrice':
                        return this.scdwFlag;
                    case 'mainMethod':
                        return this.beiFlag;
                    case 'shape':
                        return this.xzFlag;
                    case 'color':
                        return this.ysFlag;
                    case 'neatness':
                        return this.jdFlag;
                    case 'blackout':
                        return this.qgFlag;
                    case 'polishing':
                        return this.pgFlag;
                    case 'symmetry':
                        return this.dcFlag;
                    case 'fluorescent':
                        return this.ygFlag;
                    case 'mainTotalPrice':
                        return this.feeFlag;
                }
            } else {
                switch (name) {
                    case 'mainWeightUnit':
                        return this.scFlag1;
                    case 'mainMethod':
                        return this.beiFlag1;
                    case 'mainSpec':
                        return this.hanFlag1;
                    case 'shape':
                        return this.xzFlag1;
                    case 'color':
                        return this.ysFlag1;
                    case 'neatness':
                        return this.jdFlag1;
                    case 'blackout':
                        return this.qgFlag1;
                    case 'polishing':
                        return this.pgFlag1;
                    case 'symmetry':
                        return this.dcFlag1;
                    case 'fluorescent':
                        return this.ygFlag1;
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
                    case 'mainColor':
                        this.colorFlag = true
                        break;
                    case 'mainName':
                        this.barFlag = true
                        break;
                    case 'mainSpec':
                        this.hanFlag = true
                        break;
                    case 'mainCount':
                        this.pinFlag = true
                        break;
                    case 'mainWeight':
                        this.kuanFlag = true
                        break;
                    case 'mainWeightUnit':
                        this.scFlag = true
                        break;
                    case 'mainPrice':
                        this.scdwFlag = true
                        break;
                    case 'mainMethod':
                        this.beiFlag = true
                        break;
                    case 'shape':
                        this.xzFlag = true
                        break;
                    case 'color':
                        this.ysFlag = true
                        break;
                    case 'neatness':
                        this.jdFlag = true
                        break;
                    case 'blackout':
                        this.qgFlag = true
                        break;
                    case 'polishing':
                        this.pgFlag = true
                        break;
                    case 'symmetry':
                        this.dcFlag = true
                        break;
                    case 'fluorescent':
                        this.ygFlag = true
                        break;
                    case 'mainTotalPrice':
                        this.feeFlag = true
                        break;
                }
            } else {
                switch (name) {
                    case 'mainWeightUnit':
                        this.scFlag1 = true
                        break;
                    case 'mainMethod':
                        this.beiFlag1 = true
                        break;
                    case 'mainSpec':
                        this.hanFlag1 = true
                        break;
                    case 'shape':
                        this.xzFlag1 = true
                        break;
                    case 'color':
                        this.ysFlag1 = true
                        break;
                    case 'neatness':
                        this.jdFlag1 = true
                        break;
                    case 'blackout':
                        this.qgFlag1 = true
                        break;
                    case 'polishing':
                        this.pgFlag1 = true
                        break;
                    case 'symmetry':
                        this.dcFlag1 = true
                        break;
                    case 'fluorescent':
                        this.ygFlag1 = true
                        break;
                }
            }  
        },
        cancelNew (name, type) { // 取消新增
            if (type == 1) {
                switch (name) {
                    case 'mainColor':
                    		this.colorFlag = false
                        break;
                    case 'mainName':
                        this.barFlag = false
                        break;
                    case 'mainSpec':
                        this.hanFlag = false
                        break;
                    case 'mainCount':
                        this.pinFlag = false
                        break;
                    case 'mainWeight':
                        this.kuanFlag = false
                        break;
                    case 'mainWeightUnit':
                        this.scFlag = false
                        break;
                    case 'mainPrice':
                        this.scdwFlag = false
                        break;
                    case 'mainMethod':
                        this.beiFlag = false
                        break;
                    case 'shape':
                        this.xzFlag = false
                        break;
                    case 'color':
                        this.ysFlag = false
                        break;
                    case 'neatness':
                        this.jdFlag = false
                        break;
                    case 'blackout':
                        this.qgFlag = false
                        break;
                    case 'polishing':
                        this.pgFlag = false
                        break;
                    case 'symmetry':
                        this.dcFlag = false
                        break;
                    case 'fluorescent':
                        this.ygFlag = false
                        break;
                    case 'mainTotalPrice':
                        this.feeFlag = false
                        break;
                }
            } else {
                switch (name) {
                    case 'mainWeightUnit':
                        this.scFlag1 = false
                        break;
                    case 'mainMethod':
                        this.beiFlag1 = false
                        break;
                    case 'mainSpec':
                        this.hanFlag1 = false
                        break;
                    case 'shape':
                        this.xzFlag1 = false
                        break;
                    case 'color':
                        this.ysFlag1 = false
                        break;
                    case 'neatness':
                        this.jdFlag1 = false
                        break;
                    case 'blackout':
                        this.qgFlag1 = false
                        break;
                    case 'polishing':
                        this.pgFlag1 = false
                        break;
                    case 'symmetry':
                        this.dcFlag1 = false
                        break;
                    case 'fluorescent':
                        this.ygFlag1 = false
                        break;
                }
            } 
        },
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
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
            }, (res) => {

            })
        },
        delImportSetting (item) { // 删除数据
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
                if (item.coreName == 'mainWeightUnit') {
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
                } else if (item.coreName == 'mainMethod') {
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
                } else if (item.coreName == 'mainSpec') {
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
                } else if (item.coreName == 'shape') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.xzList
                    })
                } else if (item.coreName == 'color') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.ysList
                    })
                } else if (item.coreName == 'blackout') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.qgList
                    })
                } else if (item.coreName == 'polishing') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.pgList
                    })
                } else if (item.coreName == 'symmetry') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.dcList
                    })
                } else if (item.coreName == 'fluorescent') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.ygList
                    })
                } else if (item.coreName == 'neatness') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.jdList
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
        },
        getImportSetting () { // 获取当前类数据
            seekGetImportSetting().then((res) => {
                res.data.data.dataList.forEach((item, index) => {
                    if (item.name == '主石') {
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

