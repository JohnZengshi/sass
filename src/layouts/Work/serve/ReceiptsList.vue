<template>
    <div class="receipts-list-body" v-if="isShow" @click="goDetail(item)"
        :data-status="getState(item.afterStatus, item)"
        :data-status-color="getColor(item.afterStatus, item)"
        :class="{'color4': getColor(item.afterStatus, item) == 1, 'color5': getColor(item.afterStatus, item) == 2, 'color6': getColor(item.afterStatus, item) == 3,
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
                    <div class="item-top">{{item.afterUserName}}</div>
                    <div class="item-bottom">售后用户</div>
                </div>
                <div class="data-item">
                    <div class="item-top">{{item.totalNum || 0}}<span> 件</span></div>
                    <div class="item-bottom">件数</div>
                </div>
                <div class="data-item">
                    <div class="item-top">{{item.receptionName}}</div>
                    <div class="item-bottom">售后接待</div>
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
import {productTpyeState} from './../../../Api/commonality/status'
// import TemplatePreviewCanvasComponent from 'components/template/TemplatePreviewCanvas'
import FormatImg from 'components/template/DefaultHeadFormat.vue'
export default {
    props: ['item', 'shopRole'],
    components: {
        delectReceipts,
        auditReceipts,
        // TemplatePreviewCanvasComponent,
        FormatImg
    },
    data () {
        return {
            "isShow": true,
            "deleteReceipts": false, // 删除弹窗
            "auditPopup": false, // 审核弹窗
            "auditsReceiptsForm": null, // 操作1 删除 3 取消审核 4 驳回审核 5 通过审核 6 撤销审核
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
        goDetail (parm) {
            sessionStorage.setItem("isCheckOrderMan", parm.isCheckOrderMan);
            this.$router.push({
                path: "/work/serve/serveReceiptsList",
                query: {
                    orderNumber: parm.orderNum,
                    shopId: parm.shopId
                }
            })
        },
        getColor (parm, item) {
            if (item.isLocking == 'Y') {
                return 6
            } else {
                return parm;
            }
            
        },
        getState (parm, item) { // 调出库位
            if (item.isLocking == 'Y') {
                return '锁定'
            } else {
                switch (parm) {
                    case "1":
                        return "处理中";
                    case "2":
                        return "已完成";
                    case "3":
                        return "锁定";
                }
            }
            
        },
        delectReceipts (parm) {
            this.deleteReceipts = true;
            this.receiptsOrderNum = parm;
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