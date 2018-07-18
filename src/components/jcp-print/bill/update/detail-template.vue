<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">{{title}}单据</h1>
      <div class="head-option">
        <div class="left">公司名称：{{headerData.companyName}}</div>
        <div class="right">制单时间 {{headerData.createDate|DATA_FORMAT}}</div>
      </div>
      <!-- <div class="explain-box">
				单据号：{{headerData.orderNum}}
			</div>
			<div class="explain-box">
				库位：{{headerData.storageName}}
			</div>
			<div>
				<div class="explain-box" v-show="headerData.makeOrderManName">
					制单人：{{headerData.makeOrderManName}}
				</div>
				<div class="explain-box" v-show="headerData.checkName">
					审核人：{{headerData.checkName}}
				</div>
				<div class="explain-box" v-show="headerData.payee">
					收银人：{{headerData.payee}}
				</div>
			</div> -->
      <filtrateBoxByInvoices :headerData="headerData" :title="title"></filtrateBoxByInvoices>
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
          <td>成本(元)</td>
        </tr>
        <template v-for="(item,index) in sellList.rowDataList">
          <tr class="tr">
            <td rowspan="2">{{index+1}}</td>
            <td class="tl" rowspan="1">{{item.now.barcode}}</td>
            <td class="tl">{{add(item.now.metalColor,item.now.gemName,item.now.jewelryName)}}</td>
            <td>{{item.now.totalWeight}}</td>
            <td>{{item.now.netWeight}}</td>
            <td>{{add(item.now.mainWeight, item.now.unit)}}</td>
            <td>{{add(item.now.deputyWeight, item.now.deputyUnit)}}</td>
            <td>{{item.now.soldPrice}}</td>
            <td>{{item.now.costPrice}}</td>
          </tr>
          <tr class="tr">
            <td v-if="headerData.status == 1 || headerData.status == 2" class="tl">修改后</td>
            <td v-else-if="headerData.status == 3 || headerData.status == 6"class="tl">修改前</td>
            <td class="tl">{{add(item.old ? item.old.metalColor :'',item.old? item.old.gemName:'',item.old? item.old.jewelryName:'')}}</td>
            <td>{{item.old? item.old.totalWeight:''}}&nbsp;</td>
            <td>{{item.old? item.old.netWeight:''}}</td>
            <td>{{add(item.old? item.old.mainWeight:'', item.old ?item.old.unit:'')}}</td>
            <td>{{add(item.old? item.old.deputyWeight:'', item.old?item.old.deputyUnit:'')}}</td>
            <td>{{item.old ? item.old.soldPrice : ''}}</td>
            <td>{{item.old ? item.old.costPrice : ''}}</td>
          </tr>
        </template>
        <tr class="tr">
          <td class="tm" colspan="2" rowspan="2">合计</td>
          <td class="tl">修改前</td>
          <template v-if="(headerData.status == 1 || headerData.status == 2) && sellList.now">
            <td>{{sellList.now.weight}}</td>
            <td>{{sellList.now.netWeight}}</td>
            <td>{{sellList.now.mainWeight}}</td>
            <td>{{sellList.now.deputyWeight}}</td>
            <td>{{sellList.now.price}}</td>
            <td>{{sellList.now.cost}}</td>
          </template>
          <template v-else-if="(headerData.status == 3 || headerData.status == 6) && sellList.old">
            <td>{{sellList.old.weight}}</td>
            <td>{{sellList.old.netWeight}}</td>
            <td>{{sellList.old.mainWeight}}</td>
            <td>{{sellList.old.deputyWeight}}</td>
            <td>{{sellList.old.price}}</td>
            <td>{{sellList.old.cost}}</td>
          </template>
          
        </tr>
        <tr class="tr">
          <td class="tl">修改后</td>
          <template v-if="(headerData.status == 1 || headerData.status == 2) && sellList.old">
            <td>{{sellList.old.weight}}</td>
            <td>{{sellList.old.netWeight}}</td>
            <td>{{sellList.old.mainWeight}}</td>
            <td>{{sellList.old.deputyWeight}}</td>
            <td>{{sellList.old.price}}</td>
            <td>{{sellList.old.cost}}</td>
          </template>
          <template v-else-if="(headerData.status == 3 || headerData.status == 6) && sellList.now">
            <td>{{sellList.now.weight}}</td>
            <td>{{sellList.now.netWeight}}</td>
            <td>{{sellList.now.mainWeight}}</td>
            <td>{{sellList.now.deputyWeight}}</td>
            <td>{{sellList.now.price}}</td>
            <td>{{sellList.now.cost}}</td>
          </template>
        </tr>
      </table>
    </div>
    <div class="printDate">
      <Sign :title="title"></Sign>
      打印时间：{{printDate}}
    </div>
  </div>
</template>
<script>
  import {
    jcpPrint
  } from "@/tools/jcp-print";
  import moment from "moment";
  import filtrateBoxByInvoices from "../../components/filtrateBoxByInvoices.vue"
  import Sign from "../../components/Sign.vue"
  export default {
    components: {
      filtrateBoxByInvoices,
      Sign
    },
    props: {
      sellList: {
        type: Object,
        default: () => {
          return {
            old: {},
            now: {}
          }
        }
      },
      title: {
        type: String
      },
      headerData: {
        type: Object
      },
    },
    filters: {
      DATA_FORMAT: (date) => {
        if (date) {
          return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm");
        }
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
      add(...args) {
        let r = "";
        for (let item of args) {
          r = _.add(r, item);
        }
        return r;
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
  @import "../../../../assets/css/print.scss";
  .print-box {
    width: 208mm;
  }

</style>
