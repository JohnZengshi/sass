
const  _assign = require('lodash/assign')
//当天销售数据
export const tadaySellData = ( optionData ) =>{
// console.log('optionData',optionData)


let taDaySell = {
    legendData : [],
    seriesData : [],           
    dataIndex : 0
}

if( optionData.length == 0 ){
   taDaySell.legendData = ['暂无数据'] 
   taDaySell.seriesData = [{
       value : 0 ,
       name : '暂无数据'
   }]
}else{
   taDaySell.legendData = []
   taDaySell.seriesData = []
   let maxData = Math.max.apply( Math , optionData.map( f => f.price))
   optionData.forEach((item,i)=>{
      //默认展示数据最大的
      if( item.price == maxData ){
        taDaySell.dataIndex = i
      }
      taDaySell.legendData.push( item.className )
      taDaySell.seriesData.push({
          value : Math.abs(item.price) ,
          name : item.className,
          tempData : [item.price, item.weight,item.num]
      })
   })
}

let option = {
	    legend: {
	        orient: 'vertical',
	        x: 20,
	        y : 70,
	        itemHeight :2,
	        itemWidth : 8,
	        itemGap:18,
	        data:taDaySell.legendData
	    },
      	color:['#69bcff','#7668fd','#aa60ef','#fc6be1','#fe687b','#ff9b66','#ffc74e'],

	    //提示信息
      	tooltip: {
	        trigger: 'item',
	        alwaysShowContent : true
	    },
	    
	   
	    series: [
	        {
	            name:'',
	            type:'pie',
	            center: ['55%', '50%'],
	            radius: ['50', '82'],
	            avoidLabelOverlap: false,
	            tooltip: {
        	        trigger: 'item',
        	        position :['50%', '45%'],
        	        backgroundColor:'transparent',
        	        textStyle:{
        	            fontWeight:'bold',
        	            fontSize : 16
        	        },
        	        formatter: function( params ){
        	            return '<span style="color:'+ params.color +'">'+ 
        	            params.percent +'%</span>'
        	        }
        	    },
	            itemStyle: {
	            	normal: {
	            		//饼图阴影
	            		shadowColor: 'rgba(0, 0, 0, 0.15)',
    					shadowBlur: 13,
    					shadowOffsetX : 5
	            	}
	            },
	            label :{
    	            normal: {
                        show: false,
                        backgroundColor : 'rgba(0,0,0,0.5)',
                        padding:5,
                        borderRadius : 5,
                        formatter : function( params ){
                            var data = params.data;
                            //console.log(params)
                            if(data.tempData){
                               return '{title|'+data.name+'}'+'\n' + 
                               '{hr|}\n'+
                               '{item|'+ data.tempData[0]+'}{itemunit| 元}\n' +
                               '{item|'+ data.tempData[1]+'}{itemunit| g}\n' +
                               '{item|'+ data.tempData[2]+'}{itemunit| 件}\n'
                            }
                           
                        },
                        rich:{
                            title:{
                                fontSize: 14,
                                fontWeight: 'bold',
                                align: 'left',
                                color: '#fff'
                            },
                            item:{
                                fontSize: 10,
                                color: '#fff',
                                align: 'left'
                            },
                            itemunit: {
                                fontSize: 10,
                                color: '#b6b6b6',
                                align: 'left',
                                lineHeight: 12
                            },
                            hr: {
                                width: '100%',
                                height: 6
                            }
                        }
                    },
                    emphasis: {
                        show: true
                    }
	                
	            },
	            labelLine: {
	                normal: {
	                    show: true,
	                    length:5
	                }
	            },
	            data:taDaySell.seriesData
	        }
	    ],
	    
	    
	    defaultIndex : 0,
          events :[
           {
               type :'mouseover',
               getEchart : ( echarts )=>{
                   option.rootEcharts = echarts
               },
               callback : (pram)=>{
                 h(pram.dataIndex)
               }
           },
           
           {
               type :'mouseout',
               callback : (pram)=>{
                  h(pram.dataIndex)
               }
           },
        ],
        action :[
          // 默认高亮当前图形
           {
               type : 'highlight',
               dataIndex : taDaySell.dataIndex,
               seriesIndex : 0
           },
           
           // 显示 tooltip
           {
               type : 'showTip',
               dataIndex : taDaySell.dataIndex,
               seriesIndex : 0
           }
           
        ]
    
}


function h(y){
    
  option.rootEcharts.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: option.defaultIndex
  })

  //高亮
  option.rootEcharts.dispatchAction({
       type : 'highlight',
       dataIndex : y,
       seriesIndex : 0
   })
   //显示 tooltip
   option.rootEcharts.dispatchAction({
       type : 'showTip',
       dataIndex : y,
       seriesIndex : 0
   })
   option.defaultIndex = y
}

	return option 
}
//库存数据
export const stocksData = ( optionData ) => {

let templateData = {
	optionPriceData :[],
	optionWeightData : [],
	optionnNumData : [],
	Array :[],
	dataIndex : 0
}

if( optionData && optionData.length > 0 ){
    let totalNum = 0
    for(let i in optionData ){
      totalNum +=  parseFloat(optionData[i].num)
    }
    let maxData = Math.max.apply( Math , optionData.map( f => f.num))
    //console.log('maxDatamaxDatamaxDatamaxDatamaxData',maxData,optionData)
	optionData.forEach( (item,i)=>{
	    //console.log(item)
	    //默认展示数据最大的
        if( item.num == maxData ){
           templateData.dataIndex = i
        }
		//console.log(item.num,item.price,item.weight,item.className)
		// console.log((parseFloat(item.num)/totalNum * 100).toFixed(2))
		templateData.optionnNumData.push({
			value: (parseFloat(item.num)/totalNum * 100).toFixed(2),
			name: item.className,
			tempData:item
		})
		
		templateData.optionWeightData.push({
			value: (parseFloat(item.num)/totalNum * 100).toFixed(2),
			name: item.className,
			tempData:item
		})
		
		templateData.optionPriceData.push({
			value: (parseFloat(item.num)/totalNum * 100).toFixed(2),
			name: item.className,
			tempData:item
		})
    })
    //console.log(templateData.optionnNumData)
} else {

}
// console.log(templateData)
let option = {
    title: {
        text: '库存数据',
        y:10,
  		x:22,
  		textStyle: {
  			color:'#333',
              fontWeight:'normal',
              fontSize: '16'
  		}
    },
    tooltip: {
        trigger: 'item',
        position :function(point,params,dom,rect,size){
        	return [270,rect.y-30]
        },
        backgroundColor:'rgba(0,0,0,0.5)',
        borderColor:'rgba(0,0,0,0.1)',
        borderRadius : 5,
        formatter : function( params ){
            var data = params.data;
            if(data.tempData){
               return '<span style="font-weight:bold;font-size:14px;color:#fff">'+ data.name+'</span><br>'+
               '<p style="color:#fff;font-size:10px;line-height:15px;margin:0;">'+ data.tempData.price+
               '<span style="color:#ccc;"> 元</span><br>'+
               data.tempData.weight+'<span style="color:#ccc;"> g</span><br>'+
               data.tempData.num+'<span style="color:#ccc;"> 件</span></p>'
            }
        }
    },
    legend: {
    	show:false,
        //data: ['黄金','钯金','钻石戒指','珠宝','银饰','彩宝','其他']
    },
    axisPointer: {
        link: [{
            xAxisIndex: 'all'
        }],
        snap: true
    },
    color:['#fae176','#ffde4e','#ffca4e','#ffbc53','#ffa760','#ff926b','#fe7974','#ff7178','#f86165'],
    series: [
        {
            name: '件数',
            type: 'funnel',
            left: 'center',
            width: '50%',
            maxSize : '50%',
            sort: 'ascending',
            label: {
                normal: {
                   show:true,
                   position: 'inside',
                   formatter: '{c}%',
                   textStyle: {
                    color: '#000'
                   }
                },
                emphasis: {
                    show : true
                }
            },
            labelLine: {
                normal: {
                    show: true
                },
                emphasis: {
                    show : true
                }
            },
            itemStyle: {
                normal: {
                    opacity: 1
                }
            },
            
            data : templateData.optionnNumData
        },
        {
            name: '件重',
            type: 'funnel',
            left: 'center',
            width: '58%',
            maxSize : '58%',
            sort: 'ascending',
            label: {
                normal: {
                   show:false
                },
                emphasis: {
                    show : false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.6
                }
            },
            
            data : templateData.optionWeightData
        },
        {
            name: '金额',
            type: 'funnel',
            left: 'center',
            width: '65%',
            maxSize : '65%',
            sort: 'ascending',
            label: {
                normal: {
                   show:false
                },
                emphasis: {
                    show : false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    opacity: 0.2
                }
            },
            
            data : templateData.optionPriceData
        }
    ],
    
    defaultIndex : 0,
      events :[
       {
           type :'mouseover',
           getEchart : ( echarts )=>{
               option.rootEcharts = echarts
           },
           callback : (pram)=>{
             //h(pram.dataIndex)
           }
       },
       
       {
           type :'mouseout',
           callback : (pram)=>{
              
              setTimeout(()=>{
                 h(pram.dataIndex) 
              },200)
           }
       },
    ],
    action :[
      // 默认高亮当前图形
       /*{
           type : 'highlight',
           dataIndex : templateData.dataIndex,
           seriesIndex : 0
       },*/
       
       // 显示 tooltip
       {
           type : 'showTip',
           dataIndex : templateData.dataIndex,
           seriesIndex : 0
       }
       
    ]
}


function h(y){
    
  /*option.rootEcharts.dispatchAction({
    type: 'downplay',
    seriesIndex: 0,
    dataIndex: option.defaultIndex
  })
 
  //高亮
  option.rootEcharts.dispatchAction({
       type : 'highlight',
       dataIndex : y,
       seriesIndex : 0
   })*/
   //显示 tooltip
   
   option.rootEcharts.dispatchAction({
       type : 'showTip',
       dataIndex : y,
       seriesIndex : 0
   })
   option.defaultIndex = y
}


	return option 
}

//进库数据 雷达图
export const storageDate = ( optionData ) => {
//console.log(1111,optionData)
let tempDate = {
	datalist : ['暂无数据'],
	dataArray : [],
	numMax : 1,
	weightMax : 1,
	priceMax : 1,
	min:-1,
	selected :{}
}

//事件
if( optionData.echarts){
	//console.log(optionData.echarts.on)
}

/*for(let j = 0 ; j < tempDate.datalist.length; j++){
	
	let objVal = {
		value : [], //三个值
		name : tempDate.datalist[j]
	}
	let mumVal = random(j)
	let weightVal = random(j)
	let priceVal = random(j)
	tempDate.numMax = Math.max(tempDate.numMax,mumVal)
	tempDate.weightMax = Math.max(tempDate.weightMax,weightVal)
	tempDate.priceMax = Math.max(tempDate.priceMax,priceVal)
	objVal.value.push(mumVal,weightVal,priceVal)

	tempDate.dataArray.push(objVal)
}*/

//Math.max.apply({},[])


if( optionData.dataList.length ){
   tempDate.datalist = []
   optionData.dataList.forEach((item,i)=>{
       
      //数据指示值
      tempDate.datalist.push(item.className)
      
      //默认选中第一个数据
      tempDate.selected[item.className] = i == 0 
      
      //获取雷达图最大展示值
      tempDate.numMax = Math.max(tempDate.numMax,item.num)
      tempDate.weightMax = Math.max(tempDate.weightMax,item.weight)
      tempDate.priceMax = Math.max(tempDate.priceMax,item.price)
      
      //
      tempDate.dataArray.push({
         value : [item.num,item.weight,item.price],
         name : item.className
      })
   })
}else{
   tempDate.dataArray.push({
      value : [0,0,0],
      name : '暂无数据'
   })
}


function random(i){
	return Math.floor(100* (Math.random() * 4000) / (Math.random() * 1000))
}

let option = {
    tooltip: {
        trigger: 'none',
        show:false,
    },
    legend: {
        orient: 'vertical',
        x: 20,
        y : 70,
        itemHeight :2,
        itemWidth : 8,
        itemGap:18,
        data:tempDate.datalist,
        selected : tempDate.selected
    },
    radar: [
        {
            indicator: [
                {text: '件数(件)', max: tempDate.numMax, min:tempDate.min},
                {text: '件重(g)', max: tempDate.weightMax, min:tempDate.min},
                {text: '金额(元)', max: tempDate.priceMax, min:tempDate.min }
            ],
            center: ['58%','60%'],
            radius: 100,
            //背景分割线
            splitLine: {
                lineStyle:{
                    width: 0
                }
            },
            //背景文字颜色
            name:{
                textStyle:{
                    color:'#999'
                }
            },
            //坐标刻度颜色
            axisLine: {
                lineStyle : {
                    color:'#9697bc'
                }
            },
            //背景区域不显示
            splitArea: {
                show:false,
            },
            axisTick:{
               lineStyle : {
                    color:'#a5a6c5'
                } 
            }
        }
    ],
    series: [
        {
            type: 'radar',
            tooltip: {
                trigger: 'item',
                axisPointer:{
                    type:'cross'
                }
            },
            label:{
                normal:{
                   show :true,
                   color:'#111',
                   backgroundColor:'#fff',
                   borderColor:'#fe6a7d',
                   borderWidth : 0.8,
                   borderRadius: 12,
                   padding:[1,6,1,6],
                   fontSize:10,
                   offset :[0,14],
                   height: 20,
                   formatter: ' {c} '
                },
                emphasis:{
                    offset :[0,0.5],
                    textBorderWidth :1,
                    textShadowOffsetX: 0,
                    textShadowOffsetY: 0,
                    color:'#111',
                    fontSize: 10
                }
            },
            itemStyle: {
                normal: {
                    //雷达填充背景色
                    areaStyle: {
                       color:'#fff0f2'
                    }
                },
                emphasis:{
                   areaStyle: {
                       color:'#fff0f2'
                    } 
                }
            },
            data : tempDate.dataArray
            /*data: [
                {
                    value: [60,73,95],
                    name: '黄金'
                },
                {
                    value: [90,33,65],
                    name: '钯金',
                    label:{
                        normal:{
		                   show :true,
		                   color:'#111',
		                   backgroundColor:'#fff',
		                   borderColor:'#069',
		                   borderWidth : 0.8,
		                   borderRadius: 12,
		                   padding:[1,6,1,6],
		                   fontSize:10,
		                   offset :[0,14],
		                   height: 20
		                },
		                emphasis:{
		                    offset :[0,0.5],
		                    textBorderWidth :1,
		                    textShadowOffsetX: 0,
		                    textShadowOffsetY: 0,
		                    color:'#111',
		                    fontSize: 10
		                }
                    },
                    itemStyle: {
                        normal: {
                            //雷达填充背景色
                            areaStyle: {
                               color:'#069'
                            }
                        },
                        emphasis:{
                           areaStyle: {
                               color:'#069'
                            } 
                        }
                    }
                },
                {
                    value: [60,73,95],
                    name: '钻石戒指'
                },
                {
                    value: [90,33,65],
                    name: '珠宝'
                },
                {
                    value: [60,73,95],
                    name: '银饰'
                },
                {
                    value: [90,33,65],
                    name: '彩宝'
                },
                {
                    value: [90,33,65],
                    name: '其他'
                }
            ]*/
        }
    ]
}

 return option
}


export const sellChartLargeDate = ( optionData) =>{


let templateData = {
	optionPriceData :[], //售价
	optionWeightData : [], //件重
	optionnNumData : [], //件数
	optionnCostData : [], //成本数据
	countVal : 4000,
	day : 15
}

//console.log('optionData', optionData)

let chartDate = optionData.chartDate
let gridTop = 75
let gridHeight = 60 
let gridLeft = 60
//console.log(chartDate)
//console.log(optionData)
for(let i = 0 ; i < chartDate.length; i++){

	let _data = chartDate[i]
    let temp = optionData.dataList.filter( f=>f.date.indexOf(_data) >= 0 )
    //console.log(temp)
	if( temp.length > 0 ){
	    templateData.optionPriceData.push(temp[0].totalPrice)
        templateData.optionWeightData.push(temp[0].totalWeight)
        templateData.optionnNumData.push(temp[0].totalNum)
        templateData.optionnCostData.push(temp[0].totalCost)
	}else{
    	templateData.optionPriceData.push(0)
    	templateData.optionWeightData.push(0)
    	templateData.optionnNumData.push(0)
    	templateData.optionnCostData.push(0)
	}
}

let option = {
    tooltip : {
        trigger: 'axis',
        textStyle:{
           color:'#fff',
           fontSize:12
        },
        formatter : function( params ){
           if (params.length) {
              
                return ['件数', '件重', '售价', '成本'].map(function(seriesName) {
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i];
                        var style = '';
                        var tempUnit = '';
                        switch (seriesName) {
                            case '件数':
                                tempUnit = ' 件'
                                break;
                            case '件重':
                                tempUnit = ' g'
                                break;
                            case '售价':
                                tempUnit = ' 元'
                                break;
                            default:
                                tempUnit = ' 元'
                        }
                        if (param.seriesName === seriesName) {
                            return '<span style="' + style + '">' +
                                param.seriesName +
                                '：</span><span style="' +
                                style + '">' + param.value + tempUnit + '</span>';
                        }
                    }
                }).join('<br>');
            }       
            
        }
    },
    legend: {
        orient: 'vertical',
        top : 105,
        right : 30,
        itemHeight :10,
	    itemWidth : 10,
	    itemGap:50,
        borderRadius : '50%',
        data:['件数', '件重', '售价','成本']
    },
   axisPointer: {
        link: [{
            xAxisIndex: 'all'
        }],
        snap: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            position:'top',
            gridIndex : 0,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#ddd',
                    type:'dashed'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'transparent'
                }
            },
            axisPointer: {
                show: true,
                lineStyle: {
                    opacity: 0.1,
                    color: 'rgba(0,0,0,0.4)',
                    width: 40
                }
            },
			data : chartDate
        },
        {
            type : 'category',
            boundaryGap : false,
            position:'top',
            gridIndex : 1,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#ddd',
                    type:'dashed'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'transparent'
                }
            },
            axisPointer: {
                show: true,
                lineStyle: {
                    opacity: 0.1,
                    color: 'rgba(0,0,0,0.4)',
                    width: 40
                }
            },
            data : chartDate
        },
        {
            type : 'category',
            boundaryGap : false,
            position:'top',
            gridIndex : 2,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#ddd',
                    type:'dashed'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'transparent'
                }
            },
            axisPointer: {
                show: true,
                lineStyle: {
                    opacity: 0.1,
                    color: 'rgba(0,0,0,0.4)',
                    width: 40
                }
            },
            data : chartDate
        },
        {
            type : 'category',
            boundaryGap : false,
            position:'top',
            gridIndex : 3,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#ddd',
                    type:'dashed'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: 'transparent'
                }
            },
            axisPointer: {
                show: true,
                lineStyle: {
                    opacity: 0.1,
                    color: 'rgba(0,0,0,0.4)',
                    width: 40
                }
            },
            data : chartDate
        },
        {
            type : 'category',
            boundaryGap : false,
            gridIndex : 3,
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            axisLabel: {
                show : true,
                color:'#666'
            },
            axisTick: {
                show: false
            },
            axisPointer: {
                lineStyle: {
                    opacity: 0
                }
            },
            data : chartDate
        }
    ],
    yAxis : [
        {
            type : 'value',
            gridIndex: 0,
            nameLocation: 'middle',
            nameRotate :0,
            nameTextStyle: {
                color: '#a8a8a8',
                fontSize:11
            },
            name : '件数',
            //坐标刻度线
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            //坐标轴名与轴线之间的距离
	        nameGap: 12,
	        //坐标轴2边留白值
	        boundaryGap: ['30%', '30%'],
            axisTick: {show: false},
            axisLabel: { show: false},
            splitArea :{ show:false },
            splitLine: { show: false}
        },
        {
            type : 'value',
            gridIndex: 1,
            nameLocation: 'middle',
            nameRotate :0,
            nameTextStyle: {
                color: '#a8a8a8',
                fontSize:11
            },
            name : '件重',
            //坐标刻度线
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            //坐标轴名与轴线之间的距离
	        nameGap: 12,
	        //坐标轴2边留白值
	        boundaryGap: ['30%', '30%'],
            axisTick: {show: false},
            axisLabel: { show: false},
            splitArea :{ show:false },
            splitLine: { show: false}
        },
        {
            type : 'value',
            gridIndex: 2,
            nameLocation: 'middle',
            nameRotate :0,
            nameTextStyle: {
                color: '#a8a8a8',
                fontSize:11
            },
            name : '售价',
            //坐标刻度线
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            //坐标轴名与轴线之间的距离
	        nameGap: 12,
	        //坐标轴2边留白值
	        boundaryGap: ['30%', '30%'],
            axisTick: {show: false},
            axisLabel: { show: false},
            splitArea :{ show:false },
            splitLine: { show: false}
        },
        {
            type : 'value',
            gridIndex: 3,
            nameLocation: 'middle',
            nameRotate :0,
            nameTextStyle: {
                color: '#a8a8a8',
                fontSize:11
            },
            name : '成本',
            //坐标刻度线
            axisLine: {
                lineStyle: {
                    color: '#ccc'
                }
            },
            //坐标轴名与轴线之间的距离
	        nameGap: 12,
	        //坐标轴2边留白值
	        boundaryGap: ['30%', '30%'],
            axisTick: {show: false},
            axisLabel: { show: false},
            splitArea :{ show:false },
            splitLine: { show: false}
        }
    ],
    grid: [
        {
            top: gridTop,
            left: gridLeft,
            height: gridHeight
        },
        {
            top: gridTop + gridHeight,
            left: gridLeft,
            height: gridHeight
        },
        {
            top: gridTop + gridHeight * 2,
            left: gridLeft,
            height: gridHeight
        },
        {
            top: gridTop + gridHeight * 3,
            left: gridLeft,
            height: gridHeight
        }
    ],
    series : [
        {
            name: '件数',
            type: 'line',
            smooth : true,
            symbolSize: 2,
            lineStyle:{
                normal:{
                    width :3,
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 15
                }
            },
            itemStyle: {
                normal: {
                    color: '#fe687b'
                }
            },
            
            data : templateData.optionnNumData
            //data:[120, 132, 101, 134, 90, 230, 210,500,1000,222,0,11,320,23,540]
        },
        {
            name: '件重',
            type: 'line',
            smooth : true,
            symbolSize: 2,
            xAxisIndex: 1,
            yAxisIndex: 1,
            lineStyle:{
                normal:{
                    width :3,
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 15
                }
            },
            itemStyle: {
                normal: {
                    color: '#aa60ef'
                }
            },
            data : templateData.optionWeightData
            //data: [120, 132, 101,1000,222,10,11,320,2,134, 90, 130, 210,900,200]
        },
        {
            name: '售价',
            type: 'line',
            smooth : true,
            symbolSize: 2,
            xAxisIndex: 2,
            yAxisIndex: 2,
            lineStyle:{
                normal:{
                    width :3,
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 15
                }
            },
            itemStyle: {
                normal: {
                    color: '#2caafa'
                }
            },
            data : templateData.optionPriceData
            //data:[50, 1332, 101, 134, 90, 230, 210,500,1000,222,0,11,320,23,540]
        },
        {
            name: '成本',
            type: 'line',
            smooth : true,
            symbolSize: 2,
            xAxisIndex: 3,
            yAxisIndex: 3,
            lineStyle:{
                normal:{
                    width :3,
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 15
                }
            },
            itemStyle: {
                normal: {
                    color: '#ef8641'
                }
            },
            data : templateData.optionnCostData
            //data: [20, 132, 1101, 134, 90, 1130, 210,101, 1134, 90, 230, 210,500,900,100]
        }
    ]
}
	return option
}