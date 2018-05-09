<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">{{title}}单据</h1>
			<div class="head-option">
				<div class="left">{{headerData.companyName}}</div>
				<div class="right">制单时间:{{headerData.createDate|DATA_FORMAT}}</div>
			</div>
			<div>
				<div class="explain-box">
					单据号：{{headerData.orderNum}}
				</div>
				<div class="explain-box">
					店铺名称：{{headerData.shopName}}
				</div>
			</div>
			<div>
				<div class="explain-box" v-show="headerData.makeOrderManName">
					制单人：{{headerData.makeOrderManName}}
				</div>
				<div class="explain-box" v-show="headerData.sellManName">
					销售员：{{headerData.sellManName}}
				</div>
				<div class="explain-box" v-show="headerData.cashName">
					收银员：{{headerData.cashName}}
				</div>
			</div>
		</div>
		<div>
			<table class="table-box">
				<tr>
					<td>序号</td>
					<td>条码号</td>
					<td>产品类别</td>
					<td>首饰名称</td>
					<td>销售类型</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>主石(ct,g)</td>
					<td>副石(ct,g)</td>
					<td>售价(元)</td>
					<td>成本(元)</td>
				</tr>
				<tr v-for="(item,index) in sellList.productTypeList" :key="index">
					<td>{{index+1}}</td>
					<td>{{item.barcode}}</td>
					<td>{{item.productTypeName}}</td>
					<td>{{item.jewelryName}}</td>
					<td>{{item.sellTpye|SELL_TYPE}}</td>
					<td>{{item.weight}}</td>
					<td>{{item.goldWeight}}</td>
					<td>{{item.main}}</td>
					<td>{{item.deputy}}</td>
					<td>{{item.price}}</td>
					<td>{{item.cost}}</td>
				</tr>
				<tr>
					<td colspan="2">合计</td>
					<td>{{sellList.totalNum}}件</td>
					<td></td>
					<td></td>
					<td>{{sellList.totalWeight}}g</td>
					<td>{{sellList.totalGoldWeight}}g</td>
					<td>{{sellList.totalMain}}</td>
					<td>{{sellList.totalDeputy}}</td>
					<td>{{sellList.totalPrice}}元</td>
					<td>{{sellList.totalCost}}元</td>
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
			title: {
				type: String
			},
			headerData: {
				type: Object
			},
		},
		filters:{
			DATA_FORMAT:(date)=>{
				if(date){
					return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH-mm");
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
			this.printDate = moment().format("YYYY-MM-DD HH-mm");
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
	.font-bold {
		font-weight: bold;
	}
	
	.print-box{
		font-size: 12px;
		width: 208mm;
		margin: 0 auto;
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