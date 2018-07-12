<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">销售统计</h1>
      <div class="head-option">
        <div class="left">{{headerData.companyName}}</div>
		    <div class="tableType">分类：{{title}}</div>
        <div class="right">时间 {{headerData.startTime}} 至 {{headerData.endTime}}</div>
      </div>
      <!-- <div class="explain-box">
        <div>
          店铺名称：{{headerData.shop}}
        </div>
        <div v-if="headerData.preparedBy">
          制单人：{{headerData.preparedBy}}
        </div>
        <div v-if="headerData.salesperson">
          销售员：{{headerData.salesperson}}
        </div>
        <div v-if="headerData.payee">
          收银人：{{headerData.payee}}
        </div>
      </div> -->
      <filtrateBox :headerData="headerData" title="销售"></filtrateBox>
    </div>
    <div v-show="types.indexOf('销售')>=0">
      <table class="table-box">
        <tr>
          <td :colspan="numLength" class="center font-bold" style="border-top: 0px;">销售报表</td>
        </tr>
        <tr class="tm">
          <td>序号</td>
          <td>产品类别</td>
          <td>首饰名称</td>
          <td>条码号</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>售价(元)</td>
          <td>工费总额(元)</td>
          <td>实售价(元)</td>
          <td v-if="tabSwitch">成本(元)</td>
          <td v-if="tabSwitch">毛利(元)</td>
        </tr>
        <tr class="tr" v-for="(item,index) in sellList.detailList" :key="index">
          <td>{{index+1}}</td>
          <td class="tl">{{item.productTypeName}}</td>
          <td class="tl">{{item.jewelryName}}</td>
          <td class="tl">{{item.barcode}}</td>
          <td>{{item.weight}}</td>
          <td>{{item.goldWeight}}</td>
          <td>{{item.price}}</td>
          <td>{{item.wage}}</td>
          <td>{{item.realPrice}}</td>
          <td v-if="tabSwitch">{{item.cost}}</td>
          <td v-if="tabSwitch">{{item.margin}}</td>
        </tr>
        <tr class="tr">
          <td class="tm" colspan="2">合计</td>
          <td>{{sellList.totalNum}}</td>
          <td class="tm">-</td>
          <td>{{sellList.totalWeight}}</td>
          <td>{{sellList.totalGoldWeight}}</td>
          <td>{{sellList.totalPrice}}</td>
          <td>{{sellList.totalWage}}</td>
          <td>{{sellList.totalRealPrice}}</td>
          <td v-if="tabSwitch">{{sellList.totalCost}}</td>
          <td v-if="tabSwitch">{{sellList.totalMargin}}</td>
        </tr>
      </table>
    </div>
    <div v-show="types.indexOf('回购')>=0">
      <table class="table-box">
        <tr>
          <td colspan="11" class="center font-bold" style="border-top: 0px;">回购报表</td>
        </tr>
        <tr class="tm">
          <td>序号</td>
          <td>回购类型</td>
          <td>产品类别</td>
          <td>首饰名称</td>
          <td>条码号</td>
          <td>件重(g)</td>
          <td>回购金价(元/g)</td>
          <td>旧料价(元)</td>
          <td>折旧(%)</td>
          <td>工费总额(元)</td>
          <td>回购价(元)</td>
        </tr>
        <tr class="tr" v-for="(item,index) in buyBackList.detailList" :key="index">
          <td>{{index+1}}</td>
          <td class="tm">{{item.sellTypeName}}</td>
          <td class="tl">{{item.productTypeName}}</td>
          <td class="tl">{{item.jewelryName}}</td>
          <td>{{item.barcode}}</td>
          <td>{{item.weight}}</td>
          <td>{{item.goldPrice}}</td>
          <td>{{item.estimatePrice}}</td>
          <td>{{item.depreciationDiscount}}</td>
          <td>{{item.wage}}</td>
          <td>{{item.buy}}</td>
        </tr>
        <tr class="tr">
          <td class="tm" colspan="3">合计</td>
          <td class="tl">{{buyBackList.totalNum}}</td>
          <td class="tm">-</td>
          <td>{{buyBackList.totalWeight}}</td>
          <td class="tm">-</td>
          <td>{{buyBackList.totalestimatePrice}}</td>
          <td class="tm">-</td>
          <td>{{buyBackList.totalWage}}</td>
          <td>{{buyBackList.totalActualPrice}}</td>
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
      buyBackList: {
        type: Object
      },
      headerData: {
        type: Object
      },
      title: {
        type: String
      },
      types: {
        type: Array
      },
      isBuyBack: {
        type: Boolean
      },
      tabSwitch: {
        type: Boolean
      }
    },
    data() {
      return {
        printDate: "",
      }
    },
	created() {},
    mounted() {
      this.printDate = moment().format("YYYY-MM-DD HH:mm");
    },
    computed: {
      numLength() {
        return 11 - (this.isBuyBack ? 2 : 0)
      }
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
