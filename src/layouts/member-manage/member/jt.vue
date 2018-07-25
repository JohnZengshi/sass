<!-- 编辑模板 -->
<template>
<transition name="tp-ani">
  <div class="m-m-compile-template-main xj-right-box">
    <div class="Rp_title_container">
      <!--面包屑-->
      <div class="Rp_crumbs">
        <i class="iconfont icon-baobiao1"></i>
        <router-link tag="span" to="/memberManage" class="path_crumbs">截图</router-link>
      </div>
    </div>

    <div class="m-m-compile-template-body xj-right-box xj-box-shadow">
      <div class="btn" @click="openCanvas">
        开始截图
      </div>
      <div class="btn" @click="isStart = false">
        关闭截图
      </div>
      <template v-if="isStart" v-for="item in 3000">
        <jtUrl @getCanvasImg="getCanvasImg"></jtUrl>
      </template>
        <img id="tu-text"></img>
    </div>
  </div>
</transition>
</template>
<script>
import jtUrl from './jt-url';
export default {
  components: {
    jtUrl
  },
  data () {
    return {
      isStart: false, 
      canvasList: []
    }
  },
  methods: {
    openCanvas () {
      this.canvasList = []
      this.isStart = true
    },
    getCanvasImg (parm) {
      console.log('得到canvas图片', parm)
      this.canvasList.push(parm)
      console.log('所有的图片', this.canvasList)
    },
  }
}
</script>
<style lang="scss" scoped>
.m-m-compile-template-main{
  margin-top: 40px;
  .m-m-compile-template-body{
    background-color: #fff;
    padding-bottom: 15px;
    border-radius: 10px;
    height: 680px;
    overflow: scroll;
    .btn{
      margin: 20px;
      border: 1px solid red;
      padding: 20px;

    }
  }
}
</style>