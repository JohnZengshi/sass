<template>
  <ul class="xj-cut-segmentation-main">
    <li v-for="item in showList" @click="pitchOn(item)" :class="{actions: current == item.id}">{{item.name}}</li>
    <custom-down :titleName="'自定义'"></custom-down>
  </ul> 
</template>     
<script>
import customDown from './custom-down'
export default {
  props: ['showList', 'current'],
  components: {
    customDown
  },
  data () {
    return {

    }
  },
  methods: {
    pitchOn (item) {
      this.$emit('pitchOn', item)
    }
  }
}
</script>
<style lang="scss">
.xj-cut-segmentation-main{
    display: inline-block;
    border: 1px solid #d6d6d6;
    font-size: 0;
    border-radius: 5px;
    vertical-align: top;
    // overflow-x: hidden;
    >li{
        position: relative;
        display: inline-block;
        font-size: 12px;
        font-weight: bold;
        padding: 5px 8px;
        cursor: pointer;
        transition: all .3s;
        &:after{
          content: " ";
          position: absolute;
          top: 7px;
          right: 0;
          height: 13px;
          border-right: 1px solid #d6d6d6;
        }
        &:hover, &.actions{
            color: #2993f8;
            // background-color: #2993f8;
        }
    }
    li:last-child{
      &:after{
        display: none;
      }
    }
}
</style>