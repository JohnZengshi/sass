<template>
    <div class="tab_detail_table">
        <!--表头 start-->
        <data-grid-header :newList="newList" :tabSwitch="tabSwitch" @sortList="sortList" :reportType="reportType" :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
        <template>
          <!--表格内容区  -->
          <data-grid-body :printNum="printNum" :tabSwitch="tabSwitch" :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType="reportType" :positionSwitch="positionSwitch" @scrollClass="scrollClass" @lazyloadSend="lazyloadSend" @tabCell="tabCell" @openDialog="openDialog">
          </data-grid-body>
          <!--表尾  -->
          <data-grid-footer  :tabSwitch="tabSwitch" :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="allData" :reportType="reportType" :configData="configData" @tabCell="tabCell">
          </data-grid-footer>
        </template>

        <!-- 详情弹框 -->
        <el-dialog :title="productTypeName" top="0" :modal="false" :modal-append-to-body="false" :visible.sync="ListDetails" customClass="ruleOption detailsBounced">
          <i class="iconfont icon-shangpin"></i>          
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

        <!-- 会员弹窗 -->
        <!-- <member-info
          @closeReturn="closeEditReturn" 
          :memberId="memberId"
          :shopId="shopId"
          :memberInfoFlag="editLeaguer">
        </member-info> -->
    </div>
</template>
<script>
import DataGridHeader from "./dataGridHeader";
import DataGridBody from "./dataGridBody";
import DataEditBody from "./editBody";
import DataGridFooter from "./dataGridFooter";
import DataEditFooter from "./editFooter";
import stepsPath from './stepsPath'
let configData = require("./config/dataGridConfig");

import { homepageSearch, productLogRecord,productStatusInfo } from 'Api/search'
import { seekCommodityDetails } from "Api/commonality/seek"

// 导入会员的弹窗
import memberInfo from '../../Leaguer/components/memberInfo'

export default {
  data() {
    return {
      tempDatagrid: [],
      detailDataGridColumn: [],
      configData: configData,
      ListDetails: false,

      lastTitleName: "",
      tabIndex: 0,
      sortDataList: [], // 排序数组

      tabList: [
        {
          label: "基本信息"
        },
        {
          label: "重量"
        },
        {
          label: "证书"
        },
        {
          label: "主石"
        },
        {
          label: "副石"
        },
        {
          label: "工费"
        },
        {
          label: "配件"
        },
        {
          label: "其他费用"
        },
        {
          label: "标价"
        },
        {
          label: "备注"
        }
      ],
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

      statusREfresh: false,
      orderNum:'',

      productTypeName: '', // 头部名
      productId: '',

      orderListST:[], // 数据列表
      
      productType: '',
      locationName: '',
      productClass: '',

      memberId:'',
      shopId:'',
      editLeaguer:false

    };
  },
  components: {
    DataGridFooter,
    DataGridBody,
    DataEditBody,
    DataGridHeader,
    DataEditFooter,
    stepsPath,
    memberInfo
  },
  watch: {
    reportType: function() {
      this.tableSwitch();
    },
    //开关 成本列
    tabSwitch: function() {
      this.tableSwitch();
    }
  },
  created() {
    this.setColumn()
    // this.commodityDetails()
  },
  props: [
    "dataGridStorage",
    "reportType",
    "tabSwitch",
    "isOld",
    "positionSwitch",
    "newList",
    "type",
    "printNum",
    "allData",
    "panelType"
  ],
  methods: {
    closeEditReturn (val) {
      this.editLeaguer = val.status
      // this.memberAllList()
      // this.memberTotalNum()
    },
    sortList(val) {
      this.$emit("sortListAct", val);
    },
    lazyloadSend(val) {
      this.$emit("lazyloadSend", val);
    },
    tableSwitch() {
      let temp = [];
      // this.setConfig()
      this.configType();
      this.ObjectAssign();
      if (!this.tabSwitch) {
        //console.log(11111)
        if (!this.positionSwitch) {
          this.tempDatagrid.forEach(item => {
            let tempwidth,
              _item = Object.assign({}, item);
            if (
              _item.width &&
              _item.text != "成本" &&
              _item.width &&
              _item.text != "位置名称"
            ) {
              tempwidth = parseInt(_item.width);
              _item.width = tempwidth + 26;
              temp.push(_item);
            }
          });
          //console.log(temp)
        } else {
          this.tempDatagrid.forEach(item => {
            let tempwidth,
              _item = Object.assign({}, item);
            if (_item.width && _item.text != "成本") {
              tempwidth = parseInt(_item.width);
              _item.width = tempwidth + 13;
              temp.push(_item);
            }
          });
          //console.log(temp)
        }
      } else {
        if (!this.positionSwitch) {
          this.tempDatagrid.forEach(item => {
            let tempwidth,
              _item = Object.assign({}, item);
            if (_item.width && _item.text != "位置名称") {
              tempwidth = parseInt(_item.width);
              _item.width = tempwidth + 13;
              temp.push(_item);
            }
          });
        } else {
          temp = this.tempDatagrid;
        }
      }
      this.detailDataGridColumn = temp;
    },
    ObjectAssign() {
      this.tempDatagrid = [];
      this.detailDataGridColumn.forEach(item => {
        let tempItem = Object.assign({}, item);
        this.tempDatagrid.push(tempItem);
      });
    },
    //单元格宽度
    tabCell(result) {
      if (result.width) {
        let w = "width:" + result.width + "px";
        result.res && result.res.call(this, w);
      }
    },
    configType() {
      this.setColumn();
    },
    scrollClass(type) {
      this.$emit("scrollClass", type);
    },
    setColumn(data) {
      console.log(this.panelType);
      switch (this.panelType) {
        case 0:
          this.detailDataGridColumn = this.configData.detailConfing;
          break;
        case 1:
          this.detailDataGridColumn = this.configData.documentConfig;
          break;
        case 2:
          this.detailDataGridColumn = this.configData.memberConfig;
          break;
        default:
          break;
      }
    },
    openDialog(parm) {
      if(this.panelType == 1) {
        console.log(parm)
        this.$emit('close')
        // 入库详情页
        if(parm.indexOf('RK') !== -1) {
          this.$router.push({path:'/work/storage/detail',query:{ orderNumber: parm }})
        }
        // 修改详情页
        if(parm.indexOf('XG') !== -1) {
          this.$router.push({path:'/work/amend/index',query:{ orderNumber: parm }})
        }
        // 退库详情页
        if(parm.indexOf('TK') !== -1) {
          this.$router.push({path:'/work/storageReturn/NewStorageReturn',query:{ orderNumber: parm }})
        }
        // 调库详情页
        if(parm.indexOf('DK') !== -1) {
          this.$router.push({path:'/work/transferStorage/newTransferStorage',query:{ orderNumber: parm }})
        }
        // 发货详情页
        if(parm.indexOf('FH') !== -1) {
          this.$router.push({path:'/work/sipping/newSipping',query:{ orderNumber: parm }})
        }
        // 调柜详情页
        if(parm.indexOf('DG') !== -1) {
          this.$router.push({path:'/work/transferCabinet/newTransferCabinet',query:{ orderNumber: parm }})
        }
        // 退货详情页
        if(parm.indexOf('TH') !== -1) {
          this.$router.push({path:'/work/salesReturn/newSalesReturn',query:{ orderNumber: parm }})
        }
        // 销售详情页
        if(parm.indexOf('XS') !== -1) {
          this.$router.push({path:'/work/sell/sellReceiptsList',query:{ orderNumber: parm }})
        } 
          // this.$router.push({path:'/work/sell'})
          // this.$router.push({path:'/work/sell/sellReceiptsList?orderNumber='+parm})
        return
        }

      if(this.panelType == 2) {
        this.$emit('openMemberByList',parm)
        // this.$emit('close')
        return
      }

      this.commodityDetails(parm)
      this.ListDetails = true;
    },
    goBack() {
      window.history.back(-1);
    },
    // tabSwitch(item, index, el) {
    //   this.tabIndex = index;
    //   this.$refs.slide.style.left = index * 83 + "px";
    // },
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
  },
  mounted() {
    this.$nextTick(() => {
      this.tableSwitch();
    });
  }
};
</script>
<style lang="scss" scoped>
.tab_detail_table {
  background-color: #fff;
}
</style>


<style lang="scss">
@import "~assets/css/_fontManage.scss";

.ruleOption.detailsBounced {
  
  .el-dialog__header {
    padding-left: 44px;
    line-height: 68px;
    .el-dialog__title {
      color: #2993f8;
    }
  }
  .el-dialog__body {
    padding: 0;
    padding-top: 68px;
    &>i {
      position: absolute;
      top: 25px;
      left: 20px;
      color: #2993f8;
    }
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
                    background: url("../../../../static/img/tab-default.png") no-repeat left center;
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
                    background: url("../../../../static/img/tab-select.png") no-repeat left center;
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
                        padding-top: 10px;

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
                               font-weight: bold;
                               line-height: 16px;
                            }
                        }

                    }
                    .main-item-list {
                        float: left;
                        width: 900px;
                        padding-top: 10px;
                       // display: inline-block;
                        .main-item {
                            height: 40px;
                            width: 140px;
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
          margin-bottom: 5px;
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
