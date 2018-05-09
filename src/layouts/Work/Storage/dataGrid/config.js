/*
 * 商品字段获取 请看接口文档 6.3 newGoodsInfoList
 * */
/* 左边固定数据  */
export const fixedData = [
  {
    id: '01',
    width: 50, //单元格宽度 单位为px
    text: '序号', // 单元格名 
    type: '', // 后台返回的数据字段
    unit: '', // 单位
    total: 'totalNum' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 80,
    text: '条码号',
    type: 'barcode',
    unit: '',
    total: ''
  },
//{
//  id: '03',
//  width: 80,
//  text: '产品分类',
//  type: 'productType',
//  unit: '',
//  total: ''
//},
  {
    id: '04',
    width: 120,
    text: '产品类别',
    type: 'productClasses',
    unit: '',
    total: ''
  }
]

/* 大类 */
export const bigTitleData = [
  {
    id: '01',
    width: 100, //单元格宽度 单位为px
    text: '首饰名称', // 单元格名 
    type: 'jewelryNameData', // 注意：这里不是拿后台数据了 而是去匹配小类的配置数据的变量名
    total: '' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 100,
    text: '基本信息',
    type: 'basicData',
    total: ''
  },
  {
    id: '03',
    width: 90,
    text: '重量',
    type: 'weightData',
    total: ''
  },
  {
    id: '04',
    width: 90,
    text: '证书',
    type: 'certificateData',
    total: ''
  },
  {
    id: '05',
    width: 90,
    text: '主石',
    type: 'mainStoneData',
    total: 'totalMainWeight'
  },
  {
    id: '06',
    width: 90,
    text: '副石',
    type: 'deputyStoneData',
    total: ''
  },
  {
    id: '07',
    width: 90,
    text: '工费',
    type: 'wageData',
    total: ''
  },
  {
    id: '08',
    width: 90,
    text: '配件',
    type: 'mountingsData',
    total: ''
  },
  {
    id: '09',
    width: 90,
    text: '其他费用',
    type: 'otherCostData',
    total: ''
  },
  {
    id: '10',
    width: 90,
    text: '标价',
    type: 'bidPriceData',
    total: ''
  }
]

/* 首饰名称  */
export const jewelryNameData = [
  {
    id: '01',
    width: 120, //单元格宽度 单位为px
    text: '成色名称', // 单元格名 
    type: 'metalColor', // 后台返回的数据字段
    unit: '', // 单位
    total: '' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 120,
    text: '金含量',
    type: 'partGold',
    unit: '(‰)',
    total: ''
  },
  {
    id: '03',
    width: 120,
    text: '宝石名称',
    type: 'gemName',
    unit: '',
    total: ''
  },
  {
    id: '04',
    width: 120,
    text: '首饰类别',
    type: 'jewelryName',
    unit: '',
    total: ''
  }
]

/* 基本信息  */
export const basicData = [
  {
    id: '01',
    width: 100, //单元格宽度 单位为px
    text: '品牌', // 单元格名 
    type: 'brand', // 后台返回的数据字段
    unit: '', // 单位
    total: '' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 100,
    text: '款号',
    type: 'modelNo',
    canclear:true,
    unit: '',
    total: ''
  },
  {
    id: '03',
    width: 100,
    text: '手寸',
    type: 'handInch',
    canclear:true,
    unit: '',
    total: ''
  },
  {
    id: '04',
    width: 100,
    text: '手寸单位',
    type: 'handInchUnit',
    noRemove:true,
    unit: '',
    total: ''
  },
  {
    id: '05',
    width: 100,
    text: '备注',
    type: 'remark',
    canclear:true,
    unit: '',
    total: ''
  }
]


/* 重量  */
export const weightData = [
  {
    id: '01',
    width: 120, //单元格宽度 单位为px
    text: '总件重', // 单元格名 
    type: 'totalWeight', // 后台返回的数据字段
    unit: '(g)', // 单位
    total: 'totalWeight' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 120,
    text: '净金重',
    type: 'netWeight',
    unit: '(g)',
    total: 'totalNetWeight'
  },
  {
    id: '03',
    width: 120,
    text: '含配金重',
    type: 'heavyCode',
    unit: '(g)',
    total: 'totalHeavyWeight'
  },
  {
    id: '04',
    width: 120,
    text: '金耗',
    type: 'goldCost',
    unit: '(%)',
    total: ''
  },
  {
    id: '05',
    width: 120,
    text: '金价',
    type: 'goldPrice',
    unit: '(元)',
    total: ''
  },
  {
    id: '06',
    width: 120,
    text: '金属颜色',
    type: 'goldColor',
    unit: '',
    total: ''
  },
  {
    id: '07',
    width: 120,
    text: '金料额',
    type: 'goldE',
    unit: '(元)',
    total: 'totalGoldE'
  }
]


/* 证书  */
export const certificateData = [
  {
    id: '01',
    width: 110, //单元格宽度 单位为px
    text: '证书号', // 单元格名 
    type: 'certifiNo', // 后台返回的数据字段
    unit: '', // 单位
    total: '' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 50,
    text: '验证码',
    type: 'authCode',
    unit: '',
    total: ''
  },
  {
    id: '03',
    width: 110,
    text: '证书名',
    type: 'certifiName',
    unit: '',
    total: ''
  },
  {
    id: '04',
    width: 120,
    text: '检验机构',
    type: 'organizationName',
    readonly:true,
    unit: '',
    total: ''
  },
  {
    id: '05',
    width: 130,
    text: '网址',
    type: 'website',
    readonly:true,
    unit: '',
    total: ''
  },
  {
    id: '06',
    width: 120,
    text: '电话',
    type: 'phone',
    readonly:true,
    unit: '',
    total: ''
  },
  {
    id: '07',
    width: 80,
    text: '检测标准1',
    type: 'stand1',
    readonly:true,
    unit: '',
    total: ''
  },
  {
    id: '08',
    width: 80,
    text: '检测标准2',
    type: 'stand2',
    readonly:true,
    unit: '',
    total: ''
  },
  {
    id: '09',
    width: 80,
    text: '检测标准3',
    type: 'stand3',
    readonly:true,
    unit: '',
    total: ''
  },
  {
    id: '10',
    width: 60,
    text: '证书费',
    type: 'certifiFee',
    unit: '(元)',
    total: 'totalCertifiFee'
  }
]

/* 主石  */
export const mainStoneData = [
  {
    id: '01',
    width: 70, //单元格宽度 单位为px
    text: '主石名', // 单元格名 
    type: 'mainName', // 后台返回的数据字段
    unit: '', // 单位
    total: '' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 70,
    text: '主石规格',
    type: 'stand',
    unit: '',
    total: ''
  },
  {
    id: '03',
    width: 60,
    text: '主石粒数',
    type: 'count',
    unit: '',
    total: 'totalMainCount'
  },
  {
    id: '04',
    width: 60,
    text: '主石重',
    type: 'mainWeight',
    unit: '',
    total: 'totalMainWeight'
  },
  {
    id: '05',
    width: 70,
    text: '主石单位',
    type: 'unit',
    noRemove:true,
    unit: '',
    total: ''
  },
  {
    id: '06',
    width: 70,
    text: '主石单价',
    type: 'unitPrice',
    unit: '(元)',
    total: ''
  },
  {
    id: '07',
    width: 70,
    text: '计价方式',
    type: 'mainCalcMethod',
    noRemove:true,
    unit: '',
    total: ''
  },
  {
    id: '08',
    width: 60,
    text: '形状',
    type: 'shape',
    unit: '',
    total: ''
  },
  {
    id: '09',
    width: 55,
    text: '颜色',
    type: 'color',
    unit: '',
    total: ''
  },
  {
    id: '10',
    width: 55,
    text: '净度',
    type: 'neatNess',
    unit: '',
    total: ''
  },
  {
    id: '11',
    width: 55,
    text: '切工',
    type: 'blackout',
    unit: '',
    total: ''
  },
  {
    id: '12',
    width: 60,
    text: '抛光',
    type: 'polishing',
    unit: '',
    total: ''
  },
  {
    id: '13',
    width: 60,
    text: '对称',
    type: 'symmetry',
    unit: '',
    total: ''
  },
  {
    id: '14',
    width: 60,
    text: '荧光',
    type: 'fluorescent',
    unit: '',
    total: ''
  },
  {
    id: '15',
    width: 60,
    text: '主石额',
    type: 'mainPrice',
    unit: '',
    total: 'totalMainPrice'
  }
]

/* 副石  */
export const deputyStoneData = [
  {
    id: '01',
    width: 100, //单元格宽度 单位为px
    text: '副石名', // 单元格名 
    type: 'deputyName', // 后台返回的数据字段
    unit: '', // 单位
    total: '' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 100,
    text: '副石规格',
    type: 'deputyStand',
    unit: '',
    total: ''
  },
  {
    id: '03',
    width: 100,
    text: '副石粒数',
    type: 'deputyCount',
    unit: '',
    total: 'totalDeputyCount'
  },
  {
    id: '04',
    width: 100,
    text: '副石重',
    type: 'deputyWeight',
    unit: '',
    total: 'totalDeputyWeight'
  },
  {
    id: '05',
    width: 100,
    text: '副石单位',
    type: 'deputyUnit',
    noRemove:true,
    unit: '',
    total: ''
  },
  {
    id: '06',
    width: 100,
    text: '副石单价',
    type: 'deputyUnitPrice',
    unit: '(元)',
    total: ''
  },
  {
    id: '07',
    width: 100,
    text: '计价方式',
    type: 'deputyCalcMethod',
    noRemove:true,
    unit: '',
    total: ''
  },
  {
    id: '08',
    width: 100,
    text: '副石额',
    type: 'deputyPrice',
    unit: '',
    total: 'totalDeputyPrice'
  }
]


/* 工费  */
export const wageData = [
  {
    id: '01',
    width: 120, //单元格宽度 单位为px
    text: '销售工费', // 单元格名 
    type: 'soldFee', // 后台返回的数据字段
    unit: '(元)', // 单位
    total: 'totalSoldFee' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 120,
    text: '销售工费方式',
    type: 'soldMethod',
    noRemove:true,
    unit: '',
    total: ''
  },
  {
    id: '03',
    width: 120,
    text: '进货工费',
    type: 'inFee',
    unit: '(元)',
    total: 'totalInFee'
  },
  {
    id: '04',
    width: 120,
    text: '进货工费方式',
    type: 'inMethod',
    noRemove:true,
    unit: '',
    total: ''
  },
  {
    id: '05',
    width: 120,
    text: '进货工费额',
    type: 'inMoney',
    unit: '(元)',
    total: 'totalInMoney'
  }
]

/* 配件  */
export const mountingsData = [
  {
    id: '01',
    width: 120, //单元格宽度 单位为px
    text: '配件名', // 单元格名 
    type: 'partName', // 后台返回的数据字段
    unit: '', // 单位
    total: '' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 120,
    text: '配件数',
    type: 'partCount',
    unit: '',
    total: 'totalPartCount'
  },
  {
    id: '03',
    width: 120,
    text: '配件重',
    type: 'partWeight',
    unit: '(g)',
    total: 'totalPartWeight'
  },
  {
    id: '04',
    width: 120,
    text: '配件单价',
    type: 'partPrice',
    unit: '',
    total: ''
  },
  {
    id: '05',
    width: 120,
    text: '配件计价方式',
    type: 'calcMethod',
    noRemove:true,
    unit: '',
    total: ''
  },
  {
    id: '05',
    width: 120,
    text: '配件额',
    type: 'price',
    unit: '(元)',
    total: 'totalPartPrice'
  }
]

/* 其他费用  */
export const otherCostData = [
  {
    id: '01',
    width: 150, //单元格宽度 单位为px
    text: '其他费用名', // 单元格名 
    type: 'otherFeeName', // 后台返回的数据字段
    canclear:true,
    unit: '', // 单位
    total: '' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 150,
    text: '其他费用额',
    type: 'otherFee',
    unit: '(元)',
    total: 'totalOtherFee'
  }
]


/* 标价  */
export const bidPriceData = [
  {
    id: '01',
    width: 120, //单元格宽度 单位为px
    text: '成本', // 单元格名 
    type: 'costPrice', // 后台返回的数据字段
    unit: '', // 单位
    total: 'totalCost' // 合计 用于表尾统计
  },
  {
    id: '02',
    width: 120,
    text: '倍率',
    type: 'ratio',
    unit: '',
    total: ''
  },
  {
    id: '03',
    width: 120,
    text: '售价',
    type: 'soldPrice',
    unit: '(元)',
    total: 'totalSoldPrice'
  }
]
