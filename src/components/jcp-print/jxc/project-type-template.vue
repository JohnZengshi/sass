<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">{{title}}报表</h1>
      <div class="head-option">
        <div class="left">{{headerData.companyName}}</div>
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
      </div>
    </div>
    <div>
      <table class="table-box">
        <tr>
          <td>模块</td>
          <td>序号</td>
          <!-- <td>产品类别</td> -->
          <td>首饰名称</td>
          <td>件数(件)</td>
          <td>件重(g)</td>
          <td>金重(g)</td>
          <td>售价(元)</td>
          <td>成本(元)</td>
        </tr>
        <template v-if="dataList.productTypeList.length" v-for="(dataList, ind) in sellList.dataList">
          <tr>
            <td :rowspan="dataList.productTypeList.length+1">{{dataList.typeName}}{{dataList.productTypeList.length+1}}</td>
          </tr>
          <tr v-for="(item, index) in dataList.productTypeList">
              <td>{{index + 1}}</td>
              <!-- <td v-if="index==0" :rowspan="productTypeList.detailList.length">{{productTypeList.className}}</td> -->
              <td>{{item.className}}</td>
              <td>{{item.totalNum1|NOUNIT}}</td>
              <td>{{item.totalWeight1|NOUNIT}}</td>
              <td>{{item.totalGoldWeight1|NOUNIT}}</td>
              <td>{{item.totalPrice1|NOUNIT}}</td>
              <td>{{item.totalCost1|NOUNIT}}</td>
          </tr>
          
<!--          <tr>
            <td colspan="3">小计</td>
            <td></td>
            <td>{{dataList.totalNum0}}件</td>
            <td>{{dataList.totalWeight0|GRAMUNIT}}</td>
            <td>{{dataList.totalGoldWeight0|GRAMUNIT}}</td>
            <td>{{dataList.totalPrice0|RMBUNIT}}</td>
            <td>{{dataList.totalCost0|RMBUNIT}}</td>
          </tr> -->
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
  export default {
    components: {},
    props: {
      sellList: {
        type: Object
      },
      headerData: {
        type: Object
      },
      title:{
        type:String
      }
    },
    filters:{
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
    watch:{
      sellList:function(n, o){
        this.transition(n);
      },
    },
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
            if (i) {
              Num += 1
            }
          }
        }

        return Num
      },
      transition(now){
        if(!now)return;
        let i = 1;
        for(let dataList of now.dataList){
          for(let productTypeList of dataList.productTypeList){
              for(let item of productTypeList.detailList){
                item.index = i++;
              }
          }
        }
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
  .center {
    text-align: center;
  }
  .font-bold {
    font-weight: bold;
  }
  
  .print-box{
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
  
  td{
    font-size: 12px;
    border: 1px solid;
    line-height: 25px;
    text-align: center;
  }
  .printDate{
    text-align: right;
    padding: 15px 0;
  }
</style>