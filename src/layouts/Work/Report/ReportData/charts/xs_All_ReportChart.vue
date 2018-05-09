<template>
<transition name="tp-ani">
<div class="rp_chart_sell">
	<storage-chart :chartData="chartData" :chartSize="chartSize" :chartloading="chart_configData.loading"></storage-chart>
	<div class="rp_chart_title">
		<div class="txt"><i class="iconfont icon-liebiao"></i>
			<span class="dialog-wrapper">{{reportText}}</span>
		</div>
		<span class="swtich" @click="goDetails" title="查看销售明细">查看明细</span>
		<div class="dialog-item" :class="dialogactive">
			<div class="item" v-for="k in dialogItem" :key="k" v-text="k" @click="changeData(k)"></div>
		</div>
	</div>
</div>
</transition>
</template>

<script>
import StorageChart from './templateChart'
import {seekReportsHomePage} from './../../../../../Api/commonality/operate.js'
import {sellChartLargeDate} from './data/chartDateOption'
const  _assign = require('lodash/assign')
export default{
  	data(){
		return{
			chartData : null,
		    chartSize : {
		   	  x : 1250,
		   	  y : 360
		    },
		    
		    startDay : -((new Date()).getDate()) + 1,
		    endDay : 0,
		    
		    reportText : '销售走势',
		    dialogactive : '',
		    dialogItem : ['入库','退库','调库','发货','调柜','退货','销售'],
		    
		    chart_configData :{
		    	loading : true,
		    	dataList : [],
		    	chartDate : [],
		    	beginTime : '',
		    	endTime : ''
		    }
		}
  	},
  
	components :{
		StorageChart
	},
  
  	created(){
		
		_assign( this.chart_configData , {
			beginTime :this.getStartDate(), //this.getDate( this.startDay ),
			endTime : this.getDate( 0 ,true)
		})
		this.createDate().then(()=>{
			this.getReportsHome()
		})

	},
	
	methods:{
		getReportsHome(){
			
			let option = {
				beginTime : this.chart_configData.beginTime,
				endTime : this.chart_configData.endTime
			}
			//console.log(option)
			seekReportsHomePage(option).then( (res)=>{
				if( res.data.state == 200){
					setTimeout(()=>{
						_assign( this.chart_configData , res.data.data,{ loading : false })
						this.chartData = sellChartLargeDate( this.chart_configData )
						//console.log(this.chartData)
					},100)
				}
			},(res)=>{
				this.$message({
	           		type :'error',
	           		message : res.data.msg
	           })
			})
		},
		
		
		tabReport(){
			this.dialogactive = this.dialogactive =='' ? 'active' : ''	
		},
		
		getStartDate () {
			let newDate = new Date()
			let Year = newDate.getFullYear()
			let month = newDate.getMonth()+1
			let Day = '01'
			let ms = '000000'
			let newTime = Year +'' + ( month < 10 ? ('0' + month) : month ) + Day + ms
			//console.log(newTime)
			return newTime
		},
		getDate( day,type  ){
		    let taday = new Date() 
			let newDate = new Date()
			//console.log(taday)
		    newDate.setDate( taday.getDate() + day )
		    let Year = newDate.getFullYear()
			let month = newDate.getMonth()+1
		    let Day = newDate.getDate()
		    let ms = '000000'
		    if( type ){
		       ms = '235959'
		    }
			let newTime = Year +'' + ( month < 10 ? ('0' + month) : month ) + ( Day < 10 ? ('0' + Day ) : Day ) + ms
		    return newTime
		},
		
		//查看其它图表数据 
		changeData( text ){
			 
			this.reportText = text
			this.dialogactive = ''
			this.chart_configData.loading = true
			this.getReportsHome()
		},
		
		//查看明细
		goDetails(){
			this.$router.push('/work/report/sellreport')
		},
		
		//生成最近15天日期
		createDate(){
			let _this = this
			return new Promise(function(resolve, reject) {
				for(let i = _this.startDay; i <= _this.endDay; i++){
					let _date = _this.getDate(i)
					_this.chart_configData.chartDate.push((_date.slice(4,6)+'-'+_date.slice(6,8)))
				}
				//console.log(_this.chart_configData.chartDate)
			 	resolve(_this)
			})
		}
	
	}
}
</script>

<style lang="scss" scoped>
.rp_chart_sell{
	height: 360px;
	background-color: #fff;
	box-shadow: 0 0 15px #dedede;
	border-radius: 10px;
	position: relative;
	
	>.rp_chart_title{
		position: absolute;
		left: 0;
		top: 15px;
		height: 25px;
		line-height: 25px;
		width: 100%;
		padding: 0 25px;
		user-select: none;
		>.txt{
			display: inline-block;
			b{color: #2993f8; font-weight: normal;}
			i{color: #2993f8;}
			i.icon-liebiao{
				font-size: 15px;
				margin-right: 5px;
			}
			i.icon-qiehuan{
				margin-left: 5px;
				font-size: 13px;
			}
		}
		.swtich{
			float: right;
			color: #999;
			font-size: 14px;
			cursor: pointer;
		}
		
		.dialog-wrapper{
			//cursor: pointer;
			//transition: all .3s;
			&:hover{
				//color: #666;
			}
		}
		
		.dialog-item{
			position: absolute;
			left: 23px;
			top: 0px;
			opacity: 0;
			visibility: hidden;
			width: 100px;
			background-color: #fff;
			min-height: 60px;
			z-index: 9;
			box-shadow: 0 0 10px #dedede;
			border-radius: 5px;
			transition:all .3s;
			overflow: hidden;
			
			>.item{
				height: 40px;
				line-height: 40px;
				padding-left: 20px;
				cursor: pointer;
				font-size: 13px;
				&:hover{
					background-color:#f5f5f5;
				}
			}
			
			&.active{
				top: 28px;
				opacity: 1;
				visibility: visible;
			}
		}
	}
	
}
</style>