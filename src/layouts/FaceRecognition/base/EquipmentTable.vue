<template>
  <div class="equipment-table-main">
    <div class="equipment-table-wrap">
      <ul>
        <li v-for="(item, index) in showData.dataList">

          <i class="type-sign">{{item.gateway}}</i>
          
          <div class="img-wrap">
            <img src="~assets/img/faceRecognition/surveillance-camera.png" alt="">
          </div>

          <ul class="message-list">
            <li><span>设备名称</span><span>:</span><span>{{item.nodename}}</span></li>
            <li><span>编码</span><span>:</span><span>{{item.equipmentno}}</span></li>
            <li><span>店铺</span><span>:</span><span>{{item.areaname}}</span></li>
            <li><span>状态</span><span>:</span><span class="state-tit">{{filterState(item.state)}}</span></li>
          </ul>

        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  props: ['showData'],
  data () {
    return {
      saveSuccess: true
    }
  },
  mounted () {
    $(".equipment-table-main").mCustomScrollbar({
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
          console.log('执行啦-------------------==============================')
        }
      }
    })
  },
  methods: {
    seekDetail (parm) {
      this.$emit('seekDetail', parm)
      console.log('查看详情啦', parm)
    },
    filterState (parm) {
      switch (Number(parm)) {
        case 0:
          return '离线'
        case 1:
          return '正常'
      }
    }
  } 
}
</script>
<style lang="scss" scoped>
.equipment-table-main{
  height: 680px;
}
.equipment-table-wrap{
  >ul{
    padding: 0 20px;
    font-size: 0;
    >li{
      position: relative;
      display: inline-block;
      vertical-align: top;
      width: 470px;
      height: 220px;
      background-color: #f5f8f7;
      margin: 0 50px 20px 0;
      border-radius: 5px;
      &:hover{
        transition: all .5s;
        box-shadow: 0 0 15px #dedede;
      }
      .type-sign{
        display: block;
        height: 28px;
        width: 96px;
        font-size: 16px;
        line-height: 28px;
        text-align: center;
        color: #fff;
        font-style: normal;
        font-weight: block;
        background: url(~assets/img/faceRecognition/bg.png) no-repeat;
      }
      .img-wrap{
        position: relative;
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 8px;
        overflow: hidden;
        margin: 30px 30px 0 30px;
        img{
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
      >.message-list{
        display: inline-block;
        width: 260px;
        vertical-align: top;
        // margin-top: 12px;
        margin-top: 25px;
        li{
          font-size: 0;
          margin-bottom: 10px;
          span{
            display: inline-block;
            font-size: 16px;
          }
          span:nth-child(1){
            width: 80px;
            text-align: justify;
            text-align-last: justify;
            color: #666;
          }
          span:nth-child(2){
            color: #666;
          }
          span:nth-child(3){
            color: #999;
            margin-left: 10px;
          }
          .state-tit{
            color: #10990f!important;
          }
        }
      }
    }
  }
}
</style>