<!-- 首页 -->
<template>
  <div class="m-m-home-page-main xj-right-box xj-box-shadow">
    <header-nav @filterData="filterData"></header-nav>
    <div class="body-scorll-wrap">
      <!-- 会员 -->
      <member :filterOption="filterOption" @update="_seekMemberHomeById" :memberList="memberList"></member>
      <!-- 积分 -->
      <interflow :filterOption="filterOption" :memberList="memberList"></interflow>
      <!-- 跟进 -->
      <follow-up :filterOption="filterOption" :memberList="memberList"></follow-up>
      <!-- 推送 -->
      <push :filterOption="filterOption"></push>
    </div>
  </div>
</template>
<script>
  import headerNav from './home-page/header'
  import member from './home-page/member'
  import interflow from './home-page/interflow'
  import followUp from './home-page/follow-up'
  import push from './home-page/push.vue'
  import {seekMemberHomeById} from 'Api/commonality/seek'
  import {formattingTime, xjEndTime} from 'assets/js/getTime'
  export default {
    components: {
      headerNav,
      member,
      followUp,
      interflow,
      push,
      interflow
    },
    data () {
      return {
        memberList: {
          gradeList: []
        },
        filterOption: {
          shopId: '',
          type: 1
        }
      }
    },
    methods: {
      filterData (parm) {
        Object.assign(this.filterOption, parm)
        this._seekMemberHomeById()
      },
      _seekMemberHomeById () {
        seekMemberHomeById(this.filterOption)
          .then(res => {
            if (res.data.state == 200) {
              this.memberList = res.data.data
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
.m-m-home-page-main{
  margin-top: 40px;
  background-color: #fff;
  padding-bottom: 15px;
  border-radius: 10px;
  >.body-scorll-wrap{
    // height: 735px;
    background-color: #fff;
  }
}
</style>