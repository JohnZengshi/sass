<template>
  <div class="serve-container-list-main">
    <div  class="serve-container-list-scroll">
      <div>
        <serveContainerDetail v-for="(item, index) in showData" :item="item" :isOperation="isOperation" @setBounding="setBounding" @remarkOut="remarkOut" @_seekProductListByService="_seekProductListByService" @openRemarkDialog="openRemarkDialog"></serveContainerDetail>
      </div>
    </div>
  </div>
</template>
<script>
import serveContainerDetail from './serve-container-detail'
export default{
  props: ['showData', 'isOperation'],
  components: {
    serveContainerDetail
  },
  mounted () {
    $(".serve-container-list-main").mCustomScrollbar({
      axis: 'x',
      theme: "minimal-dark",
      autoHideScrollbar: true,
      scrollInertia: 500,
      mouseWheel: {
        scrollAmount: 200,
        preventDefault: false,
        normalizeDelta: false
      },
      advanced: {
        updateOnSelectorChange: "div",
        updateOnContentResize: true
      },
      callbacks: {
        onScrollStart: function() {
          
        }
      }
    })
  },
  methods: {
    setBounding(parm) {
      console.log('parm', parm)
      this.$emit('setBounding', parm)
    },
    remarkOut () {
      this.$emit('remarkOut')
    },
    _seekProductListByService () {
      this.$emit('_seekProductListByService')
    },
    openRemarkDialog (item) {
      this.$emit('openRemarkDialog', item)
    }
  }
}
</script>
<style lang="scss">
  .serve-container-list-main{
    white-space: nowrap;
    flex: 1;
    .item-wrap{
      margin: 20px 10px 0 10px;
      width: 250px;
      height: 326px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
      display: inline-block;
      padding: 30px 18px;
      overflow: hidden;
      position: relative;
      .del-btn {
        width: 54px;
        height: 36px;
        position: absolute;
        right: 0px;
        top: 0px;
        background: url('~static/img/delete_nor.png') no-repeat center center;
        cursor: pointer;
      }
      .del-btn:hover {
        background: url('~static/img/delete_sel.png') no-repeat center center;
      }
      .remark-tit{
        width: 34px;
        height: 26px;
        line-height: 26px;
        position: absolute;
        right: 0px;
        top: 36px;
        border-radius: 20px 0 0 20px;
        background-color: #f6f6f6;
        cursor: pointer;
        text-align: center;
        transition: all .3s;
        >i{
          font-size: 16px;
          color: #999;
        }
        &:hover{
          width: 50px;
          i{
            color: #2993f8;
          }
        }
      }
      >.server-type-name{
        font-size: 18px;
        display: inline-block;
        background-color: rgb(255, 96, 126);
        border-radius: 5px;
        color: #fff;
        padding: 5px 5px;
      }
      >.jewelry-name{
        height: 29px;
        font-weight: bold;
        font-size: 22px;
        margin-top: 15px;
        color: #2993f8;
        width: 180px;
        overflow:hidden;
        text-overflow: ellipsis;
      }
      >.item-inner{
        font-size: 0;
        margin-top: 30px;
        p{
          font-size: 14px;
          line-height: 14px;
          display: inline-block;
          overflow:hidden;
          text-overflow: ellipsis;
        }
        >p:first-child{
          width: 70px;
          color: #999;
          margin-right: 20px;
          text-align: justify;
          text-align-last: justify;
        }
        >p:last-child{
          color: #333;
        }
      }
    }
  }
</style>
