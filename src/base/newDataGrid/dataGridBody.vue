<template>
  <!--表格内容区-->
  <div class="default-line" :class="currentClass" ref="tableContainer">
    <div class="new-e-checkbox-square">
      <el-checkbox-group v-model="allChecked" @change="checkedAll">
        <template v-for="(tb, index) in dataGridStorage">
          <div @click.stop="change(tb)" class="tb-tr" :key="index" :class="{'print-on': filterChange(index)}">
            <template v-for="(tab,num) in detailDataGridColumn">
              
              <div class="tb-td pd-10" v-if="tab.childType == 'avatarUrl'" :style="tableCell(tab.width)" :key="num">
                <!-- 小图 -->
                <div v-if="tab.smallImg" class="head-portrait-small-wrap">
                  <img class="head-portrait" :src="tb.avatarUrl" alt="">
                </div>
                <!-- 普通图片 -->
                <div v-else class="head-portrait-wrap">
                  <img class="head-portrait" :src="tb.avatarUrl" alt="">
                </div>
              </div>

              <div class="tb-td" v-else-if="tab.childType == 'compile'" :style="tableCell(tab.width)" :key="num">
                <i v-if="tab.compile" @click.stop="compileData(tb, index)" class="iconfont icon-bianji del-icon"></i>

                <i v-if="tab.del" @click.stop="delData(tb, index)" class="iconfont icon-shanchu1 del-icon"></i>
                
                <!-- 多选 -->
                <el-checkbox v-if="tab.checked" :label="tb[tab.checkedId]" style="font-size: 14px;">{{tb[tab.childType]}}</el-checkbox>

              </div>

              <div class="tb-td" v-else-if="tab.childType == 'createTime'" :style="tableCell(tab.width)" :key="num">
                
                <!-- 只显示年月日 -->
                <div v-if="tab.nyr">
                  {{_GetNYR(tb.createTime)}}
                </div>

                <div v-else-if="tab.line">
                  {{_GetNYR(tb.createTime)}} {{_GetSF(tb.createTime)}}
                </div>
                <div v-else class="time-wrap">
                  <p>{{_GetNYR(tb.createTime)}}</p>
                  <p>{{_GetSF(tb.createTime)}}</p>
                </div>
              </div>

              <div v-else :title="tb[tab.childType]" class="tb-td" :style="tableCell(tab.width)" :key="num" v-text="tab.childType == ''? (index+1)  : tab.toFixed ? toFixed(tb[tab.childType],tab.countCut) : tb[tab.childType]"></div>

            </template>
          </div>
        </template>
      </el-checkbox-group>
      <div v-if="isDate" class="no-data"></div>
    </div>
  </div>
</template>
<script>
import {GetNYR, GetSF} from 'assets/js/getTime'
export default {
  data() {
    return {
      allChecked: [],
      isDate: false,
      tempArray: [],
      heightArr: [],
    }
  },
  props: ['detailDataGridColumn', 'dataGridStorage', 'tabCell', 'reportType', 'positionSwitch', 'printNum', 'className'],

  watch: {
    'dataGridStorage': function() {
      this.tempArray = []
      this.cheackData()
      this.storageFormatDate()
      // this.tabCellHeight()
    }
  },

  computed: {
    currentClass () {
      if (this.className) {
        return {
          [this.className]: true
        }
      }
      return {
        'xj-report-table-container-img': true
      }
    }
  },

  mounted() {
    this.$nextTick(() => {

      if (this.dataGridStorage.length) {
        this.tempArray = []
        this.cheackData()
        this.storageFormatDate()
      }
      this.$emit('lazyloadSend')
      this.initScorll()
    })

    // this.tabCellHeight()
  },
  methods: {
    initScorll () {
      let _seft = this
      $(".default-line").mCustomScrollbar({
        theme: "minimal-dark",
        axis: 'y',
        scrollInertia: 100,
        callbacks: {
          onTotalScroll: function() {
            _seft.$emit('lazyloadSend')
          }
        }
      })
    },
    checkedAll () {
      this.$emit('checkedAll', this.allChecked)
    },
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
