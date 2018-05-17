<template>
<transition name="tp-ani">

<div class="RP_report_wrapper ui-page-max-width report_table_fixed" v-if="isPrint==0">
	
	<div class="Rp_title_container">
		<!--面包屑-->
		<div class="Rp_crumbs">
			<i class="iconfont icon-baobiao1"></i>
			<router-link tag="span" to="/work/report/" class="path_crumbs">报表</router-link> > <span class="txt">发货</span>
		</div>
		<div class="Rp_selected_container">
            <DropDownMenu
                class="selected_dropdown"
                titleName="发货库位"
                dataType="库位"
                :propList="repositoryList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </DropDownMenu>
            <span class="spaceMark">|</span>	
  			<Cascade
                :propList="productCategory"
                titleName="产品类别"
                @clear = "callProductCategory"
                @dropReturn = "changeVaue"
            >
            </Cascade>
  			<span class="spaceMark">|</span>
  			
             <DropDownMenu
                class="selected_dropdown"
                titleName="收货店铺"
                dataType="店铺"
                :propList="distributorList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </DropDownMenu>
            <span class="spaceMark">|</span>
            
            <DropDownMenu
                class="selected_dropdown"
                titleName="制单人"
                dataType="制单人"
                :propList="shopUserList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </DropDownMenu>
            <span class="spaceMark">|</span>
            
            <DropDownMenu
                class="selected_dropdown"
                titleName="审核人"
                dataType="审核人"
                :propList="auditorUserList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </DropDownMenu>
            <span class="spaceMark">|</span>
            
            <DropDownMenu
                v-if="!takeUserDisabled"
                class="selected_dropdown"
                titleName="收货人"
                dataType="收货人"
                :propList="GetUserInfoList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </DropDownMenu>
            <div v-else class="selected_dropdown el-dropdown placeholder disabled">
               <span class="el-dropdown-link">收货人</span>
               <i class="iconfont icon-arrow-down"></i>
            </div>
            
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
			<p class="side-nav"><i class="iconfont icon-liebiao"></i>发货报表</p>
			<!--<el-switch v-model="tabSwitch" :width="30" :title="tabSwitch ? '关闭成本核算':'开启成本核算'"></el-switch>-->
            <div class="sort-wrap">
                <label>排序:</label>
                <div v-for="(item, index) in sortList" :key="index">
                {{item.name}}
                <img v-if="item.value == '2'" src="./../../../../../static/img/sort/down1.png">
                <img v-if="item.value == '1'" src="./../../../../../static/img/sort/up1.png">
                <i class="el-icon-circle-cross" @click="cancelSort(item, index)"></i>
                </div>
            </div>
            <!-- <div class="position-group">
                <span class="btn" v-if="dataGridOptions.type != 1" :title="positionSwitch ? '取消位置' : '选择位置'" @click="choseMenu(1)" :class="{active: positionSwitch}" :disabled="dataGridOptions.type == 1">位置</span>
            </div> -->
            <div class="xj-switch" v-if="isShowCost == 'Y'">
                <!-- <el-checkbox v-model="tabSwitch">成本</el-checkbox> -->
                <span class="btn" :title="tabSwitch?'关闭成本' : '开启成本'" @click="choseMenu(2)" :class="{active: tabSwitch}">专列项</span>
            </div>
			<div class="tab">
                <span
                    :class="0 == tabClassActive.index ? tabClassActive.activeClass : ''"
                    @click="tabs(0, 1)"
                >明细
                </span>
                <span
                    :class="1 == tabClassActive.index ? tabClassActive.activeClass : ''"
                    @click="tabs(1, 2)"
                >智能分类
                </span>
                <span
                    :class="2 == tabClassActive.index ? tabClassActive.activeClass : ''"
                    @click="tabs(2, 3)"
                >产品分类
                </span>
                <span
                    :class="3 == tabClassActive.index ? tabClassActive.activeClass : ''"
                    @click="tabs(3, 4)"
                    @mouseover="tabHover(3, $event)"
                    @mouseout="tabOut(3, $event)"
                >自定义
                    <i v-if="tabClassActive.index == 3" class="iconfont icon-arrow-down"></i>
                    <div class="customDia" ref="customDia">
                    <div class="body" v-if="openReset">
                        <div class="list-wrap">
                        <ul>
                            <li></li>
                            <li>成色名称</li>
                            <li>宝石名称</li>
                            <li>首饰类别</li>
                        </ul>
                        <ul>
                            <li>计重类</li>
                            <li>
                            <DropDownMenu
                                titleName="不选"
                                dataType="customDia"
                                dataDataType="成色名称-计重"
                                :propList="dialogOptions.conditionList"
                                :resetFlag='resetFlag'
                                @infoBack="diaInfoBack"
                            >
                            </DropDownMenu>
                            </li>
                            <li>
                            <DropDownMenu
                                titleName="不选"
                                dataType="customDia"
                                dataDataType="宝石名称-计重"
                                :propList="dialogOptions.conditionList"
                                :resetFlag='resetFlag'
                                @infoBack="diaInfoBack"
                            >
                            </DropDownMenu>
                            </li>
                            <li>
                            <DropDownMenu
                                titleName="大类"
                                dataType="customDia"
                                dataDataType="首饰类别-计重"
                                :propList="dialogOptions.jewelryList"
                                :resetFlag='resetFlag'
                                @infoBack="diaInfoBack"
                            >
                            </DropDownMenu>
                            </li>
                        </ul>
                        <ul>
                            <li>计件类</li>
                            <li>
                            <DropDownMenu
                                titleName="不选"
                                dataType="customDia"
                                dataDataType="成色名称-计件"
                                :propList="dialogOptions.conditionList"
                                :resetFlag='resetFlag'
                                @infoBack="diaInfoBack"
                            >
                            </DropDownMenu>
                            </li>
                            <li>
                            <DropDownMenu
                                titleName="不选"
                                dataType="customDia"
                                dataDataType="宝石名称-计件"
                                :propList="dialogOptions.conditionList"
                                :resetFlag='resetFlag'
                                @infoBack="diaInfoBack"
                            >
                            </DropDownMenu>
                            </li>
                            <li>
                            <DropDownMenu
                                titleName="大类"
                                dataType="customDia"
                                dataDataType="首饰类别-计件"
                                :propList="dialogOptions.jewelryList"
                                :resetFlag='resetFlag'
                                @infoBack="diaInfoBack"
                            >
                            </DropDownMenu>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div class="foot" solt="footer">
                        <div class="btn-wrap">
                        <div @click.stop="resetOption" class="reset btn">重置</div>
                        <div @click.stop="compOption" class="comp btn">完成</div>
                        </div>
                    </div>
                    </div>
                </span>
			</div>
		</div>
		
		<div class="rp_dataGridTemp" :class="tabShow" v-loading = "loading" element-loading-text="数据查询中">
			<report-detail 
				:dataGridStorage="dataGridStorage" 
				:tabSwitch = "tabSwitch"
                :positionSwitch="positionSwitch"
                :newList="newList"
				@lazyloadSend = "lazyloadSend"
                @sortList="sortListAct"
				@scrollClass = "tabScrollShow" 
				:reportType="getReportType()">
			</report-detail>
            <report-load v-if="dataGridStorage.totalNum != '0' && dataGridOptions.type === 1" @LoadOptionsDefault="LoadOptionsDefault"></report-load>                        
		</div>
		
	</div>
    
    <div class="printBtn exportBtn" @click="exportTab()">
        <i class="iconfont icon-daochu"></i>
        <span>导出报表</span>
    </div>
    <!-- 按钮组 -->

	<div class="printBtn" @click="tabPrin()">
        <i class="iconfont icon-dayin1"></i>
        <span>打印报表</span>
    </div>
	
	<!--打印模块-->
	<div style="display: none;">
			<detail-template v-if="this.tabClassActive.index==0" title="发货" ref="detailTemplate" :sellList="dataGridStorage" :headerData="printSelectDate"></detail-template>
			<intelligence-type-template v-if="this.tabClassActive.index==1" title="发货" ref="intelligenceTypeTemplate" :sellList="dataGridStorage" :headerData="printSelectDate"></intelligence-type-template>
			<project-type-template v-if="this.tabClassActive.index==2" title="发货" ref="projectTypeTemplate" :sellList="dataGridStorage" :headerData="printSelectDate"></project-type-template>
			<custom-template v-if="this.tabClassActive.index==3" title="发货" ref="customTemplate" :sellList="dataGridStorage" :headerData="printSelectDate"></custom-template>
	</div>
</div>
<!--打印模块-->
<div ref="tablePrint" v-else-if="isPrint==1" >
	<table-print 
        typeName="发货"
		:tabSwitch = "tabSwitch"
		:reportType="getReportType()"
		:printSelectDate = "printSelectDate"
		:dataGridStorage="dataGridStorage">
	</table-print>
</div>	
</transition>
</template>

<style scoped>
    
</style>


<script>
import Vue from 'vue'
import find from 'lodash/find'
 import {seekSendReport} from './../../../../Api/commonality/operate.js'
 import {
 	seekRepositoryList, 
 	seekGetDepUserList,
 	getProductTypeList,
 	seekGetUserList,
 	seekGetShopListByCo,
 	seekGetUserInfo,
    seekMemberList,
    seekSettingUserRole
 } from './../../../../Api/commonality/seek.js'
import Cascade from './../../../../components/template/Cascade'
import DropDownMenu from './../../../../components/template/DropDownMenu'
// import ReportDetail from './dataGrid/reportDetailTab'
import ReportDetail from './newDataGrid/reportDetailTab'
//打印模块
// import TablePrint from './print/dataGridPrint'
import TablePrint from './newPrint/reportDetailTab'
//打印模板，明细，产品分类，智能分类=自定义
import detailTemplate from "@/components/jcp-print/commons/detail-template";
import projectTypeTemplate from "@/components/jcp-print/commons/project-type-template";
import intelligenceTypeTemplate from "@/components/jcp-print/commons/intelligence-type-template";
import customTemplate from "@/components/jcp-print/commons/intelligence-type-template";

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
        detailTemplate,
		projectTypeTemplate,
		intelligenceTypeTemplate,
        customTemplate,
        ReportLoad,
    },
     data() {
      return {
        openReset: true,
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
        productCategory :[],
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
        distributorList : [],
        
        
        //制单人
        preparedSpaceValue : '',
        shopUserList: [],
        
        //审核人
        auditorSpaceValue : '',
        auditorUserList: [],
        
        //收货人
        GetUserInfoList :[],
        takeUserDisabled : true,
        
        //入库库位
        storageSpaceValue : '',
        repositoryList: [], 

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
            beginTime : '',
            endTime : '',
            storageId: '',
            shopId: '',
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
        isShowCost: '',
        sortList: [{name: '产品类别', value: '1'}],
        newList: [{name: '产品类别', value: '1'}]
      };
    },
    created() {
        //后台请求时间
        // this.propOptons.beginTime = this.getDate(-((new Date()).getDate()-1),'start').fullData
        // this.propOptons.endTime = this.getDate(0,'end').fullData
        this.dataGridOptions.beginTime = this.getDate(-((new Date()).getDate()-1),'start').fullData
        this.dataGridOptions.endTime = this.getDate(0,'end').fullData
        
        //日期控件默认设置时间
        this.beginTime = this.getDate(-((new Date()).getDate()-1),'start').format
        this.endTime = this.getDate(0,'end').format
        this.settingUserRole()
        //打印时间
        this.printSelectDate.startTime = this.beginTime
        this.printSelectDate.endTime = this.endTime
        this.getShop(); //库位
        this.getProductTypeList() //产品类别
        this.getShopListByCo() //收货店铺
        this.getUserList(); //制单人
        this.getGetUserList() //审核人
        this.send()
        this.$store.dispatch('checkBrowser',(type)=>{
           this.reportPrint_fixed = type
        })
    },
    watch:{
        'printSelectDate.storage' : function(){
          //发货库位
          this.setPrintShowCompany(this.printSelectDate.storage == '')
        },
        'printSelectDate.productType' : function(){
          //产品类别
          this.setPrintShowCompany(this.printSelectDate.productType == '')
        },
        'printSelectDate.shop' : function(){
          //收货店铺
          this.setPrintShowCompany(this.printSelectDate.shop == '')
        },
        'printSelectDate.preparedBy' : function(){
          //制单人
          this.setPrintShowCompany(this.printSelectDate.preparedBy == '')
        },
        'printSelectDate.auditor' : function(){
          //审核人
          this.setPrintShowCompany(this.printSelectDate.auditor == '')
        },
        'printSelectDate.takeUser' : function(){
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
    methods: {
        choseMenu (type) {
          if (type == 1) {
            this.positionSwitch = !this.positionSwitch
          } else if (type == 2) {
            this.tabSwitch = !this.tabSwitch
          }
        },
        resetOption () {
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
        compOption () {
            if (this.dataGridOptions.type != 4) {
                this.dataGridOptions.type == 4
                this.setReportType(type)
            } else {
                this.send()
            }
            this.customDialog = false
        },
        setReportType( port ){
          if( port )  { 
            if (port == 1) {
              Object.assign(this.dataGridOptions, {
                storageId: '',
                shopId: '',
                counterId: '',
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
                storageId: '',
                shopId: '',
                counterId: '',
                // productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
                pageSize: 15
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
                storageId: '',
                shopId: '',
                counterId: '',
                // productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
                pageSize:15
              })
            } else if (port == 4) {
              Object.assign(this.dataGridOptions, {
                storageId: '',
                shopId: '',
                counterId: '',
                // productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
                keyWord: '',
                wColorId: '',
                wGemId: '',
                wJewelryId: '1',
                nColorId: '',
                nGemId: '',
                nJewelryId: '1',
                pageSize:15
              })
            }
          }
          this.dataGridOptions.type = port
          this.send()
        },
        settingUserRole () { // 用户查看成本权限
          let options = {
            userId: sessionStorage.getItem('id')
          }
          seekSettingUserRole(options).then((res) => {
            console.log(res)
            if (res.data.state == 200) {
              this.isShowCost = res.data.data.costFlag
            }
          }, (res) => {

          })
        },
        tabs(index, type, evt){
          if(this.tabClassActive.index == index) return
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
        diaInfoBack (val) { // 弹框信息返回
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
        toggleAttribute () {
          this.dataGridOptions.page = 1
          this.dataGridOptions.pageSize = 15
        //   this.dataGridOptions.productClass = this.dataGridOptions.productClass == 1 ? 2 : 1
          this.loading = true;
          this.send()
          
        },
        //成本控制
        reportSwitch(){
          this.tabSwitch = !this.tabSwitch  
        },
        setPrintShowCompany( type ){
          this.printSelectDate.showCompany = type 
        },
        
        toHome(){
          this.$router.push('/work/report/')
        },
        clearInfo (val) {
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
                Object.assign(this.dataGridOptions,{
                  makeUserList : [],
                }) 
            } else if (val.type == "审核人") {
                this.printSelectDate.auditor = ''
                Object.assign(this.dataGridOptions,{
                  checkUserList : [],
                })  
            } else if (val.type == "收货人") {
                this.printSelectDate.auditor = ''
                Object.assign(this.dataGridOptions,{
                  takeUserList : [],
                })
            }
            this.dataGridOptions.pageSize = 15
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
            this.send()
        },
        dropReturn(val) {
            if(val.type == "柜组") {
            } else if (val.type == "店铺") {
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
                Object.assign(this.dataGridOptions,{
                  makeUserList : [{
                      makeUserId: ''
                  }],
                })
                this.dataGridOptions.makeUserList[0].makeUserId = val.item.operateId
            } else if (val.type == "审核人") {
                this.printSelectDate.takeUser = val.item.operateName
                Object.assign(this.dataGridOptions,{
                  checkUserList : [{
                      checkUserId: ''
                  }],
                }) 
                this.dataGridOptions.checkUserList[0].checkUserId = val.item.operateId
            } else if (val.type == "收货人") {
                this.printSelectDate.auditor = val.item.operateName
                Object.assign(this.dataGridOptions,{
                  takeUserList : [{
                      takeUserId: ''
                  }],
                }) 
                this.dataGridOptions.takeUserList[0].takeUserId = val.item.operateId
            }
            this.currentPage = 1
            this.dataGridOptions.pageSize = 15
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
            this.send()
        },
    	
    	//库位
    	storageFunc(){
            this.dataGridOptions.pageSize = 15
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
    		this.send()
    	},
    	changeVaue (val) {
            this.dataGridOptions.productTypeId = val.item.operateId
            this.printSelectDate.productType = val.item.operateName
            this.currentPage = 1
            this.dataGridOptions.pageSize = 15
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
    		this.send()
        },
    	//产品类别
    	callProductCategory( res ){
    		
    		if( res.length == 0 ){
    			this.printSelectDate.productType = ''
                this.dataGridOptions.productTypeId = ''
                this.dataGridOptions.pageSize = 15
                $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
    			this.send()
    			return
    		}
    		
    	},

    	//滚动条滚动时不显示总计
    	tabScrollShow( type ){
    		this.tabShow = type ? 'tabShow' : ''
    	},

        //获取收货人
        getGetUserInfo(){
        	let option = {
                type : 2,
                companyId : sessionStorage.getItem('companyId'),
                shopId : this.dataGridOptions.shopId
            }
            seekMemberList(option).then((res) => {
                this.GetUserInfoList = res.body.data.dataList;
            }, (res) => {
                
            })
        },
        
        //制单人
        getUserList() {
            let options = {
                type : 1,
                companyId : sessionStorage.getItem('companyId'),
                shopId : ''
            }
            seekMemberList(options).then((res) => {
                this.shopUserList = res.data.data.dataList.filter(item => item.role !='店长' && item.role !='店员');
            }, (res) => {
                console.log(res);
            })
        },
        
        //审核人
        getGetUserList(){
            let options = {
                type : 1,
                companyId : sessionStorage.getItem('companyId'),
                shopId : ''
            }
            seekMemberList(options).then((res) => { 
                this.auditorUserList = res.data.data.dataList.filter(item => item.role.indexOf('管理员') >= 0)
            }, (res) => {
                console.log(res);
            })

        },
        
        //收货店铺
        getShopListByCo(){
        	let options = {
                page: "",
                pageSize: '10'
            }
            seekGetShopListByCo(options).then((res) => {
                this.distributorList = res.body.data.shopList
            }, (res) => {
                console.log(res);
            })
        },
        
        //产品类别
        getProductTypeList() {
            getProductTypeList().then((res) => {
                let  productCategory = res.data.data.list
                if( productCategory.length > 0 ){
	        		let tempCategory = [];
	        		productCategory.forEach((item) =>{
	        			
	        			switch( Number(item.classesType) ){
	        				case 1 :
	        					//item.classesName = '素金类';
	        					item.classesId = item.classesType
	        					tempCategory.push(item);
	        				break;
	        				case 2 :
	        					//item.classesName = '珠宝类'
	        					item.classesId = item.classesType
	        					tempCategory.push(item)
	        				break;
	        				case 3 :
	        					//item.classesName = '饰品类'
	        					item.classesId = item.classesType
	        					tempCategory.push(item)
	        				break;
	        			}
	        		})
	        		this.productCategory = tempCategory
	        	}
            }, (res) => {
                console.log(res);
            })
        },
        
        //获取库位列表
        getShop() {
            seekRepositoryList().then((res) => {
                this.repositoryList = res.data.data.repositoryList;
            }, (res) => {

            })
        },
        
        //获取当前的接口类型
        getReportType(){
        	return this.dataGridOptions.type
        },
        
        setReportType( port ){
        	if( port ) this.dataGridOptions.type = port
        },
        
        getTimeData(val) {
            this.dataGridOptions.beginTime = val.substr(0, 10).split('-').join("") + "000000"
            this.printSelectDate.startTime = val
            this.dataGridOptions.pageSize = 15
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
            this.send();
        },
        overTimeDate(val) {
            this.dataGridOptions.endTime = val.substr(0, 10).split('-').join("") + "235959"
            this.printSelectDate.endTime = val
            this.dataGridOptions.pageSize = 15
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
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
        
        //打印表格
        send () {
          this.loading = true;
          seekSendReport(this.dataGridOptions).then((res) => {
            if (res.data.state == 200) {
              this.dataGridStorage = res.data.data
              this.loading = false
            }
          }, (res) => {

          })
        },
        
        //懒加载
        lazyloadSend(){
           this.currentPage++
           this.send()
        },
        tabPrin(){
        	switch (this.tabClassActive.index){
						case 0:
							this.$refs.detailTemplate.print();
							break;
						case 1:
							this.$refs.intelligenceTypeTemplate.print();
							break;
						case 2:
							this.$refs.projectTypeTemplate.print();
							break;
						case 3:
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
        // 加载控件
        getNewListData(e){
        // var e = e || window.event
        console.log('啦啦',e.target.dataset.index)
        console.log('啦啦啦啦啦啦啦',this.dataGridOptions)        
        $('.LoadOptions li').eq(e.target.dataset.index).addClass('action').siblings().removeClass('action')
        $('.LoadOptions').css('display','none');

        // 页面加载

        switch (e.target.dataset.index) {
          case '0':
            this.loadIndex = 10;            
            break;
          case '1':
            this.loadIndex = 20;            
            break;
          case '2':
            this.loadIndex = 100;                      
            break;
          case '3':
            this.loadIndex = 9999;                      
            break;
          default:
            break;
        }

        // console.log('啦啦啦啦啦啦啦',this.dataGridOptions)
        // //this.dataGridOptions.pageSize += 50;
        // seekEntryStorage(this.dataGridOptions).then((res) => {
        //   if(res.data.state == 200) {
        //     this.dataGridStorage = res.data.data
        //     console.log(this.dataGridStorage)
        //   }
        //   if(res.data.state == 200101) {
        //     this.$message({
        //       type: 'error',
        //       message: res.data.msg
        //     })
        //   }
        //   this.loading = false
        // }, (res) => {

        // })

        }, 
        LoadOptionsDefault(pageSize){
        console.log('调用了')
        if(this.dataGridOptions.pageSize>this.dataGridStorage.totalNum) {
           // 更换文字
          $('.loadControl span').html('已经到底了').css('color','#474747')
          return;
        }
        this.loading = true;    
        this.dataGridOptions.pageSize += pageSize;            
        seekSendReport(this.dataGridOptions).then((res) => {
          if(res.data.state == 200) {
            this.dataGridStorage = res.data.data
            console.log('到底了没',this.dataGridStorage)
          }
          if(res.data.state == 200101) {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
          this.loading = false
        }, (res) => {

        })
        },
    },
    
    mounted(){
        
        this.$nextTick(()=>{
            
            //获取公司信息
            let companyName = JSON.parse(localStorage.getItem('companyInfo'))
            if(companyName){
              this.printSelectDate.companyName = '公司名：'+ companyName.companyName 
            }
        })
    }
 }
</script>

