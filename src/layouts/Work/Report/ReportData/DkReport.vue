<template>
<transition name="tp-ani">

<div class="RP_report_wrapper ui-page-max-width report_table_fixed" v-if="isPrint==0" v-loading="loading"  element-loading-text="数据查询中">
	
	<div class="Rp_title_container">
		<!--面包屑-->
		<div class="Rp_crumbs">
			<i class="iconfont icon-baobiao1"></i>
			<router-link tag="span" to="/work/report/" class="path_crumbs">报表</router-link> > <span class="txt">调库</span>
		</div>
		<div class="Rp_selected_container">
            <HeaderDropDownMenu
                class="selected_dropdown"
                titleName="调入库位"
                dataType="库位"
                :propList="repositoryList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </HeaderDropDownMenu>

            <span class="spaceMark">|</span>
            
            <HeaderDropDownMenu
                class="selected_dropdown"
                titleName="调出库位"
                dataType="库位1"
                :propList="repositoryList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </HeaderDropDownMenu>

            <span class="spaceMark">|</span>
            
            <HeaderDropDownMenu
                class="selected_dropdown"
                titleName="制单人"
                dataType="制单人"
                :propList="shopUserList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </HeaderDropDownMenu>

            <span class="spaceMark">|</span>
            
            <HeaderDropDownMenu
                class="selected_dropdown"
                titleName="收货人"
                dataType="收货人"
                :propList="GetUserInfoList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </HeaderDropDownMenu>

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
			<p class="side-nav"><i class="iconfont icon-liebiao"></i>调库报表</p>
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
            <!-- <span 
                class="report-switch float-right mt11" 
                :class = "tabSwitch ? 'active' : ''"
                :title="tabSwitch ? '关闭成本核算':'开启成本核算'" 
                @click="reportSwitch">成本
            </span> -->
            <!-- <div class="position-group">
                <span class="btn" v-if="dataGridOptions.type != 1" :title="positionSwitch ? '取消位置' : '选择位置'" @click="choseMenu(1)" :class="{active: positionSwitch}" :disabled="dataGridOptions.type == 1">位置</span>
            </div> -->
            <div class="xj-switch" v-if="isShowCost == 'Y'">
                <span class="btn" :title="tabSwitch?'关闭成本' : '开启成本'" @click="choseMenu(2)" :class="{active: tabSwitch}">专列项</span>
            </div>
			
            <!-- 表格的筛选 -->
            <div class="tab_wrap">
                <span :class="0 == tabClassActive.index ? 'myspanactive' : ''" @click="tabs(0, 1)">明细</span>
                <span style="color: #d6d6d6">丨</span>						
                <span :class="1 == tabClassActive.index ? 'myspanactive' : ''" @click="tabs(1, 2)">智能分类</span>
                <span style="color: #d6d6d6">丨</span>
                            <span :class="2 == tabClassActive.index ? 'myspanactive' : ''" @click="tabs(2, 3)">产品分类</span>
                <span style="color: #d6d6d6">丨</span>
                <!-- 自定义 -->
                <span style="position: relative" :class="3 == tabClassActive.index ? 'myspanactive' : ''" @mouseover="tabHover(3, $event)" @mouseout="tabOut(3, $event)" @click="tabs(3,4)">自定义
                <div class="customDia site" ref="customDia" style="display: none;">
                    <div class="body">
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
            <!-- 新增的一些筛选 -->
            <div class="xj-report-multi-select-wrap">
                <dropDownColum
                    ref="productTypeIdWrap"
                    :propsList="proList"
                    :keyName="'productTypeId'"
                    titleData="产品类别"
                    @dataBack="dataBack"
                >
                </dropDownColum>

                <dropDownColum
                    ref="colourIdWrap"
                    :propsList="conditionList"
                    :keyName="'colourId'"
                    titleData="成色名称"
                    @dataBack="dataBack"
                >
                </dropDownColum>

                <dropDownColum
                    ref="jeweIdWrap"
                    :propsList="jewelList"
                    :keyName="'jeweId'"
                    titleData="宝石名称"
                    @dataBack="dataBack"
                >
                </dropDownColum>

                <dropDownColum
                    ref="jewelryIdWrap"
                    :propsList="jewelryList"
                    :keyName="'jewelryId'"
                    titleData="首饰类别"
                    @dataBack="dataBack"
                >
                </dropDownColum>
            </div>

            <div class="iconfont_wrap fr">
                <span :class="inconspanactive1 == true ? 'myspanactive' : ''" @click="toggleAttribute(1)">成品</span>
                <span style="color: #d6d6d6;margin:0 1px;font-size: 13px;">丨</span>
                <span :class="inconspanactive2 == true ? 'myspanactive' : ''" @click="toggleAttribute(2)">旧料</span>
            </div>
		</div>
		
		<div class="rp_dataGridTemp" :class="tabShow" v-loading = "loading" element-loading-text="数据查询中">
			<report-detail 
                ref="ReportDetail"
				:dataGridStorage="dataGridStorage" 
				:tabSwitch = "tabSwitch"
                :dataGridOptions="dataGridOptions"
                :orderType="'07'"
				@scrollClass = "tabScrollShow"
                @sortList="sortListAct"
                @lazyloadSend = "lazyloadSend"
                :positionSwitch="positionSwitch"
                :newList="newList"
				:reportType="getReportType()">
			</report-detail>
            <!-- 数据加载控件 end-->
            <!-- <report-load v-if="dataGridStorage.totalNum != '0' && dataGridOptions.type === 1 && dataGridStorage.totalNum>30" @LoadOptionsDefault="LoadOptionsDefault"></report-load>             -->
		</div>
		
	</div>
	
	<!-- <div class="reportPrint_fixed skin-shield" :class="reportPrint_fixed ? 'isWebkit' : ''">
		<el-button type="primary" @click.native="tabPrin()">打印报表</el-button>
	</div> -->
    <div class="utilsBtn flex flex-v flex-pack-justify">
        <div v-if="tabClassActive.index != 0" class="btn" @click="exportTab()">
            <i class="iconfont icon-daochu"></i>
            <span>导出报表</span>
        </div>

        <div class="btn" @click="tabPrin()">
            <i class="iconfont icon-dayin1"></i>
            <span>打印报表</span>
        </div>

        <!-- 加载条数选择 -->
        <div class="LoaderNumBtn" v-show="dataGridOptions.type == '1'">
            <LoaderNum ref="LoaderNum" @changeUpdataPageSize="changeUpdataPageSize"></LoaderNum>
        </div>
    </div>
	
	<!--打印模块-->
	<div style="display: none;" v-if="printDataGrid">
			<detail-template 
                v-if="this.tabClassActive.index==0" 
                title="调库" 
                tabTitle="明细"
                ref="detailTemplate" 
                :sellList="printDataGrid" 
                :headerData="printSelectDate"
                :tabSwitch="tabSwitch"></detail-template>
			<intelligence-type-template 
                v-if="this.tabClassActive.index==1" 
                title="调库" 
                tabTitle="智能分类"
                ref="intelligenceTypeTemplate" 
                :sellList="printDataGrid" 
                :headerData="printSelectDate"
                :tabSwitch="tabSwitch"></intelligence-type-template>
			<project-type-template 
                v-if="this.tabClassActive.index==2" 
                title="调库" 
                tabTitle="产品分类"
                ref="projectTypeTemplate" 
                :sellList="printDataGrid" 
                :headerData="printSelectDate"
                :tabSwitch="tabSwitch"></project-type-template>
			<custom-template 
                v-if="this.tabClassActive.index==3" 
                title="调库" 
                tabTitle="自定义"
                ref="customTemplate" 
                :sellList="printDataGrid" 
                :headerData="printSelectDate"
                :tabSwitch="tabSwitch"></custom-template>
	</div>

</div>
<!--打印模块-->
<div ref="tablePrint" v-else-if="isPrint==1" >
	<table-print 
        typeName="调库"
		:tabSwitch = "tabSwitch"
		:reportType="getReportType()"
        @sortList="sortListAct"
        :positionSwitch="positionSwitch"
		:printSelectDate = "printSelectDate" 
		:dataGridStorage="dataGridStorage">
	</table-print>
</div>	
</transition>
</template>

<script>
//交互逻辑 选择收货店铺之后，收货人才会出现或者置灰
import Vue from 'vue'
 import {seekDKReport} from './../../../../Api/commonality/operate.js'
 import {
 	seekRepositoryList, 
 	seekShowProviderList, 
 	seekGetDepUserList,
 	getProductTypeList,
 	seekGetUserList,
 	seekGetUserInfo,
     seekMemberList,
     seekSettingUserRole
 } from './../../../../Api/commonality/seek.js'
 import DropDownMenu from './../../../../components/template/DropDownMenu1'
 import HeaderDropDownMenu from './../../../../components/template/DropDownMenu'
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

// 筛选的组件
import dropDownColum from 'base/menu/drop-down-colums'
import {seekProductClassList,showCounterList} from "Api/commonality/seek"
// 选择加载页数组件
import LoaderNum from 'components/work/loaderNum.vue'
export default {
    components:{
    	ReportDetail,
        TablePrint,
        DropDownMenu,
        detailTemplate,
		projectTypeTemplate,
		intelligenceTypeTemplate,
        customTemplate,
        ReportLoad,
        HeaderDropDownMenu,
        dropDownColum,
        LoaderNum
    },
     data() {
      return {
        inconspanactive1: true,
        inconspanactive2: false,
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
        	storage : '',//调入库位
        	storageOut : '',//调出车位
        	preparedBy: '',//制单人
        	auditor: '',//收货人
        	startTime : '',//制单时间
        	endTime : '',
        	headerData : '调库', //制单大标题
        	reportType : '3', //1代表入库、2退库、3调库、4发货、5调柜、6退货
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
        
        //供应商
        supplierSpaceValue :'',
        providerList: [
        	{
        		"isDefault":"N",
        		"supplierId":"5fb175ded3274e2fb1cebdd680de01ff",
				"supplierName":"供应商"
        	}
        ],
        
        tabClassActive :{
        	index : 1,
        	activeClass : 'active'
        },
        
        //大、小类 tab切换
        tabData : [
            { txt:'明细', fun : this.tabs, type:1},
            { txt:'智能分类', fun : this.tabs, type:2},
            { txt:'产品分类', fun : this.tabs, type:3},
            { txt:'自定义', fun : this.tabs, type:4},
        ],
        
        //分销商
        distributorSpaceValue : '',
        distributorList : [],
        
        
        //制单人
        preparedSpaceValue : '',
        shopUserList: [],

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
            storageInId : '', //调入车位ID
            storageOutId : '', //调出车位
            makeUserList: [
                {
                    makeUserId : '',//制单人ID
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
            storageInId: '',
            storageOutId: '',
            shopId: '',
            counterId: '',
            productTypeId: '',
            productClass: '1',                                
            
            makeUserList: [
                // {
                //     makeUserId : '',//制单人ID
                // }
            ],
            takeUserList: [
                // {
                //     checkUserId : '',//审核人ID
                // }
            ],
            // productClass: '1',
            sortFlag: '0',
            sortList: [{classTypeName: '1'}],
            type: 2,
            page: 1,
            pageSize: 100,
            keyWord: '',
            wColorId: '',
            wGemId: '',
            wJewelryId: '1',
            nColorId: '',
            nGemId: '',
            nJewelryId: '1',
            specialId: ''
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
        newList: [{name: '产品类别', value: '1'}],
        // 假数据
        proList:[],
        conditionList:[],
        jewelList:[],
        jewelryList:[],
        // 打印的数据
        printDataGrid:null
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
        this.getUserList(); //制单人
        this.getGetUserInfo()//收货人
        this.send()
        this.$store.dispatch('checkBrowser',(type)=>{
           this.reportPrint_fixed = type
        })

         // 初始化筛选列表
        this.seekProductTypeList()
        this.productClassList(1)
        this.productClassList(2)
        this.productClassList(3)
    },
    watch:{
        'printSelectDate.storage' : function(){
          //调入库位
          this.setPrintShowCompany(this.printSelectDate.storage == '')
        },
        'printSelectDate.storageOut' : function(){
          //调出库位
          this.setPrintShowCompany(this.printSelectDate.storageOut == '')
        },
        'printSelectDate.preparedBy' : function(){
          //制单人
          this.setPrintShowCompany(this.printSelectDate.preparedBy == '')
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
            if(this.tabSwitch) {
                this.dataGridOptions.specialId = '1'
            } else {
                this.dataGridOptions.specialId = ''
            }
        },
        resetOption () {
            // console.log('重置')
            // this.openReset = false
            // setTimeout(() => {
            //    this.openReset = true 
            // }, 100)
            this.dataGridOptions.wColorId = ''
            this.dataGridOptions.wGemId = ''
            this.dataGridOptions.wJewelryId = '1'
            this.dataGridOptions.nColorId = ''
            this.dataGridOptions.nGemId = ''
            this.dataGridOptions.nJewelryId = '1'
            this.resetFlag = true
            // this.send()
        },
        compOption () {
            if (this.dataGridOptions.type != 4) {
                this.dataGridOptions.type == 4
                this.setReportType(this.dataGridOptions.type)
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
                storageOutId: '',
                storageInId: '',
                shopId: '',
                counterId: '',
                // productClass: '1',
                sortFlag: '0',
                type: 1,
                page: 1,
                pageSize: this.dataGridOptions.pageSize,
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
                storageOutId: '',
                storageInId: '',
                shopId: '',
                counterId: '',
                // productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
                pageSize:this.dataGridOptions.pageSize
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
                storageOutId: '',
                storageInId: '',
                shopId: '',
                counterId: '',
                // productClass: '1',
                sortFlag: this.positionSwitch ? "1" : "0",
                type: 1,
                pageSize:this.dataGridOptions.pageSize
              })
            } else if (port == 4) {
              Object.assign(this.dataGridOptions, {
                storageId: '',
                storageOutId: '',
                storageInId: '',
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
                pageSize:this.dataGridOptions.pageSize
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
              // if (res.data.data.costFlag == 'Y') {
              //   this.tabSwitch = true
              // } else {
              //   this.tabSwitch = false
              // }
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
          this.dataGridOptions.pageSize = this.dataGridOptions.pageSize
          this.tabClassActive.index = index;
          this.setReportType(type)
          
        },
        tabHover(index, evt) {
          //console.log(index)
          //if (this.dataGridOptions.type == 4 && index == 3) {
            //console.log(evt.target)
            this.$refs.customDia.style.zIndex = "10"
            // this.$refs.customDia.style.position = "absolute"
            this.$refs.customDia.style.opacity = '1'
            this.$refs.customDia.style.display = 'block'
          //}
        },
        tabOut(index, evt) {
            this.$refs.customDia.style.zIndex = "-1"
            this.$refs.customDia.style.opacity = '0'
            this.$refs.customDia.style.display = 'none'
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
          //console.log(this.sortList)
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
        toggleAttribute (val) {
          if (val == 1) {
                    this.inconspanactive1 = true;
                    this.inconspanactive2 = false;
                } else {
                    this.inconspanactive1 = false;
                    this.inconspanactive2 = true;
                }
                this.dataGridOptions.page = 1;
                this.dataGridOptions.pageSize = this.dataGridOptions.pageSize;
                this.dataGridOptions.productClass = val;
                console.log("切换成旧料", this.dataGridOptions.productClass);
                //this.dataGridOptions.productClass = this.dataGridOptions.productClass == 1 ? 2 : 1
                this.loading = true;
                this.send();
          
        },
        //懒加载
        lazyloadSend(){
           this.currentPage++
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
                this.printSelectDate.shop = ''
                this.dataGridOptions.shopId = ''
            
            } else if (val.type == "库位") {
                this.dataGridOptions.storageInId = ''
                this.printSelectDate.storage = ''
            } else if (val.type == "库位1") {
                this.printSelectDate.storageOut = ''
                this.dataGridOptions.storageOutId = '' 
            } else if (val.type == "制单人") {
                this.printSelectDate.preparedBy = ''
                Object.assign(this.dataGridOptions,{
                  makeUserList : [],
                }) 
            } else if (val.type == "收货人") {
                this.printSelectDate.auditor = ''
                Object.assign(this.dataGridOptions,{
                  takeUserList : [],
                }) 
            }
            this.dataGridOptions.pageSize = this.dataGridOptions.pageSize
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
            this.send()
        },
        dropReturn (val) {
            if (val.type == "柜组") {
                // this.propOptons.storageId = val.item.operateId
                // this.printSelectDate.storage = val.item.operateName 
            } else if (val.type == "店铺") {
                this.printSelectDate.shop = val.item.operateName
                this.dataGridOptions.shopId = val.item.operateId
            //this._seekShowCounterList(val.item.operateId)
            } else if (val.type == "库位") {
                this.dataGridOptions.storageInId = val.item.operateId
                this.printSelectDate.storage = val.item.operateName
            } else if (val.type == "库位1") {
                this.printSelectDate.storageOut = val.item.operateName
                this.dataGridOptions.storageOutId = val.item.operateId 
            } else if (val.type == "制单人") {
                this.printSelectDate.preparedBy = val.item.operateName
                Object.assign(this.dataGridOptions,{
                  makeUserList : [{
                      makeUserId: ''
                  }],
                })
                this.dataGridOptions.makeUserList[0].makeUserId = val.item.operateId 
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
            this.dataGridOptions.pageSize = this.dataGridOptions.pageSize
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
            this.send()
        },
    	
    	//库位
    	storageFunc(){
            this.dataGridOptions.pageSize = this.dataGridOptions.pageSize
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
    		this.send()
    	},
    	
    	//滚动条滚动时不显示总计
    	tabScrollShow( type ){
    		this.tabShow = type ? 'tabShow' : ''
    	},
        
        //获取收货人
        getGetUserInfo(){
        	let option = {
        	    type : 1,
        		companyId : sessionStorage.getItem('companyId'),
        		shopId : ''
        	}
        	seekMemberList(option).then((res) => {
                this.GetUserInfoList = res.body.data.dataList.filter(item => item.role !='店长' && item.role !='店员');
            }, (res) => {
				
            })
        },
        
        //制单人
        getUserList() {
            let option = {
                type : 1,
                companyId : sessionStorage.getItem('companyId'),
                shopId : ''
            }
            seekMemberList(option).then((res) => {
                console.log(res);
                this.shopUserList = res.data.data.dataList.filter(item => item.role !='店长' && item.role !='店员');
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
            this.dataGridOptions.pageSize = this.dataGridOptions.pageSize
            this.$refs["ReportDetail"].$refs["DataGridBody"].tempArray = [];
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
            this.send();
        },
        overTimeDate(val) {
            this.dataGridOptions.endTime = val.substr(0, 10).split('-').join("") + "235959"
            this.printSelectDate.endTime = val
            this.dataGridOptions.pageSize = this.dataGridOptions.pageSize
            this.$refs["ReportDetail"].$refs["DataGridBody"].tempArray = [];
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
        
        send () {
          this.loading = true;
          seekDKReport(this.dataGridOptions).then((res) => {
            if (res.data.state == 200) {
              this.dataGridStorage = res.data.data
              this.loading = false
            }
          }, (res) => {

          })
        },
        //打印表格
        tabPrin(){
        	(async () => {
        	  let res = await this.getPrintData();
        	  if (res) {
        	    switch (this.tabClassActive.index) {
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
        	  }
        	})()
        },
        // 导出报表
        exportTab(){
            console.log('导出报表')
            let exportTabData =Object.assign({},this.dataGridOptions)
            exportTabData['exportType'] = 'DK'
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
        seekDKReport(this.dataGridOptions).then((res) => {
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

        // 新增的筛选条件
        seekProductTypeList () { // 产品类别列表
            getProductTypeList().then((res) => {
                if (res.data.state == 200) {
                this.isLoading = false
                let datas = res.data.data.list
                for (let i of datas) {
                    i.id = i.classesType
                    i.name = i.classesName
                    i.childrenList = i.typeList
                    for (let j of i.childrenList) {
                    j.name = j.classesName
                    j.id = j.classesId
                    }
                }
                this.proList = datas
                }
            })
        },
        productClassList (type) { // 商品大小类列表
            let options = {
                type: type
            }
            seekProductClassList(options).then((res) => {
                if (res.data.state == 200) {
                    this.isLoading = false
                    let datas =  res.data.data.list
                    for (let i of datas) {
                    i.id = i.classesId
                    i.name = i.classesName
                    for (let j of i.childrenList) {
                        j.name = j.classesName
                        j.id = j.classesId
                    }
                    }
                    if (type == 1) {
                        this.conditionList = datas
                    } else if (type == 2) {
                        this.jewelList = datas
                    } else {
                        this.jewelryList = datas
                    }
                }
            })
        },
        dataBack (parm) {
            console.log('回调',parm)
            let optionsList = []
            switch (parm.keyName) {
                case 'productTypeId':
                parm.samllList.forEach((item,index) => {
                    optionsList[index] = {productClassId:item}
                })
                this.dataGridOptions.productClassIdList = optionsList
                break;
                case 'colourId':
                parm.samllList.forEach((item,index) => {
                    optionsList[index] = {colourNameId:item}
                })
                this.dataGridOptions.colourNameIdList = optionsList
                break;
                case 'jeweId':
                parm.samllList.forEach((item,index) => {
                    optionsList[index] = {gemNameId:item}
                })
                this.dataGridOptions.gemNameIdList = optionsList
                break;
                case 'jewelryId':
                parm.samllList.forEach((item,index) => {
                    optionsList[index] = {jewelNameId:item}
                })
                this.dataGridOptions.jewelNameIdList = optionsList
                break;
                default:
                break;
            }
            this.send()
        },
        // 获取打印数据
      getPrintData() {
        // 请求所有数据
        Object.assign(this.dataGridOptions, {
          page: 1,
          pageSize: 0
        })
        let res = seekDKReport(this.dataGridOptions).then((res) => {
          if (res.data.state == 200) {
            this.printDataGrid = res.data.data;
            // 还原设置
            Object.assign(this.dataGridOptions, {
              page: 1,
              pageSize: this.dataGridOptions.pageSize
            })
            return true;
          }
          if (res.data.state == 200101) {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            return false;
          }
        })
        return res
      },
      // 同步loaderNum组件的页数
      changeUpdataPageSize(val){
        this.dataGridOptions.pageSize = val;
      }
    },
    
    mounted(){
        
        this.$nextTick(()=>{
            
            //获取公司信息
            let companyName = JSON.parse(localStorage.getItem('companyInfo'))
            if(companyName){
              this.printSelectDate.companyName = companyName.companyName 
            }
        })
    }
 }
</script>

<style lang="scss" scoped>
.tab_wrap {
    width: 232px;
    height: 26px;
    margin-top: 12px;
    // margin-right: 10px;
    float: right;
    border:1px solid #d6d6d6;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    line-height: 24px;
    span {
      font-size: 12px;
      font-weight: bold;
      color: #666;
      cursor: pointer;
    }
    .myspanactive {
      color: #2993f8;
    }
}
.site {
    left: -210px;
}
.class_btn_wrap {
    width: 300px;
    height: 26px;
    border-radius: 4px;
    border: 1px solid #d6d6d6;
    float: right;
    margin-right: 10px;
    margin-top: 12px;
}
.iconfont_wrap {
    width: 86px;
    height: 26px;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    margin-top: 12px;
    margin-right: 10px;
    text-align: center;
    line-height: 26px;
    span{
      font-size: 12px;
      font-weight: bold;
      color: #666;
      cursor: pointer;
    }
    .myspanactive {
      color: #2993f8;
    }
  }
</style>



