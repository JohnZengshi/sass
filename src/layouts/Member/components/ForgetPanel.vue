<template>
  <div class="forget-panel">
    <popup :isShow="isShowAction" :content="popContentText"></popup>
    <p>
      找回密码<span>已有账号，去<a style="color:#4fdcca;cursor:pointer;" @click="gotoLogin">登录</a></span>
    </p>
    <el-form class="forget-form">
      <el-form-item>
        <el-input v-model="forgetInfo.phoneNumber" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="forgetInfo.SMSCode" placeholder="验证码">
          <el-button v-if="sended" slot="append" style="width:115px;display:inline;">已发送({{subsub<10? '0'+subsub : subsub}}s)</el-button>
          <el-button v-else slot="append" style="color:#4fdcca;width:115px;display:inline;" @click.native="handleRegIconClick">发送验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item style="position:relative;">
        <el-input v-model="forgetInfo.password" type="password" placeholder="新密码"></el-input>
        <span style="position:absolute;bottom:0px;right:-40px;">必填</span>
      </el-form-item>
      <el-form-item style="position:relative; display: inline;">
        <el-input v-model="forgetInfo.cPassword" type="password" placeholder="确认新密码"></el-input>
        <span style="position:absolute;bottom:0px;right:-40px;">必填</span>
      </el-form-item>
      <el-form-item>
        <el-button native-type = "button" type="primary" size="large" class="btn-registry" @click="ajaxForget">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {userLogin, userForget, getVcCode, confirmCode} from '../../../Api/auth_v1'
import * as types from '../../../vuex/mutation-types.js'
import popup from './../../template/Popup.vue'
export default {
  data () {
    return {
      forgetInfo: {
        phoneNumber: '',
        SMSCode: '',
        password: '',
        cPassword: ''
      },
      sended: false,
      subsub: 60,
      isShowAction: false,
      popContentText: '这是一个弹框'
    }
  },
  components: {
    popup
  },
  mounted () {
    let self = this;
    eventBus.$on('isClose', function (val) {
      self.isShowAction = val;
      console.log(val);
    })
  },
  methods: {
    gotoLogin (ev) {
      this.$emit('goto-login', true);
    },
    handleRegIconClick (ev) {
      let data = {
        phone: this.forgetInfo.phoneNumber,
        type: '03'
      };
      if (!(/^1[34578]\d{9}$/.test(data.phone))) {
        //alert("请正确输入有效手机号.");
        this.popContentText = "请正确输入有效手机号";
        this.isShowAction = true;
        eventBus.$emit('isShow', this.isShowAction);
      } else {
        let self = this;
        getVcCode(data).then((res) => {
          if (res.data.state === 200) {
            self.sended = true;
            self.intersubsub = setInterval(() => {
              --self.subsub;
              if (self.subsub <= 0) {
                clearInterval(self.intersubsub);
                self.sended = false;
                self.subsub = 60;
              }
            }, 1000);
          } else {
            alert(res.data.msg);
          }
        });
      }
    },
    ajaxForget () {
      let data = {
        'phone': this.forgetInfo.phoneNumber,
        'password': md5(this.forgetInfo.password)
      };
      if (!(/^1[34578]\d{9}$/.test(data.phone))) {
        //alert("请正确输入有效手机号.");
        this.popContentText = "请正确输入有效手机号";
        this.isShowAction = true;
        eventBus.$emit('isShow', this.isShowAction);
        console.log(this.popContentText);
        return;
      }
      if (this.forgetInfo.SMSCode < 1000 || this.forgetInfo.SMSCode >= 10000) {
        //alert("请正确输入验证码");
        this.popContentText = "请正确输入验证码";
        this.isShowAction = true;
        eventBus.$emit('isShow', this.isShowAction);
        console.log(this.forgetInfo.SMSCode);
        console.log(this.popContentText);
        return;
      }
      if (this.forgetInfo.password === '' || this.forgetInfo.password.length < 6 || this.forgetInfo.password.length > 32) {
        //alert("密码长度为6-32个字符");
        this.popContentText = "密码长度为6-32个字符";
        this.isShowAction = true;
        console.log(this.popContentText);
        eventBus.$emit('isShow', this.isShowAction);
        return;
      }
      if (this.forgetInfo.password !== this.forgetInfo.cPassword) {
        //alert("两次密码输入不一致");
        this.popContentText = "两次密码输入不一致";
        this.isShowAction = true;
        eventBus.$emit('isShow', this.isShowAction);
        console.log(this.popContentText);
        return;
      }
      let before_data = {
        'phone': this.forgetInfo.phoneNumber,
        'SMSCode': this.forgetInfo.SMSCode,
        'type': '02'
      }
      const self = this;
      confirmCode(before_data).then((res) => {
        if (res.data.state === 200) {
          console.log(res.data);
          userForget(data).then((res) => {
            if (res.data.state === 200) {
              console.log(res.data);
              //alert("找回密码成功");
              this.popContentText = "找回密码成功";
              this.isShowAction = true;
              eventBus.$emit('isShow', this.isShowAction);
              let data = {
                'phone': this.forgetInfo.phoneNumber,
                'password': md5(this.forgetInfo.password),
                'operateType': '1'
              };
              userLogin(data).then((res) => {
                if (res.data.state === 200) {
                  console.log(res.data);
                  self.$store.commit(types.SET_USER_INFO, res.data.data);
                  sessionStorage.setItem('id', res.data.data.Id);
                  sessionStorage.setItem('companyId', res.data.data.companyId);
                  sessionStorage.setItem('sig', res.data.data.sig);
                  sessionStorage.setItem("nickname", res.data.data.userName);
                  sessionStorage.setItem("tokenId", res.data.data.tokenId);
                  sessionStorage.setItem("experience", 'N');
                  self.$router.push('/mainIndex');
                } else {
                  alert(res.data.msg);
                }
              });
            } else {
              //alert("找回密码失败");
            this.popContentText = "找回密码失败";
            this.isShowAction = true;
            eventBus.$emit('isShow', this.isShowAction);
            }
          });
        } else {
          console.log(res.data);
          //alert("无效验证码");
          this.popContentText = "无效验证码";
          this.isShowAction = true;
          eventBus.$emit('isShow', this.isShowAction);
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .forget-panel {
    font-size: 0;
    p{
      position: relative;
      text-align: center;
      color: #46c4b4;
      font-size: 20px;
      height: 70px;
      line-height: 70px;
      margin-top: 20px;
      &::after{
        content: '';
        position: absolute;
        width: 600px;
        height: 1px;
        bottom: 0px;
        left: 70px;
        background-color: #46c4b4;
      }
      span {
        position: absolute;
        top: 50%;
        right: 70px;
        margin-top: -35px;
        font-size:14px;
        color: #333;
      }
    }
  }
  .forget-form {
    width: 370px;
    margin: 0 auto;
    padding-top: 40px;
    input {
      padding-left: 20px;
      height: 50px;
    }
    div {
      text-align: center;
    }
    .btn-registry {
      padding:0px;
      width:100%;
      height:50px;
      line-height:50px;
      background:#4fdcca;
      text-align:center;
      color:#fff;
      font-size:18px;
      margin-top:30px;
      border: none;
    }
  }
  div.el-form-item__content {
    line-height: 14px;
  }
</style>
