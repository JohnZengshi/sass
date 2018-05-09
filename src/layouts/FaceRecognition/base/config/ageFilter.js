export default class echartAgeFilter {

  static colorList = ['#448eeb', '#b793e6']

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

  static gridAxis () {
    return [{ top: 70, left: 70, right: 36, bottom: 45 }]
  }

  static xAxis () {
      let options = {
        type : 'category',
        data : ['0-18', '19-29', '30-39', '40-49', '50+'],
        axisTick: {
          alignWithLabel: true
        },

        // boundaryGap: true,

        /* --坐标刻度线（x）-- */
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#b3b3b3'
          }
        },

        /* --坐标轴刻度相关设置-- */
        axisTick: false,
      }
      return options
  }

  static yAxis () {
    let options = [{
      type : 'value',
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
    }]
    return options
  }

  static series (parm) {
    let options = [
       { // For shadow
          type: 'bar',
          itemStyle: {
              normal: {
                  color: function (params){
                      var colorList = ['rgba(68, 142, 235, 0.2)','rgba(193, 147, 230, 0.2)','rgba(68, 142, 235, 0.2)','rgba(193, 147, 230, 0.2)','rgba(68, 142, 235, 0.2)']
                      return colorList[params.dataIndex]
                    }
              }
          },
          barGap:'-100%',
          barWidth: '40%',
          // barCategoryGap:'40%',
          data: [500, 500, 500, 500, 500],
          animation: false
      },
      {
        type:'bar',
        barWidth: '40%',
        itemStyle: {   
          //通常情况下：
          normal:{  
  　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
            color: function (params){
              var colorList = ['#448eeb','#b793e6','#448eeb','#b793e6','#448eeb']
              return colorList[params.dataIndex]
            }
          },
          //鼠标悬停时：
          // emphasis: {
          //   shadowBlur: 10,
          //   shadowOffsetX: 0,
          //   shadowColor: 'rgba(0, 0, 0, 0.5)'
          // }
        },
        label: {
          normal: {
            show: true,
            color: '#333',
            position: 'top'
          }
        },
        data: [10, 52, 200, 334, 390],
      }
    ]
    let numList = []
    for (let i of parm) {
      numList.push(i.count)
      switch (i.age) {
        case '0-18':
          options[1].data[0] = i.count
          break
        case '19-29':
          options[1].data[1] = i.count
          break
        case '30-39':
          options[1].data[2] = i.count
          break
        case '40-49':
          options[1].data[3] = i.count
          break
        case '50+':
          options[1].data[4] = i.count
          break
      }  
    }
    let maxNum = Math.max.apply(null, numList) + 100
    options[0].data[0] = maxNum
    options[0].data[1] = maxNum
    options[0].data[2] = maxNum
    options[0].data[3] = maxNum
    options[0].data[4] = maxNum
    return options
  }

  static echartAge (parm) {
    let options = {
      title: this.title,
      backgroundColor: '#fff',
      color: this.colorList,
      grid: this.gridAxis(), // 网格间距
      animation: true,
      xAxis: this.xAxis(parm),
      yAxis: this.yAxis(),
      series: this.series(parm)
    }
    return options
  }
}