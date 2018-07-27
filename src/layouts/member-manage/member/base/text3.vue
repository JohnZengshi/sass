
<!-- 积分模板管理 -->
<template>
  <div class="m-m-each-other-main">
    <div class="header">
      <p class="side-nav"><i class="iconfont icon-liebiao"></i>积分模板管理</p>
      <div class="right-btn">
        +积分模板
      </div>
    </div>
    <ul class="integral-body">
      <li>
        积分
        <i @click="del"></i>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dataList: [
          {
            name: ''
          }
        ]
      }
    },
    methods: {
      compile () {

      },
      del () {

      }
    }
  }
</script>
<style lang="scss">
.m-m-each-other-main{
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
  .header{
    padding: 0 15px;
    height: 40px;
    .right-btn{
      float: right;
      width: 80px;
      height: 28px;
      border-radius: 4px;
      color: #2993f8;
      border: 1px solid #2993f8;
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      margin-top: 15px;
      font-weight: bold;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        background: #2993f8;
        color: #fff;
      }
    }
  }
  .integral-body{
    width: 900px;
    margin: 10px 0 0 50px;
    li{
      position: relative;
      display: inline-block;
      height: 44px;
      line-height: 44px;
      margin-right: 40px;
      width: 190px;
      // padding: 0 15px;
      text-align: center;
      font-size: 13px;
      color: #333;
      background-color: #F6F8FA;
      margin: 15px 10px 0 0;
      transition: all 0.3;
      border-radius: 5px;
      i{
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 18px;
        width: 18px;
        opacity: 0;
        background: url(~assets/img/triangle-change-icon.png) no-repeat;
        background-size: 18px 18px;
        transition: all 0.3;
        cursor: pointer;
      }
      &:hover{
        color: #2993f8;
        background-color: #F0F7FF;
        i{
          opacity: 1;
        }
      }
    }
  }
}

</style>