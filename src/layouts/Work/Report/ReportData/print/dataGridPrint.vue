<template>
<div class="table-template-print"> 
	<table class="table-print-wrap table-print-title">
		<tr class="tab-title-tr">
			<td :colspan="detailDataGridColumn.length" style="text-align:center;font-weight: bold; font-size: 16px;">
				{{printSelectDate.headerData}}报表-{{reportType==3 ? '明细' : (reportType==2 ? '成色小类' : '成色大类')}}
			</td>
		</tr>
		<tr class="tab-title-tr">
			<td v-if="printSelectDate.reportType == 1">
				<p v-if="printSelectDate.storage !=''">入库库位：<span class="td">{{printSelectDate.storage}}</span></p>
				<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{printSelectDate.productType}}</span></p>
				<p v-if="printSelectDate.supplier !=''">供应商：<span class="td">{{printSelectDate.supplier}}</span></p>
				<p v-if="printSelectDate.shop !=''">分销商：<span class="td">{{printSelectDate.shop}}</span></p>
				<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
				<p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{printSelectDate.auditor}}</span></p>
				<p v-if="printSelectDate.showCompany" v-text="printSelectDate.companyName"></p>
			</td>
			<td v-if="printSelectDate.reportType == 2">
				<p v-if="printSelectDate.storage !=''">退库库位：<span class="td">{{printSelectDate.storage}}</span></p>
				<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{printSelectDate.productType}}</span></p>
				<p v-if="printSelectDate.supplier !=''">供应商：<span class="td">{{printSelectDate.supplier}}</span></p>
				<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
				<p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{printSelectDate.auditor}}</span></p>
				<p v-if="printSelectDate.showCompany" v-text="printSelectDate.companyName"></p>
			</td>
			<td v-if="printSelectDate.reportType == 3">
				<p v-if="printSelectDate.storage !=''">调入库位：<span class="td">{{printSelectDate.storage}}</span></p>
				<p v-if="printSelectDate.storageOut !=''">调出库位：<span class="td">{{printSelectDate.storageOut}}</span></p>
				<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
				<p v-if="printSelectDate.auditor !=''">收货人：<span class="td">{{printSelectDate.auditor}}</span></p>
				<p v-if="printSelectDate.showCompany" v-text="printSelectDate.companyName"></p>
			</td>
			<td v-if="printSelectDate.reportType == 4">
				<p v-if="printSelectDate.storage !=''">发货库位：<span class="td">{{printSelectDate.storage}}</span></p>
				<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{printSelectDate.productType}}</span></p>
				<p v-if="printSelectDate.shop !=''">收货店铺：<span class="td">{{printSelectDate.shop}}</span></p>
				<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
				<p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{printSelectDate.auditor}}</span></p>
				<p v-if="printSelectDate.takeUser !=''">收货人：<span class="td">{{printSelectDate.takeUser}}</span></p>
				<p v-if="printSelectDate.showCompany" v-text="printSelectDate.companyName"></p>
			</td>
			<td v-if="printSelectDate.reportType == 5">
				<p v-if="printSelectDate.shop !=''">店铺：<span class="td">{{printSelectDate.shop}}</span></p>
				<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
				<p v-if="printSelectDate.showCompany" v-text="printSelectDate.companyName"></p>
			</td>
			<td v-if="printSelectDate.reportType == 6">
				<p v-if="printSelectDate.storage !=''">退货库位：<span class="td">{{printSelectDate.storage}}</span></p>
				<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{printSelectDate.productType}}</span></p>
				<p v-if="printSelectDate.shop !=''">退货铺位：<span class="td">{{printSelectDate.shop}}</span></p>
				<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
				<p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{printSelectDate.auditor}}</span></p>
				<p v-if="printSelectDate.takeUser !=''">收货人：<span class="td">{{printSelectDate.takeUser}}</span></p>
				<p v-if="printSelectDate.showCompany" v-text="printSelectDate.companyName"></p>
			</td>
			<td :colspan="3" class="time">制单时间：{{printSelectDate.startTime}}至{{printSelectDate.endTime}}</td>
		</tr>
	</table>
	
	<!--表头 start-->
	<!--<data-grid-header 
		:detailDataGridColumn="detailDataGridColumn">
	</data-grid-header>-->
	
	<!--表格内容区  -->
	<data-grid-body 
		:detailDataGridColumn="detailDataGridColumn" 
		:dataGridStorage="dataGridStorage" 
		@getIndex = "getIndex"
		:reportType = "reportType">
	</data-grid-body>	
</div>
</template>

<script>
//import DataGridHeader from './dataGridHeaderPrint' 
import DataGridBody from './dataGridBodyPrint' 
let config = require('./config/dataGridConfig')
export default {
	data(){
		return{
			tempDatagrid : [],
			detailDataGridColumn : [],
			totalIndex : 0
		}
	},
	
	components :{
		//DataGridHeader,
		DataGridBody
	},
	
	props: ['dataGridStorage','reportType','tabSwitch','printSelectDate'],
	
	
	watch:{
		//监听类型改变
		//开关 成本列
        tabSwitch : function(){
            this.tableSwitch()
        },
        //监听类型改变
        reportType:function(){
            this.tableSwitch()
        },
        dataGridStorage :function(){
          if( this.reportType == 3 ){
               this.totalIndex = this.dataGridStorage.totalNum
            }
        }
	},
	
	created(){
		this.configType()
	},
	
	methods:{
	   
	   getIndex(index ){
	     this.totalIndex = index
	   },
	   
       ObjectAssign(){
           this.tempDatagrid = [];
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
            if( this.reportType == 3 ){
               this.totalIndex = this.dataGridStorage.totalNum
            }
			if( !this.tabSwitch ){
				this.tempDatagrid.forEach((item)=>{
					let tempwidth, _item = Object.assign({},item)
					if( _item.width && _item.text !='成本'){
						tempwidth = parseInt(_item.width.indexOf('%') > 0 ? _item.width.replace('%','') : _item.width)
						_item.width = tempwidth+10
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

<style lang="scss">
.table-template-print{
	min-height: 180mm;
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
		
			&.pad-right{
				text-align: right;
				padding-right: 9px;
			}
		}
		
		
		
		tr{
			page-break-inside: avoid;
		}
		
		.table-print-footer-td{
			border-top-width: 0;
		}
		
	}
	
	.table-print-title{
		margin-top: 10mm;
	}
	
	tr.tab-title-tr{
	   height: 10px;
		>td{
			height: 10mm;
			border:0 none;
			font-size: 8pt;
			text-align: left;
			padding: 0;
			
			p{
				display: inline-block;
				padding-right: 12px;
			}
			
			>.td{
				display: inline-block;
				color: #999;
				white-space: nowrap;
				max-width: 100px;
				overflow: hidden;
				vertical-align: middle;
			}
		}
		
		.time{
			text-align: right;
		}
	}

}
@media print{

}

</style>