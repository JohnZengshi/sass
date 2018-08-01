<template>
  <el-dialog top="7%" :visible.sync="isDialog" class="xj-input-dialog-bg">
    <div class="m-m-add-member-main" :class="{'m-m-add-member-isShowMore-box': isShowMore}">
      <div class="p-close-icon" @click="isDialog = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </div>
      <div class="add-member-body">
        <h3>添加会员</h3>
        <div class="scroll-box">
          <div>
            
            <div class="member-edit-box header-data">

              <div class="data-left">
                <UploadingImg class="header-img-box" :type="1" @cosImg="cosHeadImg">
                  <img v-if="dataInfo.avatarUrl" class="header-img" :src="dataInfo.avatarUrl" alt="">
                  <img class="header-img" src="~static/img/default-logo.png" alt="">
                </UploadingImg>
              </div>

              <div class="data-right">
                <div class="member-edit-box">
                  <div class="member-edit-info">

                    <div class="member-item">
                      <span class="item-label"><i class="mandatory-icon">*</i>手机号</span>
                      <input placeholder="请输入" type="Number" :disabled="!isShopMan" v-model="dataInfo.phone" @blur="amendData">
                    </div>

                    <div class="member-item">
                      <span class="item-label"><i class="mandatory-icon">*</i>性别</span>
                      <div class="right-wrap radio-20">
                        <el-radio-group style="margin-top: 7px;" v-model="dataInfo.sex" @change="setSex" :disabled="!isShopMan">
                          <el-radio :label="'1'">男</el-radio>
                          <el-radio :label="'2'">女</el-radio>
                        </el-radio-group>
                      </div>
                    </div>

                    <div class="member-item">
                      <span class="item-label"><i class="mandatory-icon">*</i>性名</span>
                      <input placeholder="请输入" :disabled="!isShopMan" maxlength="6" v-model="dataInfo.username" @blur="amendData">
                    </div>

                    <div class="member-item">
                      <span class="item-label">备注名</span>
                      <input maxlength="6" placeholder="仅内部人员可查看" :disabled="!isShopMan" v-model="dataInfo.name" @blur="amendData">
                    </div>

                    <div class="member-item">
                      <span class="item-label">会员等级</span>
                      <div class="right-wrap">
                        <newDownMenu
                          class="header-new-down-menu-box"
                          :titleInfo="dataInfo.gradeName ? dataInfo.gradeName : '选择会员等级'"
                          :showList="gradeList"
                          :noClear="true"
                          :keep="true"
                          :nameKey="'gradeName'"
                          @changeData="choseGrade"
                        ></newDownMenu>
                      </div>
                    </div>

                    <div class="member-item">
                      <span class="item-label">积分</span>
                      <input placeholder="请输入" :disabled="!isShopMan" maxlength="6" v-model="dataInfo.score" @blur="amendData">
                    </div>

                    <div class="member-item">
                      <span class="item-label">负责人</span>
                      <div class="right-wrap">
                        <alone-drop-down-colums class="chose-user-box" ref="stateWrap" :propsList="userList" titleData="负责人" @dataBack="choseUser"></alone-drop-down-colums>
                      </div>
                    </div>
                    

                  </div>
                </div>
              </div>
            </div>
            

            <div class="member-edit-box">
              <h4>其它信息</h4>
              <div class="member-edit-info">

                <div class="member-item">
                  <span class="item-label">公历生日</span>
                  <el-date-picker v-model="dataInfo.maleBirthday" type="date" placeholder="选择日期" :disabled="!isShopMan" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setBirthday">
                  </el-date-picker>
                </div>

                <div class="member-item">
                  <span class="item-label">农历生日</span>
                  <el-date-picker v-model="dataInfo.birthday" type="date" placeholder="选择日期" :disabled="!isShopMan" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setBirthday">
                  </el-date-picker>
                </div>

                <div class="member-item">
                  <span class="item-label">邮箱</span>
                  <input type="Number" placeholder="请输入" :disabled="!isShopMan" v-model="dataInfo.email" @blur="amendData">
                </div>

                <div class="member-item">
                  <span class="item-label">纪念日</span>
                  <el-date-picker v-model="dataInfo.memorial" type="date" placeholder="选择日期" :disabled="!isShopMan" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setBirthday">
                  </el-date-picker>
                </div>




                <div class="member-item">
                  <span class="item-label">行业</span>
                  <div class="right-wrap">
                    <newDownMenu class="new-down-menu-box" :titleInfo="dataInfo.profession ? dataInfo.profession : '选择行业'" :showList="industryList" :noClear="true" :keep="true" @changeData="changeProfession"></newDownMenu>
                  </div>
                </div>
                <div class="member-item">
                  <span class="item-label">微信号</span>
                  <input placeholder="请输入" type="Number" :disabled="!isShopMan" v-model="dataInfo.weixin" @blur="amendData">
                </div>

                <div class="member-item">
                  <span class="item-label">创建时间</span>
                  <div class="right-wrap">
                    <span class="show-tit">
                      {{dataInfo.createTime}}
                    </span>
                  </div>
                </div>
                <div class="member-item">
                  <span class="item-label">订单总额</span>
                  <div class="right-wrap">
                    <span class="show-tit">
                      {{dataInfo.totalMoney}}
                    </span>
                  </div>
                </div>

                <div class="member-item">
                  <span class="item-label">省市区</span>
                  <div class="right-wrap">
                    <input v-model="PCAData" @click.stop="isShowPCA = !isShowPCA" class="inp" type="text" placeholder="选择省市区">
                    <AddressSelect style="left: 0;" v-if="isShowPCA" @addressReturn="SelectArea"></AddressSelect>
                  </div>
                </div>

                <div class="member-item">
                  <span class="item-label">名片上传</span>
                  <div class="right-wrap">
                    <img class="card" src="~static/img/member/new/card.png" />
                    <img class="card-img" v-if="dataInfo.cardSrc" :src="dataInfo.cardSrc" />
                    <UploadingImg class="uploading-img-box" :type="1" @cosImg="cosImg">
                      <span>上传</span>
                    </UploadingImg>
                  </div>
                </div>

                <div class="member-item">
                  <span class="item-label">详细地址</span>
                  <input :disabled="!isShopMan" v-model="dataInfo.address" @blur="amendData">
                </div>
              </div>
              <div class="remark">
                <div class="remark-left">
                  <div class="title"><span></span><em>备注</em></div>
                  <textarea v-model="dataInfo.remark"></textarea>
                </div>
                <div class="remark-right">
                  <div class="title"><span></span><em>标签</em></div>
                  <ul class="label-area">
                    <li class="label" v-for="(item, index) in dataInfo.signList" :key="index">{{item.signName}}
                      <i @click="delLabel(item, index)" class="iconfont icon-guanbi-copy"></i>
                    </li>
                    <!-- <li class="add-label">添加标签</li> -->
                    <input maxlength="6" v-if="dataInfo.signList.length < 4" @blur="followCreateSign" class="add-label" type="text" placeholder="添加标签" v-model="signName">
                  </ul>
                </div>
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
import { operateFollowCreateSign, operateMemberCreate, operateMemberUpdateBy, operateMemberOperation, operateOpIntention, operateMemberCreatee } from 'Api/commonality/operate'
import { seekGetShopUserList,seekFindMemberGradeList } from 'Api/commonality/seek'
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
import newDownMenu from 'base/menu/new-down-menu'
import AddressSelect from 'src/components/template/AddressSelect'
import UploadingImg from 'base/uploading/UploadingImg'
import { formattingTime } from 'assets/js/getTime'
const industryList = require('./data.js')
export default {
  components: {
    aloneDropDownColums,
    newDownMenu,
    UploadingImg,
    AddressSelect
  },
  props: ['shopId'],
  data() {
    return {
      isShowMore: false,
      industryList: industryList, // 行业数据
      PCAData: '', // 省市区数据
      isShowPCA: false,
      dataInfo: {
        shopId: '',
        score: '',
        avatarUrl: '',
        username: '',
        phone: '',
        name: '',
        sex: '',
        profession: '',
        birthday: '',
        maleBirthday: '',
        principalList: [],
        grade: '',
        gradeName: '',
        weixin: '',
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
      gradeList: [
        {
          gradeId: 'gradeId',
          gradeName: '银卡kk',
          startScore: 'startScore'
        },
        {
          gradeId: 'gradeId',
          gradeName: '银卡',
          startScore: 'startScore'
        },
        {
          gradeId: 'gradeId',
          gradeName: '金卡',
          startScore: 'startScore'
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
          id: '120',
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
    }
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     $(".scroll-box").mCustomScrollbar({
  //       theme: "minimal-dark",
  //       scrollInertia: 100, //滚动条移动速度，数值越大滚动越慢
  //     })
  //   })
  // },
  methods: {
    SelectArea(val) { // 省市区
      this.dataInfo.provinceId = val.provId
      this.dataInfo.cityId = val.cityId
      this.dataInfo.areaId = val.areaId
      this.PCAData = val.provName + ' / ' + val.cityName + ' / ' + val.areaName
      this.isShowPCA = false
    },
    cosImg(parm) {
      console.log('成功上传了图片', parm)
    },
    changeProfession(parm) {
      this.dataInfo.profession = parm.name
    },
    open() {
      for (let i of Object.keys(this.dataInfo)) {
        if (Array.isArray(this.dataInfo[i])) {
          this.dataInfo[i] = []
        } else {
          this.dataInfo[i] = ''
        }
      }
      this.isDialog = true
      this._seekGetShopUserList()
      this._seekFindMemberGradeList()
      this.$nextTick(() => {
        $(".scroll-box").mCustomScrollbar({
          theme: "minimal-dark",
          scrollInertia: 100, //滚动条移动速度，数值越大滚动越慢
        })
      })
    },
    choseGrade(parm) {
      this.dataInfo.grade = parm.gradeId
      this.dataInfo.gradeName = parm.gradeName
    },
    choseType(parm) {
      this.isType = false
      this.dataInfo.type = parm.id
      this.dataInfo.typeName = parm.name
    },
    confirm() {
      debugger
      this._operateMemberCreatee()
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
    // 修改数据
    amendData() {
      // 判断邮箱
      // if (this.dataInfo.email && this.dataInfo.email.search(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) == -1) {
      //   this.$message({
      //     type: 'warning',
      //     message: '请输入正确的邮箱'
      //   })
      //   return
      // }
      // let orderList = []
      // if (this.dataInfo.orderList.length != 0) {
      //   this.dataInfo.orderList.forEach((item, index) => {
      //     orderList[index] = { orderNo: item.orderNum }
      //   })
      // }

      // // 生日的时间格式
      // // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

      // let options = Object.assign({}, this.dataInfo, {
      //   memberId: this.memberId,
      //   shopId: this.shopId,
      //   orderList,
      //   birthday: this.birthday

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
    // timeFormat(parm) {

    //   if (parm) {
    //     let year = parm.substring(0, 4)
    //     let month = parm.substring(5, 7)
    //     let data = parm.substring(8, 10)
    //     return year + month + data + '000000'
    //   }
    // },
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
    // 新增会员
    _operateMemberCreatee() {
      if (!this.dataInfo.username) {
        this.$message({
          type: 'error',
          message: '请输入姓名'
        })
        return
      }

      if (!this.dataInfo.phone) {
        this.$message({
          type: 'error',
          message: '请输入手机号'
        })
        return
      }

      if (!this.dataInfo.sex) {
        this.$message({
          type: 'error',
          message: '请选择性别'
        })
        return
      }

      let options = _.cloneDeep(this.dataInfo)
      options.memorial = formattingTime(options.memorial)
      operateMemberCreatee(Object.assign({}, options, {shopId: this.shopId}))
        .then(res => {
          this.isDialog = false
        })
    },
    /* ----查询接口---- */
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
    // 会员等级列表
    _seekFindMemberGradeList () {
      let options = {
        shopId: this.shopId
      }
      seekFindMemberGradeList(options)
        .then(res => {
          if (res.data.state == 200) {
            this.gradeList = res.data.data.list
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
  }
}

</script>
<style lang="scss">
.m-m-add-member-main {
  height: 100%;
  width: 700px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 30px;
  position: relative;
  // &.m-m-add-member-isShowMore-box{
  //   height: 730px;
  // }
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
    .scroll-box {
      height: 610px;
      width: 100%;
      white-space: nowrap;
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
  .more-tit-wrap {
    height: 20px;
    .open-more {
      float: right;
      color: #2993f8;
      cursor: pointer;
    }
  }
  .member-edit-box {
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
      >.member-item {
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
          .show-tit{
            line-height: 28px;
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
              position: absolute;
              text-decoration: underline;
              line-height: 34px;
              margin-left: 10px;
              cursor: pointer;
              z-index: 100;
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
        .el-date-editor.el-input {
          width: 182px;
          border-radius: 3px; // border: 1px solid #dedede;
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

  .header-data{
    height: 180px;
    display: flex;
    border-radius: 5px;
    background-color: #EEF7FF;
    // >.data-left, >.data-right{
    //   float: left;
    // }
    >.data-left{
      position: relative;
      width: 180px;
      height: 100%;
      .header-img-box{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 120px;
        width: 120px;
        .header-img{
          height: 120px;
          width: 120px;
        }
      }
    }
  >.data-right{
      position: relative;
      width: 180px;
      height: 100%;
      flex: 1;
      padding: 15px 0;
      >.member-edit-box{
        .member-edit-info{
          .member-item{
            margin-bottom: 10px;
            .item-label{
              width: 70px;
            }
            input{
              width: 120px;
            }
            .header-new-down-menu-box {
              width: 120px;
              .title-name{
                background-color: transparent;
              }
            }
          }
        }
      }
    }
  }
  
  .remark {
    height: 135px;
    padding-top: 30px;
    &>div {
      float: left;
      height: 100%;
      width: 308px;
      .title {
        color: #2993f8;
        font-size: 14px;
        width: 53px;
        float: left;

        &>span {
          float: left;
          width: 3px;
          height: 14px;
          border-radius: 2px;
          background: #2993f8;
          margin-right: 6px;
        }
        &>em {
          height: 14px;
          float: left;
          font-style: normal;
          line-height: 14px;
        }
      }
    }
    .remark-left {
      textarea {
        width: 220px;
        height: 74px;
        border-radius: 2px;
        border: 1px solid #d6d6d6;
        float: left;
      }
    }
    .remark-right {
      .label-area {
        height: 100%;
        float: left;
        width: 250px;
        li,
        &>input {
          line-height: 26px;
          text-align: center;
          float: left;
          font-size: 12px;
          min-width: 86px;
          margin-right: 16px;
          margin-bottom: 10px;
          height: 28px;
          border-top-left-radius: 2px;
          border-top-right-radius: 10px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 2px;
        }
        li {
          position: relative;
          &>i {
            position: absolute;
            right: -6px;
            top: -6px;
            color: #999999;
            background: #fff;
            border-radius: 50%;
            width: 14px;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            display: none;
            &:hover {
              color: #666;
              cursor: pointer;
            }
          }
          &:hover {
            &>i {
              display: inline-block;
            }
          }
        }

        .add-label {
          border: 1px dashed #2993f8;
          color: #666; //cursor: pointer;
          &::-webkit-input-placeholder {
            color: #2993f8;
          }
          &:-moz-placeholder {
            color: #2993f8;
          }
          &::-moz-placeholder {
            color: #2993f8;
          }
          &:-ms-input-placeholder {
            color: #2993f8;
          }
        }
        .label {
          background: #2993f8;
          border: 1px solid #2993f8;
          color: #fff;
        }
      }
    }
  }
}

</style>
