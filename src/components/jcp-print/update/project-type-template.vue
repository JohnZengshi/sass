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
          <td>产品类别</td>
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>主石(ct,g)</td>
          <td>副石(ct,g)</td>
          <td>售价(元)</td>
          <td v-if="tabSwitch">成本(元)</td>
        </tr>
        <template v-for="dataList in sellList.dataList">
          <template v-for="(item, index) in dataList.productTypeList">
            <tr class="tr">
              <td rowspan="2">{{index+1}}</td>
              <td class="tl" rowspan="1">{{item.className}}</td>
              <td>{{item.totalNum1}}</td>
              <td>{{item.totalWeight1}}</td>
              <td>{{item.totalGoldWeight1}}</td>
              <td>{{item.totalMain1|ZERO}}</td>
              <td>{{item.totalDeputy1|ZERO}}</td>
              <td>{{item.totalPrice1}}</td>
              <td v-if="tabSwitch">{{item.totalCost1}}</td>
            </tr>
            <tr class="tr">
				      <td class="tl">修改前</td>
              <td>{{item.afTotalNum1}}</td>
              <td>{{item.afTotalWeight1}}</td>
              <td>{{item.afTotalGoldWeight1}}</td>
              <!-- 主石 -->
              <td>{{item.afMain|ZERO}}</td>
              <!-- 副石 -->
              <td>{{item.afDeputy|ZERO}}</td>
              <td>{{item.afTotalPrice1}}</td>
              <td v-if="tabSwitch">{{item.afTotalCost1}}</td>
            </tr>
          </template>
          <tr class="tr">
            <td class="tm" colspan="1" rowspan="2">合计</td>
			      <td class="tl">修改前</td>
            <td rowspan="2">{{dataList.totalNum0}}</td>
            <td>{{dataList.afTotalWeight0}}</td>
            <td>{{dataList.afTotalGoldWeight0}}</td>
            <!-- 主石 -->
            <td>{{dataList.afMain|ZERO}}</td>
            <!-- 副石 -->
            <td>{{dataList.afDeputy|ZERO}}</td>
            <td>{{dataList.afTotalPrice0}}</td>
            <td v-if="tabSwitch">{{dataList.afTotalCost0}}</td>
          </tr>
          <tr class="tr">
			      <td class="tl">修改后</td>
            <td>{{dataList.totalWeight0}}</td>
            <td>{{dataList.totalGoldWeight0}}</td>
            <td>{{dataList.totalMain0|ZERO}}</td>
            <td>{{dataList.totalDeputy0|ZERO}}</td>
            <td>{{dataList.totalPrice0}}</td>
            <td v-if="tabSwitch">{{dataList.totalCost0}}</td>
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
      },
      ZERO: (num) => {
        if (num) {
          return num;
        } else {
          return "0.000";
        }
      },
    },
    watch: {
      sellList: function (n, o) {},
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
