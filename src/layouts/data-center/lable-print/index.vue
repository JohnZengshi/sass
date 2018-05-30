<template>
  <transition name="tp-ani">
    <div class="RP_report_wrapper ui-page-max-width report_table_fixed" v-if="isPrint==0">
      <div class="Rp_title_container">
        <!--面包屑-->
        <div class="Rp_crumbs">
          <i class="iconfont icon-baobiao1"></i>
          <router-link tag="span" to="/work/report/" class="path_crumbs">标签打印</router-link>
        </div>
        <div class="Rp_selected_container">
          <!--             <Cascade
                v-if="computedRole"
                :computedRole="computedRole"
                :propList="productCategory"
                titleName="全公司"
                @clear = "callProductCategory"
                @dropReturn = "changeVaue"
            >
            </Cascade> -->
          <!--             <DownMenu
              v-else
              :titleInfo="dataGridOptions.shopName ? dataGridOptions.shopName : '全店铺'"
              :showList="productCategory[2].children"
              :nameKey="'shopName'"
              @changeData="changeShopData"
              @clearInfo="clearShop"
            ></DownMenu> -->
          <DownMenu :titleInfo="dataGridOptions.shopName ? dataGridOptions.shopName : '选择模板'" :showList="productCategory[2].children" :nameKey="'shopName'" @changeData="changeShopData" @clearInfo="clearShop"></DownMenu>
          <DownMenu :titleInfo="dataGridOptions.shopName ? dataGridOptions.shopName : '选择打印机'" :showList="productCategory[2].children" :nameKey="'shopName'" @changeData="changeShopData" @clearInfo="clearShop"></DownMenu>
          <div class="report-data">
            <div class="block until" data-txt="至">
              <el-date-picker size="mini" v-model="beginTime" @change="getTimeData" type="date" placeholder="选择开始时间" :picker-options="pickerOptions1"></el-date-picker>
            </div>
            <div class="block">
              <el-date-picker size="mini" v-model="endTime" @change="overTimeDate" type="date" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
            </div>
          </div>
          <el-button size="small" class="ml-10" @click.native="toHome">预览</el-button>
          <el-button type="primary" size="small" class="back-btn" @click.native="toHome">打印标签</el-button>
        </div>
      </div>
      <div class="Rp_dataGrid_container">
        <div class="rp_gridState">
          <p class="side-nav"><i class="iconfont icon-liebiao"></i>商品列表</p>
          <div class="sort-wrap">
            <label>排序:</label>
            <div v-for="(item, index) in sortList" :key="index">
              {{item.name}}
              <img v-if="item.value == '2'" src="~static/img/sort/down1.png">
              <img v-if="item.value == '1'" src="~static/img/sort/up1.png">
              <i class="el-icon-circle-cross" @click="cancelSort(item, index)"></i>
            </div>
          </div>

          <div class="data-center-header-right-cut">
            收起<i class="iconfont icon-arrow-down drop-triangle" style="margin-left: 5px;"></i>
          </div>

        </div>
      </div>
      <div class="rp_dataGridTemp" :class="tabShow" v-loading="loading" element-loading-text="数据查询中">
        <report-detail ref="reportDetailWrap" :dataGridStorage="dataGridStorage" :tabSwitch="tabSwitch" :positionSwitch="positionSwitch" :newList="newList" :reportType="getReportType" @lazyloadSend="lazyloadSend" @sortList="sortListAct" @scrollClass="tabScrollShow">
        </report-detail>
      </div>
    </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import find from 'lodash/find'
import { seekGetReportsComprehensive } from 'Api/commonality/seek.js'
import {
  seekRepositoryList,
  seekGetDepUserList,
  getProductTypeList,
  seekGetUserList,
  seekGetShopListByCo,
  seekGetUserInfo,
  seekMemberList
} from 'Api/commonality/seek.js'
import Cascade from './base/Cascade'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DownMenu from 'base/menu/DownMenu'
import ReportDetail from './newDataGrid/reportDetailTab'
import DropDownMenu from '@/components/template/DropDownMenu'


export default {
  components: {
    ReportDetail,
    Cascade,
    DropDownMenu,
    DownMenu
  },
  data() {
    return {
      openReset: true,
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

      loading: true,

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

      //大、小类 tab切换
      tabData: [
        { txt: '明细', fun: this.tabs, type: 3 },
        { txt: '成色大类', fun: this.tabs, type: 1 },
        { txt: '成色小类', fun: this.tabs, type: 2 }
      ],

      //收货店铺
      distributorSpaceValue: '',
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
        storageId: '', //入库ID
        productTypeId: '', //产品类别ID
        shopId: '', //收货店铺ID
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
        sortList: [{ classTypeName: '1' }],
        type: 2,
        page: 1,
        pageSize: 15,
        keyWord: '',
        wColorId: '',
        wGemId: '',
        wJewelryId: '1',
        nColorId: '',
        nGemId: '',
        nJewelryId: '1'
      },
      dialogOptions: {
        conditionList: [
          '不选', '大类', '小类'
        ],
        jewelryList: [
          '大类', '小类'
        ]
      },
      positionSwitch: false,
      customDialog: false, // 自定义列表弹窗
      resetFlag: false,
      sortList: [{ name: '产品类别', value: '1' }],
      newList: [{ name: '产品类别', value: '1' }]
    };
  },
  created() {
    //后台请求时间
    // this.propOptons.beginTime = this.getDate(-((new Date()).getDate()-1),'start').fullData
    // this.propOptons.endTime = this.getDate(0,'end').fullData
    this.dataGridOptions.beginTime = this.getDate(-((new Date()).getDate() - 1), 'start').fullData
    this.dataGridOptions.endTime = this.getDate(0, 'end').fullData

    //日期控件默认设置时间
    this.beginTime = this.getDate(-((new Date()).getDate() - 1), 'start').format
    this.endTime = this.getDate(0, 'end').format
    //打印时间
    this.printSelectDate.startTime = this.beginTime
    this.printSelectDate.endTime = this.endTime
    this.getShop(); //库位
    this.getProductTypeList() //产品类别
    this.getShopListByCo() //店铺
    this.getUserList(); //制单人
    this.getGetUserList() //审核人
    this.send()
    this.$store.dispatch('checkBrowser', (type) => {
      this.reportPrint_fixed = type
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
      this.send()
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
    }
    // productCategory () {
    //     return [
    //         {
    //             classesName: '全公司',
    //             classesType: '1',
    //             childen: []
    //         },
    //         {
    //             classesName: '全仓库',
    //             classesType: '2',
    //             childen: this.repositoryList
    //         },
    //         {
    //             classesName: '全店铺',
    //             classesType: '3',
    //             childen: this.shopListByCo

    //         }
    //     ]
    // }
  },
  methods: {
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
      this.send()
    },
    changeShopData(parm) {
      this.dataGridOptions.receiveObject = 5
      this.dataGridOptions.shopId = parm.shopId
      this.dataGridOptions.shopName = parm.shopName
      this.send()
    },
    clearShop() {
      this.dataGridOptions.receiveObject = 3
      this.dataGridOptions.shopName = ''
      this.dataGridOptions.shopId = ''
      this.dataGridOptions.shopFlag = '1'
      this.send()
    },
    changeShopVaue(parm) {
      console.log('选择店铺', parm)
    },
    callProductCategory() {
      this.dataGridOptions.receiveObject = 1
      this.dataGridOptions.shopId = ''
      this.dataGridOptions.storageId = ''
      this.send()
    },
    _seekRepositoryList() {
      if (this.userPositionInfo.roleList) {
        let options = {
          page: '1',
          pageSize: 9999,
          type: 1 // 1.可查看 2.所属 3.全部
        }

        if (this.computedManageRole || this.officeClerk) { // 管理员 // 职员
          options.type = 3
        } else if (this.shopManageRole) { // 店长
          options.type = 2
        } else if (this.shopRole) { // 店员
          options.type = 1
        } else if (this.isJrole) { // 监察员
          options.type = 2
        }

        seekRepositoryList(options)
          .then(res => {
            if (res.data.state == 200) {
              this.productCategory[1].children = res.data.data.repositoryList
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
            }
          })
      } else {
        setTimeout(() => {
          this._seekRepositoryList()
        }, 1500)
      }
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
      this.send()
    },
    compOption() {
      if (this.dataGridOptions.type != 4) {
        this.dataGridOptions.type == 4
        this.setReportType(type)
      } else {
        this.send()
      }
      this.customDialog = false
    },
    setReportType(port) {
      // if( port ) this.dataGridOptions.type = port
      if (port) {
        if (port == 1) {
          Object.assign(this.dataGridOptions, {
            // storageId: '',
            // shopId: '',
            // counterId: '',
            // productClass: '1',
            sortFlag: '0',
            type: 1,
            page: 1,
            pageSize: 15,
            keyWord: ''
          })
        } else if (port == 2) {
          delete this.dataGridOptions.page
          delete this.dataGridOptions.pageSize
          delete this.dataGridOptions.keyWord
          delete this.dataGridOptions.wColorId
          delete this.dataGridOptions.wJewelryId
          delete this.dataGridOptions.nColorId
          delete this.dataGridOptions.nGemId
          delete this.dataGridOptions.nJewelryId
          Object.assign(this.dataGridOptions, {
            // storageId: '',
            // shopId: '',
            // counterId: '',
            // productClass: '1',
            sortFlag: this.positionSwitch ? "1" : "0",
            type: 1,
          })
        } else if (port == 3) {
          delete this.dataGridOptions.page
          delete this.dataGridOptions.pageSize
          delete this.dataGridOptions.keyWord
          delete this.dataGridOptions.wColorId
          delete this.dataGridOptions.wJewelryId
          delete this.dataGridOptions.nColorId
          delete this.dataGridOptions.nGemId
          delete this.dataGridOptions.nJewelryId
          Object.assign(this.dataGridOptions, {
            // storageId: '',
            // shopId: '',
            // counterId: '',
            // productClass: '1',
            sortFlag: this.positionSwitch ? "1" : "0",
            type: 1,
          })
        } else if (port == 4) {
          Object.assign(this.dataGridOptions, {
            // storageId: '',
            // shopId: '',
            // counterId: '',
            // productClass: '1',
            sortFlag: this.positionSwitch ? "1" : "0",
            type: 1,
            keyWord: '',
            wColorId: '',
            wGemId: '',
            wJewelryId: '1',
            nColorId: '',
            nGemId: '',
            nJewelryId: '1'
          })
        }
      }
      this.dataGridOptions.type = port
      this.send()
    },
    tabs(index, type, evt) {
      if (this.tabClassActive.index == index) return
      if (this.dataGridOptions.type == 4 && index == 3) {
        this.customDialog = true
      }
      this.loading = true;
      //this.page = 1
      this.dataGridOptions.page = 1
      this.dataGridOptions.pageSize = 15
      this.tabClassActive.index = index;
      this.setReportType(type)

    },
    tabHover(index, evt) {
      this.$refs.customDia.style.zIndex = "10"
      this.$refs.customDia.style.opacity = '1'
    },
    tabOut(index, evt) {
      this.$refs.customDia.style.zIndex = "-1"
      this.$refs.customDia.style.opacity = '0'
    },
    cancelSort(item, index) { // 取消排序
      this.sortList.splice(index, 1)
      this.newList = this.sortList
    },
    sortListAct(val) { // 列表排序
      console.log(val)
      this.dataGridOptions.sortList = val
      this.send()
      this.sortList = []
      val.forEach((item, index) => {
        switch (Object.keys(item)[0]) {
          case 'barcode':
            this.sortList.push({ name: '条码号', value: item.barcode })
            break;
          case 'weight':
            this.sortList.push({ name: '件重', value: item.weight })
            break;
          case 'className':
            this.sortList.push({ name: '首饰名称', value: item.className })
            break;
          case 'classTypeName':
            this.sortList.push({ name: '产品类别', value: item.classTypeName })
            break;
          case 'goldWeight':
            this.sortList.push({ name: '金重', value: item.goldWeight })
            break;
          case 'price':
            this.sortList.push({ name: '售价', value: item.price })
            break;
          case 'cost':
            this.sortList.push({ name: '成本', value: item.cost })
            break;
          case 'num':
            this.sortList.push({ name: '件数', value: item.num })
            break;
        }

      })
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
      this.send()

    },
    //成本控制
    reportSwitch() {
      this.tabSwitch = !this.tabSwitch
    },
    setPrintShowCompany(type) {
      this.printSelectDate.showCompany = type
    },

    toHome() {
      this.$router.push('/work/report/')
    },
    clearInfo(val) {
      if (val.type == "柜组") {
        this.changeCounter.counterId = ''
        this.changeCounter.counterName = ''
      } else if (val.type == "店铺") {
        console.log(this.dataGridOptions)
        this.printSelectDate.shop = ''
        this.dataGridOptions.shopId = ''
        this.printSelectDate.takeUser = ''
        if (this.dataGridOptions.takeUserList.length > 0) {
          this.dataGridOptions.takeUserList[0].takeUserId = ''
        }
        this.takeUserDisabled = true
      } else if (val.type == "库位") {
        this.dataGridOptions.storageId = ''
        this.printSelectDate.storage = ''
      } else if (val.type == "供应商") {
        this.dataGridOptions.supplierId = ''
        this.printSelectDate.supplier = ''
      } else if (val.type == "制单人") {
        this.printSelectDate.preparedBy = ''
        Object.assign(this.dataGridOptions, {
          makeUserList: [],
        })
      } else if (val.type == "审核人") {
        this.printSelectDate.auditor = ''
        Object.assign(this.dataGridOptions, {
          checkUserList: [],
        })
      } else if (val.type == "收货人") {
        this.printSelectDate.auditor = ''
        Object.assign(this.dataGridOptions, {
          takeUserList: [],
        })
      }
      this.send()
    },
    dropReturn(val) {
      if (val.type == "柜组") {} else if (val.type == "店铺") {
        this.printSelectDate.shop = val.item.operateName
        this.dataGridOptions.shopId = val.item.operateId
        this.takeUserDisabled = false
        this.getGetUserInfo()
      } else if (val.type == "库位") {
        this.dataGridOptions.storageId = val.item.operateId
        this.printSelectDate.storage = val.item.operateName
      } else if (val.type == "供应商") {
        this.dataGridOptions.supplierId = val.item.operateId
        this.printSelectDate.supplier = val.item.operateName
      } else if (val.type == "制单人") {
        this.printSelectDate.preparedBy = val.item.operateName
        Object.assign(this.dataGridOptions, {
          makeUserList: [{
            makeUserId: ''
          }],
        })
        this.dataGridOptions.makeUserList[0].makeUserId = val.item.operateId
      } else if (val.type == "审核人") {
        this.printSelectDate.takeUser = val.item.operateName
        Object.assign(this.dataGridOptions, {
          checkUserList: [{
            checkUserId: ''
          }],
        })
        this.dataGridOptions.checkUserList[0].checkUserId = val.item.operateId
      } else if (val.type == "收货人") {
        this.printSelectDate.auditor = val.item.operateName
        Object.assign(this.dataGridOptions, {
          takeUserList: [{
            takeUserId: ''
          }],
        })
        this.dataGridOptions.takeUserList[0].takeUserId = val.item.operateId
      }
      this.currentPage = 1
      this.send()
    },

    //库位
    storageFunc() {
      this.send()
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

    //制单人
    getUserList() {
      let options = {
        type: 1,
        companyId: sessionStorage.getItem('companyId'),
        shopId: ''
      }
      seekMemberList(options).then((res) => {
        this.shopUserList = res.data.data.dataList.filter(item => item.role != '店长' && item.role != '店员');
      }, (res) => {
        console.log(res);
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

    //收货店铺
    getShopListByCo() {
      let options = {
        page: "1",
        pageSize: '100'
      }
      seekGetShopListByCo(options).then((res) => {
        this.productCategory[2].children = res.body.data.shopList
        this.distributorList = res.body.data.shopList
        if (res.body.data.shopList.length == 1 && !this.computedRole) {
          this.dataGridOptions.shopFlag = '1'
          this.changeShopData(res.body.data.shopList[0])
        }
      }, (res) => {
        console.log(res);
      })
    },

    //产品类别
    getProductTypeList() {

    },

    //获取库位列表
    getShop() {
      seekRepositoryList().then((res) => {
        this.repositoryList = res.data.data.repositoryList;
      }, (res) => {

      })
    },

    //获取当前的接口类型
    getReportType() {
      return this.dataGridOptions.type
    },


    getTimeData(val) {
      this.dataGridOptions.beginTime = val.substr(0, 10).split('-').join("") + "000000"
      this.printSelectDate.startTime = val
      this.send();
    },
    overTimeDate(val) {
      this.dataGridOptions.endTime = val.substr(0, 10).split('-').join("") + "235959"
      this.printSelectDate.endTime = val
      this.send();
    },

    getDate(day, type) {
      let _date = new Date()
      _date.setDate(_date.getDate() + day)
      //年
      let Year = _date.getFullYear()
      //月
      let month = this.formatDate(_date.getMonth() + 1)
      //天
      let Day = this.formatDate(_date.getDate())
      //时
      let hours = this.formatDate(_date.getHours())
      //分
      let mins = this.formatDate(_date.getMinutes())
      //秒
      let seconds = this.formatDate(_date.getSeconds())

      let timestamp = Year + month + Day

      let currentData = new Date()

      if (type == 'end') {
        if (Year < currentData.getFullYear() ||
          month < currentData.getMonth() + 1 ||
          Day < currentData.getDate()
        ) {
          hours = '23'
          mins = seconds = '59'
        }
      } else if (type == 'start') {
        hours = mins = seconds = '00'
      }

      return {
        format: Year + '-' + month + '-' + Day,
        timestamp: timestamp,
        fullData: timestamp + hours + mins + seconds
      }
    },

    formatDate(d) {
      return d < 10 ? ('0' + d) : d + ''
    },


    send() {
      this.loading = true;
      seekGetReportsComprehensive(this.dataGridOptions).then((res) => {
        if (res.data.state == 200) {
          this.dataGridStorage = [
            {
                barcode: '100',
                productTypeName: '100',
                className: '100',
                weight: '100',
                GoldWeight: '100',
                main: '100',
                deputy: '100',
                soldPrice: '100',
                orderNum: '100',
                productClass: '100',
                locationName: '100',
                productStatus: '100'
              },
              {
                barcode: '100',
                productTypeName: '100',
                className: '100',
                weight: '100',
                GoldWeight: '100',
                main: '100',
                deputy: '100',
                soldPrice: '100',
                orderNum: '100',
                productClass: '100',
                locationName: '100',
                productStatus: '100'
              },
              {
                barcode: '100',
                productTypeName: '100',
                className: '100',
                weight: '100',
                GoldWeight: '100',
                main: '100',
                deputy: '100',
                soldPrice: '100',
                orderNum: '100',
                productClass: '100',
                locationName: '100',
                productStatus: '100'
              }
            ]
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

    //懒加载
    lazyloadSend() {
      this.currentPage++
        this.send()
    }
  },

  mounted() {

    this.$nextTick(() => {

      //获取公司信息
      let companyName = JSON.parse(localStorage.getItem('companyInfo'))
      if (companyName) {
        this.printSelectDate.companyName = '公司名：' + companyName.companyName
      }

      this._seekRepositoryList()
    })
  }
}

</script>
<style lang="scss">
.ml-10{
  margin-left: 10px;
}
.data-center-header-right-cut{
  position: absolute;
  right: 10px;
  top: 12px;
  color: #2993f8;
  cursor: pointer;
  .drop-triangle{
    font-size: 12px;
    display: inline-block;
    transition: all .3s;
    color: #666;
    transform-origin: center center;
  }
}
</style>