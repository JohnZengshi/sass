<template>
  <div class="bottomBox">
    <!-- <div class="readMoreData"  :class="{'active':MoreData}" @click="readMoreData">查看更多未读数据</div> -->
    <div class="readerDataLoading" v-loading="MoreData"></div>
    <div class="noMoreData" :class="{'active':noMoreData}">
      <span>数据展示到底了啦~</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["allLength", "currentLength"],
    data() {
      return {
        MoreData: false,
        noMoreData: false,
      }
    },
    methods: {
      init () {
        this.MoreData = false
        this.noMoreData = false
      },
      // 开始请求
      openLoading () {
        this.MoreData = true
      },
      // 结束请求
      endLoading () {
        this.MoreData = false
      },
      // 完成加载
      complete () {
        this.noMoreData = true
      }
    },
  }

</script>
<style lang="less" scoped>
  .bottomBox {
    position: relative;
    width: 100%;
    height: 30px;
    .readMoreData {
      width: 100%;
      position: absolute;
      background: #fff1d9;
      text-align: center;
      font-size: 14px;
      color: #e99a1d;
      line-height: 22px;
      opacity: 0;
      height: 0px;
      transition: opacity .8s;
      cursor: pointer;
      &.active{
        height: 22px;
        opacity: 1;
      }
    }

    .readerDataLoading{
      width: 100%;
      height: 36px;
      position: absolute;
    }

    .noMoreData {
      width: 100%;
      position: absolute;
      background: #fff;
      text-align: center;
      font-size: 12px;
      // height: 50px;
      // line-height: 50px;
      // display: none;
      transition: all 0s;
      margin: 10px 0;
      opacity: 0;
      &.active {
        // display: block;
        opacity: 1;
      }
      >span {
        color: #999;
        &::before {
          width: 200px;
          height: 1px;
          content: "";
          display: inline-block;
          background-color: #d6d6d6;
          vertical-align: middle;
          margin-right: 40px;
        }
        &::after {
          width: 200px;
          height: 1px;
          content: "";
          display: inline-block;
          background-color: #d6d6d6;
          vertical-align: middle;
          margin-left: 40px;
        }
      }
    }

  }

</style>
