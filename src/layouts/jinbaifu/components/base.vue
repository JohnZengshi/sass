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
    seekProductPropertyList
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
            handInchList: [
                {
                    classesName: '#'
                },
                {
                    classesName: '寸'
                },
                {
                    classesName: 'cm'
                },
            ],
            brandList: [], // 品牌列表
            barFlag: false,
            hanFlag: false,
            hanFlag1: false,
            pinFlag: false,
            pinFlag1: false,
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
                this.productPropertyList(1) // 含金量
                this.productPropertyList(2) // 品牌
                this.getImportSetting()
            }
        }
    },
    created () {
        this.productPropertyList(1) // 含金量
        this.productPropertyList(2) // 品牌
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
            //console.log(val)
            //console.log(item)
            //this.addNameAct(2, item)
        }
       // console.log(this.inputTarget)
            
        },
        getFlagType (name, type) {
            if (type == 1) {
                switch (name) {
                    case 'barcode':
                        return this.barFlag;
                    case 'goldContent':
                        return this.hanFlag;
                    case 'brandName':
                        return this.pinFlag;
                    case 'modelNo':
                        return this.kuanFlag;
                    case 'handInch':
                        return this.scFlag;
                    case 'handInchUnit':
                        return this.scdwFlag;
                    case 'remark':
                        return this.beiFlag;
                }
            } else {
                switch (name) {
                    case 'goldContent':
                        return this.hanFlag1;
                    case 'brandName':
                        return this.pinFlag1;
                    case 'handInchUnit':
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
            console.log(item)
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
                    case 'barcode':
                        this.barFlag = true
                        break;
                    case 'goldContent':
                        this.hanFlag = true
                        break;
                    case 'brandName':
                        this.pinFlag = true
                        break;
                    case 'modelNo':
                        this.kuanFlag = true
                        break;
                    case 'handInch':
                        this.scFlag = true
                        break;
                    case 'handInchUnit':
                        this.scdwFlag = true
                        break;
                    case 'remark':
                        this.beiFlag = true
                        break;
                }
            } else {
                switch (name) {
                    case 'goldContent':
                        this.hanFlag1 = true
                        break;
                    case 'brandName':
                        this.pinFlag1 = true
                        break;
                    case 'handInchUnit':
                        this.scdwFlag1 = true
                        break;
                }
            }
            
        },
        cancelNew (name, type) { // 取消新增
            if (type == 1) {
                switch (name) {
                    case 'barcode':
                        this.barFlag = false
                        break;
                    case 'goldContent':
                        this.hanFlag = false
                        break;
                    case 'brandName':
                        this.pinFlag = false
                        break;
                    case 'modelNo':
                        this.kuanFlag = false
                        break;
                    case 'handInch':
                        this.scFlag = false
                        break;
                    case 'handInchUnit':
                        this.scdwFlag = false
                        break;
                    case 'remark':
                        this.beiFlag = false
                        break;
                }
            } else {
                switch (name) {
                    case 'goldContent':
                        this.hanFlag1 = false
                        break;
                    case 'brandName':
                        this.pinFlag1 = false
                        break;
                    case 'handInchUnit':
                        this.scdwFlag1 = false
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
                    this.initData()
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
        },
        // addNameAct1 (type, t, item) {
        //     console.log(item)
        //     let options = {
        //         workId: item.id,
        //         type: type,
        //         aliasName: t.aliasName,
        //     }
        //     seekAddImportSetting(options).then((res) => {
        //         if (res.data.state == 200) {
        //             this.getImportSetting()
        //         } else {
        //             this.$message({
        //                 message: res.data.msg,
        //                 type: 'warning'
        //             });
        //         }
        //     }, (res) => {

        //     })
        // },
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
                if (item.coreName == 'goldContent') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        itemName: '金含量',
                        isInput: true,
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.goldContentList
                    })
                } else if (item.coreName == 'brandName') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: true,
                        itemName: '品牌',
                        addName: '',
                        numName: '',
                        replaced: '',
                        addFlag: false,
                        numFlag: false,
                        dataList: this.brandList
                    })
                } else if (item.coreName == 'handInchUnit') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        isInput: false,
                        itemName: '手寸单位',
                        addName: '',
                        numName: '',
                        numFlag: false,
                        replaced: '',
                        addFlag: false,
                        dataList: this.handInchList
                    })
                }else {
                    Object.assign(item, {
                        isNumTrans: 'N',
                        addName: '',
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
                    if (item.name == '基本信息') {
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
