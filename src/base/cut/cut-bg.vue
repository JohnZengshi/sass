<template>
  <ul class="xj-cut-btn-wrap">
    <li v-for="item in showList" @click="pitchOn(item)" :class="{actions: current == item.id}">{{item.name}}</li>
  </ul> 
</template>     
<script>
export default {
  props: ['showList', 'current'],
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
.xj-cut-btn-wrap{
    display: inline-block;
    border: 1px solid #2993f8;
    font-size: 0;
    border-radius: 5px;
    overflow: hidden;
    li{
        display: inline-block;
        font-size: 12px;
        font-weight: bold;
        padding: 5px 8px;
        cursor: pointer;
        transition: all .3s;
        &:hover, &.actions{
            color: #fff;
            background-color: #2993f8;
        }
    }
}
</style>