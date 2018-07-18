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
        {{item.name}}
      </li>
    </ul>

    <ul class="top-btn">
      <li>+会员</li>
    </ul>

    <span @click="toMember">会员列表></span>

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
            id: ''
          },
          {
            name: '银卡',
            id: ''
          },
          {
            name: '金卡',
            id: ''
          }
        ]
      }
    },
    methods: {
      toMember () {

      }
    }
  }
</script>
<style lang="scss" scoped>
.m-m-home-page-member-main{
  .decoration{
    border: 1px solid red;
    padding: 8px 5px;
  }
  .center-btn-list{
    border: 1px solid red;
    
  }
}
</style>