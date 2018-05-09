<template>
<div class="receipts-list-body" v-if="isShow" @click="goDetail(item)"
    :data-status="getState(item.checkType, item.receiptStatus, item.deliverStatus, item)"
    :data-status-color="getColor(item.checkType, item.receiptStatus, item)"
    :class="{'color1': getColor(item.checkType, item.receiptStatus, item) == 1, 'color2': getColor(item.checkType, item.receiptStatus, item) == 2,
        'color3': getColor(item.checkType, item.receiptStatus, item) == 3, 'color4': getColor(item.checkType, item.receiptStatus, item) == 4, 
        'color5': getColor(item.checkType, item.receiptStatus, item) == 5, 'color6': getColor(item.checkType, item.receiptStatus, item) == 6,
    }"
>
        <div class="mask"></div>
        <div class="receipts-list-body-left">
            <div class="orderNum">{{item.orderNum}}</div>
            <ul class="status">
                <li>{{item.storageName2}}</li>
                <li>{{item.storageName}}</li>
            </ul>
            <div class="status-names">
            	<div>调出库位</div>
            	<div>调入库位</div>
            </div>
        </div>
        <div class="receipts-list-body-right">
            <div class="data-wrap">
                <div class="data-item">
                    <div class="item-top">{{item.totalNum || 0}}<span> 件</span></div>
                    <div class="item-bottom">件数</div>
                </div>
                <div class="data-item">
                    <div class="item-top">{{(item.totalWeight || 0).toFixed(3)}}<span> g</span></div>
                    <div class="item-bottom">件重</div>
                </div>
                <div class="data-item">
                    <div class="item-top">{{(item.totalPrice || 0).toFixed(2)}}<span> 元</span></div>
                    <div class="item-bottom">售价</div>
                </div>
            </div>
            <div class="info-wrap">
                <div class="time">
                    {{preciseSun(item.createDate)}}
                </div>
                <div class="makeManInfo">
                    <!-- <img :src="item.makeOrderManLog"> -->
                    <FormatImg :logo="item.makeOrderManLog" class="img" :userName="item.makeOrderManName" :size="24"></FormatImg>
                    <div class="receipts-list-body-name">{{item.makeOrderManName}}</div>
                </div>
            </div>
        </div>
        <!-- <div class="receipts-list-body-head">
            <img :src="item.makeOrderManLog">
            <div class="receipts-list-body-name">{{item.makeOrderManName}}</div>
        </div>
        <div class="receipts-list-body-main">
            <div class="receipts-list-body-main-top">
                <div class="orderNum">{{item.orderNum}}</div>
                <div class="status-btn">{{getState(item.receiptStatus, item.deliverStatus)}}</div>
            </div>
            <div class="receipts-list-body-main-middle">
                <div>{{item.storageName2}}（出）</div>
                <div>{{item.storageName}}（入）</div>
                <div>{{item.supplierName}}</div>
            </div>
            <div class="receipts-list-body-main-bottom">
                <div>
                    <span v-text="preciseSun(item.createDate)"></span>
                    <span class="ml10" v-text="preciseMinute(item.createDate)"></span>
                </div>
            </div>
            
        </div>
        <div class="totalNum">
            {{item.totalNum || 0}}
            <span>件</span>
        </div>
        <div class="listNum">
            <div>
                {{item.totalWeight || 0}}
                <span>g</span>
            </div>
            <div>
                {{item.totalPrice || 0}}
                <span>元</span>
            </div>
        </div> -->
</div>
</template>
<script>
import * as jurisdictions from './../../../Api/commonality/jurisdiction'
import delectReceipts from './../../Work/CommonalityComponent/popupTemplate/DelectReceipts'
import auditReceipts from './../../Work/CommonalityComponent/popupTemplate/AuditReceipts'
import {productTpyeState} from './../../../Api/commonality/status'
import FormatImg from 'components/template/DefaultHeadFormat.vue'
export default {
    props: ['item'],
    components: {
        delectReceipts,
        auditReceipts,
        FormatImg
    },
    mounted () {
        console.log(this.item)
    },
    data () {
        return {
            "isShow": true,
            "deleteReceipts": false, // 删除弹窗
            "auditPopup": false, // 审核弹窗
            "auditsReceiptsForm": null // 操作1 删除 3 取消审核 4 驳回审核 5 通过审核 6 撤销审核
        }
    },
    methods: {
        preciseSun (parm) { // 年
            var Year = parm.slice(0, 4);
            var Month = parm.slice(4, 6);
            var Sun = parm.slice(6, 8);
			      let hour = parm.substring(8, 10);
			      let time = parm.substring(10, 12);
            var allTime = Year + "-" + Month + "-" + Sun + " " + hour + ":" + time;
            return allTime;
        },
        preciseMinute (parm) { // 月
            var ConfigData = parm.slice(8, 10);
            var Mour = parm.slice(10, 12);
            var allTime = ConfigData + ":" + Mour;
            return allTime;
        },
        delectOptions (parm, isRole) { // 删除权限
            return jurisdictions.jurisdictionDelectOptions(parm, isRole);
        },
        goDetail (parm) {
            this.$router.push({
                path: "/work/transferStorage/newTransferStorage",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        },
        getColor (parm, parm1, item) {
            if (item.isLocking == 'Y') {
                return 6
            } else {
                if (parm1 == 1) {
                    return 1
                } else if (parm1 == 2) {
                    if (parm == 1) {
                        return 4
                    } else if (parm == 2) {
                        return 5
                    }
                    return 3
                } else if (parm == 1) {
                    return 4
                } else if (parm == 2) {
                    return 5
                }
            }
            
        },
        getState (parm, parm1, parm2, item) { // 调出库位 parm2 发货状态 Parm1 收货状态
            console.log(parm)
            console.log(parm1)
            if (item.isLocking == 'Y') {
                return '锁定'
            } else {
                if (parm == 1) {
                    // return '未发货'
                    return '未发货'
                } else if (parm == 2) {
                    if (parm1 == 1) {
                        return '待收货'
                    } else if (parm1 == 2) {
                        return '已收货'
                    }
                    if (parm2 == 1) {
                        return '未发货'
                    } else {
                        return '已发货'
                    }
                    // return '已发货'
                } else if (parm1 == 1) {
                    return '待收货'
                } else if (parm1 == 2) {
                    return '已收货'
                }
            }
            
            // console.log(this.item)
            // console.log(parm)
            // switch (parm) {
            //     case "1":
            //         return "未发货";
            //     case "2":
            //         return "未收货";
            //     case "3":
            //         return "已收货";
            // }
        },
        delectReceipts (parm) {
            this.deleteReceipts = true;
            this.receiptsOrderNum = parm;
        },
        delectReceiptsState (parm) { // 监听确认删除弹窗
            this.deleteReceipts = false;
            if (parm.type === "2") { // 删除成功
                this.$emit("delectReceiptCb", this.Index)
                this.isShow = false;
            }
        },
        auditReceiptsState (parm) { // 审核回调
            if (parm.type === "2") { // 成功
                this.item.receiptStatus = "2";
            }
            this.deleteReceipts = parm.name;
            this.auditPopup = parm.name;
        },
        operateTakeOrderFun () {
            this.auditsReceiptsForm = "9";
            this.auditPopup = true;
        },
        getProductTpyeState (parm) {
            return productTpyeState(parm);
        }
    }
}
</script>
<style src="../../../assets/css/template/receiptsListBody.scss" lang="scss" scoped></style>
<style scoped lang="scss">
	.status li{
		margin-right: 40px !important;
	}
	.status-names{
	  clear: both;
	  display: flex;
	  font-size: 12px;
	  color: #948b8b;
	  &>div{
	  	margin-top: 8px;
	  	width: 70px;
	  }
	}
</style>