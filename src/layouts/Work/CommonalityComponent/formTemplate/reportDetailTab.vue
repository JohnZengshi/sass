<template>
<transition name="tp-ani">
<div class="tab_detail_table">
	<!--表头 start-->
	<data-grid-header :reportType = "reportType" :billType = 'billType' :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
	
	<!--表格内容区  -->
	<data-grid-body 
		:detailDataGridColumn="detailDataGridColumn" 
		:dataGridStorage="dataGridStorage" 
		:reportType = "reportType"
		:billType = 'billType'
		:isRole = 'isRole'
		:isSelDelect = 'isSelDelect'
		@delectBack= 'delectBack'
		@scrollClass = "scrollClass"
		@scrollBack="scrollBack"
		@scrolling="scrolling"
		@tabCell="tabCell">
	</data-grid-body>
	
	<!--表尾  -->
	<data-grid-footer :reportType = "reportType" :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" @tabCell="tabCell"></data-grid-footer>
</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataGridFooter from './dataGridFooter'
let config = require('./dataGridConfig')
export default {
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
		},
		//监听类型改变
		reportType:function(){
			//this.configType()
			this.tableSwitch()
		}
	},
	
	created(){
		//this.configType()
	},
	props : ['dataGridStorage','reportType','tabSwitch', 'billType', 'isRole', 'isSelDelect'],
	
	methods:{
		scrolling (val) {
			this.$emit('scrolling', val)
		},
		scrollBack (val) {
			this.$emit('scrollBack', val)
		},
		delectBack (val) {
			this.$emit('delectBack', val)
		},
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
       		this.configType()
            this.ObjectAssign()
			if( !this.tabSwitch ){
			    let temp = [];
				this.tempDatagrid.forEach((item)=>{
					let tempwidth, _item = Object.assign({},item)
					if( _item.width && _item.text !='成本'){
						tempwidth = parseInt(_item.width.indexOf('%') > 0 ? _item.width.replace('%','') : _item.width)
						_item.width = (tempwidth+1.5) +'%'
						temp.push( _item )
					}
				})
				this.detailDataGridColumn = temp;
			}else{
				this.detailDataGridColumn = this.tempDatagrid
			}
			
       },
       
       scrollClass( type ){
      	 this.$emit('scrollClass', type )
      },
      
      configType(){
      	switch( this.reportType ){
      		case 1 :
      			this.setColumn(config.detailBigTypeConfig)
      		break;
      		case 2 :
      			this.setColumn(config.detailSmallTypeConfig)
      		break;
      		case 3 :
      			this.setColumn(config.detailConfing)
      		break;
      	}
      		
      },
      
      setColumn(data){
      	 if(data) this.detailDataGridColumn = data
      }
	},
	
	mounted(){console.log(this.tabSwitch)
		this.$nextTick(()=>{
			//this.ObjectAssign()
			this.tableSwitch()
		})
	}
}
</script>

<style>
</style>