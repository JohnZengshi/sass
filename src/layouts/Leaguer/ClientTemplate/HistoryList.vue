<template>
<transition name="tp-ani">
  <div class="history-list-main">
        <h3>
            <span>顾客详情</span>
        </h3>
        <ul class="list-wrap header-style">
          <li>到店时间</li>
          <li>接待人</li>
          <li>消费金额</li>
        </ul>
        <div class="c-history-list-wrap">
          <div>

            <ul class="list-wrap" v-for="item in showData" @click="seekCurrentDetail(item.id)">
              <li>
                <span>{{_GetChineseNYR(item.visitTime)}} </span>
                <span>{{_GetSF(item.visitTime)}}</span>
              </li>
              <li>{{item.receiver}}</li>
              <li>{{item.amount}}</li>
            </ul>

          </div>
        </div>
        <ul class="client-operation-btn">
          <li @click="getBack">返回</li>
        </ul>
    </div>
</transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {GetChineseNYR, GetSF} from 'assets/js/getTime'
import {seekGetVisitLog} from 'Api/commonality/seek'
export default {
    props: ['currentSeekData', 'shopId'],
    data () {
        return {
            showData: []
        }
    },
    computed: {
        ...mapGetters([
            "shopListByCo" // 店铺列表
        ])
    },
    mounted () {
      $(".c-history-list-wrap").mCustomScrollbar({
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
      _GetChineseNYR (parm) {
        return GetChineseNYR(parm)
      },
      _GetSF (parm) {
        return GetSF(parm)
      },
      _seekList (parm) {
        let options = {
          shopId: this.shopId,
          otherId: parm,
          page: 1,
          pageSize: 9999
        }
        seekGetVisitLog(options)
          .then(res => {
            console.log('res.datares.data', res.data.data.dataList)
            if (res.data.state == 200) {
              this.showData = res.data.data.dataList
            } else {
              this.$message({
                type: 'warning',
                message: res.data.msg
              })
            }
          })
      },
      seekCurrentDetail (parm) {
        this.$emit('seekCurrentDetail', parm)
      },
      getBack () {
        this.$emit('closeHistory')
      }
    }
}
</script>
<style lang="scss">
.history-list-main{
    width: 700px;
    height: 690px;
    padding: 0 36px;
    >h3{
        margin-top: -40px;
        height: 50px;
        line-height: 50px;
        width: 80%;
        font-size: 0;
        >span{
            font-size: 16px;
            font-weight: bold;
        }
        >i{
            display: inline-block;
            width: 38px;
            height: 20px;
            text-align: center;
            background-color: #ffc62e;
            line-height: 20px;
            font-style: normal;
            font-size: 12px;
            margin-left: 10px;
            border-radius: 4px;
            color: #fff;
        }
    }
    .list-wrap{
      width: 630px;
      margin: 0 auto;
      font-size: 0;
      height: 48px;
      // background-color: #e7e7e7;
      li{
        display: inline-block;
        font-size: 12px;
        color: #333;
        width: 209px;
        height: 48px;
        line-height: 48px;
        vertical-align: top;
        text-align: center;
      }
    }
    .header-style{
        height: 50px;
        // margin-top: 10px;
        background-color: #f5f5f5;
        overflow: hidden;
        position: relative;
        width: 100%;
        :after {
          content: "";
          height: 2px;
          width: 100%;
          background: #e7e7e7;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 2;
        }
    }
    .c-history-list-wrap{
      height: 570px;
      .list-wrap:nth-child(2n){
        background-color: #f4f4f4;
      }
      .list-wrap{
        transition: all 1.5s;
        &:hover{
          background-color: rgba(233, 233, 233, 1);
        }
        li{
          cursor: pointer;
        }
      }
    }
    >.client-operation-btn{
        position: absolute;
        text-align: center;
        left: 0;
        right: 0;
        bottom: 26px;
        margin: auto;
        font-size: 0;
        >li{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            width: 80px;
            border-radius: 4px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            background-color: #2993f8;
            cursor: pointer;
        }
    }
}
</style>