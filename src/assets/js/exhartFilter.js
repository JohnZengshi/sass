import { GetDateYR } from './getTime'

const _assign = require('lodash/assign')
export default class exhartFilter {

  static getFillter (types, allDatas) { // 过滤进，销，存
    let typeOne = allDatas.filter(function(element, index, array) {
      return (element.type == types)
    })
    return typeOne
  }

  static timeSort(parm) { // 排序
    let sortDatas = parm.sort(function(a, b) {
      let preDatas = Number(a.date.replace(/-/g, ''))
      let nextDatas = Number(b.date.replace(/-/g, ''))
      return preDatas - nextDatas
    })
    return sortDatas
  }

  static getTimedays(parm) { // 获取日期
    var today = new Date()
    today.setDate(today.getDate() + 0) // 获取AddDayCount天后的日期
    var D = today.getDate()
    let options = []
    for (var i = D; i > 0; i--) {
      if (i == 1) {
        options.push(GetDateYR(0))
      } else {
        options.push(GetDateYR(-i + 1))
      }
    }
    return options
  }

  static colorOne = ['#2caafa', '#aa60ef', '#fe687b']

  static backgroundColorOne = '#fff'

  static tooltipAxis = { trigger: 'axis', extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' }

  static lineStyleAxis = {
    normal: {
      width: 3,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowBlur: 20,
      shadowOffsetY: 1
    }
  }

  static xAxis(interval = 1) {
    let datas = {
      type: 'category',
      boundaryGap: false,
      nameTextStyle: {
        color: '#000',
        fontSize: 11
      },

      // 显示间隔
      axisLabel: {
        interval: interval
      },

      axisLine: {
        onZero: false,
        lineStyle: {
          color: "#b3b3b3"
        },
      },
      axisTick: {
        show: false
      },
      axisPointer: {
        show: true,
        lineStyle: {
          opacity: 0.1,
          color: "rgba(0,0,0,0.4)",
          width: 39
        }
      },
      data: this.getTimedays(30) // 日期
    }
    return datas
  }

  static yAxis() {
    let datas = {
      type: 'value',
      boundaryGap: false,
      // 刻度线
      axisTick: {
        show: false
      },
      // 分割线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#ddd",
          type: "dashed"
        }
      },
      //坐标刻度线（y最左边）
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#b3b3b3'
        }
      },
      //坐标轴名与轴线之间的距离
      nameGap: 12,
    }
    return datas
  }

  static legendAxisName(name) {
    let options = {
      itemWidth: 10,
      itemHeight: 14,
      itemGap: 50,
      borderRadius: "50%",
      right: '398px',
      top: '0',
      itemGap: 15,
      data: [name]
    }
    return options
  }

  static legendAxis(isOld) {
    let options = {
      itemWidth: 10,
      itemHeight: 14,
      itemGap: 50,
      borderRadius: "50%",
      right: '398px',
      top: '24px',
      itemGap: 15,
      data: ['进', '销', '存']
    }
    if (isOld == 2) {
      options.data = ['存']
    }
    return options
  }

  static gridAxis = [{ top: 70, left: 70, right: 36, bottom: 45 }]

  static filterReriesAxis(Name, parm, Keys) {
    let datas = {
      name: Name,
      type: 'line',
      stack: Name,
      smooth: true,
      symbolSize: 0.1,
      lineStyle: {
        normal: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.3)',
          shadowBlur: 20,
          // color: '#2caafa',
          shadowOffsetY: 1
        }
      },
      data: []
    }
    for (let i of parm) {
      datas.data.push(i[Keys])
    }
    return datas
  }

  static seriesAxis(seriesAxisKey, allDatas, isOld) {
    let seriesAxis = []
    if (isOld == 2) {
      seriesAxis.push(this.filterReriesAxis('存', this.timeSort(allDatas.typeThree), seriesAxisKey))
    } else {
      seriesAxis.push(this.filterReriesAxis('进', this.timeSort(allDatas.typeOne), seriesAxisKey))
      seriesAxis.push(this.filterReriesAxis('销', this.timeSort(allDatas.typeTwo), seriesAxisKey))
      seriesAxis.push(this.filterReriesAxis('存', this.timeSort(allDatas.typeThree), seriesAxisKey))
    }
    return seriesAxis
  }

  // 库存走势图
  static exhartStockAxis(seriesAxisKey, allDatas, isOld) {
    let options = {
      backgroundColor: this.backgroundColorOne,
      color: this.colorOne,
      tooltip: this.tooltipAxis,
      legend: this.legendAxis(isOld),
      grid: this.gridAxis, // 网格间距
      animation: true,
      xAxis: this.xAxis(),
      yAxis: this.yAxis(),
      series: this.seriesAxis(seriesAxisKey, allDatas, isOld) // this.ApiTextData()
    }
    if (isOld == 2) {
      options.color = ['#fe687b']
    }
    sessionStorage.setItem('KKKKKKKKKKKKKK', JSON.stringify(options))
    return options
  }

  // 会员统计图
  static memberAxis(seriesAxisKey, allDatas, legendName, grid) {
    let options = {
      backgroundColor: this.backgroundColorOne,
      color: ['#fc6f21'],
      tooltip: this.tooltipAxis,
      // legend: this.legendAxisName(),
      grid: grid || this.gridAxis, // 网格间距
      animation: true,
      xAxis: this.xAxis(5),
      yAxis: this.yAxis(),
      series: [this.filterReriesAxis(legendName, this.timeSort(allDatas), seriesAxisKey)] // this.ApiTextData()
    }
    // if (isOld == 2) {
    //   options.color = ['#fe687b']
    // }
    sessionStorage.setItem('KKKKKKKKKKKKKK', JSON.stringify(options))
    return options
  }

  static numSort(parm) { // 件数排序
    let sortDatas = parm.sort(function(a, b) {
      let preDatas = Number(a.num)
      let nextDatas = Number(b.num)
      return nextDatas - preDatas
    })
    return sortDatas
  }

  static exhartStockPie(parm) {
    let optionData = this.numSort(parm)
    let templateData = {
      seriesData: [],
      legendData: []
    }

    if (optionData && optionData.length >= 0) {

      let otherDatas = {
        name: '其它',
        value: 0,
        tempData: [0, 0, 0]
      }

      optionData.forEach((item, i) => {
        if (i < 6) {

          templateData.seriesData.push({
            value: item.num == null ? 0 : item.num,
            name: item.className == null ? 'null' : item.className,
            tempData: [
              item.price == null ? 0 : item.price,
              // item.totalWeight == null ? 0 : item.weight,
              item.weight == null ? 0 : item.weight,
              item.num == null ? 0 : item.num
            ]
          })

          templateData.legendData.push(item.className == null ? 'null' : item.className)

        } else {
          otherDatas.value = otherDatas.value + Number(item.num == null ? 0 : item.num)
          otherDatas.tempData[0] = otherDatas.tempData[0] + Number(item.price == null ? 0 : item.price)
          otherDatas.tempData[1] = otherDatas.tempData[1] + Number(item.weight == null ? 0 : item.weight)
          otherDatas.tempData[2] = otherDatas.tempData[2] + Number(item.num == null ? 0 : item.num)
        }
      })

      if (optionData.length > 6) {
        otherDatas.tempData[1] = Number(otherDatas.tempData[1]).toFixed(3)
        templateData.seriesData.push(otherDatas)
        templateData.legendData.push('其它')
      }

    }

    let option = {
      legend: {
        // orient: 'vertical',
        // orient: 'horizontal',
        // right: 30,
        // top: 120,
        // width: 200,
        // height: 100,
        // itemHeight: 6,
        // itemWidth: 6,
        // itemGap: 20,
        orient: 'vertical',
        x: 440,
        y: 84,
        itemHeight: 6,
        itemWidth: 6,
        itemGap: 16,
        // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
        formatter: function(value, index) {
          return value;
        },
        data: templateData.legendData
      },

      color: ['#69bcff', '#7668fd', '#aa60ef', '#fc6be1', '#fe687b', '#ff9b66', '#ffc74e'],

      //提示信息
      tooltip: {
        trigger: 'item',
        alwaysShowContent: true
        // position: ['28%', '55%'],
        // backgroundColor: 'transparent',
        // textStyle: {
        //   fontWeight: 'bold',
        //   fontSize: 16
        // },
        // formatter: function(params) {
        //   return '<p style="color:' + params.color + '; width: 100px;text-align: center;">' +
        //     params.percent + '%</p>'
        // }
      },
      series: [{
        name: '',
        type: 'pie',
        center: ['37%', '60%'], // 图形位置
        radius: ['50', '82'],
        avoidLabelOverlap: false,
        tooltip: {
          trigger: 'item',
          position: ['28%', '55%'],
          backgroundColor: 'transparent',
          textStyle: {
            fontWeight: 'bold',
            fontSize: 16
          },
          formatter: function (params) {
            return '<p style="color:' + params.color + '; width: 100px;text-align: center;">' + 
            params.percent + '%</p>'
          }
        },
        itemStyle: {
          normal: {
            //饼图阴影
            shadowColor: 'rgba(0, 0, 0, 0.15)',
            shadowBlur: 13,
            shadowOffsetX: 5
          }
        },
        label: {
          normal: {
            show: false,
            shadowColor: 'rgba(255, 255, 255, 0.9)',
            shadowBlur: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 5,
            borderRadius: 5,
            formatter: function(params) {
              var data = params.data;
              if (data.tempData) {
                return '{title|' + data.name + '}' + '\n' +
                  '{hr|}\n' +
                  '{item|' + data.tempData[0] + '}{itemunit| 元}\n' +
                  '{item|' + data.tempData[1] + '}{itemunit| g}\n' +
                  '{item|' + data.tempData[2] + '}{itemunit| 件}\n'
              }
            },
            rich: {
              title: {
                fontSize: 14,
                fontWeight: 'bold',
                align: 'left'
              },
              item: {
                fontSize: 10,
                color: '#fff',
                align: 'left'
              },
              itemunit: {
                fontSize: 10,
                color: '#ccc',
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
            length: 5
          }
        },
        data: templateData.seriesData
      }]
    }
    sessionStorage.GGKK = JSON.stringify(option)
    return option
  }
}
