<template>
    <div class="receipts-main">
        <div class="header-options dayinMain">
                        <!-- 头部的上 -->
            <div class="header-options-top skin-shield">
                <div class="tittle-wrap">
                    <i class="iconfont icon-fahuo"></i>
                    <div>发货</div>
                </div>
                <div class="optionWrap">
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.storage == '' ? '' : 'select'">
                           {{optionData.storage == '' ? '发货库位' : optionData.storage}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.storage ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('warehouse','storage')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getWarehouseId(item, index)" 
                                :class = "optionData.storage == item.repositoryName ? 'active' :''"
                                v-for="(item, index) in repositoryList">
                                {{item.repositoryName}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.auditStatus == '' ? '' : 'select'">
                           {{optionData.auditStatus == '' ? '审核状态' : optionData.auditStatus}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.auditStatus ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('auditState','auditStatus')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getSort(item, index)" 
                                :class = "optionData.auditStatus == item.name ? 'active' :''"
                                v-for="(item, index) in datas.audits">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.receivingStatus == '' ? '' : 'select'">
                           {{optionData.receivingStatus == '' ? '收货状态' : optionData.receivingStatus}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.receivingStatus ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('receiptStatus','receivingStatus')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getReceiptStatus(item, index)" 
                                :class = "optionData.receivingStatus == item.name ? 'active' :''"
                                v-for="(item, index) in datas.receiptStatus">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.receivingShop == '' ? '' : 'select'">
                           {{optionData.receivingShop == '' ? '收货店铺' : optionData.receivingShop}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.receivingShop ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('supplier','receivingShop')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getsupplier(item, index)" 
                                :class = "optionData.receivingShop == item.shopName ? 'active' :''"
                                v-for="(item, index) in shopListByCo">
                                {{item.shopName}}
                            </li>
                        </ul>
                    </div>
                    <div class="optionDiv selected Rp_title_container">
                        <xj-time @change="changeDate"></xj-time>
                    </div>
                    <div class="optionDiv sell-new-data oper-btn" @click="newReceipt" v-if="companyPosition && (companyPosition != 4 && companyPosition != 5 || multipleIdentities == 'Y')">
                        <span>新建发货单</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="receipts-list" @scroll="onScroll($event)">
            <div>
                <template v-if="totalNum > 0">   
                    <template v-if="item" v-for="(item, index) in showList">
                        <receipts-list 
                            :item="item"
                            :Index="index"
                            :computedManageRole="computedManageRole"
                            @delectReceiptCb="delectReceiptCb">
                        </receipts-list>
                    </template>
                </template>
                <div v-if="totalNum === 0" class="no-data">
                    <EmptyReceiptsTemplate
                        @emptyAddReceipt="newReceipt"
                        :isAddRole="computedRole"
                    ></EmptyReceiptsTemplate>
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <!-- 新建单据 -->
        <new-sipping-receipts
            v-if="newPopup.main"
            :newPopup="newPopup.main"
            v-on:closePopup="closePopup"
        ></new-sipping-receipts>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapActions} from "vuex"
import {seekSendStorageList} from 'Api/commonality/seek'
import {operateDelReceipt} from 'Api/commonality/operate'
import {receiptOptionsName} from 'Api/commonality/status'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import newSippingReceipts from 'components/work/NewSippingReceipts'
import EmptyReceiptsTemplate from 'components/EmptyDataTemplate/EmptyReceiptsTemplate.vue'
import receiptsList from './ReceiptsList'
import xjTime from 'base/time/xj-time'
export default {
    components: {
        newSippingReceipts,
        receiptsList,
        EmptyReceiptsTemplate,
        xjTime
    },
    data () {
        return {
            "selectPopup": false, // 选择下拉框
            "isSeslectBody": false, // 移入选择内容框
            "totalNum": "", // 单据总条数
            "selectData": { // 选择样式
                "warehouse": [], // 发货库位
                "auditState": [], // 审核状态
                "receiptStatus": [], // 收货状态
                "supplier": [], // 收货店铺
                "littleSelect": [] // 小类的下拉框
            },
            "queryList": [], // 查询列表
            "selectObject": { // 选择数据
                "warehouse": null, // 发货库位
                "auditState": null, // 审核状态
                "receiptStatus": null, // 收货状态
                "supplier": null // 收货店铺
            },
            "showList": [], // 单据列表
            "datas": {
                "shopList": [], // 店铺列表
                "audits": [
                    // {
                    //     "name": "全部状态",
                    //     "type": "-1"
                    // },
                    {
                        "name": "待审核",
                        "type": "1"
                    },
                    {
                        "name": "审核中",
                        "type": "2"
                    },
                    {
                        "name": "已审核",
                        "type": "3"
                    }
                ],
                "receiptStatus": [
                    {
                        "name": "未收货",
                        "type": "1"
                    },
                    {
                        "name": "已收货",
                        "type": "2"
                    }
                ],
                "supplierList": [
                    {
                        "name": "已收银",
                        "type": "1"
                    },
                    {
                        "name": "待收银",
                        "type": "2"
                    }
                ]
            },
            "newPopup": { // 新建单据的弹窗
                "main": false // 新建的弹窗
            },
            "popup": { // 弹窗
                "productClass": false, // 产品类型
                "supplierAnRepository": false, // 供应商和库位
                "deleteReceipts": false, // 删除单据弹窗
                "receiptsOrderNum": null, // 操作的单据号
                "auditsReceiptsForm": null, // 操作1 删除 3 取消审核 4 驳回审核 5 通过审核 6 撤销审核
                "auditPopup": false, // 审核弹窗
                "takeDeliveryOfGoodsPopup": false // 收货弹窗
            },
            "seekNumber": "", // 搜索单据号
            "page": 1,
            companyPosition: '',
            multipleIdentities: '',
            
            optionData : {
               storage : '', //发货库位 
               auditStatus :'',  //审核状态
               receivingStatus :'',  //收货状态
               receivingShop : '',//收货店铺
                beginTime: '',
                endTime: '',
            }
        }
    },
    created () {
        // this.filterFun(this.cbFun); // 获取单据列表
        this.workRepositoryList(); // 库位列表
        this.getShopListByCo(); // 店铺列表
        this.workProductClass(); // 产品类别
        this.workSupplierList(); // 供应商
        this.companyPosition = sessionStorage.getItem('companyPosition')
        this.multipleIdentities = sessionStorage.getItem('multipleIdentities')
    },
    mounted () {
        let self = this
        $(".receipts-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: 'y',
            scrollInertia:100, //滚动条移动速度，数值越大滚动越慢
            mouseWheel: {
                scrollAmount: 200,
                preventDefault: false,
                normalizeDelta: false
            },
            callbacks: {
                onTotalScroll: function () {
                    console.log(11111)
                    self.filterFun(self.cbFun);
                }
            }
        });
    },
    computed: {
        ...mapGetters([
            "repositoryList", // 库位列表
            "shopListByCo", // 店铺列表
            "productClass", // 产品类别
            "supplierListData", // 供应商
            "userPositionInfo" // 职位信息
        ]),
        computedRole: function () { // 公司
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
            }
        },
        shopRole: function () { // 店员
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
        computedManageRole: function () { // 公司管理员
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionComputedManageRole(this.userPositionInfo.roleList);
            }
        }
    },
    watch: {
        'selectPopup': function () {
            if (this.selectPopup) {
                this.recordData();
            } else {
                this.rollBackData();
            }
        }
    },
    methods: {
        ...mapActions([
            "workRepositoryList", // 库位列表
            "getShopListByCo", // 店铺列表
            "workProductClass", // 产品类别
            "workSupplierList" // 供应商
        ]),
        /**
         * 日期改变事件
         */
        changeDate(parm) {
            this.optionData.beginTime = parm.beginTime
            this.optionData.endTime = parm.endTime
            this.page = 1
            this.showList = []
            this.filterFun(this.cbFun); // 获取单据列表
            // this.getList();
        },
        closePopup (parm) { // 关闭新建弹窗
            this.newPopup.main = parm;
        },
        delectReceiptCb (Index) { // 删除单据
            this.totalNum -= 1;
        },
        outHeaderSeslectBody () { // 关闭选择框
            this.isSeslectBody = false;
            this.selectPopup = false;
        },
        openSelectBody () { // 打开下拉内容标识
            this.isSeslectBody = true;
        },
        recordData () {
            let selectData = JSON.stringify([this.selectData]);
            this.selectRecord = JSON.parse(selectData)[0];
        },
        rollBackData () {
            let selectRecord = JSON.stringify([this.selectRecord]);
            this.selectData = JSON.parse(selectRecord)[0];
        },
        restoreData () { // 还原数据
            this.page = 1;
            this.showList = [];
        },
        seekFun () { // 通过单据号查询
            this.showList = [];
            this.restoreData();
            this.filterFun();
        },
        onScroll (e) { // 滚动加载
            var scrollHeight = e.currentTarget.scrollHeight; // 元素可以滚动的高度
            var clientHeight = e.currentTarget.clientHeight; // 元素的高度
            var scrollTop = e.currentTarget.scrollTop; // 滚动了的距离
            if (clientHeight + scrollTop >= scrollHeight) {
                this.filterFun(this.cbFun);
            }
        },
        cbFun () { // 滚动页数变动
            this.page += 1;
        },
        newReceipt (parm) { // 新建单据
            this.newPopup.main = true;
        },
        delectReceiptsState (parm) { // 监听确认删除弹窗和操作成功
            if (parm.type === "2") { // 单据操作成功/删除成功
                this.showList = [];
                this.filterFun();
            }
            this.popup.deleteReceipts = parm.name;
            this.popup.auditPopup = parm.name;
            this.popup.takeDeliveryOfGoodsPopup = parm.name
        },
        getOptionsName (parm, receiptStatus) { // 操作名字
            return receiptOptionsName(parm);
        },
        getState (parm, receiptStatus) { // 审核状态
            switch (parm) {
                case "1":
                    return "./../../../../static/img/audit-1.png";
                case "2":
                    return "./../../../../static/img/audit-2.png";
                case "3":
                    if (receiptStatus === "1") {
                        return "./../../../../static/img/audit-5.png";
                    } else {
                        return "./../../../../static/img/audit-4.png";
                    }
            }
        },
        openSelect () { // 打开下拉框(全部)
            this.selectPopup = true;
        },
        outSeslect () {
            let _self = this;
            setTimeout(function() {
                if (!_self.isSeslectBody) {
                    _self.selectPopup = false;
                }
            }, 300)
        },
        openList (parm) { // 打开下拉框(小类的)
            this.outList();
            Vue.set(this.selectData.littleSelect, parm, true);
        },
        outList () { // 关闭下拉框(小类)
            this.selectData.littleSelect = [];
        },
        resetQuery () { // 重置
            this.selectData.warehouse = []; // 发货库位
            this.selectData.auditState = []; // 审核状态
            this.selectData.supplier = []; // 收货店铺
            this.selectObject.warehouse = null; // 发货库位
            this.selectObject.auditState = null; // 审核状态
            this.selectObject.supplier = null; // 收货店铺
        },
        closeSeek () { // 关闭查询
            this.seekNumber = "";
            this.restoreData();
            this.filterFun();
        },
        filterFun (cbFun) { // 定位选择的过滤数据
            var warehouse = null; // 发货库位
            var auditState = null; // 审核状态
            var receiptStatus = null; // 收货状态
            var supplier = null; // 收货店铺
            if (this.selectObject.warehouse) { // 发货库位
                warehouse = this.selectObject.warehouse.repositoryId;
            }
            if (this.selectObject.auditState) { // 审核状态
                auditState = this.selectObject.auditState.type;
            }
            if (this.selectObject.receiptStatus) { // 收货状态
                receiptStatus = this.selectObject.receiptStatus.type;
            }
            if (this.selectObject.supplier) { // 收货店铺
                supplier = this.selectObject.supplier.shopId;
            }
            let options = {
                "orderBy": "2", // 1智能排序2按制单时间倒序3按制单时间升序4按审核状态排列
                "shopId": supplier || "-1", // 店铺ID
                "checkType": auditState || "-1", // 审核状态-1，全部状态1，待审核2，审核中3，已审核
                "storageId": warehouse || "-1", // 发货库位
                "receiptStatus": receiptStatus || "-1", // 收货状态
                "orderNum": this.seekNumber || "",
                "beginTime": this.optionData.beginTime,
                "endTime": this.optionData.endTime,
                "page": this.page || "1",
                "pageSize": "30"
            }
            seekSendStorageList(options).then((response) => {
                if (response.data.state === 200) {
                    this.showList.push(...response.data.data.orderList);
                    this.totalNum = Number(response.data.data.totalNum);
                    if (response.data.data.orderList.length > 0) {
                        if (cbFun) {
                            cbFun();
                        }
                    }
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                console.log(response);
            })
        },
        confirm () { // 确定
            this.selectPopup = false;
            this.isSeslectBody = false;
            this.queryList = [];
            for (var i of Object.keys(this.selectObject)) {
                if (this.selectObject[i]) {
                    this.queryList.push(this.selectObject[i]);
                }
            }
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        cutAuditsData (item2, index2, index, typeName) { // 切换审核状态(小类)
            this.queryList[index].name = item2.name;
            this.queryList[index].type = item2.type;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        cutWarehouseData (item2, index2, index, typeName) { // 切换发货库位(小类)
            this.restoreData();
            this.queryList[index].name = item2.repositoryName;
            this.queryList[index].id = item2.repositoryId;
            this.amendFun(item2, index2, typeName);
            this.filterFun();
            this.outList();
        },
        cutShopByCo (item2, index2, index, typeName) { // 切换收货店铺
            this.restoreData();
            this.queryList[index].shopName = item2.shopName;
            this.queryList[index].shopId = item2.shopId;
            this.amendFun(item2, index2, typeName);
            this.filterFun();
            this.outList();
        },
        amendFun (item2, index2, typeName) { // 修改选择数据item2, index, typeName
            switch (typeName) {
                case "审核状态":
                    this.selectData.auditState = [];
                    Vue.set(this.selectData.auditState, index2, true);
                    this.selectObject.auditState = item2;
                    break;
                case "发货库位":
                    this.selectData.warehouse = [];
                    Vue.set(this.selectData.warehouse, index2, true);
                    this.selectObject.warehouse = item2;
                    break;
                case "收货店铺":
                    this.selectData.supplier = [];
                    Vue.set(this.selectData.supplier, index2, true);
                    this.selectObject.supplier = item2;
                    break;
            }
        },
        delectQuery (parm, item) { // 删除一条选中数据
            Vue.delete(this.queryList, parm);
            switch (item.typeName) {
                case "收货店铺":
                    this.selectData.supplier = [];
                    this.selectObject.supplier = null;
                    break;
                case "发货库位":
                    this.selectData.warehouse = [];
                    this.selectObject.warehouse = null;
                    break;
                case "审核状态":
                    this.selectData.auditState = [];
                    this.selectObject.auditState = null;
                    break;
            }
            this.restoreData();
            this.filterFun();
        },
        emptyQuery () { // 清空查询筛选条件
            this.queryList = [];
            this.filterFun();
        },
        getWarehouseId (parm, index) { // 选择发货库位
            let selectObject = {
                "typeName": "发货库位",
                "name": parm.repositoryName,
                "repositoryId": parm.repositoryId
            }
            this.optionData.storage = parm.repositoryName
            this.selectObject.warehouse = selectObject;
            this.selectData.warehouse = [];
            Vue.set(this.selectData.warehouse, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getAllquery (parm,pm) { // 全选
            this.selectData[parm] = [];
            this.selectObject[parm] = null;
            this.optionData[pm] = ''
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getSort (parm, index) { // 审核状态
            let selectObject = {
                "typeName": "审核状态",
                "name": parm.name,
                "type": parm.type
            }
            this.optionData.auditStatus = parm.name
            this.selectObject.auditState = selectObject;
            this.selectData.auditState = [];
            Vue.set(this.selectData.auditState, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getReceiptStatus (parm, index) { // 收货状态
            let selectObject = {
                "typeName": "收货状态",
                "name": parm.name,
                "type": parm.type
            }
            this.optionData.receivingStatus = parm.name
            this.selectObject.receiptStatus = selectObject;
            this.selectData.receiptStatus = [];
            Vue.set(this.selectData.receiptStatus, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getsupplier (parm, index) { // 收货店铺
            let selectObject = {
                "typeName": "收货店铺",
                "shopName": parm.shopName,
                "shopId": parm.shopId
            }
            this.optionData.receivingShop = parm.shopName
            this.selectObject.supplier = selectObject;
            this.selectData.supplier = [];
            Vue.set(this.selectData.supplier, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        delectProduct (parm) { // 删除商品
            let _seft = this;
            let options = {
                "orderNum": parm
            }
            operateDelReceipt(options).then(response => {
                if (response.data.state === 200) {
                    this.$store.dispatch('workPopupError', "删除成功");
                    _seft.getAll(); // 待会改不请求
                    // alert("删除成功")
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, response => {
                console.log(response)
            })
        },
        auditFun (checkType, orderNum) { // 提交审核
            this.popup.receiptsOrderNum = orderNum;
            this.popup.auditsReceiptsForm = checkType;
            this.popup.auditPopup = true;
        },
        operateTakeOrderFun (orderNum) {
            this.popup.receiptsOrderNum = orderNum;
            this.popup.auditsReceiptsForm = "9";
            this.popup.auditPopup = true;
        },
        delectReceipts (parm) {
            this.popup.deleteReceipts = true;
            this.popup.receiptsOrderNum = parm;
        }
    }
}
</script>
<style src="../../../assets/css/template/receiptsList.scss" lang="scss" scoped></style>