import Vue from 'vue'
import resource from 'vue-resource'
Vue.use(resource)

function apiCall(param, URL) {
  let up_data = {
    data: param,
    unit: {
      channel: 3,
      OS: "web",
      ip: "",
      tokenId: sessionStorage.getItem("tokenId"),
      userId: sessionStorage.getItem("id"),
      companyId: sessionStorage.getItem("companyId"),
      "version": ""
    }
  }
  // let serverHost = process.env.NODE_ENV === 'development' ? '' : '' // http://192.168.100.110:8082/yunzhubao
  // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8082/yunzhubao' : ''
  let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8082/yunzhubao' : ''
  // let serverHost = 'http://www.jzmsoft.com'
  //let url = serverHost + URL
  //console.log(url)
  let FULL_URL = serverHost + URL
  let bar = function* (rq_param) {
    yield Vue.http.post(FULL_URL, rq_param)
  }
  
  let resourcePromise = bar(up_data).next().value
    // 中间件
    resourcePromise.then( res =>{
      // 截获登录超时
      if(res.data.state == 100 ){
       Vue.prototype.loginPopup.show()
      }
      console.log(res.data)
    })
    
  return resourcePromise
}

export default {
  apiCall
}
