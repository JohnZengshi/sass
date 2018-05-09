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
		@getIndex = "getIndex"
		@lazyloadSend ="lazyloadSend"
		@scrollClass = "scrollClass" 
		@tabCell="tabCell">
	</data-grid-body>
	
	<!--表尾  -->
	<data-grid-footer 
	    :detailDataGridColumn="detailDataGridColumn" 
	    :totalIndex = "totalIndex"
	    :dataGridStorage="dataGridStorage" 
	    @tabCell="tabCell"></data-grid-footer>
</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataGridFooter from './dataGridFooter'
let config = require('./config/dataGridConfig')
export default{
	data(){
		return{
			tempDatagrid : [],
			detailDataGridColumn : [],
			
			//后台数据没有返回totalNum的情况下，统计合计数目
			totalIndex : 0
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
		dataGridStorage :function(){
		  if( this.reportType == 3 ){
               this.totalIndex = this.dataGridStorage.totalNum
            }
		}
	},
		
	
	props : ['dataGridStorage','reportType','tabSwitch'],
	
	methods:{
	    
	    //通过body表格运算拿到合计数
	    getIndex(index ){
         this.totalIndex = index
        },
       
	    lazyloadSend(){
	       this.$emit('lazyloadSend')
	    },
		//单元格宽度
		tabCell( result ){
		    let size = result.width + ''
			if( size ){
				let newSize = 'width:' + size + ( size.indexOf('%') >= 0 ? '' : 'px')
				result.res && result.res.call(this, newSize)
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
       		
       		if( this.reportType == 3 ){
       		   this.totalIndex = this.dataGridStorage.totalNum
       		}
			if( !this.tabSwitch ){
			   let temp = [];
				this.tempDatagrid.forEach((item)=>{
					let tempwidth, _item = Object.assign({},item)
					if( _item.width && _item.text !='成本'){
					    let type = _item.width.indexOf('%') > 0
						tempwidth = parseInt( type ? _item.width.replace('%','') : _item.width)
						_item.width = type ? (tempwidth+1.5) + '%' : tempwidth + 10
						//console.log(_item.width,type)
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
	
	mounted(){
		this.$nextTick(()=>{
			this.tableSwitch()
		})
	}
}
</script>

<style>
</style>