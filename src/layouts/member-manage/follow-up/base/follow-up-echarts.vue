<template>
  <div class="follow-up-echarts-main">

    <div class="body-left">
      <p>本月跟进趋势</p>
      <EchartTemplate :option="option" :echartloading="echartloading" class="charts-main-wrap"></EchartTemplate>
    </div>

    <div class="body-right">

      <ul class="center-num-list">
        <li>
          <p><span>{{memberList.unfinished}}<i @click="cutData('5')">点击查看</i></span></p>
          <p>未完成跟进</p>
        </li>
        <li>
          <p><span>{{memberList.soonExpire}}<i @click="cutData('6')">点击查看</i></span></p>
          <p>即将到期</p>
        </li>
        <li>
          <p><span>{{memberList.completed}}<i @click="cutData('3')">点击查看</i></span></p>
          <p>已完成跟进</p>
        </li>

      </ul>
    </div>

    <cut-bg class="cut-btn" :showList="cutList" :current="filterData.type" @pitchOn="pitchOn"></cut-bg>


  </div>
</template>
<script>
import EchartTemplate from 'base/echart/EchartTemplate'
import cutBg from 'base/cut/cut-bg'
import exhartFilter from 'assets/js/exhartFilter'
import {seekMemberFollowNum} from 'Api/commonality/seek'
export default {
  components: {
    EchartTemplate,
    cutBg
  },
  props: ['filterCondition', 'shopId'],
  data () {
    return {
      grid: [{ top: 60, left: 50, right: 30, bottom: 50 }], // 图形的间距
      filterData: {
        followStatus: '',
        type: '2',
        // followPurpose: '',
        // followType: '',
        // chargeId: '',
      },
      cutList: [
        {
          name: '我的跟进',
          id: '2'
        },
        {
          name: '全部跟进',
          id: '1'
        }
      ],
      option: {},
      stockTrend: {},
      echartloading: false,
      isOld: 2,
      echartActions: 'followNum',
      memberList: {
        memberCount: '178',
        newMember: '60',
        conversion: '308',
      }
    }
  },
  created () {
    this._seekMemberFollowNum()
  },
  methods: {
    _seekMemberFollowNum () {
      this.echartloading = true;
      seekMemberFollowNum({type: this.filterCondition.type, shopId: this.shopId})
        .then(res => {
          if (res.data.state == 200) {
            this.memberList = res.data.data
            let echartList = res.data.data.dataList
            for (let i of echartList) {
              i.date = i.followTime
            }
            this.cutExhart(echartList)
          } else {
            this.$message({type: 'error', message: res.data.msg})
          }
        })
    },
    cutExhart (parm) {
      setTimeout(() => {
        this.option = exhartFilter.memberAxis(this.echartActions, parm, '会员', this.grid)
        this.echartloading = false;
      }, 500)
    },
    cutData (parm) {
      this.filterData.followStatus = parm
      this.update()
    },
    update () {
      setTimeout(() => {
        this.$emit('update', this.filterData)
        // this._seekMemberFollowNum()
      }, 0)
    },
    pitchOn (parm) {
      this.filterData.type = parm.id
      this.update()
    }
  }
}
</script>
<style lang="scss" scoped>
.follow-up-echarts-main{
  positon: relative;
  height: 320px;
  display:flex;
  >.body-left, >.body-right{
    position: relative;
    height: 100%;
    flex: 1;
  }
  >.body-left{
    >p{
      position: absolute;
      left: 0;
      right: 0;
      font-size: 16px;
      color: #333;
      top: 28px;
      margin: auto;
      text-align: center;
    }
  }
  .body-right{
    // margin-left: 60px;
    .center-num-list{
      font-size: 0;
      // width: 900px;
      // height: 200px;
      margin: 120px 0 0 0;
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
          position: relative;
          color: #333;
          font-size: 30px;
          margin-bottom: 5px;
          font-weight: bold;
          span{
            position: relative;
            i{
              position: absolute;
              font-size: 12px;
              color: #2993f8;
              right: -50px;
              bottom: 0;
              cursor: pointer;
              text-decoration: underline;
              font-style: normal;
              &:hover{
                color: #4DB3FF;
              }
            }
          }
        }
        p:nth-child(2){
          color: #666;
          font-size: 14px;
        }
      }
    }
  }
  .charts-main-wrap{
    background-color: #fff;
    border-radius: 10px;
    width: 530px;
    height: 300px;
  }
  >.cut-btn{
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>