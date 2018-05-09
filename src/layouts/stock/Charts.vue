<template>
  <div class="charts-main">
    <p class="charts-header-left">
      <i class="iconfont icon-liebiao"></i>
      <span><span class="main-color"></span>本月走势</span>
    </p>
    <div class="charts-header-right">
      <div class="select-w70-h28" style="display: inline-block; vertical-align: top;padding-top: 22px;margin-right: 10px;" >
        <el-select style="padding-top: 0;" v-model="isOld">
          <el-option
            v-for="(item,index) in attributeList" :key="index"
            @click.native="toggleAttribute(item)"
            :label="item.name"
            :value="item.type">
          </el-option>
        </el-select>
      </div>
      <ul class="filtrate-btn">
        <li :class="{actions: echartActions === 'num'}" @click="changeActions('num')">件数</li>
        <li :class="{actions: echartActions === 'weight'}" @click="changeActions('weight')">件重</li>
        <li :class="{actions: echartActions === 'price'}" @click="changeActions('price')">售价</li>
        <!-- <li :class="{actions: echartActions === 'cost'}" @click="changeActions('cost')">成本</li> -->
      </ul>
    </div>
    <EchartTemplate :option="option" :echartloading="echartloading" class="charts-main-wrap"></EchartTemplate>
  </div>
</template>
<script>
  import EchartTemplate from 'base/echart/EchartTemplate'
  import exhartFilter from 'assets/js/exhartFilter'
  import {stringTime, GetNewMonth} from 'assets/js/getTime'
  import {seekStockTrend} from 'Api/commonality/seek.js'
  export default {
    props: ['changeRepository', 'changeShop', 'changeCounter'],
    components: {
      EchartTemplate
    },
    data () {
      return {
        echartActions: 'num',
        echartloading: true,
        isOld: 3,
        option: {},
        // stockTrend: [],
        stockTrend: {
          typeOne: [],
          typeTwo: [],
          typeThree: []
        },
        attributeList:[
          {
            type: 1,
            name: '成品'
          },
          {
            type: 2,
            name: '旧料'
          },
          {
            type: 3,
            name: '全部'
          }
        ]
      }
    },
    watch: {
      'changeRepository.repositoryId' () {
        // if (this.changeRepository.repositoryId) {
        this._stockTrend()
        // }
      },
      'changeShop.shopId' () {
        this._stockTrend()
      },
      'changeCounter.counterId' () {
        // if (this.changeCounter.counterId) {
          this._stockTrend()
        // }
      }
    },
    created () {
      // console.log('好的AAAAAAAAAA',stringTime())
      this._stockTrend()
    },
    methods: {
      _stockTrend () {
        this.echartloading = true
        let _self = this
        // let timedays = exhartFilter.getTimedays(15)
        // let options = {
        //   startTime: stringTime(-14),
        //   endTime: stringTime(0),
        //   storageId: this.changeRepository.repositoryId,
        //   shopId: this.changeShop.shopId,
        //   counterId: this.changeCounter.counterId,
        //   type: this.isOld
        // }
        let options = [1, 2, 3]
        if (this.isOld == 2) {
          options = [3]
        }
        this._seekStockTrend(options)
        // seekStockTrend(options)
        //   .then(res => {
        //     if (res.data.state === 200) {
        //       // this.stockTrend = exhartFilter.ApiTextData()
        //       this.stockTrend = res.data.data.dataList
        //       this.cutExhart(this.stockTrend)
        //     } else {
        //       this.$store.dispatch('workPopupError', res.data.msg);
        //       this.echartloading = false
        //     }
        //   })
      },
      _seekStockTrend (parm) {
        var type = parm.shift()
        let timeDatas = GetNewMonth()
        // console.log(timeDatas)
        // console.log(type)
        // console.log(type)20180205152555
        let options = {
          // startTime: '20180201000000',
          // endTime: '20180201152555',
          startTime: timeDatas.startTime,
          endTime: timeDatas.endTime,
          storageId: this.changeRepository.repositoryId,
//          shopId: this.changeShop.shopId,
//          counterId: this.changeCounter.counterId,
          productType: this.isOld,
          type: type
        }
        if (this.changeCounter.counterId) {
          options.counterId = this.changeCounter.counterId
        } else {
          options.shopId = this.changeShop.shopId
        }
        console.log('参数:',options);
        seekStockTrend(options)
          .then(res => {
            console.log("请求当月数据:",res);
            if (res.data.state === 200) {
              // console.log('执行系数', parm)
              // this.stockTrend = exhartFilter.ApiTextData()
              switch (type) {
                case 1:
                  this.stockTrend.typeOne = res.data.data.dataList
                case 2:
                  this.stockTrend.typeTwo = res.data.data.dataList
                case 3:
                  this.stockTrend.typeThree = res.data.data.dataList
              }
              // typeOne: [],
              // typeTwo: [],
              // typeThree: [],
              // this.stockTrend.push(...res.data.data.dataList)
              console.log(this.stockTrend)
              if (parm.length) {
                this._seekStockTrend(parm)
              } else {
                console.log(222)
                this.cutExhart(this.stockTrend)
              }
              console.log()
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
              this.echartloading = false
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
      changeActions (parm) {
        this.echartActions = parm
        this.echartloading = !this.echartloading
        this.cutExhart()
      },
      toggleAttribute (parm) {
        // this.isOld = parm
        // if (this.isOld !== 3) {
        //   this.isOld += 1
        // } else {
        //   this.isOld = 1
        // }
        this.echartloading = !this.echartloading
        this._stockTrend()
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '~assets/css/_mixin.scss';
.el-select-dropdown .el-select-dropdown__item.hover{
  color: #2993f8;
}
.charts-main{ // 近15天走势
  position: relative;
  height: 360px;
  width: 890px;
  @include box-shadow;
  border-radius: 10px;
  float: left;
  background-color: #fff;
  .charts-header-left{
    position: absolute;
    top: 0;
    left: 0;
    width: 160px;
    height: 70px;
    z-index: 300;
    padding-top: 20px;
    i{
      display: inline-block;
      vertical-align: middle;
      margin: -2px 10px 0 22px;
      font-size: 16px;
      color: #2993f8;
    }
    >span{
      vertical-align: middle;
      font-size: 16px;
      line-height: 16px;
      color: #333;
    }
  }
  .charts-header-right{
    position: absolute;
    top: 0;
    right: 0;
    width: 340px;
    height: 70px;
    z-index: 300;
    div, ul {
      display: inline-block;
      vertical-align: top;
    }
    div{
      height: 70px;
      width: 85px;
      text-align: center;
      padding-top: 29px;
      cursor: pointer;
      span{
        font-size: 14px;
        line-height: 14px;
        color: #999;
      }
      i{
        display: inline-block;
        vertical-align: top;
      }
      .icon-qiehuan{
        font-size: 13px;
        margin-left: 5px;
        color: #2993f8;
      }
    }
    .filtrate-btn{
      height: 28px;
      width: 228px;
      margin-top: 21px;
      font-size: 0;
      border: 1px solid #ffb549;
      border-radius: 5px;
      text-align: center;
      li{
        width:33.33%;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        
        display: inline-block;
        color: #999;
        cursor: pointer;
        transition: all .2s;
        // &:last-child{
        //    float: right;
        //    margin: 0;
        // }
        &:hover{
          color: #fff;
          background-color: #ffb549;
        }
      }
      &:nth-child(1){
        margin-left:1px; 
      }
      .actions{
        background-color: #ffb549;
        color: #fff;
      }
    }
  }
  .charts-main-wrap{
    background-color: #fff;
    border-radius: 10px;
    width: 890px;
    height: 360px;
  }
}
</style>
