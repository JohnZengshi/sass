<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">{{title}}报表</h1>
			<div class="head-option">
				<div class="left">公司名称：{{headerData.companyName}}</div>
				<div class="tableType">分类：{{tabTitle}}</div>
				<div class="right">时间 {{headerData.startTime}} 至 {{headerData.endTime}}</div>
			</div>
			<filtrateBox :headerData="headerData" :title="title"></filtrateBox>
		</div>
		<div>
			<table class="table-box">
				<tr class="tm noBorderTop">
					<td>序号</td>
					<td>条码号</td>
					<td>首饰名称</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>主石(ct,g)</td>
					<td>副石(ct,g)</td>
					<td>售价(元)</td>
					<td v-show="tabSwitch">成本(元)</td>
				</tr>
				<tr class="tr" v-for="(item,index) in sellList.detailList" :key="index">
					<td>{{index+1}}</td>
					<td class="tl">{{item.barcode}}</td>
					<td class="tl">{{item.jewelryName}}</td>
					<td>{{item.weight}}</td>
					<td>{{item.goldWeight}}</td>
					<td>{{item.main}}</td>
					<td>{{item.deputy}}</td>
					<td>{{item.price}}</td>
					<td v-show="tabSwitch">{{item.cost}}</td>
				</tr>
				<tr class="tr">
					<td class="tm" colspan="2">合计</td>
					<td>{{sellList.totalNum}}</td>
					<td>{{sellList.totalWeight}}</td>
					<td>{{sellList.totalGoldWeight}}</td>
					<td>{{sellList.totalMain}}</td>
					<td>{{sellList.totalDeputy}}</td>
					<td>{{sellList.totalPrice}}</td>
					<td v-show="tabSwitch">{{sellList.totalCost}}</td>
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
	import filtrateBox from "../components/filtrateBox.vue"
	export default {
		components: {
			filtrateBox
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
			tabTitle:{
				type:String
			},
			tabSwitch:{
				type:Boolean
			}
		},
		data() {
			return {
				printDate:""
			}
		},
		mounted() {
			this.printDate = moment().format("YYYY-MM-DD HH:mm");
			console.log(this.headerData)
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
@import "../../../assets/css/print.scss";
	.print-box {
		width: 208mm;
	}
	
</style>