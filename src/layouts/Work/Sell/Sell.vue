<template>
    <div class="receipts-main">
        <div class="header-options">
            <!-- 头部的上 -->
            <div class="header-options-top skin-shield">
                <div class="tittle-wrap">
                    <i class="iconfont icon-xiaoshou"></i>
                    <div>销售</div>
                </div>
                <div class="optionWrap">
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.shop == '' ? '' : 'select'">
                           {{optionData.shop == '' ? '店铺' : optionData.shop}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.shop ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('warehouse','shop')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getShopId(item, index)" :key="index"
                                :class = "optionData.shop == item.shopName ? 'active' :''"
                                v-for="(item, index) in shopListByCo">
                                {{item.shopName}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.sort == '' ? '' : 'select'">
                           {{optionData.sort == '' ? '排序' : optionData.sort}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.sort ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('sortSelect','sort')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getSort(item, index)" :key="index"
                                :class = "optionData.sort == item.name ? 'active' :''"
                                v-for="(item, index) in datas.times">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <span class="spaceMark">|</span>
                    <div class="optionDiv selected">
                        <span  class="title-name" :class="optionData.collect == '' ? '' : 'select'">
                           {{optionData.collect == '' ? '收银' : optionData.collect}}
                          <i class="iconfont icon-arrow-down" v-if="optionData.collect ==''"></i>
                          <i class="el-icon-circle-close" @click="getAllquery('monnyState','collect')" title="清除" v-else></i>
                        </span>
                        <ul>
                            <li 
                                @click="getMonnyState(item, index)" :key="index"
                                :class = "optionData.collect == item.name ? 'active' :''"
                                v-for="(item, index) in datas.monnyStateList">
                                {{item.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="optionDiv sell-new-data oper-btn" @click="newReceipt" v-if="userType && userType != 'undefined' && (multipleIdentities == 'Y' || userType != 1)">
                        <span>新建销售单</span>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog customClass="newPopupDig" :visible.sync="dialogTableVisible" size="tiny">
            <!--<ul style="display: flex; justify-content: center; ">
                <li @click="sureAct(item)" style="height: 30px; padding: 3px 6px; border: 1px solid #ddd; border-radius: 4px; text-align: center; font-weight: bold; cursor: pointer; font-size: 14px;" v-for="(item, index) in shopListByCo">{{item.shopName}}</li>
            </ul>-->
            <div slot="title" class="title">
                <img src="./../../../../static/img/piliang.png">
            </div>
            <div class="body">
                <div class="classes-block">
                    <div class="title">选择店铺</div>
                    <ul class="list">
                        <li v-for="(item, index) in shopListByCo" :key="index" @click="sureAct(item)">{{item.shopName}}</li>
                    </ul>
                </div>
            </div>
        </el-dialog>
        <div class="receipts-list" @scroll="onScroll($event)">
            <div>
                <template>
                    <template v-if="item" v-for="item in showList">
                        <receipts-list 
                            :item="item"
                            :shopRole="shopRole">
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
    </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapActions} from "vuex"
import {seekGetShopListByCo, seekGoodsSellOrder} from 'Api/commonality/seek'
import {operateDelReceipt, operateCreateSellOrder} from 'Api/commonality/operate'
import {statusCashStatus} from 'Api/commonality/status'
import receiptsList from './receiptsList'
import EmptyReceiptsTemplate from 'components/EmptyDataTemplate/EmptyReceiptsTemplate.vue'
import * as jurisdictions from 'Api/commonality/jurisdiction'
export default {
    data () {
        return {
            dialogTableVisible:false,
            userType: '',
            multipleIdentities: '',
            "selectPopup": false, // 选择下拉框
            "isSeslectBody": false, // 移入选择内容框
            "selectData": { // 选择样式
                "monnyState": [], // 收银
                "sortSelect": [], // 排序
                "warehouse": [], // 店铺
                "supplier": [], // 供应商
                "littleSelect": [] // 小类的下拉框
            },
            "queryList": [], // 查询列表
            "selectObject": { // 选择数据
                "monnyState": null, // 收银
                "sortSelect": null, // 排序
                "warehouse": null, // 店铺
                "supplier": null // 供应商
            },
            "onData": { // 下拉选中数据
                "shopId": "", // 店铺
                "timeType": "" // 时间
            },
            "popupData": { // 过滤
                "shipmentsId": null, // 发货id
                "auditType": null // 审核状态
            },
            "onClass": { // 选中的class
                "one": false,
                "two": false,
                "three": false
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
                "times": [
                    // {
                    //     "type": "3",
                    //     "name": "默认顺序"
                    // },
                    {
                        "type": "3",
                        "name": "按制单时间正序"
                    },
                    {
                        "type": "2",
                        "name": "按制单时间倒序"
                    },
                    {
                        "type": "4",
                        "name": "按收银时间正序"
                    }
                ],
                "monnyStateList": [
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
            peoType: '',
            totalNum:'',
            optionData : {
               shop : '', //店铺 
               sort :'',  //排序
               collect :''  //收银
            }
        }
    },
    components: {
        receiptsList,
        EmptyReceiptsTemplate
    },
    created () {
        this.filterFun(this.cbFun); // 获取单据列表
        this.workRepositoryList(); // 库位列表
        this.getShopListByCo(); // 店铺列表
        this.workProductClass(); // 产品类别
        this.workSupplierList(); // 供应商
        this.userType = sessionStorage.getItem('userType')
        this.multipleIdentities = sessionStorage.getItem('multipleIdentities')
        this.peoType = sessionStorage.getItem('companyPosition')
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
            "supplierListData", // 供应商
            "userPositionInfo" // 职位信息
        ]),
        shopRole: function () { // 店员
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
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
        sureAct (parm) {
            var options = {
                "shopId": parm.shopId
            }
            operateCreateSellOrder(options).then((response) => {
                if (response.data.state === 200) {
                    this.$router.push({
                        path: "/work/sell/sellReceiptsList",
                        query: {
                            orderNumber: response.data.data.orderNum
                        }
                    })
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
            })
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
        openSelect () { // 打开下拉框(全部)
            this.selectPopup = true;
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
        cbFun () { // 滚动页数变动
            this.page += 1;
        },
        closePopup (parm) { // 关闭新建弹窗
            this.newPopup.main = parm;
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
            console.log(scrollTop)
            if (clientHeight + scrollTop >= scrollHeight) {
                this.filterFun(this.cbFun);
            }
        },
        newReceipt (parm) { // 新建单据
        		console.log(this.shopListByCo)
            if (this.shopListByCo.length <= 1) {
                this.sureAct(this.shopListByCo[0])
            } else {
                this.dialogTableVisible = true
                this.newPopup.main = true;
            } 
        },
        delectReceiptsState (parm) { // 监听确认删除弹窗
            if (parm.type === "2") { // 单据删除成功
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
            return statusCashStatus(parm);
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
            this.selectData.sortSelect = []; // 排序
            this.selectData.warehouse = []; // 店铺
            this.selectData.monnyState = []; // 收银
            this.selectObject.sortSelect = null;
            this.selectObject.warehouse = null;
            this.selectObject.monnyState = null;
        },
        closeSeek () { // 关闭查询
            this.seekNumber = "";
            this.restoreData();
            this.filterFun();
        },
        filterFun (cbFun) { // 定位选择的过滤数据
            var warehouse = null; // 店铺
            var sortSelect = null; // 排序
            var monnyState = null; // 收银
            if (this.selectObject.warehouse) { // 店铺
                warehouse = this.selectObject.warehouse.id;
            }
            if (this.selectObject.sortSelect) { // 排序
                sortSelect = this.selectObject.sortSelect.type;
            }
            if (this.selectObject.monnyState) { // 供应商
                monnyState = this.selectObject.monnyState.id;
            }
            let options = {
                "shopId": warehouse || "-1", // 店铺ID；若为-1，则为全部店铺
                "cashStatus": monnyState || "-1", // 收银状态：-1全部1 已收银2 未收银
                "orderBy": sortSelect || "2",
                "orderNum": this.seekNumber || "",
                "page": this.page || "1",
                "pageSize": "30"
            }
            seekGoodsSellOrder(options).then((response) => {
                if (response.data.state === 200) {
                    this.totalNum = Number(response.data.data.totalNum);
                    this.showList.push(...response.data.data.orderList);
                    if (response.data.data.orderList.length > 0) {
                        if (cbFun) {
                            cbFun();
                        }
                    }
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
            })
        },
        outHeaderSeslectBody () { // 关闭选择框
            this.selectPopup = false;
            this.isSeslectBody = false;
        },
        openSelectBody () { // 打开下拉内容标识
            this.isSeslectBody = true;
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
        cutShopData (item2, index2, index, typeName) { // 切换店铺(小类)
            this.queryList[index].name = item2.shopName;
            this.queryList[index].id = item2.shopId;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        cutMonny (item2, index2, index, typeName) { // 切换收银状态
            this.queryList[index].name = item2.name;
            this.queryList[index].id = item2.type;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        cutSortData (item2, index2, index, typeName) { // 切换排序(小类)
            this.queryList[index].name = item2.name;
            this.queryList[index].id = item2.type;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        cutShopByCo (item2, index2, index, typeName) { // 切换供应商
            this.queryList[index].name = item2.shopName;
            this.queryList[index].id = item2.shopId;
            this.amendFun(item2, index2, typeName);
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        amendFun (item2, index2, typeName) { // 修改选择数据item2, index, typeName
            switch (typeName) {
                case "排序":
                    this.selectData.sortSelect = [];
                    Vue.set(this.selectData.sortSelect, index2, true);
                    this.selectObject.sortSelect = item2;
                    break;
                case "入库库位":
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
                case "入库库位":
                    this.selectData.warehouse = [];
                    this.selectObject.warehouse = null;
                    break;
                case "排序":
                    this.selectData.sortSelect = [];
                    this.selectObject.sortSelect = null;
                    break;
            }
            this.filterFun();
        },
        emptyQuery () { // 清空查询筛选条件
            this.queryList = [];
            this.filterFun();
        },
        getShopId (parm, index) { // 选择店铺
            let selectObject = {
                "typeName": "店铺",
                "name": parm.shopName,
                "id": parm.shopId
            }
            this.optionData.shop = parm.shopName
            this.selectObject.warehouse = selectObject;
            this.selectData.warehouse = [];
            Vue.set(this.selectData.warehouse, index, true)
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        getAllquery (parm,pm) { // 全选
            this.selectData[parm] = [];
            this.selectObject[parm] = null;
            this.optionData[pm] = ''
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        getSort (parm, index) { // 排序
            let selectObject = {
                "typeName": "排序",
                "name": parm.name,
                "type": parm.type
            }
            this.optionData.sort = parm.name
            this.selectObject.sortSelect = selectObject;
            this.selectData.sortSelect = [];
            Vue.set(this.selectData.sortSelect, index, true)
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        getMonnyState (parm, index) { // 收银状态
            let selectObject = {
                "typeName": "收银",
                "name": parm.name,
                "id": parm.type
            }
            this.optionData.collect = parm.name
            this.selectObject.monnyState = selectObject;
            this.selectData.monnyState = [];
            Vue.set(this.selectData.monnyState, index, true)
            this.restoreData();
            this.filterFun();
            this.outList();
        },
        getsupplier (parm, index) { // 供应商
            let selectObject = {
                "typeName": "供应商",
                "name": parm.supplierName,
                "id": parm.supplierId
            }
            this.selectObject.supplier = selectObject;
            this.selectData.supplier = [];
            Vue.set(this.selectData.supplier, index, true)
            this.restoreData();
            this.filterFun();
            this.outList();
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
            });
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
            })
        },
        delectReceipts (parm) {
            this.popup.deleteReceipts = true;
            this.popup.receiptsOrderNum = parm;
        }
    }
}
</script>
<style lang="scss" src="./../../../components/work/newPopup.scss"></style>
<style src="../../../assets/css/template/receiptsList.scss" lang="scss" scoped></style>