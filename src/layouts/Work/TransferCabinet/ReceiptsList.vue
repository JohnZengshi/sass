<template>
    <div class="receipts-list-body" v-if="isShow" @click="goDetail(item)"
        :data-status="getState(item.isLocking)"
        :data-status-color="getColor(item.isLocking)"
        :class="{'color1': getColor(item.isLocking) == 1, 'color6': getColor(item.isLocking) == 2
        }"
    >
        <div class="mask"></div>
        <div class="receipts-list-body-left">
            <div class="orderNum">{{item.orderNum}}</div>
            <ul class="status">
                <li>{{item.storageName}}</li>
                <li>{{item.shopName}}</li>
            </ul>
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
    
            </div>
            <div class="receipts-list-body-main-middle">
                <div>{{item.shopName}}</div>
                <div>{{item.groupName2}}（出）</div>
                <div>{{item.groupName}}（入）</div>      
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
import {receiptOptionsName, productTpyeState} from './../../../Api/commonality/status'
import FormatImg from 'components/template/DefaultHeadFormat.vue'
export default {
    props: ['item'],
    components: {
        delectReceipts,
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
        getColor (status) {
            if (status == 'Y') {
                return 2
            } else {
                return 1
            }
        },
        getState (status) {
            // console.log(status)
            if (status == 'Y') {
                return "锁定"
            } else {
                return "未锁定"
            }
        },
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
        goDetail (parm) {
            this.$router.push({
                path: "/work/transferCabinet/newTransferCabinet",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
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
                        this.item.checkType = "2";
                        return;
                    case "2": // 通过审核
                        this.item.checkType = "3";
                        return;
                    case "3": // 撤销审核
                        this.item.checkType = "1"
                        return;
                    case "4": // 驳回审核
                        this.item.checkType = "1";
                        return;
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
        getOptionsName (parm) { // 操作名字
            return receiptOptionsName(parm);
        },
        getProductTpyeState (parm) {
            return productTpyeState(parm);
        }
    }
}
</script>
<style src="../../../assets/css/template/receiptsListBody.scss" lang="scss" scoped></style>