<!-- 会员小方块 -->
<template>
  <div class="m-m-home-page-index-main">

    <div class="decoration">
      会员
    </div>

    <ul class="center-num-list">
      <li>
        <p>{{memberList.memberCount}}</p>
        <p>会员总数</p>
      </li>
      <li>
        <p>{{memberList.newNum}}</p>
        <p>今日新增</p>
      </li>
      <li>
        <p>{{memberList.conversion}}</p>
        <p>今日转换</p>
      </li>
      
    </ul>

    <ul class="center-btn-list">
      <li v-for="item in memberList.gradeList">
        <p>{{item.gradeName}}</p>
        <span>{{item.countGrade}}</span>
        <span>位</span>
      </li>
    </ul>

    <ul class="top-btn xj-btn-list">
      <li class="btn" @click="openAdd">+会员</li>

      <router-link tag="li" :to="{path: '/memberManage/memberList', query: {shopId: filterOption.shopId}}" class="btn">会员列表</router-link>

<!--       <router-link tag="li" class="btn" :to="{path: '/memberManage/compileTemplate', query: {shopId: filterOption.shopId}}">会员设置</router-link> -->
    </ul>

    <add-member ref="addMemberBox" @update="update" :shopId="filterOption.shopId"></add-member>
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
      }
    },
    methods: {
      openAdd () {
        this.$refs.addMemberBox.open()
      },
      update () {
        this.$emit('update')
      }
    }
  }
</script>
<style lang="scss" src="./homePage.scss"></style>