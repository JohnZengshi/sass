<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">销售统计</h1>
      <div class="head-option">
        <div class="left">{{headerData.companyName}}</div>
        <div class="left">分类：{{title}}</div>
        <div class="right">时间 {{headerData.startTime}} 至 {{headerData.endTime}}</div>
      </div>
      <div class="explain-box">
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
        <!-- 				<div class="explain-box" v-show="headerData.preparedBy">
					制单人：{{headerData.preparedBy}}
				</div>
				<div class="explain-box" v-show="headerData.salesperson">
					销售员：{{headerData.salesperson}}
				</div>
				<div class="explain-box" v-show="headerData.payee">
					收银人：{{headerData.payee}}
				</div> -->
      </div>
    </div>
    <div id="win">
      <div v-show="types.indexOf('销售')>=0">
        <table class="table-box" header-rows="2">
          <tr>
            <td colspan="12" class="center font-bold" style="border-top: 0px;">销售报表</td>
          </tr>
          <tr>
            <td>产品类别</td>
            <td>首饰名称</td>
            <td>件数(件)</td>
            <td>件重(g)</td>
            <td>金重(g)</td>
            <td>售价(元)</td>
            <td>工费总额(元)</td>
            <!-- <td>折扣(%)</td> -->
            <td>实售价(元)</td>
            <!-- <td>退换(元)</td> -->
            <td v-if="isBuyBack">购买额(元)</td>
            <!-- <td>回收(元)</td> -->
            <td>实收(元)</td>
            <td v-if="tabSwitch">成本(元)</td>
            <td v-if="tabSwitch">毛利(元)</td>
          </tr>
          <template v-for="productTypeList in sellList.productTypeList">
            <template v-for="productSellTypeList in productTypeList.productSellTypeList">
              <template v-for="(productType, rowNum) in productSellTypeList.productTypeList">
                <tr v-for="(item,index) in productType.detailList">
                  <td class="tm" v-if="index==0" :rowspan="productType.detailList.length">{{productType.className}}</td>
                  <td class="tl">{{item.className}}</td>
                  <td class="tr">{{item.num}}</td>
                  <td class="tr">{{item.weight}}</td>
                  <td class="tr">{{item.goldWeight}}</td>
                  <td class="tr">{{item.soldPrice}}</td>
                  <td class="tr">{{item.wage}}</td>
                  <!-- <td>{{item.discount}}</td> -->
                  <td class="tr">{{item.realPrice}}</td>
                  <!-- <td>{{item.exchange}}</td> -->
                  <!-- <td>{{Number(item.realPrice)+Number(item.exchange)}}</td> -->
                  <td class="tr">{{item.buy}}</td>
                  <td class="tr" v-if="isBuyBack">{{item.actualPrice}}</td>
                  <!-- <td>{{(Number(item.realPrice)+Number(item.exchange)-item.buy)}}</td> -->
                  <td class="tr" v-if="tabSwitch">{{item.cost}}</td>
                  <td class="tr" v-if="tabSwitch">{{item.margin}}</td>
                  <!-- <td>{{Number(item.realPrice)-Number(item.cost)}}</td> -->
                </tr>
                <tr>
                  <td class="tm" colspan="2">小计</td>
                  <td class="tr">{{productType.totalNum}}</td>
                  <td class="tr">{{productType.totalWeight}}</td>
                  <td class="tr">{{productType.totalGoldWeight}}</td>
                  <td class="tr">{{productType.totalSoldPrice}}</td>
                  <td class="tr">{{productType.totalWage}}</td>
                  <!-- <td>{{productType.totalDiscount}}</td> -->
                  <td class="tr">{{productType.totalRealPrice}}</td>
                  <!-- <td>{{productType.totalExchange}}</td> -->
                  <!-- <td>{{Number(productType.totalRealPrice)+Number(productType.totalExchange)}}</td> -->
                  <td class="tr" v-if="isBuyBack">{{productType.totalBuy}}</td>
                  <!-- <td>{{Number(productType.totalRealPrice)+Number(productType.totalExchange)-productType.totalBuy}}</td> -->
                  <td class="tr">{{productType.totalActualPrice}}</td>
                  <td class="tr" v-if="tabSwitch">{{productType.totalCost}}</td>
                  <td class="tr" v-if="tabSwitch">{{productType.margin}}</td>
                  <!-- <td>{{Number(productType.totalRealPrice)-Number(productType.totalCost)}}</td> -->
                </tr>
              </template>
            </template>
            <tr>
              <td class="tm" colspan="2">合计</td>
              <td class="tr">{{productTypeList.totalNum}}</td>
              <td class="tr">{{productTypeList.totalWeight}}</td>
              <td class="tr">{{productTypeList.totalGoldWeight}}</td>
              <td class="tr">{{productTypeList.totalSoldPrice}}</td>
              <td class="tr">{{productTypeList.totalWage}}</td>
              <!-- <td>{{productTypeList.totalDiscount}}</td> -->
              <td class="tr">{{productTypeList.totalRealPrice}}</td>
              <!-- <td>{{productTypeList.totalExchange}}</td> -->
              <!-- <td>{{Number(productTypeList.totalRealPrice)+Number(productTypeList.totalExchange)}}</td> -->
              <td class="tr" v-if="isBuyBack">{{productTypeList.totalBuy}}</td>
              <td class="tr">{{productTypeList.totalActualPrice}}</td>
              <!-- <td>{{Number(productTypeList.totalRealPrice)+Number(productTypeList.totalExchange)-productTypeList.totalBuy}}</td> -->
              <td class="tr" v-if="tabSwitch">{{productTypeList.totalCost}}</td>
              <td class="tr" v-if="tabSwitch">{{productTypeList.margin}}</td>
              <!-- <td>{{productTypeList.totalCost}}</td> -->
            </tr>
          </template>
        </table>
      </div>

      <div v-show="types.indexOf('回购')>=0">
        <table class="table-box" header-rows="2">
          <tr>
            <td colspan="11" class="center font-bold" style="border-top: 0px;">回购报表</td>
          </tr>
          <tr>
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
                <tr v-for="(item,index) in productType.detailList">
                  <td class="tm" v-if="rowNum==0 && index==0" :rowspan="(productSellTypeList.rows)+(productSellTypeList.productTypeList.length)">
                    {{productSellTypeList.sellTypeName}}
                  </td>
                  <td class="tl" v-if="index==0" :rowspan="productType.detailList.length">
                    {{productType.className}}
                  </td>
                  <td class="tl">{{item.className}}</td>
                  <td class="tr">{{item.num}}</td>
                  <td class="tr">{{item.weight}}</td>
                  <td class="tr">{{item.goldPrice}}</td>
                  <td class="tr">{{item.estimatePrice}}</td>
                  <td class="tr">{{item.depreciationDiscount}}</td>
                  <td class="tr">{{item.wage}}</td>
                  <td class="tr">{{item.actualPrice}}</td>
                </tr>
                <tr>
                  <td class="tm" colspan="2">小计</td>
                  <td class="tr">{{productSellTypeList.totalNum}}</td>
                  <td class="tr">{{productSellTypeList.totalWeight}}</td>
                  <td class="tr">{{productSellTypeList.totalGoldPrice}}</td>
                  <!-- <td>{{productSellTypeList.totalGoldWeight}}元/g</td> -->
                  <td class="tr">{{productSellTypeList.estimatePrice}}</td>
                  <td class="tr">{{productSellTypeList.totaldepreciationDiscount}}</td>
                  <td class="tr">{{productSellTypeList.totalWage}}</td>
                  <td class="tr">{{productSellTypeList.totalActualPrice}}</td>
                </tr>
              </template>
              <tr>
                <td class="tm" colspan="3">{{productSellTypeList.sellTypeName}}小计</td>
                <td class="tr">{{productSellTypeList.totalNum}}</td>
                <td class="tr">{{productSellTypeList.totalWeight}}</td>
                <!-- <td>{{productSellTypeList.totalGoldPrice}}</td> -->
                <td></td>
                <!-- <td>{{productSellTypeList.totalGoldWeight}}元/g</td> -->
                <td class="tr">{{productSellTypeList.estimatePrice}}</td>
                <!-- <td>{{productSellTypeList.totaldepreciationDiscount}}</td> -->
                <td></td>
                <td class="tr">{{productSellTypeList.totalWage}}</td>
                <td class="tr">{{productSellTypeList.totalActualPrice}}</td>
              </tr>
            </template>
            <tr>
              <td class="tm" colspan="3">合计</td>
              <td class="tr">{{productTypeList.totalNum}}</td>
              <td class="tr">{{productTypeList.totalWeight}}</td>
              <!-- <td>{{productTypeList.totalGoldPrice}}</td> -->
              <td></td>
              <td class="tr">{{productTypeList.totalestimatePrice}}</td>
              <!-- <td>{{productTypeList.totaldepreciationDiscount}}</td> -->
              <td></td>
              <td class="tr">{{productTypeList.totalWage}}</td>
              <td class="tr">{{productTypeList.totalActualPrice}}</td>
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
  export default {
    components: {},
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
        type: String
      },
      isBuyBack: {
        type: String
      }
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
    computed: {},
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
  .center {
    text-align: center;
  }

  .print-header {
    border-bottom: 1px solid;
  }

  .font-bold {
    font-weight: bold;
  }

  .print-box {
    font-size: 12px;
    width: 208mm;
    margin: 0 auto;
    padding: 20px;
  }

  .explain-box {
    display: inline-block;
    padding: 5px 35px 5px 0;
  }

  .head-option div {
    display: table-cell;
  }

  .right {
    text-align: right;
  }

  .head-option {
    display: table;
    width: 100%;
    margin-bottom: 5px;
  }

  .table-box {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    font-size: 12px;
    border: 1px solid;
    line-height: 25px;
	padding: 5px;
  }

  .printDate {
    text-align: right;
    padding: 15px 0;
  }

  .tl{
	text-align: left;
  }

  .tr{
	text-align: right;
  }

  .tm{
	  text-align: center;
  }

</style>
