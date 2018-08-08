<template>
  <div class="follow-up-echarts-main">
    <div class="body-left">
      <EchartTemplate :option="option" :echartloading="echartloading" class="charts-main-wrap"></EchartTemplate>
    </div>
    <div class="body-right">

      <ul class="center-num-list">
        <li>
          <p>{{memberList.memberCount}}</p>
          <p>未完成跟进</p>
        </li>
        <li>
          <p>{{memberList.newMember}}</p>
          <p>本周跟进</p>
        </li>
        <li>
          <p>{{memberList.conversion}}</p>
          <p>已完成跟进</p>
        </li>
        
      </ul>
    </div>
  </div>
</template>
<script>
import EchartTemplate from 'base/echart/EchartTemplate'
  import exhartFilter from 'assets/js/exhartFilter'
import {seekStockTrend} from 'Api/commonality/seek.js'
export default {
  components: {
    EchartTemplate
  },
  data () {
    return {
      option: {},
      echartloading: true,
      memberList: {
        memberCount: '1000',
        newMember: '1000',
        conversion: '1000',
      }
    }
  },
  methods: {
    _seekStockTrend () {
      let options = {
        "startTime": "20180801000000",
        "endTime": "20180808182923",
        "storageId": "",
        "productType": 2,
        "type": 3,
        "shopId": ""
      }
      seekStockTrend(options)
        .then(res => {
          if (res.data.state === 200) {
            this.stockTrend.typeOne = res.data.data.dataList
            this.cutExhart(this.stockTrend)
          } else {
            this.$message({type: error, message: res.data.msg})
          }
        })
    },
    cutExhart (parm) {
      let _self = this
      setTimeout(function() {
        _self.option = exhartFilter.exhartStockAxis(_self.echartActions, _self.stockTrend, _self.isOld)
        _self.echartloading = false;
      }, 1000)
    },
  }
}
</script>
<style lang="scss" scoped>
.follow-up-echarts-main{
  height: 230px;
  border: 1px solid red;
  display:flex;
  >.body-left, >.body-right{
    height: 100%;
    flex: 1;
    border: 1px solid blue;
  }
  .body-right{
    margin-left: 60px;
    .center-num-list{
      font-size: 0;
      // width: 900px;
      // height: 200px;
      margin: 90px 0 0 0;
      vertical-align: top;
      margin-bottom: 30px;
      display: flex;
      // text-align: center;
      li{
        vertical-align: center;
        display: inline-block;
        // padding: 15px;
        flex: 1;
        font-size: 22px;
        // margin-right: 150px;
        p{
          text-align: center;
        }
        p:nth-child(1){
          color: #333;
          font-size: 30px;
          margin-bottom: 5px;
          font-weight: bold;
        }
        p:nth-child(2){
          color: #666;
          font-size: 14px;
        }
      }
      li:nth-child(1){
        p:nth-child(1){
          color: #2993f8;
        }
      }
    }
  }
  .charts-main-wrap{
    background-color: #fff;
    border-radius: 10px;
    width: 500px;
    height: 360px;
  }
}
</style>