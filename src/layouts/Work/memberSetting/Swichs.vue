<template>
  <div class="xj-switch-main"
    :class="{
      'left-bg-move': getState(switchs),
      'right-bg-move': getState(!switchs)
    }"
    @click="switchMove">
    
    <i
    class="move-icon"
    :class="{
      'move-right': getState(switchs),
      'move-left': getState(!switchs)
    }"
    ></i>
  </div>
</template>
<script>
  export default {
    props: ['type','status'],
    data () {
      return {
        switchs: false,
      }
    },
    created () {
    },
    watch:{
      'status'(val){
        console.log(val)
        switch (this.type) {
          case 'addOrSubConfig':
            if(this.status == 'N') {
              this.switchs = true
            } else{
              this.switchs = false
            }
            break;
          case 'productTypeConfig':
            if(this.status == 'N') {
              this.switchs = true
            } else{
              this.switchs = false
            }
            break;
          case 'othenConfig':
            if(this.status == 'N') {
              this.switchs = true
            } else{
              this.switchs = false
            }
            break;
          case 'consumeConfig':
            if(this.status == 'N') {
              this.switchs = true
            } else{
              this.switchs = false
            }
            break;
        
          default:
            break;
        }
      }
    },
    methods: {
      getState (parm) {
        return parm
      },
      switchMove () {
        this.switchs = !this.switchs
        this.$emit("switchChange",this.type,this.switchs)
      }
    },
    mounted() {
      console.log('修改器',this.status)
      
      
    }
  }
</script>
<style lang="scss" scoped>
// @import '~assets/sass/variable.scss';
// @import '~assets/sass/mixin.scss';
.xj-switch-main{
  position: relative;
  display: inline-block;
  vertical-align: top;
  // margin-top: 10px;
  // margin-right: 10px;
  border-radius: 16px;
  height: 20px;
  width: 40px;
  // @include box-sizing;
  span{
    color: #fff;
    font-size: 15px;
    // @include F(15);
    font-weight: 600;
  }
  span:first-child{
    position: absolute;
    left: 8px;
    top: 7px;
  }
  span:last-child{
    position: absolute;
    right: 8px;
    top: 7px;
  }
  .move-icon{
    position: absolute;
    display: inline-block;
    left: 0;
    top: 1px;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
  }
  @mixin keyframes ($state:33.33%, $end:0) {
    0% {left: $state;}
    100% {left: $end;}
  }
  @keyframes centerLeftMove {
    @include keyframes(1px, 20px)
  }
  @keyframes centerRightMove {
    @include keyframes(20px, 1px)
  }
  .move-left{
    animation: centerLeftMove 0.3s;
    -moz-animation: centerLeftMove 0.3s;
    -webkit-animation: centerLeftMove 0.3s;
    -o-animation: centerLeftMove 0.3s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
  .move-right{
    animation: centerRightMove 0.3s;
    -moz-animation: centerRightMove 0.3s;
    -webkit-animation: centerRightMove 0.3s;
    -o-animation: centerRightMove 0.3s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
  }
}
  // 动画
  @mixin keyframesBg ($stateBg:#fff, $endBg:#fff) {
    0% {background-color: $stateBg;}
    100% {background-color: $endBg;}
  }
  @keyframes leftBgMove {
    @include keyframesBg(#d6d6d6, #6a9efe)
  }
  @keyframes rightBgMove {
    @include keyframesBg(#6a9efe, #d6d6d6)
  }
  .left-bg-move{
    animation: leftBgMove 0.3s;
    -moz-animation: leftBgMove 0.3s;
    -webkit-animation: leftBgMove 0.3s;
    -o-animation: leftBgMove 0.3s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
    border: 1px solid #496cad;
  }
  .right-bg-move{
    animation: rightBgMove 0.3s;
    -moz-animation: rightBgMove 0.3s;
    -webkit-animation: rightBgMove 0.3s;
    -o-animation: rightBgMove 0.3s;
    animation-fill-mode: forwards;
    -webkit-animation-fill-mode: forwards;
    border: 1px solid #d6d6d6!important;
  }
</style>
