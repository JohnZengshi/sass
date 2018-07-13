<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">{{title}}单据</h1>
      <div class="head-option">        
        <div class="left">公司名称：{{headerData.companyName}}</div>
        <div class="left">分类：{{tabTitle}}</div>
        <div class="right" :style="{ visibility : headerData.createDate ? 'visible' : 'hidden' }">查询时间:{{headerData.createDate}}</div>
      </div>
<!--       <div class="head-option">
        <div class="left">{{headerData.companyName}}</div>
        <div class="right">制单时间:{{headerData.createDate|DATA_FORMAT}}</div>
      </div> -->
<!--       <div>
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
      <filtrateBoxByInventory :headerData="headerData" :tabTitle="tabTitle"></filtrateBoxByInventory>
    </div>
    <div>
      <table class="table-box">
        <tr class="tm noBorderTop">
          <td v-if="positionSwitch">位置名称</td>
          <td>序号</td>
          <td>产品类别</td>
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>主石(ct,g)</td>
          <td>副石(ct,g)</td>
          <td>售价(元)</td>
          <td v-show="tabSwitch">成本(元)</td>
        </tr>
        <template v-for="dataList in sellList.dataList">
          <tr class="tr" v-if="positionSwitch">
            <td class="tm" :rowspan="filterLength(dataList)">{{dataList.whereName}}</td>
          </tr>
          <tr class="tr" v-for="(item, index) in dataList.productTypeList" :key="index">
            <td>{{index+1}}</td>
            <td class="tl">{{item.className}}</td>
            <td>{{item.totalNum1}}</td>
            <td>{{item.totalWeight1}}</td>
            <td>{{item.totalGoldWeight1}}</td>
            <td>{{item.totalMain1}}</td>
            <td>{{item.totalDeputy1}}</td>
            <td>{{item.totalPrice1}}</td>
            <td v-if="tabSwitch">{{item.totalCost1}}</td>
          </tr>
          <tr class="tr">
            <td class="tm" :colspan="positionSwitch ? 3 : 2">合计</td>
            <td>{{dataList.totalNum0}}</td>
            <td>{{dataList.totalWeight0}}</td>
            <td>{{dataList.totalGoldWeight0}}</td>
            <td>{{dataList.totalMain0}}</td>
            <td>{{dataList.totalDeputy0}}</td>
            <td>{{dataList.totalPrice0}}</td>
            <td v-show="tabSwitch">{{dataList.totalCost0}}</td>
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
  import {jcpPrint} from "@/tools/jcp-print";
  import moment from "moment";
  import filtrateBoxByInventory from "../components/filtrateBoxByInventory.vue"
  export default {
    components: {
      filtrateBoxByInventory
    },
    props: {
      sellList: {
        type: Object
      },
      headerData: {
        type: Object
      },
      title:{
        type:String
      },
      //1代表入库、2退库、3调库、4发货、5调柜、6退货
      reportType: {
        type: Number
      },
      positionSwitch: {
        type:Boolean
      },
      tabTitle:{
				type:String
      },
      tabSwitch: { // 成本
        type: Boolean
      }
    },
    filters:{
      DATA_FORMAT:(date)=>{
        if(date){
          return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm");
        }
      },
      GRAMUNIT:(num)=>{
        if(num){
          if(Number(num)){
            return num+"g";
          }
          return "0g";
        }else{
          return "-";
        }
      },
      RMBUNIT:(num)=>{
        if(num){
          if(Number(num)){
            return num+"元";
          }
          return "0元";
        }else{
          return "-";
        }
      },
      NOUNIT:(num)=>{
        if(num){
          if(Number(num)){
            return num;
          }
          return 0;
        }else{
          return "-";
        }
      },
      SELL_TYPE:(key)=>{
        let obj = new Map();
        obj.set("1","退货");
        obj.set("2","换货");
        obj.set("3","回收");
        return obj.get(key);
      }
    },
    // watch:{
    //   sellList:function(n, o){
    //   },
    // },
    data() {
      return {
        printDate:""
      }
    },
    computed: {
    },
    mounted() {
      this.printDate = moment().format("YYYY-MM-DD HH:mm");
    },
    methods: {
      filterLength (parm) {
        let Num = 1
        if (parm) {
          for (let i of parm.productTypeList) {
            Num += 1
          }
        }

        return Num
      },
      print(){
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
  .print-box{
    width: 208mm;
  }
</style>