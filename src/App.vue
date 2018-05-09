<template>
  <div id="app">
    <router-view></router-view>
    <ErrorCode v-if="errorCode"></ErrorCode>
    <loginPopup ref="loginPopup">
      <!--强制退出框-->
    </loginPopup>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import ErrorCode from './components/confirm/ErrorCode.vue'
  import loginPopup from './components/template/loginPopup'

  export default {
    components: {
      ErrorCode,
      loginPopup
    },
    created() {
      Notification.requestPermission() // 请求获取Notification权限
    },
    computed: {
      ...mapGetters([
        'errorCode'
      ])
    },
    mounted(){
      Object.assign( Vue.prototype, { loginPopup : this.$refs.loginPopup})
    }
  }
</script>
<style lang="scss">
  @import "./assets/css/common.scss";
</style>
<style scoped lang="scss">
  #app {
    height: 100%;
  }
</style>