import Vue from 'vue'
import resource from 'vue-resource'

Vue.use(resource)
// 创建api接口方法
function apiCall (param, URL) {
    let data = {
      data: param,
      unit: {
        "channel": 3,
        "OS": "web",
        "ip": "string",
        "tokenId": sessionStorage.getItem("tokenId"),
        "userId": sessionStorage.getItem("id"),
        "companyId": sessionStorage.getItem("companyId"),
        "version": ""
      }
    };
    // 内网
    let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8083/yunzhubao' : ''
    // uat
    // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8099' : ''
    // 正式
    // let serverHost = process.env.NODE_ENV === 'development' ? 'https://www.yunzhubao.com' : ''
    let IT_URL = serverHost + URL;
    let foo = function* (up_data) {
        yield Vue.http.post(IT_URL, up_data)
    }
    
    let resourcePromise = foo(data).next().value
    // 中间件
    resourcePromise.then( res =>{
      // 截获登录超时
      if(res.data.state == 100 ){
        Vue.prototype.loginPopup.show()
      }
    })
    
    return resourcePromise
}
// function apiCall (obj, opt) {
//   // let type = obj.type || 'post'
//   // const IT_URL = "http://192.168.100.110:8082/yunzhubao"
//   let foo = function* (opt) {
//     console.log(opt);
//     yield Vue.http[type](LINK_URL, fileData)
//     // let option = opt || {}
//     // let init = obj.init || {}
//     // Object.assign(init, option)
//     // let port = obj.port || ':9082'
//     // let parameterType = obj.parameterType || 'body'
//     // let url = obj.url
//     // let LINK_URL
//     // switch (parameterType) {
//     //   case 'body':
//     //     LINK_URL = `${IF_URL}${url}`
//     //     yield Vue.http[type](LINK_URL, init)
//     //     break;
//     //   case 'path':
//     //     let path = ''
//     //     for (let x in init) {
//     //       path += '/' + init[x]
//     //     }
//     //     LINK_URL = `${IF_URL}${port}${url}${path}`
//     //     yield Vue.http[type](LINK_URL)
//     //     break;
//     //   case 'formData':
//     //     LINK_URL = `${IF_URL}${port}${url}`
//     //     let fileData = new FormData()
//     //     for (let x in init) {
//     //       fileData.append(x, init[x])
//     //     }
//     //     yield Vue.http[type](LINK_URL, fileData)
//     //     break;
//     //   case 'query':
//     //     break;
//     // }
//   }
//     return foo(opt).next().value
// }

// // 创建api接口方法
// function apiCall (obj, opt) {
//   let type = obj.type || 'post'
//   // const IF_URL = 'http://192.168.0.54'
//   const IT_URL = "http://192.168.100.110:8082/yunzhubao"
//   // const IF_URL = 'https://www.jzmsoft.com'
//   // const IF_URL = 'http://192.168.5.110:'
//   // const IF_URL = 'http://192.168.100.110:8082/yunzhubao'
//   let foo = function* (opt) {
//     let option = opt || {}
//     let init = obj.init || {}
//     Object.assign(init, option)
//     let port = obj.port || ':9082'
//     let parameterType = obj.parameterType || 'body'
//     let url = obj.url
//     let LINK_URL
//     switch (parameterType) {
//       case 'body':
//         LINK_URL = `${IF_URL}${url}`
//         yield Vue.http[type](LINK_URL, init)
//         break;
//       case 'path':
//         let path = ''
//         for (let x in init) {
//           path += '/' + init[x]
//         }
//         LINK_URL = `${IF_URL}${port}${url}${path}`
//         yield Vue.http[type](LINK_URL)
//         break;
//       case 'formData':
//         LINK_URL = `${IF_URL}${port}${url}`
//         let fileData = new FormData()
//         for (let x in init) {
//           fileData.append(x, init[x])
//         }
//         yield Vue.http[type](LINK_URL, fileData)
//         break;
//       case 'query':
//         break;
//     }
//   }
//     return foo(opt).next().value
// }

export default apiCall
