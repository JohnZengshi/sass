<template>
<transition name="tp-ani">
<div class="tab_detail_table">
	<!--表头 start-->
	<data-grid-header 
	  :detailDataGridColumn="detailDataGridColumn" 
	  @tabCell="tabCell" 
	  @sortList="sortList"
	  :reportType="reportType"></data-grid-header>
	
	<!--表格内容区  -->
	<data-grid-body 
		:detailDataGridColumn="detailDataGridColumn" 
		:dataGridStorage="dataGridStorage" 
    :buyBackStorage="buyBackStorage"
		@tabCell="tabCell">
	</data-grid-body>
	
	<!--表尾  -->
	<data-grid-footer
      :cashierStatistics="cashierStatistics"
	    :detailDataGridColumn="detailDataGridColumn" 
	    :dataGridStorage="dataGridStorage"
      :buyBackStorage="buyBackStorage"
	    @tabCell="tabCell">
	</data-grid-footer>
</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGrid/dataGridHeader'
import DataGridBody from './dataGrid/dataGridBody'
import DataGridFooter from './dataGrid/footer'
let config = require('./config')

export default{
	data(){
		return{
			tempDatagrid : [],
			detailDataGridColumn : []
		}
	},
	watch:{
	  reportType: function(){
	    this.setTableData()
	  }
	},
	components:{
		DataGridFooter,
		DataGridBody,
		DataGridHeader
	},
	props : ['dataGridStorage','reportType', 'buyBackStorage', 'cashierStatistics'],
	
	methods:{
		//单元格宽度
		tabCell( result ){
			if( result.width ){
				let w = 'width:' + result.width + ( result.width.indexOf('%') >= 0 ? '' : 'px')
				result.res && result.res.call(this, w)
			}
    },
    scrollClass( type ){
    	 this.$emit('scrollClass', type )
    },
    sortList (data){
      this.$emit('sortList', data)
    },
    
    setTableData(){
      this.$set(this,'detailDataGridColumn', config.trade)
      // if( this.reportType == 1 ){
      //   this.$set(this,'detailDataGridColumn', config.sell)
      // }else{
      //   this.$set(this,'detailDataGridColumn', config.trade)
      // }
    }
	},
	
	mounted(){
		this.$nextTick(()=>{
		  this.setTableData()
		})
	}
}
</script>

<style>
</style>