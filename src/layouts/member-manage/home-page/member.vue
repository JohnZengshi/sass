<!-- 会员小方块 -->
<template>
  <div class="m-m-home-page-member-main">

    <div class="decoration">
      会员
    </div>

    <ul class="center-num-list">
      <li v-for="item in centerBtnList">
        <p>{{item.value}}</p>
        <p>{{item.name}}</p>
      </li>
    </ul>

 <!--    <ul class="grade-list">
      <li v-for="item in gradeList">
        {{item.name}}  {{item.value}}
      </li>
    </ul> -->

    <ul class="top-btn">
      <li @click="openAdd">+会员</li>
    </ul>

    <router-link class="member-list-btn" :to="{path: '/memberManage/memberList', query: {shopId: filterOption.shopId}}">会员列表></router-link>

    <add-member ref="addMemberBox" :shopId="filterOption.shopId"></add-member>
  </div>
</template>
<script>
  import addMember from './../base/add-member.vue'
  export default {
    components: {
      addMember
    },
    props: ['filterOption'],
    data () {
      return {
        centerBtnList: [
          {
            name: '会员总数',
            value: '1000',
            id: ''
          },
          {
            name: '今日新增',
            value: '1000',
            id: ''
          },
          {
            name: '今日转化',
            value: '1000',
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
      openAdd () {
        this.$refs.addMemberBox.open()
      }
    }
  }
</script>
<style lang="scss" scoped>
.m-m-home-page-member-main{
  position: relative;
  background-color: #F6FBFF;
  font-size: 0;
  .decoration{
    position: absolute;
    top: 30px;
    left: 20px;
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
    display: inline-block;
    font-size: 0;
    // width: 900px;
    // height: 200px;
    margin: 50px 0 0 80px;
    vertical-align: top;
    // text-align: center;
    li{
      vertical-align: center;
      display: inline-block;
      // padding: 15px;
      font-size: 22px;
      margin-right: 50px;
      p{
        text-align: center;
      }
      p:nth-child(1){
        color: #333;
        font-size: 22px;
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
  .top-btn{
    position: absolute;
    top: 10px;
    right: 10px;
    li{
      padding: 10px 20px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      background-color: red;
    }
  }
}
</style>