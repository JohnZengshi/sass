<template>
  <ul class="xj-cut-segmentation-main">
    <li v-for="item in showList" @click="pitchOn(item)" :class="{actions: current == item.id}">{{item.name}}</li>
  </ul> 
</template>     
<script>
export default {
  props: ['showList', 'current'],
  data () {
    return {
      filterData: {
        type: 1
      },
      customData: {}
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (this.current) {
        this.filterData.type = this.current
      }
    })
  },
  methods: {
    pitchOn (item) {
      this.filterData.type = item.id
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
    border-radius: 4px;
    vertical-align: top;
    // overflow-x: hidden;
    >li{
        position: relative;
        display: inline-block;
        font-size: 12px;
        line-height: 12px;
        font-weight: bold;
        padding: 7px 8px;
        cursor: pointer;
        color: #666;
        transition: all .3s;
        &:after{
          content: " ";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          height: 12px;
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