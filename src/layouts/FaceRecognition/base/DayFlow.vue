<template>
  <div class="day-flow-main">
    <div class="day-flow-header">
      <div class="header-left">
        <span>日流量走势</span>
      </div>
      <div class="header-right">
        <ul>
          <li>
            <div class="date-w81">
              <el-date-picker
                format
                v-model="beginTime"
                type="date"
                placeholder="开始时间"
                @change="dateChange"
              >
              </el-date-picker>
            </div>
            <!-- <i class="decorate-icon"></i>
            <span>流量走势</span> -->
          </li>
        </ul>
      </div>
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
import {seekReportHours} from 'Api/commonality/seek'
import EchartTemplate from 'base/echart/EchartTemplate'
import echartDayFilter from './config/exhartFilter'
import {getMonthStart, formattingXjTime, formattingTime, formattingEndTime} from 'assets/js/getTime'
export default {
  props: ['currentShop'],
  components: {
    EchartTemplate
  },
  data () {
    return {
      echartloading: true,
      option: {},
      beginTime: new Date()
    }
  },
  methods: {
    seekList (parm) {
      this.echartloading = true
      let options = {
        shopId: this.currentShop.shopId,
        beginTime: formattingTime(this.beginTime),
        endTime: formattingEndTime(this.beginTime)
      }
      seekReportHours(options)
        .then(res => {
          if (res.data.state == 200) {
            this.option = echartDayFilter.exhartDay(res.data.data.dataList)
            this.echartloading = false
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },
    dateChange () {
      this.seekList()
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
      ul{
        display: inline-block;
        vertical-align: middle;
        font-size: 0;
        li{
          display: inline-block;
          margin-right: 12px;
          height: 28px;
          font-size: 0;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
          span{
            font-size: 12px;
            vertical-align: top;
          }
          .decorate-icon{
            display: inline-block;
            width: 10px;
            height: 6px;
            vertical-align: top;
            background-color: #fb687d;
            margin-top: 3px;
            margin-right: 5px;
            border-radius: 10px;
          }
        }
      }
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