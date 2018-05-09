<template>
  <div class="leaguer-data-grid-body-main"
    v-loading="tableLoading" 
    element-loading-text="loading..."
  >
    <div class="leaguer-data-grid-body-wrap">
      <ul v-for="(item, index) in showData">
        <li :style="filterWidth(0)">
          {{index + 1}}
        </li>
      
<!--         <li :style="filterWidth(1)">
          {{item.vipNO}}
        </li> -->

<!--         <li :style="filterWidth(1)">
          {{item.id ? item.id : '无'}}
        </li> -->

        <li :style="filterWidth(1)">
          <img :src="item.imageUri" alt="">
        </li>

        <li :style="filterWidth(2)">
          {{item.vipFlag == 1 ? '会员用户' : '普通用户'}}
        </li>

        <li :style="filterWidth(3)">
          {{item.userName ? item.userName : '无'}}
        </li>

        <li :style="filterWidth(4)">
          {{item.phone ? item.phone : '无'}}
        </li>

        <li :style="filterWidth(5)">
          <template v-if="item.preInfo">
            {{item.preInfo[0].sex}}
          </template>
          <template v-else>
            无
          </template>
        </li>

        <li :style="filterWidth(6)">
          <template v-if="item.preInfo">
            {{item.preInfo[0].age ? item.preInfo[0].age : '无'}}
          </template>
          <template v-else>
            无
          </template>
        </li>

        <li :style="filterWidth(7)">
          {{item.amount ? item.amount : '无'}}
        </li>

        <li :style="filterWidth(8)">
          <template v-if="item.preInfo">
            {{item.preInfo[0].preReceiver ? item.preInfo[0].preReceiver : '无'}}
          </template>
          <template v-else>
            无
          </template>
        </li>

        <li v-if="item.imageTime" :style="filterWidth(9)" class="time-tit">
          <p>{{_GetNYR(item.imageTime)}}</p>
          <p>{{_GetSF(item.imageTime)}}</p>
        </li>
        <li v-else :style="filterWidth(9)">
          无
        </li>

        
        <li v-if="item.intentionTime" :style="filterWidth(10)" class="time-tit">
            <p>{{_GetNYR(item.intentionTime)}}</p>
            <p>{{_GetSF(item.intentionTime)}}</p>
        </li>
        <li v-else :style="filterWidth(10)">
          无
        </li>

        <li :style="filterWidth(11)">
          {{item.count}}
        </li>

        <li :style="filterWidth(12)">
          <a href="javascript: void(0)" @click="seekDetail(item)">查看详情</a>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
import {GetNYR, GetSF} from 'assets/js/getTime'
export default{
  props: ['detailDataGridColumn', 'showData', 'tableLoading'],
  data () {
    return {
      saveSuccess: true
    }
  },
  mounted () {
    $(".leaguer-data-grid-body-main").mCustomScrollbar({
      theme: "minimal-dark",
      axis: 'y',
      mouseWheel: {
        scrollAmount: 200,
        preventDefault: false,
        normalizeDelta: false,
        scrollInertia : 0
      },
      callbacks: {
        onTotalScroll: function () {
          // _this.$emit('lazyloadSend', {refresh: true})
        }
      }
    })
  },
  methods: {
    _GetNYR (parm) {
      return GetNYR(parm)
    },
    _GetSF (parm) {
      return GetSF(parm)
    },
    filterWidth (Index) {
      if (this.detailDataGridColumn[Index]) {
        return `width:${this.detailDataGridColumn[Index].width}px`
      } else {
        return `width:70px`
      }
    },
    seekDetail (parm) {
      if (parm.id == parm.memberId) {
        this.$emit('openEditReturn', parm)
      } else {
        this.$emit('seekDetail', parm)
      }
    }
  } 
}
</script>
<style lang="scss" scoped>
.leaguer-data-grid-body-main{
  height: 650px;
}
.leaguer-data-grid-body-wrap{
  >ul{
    height: 90px;
    font-size: 0;
    li{
      display: inline-block;
      vertical-align: top;
      text-align: center;
      height: 90px;
      line-height: 90px;
      font-size: 12px;
      color: #666;
      >img{
        margin-top: 10px;
        width: 70px;
        height: 70px;
        border-radius: 5px;
      }
      >a{
        display: block;
        height: 30px;
        line-height: 30px;
        width: 64px;
        border-radius: 4px;
        color: #fff;
        margin: 30px auto 0 auto;
        background-color: #2993f8;
      }
    }
    .time-tit{
      p{
        font-size: 12px;
        line-height: 12px;
      }
      p:first-child{
        margin: 30px 0 6px 0;
      }
    }
  }
  >ul:nth-child(2n){
    background-color: #f5f5f5;
  }
}
</style>