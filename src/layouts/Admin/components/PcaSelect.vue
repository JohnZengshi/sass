<template>
  <span class="pca_select">
    <span class="selectbox" @click="selectP">{{seltP ? seltP : '省'}}<ul class="dropdownbox" :class="{'active': showDropdownIndex===0}" @click.stop="selectedP"><li @click.prevent="clickTap(clickType1, $event)"  v-for="(p,i) in pList" class="option" :id="p.objectId">{{p.objectName}}</li></ul></span>
    <span class="selectbox" @click="selectC">{{seltC ? seltC : '市'}}<ul class="dropdownbox" :class="{'active': showDropdownIndex===1}" @click.stop="selectedC"><li @click.prevent="clickTap(clickType2, $event)"  v-for="(c,i) in cList" class="option" :id="c.objectId">{{c.objectName}}</li></ul></span>
    <span class="selectbox" @click="selectA">{{seltA ? seltA : '区'}}<ul class="dropdownbox" :class="{'active': showDropdownIndex===2}" @click.stop="selectedA"><li @click.prevent="clickTap(clickType3, $event)"  v-for="(a,i) in aList" class="option" :id="a.objectId">{{a.objectName}}</li></ul></span>
  </span>
</template>

<script>
  //import getAddress from '../../../Api/auth_v1'
  export default {
    data () {
      return {
        showDropdownIndex: null,
        clickType1: "p1",
        clickType2: "c2",
        clickType3: "a3",
      }
    },
    props: ['pList', 'cList', 'aList', 'seltP', 'seltC', 'seltA'],
    created () {
    },
    methods: {
      selectP () {
          console.log(this.showDropdownIndex);
        this.showDropdownIndex = 0
      },
      selectC () {
             this.showDropdownIndex = 1;
      },
      selectA () {
             this.showDropdownIndex = 2;
      },
      selectedP (ev) {
      },
      selectedC (ev) {

      },
      selectedA (ev) {

      },
      clickTap (type, ev) {
        //console.log(111111);
        console.log(ev.target.innerHTML)
        console.log(ev.target.id)
        console.log(type);
        if (type == 'p1') {
          this.$emit('selectedP', ev.target.innerHTML, ev.target.id);
        } else if (type == 'c2') {
          this.$emit('selectedC', ev.target.innerHTML, ev.target.id);
        } else if (type == 'a3') {
          this.$emit('selectedA', ev.target.innerHTML, ev.target.id);
        }
        this.showDropdownIndex = null;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pca_select {
    width: 100%;
    height: 100%;
  font-size: 20px;
    .selectbox {
      width: 28%;
      display: inline-block;
      max-width: 28%;
      font-size: 13px;
      color: #999;
      text-align: center;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      background:#fff url("./../../../assets/img/Contact/xiala.png") 90% center no-repeat;
      -moz-user-select:none;
      -webkit-user-select:none;
      user-select:none;
      .dropdownbox {
        display: none;
        position: absolute;
        bottom: 12px;
        left: 0;
        width: 130%;
        height: 175px;
        color:#666;
        margin-bottom: -175px;
        margin-left: -15%;
        background-color: #fff;
        border: 1px solid #d6d6d6;
        box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
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
            background-color: #4fdcca;
            color: #fff;
          }
        }
      }
    }
  }
</style>
