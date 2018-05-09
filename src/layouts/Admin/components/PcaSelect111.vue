<template>
  <span class="pca_select">
    <span class="selectbox" @click.stop="selectP">{{seltP ? seltP : '省'}}<ul class="dropdownbox" :class="{'active': showDropdownIndex===0}" @click.stop="selectedP"><li @click="clickTap" v-for="(p,i) in pList" class="option" :id="p.objectId">{{p.objectName}}</li></ul></span>
    <span class="selectbox" @click.stop="selectC">{{seltC ? seltC : '市'}}<ul class="dropdownbox" :class="{'active': showDropdownIndex===1}" @click.stop="selectedC"><li @click="clickTap" v-for="(c,i) in cList" class="option" :id="c.objectId">{{c.objectName}}</li></ul></span>
    <span class="selectbox" @click.stop="selectA">{{seltA ? seltA : '区'}}<ul class="dropdownbox" :class="{'active': showDropdownIndex===2}" @click.stop="selectedA"><li @click="clickTap" v-for="(a,i) in aList" class="option" :id="a.objectId">{{a.objectName}}</li></ul></span>
  </span>
</template>

<script>
  //import getAddress from '../../../Api/auth_v1'
  export default {
    data () {
      return {
        showDropdownIndex: null
      }
    },
    props: ['pList', 'cList', 'aList', 'seltP', 'seltC', 'seltA'],
    methods: {
      selectP () {
        this.showDropdownIndex = 0
      },
      selectC () {
        this.showDropdownIndex = 1
      },
      selectA () {
        this.showDropdownIndex = 2
      },
      selectedP (ev) {
        this.$emit('selectedP', ev.target.innerHTML, ev.target.id);
      },
      selectedC (ev) {
        this.$emit('selectedC', ev.target.innerHTML, ev.target.id);
      },
      selectedA (ev) {
        this.$emit('selectedA', ev.target.innerHTML, ev.target.id);
      },
      clickTap () {
        this.showDropdownIndex = null;
        //console.log(2222);
        //console.log(this.showDropdownIndex)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pca_select {
    width: 100%;
    height: 100%;
    .selectbox {
      width: 28%;
      display: inline-block;
      max-width: 28%;
      font-size: 12px;
      color: #666;
      text-align: center;
      background:#f6f7f8;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      border:1px solid #ddd;
      border-radius:4px;
      .dropdownbox {
        display: none;
        position: absolute;
        bottom: 12px;
        left: 0;
        width: 130%;
        height: 175px;
        margin-bottom: -175px;
        margin-left: -15%;
        background-color: #f6f7f8;
        border: 1px solid #d6d6d6;
        overflow: scroll;
        &.active {
          display: block;
          z-index: 101;
        }

        .option {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          &:hover {
            background-color: #999;
            color: orange;
          }
        }
      }
    }
  }
</style>
