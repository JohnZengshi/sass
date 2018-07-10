<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">{{title}}单据</h1>
			<div class="head-option">
				<div class="left">公司名称：{{headerData.companyName}}</div>
				<div class="left">分类：{{tabTitle}}</div>
				<div class="right">制单时间:{{headerData.createDate|DATA_FORMAT}}</div>
			</div>
			<!-- <div>
				<div class="explain-box">
					单据号：{{headerData.orderNum}}
				</div>
				<template v-if="reportType==2">
					<div class="explain-box">
						退库库位：{{headerData.storageName}}
					</div>
					<div class="explain-box">
						供应商：{{headerData.supplierName}}
					</div>
				</template>
				<template v-else-if="reportType==3">
					<div class="explain-box">
						调出位置：{{headerData.storageName}}
					</div>
					<div class="explain-box">
						调入位置：{{headerData.storageName2}}
					</div>
				</template>
				<template v-else-if="reportType==4">
					<div class="explain-box">
						发货库位：{{headerData.storageName}}
					</div>
					<div class="explain-box">
						收货店铺：{{headerData.shopName}}
					</div>
					<div class="explain-box">
						存放柜组：{{headerData.counterName}}
					</div>
				</template>
				<template v-else-if="reportType==5">
					<div class="explain-box">
						调柜店铺：{{headerData.distributor}}
					</div>
					<div class="explain-box">
						调出柜组：{{headerData.groupName2}}
					</div>
					<div class="explain-box">
						调入柜组：{{headerData.groupName2}}
					</div>
				</template>
				<template v-else-if="reportType==6">
					<div class="explain-box">
						退货库位：{{headerData.storageName}}
					</div>
					<div class="explain-box">
						退货铺位：{{headerData.shopName}}
					</div>
				</template>
			</div>
			<div>
				<div class="explain-box" v-show="headerData.makeOrderManName">
					制单人：{{headerData.makeOrderManName}}
				</div>
				<template v-if="reportType==2">
					<div class="explain-box" v-show="headerData.checkName">
						审核人：{{headerData.checkName}}
					</div>
				</template>
				<template v-else-if="reportType==3">
					<div class="explain-box" v-show="headerData.consigneeName">
						收货人：{{headerData.consigneeName}}
					</div>
				</template>
				<template v-else-if="reportType==4">
					<div class="explain-box" v-show="headerData.checkName">
						审核人：{{headerData.checkName}}
					</div>
					<div class="explain-box" v-show="headerData.consigneeName">
						收货人：{{headerData.consigneeName}}
					</div>
				</template>
				<template v-else-if="reportType==6">
					<div class="explain-box" v-show="headerData.checkName">
						审核人：{{headerData.checkName}}
					</div>
					<div class="explain-box" v-show="headerData.consigneeName">
						收货人：{{headerData.consigneeName}}
					</div>
				</template>
			</div> -->
			 <filtrateBoxByInvoices :headerData="headerData" :title="title" :reportType="reportType"></filtrateBoxByInvoices>
		</div>
		<div>
			<table class="table-box">
				<tr class="tm noBorderTop">
					<td>序号</td>
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
								<td>{{item.index}}</td>
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
								<td class="tm" colspan="3">小计</td>
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
						<td class="tm" colspan="3">合计</td>
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
 @import "../../../../assets/css/print.scss";
	.print-box{
		width: 208mm;
	}
</style>