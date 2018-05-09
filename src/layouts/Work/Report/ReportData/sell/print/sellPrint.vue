<template>
<div class="table-template-print"> 
	<table class="table-print-wrap table-print-title">
		<tr class="tab-title-tr">
			<td :colspan="detailDataGridColumn.length" style="text-align: center;font-weight: bold;font-size: 16px;">
				{{reportTypeHeaderData}}报表-{{reportType==1 ? '明细' : (reportType==2 ? '智能分类' : reportType == 3 ? '产品分类' : '自定义')}}
			</td>
		</tr>
		<tr class="tab-title-tr">
			<td>
				<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
				<p v-if="printSelectDate.payee !=''">收银人：<span class="td">{{printSelectDate.payee}}</span></p>
				<p v-if="printSelectDate.salesperson !=''">销售人：<span class="td">{{printSelectDate.salesperson}}</span></p>
				<p v-if="printSelectDate.shop !=''">店铺名称：<span class="td">{{printSelectDate.shop}}</span></p>
				<p v-if="printSelectDate.showCompany" v-text="printSelectDate.companyName"></p>
			</td>
			<td :colspan="3" class="time">制单时间：{{printSelectDate.startTime}}至{{printSelectDate.endTime}}</td>
		</tr>
	</table>
	
	<!--表头 start-->
	<data-grid-header 
		:detailDataGridColumn="detailDataGridColumn" 
		@tabCell="tabCell">
	</data-grid-header>
	
	<!--表格内容区  -->
	<data-grid-body 
		:detailDataGridColumn="detailDataGridColumn" 
		:dataGridStorage="dataGridStorage" 
		:reportType = "reportType" 
		@tabCell="tabCell">
	</data-grid-body>	
	<!--表尾  -->
	<!--<data-grid-footer 
		:detailDataGridColumn="detailDataGridColumn" 
		:dataGridStorage="dataGridStorage" 
		@tabCell="tabCell">
	</data-grid-footer>-->
</div>
</template>

<script>
import DataGridHeader from './headerPrint'
import DataGridBody from './sellbodyPrint' 
//import DataGridFooter from './footerPrint' 
let config = require('./config/sell')

export default{
	data(){
		return{
			tempDatagrid : [],
			detailDataGridColumn : []
		}
	},
	
	components :{
		DataGridHeader,
		DataGridBody,
		//DataGridFooter
	},
	
	props: ['dataGridStorage','reportType','tabSwitch','printSelectDate','reportTypeHeaderData'],
	
	
	watch:{
		//监听类型改变
		tabSwitch : function(){
      this.tableSwitch()
    },
    
    reportType : function(){
      this.tableSwitch()
    }
	},
	
	created(){
		
	},
	
	methods:{
		
	   //单元格宽度
	   tabCell( result ){
			
			if( result.width ){
				let w = 'width:' + result.width + ( result.width.indexOf('%') >= 0 ? '' : 'px')
				result.res && result.res.call(this, w)
			}
       },
       
       
       ObjectAssign(){
       		this.tempDatagrid = []
       		this.detailDataGridColumn.forEach((item)=>{
				let tempItem = Object.assign({},item)
				this.tempDatagrid.push(tempItem)
			})
       },
       
       //成本开关
       tableSwitch(){
       		let temp = [];
       		this.configType()
       		this.ObjectAssign()
       		
			if( !this.tabSwitch ){
				this.tempDatagrid.forEach((item)=>{
					let tempwidth, _item = Object.assign({},item)
					if( _item.width && _item.text !='成本' && _item.text !='毛利'){
						tempwidth = parseInt(_item.width.indexOf('%') > 0 ? _item.width.replace('%','') : _item.width)
						_item.width = tempwidth +''
						temp.push( _item )
					}
				})
				
			}else{
				temp = this.tempDatagrid
			}
			this.detailDataGridColumn = temp;
      },
      
      configType(){
      	switch( this.reportType ){
      		case 1 :
              this.setColumn(config.detailConfing)
          break;
          case 2 :
              this.setColumn(config.capacityClassify)
          break;
          case 3 :
              this.setColumn(config.productClassify)
          break;
          case 4 :
              this.setColumn(config.productCustom)
          break;
    	  }
      		
      },
      
      setColumn(data){
      	 if(data) this.detailDataGridColumn = data
      }
	},
	
	mounted(){
		
		this.$nextTick(()=>{
		  console.log('打印：', this.dataGridStorage)
			//副本数据	
			
			this.tableSwitch()
		})
	}
}
</script>

<style lang="scss">
.table-template-print{
	//min-height: 180mm;
	background: transparent;
	width: 210mm;
	margin: 0 auto;
	
	.table-print-wrap{
		border-collapse: collapse;
		width: 100%;
		font-size: 9pt;
		border-collapse: collapse;
	
		td{
			border: 0.5mm solid #333;
			font-size: 8pt;
			text-align: center;
			height: 8mm;
			padding: 0;
			white-space: nowrap;
			
			
			>div{
				margin: 0 auto;
			}
		}
		
		tr{
			page-break-inside: avoid;
		}
		
		.table-print-footer-td{
			border-top-width: 0;
		}
		
		.print-product-type{
			font-weight: bold;
			>div{
				white-space: normal;
			}
		}
	}
	
	.table-print-title{
		margin-top: 10mm;
	}
	
	tr.tab-title-tr{
		>td{
			height: 6mm;
			border:0 none;
			font-size: 9.5pt;
			padding: 0;
		}
		
		.time{
			text-align: right;
		}
	}

}
@media print{

}

</style>
<style scoped lang="scss">
.table-template-print{
  height: auto!important;
  min-height:auto !important;
  tr.tab-title-tr{
    height: auto!important;
  }
}
</style>