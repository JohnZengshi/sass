<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">销售统计</h1>
      <div class="head-option">
        <div class="left">{{headerData.companyName}}</div>
		    <div>分类：{{title}}</div>
        <div class="right">时间 {{headerData.startTime}} 至 {{headerData.endTime}}</div>
      </div>
      
      <!-- <div class="explain-box">
        <div class="shopName">
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
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>售价(元/g)</td>
          <td>工费总额(元)</td>
          <td>实售价(元)</td>
          <td v-if="isBuyBack">购买额(元)</td>
          <td v-if="isBuyBack">实收(元)</td>
          <td v-if="tabSwitch">成本(元)</td>
          <td v-if="tabSwitch">毛利(元)</td>
        </tr>
        <template v-for="productTypeList in sellList.productTypeList">
          <template v-for="productSellTypeList in productTypeList.productSellTypeList">
            <tr class="tr" v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
              <td>{{index+1}}</td>
              <td class="tl">{{item.className}}</td>
              <td>{{item.totalNum|NOUNIT}}</td>
              <td>{{item.totalWeight|NOUNIT}}</td>
              <td>{{item.totalGoldWeight|NOUNIT}}</td>
              <td>{{item.totalSoldPrice}}</td>
              <td>{{item.totalWage|NOUNIT}}</td>
              <td>{{item.totalRealPrice|NOUNIT}}</td>
              <td v-if="isBuyBack">{{item.totalBuy|NOUNIT}}</td>
              <td v-if="isBuyBack">{{item.totalActualPrice}}</td>
              <td v-if="tabSwitch">{{item.totalCost|NOUNIT}}</td>
              <td v-if="tabSwitch">{{item.margin}}</td>
            </tr>
          </template>
          <tr class="tr">
            <td class="tm" colspan="2">合计</td>
            <td>{{productTypeList.totalNum}}</td>
            <td>{{productTypeList.totalWeight}}</td>
            <td>{{productTypeList.totalGoldWeight}}</td>
            <td>{{productTypeList.totalSoldPrice}}</td>
            <td>{{productTypeList.totalWage}}</td>
            <td>{{productTypeList.totalRealPrice}}</td>
            <td v-if="isBuyBack">{{productTypeList.totalBuy}}</td>
            <td v-if="isBuyBack">{{productTypeList.totalActualPrice}}</td>
            <td v-if="tabSwitch">{{productTypeList.totalCost}}</td>
            <td v-if="tabSwitch">{{productTypeList.margin}}</td>
          </tr>
        </template>
      </table>
    </div>
    <div v-show="types.indexOf('回购')>=0">
      <table class="table-box">
        <tr>
          <td colspan="10" class="center font-bold" style="border-top: 0px;">回购报表</td>
        </tr>
        <tr class="tm">
          <td>序号</td>
          <td>回购类型</td>
          <td>产品类别</td>
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>回购金价(元/g)</td>
          <td>旧料价(元)</td>
          <td>折旧(%)</td>
          <td>工费总额(元)</td>
          <td>回购价(元)</td>
        </tr>
        <template v-for="productTypeList in buyBackList.productTypeList">
          <template v-for="productSellTypeList in productTypeList.productSellTypeList">
            <tr class="tr" v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
              <td>{{index+1}}</td>
              <td class="tm" v-if="index==0" :rowspan="productSellTypeList.productTypeList.length">
                {{productSellTypeList.sellTypeName}}
              </td>
              <td class="tl">{{item.className}}</td>
              <td>{{item.totalNum}}</td>
              <td>{{item.totalWeight}}</td>
              <td>{{item.totalGoldPrice}}</td>
              <td>{{item.estimatePrice}}</td>
              <td>{{item.totaldepreciationDiscount}}</td>
              <td>{{item.totalWage}}</td>
              <td>{{item.totalActualPrice}}</td>
            </tr>
            <tr class="tr">
              <td class="tm" colspan="3">小计</td>
              <td>{{productSellTypeList.totalNum}}</td>
              <td>{{productSellTypeList.totalWeight}}</td>
              <td class="tm">-</td>
              <td>{{productSellTypeList.estimatePrice}}</td>
              <td class="tm">-</td>
              <td>{{productSellTypeList.totalWage}}</td>
              <td>{{productSellTypeList.totalActualPrice}}</td>
            </tr>
          </template>
          <tr class="tr">
            <td class="tm" colspan="3">合计</td>
            <td>{{productTypeList.totalNum}}</td>
            <td>{{productTypeList.totalWeight}}</td>
            <td class="tm">-</td>
            <td>{{productTypeList.totalestimatePrice}}</td>
            <td class="tm">-</td>
            <td>{{productTypeList.totalWage}}</td>
            <td>{{productTypeList.totalActualPrice}}</td>
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
      tabSwitch: {
        type: Boolean
      },
      isBuyBack: {
        type: Boolean
      },
    },
    computed: {
      numLength() {
        return 12 - ((this.isBuyBack ? 2 : 0) - (this.tabSwitch ? 2 : 0))
      }
    },
    filters: {
      GRAMUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return num;
          }
          return "0";
        } else {
          return "-";
        }
      },
      RMBUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return num;
          }
          return "0";
        } else {
          return "-";
        }
      },
      NOUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return num;
          }
          return 0;
        } else {
          return "-";
        }
      },
      SELL_TYPE: (key) => {
        let obj = new Map();
        obj.set("1", "退货");
        obj.set("2", "换货");
        obj.set("3", "回收");
        return obj.get(key);
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
      add(...numbers) {
        let r = 0;
        for (let a of numbers) {
          r = _.add(r, Number(a) || 0);
        }
        return r ? Number(r).toFixed(2) : 0;
      },
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
