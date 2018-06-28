<template>
  <div class="bottomBox">
    <div class="readMoreData"  :class="{'active':MoreData}" @click="readMoreData">查看更多未读数据</div>
    <div class="noMoreData" :class="{'active':noMoreData}">
      <span>数据展示到底了啦~</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        MoreData: false,
        noMoreData: false
      }
    },
    methods: {
      // 底部查看更多未读数据
      isShowMoreDataTip(scrollHeight, clientHeight, scrollTop) {
        let totalNum = this.allSynopsiData.totalNum;
        let length = this.dgDataList.length;
        if (totalNum > length) {
          if (clientHeight + scrollTop >= scrollHeight) {
            this.MoreData = true;
          } else {
            this.MoreData = false;
          }
        } else {
          this.MoreData = false;
          if (clientHeight + scrollTop >= scrollHeight) {
            this.noMoreData = true;
          } else {
            this.noMoreData = false;
          }
        }
      },
      readMoreData() {
        this.$emit("readMoreData")
        this.MoreData = false;
        console.log(123)
      },
    },
    props: ["allSynopsiData", "dgDataList"]
  }

</script>
<style lang="less" scoped>
  .bottomBox {
    position: absolute;
    width: 100%;
    left: 0;
    .readMoreData {
      width: 100%;
      position: absolute;
      background: #fff1d9;
      text-align: center;
      font-size: 14px;
      color: #e99a1d;
      line-height: 22px;
      opacity: 0;
      transition: all .8s;
      cursor: pointer;
      &.active{
        opacity: 1;
      }
    }

    .noMoreData {
      width: 100%;
      position: absolute;
      background: #fff;
      text-align: center;
      font-size: 14px;
      height: 50px;
      line-height: 50px;
      display: none;
      transition: all 0s;
      &.active {
        display: block;
      }
      >span {
        color: #999;
        &::before {
          width: 200px;
          height: 1px;
          content: "";
          display: inline-block;
          background-color: #999;
          vertical-align: middle;
          margin-right: 50px;
        }
        &::after {
          width: 200px;
          height: 1px;
          content: "";
          display: inline-block;
          background-color: #999;
          vertical-align: middle;
          margin-left: 50px;
        }
      }
    }

  }

</style>
