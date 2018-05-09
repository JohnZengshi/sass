<template>
    <div class="plain-receipts-details">
<!--         <div>{{receiptsIntroList}}</div> -->
        <div class="header">
            <span class="header-title">单据信息</span>
            <router-link class="header-link" tag="p" :to='"/work/sell"'>
                <span>返回单据列表</span>
                <img src="../../../../assets/img/work/arrows-right-gray.png" alt="">
<!--                 <img src="./../../assets/img/work/arrows-right-gray.png" alt=""> -->
            </router-link>
            <!-- <router-link to="/work/sell">返回单据列表></router-link> -->
        </div>
        <div class="body">
            <ul>
                <li class="main-color">
                    <span>单<i class="space-between-w28"></i>号：</span>
                    <span class="body-top" v-if="receiptsIntroList">{{receiptsIntroList.orderNum}}</span></li>
                <li>
                    <span class="main-color body-top">制<i class="space-between-w7"></i>单<i class="space-between-w7"></i>人：</span>
                    <span class="main-color body-top" v-if="receiptsIntroList">{{receiptsIntroList.makeOrderManName}}</span>
                                   
                </li>
                <li>
                    <span>制单时间：</span>
                     <span class="main-9 body-top" v-if="receiptsIntroList">
                        <span>{{preciseSun(receiptsIntroList.createDate)}}</span>
                        <span>{{preciseMinute(receiptsIntroList.createDate)}}</span>
                    </span>    
                </li>
                <li v-if="receiptsIntroList.saleNum">
                    <span>销<i class="space-between-w28"></i>售：</span>
                    <span>{{receiptsIntroList.saleNum}}件</span>
                    <span>{{receiptsIntroList.saleWeight}}g</span>
                    <span>{{receiptsIntroList.salePrice}}元</span>
                </li>
                <li v-if="receiptsIntroList.recycleNum">
                    <span>回<i class="space-between-w28"></i>收：</span>
                    <span>{{receiptsIntroList.recycleNum}}件</span>
                    <span>{{receiptsIntroList.recycleWeight}}g</span>
                    <span>{{receiptsIntroList.recyclePrice}}元</span>
                </li>
                <li v-if="receiptsIntroList.exchangeNum">
                    <span>退<i class="space-between-w28"></i>换：</span>
                    <span>{{receiptsIntroList.exchangeNum}}件</span>
                    <span>{{receiptsIntroList.exchangeWeight}}g</span>
                    <span>{{receiptsIntroList.exchangePrice}}元</span>
                </li>
                <li>
                    <span>合<i class="space-between-w28"></i>计：</span>
                    <template v-if="isHas">           
                        <span class="all-count">{{receiptsIntroList.totalNum || 0}}件、</span>
                        <span class="all-count">{{receiptsIntroList.totalWeight || 0}}g、</span>
                        <span class="all-count">{{receiptsIntroList.totalPrice || 0}}元</span>
                    </template>
                    <template v-else>
                        <span> - </span>&nbsp
                        <span> - </span>&nbsp
                        <span> - </span>
                    </template>
                </li>
            </ul>
        </div>
        <div class="bottom" v-if="shopRole">
            <a href="javascript:void(0)" @click="collectMoney">{{getName(receiptsIntroList.cashStatus)}}</a>
            <a :class="{'already-monny': !getMonnyState}" href="javascript:void(0)" @click="delectReceipts(receiptsIntroList.orderNum)">删除单据</a>
        </div>
        <!-- 删除单据 -->
        <delect-receipts
            v-on:delectReceiptsState="delectReceiptsState"
            :delPopup='popup.deleteReceipts'
            :receiptsOrderNum='popup.receiptsOrderNum'
        ></delect-receipts>
    </div>
</template>
<script>
import delectReceipts from '../../../Work/CommonalityComponent/popupTemplate/DelectReceipts'
import {statusReceipts} from '../../../../Api/commonality/status'
export default {
    props: [
        "receiptsIntroList", "shopRole"
    ],
    data () {
        return {
            "popup": { // 弹窗
                "deleteReceipts": false, // 删除单据弹窗
                "receiptsOrderNum": ""
            },
            "saleNum": ''
        }
    },
    components: {
        delectReceipts
    },
    computed: {
        isHas () {
            return statusReceipts(this.receiptsIntroList.totalNum, this.receiptsIntroList.totalWeight, this.receiptsIntroList.totalPrice);
        },
        getMonnyState: function () { // 收银情况
            if (this.receiptsIntroList.cashStatus === "2") { // 未收银
                return true;
            }
            return false;
        }
    },
    methods: {
        preciseSun (parm) { // 年
            if (parm) {
                var Year = parm.slice(0, 4);
                var Month = parm.slice(4, 6);
                var Sun = parm.slice(6, 8);
                var allTime = Year + "-" + Month + "-" + Sun;
                return allTime;
            }
        },
        preciseMinute (parm) { // 月
            if (parm) {
                var ConfigData = parm.slice(8, 10);
                var Mour = parm.slice(10, 12);
                var allTime = ConfigData + ":" + Mour;
                return allTime;
            }
        },
        collectMoney () {
            // if (this.getMonnyState) {
                this.$emit('closeIncomeMoney', true);
            // }
        },
        delectReceiptsState (parm) { // 监听确认删除弹窗
            if (parm.type === "2") { // 单据删除成功
                this.$router.push("/work/sell");
            }
            this.popup.deleteReceipts = parm.name;
            this.popup.auditPopup = parm.name;
        },
        delectReceipts (parm) {
            if (this.getMonnyState) {
                this.popup.deleteReceipts = true;
                this.popup.receiptsOrderNum = parm;
            }
        },
        getName (parm) {
            if (parm === "1") {
                return "已收银"
            }
            return "收银"
        }
    }
}
</script>
<!-- <style src="./../../assets/css/template/newReceiptsIntro.scss" lang="scss" scoped></style> -->
<style lang="scss" scoped>
.plain-receipts-details{
    color: #333;
    position: relative;
    .space-between-w6{
        display: inline-block;
        width: 6px;
    }
    .space-between-w8{
        display: inline-block;
        width: 8px;
    }
    .space-between-w7{
        display: inline-block;
        width: 7px;
    }
    .space-between-w28{
        display: inline-block;
        width: 28px;
    }
    .header{
        position: relative;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        // margin: 0 10px;
        font-size: 16px;
        border-bottom: 1px solid #d6d6d6;
        .header-title{
            margin: 0;
            display: inline-block;
        }
        .header-link{
            position: absolute;
            top: 0;
            right: 10px;
            margin: 0;
            font-size: 12px;
            cursor: pointer;
            color: #999;
            span{
                display: inline-block;
                font-size: 12px;
            }
            img{
                margin-left: 5px;
                margin-bottom: 1px;
            }
        }
    }
    // .header{
    //     // border: 1px solid red;
    //     height: 50px;
    //     line-height: 50px;
    //     margin: 0 10px;
    //     border-bottom: 1px solid #d6d6d6;
    //     span{
    //         font-size: 16px;
    //     }
    //     a{
    //         float: right;
    //         font-size: 12px;
    //     }
    // }
    .body{
        padding: 0 10px;
        .body-top{
            display: inline-block;
            height: 14px;
            line-height: 14px;
        }
        ul{
            overflow-x: auto;
            overflow-y: hidden;
            li{
                white-space:nowrap;
                height: 16px;
                margin-top: 20px;
                span{
                    font-size: 14px;
                }
            }
            li:nth-child(3){
                margin-top: 30px;
            }
            li:last-child{
                height: 40px;
                line-height: 40px;
                margin-top: 10px;
                background-color: #f6f7f8;
            }
        }
    }
    .bottom{
        padding: 0 10px;
        font-size: 0;
        height: 40px;
        width: 100%;
        a{
            display: inline-block;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            text-align: center;
        }
        a:nth-child(1){
            margin-right: 30px;
            font-size: 16px;
            width: 160px;
            margin-top: 5px;
            color: #fff;
            background-color: #ffba42;
        }
        a:nth-child(2){
            width: 90px;
            margin-top: 5px;
            font-size: 16px;
            border: 1px solid #e58585;
            color: #e58585;
        }
        .already-monny{
            background-color: #ccc;
        }
    }
}
</style>
