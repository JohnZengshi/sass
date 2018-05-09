<template>
<transition name="tp-ani">
<div class="table-template-print">
    <table class="table-print-wrap table-print-title">
		<tr class="tab-title-tr">
			<td :colspan="detailDataGridColumn.length" style="text-align:center;font-weight: bold;">
				{{printSelectDate.headerData}}单据
			</td>
		</tr>
		<tr class="nameandtime-tr">
			<td>
					<div class="nameandtime">
						<div class="name">{{companyName}}</div>
						<div class="time">制单时间：{{formatTime(receiptsIntroList.createDate)}}</div>
						<div class="clear"></div>
					</div>
			</td>
		</tr>
		<tr class="tab-title-tr">
			<td v-if="printSelectDate.reportType == 1">
				<p v-if="printSelectDate.storage !=''">入库库位：<span class="td">{{receiptsIntroList.storageName}}</span></p>
				<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{dataGridStorage.productTypeName}}</span></p>
				<p v-if="printSelectDate.supplier !=''">供应商：<span class="td">{{receiptsIntroList.supplierName}}</span></p>
				<p v-if="printSelectDate.shop !=''">分销商：<span class="td">{{dataGridStorage.shopName}}</span></p>
				<p>制单人：<span class="td">{{receiptsIntroList.makeOrderManName}}</span></p>
				<p v-if="printSelectDate.auditor !=''">审核人：<span class="td">{{receiptsIntroList.checkName}}</span></p>
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
			</td>
			<td v-if="printSelectDate.reportType == 2">
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
				<p v-if="printSelectDate.storageName !=''">退库库位：<span class="td">{{receiptsIntroList.storageName}}</span></p>
				<!--<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{dataGridStorage.productType}}</span></p>-->
				<p v-if="printSelectDate.supplierName !=''">供应商：<span class="td">{{receiptsIntroList.supplierName}}</span></p>
				<div class="clear">
					<p>制单人：<span class="td">{{receiptsIntroList.makeOrderManName}}</span></p>
					<p v-if="printSelectDate.checkName !=''">审核人：<span class="td">{{receiptsIntroList.checkName}}</span></p>
				</div>
			</td>
			<td v-if="printSelectDate.reportType == 3">
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
				<p v-if="printSelectDate.storageName2 !=''">调出库位：<span class="td">{{receiptsIntroList.storageName2}}</span></p>
				<p v-if="printSelectDate.storageName !=''">调入库位：<span class="td">{{receiptsIntroList.storageName}}</span></p>
				<div class="clear">
					<p>制单人：<span class="td">{{receiptsIntroList.makeOrderManName}}</span></p>
					<p v-if="printSelectDate.auditor !=''">收货人：<span class="td">{{dataGridStorage.auditor}}</span></p>
				</div>
			</td>
			<td v-if="printSelectDate.reportType == 4">
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
				<p v-if="printSelectDate.storageName !=''">发货库位：<span class="td">{{receiptsIntroList.storageName}}</span></p>
				<p v-if="printSelectDate.shopName !=''">收货店铺：<span class="td">{{receiptsIntroList.shopName}}</span></p>
				<p v-if="printSelectDate.counterName !=''">存放柜组：<span class="td">{{receiptsIntroList.counterName}}</span></p>
				<div class="clear">
					<p>制单人：<span class="td">{{receiptsIntroList.makeOrderManName}}</span></p>
					<p v-if="printSelectDate.checkName !=''">审核人：<span class="td">{{receiptsIntroList.checkName}}</span></p>
					<p v-if="printSelectDate.consigneeName !=''">收货人：<span class="td">{{receiptsIntroList.consigneeName}}</span></p>
				</div>
			</td>
			<td v-if="printSelectDate.reportType == 5">
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
				<p>调柜店铺：<span class="td">{{receiptsIntroList.distributor}}</span></p>
				<p>调出柜组：<span class="td">{{receiptsIntroList.groupName2}}</span></p>
				<p>调入柜组：<span class="td">{{receiptsIntroList.groupName}}</span></p>
				<div class="clear">
					<p>制单人：<span class="td">{{receiptsIntroList.makeOrderManName}}</span></p>
				</div>
			</td>
			<td v-if="printSelectDate.reportType == 6">
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
				<p>退货库位：<span class="td">{{receiptsIntroList.storageName}}</span></p>
				<!--<p v-if="printSelectDate.productType !=''">产品类别：<span class="td">{{dataGridStorage.productType}}</span></p>-->
				<p>退货铺位：<span class="td">{{receiptsIntroList.shopName}}</span></p>
				<div class="clear">
					<p>制单人：<span class="td">{{receiptsIntroList.makeOrderManName}}</span></p>
					<p>审核人：<span class="td">{{receiptsIntroList.checkName}}</span></p>
					<p>收货人：<span class="td">{{receiptsIntroList.takeManName}}</span></p>
				</div>
			</td>
			<td v-if="printSelectDate.reportType == 7">
				<p>店铺名称：<span class="td">{{receiptsIntroList.shopName}}</span></p>
				<p>制单人：<span class="td">{{receiptsIntroList.makeOrderManName}}</span></p>
				<!-- <p>销售人：<span class="td">{{receiptsIntroList.sellManName}}</span></p> -->
				<p>收银人：<span class="td">{{receiptsIntroList.cashUserName}}</span></p>
				<p>单据号：<span class="td">{{printSelectDate.orderNum}}</span></p>
			</td>
		</tr>
	</table>
	<!--表头 start-->
	<data-grid-header @sortList="sortList" :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell"></data-grid-header>
	<!--表格内容区  -->
	<data-grid-body 
		:detailDataGridColumn="detailDataGridColumn" 
		:dataGridStorage="dataGridStorage" 
		:reportType = "reportType"
        :positionSwitch="positionSwitch"
		@scrollClass = "scrollClass"
        @lazyloadSend = "lazyloadSend"
		@tabCell="tabCell">
	</data-grid-body>
	<!--表尾  -->
	<data-grid-footer :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType = "reportType" @tabCell="tabCell"></data-grid-footer>
	<table class="table-print-wrap table-print-title1">
		<tr class="tab-title-tr1">
			<td style="text-align:right;">
				制<span style="margin-left:6px;"></span>单<span style="margin-left:6px;"></span>人：<span class="td">_________________</span> 
				<template v-if="printSelectDate.reportType == 2">
					审<span style="margin-left:6px;"></span>核<span style="margin-left:6px;"></span>人：<span class="td">_________________</span> 
				</template>
				<template v-else-if="printSelectDate.reportType == 3">
					收<span style="margin-left:6px;"></span>货<span style="margin-left:6px;"></span>人：<span class="td">_________________</span> 
				</template>
				<template v-if="printSelectDate.reportType == 4">
					审<span style="margin-left:6px;"></span>核<span style="margin-left:6px;"></span>人：<span class="td">_________________</span>
					收<span style="margin-left:6px;"></span>货<span style="margin-left:6px;"></span>人：<span class="td">_________________</span> 
				</template>
				<template v-if="printSelectDate.reportType == 6">
					审<span style="margin-left:6px;"></span>核<span style="margin-left:6px;"></span>人：<span class="td">_________________</span>
					收<span style="margin-left:6px;"></span>货<span style="margin-left:6px;"></span>人：<span class="td">_________________</span> 
				</template>

			</td>
		</tr>
		<tr class="tab-title-tr1">
			<td style="text-align:right;">
				打印时间：{{getSystemTime()}}
			</td>
		</tr>
	</table>
</div>
</transition>
</template>

<script>
import DataGridHeader from './dataGridHeader'
import DataGridBody from './dataGridBody'
import DataGridFooter from './dataGridFooter'
//let configData = null
let configData = require('./config/dataGridConfig')
export default {
	data(){
		return{
				companyName: "",
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
        reportType:function(){
			//this.configType()
			this.tableSwitch()
        },
        //开关 成本列
		tabSwitch: function(){
			this.tableSwitch()
        },
        positionSwitch : function(){
			this.posSwitch()
		},
	},
	
	props : ['printSelectDate', 'receiptsIntroList', 'dataGridStorage','reportType','tabSwitch','isOld', 'positionSwitch'],
	methods:{
		getSystemTime() {
				let myTime = new Date();
				let y = myTime.getFullYear();
				let mon = myTime.getMonth() + 1;
				let day = myTime.getDate();
				let hour = myTime.getHours();
				let mm = myTime.getMinutes();
				return y + '-' + mon + '-' + day + ' ' + hour + ':' + mm;
			},
		formatTime (time1) { // 格式化时间
            let year = time1.substring(0, 4)
            let month = time1.substring(4, 6)
            let data = time1.substring(6, 8)
            let hour = time1.substring(8, 10)
            let time = time1.substring(10, 12)
            return year + "-" + month + "-" + data + " " + hour + ":" + time
        },
        sortList (val) {
            this.$emit('sortList', val)
        },
        lazyloadSend (val) {
            this.$emit('lazyloadSend', val)
        },
        ObjectAssign(){
            this.tempDatagrid = [];
            this.detailDataGridColumn.forEach((item)=>{
                let tempItem = Object.assign({},item)
                this.tempDatagrid.push(tempItem)
            })
        },
        //单元格宽度
		tabCell( result ){
			if( result.width ){
				let w = 'width:' + result.width + 'px'
				result.res && result.res.call(this, w)
			}
       },
        tableSwitch(){
            let temp = [];
            //this.setConfig()
            this.configType()
            this.ObjectAssign()
            if (!this.tabSwitch) {
                if (!this.positionSwitch) {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='成本' && _item.width && _item.text !='位置名称'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 26
                            temp.push( _item )
                        }
                    })
                } else {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='成本'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 13
                            temp.push( _item )
                        }
                    })
                }  
                
            } else {
                if (!this.positionSwitch) {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='位置名称'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 13
                            temp.push( _item )
                        }
                    })
                } else {
                    temp = this.tempDatagrid
                }
            }
            this.detailDataGridColumn = temp;
        },
        posSwitch(){
            let temp = [];
            //this.setConfig()
            this.configType()
            this.ObjectAssign()
            if (!this.positionSwitch) {
                if (!this.tabSwitch) {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='成本' && _item.width && _item.text !='位置名称'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 30
                            temp.push( _item )
                        }
                    })
                } else {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='位置名称'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 13
                            temp.push( _item )
                        }
                    })
                }  
                
            } else {
                if (!this.tabSwitch) {
                    this.tempDatagrid.forEach((item)=>{
                        let tempwidth, _item = Object.assign({},item)
                        if( _item.width && _item.text !='成本'){
                            tempwidth = parseInt(_item.width)
                            _item.width = tempwidth + 13
                            temp.push( _item )
                        }
                    })
                } else {
                    temp = this.tempDatagrid
                }
            }
            this.detailDataGridColumn = temp;
        },
        configType(){
            switch( this.reportType ){
                case 1 :
                    this.setColumn(configData.detailConfing)
                break;
                case 2 :
                    this.setColumn(configData.intelligentConfing)
                break;
                case 3 :
                    this.setColumn(configData.produceConfing)
                break;
                case 4 :
                    this.setColumn(configData.customConfing)
                break;
            }
                
        },
        scrollClass( type ){
            this.$emit('scrollClass', type )
        },
        setColumn(data){
            if(data) this.detailDataGridColumn = data
        }
	},
	created() {
		let company = JSON.parse(localStorage.companyInfo);
		this.companyName = company.companyName;
	},
	mounted(){
		this.$nextTick(()=>{
			this.tableSwitch()
			
		})
	}
}
</script>

<style lang="scss" scoped>
.table-template-print{
	min-height: 180mm;
	background: transparent;
	width: 210mm;
    margin: 0 auto;
    i {
        font-style: normal;
        background:transparent !important;
    }
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
        .tb-total {
            td {
                border-top-width: 0;
            }
        }
		
		.table-print-footer-td{
			border-top-width: 0;
		}
		
	}
	
	.table-print-title{
		margin-top: 10mm;
	}
	
	tr.tab-title-tr{
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
    		min-width: 196px;
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

tr.nameandtime-tr{
	&>td{
		border: 0px !important;
	}
}
.nameandtime {
	clear: both;
	&>.name {
		float: left;
		font-size: 12pt;
		font-weight: bold;
	}
	&>.time {
		float: right;
	}
}

.clear {
	clear: both;
}
tr.tab-title-tr1{
	&>td{
		border: 0px !important;
	}
}
</style>