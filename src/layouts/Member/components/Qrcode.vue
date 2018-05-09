<template>
  <div class="qrCode" ref="qrCode">
    <p>扫码登录</p>
    <p><img src="" id="qrious"></p>
    <p>使用云珠宝App扫码登录</p>
  </div>
</template>

<script>
import {qrcodeLogin, userLogin} from '../../../Api/auth_v1.js'
import {downloadTable} from 'Api/commonality/seek'
export default {
    data () {
        return {
            WebSocketUrl: '',
            qr: '',
            qrCodeUrl: '',
            loginKey: '',
            sessionId: '',
            reConnectFlag: 5
        }
    },
    mounted () {
        this._downloadTable();
        this.updateQrCodeLogin();
    },
    methods: {
        updateQrCodeLogin () {
            
            if( this.$refs.qrCode ){
              qrcodeLogin({}).then((res) => {
                this.loginKey = res.data.data.split("key=", 13)[1];
                this.qrCodeUrl = res.data.data + '&sessionId=' + this.sessionId;
                new QRious({
                    element: document.getElementById('qrious'),
                    size: 250,
                    value: this.qrCodeUrl
                });
              })
            }else{
              clearInterval(this.intersubsub)
            }
        },
        _downloadTable () {
            let options = {
                type: '1',
                infoType: '001'
            }
            downloadTable(options)
                .then(res => {
                    if (res.data.state === 200) {
                        this.WebSocketUrl = res.data.data.url
                        console.log('this.WebSocketUrl:', this.WebSocketUrl)
                        this.createWebSocket()
                    } else {
                        this.$store.dispatch('workPopupError', res.data.msg);
                    }
                })
        },
        createWebSocket () {
            let webSocket = new WebSocket(this.WebSocketUrl);
            let _self = this;
            webSocket.onopen = function (evt) {
                let t = new Date();
                let timeStr = (t.getHours() < 10 ? '0' + t.getHours() : t.getHours()) + ':' + (t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes());
                console.log(timeStr + ' websocket Opened.');
            };
            webSocket.onerror = function (evt) {
                let t = new Date();
                let timeStr = (t.getHours() < 10 ? '0' + t.getHours() : t.getHours()) + ':' + (t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes());
                console.log(timeStr + ' happend Error. Try be reconnect..');
                if (this.reConnectFlag >= 0) {
                    setTimeout(_self.createWebSocket, 1000);
                    --this.reConnectFlag;
                }
            };
            webSocket.onmessage = function (evt) {
                let isSession = evt.data.slice(0, 7);
               console.log('evt:', evt)
                if (isSession === "session") {
                    _self.sessionId = evt.data;
                    _self.updateQrCodeLogin();
                    _self.intersubsub = setInterval(_self.updateQrCodeLogin, 60000)
                    // setInterval(_self.updateQrCodeLogin, 60000);
                } else {
                    let data = {
                        userId: evt.data,
                        key: _self.loginKey,
                        operateType: '3'
                    };
                    userLogin(data).then((res) => {
                        if (res.data.state === 200) {
                            clearInterval(_self.intersubsub)
                            if(res.data.data.Id){
                              sessionStorage.setItem('id', res.data.data.Id);
                            }else if(res.data.data.userId){
                              sessionStorage.setItem("id", res.data.data.userId);
                            }
                            
                            sessionStorage.setItem('companyId', res.data.data.companyId);
                            sessionStorage.setItem('sig', res.data.data.sig);
                            sessionStorage.setItem("nickname", res.data.data.userName);
                            sessionStorage.setItem("tokenId", res.data.data.tokenId);
                            _self.$router.push('/mainIndex');
                        } else {
                            _self.$store.dispatch('workPopupError', res.data.msg);
                        }
                    });
                }
            };
            webSocket.onclose = function (evt) {
                let t = new Date();
                let timeStr = (t.getHours() < 10 ? '0' + t.getHours() : t.getHours()) + ':' + (t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes());
                console.log(timeStr + ' Server Closed the connect. Will be reconnect..');
                if (this.reConnectFlag >= 0) {
                    setTimeout(_self.createWebSocket, 1000);
                    --this.reConnectFlag;
                }
            };
        }
    }
}
</script>