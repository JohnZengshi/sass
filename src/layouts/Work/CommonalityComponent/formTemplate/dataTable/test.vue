<template>
  <div class="transfer" v-show="rightTable[0]">
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
    <div class="main-table" ref="scroll" style="">
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
            <td style="width:118px">{{subtotalData[index].productTypeName}}</td>
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
    <div class="total-data">
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
        introListOption: ''
      }
    },
    components: {
      rightDiv,
      remark
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
    created() {
      this.getData();
      this.send()
    },
    methods: {
      send() {
      // let orderNum = sessionStorage.getItem("orderNumber")
        let orderNum = sessionStorage.getItem('orderNum')
        let transdata = {
          orderNum: orderNum,
          reportType: '3'
        }
        seekTransferStorageData(transdata).then((res) => {
          if (res.data.state === 200) {
            let shopData = res.data.data
            this.result = shopData
            this.totalNum = parseInt(shopData.totalNum)
            if (this.totalNum === 0) return
            this.rightTableData(shopData.productTypeList)
            this.subToalData(shopData.productTypeList)
            this.rowspanData()
            this.subToalClass(this.rowspan)
            this.liColor()
            this.addScroll()
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
          if (this.totalNum < 12) {
            tableOne.setAttribute('style', 'width:100%')
            let tableFourwidth = tableFour[0].offsetWidth + 10 + 'px'
            let widthStyl = 'width:' + tableFourwidth
            tableFour[0].setAttribute('style', widthStyl)
          } else {
              scroll.setAttribute('style', 'overflow-y: scroll')
          }
        })
      },
      print() {
        this.showTable = true
        let self = this
        setTimeout(function() {
            window.print()
            self.autoBack(self)
        }, 10);
      },
      autoBack(self) {
         self.$router.push({
                path: "/work/transferStorage/newTransferStorage",
                query: {
                    "orderNumber": sessionStorage.getItem('orderNum')
                }
            })
      },
      back() {
         this.$router.push({
           path: "/work/transferStorage/newTransferStorage",
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
}
</style>
