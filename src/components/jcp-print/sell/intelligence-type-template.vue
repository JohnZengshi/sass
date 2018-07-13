<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">销售统计</h1>
      <div class="head-option">
        <div class="left">公司名称：{{headerData.companyName}}</div>
        <div class="left">分类：{{title}}</div>
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
    <div id="win">
      <div v-show="types.indexOf('销售')>=0">
        <table class="table-box" header-rows="2">
          <tr>
            <td :colspan="numLength" class="center font-bold" style="border-top: 0px;">销售报表</td>
          </tr>
          <tr class="tm">
            <td>产品类别</td>
            <td>首饰名称</td>
            <td>件数(件)</td>
            <td>件重(g)</td>
            <td>金重(g)</td>
            <td>售价(元)</td>
            <td>工费总额(元)</td>
            <td>实售价(元)</td>
            <td v-if="isBuyBack">购买额(元)</td>
            <td v-if="isBuyBack">实收(元)</td>
            <td v-if="tabSwitch">成本(元)</td>
            <td v-if="tabSwitch">毛利(元)</td>
          </tr>
          <template v-for="productTypeList in sellList.productTypeList">
            <template v-for="productSellTypeList in productTypeList.productSellTypeList">
              <template v-for="(productType, rowNum) in productSellTypeList.productTypeList">
                <tr class="tr" v-for="(item,index) in productType.detailList">
                  <td class="tl" v-if="index==0" :rowspan="productType.detailList.length">{{productType.className}}</td>
                  <td class="tl">{{item.className}}</td>
                  <td>{{item.num}}</td>
                  <td>{{item.weight}}</td>
                  <td>{{item.goldWeight}}</td>
                  <td>{{item.soldPrice}}</td>
                  <td>{{item.wage}}</td>
                  <td>{{item.realPrice}}</td>
                  <td v-if="isBuyBack">{{item.buy}}</td>
                  <td v-if="isBuyBack">{{item.actualPrice}}</td>
                  <td v-if="tabSwitch">{{item.cost}}</td>
                  <td v-if="tabSwitch">{{item.margin}}</td>
                </tr>
                <tr class="tr">
                  <td class="tm" colspan="2">小计</td>
                  <td>{{productType.totalNum}}</td>
                  <td>{{productType.totalWeight}}</td>
                  <td>{{productType.totalGoldWeight}}</td>
                  <td>{{productType.totalSoldPrice}}</td>
                  <td>{{productType.totalWage}}</td>
                  <td>{{productType.totalRealPrice}}</td>
                  <td v-if="isBuyBack">{{productType.totalBuy}}</td>
                  <td v-if="isBuyBack">{{productType.totalActualPrice}}</td>
                  <td v-if="tabSwitch">{{productType.totalCost}}</td>
                  <td v-if="tabSwitch">{{productType.margin}}</td>
                </tr>
              </template>
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

      <div style="width: 100%;" v-show="types.indexOf('回购')>=0">
        <table class="table-box" header-rows="2">
          <tr>
            <td colspan="10" class="center font-bold" style="border-top: 0px;">回购报表</td>
          </tr>
          <tr class="tm">
            <td>回购类型</td>
            <td>产品类别</td>
            <td>首饰名称</td>
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
              <template v-for="(productType, rowNum) in productSellTypeList.productTypeList">
                <tr class="tr" v-for="(item,index) in productType.detailList">
                  <td class="tm" v-if="rowNum==0 && index==0" :rowspan="(productSellTypeList.rows)+(productSellTypeList.productTypeList.length)">
                    {{productSellTypeList.sellTypeName}}
                  </td>
                  <td class="tl" v-if="index==0" :rowspan="productType.detailList.length">
                    {{productType.className}}
                  </td>
                  <td class="tl">{{item.className}}</td>
                  <td>{{item.num}}</td>
                  <td>{{item.weight}}</td>
                  <td>{{item.goldPrice}}</td>
                  <td>{{item.estimatePrice}}</td>
                  <td>{{item.depreciationDiscount}}</td>
                  <td>{{item.wage}}</td>
                  <td>{{item.actualPrice}}</td>
                </tr>
                <tr class="tr">
                  <td class="tm" colspan="2">小计</td>
                  <td>{{productType.totalNum}}</td>
                  <td>{{productType.totalWeight}}</td>
                  <td>{{productType.totalGoldPrice}}</td>
                  <td>{{productType.estimatePrice}}</td>
                  <td>{{productType.totaldepreciationDiscount}}</td>
                  <td>{{productType.totalWage}}</td>
                  <td>{{productType.totalActualPrice}}</td>
                </tr>
              </template>
              <tr class="tr">
                <td class="tm" colspan="3">{{productSellTypeList.sellTypeName}}小计</td>
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
      types: {
        type: Array
      },
      title: {
        type: String
      },
      tabSwitch: {
        type: Boolean
      },
      isBuyBack: {
        type: Boolean
      },
    },
    filters: {
      GRAMUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return Number(num).toFixed(2) + "g";
          }
          return "0g";
        } else {
          return "-";
        }
      },
      RMBUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return Number(num).toFixed(3) + "元";
          }
          return "0元";
        } else {
          return "-";
        }
      },
      NOUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return Number(num).toFixed(3);
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
    watch: {
      sellList: function (n, o) {
        this.transition(n);
      },
      buyBackList: function (n, o) {
        this.transition(n);
      },
    },
    data() {
      return {
        printDate: ""
      }
    },
    computed: {
      numLength() {
        return 12 - ((this.isBuyBack ? 2 : 0) - (this.tabSwitch ? 2 : 0))
      }
    },
    mounted() {
      this.printDate = moment().format("YYYY-MM-DD HH:mm");
    },
    methods: {
      transition(now) {
        if (!now) return;
        let i = 1;
        for (let productTypeList of now.productTypeList) {
          for (let productSellTypeList of productTypeList.productSellTypeList) {
            productSellTypeList.rows = 0;
            for (let productType of productSellTypeList.productTypeList) {
              for (let item of productType.detailList) {
                productSellTypeList.rows++;
                item.index = i++;
              }
            }
          }
        }
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
