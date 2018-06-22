<template>
<transition name="tp-ani">
<div class="rp_chart_item">
	<storage-chart :chartData="chartData"  :chartloading="chart_configData.loading" :chartSize="chartSize"></storage-chart>
	<div class="rp_chart_title">
		<span class="txt">本月销量走势</span>
		<span v-if="isShow" class="swtich" @click="proTypeSwitch" :title="chart_configData.title">{{chart_configData.text}}<i class="iconfont icon-qiehuan"></i></span>
	</div>
</div>
</transition>
</template>

<script>
import StorageChart from './templateChart'
import {seekSalesTrend} from 'Api/commonality/seek'
import {salesTrendsData} from './data/chartDateOption'
const  _assign = require('lodash/assign')
export default{
  	data(){
		return{
			chartData : null,
		    chartSize : {
		   	  x : 400,
		   	  y : 280
		    },
		    
		    isShow : false,
		    //进库
			chart_configData: {
				text : '近7天',
				title : '切换到近15天销量走势数据»',
				loading : true,
				dataList : [],
				type : 1,
				beginTime : '',
				endTime : '',
				chartDate : [],
				tempData : [],
				dataYAxis : {
				   max : 4,
                   min : 0,
                   minInterval :1
				}
				
			}
		}
  	},
  	
  	props:['dataType','shopId'],
  	
  	watch:{
  	    shopId : function(){
  	       this.createDate(-((new Date()).getDate()-1),0).then(()=>{
  	        this.chart_configData.loading = true
            this.getReportsHome() 
          })
  	    },
  	    dataType : function(){
           this.chart_configData.loading = true
           this.getReportsHome()
        }
  	},
	components :{
		StorageChart
	},
  
  	created(){
  		this.chart_configData.endTime = this.getDate(1).timestamp
		this.chart_configData.beginTime = this.getDate(-((new Date()).getDate()-1)).timestamp
		
		this.createDate(-((new Date()).getDate()-1),0).then(()=>{
		    this.getReportsHome() 
		})
		
	},
	
	methods:{
		
		getDate( day ){
		    let taday = new Date() 
		    let newDate = new Date()
		    newDate.setDate( taday.getDate() + day )
		    let Year = newDate.getFullYear()
		    let month = newDate.getMonth()+1
		    let Day = newDate.getDate()
		    let format = Year +'-'+ ( month < 10 ? ('0' + month) : month ) +'-'+ ( Day < 10 ? ('0' + Day ) : Day )
		    let timestamp = Year +'' + ( month < 10 ? ('0' + month) : month ) + ( Day < 10 ? ('0' + Day ) : Day ) + '000000'
		    return {
		    	format : format,
		    	timestamp : timestamp
		    }
		},
		
		getReportsHome(){
			if( this.dataType == '') return 
			let option = {
		        dataType: this.dataType,
		        // beginTime: "20180201000000",
		        beginTime: this.chart_configData.beginTime,
		        endTime: this.chart_configData.endTime,
		        shopId: this.shopId
		    }
			seekSalesTrend(option).then( (res)=>{
				if( res.data.state == 200){
					setTimeout(()=>{
						_assign( this.chart_configData , res.data.data,{ loading : false })
						this.chartData = salesTrendsData( this.chart_configData)
					},100)
				}
			},(res)=>{
				this.$message({
	           		type :'error',
	           		message : res.data.msg
	           })
			})
		},
		
		//销售 切换方法
		proTypeSwitch(){
			this.chart_configData.loading = true;
			switch( this.chart_configData.type ){
				case 1 :
					_assign( this.chart_configData , {
						text : '近15天',
						title : '切换到近7天销量走势数据»',
						type : 2,
						beginTime : this.getDate(-15).timestamp
					})
					this.createDate(-15,-1)
				break;
				case 2 :
					_assign( this.chart_configData , {
						text : '近7天',
						title : '切换到近15天销量走势数据»',
						type : 1,
						beginTime : this.getDate(-7).timestamp
					})	
					this.createDate(-7,-1)
				break;
				
			}
			this.getReportsHome()
		},
		
		createDate(startDay,endDay){
            let _this = this
            return new Promise(function(resolve, reject) {
                _this.chart_configData.chartDate = []
                _this.chart_configData.tempData = []
                for(let i = startDay; i <= endDay; i++){
                    let _date = _this.getDate(i).timestamp
                    if( _this.chart_configData.dataList.length == 0 ){
                      _this.chart_configData.tempData.push(2)  
                    }
                    _this.chart_configData.chartDate.push((_date.slice(4,6)+'-'+_date.slice(6,8)))
                }
                resolve(_this)
            })
        }
	
	},

	mounted() {
		
	}
}
</script>

<style lang="scss" scoped>
.rp_chart_item{
	position: relative;
	width: 400px;
	height: 280px;
	background-color: #fff;
	box-shadow: 0 0 15px #dedede;
	border-radius: 10px;
	>.rp_chart_title{
		position: absolute;
		left: 0;
		top: 11px;
		height: 25px;
		line-height: 25px;
		width: 100%;
		padding: 0 22px;
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
				color: #2993f8;
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