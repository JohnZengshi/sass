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

            // 单据的
            djFlag: false,
            ztFlag: false,
            cpFlag: false,
            jsFlag: false,
            bsFlag: false,
            ssFlag: false,
            jjFlag: false,
            jzFlag: false,
            bjFlag: false,
            sjFlag: false,
            zkFlag: false,
            cbFlag: false,

            gfFlag:false,
            tradeManFlag:false,
            createTimeFlag:false,
            cashTimeFlag:false,
            cashierFlag:false,
            memberNumFlag:false,
            memberNameFlag:false,
            memberPhoneFlag:false,
            memberSexFlag:false,
            supplierFlag:false,
            certifiNoFlag:false,
            sectionNumFlag:false,
            fusWeightFlag:false,
            neatnessFlag:false,
            colorFlag:false,
            orderRemarkFlag:false,
            mainWeightFlag:false,
            payWeixinFlag:false,
            payAlipayFlag:false,
            payUnionpayFlag:false,
            payOtherFlag:false,
            payCashFlag:false,

            // 会员
            principalNameFlag:false,
            gradeFlag:false,
            birthdayFlag:false,
            memberEmailFlag:false,
            weixinhaoFlag:false,
            professionFlag:false,
            addressFlag:false,
            labelFlag:false,
            openTimeFlag:false,
            score: false,
            // 输入框获取焦点时的值
            oldValue:null
        }
    },
    props: ['ruleOptionDia','importType'],
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
            console.log(name)
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

                    case 'orderNum':
                        return this.djFlag;
                    case 'sellStatus':
                        return this.ztFlag;
                    case 'subProductType':
                        return this.cpFlag;
                    case 'colorName':
                        return this.jsFlag;
                    case 'gemName':
                        return this.bsFlag;
                    case 'jewelryName':
                        return this.ssFlag;
                    case 'goldPrice':
                        return this.jjFlag;
                    case 'totalWeight':
                        return this.jzFlag;
                    case 'soldPrice':
                        return this.bjFlag;
                    case 'price':
                        return this.sjFlag;
                    case 'discount':
                        return this.zkFlag;
                    case 'cost':
                        return this.cbFlag;
                    case 'soldFee':
                        return this.gfFlag;
                    case 'tradeMan':
                        return this.tradeManFlag;
                    case 'createTime':
                        return this.createTimeFlag;
                    case 'cashTime':
                        return this.cashTimeFlag;
                    case 'cashier':
                        return this.cashierFlag;
                    case 'memberNum':
                        return this.memberNumFlag;
                    case 'memberName':
                        return this.memberNameFlag;
                    case 'memberPhone':
                        return this.memberPhoneFlag;
                    case 'memberSex':
                        return this.memberSexFlag;
                    case 'supplier':
                        return this.supplierFlag;
                    case 'certifiNo':
                        return this.certifiNoFlag;
                    case 'sectionNum':
                        return this.sectionNumFlag;
                    case 'fusWeight':
                        return this.fusWeightFlag;
                    case 'neatness':
                        return this.neatnessFlag;
                    case 'color':
                        return this.colorFlag;
                    case 'orderRemark':
                        return this.orderRemarkFlag;
                    case 'mainWeight':
                        return this.mainWeightFlag;
                    case 'payWeixin':
                        return this.payWeixinFlag;
                    case 'payAlipay':
                        return this.payAlipayFlag;
                    case 'payUnionpay':
                        return this.payUnionpayFlag;
                    case 'payOther':
                        return this.payOtherFlag;
                    case 'payCash':
                        return this.payCashFlag;
                    case 'principalName':
                        return this.principalNameFlag;
                    case 'grade':
                        return this.gradeFlag;
                    case 'birthday':
                        return this.birthdayFlag;
                    case 'memberEmail':
                        return this.memberEmailFlag;
                    case 'weixinhao':
                        return this.weixinhaoFlag;
                    case 'profession':
                        return this.professionFlag;
                    case 'address':
                        return this.addressFlag;
                    case 'label':
                        return this.labelFlag;
                    case 'openTime':
                        return this.openTimeFlag;
                    case 'score':
                        return this.score;
                    
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
            debugger
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

                    case 'orderNum':
                        this.djFlag= true
                        break;
                    case 'sellStatus':
                        this.ztFlag= true
                        break;
                    case 'subProductType':
                        this.cpFlag= true
                        break;
                    case 'colorName':
                        this.jsFlag= true
                        break;
                    case 'gemName':
                        this.bsFlag= true
                        break;
                    case 'jewelryName':
                        this.ssFlag= true
                        break;
                    case 'goldPrice':
                        this.jjFlag= true
                        break;
                    case 'totalWeight':
                        this.jzFlag= true
                        break;
                    case 'soldPrice':
                        this.bjFlag= true
                        break;
                    case 'price':
                        this.sjFlag= true
                        break;
                    case 'discount':
                        this.zkFlag= true
                        break;
                    case 'cost':
                        this.cbFlag= true
                        break;
                    case 'soldFee':
                        this.gfFlag= true
                        break;
                    case 'tradeMan':
                        this.tradeManFlag= true
                        break;
                    case 'createTime':
                        this.createTimeFlag= true
                        break;
                    case 'cashTime':
                        this.cashTimeFlag= true
                        break;
                    case 'cashier':
                        this.cashierFlag= true
                        break;
                    case 'memberNum':
                        this.memberNumFlag= true
                        break;
                    case 'memberName':
                        this.memberNameFlag= true
                        break;
                    case 'memberPhone':
                        this.memberPhoneFlag= true
                        break;
                    case 'memberSex':
                        this.memberSexFlag= true
                        break;
                    case 'supplier':
                        this.supplierFlag= true
                        break;
                    case 'certifiNo':
                        this.certifiNoFlag= true
                        break;
                    case 'sectionNum':
                        this.sectionNumFlag= true
                        break;
                    case 'fusWeight':
                        this.fusWeightFlag= true
                        break;
                    case 'neatness':
                        this.neatnessFlag= true
                        break;
                    case 'color':
                        this.colorFlag= true
                        break;
                    case 'orderRemark':
                        this.orderRemarkFlag= true
                        break;
                    case 'mainWeight':
                        this.mainWeightFlag= true
                        break;
                    case 'payWeixin':
                        this.payWeixinFlag= true
                        break;
                    case 'payAlipay':
                        this.payAlipayFlag= true
                        break;
                    case 'payUnionpay':
                        this.payUnionpayFlag= true
                        break;
                    case 'payOther':
                        this.payOtherFlag= true
                        break;
                    case 'payCash':
                        this.payCashFlag= true
                        break;
                    case 'principalName':
                        this.principalNameFlag= true
                        break;
                    case 'grade':
                        this.gradeFlag= true
                        break;
                    case 'birthday':
                        this.birthdayFlag= true
                        break;
                    case 'memberEmail':
                        this.memberEmailFlag= true
                        break;
                    case 'weixinhao':
                        this.weixinhaoFlag= true
                        break;
                    case 'profession':
                        this.professionFlag= true
                        break;
                    case 'address':
                        this.addressFlag= true
                        break;
                    case 'label':
                        this.labelFlag= true
                        break;
                    case 'openTime':
                        this.openTimeFlag= true
                        break;
                    case 'score':
                        this.score = true
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

                    case 'orderNum':
                        this.djFlag= false
                        break;
                    case 'sellStatus':
                        this.ztFlag= false
                        break;
                    case 'subProductType':
                        this.cpFlag= false
                        break;
                    case 'colorName':
                        this.jsFlag= false
                        break;
                    case 'gemName':
                        this.bsFlag= false
                        break;
                    case 'jewelryName':
                        this.ssFlag= false
                        break;
                    case 'goldPrice':
                        this.jjFlag= false
                        break;
                    case 'totalWeight':
                        this.jzFlag= false
                        break;
                    case 'soldPrice':
                        this.bjFlag= false
                        break;
                    case 'soldPrice':
                        this.sjFlag= false
                        break;
                    case 'discount':
                        this.zkFlag= false
                        break;
                    case 'cost':
                        this.cbFlag= false
                        break;
                    case 'soldFee':
                        this.gfFlag= false
                        break;
                    case 'tradeMan':
                        this.tradeManFlag= false
                        break;
                    case 'tradeMan':
                        this.createTimeFlag= false
                        break;
                    case 'cashTime':
                        this.cashTimeFlag= false
                        break;
                    case 'cashier':
                        this.cashierFlag= false
                        break;
                    case 'memberNum':
                        this.memberNumFlag= false
                        break;
                    case 'memberName':
                        this.memberNameFlag= false
                        break;
                    case 'memberPhone':
                        this.memberPhoneFlag= false
                        break;
                    case 'memberSex':
                        this.memberSexFlag= false
                        break;
                    case 'supplier':
                        this.supplierFlag= false
                        break;
                    case 'certifiNo':
                        this.certifiNoFlag= false
                        break;
                    case 'sectionNum':
                        this.sectionNumFlag= false
                        break;
                    case 'fusWeight':
                        this.fusWeightFlag= false
                        break;
                    case 'neatness':
                        this.neatnessFlag= false
                        break;
                    case 'color':
                        this.colorFlag= false
                        break;
                    case 'orderRemark':
                        this.orderRemarkFlag= false
                        break;
                    case 'mainWeight':
                        this.mainWeightFlag= false
                        break;
                    case 'payWeixin':
                        this.payWeixinFlag= false
                        break;
                    case 'payAlipay':
                        this.payAlipayFlag= false
                        break;
                    case 'payUnionpay':
                        this.payUnionpayFlag= false
                        break;
                    case 'payOther':
                        this.payOtherFlag= false
                        break;
                    case 'payCash':
                        this.payCashFlag= false
                        break;
                    case 'principalName':
                        this.principalNameFlag= false
                        break;
                    case 'grade':
                        this.gradeFlag= false
                        break;
                    case 'birthday':
                        this.birthdayFlag= false
                        break;
                    case 'memberEmail':
                        this.memberEmailFlag= false
                        break;
                    case 'weixinhao':
                        this.weixinhaoFlag= false
                        break;
                    case 'profession':
                        this.professionFlag= false
                        break;
                    case 'address':
                        this.addressFlag= false
                        break;
                    case 'label':
                        this.labelFlag= false
                        break;
                    case 'openTime':
                        this.openTimeFlag= false
                        break;
                    case 'score':
                        this.score = false
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
                replacedValue: item.replaced,
                importType:this.importType
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
                } else if(item.coreName == 'brandName'){

                } else {
                    Object.assign(item, {
                        isNumTrans: 'N',
                        addName: '',
                        addFlag: false,
                    })
                } 

                console.log(item)
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
            let options = {
                importType: this.importType
            }
            seekGetImportSetting(options).then((res) => {
                console.log(res)
                res.data.data.dataList.forEach((item, index) => {
                    //console.log(item)
                    if (item.name == '基本信息') {
                        this.dataObj = item
                        this.dataTransfer()
                    }
                    if(item.name == '单据') {
                        this.dataObj = item
                        this.dataTransfer()
                    }
                    if(item.name == '会员') {
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
