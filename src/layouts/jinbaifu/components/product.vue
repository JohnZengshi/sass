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
    getProductTypeList,  // 商品类型列表
    seekProductClassList // 商品大小类列表
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
            conditionList: [], // 成色列表
            gemsNameList: [], // 宝石名称
            jewelryList: [], // 首饰
            gemsAttributeList: [], // 宝石属性
            productList: [
                {
                    classesName: '计重类'
                },
                {
                    classesName: '计件类'
                }
            ],
            proTypeList: [], // 产品类型列表
            barFlag: false,
            barFlag1: false,
            hanFlag: false,
            hanFlag1: false,
            pinFlag: false,
            pinFlag1: false,
            kuanFlag: false,
            kuanFlag1: false,
            scdwFlag: false,
            scdwFlag1: false,
            // 输入框获取焦点时的值
            oldValue:null
        }
    },
    props: ['ruleOptionDia'],
    watch: {
        ruleOptionDia (val) {
            // console.log(val)
            if (val) {
                this.productTypeList()
                this.productClassList(1) // 成色
                this.productClassList(2) // 宝石名称
                this.productClassList(3) // 首饰
                this.productClassList(4) // 宝石属性
            }
        }
    },
    created () {
        this.productTypeList()
        this.productClassList(1) // 成色
        this.productClassList(2) // 宝石名称
        this.productClassList(3) // 首饰
        this.productClassList(4) // 宝石属性
        //this.getImportSetting()
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
        productTypeList () { // 产品类型列表
            getProductTypeList({type: 1}).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    res.data.data.list.forEach((item, index) => {
                        item.typeList.forEach((item1, index1) => {
                            this.proTypeList.push(item1)
                        })
                    })
                }
            }, (res) => {
                console.log(res)
            })
        },
        productClassList (type) {
            if (type == 1) {
                this.conditionList = []
            } else if (type == 2) {
                this.gemsNameList = []
            } else if (type == 3) {
                this.jewelryList = []
            } else if (type == 4) {
                this.gemsAttributeList = []
            }
            let options = {
                type: type
            }
            seekProductClassList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    if (type == 1) {
                        res.data.data.list.forEach((item, index) => {
                            item.childrenList.forEach((f, i) => {
                                this.conditionList.push(f)
                            })
                        })
                    } else if (type == 2) {
                        res.data.data.list.forEach((item, index) => {
                            item.childrenList.forEach((f, i) => {
                                this.gemsNameList.push(f)
                            })
                        })
                    } else if (type == 3) {
                        res.data.data.list.forEach((item, index) => {
                            item.childrenList.forEach((f, i) => {
                                this.jewelryList.push(f)
                            })
                        })
                        //console.log(this.jewelryList)
                    } else if (type == 4) {
                        res.data.data.list.forEach((item, index) => {
                            item.childrenList.forEach((f, i) => {
                                this.gemsAttributeList.push(f)
                            })
                        })
                        this.getImportSetting()
                    }
                }
            }, (res) => {
                console.log(res)
            })
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
                    case 'productType':
                        return this.barFlag;
                    case 'subProductType':
                        return this.hanFlag;
                    case 'colorName':
                        return this.pinFlag;
                    case 'gemName':
                        return this.kuanFlag;
                    case 'jewelryName':
                        return this.scdwFlag;
                }
            } else {
                switch (name) {
                    case 'productType':
                        return this.barFlag1;
                    case 'subProductType':
                        return this.hanFlag1;
                    case 'colorName':
                        return this.pinFlag1;
                    case 'gemName':
                        return this.kuanFlag1;
                    case 'jewelryName':
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
                    case 'productType':
                        this.barFlag = true
                        break;
                    case 'subProductType':
                        this.hanFlag = true
                        break;
                    case 'colorName':
                        this.pinFlag = true
                        break;
                    case 'gemName':
                        this.kuanFlag = true
                        break;
                    case 'jewelryName':
                        this.scdwFlag = true
                        break;
                }
            } else {
                switch (name) {
                    case 'productType':
                        this.barFlag1 = true
                        break;
                    case 'subProductType':
                        this.hanFlag1 = true
                        break;
                    case 'colorName':
                        this.pinFlag1 = true
                        break;
                    case 'gemName':
                        this.kuanFlag1 = true
                        break;
                    case 'jewelryName':
                        this.scdwFlag1 = true
                        break;
                }
            }
            
        },
        cancelNew (name, type) { // 取消新增
            if (type == 1) {
                switch (name) {
                    case 'productType':
                        this.barFlag = false
                        break;
                    case 'subProductType':
                        this.hanFlag = false
                        break;
                    case 'colorName':
                        this.pinFlag = false
                        break;
                    case 'gemName':
                        this.kuanFlag = false
                        break;
                    case 'jewelryName':
                        this.scdwFlag = false
                        break;
                }
            } else {
                switch (name) {
                    case 'productType':
                        this.barFlag1 = false
                        break;
                    case 'subProductType':
                        this.hanFlag1 = false
                        break;
                    case 'colorName':
                        this.pinFlag1 = false
                        break;
                    case 'gemName':
                        this.kuanFlag1 = false
                        break;
                    case 'jewelryName':
                        this.scdwFlag1 = false
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

        dataTransfer () { // 瀑布流数据中转
            this.firstList = []
            this.secondList = []
            this.thirdList = []
            this.fourList = []
            this.fiveList = []
            let i = 0
            this.dataObj.nameList.forEach((item, index) => {
                i++
                if (item.coreName == 'productType') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        addName: '',
                        numName: '',
                        replaced: '',
                        isInput: true,
                        addFlag: false,
                        numFlag: false,
                        dataList: this.productList
                    })
                } else if (item.coreName == 'subProductType') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        addName: '',
                        numName: '',
                        replaced: '',
                        isInput: true,
                        addFlag: false,
                        numFlag: false,
                        dataList: this.proTypeList
                    })
                } else if (item.coreName == 'colorName') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        addName: '',
                        numName: '',
                        isInput: false,
                        numFlag: false,
                        replaced: '',
                        dataList: this.conditionList,
                        addFlag: false,
                    })
                } else if (item.coreName == 'gemName') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        addName: '',
                        numName: '',
                        isInput: false,
                        numFlag: false,
                        replaced: '',
                        dataList: this.gemsNameList,
                        addFlag: false,
                    })
                } else if (item.coreName == 'jewelryName') {
                    Object.assign(item, {
                        isNumTrans: 'Y',
                        addName: '',
                        numName: '',
                        isInput: false,
                        numFlag: false,
                        dataList: this.jewelryList,
                        replaced: '',
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
        },
        getImportSetting () { // 获取当前类数据
            seekGetImportSetting().then((res) => {
                console.log(res)
                res.data.data.dataList.forEach((item, index) => {
                    //console.log(item)
                    if (item.name == '产品类型') {
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

