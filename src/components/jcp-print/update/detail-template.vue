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
          <td>序号</td>
          <td>条码号</td>
          <td>首饰名称</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>主石(ct,g)</td>
          <td>副石(ct,g)</td>
          <td>售价(元)</td>
          <td v-if="tabSwitch">成本(元)</td>
        </tr>
        <template v-for="(item,index) in sellList.detailList">
          <tr class="tr">
            <td rowspan="2">{{index+1}}</td>
            <td class="tl" rowspan="1">{{item.barcode}}</td>
            <td class="tl">{{item.jewelryName}}</td>
            <td>{{item.weight}}</td>
            <td>{{item.goldWeight}}</td>
            <td>{{item.main}}</td>
            <td>{{item.deputy}}</td>
            <td>{{item.price}}</td>
            <td v-if="tabSwitch">{{item.cost}}</td>
          </tr>
          <tr class="tr">
            <td class="tl">修改前</td>
            <td></td>
            <td>{{item.afWeight}}</td>
            <td>{{item.afGoldWeight}}</td>
            <td>{{item.afMain}}</td>
            <td>{{item.afDeputy}}</td>
            <td>{{item.afPrice}}</td>
            <td v-if="tabSwitch">{{item.afCost}}</td>
          </tr>
        </template>
        <tr class="tr">
          <td class="tm" colspan="1" rowspan="2">合计</td>
          <td class="tl">修改前</td>
          <td class="tl" rowspan="2">{{sellList.detailList.length}}</td>
          <!-- <td>{{sellList.afTotalNum}}</td> -->
          <td>{{sellList.afTotalWeight}}</td>
          <td>{{sellList.afTotalGoldWeight}}</td>
          <td>{{sellList.afTotalMain}}</td>
          <td>{{sellList.afTotalDeputy}}</td>
          <td>{{sellList.afTotalPrice}}</td>
          <td v-if="tabSwitch">{{sellList.afTotalCost}}</td>
        </tr>
        <tr class="tr">
          <td class="tl">修改后</td>
          <td>{{sellList.totalWeight}}</td>
          <td>{{sellList.totalGoldWeight}}</td>
          <td>{{sellList.totalMain}}</td>
          <td>{{sellList.totalDeputy}}</td>
          <td>{{sellList.totalPrice}}</td>
          <td v-if="tabSwitch">{{sellList.totalCost}}</td>
        </tr>
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
      tabSwitch:{
        type: Boolean
      },
      tabTitle:{
        type: String
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
