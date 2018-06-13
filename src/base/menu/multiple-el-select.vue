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
          <el-checkbox-group v-if="allName" v-model="allChecked" @change="checkedAll">
            <li @mouseover="selAllItem([], 0)">
              <el-checkbox :indeterminate="false" :label="'allId'" :class="{active: allName[0]}" style="font-size: 14px;">{{allName}}</el-checkbox>
            </li>
          </el-checkbox-group>
          <el-checkbox-group v-model="leftIdList" @change="handleCheckedCitiesChange">
            <li @mouseover="selLeftItem(item, index)" v-for="(item, index) in propsList">
              <el-checkbox :indeterminate="false" :label="item.id" :style="filterStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
            </li>
          </el-checkbox-group>
        </ul>
        <!-- 选择器中间部分 -->
        <ul v-if="middleList && middleList.length > 0" class="list-middle">
          <el-checkbox-group v-model="middleIdList" @change="changeMiddleId">
            <li @mouseover="selMiddleItem(item,index)" v-for="(item, index) in middleList">
              <el-checkbox :indeterminate="false" :label="item.id" :style="filterSamllStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
            </li>
          </el-checkbox-group>
          <!-- <li @click="selRightItem(item, index)" :class="{active: item.id == operateId}" v-for="(item, index) in middleList">{{item.name}}</li> -->
        </ul>
        <!-- 选择器最右边部分 -->
        <ul v-if="rightList && rightList.length > 0" class="list-right">
          <el-checkbox-group v-model="rightIdList" @change="changeMiddleId">
            <li v-for="(item, index) in rightList">
              <el-checkbox :indeterminate="false" :label="item.id" :style="filterSamllStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
            </li>
          </el-checkbox-group>
          <!-- <li @click="selRightItem(item, index)" :class="{active: item.id == operateId}" v-for="(item, index) in middleList">{{item.name}}</li> -->
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
  import {
    seekGetReceiptList
  } from "Api/commonality/seek"
  import {
    jurisdictionShopManageRole
  } from '../../Api/commonality/jurisdiction';
  export default {
    data() {
      return {
        isAll: '',
        allChecked: [], // 全部选中
        leftIdList: [], // 大类选中
        // 中间数据
        middleIdList: [], // 小类选中
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
      'propsList',
      'titleData',
      'allName',
      'keyName'
    ],
    watch: {
      allChecked(newValue, oldValue) {
        // console.log(newValue)
      },
    //   左边的列表发生变化
      leftIdList(newValue, oldValue) {
        //   console.log(newValue);
        // console.log(this.propsList);
        // console.log(newValue.slice(newValue.length - 1, newValue.length)[0])
        // 新增
        if (newValue.length > oldValue.length) {
            // console.log(newValue.slice(newValue.length - 1, newValue.length)[0])
            // console.log(this.middleList)
            // console.log(this.middleIdList)
            // console.log(newValue)
            // console.log(this.propsList)
          for (let i of this.propsList) {
            if (i.id == newValue.slice(newValue.length - 1, newValue.length)[0]) {
              for (let j of i.childrenList) {
                if (!this.middleIdList.includes(j.id)) {
                  this.middleIdList.push(j.id)
                }
              }
            }
          }
        }
        // 删除
        else if (newValue.length < oldValue.length) {
          let amendValue = ''
          for (let k of oldValue) {
            if (!newValue.includes(k)) {
              amendValue = k
            }
          }
          for (let i of this.propsList) {
            if (i.id == amendValue) {
              for (let j of i.childrenList) {
                this.middleIdList.forEach((currentValue, index, arr) => {
                  if (currentValue == j.id) {
                    this.middleIdList.splice(index, index + 1)
                  }
                })
              }
            }
          }
        }
      },
      middleList(newValue, oldValue) {
        // console.log(newValue)
      },
      middleIdList(newValue, oldValue) {
        // console.log(this.leftIdList);
        // console.log(this.propsList);
        // console.log(newValue)
        // console.log(newValue.slice(newValue.length - 1, newValue.length)[0])
        // 减小了一个值
        if (newValue.length < oldValue.length) {
          for (let i of this.propsList) {
            for (let j of i.childrenList) {
              // 删除
              if (!newValue.includes(j.id)) {
                this.leftIdList.forEach((currentValue, index, arr) => {
                  if (currentValue == i.id) {
                    this.leftIdList.splice(index, index + 1)
                    return
                  }
                })
              }
            }
          }

        }
        // 新增一个值
        else if (newValue.length > oldValue.length) {

          for (let i of this.propsList) {

            let isHas = true

            for (let j of i.childrenList) {
              // 删除
              if (!newValue.includes(j.id)) {
                isHas = false
              }
            }

            if (this.leftIdList.includes(i.id)) {
              return
            } else {
              if (isHas) {
                this.leftIdList.push(i.id)
              }
            }

          }

        }
      },
      rightList(newValue, oldValue) {
        // console.log(newValue);
      },
      rightIdList(newValue, oldValue) {
        // console.log(this.middleIdList)
        // console.log(newValue)
        // console.log(this.propsList)
        // 减小了一个值
        if (newValue.length < oldValue.length) {
          for (let i of this.propsList) {
            for (let j of i.childrenList) {
              // 删除
              if (!newValue.includes(j.id)) { //店铺id
                this.middleIdList.forEach((currentValue, index, arr) => {
                  console.log(currentValue)
                  if (currentValue == j.id) {
                    this.middleIdList.splice(index, index + 1)
                    return
                  }
                })
              }
            }
          }
        }
        // 新增一个值
        else if (newValue.length > oldValue.length) {

          for (let i of this.propsList) {

            let isHas = true

            for (let j of i.childrenList) {
              // 删除
              //   if (!newValue.includes(j.id)) {
              //     isHas = false
              //   }
              if (this.middleIdList.includes(j.id)) {
                return
              } else {
                if (isHas) {
                  this.middleIdList.push(j.id)
                }
              }
            }
          }

        }
      }
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
      checkedAll(parm) {
        // console.log(123)
        if (parm.length) {
          for (let i of this.propsList) {
            if (!this.leftIdList.includes(i.id)) {
              this.leftIdList.push(i.id)
            }
            for (let j of i.childrenList) {

              if (!this.middleIdList.includes(j.id)) {
                this.middleIdList.push(j.id)
              }
            }
          }
        } else {
          this.leftIdList = []
          this.middleIdList = []
        }
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
        // this.middleList = [];
        // this.rightList = [];
        this.middleList = item.childrenList
      },
      selMiddleItem(item, index) {
        this.rightList = item.childrenList
      },
      selRightItem(item, index) {
        this.rightIndex = index
        this.operateId = item.id
      },
      complate() {
        console.log(this)
        this.$emit('dataBack', {
          bigList: this.leftIdList,
          samllList: this.middleIdList,
          isAll: this.isAll,
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

</style>
