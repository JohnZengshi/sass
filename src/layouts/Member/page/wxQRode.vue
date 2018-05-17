<template>
    <div class="QRcode-container" :class="isHandover ? 'is-hover' : ''" ref="qrCode">
    <div class="QRCode" v-loading="loading">
    <img style="width: 180px;height: 180px;" :src="bigUrl" alt="">
<!--     <img src="" id="qrious"> -->
  </div>
    <div class="QRCode-hover">
      <div id="wxQCode" class="QRCode"></div>
      <img src="../../../assets/img/login/login-qCode.jpg" />
    </div>

    <div v-if="!isHandover" class="QRcode-lose">二维码已失效
      <span class="txt" @click="QRCodeRefresh">点我刷新</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .QRcode-container {
    width: 285px;
    height: 180px;
    position: relative;
    margin: 0 auto;
    >.QRCode {
      width: 180px;
      height: 180px;
      margin: 0 auto;
      background-color: #ccc;
      transition: all 1s;
      opacity: 1;
      visibility: visible;
    }
    >.QRCode-hover {
      transition: all 1s;
      opacity: 0;
      visibility: hidden;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      >.QRCode {
        width: 120px;
        height: 120px;
        float: left;
        margin-top: 25px;
        background-color: #ccc;
      }
      >img {
        width: 150px;
        height: 177px;
        float: right;
      }
    }
    &.is-hover:hover {
      >.QRCode {
        opacity: 0;
        visibility: hidden;
      }
      >.QRCode-hover {
        opacity: 1;
        visibility: visible;
      }
    }
    .QRcode-lose {
      position: absolute;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.8);
      left: 50%;
      top: 0;
      margin-left: -90px;
      width: 180px;
      height: 180px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      padding-top: 30px;
      line-height: 45px;
      >.txt {
        display: block;
        width: 98px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 13px;
        margin: 10px auto 0 auto;
        background-color: #2993f8;
        border-radius: 5px;
        cursor: pointer;
        transition: all .3s;
        &:hover {
          background-color: #0f7de5;
        }
      }
    }
  }
</style>

<script>
let serverHost = process.env.NODE_ENV === 'development' ? "http://www.yunzhubao.com" : "http://www.yunzhubao.com"
// 微信二维码重定向地址，内网需要到uat上 80端口才能验证
let redirect_url = process.env.NODE_ENV === 'development' ? "http://uat.yunzhubao.com" : location.origin 
let appid = location.origin.includes('uat') ? 'wxdf7b4d9f4de0aa6a' : 'wx8e4f7029bbc651bd'
import {getQRAuthCode} from 'Api/auth_v1'
export default{
  data(){
    return{
        dialogSize: 'counter_x_small',
        isVisible : false,
        redirect_url : encodeURIComponent( redirect_url + "/#/member/userRegister"), //location.origin
        bigUrl: '',
        smallUrl: '',
        WebSocketUrl: '',
        qr: '',
        qrCodeUrl: '',
        loginKey: '',
        sessionId: '',
        isHandover: true,
        reConnectFlag: 5,
        loading: false,
    }
  },
  
  watch:{
     
  },
  
  methods:{
    
    fetchQRAuthCode(){
      
      // 微信扫一扫登录 第一步 拿到state
      this.$http.get(serverHost+'/v1/auth/getQRAuthCode').then(res =>{
        
        if( res.data.state == 99){
            // 服务器错误
          this.$store.dispatch('workPopupError', res.data.msg)
          this.$emit('setDialogVisible',false)
        }else{
          //console.log(res.data.data.state)
          
          // 第二步 实例化扫一扫二维码 ，此接口微信提供
          /* 微信接口地址
           * https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=0e446c79dc2d8e89bfed2e754a2a244b359e7ae6&lang=zh_CN
           * */
          console.log(this.redirect_url)
          var obj = new WxLogin({
            id:"wxQCode",  //页面显示二维码ID
            appid: appid,
            scope: "snsapi_login", 
            redirect_uri: this.redirect_url,
            state: res.data.data.state,
            style: "white",
            href: ""
          })
        }
      })
    }
    
  },
  created(){
      this.fetchQRAuthCode()
  },
  
  mounted(){
     this.$nextTick(()=>{
        
     })
  }
}
</script>
