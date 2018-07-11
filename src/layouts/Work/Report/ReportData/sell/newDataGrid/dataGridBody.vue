<template>
  <!--表格内容区-->
  <!--明细-->
  <div @scroll="watchScroll($event)" class="xj-report-table-container" ref="tableContainer" v-if="reportType == 1">
    <div>
      <div class="tb-tr" v-for="(tb,index) in tempArray" :key="index">
        <template v-for="(tab,indexs) in detailDataGridColumn">
          <div
            class="tb-td"
            :key="indexs"
            :style="calculateClass(tab)"
            v-text="tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"
          ></div>
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


    <!--产品分类-->
    <div class="xj-report-table-container" ref="tableContainer" v-else-if="reportType == 3">
      <div>
        <div class="tb-category" v-for="(caty,index) in otherDatagrid" :key="index">
          <template v-for="(tb, index) in caty.productTypeList">
            <div class="tb-tr" :key="index">
              <template v-for="(tab,index4) in detailDataGridColumn">
                <div class="branch-tb category-td"
                  :key="index4"
                  v-if="tab.text == '产品类别'" 
                  :style="calculateClass(tab)"
                  >
                  {{tb[tab.childType]}}
                </div>
                <div class="tb-td"
                  v-else
                  :key="index4"
                  @click="openLabel({}, tb)"
                  :style="calculateClass(tab)" 
                  v-text = "tab.totalType == ''? (index+1) : tb[tab.totalType]">
                </div>
              </template>
            </div>
          </template>
          
        </div>
        <div v-if="isDate" class="no-data"></div>
      </div>
    </div>








  <div class="xj-report-table-container" ref="tableContainer" v-else>
    <div>
      <div class="tb-category" v-for="(caty, ind) in otherDatagrid" :key="ind" :index="resetIndex(ind)">
        <div v-for="(tb, index) in caty.productTypeList" :key="index">
          <div class="tb-tr" v-for="(tb1, index1) in tb.detailList" :key="index1" :index="addIndex()">
            <template v-for="(tab,index) in detailDataGridColumn">
              <div class="branch-tb category-td" :key="index" v-if="tab.text == '产品类别' && index1 == 0" :style="calculateClass(tab)">
                <i :style="'height:'+ tb.detailList.length * 40 +'px;'">{{tb[tab.childType]}}</i>
              </div>
              <div class="branch-tb category-td" :key="index" v-else-if="tab.text == '回购类型' && index1 == 0" :style="calculateClass(tab)">
                <i :style="'height:'+ tb.detailList.length * 40 +'px;'">{{caty[tab.childType]}}</i>
              </div>

              <div @click="openLabel(tb1, tb)" class="tb-td" :key="index" v-else :class="{backLine:tab.childType != ''}" :style="calculateClass(tab)" v-text="tab.childType == ''? getIndex() : tb1[tab.childType]">
              </div>
            </template>
          </div>
          <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
          <div v-show="tb.detailList.length" class="tb-total" style="background:#ECF3FF;" v-if="!positionSwitch">
            <!-- 类型小计 -->
            <div class="tb-td" @click="openLabel({}, tb)" v-for="(tab,f) in detailDataGridColumn" :key="f" :style="calculateClass(tab)" v-html="f == 0 ? '<b>小计</b>' : tb[tab.totalType]"></div>
          </div>
        </div>
        <div class="tb-total" style="background:#ECF3FF;" v-if="positionSwitch">
          <!-- 位置小计 -->
        	<div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :key="f" :style="calculateClass(tab)" v-html="f == 1 ? '<b>小计</b>' : caty[tab.totalType0]"></div>
        </div>
      </div>
      <div v-if="isDate" class="no-data"></div>
    </div>
  </div>

</template>

<script>
  let applyIndex = 0
  import {styleWR} from 'Api/commonality/getStyle'
  import {calculateClass} from 'assets/js/getClass'
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
    props: ['detailDataGridColumn', 'dataGridStorage', 'tabCell', 'reportType', 'positionSwitch', 'dataGridOptions', 'orderType'],

    watch: {
      'dataGridStorage': function() {
        this.tempArray = []
        this.cheackData()
        this.storageFormatDate()
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
      //   scrollInertia:100, //滚动条移动速度，数值越大滚动越慢
      //   mouseWheel: {
      //     scrollAmount: 200,
      //           preventDefault: false,
      //           normalizeDelta: true,
      //           scrollInertia : 50
      //   },
      //   callbacks: {
      //     onTotalScroll: function () {
			// 		// console.log('滚轮到底了')
			// 		$('.loadControl').css({
			// 			opacity:1
			// 		})
      //           },
			// 	onUpdate(){
			// 		// console.log('滚动条更新')
			// 		$('.loadControl').css({
			// 			opacity:0
			// 		})
			// 	},
			// 	whileScrolling(){
			// 		// console.log('滚动条活动')
			// 		$('.loadControl').css({
			// 			opacity:0
			// 		})
			// 	}
      //   }
      // });
      this.tabCellHeight()
    },
    methods: {
      openLabel (parm, caty) {
        this.$store.dispatch('getLabelData', {
          type: '3',
          data: Object.assign({}, parm, {
            productTypeId: caty.productTypeId,
            orderType: this.orderType,
          }, this.dataGridOptions)
        })
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
      _styleWR (parm) {
        return styleWR(parm)
      },
      calculateClass (parm) {
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
        let pageSize = 50
        //   this.dgDataList = [];
        if (Number(upDataNum) != 0) {
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
      b {
        color: #333;
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