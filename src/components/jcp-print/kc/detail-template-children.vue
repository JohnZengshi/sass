<template>
  <div class="print-box breakable" id="page1">
    <table class="table-box">
      <tr v-if="index > 50" v-for="(item,index) in sellList.detailList" :key="index">
        <td>{{index+1}}</td>
        <td>{{item.barcode}}</td>
        <td>{{item.jewelryName}}</td>
        <td>{{item.weight}}</td>
        <td>{{item.goldWeight}}</td>
        <td>{{item.main}}</td>
        <td>{{item.deputy}}</td>
        <td>{{item.price}}</td>
        <td>{{item.cost}}</td>
      </tr>
      <tr>
        <td colspan="2">合计</td>
        <td>{{sellList.totalNum}}件</td>
        <td>{{sellList.totalWeight}}g</td>
        <td>{{sellList.totalGoldWeight}}g</td>
        <td>{{sellList.totalMain}}</td>
        <td>{{sellList.totalDeputy}}</td>
        <td>{{sellList.totalPrice}}元</td>
        <td>{{sellList.totalCost}}元</td>
      </tr>
    </table>
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
    },
    filters:{
      DATA_FORMAT:(date)=>{
        if(date){
          return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm");
        }
      }
    },
    // http://jzm-1252389350.cosgz.myqcloud.com/iconCompany/Vue1527317987926.js%20教程%20-%20v1
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
        getJCP().print(myDoc, false);
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