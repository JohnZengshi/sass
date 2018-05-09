<template>
<transition name="tp-ani">
<div class="rp_chart_item">
	<storage-chart :chartData="chartData" ref="echarts" :chartloading="chart_configData.loading" :chartSize="chartSize"></storage-chart>
	<div class="rp_chart_total">
		<span class="_total_txt">总计</span>
		<span class="_total" :title="chart_configData.totalNum"><b v-text="chart_configData.totalNum"></b>件</span>
		<span class="_total" :title="chart_configData.totalWeight"><b v-text="chart_configData.totalWeight"></b>g</span>
		<span class="_total" :title="chart_configData.totalPrice"><b v-text="chart_configData.totalPrice"></b>元</span>
	</div>
	<div class="rp_chart_title">
		<span class="txt">今日<span>{{companyRole ? '进库': shopRole ? '进货':'进库'}}</span>数据</span>
		<span class="swtich" @click="proTypeSwitch" :title="chart_configData.title">{{chart_configData.text}}<i class="iconfont icon-qiehuan"></i></span>
	</div>
</div>
</transition>
</template>

<script>
import Vue from 'vue'
import {mapGetters, mapActions} from "vuex"
import StorageChart from './templateChart'
import {seekReportsHomeJK} from 'Api/commonality/operate.js'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import {storageDate} from './data/chartDateOption'
const  _assign = require('lodash/assign')
export default{
  	data(){
		return{
			chartData : null,
		    chartSize : {
		   	  x : 401,
		   	  y : 330
		    },
		    
			chart_configData: {
				text : '产品类别',
				title : '切换成色大类数据»',
				type : 1,
				loading : true,
				totalNum : 0, //件数
				totalPrice : 0, //售价
				totalWeight : 0, //重量
				dataList : [],
				echarts : null
			}
		}
  	},
  
	components :{
		StorageChart
	},
  
  	created(){
		this.getReportsHomeJK()
	},
	beforeUpdate(){
		if( this.$refs.echarts.echarts ){
			this.chart_configData.echarts = this.$refs.echarts.echarts
		}
	},
	computed: {
		...mapGetters([
            "userPositionInfo" // 职位信息
        ]),
		shopRole: function () { // 店员
			console.log(this.userPositionInfo.roleList)
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
		},
		companyRole: function () { // 公司
			console.log(this.userPositionInfo.roleList)
            if (this.userPositionInfo) {
                return jurisdictions.jurisdictionComputedManageRole(this.userPositionInfo.roleList);
            }
        },
	},
	methods:{
		//进库
		getReportsHomeJK(){
			
			let option = {
				type : this.chart_configData.type
			}
			
			seekReportsHomeJK(option).then( (res)=>{
				if( res.data.state == 200 ){
					setTimeout(()=>{
						_assign( this.chart_configData , res.data.data,{ loading : false })
						this.chartData = storageDate( this.chart_configData)
					},100)
					
				}
			},(res)=>{
				this.$message({
	           		type :'error',
	           		message : res.data.msg
	           })
			})
		},
		
		//进库 产品类别-成色大类 切换方法
		proTypeSwitch(){
			
			switch( this.chart_configData.type ){
				case 1 :
					_assign( this.chart_configData , {
						text : '成色大类',
						title : '切换产品类别数据»',
						type : 2
					})
				break;
				case 2 :
					_assign( this.chart_configData , {
						text : '产品类别',
						title : '切换成色大类数据»',
						type : 1
					})	
				break;
				
			}
			this.chart_configData.loading = true;
			this.getReportsHomeJK()
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
				color: #2993f8;
				font-size: 14px;
				margin-right: 2px;
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
	
	>.rp_chart_title{
		position: absolute;
		left: 0;
		top: 11px;
		height: 25px;
		line-height: 25px;
		width: 100%;
		padding: 0 25px;
		user-select: none;
		>.txt{
			b{color: #2993f8; font-weight: normal;}
		}
		.swtich{
			float: right;
			color: #999;
			font-size: 14px;
			cursor: pointer;
			transition:all .3s; 
			
			&:hover{
				color: #666;
			}
			
			>i{
				font-size: 13px;
				margin-left: 5px;
				color: #2993f8;
			}
		}
	}
}
</style>