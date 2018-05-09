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
    @scrollClass = "scrollClass" 
    @tabCell="tabCell">
  </data-grid-body>
  
  <!--表尾  -->
  <data-grid-footer 
      :reportType = "reportType" 
      :tabSwitch = "tabSwitch"
      :detailDataGridColumn="detailDataGridColumn" 
      :dataGridStorage="dataGridStorage" 
      @tabCell="tabCell"></data-grid-footer>
</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGrid/dataGridHeader'
import DataGridBody from './dataGrid/dataGridBody'
import DataGridFooter from './dataGrid/selldataGridFooter'
let config = require('./config/SellConfig')

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
    //开关 成本列
    tabSwitch : function(){
      this.tableSwitch()
      //console.log(this.dataGridStorage)
    },
    
    reportType : function(){
      this.tableSwitch()
    }
  },
  props : ['dataGridStorage','reportType','tabSwitch'],
  
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
       
       tableSwitch(){
          let temp = [];
          this.configType()
          this.ObjectAssign()
          
      if( !this.tabSwitch ){
        this.tempDatagrid.forEach((item)=>{
          let tempwidth, _item = Object.assign({},item)
          if( _item.width && _item.text !='成本' && _item.text !='毛利'){
            tempwidth = parseInt(_item.width.indexOf('%') > 0 ? _item.width.replace('%','') : _item.width)
            _item.width = (tempwidth+1.5) +'%'
            temp.push( _item )
          }
          
        })
        
      }else{
        temp = this.tempDatagrid
      }
      this.detailDataGridColumn = temp;
       },
       
       scrollClass( type ){
         this.$emit('scrollClass', type )
      },
      
      configType(){
        switch( this.reportType ){
          case 1 :
            this.setColumn( config.detailBigTypeConfig )
          break;
          case 2 :
            this.setColumn( config.capacityClassify )
          break;
          case 3 :
            this.setColumn( config.productClassify )
          break;
        }
          
      },
      
      setColumn(data){
         if(data) this.detailDataGridColumn = data
      }
  },
  
  mounted(){
    this.$nextTick(()=>{
      this.tableSwitch()
    })
  }
}
</script>

<style>
</style>