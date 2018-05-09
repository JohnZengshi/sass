let echarts = require('echarts')
export default class echartDayFilter {

  static title = {
    text: '单位: 个',
    x: 26,
    top: 35,
    textStyle: {
      fontSize: 12,
      color: '#999',
      fontWeight: 'normal',
      left: 5
    }
  }

  /* --提示框组件-- */
  static tooltipAxis () {
    let datas = {
      trigger: 'axis',
      formatter : function(p){
         return '<span style="color:#333;font-size:12px;">'+ p[0].value +' 人</span>'
      },
      backgroundColor :'rgba(0,0,0,0.3)',
      padding:[0,5],
      color:'#333',
      transitionDuration:0,
      position :function(point){
         return {left: point[0]+15, top: point[1]-10}
      }
    }
    return datas
  }

  static xAxis () {
    let datas = {
      type: 'category',
      axisPointer: {
        show: true,
        lineStyle: {
          type : 'dashed',
          opacity: 0.5,
          color: '#766df9',
          width: 1
        }
      },
      // boundaryGap: false,
      /* --坐标轴两边留白策略-- */
      boundaryGap: true,

      /* --坐标刻度线（x）-- */
      axisLine: {
        onZero: true,
        lineStyle: {
          color: '#b3b3b3'
        }
      },

      /* --坐标轴刻度相关设置-- */
      axisTick: false,

      color: {
        colorStops: ['#b53131']
      },

      data: ['0-8', '8-12', '12-16', '16-18', '18-20', '20-22', '22-24']
    }
    return datas
  }

  static yAxis () {
    let datas = {
      type: 'value',
      /* --坐标轴刻度相关设置-- */
      axisTick: false,
      splitLine: {
        lineStyle: {
          color: '#ddd',
          type : 'dashed'
        }
      },
      /* --坐标刻度线-- */
      axisLine: {
        onZero: true,
        lineStyle: {
          color: '#b3b3b3'
        }
      },
    }
    return datas
  }

  static series (parm) {
    let datas = {
      data: [0, 0, 0, 0, 0, 0, 0],
      xAxisIndex: 0,
      type: 'line',
      symbol: 'circle',
      symbolSize: 0.1, // 小圆圈
      lineStyle: {
        normal: {
          width: 4
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(251, 104, 125, 0.2)'
          }, {
            offset: 1,
            color: 'rgba(251, 104, 125, 0)'
          }])
        }
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(255,255,255,1)',
          borderWidth: 4
        }
      }
    }
    parm.forEach((currentValue, index, arr) => {
      datas.data[index] = currentValue.count

    })
    // for (let i of parm) {
    //   switch (i.timeQuantum) {
    //     case '5':
    //       datas.data[1] = i.totalNum
    //       break
    //     case '5':
    //       datas.data[1] = i.totalNum
    //       break
    //     case '6':
    //       datas.data[2] = i.totalNum
    //       break
    //     case '7':
    //       datas.data[3] = i.totalNum
    //       break
    //     case '8':
    //       datas.data[4] = i.totalNum
    //       break
    //     case '9':
    //       datas.data[5] = i.totalNum
    //       break
    //     case '10':
    //       datas.data[6] = i.totalNum
    //       break
    //     case '11':
    //       datas.data[7] = i.totalNum
    //       break
    //     case '12':
    //       datas.data[8] = i.totalNum
    //       break
    //   }  
    // }
    console.log('看你输出什么', datas)
    sessionStorage.xis = JSON.stringify(datas)
    return datas
  }

  static colorOne = ['#fb687d']
  
  static gridAxis () {
    return [{ top: 70, left: 70, right: 36, bottom: 45 }]
  } 


  static exhartDay (parm) {
    let options = {
      title: this.title,
      backgroundColor: this.backgroundColorOne,
      color: this.colorOne,
      tooltip: this.tooltipAxis(),
      // legend: this.legendAxis(isOld),
      grid: this.gridAxis(), // 网格间距
      animation: true,
      xAxis: this.xAxis(),
      yAxis: this.yAxis(),
      series: this.series(parm)
    }
    return options
  }
}