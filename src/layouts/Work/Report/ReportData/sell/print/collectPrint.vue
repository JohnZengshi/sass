<template>
<div class="table-template-print"> 
	<table class="table-print-wrap table-print-title">
		<tr class="tab-title-tr">
			<td :colspan="detailDataGridColumn.length" style="text-align: center;font-weight: bold; font-size: 16px;">
				{{reportTypeHeaderData}}报表
			</td>
		</tr>
		<tr class="tab-title-tr">
			<td>
				<p v-if="printSelectDate.preparedBy !=''">制单人：<span class="td">{{printSelectDate.preparedBy}}</span></p>
				<p v-if="printSelectDate.payee !=''">收银人：<span class="td">{{printSelectDate.payee}}</span></p>
				<p v-if="printSelectDate.shop !=''">店铺名称：<span class="td">{{printSelectDate.shop}}</span></p>
				<p v-if="printSelectDate.showCompany" v-text="printSelectDate.companyName"></p>
			</td>
			
			<td colspan="3" class="time">制单时间：{{printSelectDate.startTime}}至{{printSelectDate.endTime}}</td>
		</tr>
	</table>
<table class="tab-header">
	<tr class="tr-header">
		<td v-for="tab in detailDataGridColumn" :key="tab.id">
			<div :style="tabCell(tab.width)">{{tab.text }} <i v-if="tab.unit !=''">{{ tab.unit}}</i></div>
		</td>
	</tr>
</table>		
	<!--表格内容区  -->
<table class="table-print-wrap">
	<tr v-for="caty in dataGridStorage.shopList">
		<td  v-for="tab in detailDataGridColumn" >
			<div :style="tabCell(tab.width)" v-text="caty[tab.childType]"></div>
		</td>
	</tr>
</table>
	<!--表尾  -->
<table class="table-print-wrap">
	<tr>
		<td class="table-print-footer-td" v-for="tab in detailDataGridColumn" 
			:key="tab.id" >
			<div :style="tabCell(tab.width)">
			    
				<p class="totalNum" v-if="tab.totalName !='合计'">
				    {{tab.totalType =='' ? '&nbsp;' : dataGridStorage[tab.totalType] }} 
				    <i v-if="tab.footerUnit !=''">{{ tab.footerUnit}}</i>
				</p>
				<p class="total"  v-else v-text="tab.totalName" style="font-weight: bold;"></p>
			</div>
		</td>
	</tr>
</table>
</div>
</template>

<script>
let config = require('./config/collectPrintConfig')
let lodash = require('lodash')
export default{
	data(){
		return{
			tempDatagrid : [],
			detailDataGridColumn : [],
			companyName : ''
		}
	},
    watch :{
       printSelectDate:function(){
         console.log(1111,this.printSelectDate)
       }
    },
	props: ['dataGridStorage','printSelectDate','reportTypeHeaderData'],

	created(){
		this.detailDataGridColumn = config.detailConfing
		//console.log(1111,this.printSelectDate)
	},
	
	methods:{
		//单元格宽度
		tabCell( w ){
			return 'width:' + w + ( w.indexOf('%') >= 0 ? '' : 'px')
       },
      
	},
	
	mounted(){
		
		this.$nextTick(()=>{
		    
		})
	}
}
</script>

<style lang="scss" scoped>
.table-template-print{
	min-height:auto;
	background: transparent;
	height: auto;
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
				word-break: break-word;
			}
		}
	}
	
	.table-print-title{
		margin-top: 10mm;
	}
	
	tr.tab-title-tr{
	    height: auto!important;
		>td{
			height: 6mm;
			border:0 none;
			font-size: 9pt;
			padding: 0;
			text-align: left;
		}
		
		.time{
			text-align: right;
		}
	}

}

.tr-header > td {
	border: 0.5mm solid #333;
	font-size: 8pt;
	text-align: center;
	height: 8mm;
	padding: 0;
	border-bottom-width: 0;
	
	i{
		font-style:normal;
		font-size: 6pt;
		color: #999;
	}
}

.tab-header{
	border-collapse: collapse;
	width: 100%;
	
	td >div{
		margin: 0 auto;
	}
}
</style>