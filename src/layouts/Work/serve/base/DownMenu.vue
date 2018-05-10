<template>
  <div class="down-menu-main">
    <span class="title-name select">
      {{product.serviceTypeName}}
      <i class="iconfont icon-arrow-down drop-triangle" v-if="noChange"></i>
<!--       <i v-show="!isSolid" class="el-icon-circle-close" title="清除" @click="clearTitleInfo"
      v-if="product.serviceTypeName"></i> -->
    </span>
    <ul class="drop-list">
      <li :class="{active: actIndex == index}" v-for="(items, index) in showList" @click="itemClick(items, product)">{{items.serviceTypeName}}</li>
    </ul>
  </div>
</template>
<script>
import {seekGetServiceTypeList} from 'Api/commonality/seek'
export default {
  props: ['noClear','product', 'showList'], // nameKey->取值的key
  data () {
    return {
        isSolid: false, // 实心
        titleInfo: '',
        actIndex: null,
        noChange: true // 选中标记
    }
  },
  // created () {
  //   this._seekGetServiceTypeList()
  // },
  methods: {
    clearTitleInfo (name, item) {
        // console.log(item.serviceTypeName)
        // console.log('name', name)
        // item.serviceTypeName = name
        // console.log(item.serviceTypeName)
        // this.$emit("clearInfo", this.Index)
        // this.actIndex = null
        // this.noChange = true
    },
    itemClick (items, item) {
        item.serviceTypeName = items.serviceTypeName
        this.$set(item, 'serviceId', items.serviceTypeId)
        // item.serviceId = items.serviceTypeId
    }
  }
}
</script>
<style lang="scss" scoped>
.down-menu-main{
    display: inline-block;
    margin-top: 10px;
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
        right:0px;
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
        &.select{
            //color: #333;
        }
        color:#666;
        text-align: center;
        display: block;
        height: 30px;
        font-weight: bold;
        font-size: 14px;
        line-height: 30px;
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
        letter-spacing: 0;
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
            width: 130px;
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
