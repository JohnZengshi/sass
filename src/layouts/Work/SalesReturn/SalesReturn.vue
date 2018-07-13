<template>
    <div class="receipts-main">
        <div class="header-options">
            <!-- 头部的上 -->
            <div class="header-options-top skin-shield">
                <div class="tittle-wrap">
                    <i class="iconfont icon-tuihuo"></i>
                    <div>退货</div>
                </div>
                <div class="optionWrap">
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.storage == '' ? '' : 'select'">
                           {{optionData.storage == '' ? '收货库位' : optionData.storage}}
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
                        <span  class="title-name" :class="optionData.returnShop == '' ? '' : 'select'">
                           {{optionData.returnShop == '' ? '退货店铺' : optionData.returnShop}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.returnShop ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('warehouseOut','returnShop')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getSort(item, index)" 
                                :class = "optionData.returnShop == item.shopName ? 'active' :''"
                                v-for="(item, index) in shopListByCo">
                                {{item.shopName}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.documentStatus == '' ? '' : 'select'">
                           {{optionData.documentStatus == '' ? '单据状态' : optionData.documentStatus}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.documentStatus ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('supplier','documentStatus')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getsupplier(item, index)" 
                                :class = "optionData.documentStatus == item.name ? 'active' :''"
                                v-for="(item, index) in datas.receiptStatusList">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="optionDiv selected Rp_title_container">
                        <xj-time @change="changeDate"></xj-time>
                    </div>
                    <div class="optionDiv sell-new-data oper-btn" @click="newReceipt" v-if="shopRole">
                        <span>新建退货单</span>
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
                        :isAddRole="shopRole"
                    ></EmptyReceiptsTemplate>
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <!-- 新建 -->
        <div class="new-receipts-wrap" v-model="newPopup.main" v-if="newPopup.main">
            <new-sales-return-receipts
                :newPopup="newPopup.main"
                v-on:closePopup="closePopup"
            ></new-sales-return-receipts>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapActions} from "vuex"
import {seekGetShopListByCo, seekOutCargoList} from './../../../Api/commonality/seek'
import {operateDelReceipt} from './../../../Api/commonality/operate'
import {receiptOptionsName} from './../../../Api/commonality/status'
import newSalesReturnReceipts from '../../../components/work/NewSalesReturnReceipts' // 新建弹窗
import EmptyReceiptsTemplate from '../../../components/EmptyDataTemplate/EmptyReceiptsTemplate.vue'
import * as jurisdictions from '../../../Api/commonality/jurisdiction'
import receiptsList from './receiptsList'
import xjTime from 'base/time/xj-time'
export default {
    components: {
        newSalesReturnReceipts,
        receiptsList,
        EmptyReceiptsTemplate,
        xjTime
    },
    data () {
        return {
            userType: '',
            "selectPopup": false, // 选择下拉框
            "totalNum": "", // 单据总条数
            "isSeslectBody": false, // 移入选择内容框
            "selectData": { // 选择样式
                "warehouse": [], // 收货库位
                "warehouseOut": [], // 退货店铺
                "productType": [], // 单据状态
                "littleSelect": [] // 小类的下拉框
            },
            "queryList": [], // 查询列表
            "selectObject": { // 选择数据
                "warehouse": null, // 收货库位
                "warehouseOut": null, // 退货店铺
                "productType": null // 单据状态
            },
            "onData": { // 下拉选中数据
                "shopId": "", // 店铺
                "timeType": "" // 时间
            },
            "popupData": { // 过滤
                "shipmentsId": null, // 发货id
                "auditType": null // 调出库位
            },
            "onClass": { // 选中的class
                "one": false,
                "two": false,
                "three": false
            },
            "newDatas": { // 新增数据(其它页面也用到的)newDatas
                "shopId": "", // 分销商ID
                "supplierId": "", // 单据状态ID
                "productTypeId": "", // 产品类别ID
                "repositoryId": "", // 库位ID
                "orderNumber": null // 单据号
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
                "productTypeList": [
                    {
                        "name": "成品",
                        "type": "1"
                    },
                    {
                        "name": "旧料",
                        "type": "2"
                    }
                ],
                "receiptStatusList": [
                    {
                        "name": "未收货",
                        "type": "1"
                    },
                    {
                        "name": "已收货",
                        "type": "2"
                    }
                ]
            },
            "newPopup": { // 新建单据的弹窗
                "main": false, // 新建的弹窗
                "isShow": "receiptsClass" // 默认是产品类别
            },
            "popup": { // 弹窗
                "productClass": false, // 产品类型
                "supplierAnRepository": false, // 单据状态和库位
                "deleteReceipts": false, // 删除单据弹窗
                "receiptsOrderNum": null, // 操作的单据号
                "auditsReceiptsForm": null, // 操作1 删除 3 取消审核 4 驳回审核 5 通过审核 6 撤销审核
                "auditPopup": false // 审核弹窗
            },
            "seekNumber": "", // 搜索单据号
            "monitorScroll": 0,
            "page": 1,
            companyPosition: '',
            
            optionData : {
               storage : '', //收货库位 
               returnShop :'',  //退货店铺
               documentStatus :'',  //单据状态
                beginTime: '',
                endTime: '',
            }
        }
    },
    created () {
        // this.filterFun(this.cbFun); // 获取单据列表
        this.getShopListByCo(); // 店铺列表
        this.userType = sessionStorage.getItem('userType')
        this.companyPosition = sessionStorage.getItem('companyPosition')
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
            "supplierListData", // 单据状态
            "userPositionInfo" // 职位信息
        ]),
        shopRole: function () { // 店员
            if (this.userPositionInfo && this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
        computedRole: function () { // 公司
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
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
            "workSupplierList" // 单据状态
        ]),
        changeDate(parm) {
            this.optionData.beginTime = parm.beginTime
            this.optionData.endTime = parm.endTime
            this.page = 1
            this.showList = []
            this.filterFun(this.cbFun); // 获取单据列表
        },
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
        delectReceiptCb (Index) { // 删除单据
            this.totalNum -= 1;
        },
        recordData () {
            let selectData = JSON.stringify([this.selectData]);
            this.selectRecord = JSON.parse(selectData)[0];
        },
        rollBackData () {
            let selectRecord = JSON.stringify([this.selectRecord]);
            this.selectData = JSON.parse(selectRecord)[0];
        },
        closePopup (parm) { // 关闭新建弹窗
            this.newPopup.main = parm;
        },
        restoreData () { // 还原数据
            this.page = 1;
            this.showList = [];
        },
        seekFun () { // 通过单据号查询
            this.showList = [];
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
        getChildCalss (parmOne, parmTwo) { // 获取产品类别名字
            this.newDatas.classesId = parmOne;
            this.newDatas.classesName = parmTwo;
        },
        goDetail (orderNum) {
            sessionStorage.setItem("orderNumber", orderNum);
            this.$router.push("/work/salesReturn/newSalesReturn");
        },
        getConfigValue (parm) { // 配置产品类别
            let configName = null;
            switch (parm) {
                case '1':
                    configName = "素金类（计重）";
                    break;
                case '2':
                    configName = "珠宝类（计件）";
                    break;
                case '3':
                    configName = "饰品类（银饰 / 饰品）";
                    break;
            }
            return configName;
        },
        getOptionsName (parm) { // 操作名字
            return receiptOptionsName(parm);
        },
        getState (parm) { // 调出库位
            switch (parm) {
                case "1":
                    return "./../../../../static/img/audit-1.png";
                case "2":
                    return "./../../../../static/img/audit-2.png";
                case "3":
                    return "./../../../../static/img/audit-3.png"
            }
        },
        openSelect () { // 打开下拉框(全部)
            this.selectPopup = true;
        },
        openSelectBody () { // 打开下拉内容标识
            this.isSeslectBody = true;
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
            this.selectData.warehouse = [];
            this.selectData.warehouseOut = [];
            this.selectData.productType = [];
            this.selectObject.warehouse = null;
            this.selectObject.warehouseOut = null;
            this.selectObject.productType = null;
        },
        closeSeek () { // 关闭查询
            this.seekNumber = "";
            this.restoreData();
            this.filterFun();
        },
        filterFun (cbFun) { // 定位选择的过滤数据
            var warehouse = null; // 收货库位
            var warehouseOut = null; // 退货店铺
            var productType = null; // 单据状态
            if (this.selectObject.warehouse) { // 收货库位
                warehouse = this.selectObject.warehouse.repositoryId;
            }
            if (this.selectObject.warehouseOut) { // 退货店铺
                warehouseOut = this.selectObject.warehouseOut.shopId;
            }
            if (this.selectObject.productType) { // 单据状态
                productType = this.selectObject.productType.type;
            }
            let options = {
                "orderBy": "2", // 1智能排序2按制单时间倒序3按制单时间升序
                "shopId": warehouseOut || "-1", // 店铺ID
                "checkType": "-1", // 审核状态
                "storageId": warehouse || "-1", // 库位ID
                "receiptStatus": productType || "-1", // 收货状态
                "orderNum": this.seekNumber || "",
                "beginTime": this.optionData.beginTime,
                "endTime": this.optionData.endTime,
                "page": this.page || "1",
                "pageSize": "100",
                "productProperty": '-1'
            }
            seekOutCargoList(options).then((response) => {
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
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        outHeaderSeslectBody () { // 关闭选择框
            this.selectPopup = false;
            this.isSeslectBody = false;
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
        cutAuditsData (item2, index2, index, typeName) { // 切换调出库位(小类)
            this.queryList[index].name = item2.shopName;
            this.queryList[index].id = item2.shopId;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        cutWarehouseData (item2, index2, index, typeName) { // 切换调入库(小类)
            this.queryList[index].name = item2.repositoryName;
            this.queryList[index].id = item2.repositoryId;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        cutShopByCo (item2, index2, index, typeName) { // 切换单据状态
            this.queryList[index].name = item2.name;
            this.queryList[index].id = item2.type;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        amendFun (item2, index2, typeName) { // 修改选择数据item2, index, typeName
            switch (typeName) {
                case "退货店铺":
                    this.selectData.warehouseOut = [];
                    Vue.set(this.selectData.warehouseOut, index2, true);
                    this.selectObject.warehouseOut = item2;
                    break;
                case "收货库位":
                    this.selectData.warehouse = [];
                    Vue.set(this.selectData.warehouse, index2, true);
                    this.selectObject.warehouse = item2;
                    break;
                case "单据状态":
                    this.selectData.productType = [];
                    Vue.set(this.selectData.productType, index2, true);
                    this.selectObject.productType = item2;
                    break;
            }
        },
        delectQuery (parm, item) { // 删除一条选中数据
            Vue.delete(this.queryList, parm);
            switch (item.typeName) {
                case "单据状态":
                    this.selectData.productType = [];
                    this.selectObject.productType = null;
                    break;
                case "收货库位":
                    this.selectData.warehouse = [];
                    this.selectObject.warehouse = null;
                    break;
                case "退货店铺":
                    this.selectData.warehouseOut = [];
                    this.selectObject.warehouseOut = null;
                    break;
            }
            this.filterFun();
        },
        emptyQuery () { // 清空查询筛选条件
            this.queryList = [];
        },
        getWarehouseId (parm, index) { // 选择调入库
            let selectObject = {
                "typeName": "收货库位",
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
        getSort (parm, index) { // 退货店铺
            let selectObject = {
                "typeName": "退货店铺",
                "shopName": parm.shopName,
                "shopId": parm.shopId
            }
            this.optionData.returnShop = parm.shopName
            this.selectObject.warehouseOut = selectObject;
            this.selectData.warehouseOut = [];
            Vue.set(this.selectData.warehouseOut, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getsupplier (parm, index) { // 单据状态
            let selectObject = {
                "typeName": "单据状态",
                "name": parm.name,
                "type": parm.type
            }
            this.optionData.documentStatus = parm.name
            this.selectObject.productType = selectObject;
            this.selectData.productType = [];
            Vue.set(this.selectData.productType, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getShopList () { // 店铺列表
            let options = "";
            let _self = this;
            seekGetShopListByCo(options).then((response) => {
                if (response.data.state === 200) {
                    _self.datas.shopList = response.data.data.shopList;
                    if (response.data.data.shopList.length === 1) { // 只有一个店铺的情况下
                        _self.onData.shopId = response.data.data.shopList[0].shopId;
                    }
                } else {
                   this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            });
        },
        delectProduct (parm) { // 删除商品
            let _seft = this;
            let options = {
                "orderNum": parm
            }
            operateDelReceipt(options).then(response => {
                if (response.data.state === 200) {
                    this.$store.dispatch('workPopupError', "删除成功")
                    _seft.getAll(); // 待会改不请求
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, response => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        auditFun (checkType, orderNum) { // 提交审核
            this.popup.receiptsOrderNum = orderNum;
            this.popup.auditsReceiptsForm = checkType;
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