import Vue from 'vue'
import resource from 'vue-resource'

Vue.use(resource)

// 创建api接口方法
function apiCall (parm, URL) {
    let data = {
        "data": parm || {},
        "unit": {
            "companyId": sessionStorage.getItem("companyId"),
            "channel": 3,
            "OS": "web",
            "ip": "string",
            "userId": sessionStorage.getItem("id"),
            "tokenId": sessionStorage.getItem("tokenId")
        }
    }
    // sessionStorage.setItem("ApiData", JSON.stringify(data));
    // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8082/yunzhubao' : ''
    // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:9092/yunzhubao' : ''
    // 内网
  let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8083/yunzhubao' : ''
     // 测试
    // let serverHost = process.env.NODE_ENV === 'development' ? 'http://www.yunzhubao.com:9001' : ''
    //let serverHost = process.env.NODE_ENV === 'development' ? 'https://program.yunzhubao.com/yunzhubao/' : ''
    // UAT
    // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8099' : ''
    // 测试本地
   // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8082/yunzhubao' : ''

    // 本地
    // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.109:8080/yunzhubao' : ''

    // let serverHost = 'http://www.jzmsoft.com'
    // 正式
    // let serverHost = process.env.NODE_ENV === 'development' ? 'https://www.yunzhubao.com' : ''
    let url = serverHost + URL
    //console.log(url)
    let foo = function* (data) {
        yield Vue.http.post(url, data)
    }
    
    
    let resourcePromise = foo(data).next().value
    // 中间件
    resourcePromise.then( res =>{
        // console.log('中间件拦截', res)
      // 截获登录超时
      if(res.data.state == 100 ){
        Vue.prototype.loginPopup.show()
      }
      
    })
    
    return resourcePromise
}

export default apiCall
