<template>
  <div class="print-box breakable" id="page1">
    <div class="print-header">
      <h1 class="title center">{{title}}报表</h1>
      <div class="head-option">
        <div class="left">公司名称：{{headerData.companyName}}</div>
        <div class="left">分类：{{tabTitle}}</div>
        <div class="right" :style="{ visibility : headerData.createDate ? 'visible' : 'hidden' }">查询时间:{{headerData.createDate}}</div>
      </div>
      <filtrateBoxByInventory :headerData="headerData" :tabTitle="tabTitle"></filtrateBoxByInventory>
    </div>
    <div>
      <table class="table-box" border="0" cellspacing="0" cellpadding="0">
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
    <div class="printDate">
      <!-- <Sign :title="title"></Sign> -->
      打印时间：{{printDate}}
    </div>
  </div>
</template>
<script>
  import {jcpPrint} from "@/tools/jcp-print";
  import moment from "moment";
  import filtrateBoxByInventory from "../components/filtrateBoxByInventory.vue"
  import Sign from "../components/Sign.vue"
  export default {
    components: {
      filtrateBoxByInventory,
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
      tabSwitch: { // 成本
        type:Boolean
      },
    },
    filters:{
      DATA_FORMAT:(date)=>{
        if(date){
          return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm");
        }
      }
    },
    data() {
      return {
        printDate:""
      }
    },
    mounted() {
      this.printDate = moment().format("YYYY-MM-DD HH:mm");
    },
    methods: {
      // print() {
      //   let doc = {
      //     documents: document,
      //   };
      //   jcpPrint.printPreview(doc);
      // },
      print () {
        let _self = this
       getJCP().isPrinterError('HP LaserJet MFP M129-M134 PCLm-S (网络)', function(result) {
        console.log('打印机检测', result)
       })
        getJCP().getPrinters(
          function(printers) {
              // console.log('printers', printers[0])
              console.log('传入的值AAA', printers[2])
              _self._print('HP LaserJet MFP M129-M134 PCLm-S (网络)', 0, 3)
          }
        )
      },
      _print(printer, jobindex, jobs) {
        //打印文档对象
        let _self = this
        var myDoc = {
          settings:{printer: printer, paperName: "A4"},
          documents: document,
          noMargins: true,
          copyrights: '杰创软件拥有版权  www.jatools.com',
          done: function() {
            console.log('打印成功', new Date())
            _self.$emit('sucessPrintCallback')
            // jobindex++;
            // if (jobindex < jobs) {
            //   this._print(printer, jobindex, jobs);
            // }
          }
        };
        // getJCP().print(myDoc, true);
      }
    }
  }
</script>

<style scoped lang="scss">
 @import "../../../assets/css/print.scss";
  .print-box{
    width: 208mm;
  }
</style>