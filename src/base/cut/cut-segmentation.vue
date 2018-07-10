<template>
  <ul class="xj-cut-segmentation-main">
    <li v-for="item in showList" @click="pitchOn(item)" :class="{actions: current == item.id}">{{item.name}}</li>
    <custom-down :titleName="'自定义'" :class="{actions: filterData.type == 4}" @complate="complate"></custom-down>
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
      filterData: {
        type: 2
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
      this.$emit('pitchOn', this.filterData)
    },
    complate (parm) {
      this.filterData.type = 4
      this.customData = {}
      for (let i in parm) {
        if (parm[i].id) {
          this.customData[i] = parm[i].id
        }
      }
      this.$emit('pitchOn', Object.assign({}, this.filterData, this.customData))
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
        padding: 5px 8px;
        cursor: pointer;
        color: #666;
        transition: all .3s;
        &:after{
          content: " ";
          position: absolute;
          top: 5px;
          right: 0;
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