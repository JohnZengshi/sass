module.exports = {
  //明细表配置
  detailConfing: [
    {
      id: '0', //id 
      text: '序号', //头部title文字
      width: '80', //单元格宽
      type: 'totalNum', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: '', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : '' // 报表修改 获取修改后的字段
    },
    {
      id: '2', //id 
      text: '条码号', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'barcode', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: 1,
      editOldType : ''
    },
    {
      id: '3', //id 
      text: '首饰名称', //头部title文字
      width: '155', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'jewelryName', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : ''
    },
    {
      id: '8', //id 
      text: '件重', //头部title文字
      width: '120', //单元格宽
      type: 'totalWeight', //合计类型值
      type1: 'afTotalWeight', //合计类型值
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afWeight', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'weight'
    },
    {
      id: '8', //id 
      text: '金重', //头部title文字
      width: '120', //单元格宽
      type: 'totalGoldWeight', //合计类型值
      type1: 'afTotalGoldWeight', //合计类型值
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afGoldWeight', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'goldWeight'
    },
    {
      id: '4', //id 
      text: '主石', //头部title文字
      width: '120', //单元格宽
      type: 'totalMain', //合计类型值
      type1: 'afTotalMain', //合计类型值
      unit: '(ct、g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afMain', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'main'
    },
    // { 
    //  id: '5',  //id 
    //  text: '主石粒数', //头部title文字
    //  width:'115', //单元格宽
    //  type:'', //合计类型值
    //  unit: '', //头部单位补充文字
    //  footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    //  totalName : '',//底部合计 提示文字
    //  childType : 'mainCount', //单元格类型
    //  totalType : '' , //小计
    //     toFixed : false, //是否进行小数点精确截取
    //  countCut : 0, //小数点截取位数
    // },
    {
      id: '6', //id 
      text: '副石', //头部title文字
      width: '120', //单元格宽
      type: 'totalDeputy', //合计类型值
      type1: 'afTotalDeputy', //合计类型值
      unit: '(ct、g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afDeputy', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'deputy'
    },
    // { 
    //  id: '7',  //id 
    //  text: '副石粒数', //头部title文字
    //  width:'115', //单元格宽
    //  type:'', //合计类型值
    //  unit: '', //头部单位补充文字
    //  footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    //  totalName : '',//底部合计 提示文字
    //  childType : 'deputyCount', //单元格类型
    //  totalType : '' , //小计
    //     toFixed : false, //是否进行小数点精确截取
    //     countCut : 0 //小数点截取位数
    // },

    {
      id: '9', //id 
      text: '售价', //头部title文字
      width: '120', //单元格宽
      type: 'totalPrice', //合计类型值
      type1: 'afTotalPrice', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afPrice', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'price'
    },
    {
      id: '10', //id 
      text: '成本', //头部title文字
      width: '120', //单元格宽
      type: 'totalCost', //合计类型值
      type1: 'afTotalCost', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afCost', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'cost'
    },
  ],
  //智能列表
  intelligentConfing: [
    {
      id: '1', //id 
      text: '位置名称', //头部title文字
      width: '130', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'whereName', //单元格类型
      totalType: '', //小计
      totalType0: '', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    // {
    //   id: '2', //id 
    //   text: '模块', //头部title文字
    //   width: '210', //单元格宽
    //   type: '', //合计类型值
    //   type1: '', //合计类型值
    //   unit: '', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: '', //单元格类型
    //   totalType: '', //小计
    //   totalType0: '', //小计1
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0, //小数点截取位数
    //   sort: '1',
    //   editOldType : ''
    // },
    {
      id: '0', //id 
      text: '序号', //头部title文字
      width: '80', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: '', //单元格类型
      totalType: '', //小计
      totalType0: '', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '2', //id 
      text: '产品类别', //头部title文字
      width: '210', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'className', //单元格类型
      totalType: '', //小计
      totalType0: '', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '1',
      editOldType : ''
    },

    {
      id: '3', //id 
      text: '首饰名称', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'className', //单元格类型
      totalType: '', //小计
      totalType0: '', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : ''
    },
    {
      id: '2', //id 
      text: '件数', //头部title文字
      width: '120', //单元格宽
      type: 'totalNum', //合计类型值
      type1: 'afTotalNum', //合计类型值
      unit: '(件)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afNum', //单元格类型
      totalType: 'totalNum1', //小计
      totalType0: 'totalNum0', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'num'
    },
    {
      id: '3', //id 
      text: '件重', //头部title文字
      width: '120', //单元格宽
      type: 'totalWeight', //合计类型值
      type1: 'afTotalWeight', //合计类型值
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afWeight', //单元格类型
      totalType: 'totalWeight1', //小计
      totalType0: 'totalWeight0', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'weight'
    },
    {
      id: '3', //id 
      text: '金重', //头部title文字
      width: '120', //单元格宽
      type: 'totalGoldWeight', //合计类型值
      type1: 'afTotalGoldWeight', //合计类型值
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afGoldWeight', //单元格类型
      totalType: 'totalGoldWeight1', //小计
      totalType0: 'totalGoldWeight0', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'goldWeight'
    },
    // {
    //   id: '4', //id 
    //   text: '主石', //头部title文字
    //   width: '130', //单元格宽
    //   type: 'totalMain', //合计类型值
    //   type1: 'afTotalMain', //合计类型值
    //   unit: '(ct、g)', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: 'afMain', //单元格类型
    //   totalType: 'totalMain1', //小计
    //   totalType0: 'totalMain0', //小计1
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0,
    //   editOldType : 'main'
    // },
    // {
    //   id: '6', //id 
    //   text: '副石', //头部title文字
    //   width: '130', //单元格宽
    //   type: 'totalDeputy', //合计类型值
    //   type1: 'afTotalDeputy', //合计类型值
    //   unit: '(ct、g)', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: 'afDeputy', //单元格类型
    //   totalType: 'totalDeputy1', //小计
    //   totalType0: 'totalDeputy0', //小计1
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0,
    //   editOldType : 'deputy'
    // },
    {
      id: '9', //id 
      text: '售价', //头部title文字
      width: '120', //单元格宽
      type: 'totalPrice', //合计类型值
      type1: 'totalPrice', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afPrice', //单元格类型
      totalType: 'totalPrice1', //小计
      totalType0: 'totalPrice0', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'price'
    },
    {
      id: '10', //id 
      text: '成本', //头部title文字
      width: '120', //单元格宽
      type: 'totalCost', //合计类型值
      type1: 'afTotalCost', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afCost', //单元格类型
      totalType: 'totalCost1', //小计
      totalType0: 'totalCost0', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'cost'
    },
  ],
  //产品分类
  produceConfing: [
    {
      id: '1', //id 
      text: '位置名称', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'whereName', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '0', //id 
      text: '序号', //头部title文字
      width: '80', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: '', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '2', //id 
      text: '产品类别', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'className', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '1',
      editOldType : ''
    },
    {
      id: '2', //id 
      text: '件数', //头部title文字
      width: '120', //单元格宽
      type: 'totalNum', //合计类型值
      type1: 'afTotalNum', //合计类型值
      unit: '(件)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'totalNum1', //单元格类型
      totalType: 'totalNum0', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'totalNum1'
    },
    {
      id: '8', //id 
      text: '件重', //头部title文字
      width: '150', //单元格宽
      type: 'totalWeight', //合计类型值
      type1: 'afTotalWeight', //合计类型值
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afTotalWeight1', //单元格类型
      totalType: 'totalWeight0', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'totalWeight1'
    },
    {
      id: '3', //id 
      text: '金重', //头部title文字
      width: '120', //单元格宽
      type: 'totalGoldWeight', //合计类型值
      type1: 'afTotalGoldWeight', //合计类型值
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'totalGoldWeight1', //单元格类型
      totalType: 'totalGoldWeight1', //小计
      totalType0: 'totalGoldWeight0', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'totalGoldWeight1'
    },
    // {
    //   id: '4', //id 
    //   text: '主石', //头部title文字
    //   width: '150', //单元格宽
    //   type: 'totalMain', //合计类型值
    //   type1: 'afTotalMain', //合计类型值
    //   unit: '(ct、g)', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: 'afMain', //单元格类型
    //   totalType: 'totalMain0', //小计
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0,
    //   editOldType : 'totalMain1'
    // },
    // {
    //   id: '6', //id 
    //   text: '副石', //头部title文字
    //   width: '150', //单元格宽
    //   type: 'totalDeputy', //合计类型值
    //   type1: 'afTotalDeputy', //合计类型值
    //   unit: '(ct、g)', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: 'afDeputy', //单元格类型
    //   totalType: 'totalDeputy0', //小计
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0,
    //   editOldType : 'totalDeputy1'
    // },

    {
      id: '9', //id 
      text: '售价', //头部title文字
      width: '150', //单元格宽
      type: 'totalPrice', //合计类型值
      type1: 'afTotalPrice', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afTotalPrice1', //单元格类型
      totalType: 'totalPrice0', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'totalPrice1'
    },
    {
      id: '10', //id 
      text: '成本', //头部title文字
      width: '120', //单元格宽
      type: 'totalCost', //合计类型值
      type1: 'afTotalCost', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afCost', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'cost'
    },
    // {
    //   id: '10', //id 
    //   text: '成本', //头部title文字
    //   width: '150', //单元格宽
    //   type: 'totalCost', //合计类型值
    //   type1: 'afTotalCost', //合计类型值
    //   unit: '(元)', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: 'afTotalCost1', //单元格类型
    //   totalType: 'totalCost0', //小计
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0, //小数点截取位数
    //   sort: '',
    //   editOldType : 'totalCost1'
    // },
  ],
  //自定义分类
  customConfing: [
    {
      id: '1', //id 
      text: '位置名称', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'whereName', //单元格类型
      totalType: '', //小计
      totalType0: '', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType: ''
    },
    {
      id: '0', //id 
      text: '序号', //头部title文字
      width: '80', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: '', //单元格类型
      totalType: '', //小计
      totalType0: '', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType:''
    },
    {
      id: '2', //id 
      text: '产品类别', //头部title文字
      width: '210', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'className', //单元格类型
      totalType: '', //小计
      totalType0: '', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '1',
      editOldType : ''
    },
    {
      id: '2', //id 
      text: '首饰名称', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'className', //单元格类型
      totalType: '', //小计
      totalType0: '', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType:''
    },
    {
      id: '2', //id 
      text: '件数', //头部title文字
      width: '120', //单元格宽
      type: 'totalNum', //合计类型值
      type1: 'afTotalNum', //合计类型值
      unit: '(件)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afNum', //单元格类型
      totalType: 'totalNum1', //小计
      totalType0: 'totalNum0', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType:'num'
    },
    {
      id: '8', //id 
      text: '件重', //头部title文字
      width: '120', //单元格宽
      type: 'totalWeight', //合计类型值
      type1: 'afTotalWeight', //合计类型值
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afWeight', //单元格类型
      totalType: 'totalWeight1', //小计
      totalType0: 'totalWeight0', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType:'weight'
    },
    {
      id: '3', //id 
      text: '金重', //头部title文字
      width: '120', //单元格宽
      type: 'totalGoldWeight', //合计类型值
      type1: 'afTotalGoldWeight', //合计类型值
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afGoldWeight', //单元格类型
      totalType: 'totalGoldWeight1', //小计
      totalType0: 'totalGoldWeight0', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType:'goldWeight'
    },
    // {
    //   id: '4', //id 
    //   text: '主石', //头部title文字
    //   width: '150', //单元格宽
    //   type: 'totalMain', //合计类型值
    //   type1: 'afTotalMain', //合计类型值
    //   unit: '(ct、g)', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: 'afMain', //单元格类型
    //   totalType: 'totalMain1', //小计
    //   totalType0: 'totalMain0', //小计1
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0,
    //   editOldType:'main'
    // },
    // {
    //   id: '6', //id 
    //   text: '副石', //头部title文字
    //   width: '150', //单元格宽
    //   type: 'totalDeputy', //合计类型值
    //   type1: 'afTotalDeputy', //合计类型值
    //   unit: '(ct、g)', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: 'afDeputy', //单元格类型
    //   totalType: 'totalDeputy1', //小计
    //   totalType0: 'totalDeputy0', //小计1
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0 ,
    //   editOldType:'deputy'
    // },

    {
      id: '9', //id 
      text: '售价', //头部title文字
      width: '120', //单元格宽
      type: 'totalPrice', //合计类型值
      type1: 'afTotalPrice', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afPrice', //单元格类型
      totalType: 'totalPrice1', //小计
      totalType0: 'totalPrice0', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType: 'price'
    },
    {
      id: '10', //id 
      text: '成本', //头部title文字
      width: '120', //单元格宽
      type: 'totalCost', //合计类型值
      type1: 'afTotalCost', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'afCost', //单元格类型
      totalType: 'totalCost1', //小计
      totalType0: 'totalCost0', //小计1
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType:'cost'
    },
  ]
}