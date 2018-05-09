<template>
<transition name="tp-ani">
	<!-- <div class="tab_detail_table"> -->
		<!--表头 start-->
		<data-grid-header :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
		
		<!--表格内容区  -->
		<data-grid-body 
			:detailDataGridColumn="detailDataGridColumn" 
			:dataGridStorage="dataGridStorage" 
			:reportType = "reportType"
			@scrollClass = "scrollClass"
			@lazyloadSend = "lazyloadSend"
			@tabCell="tabCell">
		</data-grid-body>
		
		<!--表尾  -->
		<data-grid-footer :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" @tabCell="tabCell"></data-grid-footer>
	<!-- </div> -->
</transition>
</template>

<script>
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataGridFooter from './dataGridFooter'
let configData = null
let config = require('./config/dataGridConfig')
let configOld = require('./config/dataGridConfigOld')
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
		},
		//监听类型改变
		reportType:function(){
			//this.configType()
			this.tableSwitch()
		},
		
		isOld:function(){
		   this.tableSwitch()
		}
	},
		
	props : ['dataGridStorage','reportType','tabSwitch','isOld'],
	
	methods:{
    lazyloadSend (val) {
      this.$emit('lazyloadSend', val)
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
			//console.log(this.tempDatagrid)
       },
       
       tableSwitch(){
       		let temp = [];
       		this.setConfig()
       		this.configType()
       		this.ObjectAssign()
			if (!this.tabSwitch) {
				this.tempDatagrid.forEach((item)=>{
					let tempwidth, _item = Object.assign({},item)
					if( _item.width && _item.text !='成本'){
						tempwidth = parseInt(_item.width.indexOf('%') > 0 ? _item.width.replace('%','') : _item.width)
						_item.width = (tempwidth+1.5) +'%'
						temp.push( _item )
					}
				})
			} else {
				temp = this.tempDatagrid
			}
			this.detailDataGridColumn = temp;
       },
       
       scrollClass( type ){
        //console.log('7899798')
      	this.$emit('scrollClass', type )
      },
      
      configType(){
      	switch( this.reportType ){
      		case 1 :
      			this.setColumn(configData.detailBigTypeConfig)
      		break;
      		case 2 :
      			this.setColumn(configData.detailSmallTypeConfig)
      		break;
      		case 3 :
      			this.setColumn(configData.detailConfing)
      		break;
      	}
      		
      },
      
      setConfig(){
         configData = null
         switch( this.isOld ){
          case 1 : //成品
           configData = config
          break;
          case 2 : //旧料
           configData = configOld
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