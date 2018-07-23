<template>
   <div class="wx-QRcode" id="wxQCode" ref="wxQCode">
     <span class="loading">loading...</span>
   </div>
</template>

<script>
let serverHost = process.env.NODE_ENV === 'development' ? "http://192.168.100.110:8082/yunzhubao" : ""
// 微信二维码重定向地址，内网需要到uat上 80端口才能验证
let redirect_url = process.env.NODE_ENV === 'development' ? "http://uat.yunzhubao.com" : location.origin 
let appid = location.origin.includes('uat') ? 'wxdf7b4d9f4de0aa6a' : 'wx8e4f7029bbc651bd'
import {getQRAuthCode} from 'Api/auth_v1'
export default{
  data(){
    return{
      dialogSize: 'counter_x_small',
      isVisible : false,
      redirect_url : encodeURIComponent( redirect_url + "/#/member/userRegister") //location.origin
    }
  },
  
  created () {
    if(this.$refs.wxQCode){
      this.$refs.wxQCode.innerHTML = '<span class="loading">loading...</span>'
    }
    window._wxQcodeInterval = setInterval(() =>{
      if(this.$refs.wxQCode){
        clearInterval(window._wxQcodeInterval)
        this.fetchQRAuthCode()
      }
    }, 1000)
  },

  // watch:{
  //    'isVisible' : function(val){
  //      if(val == false){
  //       this.close()
  //       if(this.$refs.wxQCode){
  //         this.$refs.wxQCode.innerHTML = '<span class="loading">loading...</span>'
  //       }
  //      }else{
  //         window._wxQcodeInterval = setInterval(() =>{
  //           if(this.$refs.wxQCode){
  //             clearInterval(window._wxQcodeInterval)
  //             this.fetchQRAuthCode()
  //           }
  //         }, 1000)
  //      }
  //    },
  //    'dialogVisible' : function(val){
  //      clearInterval(window._wxQcodeInterval)
  //      this.isVisible = val
  //    }
  // },
  
  methods:{

    close(){
      this.$emit('setDialogVisible',false)
    },
    
    fetchQRAuthCode(){
      
      // 微信扫一扫登录 第一步 拿到state
      this.$http.get(serverHost + '/v1/auth/getQRAuthCode').then(res =>{
        
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
          var obj = new WxLogin({
            id:"wxQCode",  //页面显示二维码ID
            appid: appid,
            scope: "snsapi_login", 
            redirect_uri: this.redirect_url,
            state: res.data.data.state,
            style: "white",
            href: "https://www.yunzhubao.com/static/css/weixin.css"
          })
        }
      })
    }
    
  },
  
  mounted(){
     this.$nextTick(()=>{
        
     })
  }
}
</script>

<style lang="scss" scoped>

.com-dialog{
  .title{
    position: relative;
    >.el-icon-close{
      position: absolute;
      right:-6px;
      top: -6px;
      cursor: pointer;
      font-size: 14px;
      color: #999;
      &:hover{
        color: #2993f8;  
      }
    }
    .tips{
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      >p{
        padding-bottom: 8px;
      }
    }
  }
  
  
}

</style>
<style lang="scss">

.com-dialog{
  .el-dialog--counter_x_small{
    width: 430px;
    border-radius: 10px;
  }
  .el-dialog__body{
    padding: 20px 0 0 0; 
  }
}

.wx-QRcode{
  height: 230px;
  width: 250px;
  background-color: rgb(51, 51, 51);
  margin: 0 auto;
  text-align: center;
  >iframe{
    height: 230px;
    width: 273px;
    margin: 0 auto;
    background-color: #fff;
    color: #666;
    // .title{
    //   display: none;
    // }
    // .panelContent{
    //   .qrcode{
    //     width: 160px;
    //   }
    // }
  }
  .loading{
    height: 180px;
    line-height: 180px;
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
}
</style>