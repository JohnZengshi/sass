<!-- 积分小方块 -->
<template>
  <div class="m-m-home-page-index-main">

    <div class="decoration">
      积分
    </div>

    <ul class="center-num-list">
      <li>
        <p>{{interflowData.allNumber}}</p>
        <p>积分总数</p>
      </li>
      <li>
        <p>{{interflowData.consume}}</p>
        <p>今日消耗</p>
      </li>
      <li>
        <p>{{interflowData.issue}}</p>
        <p>今日发放</p>
      </li>
      <li>
        <p>{{interflowData.delNum}}</p>
        <p>即将清零</p>
      </li>
    </ul>

  </div>
</template>
<script>
  export default {
    props: ['filterOption', 'interflowData'],
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
<style lang="scss" src="./homePage.scss"></style>