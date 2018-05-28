<template>
  <!--表格内容区-->
  <!--明细-->
  <div class="ui-table-container default-line" ref="tableContainer" v-if="reportType == 1">
    <div>
      <div class="tb-tr" v-for="(tb,index) in tempArray" :key="index">
        <template v-for="(tab,indexs) in detailDataGridColumn">
          <!--<div class="tb-td category-td"
          v-if="tab.text == '回购类型'" 
          :style="tableCell(tab.width)" >
          <i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;'">{{caty[tab.childType]}}</i>
        </div>-->

          <div class="tb-td" :key="indexs" :style="tableCell(tab.width)" v-text="tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"></div>
        </template>
      </div>
      <div v-if="isDate" class="no-data"></div>
    </div>
  </div>

  <div class="ui-table-container con-line" ref="tableContainer" v-else>
    <div>
      <div class="tb-category" v-for="(caty, ind) in otherDatagrid" :key="ind" :index="resetIndex(ind)">
        <div v-for="(tb, index) in caty.productTypeList" :key="index">
          <div class="tb-tr" v-for="(tb1, index1) in tb.detailList" :key="index1" :index="addIndex()">
            <template v-for="(tab,index) in detailDataGridColumn">
              <div class="tb-td category-td" :key="index" v-if="tab.text == '产品类别' && index1 == 0" :style="tableCell(tab.width)">
                <i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;'">{{tb[tab.childType]}}</i>
              </div>
              <div class="tb-td category-td" :key="index" v-else-if="tab.text == '回购类型' && index1 == 0" :style="tableCell(tab.width)">
                <i :style="'height:'+ tb.detailList.length * 50 +'px;  background: #f9f8e7;'">{{caty[tab.childType]}}</i>
              </div>
              <div class="tb-td" :key="index" v-else :class="{backLine:tab.childType != ''}" :style="tableCell(tab.width)" v-text="tab.childType == ''? getIndex() : tb1[tab.childType]">
              </div>
            </template>
          </div>
          <div style="height: 2px; width: 100%; background:#fff;" v-if="positionSwitch"></div>
          <div class="tb-total" style="background:#e9f4fe;" v-if="!positionSwitch">
            <!-- 类型小计 -->
            <div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :key="f" :style="tableCell(tab.width)" v-html="f == 0 ? '<b>小计</b>' : tb[tab.totalType]"></div>
          </div>
        </div>
        <div class="tb-total" style="background:#e9f4fe;" v-if="positionSwitch">
          <!-- 位置小计 -->
          <!--保留2位小数-->
          <!--<div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :key="f" :style="tableCell(tab.width)" v-html="f == 1 ? '<b>小计</b>' : tab.toFixed ? toFixed(caty[tab.totalType0], tab.countCut) : caty[tab.totalType0]"></div>-->
        	<div class="tb-td" v-for="(tab,f) in detailDataGridColumn" :key="f" :style="tableCell(tab.width)" v-html="f == 1 ? '<b>小计</b>' : caty[tab.totalType0]"></div>
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

      $(".ui-table-container").mCustomScrollbar({
        theme: "minimal-dark",
        axis: 'y',
        mouseWheel: {
          scrollAmount: 200,
                preventDefault: false,
                normalizeDelta: true,
                scrollInertia : 50
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
      b {
        color: #333;
      }
    }
  }
</style>
<style scoped lang="scss">
  .ui-table-container {
    height: 515px;
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
      .backLine {overflow: hidden;}
      .tb-tr:nth-child(even) {
        .backLine {
          background-color: #f9f9f9;
          
        }
      }
    }
    .tb-tr {
      height: 50px;
      display: flex;
      .tb-td {
        float: left;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        transition: all .1s;
        white-space: nowrap;
        color: #333;
        -webkit-font-smoothing: subpixel-antialiased;
        text-overflow: ellipsis;
        &.category-td {
          position: relative;
          //overflow: hidden;
          text-overflow: ellipsis;
          white-space: pre-wrap;
          >i {
            font-style: normal;
            // font-weight: bold;
            // color: #248efc;
            color: #333;
            font-size: 14px;
            // font-size: 15px;
            position: absolute;
            display: flex;
            align-items: center;
            width: 100%;
            left: 0;
            top: 0;
            text-align: center;
            justify-content: center
          }
        }
      }
    }
    .tb-total {
      background-color: #e9f4fe;
      height: 50px;
      display: flex;
      .tb-td {
        float: left;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #2993f8;
        transition: all .3s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        b {
          color: #333 !important;
        }
      }
    }
  }
  
  .no-data {
    height: 100%;
    background: url(~static/img/space-page.png) center center no-repeat;
  }
</style>