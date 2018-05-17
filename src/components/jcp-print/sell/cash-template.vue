<template>
	<div class="print-box" id="page1">
		<div class="print-header">
			<h1 class="title center">收银统计</h1>
			<div class="head-option">
				<div class="left">{{printSelectDate.companyName}}</div>
				<div class="right">时间 {{printSelectDate.startTime}} 至 {{printSelectDate.endTime}}</div>
			</div>
			<div class="explain-box">
				店铺名称：{{printSelectDate.shop}}
			</div>
			<!--<div class="explain-box">
				班组名称：{{printSelectDate.}}
			</div>-->
		</div>
		<div>
			<table class="table-box">
				<tr>
					<td colspan="6" class="center font-bold">收款统计</td>
				</tr>
				<tr>
					<td>收款方式与金额</td>
					<td>刷卡：{{cashierStatistics.slotCard || 0}}元</td>
					<td>现金：{{cashierStatistics.cash || 0}}元</td>
					<td>微信：{{cashierStatistics.weixin || 0}}元</td>
					<td>支付宝：{{cashierStatistics.zhifubao || 0}}元</td>
					<td>其他：{{cashierStatistics.other || 0}}元</td>
				</tr>
				<tr>
					<td>实际收银</td>
					<td colspan="5">{{cashierStatistics.totalMoney || 0}}元</td>
				</tr>
			</table>
		</div>
		<div>
			<table class="table-box">
				<tr>
					<td colspan="7" class="center font-bold" style="border-top: 0px;">销售统计</td>
				</tr>
				<tr>
					<td>序号</td>
					<td>产品类别</td>
					<td>件数(件)</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>标价(元)</td>
					<td>实售价(元)</td>
				</tr>
				<template v-for="productTypeList in sellStorage.productTypeList">
					<template v-for="productSellTypeList in productTypeList.productSellTypeList">
						<tr v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
							<td>{{index+1}}</td>
							<td>{{item.className}}</td>
							<td>{{item.totalNum}}</td>
							<td>{{item.totalWeight}}</td>
							<td>{{item.totalGoldWeight}}</td>
							<td>{{item.totalSoldPrice}}</td>
							<td>{{item.totalRealPrice}}</td>
						</tr>
					</template>
					<tr>
						<td colspan="2">小计</td>
						<td>{{productTypeList.totalNum}}</td>
						<td>{{productTypeList.totalWeight}}g</td>
						<td>{{productTypeList.totalGoldWeight}}g</td>
						<td>{{productTypeList.totalSoldPrice}}元</td>
						<td>{{productTypeList.totalRealPrice}}元</td>
					</tr>
				</template>
			</table>
		</div>
		<div>
			<table class="table-box">
				<tr>
					<td colspan="8" class="center font-bold" style="border-top: 0px;">回购统计</td>
				</tr>
				<tr>
					<td>序号</td>
					<td>类型</td>
					<td>产品类别</td>
					<td>件数(件)</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>手工费(元)</td>
					<td>回购价(元)</td>
				</tr>
				<template v-for="productTypeList in buyBackStorage.productTypeList">
					<template v-for="productSellTypeList in productTypeList.productSellTypeList">
						<tr v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
							<td>{{index+1}}</td>
							<td>{{productSellTypeList.sellTypeName}}</td>
							<td>{{item.className}}</td>
							<td>{{item.totalNum}}</td>
							<td>{{item.totalWeight}}</td>
							<td>{{item.totalGoldWeight}}</td>
							<td>{{item.totalWage}}</td>
							<td>{{item.totalBuy}}</td>
						</tr>
					</template>
					<tr>
						<td colspan="3">小计</td>
						<td>{{productTypeList.totalNum}}</td>
						<td>{{productTypeList.totalWeight}}g</td>
						<td>{{productTypeList.totalGoldWeight}}g</td>
						<td>{{productTypeList.totalWage}}元</td>
						<td>{{productTypeList.totalBuy}}元</td>
					</tr>
				</template>
				<tr>
					<td>合计</td>
					<td colspan="3">销售金额：{{totalRealPrice}}元</td>
					<td colspan="2">回购金额：{{totalBuy}}元</td>
					<td colspan="2">实际金额：{{Number(totalRealPrice) + Number(totalBuy)}}元</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
	export default {
		components: {},
		props: {
			cashierStatistics: {
				type: Object
			},
			sellStorage: {
				type: Object
			},
			buyBackStorage: {
				type: Object
			},
			printSelectDate: {
				type: Object
			},
		},
		watch: {
			sellStorage: function() {
				this.computedTotalRealPrice();
			},
			buyBackStorage: function() {
				this.computedTotalBuy();
			},
		},
		data() {
			return {
				totalRealPrice: 0,
				totalBuy: 0,
			}
		},
		mounted() {},
		methods: {
			print() {
				var myDoc = {
					documents: document,
					copyrights: '杰创软件拥有版权  www.jatools.com',
					paperName:"A4",
				};
				var jcp = getJCP();
				jcp.printPreview(myDoc, false);
			},
			computedTotalRealPrice() {
				this.totalRealPrice = this.sellStorage.productTypeList[0].totalRealPrice;
			},
			computedTotalBuy() {
				this.totalBuy = this.buyBackStorage.productTypeList[0].totalBuy;
			},
		}
	}
</script>

<style scoped lang="scss">
	.center {
		text-align: center;
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
		padding: 10px 10px 10px 0;
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
</style>