<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">销售统计</h1>
			<div class="head-option">
				<div class="left">{{headerData.companyName}}</div>
				<div class="right">时间 {{headerData.startTime}} 至 {{headerData.endTime}}</div>
			</div>
			<div class="explain-box">
				店铺名称：{{headerData.shop}}
			</div>
			<div>
				<div class="explain-box" v-show="headerData.preparedBy">
					制单人：{{headerData.preparedBy}}
				</div>
				<div class="explain-box" v-show="headerData.salesperson">
					销售员：{{headerData.salesperson}}
				</div>
				<div class="explain-box" v-show="headerData.payee">
					收银人：{{headerData.payee}}
				</div>
			</div>
		</div>
		<div v-show="types.indexOf('销售')>=0">
			<table class="table-box">
				<tr>
					<td colspan="13" class="center font-bold" style="border-top: 0px;">销售报表</td>
				</tr>
				<tr>
					<td>序号</td>
					<td>产品类别</td>
					<td>首饰名称</td>
					<td>条码号</td>
					<td>件重(g)</td>
					<td>金价(元/g)</td>
					<td>金重(g)</td>
					<td>工费总额(元)</td>
					<td>折扣(%)</td>
					<td>售价(元)</td>
					<td>实售价(元)</td>
					<td>成本(元)</td>
					<td>毛利(元)</td>
				</tr>
				<tr v-for="(item,index) in sellList.detailList" :key="index">
					<td>{{index+1}}</td>
					<td>{{item.productTypeName}}</td>
					<td>{{item.jewelryName}}</td>
					<td>{{item.barcode}}</td>
					<td>{{item.weight}}</td>
					<td>{{item.goldPrice}}</td>
					<td>{{item.goldWeight}}</td>
					<td>{{item.wage}}</td>
					<td>{{item.discount}}</td>
					<td>{{item.price}}</td>
					<td>{{item.realPrice}}</td>
					<td>{{item.cost}}</td>
					<td>{{item.margin}}</td>
				</tr>
				<tr>
					<td colspan="2">合计</td>
					<td>{{sellList.totalNum}}</td>
					<td>-</td>
					<td>{{sellList.totalWeight}}</td>
					<td>-</td>
					<td>{{sellList.totalGoldWeight}}</td>
					<td>{{sellList.totalWage}}</td>
					<td>-</td>
					<td>{{sellList.totalPrice}}</td>
					<td>{{sellList.totalRealPrice}}</td>
					<td>{{sellList.totalCost}}</td>
					<td>{{sellList.totalMargin}}</td>
				</tr>
			</table>
		</div>
		<div v-show="types.indexOf('回购')>=0">
			<table class="table-box">
				<tr>
					<td colspan="13" class="center font-bold" style="border-top: 0px;">回购报表</td>
				</tr>
				<tr>
					<td>序号</td>
					<td>回购类型</td>
					<td>产品类别</td>
					<td>首饰名称</td>
					<td>条码号</td>
					<td>件重(g)</td>
					<td>回购金价(元/g)</td>
					<td>旧料价(元)</td>
					<td>折旧(%)</td>
					<td>工费总额(元)</td>
					<td>回购价(元)</td>
				</tr>
				<tr v-for="(item,index) in buyBackList.detailList" :key="index">
					<td>{{index+1}}</td>
					<td>{{item.sellTypeName}}</td>
					<td>{{item.productTypeName}}</td>
					<td>{{item.jewelryName}}</td>
					<td>{{item.barcode}}</td>
					<td>{{item.weight}}</td>
					<td>{{item.goldPrice}}</td>
					<td>-</td>
					<td>{{item.depreciationDiscount}}</td>
					<td>{{item.wage}}</td>
					<td>{{item.buy}}</td>
				</tr>
				<tr>
					<td colspan="3">合计</td>
					<td>{{buyBackList.totalNum}}</td>
					<td>-</td>
					<td>{{buyBackList.totalWeight}}</td>
					<td>{{buyBackList.totalGoldPrice}}</td>
					<td>-</td>
					<td>-</td>
					<td>{{buyBackList.totalWage}}</td>
					<td>{{buyBackList.totalPrice}}</td>
				</tr>
			</table>
		</div>
		<div class="printDate">
			打印时间：{{printDate}}
		</div>
	</div>
</template>
<script>
	import {jcpPrint} from "@/tools/jcp-print";
	import moment from "moment";
	export default {
		components: {},
		props: {
			sellList: {
				type: Object
			},
			buyBackList: {
				type: Object
			},
			headerData: {
				type: Object
			},
			types:{
				type:Array
			}
		},
		data() {
			return {
				printDate:""
			}
		},
		mounted() {
			this.printDate = moment().format("YYYY-MM-DD HH:mm");
		},
		methods: {
			print() {
				let doc = {
					documents: document,
				};
				jcpPrint.printPreview(doc);
			},
		}
	}
</script>

<style scoped lang="scss">
	.center {
		text-align: center;
	}
	.print-header{
		border-bottom: 1px solid;
	}
	.font-bold {
		font-weight: bold;
	}
	
	.print-box{
		font-size: 12px;
		width: 208mm;
		margin: 0 auto;
		padding: 20px;
	}
	
	.explain-box {
		display: inline-block;
		padding: 5px 35px 5px 0;
	}
	
	.head-option div {
		display: table-cell;
	}
	
	.right {
		text-align: right;
	}
	
	.head-option {
		display: table;
		width: 100%;
		margin-bottom: 5px;
	}
	
	.table-box {
		width: 100%;
		border-collapse: collapse;
	}
	
	td{
		font-size: 12px;
		border: 1px solid;
		line-height: 25px;
		text-align: center;
	}
	.printDate{
		text-align: right;
    padding: 15px 0;
	}
</style>