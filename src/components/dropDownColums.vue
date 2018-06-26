<template>
  <div class="dropColums-wrap">
    <div class="tltle flex flex-r">
      {{titleData}}
      <i class="iconfont icon-xiala"></i>
    </div>
    <div class="list-box flex flex-r">
      <ul class="list-left">
        <el-checkbox-group v-if="allName" v-model="allChecked" @change="checkedAll">
          <li @mouseover="selLeftItem([], 0)">
            <el-checkbox :indeterminate="false" :label="'allId'" :class="{active: allName[0]}" style="font-size: 14px;">{{allName}}</el-checkbox>
          </li>
        </el-checkbox-group>


        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <li @mouseover="selLeftItem(item, index)" v-for="(item, index) in propsList" :key="index">
            <el-checkbox :indeterminate="false" :label="item.id" :style="filterStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
          </li>
        </el-checkbox-group>

      </ul>
      <ul class="list-right">
        <el-checkbox-group v-model="smallIdList" @change="changeSmallId">
          <li v-for="(item, index) in rightList" :key="index">
            <el-checkbox :label="item.id" :style="filterSamllStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
          </li>
        </el-checkbox-group>
        <!-- <li @click="selRightItem(item, index)" :class="{active: item.id == operateId}" v-for="(item, index) in rightList">{{item.name}}</li> -->
      </ul>
      <div class="list-footer">
        <span @click="complate">完成</span>
        <span @click="reset">重置</span>
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
        isAll: '',
        allChecked: [], // 全部选中
        checkedCities: [], // 大类选中
        smallIdList: [], // 小类选中
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
      'keyName',
      'dataType'
    ],
    watch: {
      checkedCities(newValue, oldValue) {
        // 新增
        if (newValue.length > oldValue.length) {
          for (let i of this.propsList) {
            if (i.id == newValue.slice(newValue.length - 1, newValue.length)[0]) {
              if (i.childrenList) {
                // 判断是否存在childrenList
                for (let j of i.childrenList) {
                  if (!this.smallIdList.includes(j.id)) {
                    this.smallIdList.push(j.id)
                  }
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
              // 判断是否存在childrenList
              if (i.childrenList) {
                for (let j of i.childrenList) {
                  this.smallIdList.forEach((currentValue, index, arr) => {
                    if (currentValue == j.id) {
                      this.smallIdList.splice(index, index + 1)
                    }
                  })
                }
              }
            }
          }
        }
      },
      smallIdList(newValue, oldValue) {
        // console.log(newValue)
        if (newValue.length < oldValue.length) { // 减小了一个值
          for (let i of this.propsList) {
            for (let j of i.childrenList) {
              // 删除
              if (!newValue.includes(j.id)) {
                this.checkedCities.forEach((currentValue, index, arr) => {
                  if (currentValue == i.id) {
                    this.checkedCities.splice(index, index + 1)
                    return
                  }
                })
                return
              }
            }
          }
        } else if (newValue.length > oldValue.length) { // 新增一个值
          // console.log(this.propsList)
          for (let i of this.propsList) {

            let isHas = true

            for (let j of i.childrenList) {
              // 删除
              if (!newValue.includes(j.id)) {
                isHas = false
              }
            }

            if (this.checkedCities.includes(i.id)) {
              return
            } else {
              if (isHas) {
                this.checkedCities.push(i.id)
              }
            }
          }

        }
      }
    },
    methods: {
      filterStyle(parm) {
        let datas = ''
        if (this.checkedCities.includes(parm)) {
          datas = {
            color: '#2993f8'
          }
        }
        return datas
      },
      filterSamllStyle(parm) {
        this.smallIdList.includes(parm)
      },
      checkedAll(parm) {
        if (parm.length) {
          for (let i of this.propsList) {
            if (!this.checkedCities.includes(i.id)) {
              this.checkedCities.push(i.id)
            }
            for (let j of i.childrenList) {

              if (!this.smallIdList.includes(j.id)) {
                this.smallIdList.push(j.id)
              }
            }
          }
        } else {
          this.checkedCities = []
          this.smallIdList = []
        }
      },
      handleCheckedCitiesChange(parm) {},
      changeSmallId(parm) {},
      selLeftItem(item, index) {
        this.rightList = item.childrenList
      },
      selRightItem(item, index) {
        this.rightIndex = index
        this.operateId = item.id
      },
      complate() {
        this.$emit('dataBack', {
          bigList: this.checkedCities,
          samllList: this.smallIdList,
          isAll: this.isAll,
          keyName: this.keyName,
          type: this.dataType
        })
      },
      // 重置按钮
      reset() {
        this.resetData();
        this.complate();
      },
      // 重置选项数据
      resetData(){
        this.checkedCities = []
        this.smallIdList = []
        this.allChecked = []
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
    width: 66px;
    height: 26px; 
    //border: 1px solid #d6d6d6;
    //border-radius: 4px;
    float: left;
    position: relative;
    margin: 0 8px;
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
      height: 300px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      position: absolute;
      z-index: -1;
      opacity: 0;
      background: #fff;
      overflow: hidden;
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
    &:hover {
      .list-box {
        z-index: 9999;
        opacity: 1;
        top: 30px;
      }
    }
  }

</style>
