<template>
<transition name="tp-ani">

<div class="RP_report_wrapper ui-page-max-width report_table_fixed" v-if="isPrint==0">
	
	<div class="Rp_title_container">
		<!--面包屑-->
		<div class="Rp_crumbs">
			<i class="iconfont icon-baobiao1"></i>
			<router-link tag="span" to="/work/report/" class="path_crumbs">报表</router-link> > <span class="txt">调柜</span>
		</div>
		<div class="Rp_selected_container">
		    <!-- <el-dropdown class="selected_dropdown" :class="printSelectDate.shop =='' ? 'placeholder' : ''">
              <span class="el-dropdown-link">
                  {{printSelectDate.shop ==''? '店铺' : printSelectDate.shop}} 
              </span>
              <i class="iconfont icon-xiala" v-if="printSelectDate.shop ==''"></i>
              <i class="el-icon-circle-close" @click="selectShop" title="清除" v-else></i>
              <el-dropdown-menu slot="dropdown" class="selected_dropdown_item">
                <div class="max-selected-item">
                    <el-dropdown-item 
                        v-for="item in distributorList" 
                        :class="printSelectDate.shop == item.shopName ? 'active' : ''"
                        @click.native="selectShop(item)">
                        {{item.shopName}}
                    </el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown> -->
             <HeaderDropDownMenu
                class="selected_dropdown"
                titleName="店铺"
                dataType="店铺"
                :propList="distributorList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </HeaderDropDownMenu>
            <span class="spaceMark">|</span>
            
            <!-- <el-dropdown v-if="!takeUserDisabled" class="selected_dropdown" :class="printSelectDate.preparedBy =='' ? 'placeholder' : ''">
              <span class="el-dropdown-link">
                  {{printSelectDate.preparedBy ==''? '制单人' : printSelectDate.preparedBy}}
              </span>
              <i class="iconfont icon-xiala" v-if="printSelectDate.preparedBy ==''"></i>
              <i class="el-icon-circle-close" @click="selectPreparedBy" title="清除" v-else></i>
              <el-dropdown-menu slot="dropdown" class="selected_dropdown_item">
                <div class="max-selected-item">
                    <el-dropdown-item 
                        v-for="item in shopUserList" 
                        :class="printSelectDate.preparedBy == item.username ? 'active' : ''"
                        @click.native="selectPreparedBy(item)">
                        {{item.username}}
                    </el-dropdown-item>
                    <el-dropdown-item v-if="shopUserList.length == 0">暂无数据</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown> -->
            <HeaderDropDownMenu
                v-if="!takeUserDisabled"
                class="selected_dropdown"
                titleName="制单人"
                dataType="制单人"
                :propList="shopUserList"
                @dropReturn="dropReturn"
                @clearInfo="clearInfo"
            >
            </HeaderDropDownMenu>
            <div v-else class="selected_dropdown el-dropdown placeholder disabled">
               <span class="el-dropdown-link">制单人</span>
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
			<p class="side-nav"><i class="iconfont icon-liebiao"></i>调柜报表</p>
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
                <span class="btn" v-if="dataGridOptions.type != 1" :title="positionSwitch ? '取消位置' : '选择位置'" @click="choseMenu(1)" :class="{active: positionSwitch}">位置</span>
            </div> -->
            <div class="xj-switch" v-if="isShowCost == 'Y'">
                <!-- <el-checkbox v-model="tabSwitch">成本</el-checkbox> -->
                <span class="btn" :title="tabSwitch?'关闭成本' : '开启成本'" @click="choseMenu(2)" :class="{active: tabSwitch}">专列项</span>
            </div>
			<!-- <span 
                class="report-switch float-right mt11" 
                :class = "tabSwitch ? 'active' : ''"
                :title="tabSwitch ? '关闭成本核算':'开启成本核算'" 
                @click="reportSwitch">成本
            </span> -->

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
              <div class="customDia site" ref="customDia" style="">
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
          <div class="class_btn_wrap">
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
				:dataGridStorage="dataGridStorage" 
				:tabSwitch = "tabSwitch" 
				@scrollClass = "tabScrollShow"
                :positionSwitch="positionSwitch"
                :newList="newList"
				@lazyloadSend = "lazyloadSend"
                @sortList="sortListAct"
				:reportType="getReportType()">
			</report-detail>
            <report-load v-if="dataGridStorage.totalNum != '0' && dataGridOptions.type === 1 && dataGridStorage.totalNum>15" @LoadOptionsDefault="LoadOptionsDefault"></report-load>                                    
		</div>
		
	</div>
    
	<div class="printBtn exportBtn" @click="exportTab()">
        <i class="iconfont icon-daochu"></i>
        <span>导出报表</span>
    </div>

	<div class="printBtn" @click="tabPrin()">
        <i class="iconfont icon-dayin1"></i>
        <span>打印报表</span>
    </div>
	<!-- <div class="reportPrint_fixed skin-shield" :class="reportPrint_fixed ? 'isWebkit' : ''">
		<el-button type="primary" @click.native="tabPrin()">打印报表</el-button>
	</div> -->
	
	
	<!--打印模块-->
	<div style="display: none;">
			<detail-template v-if="this.tabClassActive.index==0" title="调柜" ref="detailTemplate" :sellList="dataGridStorage" :headerData="printSelectDate"></detail-template>
			<intelligence-type-template v-if="this.tabClassActive.index==1" title="调柜" ref="intelligenceTypeTemplate" :sellList="dataGridStorage" :headerData="printSelectDate"></intelligence-type-template>
			<project-type-template v-if="this.tabClassActive.index==2" title="调柜" ref="projectTypeTemplate" :sellList="dataGridStorage" :headerData="printSelectDate"></project-type-template>
			<custom-template v-if="this.tabClassActive.index==3" title="调柜" ref="customTemplate" :sellList="dataGridStorage" :headerData="printSelectDate"></custom-template>
	</div>
</div>
<!--打印模块-->
<div ref="tablePrint" v-else-if="isPrint==1" >
	<table-print 
        typeName="调柜"
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
import Vue from 'vue'
 import {seekDGReport} from './../../../../Api/commonality/operate.js'
 import {
 	seekRepositoryList, 
 	seekShowProviderList, 
 	seekGetDepUserList,
 	getProductTypeList,
 	seekGetUserList,
 	seekGetShopListByCo,
     seekMemberList,
     seekSettingUserRole
 } from './../../../../Api/commonality/seek.js'
 import DropDownMenu from './../../../../components/template/DropDownMenu1'
 import HeaderDropDownMenu from './../../../../components/template/DropDownMenu'

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
import dropDownColum from '@/components/dropDownColums'
import {seekProductClassList,showCounterList} from "Api/commonality/seek"

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
            dropDownColum
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
        	shop :'', //店铺
        	preparedBy: '',//制单人
        	startTime : '',//制单时间
        	endTime : '',
        	headerData : '调柜', //制单大标题
        	reportType : '5', //1代表入库、2退库、3调库、4发货、5调柜、6退货
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

        //制单人
        shopUserList: [],
        takeUserDisabled : true,
        
        //店铺
        distributorList : [],
            
        //
        propOptons: {
        	beginTime : '',
        	endTime : '',
            shopId : '',//店铺
            makeUserList: [
                {
                    makeUserId : '',//制单人ID
                }
            ],
            reportType : 3 //报表类型 ，为1时代表成色大类，为2时是成色小类，为3时是明细 ,默认为明细
        },
        reportPrint_fixed : false,
        dataGridOptions: {
            beginTime: '',
            endTime: '',
            storageId: '',
            shopId: '',
            counterId: '',
            productClass: '1',
            sortFlag: '0',
            sortList: [{classTypeName: '1'}],
            makeUserList: [

            ],
            type: 2,
            page: 1,
            pageSize: 15,
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
        
        //打印时间
        this.printSelectDate.startTime = this.beginTime
        this.printSelectDate.endTime = this.endTime
        this.settingUserRole()
        this.getShopListByCo()
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
        'printSelectDate.shop' : function(){
          //店铺
          this.setPrintShowCompany(this.printSelectDate.shop == '')
        },
        'printSelectDate.preparedBy' : function(){
          //制单人
          this.setPrintShowCompany(this.printSelectDate.preparedBy == '')
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
            this.dataGridOptions.wColorId = ''
            this.dataGridOptions.wGemId = ''
            this.dataGridOptions.wJewelryId = '1'
            this.dataGridOptions.nColorId = ''
            this.dataGridOptions.nGemId = ''
            this.dataGridOptions.nJewelryId = '1'
            this.resetFlag = true
        },
        compOption () {
            // console.log(this.dataGridOptions.type)
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
                pageSize: 15
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
                pageSize: 15
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
          this.dataGridOptions.pageSize = 15
          this.tabClassActive.index = index;
          this.setReportType(type)
          
        },
        tabHover(index, evt) {
          //console.log(index)
          //if (this.dataGridOptions.type == 4 && index == 3) {
            //console.log(evt.target)
            this.$refs.customDia.style.zIndex = "10"
            this.$refs.customDia.style.opacity = '1'
            // this.$refs.customDia.style.display = 'block'
          //}
        },
        tabOut(index, evt) {
          //if (this.dataGridOptions.type == 4 && index == 3) {
            //console.log(evt.target)
            this.$refs.customDia.style.zIndex = "-1"
            this.$refs.customDia.style.opacity = '0'
            // this.$refs.customDia.style.display = 'none'
          //}
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
                this.dataGridOptions.pageSize = 15;
                this.dataGridOptions.productClass = val;
                console.log("切换成旧料", this.dataGridOptions.productClass);
                //this.dataGridOptions.productClass = this.dataGridOptions.productClass == 1 ? 2 : 1
                this.loading = true;
                this.send();
          
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
                this.printSelectDate.takeUser = ''
                this.takeUserDisabled = true
            } else if (val.type == "制单人") {
                this.printSelectDate.preparedBy = ''
                Object.assign(this.dataGridOptions,{
                  makeUserList : [],
                }) 
            }
            this.dataGridOptions.pageSize = 15
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
            this.send()
        },
        dropReturn (val) {
            //console.log(val)
            if (val.type == "柜组") {
                // this.propOptons.storageId = val.item.operateId
                // this.printSelectDate.storage = val.item.operateName 
            } else if (val.type == "店铺") {
                this.printSelectDate.shop = val.item.operateName
                this.dataGridOptions.shopId = val.item.operateId
                this.takeUserDisabled = false
                this.getUserList()
            //this._seekShowCounterList(val.item.operateId)
            }else if (val.type == "制单人") {
                this.printSelectDate.preparedBy = val.item.operateName
                Object.assign(this.dataGridOptions,{
                  makeUserList : [{
                      makeUserId: ''
                  }],
                }) 
                this.dataGridOptions.makeUserList[0].makeUserId = val.item.operateId
            }
            this.currentPage = 1
            this.dataGridOptions.pageSize = 15
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
            this.send()
        },
    	//店铺
    	// selectShop(e){
    	// 	if( e.type == undefined ){
        //       this.printSelectDate.shop = e.shopName
        //       this.propOptons.shopId = e.shopId
        //       this.takeUserDisabled = false
        //       this.getUserList()
        //     }else{
        //       this.printSelectDate.shop = ''
        //       this.propOptons.shopId = ''
        //       this.printSelectDate.preparedBy = ''
        //       this.propOptons.makeUserID = ''
        //       this.takeUserDisabled = true
        //     }
        //     this.send()
    	// },
    	
    	// //制单人
    	// selectPreparedBy(e){
    	// 	if( e.type == undefined ){
        //       this.printSelectDate.preparedBy = e.username
        //       this.propOptons.makeUserID = e.userId
        //     }else{
        //       this.printSelectDate.preparedBy = ''
        //       this.propOptons.makeUserID = '' 
        //     }
        //     this.send()
    	// },
    	
    	//库位
    	storageFunc(){
            this.dataGridOptions.pageSize = 15
            $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')     
    		this.send()
    	},
    	
//  	tabs(index,type){
//  		this.loading = true;
//  		this.tabClassActive.index = index;
//  		this.setReportType(type)
//  		this.send()
//  	},
    	
    	//滚动条滚动时不显示总计
    	tabScrollShow( type ){
    		this.tabShow = type ? 'tabShow' : ''
    	},
 

		//制单人
        getUserList() {
            let option = {
                type : 2,
                companyId : sessionStorage.getItem('companyId'),
                shopId : this.dataGridOptions.shopId
            }
            seekMemberList(option).then((res) => {
                //console.log(res);
                this.shopUserList = res.data.data.dataList //.filter(item => item.role !='店长' && item.role !='店员')
            }, (res) => {
                console.log(res);
            })
        },
        
        //店铺
        getShopListByCo(){
        	let options = {
                page: '1',
                pageSize: '10'
            }
            seekGetShopListByCo(options).then((res) => {
                this.distributorList = res.body.data.shopList
                console.log('店铺列表',res.body.data.shopList)
            }, (res) => {
                console.log(res);
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
        
        /*
       	* 数据请求
        */
        // send() {
        	
        //     this.loading = true;
        //     if(this.propOptons.reportType == 3){
        //        Object.assign(this.propOptons,{
        //           page : 1,
        //           pageSize : 9999
        //        })
        //     }
        //     if( this.timeOut ) clearTimeout( this.timeOut )
        //     if (this.propOptons.makeUserList) {
        //         if (this.propOptons.makeUserList[0].makeUserId == '') {
        //             for (let i in this.propOptons) {
        //                 //console.log(i)
        //                 delete this.propOptons.makeUserList
        //             }
        //         }
        //     }
            
        //     seekDGReport( this.propOptons ).then((res) => {
        //         if (res.data.state === 200) {
        //             //数据表格数据
        //             this.dataGridStorage = res.data.data 
        //             this.dataGridStorage.printDetailList = res.data.data.detailList
        //         } else {
        //             this.$message({
        //             	type : 'error',
        //             	message : res.body.msg
        //             })
        //         }
                
        //         this.timeOut = setTimeout(()=>{
        //         	 this.loading = false
        //         	 if( this.timeOut ) clearTimeout( this.timeOut )
        //         },200)
               
        //     })
        // },
        send () {
          this.loading = true;
          seekDGReport(this.dataGridOptions).then((res) => {
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
        
        //打印表格
        
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
            exportTabData['exportType'] = 'DG'
            console.log(exportTabData)
            if(exportTabData.type === 1){
            downLoaderFile('/v1/export/exportExcelByReport',exportTabData)
            } else {
            downLoaderFile('/v1/export/exportExcelBySmart',exportTabData)          
            }
        },
        // 加载控件
        LoadOptionsDefault(pageSize){
        console.log('调用了')
        if(this.dataGridOptions.pageSize>this.dataGridStorage.totalNum) {
           // 更换文字
          $('.loadControl span').html('已经到底了').css('color','#474747')
          return;
        }
        this.loading = true;    
        this.dataGridOptions.pageSize += pageSize;
        this.send()            
        // seekEntryStorage(this.dataGridOptions).then((res) => {
        //   if(res.data.state == 200) {
        //     this.dataGridStorage = res.data.data
        //     console.log('到底了没',this.dataGridStorage)
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
