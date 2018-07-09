<template>
  <div class="bottomBox">
    <!-- <div class="readMoreData"  :class="{'active':MoreData}" @click="readMoreData">查看更多未读数据</div> -->
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
        noMoreData: false,
      }
    },
    methods: {
      // 底部查看更多未读数据
      isShowMoreDataTip(scrollHeight, clientHeight, scrollTop) {
        let totalNum = this.allData.totalNum;
        let length = this.dgDataList.length;
        // 还有更多数据未加载
        if (totalNum > length) {
          if (clientHeight + scrollTop >= scrollHeight) {
            this.MoreData = true;
            return true
          } else {
            this.MoreData = false;
            return false
          }
        } 
        // 没有更多数据加载
        else{
          // 表格有数据
          if(length > 0){
            this.MoreData = false;
            if (clientHeight + scrollTop >= scrollHeight) {
              this.noMoreData = true;
            } else {
              this.noMoreData = false;
            }
          }
          // 表格没数据
          else{
            this.MoreData = false;
            this.noMoreData = false
          }
        }
      },
      readMoreData() {
        if(this.MoreData){
          this.$emit("readMoreData")
        }
        this.MoreData = false;
      },
    },
    props: ["allData", "dgDataList"],
    watch: {
      "allData": {
        handler: function (newValue, oldValue) {
          // console.log(this.dgDataList)
          // 数据变化，表格有数据
          if (this.dgDataList && this.dgDataList.length > 0) {
            // 还有数据未加载
            if (this.dgDataList.length < Number(newValue.totalNum)) {
              // this.MoreData = true; 
              this.noMoreData = false
            }
            // 已加载了全部数据
             else {
              this.MoreData = false;
              this.noMoreData = false;
            }
          } 
          // 数据变化，表格没数据
          else {
            this.MoreData = false;
            this.noMoreData = false
          }
        },
        deep: true,

      }
    }
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
      height: 0px;
      transition: opacity .8s;
      cursor: pointer;
      &.active{
        height: 22px;
        opacity: 1;
      }
    }

    .noMoreData {
      width: 100%;
      position: absolute;
      background: #fff;
      text-align: center;
      font-size: 12px;
      // height: 50px;
      // line-height: 50px;
      display: none;
      transition: all 0s;
      margin: 10px 0;
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
