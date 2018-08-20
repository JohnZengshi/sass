<template>
<!--   <el-dialog :visible.sync="isShowDio" :modal="false" :close-on-click-modal="false" class="xj-input-dialog-bg"> -->
    <div v-loading="loading" element-loading-text="拼命加载中..." class="n-p-scroll-box">
      <div class="p-close-icon" @click="close">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </div>

      <div class="input-push-box">
        <h3>添加跟进</h3>
        <div class="scroll-box">
          <div class="member-item">
            <span class="item-label"><i class="mandatory-icon">*</i>跟进名称</span>
            <input placeholder="请输入" maxlength="6" v-model="addData.followName">
          </div>

          <div class="member-item">
            <span class="item-label"><i class="mandatory-icon">*</i>选择跟进人</span>
            <div class="right-wrap">
              <div class="select-left">
                <alone-drop-down-colums
                    class="select-box"
                    ref="principalNameBox"
                    :propsList="shopUserList"
                    :titleData="principalName ? principalName : '选择负者人'"
                    @dataBack="dataBackUser"
                ></alone-drop-down-colums>
                <div class="right-tit">
                  公共
                </div>
              </div>

              <div class="select-right">
                  <alone-drop-down-colums
                      class="select-box"
                      ref="allPrincipalNameBox"
                      :propsList="shopUserList"
                      :titleData="allPrincipalName ? allPrincipalName : '选择负者人'"
                      @dataBack="dataBackAllUser"
                  ></alone-drop-down-colums>
                  <div class="right-tit">
                    所有
                  </div>
              </div>
            </div>
          </div>

          <div class="member-item" v-if="checkData.bigClass.id == 2 || addData.followType == 2">
            <span class="item-label"><i class="mandatory-icon">*</i>触发条件</span>
            <trigger ref="triggerBox" @update="updateTrigger"></trigger>
          </div>

          <div class="member-item">
            <span class="item-label"><i class="mandatory-icon">*</i>计划完成时间</span>
            <el-date-picker v-model="addData.followTime" type="date" placeholder="选择日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setCompleteTime">
            </el-date-picker>
          </div>

          <div class="member-item">
            <span class="item-label"><i class="mandatory-icon">*</i>选择会员</span>
            <div class="right-wrap select-user-box" @click="selectUser">
              <p>{{userNameList}}</p>
              <div class="right-tit">
          <!--       <span>共100人</span> -->
                <i class="iconfont icon-lianxiren"></i>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="xj-btn-list">
        <div v-if="!followId" class="btn cnacel-btn" @click="close">返回上一级</div>
        <div class="btn" @click="confirm">确定</div>
      </div>
    </div>

<!--   </el-dialog> -->
</template>
<script>
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
import {groupName, groupIdList, extractIdList} from 'Api/commonality/filter'
import {operateFollowCreateByNew} from 'Api/commonality/operate'
import trigger from './../../base/trigger'
import newDownMenu from 'base/menu/new-down-menu'
import { formattingTime, GetNYR, restoreTime } from 'assets/js/getTime'
import { getTimeType, getTriggerRule } from 'assets/js/analysis'
import {seekFindMemberList} from 'Api/commonality/seek'
export default {
  props: ['shopId', 'userIdList', 'userNameList', 'checkData', 'shopUserList', 'followId'], // checkData --> 第一步选择的数据
  components: {
    aloneDropDownColums,
    newDownMenu,
    trigger
  },
  data () {
    return {
      loading: false,
      oldData: {}, // 初始值
      addData: {
        followType: '', // 触发类型
        followName: '',
        triggerCycleName: '',
        triggerCycle: '',
        completeTime: '',
        followTime: '', // 完成时间
      },
      stateList: [],
      principalName: '', // 公共负责人名字
      principalList: [], // 公共负责人列表
      allPrincipalName: '', // 所有负责人名字
      allPrincipalList: [], // 所有负责人列表
    }
  },
  methods: {
    updateTrigger (parm) {
      Object.assign(this.addData, parm)
    },
    // open () {
    //   if (this.followId) {
    //     this._seekFindMemberList()
    //   }
    // },
    close () {
      this.$emit('close')
    },
    selectUser () {
      this.$emit('selectUser')
    },
    confirm () {

      if (!this.addData.followName) {
        this.$message({type: 'warning',message: '请输入跟进名称'})
        return
      }
      if (!this.principalList.length) {
        this.$message({type: 'warning',message: '请选择公共负责人'})
        return
      }
      if (!this.allPrincipalList.length) {
        this.$message({type: 'warning',message: '请选择所有负责人'})
        return
      }
      if (!this.userIdList.length) {
        this.$message({type: 'warning',message: '请选择会员'})
        return
      }
      // 触发跟进
      if (this.checkData.bigClass.id == 2) {
        if (!this.addData.eventType) {
          this.$message({type: 'warning',message: '请选择触发条件'})
          return
        } else if (!this.addData.eventType == 1) { // 时间触发
          if (!this.addData.triggerCycle) {
            this.$message({type: 'warning',message: '请选择触发周期'})
            return
          } else if (!this.addData.completeTime){
              this.$message({type: 'warning',message: '请选择触发时间'})
              return
          }
        } else if (!this.addData.eventType == 2) { // 触发事件

        }

      }

      if (!this.followId) {
        this._operateFollowCreateByNew()
      } else {
        this._operateFollowUpdateByNew()
      }
    },
    // 新建
    _operateFollowCreateByNew () {
      let options = {
        shopId: this.shopId,
        followName: this.addData.followName,
        principalList: groupIdList(this.principalList, 'principalId'), // 公共负责人
        allPrincipalList: groupIdList(this.allPrincipalList, 'principalId'), // 所有负责人
        completeTime: formattingTime(this.addData.completeTime), // 完成时间
        followType: this.checkData.bigClass.id, // 跟进类型
        triggerRule: this.checkData.smallClass.id, // 触发事件
        dataList: groupIdList(this.userIdList, 'memberId') // 会员
      }
      operateFollowCreateByNew(options)
        .then(res => {
          if (res.data.state == 200) {

            this.$message({type: 'success', message: '创建成功'})

            this.$router.push({
              path: '/membermanage/followUpList',
              query: {
                shopId: this.shopId
              }  
            })

          } else {
            this.$message({type: 'error', message: res.data.msg})
          }
        })
    },
    // 修改
    _operateFollowUpdateByNew () {
      let options = {
        followId: this.followId,
        shopId: this.shopId
      }
      // 修改的数据
      let amendData = this.filterAmendData()
      if (!Object.keys(amendData).length) {
        this.close()
      }
      operateFollowCreateByNew(Object.assign({}, options, amendData))
        .then(res => {
          if (res.data.state == 200) {
            this.$message({type: 'success', message: '修改成功'})
            this.close()
          } else {
            this.$message({type: 'error', message: res.data.msg})
          }
        })
    },
    // 提取修改的值
    filterAmendData () {
      let amendData = {}
      /* 判断跟进名 */
      if (this.oldData.followName != this.addData.followName) {
        amendData.followName = this.addData.followName
      }

      /* 公共跟进人 */
      let amendPrincipalList = differenceData(extractIdList(this.oldData.principalList), this.principalList)
      if (amendPrincipalList.one.length || amendPrincipalList.two.length) {
        amendData.principalList = groupIdList(this.principalList, 'principalId')
      }

      /* 所有跟进人 */
      let amendAllPrincipalList = differenceData(extractIdList(this.oldData.allPrincipalList), this.allPrincipalList)
      if (amendAllPrincipalList.one.length || amendAllPrincipalList.two.length) {
        amendData.allPrincipalList = groupIdList(this.principalList, 'principalId')
      }

      /* 会员 */
      let amendDataList = differenceData(extractIdList(this.oldData.dataList), this.userIdList)
      if (amendDataList.one.length || amendDataList.two.length) {
        amendData.dataList = groupIdList(this.userIdList, 'memberId')
      }

      // 跟进类型
      if (this.addData.followType == 2) {
        /* 触发条件 */
        if (this.addData.eventType != this.oldData.eventType) { // 有改动

          amendData.eventType = this.addData.eventType

          if (this.addData.eventType == 1) { // 时间
            // 时间触发类型
            amendData.triggerTimeType = this.addData.triggerTimeType
            // 年月日类型的时间
            amendData.completeTime = this.addData.completeTime
          } else if (this.addData.eventType == 2) { // 事件
            // 触发事件
            amendData.triggerRule = this.addData.triggerTimeType
            // 触发事件时间
            amendData.triggerTime = this.addData.triggerTime
            // 触发事件天数
            amendData.startingDay = this.addData.startingDay
          }
        } else { // 无改动
            // 时间触发类型
            if (this.addData.eventType == 1) { // 时间
              let one = this.oldData.triggerTimeType != this.addData.triggerTimeType
              let two = this.oldData.completeTime != this.addData.completeTime
              if (one || two) {
                  amendData.eventType = this.addData.eventType
                  // 时间触发类型
                  amendData.triggerTimeType = this.addData.triggerTimeType
                  // 年月日类型的时间
                  amendData.completeTime = this.addData.completeTime
              }
            } else if (this.addData.eventType == 2) { // 事件
              let one = this.oldData.triggerRule != this.addData.triggerRule
              let two = this.oldData.triggerTime != this.addData.triggerTime
              let three = this.oldData.startingDay != this.addData.startingDay
              if (one || two || three) {
                amendData.eventType = this.addData.eventType
                // 触发事件
                amendData.triggerRule = this.addData.triggerTimeType
                // 触发事件时间
                amendData.triggerTime = this.addData.triggerTime
                // 触发事件天数
                amendData.startingDay = this.addData.startingDay
              }
            }

            if (this.oldData.triggerTimeType != this.addData.triggerTimeType) {

            }
            amendData.triggerTimeType = this.addData.triggerTimeType
            // 年月日类型的时间
            amendData.completeTime = this.addData.completeTime
        }
      }
      return amendData
    },
    setCompleteTime () {

    },
    // 公共负责人
    dataBackUser (parm) {
      this.principalName = groupName(parm.itemList)
      this.principalList = parm.bigList
    },
    // 所有负责人
    dataBackAllUser (parm) {
      this.allPrincipalName = groupName(parm.itemList)
      this.allPrincipalList = parm.bigList
    },
    // 产品类别过滤
    dataBackProductTypeId (parm) {
      this.filterCondition.productStatus = parm.bigList
      this.$emit('filterData', this.filterCondition)
    },
    setFollowType () {

    },
    filterIdList () {

    },
    _seekFindMemberList () {
      let datas = {
        followName: 'followName',
        followType: '2',
        eventType: '1',
        dataList: [
          {
            memberId: '20ddd8ccb61346cea4ffffd105d3863c',
            memberName: '10000',
          }
        ],
        allPrincipalList: [
          {
            principalId: '20ddd8ccb61346cea4ffffd105d3863c',
            principalName: 'sad',
          }
        ],
        principalList: [
          {
            principalId: '20ddd8ccb61346cea4ffffd105d3863c',
            principalName: 'sad',
          }
        ],
        followTime: '20180814000000',
        triggerTimeType: '1',
        triggerRule: '1',
        triggerTime: '1',
      }
      this.oldData = _.cloneDeep(datas)
      datas.followTime = restoreTime(datas.followTime)
      this.addData = datas
      console.log('oldData')
      console.log('oldData', this.oldData)
      this.$emit('initLeaderData', datas.dataList)
      // this.userIdList = extractIdList(datas.dataList, 'memberId')
      this.principalList = extractIdList(datas.principalList, 'principalId') // 公共负责人
      this.allPrincipalList = extractIdList(datas.allPrincipalList, 'principalId') // 所有负责人
      this.principalName = groupName(datas.principalList, 'principalName') // 显示
      this.allPrincipalName = groupName(datas.allPrincipalList, 'principalName') // 显示
      this.initSelect()
      // this.loading = true
      seekFindMemberList({followId: this.followId})
        .then(res => {
          if (res.data.state == 200) {
            // let datas = {
            //   dataList: [
            //     {
            //       memberId: '10000',
            //       memberName: '10000',
            //     }
            //   ],
            //   allPrincipalList: [
            //     {
            //       principalId: '12',
            //       principalName: '12',
            //     }
            //   ],
            //   principalList: [
            //     {
            //       principalId: '123',
            //       principalName: '123',
            //     }
            //   ],
            //   followTime: '20180814000000'
            // }
            // this.addData.followTime = GetNYR(datas.maleBirthday)
            // this.userIdList = extractIdList(datas.dataList, 'memberId')
            // this.principalList = extractIdList(datas.dataList, 'principalId') // 公共负责人
            // this.allPrincipalList = extractIdList(datas.dataList, 'principalId') // 所有负责人
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
          this.loading = false
        })
    },
    // 初始化下拉框数据
    initSelect () {
      setTimeout(() => {
        this.$refs.principalNameBox.initData(this.principalList)
        this.$refs.allPrincipalNameBox.initData(this.allPrincipalList)
        this.$refs.triggerBox.initData(this.addData)
      }, 0)
    }
  }
}
</script>
<style lang="scss">
.input-push-box {
  height: 660px;
  .alone-drop-down-colums-main{
    .tltle{
      font-weight: normal;
      &.actions{
        color: #666;
      }
    }
  }
  >h3 {
    line-height: 1;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
  }
  .scroll-box {
    height: 610px;
    width: 100%;
    white-space: nowrap;
  }

  .member-item {
    margin-bottom: 34px;
    display: flex;
    .item-label {
      display: inline-block;
      vertical-align: top;
      width: 100px;
      height: 36px;
      line-height: 36px;
    }
    .right-wrap {
      flex: 1;
      position: relative;
      height: 36px;
      display: inline-block;
      .show-tit{
        line-height: 36px;
      }
      .new-down-menu-box {
        width: 182px;
      }
      .card-img {
        width: 80px;
        height: 60px;
        position: absolute;
        top: -56px;
        left: 0;
        display: none;
        background: #f6f6f6;
      }
      .uploading-img-box {
        display: inline-block;
        color: #2993f8;
        width: 50px;
        cursor: pointer;
        span {
          text-decoration: underline;
          line-height: 34px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .card:hover+.card-img {
        display: block;
      }
      .click-select-wrap {
        position: absolute;
        opacity: 0;
        top: 50px;
        left: 0px;
        z-index: -1;
        width: 160px;
        height: 200px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all .3s;
        overflow-y: auto;
        &.active {
          z-index: 10;
          top: 30px;
          opacity: 1;
        }
        li {
          line-height: 40px;
          height: 40px;
          margin: 0;
          padding-left: 20px;
          cursor: pointer;
        }
        li:hover {
          background: #f1f2f3;
        }
        li.active {
          color: #2993f8;
        }
      }
      .chose-user-box {
        border-radius: 3px;
        width: 120px;
        padding-left: 10px;
        border: 1px solid #dedede;
        margin: 0;
        .tltle {
          color: #757575!important;
          font-weight: normal;
          font-size: 14px;
        }
        .list-box {
          left: 0;
        }
      }
  
      .select-left, .select-right{
        width: 260px;
        height: 36px;
        border-radius: 3px;
        display: flex;
        .select-box{
          flex: 1;
          .tltle{
            line-height: 36px;
            >i{
              line-height: 36px;
            }
          }
          .list-box{
            left: 0;
          }
        }
        .right-tit{
          width: 40px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          fotn-size: 14px;
          background-color: #f4f5f4;
        }
      }

      .select-left{
        float: left;
        border: 1px solid #d6d6d6;
      }
      .select-right{
        float: right;
        border: 1px solid #d6d6d6;
      }
    }
    .select-user-box{
      border-radius: 3px;
      border: 1px solid #d6d6d6;
      cursor: pointer;
      >p{
       flex: 1;
       width: 458px;
       overflow: hidden;
       float: left;
       height: 36px;
       padding-left: 10px;
       line-height: 36px;
      }
      >.right-tit{
        float: right;
        height: 36px;
        line-height: 36px;
        text-align: center;
        width: 80px;
        // span{
        //   background-color: #d6d6d6;
        //   color: #fff;
        // }
        >i{
          float: right;
          color: #2993f8;
          margin-right: 5px;
        }
      }
    }
    .trigger-box{
      height: 130px;
      width: 500px;
      border: 1px solid #d6d6d6;
      border-radius: 5px;
      .trigger-box-item{
        margin: 20px;
        .all-time{
          display: inline-block;
          width: 250px;
          margin-left: 10px;
          // 时间
          .el-date-editor.el-input {
            width: 250px;
          }
        }
        .trigger-item{
          height: 36px;
          width: 120px;
          margin-left: 10px;
          .title-name{
            height: 36px;
            line-height: 36px;
          }
        }
        .input-bg{
          background-color: #f1f2f3;
          .title-name{
            background-color: #f1f2f3;
          }
        }
        // 时间
        .el-date-editor.el-input {
          width: 120px;
        }
        
      }

    }
    >input{
      flex: 1;
    }
    input {
      height: 36px;
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
    // 时间
    .el-date-editor.el-input {
      width: 182px;
      border-radius: 3px; // border: 1px solid #dedede;
      .el-input__icon {
        display: none;
      }
    }
  }
}
</style>