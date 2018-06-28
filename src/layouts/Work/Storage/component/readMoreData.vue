<template>
  <div class="bottomBox">
    <div class="readMoreData" v-show="MoreData" @click="readMoreData">查看更多未读数据</div>
    <div class="noMoreData" v-show="noMoreData">数据展示到底了啦~</div>
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
      position: relative;
      background: #fff1d9;
      text-align: center;
      font-size: 14px;
      color: #e99a1d;
      line-height: 22px;
      opacity: 1;
      transition: all .5s;
    }

    .noMoreData {
      width: 100%;
      position: relative;
      background: #fff;
      text-align: center;
      font-size: 14px;
      height: 50px;
      line-height: 50px;
      opacity: 1;
      transition: all .5s;
    }

  }

</style>
