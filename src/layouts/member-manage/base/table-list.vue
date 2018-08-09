<!-- 会员列表 -->
<template>
  <transition name="tp-ani">
    <div class="RP_report_wrapper ui-page-max-width report_table_fixed dc-label-print-main" v-if="isPrint==0">
      <div class="new-table-header-layout-main">
        
        <!-- 跟进图表 -->
        <follow-up-echarts v-if="currentLocation == 'followUp'"></follow-up-echarts>

        <div class="rp_gridState">
          <p class="side-nav"><i class="iconfont icon-liebiao"></i>商品列表:<span style="color: #2993f8;">{{allData.totalNum}}</span></p>
          <div class="sort-wrap">
            <label>排序:</label>
            <div v-for="(item, index) in sortList" :key="index">
              {{item.name}}
              <img v-if="item.value == '2'" src="~static/img/sort/down1.png">
              <img v-if="item.value == '1'" src="~static/img/sort/up1.png">
              <i class="el-icon-circle-cross" @click="cancelSort(item, index)"></i>
            </div>
          </div>

          <!-- 会员 -->
          <filter-header v-if="currentLocation == 'member'" @seekProduct="seekProduct" :shopId="shopId" @reportSwitch="reportSwitch" @resetData="resetData" @filterData="filterData"></filter-header>
          <!-- 跟进 -->
          <follow-up-header v-if="currentLocation == 'followUp'" @seekProduct="seekProduct" :shopId="shopId" @reportSwitch="reportSwitch" @resetData="resetData" @filterData="filterData"></follow-up-header>

        </div>
      </div>

      <div v-if="false" style="border: 2px solid red; height: 200px;">
        高级搜索
      </div>

      <div :class="tabShow" v-loading="loading" element-loading-text="数据查询中">
        <report-detail
          ref="reportDetailWrap"
          :printNum="printNum"
          :allData="allData"
          :dataGridStorage="dataGridStorage"
          :tabSwitch="tabSwitch"
          :positionSwitch="positionSwitch"
          :newList="newList"
          :reportType="getReportType"
          :configData="configData"
          @lazyloadSend="lazyloadSend"
          @sortListAct="sortListAct"
          @scrollClass="tabScrollShow"
          @delData="delData"
          @change="changeMember"
        >
        </report-detail>
      </div>
    </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import find from 'lodash/find'
let configData = require('./../config/config')
import {
  seekRepositoryList,
  seekGetDepUserList,
  getProductTypeList,
  seekGetUserList,
  // seekGetShopListByCo,
  seekGetUserInfo,
  seekMemberList,
  seekFindMemberList,
  seekGetShopListByCo
} from 'Api/commonality/seek.js'
import {operateDeleteMemberId} from 'Api/commonality/operate'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DownMenu from 'base/menu/DownMenu'
import ReportDetail from 'base/newDataGrid/reportDetailTab'
import DropDownMenu from '@/components/template/DropDownMenu'
import filterHeader from './../base/filter-header'
import followUpHeader from './../base/follow-up-header'
import downMenu from 'base/menu/new-down-menu'
import followUpEcharts from './follow-up-echarts'
// import btnHeader from './base/btn-header'
import { productTpyeState, newProductDetailStatus } from 'Api/commonality/status'

export default {
  props: ['shopId', 'currentLocation'],
  components: {
    ReportDetail,
    DropDownMenu,
    DownMenu,
    filterHeader,
    downMenu,
    followUpHeader,
    followUpEcharts
    // btnHeader
  },
  data() {
    return {
      totalNum: '',
      memberId: '',
      shopName: '',
      configData: configData.detailConfing,
      addData: [], // 让后台过滤的数据源
      printNum: { // 打印行数
        allChecked: false, // 全部选中
        beginNum: '',
        endNum: '',
      },
      filterCondition: {
        // shopName: '',
        // shopId: '',
      },
      openReset: true,
      shopDataList: [],
      // allChecked: false, // 全部选中
      currentTemplate: '', // 当前的模板
      printList: [], // 打印机列表
      currentPrint: "", // 当前打印机             
      productCategory: [{
          classesName: '全公司',
          classesType: '1',
          children: []

        },
        {
          classesName: '全仓库',
          classesType: '2',
          children: []
        },
        {
          classesName: '全店铺',
          classesType: '3',
          children: []
        }
      ],
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

      //打印0,1
      isPrint: 0,
      printSelectDate: {
        storage: '', //发货库位
        productType: '', //产品类别
        shop: '', //收货铺位
        preparedBy: '', //制单人
        auditor: '', //审核人
        takeUser: '', //收货人
        startTime: '', //制单时间
        endTime: '',
        headerData: '发货', //制单大标题
        reportType: '4', //1代表入库、2退库、3调库、4发货、5调柜、6退货
        companyName: '', //公司名,
        showCompany: true //是否显示公司名  在用户不选择条件筛选的情况下 默认显示公司名
      },
      //
      tabShow: 'tabShow',
      currentPage: 1,

      loading: false,

      allData: {},
      dataGridStorage: [],
      dataGridDetailList: [],

      //成本核算
      tabSwitch: false,

      //产品类别
      productCategoryType: [],
      // productCategory :[],
      categoryProps: {
        value: 'classesId',
        label: 'classesName',
        children: 'typeList'
      },

      tabClassActive: {
        index: 1,
        activeClass: 'active'
      },

      distributorList: [],


      //制单人
      preparedSpaceValue: '',
      shopUserList: [],

      //审核人
      auditorSpaceValue: '',
      auditorUserList: [],

      //收货人
      GetUserInfoList: [],
      takeUserDisabled: true,

      //入库库位
      storageSpaceValue: '',
      // repositoryList: [], 

      provider: '',
      providerId: '',

      //
      propOptons: {
        beginTime: '',
        endTime: '',
        storageId: [], //入库ID
        productTypeId: [], //产品类别ID
        shopId: [], //收货店铺ID
        makeUserList: [{
          makeUserId: '', //制单人ID
        }],
        checkUserList: [{
          checkUserId: '', //审核人ID
        }],
        takeUserList: [{
          takeUserId: '', //收货人ID
        }],
        reportType: 3 //报表类型 ，为1时代表成色大类，为2时是成色小类，为3时是明细 ,默认为明细
      },

      reportPrint_fixed: false,
      dataGridOptions: {
        beginTime: '',
        endTime: '',
        shopFlag: '', // 给后台添加备注
        storageFlag: '', // 给后台添加备注
        settingType: '1',
        receiveObject: '1',
        storageId: '',
        shopId: '',
        shopName: '',
        counterId: '',
        productTypeId: '',
        makeUserList: [
          // {
          //     makeUserId : '',//制单人ID
          // }
        ],
        checkUserList: [
          // {
          //     checkUserId : '',//审核人ID
          // }
        ],
        takeUserList: [],
        // productClass: '1',
        sortFlag: '0',
        sortList: [],
        type: 2,
        page: 1,
        pageSize: 30,
        keyWord: '',
        wColorId: '',
        wGemId: '',
        wJewelryId: '1',
        nColorId: '',
        nGemId: '',
        nJewelryId: '1'
      },
      positionSwitch: false,
      customDialog: false, // 自定义列表弹窗
      resetFlag: false,
      sortList: [],
      newList: [],
      paging: {
        page: 1,
        pageSize: '30'
      },
      shopList: [] 
    }
  },
  created() {
    if (this.currentLocation == 'followUp') {
      this.configData = configData.followUpConfing
    }
    this._seekGetShopListByCo()
    this.getProductTypeList() //产品类别
    this.getGetUserList() //审核人
    // this.send()
    this.$store.dispatch('checkBrowser', (type) => {
      this.reportPrint_fixed = type
    })
    this.$store.dispatch('getTemplateList', {
      type: 2,
      fieldType: 'simple'
    })
  },
  watch: {
    'printSelectDate.storage': function() {
      //发货库位
      this.setPrintShowCompany(this.printSelectDate.storage == '')
    },
    'printSelectDate.productType': function() {
      //产品类别
      this.setPrintShowCompany(this.printSelectDate.productType == '')
    },
    'printSelectDate.shop': function() {
      //收货店铺
      this.setPrintShowCompany(this.printSelectDate.shop == '')
    },
    'printSelectDate.preparedBy': function() {
      //制单人
      this.setPrintShowCompany(this.printSelectDate.preparedBy == '')
    },
    'printSelectDate.auditor': function() {
      //审核人
      this.setPrintShowCompany(this.printSelectDate.auditor == '')
    },
    'printSelectDate.takeUser': function() {
      //收货人
      this.setPrintShowCompany(this.printSelectDate.takeUser == '')
    },
    'positionSwitch' (val) {
      if (val == true) {
        this.dataGridOptions.sortFlag = 1
      } else {
        this.dataGridOptions.sortFlag = 0
      }
      // this.send()
    }
  },
  computed: {
    ...mapGetters([
      // "repositoryList", // 库位列表
      "userPositionInfo", // 职位信息
      "shopListByCo" // 店铺列表
    ]),
    shopRole: function() { // 店员
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
      }
    },
    computedRole: function() { // 公司
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
      }
    },
    computedManageRole: function() { // 公司
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionComputedManageRole(this.userPositionInfo.roleList)
      }
    },
    officeClerk() { // 职员
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionOfficeClerk(this.userPositionInfo.roleList)
      }
    },
    shopManageRole() { // 店长
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
      }
    },
    isJrole: function() { // 判断是不是监察员
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionJCY(this.userPositionInfo.roleList);
      }
    },

  },
  methods: {
    _seekGetShopListByCo() { // 店铺列表
      let options = {
        page: 1,
        pageSize: 0,
        type: 1,
      };
      seekGetShopListByCo(options).then((res) => {
        if(res.data.state == 200) {
          this.shopList = res.data.data.shopList
          for (let i of res.data.data.shopList) {
            if (i.shopId == this.shopId) {
              this.changeShop(i)
              return
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      });
    },
    changeShop (parm) {
      this.shopId = parm.shopId
      this.shopName = parm.shopName
      this.filterData({
        shopId: parm.shopId
      })
    },
    clearShop () {
      this.shopName = ''
      this.shopId = ''
    },
    closeEditReturn () {

    },
    changeMember (parm) {
      this.memberId = parm.memberId
      this.$emit('changeMember', parm)
      // setTimeout(() => {
      //   this.$refs.memberInfoBox.open()
      // }, 0)
    },
    delData(parm) {
      operateDeleteMemberId({memberId: parm.data.memberId})
        .then(res => {
          if (res.data.state == 200) {
            this.dataGridStorage.splice(parm.index, 1)
            this.totalNum -= 1  
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    },
    resetData() {
      this.shopName = ''
      this.shopId = ''
      
      this.addData = []
      this.dataGridStorage = []
      this.sortList = []
    },
    amendNum(parm) {
      this.printNum = parm
    },
    // 查询商品
    seekProduct(parm) {
      this.loading = true
      let barcode = {
        barcodeList: []
      }
      for (let i of this.addData) {
        barcode.barcodeList.push({
          barcode: i.barcode
        })
      }

      seekFindMemberList(Object.assign(parm, barcode, { page: '1', pageSize: '30' }))
        .then(res => {
          if (res.data.state == 200) {
            this.allData = res.data.data
            let datas = res.data.data.dataList
            // for (let i of datas) {
            //   // 属性
            //   i.productClass = productTpyeState(i.productClass)
            //   // 状态
            //   i.status = newProductDetailStatus(i.status)
            // }
            this.addData = datas
            this.dataGridStorage = datas
            this.loading = false
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
          this.loading = false
        })
    },
    filterData(parm) {
      if (parm) {
        if (parm.init) {
          this.filterCondition = {}
        }
        this.dataGridStorage = []
        this.paging.page = 1
        this.filterCondition = Object.assign({}, this.filterCondition, parm)
      } else {
        if (this.paging.page > 1 && this.dataGridStorage.length == this.totalNum) {
          return
        }
      }

      this.loading = true
      seekFindMemberList(Object.assign({}, this.filterCondition, this.formattingData(this.sortList), this.paging, {shopId: this.shopId}))
        .then(res => {
          if (res.data.state == 200) {
            this.paging.page += 1
            this.allData = res.data.data
            let datas = res.data.data.dataList
            this.totalNum = res.data.data.totalNum
            this.dataGridStorage.push(...datas)
            this.loading = false
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
          this.loading = false
        })
    },
    formattingData(parm) {
      let datas = {
        sortList: []
      }
      for (let i of parm) {
        if (i.value) {
          datas.sortList.push({
            [i.childType]: i.value
          })
        }
      }
      // 产品类别
      return datas
    },
    filterSeekData(parm, aaa) {
      let datas = []
      for (let i of parm) {
        datas.push({
          [aaa]: i
        })
      }
      return datas
    },
    checkedAll() {

    },
    // 提取有数据的值
    filterHasData(parm) {
      let datas = []
      for (let i of parm) {
        if (i.productTypeList.length) {
          datas.push(i)
        }
      }
      return {
        dataList: datas
      }
    },
    changeVaue(parm) {
      this.dataGridOptions.storageId = ''
      this.dataGridOptions.shopId = ''
      this.dataGridOptions.shopFlag = ''
      this.dataGridOptions.storageFlag = ''
      if (parm.type == 1) {
        this.dataGridOptions.receiveObject = parm.type
      } else if (parm.type == 2) {
        if (parm.item.operateId) {
          this.dataGridOptions.receiveObject = 4
          this.dataGridOptions.storageId = parm.item.operateId
        } else {
          this.dataGridOptions.receiveObject = parm.type
          this.dataGridOptions.storageFlag = '1'
        }

      } else if (parm.type == 3) {
        if (parm.item.operateId) {
          this.dataGridOptions.receiveObject = 5
          this.dataGridOptions.shopId = parm.item.operateId
        } else {
          this.dataGridOptions.receiveObject = parm.type
          this.dataGridOptions.shopFlag = '1'
        }
      }
      // this.send()
    },
    // changeShopData(parm) {
    //   this.dataGridOptions.receiveObject = 5
    //   this.dataGridOptions.shopId = parm.shopId
    //   this.dataGridOptions.shopName = parm.shopName
    //   this.send()
    // },
    clearShop() {
      this.dataGridOptions.receiveObject = 3
      this.dataGridOptions.shopName = ''
      this.dataGridOptions.shopId = ''
      this.dataGridOptions.shopFlag = '1'
      // this.send()
    },
    changeShopVaue(parm) {
      console.log('选择店铺', parm)
    },
    callProductCategory() {
      this.dataGridOptions.receiveObject = 1
      this.dataGridOptions.shopId = ''
      this.dataGridOptions.storageId = ''
      // this.send()
    },
    resetOption() {
      this.openReset = false
      setTimeout(() => {
        this.openReset = true
      }, 100)
      this.dataGridOptions.wColorId = ''
      this.dataGridOptions.wGemId = ''
      this.dataGridOptions.wJewelryId = '1'
      this.dataGridOptions.nColorId = ''
      this.dataGridOptions.nGemId = ''
      this.dataGridOptions.nJewelryId = '1'
      this.resetFlag = true
    },
    cancelSort(item, index) { // 取消排序
      this.sortList.splice(index, 1)
      this.$refs.reportDetailWrap.cancelSort(item)
      this.initData()
      // this.newList = this.sortList
    },
    sortListAct(val) { // 列表排序
      for (let i of this.sortList) {
        if (i.name == val.name) {
          this.$set(i, 'value', val.value)
          this.initData()
          return
        }
      }
      this.sortList.push(val)
      this.initData()
    },
    initData () {
      this.dataGridStorage = []
      this.paging.page = 1
      this.filterData()
    },
    diaInfoBack(val) { // 弹框信息返回
      this.resetFlag = false
      //val.type 1.成色名称-计重  2.宝石名称-计重  3.首饰类别-计重  4.成色名称-计件  5.宝石名称-计件  6.首饰类别-计件
      switch (val.type) {
        case 1:
          this.dataGridOptions.wColorId = val.value
          break;
        case 2:
          this.dataGridOptions.wGemId = val.value
          break;
        case 3:
          this.dataGridOptions.wJewelryId = val.value
          break;
        case 4:
          this.dataGridOptions.nColorId = val.value
          break;
        case 5:
          this.dataGridOptions.nGemId = val.value
          break;
        case 6:
          this.dataGridOptions.nJewelryId = val.value
          break;
      }
    },
    toggleAttribute() {
      this.dataGridOptions.page = 1
      this.dataGridOptions.pageSize = 15
      //   this.dataGridOptions.productClass = this.dataGridOptions.productClass == 1 ? 2 : 1
      this.loading = true;
      // this.send()

    },
    //成本控制
    reportSwitch(parm) {
      this.tabSwitch = parm
    },
    setPrintShowCompany(type) {
      this.printSelectDate.showCompany = type
    },

    toHome() {
      this.$router.push('/work/report/')
    },

    //库位
    storageFunc() {
      // this.send()
    },

    //滚动条滚动时不显示总计
    tabScrollShow(type) {
      this.tabShow = type ? 'tabShow' : ''
    },

    //获取收货人
    getGetUserInfo() {
      let option = {
        type: 2,
        companyId: sessionStorage.getItem('companyId'),
        shopId: this.dataGridOptions.shopId
      }
      seekMemberList(option).then((res) => {
        this.GetUserInfoList = res.body.data.dataList;
      }, (res) => {

      })
    },


    //审核人
    getGetUserList() {
      let options = {
        type: 1,
        companyId: sessionStorage.getItem('companyId'),
        shopId: ''
      }
      seekMemberList(options).then((res) => {
        this.auditorUserList = res.data.data.dataList.filter(item => item.role.indexOf('管理员') >= 0)
      }, (res) => {
        console.log(res);
      })

    },

    //产品类别
    getProductTypeList() {

    },


    //获取当前的接口类型
    getReportType() {
      return this.dataGridOptions.type
    },


    //懒加载
    lazyloadSend() {
      if (this.dataGridStorage.length) {
        if (this.dataGridStorage.length != this.totalNum) {
          this.filterData()
        }
      }
    }
  },

  mounted() {

    this.$nextTick(() => {

      //获取公司信息
      let companyName = JSON.parse(localStorage.getItem('companyInfo'))
      if (companyName) {
        this.printSelectDate.companyName = '公司名：' + companyName.companyName
      }

    })
  }
}

</script>
<style lang="scss">

</style>
