<template>
  <div class="transfer">
    <div class="data" v-show="!showTable">
      <div class=" navigation">
      <span class="text1" @click="backSell">销售单据></span>
      <span class="text2">产品列表</span>
      <button class="text3" @click="print">打印</button>
      <button class="text4" @click="backSell">返回上一级</button>
      </div>
    <div class="main-content">
      <div class="company">
        <span>公司名称：</span>
        <span>{{result.companyName}}</span>
     </div>
    <div class="goods-desc">
      <div class="desc-one">
        <span class="one">单&nbsp;&nbsp;据&nbsp;号：</span><span class="two">{{result.orderNum}}</span>
      </div>
      <div class="desc-two">
        <span class="one">销售单位：</span><span class="three">{{result.shopName}}</span> <!--<span  class="one">商品属性：</span><span class="two"></span>-->
      </div>
    </div>
    <div class="title-table">
      <table border="0" cellspacing="0" cellpadding="0" ref="titleTable" style="">
        <tr class="title-tr">
          <td style="width:60px">序号</td>
          <td style="width:100px">产品类型</t>
          <td style="width:118px">首饰名称</td>
          <td style="width:128px">条码号</td>
          <td style="width:120px">净金重(g)</td>
          <td style="width:118px">证书号</td>
          <td style="width:114px">主石</td>
          <td style="width:118px">副石</td>
          <td style="width:126px">售价</td>
          <td style="width:118px">成本</td>
        </tr>
      </table>
    </div>
    <div class="main-table" ref="scrollOne" style="" v-show="rightTable[0]">
        <div class="index-table">
            <table  cellspacing="0" cellpadding="0">
               <tr v-for="(value, index) in totalList" :class="[index % 2 != 0 ? 'sendOdd' : 'sendEven' ]">
                   <td style="width: 60px">{{index + 1}}</td>
               </tr>
            </table>
        </div>
        <div class="desc-table">
            <table cellspacing="0" cellpadding="0" ref="descTable">
                <tr v-for="(value, index) in rightTable" :class="[index % 2 != 0 ? 'sendOdd' : 'sendEven' ]">
                    <td style="width:100px">{{value.name}}</td>
                    <td style="width:118px">{{value.jewelryName}}</td>
                    <td style="width:128px">{{value.barcode}}</td>
                    <td style="width:120px">{{value.goldWeight}}</td>
                    <td style="width:118px">{{value.certificateCode}}</td>
                    <td style="width:114px">{{value.main}}</td>
                    <td style="width:118px">{{value.deputy}}</td>
                    <td style="width:126px">{{value.price}}</td>
                    <td style="width:118px">{{value.cost}}</td>
                </tr>
            </table>
        </div>
       <div class="empty" v-if="totalNum < 12">
        <ul>
          <li v-for="value in emptyNum" ref="liClass"></li>
        </ul>
       </div>
    </div>
    <div class="strip"></div>
    <div class="total-data" v-show="rightTable[0]">
      <table border="0" cellspacing="0" cellpadding="0">
          <tr>
          <td style="width:60px">合计</td>
          <td style="width:100px"></t>
          <td style="width:118px"></td>
          <td style="width:118px"></td>
          <td style="width:120px">{{result.totalGoldWeight}}</td>
          <td style="width:118px"></td>
          <td style="width:114px">{{result.totalMain}}</td>
          <td style="width:118px">{{result.totalDeputy}}</td>
          <td style="width:126px">{{result.totalPrice}}</td>
          <td style="width:118px">{{result.totalCost}}</td>
        </tr>
      </table>
    </div>
    <div class="tran-footer">
      <span>备注：</span>
      <span>{{result.remark}}</span>
      <span>制单人：</span>
      <span>{{result.makeManName}}</span>
      <span>收银人：</span>
      <span>{{result.cashierName}}</span>
      <span>制单时间：</span>
      <span>{{makeDate}}</span>
    </div>
    <div class="rightContent">
      <div class="msg" v-show="!showTable">
        <rightDiv :receiptsIntroList="receiptsIntroList" :introListOption="introListOption"></rightDiv>
      </div>
      <div class="remark" v-show="!showTable">
         <remark @refresh="refreshView"></remark>
      </div>
    </div>
    </div>
    </div>
<!--打印内容
    打印内容
-->
    <div class="printContent" v-show="showTable">
     <div class="company">
        <span style="margin-right:20px;">公司名称：</span>
        <span>{{result.companyName}}</span>
     </div>
     <div class="goods-desc">
      <div class="desc-one">
        <span class="one">单&nbsp;&nbsp;据&nbsp;号：</span><span class="two">{{result.orderNum}}</span>
      </div>
      <div class="desc-two">
        <span class="one">销售单位：</span><span class="three">{{result.shopName}}</span>
      </div>
    </div>
    <div class="titleTable">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td style="width: 100px;">序号</td>
          <td style="width:130px">产品类型</t>
          <td style="width:130px">首饰名称</td>
          <td style="width:120px">条码号</td>
          <td style="width:110px">净金重(g)</td>
          <td style="width:100px">证书号</td>
          <td style="width:100px">主石</td>
           <td style="width:100px">副石</td>
          <td style="width:110px">售价</td>
          <td style="width:100px">成本</td>
        </tr>
      </table>
    </div>
    <div class="main-table">
        <div class="index-table">
            <table  cellspacing="0" cellpadding="0">
               <tr v-for="(value, index) in totalList" >
                   <td style="width: 99px">{{index + 1}}</td>
               </tr>
            </table>
        </div>
        <div class="desc-table">
            <table cellspacing="0" cellpadding="0">
               <tr v-for="goods in rightTable">
                  <td style="width:130px">{{goods.name}}</td>
                  <td style="width:130px">{{goods.jewelryName}}</td>
                  <td style="width:120px">{{goods.barcode}}</td>
                  <td style="width:110px">{{goods.goldWeight}}</td>
                  <td style="width:100px">{{goods.certificateCode}}</td>
                  <td style="width:100px">{{goods.main}}</td>
                  <td style="width:100px">{{goods.deputy}}</td>
                  <td style="width:110px">{{goods.price}}</td>
                  <td style="width:100px">{{goods.cost}}</td>
               </tr>
            </table>
        </div>
        <div class="total-data">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td style="width:100px">合计</td>
              <td style="width:130px"></t>
              <td style="width:130px"></td>
              <td style="width:120px"></td>
              <td style="width:110px">{{result.totalGoldWeight}}</td>
              <td style="width:100px"></td>
              <td style="width:100px">{{result.totalMain}}</td>
              <td style="width:100px">{{result.totalDeputy}}</td>
              <td style="width:110px">{{result.totalPrice}}</td>
              <td style="width:100px">{{result.totalCost}}</td>
            </tr>
          </table>
        </div>
        <div class="printRemark">
          <span>备注：{{result.remark}}</span>
          <span>制单时间：{{makeDate}}</span>
        </div>
    </div>

    </div>
    </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {seekSellData} from './../../../../../Api/commonality/operate'
  import rightDiv from './../../../Sell/components/PlainReceiptsDetail.vue'
  import remark from './../../../../../components/work/ReceiptsRemark.vue'
  export default {
    props: [
      'orderNumber',
      'display'
    ],
    data() {
      return {
        totalNum: '',
        result: {}, // 商品详情
        rightTable: [], // 右表数据
        rowspan: [], // 报表系统
        subtotalData: [],
        showTable: false,
        receiptsIntroList: {},
        introListOption: '',
        totalList: ''
      }
    },
    components: {
      rightDiv,
      remark
    },
    computed: {
      emptyNum() {
        if (this.totalNum > 12) return 0
        let val = 12 - this.totalList
        return val
      },
      makeDate() {
        if (!this.result.makeDate) return ''
        let year = this.result.makeDate.slice(0, 4)
        let month = this.result.makeDate.slice(5, 7)
        let day = this.result.makeDate.slice(8, 10)
        let time = year + '-' + month + '-' + day
        return time
      }
    },
    created() {
      this.send()
    },
    methods: {
      refreshView (val) {
        // console.log(val)
        this.send()
      },
      send() {
        let transdata = {
          orderNum: this.$route.query.orderNumber,
          reportType: '3'
        }
        console.log(transdata)
        this.receiptsIntroList = this.$route.query.receiptsIntroList
        this.introListOption = this.$route.query.introListOption
        seekSellData(transdata).then((res) => {
          if (res.data.state === 200) {
            let shopData = res.data.data
            this.result = shopData
            console.log(this.result)
            this.totalNum = parseInt(shopData.totalNum)
            if (this.totalNum === 0) return
            this.getData()
            this.rightTableData(shopData.productTypeList)
            this.countlist(shopData.productTypeList)
            this.addScroll()
            this.liColor()
            console.log(this.makeDate)
            // this.rowspanData()
           //  this.subToalClass(this.rowspan)
          } else {
             console.log('请求后台数据不成功')
             return
          }
        })
      },
      getData() {
        let receiptsIntroList = sessionStorage.getItem('receiptsIntroListXS')
        let introListOption = sessionStorage.getItem('introListOptionXS')
        this.receiptsIntroList = JSON.parse(receiptsIntroList)
        this.introListOption = introListOption
        console.log('fuck')
        console.log(this.receiptsIntroList)
        console.log('fuck')
      },
      /** 获得右边两张表的数据 */
      rightTableData(data) {
         this.rightTable = []
         for (let i = 0; i < data.length; i++) {
          let shop = {}
          let shopName = data[i].productTypeName
          Vue.set(data[i], 'name', shopName)
          shop = data[i]
          this.rightTable.push(shop)
         }
         for (let i = 0; i < data.length; i++) {}
         console.log(this.rightTable)
      },
      /**所有list */
      countlist(data) {
        this.totalList = data.length
        console.log(this.totalList)
      },
      /** 改变空li的背景色 */
        liColor() {
        this.$nextTick(() => {
          let liClass = this.$refs.liClass
          for (let i = 0; i < liClass.length; i++) {
            if (this.totalList % 2 !== 0) {
              console.log('改变LI的颜色')
              if (i % 2 === 0) {
                liClass[i].className = 'liOdd'
              } else {
                liClass[i].className = 'liEven'
              }
            } else if (i % 2 === 0) {
              liClass[i].className = 'liEven'
            } else {
              liClass[i].className = 'liOdd'
            }
          }
        })
      },
      /** 添加滚动style,并改变表格宽度 **/
      addScroll() {
        this.$nextTick(() => {
          let tableOne = this.$refs.titleTable
          let tableFour = this.$refs.descTable
          let scroll = this.$refs.scrollOne
          console.log(scroll)
          console.log(tableFour)
          if (this.totalList <= 12) {
            tableOne.setAttribute('style', 'width:100%')
            let tableFourwidth = tableFour.offsetWidth + 'px'
            let widthStyl = 'width:' + tableFourwidth
            tableFour.setAttribute('style', widthStyl)
            scroll.setAttribute('style', '')
          } else {
              scroll.setAttribute('style', 'overflow-y:scroll')
              tableOne.setAttribute('style', '1110px;')
          }
        })
      },
      print() {
          this.showTable = true
          let self = this
        setTimeout(function() {
            window.print()
            self.showTable = false
        }, 200);
      },
      back() {
         this.$router.push({
           path: "/work/sell",
           query: {
            "orderNumber": this.$route.query.orderNumber
           }
         })
      },
      backSell() {
         this.$router.push({
           path: "/work/sell/sellReceiptsList",
           query: {
            "orderNumber": this.$route.query.orderNumber
           }
         })
      }
    }
  }
</script>
<style lang="scss" scoped>
.transfer{
  margin: 20px auto 0 auto;
  width: 1250px;
  font-size: 14px;
  .data{
    .navigation {
      position: relative;
      height: 50px;
      background: white;
      line-height: 50px;
      font-size: 14px;
      margin-bottom: 20px;
      .text1 {
        margin-left: 30px;
        color: #46c4b4;
      }
      .text3 {
        border: 0;
        font-weight: 600;
        display: inline-block;
        height: 26px;
        width: 75px;
        color: white;
        text-align: center;
        line-height: 26px;
        margin-left: 740px;
        background: #4edbcb;
        border-radius: 3px;
        font-size: 12px
      }
      .text4{
        display: inline-block;
        height: 26px;
        width: 80px;
        background: white;
        text-align: center;
        line-height: 26px;
        margin-left: 24px;
        font-size: 12px;
        color: #98b5d5;
        border: 1px solid #acb1b6;
      }
  }
  .main-content{
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    -webkit-box-shadow: #888888 0px 0px 10px;
    -moz-box-shadow: #888888 0px 0px 10px;
    box-shadow: #888888 0px 2px 10px;
     .company{
    background: #E9EAEE;
    position: relative;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 0px;
  }
   .company span:nth-child(1){
     font-weight: 600;
     color: #939395;
     font-size: 14px;
     margin-right: 20px;
  }
   .company span:nth-child(2){
     font-weight: 600;
     color: rgb(79, 220, 203);
     font-size: 14px;
     margin-right: 20px;
  }
  .company span:nth-child(3){
    position: absolute;
    right: 15%;
    color: #939395;
    font-size: 14px;
    font-weight: 600;
  }
  .company span:nth-child(4){
    position: absolute;
    right: 3%;
    color: #6C6C6E;
    font-size: 14px;
    font-weight: 600;
  }
  .goods-desc{
    width: 100%;
    height: 80px;
    font-size: 0;
    padding: 10px 0 0 20px;
    background: white;
    .desc-one{
      margin-bottom: 22px;
    }
    .one{
      font-size: 14px;
      color: #939395;
      font-weight: 600;
      margin-right: 20px;
    }
    .two{
      display: inline-block;
      width: 230px;
      font-size: 14px;
      font-weight: 600;
      color: #6C6C6E;
    }
    .three{
      display: inline-block;
      width: 225px;
      font-size: 14px;
      font-weight: 600;
      color: #6C6C6E;
    }
  }
  .title-table{
    width: 100%;
    background: #F6F7F9;
    line-height: 40px;
    font-size: 14px;
    color: #4FDCCB;
    font-weight: 600;
    table{
      td{
        line-height: 40px;
        height: 40px;
        text-align: center;
      }
      .title-tr{
        width: 100%
      }
    }
  };
  .main-table{
    position: relative;
    width: 100%;
    height: 360px;
    font-size: 12px;
    overflow: hidden;
    .clear-fix{zoom: 1}
    .clear-fix :after{
      clear: both;
      content: '';
      display: block;
      width: 0;
      height: 0;
      visibility: hidden;
    }
    .index-table{
        display: inline-block;
        margin: 0;
        td{
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: black;
      }
      .sendEven{
        background: white
      }
      .sendOdd{
        background: #F6F7F9;
      }
    }
    .desc-table{
        position: absolute;
        left: 60px;
        top: 0px;
        margin: 0;
      table{
        box-shadow: none;
        margin: 0;
        border-radius: 0;
        td{
          height: 30px;
          line-height: 30px;
          color: black;
          text-align: center;
        }
        .sendEven{
        background: white;
      }
       .sendOdd{
        background: #F6F7F9;
      }
      }
      .line{
        height: 1px;
        width: 100%;
        background: white;
      }
    }
    .empty{
        margin-top: -3px;
      .liEven {
        height: 30px;
        background: white;
      }
      .liOdd  {
        height: 30px;
        background: #F6F7F9;
      }
    }
  };
  .strip{
    width: 100%;
    height: 10px;
    background: #F3F3F6;
    border-radius: 1px;
  };
  .total-data{
    background: #F6F7F9;
    font-size: 12px;
    color: #CAAAA7;
    height: 40px;
    line-height: 40px;
    table{
      border-radius: 0;
      box-shadow: none;
      margin: 0;
      td{
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
  }
  .tran-footer{
    height: 40px;
    line-height: 40px;
    background: #E9EAEE;
    padding-left: 20px;
    font-weight: 600;
  }
  .tran-footer span:nth-child(1){
    color: #939395;
  }
  .tran-footer span:nth-child(2){
    display: inline-block;
    color: #9FD7D0;
    width: 200px;
    margin-right: 80px;
  }
  .tran-footer span:nth-child(3){
    color: #939395;
    font-size: 12px;
  }
  .tran-footer span:nth-child(4){
    display: inline-block;
    width: 100px;
    color: #6C6C6E;
    margin-right: 60px;
  }
  .tran-footer span:nth-child(5){
    color: #939395;
  }
  .tran-footer span:nth-child(6){
    display: inline-block;
    width: 100px;
    color: #6C6C6E;
    margin-right: 40px;
  }
  .tran-footer span:nth-child(7){
    color: #939395;
  }
  .tran-footer span:nth-child(8){
    display: inline-block;
    color: #6C6C6E;
    width: 100px;
    margin-right: 70px;
  }
  .tran-footer span:nth-child(9){
    color: #939395;
  }
  .tran-footer span:nth-child(10){
    color: #939395;
    }
  }
  }
  .printContent{
    width: 1100px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    .company{
      padding-left: 17px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      position: relative;
      border-bottom: 1px solid black;
      border-left: 1px solid black;
      span:nth-child(1) {
        margin-left: 5px;
      }
      span:nth-child(2) {
        display: inline-block;
        width: 200px;
        margin-right: 300px;
      }
      span:nth-child(3) {
        position: absolute;
        display: inline-block;
        right: 30px;
      }
    }
    .goods-desc{
    width: 100%;
    height: 80px;
    font-size: 0;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    .desc-one{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid black;
      padding-left: 20px;
    }
    .one{
      font-size: 14px;
      margin-right: 20px;
    }
    .two{
      display: inline-block;
      width: 230px;
      font-size: 14px;
    }
    .three{
      display: inline-block;
      width: 228px;
      font-size: 14px;
    }
    .desc-two{
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        border-bottom: 1px solid black;
    }
  }
    .mainContent{
        border-right: 1px solid black;
        border-top: 1px solid black;
    }
    .print-desc{
      width: 100%;
      height: 80px;
      font-size: 0;
      .desc-one{
        padding-left: 20px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
      }
      .desc-two {
        padding-left: 20px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
      }
      .one{
        font-size: 14px;
        margin-right: 20px;
      }
      .two{
        display: inline-block;
        width: 230px;
        font-weight: 600;
      }
      .three{
        display: inline-block;
        width: 230px;
        font-size: 14px;
      }
    }
    .titleTable{
      border-bottom: 1px solid black;
      table{
        td {
          height: 30px;
          text-align: center;
          border-left: 1px solid black;
        }
      }
    }
     .main-table{
      width: 100%;
      font-size: 12px;
      .clear-fix{zoom: 1}
      .clear-fix :after{
        clear: both;
        content: '';
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
      .index-table{
        float: left;
        table{
          box-shadow: none;
          margin: 0;
          border-radius: 0;
          td{
            height: 40px;
            text-align: center;
            color: black;
            border-left: 1px solid black;
            border-bottom: 1px solid black;
          }
        }
      }
      .desc-table{
         display: inline-block;
          margin: 0;
        table{
            td{
              border-left: 1px solid black;
              border-bottom: 1px solid black;
              text-align: center;
              height: 40px;
          }
        }
        .subtotalEven{
          background: #F3F3F6;
          color: #CAAAA7;
        }
        .subtotalOdd{
          background: #F3F3F6;
          color: #CAAAA7;
        }
        .sendEven{
          background: white
        }
        .sendOdd{
          background: #F6F7F9;
        }
    }
      .total-data {
        margin-top: -3px;
        border-bottom: 1px solid black;
        table{
          td{
            height: 40px;
            border-left: 1px solid black;
            text-align: center;
          }
        }
      }
      .printRemark{
        position: relative;
        height: 40px;
        line-height: 40px;
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        span:nth-child(1) {
          display: inline-block;
          width: 350px;
          margin-left: 17px;
        }
        span:nth-child(2){
          position: absolute;
          right: 50px;
        }
      }
    .remark {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid black;
      span:nth-child(1) {
        margin:0 300px 0 10px;
        display: inline-block;
        width: 350px;
        height: 100%
      }
    }
    .people{
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid black;
      span:nth-child(1) {
        margin:0 100px 0 10px;
        display: inline-block;
        width: 300px;
        height: 100%
      }
    }
    };
  }
  .rightContent{
    position: absolute;
    top: 70px;
    right: -350px;
    .msg{
      background: white;
    }
  }
}
@media print {
    .transfer {
      position: relative;
      top: 0 !important;
      left: 0!important;
      margin-left: 5px;
      margin-top: 3px;
      margin-right: 5px;
    }
  }
</style>
