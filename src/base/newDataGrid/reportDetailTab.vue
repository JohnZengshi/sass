<template>
  <transition name="tp-ani">
    <div class="tab_detail_table">
      <!--表头 start-->
      <data-grid-header ref="headerBox" :newList="newList" :tabSwitch="tabSwitch" @sortList="sortList" :reportType="reportType" :detailDataGridColumn="configData" @tabCell="tabCell"></data-grid-header>
      <template>
        <!--表格内容区  -->
        <data-grid-body
          :printNum="printNum"
          :tabSwitch="tabSwitch"
          :detailDataGridColumn="configData"
          :dataGridStorage="dataGridStorage"
          :reportType="reportType"
          :positionSwitch="positionSwitch"
          :className="className"
          @checkedAll="checkedAll"
          @scrollClass="scrollClass"
          @lazyloadSend="lazyloadSend"
          @tabCell="tabCell"
          @delData="delData"
          @change="change"
        >
        </data-grid-body>
        <!--表尾  -->
        <data-grid-footer v-if="isFooter" :tabSwitch="tabSwitch" :detailDataGridColumn="configData" :dataGridStorage="allData" :reportType="reportType" :configData="configData" @tabCell="tabCell">
        </data-grid-footer>
      </template>
    </div>
  </transition>
</template>
<script>
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataEditBody from './editBody'
import DataGridFooter from './dataGridFooter'
import DataEditFooter from './editFooter'
// let configData = require('./config/dataGridConfig')
export default {
  props: ['dataGridStorage', 'reportType', 'tabSwitch', 'isOld', 'positionSwitch', 'newList', 'type', 'printNum', 'allData', 'configData', 'isFooter', 'className'],
  // className -> 外壳样式名
  data() {
    return {
      tempDatagrid: [],
      // detailDataGridColumn: this.configData.detailConfing
      // configData: configData
    }
  },
  components: {
    DataGridFooter,
    DataGridBody,
    DataEditBody,
    DataGridHeader,
    DataEditFooter
  },
  created() {
    this.setColumn()
  },
  methods: {
    // 选择的数据集合
    checkedAll (parm) {
      this.$emit('checkedAll', parm)
    },
    delData (parm) {
      this.$emit("delData", parm)
    },
    compileData (parm) {
      this.$emit("compileData", parm)
    },
    change (parm) {
      this.$emit("change", parm)
    },
    cancelSort (parm) {
      this.$refs.headerBox.cancelSort(parm)
    },
    sortList(val) {
      this.$emit('sortListAct', val)
    },
    lazyloadSend(val) {
      this.$emit('lazyloadSend', val)
    },
    //单元格宽度
    tabCell(result) {
      if (result.width) {
        let w = 'width:' + result.width + 'px'
        result.res && result.res.call(this, w)
      }
    },
    scrollClass(type) {
      this.$emit('scrollClass', type)
    },
    setColumn(data) {
      this.detailDataGridColumn = this.configData.detailConfing
    }
  },
}

</script>
<style lang="scss" scoped>
.tab_detail_table{
  background-color: #fff;
}
</style>