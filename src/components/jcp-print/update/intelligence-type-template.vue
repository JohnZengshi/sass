<template>
	<div class="print-box breakable" id="page1">
		<div class="print-header">
			<h1 class="title center">{{title}}报表</h1>
			<div class="head-option">
				<div class="left">{{headerData.companyName}}</div>
				<div class="right">时间 {{headerData.startTime}} 至 {{headerData.endTime}}</div>
			</div>
			<div class="explain-box">
				店铺名称：{{headerData.shop}}
			</div>
			<div>
				<div class="explain-box" v-show="headerData.preparedBy">
					制单人：{{headerData.preparedBy}}
				</div>
				<div class="explain-box" v-show="headerData.salesperson">
					销售员：{{headerData.salesperson}}
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
					<td>产品类别</td>
					<td>首饰名称</td>
					<td>件数(件)</td>
					<td>件重(g)</td>
					<td>金重(g)</td>
					<td>主石(ct,g)</td>
					<td>副石(ct,g)</td>
					<td>售价(元)</td>
					<td>成本(元)</td>
				</tr>
				<template v-for="dataList in sellList.dataList">
					<template v-for="productTypeList in dataList.productTypeList">
							<template v-for="(item, index) in productTypeList.detailList">
								<tr>
									<td rowspan="2">{{item.index}}</td>
									<td v-if="index==0" :rowspan="productTypeList.detailList.length*2">{{productTypeList.className}}</td>
									<td rowspan="2">{{item.className}}</td>
									<td>{{item.num|NOUNIT}}</td>
									<td>{{item.weight|NOUNIT}}</td>
									<td>{{item.goldWeight|NOUNIT}}</td>
									<td>{{item.main}}</td>
									<td>{{item.deputy}}</td>
									<td>{{item.price|NOUNIT}}</td>
									<td>{{item.cost|NOUNIT}}</td>
								</tr>
								<tr>
									<td>{{item.afNum|NOUNIT}}</td>
									<td>{{item.afWeight|NOUNIT}}</td>
									<td>{{item.afGoldWeight|NOUNIT}}</td>
									<td>{{item.afMain}}</td>
									<td>{{item.afDeputy}}</td>
									<td>{{item.afPrice|NOUNIT}}</td>
									<td>{{item.afCost|NOUNIT}}</td>
								</tr>
							</template>
							<tr>
								<td colspan="3" rowspan="2">小计</td>
								<td>{{productTypeList.totalNum1}}件</td>
								<td>{{productTypeList.totalWeight1|GRAMUNIT}}</td>
								<td>{{productTypeList.totalGoldWeight1|GRAMUNIT}}</td>
								<td>{{productTypeList.totalMain1}}</td>
								<td>{{productTypeList.totalDeputy1}}</td>
								<td>{{productTypeList.totalPrice1|RMBUNIT}}</td>
								<td>{{productTypeList.totalCost1|RMBUNIT}}</td>
							</tr>
							<tr>
								<td>{{productTypeList.afTotalNum1}}件</td>
								<td>{{productTypeList.afTotalWeight1|GRAMUNIT}}</td>
								<td>{{productTypeList.afTotalGoldWeight1|GRAMUNIT}}</td>
								<td>{{productTypeList.afTotalMain1}}</td>
								<td>{{productTypeList.afTotalDeputy1}}</td>
								<td>{{productTypeList.afTotalPrice1|RMBUNIT}}</td>
								<td>{{productTypeList.afTotalCost1|RMBUNIT}}</td>
							</tr>
					</template>
					<tr>
						<td colspan="3" rowspan="2">合计</td>
						<td>{{dataList.totalNum0}}件</td>
						<td>{{dataList.totalWeight0|GRAMUNIT}}</td>
						<td>{{dataList.totalGoldWeight0|GRAMUNIT}}</td>
						<td>{{dataList.totalMain0}}</td>
						<td>{{dataList.totalDeputy0}}</td>
						<td>{{dataList.totalPrice0|RMBUNIT}}</td>
						<td>{{dataList.totalCost0|RMBUNIT}}</td>
					</tr>
					<tr>
						<td>{{dataList.afTotalNum0}}件</td>
						<td>{{dataList.afTotalWeight0|GRAMUNIT}}</td>
						<td>{{dataList.afTotalGoldWeight0|GRAMUNIT}}</td>
						<td>{{dataList.afTotalMain0}}</td>
						<td>{{dataList.afTotalDeputy0}}</td>
						<td>{{dataList.afTotalPrice0|RMBUNIT}}</td>
						<td>{{dataList.afTotalCost0|RMBUNIT}}</td>
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
			}
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