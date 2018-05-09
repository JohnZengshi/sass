<template>
  <div class="day-flow-main">
    <div class="day-flow-header">
      <div class="header-left">
        <span>会员访店图</span>
      </div>
      <img class="header-right" src="~assets/img/work/member-icon.png" alt="">
    </div>
    <div class="day-flow-wrap">
      <EchartTemplate
        class="day-flow-echarts-wrap"
        :option="option"
        :echartloading="echartloading"
      ></EchartTemplate>
    </div>
  </div>
</template>
<script>
import EchartTemplate from 'base/echart/EchartTemplate'
import echartAgeFilter from './config/memberFilter'
import {seekReportVisit} from 'Api/commonality/seek'
export default {
  props: ['adminStartTime', 'adminEndTime'],
  components: {
    EchartTemplate
  },
  data () {
    return {
      echartloading: true,
      option: {}
    }
  },
  methods: {
    seekList (parm) {
      this.echartloading = true
      let options = {
        shopId: parm.shopId,
        beginTime: this.adminStartTime,
        endTime: this.adminEndTime
      }
      seekReportVisit(options)
        .then(res => {
          if (res.data.state == 200) {
            this.option = echartAgeFilter.echartAge(res.data.data.dataList)
            this.echartloading = false
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
      // let datas = [
      //   {
      //     timeQuantum: '1',
      //     totalNum: '1',
      //     manNum: '1',
      //     womanNum: '1',
      //   }
      // ]
      // setTimeout(() => {
      //   let datas = [
      //     {
      //       ageGroup: '1',
      //       totalNum: '100'
      //     },
      //     {
      //       ageGroup: '2',
      //       totalNum: '200'
      //     },
      //     {
      //       ageGroup: '3',
      //       totalNum: '300'
      //     },
      //     {
      //       ageGroup: '4',
      //       totalNum: '600'
      //     }
      //   ]
      //   this.option = echartAgeFilter.echartAge(datas)
      //   this.echartloading = false
      // }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.day-flow-main{
  position: relative;
  .day-flow-header{
    position: absolute;
    width: 100%;
    top: 0;
    height: 50px;
    padding: 10px 25px;
    z-index: 100;
    .header-left{
      float: left;
      span{
        vertical-align: top;
        font-size: 16px;
        color: #333;
      }
    }
    .header-right{
      float: right;
      height: 30px;
      // ul{
      //   display: inline-block;
      //   vertical-align: middle;
      //   font-size: 0;
      //   li{
      //     display: inline-block;
      //     margin-right: 12px;
      //     height: 28px;
      //     font-size: 0;
      //     span{
      //       font-size: 12px;
      //       vertical-align: top;
      //     }
      //     .decorate-icon{
      //       display: inline-block;
      //       width: 10px;
      //       height: 6px;
      //       vertical-align: top;
      //       background-color: #fb687d;
      //       margin-top: 3px;
      //       margin-right: 5px;
      //       border-radius: 10px;
      //     }
      //   }
      // }
    }
  }
  // 图形外壳
  .day-flow-echarts-wrap{
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 10px;
    z-index: 1;
  }
}

</style>