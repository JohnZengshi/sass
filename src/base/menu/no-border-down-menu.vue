<template>
  <div class="no-border-down-menu-main">
    <span class="title-name" :class="titleInfo ? '' : 'select'">
      {{titleInfo}}
      <i v-show="!isSolid" class="iconfont icon-arrow-down drop-triangle" v-if="noChange"></i><i v-show="isSolid" class="iconfont icon-xiala drop-triangle"></i><i class="el-icon-circle-close" title="清除" @click="clearInfo"
      v-if="!noChange && !noClear"></i>
    </span>
    <ul class="drop-list">
      <li :class="{active: actIndex === index}" v-for="(item, index) in showList" @click="itemClick(item, index)">{{nameKey ? item[nameKey] : item.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['titleInfo', 'showList', 'isSolid', 'noClear', 'nameKey', 'keyName'], // isSolid->实心 nameKey->取值的key
  data () {
    return {
      actIndex: '',
      noChange: true // 选中标记
      // showList: [
      //   {
      //     name: 123,
      //     id: 789
      //   },
      //   {
      //     name: 6666,
      //     id: 7889
      //   }
      // ]
    }
  },
  methods: {
    clearInfo () {
      this.actIndex = ''
      this.noChange = true
      this.$emit('clearInfo', {keyName: this.keyName})
    },
    itemClick (item, index) {
        this.$emit('changeData', {item: item, keyName: this.keyName})
        this.noChange = false
        this.actIndex = index
    }
  }
}
</script>
<style lang="scss" scoped>
.no-border-down-menu-main{
    display: inline-block;
    position: relative;
    cursor: pointer;
    vertical-align: top;
    &:after{
        content:'';
        border: 6px solid transparent;
        width: 0;
        height: 0;
        position: absolute;
        top: 38px;
        right: 0px;
        z-index: 102;
        transition: all .3s;
        margin-left: -3px;
    }
    &:hover{
        background:#e0ecf7;
        color:#3195f5;
        >ul{
            opacity: 1;
            visibility: visible;
            top:30px;
        }
        &:after{
            top: 18px;
            border-bottom-color: #fff;
        }
        >.title-name .drop-triangle {
            transform: rotate(180deg);
            //color:#2993f8;
        }
        >.title-name {
            color:#3195f5;
        }
        .title-name .el-icon-circle-close {
            color:#2993f8;
        }
    }
    .title-name {
        padding: 0 8px;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.select{
            //color: #333;
        }
        color:#666;
        text-align: center;
        display: block;
        height: 28px;
        // font-weight: bold;
        font-size: 14px;
        line-height: 28px;
        .drop-triangle {
            font-size:12px;
            display: inline-block;
            //transform: scale(120%, 120%) !important;
            transition: all .3s;
            transform-origin: center center;
        }
        .el-icon-circle-close {
            position: absolute;
            top: -4px;
            right: -4px;
            font-size:10px;
            color:#ccc;
            cursor: pointer;
        }
        // .el-icon-circle-close:hover {
        //     color:#2993f8;
        // }
    }
    .drop-list {
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transition: all .3s;
        background:#fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        position: absolute;
        letter-spacing: 0;;
        top: 50px;
        right: -20px;
        z-index: 101;
        max-height: 300px;
        overflow: hidden;
        overflow-y: auto;
        li {
            text-align: center;
            height: 42px;
            line-height: 42px;
            min-width: 130px;
            font-size: 13px;
            color: #333;
            white-space: nowrap;
            box-sizing: border-box;
            // padding-left: 10px;
            border-bottom: 1px solid #f1f2f3;
            border-left: 4px solid transparent;
            cursor: pointer;
            &.active{
                color: #2993f8;
                border-left-color: #2993f8;
            }
        }
        li:before {
            content: '';
            height: 100%;
            width: 3px;
            position: absolute;
            left: 0;
            top: 0;
        }
        li:hover {
            background:#f6f7f8;
        }
        li.active:before {
            display: none;
        }
    }
}
</style>
