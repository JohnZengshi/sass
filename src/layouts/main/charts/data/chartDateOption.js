let echarts = require('echarts')
const  _assign = require('lodash/assign')
//销售统计
export const tadaySellData = ( optionData ) =>{
    
  let templateData = {
      seriesData : [],
      legendData : [],
      dataIndex : 0
  }

  let sellEcharts = null 

  if( optionData && optionData.length > 0 ){
      
      if( optionData.length == 1 && optionData[0].classTypeName == null){
         templateData.seriesData.push({
              value: 0,
              name: '暂无数据',  
              tempData : [0,0,0]
         })
         templateData.legendData.push('暂无数据') 
        
      }else{
          //let totalData = 0
          let mapArray = []
          optionData.forEach( (f) =>{
              let tp = Math.abs(f.totalPrice)
              //console.log(Math.abs(tp))
              //totalData += tp
              mapArray.push(tp)
          })
          // console.log('optionDataoptionDataoptionData:',totalData, mapArray)
          let maxData = Math.max.apply( Math , mapArray)
          
          optionData.forEach( (item,i)=>{
              //console.log(item)
              if( item.classTypeName == null ) return 
              //console.log(item.num,item.price,item.weight,item.className)
              
              //默认展示数据最大的
              if( item.totalPrice == maxData ){
                 templateData.dataIndex = i
              }
              let objData = {
                  value: Math.abs(item.totalPrice),
                  name: item.classTypeName,  
                  tempData:[
                      item.totalPrice,
                      item.totalWeight,
                      item.totalNum
                  ]
              }
              templateData.seriesData.push(objData)
              templateData.legendData.push(item.classTypeName)
          })
      }
      
  }else{
      templateData.seriesData.push({
          value: 0,
          name: '暂无数据',  
          tempData : [0,0,0]
      })
      templateData.legendData.push('暂无数据') 
  }

  //console.log(templateData.seriesData)
  let option = {
          legend: {
              orient: 'vertical',
              x: 20,
              y : 64,
              itemHeight :2,
              itemWidth : 8,
              itemGap:16,
              data:templateData.legendData
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
                  center: ['60%', '53%'],
                  radius: ['40', '70'],
                  avoidLabelOverlap: false,
                  // selectedMode:true,
                  tooltip: {
                      trigger: 'item',
                      position :[210,130],
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
                          backgroundColor:'rgba(0, 0, 0, 0.5)',
                          padding:5,
                          //position:'top',
                          borderRadius : 5,
                          formatter : function( params ){
                              var data = params.data;
                              //console.log(params)
                              if(data.tempData){
                                 return '{title|'+data.name+'}'+'\n' + 
                                 '{hr|}\n'+
                                 '{item|'+ data.tempData[0]+'}{itemunit| 元}\n' +
                                 '{item|'+ data.tempData[1]+'}{itemunit| g}\n' +
                                 '{item|'+ data.tempData[2]+'}{itemunit| 件}'
                              }
                             
                          },
                          rich:{
                              title:{
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  align: 'left'
                              },
                              item:{
                                  fontSize: 10,
                                  color: '#fff',
                                  align: 'left',
                                  lineHeight: 15
                              },
                              itemunit: {
                                  fontSize: 10,
                                  color: '#b6b6b6',
                                  align: 'left',
                                  lineHeight: 15
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
                          length:3
                          //smooth : true
                      }
                  },
                  data : templateData.seriesData
                  /*data:[
                      {value:3335, name:'黄金',tempData:[865,54,555]},
                      {value:2310, name:'钯金',tempData:[46,54,345]},
                      {value:1234, name:'钻石戒指',tempData:[123,678,345]},
                      {value:800, name:'珠宝',tempData:[345,54,555]},
                      {value:548, name:'银饰',tempData:[126563,54,786]},
                      {value:248, name:'彩宝',tempData:[567,54,65]},
                      {value:148, name:'其他',tempData:[45,54,75]}
                  ]*/
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
             dataIndex : templateData.dataIndex,
             seriesIndex : 0
         },
         
         // 显示 tooltip
         {
             type : 'showTip',
             dataIndex : templateData.dataIndex,
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


//销量走势
export const salesTrendsData = ( optionData ) =>{

  let length = optionData.dataList.length == 0
  let salesData = []
  let dataYAxis = {
      type : 'value',
      name: '单位: 元',
      nameTextStyle :{
          color : '#999',
          fontSize: 10
      },
      axisTick: {
          show: false
      },
      axisLine: {
          lineStyle: {
              color: '#ddd',
              width : 2
          }
      },
      axisLabel :{
          color: length ? '#fff' : '#999',
          fontSize : 10
      },
      splitLine: {
          lineStyle: {
              color: '#ddd',
              type : 'dashed'
          }
      }
  }

  if( length ){
      _assign( dataYAxis , optionData.dataYAxis)
  }else{
    optionData.dataList.forEach((item)=>{
       salesData.push(item.totalPrice)
    })
  }

  let option = {

      tooltip : {
          trigger: 'axis',
          formatter : function(p){
             return '<span style="color:#333;font-size:10px;">'+ (length ? 0 : p[0].data) +' 元</span>'
          },
          backgroundColor :'rgba(234,222,245,0.7)',
          padding:[0,5],
          color:'#333',
          transitionDuration:0,
          position :function(point){
             return {left: point[0]+15, top: point[1]-10}
          }
      },
     
      grid: {
          left: '4%',
          right: '4%',
          bottom: '10%',
          top: '28%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : optionData.chartDate,
              axisLabel :{
                  color:'#999',
                  fontSize : 10,
                  //rotate: 45,
                  //interval : 0
              },
              axisLine: {
                  lineStyle: {
                      color: '#ddd',
                      width : 2
                  }
              },
              axisTick: {
                  show: false
              },
              axisPointer: {
                  show: true,
                  lineStyle: {
                      opacity: 1,
                      color: '#ab7ad8',
                      width: 1
                  }
              }
          }
      ],
      yAxis : [dataYAxis],
      series : [
          {
              name:'销量走势',
              type:'line',
              stack: '总量',
              smooth: true, // 曲线
              symbol: 'circle',
              symbolSize: 10, // 小圆圈
              lineStyle: {
                  normal: {
                      width:4,
                      color:{
                          type: 'linear',
                          x: 0,
                          y: 1,
                          x2: 1,
                          y2: 1,
                          colorStops: [{
                              offset: 0, color: '#ab7ad8'
                          }, {
                              offset: 1, color: '#fd6080'
                          }],
                          globalCoord: false 
                      }
                  }
              },
              areaStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: 'rgba(171, 122, 216, 0.4)'
                      }, {
                          offset: 1,
                          color: 'rgba(255, 255, 255, 0)'
                      }])
                  }
              },
              itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(171, 122, 216, 1)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(253, 96, 128, 1)'
                    }]),
                    borderColor: 'rgba(255,255,255,1)',
                    borderWidth: 3
                  }
              },
              data: length ? optionData.tempData : salesData
          }
      ]
  }
  return option 
}