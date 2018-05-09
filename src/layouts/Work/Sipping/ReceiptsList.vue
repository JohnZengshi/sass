<template>
    <div class="receipts-list-body" v-if="isShow" @click="goDetail(item)"
        :data-status="getState(item.checkType, item.receiptStatus, item)"
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
                <li>{{item.storageName}}</li>
                <li>{{item.shopName}}</li>
            </ul>
            <div class="status-name">
            	<div>库位</div>
            	<div>店铺</div>
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
                <div class="status-btn">{{getState(item.checkType, item.receiptStatus)}}</div>
            </div>
            <div class="receipts-list-body-main-middle">
                <div>{{item.storageName}}</div>
                <div>{{item.shopName}}</div>
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
import {mapGetters} from 'vuex'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import {receiptOptionsName, productTpyeState} from 'Api/commonality/status'
import delectReceipts from './../../Work/CommonalityComponent/popupTemplate/DelectReceipts'
import auditReceipts from './../../Work/CommonalityComponent/popupTemplate/AuditReceipts'
import FormatImg from 'components/template/DefaultHeadFormat.vue'
export default {
    props: ['item', 'Index', 'computedManageRole'],
    components: {
        delectReceipts,
        auditReceipts,
        FormatImg
    },
    computed: {
        ...mapGetters([
            "userPositionInfo" // 职位信息
        ]),
        computedRole: function () { // 公司
            if (this.userPositionInfo) {
                for (let i of this.userPositionInfo.roleList) {
                    switch (i.role) {
                        case "1":
                            return true;
                        case "2":
                            return true;
                        case "3":
                            return true;
                    }
                }
            }
        },
        shopRole: function () { // 店员
            if (this.userPositionInfo) {
                for (let i of this.userPositionInfo.roleList) {
                    switch (i.role) {
                        case "4":
                            return true;
                        case "5":
                            return true;
                    }
                }
            }
        }
    },
    data () {
        return {
            "isShow": true,
            "deleteReceipts": false, // 删除弹窗
            "auditPopup": false, // 审核弹窗
            "auditsReceiptsForm": null // 操作1 删除 3 取消审核 4 驳回审核 5 通过审核 6 撤销审核
        }
    },
    mounted () {
        console.log(this.item)
    },
    methods: {
        preciseSun (parm) { // 年
            if (parm) {
                var Year = parm.slice(0, 4);
                var Month = parm.slice(4, 6);
                var Sun = parm.slice(6, 8);
					      let hour = parm.substring(8, 10);
					      let time = parm.substring(10, 12);
		            var allTime = Year + "-" + Month + "-" + Sun + " " + hour + ":" + time;
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
        goDetail (parm) {
            sessionStorage.setItem("rcvFlag", parm.rcvFlag);
            this.$router.push({
                path: "/work/sipping/newSipping",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        },
        getColor (parm, receiptStatus, item) {
            //console.log(item)
            if (item.isLocking == 'Y') {
                return 6
            } else {
                switch (parm) {
                    case "1":
                        return 1;
                    case "2":
                        return 2;
                    case "3":
                        if (receiptStatus === "1") {
                            return 4;
                        } else {
                            return 5;
                        }
                }
            }
            
        },
        getState (parm, receiptStatus, item) { // 调出库位
            if (item.isLocking == 'Y') {
                return '锁定'
            } else {
                switch (parm) {
                    case "1":
                        return "待审核";
                    case "2":
                        return "审核中";
                    case "3":
                        if (receiptStatus === "1") {
                            return "待收货";
                        } else {
                            return "已收货";
                        }
                }
            }
            
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
            this.deleteReceipts = parm.name;
            this.auditPopup = parm.name;
            if (parm.type === "2") { // 成功
                switch (this.auditsReceiptsForm) {
                    case "1": // 提交审核
                        if (this.computedManageRole) { // 超级管理员
                            this.item.checkType = "3"
                        } else { // 职员
                            this.item.checkType = "2";
                        }
                        this.item.isRole = "N";
                        return;
                    case "2": // 通过审核
                        this.item.checkType = "3";
                        this.item.isRole = "N";
                        return;
                    case "3": // 撤销审核
                        this.item.checkType = "1";
                        this.item.isRole = "Y";
                        return;
                    case "4": // 驳回审核
                        this.item.checkType = "1";
                        return;
                    case "9": // 确认收货
                        this.item.receiptStatus = "2";
                        this.item.isRole = "Y"
                }
            }
        },
        auditFun (checkType) { // 提交审核
            this.auditsReceiptsForm = checkType;
            this.auditPopup = true;
        },
        delectOptions (parm, isRole) { // 删除权限
            return jurisdictions.jurisdictionDelectOptions(parm, isRole);
        },
        auditStateFilter (parm, makeId, isCheckOrderMan) { // 是否可以提交审核判断
            return jurisdictions.jurisdictionAuditStateFilter(parm, makeId, isCheckOrderMan);
        },
        turnDownAuditStateFilter (parm, isCheckOrderMan, receiptStatus) { // 驳回审核
            return jurisdictions.jurisdictionSippingTurnDownAuditStateFilter(parm, isCheckOrderMan, receiptStatus);
        },
        rcvFlagFun (receiptStatus, rcvFlag) { // 确认收货
            return jurisdictions.jurisdictionRcvFlag(receiptStatus, rcvFlag);
        },
        getOptionsName (parm) { // 操作名字
            return receiptOptionsName(parm);
        },
        getProductTpyeState (parm) {
            return productTpyeState(parm);
        },
        operateTakeOrderFun (orderNum) {
            this.receiptsOrderNum = orderNum;
            this.auditsReceiptsForm = "9";
            this.auditPopup = true;
        }
    }
}
</script>
<style src="assets/css/template/receiptsListBody.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
.status-name{
    clear: both;
    display: flex;
    font-size: 12px;
    color: #948b8b;
    &>div{
    	margin-top: 8px;
    	width: 46px;
    }
}
</style>