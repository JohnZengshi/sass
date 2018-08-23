<!-- 高级搜索 -->
<template>
  <div class="m-m-advanced-search">
<!--     <div class="item-wrap" v-for="(allItem, index) in showList"> -->
        <div class="item-box" v-for="(item, index) in showList">
          <span class="h-tit">条件{{_toChinesNum(index + 1)}}</span>
          
          <!-- 前置 -->
          <new-down-menu
              class="w-110 ml-10"
              ref="memberRankBox"
              :currentId="item.frontCondition"
              :idKey="'id'"
              :isSolid="true"
              :noClear="true"
              :titleInfo="_getMemberAdvancedSearchPreposition(item.frontCondition)"
              :showList="advancedSearchPreposition"
              :index="index"
              @changeData="changeFrontCondition"
          ></new-down-menu>

          <new-down-menu
              class="w-70 ml-10"
              ref="memberRankBox"
              :isSolid="true"
              :noClear="true"
              :currentId="item.choiceCondition"
              :idKey="'id'"
              :titleInfo="_getAdvancedSearchInclude(item.choiceCondition)"
              :showList="advancedSearchInclude"
              :index="index"
              @changeData="changeChoiceCondition"
          ></new-down-menu>

          <!-- 输入框 -->
          <input @blur="update" v-show="currentInput(item.frontCondition)" v-model="item.afterCondition" class="xj-input small-input" type="text">

          <!-- 日期 -->
          <el-date-picker v-show="currentTime(item.frontCondition)" class="ml-10" v-model="item.afterCondition" type="date" placeholder="选择日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setCompleteTime">
          </el-date-picker>
          
          <!-- 下拉选择 -->
          <new-down-menu
              v-show="currentSelect(item.frontCondition)"
              class="w-130 ml-10"
              ref="memberRankBox"
              :currentId="item.afterCondition"
              :idKey="'id'"
              :isSolid="true"
              :titleInfo="_getMemberType(item.afterCondition)"
              :showList="filterSelect(item.frontCondition)"
              :index="index"
              @changeData="changeAfterCondition"
              @clearInfo="clearAfterCondition"
          ></new-down-menu>

          <!-- 连接 -->
          <new-down-menu
              v-show="showList.length - 1 != index" 
              class="w-70 ml-10"
              ref="memberRankBox"
              :currentId="item.connect"
              :idKey="'id'"
              :isSolid="true"
              :noClear="true"
              :titleInfo="_getConnect(item.connect)"
              :showList="connectList"
              :index="index"
              @changeData="changeConnect"
          ></new-down-menu>

          <i v-if="index != 0 && (index + 1)%2 != 0" class="iconfont icon-wuuiconsuoxiao del-right" @click="delData(index)"></i>

        </div>

<!--     </div> -->
        <i v-if="showList.length < 8" class="iconfont icon-jia add-right" @click="addData"></i>
<!--     <i class="iconfont icon-wuuiconsuoxiao del-right" @click="delData"></i> -->
  </div>
</template>
<script>
import newDownMenu from 'base/menu/new-down-menu'
import {toChinesNum} from 'assets/js/getTime'
import {getConnect, getMemberAdvancedSearchPreposition, getAdvancedSearchInclude, getMemberType} from 'assets/js/analysis'
const dataList = require('./data.js')
export default {
  components: {
    newDownMenu
  },
  props: ['userList', 'initAdvanced'],
  data () {
    return {
      filterCondition: {
        gradeName: ''
      },
      advancedSearchPreposition: dataList.memberAdvancedSearchPreposition,
      advancedSearchInclude: dataList.advancedSearchInclude,
      connectList: dataList.connectList,
      memberTypeList: dataList.memberTypeList,
      showList: [
        {
          choiceCondition: '1',
          frontCondition: '1',
          connect: '1',
          afterCondition: '', // 后置条件
        },
        {
          choiceCondition: '1',
          frontCondition: '1',
          connect: '1',
          afterCondition: '', // 后置条件
        }
      ]
    }
  },
  created () {
    if (this.initAdvanced.length) {
      this.showList = this.initAdvanced
    }
  },
  watch: {
    initAdvanced () {
      this.showList = this.initAdvanced
    }
  },
  methods: {
    reset () {
      for (let i of this.showList) {
        i.choiceCondition = '1'
        i.frontCondition = '1'
        i.afterCondition = ''
        i.connect = '1'
      }
      this.update()
    },
    // 添加数据
    addData () {
      let datas = [
        {
              choiceCondition: '1',
              frontCondition: '1',
              connect: '1',
              afterCondition: '', // 后置条件
            },
            {
              choiceCondition: '1',
              frontCondition: '1',
              connect: '1',
              afterCondition: '', // 后置条件
            }]
      this.showList.push(...datas)
    },
    // 删除数据
    delData (index) {
      this.showList.splice(index, 2)
      // if (this.showList.length) {
      //   delete this.showList[this.showList.length -1 ].connect
      // }
    },
    _toChinesNum (parm) {
      return toChinesNum(parm)
    },
    _getConnect(parm) {
      return getConnect(parm)
    },
    _getMemberAdvancedSearchPreposition (parm) {
      return getMemberAdvancedSearchPreposition(parm)
    },
    _getAdvancedSearchInclude(parm) {
      return getAdvancedSearchInclude(parm)
    },
    _getMemberType (parm) {
      return getMemberType(parm)
    },
    filterSelect(parm) {
      if (parm == '10') {
        return this.userList
      }
      if (parm == '11') {
        return this.memberTypeList
      }
      if (parm == '12') {
        return this.memberGradeList
      }
      return []
    },
    // 过滤显示当前的类型-时间
    currentTime (parm) {
      let datas = ['1', '6']
      if (datas.includes(parm)) {
        return true
      }
      return false
    },
    // 过滤显示当前的类型-输入框
    currentInput (parm) {
      let datas = ['2', '3', '4', '5', '7', '8', '9']
      if (datas.includes(parm)) {
        return true
      }
      return false
    },
    // 过滤显示当前的类型-下拉框
    currentSelect (parm) {
      let datas = ['10', '11', '12']
      if (datas.includes(parm)) {
        return true
      }
      return false
    },
    changeFrontCondition (parm) {
      this.showList[parm.index].frontCondition = parm.id
      this.showList[parm.index].afterCondition = ''
      this.update()
    },
    changeConnect (parm) {
      debugger
      this.$set(this.showList[parm.index], 'connect', parm.id)
      debugger
      console.log(this.showList[parm.index])
    },
    changeAfterCondition (parm) {
      this.showList[parm.index].afterCondition = parm.id
      this.update()
    },
    clearAfterCondition (parm) {
      this.showList[parm.index].afterCondition = ''
      this.update()
    },
    changeChoiceCondition (parm) {
      this.showList[parm.index].choiceCondition = parm.id
      this.update()
    },
    setCompleteTime () {

    },
    update (parm) {
      // 数据源，operation --> 是否二次操作
      this.$emit('update', {datas: this.showList, operation: parm})
    }
  }
}
</script>
<style lang="scss">
.m-m-advanced-search{
  position: relative;
  min-height: 30px;
  .item-wrap{
    position: relative;
    // display: inline-block;
    // vertical-align: top;
    // width: 587px;
  }
  .item-box{
    position: relative;
    margin-bottom: 15px;
    height: 30px;
    
    font-size: 0;
    .h-tit{
      font-size: 14px;
      margin-right: 30px;
    }
    .small-input{
      width: 130px;
      height: 28px;
      margin-left: 10px;
    }
    >i{
      font-size: 28px;
      position: absolute;
      right: 0;
      top: 0;
      color: #2993f8;
      cursor: pointer;
    }
    .del-right{
      top: 0;
      right: 0;
      color: red;
    }
  }
  .w-70{
    width: 70px;
  }
  .w-130{
    width: 70px;
  }
  input {
    height: 28px;
    background-color: transparent;
    font-size: 14px;
    padding-left: 10px;
    border-radius: 3px;
    border: 1px solid #dedede;
    &:active,
    &:hover,
    &:focus {
      border: 1px solid #2993f8;
      background-color: #f4f9ff;
    }
  }
  .el-input__icon+.el-input__inner{
    padding-right: 10px;
  }
  // 时间
  .el-date-editor.el-input {
    width: 130px;
    border-radius: 3px; // border: 1px solid #dedede;
    .el-input__icon {
      display: none;
    }
  }
  >i{
    font-size: 28px;
    position: absolute;
    right: 0;
    top: 0;
    color: #2993f8;
    cursor: pointer;
  }
  .del-right{
    top: 40px;
    color: red;
  }
}
</style>