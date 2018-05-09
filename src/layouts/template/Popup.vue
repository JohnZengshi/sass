<template>
  <transition name="fade">
    <div class="popupMask" v-if="isShow">
      <div class="popup" >
        <div class="popHead">

        </div>
        <div class="popContent">
              {{content}}
        </div>
        <div class="popFoot">
          <span>
            <button class="btn close" @click="isClose">取消</button>
            <button class="btn sure" @click="isSure">确定</button>
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: [
        'isShow',
        'content'
    ],
    data () {
        return {
            isCloseFlag: false,
            isDel: false
        }
    },
    methods: {
      isClose () {
          this.isCloseFlag = this.isShow;
          this.isCloseFlag = false;
          this.isDel = false;
          eventBus.$emit('isClose', this.isCloseFlag);
      },
      isSure () {
        this.isCloseFlag = this.isShow;
        this.isCloseFlag = false;
        this.isDel = true;
        eventBus.$emit('isClose', this.isCloseFlag, this.isDel);
      }
    },
    created () {
        //console.log(this.content)
    }
  }
</script>
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .popupMask{
    width:100%; height:100%; left:0; top:0; background:rgba(0,0,0,0.2); position:fixed; z-index:200;
    .popup{width:450px; height:250px; background:#fff; box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
      position: absolute; left:50%; top:30%; margin-left:-225px;
    }
    .popHead{
      height:80px; width:100%;
    }
    .popContent{
      height:100px; width:100%; padding:0 20px; text-align:center;
      font-size: 16px;
    }
    .popFoot{
        position:absolute; bottom:0; height:70px; width:100%;
        span{
          display:block;  margin:0 auto; width:325px;
            .btn{
              width:120px; height:40px; border-radius: 4px; font-weight:bold; margin: 0 20px;
              cursor: pointer;
            }
            .close{background:#fff; color:#999; border:1px #d6d6d6 solid;}
            .sure{background:#4fdcca; color:#fff;}
        }
    }

  }
</style>
