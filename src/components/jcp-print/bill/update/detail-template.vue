<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">{{title}}报表</h1>
			<div class="head-option">
				<div class="left">{{headerData.companyName}}</div>
				<div class="right">制单时间 {{headerData.createDate|DATA_FORMAT}}</div>
			</div>
			<div class="explain-box">
				单据号：{{headerData.orderNum}}
			</div>
			<div class="explain-box">
				库位：{{headerData.storageName}}
			</div>
			<div>
				<div class="explain-box" v-show="headerData.makeOrderManName">
					制单人：{{headerData.makeOrderManName}}
				</div>
				<div class="explain-box" v-show="headerData.checkName">
					审核人：{{headerData.checkName}}
				</div>
				<div class="explain-box" v-show="headerData.payee">
					收银人：{{headerData.payee}}
				</div>
			</div>
		</div>
		<div>
			<table class="table-box">
				<tr>
					<td>序号</td>
					<td>条码号</td>
					<td>首饰名称</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>主石(ct,g)</td>
					<td>副石(ct,g)</td>
					<td>售价(元)</td>
					<td>成本(元)</td>
				</tr>
				<template v-for="(item,index) in sellList.rowDataList">
					<tr>
						<td rowspan="2">{{index+1}}</td>
						<td rowspan="2">{{item.now.barcode}}</td>
						<td>{{item.now.metalColor+item.now.gemName+item.now.jewelryName}}</td>
						<td>{{item.now.totalWeight}}</td>
						<td>{{item.now.netWeight}}</td>
						<td>{{item.now.mainWeight}}</td>
						<td>{{item.now.deputyWeight}}</td>
						<td>{{item.now.soldPrice}}</td>
						<td>{{item.now.costPrice}}</td>
					</tr>
					<tr>
						<td>{{item.old.metalColor+item.old.gemName+item.old.jewelryName}}</td>
						<td>{{item.old.totalWeight}}&nbsp;</td>
						<td>{{item.old.netWeight}}</td>
						<td>{{item.old.mainWeight}}</td>
						<td>{{item.old.deputyWeight}}</td>
						<td>{{item.old.soldPrice}}</td>
						<td>{{item.old.costPrice}}</td>
					</tr>
				</template>
				<tr>
					<td colspan="3" rowspan="2">合计</td>
					<td>{{sellList.now.weight}}g</td>
					<td>{{sellList.now.netWeight}}g</td>
					<td>{{sellList.now.mainWeight}}</td>
					<td>{{sellList.now.deputyWeight}}</td>
					<td>{{sellList.now.price}}元</td>
					<td>{{sellList.now.cost}}元</td>
				</tr>
				<tr>
					<td>{{sellList.old.weight}}g</td>
					<td>{{sellList.old.netWeight}}g</td>
					<td>{{sellList.old.mainWeight}}</td>
					<td>{{sellList.old.deputyWeight}}</td>
					<td>{{sellList.old.price}}元</td>
					<td>{{sellList.old.cost}}元</td>
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
				type: Object,
				default: ()=>{
					return {old:{},now:{}}
				}
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