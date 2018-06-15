<template>
	<transition name="tp-ani">

		<div class="RP_report_wrapper ui-page-max-width " v-if="isPrint==0">
      
      <div style="height: 41px;">
          <div class="Rp_title_container sell-report-header">
            <div class="Rp_selected_container">
         <!--      <span class="spaceMark">|</span> -->
              <DropDownMenu class="selected_dropdown" :titleName="shopList[0].shopName" dataType="店铺" v-if="itemShow" :propList="shopList" @dropReturn="dropReturn" @clearInfo="clearInfo">
              </DropDownMenu>
              <span v-else :style="{color:activeColor, fontSize:size,fontWeight:weight,marginRight:right,lineHeight:height,height:high}">{{printSelectDate.shop}}</span>

              <template v-if="modleSwitch == '2'">
                <span class="spaceMark">|</span>

                <DropDownMenu v-if="!isdisabled" class="selected_dropdown" titleName="制单人" dataType="制单人" :propList="shopUserList" @dropReturn="dropReturn" @clearInfo="clearInfo">
                </DropDownMenu>
                <div v-else class="selected_dropdown el-dropdown placeholder disabled">
                  <span class="el-dropdown-link">制单人</span>
                  <i class="iconfont icon-arrow-down"></i>
                </div>

                <span class="spaceMark">|</span>

                <DropDownMenu class="selected_dropdown" titleName="销售人" dataType="销售人" :propList="shopUserList" @dropReturn="dropReturn" @clearInfo="clearInfo">
                </DropDownMenu>

                <DropDownMenu v-if="!isdisabled" class="selected_dropdown" titleName="收银人" dataType="制单人" :propList="shopUserList" @dropReturn="dropReturn" @clearInfo="clearInfo">
                </DropDownMenu>
                <div v-else class="selected_dropdown el-dropdown placeholder disabled">
                  <span class="el-dropdown-link">收银人</span>
                  <i class="iconfont icon-arrow-down"></i>
                </div>
              </template>

              <div class="report-data">
                <div class="block until" data-txt="至">
                  <el-date-picker size="mini" v-model="beginTime" @change="getTimeData" type="date" placeholder="选择开始时间" :picker-options="pickerOptions1"></el-date-picker>
                </div>
                <div class="block">
                  <el-date-picker size="mini" v-model="endTime" @change="overTimeDate" type="date" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
                </div>
              </div>
              <el-button type="primary" size="small" class="back-btn" @click.native="toHome">返回上一级</el-button>
            </div>
          </div>

          <!--收银统计跟销售统计切换-->
          <ul class="sell-report-cut-nav-list">
              <li v-for="item in cutList" @click="modleSwitchFn(item.id)" :class="{actions: modleSwitch == item.id}">{{item.name}}</li>
          </ul>
      </div>

			<!--销售统计-->
			<div class="dataGrid_statistics_switch" v-if="modleSwitch == 2">

				<div class="Rp_dataGrid_container last-table mt-0 xj-report-table-wrap" v-loading="loading" element-loading-text="数据查询中">
					<div class="rp_gridState">
						<!--<p class="side-nav"><i class="iconfont icon-liebiao"></i>收银报表</p>-->
						<div class="side-nav">
							<i class="iconfont icon-liebiao"></i>{{currentReportName}}
						</div>

						<template v-if="sellShowId == 'sales' || sellShowId == 'buyback' ">

							<div class="sort-wrap">
								<label>排序:</label>
								<div v-for="(item, index) in sortList" :key="index">
									{{item.name}}
									<img v-if="item.value == '2'" src="./../../../../../static/img/sort/down1.png">
									<img v-if="item.value == '1'" src="./../../../../../static/img/sort/up1.png">
									<i class="el-icon-circle-cross" @click="cancelSort(item, index)"></i>
								</div>
							</div>
						</template>
          

            <filter-header
              v-if="sellShowId == 'sales' || sellShowId == 'buyback'"
              @complate="filterHeaderComplate"
              @reportSwitch="reportSwitch"
              @choseBuyBack="choseBuyBack"
              :specialItem="sellShowId == 'sales'"
              :isBuy="true"
              :customList="customList"
            ></filter-header>

             <cut-bg class="cut-bg-btn-wrap ml-10" :showList="sellTypeList" :current="sellShowId" @pitchOn="madeUpOnSell"></cut-bg>

<!-- 						<template v-if="sellShowId == 'sales' || sellShowId == 'buyback' ">
							<div class="tab">
								<span :class="0 == tabClassActive.index ? tabClassActive.activeClass : ''" @click="tabs(0, 1)">明细</span>
								<span :class="1 == tabClassActive.index ? tabClassActive.activeClass : ''" @click="tabs(1, 2)">智能分类</span>
								<span :class="2 == tabClassActive.index ? tabClassActive.activeClass : ''" @click="tabs(2, 3)">产品分类</span>
								<span :class="3 == tabClassActive.index ? tabClassActive.activeClass : ''" @click="tabs(3, 4)" @mouseover="tabHover(3, $event)" @mouseout="tabOut(3, $event)">自定义
              <i v-if="tabClassActive.index == 3" class="iconfont icon-arrow-down"></i>
              <div class="customDia" ref="customDia">
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
                      <ZDYDropDownMenu
                          titleName="不选"
                          dataType="customDia"
                          dataDataType="成色名称-计重"
                          :propList="dialogOptions.conditionList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                      >
                      </ZDYDropDownMenu>
                      </li>
                      <li>
                      <ZDYDropDownMenu
                          titleName="不选"
                          dataType="customDia"
                          dataDataType="宝石名称-计重"
                          :propList="dialogOptions.conditionList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                      >
                      </ZDYDropDownMenu>
                      </li>
                      <li>
                      <ZDYDropDownMenu
                          titleName="大类"
                          dataType="customDia"
                          dataDataType="首饰类别-计重"
                          :propList="dialogOptions.jewelryList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                      >
                      </ZDYDropDownMenu>
                      </li>
                  </ul>
                  <ul>
                      <li>计件类</li>
                      <li>
                      <ZDYDropDownMenu
                          titleName="不选"
                          dataType="customDia"
                          dataDataType="成色名称-计件"
                          :propList="dialogOptions.conditionList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                      >
                      </ZDYDropDownMenu>
                      </li>
                      <li>
                      <ZDYDropDownMenu
                          titleName="不选"
                          dataType="customDia"
                          dataDataType="宝石名称-计件"
                          :propList="dialogOptions.conditionList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                      >
                      </ZDYDropDownMenu>
                      </li>
                      <li>
                      <ZDYDropDownMenu
                          titleName="大类"
                          dataType="customDia"
                          dataDataType="首饰类别-计件"
                          :propList="dialogOptions.jewelryList"
                          :resetFlag='resetFlag'
                          @infoBack="diaInfoBack"
                      >
                      </ZDYDropDownMenu>
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
						</template> -->

					</div>

					<!--收银报表-->
					<div class="rp_dataGridTemp" style="padding-top: 0;" :class="tabShow" v-if="sellShowId == 'collect'">
						<report-detail-collect :dataGridStorage="collectStorage" :tabSwitch="tabSwitch" :isBuyBack="isBuyBack" @scrollClass="tabScrollShow" :reportType="getReportType()">
						</report-detail-collect>
					</div>

					<!--回购报表-->
					<div class="rp_dataGridTemp" :class="tabShow" v-if="sellShowId == 'buyback'">
						<report-detail-trade :dataGridStorage="tradeStorage" :tabSwitch="tabSwitch" :isBuyBack="isBuyBack" @sortList="sortListAct" :newList="newList" @scrollClass="tabScrollShow" :reportType="getReportType()">
						</report-detail-trade>
            <report-load v-if="tradeStorage.totalNum != null && tradeStorage.totalNum != '0' && dataGridOptions.type === 1 && tradeStorage.totalNum>15" @LoadOptionsDefault="LoadOptionsDefault"></report-load>            
					</div>

					<!--销售报表-->
					<div class="rp_dataGridTemp" :class="tabShow" v-if="sellShowId == 'sales'">
						<report-detail :dataGridStorage="sellStorage" :tabSwitch="tabSwitch" :isBuyBack="isBuyBack" :positionSwitch="positionSwitch" @sortList="sortListAct" :newList="newList" @scrollClass="tabScrollShow" :reportType="getReportType()">
						</report-detail>
            <report-load v-if="sellStorage.totalNum != null && sellStorage.totalNum != '0' && dataGridOptions.type === 1 && sellStorage.totalNum>15" @LoadOptionsDefault="LoadOptionsDefault"></report-load>                        
					</div>

				</div>

				<!-- 导出表格 -->
				<div class="printBtn exportBtn" @click="exportTab()">
          <i class="iconfont icon-daochu"></i>
          <span>导出报表</span>
        </div>
				
				
				<!--打印-->
				<div class="utils-container-sell">
					
					<el-popover ref="reportPrint" placement="top" width="100" v-model="visible2">
						<div class="select-print">
							<el-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="checkAllChange">综合</el-checkbox>
							<el-checkbox-group v-model="selectValue" @change="partChecked">
								<el-checkbox v-for="(city,index) in selectParam" :label="city" :key="city">
									{{city}}
								</el-checkbox>
							</el-checkbox-group>
							<el-button type="primary" size="small" @click.native="tabPrin()">确定</el-button>
						</div>
					</el-popover>

					<el-button type="primary" class="popover_primary" v-popover:reportPrint>
						<span class="txt">打印报表</span>
						<i class="iconfont icon-dayin"></i>
					</el-button>
				</div>

				<!--打印模块-->
				<div style="display: none;">
						<detail-template v-if="this.tabClassActive.index==0" ref="detailTemplate" :types="selectValue" :sellList="sellStorage" :buyBackList="tradeStorage" :headerData="printSelectDate"></detail-template>
						<intelligence-type-template v-if="this.tabClassActive.index==1" ref="intelligenceTypeTemplate" :types="selectValue" :sellList="sellStorage" :buyBackList="tradeStorage" :headerData="printSelectDate"></intelligence-type-template>
						<project-type-template v-if="this.tabClassActive.index==2" ref="projectTypeTemplate" :types="selectValue" :sellList="sellStorage" :buyBackList="tradeStorage" :headerData="printSelectDate"></project-type-template>
						<custom-template v-if="this.tabClassActive.index==3" ref="customTemplate" :types="selectValue" :sellList="sellStorage" :buyBackList="tradeStorage" :headerData="printSelectDate"></custom-template>
				</div>
				
			</div>









			<!--收银统计-->
			<div class="dataGrid_statistics_switch" v-else>
				<com-statistics :selectDate="dataGridOptions" :printSelectDate="printSelectDate" :tradeStorage="tradeStorage" :sellStorage="sellStorage">
				</com-statistics>
			</div>
			
		</div>
		
		

		<!--打印模块-->
		<div ref="tablePrint" v-else-if="isPrint==1" class="tablePrint_style">
			<table-print-sell v-if="printSellShow" :tabSwitch="tabSwitch" :isBuyBack="isBuyBack" :reportTypeHeaderData="reportTypeHeaderData.sell" :printSelectDate="printSelectDate" :reportType="getReportType()" :dataGridStorage="sellStorage">
			</table-print-sell>
			<table-print-trade v-if="printBuybackShow" :printSelectDate="printSelectDate" :reportTypeHeaderData="reportTypeHeaderData.trade" :reportType="getReportType()" :dataGridStorage="tradeStorage">
			</table-print-trade>
			<table-print-collect v-if="printCollectShow" :reportTypeHeaderData="reportTypeHeaderData.collect" :printSelectDate="printSelectDate" :dataGridStorage="collectStorage">
			</table-print-collect>
		</div>

		

	</transition>
</template>

<script>
import {
  seekSellList,
  seekBuyBackList,
  seekReportsCashList
} from "./../../../../Api/commonality/operate.js";
import {
  seekRepositoryList,
  seekShowProviderList,
  seekGetDepUserList,
  getProductTypeList,
  seekGetUserList,
  seekGetShopListByCo,
  seekMemberList
} from "./../../../../Api/commonality/seek.js";

import ReportDetail from "./sell/newDataGrid/sell";
import cutBg from "base/cut/cut-bg";
import filterHeader from './base/filter-header'
import ReportDetailTrade from "./sell/newDataGrid/buyback";
import ReportDetailCollect from "./sell/collect";
import DropDownMenu from "./../../../../components/template/DropDownMenu"
import ZDYDropDownMenu from "./../../../../components/template/DropDownMenu1"
//打印模块
import TablePrintSell from "./sell/print/sellPrint";
import TablePrintTrade from "./sell/print/buybackPrint";
import TablePrintCollect from "./sell/print/collectPrint";

import comStatistics from "./collect";
const selectParam = ["销售", "回购"];
//打印模板，明细，产品分类，智能分类=自定义
import detailTemplate from "@/components/jcp-print/sell/detail-template";
import projectTypeTemplate from "@/components/jcp-print/sell/project-type-template";
import intelligenceTypeTemplate from "@/components/jcp-print/sell/intelligence-type-template";
import customTemplate from "@/components/jcp-print/sell/intelligence-type-template";

// 导出报表
import { downLoaderFile } from "Api/downLoaderFile"

// 加载控件
import ReportLoad from './LoadOptions/ReportLoadOption'

export default {
  components: {
    ReportDetail,
    ReportDetailTrade,
    ReportDetailCollect,
    TablePrintSell,
    TablePrintTrade,
    TablePrintCollect,
    DropDownMenu,
    comStatistics,
    detailTemplate,
    projectTypeTemplate,
    intelligenceTypeTemplate,
    customTemplate,
    ReportLoad,
    ZDYDropDownMenu,
    filterHeader,
    cutBg
  },
  data() {
    return {
      customList: [
        {
            name: '明细',
            id: 1
        },
        {
            name: '智能分类',
            id: 2
        },
        {
            name: '产品分类',
            id: 3
        }
      ],
      sellList: [],
      buyBackList: [],
      headerData: {},
      openReset: true,
      shopname: "",
      itemShow: true,
      activeColor: "#666",
      size: "14px",
      weight: "bold",
      right: "7px",
      height: "30px",
      high: "30px",
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },

      // 销售统计 收银统计切换操作
      modleSwitch: '1',

      //导航切换
      cutList: [
        {
          name: '收银统计',
          id: '1'
        },
        {
          name: '销售统计',
          id: '2'
        }
      ],
      sellTypeList: [
          {
              name: '销售报表', 
              id: 'sales'
          },
          {
              name: '回购报表',
              id: 'buyback'
          }
      ],
      // modleSwitch: {
      //   title: "点击切换到销售统计",
      //   type: false, // true为收银统计 false为销售统计
      //   text: "收银统计"
      // },

      //打印select
      selectValue: selectParam,
      selectParam: selectParam,
      checkAll: true,
      indeterminate: true,
      printCollectShow: false,
      printBuybackShow: false,
      printSellShow: false,

      //当前切换的表格状态
      activeTabType: "",

      //表格JSON数据配置
      dataGridConfig: "buyBack",

      visible2: false,

      beginTime: "",
      endTime: "",
      loading: true,

      //打印0,1
      isPrint: 0,
      printSelectDate: {
        shop: "", //店铺
        preparedBy: "", //制单人
        payee: "", //收银人
        salesperson: "", //销售人
        operateId: "", //销售人ID
        startTime: "",
        endTime: "",
        companyName: "", //公司名,
        showCompany: true //是否显示公司名  在用户不选择条件筛选的情况下 默认显示公司名
      },

      reportTypeHeaderData: {
        sell: "销售",
        collect: "收银",
        trade: "回购"
      },

      //
      tabShow: "tabShow",
      currentPage: 1,

      isdisabled: false,
      sellloading: true,
      buyBackloading: true,
      collectloading: true,

      //销售数据
      sellStorage: {},
      //收银数据
      collectStorage: {},
      //回购数据
      tradeStorage: {},

      //成本核算
      tabSwitch: false,

      //回购额
      isBuyBack: false,

      //产品类别
      productCategoryType: [],
      productCategory: [],
      categoryProps: {
        value: "classesId",
        label: "classesName",
        children: "typeList"
      },

      //销售
      tabClassActive: {
        index: 1,
        activeClass: "active",
        type: "sell",
        reportType: 3
      },

      //回购
      tradeTabClassActive: {
        index: 0,
        activeClass: "active",
        type: "trade",
        reportType: 3
      },

      //收银
      collectTabClassActive: {
        index: 1,
        activeClass: "active",
        type: "collect",
        reportType: 3
      },

      //大、小类 tab切换
      tabData: [
        {
          txt: "明细",
          fun: this.tabs,
          type: 1
        },
        {
          txt: "智能分类",
          fun: this.tabs,
          type: 2
        },
        {
          txt: "产品分类",
          fun: this.tabs,
          type: 3
        },
        {
          txt: "自定义",
          fun: this.tabs,
          type: 4
        }
      ],

      //店铺
      shopList: [{}],

      //制单人
      shopUserList: [],

      //收银人
      auditorUserList: [],

      currentReportName: "销售报表",
      sellChangeList: [
        {
          userId: "sales",
          username: "销售报表",
          type: "销售人"
        },
        {
          userId: "buyback",
          username: "回购报表",
          type: "销售人"
        }
      ],

      reportPrint_fixed: false,
      sellShowId: "sales",

      dataGridOptions: {
        beginTime: "",
        endTime: "",
        storageId: "",
        shopId: "",
        counterId: "",
        productTypeId: "",
        //制单人ID
        makeUserList: [
          {
            makeUserId: ""
          }
        ],
        //收银人ID
        cashierList: [
          {
            cashierId: ""
          }
        ],
        sortFlag: "0",
        sortList: [
          {
            classTypeName: "1"
          }
        ],
        type: 2,
        page: 1,
        pageSize: 15,
        keyWord: "",
        wColorId: "",
        wGemId: "",
        wJewelryId: "1",
        nColorId: "",
        nGemId: "",
        nJewelryId: "1",
        reportType: 1,
        sellStatus:'',
        specialId:'',
        // sellStatuss
      },
      dialogOptions: {
        conditionList: ["不选", "大类", "小类"],
        jewelryList: ["大类", "小类"]
      },
      positionSwitch: false,
      customDialog: false, // 自定义列表弹窗
      resetFlag: false,
      isShowCost: "",
      sortList: [
        {
          name: "产品类别",
          value: "1"
        }
      ],
      newList: [
        {
          name: "产品类别",
          value: "1"
        }
      ]
    };
  },

  watch: {
    //店铺
    "dataGridOptions.shopId": function() {
      if (this.dataGridOptions.shopId == "") {
        this.isdisabled = true;
      } else {
        this.isdisabled = false;
        this.getGetUserList();
      }
    },
    //店铺
    "printSelectDate.shop": function() {
      //监听用户是否选择了条件筛选
      this.setPrintShowCompany(this.printSelectDate.shop == "");
    },
    //制单人
    "printSelectDate.preparedBy": function() {
      //监听用户是否选择了条件筛选
      this.setPrintShowCompany(this.printSelectDate.preparedBy == "");
    },
    //收银人
    "printSelectDate.payee": function() {
      //监听用户是否选择了条件筛选
      this.setPrintShowCompany(this.printSelectDate.payee == "");
    },
    positionSwitch(val) {
      if (val == true) {
        this.dataGridOptions.sortFlag = 1;
      } else {
        this.dataGridOptions.sortFlag = 0;
      }
      // this.send();
    },
    "sellShowId": function () {
      this.dataGridOptions.pageSize = 15
      $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')
    }
  },
  created() {
    //后台请求时间
    //      this.propOptons.beginTime = this.getDate(0,'start').fullData
    //      this.propOptons.endTime = this.getDate(0,'end').fullData
    this.dataGridOptions.beginTime = this.getDate(0, "start").fullData;
    this.dataGridOptions.endTime = this.getDate(0, "end").fullData;

    //日期控件默认设置时间
    this.beginTime = this.getDate(0, "start").format;
    this.endTime = this.getDate(0, "end").format;

    //打印时间
    this.printSelectDate.startTime = this.beginTime;
    this.printSelectDate.endTime = this.endTime;

    console.log('初始化的参数',this.dataGridOptions)
    this.dataGridOptions.shopId = ''
    // 初始化所有数据
    this.send()

    this.getShopListByCo(); //店铺

    this.$store.dispatch("checkBrowser", type => {
      this.reportPrint_fixed = type;
    });

  },
  methods: {
    madeUpOnSell (parm) {
      this.sellShowId = parm.id;

      this.$set(this.dataGridOptions, "sortList", [
        {
          classTypeName: "1"
        }
      ]);
      this.$set(this, "sortList", [
        {
          name: "产品类别",
          value: "1"
        }
      ]);
      this.$set(this, "newList", [
        {
          name: "产品类别",
          value: "1"
        }
      ]);
      
      this.dataGridOptions.pageSize = 15
      $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')

      this.send();

    },
    filterHeaderComplate (parm) {
        Object.assign(this.dataGridOptions, parm)
        this.send()
    },
    //成本控制
    reportSwitch(parm){
      this.tabSwitch = parm

      if(this.tabSwitch) {
        this.dataGridOptions.specialId = '1'
      } else {
        this.dataGridOptions.specialId = ''
      }

    },
    choseBuyBack (parm) {
      this.isBuyBack = parm
    },
    choseMenu(type) {
        
        if (type == 1) {
          this.positionSwitch = !this.positionSwitch;

        } else if (type == 2) {
          this.tabSwitch = !this.tabSwitch;
          
        }
    },
    resetOption() {
      this.dataGridOptions.wColorId = "";
      this.dataGridOptions.wGemId = "";
      this.dataGridOptions.wJewelryId = "1";
      this.dataGridOptions.nColorId = "";
      this.dataGridOptions.nGemId = "";
      this.dataGridOptions.nJewelryId = "1";
      this.resetFlag = true;
    },
    compOption() {
      if (this.dataGridOptions.type != 4) {
        this.dataGridOptions.type == 4;
        this.setReportType(this.dataGridOptions.type);
      } else {
        this.send();
      }
      this.customDialog = false;
    },
    setReportType(port) {
      if (port) {
        if (port == 1) {
          Object.assign(this.dataGridOptions, {
            storageId: "",
            shopId: "",
            counterId: "",
            // productClass: '1',
            sortFlag: "0",
            type: 1,
            page: 1,
            pageSize: 15,
            keyWord: ""
          });
        } else if (port == 2) {
          delete this.dataGridOptions.page;
          delete this.dataGridOptions.pageSize;
          delete this.dataGridOptions.keyWord;
          delete this.dataGridOptions.wColorId;
          delete this.dataGridOptions.wJewelryId;
          delete this.dataGridOptions.nColorId;
          delete this.dataGridOptions.nGemId;
          delete this.dataGridOptions.nJewelryId;
          Object.assign(this.dataGridOptions, {
            storageId: "",
            shopId: "",
            counterId: "",
            // productClass: '1',
            sortFlag: this.positionSwitch ? "1" : "0",
            type: 1,
            pageSize:15
          });
        } else if (port == 3) {
          delete this.dataGridOptions.page;
          delete this.dataGridOptions.pageSize;
          delete this.dataGridOptions.keyWord;
          delete this.dataGridOptions.wColorId;
          delete this.dataGridOptions.wJewelryId;
          delete this.dataGridOptions.nColorId;
          delete this.dataGridOptions.nGemId;
          delete this.dataGridOptions.nJewelryId;
          Object.assign(this.dataGridOptions, {
            storageId: "",
            shopId: "",
            counterId: "",
            // productClass: '1',
            sortFlag: this.positionSwitch ? "1" : "0",
            type: 1,
            pageSize:15
          });
        } else if (port == 4) {
          Object.assign(this.dataGridOptions, {
            storageId: "",
            shopId: "",
            counterId: "",
            // productClass: '1',
            sortFlag: this.positionSwitch ? "1" : "0",
            type: 1,
            keyWord: "",
            wColorId: "",
            wGemId: "",
            wJewelryId: "1",
            nColorId: "",
            nGemId: "",
            nJewelryId: "1",
            pageSize:15
          });
        }
      }
      this.dataGridOptions.type = port;
      this.send()
    },
    tabs(index, type) {
      if (this.tabClassActive.index == index) return;
      if (this.dataGridOptions.type == 4 && index == 3) {
        this.customDialog = true;
      }
      this.loading = true;
      //this.page = 1
      this.dataGridOptions.page = 1;
      this.dataGridOptions.pageSize = 15;
      this.tabClassActive.index = index;
      this.setReportType(type);
    },
    tabHover(index, evt) {
      //if (this.dataGridOptions.type == 4 && index == 3) {
      this.$refs.customDia.style.zIndex = "10";
      this.$refs.customDia.style.opacity = "1";
      //}
    },
    tabOut(index, evt) {
      //if (this.dataGridOptions.type == 4 && index == 3) {
      this.$refs.customDia.style.zIndex = "-1";
      this.$refs.customDia.style.opacity = "0";
      //}
    },
    cancelSort(item, index) {
      // 取消排序
      this.sortList.splice(index, 1);
      this.newList = this.sortList;
    },

    sortListAct(val) {
      debugger
      // 列表排序
      this.dataGridOptions.sortList = val;
      this.send();
      this.sortList = [];
      val.forEach((item, index) => {
        switch (Object.keys(item)[0]) {
          case "barcode":
            this.sortList.push({
              name: "条码号",
              value: item.barcode
            });
            break;
          case "weight":
            this.sortList.push({
              name: "件重",
              value: item.weight
            });
            break;
          case "className":
            this.sortList.push({
              name: "首饰名称",
              value: item.className
            });
            break;
          case "classTypeName":
            this.sortList.push({
              name: "产品类别",
              value: item.classTypeName
            });
            break;
          case "goldWeight":
            this.sortList.push({
              name: "金重",
              value: item.goldWeight
            });
            break;
          case "price":
            this.sortList.push({
              name: "售价",
              value: item.price
            });
            break;
          case "cost":
            this.sortList.push({
              name: "成本",
              value: item.cost
            });
            break;
          case "num":
            this.sortList.push({
              name: "件数",
              value: item.num
            });
            break;
        }
      });
    },
    diaInfoBack(val) {
      // 弹框信息返回
      this.resetFlag = false;
      //val.type 1.成色名称-计重  2.宝石名称-计重  3.首饰类别-计重  4.成色名称-计件  5.宝石名称-计件  6.首饰类别-计件
      switch (val.type) {
        case 1:
          this.dataGridOptions.wColorId = val.value;
          break;
        case 2:
          this.dataGridOptions.wGemId = val.value;
          break;
        case 3:
          this.dataGridOptions.wJewelryId = val.value;
          break;
        case 4:
          this.dataGridOptions.nColorId = val.value;
          break;
        case 5:
          this.dataGridOptions.nGemId = val.value;
          break;
        case 6:
          this.dataGridOptions.nJewelryId = val.value;
          break;
      }
    },

    modleSwitchFn(parm) {
      // this.$set(this, "modleSwitch", {
      //   title: this.modleSwitch.type
      //     ? "点击切换到销售统计"
      //     : "点击切换到收银统计",
      //   type: !this.modleSwitch.type,
      //   text: this.modleSwitch.type ? "收银统计" : "销售统计"
      // });
      this.modleSwitch = parm
      // 销售报表
      if (this.modleSwitch == '2') {
        //后台请求时间
        // this.dataGridOptions.beginTime = this.getDate(0,"start").fullData;
        // this.dataGridOptions.endTime = this.getDate(0, "end").fullData;
        this.dataGridOptions.reportType = 3;
        //日期控件默认设置时间
        // this.beginTime = this.getDate(
        //   -(new Date().getDate() - 1),
        //   "start"
        // ).format;
        // this.endTime = this.getDate(0, "end").format;

        this.sellShowId = "sales";
        this.currentReportName = "销售报表";

        this.$set(this.dataGridOptions, "sortList", [
          {
            classTypeName: "1"
          }
        ]);
        this.$set(this, "sortList", [
          {
            name: "产品类别",
            value: "1"
          }
        ]);
        this.$set(this, "newList", [
          {
            name: "产品类别",
            value: "1"
          }
        ]);

        this.dataGridOptions.pageSize = 15
        $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')

        this.send();
        
      } else {
        console.log('收银统计')
        //收银统计
        //后台请求时间
        // this.dataGridOptions.beginTime = this.getDate(0, "start").fullData;
        // this.dataGridOptions.endTime = this.getDate(0, "end").fullData;
        this.dataGridOptions.reportType = 1;
        this.dataGridOptions.sellStatus = 1;
        //日期控件默认设置时间
        // this.beginTime = this.getDate(0, "start").format;
        // this.endTime = this.getDate(0, "end").format;

        this.dataGridOptions.pageSize = 15
        $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')

        // this.send()
      }
    },
    printSuffix(index) {
      switch (index) {
        case 0: //销售
          if (this.getReportType() == 1) {
            return " - 明细";
          } else if (this.getReportType() == 2) {
            return " - 智能分类";
          } else if (this.getReportType() == 3) {
            return " - 产品分类";
          } else {
            return " - 自定义";
          }
          break;
        case 1: //回购
          if (this.getReportType() == 1) {
            return " - 明细";
          } else if (this.getReportType() == 2) {
            return " - 智能分类";
          } else if (this.getReportType() == 3) {
            return " - 产品分类";
          } else {
            return " - 自定义";
          }
          break;
      }
    },

    toHome() {
      this.$router.push("/work/report/");
    },

    clearInfo(val) {
      if (val.type == "柜组") {
        this.changeCounter.counterId = "";
        this.changeCounter.counterName = "";
      } else if (val.type == "店铺") {
        this.printSelectDate.shop = "";
        this.dataGridOptions.shopId = "";
        this.printSelectDate.preparedBy = "";
        this.dataGridOptions.makeUserList[0].makeUserId = "";
        this.printSelectDate.payee = "";
        this.dataGridOptions.cashierList[0].cashierId = "";
      } else if (val.type == "库位") {
        this.dataGridOptions.storageId = "";
        this.printSelectDate.storage = "";
      } else if (val.type == "供应商") {
        this.dataGridOptions.supplierId = "";
        this.printSelectDate.supplier = "";
      } else if (val.type == "制单人") {
        this.printSelectDate.preparedBy = "";
        Object.assign(this.dataGridOptions, {
          makeUserList: [
            {
              makeUserId: ""
            }
          ]
        });
      } else if (val.type == "收银人") {
        this.printSelectDate.payee = "";
        Object.assign(this.dataGridOptions, {
          cashierList: [
            {
              cashierId: ""
            }
          ]
        });
      } else if (val.type == "销售人") {
        this.printSelectDate.salesperson = "’";
        this.printSelectDate.operateId = "";
      }
      this.dataGridOptions.pageSize = 15
      $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')
      this.send();
    },
    dropReturn(val) {
      if (val.type == "柜组") {
        // this.dataGridOptions.storageId = val.item.operateId
        // this.printSelectDate.storage = val.item.operateName
      } else if (val.type == "店铺") {
        this.printSelectDate.shop = val.item.operateName;
        this.dataGridOptions.shopId = val.item.operateId;
        this.getUserList();
        //this._seekShowCounterList(val.item.operateId)
      } else if (val.type == "库位") {
        this.dataGridOptions.storageId = val.item.operateId;
        this.printSelectDate.storage = val.item.operateName;
      } else if (val.type == "供应商") {
        this.dataGridOptions.supplierId = val.item.operateId;
        this.printSelectDate.supplier = val.item.operateName;
      } else if (val.type == "制单人") {
        this.printSelectDate.preparedBy = val.item.operateName;
        Object.assign(this.dataGridOptions, {
          makeUserList: [
            {
              makeUserId: ""
            }
          ]
        });
        this.dataGridOptions.makeUserList[0].makeUserId = val.item.operateId;
      } else if (val.type == "收银人") {
        this.printSelectDate.payee = val.item.operateNam;
        Object.assign(this.dataGridOptions, {
          cashierList: [
            {
              cashierId: ""
            }
          ]
        });
        this.dataGridOptions.cashierList[0].cashierId = val.item.operateId;
      } else if (val.type == "销售人") {
        this.printSelectDate.salesperson = val.item.operateNam;
        this.printSelectDate.operateId = val.item.operateId;
        Object.assign(this.dataGridOptions, {
          salesmenList: [
            {
              salesmenId: ""
            }
          ]
        });
        this.dataGridOptions.salesmenList[0].salesmenId = val.item.operateId;
      }

      this.currentPage = 1;
      this.dataGridOptions.pageSize = 15
      $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')
      this.send();
    },

    shopClearInfo() {
      this.sellShowId = "sales";
      this.currentReportName = "销售报表";

      this.$set(this.dataGridOptions, "sortList", [
        {
          classTypeName: "1"
        }
      ]);
      this.$set(this, "sortList", [
        {
          name: "产品类别",
          value: "1"
        }
      ]);
      this.$set(this, "newList", [
        {
          name: "产品类别",
          value: "1"
        }
      ]);
      this.dataGridOptions.pageSize = 15
      $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')
      this.send();
    },

    shopDropReturn(type) {
      this.currentReportName = type.item.username;
      this.sellShowId = type.item.operateId;

      this.$set(this.dataGridOptions, "sortList", [
        {
          classTypeName: "1"
        }
      ]);
      this.$set(this, "sortList", [
        {
          name: "产品类别",
          value: "1"
        }
      ]);
      this.$set(this, "newList", [
        {
          name: "产品类别",
          value: "1"
        }
      ]);
      
      this.dataGridOptions.pageSize = 15
      $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')

      this.send();
    },
    checkAllChange(event) {
      this.selectValue = event.target.checked ? selectParam : [];
      this.indeterminate = false;
    },

    partChecked(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.selectParam.length;
      this.indeterminate =
        checkedCount > 0 && checkedCount < this.selectParam.length;
    },

    storageFunc() {
      this.dataGridOptions.pageSize = 15
      $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')
      this.send();
    },

    //滚动条滚动时不显示总计
    tabScrollShow(type) {
      this.tabShow = type ? "tabShow" : "";
    },

    //制单人
    getUserList() {
      let options = {
        companyId: "",
        type: "2",
        shopId: this.dataGridOptions.shopId
      };
      seekMemberList(options).then(
        res => {
          this.isdisabled = false;
          this.shopUserList = res.data.data.dataList;
        },
        res => {}
      );
    },

    //收银人
    getGetUserList() {
      let options = {
        companyId: "",
        type: "2",
        shopId: this.dataGridOptions.shopId
      };
      this.auditorUserList = [];
      seekMemberList(options).then(
        res => {
          //this.auditorUserList = res.data.data.dataList
        },
        res => {}
      );
    },

    //店铺
    getShopListByCo() {
      let options = {
        page: 1,
        pageSize: "9999"
      };
      seekGetShopListByCo(options).then(
        res => {
          this.shopList = res.body.data.shopList;

          if (this.shopList.length == 1) {
            this.itemShow = false;
            this.dataGridOptions.shopId = this.shopList[0].shopId;
            this.printSelectDate.shop = this.shopList[0].shopName;
            this.getUserList();
          } else {
            this.itemShow = true;
            this.dataGridOptions.shopId = this.shopList[0].shopId;
            this.printSelectDate.shop = this.shopList[0].shopName;
            this.getUserList();
          }
        },
        res => {}
      );
    },

    //获取当前的接口类型
    getReportType() {
      return this.dataGridOptions.type;
    },

    getTimeData(val) {
      this.dataGridOptions.beginTime =
        val
          .substr(0, 10)
          .split("-")
          .join("") + "000000";
      this.printSelectDate.startTime = val;
      this.dataGridOptions.pageSize = 15
      $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')
      this.send();
    },
    overTimeDate(val) {
      this.dataGridOptions.endTime =
        val
          .substr(0, 10)
          .split("-")
          .join("") + "235959";
      this.printSelectDate.endTime = val;
      this.dataGridOptions.pageSize = 15
      $('.loadControl span').html('更多未读取数据').css('color','#e99a1d')
      this.send();
    },
    getDate(day, type) {
      let _date = new Date();
      _date.setDate(_date.getDate() + day);
      //年
      let Year = _date.getFullYear();
      //月
      let month = this.formatDate(_date.getMonth() + 1);
      //天
      let Day = this.formatDate(_date.getDate());
      //时
      let hours = this.formatDate(_date.getHours());
      //分
      let mins = this.formatDate(_date.getMinutes());
      //秒
      let seconds = this.formatDate(_date.getSeconds());

      let timestamp = Year + month + Day;

      let currentData = new Date();

      if (type == "end") {
        //					if(Year < currentData.getFullYear() ||
        //						month < currentData.getMonth() + 1 ||
        //						Day < currentData.getDate()
        //					) {
        hours = "23";
        mins = seconds = "59";
        //					}
      } else if (type == "start") {
        hours = mins = seconds = "00";
      }

      return {
        format: Year + "-" + month + "-" + Day,
        timestamp: timestamp,
        fullData: timestamp + hours + mins + seconds
      };
    },

    formatDate(d) {
      return d < 10 ? "0" + d : d + "";
    },

    send(type) {
      if (this.modleSwitch == '2') {
        this.dataGridOptions.sellStatus = ''        
        this.sellSend();
        this.sellTradeSend();
        this.sellCollectSend();
      } 
    },

    /*
			 * 销售数据请求
			 */
    sellSend() {
      this.loading = true;
      //明细
      if (this.getReportType() == 1) {
        Object.assign(this.dataGridOptions, {
          page: 1,
          // pageSize: 15,
          // sellStatus:'1'
        });
      } else {
        delete this.dataGridOptions.page;
        delete this.dataGridOptions.pageSize;
      }

      if (this.dataGridOptions.makeUserList) {
        if (this.dataGridOptions.makeUserList[0].makeUserId == "") {
          delete this.dataGridOptions.makeUserList;
        }
      }
      if (this.dataGridOptions.cashierList) {
        if (this.dataGridOptions.cashierList[0].cashierId == "") {
          delete this.dataGridOptions.cashierList;
        }
      }

      let tempOption = Object.assign({}, this.dataGridOptions);
      if (this.printSelectDate.operateId != "") {
        this.$set(tempOption, "salesmenList", [
          {
            salesmenId: this.printSelectDate.operateId
          }
        ]);
      }
     // tempOption.sellStatus = '1'
      if (tempOption.type == 1) {
        Object.assign(tempOption, {sellStatus: '1'})
      }
      seekSellList(tempOption).then(res => {
        if (res.data.state === 200) {
          //数据表格数据
          //成色大类、小类
          this.sellStorage = res.data.data;
          //明细
          if (this.tabClassActive.reportType == 3) {
            this.sellStorage.printDetailList = res.data.data.detailList;
          }
        } else {
          this.$message({
            type: "error",
            message: res.body.msg
          });
        }

        this.loading = false;
      });
    },

    //回购数据请求
    sellTradeSend() {
      this.loading = true;
      if (this.dataGridOptions.makeUserList) {
        if (this.dataGridOptions.makeUserList[0].makeUserId == "") {
          delete this.dataGridOptions.makeUserList;
        }
      }
      if (this.dataGridOptions.cashierList) {
        if (this.dataGridOptions.cashierList[0].cashierId == "") {
          delete this.dataGridOptions.cashierList;
        }
      }
      seekBuyBackList(this.dataGridOptions).then(res => {
        if (res.data.state === 200) {
          //数据表格数据
          this.tradeStorage = res.data.data;
          console.log('回购数据',this.tradeStorage)
        } else {
          this.$message({
            type: "error",
            message: res.body.msg
          });
        }

        this.loading = false;
      });
    },

    //收银数据请求
    sellCollectSend() {
      this.loading = true;
      if (this.dataGridOptions.makeUserList) {
        if (this.dataGridOptions.makeUserList[0].makeUserId == "") {
          delete this.dataGridOptions.makeUserList;
        }
      }
      if (this.dataGridOptions.cashierList) {
        if (this.dataGridOptions.cashierList[0].cashierId == "") {
          delete this.dataGridOptions.cashierList;
        }
      }

      seekReportsCashList(this.dataGridOptions).then(res => {
        if (res.data.state === 200) {
          //数据表格数据
          this.collectStorage = res.data.data;
        } else {
          this.$message({
            type: "error",
            message: res.body.msg
          });
        }

        this.loading = false;
      });
    },

    setPrintShowCompany(type) {
      this.printSelectDate.showCompany = type;
    },

    //打印表格
    tabPrin() {
      if (
        _.indexOf(this.selectValue, "销售") >= 0 ||
        _.indexOf(this.selectValue, "回购") >= 0
      ) {
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
      //				if(this.selectValue.indexOf('销售') >= 0) {
      //					if(this.getReportType() == 1) { //明细
      //						this.printSellShow = this.sellStorage.detailList.length > 0
      //					} else {
      //						this.printSellShow = this.sellStorage.productTypeList.length > 0 && this.tradeStorage.productTypeList[0].totalNum == '0'
      //					}
      //				}
      //				if(this.selectValue.indexOf('回购') >= 0) {
      //					if(this.getReportType() == 1) { //明细
      //						this.printBuybackShow = this.tradeStorage.detailList.length > 0
      //					} else {
      //						this.printBuybackShow = this.tradeStorage.productTypeList.length > 0 && this.tradeStorage.productTypeList[0].totalNum == '0'
      //					}
      //				}
      //				if(this.selectValue.indexOf('收银') >= 0) {
      //					this.printCollectShow = this.collectStorage.shopList.length > 0
      //				}
      //				if(!this.printCollectShow &&
      //					!this.printBuybackShow &&
      //					!this.printSellShow
      //				) {
      //					this.$message({
      //						type: 'error',
      //						message: '暂无可打印数据'
      //					})
      //					this.visible2 = false;
      //					return
      //				}
      //				this.visible2 = false;
      //
      //				this.isPrint = 1;
      //				let print = null;
      //
      //				this.appPrint = document.getElementById('appPrint')
      //
      //				if(this.IntervalOut) clearInterval(this.IntervalOut)
      //				document.getElementById('app').style.display = 'none';
      //
      //				setTimeout(() => {
      //					this.appPrint.innerHTML = this.$refs.tablePrint.innerHTML
      //				}, 1000)
      //
      //				setTimeout(() => {
      //					print = document.execCommand('print');
      //				}, 1500)
      //
      //				this.IntervalOut = setInterval(() => {
      //					if(print) {
      //						document.getElementById('app').style.display = 'block';
      //						this.isPrint = 0;
      //						if(this.IntervalOut) clearInterval(this.IntervalOut)
      //						this.IntervalOut = null;
      //						this.appPrint.innerHTML = '';
      //						this.printCollectShow = false;
      //						this.printBuybackShow = false;
      //						this.printSellShow = false;
      //					} else if(print == false) {
      //						if(this.IntervalOut) clearInterval(this.IntervalOut)
      //						if(!window.print()) {
      //							document.getElementById('app').style.display = 'block';
      //							this.isPrint = 0;
      //							this.IntervalOut = null;
      //							this.appPrint.innerHTML = '';
      //							this.printCollectShow = false;
      //							this.printBuybackShow = false;
      //							this.printSellShow = false;
      //						}
      //					}
      //				}, 10)
    },
    // 导出报表
    exportTab() {
      console.log("导出报表");
      let exportTabData =Object.assign({},this.dataGridOptions);

      exportTabData["exportType"] = "XS";

      if (this.sellShowId === "sales") {
        exportTabData["sellFlag"] = "1";
        exportTabData["sellStatus"] = "1"
      } else if (this.sellShowId === "buyback") {
        exportTabData["sellFlag"] = "2";
        exportTabData["sellStatus"] = ""
      } else {
        exportTabData["sellFlag"] = "1";
      }
      console.log(exportTabData);

      if (exportTabData.type === 1) {
        downLoaderFile("/v1/export/exportExcelByReport", exportTabData);
      } else {
        downLoaderFile("/v1/export/exportExcelBySmart", exportTabData);
      }
    },
    LoadOptionsDefault(pageSize){
        let isAlltotal = false
        console.log('页面',this.sellStorage.totalNum)
        
        if(this.sellShowId === "sales"){
           // 销售报表到底
          if(this.dataGridOptions.pageSize>this.sellStorage.totalNum){
            isAlltotal = true
          }
        }
        if(this.sellShowId === "buyback"){
          // 回购到底
          if(this.dataGridOptions.pageSize>this.tradeStorage.totalNum){
            isAlltotal = true
          }
        }

        if(isAlltotal) {
           // 更换文字
          $('.loadControl span').html('已经到底了').css('color','#474747')
          return;
        }
        this.loading = true;    
        this.dataGridOptions.pageSize += pageSize;     
        console.log(this.dataGridOptions.pageSize)       
        // 销售
        if (this.sellShowId === "sales") {
          this.sellSend()
        } else if (this.sellShowId === "buyback") {
          this.sellTradeSend()
        } else {
          this.sellCollectSend()
        }
      },
  },

  mounted() {
    this.$nextTick(() => {
      //获取公司信息
      let companyName = JSON.parse(localStorage.getItem("companyInfo"));
      if (companyName) {
        this.printSelectDate.companyName = "公司名：" + companyName.companyName;
      }
	  });
	
	  var $btn = $('')
    },

    
};
</script>

<style lang="scss">
.select-print {
  .el-checkbox {
    .el-checkbox__label {
      font-size: 14px;
    }
    margin-left: 0 !important;
    text-align: center;
  }
  .el-checkbox-group {
    .el-checkbox {
      text-align: left;
    }
  }
  .el-checkbox__inner {
    border-radius: 3px;
  }
  .el-button {
    width: 90px;
    margin: 10px 20px;
  }
  > label.el-checkbox {
    border-bottom: 1px solid #ddd;
    .el-checkbox__inner {
      border-radius: 50%;
    }
  }
}

.Rp_dataGrid_container {
  &.last-table {
   // margin-bottom: 150px;
    // height: 645px !important;
  }
  .report-change {
    float: right;
    margin-top: 9px;
    margin-right: 15px;
    > .title-name {
      font-size: 16px !important;
      font-weight: normal !important;
      color: #2993f8 !important;
      .el-icon-circle-close {
        display: none;
      }
    }
    > .title-name:hover {
      .el-icon-circle-close {
        display: block;
      }
    }
  }
}
.mt-0{
  margin-top: 0;
}
.utils-container-sell {
  position: absolute;
  right: -70px;
  bottom: 0;
  width: 52px;
  min-height: 50px;
  background-color: #fff;
  border: 1px solid #ededed;
  border-radius: 5px;
  z-index: 3500;
  > .popover_primary {
    height: 50px;
    width: 50px;
    padding: 0;
    white-space: normal;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #ededed;
    overflow: hidden;
    .txt {
      position: absolute;
      height: 50px;
      height: 50px;
      z-index: 2;
      background-color: #2993f8;
      color: #fff;
      padding: 5px;
      line-height: 20px;
      border-radius: 5px;
      left: 0;
      top: 0;
      opacity: 0;
      transition: all 0.3s;
    }
    > span {
      display: flex;
      height: 50px;
      height: 50px;
      padding: 5px;
      line-height: 18px;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      > i {
        font-size: 24px;
        color: #999;
      }
    }
    &:hover {
      .txt {
        opacity: 1;
      }
      .iconfont {
        display: none;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.statistics-switch {
  color: #666;
  font-weight: bold;
  font-size: 14px;
  margin-right: 5px;
  cursor: pointer;
  > i {
    color: #2993f8;
    font-size: 12px;
    margin-left: 5px;
    font-weight: normal;
  }
}

.tab {
  position: relative;
  padding: 0 5px;
  &:after,
  &:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 16px;
    display: block;
    background-color: #d6d6d6;
    top: 5px;
  }
  &:after {
    left: 0;
  }
  &:before {
    right: 0;
  }
}
.exportBtn {
	bottom: 60px;
}
.sell-report-header{
  float: right;
}

.sell-report-cut-nav-list{
  float: left;
  overflow: hidden;
  box-shadow: 0 0 15px #e2e2e2;
  >li{
    padding: 12px 12px;
    font-size: 12px;
    font-weight: bold;
    float: left;
    color: #333;
    border-right: 1px solid #fff;
    background-color: #f1f2f3;
    cursor: pointer;
    transition: all 0.3s;
    &.actions, &:hover{
      background-color: #fff;
      color: #2993f8;
    }
  }
  li:last-child{
    border-right: none;
  }
}
.cut-bg-btn-wrap{
  float: right;
  margin-top: 10px;
}
</style>