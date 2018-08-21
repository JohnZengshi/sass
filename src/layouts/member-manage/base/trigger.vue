<!-- 触发条件 -->
<template>
    <div class="m-m-b-trigger-main">
        <el-radio-group v-model="addData.eventType" @change="seteventType">
            <div class="trigger-box-item">
                <div class="trigger-item-left">
                  <el-radio :label="'1'">时间触发</el-radio>
                </div>

                <newDownMenu
                  ref="checkedProfessionBox"
                  class="new-down-menu-box trigger-item"
                  :titleInfo="_getTimeType(addData.triggerTimeType) || '选择触发周期'"
                  :showList="triggerTimeTypeList"
                  :noClear="true"
                  :keep="true"
                  :disabled="addData.eventType != 1"
                  @changeData="changetriggerTimeType"
                ></newDownMenu>

                <div class="all-time" v-if="addData.triggerTimeType == 1">
                  <el-date-picker :disabled="addData.eventType != 1" format="MM月dd日" class="yearTimeBoxT" popper-class="yearTimeBox" @change="setstartingDate" v-model="addData.startingDate" type="date" placeholder="选择日期时间">
                  </el-date-picker>
                </div>
                
                <div class="all-time" v-if="addData.triggerTimeType == 2">
                  <el-date-picker :disabled="addData.eventType != 1" format="dd日" class="yearTimeBoxT" popper-class="yearTimeBox" @change="setstartingDate" v-model="addData.startingDate" type="date" placeholder="选择日期时间">
                  </el-date-picker>
                </div>

                
                <newDownMenu
                  v-if="addData.triggerTimeType == 3"
                  ref="checkedProfessionBox"
                  class="new-down-menu-box trigger-item all-time"
                  :disabled="addData.eventType != 1"
                  :titleInfo="_getWeekTime(addData.startingDate) || '请选择星期'"
                  :showList="weekList"
                  :noClear="true"
                  :keep="true"
                  @changeData="changeWeek"
                ></newDownMenu>

            </div>
            <div class="trigger-box-item">

                <div class="trigger-item-left">
                  <el-radio :label="'2'">事件触发</el-radio>
                </div>

                <newDownMenu
                  ref="checkedProfessionBox"
                  class="new-down-menu-box trigger-item"
                  :disabled="addData.eventType != 2"
                  :titleInfo="_getTriggerRule(addData.triggerRule) || '触发事件'"
                  :showList="triggerRuleList"
                  :noClear="true"
                  :keep="true"
                  @changeData="changeTriggerRule"
                ></newDownMenu>

                <newDownMenu
                  ref="checkedProfessionBox"
                  class="new-down-menu-box trigger-item"
                  :disabled="addData.eventType != 2"
                  :titleInfo="_getTriggerTime(addData.triggerTime) || '触发时间'"
                  :showList="triggerTimeList"
                  :noClear="true"
                  :keep="true"
                  @changeData="changeTriggerTime"
                ></newDownMenu>

                <input
                  @blur="amendStartingDay"
                  :disabled="addData.eventType != 2"
                  class="trigger-item xj-input"
                  :class="{'disabled-bg': addData.eventType != 2}"
                  placeholder="请输入天数"
                  maxlength="6"
                  v-model="addData.startingDay"
                >
            </div>
        </el-radio-group>
    </div>
</template>
<script>
import newDownMenu from 'base/menu/new-down-menu'
import { getTimeType, getTriggerRule, getTriggerTime, getWeekTime } from 'assets/js/analysis'
let dataSource = require('./data.js')
export default {
    components: {
      newDownMenu
    },
    data() {
        return {
            addData: {
                eventType: '', // 触发类型
                startingDay: '',
                triggerTimeTypeName: '',
                triggerTimeType: '',
                startingDate: '',
                triggerRule: '',
                triggerRuleName: '',
                triggerTime: '',
                triggerTimeName: '',
            },
            triggerRuleList: dataSource.triggerRuleList,
            triggerTimeList: dataSource.triggerTime,
            triggerTimeTypeList: dataSource.triggerCycleList,
            weekList: dataSource.weekList
        }
    },
    methods: {
        _getTriggerRule (parm) {
          return getTriggerRule(parm)
        },
        _getTimeType (parm) {
          return getTimeType(parm)
        },
        _getTriggerTime (parm) {
          return getTriggerTime(parm)
        },
        _getWeekTime (parm) {
          return getWeekTime(parm)
        },
        initData (parm) { // 初始化数据
          this.addData = parm
          // Object.assing(this.addData, parm)
        },
        changetriggerTimeType (parm) {
          this.addData.startingDate = ''
          this.addData.triggerTimeType = parm.id
          this.addData.triggerTimeTypeName = parm.name
          this.$emit('update', this.addData)
        },
        changeTriggerRule (parm) {
          this.addData.triggerRule = parm.id
          this.addData.triggerRuleName = parm.name
          this.$emit('update', this.addData)
        },
        changeTriggerTime (parm) {
          this.addData.triggerTime = parm.id
          this.addData.triggerTimeName = parm.name
          this.$emit('update', this.addData)
        },
        setstartingDate () {
          this.$emit('update', this.addData)
        },
        changeWeek (parm) {
          this.addData.startingDate = parm.id
        },
        amendStartingDay () {
          this.$emit('update', this.addData)
        },
        seteventType () {
          this.$emit('update', this.addData)
        }
    }
}

</script>
<style lang="scss">
.m-m-b-trigger-main {
    height: 130px;
    width: 500px;
    border: 1px solid #d6d6d6;
    border-radius: 5px;
    .trigger-box-item {
        height: 63px;
        padding: 15px 5px;
        .trigger-item-left{
          vertical-align: top;
          display: inline-block;
          height: 36px;
          width: 80px;
          padding-top: 10px;
        }
        .trigger-item {
            height: 36px;
            width: 120px;
            margin-left: 10px;
            .title-name {
                height: 36px;
                line-height: 36px;
            }
        }
        .all-time {
            display: inline-block;
            vertical-align: top;
            width: 250px;
            margin-left: 10px; // 时间
            .el-date-editor.el-input {
                width: 250px;
            }
        }
        .disabled-bg {
            background-color: #f1f2f3;
        } // 时间
        .el-date-editor.el-input {
            width: 120px;
        }
    }
}

</style>
<style lang="scss">
.yearTimeBox{
  .el-picker-panel__icon-btn{
    display: none;
  }
  .el-date-picker__header{
    span:first-of-type{
      display: none;
    }
  }
}
</style>