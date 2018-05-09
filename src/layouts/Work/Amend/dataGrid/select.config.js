
// 单位
const unit = [
  {
    classesName : 'ct',
    classesId : ''
  },
  {
    classesName : 'g',
    classesId : ''
  }
]

// 规格
const stand = [
  {
    classesName : '8x12',
    classesId : ''
  },
  {
    classesName : '7x9',
    classesId : ''
  }
]

// 计价方式
const method = [
  {
    classesName : '计件',
    classesId : ''
  },
  {
    classesName : '计重',
    classesId : ''
  }
]

// 手寸单位
const handInchUnit = [
  {
    classesName : '#',
    classesId : ''
  },
  {
    classesName : '寸',
    classesId : ''
  },
  {
    classesName : 'cm',
    classesId : ''
  }
]



module.exports = {
  
  // 产品类别
  productTypeName : {
    fetchType : 'typeList', //商品属性接口
    isResolveChildren : true,
    resData : 'productTypeName',
    option : {
      type : 1
    }
  },
  
  // 成色名称
  metalColor : {
    // 请求api地址 关于api地址，请移步fetchData.js
    fetchType : 'classlist',
    
    // 存储后台数据的字段名 
    resData : 'metalColor',
    
    // 根据后台返回的数据列表 是都分解到下一级 默认是分解
    isResolveChildren : true,
    // 请求参数 关于参数 请看接口文档 
    option : {
      type : 1
    }
  },
  
  
  // 金含量
  partGold : {
    fetchType : 'propertyList', //商品属性接口
    isResolveChildren : true,
    resData : 'partGold',
    option : {
      type : 1
    }
  },
  
  // 宝石名称
  gemName : {
    fetchType : 'classlist',
    isResolveChildren : true,
    resData : 'gemName',
    option : {
      type : 2
    }
  },
  
  // 首饰类别
  jewelryName : {
    fetchType : 'classlist',
    isResolveChildren : true,
    resData : 'jewelryName',
    option : {
      type : 3
    }
  },
  
  // 手寸单位
  handInchUnit: {
    datalist : handInchUnit,
    resData : 'handInchUnit'
  },
  
  // 品牌
  brand: {
    fetchType : 'propertyList', 
    isResolveChildren : true,
    resData : 'brand',
    option : {
      type : 2
    }
  },
  
  // 重量 =>金属颜色
  goldColor: {
    fetchType : 'propertyList', 
    isResolveChildren : true,
    resData : 'goldColor',
    option : {
      type : 3
    }
  },
  
  // 证书名
  certifiName: {
    fetchType : 'certificateList', 
    isResolveChildren : true,
    resData : 'certifiName',
    option : {} // 没有参数
  },
  
  // 检验机构
  organizationName: {
    fetchType : 'certificateList', 
    isResolveChildren : true,
    resData : 'organizationName',
    option : {} // 没有参数
  },
  
  // 主石名
  mainName : {
    fetchType : 'classlist',
    isResolveChildren : true,
    /*  resDataRedirect 字段重定向
     *  这里的重定向主要是针对 resData字段避免过多请求下拉数据而设定数据共享操作
     * */
    resDataRedirect : 'gemName', // 继承宝石名称的数据
    resData : 'mainName',
    option : {
      type : 2
    }
  },
  
  // 主石 => 规格
  stand : {
    datalist: stand,
    resData : 'stand'
  },
  
  // 主石 => 主石单位
  unit : {
    datalist: unit,
    resData : 'unit'
  },
  
  // 主石 => 计价方式
  mainCalcMethod : {
    datalist: method,
    resData : 'mainCalcMethod'
  },
  
  // 宝石 => 形状 ,宝石属性结构比较特殊 需要特殊处理
  shape : {
    fetchType : 'classlist',
    isResolveChildren : false, //不需要分解 
    classesName: '形状',
    localStorage: 'jewelProperty', //离线存储名
    resData : 'shape',
    option : {
      type : 4
    }
  },
  
  // 宝石 => 颜色, 宝石属性结构比较特殊 需要特殊处理
  color : {
    fetchType : 'classlist',
    isResolveChildren : false, //不需要分解 
    classesName: '颜色',
    localStorage: 'jewelProperty', //离线存储名
    resData : 'color',
    option : {
      type : 4
    }
  },
  
  // 宝石 => 净度, 宝石属性结构比较特殊 需要特殊处理
  neatNess : {
    fetchType : 'classlist',
    isResolveChildren : false, //不需要分解 
    classesName: '净度',
    localStorage: 'jewelProperty', //离线存储名
    resData : 'neatNess',
    option : {
      type : 4
    }
  },
  
  // 宝石 => 切工, 宝石属性结构比较特殊 需要特殊处理
  blackout : {
    fetchType : 'classlist',
    isResolveChildren : false, //不需要分解 
    classesName: '切工',
    localStorage: 'jewelProperty', //离线存储名
    resData : 'blackout',
    option : {
      type : 4
    }
  },
  
  // 宝石 => 抛光, 宝石属性结构比较特殊 需要特殊处理
  polishing : {
    fetchType : 'classlist',
    isResolveChildren : false, //不需要分解 
    classesName: '抛光',
    localStorage: 'jewelProperty', //离线存储名
    resData : 'polishing',
    option : {
      type : 4
    }
  },
  
  // 宝石 => 对称, 宝石属性结构比较特殊 需要特殊处理
  symmetry : {
    fetchType : 'classlist',
    isResolveChildren : false, //不需要分解 
    classesName: '对称',
    localStorage: 'jewelProperty', //离线存储名
    resData : 'symmetry',
    option : {
      type : 4
    }
  },
  
  // 宝石 => 荧光, 宝石属性结构比较特殊 需要特殊处理
  fluorescent : {
    fetchType : 'classlist',
    isResolveChildren : false, //不需要分解 
    classesName: '荧光',
    localStorage: 'jewelProperty', //离线存储名
    resData : 'fluorescent',
    option : {
      type : 4
    }
  },
  
  // 副石
  deputyName : {
    fetchType : 'classlist',
    isResolveChildren : true,
    /*  resDataRedirect 字段重定向
     *  这里的重定向主要是针对 resData字段避免过多请求下拉数据而设定数据共享操作
     * */
    resDataRedirect : 'gemName', // 继承宝石名称的数据
    resData : 'deputyName',
    option : {
      type : 2
    }
  },
  
  // 副石 => 规格
  deputyStand : {
    datalist: stand,
    resData : 'deputyStand'
  },
  
  // 副石 => 主石单位
  deputyUnit : {
    datalist: unit,
    resData : 'deputyUnit'
  },
  
  // 副石 => 计价方式
  deputyCalcMethod : {
    datalist: method,
    resData : 'deputyCalcMethod'
  },
  
  // 配件名
  partName: {
    fetchType : 'propertyList', 
    isResolveChildren : true,
    resData : 'partName',
    option : {
      type : 4
    }
  },
  
  // 工费 => 销售工费方式
  soldMethod : {
    datalist: method,
    resData : 'soldMethod'
  },
  
  // 工费 => 进货工费方式
  inMethod : {
    datalist: method,
    resData : 'inMethod'
  },
  
  // 配件 => 计价方式
  calcMethod : {
    datalist: method,
    resData : 'calcMethod'
  }
}
