<template>
  <transition name="tp-ani">
    <div class="tab_detail_table">
      <!--表头 start-->
      <data-grid-header :newList="newList" :tabSwitch="tabSwitch" @sortList="sortList" :reportType="reportType" :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
      <template>
        <!--表格内容区  -->
        <data-grid-body :printNum="printNum" :tabSwitch="tabSwitch" :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType="reportType" :positionSwitch="positionSwitch" @scrollClass="scrollClass" @lazyloadSend="lazyloadSend" @tabCell="tabCell">
        </data-grid-body>
        <!--表尾  -->
        <data-grid-footer  :tabSwitch="tabSwitch" :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="allData" :reportType="reportType" :configData="configData" @tabCell="tabCell">
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
    },
      //开关 成本列
    tabSwitch : function(){
      this.tableSwitch()
    }
  },
  created() {
    this.setColumn()
  },
  props: ['dataGridStorage', 'reportType', 'tabSwitch', 'isOld', 'positionSwitch', 'newList', 'type', 'printNum', 'allData'],
  methods: {
    // reset () {
    //   this.tableSwitch()
    // },
    sortList(val) {
      this.$emit('sortListAct', val)
    },
    lazyloadSend(val) {
      this.$emit('lazyloadSend', val)
    },
    tableSwitch(){
        let temp = [];
        // this.setConfig()
        this.configType()
        this.ObjectAssign()
        if (!this.tabSwitch) {
            //console.log(11111)
            if (!this.positionSwitch) {
                this.tempDatagrid.forEach((item)=>{
                    let tempwidth, _item = Object.assign({},item)
                    if( _item.width && _item.text !='成本' && _item.width && _item.text !='位置名称'){
                        tempwidth = parseInt(_item.width)
                        _item.width = tempwidth + 26
                        temp.push( _item )
                    }
                })
                //console.log(temp)
            } else {
                this.tempDatagrid.forEach((item)=>{
                    let tempwidth, _item = Object.assign({},item)
                    if( _item.width && _item.text !='成本'){
                        tempwidth = parseInt(_item.width)
                        _item.width = tempwidth + 13
                        temp.push( _item )
                    }
                })
                //console.log(temp)
            }  
            
        } else {
            if (!this.positionSwitch) {
                this.tempDatagrid.forEach((item)=>{
                    let tempwidth, _item = Object.assign({},item)
                    if( _item.width && _item.text !='位置名称'){
                        tempwidth = parseInt(_item.width)
                        _item.width = tempwidth + 13
                        temp.push( _item )
                    }
                })
            } else {
                temp = this.tempDatagrid
            }
        }
        this.detailDataGridColumn = temp;
        console.log('temp',this.detailDataGridColumn)
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
    configType() {
      this.setColumn(this.configData.detailConfing)
      // switch (this.reportType) {
      //   case 1:
      //     this.setColumn(this.configData.detailConfing)
      //     break;
      //   case 2:
      //     this.setColumn(this.configData.intelligentConfing)
      //     break;
      //   case 3:
      //     this.setColumn(this.configData.produceConfing)
      //     break;
      //   case 4:
      //     this.setColumn(this.configData.customConfing)
      //     break;
      // }

    },
    scrollClass(type) {
      this.$emit('scrollClass', type)
    },
    setColumn(data) {
      this.detailDataGridColumn = this.configData.detailConfing
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.tableSwitch()
    })
  }
}

</script>
<style lang="scss" scoped>
.tab_detail_table{
  background-color: #fff;
}
</style>