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

  data() {
    return {
      echarts: null,
      loading: true,
      globalTimer: 1000, //默认loading缓冲时间
      newDataIndex: 0,
      oldDataIndex: 0,
      size: {
        x: 401, //数据图表默认宽
        y: 330 //数据图表默认高
      }
    }
  },

  /*
   * chartData为 echarts ->options 配置数据
   */
  props: ['chartData', 'chartSize', 'chartloading'],

  watch: {
    chartloading: function() {

      if (!this.chartloading) {

        this.reSize();
      }
    }
  },

  methods: {

    //重置echart
    reSize() {
      let _self = this
      //检测echarts是否在DOM上已经注册过
      if (this.echarts) {
        this.echarts.dispose();
      }

      if (this.chartData) {
        this.echarts = Echarts.init(this.$refs.refsEcharts);
        this.echarts.setOption(this.chartData);
        _self.recordChange()
        this.echarts.on('mouseover', function(params) {
          //if (params.dataIndex !== this.oldDataIndex) {
            _self.newDataIndex = params.dataIndex
            _self.recordChange()
          //}
        })
        this.echarts.on('mouseout', function(params) {
          _self.newDataIndex = params.dataIndex
          _self.recordChange()
        })
        // console.log('图形数据', this.chartData.series[0])
      }
    },

    closeChange () {
      // 取消之前高亮的图形
      this.echarts.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.oldDataIndex
      });
    },

    recordChange () {
      this.echarts.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.oldDataIndex
      });

      this.echarts.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.newDataIndex
      });
      this.echarts.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.newDataIndex
      });
      this.oldDataIndex = this.newDataIndex
    },

    setSize() {
      if (this.chartSize) this.size = this.chartSize
      this.$refs.refsEcharts.style.height = this.size.y + 'px';
    },

    load() {

      this.setSize();

      //临时调用，后期通过监听chartloading方式进行调用
      setTimeout(() => {
        this.reSize();
      }, this.globalTimer)

      window.addEventListener('resize', () => {
        if (this.$refs.refsEcharts == undefined) return;
        this.reSize();
        this.echarts.resize();
      });
    }

  },

  mounted() {
    this.$nextTick(() => {
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