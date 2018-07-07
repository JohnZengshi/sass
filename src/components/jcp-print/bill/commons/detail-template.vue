<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">{{title}}单据</h1>
      <div class="head-option">
        <div class="left">公司名称：{{headerData.companyName}}</div>
        <div class="left">分类：{{tabTitle}}</div>
        <div class="right">制单时间:{{headerData.createDate|DATA_FORMAT}}</div>
      </div>
      <!-- <div>
        <div class="explain-box">
          单据号：{{headerData.orderNum}}
        </div>
        <template v-if="reportType==2">
          <div class="explain-box">
            退库库位：{{headerData.storageName}}
          </div>
          <div class="explain-box">
            供应商：{{headerData.supplierName}}
          </div>
        </template>
        <template v-else-if="reportType==3">
          <div class="explain-box">
            调出位置：{{headerData.storageName}}
          </div>
          <div class="explain-box">
            调入位置：{{headerData.storageName2}}
          </div>
        </template>
        <template v-else-if="reportType==4">
          <div class="explain-box">
            发货库位：{{headerData.storageName}}
          </div>
          <div class="explain-box">
            收货店铺：{{headerData.shopName}}
          </div>
          <div class="explain-box">
            存放柜组：{{headerData.counterName}}
          </div>
        </template>
        <template v-else-if="reportType==5">
          <div class="explain-box">
            调柜店铺：{{headerData.distributor}}
          </div>
          <div class="explain-box">
            调出柜组：{{headerData.groupName2}}
          </div>
          <div class="explain-box">
            调入柜组：{{headerData.groupName2}}
          </div>
        </template>
        <template v-else-if="reportType==6">
          <div class="explain-box">
            退货库位：{{headerData.storageName}}
          </div>
          <div class="explain-box">
            退货铺位：{{headerData.shopName}}
          </div>
        </template>
      </div>
      <div>
        <div class="explain-box" v-show="headerData.makeOrderManName">
          制单人：{{headerData.makeOrderManName}}
        </div>
        <template v-if="reportType==2">
          <div class="explain-box" v-show="headerData.checkName">
            审核人：{{headerData.checkName}}
          </div>
        </template>
        <template v-else-if="reportType==3">
          <div class="explain-box" v-show="headerData.consigneeName">
            收货人：{{headerData.consigneeName}}
          </div>
        </template>
        <template v-else-if="reportType==4">
          <div class="explain-box" v-show="headerData.checkName">
            审核人：{{headerData.checkName}}
          </div>
          <div class="explain-box" v-show="headerData.consigneeName">
            收货人：{{headerData.consigneeName}}
          </div>
        </template>
        <template v-else-if="reportType==6">
          <div class="explain-box" v-show="headerData.checkName">
            审核人：{{headerData.checkName}}
          </div>
          <div class="explain-box" v-show="headerData.consigneeName">
            收货人：{{headerData.consigneeName}}
          </div>
        </template>
      </div> -->
      <filtrateBoxByInvoices :headerData="headerData" :title="title" :reportType="reportType"></filtrateBoxByInvoices>
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
          <td v-show="tabSwitch">成本(元)</td>
        </tr>
        <tr class="tr" v-for="(item,index) in sellList.detailList" :key="index">
          <td>{{index+1}}</td>
          <td class="tl">{{item.barcode}}</td>
          <td class="tl">{{item.jewelryName}}</td>
          <td>{{item.weight}}</td>
          <td>{{item.goldWeight}}</td>
          <td>{{item.main}}</td>
          <td>{{item.deputy}}</td>
          <td>{{item.price}}</td>
          <td v-show="tabSwitch">{{item.cost}}</td>
        </tr>
        <tr class="tr">
          <td class="tm" colspan="2">合计</td>
          <td>{{sellList.totalNum}}</td>
          <td>{{sellList.totalWeight}}</td>
          <td>{{sellList.totalGoldWeight}}</td>
          <td>{{sellList.totalMain}}</td>
          <td>{{sellList.totalDeputy}}</td>
          <td>{{sellList.totalPrice}}</td>
          <td v-show="tabSwitch">{{sellList.totalCost}}</td>
        </tr>
      </table>
    </div>
    <Sign :title="title"></Sign>
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
  import filtrateBoxByInvoices from "../../components/filtrateBoxByInvoices.vue"
  import Sign from "../../components/Sign.vue"
  export default {
    components: {
      filtrateBoxByInvoices,
      Sign
    },
    props: {
      sellList: {
        type: Object
      },
      title: {
        type: String
      },
      headerData: {
        type: Object
      },
      //1代表入库、2退库、3调库、4发货、5调柜、6退货
      reportType: {
        type: Number
      },
      tabTitle:{
				type:String
			},
			tabSwitch:{
				type:Boolean
			}
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
