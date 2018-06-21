export const downLoaderFile = (url,data) => {
    let newData = data
    
    newData["companyId"] = sessionStorage.getItem("companyId")
    newData["channel"] = 3
    newData["OS"] = "web"
    newData["ip"] = "string"
    newData["userId"] = sessionStorage.getItem("id")
    newData["tokenId"] = sessionStorage.getItem("tokenId")

    let dataStr = ''
    console.log(data)
    for (const key in newData) {
        // if(key === 'sortList' || key === 'checkUserList' || key === 'makeUserList'){
        if(newData[key] instanceof Array){
            newData[key] = JSON.stringify(newData[key]) + ''
            // newData[key] = newData[key].join(',')
            // let str = ''
            // console.log(newData[key].length)
            // for(let i = 0;i<newData[key].length;i++){
            //     if(i === 0){
            //         if((newData[key].length-1) == 0) {
            //             str+=JSON.stringify(newData[key][i])                                        
            //         }else{
            //             str+=JSON.stringify(newData[key][i])+'&'
            //         }
            //     } else if(i === (newData[key].length - 1)){
            //         str+='sortList='+JSON.stringify(newData[key][i])
            //     } else{
            //         str+='sortList='+JSON.stringify(newData[key][i])+'&'
            //     }
            // }
            // newData[key] = str
            console.log(newData[key])
        }
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
	var newStr = JSON.stringify(dataStr)
    let hrefurl = serverHost + url + '?' + dataStr
    
    let strurl = encodeURI(hrefurl)
    console.log(strurl)

    var a = document.createElement('a');
    a.href = encodeURI(hrefurl);
    a.download = "filename.xlsx";
    // $('a').click();
    // a.click();      
    // invokeClick(a)              
}
// 兼容火狐
function invokeClick(element) {
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    element.dispatchEvent(evt);
}
