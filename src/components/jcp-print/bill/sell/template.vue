<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">{{title}}单据</h1>
			<div class="head-option">
				<div class="left">公司名称：{{headerData.companyName}}</div>
				<div class="right">制单时间:{{headerData.createDate|DATA_FORMAT}}</div>
			</div>
			<!-- <div>
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
			</div> -->
			<filtrateBoxByInvoices :headerData="headerData" :title="title"></filtrateBoxByInvoices>
		</div>
		<div>
			<table class="table-box">
				<tr class="tm noBorderTop">
					<td>序号</td>
					<td>条码号</td>
					<td>产品类别</td>
					<td>首饰名称</td>
					<td>销售类型</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<!-- <td>主石(ct,g)</td> -->
					<!-- <td>副石(ct,g)</td> -->
					<td>售价(元)</td>
					<!-- <td v-if="isShowCost == 'Y'">成本(元)</td> -->
				</tr>
				<tr class="tr" v-for="(item,index) in sellList.productTypeList" :key="index">
					<td>{{index+1}}</td>
					<td class="tl">{{item.barcode}}</td>
					<td class="tl">{{item.productTypeName}}</td>
					<td class="tl">{{item.jewelryName}}</td>
					<td class="tl">{{item.sellTpye|SELL_TYPE}}</td>
					<td>{{item.weight}}</td>
					<td>{{item.goldWeight}}</td>
					<!-- <td>{{item.main}}</td> -->
					<!-- <td>{{item.deputy}}</td> -->
					<td>{{item.price}}</td>
					<!-- <td v-if="isShowCost == 'Y'">{{item.cost}}</td> -->
				</tr>
				<tr class="tr">
					<td class="tm" colspan="2">合计</td>
					<td>{{sellList.totalNum}}</td>
					<td></td>
					<td></td>
					<td>{{sellList.totalWeight}}</td>
					<td>{{sellList.totalGoldWeight}}</td>
					<!-- <td>{{sellList.totalMain}}</td> -->
					<!-- <td>{{sellList.totalDeputy}}</td> -->
					<td>{{sellList.totalPrice}}</td>
					<!-- <td v-if="isShowCost == 'Y'">{{sellList.totalCost}}</td> -->
				</tr>
			</table>
		</div>
		<div class="printDate">
			<Sign :title="title"></Sign>
			打印时间：{{printDate}}
		</div>
	</div>
</template>
<script>
	import {jcpPrint} from "@/tools/jcp-print";
	import moment from "moment";
	import filtrateBoxByInvoices from "../../components/filtrateBoxByInvoices.vue"
	import Sign from "../../components/Sign.vue"
	export default {
		components: {
			filtrateBoxByInvoices,
			Sign
		},
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
			isShowCost: {
				type: String
			}
		},
		filters:{
			DATA_FORMAT:(date)=>{
				if(date){
					return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm");
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
@import "../../../../assets/css/print.scss";
	.print-box{
		width: 208mm;
	}
</style>