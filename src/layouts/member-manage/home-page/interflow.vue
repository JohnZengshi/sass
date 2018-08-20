<!-- 积分小方块 -->
<template>
  <div class="m-m-home-page-member-main">

    <div class="decoration">
      积分
    </div>

    <ul class="center-num-list">
      <li>
        <p>{{memberList.memberCount}}</p>
        <p>积分总数</p>
      </li>
      <li>
        <p>{{memberList.newNum}}</p>
        <p>今日消耗</p>
      </li>
      <li>
        <p>{{memberList.conversion}}</p>
        <p>今日发放</p>
      </li>
      <li>
        <p>{{memberList.conversion}}</p>
        <p>即将清零</p>
      </li>
    </ul>

  </div>
</template>
<script>
  export default {
    props: ['filterOption', 'memberList'],
    data () {
      return {
      }
    },
    methods: {
      openAdd () {
        this.$refs.addMemberBox.open()
      }
    }
  }
</script>
<style lang="scss" scoped>
.m-m-home-page-member-main{
  position: relative;
  background-color: #fff;
  font-size: 0;
  overflow: hidden;
  margin: 0 30px;
  border-bottom: 1px solid #d6d6d6;
  .decoration{
    position: absolute;
    top: 30px;
    left: 0;
    font-size: 12px;
    line-height: 25px;
    color: #333;
    font-weight: bold;
    padding-left: 8px;
    &:before {
      content: "";
      display: inline-block;
      width: 3px;
      height: 16px;
      background: #2993f8;
      position: absolute;
      top: 3px;
      border-radius: 3px;
      left: 0;
    }
  }
  .member-list-btn{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    height: 26px;
    line-height: 26px;
    font-size: 26px;
    cursor: pointer;
    margin: auto 0;
    &:hover{
      color: #2993f8;
    }
  }
  .center-num-list{
    font-size: 0;
    // width: 900px;
    // height: 200px;
    margin: 90px 0 0 110px;
    vertical-align: top;
    margin-bottom: 30px;
    // text-align: center;
    li{
      vertical-align: center;
      display: inline-block;
      // padding: 15px;
      width: 206px;
      font-size: 22px;
      // margin-right: 150px;
      p{
        text-align: center;
      }
      p:nth-child(1){
        color: #333;
        font-size: 30px;
        margin-bottom: 5px;
        font-weight: bold;
      }
      p:nth-child(2){
        color: #666;
        font-size: 14px;
      }
    }
    li:nth-child(1){
      p:nth-child(1){
        color: #2993f8;
      }
    }
  }
  .center-btn-list{
    font-size: 0;
    margin-bottom: 30px;
    vertical-align: top;
    li{
      display: inline-block;
      font-size: 22px;
      margin-right: 40px;
      min-width: 115px;
      height: 94px;
      text-align: center;
      border: 1px solid #d6d6d6;
      border-radius: 5px;
      // background: url('~assets/img/member/member-box-four.png') no-repeat;
      background-size: 213px 86px;
      margin-bottom: 30px;
      p{
        color: #333;
        text-align: left;
        font-size: 14px;
        margin: 10px 0 20px 10px;
      }
      span{
        color: #333;
        font-weight: bold;
      }
      span:nth-child(2){
        font-size: 20px;
      }
      span:nth-child(3){
        font-size: 14px;
        color: #999;
      }
    }
  }
  .grade-list{
    display: inline-block;
    font-size: 0;
    margin: 20px 0 0 30px;
    border: 1px solid red;
    li{
      border: 1px solid red;
      padding: 10px 15px;
      font-size: 22px;
    }
  }
  .top-btn{
    position: absolute;
    top: 30px;
    right: 30px;
  }
}
</style>