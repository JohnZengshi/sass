<!-- 首页 -->
<template>
  <div class="m-m-home-page-main xj-right-box xj-box-shadow">
    <header-nav @filterData="filterData"></header-nav>
    <div class="body-scorll-wrap">
      <member :filterOption="filterOption" :memberList="memberList"></member>
      <push></push>
    </div>
  </div>
</template>
<script>
  import headerNav from './home-page/header'
  import member from './home-page/member'
  import push from './home-page/push.vue'
  import {seekMemberHomeById} from 'Api/commonality/seek'
  import {formattingTime, xjEndTime} from 'assets/js/getTime'
  export default {
    components: {
      headerNav,
      member,
      push
    },
    data () {
      return {
        xxx:"123",
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
        let datas = {
          memberCount: '10000',
          newMember: '5000',
          conversion: '50%',
          gradeList: [
            {
              countGrade: '200',
              gradeName: '金卡'
            },
            {
              countGrade: '200',
              gradeName: '银卡'
            },
            {
              countGrade: '200',
              gradeName: '普卡'
            },
            {
              countGrade: '200',
              gradeName: '女神卡'
            },
            {
              countGrade: '200',
              gradeName: '金卡'
            },
            {
              countGrade: '200',
              gradeName: '银卡'
            },
            {
              countGrade: '200',
              gradeName: '普卡'
            },
            {
              countGrade: '200',
              gradeName: '女神卡'
            }
          ]
        }
        this.memberList = datas
        seekMemberHomeById(this.filterOption)
          .then(res => {

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