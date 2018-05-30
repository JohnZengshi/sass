<template>
  <!-- 测试 -->
  <div class="xh-text-main">
    <ul>
      <li @click="_downloadTable">获取地址</li>
      <li @click="createdW">连接webSocket</li>
      <li @click="setSend">发消息</li>
      <li>推送给APP</li>
    </ul>
  </div>
</template>
<script>
import {downloadTable} from 'Api/commonality/seek'
import {operateLogout} from 'Api/commonality/operate'
export default {
  data () {
    return {
      url: ''
    }
  },
  methods: {
    // 获取推送地址
    _downloadTable () {
      let options = {
        "type":"1",
        "infoType":"003"
      }
      downloadTable(options)
        .then(res => {
          // ws://192.168.100.110:9097/yunzhubao-bat/ws/{companyId}/1?msgType=09&os={client}&userId={userId}&env=test
          if (res.data.state == 200) {
            let url = res.data.data.url
            url = url.replace('{companyId}', sessionStorage.getItem('companyId'))
            url = url.replace('{client}', 'web')
            url = url.replace('{userId}', sessionStorage.getItem('id'))
            this.url = url
            console.log('组装好的地址', url)
          }
        })
    },
    setSend () {
      this.toSend()
    },
    createdW () {
      let _self = this
      let ws = new WebSocket(this.url)
      // 连接成功
      ws.onopen = function(evt) {
        // 通知APP，这边在登录了
        ws.send(JSON.stringify({"os":"web","fs":"xiaohua","status":"1"}))
        console.log('测试连接成功', evt)
      }
      // 有新消息来
      ws.onmessage = function(evt) {
        console.log('新消息', evt.data)
        let datas = JSON.parse(evt.data)
        if (datas.msgType == '09') { // 登出
          if (datas.os == 'app') {
            if (datas.opType == 'qry') {
              ws.send(JSON.stringify({"os":"web","fs":"xiaohua","msgType":"09","status":"1"}))
            } else if (datas.opType == 'out') {
              operateLogout()
                .then(res => {
                  debugger
                    if (res.data.state == 200) {
                        ws.close()
                        _seft.$router.push({path: '/member/login'})
                        let body = document.getElementById('body')
                        body.style.background = '#f5f8f7'
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }
                })
            }
          }
        } else if (datas.msgType == '09') { // 人脸识别

        }
        // 回复app有新消息来
        // ws.send({"os":"web","msgType":"09","status":"1"})
        console.log('测试有新消息来', evt.data)
      }
      ws.error = function(evt) {
        console.log('测试连接失败', evt)
      }
      _self.toSend = () => {
        ws.send(JSON.stringify({"os":"web","fs":"xiaohua","status":"1"}))
      }
      // ws.send({"companyId":"a0f6f89348b54","msgType":"测试浏览器关闭","os":"app","userId":"111233","status":"0"})
      window.onbeforeunload = function() {
        ws.send({"companyId":sessionStorage.getItem('companyId'),"msgType":"09","os":"web","userId":sessionStorage.getItem('id'),"status":"1000"})
        ws.close()
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.xh-text-main{
  >ul{
    >li{
      border: 2px solid red;
      height: 100px;
      width: 200px;
      margin: 10px;
      cursor: pointer;
    }
  }
}
</style>