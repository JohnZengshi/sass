<template>
	<div class="echarts" 
		ref="refsEcharts" 
		v-loading="chartloading" 
		element-loading-text="loading...">
	</div>
</template>

<script>
import Echarts from 'echarts';
export default {
	
  data(){
    return {
      echarts : null ,
      loading : true,
      globalTimer : 10, //默认loading缓冲时间
      size :{
      	x : 401, //数据图表默认宽
      	y : 330 //数据图表默认高
      }	
    }
  },
  
  /*
   * chartData为 echarts ->options 配置数据
   */
  props : ['chartData','chartSize','chartloading'],
  
  watch : {
	chartloading: function(){	
		if( !this.chartloading ){
  			this.reSize();
		}
	}
  },
  
  methods:{
	
	//重置echart
  	reSize(){
  		// console.log(this.chartData)
  		//检测echarts是否在DOM上已经注册过
  		if( this.echarts ){
  			this.echarts.dispose();
  		}
  		
		if( this.chartData ){
  			this.echarts = Echarts.init( this.$refs.refsEcharts );
  			this.echarts.setOption( this.chartData );
  			
  			if(this.chartData.events && this.chartData.events.length > 0 ){ 
                this.chartData.events.forEach((item)=>{
                    if( item.getEchart ){
                       item.getEchart(this.echarts)
                    }
                    this.echarts.on(item.type,item.callback)
                })
            }
            if(this.chartData.action && this.chartData.action.length > 0 ){
                this.chartData.action.forEach((item)=>{
                    this.echarts.dispatchAction(item)
                })
            }
		}
  	},
  	
  	setSize(){
		if( this.chartSize ) this.size = this.chartSize
		// console.log(this.chartSize)
		this.$refs.refsEcharts.style.height = this.size.y + 'px';
		// console.log(this.$refs.refsEcharts.style.height)
  	},
  	
  	load(){
  		//console.log(333)
  		this.setSize();
  		
  		//临时调用，后期通过监听chartloading方式进行调用
  		setTimeout(() =>{
  			this.reSize();	
  		}, this.globalTimer )
  		
  		window.addEventListener('resize', () =>{
  			if( this.$refs.refsEcharts == undefined ) return;
			this.reSize();
  			this.echarts.resize();
  		});	
  	}
  	
  },
  
  mounted(){
  	this.$nextTick(()=>{
  		this.load()
  	})
  }
}
</script>
<style scoped lang="scss">
.echarts{
	height: 100%;
	width: 100%;
}
</style>