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
			</div>
		</div>
		<div>
			<table class="table-box">
				<tr>
					<td>序号</td>
					<td>产品类别</td>
					<td>件数(件)</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>主石(ct,g)</td>
					<td>副石(ct,g)</td>
					<td>售价(元)</td>
					<td>成本(元)</td>
				</tr>
				<template v-for="dataList in sellList.dataList">
					<tr v-for="(item, index) in dataList.productTypeList" :key="index">
						<td>{{index+1}}</td>
						<td>{{item.className}}</td>
						<td>{{item.totalNum1|NOUNIT}}</td>
						<td>{{item.totalWeight1|NOUNIT}}</td>
						<td>{{item.totalGoldWeight1|NOUNIT}}</td>
						<td>{{item.totalMain1}}</td>
						<td>{{item.totalDeputy1}}</td>
						<td>{{item.totalPrice1|NOUNIT}}</td>
						<td>{{item.totalCost1|NOUNIT}}</td>
					</tr>
					<tr>
						<td colspan="2">合计</td>
						<td>{{dataList.totalNum0}}件</td>
						<td>{{dataList.totalWeight0|GRAMUNIT}}</td>
						<td>{{dataList.totalGoldWeight0|GRAMUNIT}}</td>
						<td>{{dataList.totalMain0}}</td>
						<td>{{dataList.totalDeputy0}}</td>
						<td>{{dataList.totalPrice0|RMBUNIT}}</td>
						<td>{{dataList.totalCost0|RMBUNIT}}</td>
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
	export default {
		components: {},
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
		},
		filters:{
			DATA_FORMAT:(date)=>{
				if(date){
					return moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH-mm");
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
			this.printDate = moment().format("YYYY-MM-DD HH-mm");
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