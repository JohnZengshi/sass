<template>
  <!--表格内容区-->
  <div class="xj-report-table-container-img default-line" ref="tableContainer">
    <div>
      <template v-for="(tb, index) in dataGridStorage">
        <div @click.stop="change(tb)" class="tb-tr" :key="index" :class="{'print-on': filterChange(index)}">
          <template v-for="(tab,num) in detailDataGridColumn">
            
            <div class="tb-td pd-10" v-if="tab.childType == 'avatarUrl'" :style="tableCell(tab.width)" :key="num">
              <div class="head-portrait-wrap">
                <img class="head-portrait" :src="tb.avatarUrl" alt="">
              </div>
            </div>

            <div class="tb-td" v-else-if="tab.childType == 'compile'" :style="tableCell(tab.width)" :key="num">
              <i v-if="tab.compile" @click.stop="compileData(tb, index)" class="iconfont icon-bianji del-icon"></i>

              <i v-if="tab.del" @click.stop="delData(tb, index)" class="iconfont icon-shanchu1 del-icon"></i>

            </div>
  
            <div class="tb-td" v-else-if="tab.childType == 'createTime'" :style="tableCell(tab.width)" :key="num">
              <div class="time-wrap">
                <p>{{_GetNYR(tb.createTime)}}</p>
                <p>{{_GetSF(tb.createTime)}}</p>
              </div>
            </div>

            <div v-else class="tb-td" :style="tableCell(tab.width)" :key="num" v-text="tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"></div>

          </template>
        </div>
      </template>
      <div v-if="isDate" class="no-data"></div>
    </div>
  </div>
</template>
<script>
import {GetNYR, GetSF} from 'assets/js/getTime'
export default {
  data() {
    return {
      isDate: false,
      tempArray: [],
      heightArr: [],
    }
  },
  props: ['detailDataGridColumn', 'dataGridStorage', 'tabCell', 'reportType', 'positionSwitch', 'printNum'],

  watch: {
    'dataGridStorage': function() {
      this.tempArray = []
      this.cheackData()
      this.storageFormatDate()
      // this.tabCellHeight()
    }
  },
  mounted() {
    let _this = this
    this.$nextTick(() => {

      if (this.dataGridStorage.length) {
        this.tempArray = []
        this.cheackData()
        this.storageFormatDate()
      }
      _this.$emit('lazyloadSend')
    })

    $(".xj-report-table-container-img").mCustomScrollbar({
      theme: "minimal-dark",
      axis: 'y',
      mouseWheel: {
        scrollAmount: 200,
        preventDefault: false,
        normalizeDelta: true,
        scrollInertia: 50
      },
      callbacks: {
        onTotalScroll: function() {
          _this.$emit('lazyloadSend')
          $('.loadControl').css({
            opacity: 1
          })
        },
        onUpdate() {
          $('.loadControl').css({
            opacity: 0
          })
        },
        whileScrolling() {
          $('.loadControl').css({
            opacity: 0
          })
        }
      }
    });
    // this.tabCellHeight()
  },
  methods: {
    _GetNYR (parm) {
      return GetNYR(parm)
    },
    _GetSF (parm) {
      return GetSF(parm)
    },
    // 删除
    delData (parm, index) {
      this.$emit('delData', {
        data: parm,
        index: index
      })
    },
    // 编辑
    compileData (parm, index) {
      this.$emit('compileData', {
        data: parm,
        index: index
      })
    },
    change (parm) {
      this.$emit('change', parm)
    },
    filterChange(Index) {
      if (this.printNum) {
        if (this.printNum.allChecked) {
          return true
        } else if (this.printNum.beginNum <= Index + 1 && Index + 1 <= this.printNum.endNum) {
          return true
        }
      }
      return false
    },

    tabCellHeight() {
      // this.heightArr = []
      //console.log(this.dataGridStorage)
      // if (this.dataGridStorage.length) {
      //  for (let i = 0; i < this.dataGridStorage.length; i++) {
      //    let data = 0
      //    for (let j = 0; j < this.dataGridStorage[i].productTypeList.length; j++) {
      //      data += this.dataGridStorage[i].productTypeList[j].detailList.length * 50
      //    }
      //    this.heightArr.push(data)
      //  }
      // }
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
      if (this.reportType == 1 && this.dataGridStorage) {
        if (this.dataGridStorage.length > 0) {
          this.tempArray = this.dataGridStorage;
        }
      }
    },

    cheackData() {
      if (this.dataGridStorage) {
        this.isDate = this.dataGridStorage.length == 0
      } else if (this.dataGridStorage) {
        this.isDate = this.dataGridStorage.length == 0
      } else if (this.dataGridStorage) {
        this.isDate = this.dataGridStorage.length == 0
      } else {
        this.isDate = true;
      }
    }

  },
  update() {
    console.log('updata')
  },
  created() {

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
.print-on {
  background-color: #F1F8FE!important;
}

.no-data {
  height: 100%;
  background: url(~static/img/space-page.png) center center no-repeat;
}

</style>
