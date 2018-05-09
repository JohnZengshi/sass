<template>
    <div class="receipts-main">
        <div class="header-options dayinMain">
            <!-- 头部的上 -->
            <div class="header-options-top skin-shield">
                <div class="tittle-wrap">
                    <i class="iconfont icon-tuiku"></i>
                    <div>退库</div>
                </div>
                <div class="optionWrap">
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.storage == '' ? '' : 'select'">
                           {{optionData.storage == '' ? '退库库位' : optionData.storage}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.storage ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('warehouse','storage')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getWarehouseId(item, index)" 
                                :class = "optionData.storage == item.repositoryName ? 'active' :''"
                                v-for="(item, index) in repositoryList" :key="index">
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
                                v-for="(item, index) in datas.audits" :key="index">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.supplier == '' ? '' : 'select'">
                           {{optionData.supplier == '' ? '供应商' : optionData.supplier}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.supplier ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('supplier','supplier')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getsupplier(item, index)" 
                                :class = "optionData.supplier == item.supplierName ? 'active' :''"
                                v-for="(item, index) in supplierListData" :key="index">
                                {{item.supplierName}}
                            </li>
                        </ul>
                    </div>
                    <div class="optionDiv sell-new-data oper-btn" @click="newReceipt">
                        <span>新建退库单</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 单据列表 -->
        <div class="receipts-list" @scroll="onScroll($event)">
            <div>
                <template v-if="totalNum > 0">   
                    <template v-if="item" v-for="(item, index) in showList">
                        <receipts-list :key="index"
                            :item="item"
                            :Index="index"
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
        <!-- 新建单据-->
        <div class="new-receipts-wrap" v-if="newPopup.main">
            <new-storage-return-receipts
                :newPopup="newPopup.main"
                v-on:closePopup="closePopup"
            >
            </new-storage-return-receipts>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapActions} from "vuex"
import {seekGetShopListByCo, seekOutStorageList} from './../../../Api/commonality/seek'
import newStorageReturnReceipts from '../../../components/work/NewStorageReturnReceipts'
import EmptyReceiptsTemplate from '../../../components/EmptyDataTemplate/EmptyReceiptsTemplate.vue'
import receiptsList from './receiptsList'
import * as jurisdictions from '../../../Api/commonality/jurisdiction'
export default {
    components: {
        newStorageReturnReceipts,
        receiptsList,
        EmptyReceiptsTemplate
    },
    data () {
        return {
            "selectPopup": false, // 选择下拉框
            "isSeslectBody": false, // 移入选择内容框
            "totalNum": "", // 单据总条数
            "selectData": { // 选择样式
                "warehouse": [], // 退库库位
                "auditState": [], // 审核状态
                "supplier": [], // 供应商
                "littleSelect": [] // 小类的下拉框
            },
            "queryList": [], // 查询列表
            "selectObject": { // 选择数据
                "warehouse": null, // 退库库位
                "auditState": null, // 审核状态
                "supplier": null // 供应商
            },
            "onData": { // 下拉选中数据
                "shopId": "", // 店铺
                "timeType": "" // 时间
            },
            "newDatas": { // 新增数据(其它页面也用到的)newDatas
                "shopId": "", // 分销商ID
                "supplierId": "", // 供应商ID
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
                "auditPopup": false // 审核弹窗
            },
            "seekNumber": "", // 搜索单据号
            "monitorScroll": 0,
            "page": 1,
            
            optionData : {
               storage : '', //退库库位 
               auditStatus :'',  //审核状态
               supplier :''  //供应商
            }
        }
    },
    created () {
        this.filterFun(this.cbFun); // 获取单据列表
        this.workRepositoryList(); // 库位列表
        this.getShopListByCo(); // 店铺列表
        this.workProductClass(); // 产品类别
        this.workSupplierList(); // 供应商
    },
    mounted () {
        let self = this
        $(".receipts-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: 'y',
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
        preciseSun (parm) { // 年
            var Year = parm.slice(0, 4);
            var Month = parm.slice(4, 6);
            var Sun = parm.slice(6, 8);
            var allTime = Year + "-" + Month + "-" + Sun;
            return allTime;
        },
        preciseMinute (parm) { // 月
            var ConfigData = parm.slice(8, 10);
            var Mour = parm.slice(10, 12);
            var allTime = ConfigData + ":" + Mour;
            return allTime;
        },
        delectReceiptCb (Index) { // 删除单据
            this.totalNum -= 1;
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
        delectOptions (parm, isRole) { // 删除权限
            if (parm === "1") { // 待审核的状态
                if (isRole === "Y") { // 后台判断有删除权限
                    return true;
                }
            } else {
                return false;
            }
        },
        recordData () {
            let selectData = JSON.stringify([this.selectData]);
            this.selectRecord = JSON.parse(selectData)[0];
        },
        rollBackData () {
            let selectRecord = JSON.stringify([this.selectRecord]);
            this.selectData = JSON.parse(selectRecord)[0];
        },
        auditStateFilter (parm, makeId, isCheckOrderMan) { // 是否可以提交审核判断
            let userId = sessionStorage.getItem("id");
            if (parm === "1") { // 待审核的状态
                if (makeId === userId) { // 制单人
                    return true;
                }
            } else {
                if (isCheckOrderMan === "Y") {
                    return true;
                }
            }
        },
        turnDownAuditStateFilter (parm, isCheckOrderMan) { // 驳回审核
            if (parm !== "1") { // 除提交审核
                if (isCheckOrderMan === "Y") { // 审核人
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        closePopup (parm) { // 关闭新建弹窗
            this.newPopup.main = parm;
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
        delectReceiptsState (parm) { // 监听确认删除弹窗
            if (parm.type === "2") { // 单据删除成功
                this.showList = [];
                this.filterFun();
            }
            this.popup.deleteReceipts = parm.name;
            this.popup.auditPopup = parm.name;
        },
        getChildCalss (parmOne, parmTwo) { // 获取产品类别名字
            this.newDatas.classesId = parmOne;
            this.newDatas.classesName = parmTwo;
        },
        getState (parm) { // 审核状态
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
        openList (parm) { // 打开下拉框(小类的)
            this.outList();
            Vue.set(this.selectData.littleSelect, parm, true);
        },
        outList () { // 关闭下拉框(小类)
            this.selectData.littleSelect = [];
        },
        resetQuery () { // 重置
            this.selectData.warehouse = [];
            this.selectData.auditState = [];
            this.selectData.supplier = [];
            this.selectObject.warehouse = null;
            this.selectObject.auditState = null;
            this.selectObject.supplier = null;
        },
        closeSeek () { // 关闭查询
            this.seekNumber = "";
            this.restoreData();
            this.filterFun();
        },
        filterFun (cbFun) { // 定位选择的过滤数据
            var warehouse = null; // 退库库位
            var auditState = null; // 审核状态
            var supplier = null; // 供应商
            if (this.selectObject.warehouse) { // 退库库位
                warehouse = this.selectObject.warehouse.repositoryId;
            }
            if (this.selectObject.auditState) { // 审核状态
                auditState = this.selectObject.auditState.type;
            }
            if (this.selectObject.supplier) { // 供应商
                supplier = this.selectObject.supplier.supplierId;
            }
            let options = {
                "orderBy": "2", // 1智能排序2按制单时间倒序3按制单时间升序4按审核状态排列
                "storageId": warehouse || "-1", // 仓库ID；若为-1，则为全部仓库
                "checkType": auditState || "-1", // 审核状态-1，全部状态1，待审核2，审核中3，已审核
                "supplierId": supplier || "-1", // 供应商ID；若为-1，则为全部供应商
                "productTypeId": "-1", // 产品类别ID；若为-1，则为全部产品
                "orderNum": this.seekNumber || "",
                "page": this.page || "1",
                "pageSize": "30",
                "productProperty": "-1"
            }
            seekOutStorageList(options).then((response) => {
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
        outHeaderSeslectBody () { // 关闭选择框
            this.selectPopup = false;
            this.isSeslectBody = false;
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
        restoreData () { // 还原数据
            this.page = 1;
            this.showList = [];
        },
        cutAuditsData (item2, index2, index, typeName) { // 切换审核状态(小类)
            this.restoreData();
            this.queryList[index].name = item2.name;
            this.queryList[index].type = item2.type;
            this.amendFun(item2, index2, typeName);
            this.filterFun();
            this.outList();
        },
        cutWarehouseData (item2, index2, index, typeName) { // 切换退库库位(小类)
            this.restoreData();
            this.queryList[index].repositoryName = item2.repositoryName;
            this.queryList[index].repositoryId = item2.repositoryId;
            this.amendFun(item2, index2, typeName);
            this.filterFun();
            this.outList();
        },
        cutShopByCo (item2, index2, index, typeName) { // 切换供应商
            this.restoreData();
            this.queryList[index].supplierName = item2.supplierName;
            this.queryList[index].supplierId = item2.supplierId;
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
                case "退库库位":
                    this.selectData.warehouse = [];
                    Vue.set(this.selectData.warehouse, index2, true);
                    this.selectObject.warehouse = item2;
                    break;
                case "供应商":
                    this.selectData.supplier = [];
                    Vue.set(this.selectData.supplier, index2, true);
                    this.selectObject.supplier = item2;
                    break;
            }
        },
        delectQuery (parm, item) { // 删除一条选中数据
            Vue.delete(this.queryList, parm);
            switch (item.typeName) {
                case "供应商":
                    this.selectData.supplier = [];
                    this.selectObject.supplier = null;
                    break;
                case "退库库位":
                    this.selectData.warehouse = [];
                    this.selectObject.warehouse = null;
                    break;
                case "审核状态":
                    this.selectData.auditState = [];
                    this.selectObject.auditState = null;
                    break;
            }
            this.filterFun();
        },
        emptyQuery () { // 清空查询筛选条件
            this.queryList = [];
            this.filterFun();
        },
        getWarehouseId (parm, index) { // 选择退库库位
            let selectObject = {
                "typeName": "退库库位",
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
            Vue.set(this.selectData.auditState, index, true);
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getsupplier (parm, index) { // 供应商
            let selectObject = {
                "typeName": "供应商",
                "supplierName": parm.supplierName,
                "supplierId": parm.supplierId
            }
            this.optionData.supplier = parm.supplierName
            this.selectObject.supplier = selectObject;
            this.selectData.supplier = [];
            Vue.set(this.selectData.supplier, index, true)
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
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                console.log("cuo店铺列表")
                console.log(response);
            });
        },
        toSellReceiptsList (parm) { // 去到单据列表
            sessionStorage.setItem("orderNumber", parm);
            this.$router.push("/work/sell/sellReceiptsList");
        },
        collectMoney () { // 待收银
            this.$store.dispatch('workPopupError', "待收银");
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
