<template>
    <div class="product-list" v-if="bugShow">
        <div v-for="(item, index) in showList">     
            <!-- 销售 -->
            <sale-list-template
                v-if="item.saleList"
                :compileRole="compileRole"
                :saleList="item.saleList"
                :Index="index"
                @receiptsChange="receiptsChange"
            >
            </sale-list-template>
            <!-- 回收 -->
            <recycle-list-template
                v-if="item.recycleList"
                :compileRole="compileRole"
                :recycleList="item.recycleList"
                :Index="index"
                @receiptsChange="receiptsChange"
            ></recycle-list-template>
            <!-- 退换 -->
            <exchange-list-template
                v-if="item.exchangeList"
                :compileRole="compileRole"
                :exchangeList="item.exchangeList"
                :Index="index"
                @receiptsChange="receiptsChange"
            >
            </exchange-list-template>
        </div>
        <!-- 销售 -->
        <template v-for="(item, index) in sellProductList.saleList"> 
            <sale-list-template
                :compileRole="compileRole"
                :saleList="item"
                :Index="index"
                @receiptsChange="receiptsChange"
            >
            </sale-list-template>
        </template>
        <!-- 退换 -->
        <template v-for="(item, index) in sellProductList.exchangeList">           
            <exchange-list-template
                :compileRole="compileRole"
                :exchangeList="item"
                :Index="index"
                @receiptsChange="receiptsChange"
            >
            </exchange-list-template>  
        </template>
        <!-- 回收 -->
        <template v-for="(item, index) in sellProductList.recycleList">
            <recycle-list-template
                :compileRole="compileRole"
                :recycleList="item"
                :Index="index"
                @receiptsChange="receiptsChange"
            ></recycle-list-template>
        </template>
    </div>
</template>
<script>
import saleListTemplate from "../../../../components/work/SaleListTemplate.vue" // 销售
import recycleListTemplate from "../../../../components/work/RecycleListTemplate.vue" // 回收
import exchangeListTemplate from "../../../../components/work/ExchangeListTemplate.vue" // 退换
import {seekSellProductList} from './../../../../Api/commonality/seek'
export default {
    props: [
        'recycleExchangePurchasePopupData', 'compileRole'
    ],
    data () {
        return {
            "showList": [],
            "calcMethod": true,
            "isInput": false,
            "todayGoldPrice": null,
            "sellProductList": [],
            "bugShow": true
        }
    },
    components: {
        saleListTemplate,
        recycleListTemplate,
        exchangeListTemplate
    },
    watch: {
        'recycleExchangePurchasePopupData' () {
            this.showList.unshift(this.recycleExchangePurchasePopupData);
            var data = JSON.stringify(this.showList);
            this.showList = [];
            var _self = this;
            setTimeout(function () {
                _self.showList = JSON.parse(data);
            }, 300)
        }
    },
    created () {
        this.getProductList();
    },
    methods: {
        getProductList () { // 商品列表-销售
            let options = {
                "orderNum": this.$route.query.orderNumber,
                "page": "1",
                "pageSize": "9999"
            }
            seekSellProductList(options).then((response) => {
                if (response.data.state === 200) {
                    this.sellProductList = response.data.data;
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                console.log(response);
            })
        },
        receiptsChange (parm) { // 单据改变了
            this.$emit("receiptsChange");
        }
    }
}
</script>
<style lang="scss" scoped>
.product-list{
    .sell-list-body:first-child{
        margin-top: 0;
    }
    .sell-list-body{ // 每条数据
        position: relative;
        margin-top: 20px;
        padding-bottom: 10px;
        background-color: #fff;
        font-size: 0;
        .sell-delect-btn{ // 删除按钮
            position: absolute;
            height: 38px;
            line-height: 38px;
            top: 11px;
            right: 30px;
            font-size: 14px;
            border-radius: 10%;
            padding: 0 20px;
            border: 1px solid #d6d6d6;
            color: #999;
        }
        ul{
            padding-left: 60px;
            vertical-align: top;
            li{
                padding: 10px 0;
                line-height: 16px;
                font-size: 16px;
                input{
                    border: 1px solid #fff;
                    width: 80px;
                    font-size: 16px;
                    &:focus{
                        border: 1px solid #999;
                    }
                }                
            }
        }
        ul:nth-child(1){
            background-color: #f6f7f8;
            padding-left: 20px;
            font-weight: bolder;
            color: #999;
            margin-bottom: 10px;
            li{
                display: inline-block;
                width: 300px;
                margin: 22px 0;
                padding: 0;
            }
            .main-color{
                height: 16px;
                line-height: 16px;
                position: relative;
                span{
                    display: inline-block;
                    height: 16px;
                    line-height: 16px;
                    vertical-align: top;
                    margin-right: 20px;
                }
                img{
                    position: absolute;
                    top: -2px;
                }
            }
        }
        ul:nth-child(2),ul:nth-child(3){
            width: 260px;
            display: inline-block;
        }
        ul:nth-child(4){
            display: block;            
            li{
                display: inline-block;
                position: relative;
                width: 260px;
                input{
                    border: 1px solid #fff;
                    width: 80px;
                    font-size: 16px;
                    &:focus{
                        border: 1px solid #999;
                    }
                }
                &:last-child{
                    float: right;
                    margin-right: 20px;
                    color: red;
                    text-align: right;
                    input{
                        color: red;
                    }
                }                
            }
        }
        &.click-style{
            position: relative;
            z-index: 9999;
            box-shadow: 0 0 7px 3px rgba(0,0,0,.3);
        }
        &.hasborder{
            input{
                border: 1px solid #999 !important;
            }
        }
        .sell-switch{
            position: absolute;
            bottom: 11px;
            right: 300px;
            height: 30px;
            width: 60px;
        }
        .sell-switch-material{
            position: absolute;
            top: 0;
            bottom: 0;
            right: 30px;
            margin: auto;
            height: 30px;
            width: 60px;
        }
        .hide-input{
            display:inline-block;
            border:1px solid #fff;
            height: 23px;
            line-height: 23px;
        }
    }
}
</style>