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
					<td>首饰名称</td>
					<td>件数(件)</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>主石(ct,g)</td>
					<td>副石(ct,g)</td>
					<td>售价(元)</td>
					<td v-show="tabSwitch">成本(元)</td>
				</tr>
				<template v-for="dataList in sellList.dataList">
					<template v-for="productTypeList in dataList.productTypeList">
							<tr class="tr" v-for="(item, index) in productTypeList.detailList">
								<!-- <td>{{item.index}}</td> -->
								<td class="tl" v-if="index==0" :rowspan="productTypeList.detailList.length">{{productTypeList.className}}</td>
								<td class="tl">{{item.className}}</td>
								<td>{{item.num}}</td>
								<td>{{item.weight}}</td>
								<td>{{item.goldWeight}}</td>
								<td>{{item.main}}</td>
								<td>{{item.deputy}}</td>
								<td>{{item.price}}</td>
								<td v-show="tabSwitch">{{item.cost}}</td>
							</tr>
							<tr class="tr">
								<td class="tm" colspan="2">小计</td>
								<td>{{productTypeList.totalNum1}}</td>
								<td>{{productTypeList.totalWeight1}}</td>
								<td>{{productTypeList.totalGoldWeight1}}</td>
								<td>{{productTypeList.totalMain1}}</td>
								<td>{{productTypeList.totalDeputy1}}</td>
								<td>{{productTypeList.totalPrice1}}</td>
								<td v-show="tabSwitch">{{productTypeList.totalCost1}}</td>
							</tr>
					</template>
					
					<tr class="tr">
						<td class="tm" colspan="2">合计</td>
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
				for(let dataList of now.dataList){
					for(let productTypeList of dataList.productTypeList){
							for(let item of productTypeList.detailList){
								item.index = i++;
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
@import "../../../assets/css/print.scss";
.print-box{
	width: 208mm;
}
</style>