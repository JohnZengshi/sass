<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">{{title}}单据</h1>
			<div class="head-option">
				<div class="left">公司名称：{{headerData.companyName}}</div>
				<div class="left">分类：{{tabTitle}}</div>
				<div class="right">制单时间:{{headerData.createDate|DATA_FORMAT}}</div>
			</div>
			<filtrateBoxByInvoices :headerData="headerData" :title="title" :reportType="reportType"></filtrateBoxByInvoices>
		</div>
		<div>
			<table class="table-box">
				<tr class="tm noBorderTop">
					<!-- <td>序号</td> -->
					<td>产品类别</td>
					<td>件数(件)</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>主石(ct,g)</td>
					<td>副石(ct,g)</td>
					<td>售价(元)</td>
					<td v-show="tabSwitch">成本(元)</td>
				</tr>
				<template v-for="dataList in sellList.dataList">
					<tr class="tr" v-for="(item, index) in dataList.productTypeList" :key="index">
						<!-- <td>{{index+1}}</td> -->
						<td class="tl">{{item.className}}</td>
						<td>{{item.totalNum1|NOUNIT}}</td>
						<td>{{item.totalWeight1|NOUNIT}}</td>
						<td>{{item.totalGoldWeight1|NOUNIT}}</td>
						<td>{{item.totalMain1}}</td>
						<td>{{item.totalDeputy1}}</td>
						<td>{{item.totalPrice1|NOUNIT}}</td>
						<td v-show="tabSwitch">{{item.totalCost1|NOUNIT}}</td>
					</tr>
					<tr class="tr">
						<td class="tm" colspan="1">合计</td>
						<td>{{dataList.totalNum0}}</td>
						<td>{{dataList.totalWeight0|GRAMUNIT}}</td>
						<td>{{dataList.totalGoldWeight0|GRAMUNIT}}</td>
						<td>{{dataList.totalMain0}}</td>
						<td>{{dataList.totalDeputy0}}</td>
						<td>{{dataList.totalPrice0|RMBUNIT}}</td>
						<td v-show="tabSwitch">{{dataList.totalCost0|RMBUNIT}}</td>
					</tr>
				</template>
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
			headerData: {
				type: Object
			},
			title:{
				type:String
			},
			//1代表入库、2退库、3调库、4发货、5调柜、6退货
			reportType: {
				type: Number
			},
			tabTitle:{
				type:String
			},
			tabSwitch:{
				type:Boolean
			}
		},
		filters:{
			DATA_FORMAT:(date)=>{
				if(date){
					return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm");
				}
			},
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
						return num+"";
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
		watch:{
			sellList:function(n, o){
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
 @import "../../../../assets/css/print.scss";
	.print-box{
		width: 208mm;
	}
</style>