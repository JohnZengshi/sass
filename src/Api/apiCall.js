import Vue from 'vue'
import resource from 'vue-resource'

Vue.use(resource)
// 创建api接口方法
function apiCall (param, URL) {
    let data = {};
    if (param && param.unit) {
        Object.assign(data,param);
    }else{
        data = {
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
    }


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
    // resourcePromise.then( res =>{
    //   // 截获登录超时
    //   if(res.data.state == 100 ){
    //     Vue.prototype.loginPopup.show()
    //   }
    // })

    return resourcePromise
}
export default apiCall
