<template>
  <div
    ref="echartTemplate"
    v-loading="echartloading" 
    element-loading-text="loading..."
    ></div>
</template>
<script>
  import Echarts from 'echarts'
  export default{
    data () {
      return {
        myChart: ''
      }
    },
    props: ['option', 'echartloading'],
    watch: {
      'echartloading' () {
        if( this.myChart ){
          // this.$refs.echartTemplate == undefined
          // this.echarts.dispose();
          this.myChart = Echarts.init(this.$refs.echartTemplate);
          this.myChart.setOption({});
        }
        if (!this.echartloading) {
          this.initEcharts()
        }
      }
    },
    methods: {
      initEcharts () {
        this.myChart = Echarts.init(this.$refs.echartTemplate);
        this.myChart.clear()
        this.myChart.setOption(this.option);
      }
    }
  }
</script>
