<template>
	<div class="table-template-print">
		<table class="table-print-wrap table-print-title1">
			<tr class="tab-title-tr1">
				<td :colspan="detailDataGridColumn.length" style="text-align:center;font-weight: bold;">
					{{printSelectDate.headerData}}单据
				</td>
			</tr>
			<tr class="tab-title-tr1">
				<td v-if="printSelectDate.reportType == 7">
					<div class="nameandtime">
						<div class="name">{{printSelectDate.orderNum}}</div>
						<div class="time">制单时间：{{formatTime(orderData.createDate)}}</div>
						<div class="clear"></div>
					</div>
					<p>单<span style="margin-left:5px;"></span>据<span style="margin-left:5px;"></span>号：<span class="td">{{printSelectDate.orderNum}}</span></p>
					<p>店铺名称：<span class="td">{{dataGridStorage.shopName}}</span></p>
					<div class="clear">
						<p>制单人：<span class="td">{{dataGridStorage.makeManName}}</span></p>
						<p>销售员：<span class="td">{{dataGridStorage.saleName}}</span></p>
						<p>收银员：<span class="td">{{dataGridStorage.cashierName}}</span></p>
					</div>
				</td>
			</tr>
		</table>

		<!--表头 start-->
		<data-grid-header :detailDataGridColumn="detailDataGridColumn" @tabCell="tabCell">
		</data-grid-header>

		<!--表格内容区  -->
		<data-grid-body :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" :reportType="reportType" @tabCell="tabCell">
		</data-grid-body>
		<!--表尾  -->
		<data-grid-footer :detailDataGridColumn="detailDataGridColumn" :dataGridStorage="dataGridStorage" @tabCell="tabCell">
		</data-grid-footer>
		<table class="table-print-wrap table-print-title1">
			<tr class="tab-title-tr1">
				<td style="text-align:right;font-weight: bold;">
					制<span style="margin-left:6px;"></span>单<span style="margin-left:6px;"></span>人：<span class="td">_________________</span> 
					销<span style="margin-left:6px;"></span>售<span style="margin-left:6px;"></span>员：<span class="td">_________________</span> 
					收<span style="margin-left:6px;"></span>银<span style="margin-left:6px;"></span>人：<span class="td">_________________</span>
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
	export default {
		data() {
			return {
				companyName: "",
				tempDatagrid: [],
				detailDataGridColumn: []
			}
		},

		components: {
			DataGridHeader,
			DataGridBody,
			DataGridFooter
		},

		props: ['dataGridStorage', 'reportType', 'tabSwitch', 'printSelectDate', 'orderData'],

		watch: {
			//监听类型改变
			//开关 成本列
			tabSwitch: function() {
				this.tableSwitch()
			},
			//监听类型改变
			reportType: function() {
				this.tableSwitch()
			}
		},

		created() {
			let company = JSON.parse(localStorage.companyInfo);
			this.companyName = company.companyName;
			this.configType();
		},

		methods: {
			getSystemTime() {
				let myTime = new Date();
				let y = myTime.getFullYear();
				let mon = myTime.getMonth() + 1;
				let day = myTime.getDate();
				let hour = myTime.getHours();
				let mm = myTime.getMinutes();
				return y + '-' + mon + '-' + day + ' ' + hour + ':' + mm;
			},
			formatTime(time1) { // 格式化时间
				let year = time1.substring(0, 4)
				let month = time1.substring(4, 6)
				let data = time1.substring(6, 8)
				let hour = time1.substring(8, 10)
				let time = time1.substring(10, 12)
				return year + "-" + month + "-" + data + " " + hour + ":" + time
			},
			//单元格宽度
			tabCell(result) {

				if(result.width) {
					let w = 'width:' + result.width + (result.width.indexOf('%') >= 0 ? '' : 'px')
					result.res && result.res.call(this, w)
				}
			},
			ObjectAssign() {
				this.tempDatagrid = [];
				this.detailDataGridColumn.forEach((item) => {
					let tempItem = Object.assign({}, item)
					this.tempDatagrid.push(tempItem)
				})
			},
			//成本开关
			tableSwitch() {
				let temp = [];
				this.configType()
				this.ObjectAssign()

				if(!this.tabSwitch) {
					this.tempDatagrid.forEach((item) => {
						let tempwidth, _item = Object.assign({}, item)
						if(_item.width && _item.text != '成本') {
							tempwidth = parseInt(_item.width.indexOf('%') > 0 ? _item.width.replace('%', '') : _item.width)
							_item.width = tempwidth + ''
							temp.push(_item)
						}
					})

				} else {
					temp = this.tempDatagrid
				}
				this.detailDataGridColumn = temp;
			},

			configType() {
				switch(this.reportType) {
					case 1:
						this.setColumn(config.detailBigTypeConfig)
						break;
					case 2:
						this.setColumn(config.detailSmallTypeConfig)
						break;
					case 3:
						this.setColumn(config.detailConfing)
						break;
					case 4:
						this.setColumn(config.sellTypeConfig)
						break;
				}

			},

			setColumn(data) {
				if(data) this.detailDataGridColumn = data
			}
		},

		mounted() {

			this.$nextTick(() => {
				this.tableSwitch()
			})
		}
	}
</script>

<style lang="scss">
	.table-template-print {
		min-height: 180mm;
		background: transparent;
		width: 210mm;
		margin: 0 auto;
		.table-print-wrap {
			border-collapse: collapse;
			width: 100%;
			font-size: 9pt;
			td {
				border: 0.5mm solid #333;
				font-size: 8pt;
				text-align: center;
				height: 8mm;
				padding: 0;
				white-space: nowrap;
				&.pad-right {
					text-align: right;
					padding-right: 9px;
				}
			}
			tr {
				page-break-inside: avoid;
			}
			.table-print-footer-td {
				border-top-width: 0;
			}
		}
		.table-print-title1 {
			margin-top: 5mm;
		}
		tr.tab-title-tr1 {
			height: 12mm;
			>td {
				border: 0 none;
				font-size: 8pt;
				text-align: left;
				padding: 0;
				width: 600px;
				line-height: 20px;
				p {
					float: left;
					display: inline-block;
					padding-right: 12px;
					min-width: 200px;
				}
				>.td {
					display: inline-block;
					color: #999;
					white-space: nowrap;
					max-width: 100px;
					overflow: hidden;
					vertical-align: middle;
				}
			}
			.time {
				text-align: right;
			}
		}
	}
	
	@media print {}
	
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
</style>