import 'whatwg-fetch'
import 'es6-promise'
import axios from 'axios'

export default function request(method, url, body) {
    method = method.toUpperCase();
    if (method === 'GET') {
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body
    }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            return res;
        } else {
            return Promise.reject('请求失败！');
        }
    })
}

export const get = path => request('GET', path);
export const post = (path, body) => request('POST', path, body);

export const downLoaderFile = (url,data) => {
    let newData = data
    
    newData["companyId"] = sessionStorage.getItem("companyId")
    newData["channel"] = 3
    newData["OS"] = "web"
    newData["ip"] = "string"
    newData["userId"] = sessionStorage.getItem("id")
    newData["tokenId"] = sessionStorage.getItem("tokenId")

    let dataStr = ''
    for (const key in newData) {
        dataStr+=key+'='+newData[key]+'&'
    }




//     // sessionStorage.setItem("ApiData", JSON.stringify(data));
//     // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8082/yunzhubao' : ''
//     // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:9092/yunzhubao' : ''
//     // 内网
        let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8083/yunzhubao' : ''
    // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.109:8080/yunzhubao' : ''
//     //let serverHost = process.env.NODE_ENV === 'development' ? 'https://program.yunzhubao.com/yunzhubao/' : ''
//     // UAT
//     // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8099' : ''
//     // 测试本地
//    // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8082/yunzhubao' : ''

//     // 本地
//     // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.109:8080/yunzhubao' : ''

//     // let serverHost = 'http://www.jzmsoft.com'
//     // 正式
//     // let serverHost = process.env.NODE_ENV === 'development' ? 'https://www.yunzhubao.com' : ''
    let hrefurl = serverHost + url + '?' + dataStr

    console.log(hrefurl)

    var a = document.createElement('a');
    a.href = hrefurl;
    a.download = "filename.xlsx";
    a.click();                    
}
