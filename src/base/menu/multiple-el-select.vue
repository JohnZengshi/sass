<template>
  <div class="dropColums-wrap">
    <div class="tltle">
      {{titleData}}
      <i class="iconfont icon-xiala"></i>
    </div>
    <div class="list-box">
      <div class="content">
        <!-- 选择器最左边部分 -->
        <ul class="list-left">
          <el-checkbox-group v-if="allName" v-model="allChecked">
            <li @mouseover="selAllItem([], 0)">
              <el-checkbox :indeterminate="false" :label="'allId'" :class="{active: allName[0]}" style="font-size: 14px;">{{allName}}</el-checkbox>
            </li>
          </el-checkbox-group>
          <el-checkbox-group v-model="leftIdList" @change="handleCheckedCitiesChange">
            <li @mouseover="selLeftItem(item, index)" v-for="(item, index) in leftList">
              <!-- <ul> -->
                <el-checkbox :indeterminate="false" :label="item" :style="filterStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
                <!-- <el-checkbox-group class="list-middle" v-model="middleIdList[item.id].length == item.childrenList.length">
                  <li v-for="(item,index) in item.childrenList">
                    <el-checkbox :label="item">{{item.name}}</el-checkbox>
                  </li>
                </el-checkbox-group> -->
              <!-- </ul> -->
            </li>
          </el-checkbox-group>
        </ul>
        <!-- 选择器中间部分 -->
        <ul v-show="middleList && middleList.length > 0" class="list-middle">
          <el-checkbox-group v-model="middleIdList" @change="changeMiddleId">
            <li @mouseover="selMiddleItem(item,index)" v-for="(item, index) in middleList">
              <el-checkbox :indeterminate="false" :label="item" :style="filterSamllStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
            </li>
          </el-checkbox-group>
        </ul>
        <!-- 选择器最右边部分 -->
        <ul v-show="rightList && rightList.length > 0" class="list-right">
          <el-checkbox-group v-model="rightIdList" @change="changeMiddleId">
            <li v-for="(item, index) in rightList">
              <el-checkbox :indeterminate="false" :label="item" :style="filterSamllStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
            </li>
          </el-checkbox-group>
        </ul>
      </div>
      <div class="bottom">
        <div class="list-footer">
          <span @click="complate">完成</span>
          <span @click="reset">重置</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        allChecked: [], // 全部选中
        leftIdList: [], // 大类选中
        // leftList: [],
        // 中间数据
        // middleIdList: {
        //   1:[],
        //   2:[]
        // }, 
        middleIdList:[],
        // 小类选中
        middleList: [],
        // 最右边数据
        rightIdList: [],
        rightList: [],

        leftIndex: null,
        rightIndex: null,
        operateId: ''
      }
    },
    props: [
      'leftList',
      'titleData',
      'allName',
      'keyName'
    ],
    created() {
      // console.log(123)
      // this.leftList = this.propsList;
    },
    watch: {
      // 全选或全不选
      allChecked(newValue, oldValue) {},
      // -----------------
      //左边的列表发生变化
      leftIdList(newValue, oldValue) {
        console.log(newValue);
        // this.middleIdList = [];
        // this.firstOperationSecond(newValue);
        // console.log(this.middleIdList)
      },
      //中间的列表发生变化
      middleIdList(newValue, oldValue) {
        console.log(newValue)
        // 遍历父项
        // this.leftList.forEach((val, index) => {
        //   // 父项的Id
        //   let parentId = val.id;
        //   // 子项的总长度
        //   let childNum = val.childrenList.length;
        //   let selectedNum = 0;
        //   // 遍历已选择的子项
        //   newValue.forEach((val, index) => {
        //     if (parentId == val.parentId) {
        //       selectedNum++;
        //     }
        //   })
        //   console.log(parentId + "选了" + selectedNum + "个");
        //   if (childNum == selectedNum) {
        //     // console.log(parentId + "全选了");
        //     this.leftIdList.push(val);
        //     // console.log(this.leftIdList)
        //   } else {
        //     console.log(this.leftIdList)
        //     this.leftIdList.forEach((val, index) => {
        //       if (val.id == parentId) {
        //         this.leftIdList.splice(this.leftIdList.indexOf(val), 1);
        //       }
        //     })
        //     // this.leftIdList.splice(this.leftIdList.indexOf(val),1);
        //   }
        // })

      },
      //右边的列表发生变化
      rightIdList(newValue, oldValue) {},
    },
    methods: {
      filterStyle(parm) {
        let datas = ''
        if (this.leftIdList.includes(parm)) {
          datas = {
            color: '#2993f8'
          }
        }
        return datas
      },
      filterSamllStyle(parm) {
        this.middleIdList.includes(parm)
      },
      handleCheckedCitiesChange(parm) {
        //   console.log(123)
      },
      changeMiddleId(parm) {},
      selAllItem() {
        this.middleList = [];
        this.rightList = [];
      },
      //   鼠标移动到最左的选项时
      selLeftItem(item, index) {
        // console.log(item)
        this.middleList = item.childrenList
        // console.log(this.middleIdList)
        // this.middleList.forEach((val, index) => {
        //   val.parentId = item.id;
        // })
      },
      //   鼠标移动到中间的选项时
      selMiddleItem(item, index) {
        if (item.childrenList) {
          this.rightList = item.childrenList
          this.rightList.forEach((val, index) => {
            val.parentId = item.id
          })
        }
      },
      //   鼠标移动到最右的选项时
      selRightItem(item, index) {
        this.rightIndex = index
        this.operateId = item.id
      },
      complate() {
        console.log(this)
        this.$emit('dataBack', {
          bigList: this.leftIdList,
          samllList: this.middleIdList,
          keyName: this.keyName
        })
      },
      reset() {
        this.leftIdList = []
        this.middleIdList = []
        this.rightList = []
        this.allChecked = []

      },
      resetList() {
        this.middleList = [];
        this.rightList = [];
      },
      // ------------------------------
      // 第一项操作第二项
      firstOperationSecond(newValue) {
        newValue.forEach((val, index) => {
          this.middleIdList = this.middleIdList.concat(val.childrenList)
        })
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
<style scoped lang="scss">
  .dropColums-wrap {
    width: 78px;
    height: 28px; //border: 1px solid #d6d6d6;
    //border-radius: 4px;
    float: left;
    position: relative;
    margin: 0 4px;
    &:hover {
      .list-box {
        z-index: 20;
        opacity: 1;
        top: 30px;
      }
    }
    .tltle {
      width: 100%;
      height: 100%;
      font-size: 14px;
      line-height: 26px;
      i {
        position: absolute;
        right: 0;
        top: 0;
        line-height: 28px;
      }
    }
    .list-box {
      height: 300px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      position: absolute;
      z-index: -1;
      opacity: 0;
      background: #fff;
      overflow: hidden;
      left: 0px;
      top: 40px;
      transition: all .3s ease;
      .content {
        display: flex;
        flex-direction: row; // height: 100%;
        .list-left {
          height: 260px;
          width: 150px;
          float: left;
          border-right: 1px solid #d6d6d6;
          overflow-y: auto;
          li {
            height: 40px;
            width: 100%;
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
        .list-middle {
          //   display: none;
          height: 260px;
          width: 150px;
          float: left;
          border-right: 1px solid #d6d6d6;
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
            width: 100%;
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
          //   display: none;
          height: 260px;
          width: 150px;
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
            width: 100%;
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
      }
      .bottom {
        width: 100%;
        height: 40px;
        .list-footer {
          height: 40px;
          width: 100%;
          background: #f6f7f8;
          float: left;
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
  }

</style>
