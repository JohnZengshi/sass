import {
  downloadTable, 
  seekProductClassList,  // 6.23商品大小类列表
  seekProductPropertyList, // 6.27商品属性列表
  seekShowhCertificateList, // 6.31证书列表  
  getProductTypeList
}
from 'Api/commonality/seek'

import {
  operateUpdateGoods,  // 编辑 过后保存编辑的内容
  operateAddProductToRKOrder, //添加商品
  operateProductList // 删除订单
}
from 'Api/commonality/operate'
// 下拉选择配置文件
export const Select = require('./select.config')

// 获取商品类型列表
export const typeList = (config, resolve) =>{
  
  getProductTypeList(config.option)
  .then((res) => {
    resolve && resolve(res.data.data.list)
  }).catch((res) => {
    console.log(res)
  })
}

// 获取商品大小类列表数据
export const classlist = (config, resolve) =>{
  
  seekProductClassList(config.option)
  .then((res) => {
    let datas = res.data.data.list
    if (config.option.type == 1) {
      for (let i of datas) {
        i.typeList = i.childrenList
        delete i.childrenList
      }
    }
    // 宝石属性
    if (config.option.type && config.option.type == 4) {
      localStorage.setItem('jewelProperty',encodeURIComponent(JSON.stringify(datas)))
    }
    resolve && resolve(datas)
  }).catch((res) => {
    console.log(res)
  })
}

// 获取商品属性列表
export const propertyList = (config, resolve) =>{
  
  seekProductPropertyList(config.option)
  .then((res) => {
    resolve && resolve(res.data.data.list)
  }).catch((res) => {
    console.log(res)
  })
}

// 商品证书列表
export const certificateList = (config, resolve) =>{
  
  seekShowhCertificateList(config.option)
  .then((res) => {
    // 证书返回列表 有点特殊 需要重新组装返回给列表
    let tempData = {
      resData :res.data.data.list,
      [config.resData] : []
    }
    if (tempData.resData.length > 0) {
      tempData.resData.forEach(f => {
        // console.log(f,config.resData)
        tempData[config.resData].push({
          classesId : f.id,
          classesName : f[config.resData == 'certifiName' ? 'certificateName' : config.resData]
        })
      })
    }
    resolve && resolve(tempData[config.resData])
  }).catch((res) => {
    console.log(res)
  })
}

// 更新商品列表
export const updataGoodsList = (option, resolve) =>{
  operateUpdateGoods(option)
  .then((res) => {
    resolve && resolve(res)
  }).catch((res) => {
    console.log(res)
  })
}

// 删除商品
export const deleteGoods = (option, resolve) =>{
  operateProductList(option)
  .then((res) => {
    resolve && resolve(res)
  }).catch((res) => {
    console.log(res)
  })
}

export const addOrderDefaultJSON = {
  authCode:'',
  barcode:'',
  blackout:'',
  brand:'',
  calcMethod:'计重',
  certifiFee:'',
  certifiName:'',
  certifiNo:'',
  color:'',
  costPrice:'',
  count:'',
  deputyCalcMethod:'计重',
  deputyCount:'',
  deputyName:'',
  deputyPrice:'',
  deputyStand:'',
  deputyUnit:'ct',
  deputyUnitPrice:'',
  deputyWeight:'',
  fluorescent:'',
  gemName:'',
  goldColor:'',
  goldCost:'',
  goldE:'',
  goldPrice:'',
  handInch:'',
  handInchUnit:'#',
  heavyCode:'',
  inFee:'',
  inMethod:'计重',
  inMoney:'',
  jewelryName:'',
  mainCalcMethod:'计重',
  mainName:'',
  mainPrice:'',
  mainWeight:'',
  metalColor:'',
  modelNo:'',
  neatNess:'',
  netWeight:'',
  otherFee:'',
  otherFeeName:'',
  partCount:'',
  partGold:'',
  partName:'',
  partPrice:'',
  partWeight:'',
  polishing:'',
  price:'',
  productId:'',
  productClasses: '',
  ratio:'',
  remark:'',
  shape:'',
  soldFee:'',
  soldMethod:'计重',
  soldPrice:'',
  stand:'',
  symmetry:'',
  totalWeight:'',
  unit:'ct',
  unitPrice:''
}
