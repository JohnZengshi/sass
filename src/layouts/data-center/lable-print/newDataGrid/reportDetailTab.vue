<template>
  <transition name="tp-ani">
    <div class="tab_detail_table">
      <!--表头 start-->
      <data-grid-header :newList="newList" @sortList="sortList" :reportType="reportType" :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
      <template>
        <!--表格内容区  -->
        <data-grid-body :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType="reportType" :positionSwitch="positionSwitch" @scrollClass="scrollClass" @lazyloadSend="lazyloadSend" @tabCell="tabCell">
        </data-grid-body>
        <!--表尾  -->
        <data-grid-footer :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType="reportType" :configData="configData" @tabCell="tabCell">
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
let configData = require('./config/dataGridConfig')
export default {
  data() {
    return {
      tempDatagrid: [],
      detailDataGridColumn: [],
      configData: configData
    }
  },
  components: {
    DataGridFooter,
    DataGridBody,
    DataEditBody,
    DataGridHeader,
    DataEditFooter
  },
  watch: {
    reportType: function() {
      this.tableSwitch()
    }
  },
  created() {
    this.setColumn()
  },
  props: ['dataGridStorage', 'reportType', 'tabSwitch', 'isOld', 'positionSwitch', 'newList', 'type'],
  methods: {
    sortList(val) {
      this.$emit('sortList', val)
    },
    lazyloadSend(val) {
      this.$emit('lazyloadSend', val)
    },
    ObjectAssign() {
      this.tempDatagrid = [];
      this.detailDataGridColumn.forEach((item) => {
        let tempItem = Object.assign({}, item)
        this.tempDatagrid.push(tempItem)
      })
    },
    //单元格宽度
    tabCell(result) {
      if (result.width) {
        let w = 'width:' + result.width + 'px'
        result.res && result.res.call(this, w)
      }
    },
    // configType() {
    //   switch (this.reportType) {
    //     case 1:
    //       this.setColumn(this.configData.detailConfing)
    //       break;
    //     case 2:
    //       this.setColumn(this.configData.intelligentConfing)
    //       break;
    //     case 3:
    //       this.setColumn(this.configData.produceConfing)
    //       break;
    //     case 4:
    //       this.setColumn(this.configData.customConfing)
    //       break;
    //   }

    // },
    scrollClass(type) {
      this.$emit('scrollClass', type)
    },
    setColumn(data) {
      this.detailDataGridColumn = this.configData.detailConfing
    }
  }
}

</script>
<style lang="scss" scoped>
.tab_detail_table{
  background-color: #fff;
}
</style>