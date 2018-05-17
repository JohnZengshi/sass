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
		<div id="win">
		<div v-show="types.indexOf('销售')>=0">
			<table class="table-box" header-rows="2">
				<tr>
					<td colspan="16" class="center font-bold" style="border-top: 0px;">销售报表</td>
				</tr>
				<tr>
					<td>序号</td>
					<td>产品类别</td>
					<td>首饰名称</td>
					<td>件数(件)</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>工费总额(元)</td>
					<td>折扣(%)</td>
					<td>售价(元)</td>
					<td>实售价(元)</td>
					<td>退换(元)</td>
					<td>购买(元)</td>
					<td>回收(元)</td>
					<td>实收(元)</td>
					<td>成本(元)</td>
					<td>毛利(元)</td>
				</tr>
				<template v-for="productTypeList in sellList.productTypeList">
					<template v-for="productSellTypeList in productTypeList.productSellTypeList">
						<template v-for="(productType, rowNum) in productSellTypeList.productTypeList">
							<tr v-for="(item,index) in productType.detailList">
								<td>{{item.index}}</td>
								<td v-if="index==0" :rowspan="productType.detailList.length">{{productType.className}}</td>
								<td>{{item.className}}</td>
								<td>{{item.num|NOUNIT}}</td>
								<td>{{item.weight|NOUNIT}}</td>
								<td>{{item.goldWeight|NOUNIT}}</td>
								<td>{{item.wage|NOUNIT}}</td>
								<td>{{item.discount}}</td>
								<td>{{item.soldPrice|NOUNIT}}</td>
								<td>{{item.realPrice|NOUNIT}}</td>
								<td>{{item.exchange|NOUNIT}}</td>
								<td>{{Number(item.realPrice)+Number(item.exchange)|NOUNIT}}</td>
								<td>{{item.buy|NOUNIT}}</td>
								<td>{{(Number(item.realPrice)+Number(item.exchange)-item.buy)|NOUNIT}}</td>
								<td>{{item.cost|NOUNIT}}</td>
								<td>{{Number(item.realPrice)-Number(item.cost)|NOUNIT}}</td>
							</tr>
							<tr>
								<td colspan="3">小计</td>
								<td>{{productType.totalNum}}件</td>
								<td>{{productType.totalWeight|GRAMUNIT}}</td>
								<td>{{productType.totalGoldWeight|GRAMUNIT}}</td>
								<td>{{productType.totalWage|RMBUNIT}}</td>
								<td>{{productType.totalDiscount}}</td>
								<td>{{productType.totalSoldPrice|RMBUNIT}}</td>
								<td>{{productType.totalRealPrice|RMBUNIT}}</td>
								<td>{{productType.totalExchange|RMBUNIT}}</td>
								<td>{{Number(productType.totalRealPrice)+Number(productType.totalExchange)|RMBUNIT}}</td>
								<td>{{productType.totalBuy|RMBUNIT}}</td>
								<td>{{Number(productType.totalRealPrice)+Number(productType.totalExchange)-productType.totalBuy|RMBUNIT}}</td>
								<td>{{productType.totalCost|RMBUNIT}}</td>
								<td>{{Number(productType.totalRealPrice)-Number(productType.totalCost)|RMBUNIT}}</td>
							</tr>
						</template>
						<tr>
							<td colspan="3">合计</td>
							<td>{{productSellTypeList.totalNum}}件</td>
							<td>{{productSellTypeList.totalWeight|GRAMUNIT}}</td>
							<td>{{productSellTypeList.totalGoldWeight|GRAMUNIT}}</td>
							<td>{{productSellTypeList.totalWage|RMBUNIT}}</td>
							<td>{{productSellTypeList.totalDiscount}}</td>
							<td>{{productSellTypeList.totalSoldPrice|RMBUNIT}}</td>
							<td>{{productSellTypeList.totalRealPrice|RMBUNIT}}</td>
							<td>{{productSellTypeList.totalExchange|RMBUNIT}}</td>
							<td>{{Number(productSellTypeList.totalRealPrice)+Number(productSellTypeList.totalExchange)|RMBUNIT}}</td>
							<td>{{productSellTypeList.totalBuy|RMBUNIT}}</td>
							<td>{{Number(productSellTypeList.totalRealPrice)+Number(productSellTypeList.totalExchange)-productSellTypeList.totalBuy|RMBUNIT}}</td>
							<td>{{productSellTypeList.totalCost|RMBUNIT}}</td>
							<td>{{Number(productSellTypeList.totalRealPrice)-Number(productSellTypeList.totalCost)|RMBUNIT}}</td>
						</tr>
					</template>
				</template>
			</table>
		</div>
		<div v-show="types.indexOf('回购')>=0">
				<table class="table-box" header-rows="2">
					<tr>
						<td colspan="11" class="center font-bold" style="border-top: 0px;">回购报表</td>
					</tr>
					<tr>
						<td>序号</td>
						<td>回购类型</td>
						<td>产品类别</td>
						<td>首饰名称</td>
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
							<template v-for="(productType, rowNum) in productSellTypeList.productTypeList">
								<tr v-for="(item,index) in productType.detailList">
									<td>{{item.index}}</td>
									<td v-if="rowNum==0 && index==0" :rowspan="productSellTypeList.rows">
										{{productSellTypeList.sellType|SELL_TYPE}}
									</td>
									<td v-if="index==0" :rowspan="productType.detailList.length">
										{{productType.className}}
									</td>
									<td>{{item.className}}</td>
									<td>{{item.num|NOUNIT}}</td>
									<td>{{item.weight|NOUNIT}}</td>
									<td>{{item.goldWeight|NOUNIT}}</td>
									<td>{{item.soldPrice|NOUNIT}}</td>
									<td>{{item.discount}}</td>
									<td>{{item.wage|NOUNIT}}</td>
									<td>{{item.buy|NOUNIT}}</td>
								</tr>
							</template>
							<tr>
								<td colspan="4">小计</td>
								<td>{{productSellTypeList.totalNum}}</td>
								<td>{{productSellTypeList.totalWeight|GRAMUNIT}}</td>
								<td>{{productSellTypeList.totalGoldWeight}}元/g</td>
								<td>{{productSellTypeList.totalGoldPrice|RMBUNIT}}</td>
								<td>{{productSellTypeList.discount}}</td>
								<td>{{productSellTypeList.totalWage|RMBUNIT}}</td>
								<td>{{productSellTypeList.totalBuy|RMBUNIT}}</td>
							</tr>
						</template>
						<tr>
							<td colspan="4">合计</td>
							<td>{{productTypeList.totalNum}}</td>
							<td>{{productTypeList.totalWeight|GRAMUNIT}}</td>
							<td>{{productTypeList.totalGoldWeight}}元/g</td>
							<td>{{productTypeList.totalGoldPrice|RMBUNIT}}</td>
							<td>{{productTypeList.discount}}</td>
							<td>{{productTypeList.totalWage|RMBUNIT}}</td>
							<td>{{productTypeList.totalBuy|RMBUNIT}}</td>
						</tr>
					</template>
				</table>
		</div>
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
						return Number(num).toFixed(2)+"g";
					}
					return "0g";
				}else{
					return "-";
				}
			},
			RMBUNIT:(num)=>{
				if(num){
					if(Number(num)){
						return Number(num).toFixed(3) +"元";
					}
					return "0元";
				}else{
					return "-";
				}
			},
			NOUNIT:(num)=>{
				if(num){
					if(Number(num)){
						return Number(num).toFixed(3);
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
		watch:{
			sellList:function(n, o){
				this.transition(n);
			},
			buyBackList:function(n, o){
				this.transition(n);
			},
		},
		data() {
			return {
				printDate:""
			}
		},
		computed: {
	  },
		mounted() {
			this.printDate = moment().format("YYYY-MM-DD HH:mm");
		},
		methods: {
			transition(now){
				if(!now)return;
				let i = 1;
				for(let productTypeList of now.productTypeList){
					for(let productSellTypeList of productTypeList.productSellTypeList){
						productSellTypeList.rows=0;
						for(let productType of productSellTypeList.productTypeList){
							for(let item of productType.detailList){
								productSellTypeList.rows++;
								item.index = i++;
							}
						}
					}
				}
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