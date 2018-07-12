<template>
    <div class="receipts-main">
         <div class="header-options dayinMain">
            <!-- 头部的上 -->
            <div class="header-options-top skin-shield">
                <div class="tittle-wrap">
                    <i class="iconfont icon-tiaogui"></i>
                    <div>调柜</div>
                </div>
                <div class="optionWrap">
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.shop == '' ? '' : 'select'">
                           {{optionData.shop == '' ? '店铺' : optionData.shop}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.shop ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('warehouseOut','shop')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getSort(item, index)" :key="index"
                                :class = "optionData.shop == item.shopName ? 'active' :''"
                                v-for="(item, index) in shopListByCo">
                                {{item.shopName}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="{active: isAllow, select : optionData.toCounter == ''}">
                           {{optionData.toCounter == '' ? '调入柜组' : optionData.toCounter}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.toCounter ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('productType','toCounter')" title="清除" v-else></i>
                        </span>
                        <ul v-if="isAllow == false">
                            <li 
                                @click="getsupplier(item, index)" :key="index"
                                :class = "optionData.toCounter == item.counterName ? 'active' :''"
                                v-for="(item, index) in datas.counterList">
                                {{item.counterName}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        
                        <span  class="title-name" :class="{active: isAllow, select : optionData.outCounter == ''}">
                           {{optionData.outCounter == '' ? '调出柜组' : optionData.outCounter}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.outCounter ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('warehouse','outCounter')" title="清除" v-else></i>
                        </span>
                        <ul v-if="isAllow == false">
                            <li 
                                @click="getWarehouseId(item, index)" :key="index"
                                :class = "optionData.outCounter == item.counterName ? 'active' :''"
                                v-for="(item, index) in datas.counterList">
                                {{item.counterName}}
                            </li>
                        </ul>
                    </div>

                    <div class="optionDiv selected Rp_title_container">
                        <xj-time @change="changeDate"></xj-time>
                    </div>

                    <div class="optionDiv sell-new-data oper-btn" @click="newReceipt" v-if="userType && userType != 'undefined' && (userType != 1 || multipleIdentities == 'Y')">
                        <span>新建调柜单</span>
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
                            :computedManageRole="computedManageRole"
                            @delectReceiptCb="delectReceiptCb">
                        </receipts-list>
                    </template>
                </template>
                <div v-else class="no-data">
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
            <new-transfer-cabinet-receipts
                :newPopup="newPopup.main"
                v-on:closePopup="closePopup"
            ></new-transfer-cabinet-receipts>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapActions} from "vuex"
import {seekGetShopListByCo, seekTuneCounterList, seekShowCounterList} from './../../../Api/commonality/seek'
import {receiptOptionsName} from './../../../Api/commonality/status'
import newTransferCabinetReceipts from '../../../components/work/NewTransferCabinetReceipts' // 新建弹窗
import EmptyReceiptsTemplate from '../../../components/EmptyDataTemplate/EmptyReceiptsTemplate.vue'
import * as jurisdictions from '../../../Api/commonality/jurisdiction'
import receiptsList from './ReceiptsList'
import xjTime from 'base/time/xj-time'
export default {
    data () {
        return {
            isAllow: true,
            userType: '',
            "selectPopup": false, // 选择下拉框
            "isSeslectBody": false, // 移入选择内容框
            "totalNum": 0, // 单据总条数
            "selectData": { // 选择样式
                "warehouse": [], // 调出柜组
                "warehouseOut": [], // 店铺
                "productType": [], // 调入柜组
                "littleSelect": [] // 小类的下拉框
            },
            "queryList": [], // 查询列表
            "selectObject": { // 选择数据
                "warehouse": null, // 调出柜组
                "warehouseOut": null, // 店铺
                "productType": null // 调入柜组
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
                "supplierId": "", // 调入柜组ID
                "productTypeId": "", // 产品类别ID
                "repositoryId": "", // 库位ID
                "orderNumber": null // 单据号
            },
            "showList": [], // 单据列表
            "datas": {
                "shopList": [], // 店铺列表
                "counterList": [], // 柜组列表
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
                "supplierAnRepository": false, // 调入柜组和库位
                "deleteReceipts": false, // 删除单据弹窗
                "receiptsOrderNum": null, // 操作的单据号
                "auditsReceiptsForm": null, // 操作1 删除 3 取消审核 4 驳回审核 5 通过审核 6 撤销审核
                "auditPopup": false // 审核弹窗
            },
            "seekNumber": "", // 搜索单据号
            "monitorScroll": 0,
            "page": 1,
            
            optionData : {
               shop : '', //店铺 
               toCounter :'',  //调入柜组
               outCounter :'',  //调出柜组
                beginTime: '',
                endTime: '',
            },
            multipleIdentities: ''
        }
    },
    components: {
        newTransferCabinetReceipts,
        receiptsList,
        EmptyReceiptsTemplate,
        xjTime
    },
    created () {
        // this.filterFun(this.cbFun); // 获取单据列表
        // this.workRepositoryList(); // 库位列表
        this.getShopListByCo(); // 店铺列表
        // this.workProductClass(); // 产品类别
        this.multipleIdentities = sessionStorage.getItem('multipleIdentities')
        this.userType = sessionStorage.getItem('userType')
        console.log('嘿呵呵呵userType',this.userType)
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
            "userPositionInfo" // 职位信息
        ]),
        computedRole: function(){ // 公司
            if(this.userPositionInfo && this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
            }
        },
        shopRole: function(){ // 店员
            if(this.userPositionInfo && this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
        computedManageRole: function(){ // 公司管理员
            if(this.userPositionInfo && this.userPositionInfo.roleList) {
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
        },
        'datas.counterList': function () {
            // console.log(111111)
            if (this.datas.counterList.length > 0) {
                this.isAllow = false
            }
        }
    },
    methods: {
        ...mapActions([
            "workRepositoryList", // 库位列表
            "getShopListByCo", // 店铺列表
            "workProductClass", // 产品类别
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
        restoreData () { // 还原数据
            this.page = 1;
            this.showList = [];
        },
        closePopup (parm) { // 关闭新建弹窗
            this.newPopup.main = parm;
        },
        getCounterList (parm) { // 柜组列表
            let options = {
                "shopId": parm // 店铺ID
            }
            seekShowCounterList(options).then((response) => {
                console.log("柜组列表");
                console.log(response);
                if (response.data.state === 200) {
                    this.datas.counterList = response.data.data.counterList;
                    console.log(this.datas.counterList)
                }
            }, (response) => {
                console.log(response)
            })
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
            var warehouse = null; // 调出柜组
            var warehouseOut = null; // 店铺
            var productType = null; // 调入柜组
            if (this.selectObject.warehouse) { // 调出柜组
                warehouse = this.selectObject.warehouse.counterId;
            }
            if (this.selectObject.warehouseOut) { // 店铺
                warehouseOut = this.selectObject.warehouseOut.shopId;
            }
            if (this.selectObject.productType) { // 调入柜组
                productType = this.selectObject.productType.counterId;
            }
            let options = {
                "orderBy": "2", // 1智能排序2按制单时间倒序3按制单时间升序
                "groupId": productType || "-1", // 调入柜组
                "groupId2": warehouse || "-1", // 调出柜组
                "shopId": warehouseOut || "-1", // 店铺ID
                "orderNum": this.seekNumber || "",
                "beginTime": this.optionData.beginTime,
                "endTime": this.optionData.endTime,
                "page": this.page || "1",
                "pageSize": "50"
            }
            seekTuneCounterList(options).then((response) => {
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
        cutWarehouseData (item2, index2, index, typeName) { // 切换调出柜组(小类)
            this.queryList[index].counterName = item2.counterName;
            this.queryList[index].counterId = item2.counterId;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        cutAuditsData (item2, index2, index, typeName) { // 切换调入柜组(小类)
            this.queryList[index].counterName = item2.counterName;
            this.queryList[index].counterId = item2.counterId;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        cutShopByCo (item2, index2, index, typeName) { // 切换调入柜组
            this.queryList[index].shopName = item2.shopName;
            this.queryList[index].shopId = item2.shopId;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        amendFun (item2, index2, typeName) { // 修改选择数据item2, index, typeName
            switch (typeName) {
                case "店铺":
                    this.selectData.warehouseOut = [];
                    Vue.set(this.selectData.warehouseOut, index2, true);
                    this.selectObject.warehouseOut = item2;
                    break;
                case "调出柜组":
                    this.selectData.warehouse = [];
                    Vue.set(this.selectData.warehouse, index2, true);
                    this.selectObject.warehouse = item2;
                    break;
                case "调入柜组":
                    this.selectData.productType = [];
                    Vue.set(this.selectData.productType, index2, true);
                    this.selectObject.productType = item2;
                    break;
            }
        },
        delectQuery (parm, item) { // 删除一条选中数据
            Vue.delete(this.queryList, parm);
            switch (item.typeName) {
                case "调入柜组":
                    this.selectData.productType = [];
                    this.selectObject.productType = null;
                    break;
                case "调出柜组":
                    this.selectData.warehouse = [];
                    this.selectObject.warehouse = null;
                    break;
                case "店铺":
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
        getSort (parm, index) { // 店铺
            this.getCounterList(parm.shopId);
            let selectObject = {
                "typeName": "店铺",
                "shopName": parm.shopName,
                "shopId": parm.shopId
            }
            this.optionData.shop = parm.shopName
            this.selectObject.warehouseOut = selectObject;
            this.selectData.warehouseOut = [];
            Vue.set(this.selectData.warehouseOut, index, true)
        },
        getWarehouseId (parm, index) { // 调出柜组
            let selectObject = {
                "typeName": "调出柜组",
                "counterName": parm.counterName,
                "counterId": parm.counterId
            }
            this.optionData.outCounter = parm.counterName
            this.selectObject.warehouse = selectObject;
            this.selectData.warehouse = [];
            Vue.set(this.selectData.warehouse, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getsupplier (parm, index) { // 调入柜组
            let selectObject = {
                "typeName": "调入柜组",
                "counterName": parm.counterName,
                "counterId": parm.counterId
            }
            this.optionData.toCounter = parm.counterName
            this.selectObject.productType = selectObject;
            this.selectData.productType = [];
            Vue.set(this.selectData.productType, index, true)
            this.restoreData();
            this.filterFun(); // 请求数据
            this.recordData();
        },
        getAllquery (parm,pm) { // 全选
            console.log(parm, pm)
            this.selectData[parm] = [];
            this.selectObject[parm] = null;
            this.optionData[pm] = ''
            if (pm == 'shop') {
                this.isAllow = true
                this.selectData.productType = [];
                this.selectObject.productType = null;
                this.selectData.warehouse = [];
                this.selectObject.warehouse = null;
                this.optionData.toCounter = ''
                this.optionData.outCounter = ''
            }
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
            this.$router.push("/work/transferCabinet/newTransferCabinet");
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