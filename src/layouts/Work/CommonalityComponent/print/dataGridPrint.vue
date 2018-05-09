<template>
<div class="table-template-print"> 
	<table class="table-print-wrap table-print-title1">
		<tr class="tab-title-tr1">
			<td :colspan="detailDataGridColumn.length" style="text-align:center;font-weight: bold;">
				{{printSelectDate.headerData}}单据{{reportType==3 ? '' : (reportType==2 ? '成色小类' :  reportType==3 ? '成色大类': '明细')}}
			</td>
		</tr>
		<tr class="tab-title-tr1">
			
			<td v-if="printSelectDate.reportType == 1">
				<div class="nameandtime">
					<div class="name">{{companyName}}</div>
					<div class="time">制单时间：{{formatTime(orderData.createDate)}}</div>
					<div class="clear"></div>
				</div>
				<p>单<span style="margin-left:5px;"></span>据<span style="margin-left:5px;"></span>号：<span class="td">{{printSelectDate.orderNum}}</span></p>
				<p v-if="printSelectDate.storage !=''">入库库位：<span class="td">{{orderData.storageName}}</span></p>
				<p v-if="printSelectDate.supplier !=''">供<span style="margin-left:5px;"></span>应<span style="margin-left:5px;"></span>商：<span class="td">{{orderData.supplierName}}</span></p>
				<p v-if="printSelectDate.shop !=''">分<span style="margin-left:5px;"></span>销<span style="margin-left:5px;"></span>商：<span class="td">{{orderData.shopName}}</span></p>
				<div class="clear">
					<label >制<span style="margin-left:6px;"></span>单<span style="margin-left:6px;"></span>人：<span class="td">{{orderData.makeOrderManName}}</span></label>
					<label v-if="printSelectDate.auditor && printSelectDate.auditor !=''">审<span style="margin-left:6px;"></span>核<span style="margin-left:6px;"></span>人：<span class="td">{{dataGridStorage.checkName}}</span></label>
				</div>
			</td>
			<td v-if="printSelectDate.reportType == 2">
				<p v-if="printSelectDate.storage !=''">退库库位：<span class="td">{{dataGridStorage.storageName}}</span></p>
				<!--<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{dataGridStorage.productType}}</span></p>-->
				<p v-if="printSelectDate.supplier !=''">供应商：<span class="td">{{dataGridStorage.supplierName}}</span></p>
				<p>制单人：<span class="td">{{dataGridStorage.makeManName}}</span></p>
				<p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{dataGridStorage.checkName}}</span></p>
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
			</td>
			<td v-if="printSelectDate.reportType == 3">
				<p v-if="printSelectDate.storage !=''">调入库位：<span class="td">{{dataGridStorage.storageInName}}</span></p>
				<p v-if="printSelectDate.storageOut !=''">调出库位：<span class="td">{{dataGridStorage.storageOutName}}</span></p>
				<p>制单人：<span class="td">{{dataGridStorage.makeManName}}</span></p>
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
				<!--<p v-if="printSelectDate.auditor !=''">收货人：<span class="td">{{dataGridStorage.auditor}}</span></p>-->
			</td>
			<td v-if="printSelectDate.reportType == 4">
				<p v-if="printSelectDate.storage !=''">发货库位：<span class="td">{{dataGridStorage.storageName}}</span></p>
				<!--<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{printSelectDate.productType}}</span></p>-->
				<p v-if="printSelectDate.shop !=''">收货铺位：<span class="td">{{dataGridStorage.shopName}}</span></p>
				<p>制单人：<span class="td">{{dataGridStorage.makeManName}}</span></p>
				<p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{dataGridStorage.checkName}}</span></p>
				<p v-if="printSelectDate.takeUser !=''">收货人：<span class="td">{{dataGridStorage.takeManName}}</span></p>
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
			</td>
			<td v-if="printSelectDate.reportType == 5">
				<p>店铺：<span class="td">{{dataGridStorage.shopName}}</span></p>
				<p>制单人：<span class="td">{{dataGridStorage.makeManName}}</span></p>
				<p>调出柜组：<span class="td">{{dataGridStorage.groupOutName}}</span></p>
				<p>调入柜组：<span class="td">{{dataGridStorage.groupInName}}</span></p>
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
			</td>
			<td v-if="printSelectDate.reportType == 6">
				<p>退货库位：<span class="td">{{dataGridStorage.storageName}}</span></p>
				<!--<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{dataGridStorage.productType}}</span></p>-->
				<p>退货铺位：<span class="td">{{dataGridStorage.shopName}}</span></p>
				<p>制单人：<span class="td">{{dataGridStorage.makeManName}}</span></p>
				<p>审核人：<span class="td">{{dataGridStorage.checkManName}}</span></p>
				<p>收货人：<span class="td">{{dataGridStorage.takeManName}}</span></p>
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
			</td>
			<td v-if="printSelectDate.reportType == 7">
				<p>店铺名称：<span class="td">{{dataGridStorage.shopName}}</span></p>
				<p>制单人：<span class="td">{{dataGridStorage.makeManName}}</span></p>
				<p>销售人：<span class="td">{{dataGridStorage.saleName}}</span></p>
				<p>收银人：<span class="td">{{dataGridStorage.cashierName}}</span></p>
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
			</td>
			<!-- <td :colspan="3" class="time">制单时间：{{formatTime(orderData.createDate)}}</td> -->
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
	<data-grid-footer 
		:detailDataGridColumn="detailDataGridColumn" 
		:dataGridStorage="dataGridStorage" 
		@tabCell="tabCell">
	</data-grid-footer>
	<table class="table-print-wrap table-print-title1">
		<tr class="tab-title-tr1">
			<td style="text-align:right;font-weight: bold;">
				制<span style="margin-left:6px;"></span>单<span style="margin-left:6px;"></span>人：<span class="td">_________________</span>
				审<span style="margin-left:6px;"></span>核<span style="margin-left:6px;"></span>人：<span class="td">_________________</span>
			</td>
		</tr>
		<tr class="tab-title-tr1">
			<td style="text-align:right;font-weight: bold;">
				制单时间：{{getSystemTime()}}
			</td>
		</tr>
	</table>
	<!-- <div style="position:absolute;bottom 20px;left:48%;">1/3</div> 不是加在每一页的-->
</div>
</template>

<script>
import DataGridHeader from './dataGridHeaderPrint' 
import DataGridBody from './dataGridBodyPrint' 
import DataGridFooter from './dataGridFooterPrint' 
let config = require('./config/dataGridConfig')
export default{
	data(){
		return{
			companyName:"",
			tempDatagrid : [],
			detailDataGridColumn : []
		}
	},
	
	components :{
		DataGridHeader,
		DataGridBody,
		DataGridFooter
	},
	
	props: ['dataGridStorage','reportType','tabSwitch','printSelectDate', 'orderData'],
	
	
	watch:{
		//监听类型改变
		//开关 成本列
    tabSwitch : function(){
        this.tableSwitch()
    },
    //监听类型改变
    reportType:function(){
        this.tableSwitch()
    }
	},
	
	created(){
		let company = JSON.parse(localStorage.companyInfo);
		this.companyName = company.companyName;
		this.configType();
	},
	
	methods:{
		getSystemTime(){
		   let myTime = new Date();
		   let y = myTime.getFullYear();
		   let mon = myTime.getMonth() + 1;
		   let day = myTime.getDate();
		   let hour = myTime.getHours();
		   let mm = myTime.getMinutes();
            return y+'-'+mon+'-'+day+'-'+' '+hour+':'+mm;
		},
		formatTime (time1) { // 格式化时间
        let year = time1.substring(0, 4)
        let month = time1.substring(4, 6)
        let data = time1.substring(6, 8)
        let hour = time1.substring(8, 10)
        let time = time1.substring(10, 12)
        return year + "-" + month + "-" + data + " " + hour + ":" + time
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
       //成本开关
       tableSwitch(){
       		let temp = [];
       		this.configType()
            this.ObjectAssign()
            
			if( !this.tabSwitch ){
				this.tempDatagrid.forEach((item)=>{
					let tempwidth, _item = Object.assign({},item)
					if( _item.width && _item.text !='成本'){
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
      			this.setColumn(config.detailBigTypeConfig)
      		break;
      		case 2 :
      			this.setColumn(config.detailSmallTypeConfig)
      		break;
      		case 3 :
      			this.setColumn(config.detailConfing)
      		break;
			case 4 :
      			this.setColumn(config.sellTypeConfig)
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
	
	.table-print-title1{
		margin-top: 5mm;
	}
	
	tr.tab-title-tr1{
		height: 12mm;
		>td{
			border:0 none;
			font-size: 8pt;
			text-align: left;
			padding: 0;
			width: 600px;
			line-height: 20px;
			p{
				float: left;
				display: inline-block;
				padding-right: 12px;
    		min-width: 200px;
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
.nameandtime{
	clear: both;
	&>.name{
		float: left;
		font-size: 12pt;
		font-weight: bold;
	}
}
.clear{clear: both;}
</style>