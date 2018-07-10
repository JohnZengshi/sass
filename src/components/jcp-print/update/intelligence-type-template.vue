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
          <!-- <td>序号</td> -->
          <td>产品类别</td>
          <td>首饰名称</td>
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>主石(ct,g)</td>
          <td>副石(ct,g)</td>
          <td>售价(元)</td>
          <td v-if="tabSwitch">成本(元)</td>
        </tr>
        <template v-for="dataList in sellList.dataList">
          <template v-for="productTypeList in dataList.productTypeList">
            <template v-for="(item, index) in productTypeList.detailList">
              <tr class="tr">
                <!-- <td rowspan="2">{{item.index}}</td> -->
                <td class="tl" v-if="index==0" :rowspan="productTypeList.detailList.length*2">{{productTypeList.className}}</td>
                <td class="tl" rowspan="1">{{item.className}}</td>
                <td>{{item.num}}</td>
                <td>{{item.weight}}</td>
                <td>{{item.goldWeight}}</td>
                <td>{{item.main}}</td>
                <td>{{item.deputy}}</td>
                <td>{{item.price}}</td>
                <td v-if="tabSwitch">{{item.cost}}</td>
              </tr>
              <tr class="tr">
				        <td class="tl">修改后</td>
                <td>{{item.afNum}}</td>
                <td>{{item.afWeight}}</td>
                <td>{{item.afGoldWeight}}</td>
                <td>{{item.afMain}}</td>
                <td>{{item.afDeputy}}</td>
                <td>{{item.afPrice}}</td>
                <td v-if="tabSwitch">{{item.afCost}}</td>
              </tr>
            </template>
            <tr class="tr">
              <td class="tm" colspan="1" rowspan="2">小计</td>
			        <td class="tl">修改前</td>
              <td>{{productTypeList.totalNum1}}</td>
              <td>{{productTypeList.totalWeight1}}</td>
              <td>{{productTypeList.totalGoldWeight1}}</td>
              <td>{{productTypeList.totalMain1}}</td>
              <td>{{productTypeList.totalDeputy1}}</td>
              <td>{{productTypeList.totalPrice1}}</td>
              <td v-if="tabSwitch">{{productTypeList.totalCost1}}</td>
            </tr>
            <tr class="tr">
              <td class="tl">修改后</td>
              <td>{{productTypeList.afTotalNum1}}</td>
              <td>{{productTypeList.afTotalWeight1}}</td>
              <td>{{productTypeList.afTotalGoldWeight1}}</td>
              <!-- <td>{{productTypeList.afTotalMain1}}</td> -->
              <td>{{productTypeList.afMain}}</td>
              <!-- <td>{{productTypeList.afTotalDeputy1}}</td> -->
              <td>{{productTypeList.afDeputy}}</td>
              <td>{{productTypeList.afTotalPrice1}}</td>
              <td v-if="tabSwitch">{{productTypeList.afTotalCost1}}</td>
            </tr>
          </template>
          <tr class="tr">
            <td class="tm" colspan="1" rowspan="2">合计</td>
			      <td class="tl">修改前</td>
            <td rowspan="2">{{sellList.totalNum}}</td>
            <td>{{sellList.totalWeight}}</td>
            <td>{{sellList.totalGoldWeight}}</td>
            <td>{{sellList.totalMain}}</td>
            <td>{{sellList.totalDeputy}}</td>
            <td>{{sellList.totalPrice}}</td>
            <td v-if="tabSwitch">{{sellList.totalCost}}</td>
          </tr>
          <tr class="tr">
			      <td class="tl">修改后</td>
            <!-- <td>{{sellList.afTotalNum0}}</td> -->
            <td>{{sellList.afTotalWeight}}</td>
            <td>{{sellList.afTotalGoldWeight}}</td>
            <td>{{sellList.afTotalMain}}</td>
            <td>{{sellList.afTotalDeputy}}</td>
            <td>{{sellList.afTotalPrice}}</td>
            <td v-if="tabSwitch">{{sellList.afTotalCost}}</td>
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
      headerData: {
        type: Object
      },
      title: {
        type: String
      },
      tabSwitch: {
        type: Boolean
      },
      tabTitle: {
        type: String
      }
    },
    filters: {
      GRAMUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return num + "g";
          }
          return "0g";
        } else {
          return "-";
        }
      },
      RMBUNIT: (num) => {
        if (num) {
          if (Number(num)) {
            return num + "元";
          }
          return "0元";
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
    watch: {
      sellList: function (n, o) {
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
        for (let dataList of now.dataList) {
          for (let productTypeList of dataList.productTypeList) {
            for (let item of productTypeList.detailList) {
              item.index = i++;
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
