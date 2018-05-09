<template>
  <div class="transfer">
    <div class="data" v-show="!showTable">
      <div class=" navigation">
      <span class="text1" @click="back()">调库单据></span>
      <span class="text2">产品列表</span>
      <button class="text3" @click="print">打印</button>
      <button class="text4" @click="autoBack">返回上一级</button>
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
        <span class="one">调出库位：</span><span class="three">{{result.storageInName}}</span>
      </div>
    </div>
    <div class="title-table">
      <table border="0" cellspacing="0" cellpadding="0" ref="titleTable" style="">
        <tr class="title-tr">
          <td style="width:60px">序号</td>
          <td style="width:100px">产品类型</t>
          <td style="width:118px">首饰名称</td>
          <td style="width:118px">条码号</td>
          <td style="width:120px">净金重(g)</td>
          <td style="width:118px">证书号</td>
          <td style="width:114px">主石</td>
          <td style="width:118px">副石</td>
          <td style="width:126px">售价</td>
          <td style="width:118px">成本</td>
        </tr>
      </table>
    </div>
    <div class="main-table" ref="scroll" style="" v-show="rightTable[0]">
      <div class="index-table clear-fix">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr v-for="(value, index) in totalList" :class="[index%2 != 0 ? 'sendOdd' : 'sendEven' ]">
            <td style="width: 60px">{{index + 1}}</td>
          </tr>
        </table>
      </div>
      <div class="shopName-table clear-fix">
        <table v-for="(tab, index) in rightTable" border="0" cellspacing="0" cellpadding="0">
          <tr class="name">
            <td style="width: 100px" :rowspan="rowspan[index]+1">{{tab.type}}</td>
          </tr>
          <tr v-for="value in tab.desc.length + 1">
            <td></td>
          </tr>
          <tr v-show="index === rightTable.length-1 ? false : true">
                <td class="line"></td>
              </tr>
        </table>
      </div>
      <div class="desc-table">
        <table v-for="(val, index) in rightTable" border="0" cellspacing="0" cellpadding="0" style="" ref="descTable">
          <tr v-for="(shop, index) in  val.desc " :class="[index%2 != 0 ? 'sendOdd' : 'sendEven' ]">
            <td style="width:118px">{{shop.jewelryName}}</td>
            <td style="width:118px">{{shop.barcode}}</td>
            <td style="width:120px">{{shop.goldWeight}}</td>
            <td style="width:118px">{{shop.certificateCode}}</td>
            <td style="width:114px">{{shop.main}}</td>
            <td style="width:118px">{{shop.deputy}}</td>
            <td style="width:126px">{{shop.price}}</td>
            <td style="width:118px">{{shop.cost}}</td>
          </tr>
          <!-- 小计 -->
          <tr ref="subtotalStyl">
            <td style="width:118px">小计</td>
            <td style="width:118px"></td>
            <td style="width:120px">{{subtotalData[index].subtotalGoldWeight}}</td>
            <td style="width:118px"></td>
            <td style="width:114px">{{subtotalData[index].subtotalMain}}</td>
            <td style="width:118px">{{subtotalData[index].subtotalDeputy}}</td>
            <td style="width:126px">{{subtotalData[index].subtotslPrice}}</td>
            <td style="width:118px">{{subtotalData[index].subtotalCost}}</td>
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
      <span>接收人：</span>
      <span>{{result.takeManName}}</span>
      <span>制单时间：</span>
      <span>{{makeDate}}</span>
    </div>
    </div> 
    </div>
<!-- 打印模块 -->
    <div class="print-content" @click="print" v-show="showTable" ref="printContent">
      <div class="company">
        <span>公司名称：</span>
        <span>{{result.companyName}}</span>
      </div>
      <div class="goods-desc">
        <div class="desc-one">
          <span class="one">单&nbsp;&nbsp;据&nbsp;号：</span><span class="two">{{result.orderNum}}</span>
        </div>
        <div class="desc-two">
          <span class="one">调出库位：</span><span class="three">{{result.storageName}}</span>
        </div>
      </div>
      <div class="title-table">
        <table border="0" cellspacing="0" cellpadding="0" style="">
          <tr class="title-tr">
            <td style="width: 100px">序号</td>
            <td style="width: 130px">产品类型</td>
            <td style="width: 130px">首饰名称</td>
            <td style="width: 120px">条码号</td>
            <td style="width: 110px">净金重</td>
            <td style="width: 100px">证书号</td>
            <td style="width: 100px">主石</td>
            <td style="width: 100px">副石</td>
            <td style="width: 110px">售价</td>
            <td style="width: 100px">成本</td>
          </tr>
        </table>
      </div>
      <div class="main-table" v-show="rightTable[0]">
        <div class="index-table clear-fix">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr v-for="(value, index) in totalList" :class="[index%2 != 0 ? 'sendOdd' : 'sendEven' ]">
              <td style="width: 99px">{{index + 1}}</td>
            </tr>
          </table>
        </div>
        <div class="shopName-table clear-fix">
          <table v-for="(tab, index) in rightTable" border="0" cellspacing="0" cellpadding="0">
            <tr class="name">
              <td style="width: 130px" :rowspan="rowspan[index]+1">{{tab.type}}</td>
            </tr>
            <tr v-for="value in tab.desc.length + 1">
              <td></td>
            </tr>
          </table>
        </div>
        <div class="desc-table">
          <table v-for="(val, index) in rightTable" border="0" cellspacing="0" cellpadding="0" style="" ref="descTable">
            <tr v-for="(shop, index) in  val.desc " :class="[index % 2 != 0 ? 'sendOdd' : 'sendEven' ]">
              <td style="width:130px;">{{shop.jewelryName}}</td>
              <td style="width:120px">{{shop.barcode}}</td>
              <td style="width:110px">{{shop.goldWeight}}</td>
              <td style="width:100px">{{shop.certificateCode}}</td>
              <td style="width:100px">{{shop.main}}</td>
              <td style="width:100px">{{shop.deputy}}</td>
              <td style="width:110px">{{shop.price}}</td>
              <td style="width:100px">{{shop.cost}}</td>
            </tr>
            <!-- 打印模块小计 -->
            <tr ref="subtotalStyl">
              <td style="width:130px">小计</td>
              <td style="width:120px"></td>
              <td style="width:110px">{{subtotalData[index].subtotalGoldWeight}}</td>
              <td style="width:100px"></td>
              <td style="width:100px">{{subtotalData[index].subtotalMain}}</td>
              <td style="width:100px">{{subtotalData[index].subtotalDeputy}}</td>
              <td style="width:110px">{{subtotalData[index].subtotslPrice}}</td>
              <td style="width:100px">{{subtotalData[index].subtotalCost}}</td>
            </tr>
          </table>
        </div>
        <div class="total-data">
          <table cellspacing="0" cellpadding="0" >
            <tr>
            <td style="width: 99px;"></td>
            <td style="width:130px">合计</t>
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
        <div class="remark">
          <span>备注：{{result.remark}}</span>
          <span>制单时间:{{makeDate}}</span>
        </div>
        <div class="people">
          <span>制单人：{{result.makeManName}}</span>
          <span style="float:right; margin-right:20px; width:175px; display:block;">接收人：{{result.takeManName}}</span>
        </div>
      </div>
    </div>
    <!-- <div class="rightContent" v-show="!showTable">
      <rightDiv :receiptsIntroList="receiptsIntroList" :introListOption="introListOption" :toRouter='"/work/storage"'></rightDiv>
      <remark @refresh="refreshView"></remark>
    </div>  -->
  </div>
</template>
<script>
  import Vue from 'vue'
  import {seekTransferStorageData} from './../../../../../Api/commonality/operate'
  import rightDiv from './../../../../../components/work/TransferStorageReceiptsIntro.vue'
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
        receiptsIntroList: '',
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
      }
    },
    created() {
      this.getData();
      this.send()
    },
    methods: {
      refreshView (val) {
        // console.log(val)
        this.send()
      },
      send() {
      // let orderNum = sessionStorage.getItem("orderNumber")
        let orderNum = sessionStorage.getItem('orderNum')
        let transdata = {
          orderNum: orderNum,
          reportType: '3'
        }
        console.log('33263232323333333')
        console.log(this.$route.query.orderNumber)
        seekTransferStorageData(transdata).then((res) => {
          console.log(res.data)
          console.log(2333332333233)
          if (res.data.state === 200) {
            let shopData = res.data.data
            this.result = shopData
            console.log(res.data)
            this.totalNum = parseInt(shopData.totalNum)
            if (this.totalNum === 0) return
            this.rightTableData(shopData.productTypeList)
            this.subToalData(shopData.productTypeList)
            this.rowspanData()
            this.subToalClass(this.rowspan)
            this.liColor()
            this.addScroll()
            console.log(this.rightTable)
          } else {
             console.log('请求后台数据不成功')
             return
          }
        })
      },
      totalList() {
        console.log(58585858)
      },
      getData() {
        let receiptsIntroList = sessionStorage.getItem('receiptsIntroList')
        let introListOption = sessionStorage.getItem('introListOption')
        this.receiptsIntroList = JSON.parse(receiptsIntroList)
        this.introListOption = introListOption
      },
      /** 获得右边两张表的数据 */
      rightTableData(data) {
        let totalList = 0
         for (let i = 0; i < data.length; i++) {
          let shopNmae = data[i].productTypeName
          let arrShop = data[i].detailList
          let shop = {}
          Vue.set(shop, 'type', shopNmae)
          Vue.set(shop, 'desc', arrShop)
          this.rightTable.push(shop)
         }
         for (let i = 0; i < data.length; i++) {
            totalList += data[i].detailList.length
         }
         totalList += data.length
         this.totalList = totalList
      },
       /** 获得合并单元格的数据 */
      rowspanData() {
        let rightTableLen = this.rightTable.length
        for (let i = 0; i < rightTableLen; i++) {
          let rowspanVal = this.rightTable[i].desc.length + 1
          this.rowspan.push(rowspanVal)
        }
      },
      /** 获得小计数据 */
      subToalData(data) {
        let subTotalDataLen = data.length
        for (let i = 0; i < subTotalDataLen; i++) {
          let subtotalData = {
            productTypeId: data[i].productTypeId,
            productTypeName: data[i].productTypeName,
            subtotalNum: data[i].subtotalNum,
            subtotalGoldWeight: data[i].subtotalGoldWeight,
            subtotalWeight: data[i].subtotalWeight,
            subtotalMain: data[i].subtotalMain,
            subtotalDeputy: data[i].subtotalDeputy,
            subtotalCost: data[i].subtotalCost,
            subtotalPrice: data[i].subtotalPrice
          }
          this.subtotalData.push(subtotalData)
        }
      },
      /**动态改变小计一栏的style */
      subToalClass(data) {
        this.$nextTick(() => {
          let subtotalClass = this.$refs.subtotalStyl
          for (let i = 0; i < data.length; i++) {
            if (data[i] % 2 !== 0) {
              subtotalClass[i].className = "subtotalEven"
            } else {
              subtotalClass[i].className = "subtotalOdd"
            }
          }
        })
      },
      /** 改变空li的背景色 */
        liColor() {
        this.$nextTick(() => {
          let liClass = this.$refs.liClass
          for (let i = 0; i < liClass.length; i++) {
            if (this.totalNum % 2 !== 0) {
              if (i % 2 === 0) {
                liClass[i].className = 'liEven'
              } else {
                liClass[i].className = 'liOdd'
              }
            } else if (i % 2 === 0) {
              liClass[i].className = 'liOdd'
            } else {
              liClass[i].className = 'liEven'
            }
          }
        })
      },
      /** 添加滚动style,并改变表格宽度 **/
      addScroll() {
        this.$nextTick(() => {
          let tableOne = this.$refs.titleTable
          let tableFour = this.$refs.descTable
          let scroll = this.$refs.scroll
          if (this.totalList <= 12) {
            tableOne.setAttribute('style', 'width:100%')
            let tableFourwidth = tableFour[0].offsetWidth + 10 + 'px'
            let widthStyl = 'width:' + tableFourwidth
            tableFour[0].setAttribute('style', widthStyl)
          } else {
              console.log(52525252525252525)
              scroll.setAttribute('style', 'overflow-y: scroll')
          }
        })
      },
      print() {
        this.showTable = true
            let self = this
        setTimeout(function() {
            window.print()
            self.showTable = false
        }, 10);
      },
      autoBack() {
         this.$router.push({
                path: "/work/transferStorage/newTransferStorage",
                query: {
                    "orderNumber": sessionStorage.getItem('orderNum'),
                    "isRole": this.$route.query.isRole,
                    "isCheckOrderMan": this.$route.query.isCheckOrderMan
                }
            })
      },
      back() {
         this.$router.push({
           path: "/work/transferStorage",
           query: {
            "orderNumber": sessionStorage.getItem('orderNum')
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
      width: 230px;
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
      box-shadow: none;
      margin: 0;
      width: 1110px;
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
      float: left;
      table{
        box-shadow: none;
        margin: 0;
        border-radius: 0;
        td{
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: black;
        }
      }
      .sendEven{
        background: white
      }
      .sendOdd{
        background: #F6F7F9;
      }
    }
    .shopName-table{
      float: left;
      table{
        box-shadow: none;
        margin: 0;
        border-radius: 0;
        td{
          height: 30px;
          line-height: 30px;
          color: black;
          background: #EOE1E4;
          text-align: center;
        }
      }
      .line{
        height: 1px;
        width: 100%;
        background: white;
      }
    }
    .desc-table{
      table{
        box-shadow: none;
        margin: 0;
        border-radius: 0;
        td{
          text-align: center;
          height: 30px;
          line-height: 30px;
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
    .empty{
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
  /** 打印模块 */
  .print-content{
    width: 1100px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    .company{
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left: 17px;
      position: relative;
      border-bottom: 1px solid black;
      border-left: 1px solid black;
      span:nth-child(1) {
        margin-left: 5px;
      }
      span:nth-child(2) {
        display: inline-block;
        width: 300px;
      }
      span:nth-child(3) {
        position: absolute;
        right: 50px;
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
      .desc-two {
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        border-bottom: 1px solid black;
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
    }
    .title-table{
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
      position: relative;
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
        table{
          td{
            height: 40px;
            text-align: center;
            color: black;
            border-left: 1px solid black;
            border-bottom: 1px solid black;
          }
        }
      }
      .shopName-table{
        display: inline-block;
        position: absolute;
        border-left: 1px solid black;
        left: 99px;
        top: 0;
        table{
          td{
            height: 40px;           
            color: black;
            text-align: center;
            border-bottom: 1px solid black;
          }
        }
        .line{
          height: 1px;
          width: 100%;
          background: white;
        }
      }
      .desc-table{
        display: inline-block;
        position: absolute;
        top: 0;
        left: 229px;
        table{
          tr{
            td{
              border-left: 1px solid black; 
              text-align: center;
              height: 40px;
              border-bottom: 1px solid black;
           }
          }
        }
    }
    .total-data{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid black;
      table{
        tr{
            td{
           border-left: 1px solid black;   
          text-align: center;
        }   
        }
      }
    }
    .remark {
      position: relative;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid black;
      border-left: 1px solid black;
      span:nth-child(1) {
        display: inline-block;
        margin-left: 20px;
        width: 350px;
        height: 100%
      }
      span:nth-child(2) {
        position: absolute;
        right: 80px;
      }
    }
    .people{
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-left: 1px solid black;
      border-bottom: 1px solid black;
      span:nth-child(1) {
        margin:0 100px 0 20px;
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
  }
}
@media print {
    .transfer {
      position: relative;
      top: 0 !important;
      left: 0!important;
      margin-top: 5px;
      margin-left: 5px;
    }
  }
</style>
