<template>
  <div class="dropColums-wrap">
    <div class="tltle">
      {{titleData}}
      <i class="iconfont icon-xiala"></i>
    </div>
    <div class="list-box flex flex-r">
      <!-- <el-checkbox-group v-model="leftId" @change="leftChange">
        <ul class="list-left">
          <li v-for="item in leftList">
            <el-checkbox :label="item" :key="item" @change="itemChange">
              {{item}}
            </el-checkbox>
          </li>
        </ul>
      </el-checkbox-group> -->
      <el-tree :data="data2" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
      </el-tree>
      <!-- <ul class="list-right"></ul> -->
      <!-- <div class="list-footer"> -->
        <!-- <span @click="complate">完成</span>
        <span @click="reset">重置</span> -->
      </div>
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
        leftList: ['上海', '北京', '广州', '深圳'],
        leftId: [],
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    props: [
      'propsList',
      'titleData',
      'allName',
      'keyName'
    ],
    watch: {},
    methods: {
      leftChange(val) {
        console.log(val)
      },
      itemChange(val) {
        //   console.log(val)
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{
            name: 'region1'
          }, {
            name: 'region2'
          }]);
        }
        if (node.level > 3) return resolve([]);

        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + this.count++
            }, {
              name: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      }
    }
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
  // .checkbox-font {
  //     width: 30px;
  //     .el-checkbox__input{
  //         border-radius: 4px;
  //         height: 20px;
  //         width: 20px;
  //         .el-checkbox__inner{
  //             border-radius: 4px;
  //         }
  //     }
  //     .el-checkbox__input.is-checked {
  //         background-color: #2993f8 !important;
  //         border-color: #2993f8 !important;
  //         .el-checkbox__inner{
  //             background-color: #2993f8 !important;
  //             border-color: #2993f8 !important;
  //         }
  //     }
  // }

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
      i {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 26px;
      }
    }
    .list-box {
      //   width: 300px;
      height: 300px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      position: absolute;
      z-index: 20;
      opacity: 1;
      background: #fff;
      overflow: hidden; //   left: -120px;
      top: 40px;
      transition: all .3s ease;
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
        position: absolute;
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
    .list-box {
      z-index: 20;
      opacity: 1;
      top: 30px;
    }

  }

  .list-box:hover {
    z-index: 20;
    opacity: 1;
    top: 30px;
  }

  .el-tree {
    >div {
    //   display: flex;
    //   flex-direction: row;
    }
  }

</style>
