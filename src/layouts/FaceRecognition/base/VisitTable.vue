<template>
  <div class="visit-table-main">
    <div class="visit-table-wrap">
        <ul>
          <li v-for="(item, index) in showData" @click="checkData(item)">
            <div class="img-wrap" :class="{'check-actions': filterChect(item.id)}">
              <div class="xj-check-icon" v-if="shopId">
                <i class="iconfont icon-dui1"></i>
              </div>
              <img :src="item.imageUri" alt="">
              <p class="time-tit">{{_GetSF(item.imageTime)}}</p>
            </div>
            <i v-show="item.count == 1" class="sign-tit" v-if="!shopId">NEW</i>
            <img v-show="!shopId" v-if="item.sex == '男'" class="xj-sex-icon" src="~assets/img/man-icon.png" alt="">
            <img v-show="!shopId" v-if="item.sex == '女'" class="xj-sex-icon woman-icon" src="~assets/img/woman-icon.png" alt="">
            <img v-if="item.vipFlag == 1" class="vip-icon" src="~assets/img/vip.png" alt="">
            <p class="bottom-tit">
              <span>本次接待人：</span>
              <span>{{item.receiver ? item.receiver : '无'}}</span>
            </p>
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
import {GetSF} from 'assets/js/getTime'
import {operateOpIntention} from 'Api/commonality/operate'
export default{
  props: ['showData', 'shopId'],
  data () {
    return {
      checkList: [],
      saveSuccess: true
    }
  },
  mounted () {
    let _self = this
    $(".visit-table-main").mCustomScrollbar({
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
          _self.$emit('_seekList')
        }
      }
    })
  },
  methods: {
    _GetSF (parm) {
      return GetSF(parm)
    },
    // seekDetail (parm) {
    //   this.$emit('seekDetail', parm)
    // },
    filterChect (parm) {
      return this.checkList.includes(parm)
    },
    checkData (parm) {
      if (this.shopId) {
        let isAdd = true
        this.checkList.forEach((currentValue, index, arr) => {
          if (currentValue == parm.id) {
            this.checkList.splice(index, 1)
            isAdd = false
            return
          }
        })
        if (isAdd) {
          this.checkList.push(parm.id)
        } 
      } else {
        this.$emit('seekDetail', parm)
      }
    },
    save () {
      let idList = []
      for (let i of this.checkList) {
        idList.push({id: i})
      }
      let options = {
        shopId: this.$route.query.shopId,
        idList: idList,
        operateType: '1'
      }
      operateOpIntention(options)
        .then(res => {
          if (res.data.state == 200) {
            this.$message({
              message: '设置成功',
              type: 'success'
            });
            this.$router.go(-1)
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
.visit-table-main{
  height: 680px;
}
.visit-table-wrap{
  ul{
    font-size: 0;
    li{
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 170px;
      height: 260px;
      background-color: #f5f8f7;
      margin: 20px;
      border-radius: 5px;
      &:hover{
        transition: all .3s;
        box-shadow: 0 0 15px #dedede;
      }
      .img-wrap{
        position: relative;
        width: 146px;
        height: 180px;
        border-radius: 6px;
        overflow: hidden;
        margin: 12px 12px 0 12px;
        background-color: #2993f8;
        &.check-actions{
          border: 4px solid #2993f8;
          .xj-check-icon{
            background-color: #2993f8;
            i{
              color: #fff;
            }
          }
        }
        // border: 4px solid #2993f8;
        img{
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
        >.time-tit{
          position: absolute;
          bottom: 4px;
          right: 4px;
          font-size: 14px;
          color: #fff;
          text-shadow: 1px 1px 3px #000;
        }
        .xj-check-icon{
          position: absolute;
          top: 0;
          left: 0;
          width: 25px;
          height: 25px;
          line-height: 23px;
          background-color: #fff;
          border-radius: 0 0 22px 0;
          z-index: 10;
          text-align: center;
          >i{
            font-size: 14px;
            color: #2993f8;
          }
        }
      }

      >.sign-tit{
        position: absolute;
        top: 5px;
        left: 10px;
        display: block;
        width: 38px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        color: #fff;
        background-color: rgb(254, 85, 119);
        border-radius: 5px;
        // text-shadow: 1px 1px 3px #000;
      }

      .xj-sex-icon{
        position: absolute;
        top: 5px;
        right: 5px;
        width: 19px;
        // font-size: 14px;
        color: #ccc;
      }
      .woman-icon{
        transform: rotate(180deg);
        -ms-transform: rotate(180deg);   /* IE 9 */
        -moz-transform: rotate(180deg);  /* Firefox */
        -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
        -o-transform: rotate(180deg);  /* Opera */
      }
      .vip-icon{
        display: block;
        width: 30px;
        margin: 4px auto;
      }
      .bottom-tit{
        position: absolute;
        bottom: 10px;
        width: 100%;
        text-align: center;
        span{
          font-size: 14px;
          color: #999;
        }
        span:last-child{
          color: #333;
        }
      }
    }
  }
}
</style>