<template>
<transition name="tp-ani">
<div class="tab_detail_table">
  <!--表头 start-->
  <data-grid-header :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
  
  <!--表格内容区  -->
  <data-grid-body 
    :detailDataGridColumn="detailDataGridColumn" 
    :dataGridStorage="dataGridStorage" 
    :reportType = "reportType"
    :dataGridOptions="dataGridOptions"
    :orderType="orderType"
    @scrollClass = "scrollClass" 
    @tabCell="tabCell">
  </data-grid-body>
  
  <!--表尾  -->
  <data-grid-footer 
      :reportType = "reportType" 
      :detailDataGridColumn="detailDataGridColumn" 
      :dataGridStorage="dataGridStorage" 
      @tabCell="tabCell"></data-grid-footer>
</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGrid/dataGridHeader'
import DataGridBody from './dataGrid/buyBackGridBody'
import DataGridFooter from './dataGrid/buyBackGridFooter'
let config = require('./config/buyBackSellConfig')

export default{
  data(){
    return{
      tempDatagrid : [],
      detailDataGridColumn : []
    }
  },
  components:{
    DataGridFooter,
    DataGridBody,
    DataGridHeader
  },
  watch :{
    reportType : function(){
      this.configType()
    }
  },
  
  props : ['dataGridStorage','reportType','tabSwitch','dataGridConfig', 'dataGridOptions', 'orderType'],
  
  methods:{
    //单元格宽度
    tabCell( result ){
      if( result.width ){
        let w = 'width:' + result.width + ( result.width.indexOf('%') >= 0 ? '' : 'px')
        result.res && result.res.call(this, w)
      }
    },
       
      ObjectAssign(){
          this.tempDatagrid = [];
          this.detailDataGridColumn.forEach((item)=>{
              let tempItem = Object.assign({},item)
              this.tempDatagrid.push(tempItem)
          })
      },
      

      scrollClass( type ){
         this.$emit('scrollClass', type )
      },
      
      configType(){
        this.ObjectAssign()
        switch( this.reportType ){
          case 1 :
            this.setColumn( config.detailBigTypeConfig )
          break;
          case 2 :
            this.setColumn( config.detailSmallTypeConfig )
          break;
          case 3 :
            this.setColumn( config.detailConfing )
          break;
        }
          
      },
      
      setColumn(data){
         if(data) this.detailDataGridColumn = data
      }
  },
  
  mounted(){
    this.$nextTick(()=>{
      this.configType()
    })
  }
}
</script>

<style>
</style>