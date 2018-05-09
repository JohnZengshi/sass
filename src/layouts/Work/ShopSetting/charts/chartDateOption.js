let Echarts = require('echarts')

export const stocksDatas = ( optionData ) => {

let option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
        },
        title: {
            text: optionData.totalNum,
            subtext: '件',
            x: 'center',
            y: 'center',
            textStyle: {
                fontSize: 16,
                color: '#ff8d43'
            }
        },
        series: [{
            name: '商品',
            type: 'pie',
            radius: ['55%', '70%'],
            label: {
                normal: {
                    // position: 'center',
                    show: true,
                }
            },
            labelLine: {
                normal: {
                    show: true,
                }
            },
            data: [{
                value: optionData.chartsData.finishNum,
                name: '成品',
                label: {
                    normal: {
                        formatter: '{b}',
                        textStyle: {
                            fontSize: 16,
                            color: '#2b4fd5'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(43, 77, 210, 1)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(53, 25, 108, 1)'
                        }]),
                        borderColor: 'rgba(255,255,255,1)',
                    },
                },
            },{
                value: optionData.chartsData.oldNum,
                name: '旧料',
                label: {
                    normal: {
                        formatter: '{b}',
                        textStyle: {
                            textStyle: {
                                fontSize: 16,
                                color: '#ff8d43'
                            }
                        }
                    }
                },

                itemStyle: {
                    normal: {
                        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255, 200, 88, 1)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(255, 144, 68, 1)'
                        }]),
                        borderColor: 'rgba(255,255,255,1)',

                    }
                }
            }]
        }]
    }
	return option 
}
