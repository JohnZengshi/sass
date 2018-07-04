<template>
<transition name="tp-ani">

<div class="RP_report_wrapper ui-page-max-width report_table_fixed" v-if="isPrint==0">
  
  <div class="Rp_title_container">
    <!--面包屑-->
    <div class="Rp_crumbs">
      <i class="iconfont icon-baobiao1"></i>
      <router-link tag="span" to="/work/report/" class="path_crumbs">报表</router-link> > <span class="txt">进销存汇总表</span>
    </div>
    <div class="Rp_selected_container">
            <Cascade
                v-if="computedRole"
                :computedRole="computedRole"
                :propList="productCategory"
                titleName="全公司"
                @clear = "callProductCategory"
                @dropReturn = "changeVaue"
            >
            </Cascade>

            <DownMenu
              v-else
              :titleInfo="dataGridOptions.shopName ? dataGridOptions.shopName : '全店铺'"
              :showList="productCategory[2].children"
              :nameKey="'shopName'"
              @changeData="changeShopData"
              @clearInfo="clearShop"
            ></DownMenu>
            
            <div class="report-data">
                <div class="block until" data-txt="至">
                    <el-date-picker size="mini" v-model="beginTime" @change="getTimeData"  type="date" placeholder="选择开始时间" :picker-options="pickerOptions1"></el-date-picker>
                </div>
                <div class="block">
                    <el-date-picker size="mini" v-model="endTime" @change="overTimeDate"  type="date" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
                </div>
            </div>
            <el-button type="primary" size="small" class="back-btn" @click.native="toHome">返回上一级</el-button>
    </div>
  </div>
  
  <div class="Rp_dataGrid_container">
    <div class="rp_gridState">
      <p class="side-nav"><i class="iconfont icon-liebiao"></i>商品列表</p>
            <div class="sort-wrap">
                <label>排序:</label>
                <div v-for="(item, index) in sortList" :key="index">
                {{item.name}}
                <img v-if="item.value == '2'" src="./../../../../../static/img/sort/down1.png">
                <img v-if="item.value == '1'" src="./../../../../../static/img/sort/up1.png">
                <i class="el-icon-circle-cross" @click="cancelSort(item, index)"></i>
                </div>
            </div>

            <filter-header :isOld="true" :specialItem="true" @complate="filterHeaderComplate" @reportSwitch="reportSwitch"></filter-header>

    </div>
    
    <div class="rp_dataGridTemp" :class="tabShow" v-loading = "loading" element-loading-text="数据查询中">
        <report-detail
            ref="reportDetailWrap"
            :dataGridStorage="dataGridStorage" 
            :tabSwitch = "tabSwitch"
            :positionSwitch="positionSwitch"
            :newList="newList"
            :reportType="getReportType()"
            @lazyloadSend = "lazyloadSend"
            @sortList="sortListAct"
            @scrollClass = "tabScrollShow" 
        >
        </report-detail>

        <report-load v-if="dataGridStorage.totalNum != '0' && dataGridOptions.type === 1" @LoadOptionsDefault="LoadOptionsDefault"></report-load>
    </div>
    
  </div>
    
<!--     <div class="printBtn exportBtn" @click="exportTab()">
        <i class="iconfont icon-daochu"></i>
        <span>导出报表</span>
    </div> -->
    <!-- 按钮组 -->
    <div class="utilsBtn flex flex-v flex-pack-justify">
        <div class="btn" @click="tabPrin()">
            <i class="iconfont icon-dayin1"></i>
            <span>打印报表</span>
        </div>
    </div>
    

    <!--打印模块-->
    <div style="display: none;">
    
        <intelligence-type-template v-if="this.dataGridOptions.type==2" title="进销存-智能分类-汇总" ref="intelligenceTypeTemplate" :sellList="filterHasData(dataGridStorage.dataList)" :headerData="printSelectDate"></intelligence-type-template>

        <project-type-template v-if="this.dataGridOptions.type==3" title="进销存-产品类别-汇总" ref="projectTypeTemplate" :sellList="filterHasData(dataGridStorage.dataList)" :headerData="printSelectDate"></project-type-template>

        <custom-template v-if="this.dataGridOptions.type==4" title="进销存-自定义-汇总" ref="customTemplate" :sellList="filterHasData(dataGridStorage.dataList)" :headerData="printSelectDate"></custom-template>

    </div>
</div>
<!--打印模块-->
<!-- <div ref="tablePrint" v-else-if="isPrint==1" >
  <table-print 
    typeName="汇总"
    :tabSwitch = "tabSwitch"
    :reportType="getReportType()"
    :printSelectDate = "printSelectDate"
    :dataGridStorage="dataGridStorage">
  </table-print>
</div>   -->
</transition>
</template>

<style scoped>
    
</style>


<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'
import find from 'lodash/find'
import filterHeader from './base/filter-header'
 import {seekGetReportsComprehensive} from './../../../../Api/commonality/seek.js'
 import {
    seekRepositoryList, 
    seekGetDepUserList,
    seekGetUserList,
    seekGetShopListByCo,
    seekGetUserInfo
 } from 'Api/commonality/seek.js'
import Cascade from './base/Cascade'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DownMenu from 'base/menu/DownMenu'
import DropDownMenu from './../../../../components/template/DropDownMenu'
// import ReportDetail from './dataGrid/reportDetailTab'
import ReportDetail from './newDataGrid/hzReportDetailTab'
//打印模块
// import TablePrint from './print/dataGridPrint'
import TablePrint from './newPrint/reportDetailTab'
//打印模板，明细，产品分类，智能分类=自定义
import projectTypeTemplate from "@/components/jcp-print/jxc/project-type-template";
import intelligenceTypeTemplate from "@/components/jcp-print/jxc/intelligence-type-template";
import customTemplate from "@/components/jcp-print/jxc/intelligence-type-template";
// import cutBg from "base/cut/cut-bg";
// import cutSegmentation from "base/cut/cut-segmentation";

// 导出报表
import { downLoaderFile } from 'Api/downLoaderFile'

// 加载控件
import ReportLoad from './LoadOptions/ReportLoadOption'

export default {
    components:{
        ReportDetail,
        TablePrint,
        Cascade,
        DropDownMenu,
        DownMenu,
        projectTypeTemplate,
        intelligenceTypeTemplate,
        customTemplate,
        ReportLoad,
        // cutBg,
        // cutSegmentation,
        filterHeader
    },
    data() {
      return {
        // 新
        // madeUpList: [
        //     {
        //         name: '成品',
        //         id: '1'
        //     },
        //     {
        //         name: '旧料',
        //         id: '2'
        //     }
        // ],
        // cutSegmentationList: [
        //     {
        //         name: '智能分类',
        //         id: '1'
        //     },
        //     {
        //         name: '产品分类',
        //         id: '2'
        //     },
        //     {
        //         name: '自定义',
        //         id: '3'
        //     }
        // ],
        // 旧
        openReset: true,
        productCategory: [
            {
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
        isPrint : 0,
        printSelectDate : {
          storage : '',//发货库位
          productType : '',//产品类别
          shop :'', //收货铺位
          preparedBy: '',//制单人
          auditor: '',//审核人
          takeUser: '',//收货人
          startTime : '',//制单时间
          endTime : '',
          headerData : '发货', //制单大标题
          reportType : '4',//1代表入库、2退库、3调库、4发货、5调柜、6退货
            companyName : '', //公司名,
            showCompany : true //是否显示公司名  在用户不选择条件筛选的情况下 默认显示公司名
        },
        //
        tabShow: 'tabShow',
        currentPage : 1,
        
        loading:true,
        
        dataGridStorage : {},
        dataGridDetailList : [],
    
      //成本核算
      tabSwitch : false,
      
        //产品类别
        productCategoryType : [],
        categoryProps:{
          value:'classesId',
          label:'classesName',
          children:'typeList'
        },

        tabClassActive :{
          index : 1,
          activeClass : 'active'
        },
        
        //大、小类 tab切换
        tabData : [
          { txt:'明细', fun : this.tabs ,type:3},
          { txt:'成色大类', fun : this.tabs,type:1 },
          { txt:'成色小类', fun : this.tabs ,type:2}
        ],
        
        //收货店铺
        distributorSpaceValue : '',
        
        
        //制单人
        preparedSpaceValue : '',
        
        //审核人
        auditorSpaceValue : '',
        //收货人
        GetUserInfoList :[],
        takeUserDisabled : true,
        
        //入库库位
        storageSpaceValue : '',

        provider: '',
        providerId: '',
        
        //
        propOptons: {
          beginTime : '',
          endTime : '',
            storageId : '', //入库ID
            productTypeId : '',//产品类别ID
            shopId : '',//收货店铺ID
            makeUserList: [
                {
                    makeUserId : '',//制单人ID
                }
            ],
            checkUserList: [
                {
                    checkUserId : '',//审核人ID
                }
            ],
            takeUserList: [
                {
                    takeUserId : '', //收货人ID
                }
            ],
            reportType : 3 //报表类型 ，为1时代表成色大类，为2时是成色小类，为3时是明细 ,默认为明细
        },
        
        reportPrint_fixed : false,
        dataGridOptions: {
            productClass: '1',
            beginTime : '',
            endTime : '',
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
            takeUserList: [
            ],
            // productClass: '1',
            sortFlag: '0',
            sortList: [{classTypeName: '1'}],
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
        sortList: [{name: '产品类别', value: '1'}],
        newList: [{name: '产品类别', value: '1'}]
      };
    },
    created() {
        this.dataGridOptions.beginTime = this.getDate(-((new Date()).getDate()-1),'start').fullData
        this.dataGridOptions.endTime = this.getDate(0,'end').fullData
        
        //日期控件默认设置时间
        this.beginTime = this.getDate(-((new Date()).getDate()-1),'start').format
        this.endTime = this.getDate(0,'end').format
        //打印时间
        this.printSelectDate.startTime = this.beginTime
        this.printSelectDate.endTime = this.endTime
        this.getShopListByCo() //店铺
        // this.send()
        this.$store.dispatch('checkBrowser',(type)=>{
           this.reportPrint_fixed = type
        })
    },
    watch:{
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
            "userPositionInfo", // 职位信息
            "shopListByCo" // 店铺列表
        ]),
        shopRole: function () { // 店员
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
        computedRole: function () { // 公司
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
            }
        },
        computedManageRole: function () { // 公司
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionComputedManageRole(this.userPositionInfo.roleList)
            }
        },
        officeClerk () { // 职员
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionOfficeClerk(this.userPositionInfo.roleList)
            }
        },
        shopManageRole () { // 店长
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
            }
        },
        isJrole:function() { // 判断是不是监察员
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionJCY(this.userPositionInfo.roleList);
            }
        }
    },
    methods: {
        /* ---new--- */
        // 完成
        filterHeaderComplate (parm) {
            Object.assign(this.dataGridOptions, parm)
            this.send()
        },
        //成本控制
        reportSwitch(parm){
          this.tabSwitch = parm
        },
        // 打印表格
        send () {
          this.loading = true;
          seekGetReportsComprehensive(this.dataGridOptions).then((res) => {
            if (res.data.state == 200) {
                this.dataGridStorage = res.data.data
                setTimeout(() => {
                    if (this.$refs.reportDetailWrap) {
                        this.$refs.reportDetailWrap._setMCustomScrollbar()
                    }
                }, 800)
                this.loading = false
            }  else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
            }
            this.loading = false
          }, (res) => {

          })
        },
        
        //懒加载
        lazyloadSend(){
           // this.currentPage++
           // this.send()
        },

        // 滚动条滚动时不显示总计
        tabScrollShow( type ){
            this.tabShow = type ? 'tabShow' : ''
        },

        // 提取有数据的值
        filterHasData (parm) {
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
        changeVaue (parm) {
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

        callProductCategory () {
            this.dataGridOptions.receiveObject = 1
            this.dataGridOptions.shopId = ''
            this.dataGridOptions.storageId = ''
            this.send()
        },

        changeShopData (parm) {
            this.dataGridOptions.receiveObject = 5
            this.dataGridOptions.shopId = parm.shopId
            this.dataGridOptions.shopName = parm.shopName
            this.send()
        },

        clearShop () {
            this.dataGridOptions.receiveObject = 3
            this.dataGridOptions.shopName = ''
            this.dataGridOptions.shopId = ''
            this.dataGridOptions.shopFlag = '1'
            this.send()
        },

        _seekRepositoryList () {
            if (this.userPositionInfo.roleList) {
                let options = {
                    page: '1',
                    pageSize: 9999,
                    // type: 1 // 1.可查看 2.所属 3.全部
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

        //店铺
        getShopListByCo(){
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

        cancelSort (item, index) { // 取消排序
            this.sortList.splice(index, 1)
            this.newList = this.sortList
        },

        sortListAct (val) { // 列表排序
            console.log(val)
            this.dataGridOptions.sortList = val
            this.send()
            this.sortList = []
            val.forEach((item, index) => {
                switch (Object.keys(item)[0]) {  
                    case 'barcode':
                        this.sortList.push({name: '条码号', value: item.barcode})
                    break;
                    case 'weight':
                        this.sortList.push({name: '件重', value: item.weight})
                    break;
                    case 'className':
                        this.sortList.push({name: '首饰名称', value: item.className})
                    break;
                    case 'classTypeName':
                        this.sortList.push({name: '产品类别', value: item.classTypeName})
                    break;
                    case 'goldWeight':
                        this.sortList.push({name: '金重', value: item.goldWeight})
                    break;
                    case 'price':
                        this.sortList.push({name: '售价', value: item.price})
                    break;
                    case 'cost':
                        this.sortList.push({name: '成本', value: item.cost})
                    break;
                    case 'num':
                        this.sortList.push({name: '件数', value: item.num})
                    break;
                }
                
            })
        },

        toHome(){
          this.$router.push('/work/report/')
        },

        //获取当前的接口类型
        getReportType(){
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

        getDate( day, type  ){
            let _date = new Date() 
            _date.setDate( _date.getDate() + day )
            //年
            let Year = _date.getFullYear()
            //月
            let month = this.formatDate(_date.getMonth()+1)
            //天
            let Day = this.formatDate(_date.getDate())
            //时
            let hours = this.formatDate(_date.getHours())
            //分
            let mins = this.formatDate(_date.getMinutes())
            //秒
            let seconds = this.formatDate(_date.getSeconds())
            
            let timestamp = Year + month +  Day 
            
            let currentData = new Date()
            
            if( type == 'end' ){
                if( Year < currentData.getFullYear() || 
                  month < currentData.getMonth()+1 ||
                  Day < currentData.getDate()
                ){
                  hours = '23'
                  mins = seconds = '59'
                }
            }else if( type == 'start'){
              hours = mins = seconds = '00'
            }
            
            return {
                format : Year +'-'+ month +'-'+  Day ,
                timestamp : timestamp,
                fullData : timestamp + hours + mins + seconds
            }
        },

        formatDate( d ){
           return d < 10 ? ('0' + d ) : d + ''
        },

        // 通过角色请求数据
        seekSend () {
            if (this.userPositionInfo.roleList) {
                if (!this.computedRole) {
                    this.dataGridOptions.receiveObject = 3
                }
                this.send()
            } else {
                setTimeout(() => {
                    this.seekSend()
                }, 800)
            }
        },

        // 打印
        tabPrin(){
          switch (this.dataGridOptions.type){
            case 1:
              this.$refs.detailTemplate.print();
              break;
            case 2:
              this.$refs.intelligenceTypeTemplate.print();
              break;
            case 3:
              this.$refs.projectTypeTemplate.print();
              break;
            case 4:
              this.$refs.customTemplate.print();
              break;
            default:
              break;
          }
        },

        // 导出报表
        exportTab(){
            console.log('导出报表')
            let exportTabData =Object.assign({},this.dataGridOptions)
            exportTabData['exportType'] = 'FH'
            console.log(exportTabData)
            if(exportTabData.type === 1){
            downLoaderFile('/v1/export/exportExcelByReport',exportTabData)
            } else {
            downLoaderFile('/v1/export/exportExcelBySmart',exportTabData)          
            }
        },

        LoadOptionsDefault(pageSize) {
          if (this.dataGridOptions.pageSize > this.dataGridStorage.totalNum) {
            // 更换文字
            $('.loadControl span').html('已经到底了').css('color', '#474747')
            return;
          }
          this.loading = true;
          this.dataGridOptions.pageSize += pageSize;
          seekGetReportsComprehensive(this.dataGridOptions).then((res) => {
            if (res.data.state == 200) {
              this.dataGridStorage = res.data.data
              setTimeout(() => {
                if (this.$refs.reportDetailWrap) {
                  this.$refs.reportDetailWrap._setMCustomScrollbar()
                }
              }, 800)
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
        /* ----------------------------------------old-------------------------------------------------- */
    },
    
    mounted(){
        
        this.$nextTick(()=>{
            this.seekSend()
            //获取公司信息
            let companyName = JSON.parse(localStorage.getItem('companyInfo'))
            if(companyName){
              this.printSelectDate.companyName = '公司名：'+ companyName.companyName 
            }
            this._seekRepositoryList()
        })
    }
 }
</script>

