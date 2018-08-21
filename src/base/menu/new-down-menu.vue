<template>
  <div class="down-menu-main" :class="{'down-menu-hover-class': !disabled}">
    <span class="title-name" :style="specialStyle">
      {{titleInfo}}<i v-show="!isSolid" class="iconfont icon-arrow-down drop-triangle" v-if="keep ? true : noChange"></i><i v-show="isSolid" class="iconfont icon-xiala drop-triangle"></i><i class="el-icon-circle-close" title="清除" @click="clearTitleInfo"
      v-if="!noChange && !noClear"></i>
    </span>
    <ul class="drop-list">
        <li :class="{active: currentId ? item[idKey] == currentId : actIndex == index}" v-for="(item, index) in showList" @click="itemClick(item, index)">{{nameKey ? item[nameKey] : item.name || item.shopName || item.userName}}</li>
      <!-- <li :class="{active: actIndex == index || item[idKey] == currentId}" v-for="(item, index) in showList" @click="itemClick(item, index)">{{nameKey ? item[nameKey] : item.name || item.shopName || item.userName}}</li> -->
    </ul>
  </div>
</template>
<script>
export default {
  props: ['titleInfo', 'showList', 'isSolid', 'specialStyle', 'noClear', 'nameKey', 'idKey', 'keep', 'disabled', 'index', 'currentId'],
  // isSolid->实心 
  // nameKey->取值的key
  // keep -> 一直保持着右边的小图标 
  // noClear --> 为真，不需要删除
  // idKey --> 当前id的key值
  // currentId --> 当前选中的id
  data () {
    return {
      actIndex: null,
      noChange: true // 选中标记
    }
  },
  methods: {
    // 还原
    init () {
        this.actIndex = null
        this.noChange = true
    },
    // 清楚
    clearTitleInfo () {
        this.$emit("clearInfo", this.index)
        this.actIndex = null
        this.noChange = true
    },
    // 选中
    itemClick (item, index) {
        this.noChange = false
        this.actIndex = index,
        item.index = this.index
        this.$emit("changeData", item)
    }
  }
}
</script>
<style lang="scss" scoped>
.down-menu-main{
    display: inline-block;
    position: relative;
    cursor: pointer;
    vertical-align: top;
    width: 100px;
    &:after{
        content:'';
        border: 6px solid transparent;
        width: 0;
        height: 0;
        position: absolute;
        top: 38px;
        right:0px;
        z-index: 102;
        transition: all .3s;
        margin-left: -3px;
    }
    .title-name {
        border: 1px solid #d6d6d6;
        border-radius: 3px;
        width: 100%;
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #F1F2F3;
        color:#666;
        text-align: center;
        display: block;
        height: 28px;
        font-size: 14px;
        line-height: 28px;
        .drop-triangle {
            position: absolute;
            right: 5px;
            font-size:12px;
            display: inline-block;
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
// 默认有
.down-menu-hover-class{
    &:hover{
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
        }
        >.title-name {
            color:#3195f5;
            border: 1px solid #3195f5;
        }
        .title-name .el-icon-circle-close {
            color:#2993f8;
        }
    }
    .title-name{
        background-color: #fff;
    }
}
</style>
