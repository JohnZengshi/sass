<template>
  <!--表格内容区-->
  <!--明细-->
  <div class="xj-report-table-container" ref="tableContainer" v-if="reportType == 1">
    <div>
      <div class="tb-tr" v-for="(tb,index) in tempArray" :key="index">
        <template v-for="(tab,indexs) in detailDataGridColumn">
          <div class="tb-td" :key="indexs" :style="_calculateClass(tab)" v-text="tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType] ? tb[tab.childType]: '-'"></div>
        </template>
      </div>
      <div v-if="isDate" class="no-data"></div>
    </div>
  </div>

 
  <div class="xj-report-table-container" ref="tableContainer" v-else-if="reportType == 3">
    <div>
        <div class="tb-category" v-for="(caty, ind) in otherDatagrid">
          <div v-for="(tb, index) in caty.productTypeList">
            <div class="tb-tr" v-if="index1 == 0" v-for="(tb1, index1) in tb.detailList" :index="addIndex()">
              <template v-for="(tab, indexGrid) in detailDataGridColumn">

                <div 
                  class="branch-tb category-td" 
                  v-if="tab.text == '回购类型' && index == 0 && index1 == 0 && indexGrid == 0" 
                  :style="_calculateClass(tab)">
                  <i :style="sellTypeNameH(caty)">{{caty[tab.childType]}}</i>

                </div>


                <div 
                  class="tb-td" 
                  v-else-if="tab.text == '产品类别' && index1 == 0"
                  :class="{backLine:tab.childType != ''}" 
                  :style="_calculateClass(tab)" 
                  >
                  {{tb[tab.childType]}}
                </div>
                
                <div
                  class="tb-td" 
                  v-else
                  :class="{backLine:tab.childType != ''}" 
                  :style="_calculateClass(tab)" 
                  v-text="tab.childType == ''? getIndex() : tb[tab.totalType] ? tb[tab.totalType] : '-' ">
                  
                </div>
              </template>
            </div>

          </div>
          <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
          <div class="tb-total" style="background:#ECF3FF;" v-if="!positionSwitch">
            <!-- 类型小计 -->
            <div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :style="_calculateClass(tab)" v-html="f == 0 ? '<b>小计</b>' : caty[tab.allTotal]"></div>
          </div>
        </div>
      <div v-if="isDate" class="no-data"></div>
    </div>
  </div>

  <div class="xj-report-table-container" ref="tableContainer" v-else>
    <div>
        <div class="tb-category" v-for="(caty, ind) in otherDatagrid">
          <div v-for="(tb, index) in caty.productTypeList">

            <div class="tb-tr" v-for="(tb1, index1) in tb.detailList" :index="addIndex()">
              <template v-for="(tab, indexGrid) in detailDataGridColumn">

                <div 
                  class="branch-tb category-td" 
                  v-if="tab.text == '回购类型' && index == 0 && index1 == 0 && indexGrid == 0" 
                  :style="_calculateClass(tab)">
                  <i :style="sellTypeNameHD(caty)">{{caty[tab.childType]}}</i>

                </div>


              <div class="branch-tb category-td" :key="index" v-else-if="tab.text == '产品类别' && index1 == 0" :style="_calculateClass(tab)">
                <i :style="'height:'+ tb.detailList.length * 40 +'px;'">{{tb[tab.childType]}}</i>
              </div>

<!--                 <div 
                  class="branch-tb category-td" 
                  v-else-if="tab.text == '产品类别'" 
                  :style="_calculateClass(tab)">
                  <i :style="sellTypeNameXJ(tb)">{{tab.childType}}</i>

                </div> -->
<!-- 
                <div 
                  class="tb-td" 
                  v-else-if="tab.text == '产品类别'"
                  :class="{backLine:tab.childType != ''}"
                  :style="_calculateClass(tab)" 
                  >
                  {{tb[tab.childType]}}
                </div> -->
                
                <div 
                  class="tb-td" 
                  v-else 
                  :class="{backLine:tab.childType != ''}" 
                  :style="_calculateClass(tab)" 
                  v-text="tab.childType == ''? getIndex() : tb1[tab.childType] ? tb1[tab.childType] : '-' ">
                  
                </div>
              </template>
            </div>
            
            <div class="tb-total" style="background:#ECF3FF;">
              <div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :style="_calculateClass(tab)" v-html="f == 1 ? '<b>小计</b>' : tb[tab.totalType]"></div>
            </div>

          </div>
          <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
          <div class="tb-total" style="background:#ECF3FF;margin-top: 2px;" v-if="!positionSwitch">
            <!-- 类型小计 -->
            <div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :style="_calculateClass(tab)" v-html="f == 0 ? `<b>${caty[tab.childType]}小计</b>` : caty[tab.allTotal]"></div>
          </div>
        </div>
      <div v-if="isDate" class="no-data"></div>
    </div>
  </div>

</template>

<script>
  import {calculateClass} from 'assets/js/getClass'
  let applyIndex = 0
  export default {
    data() {
      return {
        isDate: false,
        tempArray: [],
        heightArr: [],
        otherDatagrid: []
      }
    },
    props: ['detailDataGridColumn', 'dataGridStorage', 'tabCell', 'reportType', 'positionSwitch'],

    watch: {
      'dataGridStorage': function() {
        this.tempArray = []
        this.cheackData()
        this.storageFormatDate()
        //console.log(1111)
        this.tabCellHeight()
        if(this.reportType > 1){
          this.reduceAssign()
        }
      }
    },
    mounted() {
      
      let _this = this
      this.$nextTick(() => {
        // console.log(1111, this.dataGridStorage.productTypeList)

        if(this.reportType == 1 && this.dataGridStorage.detailList) {
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
                normalizeDelta: true,
                scrollInertia : 40
        },
        callbacks: {
          onTotalScroll: function () {
          // console.log('滚轮到底了')
          $('.loadControl').css({
            opacity:1
          })
                },
        onUpdate(){
          // console.log('滚动条更新')
          $('.loadControl').css({
            opacity:0
          })
        },
        whileScrolling(){
          // console.log('滚动条活动')
          $('.loadControl').css({
            opacity:0
          })
        }
        }
      });
      this.tabCellHeight()
    },
    methods: {
      _calculateClass (parm) {
        return calculateClass(parm)
      },
      sellTypeNameH (parm) {
        let Num = 0
        if (parm) {
          for (let i of parm.productTypeList) {
            if (i) {
              Num += 40
              // if (i.detailList.length) {
              //   Num += 40
              // }

              // for (let j of i.detailList) {
              //   Num += 40
              // }

            }
          }
        }

        return {
          'height': Num + 'px'
        }
      },
      sellTypeNameHD (parm) {
        let Num = 0
        if (parm) {
          for (let i of parm.productTypeList) {
            if (i) {
              Num += 40
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
      sellTypeNameXJ (parm) {
        let Num = 0
        for (let j of parm) {
          Num += 40
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
              data += this.dataGridStorage.dataList[i].productTypeList[j].detailList.length * 40
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
      
      //
      reduceAssign(){
        if(this.dataGridStorage.productTypeList) {
          if(this.dataGridStorage.productTypeList[0].productSellTypeList) {
            this.otherDatagrid = this.dataGridStorage.productTypeList[0].productSellTypeList
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
      color: #333;
      b {
        color: #2993f8;
      }
    }
  }
</style>
<style scoped lang="scss">
.xj-report-table-container {
  height: 556px;
}
  .no-data {
    height: 100%;
    background: url(~static/img/space-page.png) center center no-repeat;
  }
</style>