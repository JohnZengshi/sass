`<template>
  <div class="reset_passwd">
    <div v-if="forgetPW" class="reset_passwd_panel">
      <div class="input_item">
        <span>验证码</span><span style="position: relative;">
          <input type="text" v-model="userNewInfo.SMSCode"/><span class="SMSCodeTitle">{{SMSInfo}}</span>
          <span v-if="!sended" style="position:absolute;bottom:0;right:-80%;color:#4fdcca;margin-bottom:9px;cursor:pointer;user-select:none;" @click="getSMSCode">获取验证码</span>
          <span v-else style="position:absolute;bottom:0;right:-80%;color:#4fdcca;margin-bottom:9px;cursor:pointer;user-select:none;">{{subsub<10?'0'+subsub:subsub}}后再获取</span>
        </span>
      </div>
      <div class="input_item">
        <span>新密码</span><span><input type="password" v-model="userNewInfo.newPasswd" /></span>
      </div>
      <div class="submitBtn" @click="submitUpdatePasswd">
        提交修改
      </div>
    </div>
    <div v-else class="reset_passwd_panel">
      <div class="input_item">
        <span>原密码</span><span style="position: relative;"><input @blur="blurAction(1)" type="password" v-model="userNewInfo.oldPasswd" placeholder="" /><p v-if="oldInfo" class="titleInfo">{{titleInfo}}</p><span style="position:absolute;bottom:0;right:-80%;color:#4fdcca;margin-bottom:9px;cursor:pointer;user-select:none;" @click="forgetPasswd">忘记密码?</span></span>
      </div>
      <div class="input_item">
        <span>新密码</span><span><input @blur="blurAction(2)" type="password" v-model="userNewInfo.newPasswd" placeholder="" /></span>
      </div>
      <div class="submitBtn" @click="submitUpdatePasswd">
        提交修改
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  //console.log(mapGetters);
  import {getVcCode, userForget, confirmCode, oldNewTrans} from '../../Api/auth_v1'
  //console.log(...mapGetters);
  export default {
    data () {
      return {
        userNewInfo: {oldPasswd: '', newPasswd: '', SMSCode: ''},
        uploadData: {},
        forgetPW: false,
        sended: false,
        subsub: 60,
        oldInfo: false,
        titleInfo: '',
        SMSInfo: '',
        dialogVisible: false,
        isDelSure: false,
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      forgetPasswd () {
        this.forgetPW = true;
        //console.log(this.userInfo)
        //console.log(this.userInfo.phone)
      },
      blurAction (index) {
          if (index == 1) {
            if (this.userNewInfo.oldPasswd === '' || this.userNewInfo.oldPasswd.length < 6 || this.userNewInfo.oldPasswd.length > 32) {
              //alert("密码长度为6-32个字符");
              this.oldInfo = true;
              this.titleInfo = '原始密码长度为6-32个字符';
              return;
            }
            this.titleInfo = " ";
          } else if (index == 2) {
            if (this.userNewInfo.newPasswd === '' || this.userNewInfo.newPasswd.length < 6 || this.userNewInfo.newPasswd.length > 32) {
              //alert("密码长度为6-32个字符");
              this.oldInfo = true;
              this.titleInfo = '新密码长度必须为6-32个字符';
              return;
            }
            if (this.userNewInfo.oldPasswd === this.userNewInfo.newPasswd) {
              //alert("新旧密码一样");
              this.oldInfo = true;
              this.titleInfo = '新旧密码一样';
              return;
            }
            this.titleInfo = " ";
          }
      },
      submitUpdatePasswd () {
        let self = this
        if (this.forgetPW) {
          let before_data = {
            phone: self.userInfo.phone,
            SMSCode: self.userNewInfo.SMSCode,
            type: '02'
          }
          if (before_data.SMSCode < 1000 || before_data.SMSCode >= 10000) {
            //alert("请正确输入验证码");
            this.$store.dispatch('workPopupError', "请正确输入验证码");
            return;
          }
          confirmCode(before_data).then((res) => {
            if (res.data.state === 200) {
              let data = {
                phone: self.userInfo.phone,
                password: md5(self.userNewInfo.newPasswd)
              }
              if (self.userNewInfo.newPasswd === '' || self.userNewInfo.newPasswd.length < 6 || self.userNewInfo.newPasswd.length > 32) {
                //alert("密码长度为6-32个字符");
                return;
              }
              userForget(data).then((res) => {
                if (res.data.state === 200) {
                  //alert('密码修改成功')
                  this.$store.dispatch('workPopupError', "密码修改成功");
                  let self = this;
                    //console.log(val);
                    //console.log(val1);
                    this.isDelSure = val1;
                    if (this.isDelSure == true) {
                      self.$router.push('/work/')
                    }
                } else {
                  this.$store.dispatch('workPopupError', res.data.msg)
                }
              })
            } else {
              //alert("无效验证码")
              this.$store.dispatch('workPopupError', "无效验证码");
            }
          })
        } else {
          let data = {
            oldPassword: md5(this.userNewInfo.oldPasswd),
            newPassword: md5(this.userNewInfo.newPasswd)
          }
          if (this.userNewInfo.newPasswd === '' || this.userNewInfo.newPasswd.length < 6 || this.userNewInfo.newPasswd.length > 32) {
            //alert("密码长度为6-32个字符");
            this.oldInfo = true;
            this.titleInfo = '密码长度为6-32个字符';
            return;
          }
          if (this.userNewInfo.oldPasswd === this.userNewInfo.newPasswd) {
            //alert("新旧密码一样");
            this.oldInfo = true;
            this.titleInfo = '新旧密码一样';
            return;
          }
          oldNewTrans(data).then((res) => {
            console.log(res.data)
            if (res.data.state === 1001069) {
              //alert('请输入正确的原密码');
              this.oldInfo = true;
              this.titleInfo = '请输入正确的原密码';

              self.userNewInfo.oldPasswd = "";
            } else if (res.data.state === 200) {
              //alert('密码修改成功');
              this.$store.dispatch('workPopupError', "密码修改成功");
                  self.$router.push({path: "/admin/personalInfo", params: { navNum: 0 }, query: { navNum: 0 }});
                }
              this.oldInfo = false;
              self.userNewInfo.newPasswd = "";
              self.userNewInfo.oldPasswd = "";
          }, (res) => {
              //alert("密码修改失败");
              this.$store.dispatch('workPopupError', "密码修改失败");
          })
        }
      },
      getSMSCode () {
        let self = this
        let data = {
          phone: this.userInfo.phone,
          type: '03'
        }
        getVcCode(data).then((res) => {
          if (res.data.state === 200) {
            self.sended = true
            self.intersubsub = setInterval(() => {
              --self.subsub
              if (self.subsub <= 0) {
                clearInterval(self.intersubsub)
                self.sended = false
                self.subsub = 60
              }
            }, 1000)
          } else {
            this.$store.dispatch('workPopupError', res.data.msg)
          }
        })
        this.userNewInfo.SMSCode = "";
        console.log(this.userInfo.phone.length);
        this.SMSInfo = "验证码已发送到" + this.userInfo.phone + "的手机上"
      }
    },
    mounted () {
        var self = this;
        eventBus.$on('passwordPage', function (res) {
          self.forgetPW = res;
          //console.log(res);
        });
    }
  }
</script>

<style lang="scss" scoped>
  .titleInfo{position: absolute; bottom:-16px; left:30px; color:#ff0000;
    font-size:12px;
  }

  .SMSCodeTitle{
    position: absolute;bottom:-16px; left:30px; color:#666;
    font-size:12px;
  }
  .reset_passwd {
    width: 100%;
    position: relative;
    .reset_passwd_panel {
      position: absolute;
      width: 75%;
      top: 0;
      left: 0;
      margin-left: 70px;
      background-color: #f6f7f8;
      border-radius: 15px;
      padding-top: 50px;
      .input_item {
        width: 70%;
        height: 50px;
        margin: 5px 0 5px 0;
        color: #666;
        span {
          display: inline-block;
        }
        span:first-child {
          width: 30%;
          padding: 0 20px 0 40px;
          text-align: left;
        }
        span:last-child {
          width: 70%;
          input {
            width: 100%;
            font-size: 16px;
            height: 36px;
            line-height: 36px;
            padding-left: 10px;
            color: #999;
            border: 1px solid #ccc;
            border-radius: 3px;
          }
          input:focus {
            border: 1px solid #4fdcca;
            color: #4fdcca;
          }
        }
      }
      .submitBtn {
        width: 150px;
        height: 40px;
        line-height: 40px;
        background-color: #FFAA33;
        color: #fff;
        text-align: center;
        border-radius: 3px;
        margin: 20px 0 50px 40px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
