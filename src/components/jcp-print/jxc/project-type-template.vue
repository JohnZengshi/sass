<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">{{title}}报表</h1>
      <div class="head-option">
        <div class="left">{{headerData.companyName}}</div>
        <div class="left">分类：{{tabTitle}}</div>
        <div class="right">时间 {{headerData.startTime}} 至 {{headerData.endTime}}</div>
      </div>
      <!-- <div class="explain-box">
        店铺名称：{{headerData.shop}}
      </div>
      <div>
        <div class="explain-box" v-show="headerData.preparedBy">
          制单人：{{headerData.preparedBy}}
        </div>
        <div class="explain-box" v-show="headerData.salesperson">
          销售员：{{headerData.salesperson}}
        </div>
        <div class="explain-box" v-show="headerData.payee">
          收银人：{{headerData.payee}}
        </div>
      </div> -->
      <filtrateBox :headerData="headerData" :title="title"></filtrateBox>
    </div>
    <div>
      <table class="table-box">
        <tr class="tm noBorderTop">
          <td>模块</td>
          <!-- <td>序号</td> -->
          <td>产品类别</td>
          <!-- <td>首饰名称</td> -->
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>售价(元)</td>
          <td v-show="tabSwitch">成本(元)</td>
        </tr>
        <template v-if="dataList.productTypeList.length" v-for="(dataList, ind) in sellList.dataList">
          <tr class="tm">
            <td :rowspan="dataList.productTypeList.length+1">{{dataList.typeName}}</td>
          </tr>
          <tr class="tr" v-for="(item, index) in dataList.productTypeList">
            <!-- <td>{{index + 1}}</td> -->
            <!-- <td v-if="index==0" :rowspan="productTypeList.detailList.length">{{productTypeList.className}}</td> -->
            <td class="tl">{{item.className}}</td>
            <td>{{item.totalNum1}}</td>
            <td>{{item.totalWeight1}}</td>
            <td>{{item.totalGoldWeight1}}</td>
            <td>{{item.totalPrice1}}</td>
            <td v-show="tabSwitch">{{item.totalCost1}}</td>
          </tr>
          <tr class="tr">
              <td class="tm" colspan="2">{{dataList.typeName}}合计</td>
              <td>{{dataList.totalNum0}}</td>
              <td>{{dataList.totalWeight0}}</td>
              <td>{{dataList.totalGoldWeight0}}</td>
              <td>{{dataList.totalPrice0}}</td>
              <td v-show="tabSwitch">{{dataList.totalCost0}}</td>
            </tr>
        </template>
      </table>
    </div>
    <div class="printDate">
      打印时间：{{printDate}}
    </div>
  </div>
</template>











<script>
  import {
    jcpPrint
  } from "@/tools/jcp-print";
  import moment from "moment";
  import filtrateBox from "../components/filtrateBox.vue"
  export default {
    components: {
      filtrateBox
    },
    props: {
      sellList: {
        type: Object
      },
      title: {
        type: String
      },
      headerData: {
        type: Object
      },
      //1代表入库、2退库、3调库、4发货、5调柜、6退货
      reportType: {
        type: Number
      },
      tabSwitch: {
        type: Boolean
      },
      tabTitle:{
		    type:String
	    }
    },
    filters: {
      DATA_FORMAT: (date) => {
        if (date) {
          return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm");
        }
      }
    },
    data() {
      return {
        printDate: ""
      }
    },
    mounted() {
      this.printDate = moment().format("YYYY-MM-DD HH:mm");
    },
    methods: {
      print() {
        let doc = {
          documents: document,
        };
        jcpPrint.printPreview(doc);
      },
    }
  }

</script>

<style scoped lang="scss">
  @import "../../../assets/css/print.scss";
  .print-box {
    width: 208mm;
  }

</style>
