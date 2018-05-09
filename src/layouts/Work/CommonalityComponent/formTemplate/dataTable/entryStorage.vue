<template>
  <div class="transfer">
    <div class="data" v-show="!showTable">
      <div class=" navigation">
      <span class="text1" @click="back">入库单据></span>
      <span class="text2">产品列表</span>
      <button class="text3" @click="print">打印</button>
      <button class="text4" @click="autoBack">返回上一级</button>
      </div>
    <div class="main-content">
      <div class="company">
        <span style="margin-right:20px;">公司名称：</span>
        <span>{{result.companyName}}</span>
     </div>
    <div class="goods-desc">
      <div class="desc-one">
        <span class="one">单&nbsp;&nbsp;据&nbsp;号：</span><span class="two">{{result.orderNum}}</span><span  class="one">供&nbsp;&nbsp;应&nbsp;商：</span><span class="two">{{result.supplierName}}</span>
      </div>
      <div class="desc-two">
        <span class="one">入库库位：</span><span class="three">{{result.storageName}}</span>

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
    <div class="main-table" ref="scrollOne" style="">
        <div class="index-table">
            <table  cellspacing="0" cellpadding="0">
               <tr v-for="(value, index) in totalList" :class="[index % 2 != 0 ? 'sendOdd' : 'sendEven' ]">
                   <td style="width: 60px">{{index + 1}}</td>
               </tr>
            </table>
        </div>
        <div class="desc-table">
            <table cellspacing="0" cellpadding="0" v-for="value in rightTable" ref="descTable">
                <tr v-for="(desc, index) in value.desc" :class="[index%2 != 0 ? 'sendOdd' : 'sendEven' ]">
                    <td style="width:100px">{{desc.name}}</td>
                    <td style="width:118px">{{desc.jewelryName}}</td>
                    <td style="width:128px">{{desc.barcode}}</td>
                    <td style="width:120px">{{desc.goldWeight}}</td>
                    <td style="width:118px">{{desc.certificateCode}}</td>
                    <td style="width:114px">{{desc.main}}</td>
                    <td style="width:118px">{{desc.deputy}}</td>
                    <td style="width:126px">{{desc.price}}</td>
                    <td style="width:118px">{{desc.cost}}</td>
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
    <div class="total-data">
      <table border="0" cellspacing="0" cellpadding="0">
          <tr>
          <td style="width:60px">合计</td>
          <td style="width:100px"></td>
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
      <span>备注:</span>
      <span>{{result.remark}}</span>
      <span>制单人:</span>
      <span>{{result.makeManName}}</span>
      <span>审核人:</span>
      <span>{{result.checkManName}}</span>
      <span>接收人:</span>
      <span></span>
      <span>制单时间:</span>
      <span>{{makeDate}}</span>
    </div>
    <!-- <div class="rightContent" v-show="!showTable">
      <rightDiv :receiptsIntroList="receiptsIntroList" :introListOption="introListOption"></rightDiv>
      <remark @refresh="refreshView"></remark>
    </div> -->
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
        <span class="one">单&nbsp;&nbsp;据&nbsp;号：</span><span class="two">{{result.orderNum}}</span><span  class="one">供&nbsp;&nbsp;应&nbsp;商：</span><span class="two">{{result.supplierName}}</span>
      </div>
      <div class="desc-two">
        <span class="one">入库单位：</span><span class="three">{{result.storageName}}</span>
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
    <div class="main-table" v-show="rightTable[0]">
        <div class="index-table" >
            <table  cellspacing="0" cellpadding="0">
               <tr v-for="(value, index) in totalList" >
                   <td style="width: 99px">{{index + 1}}</td>
               </tr>
            </table>
        </div>
        <div class="desc-table">
            <table cellspacing="0" cellpadding="0" v-for="value in rightTable">
                <tr v-for="(desc, index) in value.desc" >
                    <td style="width:130px">{{desc.name}}</td>
                    <td style="width:130px">{{desc.jewelryName}}</td>
                    <td style="width:120px">{{desc.barcode}}</td>
                    <td style="width:110px">{{desc.goldWeight}}</td>
                    <td style="width:100px">{{desc.certificateCode}}</td>
                    <td style="width:100px">{{desc.main}}</td>
                    <td style="width:100px">{{desc.deputy}}</td>
                    <td style="width:110px">{{desc.price}}</td>
                    <td style="width:100px">{{desc.cost}}</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="total-data">
      <table cellspacing="0" cellpadding="0">
        <tr>
          <td style="width: 99px;"></td>
          <td style="width:130px">合计</td>
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
      <span style="float:right; margin-right:20px;">制单时间：&nbsp;&nbsp;&nbsp;{{makeDate}}</span>
    </div>
    </div>
    </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {seekGetStorageData} from './../../../../../Api/commonality/operate'
  import rightDiv from './../../../../../components/work/StorageReceiptsIntro.vue'
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
        let month = this.result.makeDate.slice(4, 6)
        let day = this.result.makeDate.slice(6, 8)
        let time = year + '-' + month + '-' + day
        return time
      },
      view() {
        let view = !this.showTable
        return view
      }
    },
    created() {
      this.send()
    },
    mounted () {
      console.log(this.$route)
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
        console.log(transdata);
        this.receiptsIntroList = this.$route.query.receiptsIntroList
        this.introListOption = this.$route.query.introListOption
        console.log(111111);
        seekGetStorageData(transdata).then((res) => {
          console.log(res);
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
            // this.rowspanData()
          //  this.subToalClass(this.rowspan)
              this.liColor()
          } else {
             console.log('请求后台数据不成功')
             return
          }
        })
      },
      getData() {
        let receiptsIntroList = sessionStorage.getItem('receiptsIntroList')
        let introListOption = sessionStorage.getItem('introListOption')
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
          let shopName = data[i].productTypeName
          let arrShop = data[i].detailList
          let shop = {}
          for (let i = 0; i < arrShop.length; i++) {
              Vue.set(arrShop[i], 'name', shopName)
          }
          Vue.set(shop, 'type', shopName)
          Vue.set(shop, 'desc', arrShop)
          this.rightTable.push(shop)
         }
         console.log(this.rightTable)
      },
      /**所有list */
      countlist(data) {
        let arrLength = 0
        for (let i = 0; i < data.length; i++) {
          arrLength += data[i].detailList.length
        }
        this.totalList = arrLength
        console.log(arrLength)
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
          if (this.totalList <= 12) {
            tableOne.setAttribute('style', 'width:100%')
            let tableFourwidth = tableFour[0].offsetWidth + 'px'
            let widthStyl = 'width:' + tableFourwidth
            tableFour[0].setAttribute('style', widthStyl)
            scroll.setAttribute('style', '')
          } else {
              scroll.setAttribute('style', 'overflow-y:scroll')
              tableOne.setAttribute('style', 'width:1110px;')
          }
        })
      },
      print() {
        this.showTable = true
        let self = this
        setTimeout(function() {
            window.print()
            self.showTable = false
        }, 77);
      },
      back() {
         this.$router.push({
           path: "/work/storage",
           query: {
            "orderNumber": this.$route.query.orderNumber
           }
         })
      },
      autoBack() {
         this.$router.push({
                path: "/work/storage/detail",
                query: {
                    "orderNumber": this.$route.query.orderNumber,
                    "isRole": this.$route.query.isRole,
                    "isCheckOrderMan": this.$route.query.isCheckOrderMan
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
        background: white
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
      span:nth-child(4) {
        display: inline-block;
        width: 130px;
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
    }
    .total-data{
      margin-top: -3px;
      border-bottom: 1px solid black;
      table{
        td{
          border-left: 1px solid black;
          height: 40px;
          text-align: center;
        }
      }
    }
    .printRemark{
      height: 40px;
      line-height: 40px;
      border-left: 1px solid black;
      border-bottom: 1px solid black;
      span:nth-child(1) {
        display: inline-block;
        width: 350px;
        margin-left: 20px;
      }
      span:nth-child(2){
        margin-left: 220px;
      }
    }
  }
  .rightContent{
    position: absolute;
    top: 70px;
    right: -350px;
  }
}
@media print {
    .transfer {
      position: relative;
      top: 0 !important;
      left: 0!important;
      margin-left: 5px;
      margin-top: 3px;
      margin-right: -10px;
      font-size: 12px !important;
    }
  }
</style>
