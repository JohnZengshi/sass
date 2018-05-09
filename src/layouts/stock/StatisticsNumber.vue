<template>
  <div class="statistics-number-main">
    <p class="statistics-header-left">
      <i class="iconfont icon-liebiao"></i>
      <span>统计指数</span>
      <span>（</span><span class="main-color">{{newMonth}}月</span><span>）</span>
    </p>
    <p class="samll-tit">
      <span>期末</span>
      <span>期初</span>
    </p>
    <ul class="number-wrap-left">
      <li>
        件数 (件)
      </li>
      <li>
        件重 (kg)
      </li>
      <li>
        售价 (万元)
      </li>
      <!-- <li>
        成本 (万元)
      </li> -->
    </ul>
    <div class="number-wrap-inner" v-if="statisticalIndexData">
      <ul class="number-wrap-inner-left">
        <li>
          <span>{{statisticalIndexData.beginNum}}</span>
          <i :style="statisticalIndexData.numIconWidth.begin"></i>
        </li>
        <li>
          <span>{{beginWeight}}</span>
          <i :style="statisticalIndexData.WeightIconWidth.begin"></i>
        </li>
        <li>
          <span>{{beginPrice}}</span>
          <i :style="statisticalIndexData.priceIconWidth.begin"></i>
        </li>
        <!-- <li>
          <span>{{beginCost}}</span>
          <i :style="statisticalIndexData.costIconWidth.begin"></i>
        </li> -->
      </ul>
      <ul class="number-wrap-inner-right">
        <li>
          <i :style="statisticalIndexData.numIconWidth.end"></i>
          <span>{{statisticalIndexData.endNum}}</span>
        </li>
        <li>
          <i :style="statisticalIndexData.WeightIconWidth.end"></i>
          <span>{{endWeight}}</span>
        </li>
        <li>
          <i :style="statisticalIndexData.priceIconWidth.end"></i>
          <span>{{endPrice}}</span>
        </li>
        <!-- <li>
          <i :style="statisticalIndexData.costIconWidth.end"></i>
          <span>{{endCost}}</span>
        </li> -->
      </ul>
    </div>
    <ul class="statistics-number-footer">
      <li>
        <i></i>
        <span>存货周转天数</span><span class="unit-tit">（天）</span>
        <span class="footer-rigth-tit">{{statisticalIndexData.daySalesOfInventory}}</span>
      </li>
      <li>
        <i></i>
        <span>库存系数</span>
        <span class="footer-rigth-tit">{{statisticalIndexData.stockCoefficient}}</span>
      </li>
      <li>
        <i></i>
        <span>库存周转率</span><span class="unit-tit">（%）</span>
        <span class="footer-rigth-tit">{{statisticalIndexData.stockTurnover}}</span>
      </li>
      <li>
        <i></i>
        <span>最大库存量</span><span class="unit-tit">（件）</span>
        <span class="footer-rigth-tit">{{statisticalIndexData.maxStock}}</span>
      </li>
      <!-- <li>
        <i></i>
        <span>最大库成本</span><span class="unit-tit">（元）</span>
        <span class="footer-rigth-tit">{{statisticalIndexData.maxStockCost}}</span>
      </li> -->
    </ul>
  </div>
</template>
<script>
  // import {GetDateStr} from 'assets/js/getTime'
  export default {
    props: ['statisticalIndexData'],
    computed: {
      beginCost () {
        if (this.statisticalIndexData.beginCost == 0) {
          return 0
        }
        return this.getRound(this.statisticalIndexData.beginCost / 10000, 2)
      },
      beginWeight () {
        if (this.statisticalIndexData.beginWeight == 0) {
          return 0
        }
        return this.getRound(this.statisticalIndexData.beginWeight / 1000, 3)
      },
      beginPrice () {
        if (this.statisticalIndexData.beginPrice == 0) {
          return 0
        }
        return this.getRound(this.statisticalIndexData.beginPrice / 10000, 3)
      },
      endWeight () {
        if (this.statisticalIndexData.endWeight == 0) {
          return 0
        }
        return this.getRound(this.statisticalIndexData.endWeight / 1000, 3)
      },
      endPrice () {
        if (this.statisticalIndexData.endPrice == 0) {
          return 0
        }
        return this.getRound(this.statisticalIndexData.endPrice / 10000, 2)
      },
      endCost () {
        if (this.statisticalIndexData.endCost == 0) {
          return 0
        }
        return this.getRound(this.statisticalIndexData.endCost / 10000, 2)
      },
      newMonth () {
        let myDate = new Date()
        if (myDate.getMonth() == 0) {
          return 1
        } else {
          return myDate.getMonth()
        }
      }
    },
    data () {
      return {

      }
    },
    methods: {
      getRound (datas, Num) {
        return datas.toFixed(Num)
        // return Math.round(datas * Math.pow(10, Num)) / Math.pow(10, Num);
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '~assets/css/_mixin.scss';
@import '~assets/css/color.scss';
.statistics-number-main{
  position: relative;
  @include box-shadow;
  border-radius: 10px;
  background-color: #fff;
  height: 360px;
  width: 340px;
  float: right;
  padding: 20px;
  .statistics-header-left{
    >i{
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      font-size: 16px;
      line-height: 16px;
      color: #2993f8;
      margin-bottom: 2px;
    }
    span{
      display: inline-block;
      vertical-align: middle;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      color: #333;
    }
    .main-color{
      color: $main-color;
      font-weight: normal;
    }
  }
  .samll-tit{
    // border: 1px solid red;
    height: 12px;
    margin-top: 20px;
    padding-right: 80px;
    span{
      float: right;
      display: inline-block;
      font-size: 10px;
      line-height: 12px;
      font-weight: bold;
      text-align: center;
      width: 40px;
      color: $font-color-deep;
      // border: 1px solid yellow;
    }
  }
  .number-wrap-left, .number-wrap-inner{
    display: inline-block;
    vertical-align: top;
    margin-top: 16px;
  }
  .number-wrap-left{
    width: 63px;
    li{
      font-size: 12px;
      height: 12px;
      line-height: 12px;
      margin-bottom: 20px;
      color: $font-color-neutral;
      white-space: nowrap;
    }
    li:last-child{
      margin-bottom: 0;
    }
  }
  .number-wrap-inner{
    width: 237px;
    // border: 1px solid red;
    .number-wrap-inner-left, .number-wrap-inner-right{
      display: inline-block;
      vertical-align: top;
      width: 117px;
      li{
        height: 12px;
        margin-bottom: 20px;
        i{
          display: inline-block;
          vertical-align: top;
          min-width: 4px;
          height: 6px;
          margin-top: 3px;
          background-color: #ccc;
        }
        span{
          display: inline-block;
          font-size: 5px;
          vertical-align: top;
          font-size: 12px;
          line-height: 12px;
        }
      }
      li:last-child{
        margin-bottom: 0;
      }
    }
    .number-wrap-inner-left{
      margin-right: 2px;
      text-align: right;
      color: #fe687b;
      i{
        margin-left: 5px;
        background: #ff9b66;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        background: -webkit-linear-gradient(left, #ff9b66 , #fe687b); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #ff9b66 , #fe687b); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #ff9b66 , #fe687b); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #ff9b66 , #fe687b); /* 标准的语法（必须放在最后） */
      }
    }
    .number-wrap-inner-right{
      color: #448eeb;
      i{
        margin-right: 5px;
        background: #448eeb;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        background: -webkit-linear-gradient(left, #448eeb , #57e3c2); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #448eeb , #57e3c2); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #448eeb , #57e3c2); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #448eeb , #57e3c2); /* 标准的语法（必须放在最后） */
      }
    }
  }
  .statistics-number-footer{
    margin-top: 40px;
    li{
      margin-bottom: 20px;
      font-size: 12px;
      height:  12px;
      line-height: 12px;
      i{
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: 1px solid #fe687d;
        margin-right: 10px;
        vertical-align: top;
        margin-top: 3px;
      }
      span{
        display: inline-block;
        height: 12px;
        vertical-align: top;
        font-size: 12px;
        line-height: 12px;
        color: $font-color-deep;
        // span{
        //   font-size: 12px;
        //   line-height: 12px;
        //   vertical-align: top;
        //   color: $font-color-neutral;
        // }
      }
      >.unit-tit{
        font-size: 12px;
        line-height: 12px;
        vertical-align: top;
        color: $font-color-neutral;
      }
      .footer-rigth-tit{
        float: right;
        color: $main-color;
        font-weight: 600;
      }
    }
    li:last-child{
      margin-bottom: 0;
    }
  }
}
</style>