<template>
    <el-dialog class="dialog-w540-h320-hn" v-model="popup.openPopup">
        <component :is="view" @changeView="choeeseView"  @childData="childmsg"></component>
    </el-dialog>
</template>
<script>
import tep1 from './../components/teps/Tep1'
import tep2 from './../components/teps/Tep2'
import tep3 from './../components/teps/Tep3'
import tep4 from './../components/teps/Tep4'
import {operateAddBackBuyProductToOrder} from './../../../../Api/commonality/operate'
// import {seekSellProductDetail} from './../../../../Api/commonality/seek'
export default {
    data () {
        return {
            popup: { // 弹窗
                openPopup: true
            },
            view: tep1,
            choosetype: {
                "operateType": this.operateType,
                "productTypeId": {},
                "colorId": {},
                "jewelId": {},
                "JewelryId": {}
            }
        }
    },
    props: ['recycleExchangePurchasePopup', 'operateType'],
    watch: {
        'recycleExchangePurchasePopup': function () {
            this.popup.openPopup = true;
        },
        'popup.openPopup': function () {
            this.$emit("closeReplaceSkip", false)
        }
    },
    created () {
        this.getPopup();
    },
    methods: {
        getPopup () {
            this.popup.openPopup = true;
            console.log(this.operateType)
        },
        choeeseView (i) {
            switch (i) {
                case 1: // 销售
                    this.popup.openPopup = true;
                    this.view = tep1
                    break
                case 2: // 退换
                    this.view = tep2
                    break
                case 3: // 回收
                    this.view = tep3
                    break
                case 4: // 首饰名称
                    this.view = tep4
                    break
                case 0: // 首饰名称
                    this.popup.openPopup = false;
                    this.$emit('addInputShow', true);
                    break
                }
        },
        childmsg (msg) {
            switch (msg.childIndex) {
                case 1: // 产品
                    this.choosetype.productTypeId = msg;
                    break
                case 2: // 退换
                    this.choosetype.colorId = msg;
                    break
                case 3: // 回收
                    this.choosetype.jewelId = msg;
                    break
                case 4: // 首饰名称
                    let options = {
                        "orderNum": this.$route.query.orderNumber,
                        "operateType": this.choosetype.operateType, // 操作类型1 退换2 回收
                        "productTypeId": this.choosetype.productTypeId.chooseSmall, // 产品类别ID
                        "colorId": this.choosetype.colorId.chooseSmall, // 成色名称ID
                        "jewelId": this.choosetype.jewelId.chooseSmall, // 宝石名称ID
                        "JewelryId": msg.chooseSmall, // 首饰名称ID
                        "calcMethod": "2", // 计价方式1 计重2 计件
                        "productProperty": "2" // 商品属性1成品2旧料
                        // "paymentPrice": 0, // 手工费
                        // "goldWeight": 1, // 金重
                        // "recycleGoldPrice": 0, // 回购金价
                        // "totalWeight": 0, // 总重
                        // "abrasion": 0, // 损耗
                        // "recyclePrice": 0 // 回购价
                    }
                    operateAddBackBuyProductToOrder(options).then((response) => { // 单据操作-新增退换/回收商品-通过手工输入
                        sessionStorage.setItem("单据操作-新增退换/回收商品-通过手工输入", JSON.stringify(response.data.data))
                        if (response.data.state === 200) {
                            this.saleListFun(response.data.data);
                        } else {
                            this.$store.dispatch('workPopupError', response.data.msg);
                        }
                    }, (response) => {
                        console.log(response);
                    });
                    break;
            }
        },
        saleListFun (parm) {
            let resultData = {};
            if (this.choosetype.operateType === "1") { // 退换商品
                resultData.exchangeList = parm;
            } else { // 回收
                resultData.recycleList = parm;
            }
            this.$emit("closeReplaceSkip", resultData)
        }
    }
}
</script>
<style></style>