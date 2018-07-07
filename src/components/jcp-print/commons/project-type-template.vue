<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">{{title}}报表</h1>
			<div class="head-option">
				<div class="left">{{headerData.companyName}}</div>
				<div class="tableType">分类：{{tabTitle}}</div>
				<div class="right">时间 {{headerData.startTime}} 至 {{headerData.endTime}}</div>
			</div>
			<filtrateBox :headerData="headerData" :title="title"></filtrateBox>
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
						<td>{{item.totalNum1}}</td>
						<td>{{item.totalWeight1}}</td>
						<td>{{item.totalGoldWeight1}}</td>
						<td>{{item.totalMain1}}</td>
						<td>{{item.totalDeputy1}}</td>
						<td>{{item.totalPrice1}}</td>
						<td v-show="tabSwitch">{{item.totalCost1}}</td>
					</tr>
					<tr class="tr">
						<td class="tm">合计</td>
						<td>{{dataList.totalNum0}}</td>
						<td>{{dataList.totalWeight0}}</td>
						<td>{{dataList.totalGoldWeight0}}</td>
						<td>{{dataList.totalMain0}}</td>
						<td>{{dataList.totalDeputy0}}</td>
						<td>{{dataList.totalPrice0}}</td>
						<td v-show="tabSwitch">{{dataList.totalCost0}}</td>
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
	import filtrateBox from "../components/filtrateBox.vue"
	export default {
		components: {
			filtrateBox
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
			tabSwitch:{
				type:Boolean
			},
			tabTitle:{
				type:String
			},
		},
		filters:{
			GRAMUNIT:(num)=>{
				if(num){
					if(Number(num)){
						return num+"g";
					}
					return "0g";
				}else{
					return "-";
				}
			},
			RMBUNIT:(num)=>{
				if(num){
					if(Number(num)){
						return num+"元";
					}
					return "0元";
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
@import "../../../assets/css/print.scss";
.print-box{
	width: 208mm;
}
</style>