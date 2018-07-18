<!-- 会员小方块 -->
<template>
  <div class="m-m-home-page-member-main">

    <div class="decoration">
      <i class="iconfont icon-fuwu"></i>
      会员
    </div>

    <ul class="center-btn-list">
      <li v-for="item in centerBtnList">
        {{item.name}}
      </li>
    </ul>

    <ul class="grade-list">
      <li v-for="item in gradeList">
        {{item.name}}  {{item.value}}
      </li>
    </ul>

    <ul class="top-btn">
      <li>+会员</li>
    </ul>

    <router-link class="member-list-btn" to="/memberManage/memberList">会员列表></router-link>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        centerBtnList: [
          {
            name: '会员总数',
            id: ''
          },
          {
            name: '今日新增',
            id: ''
          },
          {
            name: '今日转化',
            id: ''
          },
        ],
        gradeList: [
          {
            name: '普卡',
            value: '666',
            id: ''
          },
          {
            name: '银卡',
            value: '666',
            id: ''
          },
          {
            name: '金卡',
            value: '666',
            id: ''
          }
        ]
      }
    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
.m-m-home-page-member-main{
  position: relative;
  background-color: #d6d6d6;
  height: 200px;
  font-size: 0;
  .decoration{
    position: absolute;
    top: 0;
    left: 0;
    font-size: 14px;
    border: 1px solid red;
    padding: 8px 5px;
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
  .center-btn-list{
    display: inline-block;
    font-size: 0;
    width: 900px;
    height: 200px;
    padding-top: 80px;
    vertical-align: top;
    text-align: center;
    border: 1px solid red;
    li{
      vertical-align: center;
      display: inline-block;
      border: 1px solid red;
      padding: 15px;
      font-size: 22px;
      margin: 0 20px;
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
}
</style>