<template>
<div class="login-container">
  <header><img src="../../assets/img/login/login-logo.png"/></header>
  <div class="body">
    
    <div class="login-box">
      <div class="slide-container" :class="slidingType == 1 ? 'md1' : slidingType == 2 ? 'md2' : 'md0'">
        <div class="login">
          <!-- <h5>扫描登录</h5> -->
          <div class="login_btns">
              <span class="login_btn_app" :class="{ 'actionColor' : actionType === 0 }" @click="appClick()">扫描登录</span>
              <span class="login-btn" :class="{ 'actionColor' : actionType === 'wx' }" title="使用微信绑定云珠宝登录的手机号，可进行微信扫一扫登录" @click="wxClick">微信登录</span>
              <span class="login-btn" :class="{ 'actionColor' : actionType === 2 }" title="短信密码登录" @click="smsClick()">短信登录</span>
          </div>
          <!-- app二维码 -->
          <div v-show="actionType === 0 || actionType === 1">
            <QRcode @getCompanyId="getCompanyId"></QRcode>
            <p class="txt">登录App进行扫码登录</p>
          </div>

          <div v-if="actionType == 'wx'">
            <wxCode></wxCode>
           <!--  <p class="txt">登录微信进行扫码登录</p> -->
          </div>

          <!-- 验证码登录 -->
          <div v-show="actionType === 2">
            <el-form class="sms-wrap">
              <!-- 电话号码 -->
              <el-form-item prop="tel">
                <el-input v-model="userInfo.phoneNumber" class="phone-number" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item>
                <el-input v-model="userInfo.SMSCode" type="text" class="password-number" placeholder="请输入验证码" @keyup.enter.native="ajaxLogin">
                <el-button v-if="sended" slot="append" style="width:50px;">已发送({{subsub < 10 ? '0'+subsub : subsub}}s)</el-button>
                <el-button v-else slot="append" style="color:#4fdcca;width:50px;padding:0" @click.native="handleIconClick">发送验证码</el-button>
                </el-input>
              </el-form-item>
              <!-- 登录按钮 -->
              <el-form-item style="margin-top: 20px;">
                <el-button native-type="button" type="primary" size="large" @click="ajaxLogin" style="width: 100%">即刻登录</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="wx-login-btn">
            <!-- <span class="login-btn" title="使用微信绑定云珠宝登录的手机号，可进行微信扫一扫登录" @click="wxClick">微信登录</span> -->
            <span class="login-btn" title="联系我们" @click.stop="showAboutUs">联系我们>></span>
            <!--  <span class="login-btn" title="快速体验" @click="setType(1)">快速体验>></span> -->
          </div>

          
        </div>
        
        <div class="login">
          <h5><i class="iconfont icon-jiantou goBack" title="返回上一级" @click="setType(0)"></i>体验</h5>
          <experience-num  @setType="setType" @phoneNumber="setPhoneNumber"></experience-num>
        </div>
        <div class="login">
           <h5><i class="iconfont icon-jiantou goBack" title="返回上一级" @click="setType(1)"></i>选择角色</h5>
           <choose-user :phoneNumber="phoneNumber"></choose-user>
        </div>
      </div>
      <div class="about" v-if="slidingType != 2">
        <router-link to="#">关于云珠宝</router-link>
        <router-link to="#">隐私协议</router-link>
        <router-link to="#">服务条款</router-link>
      </div>
    </div>
    <div class="txt">
      <img src="../../assets/img/login/login-txt.png"/>
    </div>
    
  </div>
  <footer>
    <p>国内首家通过 ISO27001:2013 信息安全认证</p>
    <p>
      <a href="javascrpt:;">帮助中心</a>|
      <a href="javascrpt:;">云珠宝公约</a>|
      <a href="javascrpt:;">中文版</a>|
      <a href="javascrpt:;">English</a>|&nbsp;&nbsp;&nbsp;&nbsp;旗下网站：yunzhubao© 2016 浙 B2-20080224-16</p>
  </footer>
  <!--弹出框组件-->
  <dialog-component 
    :dialogVisible = "dialogVisible"
    @setDialogVisible = "setDialogVisible">
  </dialog-component>
  <aboutUs
      :isShowAboutUs="isShowAboutusdialog"
      @setAboutUsVisible = 'setAboutUsVisible' >
  </aboutUs>
    
</div>
</template>

<script>
import aboutUs from './components/AboutUs';
import QRcode from './page/Qrcode'
import experienceNum from './page/experienceNum'
import chooseUser from './page/chooseUser'
import dialogComponent from './page/wxDialog'
import wxCode from './page/wx-code'
import {sellBackRandomOneAdminList} from 'Api/commonality/seek'
import {userLogin, getVcCode} from '../../Api/auth_v1'
import * as types from '../../vuex/mutation-types.js'

export default {
  data(){
   return{
    slidingType : 0 ,
    phoneNumber : '',
    dialogVisible : false,
    isShowAboutusdialog:false,
    actionType: 'wx',
    userInfo:{
      phoneNumber: '',
      SMSCode:''
    },
    subsub:60,
    isRemember: false,
    sended: false,
   }
  },
  
  components: {
    QRcode,
    experienceNum,
    chooseUser,
    dialogComponent,
    aboutUs,
    wxCode
  },
  created(){
      this.getsellBackRandomOneAdminList();
      // if (this.$route.query.isCompany) {
        // this.isShowAboutusdialog = true
      // }
  },
  mounted(){
    $('input,.el-input__inner').css('paddingLeft','35px')
    $('.password-number .el-input__inner').css('width','188px')
    $('.el-input-group__append span').css('marginLeft','-40px')
    $('.el-input-group__append').css('border','none')
    this.$nextTick(function () {
      if (this.$route.query.isCompany) {
        this.showAboutUs();
        this.$router.push('/member/login')
      }
      // Code that will run only after the
      // entire view has been rendered
    })
  },
  methods: {
    setType (num) {
      this.$set(this, 'slidingType', num)
    },
    getsellBackRandomOneAdminList(){
        sellBackRandomOneAdminList().then((res)=>{
              //console.log('获取公司联系人：',res.data.data.dataList);
              if(res.data.status == 200){
                  
              }
        })
    },
    setPhoneNumber(num){
      this.$set(this, 'phoneNumber', num)
    },
    getCompanyId(companyId){
      //console.log('公司ID：'+companyId);
      if(companyId != '' && companyId != null){
         this.$router.push('/mainIndex');// 登录成功，保存用户信息，跳转到主页面
      }else{//如果有公司，则登录页面，，如果没有公司，则不能进入主页面
        this.showAboutUs();
      }
    },
    showAboutUs(){
      this.setAboutUsVisible(true);
    },//操作弹框隐藏显示
    setAboutUsVisible(isShow){
        this.isShowAboutusdialog = isShow;
    },
    wxClick(){
      this.actionType = 'wx'
      // this.setDialogVisible(true)
    },
    setDialogVisible(type){
      this.dialogVisible = type
      if(type){
        this.actionType =1
      } else {
        this.actionType = 0
      }
    },
    appClick(){
      this.actionType = 0
    },
    smsClick(){
      this.actionType = 2
    },
    ajaxLogin (ev) {
      const self = this
      let data = {
        phone: this.userInfo.phoneNumber
      }
      if (this.isCurrent === 'pw') {
        data.password = md5(this.userInfo.password);
        data.operateType = '1'
      } else {
        data.SMSCode = this.userInfo.SMSCode;
        data.operateType = '2'
      }
      if (!(/^1[34578]\d{9}$/.test(this.userInfo.phoneNumber))) {
        //alert('请正确输入电话号码');
        this.$store.dispatch('workPopupError', '请正确输入电话号码');
        return;
      }
      if (this.isCurrent === 'pw') {
        if (this.userInfo.password === '' || this.userInfo.password.length > 32) {
          //alert('请正确输入密码');
          this.$store.dispatch('workPopupError', '请正确输入密码');
          return;
        }
      } else {
        if (this.userInfo.SMSCode === '' || this.userInfo.SMSCode.length > 4) {
          //alert('请正确输入验证码');
          this.$store.dispatch('workPopupError', '请正确输入验证码');
          return;
        }
      }
      userLogin(data).then((res) => {
        if (res.data.state === 200) {
          if (this.isRemember) {
            this.userInfo.phone = this.userInfo.phone;
            this.userInfo.password = this.userInfo.password;
            localStorage.setItem('UserPh', this.userInfo.phoneNumber);
            localStorage.setItem('UserPw', this.userInfo.password);
          } else {
            this.userInfo.phone = '';
            this.userInfo.password = '';
          }
          self.$store.commit(types.SET_USER_INFO, res.data.data);
          if(res.data.data.companyId){
            sessionStorage.setItem('id', res.data.data.Id);
            sessionStorage.setItem('companyId', res.data.data.companyId);
           //  sessionStorage.setItem('companyId', '');//判断公司是否存在
            sessionStorage.setItem('sig', res.data.data.sig);
            sessionStorage.setItem("nickname", res.data.data.userName);
            sessionStorage.setItem("tokenId", res.data.data.tokenId);
            sessionStorage.setItem("experience", 'N');
            sessionStorage.removeItem('rootIndex')
            sessionStorage.removeItem('childIndex')
            self.$router.push('/mainIndex');
            clearInterval(this.intersubsub)
          } else {
            this.showAboutUs();
          }
        } else {
          this.$store.dispatch('workPopupError', res.data.msg);
        }
      });
    },
    handleIconClick (ev) {
      let data = {
        phone: this.userInfo.phoneNumber,
        type: '02'
      }
      if (!(/^1[34578]\d{9}$/.test(data.phone))) {
        //alert("请正确输入有效手机号.");
        this.$store.dispatch('workPopupError', "请正确输入有效手机号");
      } else {
        let self = this;
        getVcCode(data).then((res) => {
          console.log(res.data);
          if (res.data.state === 200) {
            self.sended = true;
            self.intersubsub = setInterval(() => {
              --self.subsub;
              if (self.subsub <= 0) {
                clearInterval(self.intersubsub)
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
  }
}
</script>

<style lang="scss" scoped>

.login-box{
  position: absolute;
  top: 150px;
  right: 10px;
  width: 330px;
  height: 410px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px #888;
  
  .slide-container{
    width:990px;
    height:362px;
    position: relative;
    display: flex;
    transition: all .3s cubic-bezier(0.4, 0, 1, 1);
    &.md0{
      transform: translateX(0);
    }
    
    &.md1{
      transform:  translateX(-330px);
    }
    
    &.md2{
      transform:  translateX(-660px);
    }
  }
  
  .login{
    width:330px;
    height:362px;
    background-color: #fff;

    >h5{
      height: 87px;
      padding-top: 35px;
      line-height: 30px;
      font-weight: bold;
      font-size: 20px;
      text-align: center;
      color: #2993f8;
      position: relative;
      >.goBack{
        color: #333;
        position: absolute;
        left: 20px;
        top: 10px;
        font-size: 18px;
        cursor: pointer;
      }
    }
    
    .txt{
      font-size: 13px;
      color: #999;
      height: 45px;
      line-height: 45px;
      text-align: center;
    }
    .wx-login-btn{
      height: 50px;
      // display: flex;
      margin: 0 60px;
      text-align: center;
      
      >.login-btn{
        // width: 50%;
        // height: 50px;
        line-height: 50px;
        color: #2993f8;
        font-size: 15px;
        cursor: pointer;
      }
    }

    .login_btns{
      display: flex;
      height: 87px;
      padding: 0 36px;
      justify-content: space-around;
      line-height: 87px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;

      .actionColor {
        color: #2993f8
      }
    }
 
  }
  
 
  .about{
    height: 50px;
    border-top: 1px solid #e9e9e9;
    line-height: 50px;
    font-size: 13px;
    padding: 0 30px;
    display: flex;
    >a{
      width: 33.33%;
      text-align: center;
    }
  }
}



.login-container{
  height:100%;
  background:#fff url(../../assets/img/login/login-bg.jpg) center  90px no-repeat;
  min-height: 900px;
  user-select: none;
  >header{
    width: 1250px;
    margin: 0 auto;
    height: 90px;
    >img{
      max-height: 90px;
    }
  }
  
  >footer{
    text-align: center;
    font-size: 14px;
    color: #666;
    padding-top: 20px;
    >p{
      line-height: 25px;
      >a{
        margin: 0 10px;
      }
    }
  }
  
  >.body{
    position: relative;
    height: 718px;
    width: 1250px;
    margin: 0 auto;
    >.txt{
      position: absolute;
      left: 40;
      top: 200px;
    }
  }
}

.sms-wrap {
  padding: 0 30px;
  .phone-number{
      &:before {position:absolute; left:14px; top:8px; z-index:999; width:30px; height:20px; background:url(../../assets/img/login/phone.png) no-repeat; display:inline-block; content:" ";}
      // input{padding:0px 42px; width:100%; height:50px; border:1px solid #d3d3d3; border-radius:3px;font-size:14px; color:#999999; line-height:50px;float: left;}
  }
  .password-number{
      &:before {position:absolute; left:14px; top:8px; z-index:999; width:30px; height:20px; background:url(../../assets/img/login/passwords-2.png) no-repeat; display:inline-block; content:" ";}
      // input{padding:0px 42px; width:100%; height:50px; border:1px solid #d3d3d3; border-radius:3px;font-size:14px; color:#999999; line-height:50px;float: left;}
  }
}
</style>
