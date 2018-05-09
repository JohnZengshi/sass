<template>
  <div class="receipts-wrap">
    <div class="receipts-list-tittle">
        <div class="tittle-left">
            <i class="iconfont icon-danjuliebiao"></i>单据列表
        </div>
        <div class="tittle-right">
            <ul v-if="modelType == '00'">
                <li>
                    <div class="report-data">
                        <div class="block until" data-txt="至">
                            <el-date-picker size="mini" v-model="beginTime" @change="getTimeData"  type="date" placeholder="选择时间" :picker-options="pickerOptions1"></el-date-picker>
                        </div>
                        <div class="block">
                            <el-date-picker size="mini" v-model="endTime" @change="overTimeDate"  type="date" placeholder="选择时间" :picker-options="pickerOptions1"></el-date-picker>
                        </div>
                    </div>
                </li>
            </ul>
            <ul v-else>
                <li v-if="modelType == '01' || modelType == '02' || modelType == '07' || modelType == '10' || modelType == '03' || modelType == '04'">
                    <!-- <el-dropdown menu-align="start" @command="switchSearchType">
                        <span>
                            {{suppierName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item v-for="(item, index) in repositoryList" :command="item">{{item.repositoryName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <DropDownMenu
                        :titleName="suppierName"
                        dataType="库位"
                        :propList="repositoryList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                <li v-if="modelType == '07'">
                    <!-- <el-dropdown menu-align="start" @command="switchSearchType1">
                        <span>
                            调入库位<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item v-for="(item, index) in repositoryList" :command="item">{{item.repositoryName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <DropDownMenu
                        titleName="调入库位"
                        dataType="库位1"
                        :propList="repositoryList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                <li class="classBox" v-if="modelType == '01' || modelType == '02' || modelType == '03' || modelType == '04'">
                    <!-- <el-dropdown menu-align="start" @command="selectClass">
                        <span>
                            产品类别<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item command="1">计重类</el-dropdown-item>
                            <el-dropdown-item command="2">计件类</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <DropDownMenu
                        titleName="产品类别"
                        dataType="产品类别"
                        :propList="['计重类','计件类']"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                <li v-if="modelType != '06'">
                    <!-- <el-dropdown menu-align="start" @command="switchStatus">
                        <span>
                            单据状态<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item command="1">待审核</el-dropdown-item>
                            <el-dropdown-item command="2">审核中</el-dropdown-item>
                            <el-dropdown-item command="3">已审核</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <DropDownMenu
                        titleName="单据状态"
                        dataType="单据状态"
                        :propList="['待审核','审核中','已审核']"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                <li v-if="modelType == '01' || modelType == '02'">
                    <!-- <el-dropdown menu-align="start" @command="switchSupplier">
                        <span>
                            供应商<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item v-for="(item, index) in supplierListData" :command="item">{{item.supplierName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <DropDownMenu
                        titleName="供应商"
                        dataType="供应商"
                        :propList="supplierListData"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                <li v-if="modelType == '01' || modelType == '03' || modelType == '04' || modelType == '05' || modelType == '06'">
                    <!-- <el-dropdown menu-align="start" @command="switchShop">
                        <span>
                            分销商<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item v-for="(item, index) in datas.shopList" :command="item">{{item.shopName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <DropDownMenu
                        titleName="分销商"
                        dataType="分销商"
                        :propList="datas.shopList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                <!-- 调柜 -->
                <li v-if="modelType == '06'">
                    <!-- <el-dropdown menu-align="start" @command="switchCounter">
                        <span>
                            调出柜组<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item v-for="(item, index) in datas.counterList" :command="item">{{item.counterName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <DropDownMenu
                        titleName="调出柜组"
                        dataType="柜组"
                        :propList="datas.counterList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                <li v-if="modelType == '06'">
                    <!-- <el-dropdown menu-align="start" @command="switchCounter1">
                        <span>
                            调入柜组<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item v-for="(item, index) in datas.counterList" :command="item">{{item.counterName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                    <DropDownMenu
                        titleName="调入柜组"
                        dataType="柜组1"
                        :propList="datas.counterList"
                        @dropReturn="dropReturn"
                        @clearInfo="clearInfo"
                    >
                    </DropDownMenu>
                </li>
                <li>
                    <div class="report-data">
                        <div class="block until" data-txt="至">
                            <el-date-picker size="mini" v-model="beginTime" @change="getTimeData"  type="date" placeholder="选择时间" :picker-options="pickerOptions1"></el-date-picker>
                        </div>
                        <div class="block">
                            <el-date-picker size="mini" v-model="endTime" @change="overTimeDate"  type="date" placeholder="选择时间" :picker-options="pickerOptions1"></el-date-picker>
                        </div>
                    </div>
                </li>
            </ul>
             <el-select class="modal-list" @change="selectModal" v-model="modelTypeText" placeholder="请选择">
                <el-option value="00" label="全部">
                </el-option>
                <el-option
                v-for="item in modalList"
                :key="item.type"
                :label="item.label"
                :value="item.type">
                </el-option>
            </el-select>
        </div>
    </div>
    <div class="body-list-wrap" @scroll="onScroll" v-loading = "loading" element-loading-text="数据查询中">
        <div class="wrap">
            <div v-if="billList.length == 0" class="no-data">
                <img class="no-data-img" src="./../../../static/img/space-page.png" >
            </div>
            <div v-for="(item, index) in billList" :key="index" class="receipts-list-body" @click="goDetail(item)" v-else>
                <div class="receipts-list-body-head">
                    <!-- <img :src="item.makeOrderManLog"> -->
                    <FormatImg :logo="item.makeOrderManLog" class="img" :userName="item.makeOrderManName" :size="60"></FormatImg>
                    <div class="receipts-list-body-name">{{item.makeOrderManName}}</div>
                </div>
                <div class="receipts-list-body-main">
                    <div class="receipts-list-body-main-top">
                        <div class="orderNum">{{item.orderNum}}</div>
                        <div class="status-btn">{{getState(item.checkType,item.modelType, item.cashStatus)}}</div>
                        <div class="status-btn" style="margin-left: 36px; background:#eeeeee; color:#999999;">{{getModal(item.modelType)}}</div>
                    </div>
                    <div class="receipts-list-body-main-middle">
                        <div v-if="item.modelType == '01' || item.modelType == '02' || item.modelType == '03' || item.modelType == '07' || item.modelType == '10'">{{item.storageName}}</div>
                        <!--<div>{{item.productTypeName}}</div>-->
                        <div v-if="item.modelType == '01' || item.modelType == '02' || item.modelType == '07'">{{item.storageName2}}</div>
                        <div v-if="item.modelType == '04'">{{item.supplierName}}</div>
                        <div v-if="item.modelType == '06'">{{item.groupName}}</div>
                        <div v-if="item.modelType == '06'">{{item.groupName2}}</div>
                        <div v-if="item.modelType == '03' || item.modelType == '04' || item.modelType == '05'">{{item.shopName}}</div>
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
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapActions} from "vuex"
import {seekSearchReceipt, seekGetShopListByCo, seekShowCounterList} from '../../../src/Api/commonality/seek'
import DropDownMenu from '../../../src/components/template/DropDownMenu'
import FormatImg from 'components/template/DefaultHeadFormat.vue'
export default {

  data () {
    return {
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        beginTime: '',
        endTime: '',
        // showDwopBox: false,
        classId: '',
        loading: true,
        rightList: [],
        modelTypeText: '全部',
        modelType: '00',
        suppierName: '入库库位',
        page: 1,
        pageSize: 10,
        billList: [],
        "datas": {
            "shopList": [], // 店铺列表
            "counterList": []
        },
        "onData": { // 下拉选中数据
            "shopId": "", // 店铺
            "timeType": "" // 时间
        },
        modalList: [
            {
                type: '01',
                label: '入库'
            },
            {
                type: '02',
                label: '退库'
            },
            {
                type: '03',
                label: '发货'
            },
            {
                type: '04',
                label: '退货'
            },
            {
                type: '05',
                label: '销售'
            },
            {
                type: '06',
                label: '调柜'
            },
            {
                type: '07',
                label: '调库'
            },
            {
                type: '10',
                label: '修改'
            },
        ],
        dropData: {
            repositoryId: '', // 库位
            repositoryId2: '', // 库位
            status: '', // 状态
            supplierId: '', // 供应商
            shopId: '', // 分销商
            beginTime: '', // 开始时间
            endTime: '', // 结束时间
            groupId: '',
            groupId2: '',
        }
    }
  },
  components: {
      DropDownMenu,
      FormatImg
  },
  created () {
    console.log(this.$route)
    this.searchReceipt() // 搜索
    this.getShopList(); // 店铺列表
    this.workRepositoryList(); // 库位列表
    this.workProductClass(); // 产品类别
    this.workSupplierList(); // 供应商
  },
  computed: {
    ...mapGetters([
        "repositoryList", // 库位列表
        "shopListByCo", // 店铺列表
        "productClass", // 产品类别
        "supplierListData", // 供应商
        "userPositionInfo" // 职位信息
    ]),
  },
  mounted () {
    let self = this
     Vue.nextTick(() => {
       // this.rightList = this.productClass[0].typeList
     })
     $(".body-list-wrap").mCustomScrollbar({
        theme: "minimal-dark",
        axis: 'y',
        mouseWheel: {
            scrollAmount: 200,
            preventDefault: false,
            normalizeDelta: false
        },
        callbacks: {
            onTotalScroll: function () {
                self.pageSize = Number(self.pageSize) + 10
                console.log(self.pageSize)
                self.searchReceipt(self.pageSiZe)
            }
        }
    });
  },
  watch: {
    '$route': 'routerAct',
    'modelType': function (newVal) {
        if (newVal == '01') {
            this.suppierName = "入库库位"
        } else if (newVal == '02') {
            this.suppierName = "退库库位"
        } else if (newVal == '03') {
            this.suppierName = "发货库位"
        } else if (newVal == '04') {
            this.suppierName = "退货库位"
        } else if (newVal == '07') {
            this.suppierName = "调出库位"
        } else if (newVal == '10') {
            this.suppierName = "库位"
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
    clearInfo (val) {
        if (val.type == "柜组") {
            this.dropData.groupId = ''
        } else if (val.type == "柜组1") {
            this.dropData.groupId2 = ''
        } else if (val.type == "店铺" || val.type == "分销商") {
            this.dropData.shopId = ''
            this.dropData.groupId = ''
        } else if (val.type == "库位") {
            this.dropData.repositoryId = ''
        } else if (val.type == "库位1") {
            this.dropData.repositoryId1 = ''
        } else if (val.type == "产品类别") {
            this.classId = ''
        } else if (val.type == "单据状态") {
            this.dropData.status = ''
        } else if (val.type == "供应商") {
            this.dropData.supplierId = ''
        }
        this.searchReceipt()
    },
    dropReturn (val) {
        console.log(val)
        if (val.type == "柜组") {
            this.dropData.groupId = val.item.operateId
        } else if (val.type == "柜组1") {
            this.dropData.groupId2 = val.item.operateId
        } else if (val.type == "店铺" || val.type == "分销商") {
            this.dropData.shopId = val.item.operateId
            this.showCounterList(val.item.operateId)
        } else if (val.type == "库位") {
            this.dropData.shopId = ''
            this.dropData.counterId = ''
            this.dropData.repositoryId = val.item.operateId
        } else if (val.type == "库位1") {
            this.dropData.shopId = ''
            this.dropData.counterId = ''
            this.dropData.repositoryId1 = val.item.operateId
        } else if (val.type == "产品类别") {
            this.classId = val.item.operateId
        } else if (val.type == "单据状态") {
            this.dropData.status = val.item.operateId
        } else if (val.type == "供应商") {
            this.dropData.supplierId = val.item.operateId
        }
        this.searchReceipt()
    },
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
    routerAct () {
        console.log(111)
        this.searchReceipt()
    },
    onScroll (e) {
        // console.log(e)
        // console.log(e.target.scrollHeight - e.target.scrollTop)
        if (e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight) {
            this.pageSize = Number(this.pageSize) + 10
            console.log(this.pageSize)
            this.searchReceipt(this.pageSiZe)
        }
    },
    // *********************************************************
    getTimeData(val) {
        console.log(val)
        this.dropData.beginTime = val.substr(0, 10).split('-').join("") + "000000"
        this.searchReceipt();
    },
    overTimeDate(val) {
        this.dropData.endTime = val.substr(0, 10).split('-').join("") + "000000"
        this.searchReceipt();

    },
    // switchSearchType (command) { // 库位切换
    //     console.log(command)
    //     if (command == "全部") {
    //         this.dropData.repositoryId = ''
    //     } else {
    //         this.dropData.repositoryId = command.repositoryId
    //     }
    //     this.searchReceipt() // 搜索
    // },
    // switchSearchType1 (command) { // 库位切换
    //     console.log(command)
    //     if (command == "全部") {
    //         this.dropData.repositoryId2 = ''
    //     } else {
    //         this.dropData.repositoryId2 = command.repositoryId
    //     }
    //     this.searchReceipt() // 搜索
    // },
    // switchStatus (command) { // 审核状态
    //     console.log(command)
    //     if (command == "全部") {
    //         this.dropData.status = ''
    //     } else {
    //         this.dropData.status = command
    //     }
    //     this.searchReceipt() // 搜索
    // },
    // switchSupplier (command) { // 供应商
    //     console.log(command)
    //     if (command == "全部") {
    //         this.dropData.supplierId = ''
    //     } else {
    //         this.dropData.supplierId = command.supplierId
    //     }
    //     this.searchReceipt() // 搜索
    // },
    switchCounter (command) {
        if (command == "全部") {
            this.dropData.groupId = ''
        } else {
            this.dropData.groupId = command.counterId
        }
        this.searchReceipt()
    },
    switchCounter1 (command) {
        if (command == "全部") {
            this.dropData.groupId2 = ''
        } else {
            this.dropData.groupId2 = command.counterId
        }
        this.searchReceipt()
    },
    switchShop (command) {
        console.log(command)
        if (command == "全部") {
            this.dropData.shopId = ''
        } else {
            this.dropData.shopId = command.shopId
        }
        this.showCounterList(command.shopId)
        this.searchReceipt() // 搜索
    },
    // *********************************************************
    selectClass (type) { // 1.素金类 2.珠宝类 3.饰品类
        console.log(type)
        console.log(this.productClass)
        if (type == 1) {
            console.log(1)
            this.classId = type
        } else if (type == 2) {
            this.classId = type
        } else if (type == 3) {
            this.classId = type
        } else if (type == "全部") {
            this.classId = ''
        }
        this.searchReceipt()
    },
    selectModal (type) {
        console.log(type)
        this.modelType = type
        this.searchReceipt()
    },
    searchReceipt () {
        this.loading = true
      let options = {
        modelType: this.modelType,
        search: this.$route.query.text,
        page: this.page,
        pageSize: this.pageSize,
        productTypeId: this.classId,
        storageId: this.dropData.repositoryId,
        storageId2: this.dropData.repositoryId2,
        checkType: this.dropData.status,
        supplierId: this.dropData.supplierId,
        startDate: this.dropData.beginTime,
        endDate: this.dropData.endTime,
        shopId: this.dropData.shopId,
        groupId: this.dropData.groupId,
        groupId2: this.dropData.groupId2,
      }
      console.log(options)
      seekSearchReceipt(options).then((res) => {
        console.log(res)
        this.loading = false
        this.billList = res.data.data.orderList
        //console.log(this.billList)
      }, (res) => {
        console.log(res)
      })
    },
    showCounterList (parm) { // 柜组列表
        let options = {
            shopId: parm
        }
        seekShowCounterList(options).then((res) => {
            console.log(res)
            if (res.data.state == 200) {
                this.datas.counterList = res.data.data.counterList
            }
        }, (res) => {
            console.log(res)
        })
    },
    getState (parm, modal, status) { // 调出库位
        if (modal == '05') {
            switch (status) {
                case "1":
                    return "已收银";
                case "2":
                    return "待收银";
            }
        } else {
            switch (parm) {
                case "1":
                    return "待审核";
                case "2":
                    return "审核中";
                case "3":
                    return "已审核";
            }
        }  
    },
    getModal (parm) {
      switch (parm) {
            case "01":
                return "入库";
            case "02":
                return "退库";
            case "03":
                return "发货";
            case "04":
                return "退货";
            case "05":
                return "销售/回购";
            case "06":
                return "调柜";
            case "07":
                return "调库";
            case "10":
                return "修改";
        }
    },
    goDetail (parm) {
        sessionStorage.setItem("isCheckOrderMan", parm.isCheckOrderMan);
        console.log(parm)
        if (parm.modelType == "01") {
            this.$router.push({
                path: "/work/storage/detail",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        } else if (parm.modelType == "02") {
            this.$router.push({
                path: "/work/storageReturn/NewStorageReturn",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        } else if (parm.modelType == "03") {
            this.$router.push({
                path: "/work/sipping/newSipping",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        } else if (parm.modelType == "04") {
            this.$router.push({
                path: "/work/salesReturn/newSalesReturn",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        } else if (parm.modelType == "05") {
            this.$router.push({
                path: "/work/sell/sellReceiptsList",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        } else if (parm.modelType == "06") {
            this.$router.push({
                path: "/work/transferCabinet/newTransferCabinet",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        } else if (parm.modelType == "07") {
            this.$router.push({
                path: "/work/transferStorage/newTransferStorage",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        } else if (parm.modelType == "10") {
            this.$router.push({
                path: "/work/amend/index",
                query: {
                    "orderNumber": parm.orderNum,
                    "isRole": parm.isRole,
                    "isCheckOrderMan": parm.isCheckOrderMan
                }
            })
        }
        
    },
    getShopList () { // 店铺列表
        let options = "";
        let _self = this;
        seekGetShopListByCo(options).then((response) => {
            if (response.data.state === 200) {
                console.log(response)
               _self.datas.shopList = response.data.data.shopList;
                if (response.data.data.shopList.length === 1) { // 只有一个店铺的情况下
                    _self.onData.shopId = response.data.data.shopList[0].shopId;
                    _self.showCounterList(_self.onData.shopId)
                }
            } else {
                this.$store.dispatch('workPopupError', response.data.msg);
            }
        }, (response) => {
            console.log("cuo店铺列表")
            console.log(response);
        });
    }
  }
}
</script>
<style lang="scss">
.modal-list {
    .el-input {
        width: 98px;
        height: 26px !important;
        .el-input__inner {
            height: 26px;
            background:#fff;
            border: 1px solid #eeeeee !important;
        }
        .el-input__icon {
            font-size: 10px;
        }
    }
}
.block {
    .el-date-editor {
        .el-input__inner {
            padding-right: 24px;
            font-size: 12px;
        }
    }
}
</style>
<style lang="scss">
.tittle-right {
    ul {
        li {
            /* 日期控件 */
            .report-data{
                display: inline-block;
                width: 200px;
                border:1px solid #d6d6d6;
                border-radius: 5px;
                height: 30px;
                vertical-align: middle;
                overflow: hidden;
                background-color: #fff;
                margin-left: 15px;
                font-size: 12px;
                >.block{
                    width: 46%;
                    float: left;
                    margin-top: 2px;
                    position: relative;
                    display: inline-block;
                    
                    .el-input__icon{
                    display: none;
                    }
                    .el-input__inner{
                        padding: 0;
                        text-align: center;
                        color: #2993f8;
                        background-color:transparent;
                        font-weight: bold;
                        letter-spacing: -1px;
                    }
                    
                    &.until:after{
                        content: attr(data-txt);
                        position: absolute;
                        right : -10px;
                        top:2px;
                        font-size: 14px;
                        color: #333;
                    }
                }
                >.block:nth-child(2) {
                    margin-left:10px;
                }
                
                .el-date-editor{ width: 100%;}
            }
        }
    }
}

</style>
<style lang="scss" scoped>
  @import "~assets/css/template/fonts.scss";
  .receipts-wrap {
    height: 100%;
    margin: 0 auto;
    width: 1270px;
    .receipts-list-tittle {
        height: 50px;
        width: 1250px;
        box-sizing: border-box;
        padding-top: 20px;
        padding-left: 10px;
        .tittle-left {
            float: left;
            line-height: 30px;
            i {
                font-size: 20px;
                color:#2993f8;
                float: left;
                margin-right: 10px;
            }
        }
        .tittle-right {
            float: right;
            ul {
                float: left;
                li {
                    float: left;
                    color:#666;
                    margin-left: 40px;
                    position: relative;
                    span {
                        font-size: 14px;
                        color:#666;
                        .el-icon-caret-bottom {
                            font-size: 10px;
                            color: #999;
                        }
                    }
                    .el-dropdown {
                        span {
                            .el-icon-caret-bottom {
                                font-size: 10px;
                                color: #999;
                            }
                        }
                    }
                    .drop-box {
                        width: 200px;
                        height: 0;
                        border-radius: 10px;
                        box-shadow: none;
                        position: absolute;
                        z-index: 20;
                        background:#fff;
                        overflow: hidden;
                        left: -50px;
                        top: 25px;
                        transition: all .2s .4s ease;
                        .drop-box-main {
                            width: 100%;
                            position: absolute;
                            bottom: 40px;
                            top:0;
                            left: 0;
                            .list-left {
                                width: 80px;
                                float: left;
                                height: 100%;
                                border-right: 1px solid #f1f2f3;
                                li {
                                    height: 41px;
                                    margin: 0;
                                    color:#333333;
                                    font-size: 14px;
                                    text-align:center;
                                    width: 100%;
                                    line-height: 41px;
                                    border-bottom: 1px solid #f1f2f3;
                                    cursor: pointer;
                                }
                                li:hover {
                                    background:#f6f7f8;
                                }
                                li.active {
                                    color: #2993f8;
                                }
                            }
                            .list-right {
                                width: 119px;
                                float: right;
                                height: 100%;
                                overflow-y: auto;
                                li {
                                    height: 41px;
                                    margin: 0;
                                    color:#333333;
                                    font-size: 14px;
                                    text-align:center;
                                    width: 100%;
                                    line-height: 41px;
                                    border-bottom: 1px solid #f1f2f3;
                                    cursor: pointer;
                                }
                                li:hover {
                                    background:#f6f7f8;
                                }
                                li.active {
                                    color: #2993f8;
                                }
                            }
                        }
                        .drop-box-footer {
                            width: 100%;
                            height: 40px;
                            background:#f6f7f8;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            padding-top: 8px;
                            box-sizing: border-box;
                            span {
                                font-size: 14px;
                                display: block;
                                width: 60px;
                                height: 24px;
                                text-align: center;
                                line-height: 24px;
                                float: right;
                                margin-right: 12px;
                                cursor: pointer;
                            }
                            span:nth-child(2) {
                                color:#999999;
                            }
                            span:nth-child(1) {
                                background:#2993f8;
                                color:#fff;
                                border-radius: 4px;
                            }
                        }
                    }
                    /* 日期控件 */
                    .report-data{
                        display: inline-block;
                        width: 200px;
                        border:1px solid #d6d6d6;
                        border-radius: 5px;
                        height: 30px;
                        vertical-align: middle;
                        overflow: hidden;
                        background-color: #fff;
                        margin-left: 15px;
                        font-size: 12px;
                        >.block{
                            width: 46%;
                            float: left;
                            margin-top: 2px;
                            position: relative;
                            display: inline-block;
                            
                            .el-input__icon{
                            display: none;
                            }
                            .el-input__inner{
                                padding: 0;
                                text-align: center;
                                color: #2993f8;
                                background-color:transparent;
                                font-weight: bold;
                                letter-spacing: -1px;
                            }
                            
                            &.until:after{
                                content: attr(data-txt);
                                position: absolute;
                                right : -10px;
                                top:2px;
                                font-size: 14px;
                                color: #333;
                            }
                        }
                        >.block:nth-child(2) {
                            margin-left:10px;
                        }
                        
                        .el-date-editor{ width: 100%;}
                    }
                }
                .classBox:hover .drop-box{
                    height: 300px;
                    box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
                }
            }
            .modal-list {
                float: right;
                margin-left: 40px;
                height: 30px;
            }
        }
    }
    .body-list-wrap {
        height: 766px;
        width: 1270px;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-top: 10px;
        position: relative;
        .wrap {
            margin-top: 10px;
            min-height: 766px;
        }
        .no-data {
            width: 1250px;
            height: 600px;
            background: #fff;
            position: relative;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            .no-data-img {
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left:-100px;
                margin-top: -95px;
            }
        }
        
        .receipts-list-body{
            height: 150px;
            width: 1250px;
            background:#fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            margin: 0 auto;
            margin-bottom: 20px;
            box-sizing: border-box;
            padding-top:30px;
            font-family: "微软雅黑";
            border-radius: 10px;
            position: relative;
            transition: .4s ease all;
            cursor: pointer;
            .receipts-list-body-head {
                width: 160px;
                height: 120px;
                float:left;
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin:0 auto;
                    display:block;
                }
                .img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin:0 auto;
                    display:block;
                }
                .receipts-list-body-name {
                    margin: 0 auto;
                    text-align: center;
                    font-size: 14px;
                    margin-top: 18px;
                }
            }
            .receipts-list-body-main {
                height: 120px;
                width: 700px;
                float: left;
                .receipts-list-body-main-top {
                    width: 100%;
                    height: 54px;
                    .orderNum {
                        font-size: 16px;
                        color:#2993f8;
                        float:left;
                        font-weight: bold;
                        line-height: 28px;
                        margin-right: 30px;
                    }
                    .status-btn {
                        float:left;
                        padding: 2px 8px;
                        color:#fff;
                        background:#ffba42;
                        border-radius: 4px;
                        font-size: 12px;
                        font-family: "微软雅黑";
                        font-weight: bold;
                    }
                }
                .receipts-list-body-main-middle {
                    margin-bottom: 20px;
                    div {
                        float:left;
                        padding: 0 18px;
                        font-size: 14px;
                        color:#333;
                        height: 10px;
                        line-height: 10px;
                        font-family: "微软雅黑"
                    }
                    div:nth-child(1) {
                        padding-left:0;
                        border-right: 1px solid #d6d6d6;
                    }
                    div:nth-child(2) {
                        border-right: 1px solid #d6d6d6;
                    }
                }
                .receipts-list-body-main-bottom {
                    div {
                        span {
                            font-size: 14px;
                            color:#999;
                        }
                    }
                }
            }
            .totalNum {
                position: absolute;
                right: 211px;
                top: 50px;
                height: 48px;
                width: 158px;
                text-align: right;
                padding-right: 28px;
                border-right: 1px solid #d6d6d6;
                font-size: 30px;
                color:#ff3b30;
                span {
                    font-size: 14px;
                    color:#999;
                }
            }
            .listNum {
                position: absolute;
                left: 1038px;
                top: 50px;
                height: 48px;
                width: 158px;
                padding-left: 28px;
                font-size: 16px;
                color: #333;
                line-height: 40px;
                margin-top: -16px;
                span {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
        .receipts-list-body:hover {
            box-shadow: 0 0 15px rgba(0,0,0,0.3);
        }
    }
  }

</style>


