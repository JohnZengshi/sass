<template>

  <div class="loading" v-if="unbound" v-loading="loading" element-loading-text="页面加载中..."></div>
  <div class="register" v-else>
    <div class="login">
      <h5>绑定登录手机号</h5>
    </div>
    <div class="ex-wrap">
      <div class="main">
        <div class="main-item">
          <input v-model="experienceInfo.phoneNumber" type="text" placeholder="请输入手机号">
        </div>
        <div class="main-item">
          <input v-model="experienceInfo.SMSCode" class="barcode" type="text" placeholder="验证码">
          <el-button v-if="sended" slot="append" class="isSend">已发送({{subsub
            <10? '0'+subsub : subsub}}s)</el-button>
              <span v-else @click="handleRegIconClick" @keyup.enter="ajaxExperienceLogin">发送验证码</span>
        </div>
        <div class="btn" @click="ajaxExperienceLogin">确定</div>
        <div class="wxQRcode-container">
          <div class="wxQcode">
            <img src="../../assets/img/login/qrcode.jpg" alt="" />
          </div>
          <p>扫一扫关注智慧展厅</p>
        </div>
      </div>
    </div>
    <div class="about">
      <router-link to="#">关于云珠宝</router-link>
      <router-link to="#">隐私协议</router-link>
      <router-link to="#">服务条款</router-link>
    </div>
  </div>
</template>
<script>
  import {
    userRegistry,
    getVcCode,
    confirmCode,
    getUserBind,
    userLogin,
    getWXlogin
  } from 'Api/auth_v1'
  export default {
    data() {
      return {
        experienceInfo: {
          phoneNumber: '',
          SMSCode: ''
        },
        sended: false,
        subsub: 60,
        loading: true,
        unbound: true
      }
    },
    methods: {
      userlogin(){
        let data = {
          userId: '',
          key: '',
          operateType: '4'
        };
        userLogin(data).then((res) => {
          if(res.data.state === 200) {
            sessionStorage.setItem('companyId', res.data.data.companyId);
            sessionStorage.setItem('sig', res.data.data.sig);
            sessionStorage.setItem("nickname", res.data.data.userName);
            sessionStorage.setItem("tokenId", res.data.data.tokenId);
            if(res.data.data.Id){
              sessionStorage.setItem('id', res.data.data.Id);
            }else if(res.data.data.userId){
              sessionStorage.setItem("id", res.data.data.userId);
            }
            this.$router.push('/mainIndex');
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        })
      },
      loadWXQRcode() {
        let parm = this.serializeUrl(location.href).param
        getWXlogin({
          code: parm.code,
          state: parm.state
        }).then((res) => {
          console.log(res)
          if(res.data.state == 100) {
            console.log('已经绑定')
            //页面跳转
          } else if(res.data.state == 1001033) {
            // 未绑定
            this.loading = this.unbound = false
            
          } else if(res.data.state == 99) {
            // 服务器错误
            this.loading = false
            this.$store.dispatch('workPopupError', res.data.msg);
          }else if(res.data.state == 200) {
            // 
            this.loading = false
            if(res.data.data.errcode == 40029 || res.data.data.errcode == 40163){
              this.$store.dispatch('workPopupError', res.data.data.errmsg)
            }else if(res.data.data.Id){
              if(res.data.data.Id){
                sessionStorage.setItem('id', res.data.data.Id);
              }else if(res.data.data.userId){
                sessionStorage.setItem("id", res.data.data.userId);
              }
              sessionStorage.setItem('companyId', res.data.data.companyId);
              sessionStorage.setItem('sig', res.data.data.sig);
              sessionStorage.setItem("nickname", res.data.data.userName);
              sessionStorage.setItem("tokenId", res.data.data.tokenId);
              debugger
              this.$router.push('/mainIndex');
            }
          }
        })
      },
      handleRegIconClick() {
        let data = {
          phone: this.experienceInfo.phoneNumber,
          type: '04'
        };
        if(!(/^1[34578]\d{9}$/.test(data.phone))) {
          //alert("请正确输入有效手机号.");
          this.$store.dispatch('workPopupError', "请正确输入有效手机号.");
        } else {
          let self = this;
          getVcCode(data).then((res) => {
            console.log(res.data);
            if(res.data.state === 200) {
              self.sended = true;
              window.intersubsub = setInterval(() => {
                --self.subsub;
                if(self.subsub <= 0) {
                  clearInterval(window.intersubsub)
                  self.sended = false;
                  self.subsub = 60;
                }
              }, 1000);
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          });
        }
      },
      ajaxExperienceLogin() {
        if(this.experienceInfo.SMSCode.length < 4 || this.experienceInfo.SMSCode.length >= 5) {
          //alert("请正确输入验证码");
          this.$store.dispatch('workPopupError', "请正确输入验证码");
          return;
        }
        let options = {
          phone: this.experienceInfo.phoneNumber,
          SMSCode: this.experienceInfo.SMSCode,
          type: '1',
          otherId: this.serializeUrl(location.href).param.state
        }
        
        // 手机绑定
        getUserBind(options).then((res) => {
          if(res.data.state == 200) {
            clearInterval(window.intersubsub)
            this.sended = false;
            this.subsub = 60;
            // 绑定成功 用户登录
            sessionStorage.setItem('id', res.data.data.userId);
            sessionStorage.setItem('companyId', res.data.data.companyId);
            sessionStorage.setItem('sig', res.data.data.sig);
            sessionStorage.setItem("nickname", res.data.data.userName);
            sessionStorage.setItem("tokenId", res.data.data.tokenId);
            sessionStorage.setItem("userId", res.data.data.userId);
            this.$router.push('/mainIndex');
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        }, (res) => {
          this.$store.dispatch('workPopupError', "验证短信码失败");
        })
      },
      
      serializeUrl(str) {
        var param = {},
          hash = {},
          anchor;
        var url = str || location.href;
        var arr = /([^?]*)([^#]*)(.*)/.exec(url);
        var ar1 = /^(http|ftp)/.test(arr[1]) ? /(.*?:)?(?:\/?\/?)([\.\w]*)(:\d*)?(.*?)([^\/]*)$/.exec(arr[1]) : /(.*?)([^\/]*)$/.exec(arr[1]);
        var ar2 = arr[2].match(/[^?&=]*=[^?&=]*/g);
        var ar3 = arr[3].match(/[^#&=]*=[^#&=]*/g);

        if(ar2) {
          for(var i = 0, l = ar2.length; i < l; i++) {
            var ar22 = /([^=]*)(?:=*)(.*)/.exec(ar2[i]);
            param[ar22[1]] = ar22[2];
          }
        }

        if(ar3) {
          for(var i = 0, l = ar3.length; i < l; i++) {
            var ar33 = /([^=]*)(?:=*)(.*)/.exec(ar3[i]);
            hash[ar33[1]] = ar33[2];
          }
        }

        if(arr[3] && !/[=&]/g.test(arr[3])) {
          anchor = arr[3];
        }

        　　!/^(http|ftp)/.test(arr[1]) && ar1.splice(1, 0, undefined, undefined, undefined);

        function getUrl() {
          var that = this,
            url = [],
            param = [],
            hash = [];

          url.push(that.protocol, that.protocol && '//' || '', that.host, that.port, that.path, that.file);

          for(var p in that.param) {
            param.push(p + '=' + that.param[p]);
          }

          for(var p in that.hash) {
            hash.push(p + '=' + that.hash[p]);
          }

          url.push(param.length && '?' + param.join('&') || '');

          if(that.anchor) {
            url.push(that.anchor);
          } else {
            url.push(hash.length && '#' + hash.join('&') || '');
          }

          return url.join('');
        }

        return {
          href: arr[0],
          protocol: ar1[1],
          host: ar1[2],
          port: (ar1[3] || ''),
          path: ar1[4],
          file: ar1[5],
          param: param,
          hash: hash,
          anchor: anchor,
          getUrl: getUrl
        }
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.loadWXQRcode()
        // console.log(this.serializeUrl(location.href))
      })
    }
  }
</script>
<style lang="scss" scoped>
  .ex-wrap {
    width: 350px;
    background: #fff;
    margin: 0 auto;
    position: relative;
    .main {
      overflow: hidden;
      .main-item {
        margin-bottom: 20px;
        position: relative;
        input {
          width: 100%;
          height: 40px;
          border: 1px solid #d6d6d6;
          border-radius: 4px;
          padding-left: 15px;
          font-size: 14px;
        }
        .barcode {
          padding-right: 130px;
        }
        span {
          height: 25px;
          padding: 0 18px;
          display: block;
          color: #2993f8;
          font-size: 14px;
          line-height: 25px;
          position: absolute;
          right: 0;
          top: 7px;
          cursor: pointer;
        }
        .isSend {
          position: absolute;
          border: 0 none;
          right: 2px;
          top: 3px;
          cursor: default;
          color: #2993f8;
        }
      }
      .btn {
        width: 100%;
        height: 40px;
        background: #2993f8;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 20px;
        margin-top: 35px;
        display: inline-table;
        text-align: center;
      }
      p {
        text-align: center;
        color: #999;
        font-size: 12px;
      }
    }
  }
  
  .register {
    width: 450px;
    margin: 50px auto;
    background-color: #fff;
    box-shadow: 0 0 15px #ddd;
    border-radius: 10px;
  }
  
  .login {
    margin-bottom: 20px;
    >h5 {
      height: 87px;
      padding-top: 35px;
      line-height: 30px;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      color: #2993f8;
      position: relative;
    }
  }
  
  .loading {
    min-height: 500px;
    height: 100%;
    width: 100%;
  }
  
  .about {
    height: 50px;
    border-top: 1px solid #e9e9e9;
    line-height: 50px;
    font-size: 13px;
    padding: 0 50px;
    display: flex;
    >a {
      width: 33.33%;
      text-align: center;
    }
  }
  
  .wxQRcode-container {
    float: left;
    width: 100%;
    >.wxQcode {
      height: 150px;
      width: 150px;
      margin: 0 auto;
      >img {
        width: 100%;
        height: 100%;
      }
    }
    >p {
      height: 35px;
      line-height: 35px;
    }
    padding-top:10px;
    padding-bottom:20px;
  }
</style>