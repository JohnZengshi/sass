<template>
    <div class="receipts-list-body" v-if="isShow" @click="goDetail(item)"
        :data-status="getState(item.cashStatus, item)"
        :data-status-color="getColor(item.cashStatus, item)"
        :class="{'color1': getColor(item.cashStatus, item) == 1, 'color2': getColor(item.cashStatus, item) == 2,
            'color3': getColor(item.cashStatus, item) == 3, 'color4': getColor(item.cashStatus, item) == 4, 
            'color5': getColor(item.cashStatus, item) == 5, 'color6': getColor(item.cashStatus, item) == 6,
       }">
        <div class="mask"></div>
        <div class="receipts-list-body-left">
            <div class="orderNum">{{item.orderNum}}</div>
            <ul class="status">
                <li>{{item.storageName}}</li>
                <li>{{item.shopName}}</li>
            </ul>
            <div class="status-name">
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
                    <FormatImg :logo="item.makeOrderManLog" class="img" :userName="item.makeOrderManName" :size="24"></FormatImg>
                    <div class="receipts-list-body-name">{{item.makeOrderManName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import delectReceipts from './../../Work/CommonalityComponent/popupTemplate/DelectReceipts'
import auditReceipts from './../../Work/CommonalityComponent/popupTemplate/AuditReceipts'
import incomeMoney from './components/IncomeMoney.vue'
import {productTpyeState} from './../../../Api/commonality/status'
import QualityTemplateSelectorDialog from './components/QualityTemplateSelectorDialog'
import TemplatePreviewCanvasComponent from 'components/template/TemplatePreviewCanvas'
import FormatImg from 'components/template/DefaultHeadFormat.vue'
export default {
    props: ['item', 'shopRole'],
    components: {
        delectReceipts,
        auditReceipts,
        incomeMoney,
        QualityTemplateSelectorDialog,
        TemplatePreviewCanvasComponent,
        FormatImg
    },
    data () {
        return {
            "isShow": true,
            "deleteReceipts": false, // 删除弹窗
            "auditPopup": false, // 审核弹窗
            "auditsReceiptsForm": null, // 操作1 删除 3 取消审核 4 驳回审核 5 通过审核 6 撤销审核
            "popup": {
                "incomeMoneyPopup": false
            },
            "orderNumber": "", // 选中的orderNumber
                        "canvas": {
                percentage: 100,
                width: 0,
                height: 0,
                backgroundImage: '',
                rotateDeg: 0,
                components: []
            },
            "isPreview": false,
            "templateData": {
                "productList": []
            }
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
        isIncomeMoney (parm) { // 监听关闭弹窗事件
            this.popup.incomeMoneyPopup = parm;
            this.receiptsChange();
        },
        getMonnyFun (parm) {
            this.orderNumber = parm;
            this.popup.incomeMoneyPopup = true;
        },
        goDetail (parm) {
            sessionStorage.setItem("isCheckOrderMan", parm.isCheckOrderMan);
            this.$router.push({
                path: "/work/sell/sellReceiptsList",
                query: {
                    orderNumber: parm.orderNum
                }
            })
        },
        getColor (parm, item) {
            if (item.isLocking == 'Y') {
                return 6
            } else {
                switch (parm) {
                    case "1":
                        return 1;
                    case "2":
                        return 2;
                }
            }
            
        },
        getState (parm, item) { // 调出库位
            if (item.isLocking == 'Y') {
                return '锁定'
            } else {
                switch (parm) {
                    case "1":
                        return "已收银";
                    case "2":
                        return "待收银";
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
                }
            }
        },
        getProductTpyeState (parm) {
            return productTpyeState(parm);
        },
        getMonnyState (parm) { // 收银按钮
            if (parm === "2" && this.shopRole) {
                return true;
            } else {
                return false;
            }
        },
        openQualityTemplateSelectorDialog (orderNumber) {
            this.$refs.qualityTemplateSelectorDialog.show();
        },
        printOrder (orderNumber, template) {
            this.$refs.qualityTemplateSelectorDialog.close();
        }
    }
}
</script>
<style src="../../../assets/css/template/receiptsListBody.scss" lang="scss" scoped></style>
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