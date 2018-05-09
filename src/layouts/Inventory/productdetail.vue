<template>
  <div class="productdetail-bar">
    <div class="innerBox">
      <div class="left"></div>
      <div class="right" @mouseleave="leave" ref="bgccolor">
        <div class="top" @mouseenter="enter" ref="bgc">
          <span>2017-1-19</span>
          <span>调库</span>
        </div>
        <div class="content" v-if="contentshow">
          <ul>
            <li><span>单据号</span><span>RK6256567722</span></li>
            <li><span>操作人</span><span>cherry</span></li>
            <li><span>入库库位</span><span>深圳仓库</span></li>
            <li><span>供应商</span><span>深圳仓库</span></li>
            <li><span>当前位置</span><span>深圳仓库</span></li>
            <li><span>入库库位</span><span>深圳仓库</span></li>
            <li><span>供应商</span><span>深圳仓库</span></li>
            <li><span>供应商</span><span>深圳仓库</span></li>
            <li><span>供应商</span><span>深圳仓库</span></li>
            <li><span>供应商</span><span>深圳仓库</span></li>
          </ul>
        </div>
        <div class="bottom" v-if="bottomshow">
          <i class="iconfont icon-arrow-down"></i>
        </div>
      </div>
    </div>
    <div class="success">
      <img src="../../../static/img/earth.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      contentshow: false,
      bottomshow: false
    }
  },
  methods: {
    leave () {
      this.contentshow = false
      this.bottomshow = false
      this.$refs.bgc.style.backgroundColor = 'transparent'
      this.$refs.bgccolor.style.backgroundColor = 'transparent'
    },
    enter () {
      this.contentshow = true
      this.bottomshow = true
      this.$refs.bgc.style.backgroundColor = '#fff'
      this.$refs.bgccolor.style.backgroundColor = '#fff'
    }
  }
}
</script>
<style lang="scss" scoped>
  .productdetail-bar{
    min-height: 30px;
    max-height: 750px;
    width: 194px;
    border-left: 7px solid #9bceff;
    padding-top: 30px;
    // background-color: transparent;
    .innerBox{
      // &:last-of-type{
      //   margin-bottom: 0;
      // }
      // margin-bottom: 49px;
      width: 100%;
      position: relative;
      .left{
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #fff;
        border: 3px solid #2993f8;
        position: absolute;
        top: 10px;
        left: -11px;
      }
      .right{
        width: 173px;
        // height: 274px;
        background-color: #fff;
        margin-left: 14px;
        border-top-left-radius: 23px;
        border-bottom-right-radius: 23px;
        overflow: scroll;
        .top{
          background-color: #fff;
          border-top-left-radius: 23px;
          position: absolute;
          width: 173px;
          z-index: 200;
          top: 0;
          span{
            &:nth-of-type(1){
              display: inline-block;
              width: 86px;
              height: 30px;
              background-color: #2993f8;
              border-top-left-radius: 23px;
              border-bottom-right-radius: 15px;
              color: #fff;
              text-align: center;
              line-height: 30px;
              font-size: 12px;
              font-weight: 700;
            }
            &:nth-of-type(2){
              color: #2993f8;
              font-size: 12px;
              font-weight: 700;
              margin-left: 5px;
            }
          }
        }
        .top:hover{
          cursor: pointer;
        }
        .content{
          font-size: 12px;
          padding-left: 13px;
          margin-top: 42px;
          padding-top: 0;
          height: 240px;
          >ul{
            >li{
              margin-bottom: 13px;
              >span{
                &:nth-of-type(1){
                  display: inline-block;
                  margin-right: 16px;
                  color: #b6b6b6;
                  text-align: right;
                  width: 50px;
                }
                &:nth-of-type(2){
                  color: #484848;
                }
              }
            }
          }
        }
        .bottom{
          height: 30px;
          position: absolute;
          bottom: -10px;
          width: 173px;
          background-color: #fff;
          border-bottom-right-radius: 23px;
          // background: -moz-repeating-linear-gradient(top,rgba($color: #fff, $alpha: 1.0),#fff);
          i{
            line-height: 30px;
            display: inline-block;
            width: 100%;
            height: 100%;
            text-align: center;
            color: #999;
          }
        }
      }
    }
    .success{
      position: absolute;
      bottom: -10px;
      left: -12px;
    }
  }
</style>



