// 树形级联多选框组件
<template>
  <div class="dropColums-wrap" @mouseover="open" @mouseleave="close">
    <div class="tltle flex flex-r flex-pack-justify" :class="{'active':isOpen}">
      {{titleData}}
      <i class="iconfont icon-xiala"></i>
    </div>
    <div class="list-box" :class="{'active':isOpen}">
      <el-tree ref="tree" :data="propsList" show-checkbox :props="defaultProps" :highlight-current="highlightCurrent" accordion @check-change="handleCheckChange">
      </el-tree>
      <!-- <div class="list-footer">
        <span @click="complate">完成</span>
        <span @click="reset">重置</span>
      </div> -->
    </div>
  </div>
</template>

<script>
  import {
    seekGetReceiptList
  } from "Api/commonality/seek"
  export default {
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'childrenList',
          label: 'name'
        },
        isOpen:false,
        highlightCurrent:true,
        selectedList:[],
      }
    },
    props: [
      'propsList',
      'titleData',
      'allName',
      'keyName',
      'dataType'
    ],
    watch: {
      selectedList(newValue,oldValue){
        if(newValue.length != oldValue.length){
          console.log("变化了")
          this.complate();
        }
      }
    },
    methods: {
      // 完成按钮
      complate() {
        this.$emit("dataBack", {
          selectedList: this.selectedList,
          type: this.dataType
        })
      },
      // 重置按钮
      reset() {
        this.$refs.tree.setCheckedKeys([]);
      },
      handleCheckChange(data,isSelect,childrenIsSelect){
        this.selectedList = this.$refs.tree.getCheckedNodes(true);
      },
      open(){
        this.isOpen = true 
      },
      close(){
        this.isOpen = false
      }
    },
    created() {}
  }

</script>
<style lang="scss">
  .dropColums-wrap {
    .el-checkbox {
      height: 20px !important;
      line-height: 20px !important;
    }
    .el-checkbox-group .el-checkbox__inner {
      border-radius: 5px !important;
    }
    .el-checkbox-group {
      .el-checkbox__label {
        font-size: 14px !important;
      }
    }
  }

</style>
<style lang="scss">
  .el-tree {
    position: relative; // height: 100%;
    .el-tree-node {
      display: flex;
      flex-direction: row;
      height: 36px;
      .el-tree-node__content {
        // padding-left: 0 !important;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
        height: 40px;
        width: 150px;
        line-height: 40px;
        text-align: left;
        padding-left: 14px !important;
        font-size: 14px;
        border-bottom: 1px solid #f1f2f3;
        cursor: pointer;
        .el-tree-node__expand-icon {
          // display: none;
          &.is-leaf {
            display: none;
          }
        }
        .el-checkbox {
          width: 20px;
          margin-right: 25px;
        }
        .el-tree-node__label {}
      }
      .el-tree-node__children {
        position: absolute;
        right: -151px; // top: 0;
        background-color: #fff;
        overflow: inherit; // height: 298px;
        transition: height 0s;
        -moz-transition: height 0s;
        /* Firefox 4 */
        -webkit-transition: height 0s;
        /* Safari 和 Chrome */
        -o-transition: height 0s;
        /* Opera */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        background: #fff;
        // max-height: 300px;
        // overflow-y: scroll;
      }
    }
  }

</style>
<style scoped lang="scss">
  // @import url("//unpkg.com/element-ui@2.4.1/lib/theme-chalk/index.css");
  .dropColums-wrap {
    width: 66px;
    height: 26px; //border: 1px solid #d6d6d6;
    //border-radius: 4px;
    float: left;
    position: relative;
    margin: 0 4px;
    .tltle {
      width: 100%;
      height: 100%;
      font-size: 12px;
      line-height: 26px;
      font-weight: bold;
      cursor: pointer;
      &.active{
        color:#2993F8
      }
      i {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 26px;
      }
    }
    .list-box {
      //   width: 300px;
      // height: 300px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      position: absolute;
      z-index: -1;
      opacity: 0;
      background: #fff; // overflow: hidden; //   left: -120px;
      top: 40px;
      left: -5px;
      transition: all .3s ease;
      &.active{
        z-index: 20;
        opacity: 1;
        top: 26px;
      }
      .list-left {
        height: 260px; // width: 150px;
        float: left;
        border-right: 1px solid #d6d6d6;
        overflow-y: auto;
        li {
          height: 40px;
          width: 150px;
          line-height: 40px;
          text-align: left;
          padding-left: 14px;
          font-size: 14px;
          border-bottom: 1px solid #f1f2f3;
          cursor: pointer;
          &:hover {
            background: #f6f7f8;
            color: #3195f5;
          }
        }
        li.active {
          color: #2993f8;
        }
      }
      .list-right {
        height: 260px; // width: 150px;
        float: left;
        overflow-y: auto;
        li {
          // height: 40px;
          // width: 100%;
          // line-height: 40px;
          // font-size: 14px;
          // padding-left: 14px;
          // text-align: left;
          // border-bottom: 1px solid #f1f2f3;
          // cursor: pointer
          height: 40px;
          width: 150px;
          line-height: 40px;
          text-align: left;
          padding-left: 14px;
          font-size: 14px;
          border-bottom: 1px solid #f1f2f3;
          cursor: pointer;
          &:hover {
            background: #f6f7f8;
            color: #3195f5;
          }
        }
        li.active {
          color: #2993f8;
        }
      }
      .list-footer {
        // position: absolute;
        height: 40px;
        width: 100%;
        background: #f6f7f8;
        float: left;
        bottom: 0;
        span {
          margin-top: 7px;
          font-size: 14px;
          display: block;
          width: 60px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          float: right;
          margin-right: 12px;
          cursor: pointer;
        }
        span:nth-child(2) {
          color: #999999;
          float: left;
        }
        span:nth-child(1) {
          background: #2993f8;
          color: #fff;
          border-radius: 4px;
        }
      }
    }
  }

  .dropColums-wrap:hover {
    // .list-box {
    //   z-index: 20;
    //   opacity: 1;
    //   top: 30px;
    // }
  }

  // .list-box:hover {
  //   z-index: 20;
  //   opacity: 1;
  //   top: 30px;
  // }

</style>
