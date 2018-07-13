<template>
    <div class="receipts-main">
        <div class="header-options dayinMain">
                <!-- 头部的上 -->
            <div class="header-options-top skin-shield">
                <div class="tittle-wrap">
                    <i class="iconfont icon-tiaoku"></i>
                    <div>调库</div>
                </div>
                <div class="optionWrap">
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.storage == '' ? '' : 'select'">
                           {{optionData.storage == '' ? '调入库位' : optionData.storage}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.storage ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('warehouse','storage')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getWarehouseId(item, index)"  :key="index"
                                :class = "optionData.storage == item.repositoryName ? 'active' :''"
                                v-for="(item, index) in repositoryList">
                                {{item.repositoryName}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.storageOut == '' ? '' : 'select'">
                           {{optionData.storageOut == '' ? '调出库位' : optionData.storageOut}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.storageOut ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('warehouseOut','storageOut')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getSort(item, index)"  :key="index"
                                :class = "optionData.storageOut == item.repositoryName ? 'active' :''"
                                v-for="(item, index) in repositoryList">
                                {{item.repositoryName}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.commodityAttr == '' ? '' : 'select'">
                           {{optionData.commodityAttr == '' ? '商品属性' : optionData.commodityAttr}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.commodityAttr ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('commodityAttr','commodityAttr')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getsupplier(item, index)" :key="index"
                                :class = "optionData.commodityAttr == item.name ? 'active' :''"
                                v-for="(item, index) in datas.productTypeList">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.reStatus == '' ? '' : 'select'">
                           {{optionData.reStatus == '' ? '收货状态' : optionData.reStatus}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.reStatus ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('reStatus','reStatus')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getReStatus(item, index)" :key="index"
                                :class = "optionData.reStatus == item.name ? 'active' :''"
                                v-for="(item, index) in datas.reStatusList">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="optionDiv selected Rp_title_container">
                        <xj-time @change="changeDate"></xj-time>
                    </div>
                    <div class="optionDiv sell-new-data oper-btn" @click="newReceipt">
                        <span>新建调库单</span>
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
                            :Index="index" :key="index"
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
        <!-- 选择产品类别 -->
        <!-- <div class="new-receipts-wrap" v-model="newPopup.main"> -->
             <div class="new-receipts-wrap">
            <new-transfer-storage-receipts
                :newPopup="newPopup.main"
                v-on:closePopup="closePopup"
            ></new-transfer-storage-receipts>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapActions} from "vuex"
import {seekGetShopListByCo, seekTuneStorageList} from './../../../Api/commonality/seek'
import {receiptOptionsName} from './../../../Api/commonality/status'
import auditReceipts from './../../Work/CommonalityComponent/popupTemplate/AuditReceipts'
import newTransferStorageReceipts from '../../../components/work/NewTransferStorageReceipts' // 新建单据
import EmptyReceiptsTemplate from '../../../components/EmptyDataTemplate/EmptyReceiptsTemplate.vue'
import * as jurisdictions from '../../../Api/commonality/jurisdiction'
import xjTime from 'base/time/xj-time'
import receiptsList from './ReceiptsList.vue'
export default {
    components: {
        auditReceipts,
        newTransferStorageReceipts,
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
                "warehouse": [], // 调入库位
                "warehouseOut": [], // 调出库位
                "commodityAttr": [], // 商品属性
                "reStatus": [],
                "littleSelect": [] // 小类的下拉框
            },
            "queryList": [], // 查询列表
            "selectObject": { // 选择数据
                "warehouse": null, // 调入库位
                "warehouseOut": null, // 调出库位
                "commodityAttr": null // 商品属性
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
                "supplierId": "", // 商品属性ID
                "productTypeId": "", // 产品类别ID
                "repositoryId": "", // 库位ID
                "orderNumber": null // 单据号
            },
            "showList": [], // 单据列表
            "datas": {
                "shopList": [], // 店铺列表
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
                'reStatusList': [
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
            "seekNumber": "", // 搜索单据号
            "monitorScroll": 0,
            "page": 1,
            
            optionData : {
                storage : '', //调入库位 
                storageOut :'',  //调出库位
                commodityAttr :'',  //商品属性
                reStatus: '', // 收货状态
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
        this.workSupplierList(); // 商品属性
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
            "supplierListData", // 商品属性
            "userPositionInfo" // 职位信息
        ]),
        computedRole: function () { // 公司
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
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
            "workSupplierList" // 商品属性
        ]),
        changeDate(parm) {
            this.optionData.beginTime = parm.beginTime
            this.optionData.endTime = parm.endTime
            this.page = 1
            this.showList = []
            this.filterFun(this.cbFun); // 获取单据列表
        },
        delectOptions (parm, isRole) { // 删除权限
            return jurisdictions.jurisdictionDelectOptions(parm, isRole);
        },
        delectReceiptCb (Index) { // 删除单据
            this.totalNum -= 1;
        },
        restoreData () { // 还原数据
            this.page = 1;
            this.showList = [];
        },
        closePopup (parm) { // 关闭新建弹窗
            this.newPopup.main = parm;
        },
        seekFun () { // 通过单据号查询
            this.showList = [];
            this.filterFun();
        },
        recordData () {
            let selectData = JSON.stringify([this.selectData]);
            this.selectRecord = JSON.parse(selectData)[0];
        },
        rollBackData () {
            let selectRecord = JSON.stringify([this.selectRecord]);
            this.selectData = JSON.parse(selectRecord)[0];
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
        getOptionsName (parm) { // 操作名字
            return receiptOptionsName(parm);
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
            var warehouse = null; // 调入库位
            var warehouseOut = null; // 调出库位
            var productType = null; // 商品属性
            var reStatus = null;
            if (this.selectObject.warehouse) { // 调入库位
                warehouse = this.selectObject.warehouse.repositoryId;
            }
            if (this.selectObject.warehouseOut) { // 调出库位
                warehouseOut = this.selectObject.warehouseOut.repositoryId;
            }
            if (this.selectObject.commodityAttr) { // 商品属性
                productType = this.selectObject.commodityAttr.type;
            }
            if (this.selectObject.reStatus) { // 商品属性
                reStatus = this.selectObject.reStatus.type;
            }
            let options = {
                "orderBy": "2", // 1智能排序2按制单时间倒序3按制单时间升序
                "storageId": warehouse || "-1", // 调入库位
                "storageId2": warehouseOut || "-1", // 调出库位
                "productProperty": productType || "-1", // 1成品2旧料
                "receiptStatus": reStatus || "-1", // 1未收货2已收货
                "orderNum": this.seekNumber || "",
                "beginTime": this.optionData.beginTime,
                "endTime": this.optionData.endTime,
                "page": this.page || "1",
                "pageSize": "100"
            }
            seekTuneStorageList(options).then((response) => {
                if (response.data.state === 200) {
                    console.log(response);
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
        outHeaderSeslectBody () { // 关闭选择框
            this.selectPopup = false;
        },
        openSelectBody () { // 打开下拉内容标识
            this.isSeslectBody = true;
        },
        confirm () { // 确定
            this.selectPopup = false;
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
            this.restoreData();
            this.queryList[index].name = item2.repositoryName;
            this.queryList[index].id = item2.repositoryId;
            this.amendFun(item2, index2, typeName);
            this.filterFun();
            this.outList();
        },
        cutWarehouseData (item2, index2, index, typeName) { // 切换调入库(小类)
            this.restoreData();
            this.queryList[index].name = item2.repositoryName;
            this.queryList[index].id = item2.repositoryId;
            this.amendFun(item2, index2, typeName);
            this.filterFun();
            this.outList();
        },
        cutShopByCo (item2, index2, index, typeName) { // 切换商品属性
            this.restoreData();
            this.queryList[index].name = item2.name;
            this.queryList[index].id = item2.type;
            this.amendFun(item2, index2, typeName);
            this.filterFun();
            this.outList();
        },
        amendFun (item2, index2, typeName) { // 修改选择数据item2, index, typeName
            switch (typeName) {
                case "调出库位":
                    this.selectData.warehouseOut = [];
                    Vue.set(this.selectData.warehouseOut, index2, true);
                    this.selectObject.warehouseOut = item2;
                    break;
                case "调入库位":
                    this.selectData.warehouse = [];
                    Vue.set(this.selectData.warehouse, index2, true);
                    this.selectObject.warehouse = item2;
                    break;
                case "商品属性":
                    this.selectData.productType = [];
                    Vue.set(this.selectData.productType, index2, true);
                    this.selectObject.productType = item2;
                    break;
            }
        },
        delectQuery (parm, item) { // 删除一条选中数据
            Vue.delete(this.queryList, parm);
            switch (item.typeName) {
                case "商品属性":
                    this.selectData.productType = [];
                    this.selectObject.productType = null;
                    break;
                case "调入库位":
                    this.selectData.warehouse = [];
                    this.selectObject.warehouse = null;
                    break;
                case "调出库位":
                    this.selectData.warehouseOut = [];
                    this.selectObject.warehouseOut = null;
                    break;
            }
            this.filterFun();
        },
        emptyQuery () { // 清空查询筛选条件
            this.queryList = [];
            this.filterFun();
        },
        getWarehouseId (parm, index) { // 选择调入库
            console.log(11)
            let selectObject = {
                "typeName": "调入库位",
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
            console.log(this.selectObject)
            this.selectData[parm] = [];
            this.selectObject[parm] = null;
            this.optionData[pm] = ''
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getSort (parm, index) { // 调出库位
            let selectObject = {
                "typeName": "调出库位",
                "name": parm.repositoryName,
                "repositoryId": parm.repositoryId
            }
            this.optionData.storageOut = parm.repositoryName
            this.selectObject.warehouseOut = selectObject;
            this.selectData.warehouseOut = [];
            Vue.set(this.selectData.warehouseOut, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getReStatus (parm, index) { // 商品属性
            let selectObject = {
                "typeName": "收货状态",
                "name": parm.name,
                "type": parm.type
            }
            this.optionData.reStatus = parm.name
            this.selectObject.reStatus = selectObject;
            this.selectData.reStatus = [];
            Vue.set(this.selectData.reStatus, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getsupplier (parm, index) { // 商品属性
            console.log(parm)
            let selectObject = {
                "typeName": "商品属性",
                "name": parm.name,
                "type": parm.type
            }
            
            this.optionData.commodityAttr = parm.name
            this.selectObject.commodityAttr = selectObject;
            this.selectData.commodityAttr = [];
            Vue.set(this.selectData.commodityAttr, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getShopList () { // 店铺列表
            let options = "";
            let _self = this;
            seekGetShopListByCo(options).then((response) => {
                console.log("店铺列表")
                console.log(response)
                if (response.data.state === 200) {
                    _self.datas.shopList = response.data.data.shopList;
                    if (response.data.data.shopList.length === 1) { // 只有一个店铺的情况下
                        _self.onData.shopId = response.data.data.shopList[0].shopId;
                    }
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                console.log("cuo店铺列表")
                console.log(response);
            });
        },
        collectMoney () { // 待收银
            this.$store.dispatch('workPopupError', "待收银");
        }
    }
}
</script>
<style src="../../../assets/css/template/receiptsList.scss" lang="scss" scoped></style>