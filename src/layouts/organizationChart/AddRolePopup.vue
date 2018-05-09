<template>
  <div class="dialog-w320-h400-hn add-role-popup-main">
    <el-dialog title="选择产品类型" v-model="saveSuccess">
      <i class="close-icon" @click="close"></i>
      <div class="body-wrap">
        <div class="logo-wrap">
          <img src="./../../assets/img/permissions-icon.png" alt="">
          <p>权限分配</p>
        </div>
        <div class="btn-wrap">
          <ul>
            <li v-for="(item,index) in roleDataList" :key="index" :class="{actions: actionsList.includes(item.applyId)}" @click="changeRole(item)">{{item.applyName}}</li>
          </ul>
        </div>
      </div>
      <span slot="footer">
        <a href="javascript: void(0)" class="confirm-btn" @click="affirmFun">完 成</a>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {operateOperateApplyByUserId} from 'Api/commonality/operate'
  export default {
    props: ['isQueryOption', 'roleDataList', 'userDataInfo', 'userRoleDataList'],
    data () {
      return {
        saveSuccess: false,
        actionsList: []
      }
    },
    watch: {
      'isQueryOption': function () {
        this.saveSuccess = this.isQueryOption;
      },
      'saveSuccess': function () {
        if (!this.saveSuccess) {
          this.close()
        }
      },
      // 'roleDataList': function () {
      //   let arr = []
      //   console.log(this.userRoleDataList)
      //   this.roleDataList.forEach((item, index) => {
      //     console.log(item)
      //     if (this.userRoleDataList.includes(item)) {
      //       console.log("重复了！")
      //       console.log(item.applyId)
      //     } else {
      //       arr.push(item)
      //     }
      //   })
      //   console.log(arr)
      // }
    },
    methods: {
      close () {
        this.$emit('queryOptionFun', false)
      },
      affirmFun () {
        let applyList = []
        for (let i of this.actionsList) {
          let Obj = {
            applyId: i,
            operateType: '1'
          }
          applyList.push(Obj)
        }
        let options = {
          applyList: applyList,
          userId: this.userDataInfo.userId
        }
        operateOperateApplyByUserId(options)
          .then(res => {
            if (res.data.state == 200) {
              this.actionsList = []
              this.$emit('queryOptionFun', false)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      changeRole (parm) { // 选择权限
        let Num = this.actionsList.indexOf(parm.applyId)
        if ( Num === -1 ) {
          this.actionsList.push(parm.applyId)
        } else {
          this.actionsList.splice(Num)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "~assets/css/color.scss";
.add-role-popup-main{
  position: relative;
  width: 100%;
  height: 100%;
  .close-icon{
    position: absolute;
    top: 14px;
    right: 14px;
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('./../../assets/img/close-preview.png') no-repeat;
    background-size: 15px;
    cursor: pointer;
  }
  .body-wrap{
    .logo-wrap{
      width: 150px;
      margin: auto;
      img{
        display: block;
        width: 46px;
        height: 46px;
        margin: auto;
        border-radius: 50%;
        margin-top: 24px;
      }
      p{
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        margin-top: 14px;
      }
    }
    .btn-wrap{
      width: 100%;
      height: 190px;
      margin-top: 30px;
      overflow: auto;
    }
    ul{
      margin-left: 40px;
      font-size: 0;
      li{
        display: inline-block;
        font-size: 12px;
        margin: 0 20px 16px 0;
        width: 66px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: $bg-100;
        border-radius: 2px;
        color: $font-color-normal;
        vertical-align: top;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #f4f5f6;
      }
      li:nth-child(3n+0) {
        margin: 0 0 16px 0;
      }
      .actions{
        color: #fff;
        background-color: $main-color;
      }
    }
  }
  .confirm-btn{
    display: inline-block;
    width: 150px;
    height: 28px;
    line-height: 28px;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    background-color: $main-color;
  }
}
</style>
