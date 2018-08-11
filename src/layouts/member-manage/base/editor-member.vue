<!-- 会员编辑模板 -->
<template>
  <div>
      <el-dialog :modal="false" :visible.sync="isChoseLeader" top="0%" customClass="choseLeaderDig" :close-on-click-modal="false">
          <chose-leader
              :dataInfo="dataInfo"
              :shopId="shopId"
              :addModel="1"
              :isChoseLeader="isChoseLeader"
              @closeChoMember="closeChoLeader"
          ></chose-leader>
      </el-dialog>

      <div class="m-m-add-member-main n-p-scroll-box" :class="{'m-m-add-member-isShowMore-box': isShowMore}">
        <div class="p-close-icon" @click="close">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="scroll-body">
          <h3>添加会员</h3>
          <div class="scroll-box">
            <div>
              
              <div class="member-edit-box header-data">

                <div class="data-left">
                  <UploadingImg class="header-img-box" :type="1" @cosImg="changeHeaderImg">
                    <img v-if="dataInfo.avatarUrl" class="header-img" :src="dataInfo.avatarUrl" alt="">
                    <img class="header-img" src="~static/img/default-logo.png" alt="">
                  </UploadingImg>
                </div>

                <div class="data-right">
                  <div class="member-edit-box">
                    <div class="member-edit-info">

                      <div class="member-item">
                        <span class="item-label"><i class="mandatory-icon">*</i>手机号</span>
                        <input placeholder="请输入" maxlength="11" :disabled="!isShopMan" v-model="dataInfo.phone" @blur="amendData">
                      </div>

                      <div class="member-item">
                        <span class="item-label"><i class="mandatory-icon">*</i>性别</span>
                        <div class="right-wrap radio-20" v-if="memberId ? dataInfo.phone : true">
                          <el-radio-group style="margin-top: 7px;" v-model="dataInfo.sex" @change="setSex" :disabled="!isShopMan">
                            <el-radio :label="'1'">男</el-radio>
                            <el-radio :label="'2'">女</el-radio>
                          </el-radio-group>
                        </div>
                      </div>

                      <div class="member-item">
                        <span class="item-label"><i class="mandatory-icon">*</i>姓名</span>
                        <input placeholder="请输入" :disabled="!isShopMan" maxlength="6" v-model="dataInfo.userName" @blur="_operateUpdateMember({userName: dataInfo.userName})">
                      </div>

                      <div class="member-item">
                        <span class="item-label">备注名</span>
                        <input maxlength="6" placeholder="仅内部人员可查看" :disabled="!isShopMan" v-model="dataInfo.name" @blur="_operateUpdateMember({userName: dataInfo.name})">
                      </div>

                      <div class="member-item">
                        <span class="item-label">会员等级</span>
                        <div class="right-wrap">
                          <newDownMenu
                            ref="checkedGradeBox"
                            class="header-new-down-menu-box"
                            :titleInfo="dataInfo.grade[0] ? dataInfo.grade[0].gradeName : '选择会员等级'"
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
                        <input placeholder="请输入" :disabled="!isShopMan" maxlength="6" v-model="dataInfo.score" @blur="_operateUpdateMember({userName: dataInfo.score})">
                      </div>

                      <div class="member-item">
                        <span class="item-label">负责人</span>
                        <div class="right-wrap">
                          <i v-if="isShopMan" @click="isChoseLeader=true" class="iconfont icon-jia add-leader"></i>
                          <span class="tit-name">{{ dataInfo.principalName || '指派' }}</span>
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
                    <el-date-picker v-model="dataInfo.maleBirthday" type="date" placeholder="选择日期" :disabled="!isShopMan" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setMaleBirthday">
                    </el-date-picker>
                  </div>

                  <div class="member-item">
                    <span class="item-label">农历生日</span>
                    <el-date-picker v-model="dataInfo.birthday" type="date" placeholder="选择日期" :disabled="!isShopMan" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setBirthday">
                    </el-date-picker>
                  </div>

                  <div class="member-item">
                    <span class="item-label">省市区</span>
                    <div class="right-wrap">
                      <input v-model="PCAData" @click.stop="isShowPCA = !isShowPCA" class="inp" type="text" placeholder="选择省市区">
                      <AddressSelect style="left: 0;" v-if="isShowPCA" @addressReturn="selectArea"></AddressSelect>
                    </div>
                  </div>


                  <div class="member-item">
                    <span class="item-label">纪念日</span>
                    <el-date-picker v-model="dataInfo.memorial" type="date" placeholder="选择日期" :disabled="!isShopMan" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setMemorial">
                    </el-date-picker>
                  </div>




                  <div class="member-item">
                    <span class="item-label">行业</span>
                    <div class="right-wrap">
                      <newDownMenu ref="checkedProfessionBox" class="new-down-menu-box" :titleInfo="dataInfo.profession ? dataInfo.profession : '选择行业'" :showList="industryList" :noClear="true" :keep="true" @changeData="changeProfession"></newDownMenu>
                    </div>
                  </div>
                  <div class="member-item">
                    <span class="item-label">微信号</span>
                    <input placeholder="请输入" :disabled="!isShopMan" v-model="dataInfo.weixin" @blur="_operateUpdateMember({weixin: dataInfo.weixin})">
                  </div>

                  <div class="member-item" v-if="dataInfo.createTime">
                    <span class="item-label">创建时间</span>
                    <div class="right-wrap">
                      <span class="show-tit">
                        {{dataInfo.createTime}}
                      </span>
                    </div>
                  </div>

                  <div class="member-item" v-if="dataInfo.totalMoney">
                    <span class="item-label">订单总额</span>
                    <div class="right-wrap">
                      <span class="show-tit">
                        {{dataInfo.totalMoney}}
                      </span>
                    </div>
                  </div>

                  <div class="member-item">
                    <span class="item-label">邮箱</span>
                    <input placeholder="请输入" :disabled="!isShopMan" v-model="dataInfo.email" @blur="_operateUpdateMember({email: dataInfo.email})">
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
                    <input :disabled="!isShopMan" v-model="dataInfo.address" @blur="_operateUpdateMember({address: dataInfo.address})">
                  </div>
                </div>
                <div class="remark">
                  <div class="remark-left">
                    <div class="title"><span></span><em>备注</em></div>
                    <textarea v-model="dataInfo.remark" @blur="_operateUpdateMember({remark: dataInfo.remark})"></textarea>
                  </div>
                  <div class="remark-right">
                    <div class="title"><span></span><em>标签</em></div>
                    <ul class="label-area">
                      <li class="label" v-for="(item, index) in dataInfo.signList" :key="index">{{item.signName}}
                        <i @click="delLabel(item, index)" class="iconfont icon-guanbi-copy"></i>
                      </li>
                      <!-- <li class="add-label">添加标签</li> -->
                      <input maxlength="6" v-if="dataInfo.signList.length < 10" @blur="followCreateSign" class="add-label" type="text" placeholder="添加标签" v-model="signName">
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="xj-btn-list">
          <div class="btn cnacel-btn" @click="close">取消</div>
          <div class="btn" v-if="isShopMan" @click="confirm">确定</div>
        </div>
      </div>
  </div>
</template>
<script>
import { operateFollowCreateSigns, operateMemberCreate, operateMemberUpdateBy, operateMemberOperation, operateOpIntention, operateMemberCreatee, operateUpdateMember } from 'Api/commonality/operate'
import { seekGetShopUserList,seekFindMemberGradeList, seekFindMemberDetails } from 'Api/commonality/seek'
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
import choseLeader from './chose-leader'
import newDownMenu from 'base/menu/new-down-menu'
import AddressSelect from 'src/components/template/AddressSelect'
import UploadingImg from 'base/uploading/UploadingImg'
import { formattingTime, GetNYR } from 'assets/js/getTime'
const industryList = require('./data.js')
export default {
  components: {
    aloneDropDownColums,
    newDownMenu,
    UploadingImg,
    AddressSelect,
    choseLeader
  },
  props: ['shopId', 'memberId'],
  data() {
    return {
      isChoseLeader: false,
      isShowMore: false,
      industryList: industryList, // 行业数据
      PCAData: '', // 省市区数据
      isShowPCA: false,
      dataInfo: {
        shopId: '',
        score: '',
        avatarUrl: '',
        cardSrc: '',
        userName: '',
        phone: '',
        name: '',
        sex: '',
        profession: '',
        birthday: '',
        maleBirthday: '',
        principalList: [],
        principalName: '', // 负责人名
        grade: [],
        gradeName: '',
        weixin: '',
        type: '',
        typeName: '',
        memorial: '',
        signList: [],
        orderList: []
      },
      isDialog: false,
      isShopMan: true, // 操作权限
      isShowInd: false,
      isGrade: false,
      isType: false,
      signName: '',
      gradeList: [],
      typeList: [],
      userList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      $(".scroll-box").mCustomScrollbar({
        theme: "minimal-dark",
        scrollInertia: 100, //滚动条移动速度，数值越大滚动越慢
      })
      if (this.memberId) {
        this._seekFindMemberDetails()
      }
    })
  },
  methods: {
    changeHeaderImg (parm) {
      this.dataInfo.avatarUrl = parm
    },
    // 选择负责人
    closeChoLeader (parm) {
      this.isChoseLeader = false
      let userList = []
      let datas = {
        principalList: []
      }
      for (let i of parm.list) {
        userList.push({
          userId: i
        })
        datas.principalList.push({userId: i})
      }
      this.dataInfo.principalList = userList
      this.dataInfo.principalName = ''
      for (let i of parm.nameList) {
        this.dataInfo.principalName += this.dataInfo.principalName ? `,${i}` : i
      }
      this._operateUpdateMember(datas)
    },
    selectArea(val) { // 省市区
      this.dataInfo.provinceId = val.provId
      this.dataInfo.cityId = val.cityId
      this.dataInfo.areaId = val.areaId
      this.PCAData = val.provName + ' / ' + val.cityName + ' / ' + val.areaName
      this.isShowPCA = false
      this._operateUpdateMember({
        provinceId: val.provId,
        cityId: val.cityId,
        areaId: val.areaId
      })
    },
    cosImg(parm) {
      this.dataInfo.cardSrc = parm
      this._operateUpdateMember({cardSrc: parm})
    },
    changeProfession(parm) {
      this.dataInfo.profession = parm.name
      this._operateUpdateMember({profession: parm.name})
    },
    close () {
      this.$emit('close')
      for (let i of Object.keys(this.dataInfo)) {
        if (Array.isArray(this.dataInfo[i])) {
          this.dataInfo[i] = []
        } else {
          this.dataInfo[i] = ''
        }
      }
      this.PCAData = ''
      this.$refs.checkedGradeBox.init()
      this.$refs.checkedProfessionBox.init()
    },
    open() {
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
      this.$set(this.dataInfo.grade, '0', parm)
      // this.dataInfo.grade[0] = parm
      this._operateUpdateMember({gradeId: parm.gradeId})
    },
    choseType(parm) {
      this.isType = false
      this.dataInfo.type = parm.id
      this.dataInfo.typeName = parm.name
    },
    confirm() {
      if (this.memberId) {
        this.close()
      } else {
        this._operateMemberCreatee()  
      }
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
      operateFollowCreateSigns(options).then((res) => {
        if (res.data.state == 200) {
          this.dataInfo.signList.push({
            signName: this.signName,
            signId: res.data.data.signId
          })
          this.signName = ''
          this._operateUpdateMember(this.dataInfo.signList)
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
      if (!this.memberId) {
        return
      }
      this._operateUpdateMember({signList: this.dataInfo.signList}, '删除成功')
      // operateUpdateMember(Object.assign({}, item, {memberId: this.memberId}, {shopId: this.shopId}))
      //   .then(res => {
      //     if (res.data.state === 200) {
      //       this.$message({type: 'success',message: '删除'})
      //       this.dataInfo.signList.splice(index, 1)
      //     } else {
      //       this.$message({type: 'error',message: res.data.msg})
      //     } 
      //   })
      
      // let orderList = []
      // if (this.dataInfo.orderList.length != 0) {
      //   this.dataInfo.orderList.forEach((item, index) => {
      //     orderList[index] = { orderNo: item.orderNum }
      //   })
      // }

      // 生日的时间格式

      // let optionsdata = Object.assign({}, this.dataInfo, {
      //   memberId: this.memberId,
      //   shopId: this.shopId,
      //   orderList,
      //   birthday: this.birthday

      // })

      // operateMemberUpdateBy(optionsdata).then(res => {
      //   if (res.data.state === 200) {
      //     this.$message({
      //       type: 'success',
      //       message: '删除标签成功'
      //     })
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: '删除标签失败'
      //     })
      //   }
      // })
    },
    // 修改生日
    setBirthday() {
      this._operateUpdateMember({birthday: formattingTime(this.dataInfo.birthday)})
    },
    setMemorial () {
      this._operateUpdateMember({setMemorial: formattingTime(this.dataInfo.memorial)})
    },
    setMaleBirthday () {
      this._operateUpdateMember({maleBirthday: formattingTime(this.dataInfo.maleBirthday)})
    },
    // 修改姓名
    setUserName() {

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
      operateMemberUpdateBy(options).then(res => {
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
    setSex(val) {
      this._operateUpdateMember({sex: this.dataInfo.sex})
    },
    // 修改
    _operateUpdateMember (parm, message) {
      if (!this.memberId) {
        return
      }
      operateUpdateMember(Object.assign({}, parm, {memberId: this.memberId}, {shopId: this.shopId}))
        .then(res => {
          if (res.data.state === 200) {
            this.$message({type: 'success', message: message ? message : '修改成功'})
          } else {
            this.$message({type: 'error', message: res.data.msg})
          } 
        })
    },
    // 新增会员
    _operateMemberCreatee() {
      if (!this.dataInfo.userName) {
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

      if (this.dataInfo.phone.length != 11) {
        this.$message({
          type: 'error',
          message: '请输入正确的手机号码'
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
      options.birthday = formattingTime(options.birthday)
      options.maleBirthday = formattingTime(options.maleBirthday)
      // let userList = []
      // for (let i of options.principalList) {
      //   userList.push({
      //     userId: 
      //   })
      // }

      operateMemberCreatee(Object.assign({}, options, {shopId: this.shopId}))
        .then(res => {
          if (res.data.state == 200) {
            this.$message({
              type: 'success',
              message: '新建成功'
            })
            this.$emit('close')
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
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
            this.gradeList = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
    _seekFindMemberDetails () {
      let options = {
        memberId: this.memberId
      }
      seekFindMemberDetails(options)
        .then(res => {
          if (res.data.state == 200) {
            debugger
            let datas = res.data.data
            datas.memorial = GetNYR(datas.memorial)
            datas.birthday = GetNYR(datas.birthday)
            datas.maleBirthday = GetNYR(datas.maleBirthday)
            datas.principalName = ''
            for (let i of datas.principalList) {
              datas.principalName += datas.principalName ? `,${i.nickname}` : i.nickname
            }
            debugger
            this.dataInfo = datas
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    }
  }
}

</script>
<style lang="scss">
.m-m-add-member-main {
  // &.m-m-add-member-isShowMore-box{
  //   height: 730px;
  // }
  .mandatory-icon {
    color: red;
  }
  // .scroll-body {
  //   height: 660px;
  //   >h3 {
  //     line-height: 1;
  //     font-size: 16px;
  //     font-weight: 700;
  //     margin-bottom: 20px;
  //     color: #333;
  //   }
  //   .scroll-box {
  //     height: 610px;
  //     width: 100%;
  //     white-space: nowrap;
  //   }
  // }
  // .p-close-icon {
  //   position: absolute;
  //   right: 10px;
  //   top: 10px;
  //   height: 20px;
  //   width: 20px;
  //   cursor: pointer;
  //   >i {
  //     color: #bfcbd9;
  //   }
  // }
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
            .title-name{
              text-align: left;
              text-indent: 10px;
            }
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
            .right-wrap{
              .add-leader{
                line-height: 28px;
                color: #2993f8;
                cursor: pointer;
                display: none;
              }
              .tit-name{
                line-height: 28px;
              }
              &:hover > .add-leader{
                  display: inline-block;
              }
            }
            .item-label{
              width: 70px;
            }
            input{
              width: 120px;
            }
            .header-new-down-menu-box {
              width: 120px;
              .title-name{
                text-align: left;
                text-indent: 10px;
                background-color: transparent;
              }
            }
          }
        }
      }
    }
  }
  
  .remark {
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
