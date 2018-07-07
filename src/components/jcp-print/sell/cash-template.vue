<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">收银统计</h1>
      <div class="head-option">
        <div class="left">{{printSelectDate.companyName}}</div>
        <div class="right">时间： {{printSelectDate.startTime}} 至 {{printSelectDate.endTime}}</div>
      </div>
      <!-- <div class="explain-box">
        店铺名称：{{printSelectDate.shop}}
      </div> -->
      <filtrateBox :headerData="printSelectDate" title="收银"></filtrateBox>
    </div>
    <div id="win">
      <table class="table-box">
        <tr class="tm">
          <!-- <td>序号</td> -->
          <td>销售类型</td>
          <td>回购类型</td>
          <td>产品类别</td>
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>标价/原售价 (元)</td>
          <td>工费总额(元)</td>
          <td>实售价/回购价(元)</td>
        </tr>
        <!-- 销售 -->
        <template v-if="sellStorage.totalNum > 0" v-for="(productTypeList,j) in sellStorage.productTypeList">
          <template v-for="(productSellTypeList,i) in productTypeList.productSellTypeList">
            <tr class="tr" v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
              <td class="tm" v-if="j == 0 && index == 0 && i == 0" :rowspan="sellLength(sellStorage.productTypeList)">销售</td>
              <td class="tm" v-if="index == 0 && productSellTypeList.classesType == '1'" :rowspan="productSellTypeList.productTypeList.length">计重</td>
              <td class="tm" v-else-if="index == 0 && productSellTypeList.classesType == '2'" :rowspan="productSellTypeList.productTypeList.length">计件</td>
              <!-- <td>{{index+1}}</td> -->
              <td class="tl">{{item.className}}</td>
              <td>{{item.totalNum}}</td>
              <td>{{item.totalWeight}}</td>
              <td>{{item.totalGoldWeight}}</td>
              <td>{{item.totalSoldPrice}}</td>
              <td>{{item.totalWage}}</td>
              <td>{{item.totalRealPrice}}</td>
            </tr>
            <tr class="tr">
              <td class="tm" colspan="2">小计</td>
              <td>{{productSellTypeList.totalNum}}</td>
              <td>{{productSellTypeList.totalWeight}}</td>
              <td>{{productSellTypeList.totalGoldWeight}}</td>
              <td>{{productSellTypeList.totalSoldPrice}}</td>
              <td>{{productSellTypeList.totalWage}}</td>
              <td>{{productSellTypeList.totalRealPrice}}</td>
            </tr>
          </template>
          <tr class="tr">
            <td class="tm" colspan="3">销售合计</td>
            <td>{{productTypeList.totalNum}}</td>
            <td>{{productTypeList.totalWeight}}</td>
            <td>{{productTypeList.totalGoldWeight}}</td>
            <td>{{productTypeList.totalSoldPrice}}</td>
            <td>{{productTypeList.totalWage}}</td>
            <td>{{productTypeList.totalRealPrice}}</td>
          </tr>
        </template>
        <!-- 回购 -->
        <template v-if="buyBackStorage.totalNum > 0" v-for="(productTypeList,j) in buyBackStorage.productTypeList">
          <template v-for="(productSellTypeList,i) in productTypeList.productSellTypeList">
            <tr class="tr" v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
              <td class="tm" v-if="j == 0 && index == 0 && i == 0" :rowspan="sellLength(buyBackStorage.productTypeList)">回购</td>
              <td class="tm" v-if="index == 0" :rowspan="productSellTypeList.productTypeList.length">{{productSellTypeList.sellTypeName}}</td>
              <td class="tl">{{item.className}}</td>
              <td>{{item.totalNum}}</td>
              <td>{{item.totalWeight}}</td>
              <td>{{item.totalGoldWeight}}</td>
              <td>{{item.totalSoldPrice}}</td>
              <td>{{item.totalWage}}</td>
              <td>{{item.totalActualPrice}}</td>
            </tr>
            <tr class="tr">
              <td class="tm" colspan="2">小计</td>
              <td>{{productSellTypeList.totalNum}}</td>
              <td>{{productSellTypeList.totalWeight}}</td>
              <td>{{productSellTypeList.totalGoldWeight}}</td>
              <td>{{productSellTypeList.totalSoldPrice}}</td>
              <td>{{productSellTypeList.totalWage}}</td>
              <td>{{productSellTypeList.totalActualPrice}}</td>
            </tr>
          </template>
          <tr class="tr">
            <td class="tm" colspan="3">回购合计</td>
            <td>{{productTypeList.totalNum}}</td>
            <td>{{productTypeList.totalWeight}}</td>
            <td>{{productTypeList.totalGoldWeight}}</td>
            <td>{{productTypeList.totalSoldPrice}}</td>
            <td>{{productTypeList.totalWage}}</td>
            <td>{{productTypeList.totalActualPrice}}</td>
          </tr>
        </template>
      </table>
      <table class="bottom-box">
        <tr class="tm">
          <td>刷卡(元)</td>
          <td>现金(元)</td>
          <td>微信(元)</td>
          <td>支付宝(元)</td>
          <td>其他(元)</td>
          <td>实际收银(元)</td>
        </tr>
        <tr class="tr">
          <td>{{cashierStatistics.slotCard || 0}}</td>
          <td>{{cashierStatistics.cash || 0}}</td>
          <td>{{cashierStatistics.weixin || 0}}</td>
          <td>{{cashierStatistics.zhifubao || 0}}</td>
          <td>{{cashierStatistics.other || 0}}</td>
          <td>{{cashierStatistics.totalMoney || 0}}</td>
        </tr>
      </table>
    </div>
    <div class="printDate">
			打印时间：{{printDate}}
		</div>
  </div>
</template>
<script>
  import moment from "moment";
  import {
    jcpPrint
  } from "@/tools/jcp-print";
  import filtrateBox from "../components/filtrateBox.vue"
  export default {
    components: {
      filtrateBox
    },
    props: {
      cashierStatistics: {
        type: Object
      },
      sellStorage: {
        type: Object
      },
      buyBackStorage: {
        type: Object
      },
      printSelectDate: {
        type: Object
      },
    },
    watch: {
      sellStorage: function () {
        this.computedTotalRealPrice();
      },
      buyBackStorage: function () {
        this.computedTotalBuy();
      },
    },
    data() {
      return {
        totalRealPrice: 0,
        totalBuy: 0,
        sellStorageLength: 6,
        buyBackStorageLength: 0,
        printDate:'',
      }
    },
    methods: {
      computedTotalRealPrice() {
        this.totalRealPrice = this.sellStorage.productTypeList[0].totalRealPrice;
      },
      computedTotalBuy() {
        this.totalBuy = this.buyBackStorage.productTypeList[0].totalBuy;
      },
      sellLength(val) {
        console.log(val)
        let length = 0;
        val.forEach((val, index) => {
          if (val.productSellTypeList) {
            val.productSellTypeList.forEach((val, index) => {
              length += (val.productTypeList.length + 1)
            })
          }
        })
        return length;
      },
      print() {
        let doc = {
          documents: document,
        };
        jcpPrint.printPreview(doc);
      }
    },
    mounted() {
			this.printDate = moment().format("YYYY-MM-DD HH:mm");
		},
  }

</script>

<style lang="scss" scoped>
  @import "../../../assets/css/print.scss";
  .print-box{
		width: 197mm;
  }
    .explain-box {
    width: 100%;
    border: 1px solid;
    border-top: none;
    border-bottom: none;
    padding: 10px 10px 10px 10px;
    box-sizing: border-box;
    div {
      display: inline-block;
      width: 33%;
      margin-bottom: 10px;
      &:nth-last-of-type(3),
      &:nth-last-of-type(2),
      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }
    }
  }
  .bottom-box {
    width: 100%;
    border-collapse: collapse;
  }
</style>
