<template>
    <div v-if="delShow" class="receipts-list" :class="{ active: !isInput }" @click="focusPopup">
        <div class="receipts-list-body-top">
            <div class="options-left">
                <p class="main-color">产品名称：{{showList.dayPrice}}{{showList.jewelryName}}</p>
                <p>产品编码：{{showList.barcode}}</p>
                <p>
                    <img src="../../assets/img/work/saleList.png" alt="">
                </p>
            </div>
            <div class="options-btn">
                <a v-if="compileRole" class="sell-delect-btn" href="javascript:void(0)" @click.stop="delectProduct(showList.barcode)">删除</a>
            </div>
        </div>
        <div class="receipts-list-body-bottom">
            <ul class="condition-one">
                <li>总件重：{{showList.totalWeight}}g</li>
                <li v-if='this.showList.productType === "1"'>
                    金重：{{showList.goldWeight}}g
                </li>
                <li v-else>
                    售价：{{showList.oldPrice}}元
                </li>
            </ul>
            <ul class="condition-two">
                <li>证书号：{{showList.certifiNo}}</li>
            </ul>
        </div>
        <div class="receipts-list-body-bottom-options">
            <ul>
                <li v-if='this.showList.productType === "1"' @click='getFouce("xhSaleGoldPrice")'>
                    <span>销售金价：</span>
                    <span v-if="isInput">{{showList.saleGoldPrice}}</span>
                    <input type="text" v-else ref="xhSaleGoldPrice" v-model="showList.saleGoldPrice" v-on:input="saleGoldPriceFun()" @change="operateUpdateSellFun"/>
                    <span>元/g</span>
                </li>
                <li @click='getFouce("xhDiscount")'>
                    <span>折扣：</span>
                    <span v-if="isInput">{{showList.discount}}</span>
                    <input type="text" v-else ref="xhDiscount" v-model="showList.discount" v-on:input="discountFun()" @change="operateUpdateSellFun"/>
                    <span>%</span>
                </li>
                <li @click='getFouce("xhPaymentPrice")'>
                    <span>手工费：</span>
                    <span v-if="isInput">
                        {{showList.paymentPrice}}                            
                    </span>
                    <input type="text" ref="xhPaymentPrice" v-else v-model="showList.paymentPrice" v-on:input="paymentPriceFun()" @change="operateUpdateSellFun"/>
                    <span v-if="true">元/g</span>
                    <span v-else>元/件</span>                        
                </li>
                <li class="switch-w52-h38 cutOptions" v-if='this.showList.productType === "1" && compileRole'>
                    <el-switch
                        v-model="value2"
                        on-text="计重"
                        off-text="计件"
                        on-color="#13ce66"
                        off-color="#ff4949">
                    </el-switch>
                </li>
                <li class="monny-tooltip-top" @click='getFouce("xhPrice")'>
                    <span>实售价：</span>
                    <span v-if="isInput">{{showList.price}}</span>
                    <input v-else type="text" ref="xhPrice" v-model="showList.price" v-on:input="watchMonny()" @change="operateUpdateSellFun"/>
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
    props: ['saleList', 'Index', 'compileRole'],
    data () {
        return {
            "isInput": true,
            "showList": "",
            "value2": true,
            "oneInitialize": false, // 第一次加载
            "delShow": true,
            "referenceData": "", // 修改参照数据
            "tooltipTopState": false // 实售价提示语
        }
    },
    watch: {
        'value2': function () {
            if (this.oneInitialize) {
                if (this.value2) {
                    this.computedWeight();
                    this.showList.calcMethod = "1";
                } else {
                    this.computedOldPrice();
                    this.computedNewPrice();
                    this.showList.calcMethod = "2";
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
        discountValue: function () { // 折扣
            return Number(this.showList.discount) || 0;
        },
        goldPriceValue: function () { // 售价
            return Number(this.showList.goldPrice) || 0;
        },
        saleGoldPriceValue: function () { // 金价
            return Number(this.showList.saleGoldPrice) || 0;
        },
        goldWeightValue: function () { // 金重
            return Number(this.showList.goldWeight) || 0;
        },
        paymentPriceValue: function () { // 手工费
            return Number(this.showList.paymentPrice) || 0;
        },
        newPriceValue: function () { // 实售价
            return Number(this.showList.newPrice) || 0;
        },
        oldPriceValue: function () { // 珠宝类的原售价（和素金类的售价差不多）
            return Number(this.showList.oldPrice) || 0;
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
        focusPopup () {
            if (this.compileRole) {
                this.workModelState(true);
                this.isInput = false;
            }
        },
        // focusPopupOver () {
        //     this.isInput = true;
        // },
        compileInput () {
            this.isInput = false;
        },
        recordReferenceData () { // 记录改变数据
            let showList = JSON.stringify(this.showList);
            this.referenceData = JSON.parse(showList);
        },
        IntoData () {
            var saleList = JSON.stringify(this.saleList);
            this.showList = JSON.parse(saleList);
            this.recordReferenceData();
            if (this.showList.calcMethod === "1") {
                this.value2 = true;
            } else {
                this.value2 = false;
            }
        },
        salesOfGold (parm) { // 金重改变
            this.watchMonny();
        },
        discountFun () { // 折扣改变
            this.watchMonny();
        },
        saleGoldPriceFun () { // 销售金价改变
            this.watchMonny();
        },
        paymentPriceFun () { // 手工费改变
            this.watchMonny();
        },
        watchMonny () { // 其它值改变  重新计算售价、实售价
            console.log(this.showList.productType)
            if (this.showList.productType === "1" && this.showList.calcMethod === "2") { // 素金 + 计件
                this.computedOldPrice(); // 售价
                this.computedNewPrice(); // 实售价
            } else if (this.showList.productType === "1" && this.showList.calcMethod === "1") { // 素金 + 计重
                this.computedWeight();
            } else if (this.showList.productType === "2" || this.showList.productType === "3") { // 珠宝类
                this.computedPiecePrice();
            }
        },
        newPriceFun () { // 实售价改变 重新计算折扣
            this.showList.newPrice = this.showList.price;
            if (this.showList.productType === "1" && this.showList.calcMethod === "2") { // 素金 + 计件
                this.plainGoldChange();
            } else if (this.showList.productType === "1" && this.showList.calcMethod === "1") { // 素金 + 计重
                this.plainGoldWeightChange();
            } else if (this.showList.productType === "2") { // 珠宝类
                this.jewelryChange();
            }
        },
        plainGoldChange () { // 实售价改变  折扣 = 实售价 / 售价 =》（素金 + 计件）
            this.showList.discount = (Number(this.showList.newPrice) / Number(this.showList.oldPrice)).toFixed(2) || 0;
        },
        plainGoldWeightChange () { //  实售价改变  折扣 = 实售价 / (金价+手工费) * 金重 =》（素金 + 计重）
            this.showList.discount = (this.newPriceValue / ((this.saleGoldPriceValue + this.paymentPriceValue) * this.goldWeightValue)).toFixed(2) || 0;
        },
        jewelryChange () { // 实售价改变 （珠宝）珠宝只有计件   折扣 = 实售价 / （售价+手工费）
            this.showList.discount = (this.newPriceValue / (this.goldPriceValue + this.paymentPriceValue)).toFixed(2) || 0;
        },
        computedOldPrice () { // 售价 = 金重 * 金价 + 手工费 (素金计件)
            this.showList.goldPrice = (this.goldWeightValue * this.saleGoldPriceValue + this.paymentPriceValue).toFixed(2) || 0;
        },
        computedNewPrice () { // 实售价 = 售价 * 折扣（素金计件）
            let newPrice = (this.goldPriceValue * (this.discountValue * 0.01)) || 0
            this.showList.newPrice = newPrice.toFixed(2);
        },
        computedWeight () { // 实售价 = (金价+手工费) * 金重 * 折扣 (素金计重)
            let newPrice = (this.saleGoldPriceValue + this.paymentPriceValue) * this.goldWeightValue * (this.discountValue * 0.01) || 0
            this.showList.newPrice = newPrice.toFixed(2);
        },
        computedPiecePrice () { // 实售价 =（原售价+手工费）折扣 (除素金外的计件)
            let newPrice = (this.oldPriceValue + this.paymentPriceValue) * (this.discountValue * 0.01) || 0;
            this.showList.newPrice = newPrice.toFixed(2);
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
            // sessionStorage.setItem("修改的值哈哈", JSON.stringify(changeValue));
            var modifyList = [];
            let objData = {};
            for (let i in changeValue) {
                for (let j in changeValue[i]) {
                    switch (j) {
                        case "saleGoldPrice": // 销售金价
                            objData = {
                                "modifyType": "01",
                                "dataType": "1",
                                "objectData": this.showList.saleGoldPrice
                            }
                            modifyList.push(objData);
                            break;
                        case "paymentPrice": // 手工费
                            objData = {
                                "modifyType": "02",
                                "dataType": "1",
                                "objectData": this.showList.paymentPrice
                            }
                            modifyList.push(objData);
                            break;
                        case "discount": // 折扣
                            objData = {
                                "modifyType": "03",
                                "dataType": "1",
                                "objectData": this.showList.discount
                            }
                            modifyList.push(objData);
                            break;
                        case "newPrice": // 实际售价
                            objData = {
                                "modifyType": "04",
                                "dataType": "1",
                                "objectData": this.showList.newPrice
                            }
                            modifyList.push(objData);
                            break;
                        case "goldWeight": // 金重
                            objData = {
                                "modifyType": "12",
                                "dataType": "1",
                                "objectData": this.showList.goldWeight
                            }
                            modifyList.push(objData);
                            break;
                        case "calcMethod": // 计价方式
                            objData = {
                                "modifyType": "13",
                                "dataType": "1",
                                "objectData": this.showList.calcMethod
                            }
                            modifyList.push(objData);
                            break;
                        case "price": // 折后价
                            objData = {
                                "modifyType": "16",
                                "dataType": "1",
                                "objectData": this.showList.price
                            }
                            modifyList.push(objData);
                            break;
                    }
                }
            }
            // sessionStorage.setItem("销售修改", JSON.stringify(modifyList));
            if (modifyList.length > 0) {
                let options = {
                    "orderNum": this.$route.query.orderNumber,
                    "barcode": this.showList.barcode,
                    "modifyList": modifyList
                }
                operateUpdateSell(options).then((response) => {
                    if (response.data.state === 200) {
                        this.recordReferenceData();
                        this.$emit("receiptsChange");
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