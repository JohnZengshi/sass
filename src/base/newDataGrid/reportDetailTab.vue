<template>
  <transition name="tp-ani">
    <div class="tab_detail_table">
      <!--表头 start-->
      <data-grid-header ref="headerBox" :newList="newList" :tabSwitch="tabSwitch" @sortList="sortList" :reportType="reportType" :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
      <template>
        <!--表格内容区  -->
        <data-grid-body
          :printNum="printNum"
          :tabSwitch="tabSwitch"
          :detailDataGridColumn="detailDataGridColumn"
          :dataGridStorage="dataGridStorage"
          :reportType="reportType"
          :positionSwitch="positionSwitch"
          @scrollClass="scrollClass"
          @lazyloadSend="lazyloadSend"
          @tabCell="tabCell"
          @delData="delData"
        >
        </data-grid-body>
        <!--表尾  -->
        <data-grid-footer :tabSwitch="tabSwitch" :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="allData" :reportType="reportType" :configData="configData" @tabCell="tabCell">
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
  props: ['dataGridStorage', 'reportType', 'tabSwitch', 'isOld', 'positionSwitch', 'newList', 'type', 'printNum', 'allData', 'configData'],
  data() {
    return {
      tempDatagrid: [],
      detailDataGridColumn: this.configData.detailConfing
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
    delData (parm) {
      this.$emit("delData", parm)
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
    configType() {
      this.setColumn(this.configData.detailConfing)
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