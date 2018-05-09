<template>
  <div class="day-flow-main">
    <div class="day-flow-header">
      <div class="header-left">
        <span>来访男女比例</span>
      </div>
<!--       <div class="header-right">
        <ul>
          <li>
            <i class="decorate-icon"></i>
            <span>流量走势</span>
          </li>
        </ul>
      </div> -->
    </div>
    <div class="day-flow-wrap">
      <EchartTemplate
        class="day-flow-echarts-wrap"
        :chartData="option"
        :chartloading="echartloading"
         :chartSize="chartSize"
      ></EchartTemplate>
    </div>
  </div>
</template>
<script>
import EchartTemplate from 'base/echart/EchartPic'
import echartGenderFilter from './config/genderProportion'
import {seekReportSex} from 'Api/commonality/seek'
export default {
  props: ['adminStartTime', 'adminEndTime'],
  components: {
    EchartTemplate
  },
  data () {
    return {
      echartloading: false,
      option: {},
      chartSize : {
        x : '100%',
        y : '100%'
      },
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
      seekReportSex(options)
        .then(res => {
          if (res.data.state == 200) {
            if (res.data.data.dataList.length) {
              let  configData = []
              for (let i of res.data.data.dataList) {
                let itemData = {
                  name: i.sex,
                  value: i.count
                }
                configData.push(itemData)
              }
              this.option = echartGenderFilter.echartGender(configData)
            } else {
              let datas = [
                {
                  name: '男',
                  value: 0
                },
                {
                  name: '女',
                  value: 0
                }
              ]
              this.option = echartGenderFilter.echartGender(datas)
            }
            this.echartloading = false
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
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