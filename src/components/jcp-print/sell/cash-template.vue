<template>
  <div class="print-box" id="page1">
    <div class="print-header">
      <h1 class="title center">收银统计</h1>
      <div class="head-option">
        <div class="left">{{printSelectDate.companyName}}</div>
        <div class="right">时间 {{printSelectDate.startTime}} 至 {{printSelectDate.endTime}}</div>
      </div>
      <div class="explain-box">
        店铺名称：{{printSelectDate.shop}}
      </div>
      <!--<div class="explain-box">
				班组名称：{{printSelectDate.}}
			</div>-->
    </div>
    <div>
      <table class="table-box">
        <!-- <tr>
          <td colspan="7" class="center font-bold" style="border-top: 0px;">销售统计</td>
        </tr> -->
        <tr>
          <!-- <td>序号</td> -->
          <td>销售类型</td>
          <td>回购类型</td>
          <td>产品类别</td>
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>标价(元)</td>
          <td>工费总额(元)</td>
          <td>实售价(元)</td>
        </tr>
        <template v-if="sellStorage.productTypeList" v-for="(productTypeList,j) in sellStorage.productTypeList">
          <template v-if="productTypeList.productSellTypeList" v-for="(productSellTypeList,i) in productTypeList.productSellTypeList">

            <tr v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
              <td v-if="j == 0 && index == 0 && i == 0" :rowspan="sellLength(sellStorage.productTypeList)">销售</td>
              <td v-if="index == 0 && productSellTypeList.classesType == '1'" :rowspan="productSellTypeList.productTypeList.length">计重</td>
              <td v-else-if="index == 0 && productSellTypeList.classesType == '2'" :rowspan="productSellTypeList.productTypeList.length">计件</td>
              <!-- <td>{{index+1}}</td> -->
              <td>{{item.className}}</td>
              <td>{{item.totalNum}}</td>
              <td>{{item.totalWeight}}</td>
              <td>{{item.totalGoldWeight}}</td>
              <td>{{item.totalSoldPrice}}</td>
              <td>{{item.totalWage}}</td>
              <td>{{item.totalRealPrice}}</td>
            </tr>
            <tr>
              <td colspan="2">小计</td>
              <td>{{productSellTypeList.totalNum}}</td>
              <td>{{productSellTypeList.totalWeight}}</td>
              <td>{{productSellTypeList.totalGoldWeight}}</td>
              <td>{{productSellTypeList.totalSoldPrice}}</td>
              <td>{{productSellTypeList.totalWage}}</td>
              <td>{{productSellTypeList.totalRealPrice}}</td>
            </tr>
          </template>
          <tr>
            <td colspan="3">销售合计</td>
            <td>{{productTypeList.totalNum}}</td>
            <td>{{productTypeList.totalWeight}}</td>
            <td>{{productTypeList.totalGoldWeight}}</td>
            <td>{{productTypeList.totalSoldPrice}}</td>
            <td>{{productTypeList.totalWage}}</td>
            <td>{{productTypeList.totalRealPrice}}</td>
          </tr>
        </template>

        <template v-for="(productTypeList,j) in buyBackStorage.productTypeList">
          <template v-if="productTypeList.productSellTypeList" v-for="(productSellTypeList,i) in productTypeList.productSellTypeList">

            <tr v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
              <td v-if="j == 0 && index == 0 && i == 0" :rowspan="sellLength(buyBackStorage.productTypeList)">回购</td>
              <td v-if="index == 0" :rowspan="productSellTypeList.productTypeList.length">{{productSellTypeList.sellTypeName}}</td>
              <td>{{item.className}}</td>
              <td>{{item.totalNum}}</td>
              <td>{{item.totalWeight}}</td>
              <td>{{item.totalGoldWeight}}</td>
              <td>{{item.totalSoldPrice}}</td>
              <td>{{item.totalWage}}</td>
              <td>{{item.totalActualPrice}}</td>
            </tr>
            <tr>
              <td colspan="2">小计</td>
              <td>{{productSellTypeList.totalNum}}</td>
              <td>{{productSellTypeList.totalWeight}}</td>
              <td>{{productSellTypeList.totalGoldWeight}}</td>
              <td>{{productSellTypeList.totalSoldPrice}}</td>
              <td>{{productSellTypeList.totalWage}}</td>
              <td>{{productSellTypeList.totalActualPrice}}</td>
            </tr>
          </template>
          <tr>
            <td colspan="3">销售合计</td>
            <td>{{productTypeList.totalNum}}</td>
            <td>{{productTypeList.totalWeight}}</td>
            <td>{{productTypeList.totalGoldWeight}}</td>
            <td>{{productTypeList.totalSoldPrice}}</td>
            <td>{{productTypeList.totalWage}}</td>
            <td>{{productTypeList.totalActualPrice}}</td>
          </tr>
        </template>

        <tr>
          <!-- <td>收款方式与金额</td> -->
          <td colspan="2">刷卡(元)</td>
          <td>现金(元)</td>
          <td colspan="2">微信(元)</td>
          <td colspan="2">支付宝(元)</td>
          <td>其他(元)</td>
          <td>实际收银(元)</td>
        </tr>
        <tr>
          <!-- <td>收款方式与金额</td> -->
          <td colspan="2">{{cashierStatistics.slotCard || 0}}</td>
          <td>{{cashierStatistics.cash || 0}}</td>
          <td colspan="2">{{cashierStatistics.weixin || 0}}</td>
          <td colspan="2">{{cashierStatistics.zhifubao || 0}}</td>
          <td>{{cashierStatistics.other || 0}}</td>
          <td>{{cashierStatistics.totalMoney || 0}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
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
        buyBackStorageLength: 0
      }
    },
    mounted() {

    },
    created() {
      // 	const sellProductTypeList = this.sellStorage["productTypeList"];
      //   sellProductTypeList.forEach((val, index) => {
      //     const productSellTypeList = val["productSellTypeList"]
      //     productSellTypeList.forEach((val, index) => {
      //       this.sellStorageLength += val["productTypeList"].length
      //     })
      //   })
      //   console.log(this.sellStorageLength)
      //   const buyBackProductTypeList = this.buyBackStorage["productTypeList"]
      //   buyBackProductTypeList.forEach((val, index) => {
      //     const productSellTypeList = val["productSellTypeList"]
      //     productSellTypeList.forEach((val, index) => {
      //       this.buyBackStorageLength += val["productTypeList"].length;
      //     })
      //   })
      //   console.log(this.buyBackStorageLength)
    },
    methods: {
      print() {
        var myDoc = {
          documents: document,
          copyrights: '杰创软件拥有版权  www.jatools.com',
          paperName: "A4",
        };
        var jcp = getJCP();
        jcp.printPreview(myDoc, true);
      },
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
      }
    }
  }

</script>

<style scoped lang="scss">
  .center {
    text-align: center;
  }

  .font-bold {
    font-weight: bold;
  }

  .print-box {
    font-size: 12px;
    width: 197mm;
    margin: 0 auto;
    padding: 20px;
  }

  .explain-box {
	display: inline-block;
	width: 100%;
	border: 1px solid;
	border-top: none;
	border-bottom: none;
    padding: 10px 10px 10px 10px;
  }

  .head-option div {
    display: table-cell;
  }

  .right {
    text-align: right;
  }

  .head-option {
	display: table;
	padding: 10px 10px 10px 10px;
	width: 100%;
	border: 1px solid;
  }

  .table-box {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    font-size: 12px;
    border: 1px solid;
    line-height: 25px;
    text-align: center;
  }

</style>
