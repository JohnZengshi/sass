<template>
<transition name="tp-ani">
<div class="rp_chart_item">
	<img v-if="isNoData" src="./../../../../../../static/img/kc-no.png" />
	<storage-chart v-else :chartData="chartData" :chartloading="chart_configData.loading" :chartSize="chartSize"></storage-chart>
	<div class="rp_chart_total">
		<span class="_total_txt">总计</span>
		<span class="_total" :title="chart_configData.totalNum"><b v-text="chart_configData.totalNum"></b>件</span>
		<span class="_total" :title="chart_configData.totalWeight"><b v-text="chart_configData.totalWeight"></b>g</span>
		<span class="_total" :title="chart_configData.totalPrice"><b v-text="chart_configData.totalPrice"></b>元</span>
	</div>
</div>
</transition>
</template>

<script>
import StorageChart from './templateChart'
import {seekReportsHomeKC} from 'Api/commonality/operate.js'
import { stocksData } from './data/chartDateOption'
const  _assign = require('lodash/assign')
export default {
  	data(){
		return{
			isNoData: false,
			chartData : null,
		    chartSize : {
		   	  x : 401,
		   	  y : 330
		    },
			chart_configData: {
				type : 1,
				loading : true,
				totalNum : 0, //件数
				totalPrice : 0, //售价
				totalWeight : 0, //重量
				dataList : []
			}
		}
  	},
	components :{
		StorageChart
	},
  	created(){
		this.getReportsHome()
	},
	methods:{
		getReportsHome(){
			let option = {
				type : this.chart_configData.type 
			}
			seekReportsHomeKC().then( (res)=>{
				console.log(res)
				if( res.data.state == 200){
					if (res.data.data.dataList.length == 0) {
						this.isNoData = true
					} else {
						this.isNoData = false
					}
					setTimeout(()=>{
						_assign( this.chart_configData , res.data.data,{ loading : false })
						// console.log(this.chart_configData)
						this.chartData = stocksData( this.chart_configData.dataList)
						// console.log(this.chartData)
					},100)
				}
			},(res)=>{
				this.$message({
	           		type :'error',
	           		message : res.data.msg
	           })
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.rp_chart_item{
	position: relative;
	width: 33.33%;
	height: 330px;
	background-color: #fff;
	box-shadow: 0 0 15px #dedede;
	border-radius: 10px;
	&>img {
		width: 260px;
		height: 260px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -130px;
		margin-top: -130px;
	}
	&+ .rp_chart_item{
		margin-left: 23px;
	}
	
	>.rp_chart_total{
		position: absolute;
		left: 0;
		bottom: 10px;
		height: 25px;
		line-height: 25px;
		width: 100%;
		display: flex;
		padding: 0 12px;
		user-select: none;
		
		>span{
			width: 33.33%;
			color: #333;
			font-size: 12px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			b{
				display: inline-block;
				color: #2993f8;
				font-size: 14px;
				margin-right: 2px;
				max-width: 68px;
				vertical-align: middle;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		._total{
			text-align: right;
		}
		._total_txt{
			width: 45%;
			padding-left: 8px;
			font-size: 14px;
		}
	}

}
</style>