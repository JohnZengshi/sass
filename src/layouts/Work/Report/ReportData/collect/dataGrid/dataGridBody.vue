<template>
  <!--表格内容区-->

  <div class="xj-report-table-container con-line" ref="tableContainer">
    <div>
      <!-- 销售 -->
      <div class="tb-category" v-for="(caty, ind) in otherDatagrid" :index="resetIndex(ind)">

        <div class="left-type-name-wrap" :style="getRightH(caty)">
          <p>销售</p>
        </div>

        <div class="right-type-inner-wrap">
          <div v-for="(tb, index) in caty.productTypeList">
            <div class="tb-tr" v-for="(tb1, index1) in tb.detailList" :index="addIndex()">
              <template v-for="(tab, indexGrid) in detailDataGridColumn">
                
<!--                 <div 
                  class="tb-td" 
                  :class="{backLine:tab.childType != ''}" 
                  :style="tableCell(tab.width)" 
                  v-if="tab.text == '类型'">
                  -
                </div> -->
                <div 
                  class="tb-td category-td" 
                  v-if="tab.text == '类型' && index == 0 && index1 == 0 && indexGrid == 0" 
                  :style="tableCell(tab.width)">
                  <i :style="sellTypeNameH(caty)">{{filterName(caty[tab.childType])}}</i>

                </div>

                <div 
                  class="tb-td"
                  v-else-if="tab.text == '产品类别'" 
                  :class="{backLine:tab.childType != ''}" 
                  :style="tableCell(tab.width)" 
                  v-text="tab.childType == ''? getIndex() : tb[tab.childType]">
                </div>

                <div 
                  class="tb-td"
                  v-else 
                  :class="{backLine:tab.childType != ''}" 
                  :style="tableCell(tab.width)" 
                  v-text="tab.childType == ''? getIndex() : tb1[tab.childType]">
                </div>

              </template>
            </div>
            <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>

          </div>
        </div>
        
        <div class="total-num-wrap" v-if="!positionSwitch">
          <div>
            销售合计
          </div>

          <div class="tb-total" style="background:#ECF3FF;">
            <div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :style="tableCell(tab.width)" v-html="f == 0 ? '' : dataGridStorage[tab.type]"></div>
          </div>

        </div>

      </div>
      










    <div class="tb-category" v-if="buyBackDataList.length">

      <div class="left-type-name-wrap" :style="getbuyBackRightH(buyBackDataList)">
        <p>回购</p>
      </div>

      <div class="right-type-inner-wrap">
        <div class="tb-category" v-for="(caty, ind) in buyBackDataList">
          <div v-for="(tb, index) in caty.productTypeList">
            <div class="tb-tr" v-for="(tb1, index1) in tb.detailList" :index="addIndex()">
              <template v-for="(tab, indexGrid) in detailDataGridColumnTwo">
                
                <div 
                  class="tb-td category-td" 
                  v-if="tab.text == '类型' && index == 0 && index1 == 0 && indexGrid == 0" 
                  :style="tableCell(tab.width)">
                  <i :style="sellTypeNameH(caty)">{{caty[tab.childType]}}</i>

                </div>

                <div 
                  class="tb-td"
                  v-else-if="tab.text == '产品类别'" 
                  :class="{backLine:tab.childType != ''}" 
                  :style="tableCell(tab.width)" 
                  v-text="tab.childType == ''? getIndex() : tb[tab.childType]">
                </div>
                
                <div 
                  class="tb-td" 
                  v-else 
                  :class="{backLine:tab.childType != ''}" 
                  :style="tableCell(tab.width)" 
                  v-text="tab.childType == ''? getIndex() : tb1[tab.childType]">
                  
                </div>
              </template>
            </div>

          </div>
          <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
          <div class="tb-total" style="background:#ECF3FF;" v-if="!positionSwitch">
            <!-- 类型小计 -->
            <div class="tb-td" v-for="(tab,f) in detailDataGridColumnTwo" :style="tableCell(tab.width)" v-html="f == 0 ? '<b>小计</b>' : caty[tab.totalType]"></div>
          </div>
        </div>
      </div>

      <div class="total-num-wrap" v-if="!positionSwitch">
        <div>
          回购合计
        </div>

        <div class="tb-total" style="background:#ECF3FF;">
          <div class="tb-td" v-for="(tab,f) in detailDataGridColumnTwo" :style="tableCell(tab.width)" v-html="f == 0 ? '' : buyBackStorage[tab.type]"></div>
        </div>

      </div>

    </div>
  
    <div v-if="isDate" class="no-data"></div>
    </div>
  </div>

</template>

<script>
  let applyIndex = 0
  export default {
    data() {
      return {
        isDate: false,
        tempArray: [],
        heightArr: [],
        otherDatagrid: [],
        buyBackDataList: []
      }
    },
    props: ['detailDataGridColumn', 'detailDataGridColumnTwo', 'dataGridStorage', 'tabCell', 'reportType', 'positionSwitch', 'buyBackStorage'],

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
      filterName (parm) {
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
            console.log('小鸡',this.otherDatagrid)
          }
        }
      },
      reduceAssignbuyBack () {
        if(this.buyBackStorage.productTypeList) {
          if(this.buyBackStorage.productTypeList[0].productSellTypeList) {
            this.buyBackDataList = this.buyBackStorage.productTypeList[0].productSellTypeList
            console.log('小鸡--',this.buyBackDataList)
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
    height: 100%;
    background: url(~static/img/space-page.png) center center no-repeat;
  }
  .left-type-name-wrap{
    position: relative;
    display: inline-block;
    vertical-align:top;
    width: 148px;
    background-color: #f9f9f9;
    border-right: 1px solid #f0f2f5;
    >p{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 16px;
      font-size: 16px;
      // color: #2993f8;
      text-align: center;
      margin: auto;
    }
  }
  .right-type-inner-wrap{
    display: inline-block;
    width: 1100px;
    overflow: hidden;
  }

  .total-num-wrap{
      height: 40px;
      width: 100%;
      background: #ECF3FF;
      margin-top: 1px;
      // border-top: 1px solid #fff;
      >div:first-child{
        float: left;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #2993f8;
        transition: all .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 148px;
      }
    }
</style>