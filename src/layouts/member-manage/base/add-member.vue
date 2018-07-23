<template>
  <el-dialog top="7%" :visible.sync="isDialog" class="xj-input-dialog">
    <div class="m-m-add-member-main">
      <div class="p-close-icon" @click="isDialog = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </div>
      <div class="add-member-body">
        <h3>添加会员</h3>
        <div class="member-edit">
          <h4>基本信息</h4>
          <div class="member-edit-info">
            <div class="item">
              <span class="item-label"><i class="mandatory-icon">*</i>性名</span>
              <input :disabled="!isShopMan" maxlength="6" v-model="dataInfo.username" @blur="setEmail">
            </div>
            <div class="item">
              <span class="item-label"><i class="mandatory-icon">*</i>手机号</span>
              <input type="Number" :disabled="!isShopMan" v-model="dataInfo.phone" @blur="setEmail">
            </div>
            <div class="item">
              <span class="item-label">备注名</span>
              <input maxlength="6" placeholder="仅内部人员可查看" :disabled="!isShopMan" v-model="dataInfo.name" @blur="setEmail">
            </div>
            <div class="item">
              <span class="item-label"><i class="mandatory-icon">*</i>性别</span>
              <div class="right-wrap radio-20">
                <el-radio-group v-model="dataInfo.sex" @change="setSex" :disabled="!isShopMan">
                  <el-radio :label="'1'">男</el-radio>
                  <el-radio :label="'2'">女</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="item">
              <span class="item-label">生日</span>
              <el-date-picker v-model="dataInfo.birthday" type="date" placeholder="选择日期" :disabled="!isShopMan" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setBirthday">
              </el-date-picker>

              <span class="item-label"></span>
              <el-date-picker v-model="dataInfo.maleBirthday" type="date" placeholder="选择日期" :disabled="!isShopMan" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setBirthday">
              </el-date-picker>
            </div>
            <div class="item">
              <span class="item-label">负责人</span>
              <div class="right-wrap">
                <alone-drop-down-colums ref="stateWrap" :propsList="userList" titleData="负责人" @dataBack="choseUser"></alone-drop-down-colums>
                <!-- <input @click="isShowInd = !isShowInd" v-model="dataInfo.principalList" class="inp" type="text" placeholder="选择负责人">
                <ul class="click-select-wrap" :class="{active: isShowInd}">
                    <li @click="choseGrade(item)" :class="{active:dataInfo.industry == item.inName}" v-for="(item, index) in industryList" :key="index">{{item.inName}}</li>
                </ul> -->
              </div>
            </div>
          </div>
        </div>
        <div class="member-edit">
          <h4>其它信息</h4>
          <div class="member-edit-info">
            <div class="item">
              <span class="item-label">会员等级</span>
              <div class="right-wrap">
                <input @click="isGrade = !isGrade" v-model="dataInfo.gradeName" class="inp" type="text" placeholder="选择会员等级">
                <ul class="click-select-wrap" :class="{active: isGrade}">
                  <li @click="choseGrade(item)" :class="{active:dataInfo.grade == item.id}" v-for="(item, index) in gradeList" :key="index">{{item.name}}</li>
                </ul>
              </div>
            </div>
            <div class="item">
              <span class="item-label">会员类型</span>
              <div class="right-wrap">
                <input @click="isType = !isType" v-model="dataInfo.typeName" class="inp" type="text" placeholder="选择会员等级">
                <ul class="click-select-wrap" :class="{active: isType}">
                  <li @click="choseType(item)" :class="{active:dataInfo.type == item.id}" v-for="(item, index) in typeList" :key="index">{{item.name}}</li>
                </ul>
              </div>
            </div>
            <div class="item">
              <span class="item-label">纪念日</span>
              <el-date-picker v-model="dataInfo.memorial" type="date" placeholder="选择日期" :disabled="!isShopMan" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setBirthday">
              </el-date-picker>
            </div>
            <div class="member-edit-bq">
              <div class="title fl">标签</div>
              <div class="bq-item-wrap fl">
                <div class="bq-item fl" v-for="(item,index) in dataInfo.signList" :key="index">
                  <i v-if="isShopMan" @click.stop="delLabel(item, index)" class="iconfont icon-guanbi-copy"></i> {{item.signName}}
                </div>
                <input @blur="followCreateSign" :disabled="!isShopMan" v-model="signName" type="text" placeholder="添加标签" maxlength="8" class="bq-add fl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="xj-btn-list">
        <div class="btn cnacel-btn" @click="cancel">取消</div>
        <div class="btn" v-if="isShopMan" @click="confirm">确定</div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { operateFollowCreateSign, operateMemberCreate, operateMemberUpdateBy, operateMemberOperation, operateOpIntention,operateAddMember } from 'Api/commonality/operate'
import { seekGetShopUserList } from 'Api/commonality/seek'
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
import {formattingTime} from 'assets/js/getTime'

export default {
  components: {
    aloneDropDownColums
  },
  props: ['shopId'],
  data() {
    return {
      dataInfo: {
        shopId: '',
        username: '',
        phone: '',
        name: '',
        sex: '',
        birthday: '',
        maleBirthday: '',
        principalList: [],
        grade: '',
        type: '',
        typeName: '',
        memorial: '',
        signList: []
      },
      isDialog: false,
      isShopMan: true, // 操作权限
      isShowInd: false,
      isGrade: false,
      isType: false,
      signName: '',
      gradeList: [{
          name: '普卡',
          id: '1'
        },
        {
          name: '银卡',
          id: '2'
        },
        {
          name: '金卡',
          id: '3'
        }
      ],
      typeList: [{
          id: '100',
          name: '789'
        },
        {
          id: '1000',
          name: '456'
        },
        {
          id: '10000',
          name: '222'
        },
        {
          id: '110',
          name: '789'
        },
        {
          id: '120',
          name: '456'
        },
        {
          id: '130',
          name: '222'
        }
      ],
      userList: []
      // dataInfo: {
      //   username: '',
      //   principalFlag: '',
      //   followTime: '',
      //   followStatus: '',
      //   followUserName: '',
      //   latelyBuyTime: '',
      //   latelyBuyNum: '',
      //   latelyBuyPrice: '',
      //   logo: '',
      //   memberName: '', // 名称
      //   memberNum: '',
      //   phone: '', // 手机号
      //   cardSrc: '', // 名片地址
      //   orderList: [],
      //   principalList: [], // 负责人列表
      //   birthday: '', // 生日
      //   email: '', // 邮箱
      //   wx: '', // 微信号
      //   industry: '', // 行业
      //   sex: '',
      //   provinceId: '',
      //   provinceName: '',
      //   cityId: '',
      //   cityName: '',
      //   areaId: '',
      //   areaName: '',
      //   address: '',
      //   remark: '',
      //   createTime: '',
      //   totalMoney: '',
      //   signList: [
      //     {
      //       signName: '132'
      //     },
      //     {
      //       signName: '132'
      //     },
      //     {
      //       signName: '132'
      //     },
      //     {
      //       signName: '132'
      //     },
      //     {
      //       signName: '132132132132132'
      //     },
      //     {
      //       signName: '132'
      //     },
      //     {
      //       signName: '132'
      //     },
      //     {
      //       signName: '132'
      //     }
      //   ]
      // }
    }
  },
  methods: {
    open() {
      this.isDialog = true
      this._seekGetShopUserList()
    },
    choseGrade(parm) {
      this.isGrade = false
      this.dataInfo.grade = parm.id
      this.dataInfo.gradeName = parm.name
    },
    choseType(parm) {
      this.isType = false
      this.dataInfo.type = parm.id
      this.dataInfo.typeName = parm.name
    },
    confirm() {
      this._operateAddMember()
    },
    cancel() {

    },
    choseUser(parm) {
      let datas = []
      for (let i of parm.bigList) {
        datas.push({
          userId: i
        })
      }
      this.dataInfo.principalList = datas
    },
    _seekGetShopUserList() {
      let options = {
        page: 1,
        pageSize: 0,
        shopId: this.shopId
      }
      seekGetShopUserList(options)
        .then(res => {
          if (res.data.state == 200) {
            let datas = res.data.data.shopUserList
            for (let i of datas) {
              i.name = i.userName
              i.id = i.userId
            }
            this.userList = datas
          }
        })
    },
    goBack() {

    },
    // 修改标签,创建标签
    followCreateSign() {
      // 创建标签判断
      if (this.dataInfo.signList.length > 9) {
        this.$message({
          type: 'warning',
          message: '标签上限为十个'
        })
        return
      }
      let options = {
        shopId: this.shopId,
        signName: this.signName
      }
      operateFollowCreateSign(options).then((res) => {
        if (res.data.state == 200) {
          this.dataInfo.signList.push({
            signName: this.signName,
            signId: res.data.data.signId
          })
          this.signName = ''

          let orderList = []
          if (this.dataInfo.orderList.length != 0) {
            this.dataInfo.orderList.forEach((item, index) => {
              orderList[index] = { orderNo: item.orderNum }
            })
          }

          let optionsdata = Object.assign({}, this.dataInfo, {
            memberId: this.memberId,
            shopId: this.shopId,
            orderList,
            birthday: this.birthday
          })

          operateMemberUpdateBy(optionsdata).then(res => {
            if (res.data.state === 200) {
              // this.$message({
              //     type: 'success',
              //     message: '添加标签成功'
              // })
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })

        }
      })
    },
    // 删除标签
    delLabel(item, index) {
      this.dataInfo.signList.splice(index, 1)

      let orderList = []
      if (this.dataInfo.orderList.length != 0) {
        this.dataInfo.orderList.forEach((item, index) => {
          orderList[index] = { orderNo: item.orderNum }
        })
      }

      // 生日的时间格式

      let optionsdata = Object.assign({}, this.dataInfo, {
        memberId: this.memberId,
        shopId: this.shopId,
        orderList,
        birthday: this.birthday

      })

      operateMemberUpdateBy(optionsdata).then(res => {
        if (res.data.state === 200) {
          this.$message({
            type: 'success',
            message: '删除标签成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除标签失败'
          })
        }
      })
    },
    // 修改邮箱
    setEmail() {
      // 判断邮箱
      if (this.dataInfo.email && this.dataInfo.email.search(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) == -1) {
        this.$message({
          type: 'warning',
          message: '请输入正确的邮箱'
        })
        return
      }
      let orderList = []
      if (this.dataInfo.orderList.length != 0) {
        this.dataInfo.orderList.forEach((item, index) => {
          orderList[index] = { orderNo: item.orderNum }
        })
      }

      // 生日的时间格式
      // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

      let options = Object.assign({}, this.dataInfo, {
        memberId: this.memberId,
        shopId: this.shopId,
        orderList,
        birthday: this.birthday

      })
      operateMemberUpdateBy(options).then(res => {
        console.log(res.data.state)
        if (res.data.state === 200) {

        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 修改备注
    setRemark() {
      let orderList = []
      if (this.dataInfo.orderList.length != 0) {
        this.dataInfo.orderList.forEach((item, index) => {
          orderList[index] = { orderNo: item.orderNum }
        })
      }

      // 生日的时间格式
      // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

      let options = Object.assign({}, this.dataInfo, {
        memberId: this.memberId,
        shopId: this.shopId,
        orderList,
        birthday: this.birthday

      })
      operateMemberUpdateBy(options).then(res => {
        console.log(res.data.state)
        if (res.data.state === 200) {
          // this.$message({
          //     type: 'success',
          //     message: '修改备注成功'
          // })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 删除标签
    delLabel(item, index) {
      this.dataInfo.signList.splice(index, 1)

      let orderList = []
      if (this.dataInfo.orderList.length != 0) {
        this.dataInfo.orderList.forEach((item, index) => {
          orderList[index] = { orderNo: item.orderNum }
        })
      }

      // 生日的时间格式

      let optionsdata = Object.assign({}, this.dataInfo, {
        memberId: this.memberId,
        shopId: this.shopId,
        orderList,
        birthday: this.birthday

      })

      operateMemberUpdateBy(optionsdata).then(res => {
        if (res.data.state === 200) {
          this.$message({
            type: 'success',
            message: '删除标签成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除标签失败'
          })
        }
      })
    },
    // 修改生日
    setBirthday(val) {
      // let orderList = []
      // if (this.dataInfo.orderList.length != 0) {
      //   this.dataInfo.orderList.forEach((item, index) => {
      //     orderList[index] = { orderNo: item.orderNum }
      //   })
      // }
      // // this.dataInfo.birthday = val
      // this.birthday = this.timeFormat(val)

      // console.log(this.dataInfo.birthday)
      // let options = Object.assign({}, this.dataInfo, {
      //   memberId: this.memberId,
      //   shopId: this.shopId,
      //   birthday: this.timeFormat(val),
      //   orderList
      // })
      // operateMemberUpdateBy(options).then(res => {
      //   console.log(res.data.state)
      //   if (res.data.state === 200) {

      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: res.data.msg
      //     })
      //   }
      // })
    },
    // 格式化日期
    timeFormat(parm) {

      if (parm) {
        let year = parm.substring(0, 4)
        let month = parm.substring(5, 7)
        let data = parm.substring(8, 10)
        return year + month + data + '000000'
      }
    },
    // 修改姓名
    setUsername() {

      let orderList = []
      if (this.dataInfo.orderList.length != 0) {
        this.dataInfo.orderList.forEach((item, index) => {
          orderList[index] = { orderNo: item.orderNum }
        })
      }

      // console.log(this.dataInfo)
      // 生日的时间格式
      // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

      let options = Object.assign({}, this.dataInfo, {
        memberId: this.memberId,
        shopId: this.shopId,
        birthday: this.birthday,
        orderList
      })
      console.log(options)
      operateMemberUpdateBy(options).then(res => {
        console.log(res.data.state)
        if (res.data.state === 200) {

        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 修改性别
    setSex() {
      // 生日的时间格式
      // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)
      // let orderList = []
      // if (this.dataInfo.orderList.length != 0) {
      //   this.dataInfo.orderList.forEach((item, index) => {
      //     orderList[index] = { orderNo: item.orderNum }
      //   })
      // }

      // let options = Object.assign({}, this.dataInfo, {
      //   memberId: this.memberId,
      //   shopId: this.shopId,
      //   birthday: this.birthday,
      //   orderList

      // })
      // console.log(options)
      // operateMemberUpdateBy(options).then(res => {
      //   console.log(res.data.state)
      //   if (res.data.state === 200) {

      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: res.data.msg
      //     })
      //   }
      // })
    },
    // 格式化获取的时间
    formatData(parm) {

      if (parm) {
        let year = parm.substring(0, 4)
        let month = parm.substring(4, 6)
        let data = parm.substring(6, 8)
        return year + '-' + month + '-' + data
      }
    },
    // 新增会员
    _operateAddMember () {
      if (this.dataInfo.username) {
          this.$message({
            type: 'error',
            message: '请输入姓名'
          })
          return
      }

      if (this.dataInfo.phone) {
          this.$message({
            type: 'error',
            message: '请输入手机号'
          })
          return
      }

      if (this.dataInfo.sex) {
          this.$message({
            type: 'error',
            message: '请选择性别'
          })
          return
      }

      let options = _.cloneDeep(this.dataInfo)
      options.birthday = formattingTime(options.birthday)
      options.maleBirthday = formattingTime(options.maleBirthday)
      options.memorial = formattingTime(options.memorial)
      operateAddMember(options)
        .then(res => {

        })
    }
  }
}

</script>
<style lang="scss" scoped>
.m-m-add-member-main {
  height: 100%;
  width: 700px;
  height: 730px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 30px;
  position: relative;
  .mandatory-icon {
    color: red;
  }
  .add-member-body {
    height: 660px;
    >h3 {
      line-height: 1;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #333;
    }
  }
  .p-close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 20px;
    width: 20px;
    cursor: pointer;
    >i {
      color: #bfcbd9;
    }
  }
  .member-edit {
    margin-bottom: 20px;
    h4 {
      padding-left: 8px;
      position: relative;
      margin-bottom: 28px;
      color: #2993f8;
      &::before {
        content: '';
        display: inline-block;
        width: 2px;
        height: 14px;
        background: #2993f8;
        position: absolute;
        top: 3px;
        left: 0;
      }
    }
    .member-edit-info {
      padding: 0 8px;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 48%;
        margin-bottom: 34px;
        .item-label {
          display: inline-block;
          vertical-align: top;
          width: 80px;
          height: 28px;
          line-height: 28px;
        }
        .right-wrap {
          position: relative;
          height: 28px;
          display: inline-block;
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
        }
        input {
          height: 28px;
          background-color: transparent;
          font-size: 14px;
          padding-left: 10px;
          border-radius: 3px;
          &:active,
          &:hover,
          &:focus {
            border: 1px solid #2993f8;
            background-color: #f4f9ff;
          }
        }
        .el-date-editor.el-input {
          width: 172px;
          .el-input__icon {
            display: none;
          }
        } // .bq-item {
        //   // width: 86px;
        //   padding: 0 10px;
        //   height: 26px;
        //   margin-right: 14px;
        //   margin-bottom: 10px;
        //   background: #2993f8;
        //   color: #fff;
        //   text-align: center;
        //   line-height: 26px;
        //   border-top-right-radius: 10px;
        //   border-bottom-left-radius: 10px;
        //   position: relative;
        //   i {
        //     position: absolute;
        //     top: -8px;
        //     right: -4px;
        //     font-size: 12px;
        //     opacity: 0;
        //     transition: all .5s;
        //     &:hover {
        //       color: #666;
        //       opacity: 1;
        //       cursor: pointer;
        //     }
        //   }
        // }
        // .bq-add {
        //   width: 86px;
        //   height: 26px;
        //   background: #fff;
        //   color: #2993f8;
        //   text-align: center;
        //   border-top-right-radius: 10px;
        //   border-bottom-left-radius: 10px;
        //   border-style: dashed;
        //   cursor: pointer;
        // }
      }
      .member-edit-bq {
        width: 50%; // display: flex;
        // flex-wrap: wrap;
        .title {
          height: 26px;
          width: 80px;
          vertical-align: top;
          display: inline-block;
          position: relative;
          font-size: 14px;
          text-align: left;
        }
        .bq-item-wrap {
          width: 220px;
          max-height: 160px;
          overflow-y: scroll;
          .bq-item {
            // width: 86px;
            padding: 0 10px;
            height: 26px;
            margin-right: 14px;
            margin-bottom: 10px;
            background: #2993f8;
            color: #fff;
            text-align: center;
            line-height: 26px;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            position: relative;
            i {
              position: absolute;
              top: -8px;
              right: -4px;
              font-size: 12px;
              opacity: 0;
              transition: all .5s;
              &:hover {
                color: #666;
                opacity: 1;
                cursor: pointer;
              }
            }
          }
          .bq-add {
            width: 86px;
            height: 26px;
            background: #fff;
            color: #2993f8;
            text-align: center;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-style: dashed;
            cursor: pointer;
          }
        }
      }
    }
    .member-edit-bottom {
      padding: 0 8px;
      display: flex;
      height: 150px;
      .member-edit-bz {
        width: 50%;
        .title {
          margin-right: 10px;
          display: inline-block;
          position: relative;
          padding-left: 8px;
          color: #2993f8;
          font-size: 14px;
          &::before {
            content: '';
            display: inline-block;
            width: 2px;
            height: 14px;
            background: #2993f8;
            position: absolute;
            top: 3px;
            left: 0;
          }
        }
        .el-textarea {
          width: 80%;
          vertical-align: top;
        }
      } // .member-edit-bq {
      //   width: 50%; // display: flex;
      //   // flex-wrap: wrap;
      //   .title {
      //     height: 26px;
      //     margin-right: 10px;
      //     display: inline-block;
      //     position: relative;
      //     padding-left: 8px;
      //     color: #2993f8;
      //     font-size: 14px;
      //     &::before {
      //       content: '';
      //       display: inline-block;
      //       width: 2px;
      //       height: 14px;
      //       background: #2993f8;
      //       position: absolute;
      //       top: 3px;
      //       left: 0;
      //     }
      //   }
      //   .bq-item {
      //     // width: 86px;
      //     padding: 0 10px;
      //     height: 26px;
      //     margin-right: 14px;
      //     margin-bottom: 10px;
      //     background: #2993f8;
      //     color: #fff;
      //     text-align: center;
      //     line-height: 26px;
      //     border-top-right-radius: 10px;
      //     border-bottom-left-radius: 10px;
      //     position: relative;
      //     i {
      //       position: absolute;
      //       top: -8px;
      //       right: -4px;
      //       font-size: 12px;
      //       opacity: 0;
      //       transition: all .5s;
      //       &:hover {
      //         color: #666;
      //         opacity: 1;
      //         cursor: pointer;
      //       }
      //     }
      //   }
      //   .bq-add {
      //     width: 86px;
      //     height: 26px;
      //     background: #fff;
      //     color: #2993f8;
      //     text-align: center;
      //     border-top-right-radius: 10px;
      //     border-bottom-left-radius: 10px;
      //     border-style: dashed;
      //     cursor: pointer;
      //   }
      // }
    }
  }
}

</style>
