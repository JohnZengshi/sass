<template>
	<transition name="tp-ani">
		<div class="container" v-loading="sellloading" element-loading-text="数据查询中">

			<div class="Rp_dataGrid_container">
				<div class="rp_gridState">
					<div class="side-nav">
						<i class="iconfont icon-liebiao"></i>收银统计
					</div>
				</div>
				<div class="rp_dataGridTemp">
					<sell-datagrid :dataGridStorage="sellStorage" :cashierStatistics="cashierStatistics" :buyBackStorage="buyBackStorage" reportType="1">
					</sell-datagrid>
				</div>
			</div>

<!-- 			<div class="Rp_dataGrid_container">
				<div class="rp_gridState">
					<div class="side-nav">
						<i class="iconfont icon-liebiao"></i>回购统计
					</div>
				</div>
				<div class="rp_dataGridTemp">
					<trade-datagrid :dataGridStorage="buyBackStorage" reportType="2">
					</trade-datagrid>
				</div>
			</div> -->

			<!-- 导出表格 -->
			<div class="printBtn exportBtn" @click="exportTab()">
        		<i class="iconfont icon-daochu"></i>
         		 <span>导出报表</span>
        	</div>

			<!--打印-->
			<div class="utils-container-sell">
				<el-button type="primary" class="popover_primary" @click="tabPrin">
					<span class="txt">打印报表</span>
					<i class="iconfont icon-dayin"></i>
				</el-button>
			</div>
			<!--打印模块-->
			<!-- <div style="display: none;"> -->
			<div>
				<cash-template ref="cashTemplate" :cashierStatistics="cashierStatistics" :sellStorage="sellStorage" :buyBackStorage="buyBackStorage" :printSelectDate="printSelectDate"></cash-template>
			</div>
		</div>
		</div>
	</transition>
</template>

<script>
	import sellDatagrid from './sell'
	import tradeDatagrid from './sell'
	import { seekCashierStatistics } from 'Api/commonality/seek'
	import { seekSellList, seekBuyBackList } from 'Api/commonality/operate'
	import cashTemplate from "@/components/jcp-print/sell/cash-template";

	// 导出报表
	import { downLoaderFile } from "Api/downLoaderFile";

	export default {
		data() {
			return {
				sellloading: false,
				cashierStatistics: {},
				sellStorage: {}, // 销售数据
				buyBackStorage: {}, // 回购数据
				isbuyBackShow: false,
				//打印0,1
			}
		},
		props: ['selectDate', 'printSelectDate'],
		components: {
			sellDatagrid,
			tradeDatagrid,
			cashTemplate
		},

		watch: {
			'selectDate.shopId': function() {
				if(this.selectDate.shopId != '') {
					this.send()
				}
			},

			'selectDate.beginTime': function() {
				this.send()
			},

			'selectDate.endTime': function() {
				this.send()
			}
		},

		methods: {
			// 导出报表
			exportTab(){

				let exportData = {
					reportType: '3',
					type: '3',
					beginTime: this.selectDate.beginTime,
					endTime: this.selectDate.endTime,
					shopId: this.selectDate.shopId
				}

				downLoaderFile('/v1/export/exportExcelByCash',exportData)
			},
			//打印表格 
			tabPrin() {
				this.$refs.cashTemplate.print();
			},
			fetchData() {
				if(this.selectDate.shopId == '') {
					//return
				}
				this.sellloading = true
				seekCashierStatistics({
					beginTime: this.selectDate.beginTime,
					endTime: this.selectDate.endTime,
					shopId: this.selectDate.shopId
				}).then((res) => {

					if(res.data.state == 99 || res.data.state == 100100) {
						this.$message({
							type: 'error',
							message: res.data.msg
						})
						setTimeout(() => {
							this.$set(this, 'cashierStatistics', {})
							this.sellloading = false
						}, 200)
					} else {
						setTimeout(() => {
							this.$set(this, 'cashierStatistics', res.data.data)
							this.sellloading = false
						}, 200)
					}
				})
			},

			/*
			 * 销售数据请求
			 */
			sellSend() {
				seekSellList({
					reportType: 3,
					type: 3,
					beginTime: this.selectDate.beginTime,
					endTime: this.selectDate.endTime,
					shopId: this.selectDate.shopId,
					sellStatus:'1'
				}).then((res) => {
					if(res.data.state === 200) {
						this.sellStorage = res.data.data
					} else {
						this.$message({
							type: 'error',
							message: res.body.msg
						})
					}
				})
			},

			//回购数据请求
			sellTradeSend() {
				seekBuyBackList({
					reportType: 3,
					type: 3,
					beginTime: this.selectDate.beginTime,
					endTime: this.selectDate.endTime,
					shopId: this.selectDate.shopId
				}).then((res) => {
					if(res.data.state === 200) {
						let tempData = this.buyBackStorage = res.data.data
						if(tempData.productTypeList) {
							this.isbuyBackShow = tempData.productTypeList[0].productSellTypeList.length != 0
						}
					} else {
						this.$message({
							type: 'error',
							message: res.body.msg
						})
					}
				})
			},

			send() {
				this.fetchData()
				this.sellSend()
				this.sellTradeSend()
			}
		},

		mounted() {
			this.$nextTick(() => {
				this.send()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;
		border-radius: 0 4px 4px 4px;
		// box-shadow: 0px 0 15px #e2e2e2;
		border: 1px solid #dedede;
		overflow: hidden;
		width: 1250px;
		// margin-top: 20px;
		//margin-bottom:120px;
		>.Rp_dataGrid_container {
			border-radius: 0;
			box-shadow: none;
			margin-top: 0;
		}
	}
	
	.sy-container {
		height: 150px;
		background-color: #e9f4fe;
		border-radius: 10px;
		margin: 10px auto;
		width: 1210px;
		>h4 {
			height: 50px;
			color: #2993f8;
			font-weight: bold;
			padding: 0 22px;
			font-size: 15px;
			line-height: 50px;
		}
		>.wrap {
			height: 100px;
			padding-left: 85px;
			>.fl,
			.fr {
				float: left;
				height: 100px;
				>h3 {
					font-size: 16px;
					font-weight: normal;
					text-align: left;
					position: relative;
					padding-bottom: 18px;
					line-height: 15px;
					vertical-align: middle;
					&:before {
						content: '';
						width: 4px;
						height: 16px;
						background-color: #2993f8;
						float: left;
						border-radius: 2px;
						display: inline-block;
						vertical-align: middle;
						margin-right: 10px;
					}
					>.txt {
						float: right;
						color: #999;
						font-size: 12px;
					}
				}
			}
			>.fl {
				width: 725px;
				position: relative;
				&:after {
					content: '';
					position: absolute;
					height: 70px;
					width: 1px;
					background-color: #d6d6d6;
					right: 0;
					top: 0;
				}
				>.item {
					height: 50px;
					display: flex;
					li {
						float: left;
						min-width: 130px;
						padding-right: 20px;
						font-size: 14px;
						>p {
							padding-left: 30px;
							position: relative;
							font-size: 18px;
							white-space: nowrap;
							&.gary,
							>.unit {
								color: #8e9195;
								font-size: 12px;
							}
							>.unit {
								font-style: normal;
								margin-left: 5px;
							}
						}
					}
				}
			}
			.fr {
				padding-left: 50px;
				text-align: center;
				width: 330px;
				>h2 {
					display: inline-block;
					color: #ff3b30;
					font-weight: normal;
					font-size: 30px;
				}
			}
			.icon-container {
				position: relative;
				&:after {
					content: '';
					display: block;
					width: 16px;
					height: 16px;
					position: absolute;
					left: 0;
					top: 0;
					background-color: red;
				}
				&.cash {
					&:after {
						background: url(/static/img/cash.png);
						background-size: cover;
					}
				}
				&.alipay {
					&:after {
						background: url(/static/img/alipay.png);
						background-size: cover;
					}
				}
				&.card {
					&:after {
						background: url(/static/img/swiping-card.png);
						background-size: cover;
					}
				}
				&.weChat {
					&:after {
						background: url(/static/img/WeChat.png);
						background-size: cover;
					}
				}
				&.other {
					&:after {
						background: url(/static/img/other.png);
						background-size: cover;
					}
				}
			}
		}
	}
	
	.rp_dataGridTemp {
		// width: 1210px;
		margin: 0 auto;
		height: 645px;
	}
</style>