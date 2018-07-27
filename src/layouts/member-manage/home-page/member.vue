<!-- 会员小方块 -->
<template>
  <div class="m-m-home-page-member-main">

    <div class="decoration">
      会员
    </div>

    <ul class="center-num-list">
      <!-- <li v-for="item in centerBtnList">
        <p>{{item.value}}</p>
        <p>{{item.name}}</p>
      </li> -->
      <li>
        <p>{{memberList.memberCount}}</p>
        <p>会员总数</p>
      </li>
      <li>
        <p>{{memberList.newMember}}</p>
        <p>今日新增</p>
      </li>
      <li>
        <p>{{memberList.conversion}}</p>
        <p>今日转换</p>
      </li>
      
    </ul>

    <ul class="center-btn-list">
      <li v-for="item in memberList.gradeList">
        <span>{{item.gradeName}}</span>
        <span>{{item.countGrade}}</span>
        <span>位</span>
      </li>
    </ul>
 <!--    <ul class="grade-list">
      <li v-for="item in gradeList">
        {{item.name}}  {{item.value}}
      </li>
    </ul> -->

    <ul class="top-btn xj-btn-list">
      <li class="btn" @click="openAdd">+会员</li>

      <router-link tag="li" :to="{path: '/memberManage/memberList', query: {shopId: filterOption.shopId}}" class="btn">会员列表</router-link>

      <router-link tag="li" class="btn" :to="{path: '/memberManage/compileTemplate', query: {shopId: filterOption.shopId}}">会员设置</router-link>
    </ul>

    <add-member ref="addMemberBox" :shopId="filterOption.shopId"></add-member>
  </div>
</template>
<script>
  import addMember from './../base/add-member.vue'

  export default {
    components: {
      addMember
    },
    props: ['filterOption', 'memberList'],
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
        // gradeList: [
        //   {
        //     name: '普卡',
        //     value: '666',
        //     id: ''
        //   },
        //   {
        //     name: '银卡',
        //     value: '666',
        //     id: ''
        //   },
        //   {
        //     name: '金卡',
        //     value: '666',
        //     id: ''
        //   }
        // ]
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
  overflow: hidden;
  .decoration{
    position: absolute;
    top: 30px;
    left: 48px;
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
    margin: 30px 0 0 58px;
    vertical-align: top;
    li{
      display: inline-block;
      font-size: 22px;
      margin-right: 50px;
      width: 213px;
      height: 86px;
      line-height: 80px;
      text-align: center;
      background: url('~assets/img/member/member-box-four.png') no-repeat;
      background-size: 213px 86px;
      margin-bottom: 30px;
      span{
        color: #fff;
        font-size: 12px;
        font-weight: bold;
      }
      span:nth-child(1){
        font-size: 22px;
      }
      span:nth-child(2){
        font-size: 36px;
      }
      span:nth-child(3){
        font-size: 16px;
      }
    }
    li:nth-child(1){
      background: url('~assets/img/member/member-box-one.png') no-repeat;
      background-size: 213px 86px;
    }
    li:nth-child(2){
      background: url('~assets/img/member/member-box-two.png') no-repeat;
      background-size: 213px 86px;
    }
    li:nth-child(3){
      background: url('~assets/img/member/member-box-three.png') no-repeat;
      background-size: 213px 86px;
    }
  }
  // .center-btn-list{
  //   display: inline-block;
  //   font-size: 0;
  //   width: 900px;
  //   height: 200px;
  //   padding-top: 80px;
  //   vertical-align: top;
  //   text-align: center;
  //   border: 1px solid red;
  //   li{
  //     vertical-align: center;
  //     display: inline-block;
  //     border: 1px solid red;
  //     padding: 15px;
  //     font-size: 22px;
  //     margin: 0 20px;
  //   }
  // }
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
  }
}
</style>