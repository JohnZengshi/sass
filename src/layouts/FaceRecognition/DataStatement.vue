<template>
  <div class="stock-statement-main">
    <div class="stock-header-wrap">
      <div class="header-select">
        <p>
          <i class="iconfont icon-huiyuan"></i>
          <span>数据报表</span>
        </p>
        <ul class="down-list-wrap">
          <li>
            <DownMenu
              :titleInfo="currentShop.shopName ? currentShop.shopName : '无店铺'"
              :showList="shopListByCo"
              @changeData="changeShopData"
              @clearInfo="clearShopData"
            ></DownMenu>
          </li>
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
            <span class="connect-tit">至</span>
            <div class="date-w81">
              <el-date-picker
                format
                v-model="endTime"
                type="date"
                placeholder="结束时间"
                @change="dateEndChange"
              >
              </el-date-picker>
            </div>
          </li>
          <li>
          </li>
        </ul>
      </div>
    </div>
    <div class="modules-table-wrap">
      <DayFlow
        ref="dayFlowWrap"
        :currentShop="currentShop"
        class="chart-wrap"
      ></DayFlow>
      <AgeExhart
        ref="ageExhartWrap"
        :adminStartTime="adminStartTime"
        :adminEndTime="adminEndTime"
        class="chart-wrap fr"
      ></AgeExhart>
    </div>
    <div class="modules-table-wrap">
      <GenderProportion
        ref="genderProportionWrap"
        class="chart-wrap"
        :adminStartTime="adminStartTime"
        :adminEndTime="adminEndTime"
      ></GenderProportion>
      <memberEchart
        ref="memberEchartWrap"
        :adminStartTime="adminStartTime"
        :adminEndTime="adminEndTime"
        class="chart-wrap fr"
      ></memberEchart>
<!--       <AgeExhart
        class="chart-wrap fr"
      ></AgeExhart> -->
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import DownMenu from 'base/menu/DownMenu'
import DayFlow from './base/DayFlow'
import AgeExhart from './base/AgeExhart'
import GenderProportion from './base/GenderProportion'
import memberEchart from './base/memberEchart'
import {getMonthStart, formattingXjTime, formattingTime, xjEndTime} from 'assets/js/getTime'
export default {
  components: {
    DownMenu,
    DayFlow,
    AgeExhart,
    GenderProportion,
    memberEchart
  },
  data () {
    return {
      beginTime: getMonthStart(),
      endTime: new Date(),
      currentShop: {
        shopId: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      "shopListByCo" // 店铺列表
    ]),
    adminStartTime () {
      return formattingTime(this.beginTime)
    },
    adminEndTime () {
      if (formattingTime(this.beginTime) == formattingTime(this.endTime)) {
        return xjEndTime(this.beginTime)
      }
      return xjEndTime(this.endTime)
      // return formattingTime(this.endTime)
    }
  },
  mounted () {
    if (this.shopListByCo[0]) {
      this.changeShopData(this.shopListByCo[0])
    }
  },
  watch: {
    'shopListByCo' () {
      if (this.shopListByCo[0]) {
        this.changeShopData(this.shopListByCo[0])
      }
    }
  },
  methods: {
    updateData () { // 更新各个模块数据
      this.$refs.dayFlowWrap.seekList(this.currentShop)
      this.$refs.ageExhartWrap.seekList(this.currentShop)
      this.$refs.genderProportionWrap.seekList(this.currentShop)
      this.$refs.memberEchartWrap.seekList(this.currentShop)
    },
    changeShopData (item) {
      this.currentShop = item
      this.updateData()
    },
    clearShopData () {
      this.currentShop = {}
      this._seekList()
    },
    dateChange (val) {
      this.updateData()
      this._seekList()
    },
    dateEndChange (val) {
      this.updateData()
      this._seekList()
    },
    _seekList () {
      console.log('查询数据')
      let options = {
        shopId: '',
        beginTime: '',
        endTime: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/css/_mixin.scss';
.stock-statement-main{
  font-size: 0;
  width: 1250px;
  margin: 30px auto;
  .stock-header-wrap{
    .header-select{
      height: 40px;
      margin-bottom:15px;
      p, ul{
        display: inline-block;
      }
      p{
        line-height: 40px;
        font-size: 16px;
        
        i{
          display: inline-block;
          vertical-align: middle;
          font-size: 20px;
          color: #2993f8;
        }
        span{
          vertical-align: middle;
          font-size: 16px;
          line-height: 20px;
          margin-left: 2px;
          font-weight: bold;
          color: #333;
        }
      }
      .down-list-wrap{
        font-size: 0;
        float: right;
        li{
          display: inline-block;
          vertical-align: top;
          background-color: #fff;
          border-radius: 4px;
          margin-right: 16px;
          margin-left: 16px;
          .connect-tit{
            display: inline-block;
            font-size: 12px;
            margin-top: 4px;
            color: #999;
          }
        }
        >li:nth-child(2){
          border: 1px solid #d6d6d6;
        }
      }
    }
  }
  .modules-table-wrap{
    margin-top: 20px;
    height: 300px;
    .chart-wrap{
      box-shadow: 0 0 15px #ddd;
      border-radius: 10px;
      background-color: #fff;
      height: 300px;
      width: 610px;
      float: left;
    }
    .fr{
      float: right;
    }
  }
}
</style>