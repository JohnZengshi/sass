<template>
  <div class="login-Popup" v-if="isShowPopup" ref="loginPopup">
    <div class="audit-popup">
      <div class="audit-tittle">退出提示</div>
      <div class="text">
        有其他PC端设备登录您的云珠宝，本设备被强制退出，如果不是您本人操作，请立刻登录您的云珠宝App进行重新扫码登录或修改密码操作
      </div>
      <div class="audit-btn" @click="hide">确定</div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowPopup: false,
      }
    },

    methods: {
      hide() {
        this.$router.push({
          path: '/member/login'
        })
        localStorage.clear()
        sessionStorage.clear()
        this.isShowPopup = false
      },
      show() {
        this.isShowPopup = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-Popup {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    .audit-popup {
      position: fixed;
      z-index: 3;
      width: 320px;
      background: #fff;
      border-radius: 10px;
      top: 50%;
      left: 50%;
      margin-top: -200px;
      margin-left: -160px;
      z-index: 200;
      box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.05);
      .audit-tittle {
        width: 130px;
        height: 60px;
        margin: 0 auto;
        text-align: center;
        box-sizing: border-box;
        padding-top: 24px;
      }
      .text {
        margin: 0 auto;
        width: 260px;
        line-height: 27px;
        font-size: 14px;
        color: #666;
      }
      .audit-btn {
        width: 150px;
        height: 28px;
        background: #2993f8;
        text-align: center;
        line-height: 28px;
        color: #fff;
        font-weight: bold;
        border-radius: 4px;
        margin: 30px auto;
        cursor: pointer;
      }
    }
  }
  
</style>