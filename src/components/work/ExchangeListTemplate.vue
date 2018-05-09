<template>
    <!-- 退换 -->
    <div v-if="delShow" class="receipts-list" :class="{ active: !isInput }" @click="focusPopup">
    <!-- <p style="font-size:12px">{{showList}}</p> -->
        <div class="receipts-list-body-top">
            <div class="options-left">
                <p class="main-color">产品名称：{{showList.jewelryName}}</p>
                <p>产品编码：{{showList.barcode}}</p>
                <p>
                    <img src="../../assets/img/work/exchangeList.png" alt="">
                </p>
            </div>
            <div v-if="compileRole" class="options-btn">
                <a class="sell-delect-btn" href="javascript:void(0)" @click.stop="delectProduct(showList.barcode)">删除</a>
            </div>
        </div>
        <div class="receipts-list-body-bottom">
            <ul class="condition-one">
                <li>首饰名称：{{showList.jewelryName}}</li>
                <li>成色名称：{{showList.colorName}}</li>
                <li>珠宝名称：{{showList.jewelName}}</li>
            </ul>
            <ul class="condition-two">
                <!-- 非素金，计件，手工录入-->
                <li class="input-focus-Wrap" v-if="handworkJewelryWeight">
                    <span>总件重：</span>
                    <span v-if="isInput">{{showList.totalWeight}}</span>
                    <input v-else type="text" v-model="showList.totalWeight" @change="operateUpdateSellFun"/>
                    <span>g</span>
                </li>
                <!-- 素金，计重，非手工录入 -->
                <li v-if="handworkPlainWeightIsInterchange">
                    金重：{{showList.goldWeight}}
                </li>
                <!-- 条形码录入 -->
                <li v-if='showList.isInterchange === "Y"'>
                    原售价：{{showList.oldPrice}}
                </li>
            </ul>
            <div class="switch-w52-h38 switch-cutOptions" v-if='this.showList.productType === "1" && compileRole'>
                <div class="switch-w52-h38 mr20">      
                    <el-switch
                        v-model="value2"
                        on-text="计重"
                        off-text="计件"
                        on-color="#13ce66"
                        off-color="#ff4949">
                    </el-switch>
                </div>
                <div class="switch-w52-h38" v-if='showList.isInterchange === "Y"'>     
                    <el-switch
                        v-model="value3"
                        on-text="成品"
                        off-text="旧料"
                        on-color="#13ce66"
                        off-color="#ff4949">
                    </el-switch>
                </div>
            </div>
        </div>
        <div class="receipts-list-body-bottom-options">
            <ul>
                <li v-if="handworkPlainWeight" @click='getFouce("xhGoldWeight")'>
                    <span>金重：</span>
                    <span v-if="isInput">{{showList.goldWeight}}</span>
                    <input ref="xhGoldWeight" v-else type="text" v-model="showList.goldWeight" v-on:input="watchMonny()" @change="operateUpdateSellFun"/>
                    <span>g</span>
                </li>
                <li v-if="handworkPlainWeight" @click='getFouce("xhExchangeGoldPrice")'>
                    <span>回购金价：</span>
                    <span v-if="isInput">{{showList.exchangeGoldPrice}}</span>
                    <input ref="xhExchangeGoldPrice" v-else type="text" v-model="showList.exchangeGoldPrice" v-on:input="watchMonny()" @change="operateUpdateSellFun"/>
                    <span>元/g</span>
                </li>
                <li v-if="handworkEstimatePrice" @click='getFouce("xhEstimatePrice")'>
                    <span>估价：</span>
                    <span v-if="isInput">{{showList.estimatePrice}}</span>
                    <input ref="xhEstimatePrice" v-else type="text" v-model="showList.estimatePrice" v-on:input="watchMonny()" @change="operateUpdateSellFun"/>
                    <span>元</span>
                </li>
                <li @click='getFouce("xhAbrasion")'>
                    <span>损耗：</span>
                    <span v-if="isInput">{{showList.abrasion}}</span>
                    <input v-else ref="xhAbrasion" type="text" v-model="showList.abrasion" v-on:input="watchMonny()" @change="operateUpdateSellFun"/>
                    <span>%</span>
                </li>
                <li @click='getFouce("xhPaymentPrice")'>
                    <span>手工费：</span>
                    <span v-if="isInput">{{showList.paymentPrice}}</span>
                    <input ref="xhPaymentPrice" v-else type="text" v-model="showList.paymentPrice" v-on:input="watchMonny()" @change="operateUpdateSellFun"/>
                    <span v-if="value2">元/g</span>
                    <span v-else>元/件</span>
                </li>
                <li class="monny-tooltip-top" @click='getFouce("xhPrice")'>
                    <span>回购价：</span>
                    <span v-if="isInput">{{showList.price}}</span>
                    <input ref="xhPrice" v-else type="text" v-model="showList.price" v-on:input="watchMonny()" @change="operateUpdateSellFun"/>
                    <span>元</span>
                    <img v-on:mouseover="overTooltip" class="query-img" src="../../assets/img/work/query-img.png" alt="">
                    <div class="tooltip-top" v-if="tooltipTopState">
                        原价为<span class="tooltip-top-number">{{showList.newPrice}}</span>元，小数点为四舍五入
                        <i class="triangle"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {operateUpdateSell, operateProductList} from "../../Api/commonality/operate"
export default {
    props: ['exchangeList', 'Index', 'compileRole'],
    data () {
        return {
            "isInput": true,
            "showList": "",
            "value2": true, // 计件，计重
            "value3": false, // 成品，旧料
            "delShow": true,
            "oneInitialize": false, // 第一次加载
            "referenceData": "", // 修改参照数据
            "tooltipTopState": false // 实售价提示语
        }
    },
    watch: {
        'value2': function () {
            if (this.oneInitialize) {
                if (this.value2) { // 计重
                    this.showList.calcMethod = "1";
                    this.computedNewPriceWeight();
                } else { // 计件
                    this.showList.calcMethod = "2";
                    this.computedNewPrice();
                }
                this.operateUpdateSellFun();
            }
        },
        'showList.newPrice': function () { // 监听实售价
            if (this.oneInitialize) {
                this.showList.price = Math.round(this.showList.newPrice) || 0;
            }
            this.oneInitialize = true;
        },
        'modelState' () {
            if (!this.modelState) {
                this.isInput = true;
            }
        }
    },
    computed: {
        ...mapGetters([
            'modelState'
        ]),
        goldWeightValue: function () { // 金重
            return Number(this.showList.goldWeight) || 0;
        },
        recycleGoldPriceValue: function () { // 回收金价
            return Number(this.showList.exchangeGoldPrice) || 0;
        },
        abrasionValue: function () { // 损耗(磨损率)
            return Number(this.showList.abrasion) * 0.01 || 0;
        },
        paymentPriceValue: function () { // 手工费
            return Number(this.showList.paymentPrice) || 0;
        },
        estimatePriceValue: function () { // 估价(回收价)
            return Number(this.showList.estimatePrice) || 0;
        },
        handworkJewelryWeight () { // 非素金，计件 (针对总件重)
            if (this.showList.isInterchange === "Y") { // 扫码
                return true;
            } else { // 手工录入
                if (this.jewelryWeight) {
                    return true;
                } else {
                    return false
                }
            }
        },
        handworkEstimatePrice () { // 非素金，计件，手工录入 (针对估价)
            if (this.jewelryWeight && this.showList.isInterchange === "N") {
                return true;
            } else {
                return false;
            }
        },
        handworkPlainWeight () { // 素金，手工录入 (金重)
            if (this.showList.productType === "1" && this.showList.isInterchange === "N") {
                return true;
            } else {
                return false;
            }
        },
        handworkPlainWeightIsInterchange () { // 素金，计重，非手工录入
            if (this.plainWeight && this.showList.isInterchange === "Y") {
                return true;
            } else {
                return false;
            }
        },
        jewelryWeight () { // 非素金，计件
            if (this.showList.productType !== "1" && this.showList.calcMethod === "2") {
                return true;
            } else {
                return false;
            }
        },
        plainWeight () { // 素金，计重
            if (this.showList.productType === "1" && this.showList.calcMethod === "1") {
                return true;
            } else {
                return false;
            }
        }
    },
    created () {
        this.IntoData();
    },
    methods: {
        ...mapActions([
            'workModelState' // 模糊层
        ]),
        getFouce (parm) {
            var _self = this;
            setTimeout(function () {
                _self.$refs[parm].focus();
            }, 100)
        },
        overTooltip () {
            this.tooltipTopState = true;
            var _self = this;
            setTimeout(function () {
                _self.tooltipTopState = false;
            }, 1000)
        },
        focusPopup () { // 获取焦点
            if (this.compileRole) {
                this.workModelState(true);
                this.isInput = false;
            }
        },
        IntoData () {
            var exchangeList = JSON.stringify(this.exchangeList);
            this.showList = JSON.parse(exchangeList);
            this.recordReferenceData();
            if (this.showList.calcMethod === "1") {
                this.value2 = true;
            } else {
                this.value2 = false;
            }
        },
        recordReferenceData () { // 记录改变数据
            let showList = JSON.stringify(this.showList);
            this.referenceData = JSON.parse(showList);
        },
        watchMonny () { // 其它值改变  重新计算售价、实售价
            if (this.showList.calcMethod === "1") { // 计重
                this.computedNewPriceWeight();
            } else if (this.showList.calcMethod === "2") { // 计件
                this.computedNewPrice();
            }
        },
        computedNewPriceWeight () { // 回购价（实售价） =（金重*金价）（1-磨损率）- 手工费费率*金重 ==》计重
            // console.log("kkkkkkkkkkkkkkkkkkkkkk");
            // console.log("金重" + this.goldWeightValue);
            // console.log("金价" + this.recycleGoldPriceValue);
            // console.log("磨损率" + this.abrasionValue);
            // console.log("手工费费率" + this.paymentPriceValue);
            // console.log("kkkkkkkkkkkkkkkkkkkkkk");
            this.showList.newPrice = (this.goldWeightValue * this.recycleGoldPriceValue) * (1 - this.abrasionValue) - (this.paymentPriceValue * this.goldWeightValue)
        },
        computedNewPrice () { // 回购价（实售价）= 估价 *（1-折旧率）- 手工费   ==》计件
            // console.log("kkkkkkkkkkkkkkkkkkkkkk");
            // console.log("金重" + this.goldWeightValue);
            // console.log("金价" + this.recycleGoldPriceValue);
            // console.log("磨损率" + this.abrasionValue);
            // console.log("手工费费率" + this.paymentPriceValue);
            // console.log("金价挂了" + this.showList.exchangeGoldPrice)
            // console.log("kkkkkkkkkkkkkkkkkkkkkk");
            if (this.showList.productType === "1") { // 素金
                 this.showList.newPrice = (this.goldWeightValue * this.recycleGoldPriceValue) * (1 - this.abrasionValue) - this.paymentPriceValue
            } else { // 珠宝
                this.showList.newPrice = this.estimatePriceValue * (1 - this.abrasionValue) - this.paymentPriceValue;
            }
        },
        operateUpdateSellFun () { // 保存修改
            var changeValue = [];
            for (let i in this.referenceData) {
                if (this.referenceData[i] !== this.showList[i]) {
                    var obj = {
                        [i]: this.showList[i]
                    }
                    changeValue.push(obj);
                }
            }
            var modifyList = [];
            let objData = {};
            for (let i in changeValue) {
                for (let j in changeValue[i]) {
                    switch (j) {
                        case "saleGoldPrice": // 销售金价
                            objData = {
                                "modifyType": "01",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "paymentPrice": // 手工费
                            objData = {
                                "modifyType": "02",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "discount": // 折扣
                            objData = {
                                "modifyType": "03",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "newPrice": // 实际售价(回收价)
                            objData = {
                                "modifyType": "10",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "abrasion": // 损耗(磨损率)
                            objData = {
                                "modifyType": "11",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "goldWeight": // 金重
                            objData = {
                                "modifyType": "12",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "calcMethod": // 计价方式
                            objData = {
                                "modifyType": "13",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "totalWeight": // 总件重
                            objData = {
                                "modifyType": "14",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "estimatePrice": // 估价
                            objData = {
                                "modifyType": "15",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "price": // 折后价
                            objData = {
                                "modifyType": "16",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                        case "exchangeGoldPrice": // 回收金价
                            objData = {
                                "modifyType": "17",
                                "dataType": "1",
                                "objectData": changeValue[i][j]
                            }
                            modifyList.push(objData);
                            break;
                    }
                }
            }
            if (modifyList.length > 0) {
                let options = {
                    "orderNum": this.$route.query.orderNumber,
                    "barcode": this.showList.barcode,
                    "modifyList": modifyList
                }
                operateUpdateSell(options).then((response) => {
                    if (response.data.state === 200) {
                        this.$emit("receiptsChange");
                        this.recordReferenceData();
                    } else {
                        this.$store.dispatch('workPopupError', response.data.msg)
                    }
                }, (response) => {
                    this.$store.dispatch('workPopupError', response.data.msg)
                })
            }
        },
        delectProduct (barcode) {
            let options = {
                "productList": [{
                    "barcode": barcode // 条形码
                }],
                "orderNum": this.$route.query.orderNumber, // 单据号
                "operate": 2 // 1新增2 删除3 全部删除
            }
            operateProductList(options).then(response => {
                if (response.data.state === 200) {
                    this.$emit("receiptsChange");
                    this.delShow = false;
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, response => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        }
    }
}
</script>
<style src="../../assets/css/template/saleCommodityList.scss" lang="scss" scoped></style>