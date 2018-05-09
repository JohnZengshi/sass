<template>
  <div class="pushmessagebar">
    <h4>短信发送</h4>
    <div class="choosenum" :class="addheight">
      <input placeholder="请输入手机号..." v-model="handPhoneNum" maxlength="11" @blur="pushPhone" @keyup.enter="pushPhone"/>
      
      <div class="span-wrap">
        <span v-for="(v,index) in numList.list" :key="index">{{v.memberName}}</span>
      </div>
      <i class="iconfont icon-lianxiren" @click.stop="choosenVipclick = true"></i>
      <i v-if="numList.list" class="totnum">共{{numList.list.length}}人</i>
    </div>
    <p class="messageinformation">短信内容</p>
    <div class="tempinformation">
      <p class="titinfo">{{val}}</p>
      <textarea v-model="value" placeholder="选择模板或编辑内容"></textarea>
      <p class="choosen"><span @click.stop="choosesignatureclick = true">选择签名</span><span @click.stop="choosemessagetemplateclick = true">选择模板</span></p>
    </div>
    <div class="add-btn">
      <span @click.stop="getSendSMS">发送</span>
    </div>
    <!-- 选择会员 -->
    <el-dialog :modal="false" :visible.sync="choosenVipclick" top="0" customClass="choosenVip-bar" :close-on-click-modal="false">
      <choosenVip :choosenVipclick="choosenVipclick" :shopId="shopId" @closeChoMember="showcheckList"></choosenVip>
    </el-dialog>
    <!-- 选择签名-->
    <el-dialog :modal="false" :visible.sync="choosesignatureclick" top="0" customClass="choosesignature-bar" :close-on-click-modal="false">
      <choosesignature :shopId="shopId" @getsignaturedata="getsignaturedataList"></choosesignature>
    </el-dialog>
    <!-- 选择模板-->
    <el-dialog :modal="false" :visible.sync="choosemessagetemplateclick" top="0" customClass="choosemessagetemplate-bar" :close-on-click-modal="false">
      <choosemessagetemplate :shopId="shopId" @getmeaasgetemp="getmeaasgetempList"></choosemessagetemplate>
    </el-dialog>
    <!-- 报错 -->
    <el-dialog :modal="false" :visible.sync="reportErrorshow" top="20%" customClass="reportError-bar" :close-on-click-modal="false">
      <reportError :shopId="shopId"></reportError>
    </el-dialog>
  </div>
</template>
<script>
import choosenVip from './choosenVip' //选择会员
import choosesignature from './choosesignature' //选择签名
import choosemessagetemplate from './choosemessagetemplate' //选择模板
import reportError from './reportError' //报错
import {seekGetSMSSignatureList, seekSendSMS, seekGetSMSAccountInfo} from 'Api/commonality/seek'
export default {
  components: {
    choosenVip,
    choosesignature,
    choosemessagetemplate,
    reportError
  },
  props: ['shopId', 'pushmessageclick'],
  data () {
    return {
      handPhoneNum: '',
      choosenVipclick: false,
      choosesignatureclick: false,
      choosemessagetemplateclick: false,
      reportErrorshow: false,
      numList: {list: []},
      val:'',
      value: '',
      // value: {
      //   templateConten: ''
      // },
      valueList: '',
      dataList: [],
      pageSize: 1,
      signId: '',
      messageNum: '',
      addheight: '',
      phone: ''
    }
  },
  watch: {
    pushmessageclick (val) {
      if(val == true) {
        this.handPhoneNum = '';
        this.value = ''
        this.numList = {list: []}
      }
    }
  },
  created () {
    this.getseekGetSMSSignatureList()
    this.oprationseekGetSMSAccountInfo()
  },
  methods: {
    showcheckList (data) {
      console.log(data)
      this.choosenVipclick = false
      data.list.forEach((item) => {
        this.numList.list.push(item)
      })
      // this.numList = data
      console.log('9999',this.numList)
    },
    getsignaturedataList (value) {
      this.choosesignatureclick = false
      console.log(1111, value)
      this.val = value.signName
      this.signId = value.signId
      this.valueList = value
      console.log('this.signId', this.signId)
    },
    getmeaasgetempList (value) {
      console.log(value)
      this.choosemessagetemplateclick = false
      this.value = value.templateConten
      // console.log('111111111111111111', this.value)
    },
    getseekGetSMSSignatureList () {
      let options = {
        shopId: this.shopId,
        page: 1,
        pageSize: this.pageSize,
        type: 1
      }
      console.log(options)
      seekGetSMSSignatureList(options).then(res => {
        console.log('签名', res)
        this.dataList = res.data.data.dataList
        this.val = this.dataList[0].signName
        this.signId = this.dataList[0].signId
        //this.$emit("getsignaturedata", this.dataList[0].signName)
      }, res => {
        this.$message(res.msg)
      })
    },
    pushPhone () {
      if (this.handPhoneNum.length < 11 || this.handPhoneNum.length > 11) {
        this.$message('请输入正确的手机号')
        return
      } else {
        this.numList.list.push({phone: this.handPhoneNum, memberName: this.handPhoneNum});
        console.log('查看手机参数',this.numList.list);
        this.handPhoneNum = ''
      }
    },
    getSendSMS () {
      if (this.val = ''){
        this.$message('请创建签名')
        return
      }
      if (!this.numList.list){
        this.$message('请选择手机号')
        return
      }
      if (!this.value){
        this.$message('选择模板内容或填写内容')
        return
      }
      // if (this.value) {
      //   if (this.value.templateConten == ''){
      //     this.$message('选择模板内容或填写内容')
      //     return
      //   }
      // }
      // if (this.value.templateConten == ''){
      //   this.$message('选择模板内容或填写内容')
      //   return
      // }
      if (this.numList.list.length > this.messageNum) {
        this.reportErrorshow = true
        return
      }
      if (this.numList.list.length > 6) {
        this.addheight = hiddenchoosenum
      }
      this.operationseekSendSMS()
      // setTimeout(()=>{
      //   this.numList.list = ''
      //   this.value = ''
      // },500)
      // this.numList.list = ''
    },
    operationseekSendSMS () {
      let phoneArr = []
      for (let i of this.numList.list) {
        phoneArr.push({
          phone: i.phone
        })
      }
      // console.log(this.phone)
      let options = {
        shopId: this.shopId,
        phoneList: phoneArr,
        signId: this.signId,
        content: this.value
      }
      console.log('查看发送手机参数:',options)
      seekSendSMS(options).then(res => {
        if (res.data.msg == '手机列表为空') {
          this.$message('请选择手机号')
          return
        }
        // if (options.content == '') {
        //   this.$message('选择模板内容或填写内容')
        //   return
        // }
        if (res.data.state == 200) {
          this.$message('发送成功')
          eventBus.$emit('operationgetSeekGetSMSLog', '123');
          this.numList.list = ''
          this.value = ''
        }else{
          this.$message({
            // type: warning,
            message: res.data.msg
          })
        }
        this.$emit('getseekSendSMS')
      }, res => {
        this.$message(res.data.msg)
      })
    },
    oprationseekGetSMSAccountInfo () {
      let option = {
        shopId: this.shopId
      }
      seekGetSMSAccountInfo(option).then(res => {
        this.messageNum = res.data.data.smsCount
        console.log('用户信息', this.messageNum)
      }, res=>{
        this.$message(res.data.msg)
      })
    }
  }
}
</script>
<style lang="scss">
.pushmessage-bar {
  width: 700px;
  height: 488px;
  background:#fff;
  border-radius: 10px;
  .el-dialog__header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
  }
  .el-dialog__body {
      padding: 0 28px;
  }
}
.pushmessagebar{
  h4{
    margin-top: 20px;
  }
  .choosenum{
    padding: 8px;
    width: 640px;
    height: 35px;
    border: 1px solid #ccc;
    margin-top: 30px;
    &>input {
      float: left;
    }
    .span-wrap {
      width: 422px;
      float: left;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      span{
        margin-right: 8px;
      }
    }
    
    .icon-lianxiren{
      float: right;
      color: #2993f8;
      &.icon-lianxiren:hover{
        cursor: pointer;
      }
    }
    .totnum{
      font-style: normal;
      display: inline-block;
      // line-height: 30px;
      float:right;
      // background-color: lightgray;
      margin-right: 10px;
    }
  }
  // 高度变化
  .hiddenchoosenum{
    height: 70;
    overflow-y:auto
  }
  .messageinformation{
    margin: {
      top: 20px;
      bottom: 14px;
    }
  }
  .tempinformation{
    width: 640px;
    height: 204px;
    background-color: #f4f4f4;
    position: relative;
    >.titinfo{
      padding-left: 10px;
      padding-top: 10px;
      font-weight: 700;
    }
    >textarea{
      resize: none;
      background-color: #f4f4f4;
      width: 100%;
      height: 150px;
      padding-left: 10px;
      padding-top: 10px;
    }
    >.choosen{
      position: absolute;
      bottom: 16px;
      right: 16px;
      >span{
        &:nth-of-type(1){
          display: inline-block;
          padding: {
            right: 20px;
          }
          // border-right: 1px solid #ccc;
        }
      }
      span:hover{
        cursor: pointer;
        color: #8cbbf7;
      }
    }
  }
  .add-btn{
    text-align: center;
    margin-top: 30px;
    >span{
      display: inline-block;
      width: 89px;
      line-height: 27px;
      color: #fff;
      background-color: #2993f8;
      border-radius: 5px;
    }
    &.add-btn:hover{
      cursor: pointer;
    }
  }
}
</style>


