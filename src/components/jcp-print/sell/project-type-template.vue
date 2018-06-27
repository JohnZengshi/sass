<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">销售统计</h1>
			<div class="head-option">
				<div class="left">{{headerData.companyName}}</div>
				<div class="right">时间 {{headerData.startTime}} 至 {{headerData.endTime}}</div>
			</div>
			<div class="explain-box shopName">
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
					<td colspan="19" class="center font-bold" style="border-top: 0px;">销售报表</td>
				</tr>
				<tr>
					<td>序号</td>
					<td>产品类别</td>
					<td>件数(件)</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>售价(元/g)</td>
					<td>工费总额(元)</td>
					<!-- <td>折扣(%)</td> -->
					<!-- <td>售价(元)</td> -->
					<td>实售价(元)</td>
					<!-- <td>退换(元)</td> -->
					<td>购买额(元)</td>
					<!-- <td>回收(元)</td> -->
					<td>实收(元)</td>
					<td>成本(元)</td>
					<td>毛利(元)</td>
				</tr>
				<template v-for="productTypeList in sellList.productTypeList">
					<template v-for="productSellTypeList in productTypeList.productSellTypeList">
						<tr v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
							<td>{{index+1}}</td>
							<td>{{item.className}}</td>
							<td>{{item.totalNum|NOUNIT}}</td>
							<td>{{item.totalWeight|NOUNIT}}</td>
							<td>{{item.totalGoldWeight|NOUNIT}}</td>
							<!-- <td>{{item.totalGoldPrice|NOUNIT}}</td> -->
							<td>{{item.totalSoldPrice}}</td>
							<td>{{item.totalWage|NOUNIT}}</td>
							<!-- <td>{{item.discount|NOUNIT}}</td> -->
							<!-- <td>{{item.totalSoldPrice|NOUNIT}}</td> -->
							<td>{{item.totalRealPrice|NOUNIT}}</td>
							<!-- <td>{{item.totalExchange|NOUNIT}}</td> -->
							<!-- <td>{{add(item.totalSoldPrice, item.totalExchange)|NOUNIT}}</td> -->
							<td>{{item.totalBuy|NOUNIT}}</td>
							<td>{{item.totalActualPrice}}</td>
							<!-- <td>{{add(item.totalSoldPrice, item.totalExchange, -item.totalBuy)|NOUNIT}}</td> -->
							<td>{{item.totalCost|NOUNIT}}</td>
							<!-- <td>{{add(item.totalRealPrice, -item.totalCost)|NOUNIT}}</td> -->
							<td>{{item.margin}}</td>
						</tr>
					</template>
					<tr>
						<td colspan="2">合计</td>
						<td>{{productTypeList.totalNum}}</td>
						<td>{{productTypeList.totalWeight}}</td>
						<td>{{productTypeList.totalGoldWeight}}</td>
						<td>{{productTypeList.totalSoldPrice}}</td>
						<td>{{productTypeList.totalWage}}</td>
						<td>{{productTypeList.totalRealPrice}}</td>
						<td>{{productTypeList.totalBuy}}</td>
						<td>{{productTypeList.totalActualPrice}}</td>
						<td>{{productTypeList.totalCost}}</td>
						<td>{{productTypeList.margin}}</td>
					</tr>
				</template>
			</table>
		</div>
		<div v-show="types.indexOf('回购')>=0">
			<table class="table-box">
				<tr>
					<td colspan="19" class="center font-bold" style="border-top: 0px;">回购报表</td>
				</tr>
				<tr>
					<td>序号</td>
					<td>回购类型</td>
					<td>产品类别</td>
					<td>件数(件)</td>
					<td>件重(g)</td>
					<td>回购金价(元/g)</td>
					<td>旧料价(元)</td>
					<td>折旧(%)</td>
					<td>工费总额(元)</td>
					<td>回购价(元)</td>
				</tr>
				<template v-for="productTypeList in buyBackList.productTypeList">
					<template v-for="productSellTypeList in productTypeList.productSellTypeList">
						<tr v-for="(item,index) in productSellTypeList.productTypeList" :key="index">
							<td>{{index+1}}</td>
							<td v-if="index==0" :rowspan="productSellTypeList.productTypeList.length">
								{{productSellTypeList.sellTypeName}}
							</td>
							<td>{{item.className}}</td>
							<td>{{item.totalNum}}</td>
							<td>{{item.totalWeight}}</td>
							<td>{{item.totalGoldPrice}}</td>
							<td>{{item.estimatePrice}}</td>
							<td>{{item.totaldepreciationDiscount}}</td>
							<td>{{item.totalWage}}</td>
							<td>{{item.totalActualPrice}}</td>
						</tr>
					<tr>
						<td colspan="3">小计</td>
						<td>{{productSellTypeList.totalNum}}</td>
						<td>{{productSellTypeList.totalWeight}}</td>
						<td>-</td>
						<td>{{productSellTypeList.estimatePrice}}</td>
						<td>-</td>
						<td>{{productSellTypeList.totalWage}}</td>
						<td>{{productSellTypeList.totalActualPrice}}</td>
					</tr>
					</template>
					<tr>
						<td colspan="3">合计</td>
						<td>{{productTypeList.totalNum}}</td>
						<td>{{productTypeList.totalWeight}}</td>
						<td>-</td>
						<td>{{productTypeList.totalestimatePrice}}</td>
						<td>-</td>
						<td>{{productTypeList.totalWage}}</td>
						<td>{{productTypeList.totalActualPrice}}</td>
					</tr>
				</template>
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
		filters:{
			GRAMUNIT:(num)=>{
				if(num){
					if(Number(num)){
						return num;
					}
					return "0";
				}else{
					return "-";
				}
			},
			RMBUNIT:(num)=>{
				if(num){
					if(Number(num)){
						return num;
					}
					return "0";
				}else{
					return "-";
				}
			},
			NOUNIT:(num)=>{
				if(num){
					if(Number(num)){
						return num;
					}
					return 0;
				}else{
					return "-";
				}
			},
			SELL_TYPE:(key)=>{
				let obj = new Map();
				obj.set("1","退货");
				obj.set("2","换货");
				obj.set("3","回收");
				return obj.get(key);
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
			add(...numbers){
				let r = 0;
				for(let a of numbers){
					r = _.add(r,Number(a)||0);
				}
				return r?Number(r).toFixed(2):0;
			},
			print(){
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
		padding: 5px 35px 5px 5px;
		&.shopName{
			border: 1px solid;
			border-top: none;
			width: 100%;
			border-bottom: none;
		}
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
		border: 1px solid;
		padding: 5px 35px 5px 5px;
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
	.tl{
		text-align: left;
	}
	.tm{
		text-align: center;
	}
	.tr{
		text-align: right;
	}
</style>