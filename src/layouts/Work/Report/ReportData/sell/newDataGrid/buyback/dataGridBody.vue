<template>
  <!--表格内容区-->
  <!--明细-->
  <div @scroll="watchScroll($event)" class="xj-report-table-container" ref="tableContainer" v-if="reportType == 1">
    <div>
      <div class="tb-tr" v-for="(tb,index) in tempArray" :key="index">
        <template v-for="(tab,indexs) in detailDataGridColumn">
          <!--<div class="branch-tb category-td"
          v-if="tab.text == '回购类型'" 
          :style="tableCell(tab.width)" >
          <i :style="'height:'+ tb.detailList.length * 40 +'px;  background: #f9f8e7;'">{{caty[tab.childType]}}</i>
        </div>-->

          <div class="tb-td" :key="indexs" :style="tableCell(tab.width)" v-text="tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType] ? tb[tab.childType]: '-'"></div>
        </template>
      </div>
      <!-- 加载更多未读数据 -->
      <ReadMoreData
        :allData="dataGridStorage" 
        :dgDataList="dataGridStorage.detailList" 
        ref="ReadMoreDataDmo" 
        @readMoreData="readMoreData"
        ></ReadMoreData>
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
                  :style="tableCell(tab.width)">
                  <i :style="sellTypeNameH(caty)">{{caty[tab.childType]}}</i>

                </div>


                <div 
                  class="tb-td" 
                  v-else-if="tab.text == '产品类别' && index1 == 0"
                  :class="{backLine:tab.childType != ''}" 
                  :style="tableCell(tab.width)" 
                  >
                  {{tb[tab.childType]}}
                </div>
                
                <div
                  class="tb-td" 
                  v-else
                  :class="{backLine:tab.childType != ''}" 
                  :style="tableCell(tab.width)" 
                  v-text="tab.childType == ''? getIndex() : tb[tab.totalType] ? tb[tab.totalType] : '-' ">
                  
                </div>
              </template>
            </div>

          </div>
          <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
          <div class="tb-total" style="background:#ECF3FF;" v-if="!positionSwitch">
            <!-- 类型小计 -->
            <div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :style="tableCell(tab.width)" v-html="f == 0 ? '<b>小计</b>' : caty[tab.allTotal]"></div>
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
                  :style="tableCell(tab.width)">
                  <i :style="sellTypeNameHD(caty)">{{caty[tab.childType]}}</i>

                </div>


              <div class="branch-tb category-td" :key="index" v-else-if="tab.text == '产品类别' && index1 == 0" :style="tableCell(tab.width)">
                <i :style="'height:'+ tb.detailList.length * 40 +'px;'">{{tb[tab.childType]}}</i>
              </div>

<!--                 <div 
                  class="branch-tb category-td" 
                  v-else-if="tab.text == '产品类别'" 
                  :style="tableCell(tab.width)">
                  <i :style="sellTypeNameXJ(tb)">{{tab.childType}}</i>

                </div> -->
<!-- 
                <div 
                  class="tb-td" 
                  v-else-if="tab.text == '产品类别'"
                  :class="{backLine:tab.childType != ''}"
                  :style="tableCell(tab.width)" 
                  >
                  {{tb[tab.childType]}}
                </div> -->
                
                <div 
                  class="tb-td" 
                  v-else 
                  :class="{backLine:tab.childType != ''}" 
                  :style="tableCell(tab.width)" 
                  v-text="tab.childType == ''? getIndex() : tb1[tab.childType] ? tb1[tab.childType] : '-' ">
                  
                </div>
              </template>
            </div>
            
            <div class="tb-total" style="background:#ECF3FF;">
              <div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :style="tableCell(tab.width)" v-html="f == 1 ? '<b>小计</b>' : tb[tab.totalType]"></div>
            </div>

          </div>
          <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
          <div class="tb-total" style="background:#ECF3FF;margin-top: 2px;" v-if="!positionSwitch">
            <!-- 类型小计 -->
            <div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :style="tableCell(tab.width)" v-html="f == 0 ? `<b>${caty[tab.childType]}小计</b>` : caty[tab.allTotal]"></div>
          </div>
        </div>
      <div v-if="isDate" class="no-data"></div>
    </div>
  </div>

</template>

<script>
  let applyIndex = 0
  import ReadMoreData from 'components/work/readMoreData.vue'
  export default {
    data() {
      return {
        isDate: false,
        tempArray: [],
        heightArr: [],
        otherDatagrid: []
      }
    },
    components:{
      ReadMoreData
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

      // $(".xj-report-table-container").mCustomScrollbar({
      //   theme: "minimal-dark",
      //   axis: 'y',
      //   scrollInertia:100,
      //   mouseWheel: {
      //     scrollAmount: 200,
      //           preventDefault: false,
      //           normalizeDelta: true,
      //           scrollInertia : 40
      //   },
      //   callbacks: {
      //     onTotalScroll: function () {
      //     $('.loadControl').css({
      //       opacity:1
      //     })
      //           },
      //   onUpdate(){
      //     $('.loadControl').css({
      //       opacity:0
      //     })
      //   },
      //   whileScrolling(){
      //     $('.loadControl').css({
      //       opacity:0
      //     })
      //   }
      //   }
      // });
      this.tabCellHeight()
    },
    methods: {
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
      },
      //  监听表格滚动
      watchScroll(el) { // 下拉加载数据
        let scrollHeight = el.target.scrollHeight; // 元素可以滚动的高度
        let clientHeight = el.target.clientHeight; // 元素的高度
        let scrollTop = el.target.scrollTop; // 滚动了的距离
        if (this.$refs.ReadMoreDataDmo) {
          let res = this.$refs.ReadMoreDataDmo.isShowMoreDataTip(scrollHeight, clientHeight, scrollTop);
          if(res){
            this.readMoreData();
          }
        }
      },

      //加载更多数据
      readMoreData(currentDataList) {
        let totalNum = this.dataGridStorage.totalNum;
        let length = this.dataGridStorage.detailList.length;
        let upDataNum = this.$parent.$parent.$refs["LoaderNum"].pageSize;
        this.pageNum = 1;
        let pageSize = 30
        //   this.dgDataList = [];
        if (Number(upDataNum)) {
          upDataNum = Number(upDataNum);
          if (totalNum - length < upDataNum) {
            pageSize = 0
          } else {
            pageSize = length + upDataNum
          }
        } else {
          pageSize = 0
        }
        //   this.$parent.$parent
        // console.log(pageSize);
        this.$parent.$parent.dataGridOptions.pageSize = pageSize;
        this.$parent.$parent.send();
        // console.log(this.$parent.$parent.dataGridOptions.pageSize)
      },
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
  overflow-y: scroll;
  position: relative;
}
  .no-data {
    height: 100%;
    background: url(~static/img/space-page.png) center center no-repeat;
  }
</style>