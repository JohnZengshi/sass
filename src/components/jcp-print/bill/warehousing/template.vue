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
					入库库位：{{headerData.storageName}}
				</div>
				<div class="explain-box">
					供应商：{{headerData.supplierName}}
				</div>
			</div>
			<div>
				<div class="explain-box" v-show="headerData.makeOrderManName">
					制单人：{{headerData.makeOrderManName}}
				</div>
			</div> -->
			<filtrateBoxByInvoices :headerData="headerData" :title="title"></filtrateBoxByInvoices>
		</div>
		<div>
			<table class="table-box">
				<tr class="tm noBorderTop">
					<td>序号</td>
					<td>条码号</td>
					<td>首饰名称</td>
					<td>总件重(g)</td>
					<td>净金重(g)</td>
					<!-- <td>证书号</td> -->
					<td>主石(ct,g)</td>
					<td>副石(ct,g)</td>
					<td>售价(元)</td>
					<td>成本(元)</td>
				</tr>
				<tr class="tr" v-for="(item,index) in sellList.detailList" :key="index">
					<td>{{index+1}}</td>
					<td>{{item.barcode}}</td>
					<td class="tl">{{item.jewelryName}}</td>
					<td>{{item.weight}}</td>
					<td>{{item.goldWeight}}</td>
					<!-- <td>{{item.certificateCode}}</td> -->
					<td>{{item.main}}</td>
					<td>{{item.deputy}}</td>
					<td>{{item.price}}</td>
					<td>{{item.cost}}</td>
				</tr>
				<tr class="tr">
					<td class="tm" colspan="2">合计</td>
					<td>{{sellList.totalNum}}</td>
					<td>{{sellList.totalWeight}}</td>
					<td>{{sellList.totalGoldWeight}}</td>
					<td>{{sellList.totalMain}}</td>
					<td>{{sellList.totalDeputy}}</td>
					<td>{{sellList.totalPrice}}</td>
					<td>{{sellList.totalCost}}</td>
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
		},
		filters:{
			DATA_FORMAT:(date)=>{
				if(date){
					return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm");
				}
			},
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