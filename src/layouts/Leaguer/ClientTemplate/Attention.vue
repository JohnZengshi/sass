<template>
  <el-dialog v-model="addLeaguer" top="18%" :show-close="false" customClass="attentionDig" @close="addLeaguer = false">
    <img src="~assets/img/faceRecognition/Explain.png" alt="">
    <div class="close-btn" @click="close"></div>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        addLeaguer: false
      }
    },
    methods: {
      open () {
        this.addLeaguer = true
      },
      close () {
        this.addLeaguer = false
      }
    }
  }
</script>
<style lang="scss">
/*.attentionDig{
  // width: 700px;
}*/
.attentionDig{
  width: 740px;
  height: 500px;
  box-shadow: none;
  background-color: transparent;
  >.el-dialog__header{
    dispaly: none;
  }
  img{
    position: absolute;
    top: 0;
  }
  .close-btn{
    position: absolute;
    top: 18px;
    right: 40px;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
}
</style>
