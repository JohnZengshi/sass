export default class echartAgeFilter {

  static colorList = ['#fb687d', '#f9bd47', '#766df9']

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

  static tooltip () {
    let options = {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: function (params) {
          var tar;
          if (params[1].value != '-') {
              tar = params[1];
          }
          else {
              tar = params[0];
          }
          return tar.name + '<br/>' + tar.value + '人';
      }
    }
    return options
  }

  static gridAxis () {
    return [{ top: 70, left: 70, right: 36, bottom: 45 }]
  }

  static yAxis () {
      let options = {
        type : 'category',
        // data : ['0-18', '19-29', '30-39', '40-49', '50+'],
        data : ['一次', '两次', '多次'],
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

  static xAxis () {
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
                  color: function (params) {
                      var colorList = ['rgba(251, 103, 125, 0.2)','rgba(249, 188, 69, 0.2)','rgba(117, 109, 249, 0.2)']
                      return colorList[params.dataIndex]
                  },
                  barBorderRadius: [50, 50, 50, 50]
              },
          },
          barGap:'-100%',
          barWidth: '40%',
          barBorderRadius: "10%",
          // barCategoryGap:'40%',
          data: [500, 500, 500],
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
              var colorList = ['#fb687d', '#f9bd47', '#766df9']
              return colorList[params.dataIndex]
            },
            barBorderRadius: [50, 50, 50, 50]
          }
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
                  position: 'right'
              }
        },
        data: [0, 0, 0],
      }
    ]
    let numList = []
    for (let i of parm) {
      numList.push(i.count)
      switch (i.type) {
        case '1':
          options[1].data[0] = i.count
          break
        case '2':
          options[1].data[1] = i.count
          break
        case '3':
          options[1].data[2] = i.count
          break
      }  
    }
    let maxNum = Math.max.apply(null, numList) + 100
    options[0].data[0] = maxNum
    options[0].data[1] = maxNum
    options[0].data[2] = maxNum
    return options
  }

  static echartAge (parm) {
    let options = {
      title: this.title,
      tooltip: this.tooltip(), // 移过悬浮提示
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