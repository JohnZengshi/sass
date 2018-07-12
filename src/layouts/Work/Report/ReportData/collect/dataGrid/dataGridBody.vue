<template>
  <!--表格内容区-->

  <div class="xj-report-table-container con-line" ref="tableContainer">
    <div>
      <!-- 销售 -->
      <div class="tb-category" v-if="otherDatagrid.length">

        <div class="left-type-name-wrap" :style="getbuyBackRightHX(otherDatagrid)">
          <p>销售</p>
        </div>

          <div class="c-right-type-inner-wrap">
            <div :index="resetIndex(ind)" v-for="(caty, ind) in otherDatagrid">
              <div class="tb-tr"  v-for="(tb, index) in caty.productTypeList">
                <!-- <div class="tb-tr" v-for="(tb1, index1) in tb.detailList" :index="addIndex()"> -->
                  <template v-for="(tab, indexGrid) in detailDataGridColumn">
                    
                    <div 
                      class="branch-tb category-td" 
                      v-if="tab.text == '类型' && index == 0 && indexGrid == 0" 
                      :style="nTableCell(tab)">
                      <i :style="sellTypeNameHX(caty)">{{filterName(caty[tab.childType])}}</i>

                    </div>

                    <div
                      class="tb-td"
                      v-else-if="tab.text == '产品类别'"
                      @click="openLabel({}, tb, '1')"
                      :class="{backLine:tab.childType != ''}" 
                      :style="nTableCell(tab)" 
                      v-text="tab.childType == ''? getIndex() : tb[tab.childType]">
                    </div>
                    
                    <div 
                      class="tb-td" 
                      v-else 
                      :class="{backLine:tab.totalType != ''}" 
                      :style="nTableCell(tab)" 
                      @click="openLabel({}, tb, '1')"
                      v-text="tab.totalType == ''? getIndex() : tb[tab.totalType]">
                      
                    </div>
                  </template>
        <!--         </div> -->

              </div>

              <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>

              <subtotal @changeData="changeData({}, caty, '1')" :detailDataGridColumn="detailDataGridColumn" :caty="caty" :totalType="'totalType'" :name="'小计'"></subtotal>

            </div>
          </div>

        <div class="total-num-wrap" v-if="!positionSwitch">
          <div>
            销售合计
          </div>

          <subtotal :detailDataGridColumn="detailDataGridColumn" :caty="dataGridStorage" :totalType="'type'" :name="''"></subtotal>

        </div>

      </div>
      

    <div class="tb-category" v-if="buyBackDataList.length">

      <div class="left-type-name-wrap" :style="getbuyBackRightHX(buyBackDataList)">
        <p>回购</p>
      </div>

      <div class="c-right-type-inner-wrap">
          <div :index="resetIndex(ind)" v-for="(caty, ind) in buyBackDataList">
            <div class="tb-tr"  v-for="(tb, index) in caty.productTypeList">
              <!-- <div class="tb-tr" v-for="(tb1, index1) in tb.detailList" :index="addIndex()"> -->
                <template v-for="(tab, indexGrid) in detailDataGridColumnTwo">
                  
                  <div 
                    class="branch-tb category-td" 
                    v-if="tab.text == '类型' && index == 0 && indexGrid == 0" 
                    :style="nTableCell(tab)">
                    <i :style="sellTypeNameHX(caty)">{{caty[tab.childType]}}</i>

                  </div>

                  <div
                    class="tb-td"
                    @click="openLabel({}, tb, filterSellType(caty.sellTypeName))" 
                    v-else-if="tab.text == '产品类别'" 
                    :class="{backLine:tab.childType != ''}" 
                    :style="nTableCell(tab)" 
                    v-text="tab.childType == ''? getIndex() : tb[tab.childType]">
                  </div>
                  
                  <div 
                    class="tb-td" 
                    v-else 
                    :class="{backLine:tab.totalType != ''}" 
                    :style="nTableCell(tab)"
                    @click="openLabel({}, tb, filterSellType(caty.sellTypeName))" 
                    v-text="tab.totalType == ''? getIndex() : tb[tab.totalType]">
                    
                  </div>
                </template>
      <!--         </div> -->

            </div>
            <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>

            <!-- 类型小计 -->
            <subtotal  @changeData="changeData({}, caty, filterSellType(caty.sellTypeName))" v-if="!positionSwitch" :detailDataGridColumn="detailDataGridColumnTwo" :caty="caty" :totalType="'totalType'" :name="'小计'"></subtotal>

          </div>
        </div>

      <div class="total-num-wrap" v-if="!positionSwitch">
        <div>
          回购合计
        </div>

        <subtotal v-if="!positionSwitch" :detailDataGridColumn="detailDataGridColumnTwo" :caty="buyBackStorage" :totalType="'type'" :name="''"></subtotal>

      </div>

    </div>
  
    <div v-if="!otherDatagrid.length && !buyBackDataList.length" class="no-data"></div>
    </div>
  </div>

</template>

<script>
  import subtotal from './../../base/subtotal'
  import {calculateClass} from 'assets/js/getClass'
  
  let applyIndex = 0
  export default {
    components: {
      subtotal
    },
    data() {
      return {
        isDate: false,
        tempArray: [],
        heightArr: [],
        otherDatagrid: [],
        buyBackDataList: []
      }
    },
    props: ['detailDataGridColumn', 'detailDataGridColumnTwo', 'dataGridStorage', 'tabCell', 'reportType', 'positionSwitch', 'buyBackStorage', 'dataGridOptions', 'orderType'],

    watch: {
      'dataGridStorage': function() {
        this.tempArray = []
        this.cheackData()
        this.storageFormatDate()
        //console.log(1111)
        this.tabCellHeight()

        this.reduceAssign()
        console.log('这是表格里面的小鸡',this.detailDataGridColumn)
        console.log('这是表格里面的小鸡',this.positionSwitch)
        
      },
      'buyBackStorage':  function() {
        this.reduceAssignbuyBack()
        this.cheackData()
      }
      // 'reportType': function (val) {
      //  //console.log(this.positionSwitch)
      //  this.tabCellHeight()
      // },
      // 'positionSwitch': function (val) {
      //  //console.log(val)
      //  this.tabCellHeight()
      // }
    },
    mounted() {
      let _this = this
      this.$nextTick(() => {

        if(this.dataGridStorage.detailList) {
          this.tempArray = []
          this.cheackData()
          this.storageFormatDate()
        } else {
          // 简化 智能分类、产品分类、自定义三种数据结构
          this.reduceAssign()
        }
        _this.$emit('lazyloadSend', 123)
      })

      $(".xj-report-table-container").mCustomScrollbar({
        theme: "minimal-dark",
        axis: 'y',
        scrollInertia:100, //滚动条移动速度，数值越大滚动越慢
        mouseWheel: {
          scrollAmount: 200,
          preventDefault: false,
          normalizeDelta: false,
          scrollInertia: 0
        },
        callbacks: {
          onTotalScroll: function() {
            if(_this.reportType == 1) {
              _this.$emit('lazyloadSend', {
                refresh: true
              })
            } else {
              //console.log('略略略')
            }
          }
        }
      });
      this.tabCellHeight()
    },
    methods: {
      openLabel (parm, caty, sellType) {
        debugger
        this.$store.dispatch('getLabelData', {
          type: '3',
          data: Object.assign({}, parm, this.dataGridOptions, {
            productTypeId: caty.productTypeId,
            orderType: this.orderType,
            shopId: this.dataGridOptions.shopId,
            sellType: sellType,
          })
        })
      },
      changeData (parm, caty, sellType) {
        let datas = {
          productTypeId: []
        }
        for (let i of caty.productTypeList) {
          datas.productTypeId.push(i.productTypeId)
        }
        this.openLabel(parm, datas, sellType)
      },
      filterSellType (parm) {
        debugger
        switch (parm) {
          case '销售':
            return '1'
          case '退货':
            return '2'
          case '换货':
            return '3'
          case '回收':
            return '4'
        }
      },
      filterName (parm) {
       // return '9000000'
        if (parm == '1') {
          return '计重'
        } else if (parm == '2'){
          return '计件'
        }
      },
      getRightH (parm) {
        let Num = 0
        if (parm) {
          for (let i of parm.productTypeList) {
             Num += 40
            if (i) {

              // if (i.detailList.length) {
              //   Num += 40
              // }

              for (let j of i.detailList) {
                Num += 40
              }

            }
          }
        }

        return {
          'height': Num + 'px'
        }
      },
      getbuyBackRightHX (parm) {
        let Num = 0
        for (let i of parm) {
          Num += 40
          for (let j of i.productTypeList) {
            if (j) {
              Num += 40
              // for (let j of j.detailList) {
              //   Num += 40
              // }
            }
          }
        }

        return {
          'height': Num + 'px'
        }
      },
      // 提取高度
      getbuyBackRightH (parm) {
        let Num = 0
        for (let i of parm) {
          Num += 40
          for (let j of i.productTypeList) {
            if (j) {

              for (let j of j.detailList) {
                Num += 40
              }

            }
          }
        }

        return {
          'height': Num + 'px'
        }
      },
      sellTypeNameHT (parm) {
        let Num = 0
        if (parm) {

          for (let j of parm.detailList) {
            Num += 40
          }
        }

        return {
          'height': Num + 'px'
        }
      },
      sellTypeNameHX (parm) {
        console.log('----------=======parm', parm)
        let Num = 0
        if (parm) {

          for (let j of parm.productTypeList) {
            Num += 40
          }
        }

        return {
          'height': Num + 'px'
        }
      },
      sellTypeNameH (parm) {
        let Num = 0
        if (parm) {
          for (let i of parm.productTypeList) {
            if (i) {

              // if (i.detailList.length) {
              //   Num += 40
              // }

              for (let j of i.detailList) {
                Num += 40
              }

            }
          }
        }

        return {
          'height': Num + 'px'
        }
      },
      //重置index
      resetIndex(index) {
        if(index == 0) applyIndex = 0
      },
      //
      addIndex() {
        applyIndex++
      },

      getIndex() {
        this.$emit('getIndex', applyIndex)
        return applyIndex
      },
      tabCellHeight() {
        this.heightArr = []
        //console.log(this.dataGridStorage)
        if(this.dataGridStorage.dataList) {
          for(let i = 0; i < this.dataGridStorage.dataList.length; i++) {
            let data = 0
            for(let j = 0; j < this.dataGridStorage.dataList[i].productTypeList.length; j++) {
              data += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length * 50
              if(i == 0) {
                //console.log(this.dataGridStorage.dataList[i].productTypeList[j].detailList.length)
              }
            }
            this.heightArr.push(data)
          }
          //console.log(this.heightArr)
        }
      },

      nTableCell (parm) {
        return calculateClass(parm)
      },


      tableCell(width) {
        let _size = ''

        this.$emit('tabCell', {
          width: width,
          res: (res) => {
            _size = res
          }
        })
        return _size
      },

      //格式化
      storageFormatDate() {
        if(this.reportType == 1 && this.dataGridStorage) {
          if(this.dataGridStorage.detailList.length > 0) {
            this.tempArray = this.dataGridStorage.detailList
          }
        }
      },

      cheackData() {
        if(this.dataGridStorage.productTypeList) {
          this.isDate = this.dataGridStorage.productTypeList.length == 0
        } else if(this.dataGridStorage.buyBackList) {
          this.isDate = this.dataGridStorage.buyBackList.length == 0
        } else if(this.dataGridStorage.detailList) {
          this.isDate = this.dataGridStorage.detailList.length == 0
        } else {
          this.isDate = true;
        }
      },
      reduceAssign() {
        if(this.dataGridStorage.productTypeList) {
          if(this.dataGridStorage.productTypeList[0].productSellTypeList) {
            this.otherDatagrid = this.dataGridStorage.productTypeList[0].productSellTypeList
          }
        }
      },
      reduceAssignbuyBack () {
        if(this.buyBackStorage.productTypeList) {
          if(this.buyBackStorage.productTypeList[0].productSellTypeList) {
            this.buyBackDataList = this.buyBackStorage.productTypeList[0].productSellTypeList
          }
        }
      }

    },
    update() {
      console.log('updata')
    }
  }
</script>
<style lang="scss">
  .tb-total {
    .tb-td {
      // b {
      //   color: #333;
      // }
    }
  }
</style>
<style scoped lang="scss">
  .xj-report-table-container {
    height: 565px;
    overflow-y: auto;
    &.produc-line {
      .tb-tr:nth-child(even) {
        background-color: #f9f9f9;
      }
    }
    &.default-line {
      .tb-tr:nth-child(even) {
        background-color: #f9f9f9;
      }
    }
    &.con-line {
      // .tb-tr:nth-child(even) {
      //   .backLine {
      //     background-color: #f9f9f9;
      //   }
      // }
      .tb-category{
        font-size: 0;
      }
    }
    // .tb-tr {
    //   height: 40px;
    //   display: flex;
    //   .tb-td {
    //     float: left;
    //     display: inline-block;
    //     height: 40px;
    //     line-height: 40px;
    //     text-align: center;
    //     font-size: 14px;
    //     font-weight: 500;
    //     transition: all .1s;
    //     white-space: nowrap;
    //     color: #333;
    //     -webkit-font-smoothing: subpixel-antialiased;
    //     text-overflow: ellipsis;
    //     &.category-td {
    //       position: relative;
    //       //overflow: hidden;
    //       text-overflow: ellipsis;
    //       white-space: pre-wrap;
    //       >i {
    //         font-style: normal;
    //         // font-weight: bold;
    //         // color: #248efc;
    //         color: #333;
    //         font-size: 14px;
    //         // font-size: 15px;
    //         position: absolute;
    //         display: flex;
    //         align-items: center;
    //         width: 100%;
    //         left: 0;
    //         top: 0;
    //         text-align: center;
    //         justify-content: center;
    //         background-color: #f9f9f9;
    //       }
    //     }
    //   }
    // }
    // .tb-total {
    //   background-color: #ECF3FF;
    //   height: 40px;
    //   display: flex;
    //   .tb-td {
    //     float: left;
    //     display: inline-block;
    //     height: 40px;
    //     line-height: 40px;
    //     text-align: center;
    //     font-size: 14px;
    //     font-weight: bold;
    //     color: #2993f8;
    //     transition: all .3s;
    //     overflow: hidden;
    //     white-space: nowrap;
    //     text-overflow: ellipsis;
    //     b {
    //       color: #333 !important;
    //     }
    //   }
    // }
  }
  
  .no-data {
    height: 565px;
    background: url(~static/img/space-page.png) center center no-repeat;
  }
  .left-type-name-wrap{
    position: relative;
    display: inline-block;
    vertical-align:top;
    width: 148px;
    // background-color: #f9f9f9;
    background-color: #fff;
    border-right: 1px solid #f0f2f5;
    >p{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 15px;
      font-size: 15px;
      // color: #2993f8;
      text-align: center;
      margin: auto;
    }
  }
  .c-right-type-inner-wrap{
    display: inline-block;
    width: 1095px;
    overflow: hidden;
  }

  // .total-num-wrap{
  //     height: 40px;
  //     width: 100%;
  //     background: #ECF3FF;
  //     margin-top: 1px;
  //     // border-top: 1px solid #fff;
  //     >div:first-child{
  //       float: left;
  //       display: inline-block;
  //       height: 40px;
  //       line-height: 40px;
  //       text-align: center;
  //       font-size: 14px;
  //       font-weight: bold;
  //       color: #2993f8;
  //       transition: all .3s;
  //       overflow: hidden;
  //       white-space: nowrap;
  //       text-overflow: ellipsis;
  //       width: 148px;
  //     }
  //   }
</style>