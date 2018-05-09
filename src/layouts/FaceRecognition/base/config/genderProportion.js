export default class echartGenderFilter {

  static  legend () {
    let options = {
      // icon: 'circle',
      // borderRadius: 5,
      "orient": "vertical",
      "x": 440,
      "y": 84,
      "itemHeight": 10,
      "itemWidth": 10,
      "itemGap": 16,
      "data": ["男", "女"]
    }
    return options
  }

  static color = ['#766df9', '#fec659']

  static tooltip = {
    trigger: "axis",
    alwaysShowContent: true
  }


  static series (parm) {
    let options = [{
      "name": "",
      "type": "pie",
      "center": ["46%", "55%"],
      "radius": ["55", "82"],
      "avoidLabelOverlap": false,

      tooltip: {
        trigger: 'item',
        position: ['37%', '50%'],
        backgroundColor: 'transparent',
        textStyle: {
          fontWeight: 'bold',
          fontSize: 16
        },
        formatter: function (params) {
          return '<p style="color:' + params.color + '; width: 100px;text-align: center;margin-top: -6px;">' + 
          params.percent + '%' + '<p style="color:#ccc;' +  '; width: 100px;text-align: center;font-size: 12px;margin-top: -10px;">' + params.value + '人</p>' + '</p>'
        }
      },

      "itemStyle": {
        "normal": {
          "shadowColor": "rgba(0, 0, 0, 0.15)",
          "shadowBlur": 13,
          "shadowOffsetX": 5
        }
      },
      "label": {
        show: false,
        "normal": {
          "show": false,
        }
      },
      // "label": {
      //   "normal": {
      //     "show": false,
      //     "shadowColor": "rgba(255, 255, 255, 0.9)",
      //     "shadowBlur": 10,
      //     "backgroundColor": "rgba(0, 0, 0, 0.5)",
      //     "padding": 5,
      //     "borderRadius": 5,
      //     formatter: function(params) {
      //       return '{title|' + params.name + '}'
      //     },
      //     "rich": {
      //       "title": {
      //         "fontSize": 14,
      //         "fontWeight": "bold",
      //         "align": "left"
      //       }
      //     }
      //   },
      //   "emphasis": {
      //     "show": true
      //   }
      // },
      "labelLine": {
        "normal": {
          "show": false,
          "length": 5
        }
      },
      data: parm
      // "data": [
      //   {
      //     "value": 3,
      //     "name": "男",
      //     // "tempData": [0, 0, 3]
      //   },
      //   {
      //     "value": 1,
      //     "name": "女",
      //     // "tempData": [-1.98, 1, 1]
      //   }
      // ]
    }]
    return options
  }

  static echartGender (parm) {
    let options = {
      backgroundColor: '#fff',
      color: this.color,
      tooltip: this.tooltip,
      legend: this.legend(),
      animation: true,
      series: this.series(parm) // this.ApiTextData()
    }
    console.log('看输出', options)
    return options
  }
}