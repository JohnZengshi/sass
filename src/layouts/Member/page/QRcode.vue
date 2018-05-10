<template>
  <div class="QRcode-container" :class="isHandover ? 'is-hover' : ''" ref="qrCode">
    <div class="QRCode" v-loading="loading">
    <img style="width: 180px;height: 180px;" :src="bigUrl" alt="">
<!--     <img src="" id="qrious"> -->
</div>
    <div class="QRCode-hover">
      <div class="QRCode"><img style="width: 120px;height: 120px;" :src="smallUrl" id="qrious1"></div>
      <img src="../../../assets/img/login/login-qCode.jpg" />
    </div>

    <div v-if="!isHandover" class="QRcode-lose">二维码已失效
      <span class="txt" @click="QRCodeRefresh">点我刷新</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { qrcodeLogin, userLogin, getWXlogin } from '../../../Api/auth_v1.js'
  import { downloadTable } from 'Api/commonality/seek'

  export default {
    data() {
      return {
        bigUrl: '',
        smallUrl: '',
        WebSocketUrl: '',
        qr: '',
        qrCodeUrl: '',
        loginKey: '',
        sessionId: '',
        isHandover: true,
        reConnectFlag: 5,
        loading: true,
      }
    },
    mounted() {
      this.$nextTick(function () {
        this._downloadTable()
      })
    },
    methods: {
      updateQrCodeLogin() {
        let serverHost = process.env.NODE_ENV === 'development' ? 'https://www.yunzhubao.com' : ''
        if(this.$refs.qrCode) {
          this.isHandover = true
          this.loading = true
          qrcodeLogin({}).then((res) => {

            this.loginKey = res.data.data.split("key=", 13)[1];
            this.qrCodeUrl = res.data.data + '&sessionId=' + this.sessionId;
            console.log('this.qrCodeUrl', this.qrCodeUrl)
            this.smallUrl = serverHost + '/v1/web/createQRCode' + '?height=120&width=120&' + 'content=' + encodeURIComponent(this.qrCodeUrl)
            this.bigUrl = serverHost + '/v1/web/createQRCode' + '?height=580&width=580&' + 'content=' + encodeURIComponent(this.qrCodeUrl)

            // http://192.168.100.110:8082/yunzhubao/v1/web/createQRCode?height=580&width=580&content=http://192.168.100.110:9097/yunzhubao-bat/v1/web/logined?operate=001&key=1524632164229&sessionId=session-b61d2f56-b5c2-400a-97c6-845b756891ba

            // new QRious({
            //   element: document.getElementById('qrious'),
            //   size: 180,
            //   value: encodeURI(this.qrCodeUrl)
            // });
            // new QRious({
            //   element: document.getElementById('qrious1'),
            //   size: 120,
            //   value: encodeURI(this.qrCodeUrl)
            // });

            this.loading = false
            setTimeout(() => {
              this.isHandover = false
            }, 60000)
          })

        }
      },

      QRCodeRefresh() {
        //this.$emit('getCompanyId','');
        this._downloadTable();
      },

      _downloadTable() {
        let options = {
          type: '1',
          infoType: '001'
        }
        downloadTable(options)
          .then(res => {
            if(res.data.state === 200) {
              this.WebSocketUrl = res.data.data.url;
              this.createWebSocket()
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      createWebSocket() {
        let webSocket = new WebSocket(this.WebSocketUrl);
        let _self = this;
        webSocket.onopen = function(evt) {
          console.log(' websocket 打开dddddddddddddddddddddddddd');
        };
        webSocket.onerror = function(evt) {
          console.log('webSocket打开出错');
        };
        webSocket.onmessage = function(evt) {
          console.log('app扫码返回', evt)
          let isSession = evt.data.slice(0, 7);
          // console.log('webSocket监听信息', evt)
          if(isSession === "session") {
            _self.sessionId = evt.data;
            _self.updateQrCodeLogin();
          } else {
            let data = {
              userId: evt.data,
              key: _self.loginKey,
              operateType: '3'
            };
            userLogin(data).then((res) => {
              console.log('------------登录的时候判断公司名称-------------');
              console.log(res);
              if(res.data.state === 200) {
                sessionStorage.setItem('id', res.data.data.Id);
                sessionStorage.setItem('companyId', res.data.data.companyId);
                sessionStorage.setItem('sig', res.data.data.sig);
                sessionStorage.setItem("nickname", res.data.data.userName);
                sessionStorage.setItem("tokenId", res.data.data.tokenId);
                _self.$emit('getCompanyId',res.data.data.companyId);
                // _self.$router.push('/mainIndex');// 登录成功，保存用户信息，跳转到主页面
              } else {
                _self.$store.dispatch('workPopupError', res.data.msg);
              }
            });
          }
        };
        webSocket.onclose = function(evt) {
          console.log('webSocket服务已经关闭');
        };
      }
    }
  }
</script>
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