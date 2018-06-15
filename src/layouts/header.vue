<template>
<transition name="tp-ani">
  <header class="app-header not-print">
      
      <h1 class="logo">
          <img class="companyLogo" v-if='companyInfo' :src="companyInfo ? companyInfo.logo : ''">
          <span class="company-name-now" v-if='companyInfo'>{{companyInfo.companyName}}</span>
          <!--公司切换-->
          <el-dropdown @command="switchCompany" trigger="click" v-if="companyList1.length>1">
            <span class="el-dropdown-link"><i class="iconfont icon-icon_qiehuangongsi"></i></span>
            
                <el-dropdown-menu slot="dropdown"  class="layout-drop-item">
                  <div class="header-layout">
                      <el-dropdown-item
                          :class="changeActive == index"
                          :command="{item:item,index:index}"
                          v-for="(item, index) in companyList1" :key="index">
                          {{item.companyName}}
                      </el-dropdown-item>
                  </div>
                      <el-dropdown-item v-if="isAllowCreate" @click.native="createComp"><i class="iconfont icon-jia2 icon-create-company"></i>创建公司</el-dropdown-item>
                      
                </el-dropdown-menu>
          </el-dropdown>
          
      </h1>

      <div class="page-side">
          <div class="menuTabs">
              <!--<menutabs></menutabs>-->
          </div>
          <div class="button">
              <!-- 搜索模块 begin  -->
              <div class="search" ref="mysearch">
                  <!-- <div class="drop-search">单据<i class="el-icon-caret-bottom"></i></div> -->
                  <!-- <el-dropdown class="drop-search" @command="searchType">
                      <span class="el-dropdown-link">
                          {{searchTypeText}}<i class="iconfont icon-xiala"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown" class="layout-drop-item search-drop-item">
                          <el-dropdown-item command="单据">单据</el-dropdown-item>
                          <el-dropdown-item command="商品">商品</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown> -->
                  <input type="text" @focus="changesearchborder(1)" @blur="changesearchborder(2)" @keyup="watchCloseIcon" @keyup.enter="goSearchPage" v-model="searchText" placeholder="请输入关键字..." />
                  <i v-if="iconShow" class="iconfont icon-sousuo" @click="goSearchPage" title="搜索"></i>
                  <i v-else class="iconfont el-icon-circle-cross" @click="closeIcon" title="清除"></i>
                  <!-- 搜索的列表 begin -->
                  <div v-if="isSearch && searchText.length >= 3" class="searchList">
                    <!-- 商品 -->
                    <div class="commodity">
                        <h1>商品</h1>
                        <div class="commodityList">
                          <div class="commodityItem" v-if="productList.length == 0">未匹配到相关商品信息，查看<span @click.stop="openListDeta(0)">所有商品</span></div>
                          <div class="commodityItem" v-else v-for="(item,index) in productList" :key="index" @click.stop="openDialog(productList[index].productId)">
                            <span class="gno">{{ item.barcode }}</span><span class="gnn">{{ item.jewelryName }}</span><span class="slocation fr">{{ item.locationName }}</span>
                          </div>
                          <div class="commodityItem" v-if="productList.length > 5" @click.stop="openListDeta(0)">
                            <i style="font-size: 1em; position: static;" class="iconfont icon-sousuo"></i><span class="more">更多商品</span><span class="more_num">({{productTotalNum}})</span>
                          </div>
                        </div>
                    </div>
                    <!-- 单据 -->
                    <div class="receipts">
                        <h1>单据</h1>
                        <div class="receiptsList">
                          <div class="receiptsItem" v-if="orderList.length == 0">未匹配到相关单据信息，查看<span @click.stop="openListDeta(1,true)">所有单据</span></div>
                          <div class="receiptsItem" v-else @click.stop="openListDeta" v-for="(item,index) in orderList" :key="index">
                            <span class="gno">{{ item.orderNum }}</span><span class="state">{{ getOrderType(item.orderType) }}</span><span class="slocation fr">{{ item.createName }}</span>
                          </div>
                          <div class="receiptsItem" v-if="orderList.length > 5" @click.stop="openListDeta(1)">
                            <i style="font-size: 1em; position: static;" class="iconfont icon-sousuo"></i><span class="more">更多单据</span><span class="more_num">({{orderTotalNum}})</span>
                          </div>
                        </div>
                    </div>
                    <!-- 会员 -->
                    <div class="members">
                        <h1>会员</h1>
                        <div class="membersList">
                          <div class="membersItem" v-if="memberListData.length == 0">未匹配到相关会员信息，查看<span @click.stop="openListDeta(2,true)">所有会员</span></div>
                          <div class="membersItem" v-else @click.stop="openMember(item)" v-for="(item,index) in memberListData" :key="index">
                            <span class="gno">{{item.memberNum}}</span><span class="gnn">{{item.memberName}}</span><span class="slocation fr">{{item.shopName}}</span>
                            
                          </div>
                          <div class="membersItem" v-if="memberListData.length > 5" @click.stop="openListDeta(2)">
                            <i style="font-size: 1em; position: static;" class="iconfont icon-sousuo"></i><span class="more">更多会员</span><span class="more_num">({{memberTotalNum}})</span>
                          </div>
                        </div>
                    </div>

                  </div>
                  <!-- 搜索的列表 end -->

              </div>
              <!-- 搜索模块 end  -->
              <div class="info" @click="unreadNoticeNum = 0">
                <el-badge :value="unreadNoticeNum" :hidden="unreadNoticeNum == 0" class="item" title="公告">
                  <router-link class="iconfont icon-tixing" tag="i" to="/notice"></router-link>
                </el-badge>
              </div>
              <div class="msg">
                <!-- <i class="iconfont icon-xinxiang" title="消息"></i> -->
                  <el-badge :value="unreadSystemMessageNum" :hidden="unreadSystemMessageNum == 0" class="item" title="消息">
                      <router-link class="iconfont icon-xinxiang" tag="i" to="/message"></router-link>
                  </el-badge>
              </div>
          </div>
          <div class="user-info">
              <!-- <img @click="goAdmin" v-if="userInfo" class="user-img" :src="userInfo.userLogo"> -->
              <FormatImg :logo="userInfo.userLogo" @click.native="goAdmin" class="img" :userName="userInfo.userName || userInfo.phone" :size="40"></FormatImg>
              <div v-if="userInfo" class="userInfo_silder">欢迎您！
                  <el-dropdown @command="selectMenu">
                      <span class="el-dropdown-link">
                          {{userInfo.userName || userInfo.phone}}<i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown" class="layout-drop-item">
                          <!--<el-dropdown-item command="a">个人信息</el-dropdown-item>-->
                          <!--<el-dropdown-item command="b">我的公司</el-dropdown-item>
                          <el-dropdown-item command="c">店铺管理</el-dropdown-item>-->
                          <!--<el-dropdown-item command="d">修改密码</el-dropdown-item>-->
                          <el-dropdown-item command="e">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </div>
          </div>
      </div>

      <!-- 点击了搜索列表后的弹窗 -->
      <el-dialog top="7%" :modal="false" :modal-append-to-body="false" :visible.sync="ListDetails" customClass="ruleOption serachList">
        <!-- tab栏 -->
        <div class="tab-list">
          <ul>
            <li @click="tabAction(index)" v-for="(item, index) in tabList" :key="index" :class="{active: actIndex == index}">
              <div>{{item}}</div>
            </li>
          </ul>
			  </div>
        <!-- tab栏切换的内容 -->
        <div class="page-wrap">
				  <component :showAll="showAll" :is="panel" :panelType="panelType" :serchKey="searchText" @close="close"></component>
			  </div>
        
      </el-dialog>
      <!-- 点击了商品的弹窗 -->
      <el-dialog :title="productTypeName" top="7%" :modal="true" :modal-append-to-body="false" :visible.sync="DataShow" customClass="ruleOption detailsBounced">
          <div class="detailsInfo">
            <div class="detailsInfo_left">
              <div class="main-body">
                <!-- <ul class="title-tab">
                    <div class="slide" ref="slide"></div>
                    <li @click="tabSwitch(item, index, $event)" :key="index" :class="{active: tabIndex==index}" v-for="(item, index) in tabList">
                        <div>{{item.label}}</div>
                    </li>

                </ul> -->
                <ul class="item-blobk">
                    <li v-for="(item, index) in sortDataList" :key="index">
                        <div class="main-name">
                            <div class="name-wrap">
                                <span class="line"></span>
                                <span class="name">{{item.label}}</span>
                            </div>
                        </div>
                        <div class="main-item-list">
                            <div class="main-item" v-for="(f, i) in item.dataList" :key="i">
                                <div class="title">{{f.itemName}}</div>
                                <div class="value">{{f.itemVal}}<span v-if="f.unit">{{f.unit}}</span></div>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
              </div>
            </div>
            <div class="detailsInfo_right">
              <div class="right_top">
                <div><i class="icon-dian fl">●</i><p>{{locationName}}</p></div>
                <div><i class="icon-dian fl">●</i><p>{{getProductType(productType)}}</p></div>
                <div><i class="icon-dian fl">●</i><p>{{getProductClass(productClass)}}</p></div>
              </div>
              <div class="right_bottom">
                <!-- 步骤条 -->
                <steps-path :orderListST="orderListST" :productId="productId" :statusREfresh="statusREfresh">
                </steps-path>
              </div>
            </div>
          </div>
      </el-dialog>
      <!-- 点击了会员列表 -->
      <member-info
        @closeReturn="closeEditReturn" 
        :memberId="memberId"
        :shopId="shopId"
        :memberInfoFlag="editLeaguer">
      </member-info>
  </header>
</transition>
</template>

<script>
import {
  seekMySelfWorkApplyList,
  seekPermissionList,
  seekCompanyList,
  seekUnreadCount
} from "../../src/Api/commonality/seek";
import {
  operateSwitchCompany,
  operateLogout
} from "../../src/Api/commonality/operate";
import FormatImg from "components/template/DefaultHeadFormat.vue";
import menutabs from "components/menuTab.vue";
let skinConfig = require("./skinConfig");

import ProductList from './SearchPage/ProductList'
import DocumentsList from './SearchPage/DocumentsList'
import memberList from './SearchPage/memberList'
import stepsPath from './SearchPage/newDataGrid/stepsPath'

import { homepageSearch, productLogRecord,productStatusInfo } from 'Api/search'
import { seekCommodityDetails } from "Api/commonality/seek"

// 导入会员的弹窗
import memberInfo from './Leaguer/components/memberInfo'

export default {
  data() {
    return {
      statusREfresh: false,
      orderNum:'',
      
      skinConf: [],
      searchText: "",
      searchTypeText: "商品",
      companyList1: [],
      changeActive: -1,
      iconShow: true,
      num: 1,
      skinIndex: 0,
      smallUrl: "",
      unreadSystemMessageNum: "", // 未读系统消息
      unreadNoticeNum: "", // 未读公告

      isSearch: false, // 搜索列表
      ListDetails: false, // 列表弹框

      DataShow: false,
      
      tabList: [
        '商品',
        '单据',
        '会员'	
      ],
      panel: ProductList,// 对应的页面
      actIndex:'0', // 对应选中的参数
      panelType: 0, // 对应的页面

      lastTitleName: '',
      tabIndex: 0,
      sortDataList: [], // 排序数组
      dataModel: {
        baseData: {
          id: 0,
          label: "基本信息",
          dataList: []
        },
        weightData: {
          id: 1,
          label: "重量",
          dataList: []
        },
        certificateData: {
          id: 2,
          label: "证书",
          dataList: []
        },
        mainData: {
          id: 3,
          label: "主石",
          dataList: []
        },
        deputyData: {
          id: 4,
          label: "副石",
          dataList: []
        },
        feeData: {
          id: 5,
          label: "工费",
          dataList: []
        },
        partData: {
          id: 6,
          label: "配件",
          dataList: []
        },
        otherData: {
          id: 6,
          label: "其他费用",
          dataList: []
        },
        priceData: {
          id: 6,
          label: "标价",
          dataList: []
        },
        remarkData: {
          id: 6,
          label: "备注",
          dataList: []
        }
      },

        
      orderList: [], // 对应的单据
      productList: [], // 对应的商品
      memberListData: [], // 对应的会员

      orderTotalNum:'', //对应的单据总数
      productTotalNum:'', //对应的商品总数
      memberTotalNum:'', //对应的会员总数

      dataGridStorage: [], // 列表数据
      productTypeName: '', // 头部名
      productId: '',

      orderListST:[], // 数据列表
      
      productType: '',
      locationName: '',
      productClass: '',

      showAll: false,
      editLeaguer: false,
      memberId:'',
      shopId:''

    };
  },
  components: {
    FormatImg,
    menutabs, //加载头部页签组件
    ProductList,
    DocumentsList,
    memberList,
    stepsPath,
    memberInfo, // 会员弹框
  },
  props: ["companyInfo", "userInfo", "isAllowCreate"],

  created() {
    this.companyList(); // 公司列表
    this.skinConf = skinConfig.skinList;
    this.unreadCount();
  },
  mounted() {
    let body = document.getElementById("body");
    // let aShield = document.getElementsByClassName('skin-shield')
    //let aShield = document.getElementsByClassName('skin-shield')
    if (localStorage.getItem("bgUrl")) {
      let obj = JSON.parse(localStorage.getItem("bgUrl"));
      body.style.background = obj.url;
      this.skinIndex = obj.index;
      if (obj.flag == "custom") {
        $("#body").addClass("body-shield");
        //this.$refs.switch_skin.style.background = obj.url
      } else if (obj.flag == "static") {
        $("#body").removeClass("body-shield");
        //this.$refs.switch_skin.style.background = "#f5f8f7"
      }
    }
  },
  watch: {
    companyInfo: function() {
      if (this.companyInfo.companyName) {
        localStorage.setItem("companyInfo", JSON.stringify(this.companyInfo));
      }
    },
    $route: function() {
      this.unreadCount();
    }
  },
  methods: {
    openMember (item) {
      this.editLeaguer = true
      this.memberId = item.memberId
      this.shopId = item.shopId
      console.log('会员数据',item)
    },
    closeEditReturn (val) {
      this.editLeaguer = val.status
      // this.memberAllList()
      // this.memberTotalNum()
    },
    close(parm) {
      console.log('点击关闭',parm)
      this.ListDetails = parm
    },
    // 打开详情的弹窗
    openDialog(parm) {
      this.commodityDetails(parm)
      this.DataShow = true
    },
    dataSortGroup() {
      // 数据排序分组
      if (this.tabIndex == 0) {
        this.sortDataList = [
          this.dataModel.baseData,
          this.dataModel.weightData,
          this.dataModel.certificateData,
          this.dataModel.mainData,
          this.dataModel.deputyData,
          this.dataModel.feeData,
          this.dataModel.partData,
          this.dataModel.otherData,
          this.dataModel.priceData,
          this.dataModel.remarkData
        ];
      } else if (this.tabIndex == 1) {
        this.sortDataList = [
          this.dataModel.weightData,
          this.dataModel.certificateData,
          this.dataModel.mainData,
          this.dataModel.deputyData,
          this.dataModel.feeData,
          this.dataModel.partData,
          this.dataModel.otherData,
          this.dataModel.priceData,
          this.dataModel.remarkData,
          this.dataModel.baseData
        ];
      } else if (this.tabIndex == 2) {
        this.sortDataList = [
          this.dataModel.certificateData,
          this.dataModel.mainData,
          this.dataModel.deputyData,
          this.dataModel.feeData,
          this.dataModel.partData,
          this.dataModel.otherData,
          this.dataModel.priceData,
          this.dataModel.remarkData,
          this.dataModel.baseData,
          this.dataModel.weightData
        ];
      } else if (this.tabIndex == 3) {
        this.sortDataList = [
          this.dataModel.mainData,
          this.dataModel.deputyData,
          this.dataModel.feeData,
          this.dataModel.partData,
          this.dataModel.otherData,
          this.dataModel.priceData,
          this.dataModel.remarkData,
          this.dataModel.baseData,
          this.dataModel.weightData,
          this.dataModel.certificateData
        ];
      } else if (this.tabIndex == 4) {
        this.sortDataList = [
          this.dataModel.deputyData,
          this.dataModel.feeData,
          this.dataModel.partData,
          this.dataModel.otherData,
          this.dataModel.priceData,
          this.dataModel.remarkData,
          this.dataModel.baseData,
          this.dataModel.weightData,
          this.dataModel.certificateData,
          this.dataModel.mainData
        ];
      } else if (this.tabIndex == 5) {
        this.sortDataList = [
          this.dataModel.feeData,
          this.dataModel.partData,
          this.dataModel.otherData,
          this.dataModel.priceData,
          this.dataModel.remarkData,
          this.dataModel.baseData,
          this.dataModel.weightData,
          this.dataModel.certificateData,
          this.dataModel.mainData,
          this.dataModel.deputyData
        ];
      } else if (this.tabIndex == 6) {
        this.sortDataList = [
          this.dataModel.partData,
          this.dataModel.otherData,
          this.dataModel.priceData,
          this.dataModel.remarkData,
          this.dataModel.baseData,
          this.dataModel.weightData,
          this.dataModel.certificateData,
          this.dataModel.mainData,
          this.dataModel.deputyData,
          this.dataModel.feeData
        ];
      } else if (this.tabIndex == 7) {
        this.sortDataList = [
          this.dataModel.otherData,
          this.dataModel.priceData,
          this.dataModel.remarkData,
          this.dataModel.baseData,
          this.dataModel.weightData,
          this.dataModel.certificateData,
          this.dataModel.mainData,
          this.dataModel.deputyData,
          this.dataModel.feeData,
          this.dataModel.partData
        ];
      } else if (this.tabIndex == 8) {
        this.sortDataList = [
          this.dataModel.priceData,
          this.dataModel.remarkData,
          this.dataModel.baseData,
          this.dataModel.weightData,
          this.dataModel.certificateData,
          this.dataModel.mainData,
          this.dataModel.deputyData,
          this.dataModel.feeData,
          this.dataModel.partData,
          this.dataModel.otherData
        ];
      } else if (this.tabIndex == 9) {
        this.sortDataList = [
          this.dataModel.remarkData,
          this.dataModel.baseData,
          this.dataModel.weightData,
          this.dataModel.certificateData,
          this.dataModel.mainData,
          this.dataModel.deputyData,
          this.dataModel.feeData,
          this.dataModel.partData,
          this.dataModel.otherData,
          this.dataModel.priceData
        ];
      }
    },
    dataClustering(data) {
      // 数据分组
      this.dataModel.baseData.dataList = [];
      this.dataModel.weightData.dataList = [];
      this.dataModel.certificateData.dataList = [];
      this.dataModel.mainData.dataList = [];
      this.dataModel.deputyData.dataList = [];
      this.dataModel.feeData.dataList = [];
      this.dataModel.partData.dataList = [];
      this.dataModel.otherData.dataList = [];
      this.dataModel.priceData.dataList = [];
      this.dataModel.remarkData.dataList = [];
      for (let i in data) {
        // ******************************* 基本信息 *********************************************
        if (i == "barcode") {
          this.dataModel.baseData.dataList.push({
            itemName: "条码号",
            itemVal: data[i]
          });
        } else if (i == "productType") {
          this.dataModel.baseData.dataList.push({
            itemName: "产品类别",
            itemVal: data[i]
          });
        } else if (i == "jewelryName") {
          this.dataModel.baseData.dataList.push({
            itemName: "首饰名称",
            itemVal: data[i]
          });
        } else if (i == "brand") {
          this.dataModel.baseData.dataList.push({
            itemName: "品牌",
            itemVal: data[i]
          });
        } else if (i == "brand") {
          this.dataModel.baseData.dataList.push({
            itemName: "款号",
            itemVal: data[i]
          });
        } else if (i == "brand") {
          this.dataModel.baseData.dataList.push({
            itemName: "手寸",
            itemVal: data[i]
          });
        } else if (i == "totalWeight") {
          // ******************************* 重量 *********************************************
          this.dataModel.weightData.dataList.push({
            itemName: "总件重",
            itemVal: data[i],
            unit: "g"
          });
        } else if (i == "netWeight") {
          this.dataModel.weightData.dataList.push({
            itemName: "净金重",
            itemVal: data[i],
            unit: "g"
          });
        } else if (i == "heavyCode") {
          this.dataModel.weightData.dataList.push({
            itemName: "含配金重",
            itemVal: data[i],
            unit: "g"
          });
        } else if (i == "goldCost") {
          this.dataModel.weightData.dataList.push({
            itemName: "金耗",
            itemVal: data[i],
            unit: "%"
          });
        } else if (i == "goldPrice") {
          this.dataModel.weightData.dataList.push({
            itemName: "金价",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "goldColor") {
          this.dataModel.weightData.dataList.push({
            itemName: "金属颜色",
            itemVal: data[i]
          });
        } else if (i == "goldE") {
          this.dataModel.weightData.dataList.push({
            itemName: "金料额",
            itemVal: data[i],
            unit: "元"
          });
          this.dataModel.priceData.dataList.push({
            itemName: "金料额",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "certifiNo") {
          // ******************************* 证书 *********************************************
          this.dataModel.certificateData.dataList.push({
            itemName: "证书号",
            itemVal: data[i]
          });
        } else if (i == "authCode") {
          this.dataModel.certificateData.dataList.push({
            itemName: "验证码",
            itemVal: data[i]
          });
        } else if (i == "certifiName") {
          this.dataModel.certificateData.dataList.push({
            itemName: "证书名",
            itemVal: data[i]
          });
        } else if (i == "brand") {
          this.dataModel.certificateData.dataList.push({
            itemName: "检验机构",
            itemVal: data[i]
          });
        } else if (i == "certifiFee") {
          this.dataModel.certificateData.dataList.push({
            itemName: "证书费",
            itemVal: data[i],
            unit: "元"
          });
          this.dataModel.priceData.dataList.push({
            itemName: "证书费",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "mainName") {
          // ******************************* 主石 *********************************************
          this.dataModel.mainData.dataList.push({
            itemName: "主石名",
            itemVal: data[i]
          });
        } else if (i == "stand") {
          this.dataModel.mainData.dataList.push({
            itemName: "主石规格",
            itemVal: data[i]
          });
        } else if (i == "count") {
          this.dataModel.mainData.dataList.push({
            itemName: "主石粒数",
            itemVal: data[i]
          });
        } else if (i == "mainWeight") {
          this.dataModel.mainData.dataList.push({
            itemName: "主石重",
            itemVal: data[i],
            unit: ""
          });
        } else if (i == "unit") {
          this.dataModel.mainData.dataList.push({
            itemName: "主石单位",
            itemVal: data[i]
          });
        } else if (i == "mainCalcMethod") {
          this.dataModel.mainData.dataList.push({
            itemName: "计价方式",
            itemVal: data[i]
          });
        } else if (i == "mainTPrice") {
          this.dataModel.mainData.dataList.push({
            itemName: "主石额",
            itemVal: data[i],
            unit: "元"
          });
          this.dataModel.priceData.dataList.push({
            itemName: "主石额",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "shape") {
          this.dataModel.mainData.dataList.push({
            itemName: "形状",
            itemVal: data[i]
          });
        } else if (i == "color") {
          this.dataModel.mainData.dataList.push({
            itemName: "颜色",
            itemVal: data[i]
          });
        } else if (i == "neatness") {
          this.dataModel.mainData.dataList.push({
            itemName: "净度",
            itemVal: data[i]
          });
        } else if (i == "blackout") {
          this.dataModel.mainData.dataList.push({
            itemName: "切工",
            itemVal: data[i]
          });
        } else if (i == "polishing") {
          this.dataModel.mainData.dataList.push({
            itemName: "抛光",
            itemVal: data[i]
          });
        } else if (i == "symmetry") {
          this.dataModel.mainData.dataList.push({
            itemName: "对称",
            itemVal: data[i]
          });
        } else if (i == "fluorescent") {
          this.dataModel.mainData.dataList.push({
            itemName: "荧光",
            itemVal: data[i]
          });
        } else if (i == "mainPrice") {
          this.dataModel.mainData.dataList.push({
            itemName: "主石单价",
            itemVal: data[i]
          });
        } else if (i == "deputyName") {
          // ******************************* 副石 *********************************************
          this.dataModel.deputyData.dataList.push({
            itemName: "副石名",
            itemVal: data[i]
          });
        } else if (i == "deputyStand") {
          this.dataModel.deputyData.dataList.push({
            itemName: "副石规格",
            itemVal: data[i]
          });
        } else if (i == "deputyCount") {
          this.dataModel.deputyData.dataList.push({
            itemName: "副石粒数",
            itemVal: data[i]
          });
        } else if (i == "deputyWeight") {
          this.dataModel.deputyData.dataList.push({
            itemName: "副石重",
            itemVal: data[i],
            unit: ""
          });
        } else if (i == "deputyUnitPrice") {
          this.dataModel.deputyData.dataList.push({
            itemName: "副石单价",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "deputyCalcMethod") {
          this.dataModel.deputyData.dataList.push({
            itemName: "计价方式",
            itemVal: data[i]
          });
        } else if (i == "deputyPrice") {
          this.dataModel.deputyData.dataList.push({
            itemName: "副石额",
            itemVal: data[i],
            unit: "元"
          });
          this.dataModel.priceData.dataList.push({
            itemName: "副石额",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "deputyUnit") {
          this.dataModel.deputyData.dataList.push({
            itemName: "副石单位",
            itemVal: data[i],
            unit: ""
          });
        } else if (i == "soldFee") {
          // ******************************* 工费 *********************************************
          this.dataModel.feeData.dataList.push({
            itemName: "销售工费",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "soldMethod") {
          this.dataModel.feeData.dataList.push({
            itemName: "销售工费方式",
            itemVal: data[i]
          });
        } else if (i == "inFee") {
          this.dataModel.feeData.dataList.push({
            itemName: "进货工费",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "inMethod") {
          this.dataModel.feeData.dataList.push({
            itemName: "进货工费方式",
            itemVal: data[i]
          });
        } else if (i == "inMoney") {
          this.dataModel.feeData.dataList.push({
            itemName: "进货工费额",
            itemVal: data[i],
            unit: "元"
          });
          this.dataModel.priceData.dataList.push({
            itemName: "进货工费额",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "partName") {
          // ******************************* 配件 *********************************************
          this.dataModel.partData.dataList.push({
            itemName: "配件名",
            itemVal: data[i]
          });
        } else if (i == "partCount") {
          this.dataModel.partData.dataList.push({
            itemName: "配件数",
            itemVal: data[i]
          });
        } else if (i == "partWeight") {
          this.dataModel.partData.dataList.push({
            itemName: "配件重",
            itemVal: data[i],
            unit: "g"
          });
        } else if (i == "partPrice") {
          this.dataModel.partData.dataList.push({
            itemName: "单价",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "calcMethod") {
          this.dataModel.partData.dataList.push({
            itemName: "计费方式",
            itemVal: data[i]
          });
        } else if (i == "price") {
          this.dataModel.partData.dataList.push({
            itemName: "配件额",
            itemVal: data[i],
            unit: "元"
          });
          this.dataModel.priceData.dataList.push({
            itemName: "配件额",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "otherFeeName") {
          // ******************************* 其他 *********************************************
          this.dataModel.otherData.dataList.push({
            itemName: "其他费用名",
            itemVal: data[i]
          });
        } else if (i == "otherFee") {
          this.dataModel.otherData.dataList.push({
            itemName: "其他费用额",
            itemVal: data[i],
            unit: "元"
          });
          this.dataModel.priceData.dataList.push({
            itemName: "其他费用额",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "costPrice") {
          // ******************************* 标价 *********************************************
          this.dataModel.priceData.dataList.push({
            itemName: "成本",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "ratio") {
          this.dataModel.priceData.dataList.push({
            itemName: "倍率",
            itemVal: data[i]
          });
        } else if (i == "soldPrice") {
          this.dataModel.priceData.dataList.push({
            itemName: "售价",
            itemVal: data[i],
            unit: "元"
          });
        } else if (i == "remark") {
          // ******************************* 备注 *********************************************
          this.dataModel.remarkData.dataList.push({
            itemName: "备注信息",
            itemVal: data[i]
          });
        }
      }
      this.dataSortGroup();
    },
    commodityDetails(parm) {
      this.productId = parm
      // 商品明细数据
      let options = {
        productId: parm
      };
      // 获取展示的数据
      seekCommodityDetails(options).then((res) => {
        if (res.data.state == 200) {
            console.log('商品搜索数据:',res.data.data);
            this.dataClustering(res.data.data)
            this.productTypeName = res.data.data.jewelryName
        }
        }, (res) => {

      })
      // 获取商品数据
      productLogRecord(options).then(
        res => {
          if (res.data.state == 200) {
            this.orderListST = res.data.data.orderList
          }
        },
        res => {}
      );
      // 获取商品状态
      productStatusInfo(options).then(res => {
        if(res.data.state == 200) {
          this.productType = res.data.data.productType
          this.locationName = res.data.data.locationName
          this.productClass = res.data.data.productClass
        }
      })
    },
    openListDeta(type,showAll) {
      switch (type) {
        case 0:
          this.panel = ProductList
          this.panelType = type
          this.actIndex = type + ''
          break;
        case 1:
          this.panel = DocumentsList
          this.panelType = type
          this.actIndex = type + ''

          if(showAll) {
            this.showAll = true
          } else {
            this.showAll = false
          }
          break;
        case 2:
          this.panel = memberList
          this.panelType = type
          this.actIndex = type + '' 

          if(showAll) {
            this.showAll = true
          } else {
            this.showAll = false
          }         
          break;
      
        default:
          break;
      }

      this.ListDetails = true
      this.isSearch = false
    },
    changesearchborder(val) {
      if (val == 1) {
        this.$refs.mysearch.style.border = "1px solid #2993f8";
        this.isSearch = true;
      } else {
        setTimeout(() => {
          this.$refs.mysearch.style.border = "1px solid #fff";
          this.isSearch = false
        }, 200);
      }
    },
    unreadCount() {
      seekUnreadCount().then(
        res => {
          this.unreadSystemMessageNum = res.data.data.unreadSystemMessageNum;
          this.unreadNoticeNum = res.data.data.unreadNoticeNum;
        },
        res => {}
      );
    },
    closeIcon() {
      this.searchText = "";
      this.iconShow = true;
    },
    watchCloseIcon() {
      // if (this.searchText != "") {
      //   this.iconShow = false;
      // } else {
      //   this.iconShow = true;
      // }

      // 字数大于3的时候请求
      if(this.searchText.length >=3 ) {
        this.getHomepageSearchData()
      }

    },
    createComp() {
      this.$emit("messageBack", { flag: true, type: 2 });
    },
    companyList() {
      seekCompanyList().then(
        res => {
          this.companyList1 = res.data.data.dataList;
        },
        res => {}
      );
    },
    switchCompany(command) {
      // 切换公司
      let options = {
        companyId: command.item.companyId
      };
      this.changeActive = command.index;

      operateSwitchCompany(options).then(
        res => {
          this.$router.push({ path: "/mainIndex" });
          sessionStorage.setItem("companyId", command.item.companyId);
          location.reload();
        },
        res => {}
      );
    },
    goSearchPage() {
      // 去搜索页面
      // if (this.searchTypeText == "单据") {
      //   this.$router.push({
      //     path: "/billSearch",
      //     query: { text: this.searchText }
      //   });
      // } else if (this.searchTypeText == "商品") {
      //   this.$router.push({
      //     path: "/goodsSearch",
      //     query: { text: this.searchText }
      //   });
      // }

      // 直接搜索
      this.getHomepageSearchData()
      this.isSearch = true
    },
    searchType(command) {
      //单击搜索类型切换
      this.searchTypeText = command;
    },
    //selectMenu
    selectMenu(command) {
      if (command == "a") {
        this.$router.push({ path: "/admin/personalInfo" });
      } else if (command == "b") {
        this.$router.push({ path: "/admin/myCompany" });
      } else if (command == "c") {
        this.$router.push({ path: "/admin/shopManage" });
      } else if (command == "d") {
        this.$router.push({ path: "/admin/pawdSetting" });
      } else if (command == "e") {
        operateLogout().then(res => {
          if (res.data.state == 200) {
            this.$router.push({ path: "/member/login" });
            let body = document.getElementById("body");
            body.style.background = "#f5f8f7";
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      }
    },

    goAdmin() {
      //this.$router.push({path: '/admin'})
      this.$emit("goPersonalInfo", { flag: true });
    },
    // tab栏切换
    tabAction(index) {
        console.log(index)
        this.actIndex = index + ''
        this.panelType = index        
				switch(index) {
          case 0:
            this.panel = ProductList
						break;
          case 1:
            this.panel = DocumentsList
						break;
          case 2:
            this.panel = memberList
						break;
				}
		},
    // 获取搜索列表
    getHomepageSearchData() {
      let options = {
        keyWord : this.searchText
      }
      homepageSearch(options).then(res => {
        if(res.data.state == 200) {
          this.orderList = res.data.data.orderList || []
          this.productList = res.data.data.productList || []
          this.memberListData = res.data.data.memberList || []

          this.orderTotalNum = res.data.data.orderTotalNum
          this.productTotalNum = res.data.data.productTotalNum
          this.memberTotalNum = res.data.data.memberTotalNum

        }
      })
    },
    // 获取订单状态
    getOrderType(type) {
      switch (type) {
        case '1':
          return '入库'
          break;
        case '2':
          return '退库'
          break;
        case '3':
          return '发货'
          break;
        case '4':
          return '退货'
          break;
        case '5':
          return '销售/回购'
          break;
        case '6':
          return '调柜'
          break;
        case '7':
          return '调库'
          break;
        case '10':
          return '修改'
          break;
        case '11':
          return '服务'
          break;
      
        default:
          break;
      }
    },
    // 商品状态
    getProductType(data) {
      switch (data) {
        case "10":
          return '在库位'
          break;
        case "11":
          return '入库中'
          break;
        case "20":
          return '已退库'
          break;
        case "21":
          return '退库中'
          break;
        case "30":
          return '已修改'
          break;
        case "31":
          return '修改中'
          break;
        case "40":
          return '已调库'
          break;
        case "41":
          return '调库中'
          break;
        case "50":
          return '已发货'
          break;
        case "51":
          return '发货中'
          break;
        case "52":
          return '发货审核'
          break;
        case "60":
          return '已退货'
          break;
        case "61":
          return '退货中'
          break;
        case "62":
          return '退货审核'
          break;
        case "70":
          return '已调柜'
          break;
        case "71":
          return '调柜中'
          break;
        case "80":
          return '已销售'
          break;
        case "81":
          return '销售中'
          break;
        case "90":
          return '销退中'
          break;
        case "91":
          return '已销退'
          break;
        case "92":
          return '换货中'
          break;
        case "93":
          return '已换货'
          break;
        case "94":
          return '回收中'
          break;
        case "95":
          return '已回收'
          break;
        case "100":
          return '店铺收货'
          break;
        case "101":
          return '仓库收货'
          break;
      }
    },
    // 商品属性
    getProductClass(data) {
      switch (data) {
        case '1':
          return '成品'
          break;
        case '2':
          return '旧料'
          break;
      
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu__item {
  .icon-create-company {
    margin-right: 4px;
    color: #999;
    float: left;
    margin-top: 1px;
    font-size: 15px;
  }

  &:hover {
    .icon-create-company {
      color: #2993f8;
    }
  }
}
.app-header {
  position: fixed;
  color: #2993f8;
  left: 0;
  top: 0;
  height: 64px;
  width: 100%;
  padding-left: 190px;
  background-color: #fff;
  border-bottom: 1px solid #edf0ef;
  z-index: 1002;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  display: flex;

  .logo {
    height: 59px;
    position: absolute;
    left: 20px;
    top: 5px;
    z-index: 10;

    .companyLogo {
      width: 35px;
      height: 35px;
      border-radius: 4px;
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      margin-top: 6px;
    }
    .company-name-now {
      display: inline-block;
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      font-weight: 600;
    }
    .change-company {
      display: inline-block;
      margin-right: 10px;
      width: 20px;
      height: 20px;
      font-weight: bold;
      color: #2993f8;
      cursor: pointer;
    }

    .icon-icon_qiehuangongsi {
      //color: #2993f8;
      cursor: pointer;
      font-size: 20px;
    }
  }

  .page-side {
    position: relative;
    z-index: 1;
    height: 64px;
    padding-right: 50px;
    display: flex;
    justify-content: flex-end;
    flex: 1;

    .button {
      margin-top: 16px;
      display: inline-block;
      float: right;

      .search {
        float: left;
        width: 320px;
        height: 32px;
        background: #f1f2f3;
        border-radius: 4px;
        position: relative;
        border: 1px solid #fff;
        input {
          width: 210px;
          height: 32px;
          font-size: 14px;
          font-weight: bold;
          padding: 4px 0 4px 0;
          background-color: transparent;
        }
        input::-webkit-input-placeholder {
          color: #d6d6d6;
          font-weight: bold;
        }
        input::placeholder,
        input::-moz-placeholder {
          color: #d6d6d6;
          font-weight: bold;
        }
        .drop-search {
          width: 75px;
          height: 32px;
          line-height: 32px;
          position: relative;
          &:after {
            content: "";
            background: #d6d6d6;
            width: 1px;
            height: 14px;
            position: absolute;
            right: 0;
            top: 9px;
          }
          .el-dropdown-link {
            display: inline-block;
            width: 75px;
            text-align: right;
            position: relative;
            padding-right: 22px;
            cursor: pointer;
            color: #2993f8;
            > .iconfont {
              color: #2993f8;
              font-size: 22px;
              position: absolute;
              right: 0;
              top: 2px;
            }
          }
        }
        .iconfont {
          position: absolute;
          right: 10px;
          top: 6px;
          font-size: 18px;
          color: #666;
          transition: all 0.3s;
          cursor: pointer;
          &:hover {
            color: #2993f8;
          }
        }
      }
      .search:hover {
        border: 1px solid #2993f8;
      }
      .search:focus {
        border: 1px solid #2993f8;
      }
      .info {
        float: left;
        min-width: 30px;
        height: 32px;
        margin-left: 24px;
        .item {
          display: block;
          margin-top: 3px;
          i {
            cursor: pointer;
            font-size: 23px;
            font-weight: bold;
            color: #333;
            &:hover {
              color: #2993f8;
            }
          }
        }
      }
      .msg {
        float: left;
        font-size: 24px;
        color: #686868;
        margin-left: 24px;
        .item {
          display: block;
          margin-top: 3px;
          i {
            cursor: pointer;
            font-size: 23px;
            font-weight: bold;
            color: #333;
            &:hover {
              color: #2993f8;
            }
          }
        }
      }
    }

    .user-info {
      height: 100%;
      float: right;
      min-width: 230px;
      line-height: 64px;
      .userInfo_silder {
        min-width: 130px;
        height: 40px;
        line-height: 40px;
        float: right;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        margin: 12px 15px 0 12px;
        .el-dropdown-link {
          cursor: pointer;
          > i {
            font-size: 9px;
            color: #999;
          }
          &:hover {
            color: #2993f8;
            i {
              color: #2993f8;
            }
          }
        }
      }
      .img {
        width: 40px;
        height: 40px;
        float: right;
        margin: 10px 0;
        border-radius: 50%;
        cursor: pointer;
      }
      img {
        width: 40px;
        height: 40px;
        float: right;
        margin: 10px 0;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
  .switch-skin {
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    color: #737373;
    padding: 2px 4px;
    //line-height: 20px;
    border-radius: 10px;
    border: 1px solid #d6d6d6;
    font-weight: normal;
    cursor: pointer;
    position: absolute;
    z-index: 5;
    top: 20px;
    right: 40px;
    ul {
      opacity: 0;
      visibility: hidden;
      position: absolute;
      width: 160px;
      height: 150px;
      background: #fff;
      transition: all 0.3s ease;
      left: -55px;
      top: 42px;
      border-radius: 4px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      li {
        width: 100%;
        height: 50px;
        padding-top: 8px;
        padding-left: 5px;
        img {
          width: 60px;
          height: 34px;
          float: left;
          margin-right: 27px;
          border-radius: 4px;
        }
        span {
          float: left;
          display: block;
          font-size: 14px;
          color: #333;
          line-height: 34px;
        }
      }
      li:hover {
        background: #f6f7f8;
        span {
          color: #2993f8;
        }
      }
      li.active {
        span {
          color: #2993f8;
        }
      }
    }
  }
  .switch-skin:hover {
    color: #2993f8;
    ul {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>

<style lang="scss">
.item {
  .is-fixed {
    top: 4px;
    right: 18px;
    line-height: 15px;
  }
}

.header-layout {
  max-height: 300px;
  //overflow: auto;
}
.menuTabs {
  flex: 1;
  padding: 0 40px;
  position: relative;
}
</style>

<style lang="scss" scoped>
.searchList {
  position: absolute;
  top: 32px;
  left: 0;

  width: 420px;
  // height: 500px;
  padding: 20px;

  border: 1px solid #d6d6d6;
  border-radius: 4px;
  background: #fff;

  .commodity,
  .receipts,
  .members {
    & > h1 {
      width: 100%;
      height: 24px;
      padding-bottom: 10px;

      font-size: 14px;
      font-weight: bold;
      color: #666;

      border-bottom: 1px solid #eee;
    }
    .commodityList,
    .receiptsList,
    .membersList {
      width: 100%;
      margin-bottom: 20px;
      .commodityItem,
      .receiptsItem,
      .membersItem {
        width: 100%;
        height: 42px;

        font-size: 14px;
        color: #999;
        line-height: 42px;

        span {
          color: #2993f8;
          cursor: pointer;
        }
        .gno {
          color: #333;
        }
        .state {
          display: inline-block;

          width: 40px;
          height: 20px;
          margin: 0 10px;

          font-size: 12px;
          color: #999;
          text-align: center;
          line-height: 20px;

          background: #eee;
          border-radius: 4px;
        }
        .gnn {
          margin: 0 10px;
          color: #333;
        }
        .slocation {
          color: #999;
        }
        .more {
          margin: 0 10px;

          font-size: 14px;
          color: #333;
        }
        .more_num {
          color: #999;
        }
      }
    }
  }

  .receipts {
  }
  .members {
    .membersList {
      margin-bottom: 0;
    }
  }
}
</style>

<style lang="scss">
.serachList.ruleOption .el-dialog__header .el-dialog__headerbtn {
  margin-top: 16px;
  margin-right: 16px;
}
.serachList .el-dialog__body {
  padding-top: 50px;
  padding-left: 0;
  padding-right: 0;
  .tab-list {
    position: absolute;
    top: 10px;
    left: 20px;
  }
}
.serachList .el-dialog__body .page-wrap {
  height: auto;
  overflow-y: visible;
}
</style>
 
<style lang="scss">
@import "~assets/css/_fontManage.scss";

.ruleOption.detailsBounced {
  .el-dialog__header {
    padding-left: 10px;
    line-height: 40px;
    .el-dialog__title {
      color: #2993f8;
    }
  }
  .el-dialog__body {
    padding: 0;
    padding-top: 40px;
  }
  .detailsInfo {
    display: flex;
    .detailsInfo_left {
      width: 1010px;
      .main-body {
            width: 1010px;
            height: 700px;
            // margin: 0 auto;
            overflow-y: auto;
            .title-tab {
                height: 32px;
                position: relative;
                &>li {
                    width: 83px;
                    height: 32px;
                    float: left;
                    cursor: pointer;
                    @include F(12, #2993f8);
                    line-height: 32px;
                    font-weight: bold;
                    position: relative;
                    transition: all ease .3s;
                    background: url("../../static/img/tab-default.png") no-repeat left center;
                    div {
                        width: 70px;
                        text-align: center;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 5;
                    }
                }
                .slide {
                    width: 83px;
                    height: 32px;
                    background: url("../../static/img/tab-select.png") no-repeat left center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index:5;
                    transition: left ease .3s;
                }
                &>li.active {
                    color:#fff;
                    background: transparent;
                }
            }
            .item-blobk {
                &>li {
                    min-height: 52px;
                    background:#f9f9f9;
                    transition: all ease .3s;
                    margin-bottom: 10px;
                    padding-top: 6px;
                    .main-name {
                        width: 100px;
                        float: left;
                        // display: inline-block;
                        height: 100%;

                        min-height: 52px;
                        .name-wrap {
                            height: 16px;
                            width: 100%;
                            padding-left: 20px;
                            .line {
                                height: 100%;
                                width: 4px;
                                background:#d6d6d6;
                                border-radius:2px;
                                float: left;
                                line-height: 16px;
                                margin-right: 6px;
                            }
                            .name {
                               float: left;
                               @include F(14, #666666);
                               line-height: 16px;
                            }
                        }

                    }
                    .main-item-list {
                        float: left;
                        width: 900px;
                       // display: inline-block;
                        .main-item {
                            height: 40px;
                            width: 136px;
                            float: left;
                            //display: inline-block;
                            margin-bottom: 6px;
                            .title {
                                @include F(12, #999);
                                margin-bottom: 6px;
                            }
                            .value {
                                @include F(12, #333);
                                span {
                                    margin-left: 3px;
                                    @include F(10, #b4b4b4);
                                }
                            }
                        }
                    }
                    .clear {
                        clear: both;
                    }
                }
                &>li:first-child {
                   .main-name {
                       .name-wrap {
                           .line {
                               background:#d6d6d6;
                           }
                           .name {
                               color:#666666;
                           }
                       }
                   }
                }
                &>li:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
    .detailsInfo_right {
      flex: 1;
      height: 700px;
      margin-left: 8px;
      .right_top {
        width: 140px;
        // height: 106px;
        padding: 18px 14px;

        background: #f1f8ff;
        border-radius: 4px;
        &> div {
          height: 23px;
          &> p {
            float: left;
            width: 80%;
          }
        }
        .icon-dian {
          width: 16px;
          height: 16px;
          line-height: 18px;
          color: #ffbf42;
        }
      }
      // 时间轴
      .right_bottom {
        position: relative;
        height: 100%;
        margin-top: 30px;
      }
    }
  }


}
</style>
