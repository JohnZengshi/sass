<template>
    <div class="printRK" @click="print">
        <div class="company">
            <span>公司名称</span>
            <span>{{result.companyName}}</span>
            <span>制单时间</span>
            <span>{{makeDate}}</span>
        </div>
        <div class="goods-desc">
            <div class="desc-one">
                <span class="one">单&nbsp;&nbsp;据&nbsp;号</span><span class="two">{{result.orderNum}}</span><span  class="one">供&nbsp;&nbsp;应&nbsp;商</span><span class="two">{{result.storageOutName}}</span>
            </div>
            <div class="desc-two">
            <span class="one">退库单位</span><span class="three">{{result.storageInName}}</span><span  class="one">商品属性</span><span class="two">{{result.orderNum}}</span>
            </div>
        </div>
        <div class="title-table">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr class="title-tr">
                <td style="width:30px">序号</td>
                <td style="width:60px">产品类型</t>
                <td style="width:80px">首饰名称</td>
                <td style="width:50px">条码号</td>
                <td style="width:50px">净金重(g)</td>
                <td style="width:50px">证书号</td>
                <td style="width:50px">主石</td>
                <td style="width:50px">副石</td>
                <td style="width:50px">售价</td>
                <td style="width:50px">成本</td>
                </tr>
            </table>
        </div>
        <div class="main-table">
            <div class="index-table clear-fix">
                <table border="0" cellspacing="0" cellpadding="0">
                <tr v-for="(value, index) in totalNum+1">
                    <td style="width: 46px">{{index + 1}}</td>
                </tr>
                </table>
            </div>
            <div class="shopName-table clear-fix">
                <table v-for="(tab, index) in rightTable" border="0" cellspacing="0" cellpadding="0">
                <tr class="name">
                    <td style="width: 91px" :rowspan="rowspan[index]+1">{{tab.type}}</td>
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
                <table v-for="(val, index) in rightTable" border="0" cellspacing="0" cellpadding="0">
                <tr v-for="(shop, index) in  val.desc ">
                    <td style="width:123px">{{shop.jewelryName}}</td>
                    <td style="width:77px">{{shop.barcode}}</td>
                    <td style="width:77px">{{shop.goldWeight}}</td>
                    <td style="width:77px">{{shop.certificateCode}}</td>
                    <td style="width:77px">{{shop.main}}</td>
                    <td style="width:77px">{{shop.deputy}}</td>
                    <td style="width:77px">{{shop.price}}</td>
                    <td style="width:77px">{{shop.cost}}</td>
                </tr>
                <!-- 小计 -->
                <tr ref="subtotalStyl">
                    <td style="width:50px">{{subtotalData[index].productTypeName}}</td>
                    <td style="width:50px"></td>
                    <td style="width:50px">{{subtotalData[index].subtotalGoldWeight}}</td>
                    <td style="width:50px"></td>
                    <td style="width:50px">{{subtotalData[index].subtotalMain}}</td>
                    <td style="width:50px">{{subtotalData[index].subtotalDeputy}}</td>
                    <td style="width:50px">{{subtotalData[index].subtotslPrice}}</td>
                    <td style="width:50px">{{subtotalData[index].subtotalCost}}</td>
                </tr>
                </table>
            </div>
            <div class="empty" v-if="totalNum < 12">
                <ul>
                <li v-for="value in emptyNum" ref="liClass"></li>
                </ul>
            </div>
        </div>
        <div class="total-data">
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                <td style="width:46px">合计</td>
                <td style="width:92px"></t>
                <td style="width:123px"></td>
                <td style="width:77px"></td>
                <td style="width:77px">{{result.totalGoldWeight}}</td>
                <td style="width:77px"></td>
                <td style="width:77px">{{result.totalMain}}</td>
                <td style="width:77px">{{result.totalDeputy}}</td>
                <td style="width:77px">{{result.totalPrice}}</td>
                <td style="width:77px">{{result.totalCost}}</td>
                </tr>
            </table>
        </div>
        <div class="remark">
            <span>备注:</span>
            <span>制单时间:{{makeDate}}</span>
        </div>
        <div class="make">
            <span>制单人</span>
            <span>接收人</span>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import {seekTransferStorageData} from './../../../Api/commonality/operate'
export default {
    data() {
        return {
            orderNumber: '',
            totalNum: '',
            result: [],
            rightTable: [],
            rowspan: [],
            subtotalData: []
        }
    },
    created () {
        console.log('我开始实例化了')
        this.send()
        this.$nextTick(() => {
        })
    },
    computed: {
      emptyNum() {
        if (this.totalNum > 12) return 0
        let val = 12 - this.totalNum - 1
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
    methods: {
        send() {
            let orderNum = sessionStorage.getItem('orderNum')
            let par = {
                orderNum: orderNum,
                reportType: 3
            }
        seekTransferStorageData(par).then((res) => {
          if (res.data.state === 200) {
            let shopData = res.data.data
            this.result = shopData
            this.totalNum = parseInt(shopData.totalNum)
            if (this.totalNum === 0) return
            this.rightTableData(shopData.productTypeList)
            this.subToalData(shopData.productTypeList)
            this.rowspanData()
            this.subToalClass(this.rowspan)
          } else {
             console.log('请求后台数据不成功')
             return
          }
        })
        },
         /** 获得右边两张表的数据 */
      rightTableData(data) {
         for (let i = 0; i < data.length; i++) {
          let shopNmae = data[i].detailList[0].main
          let arrShop = data[i].detailList
          let shop = {}
          Vue.set(shop, 'type', shopNmae)
          Vue.set(shop, 'desc', arrShop)
          this.rightTable.push(shop)
         }
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
      print() {
         console.log(20000)
         window.print()
        },
      goBack() {
             this.$router.push({
                path: "/work/transferStorage",
                query: {
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
  .printRK{
      border: 1px solid #000000;
      .company{
          position: relative;
          height: 40px;
          line-height: 40px;
          font-size: 0px;
          color: #000000;
          border-bottom: 1px solid #000000;
    }
      .company span:nth-child(1){
          font-size: 14px;
          margin-right: 20px;
    }
    .company span:nth-child(2){
      font-size: 14px;
      margin-right: 20px;
    }
    .company span:nth-child(3){
      position: absolute;
      right: 15%;
      font-size: 14px;
    }
    .company span:nth-child(4){
      position: absolute;
      right: 3%;
      font-size: 14px;
    }
    .goods-desc{
      width: 100%;
      height: 80px;
      font-size: 0;
      padding: 10px 0 0 0;
      background: white;
      border-bottom: 1px solid black;
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
      background: #F6F7F9;
      line-height: 40px;
      font-size: 14px;
      color: #4FDCCB;
      border-bottom: 1px solid black;
      font-weight: 600;
      table{
        width: 800px;
        box-shadow: none;
        margin: 0;
        td{
          line-height: 40px;
          height: 40px;
          text-align: center;
          border-right: 1px solid black;
        }
      }
    }
    .main-table{
      font-size: 12px;
      border-bottom: 1px solid black;
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
            border-right: 1px solid black;
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
          border-right: 0.5px solid black;
          box-shadow: none;
          margin: 0;
          border-radius: 0;
          td{
            height: 30px;
            line-height: 30px;
            color: black;
            text-align: center;
            border-collapse:collapse;
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
            border-right: 1px solid black;
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
    }
    .total-data{
      border-bottom: 1px solid black;
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
          border-right: 1px solid black;
        }
      }
    }
    .remark{
        position: relative;
        border-bottom: 1px solid black;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        span:nth-child(1) {
            margin-left: 10px;
        }
        span:nth-child(2) {
            position: absolute;
            right: 50px;
        }
    }
    .make{
          height: 60px;
          line-height: 60px;
          position: relative;
          span:nth-child(1) {
              margin-left: 10px;
          }
          span:nth-child(2) {
            position: absolute;
            left: 350px;
          }
    }
  }
</style>
