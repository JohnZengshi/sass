module.exports = {
  //明细表配置
  detailConfing: [
    {
      id: '0', //id 
      text: '序号', //头部title文字
      width: '80', //单元格宽
      type: '', //合计类型值
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
      id: '1', //id 
      text: '条码号', //头部title文字
      width: '150', //单元格宽
      type: 'totalNum', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'barcode', //单元格类型
      totalType: 'totalNum', //小计
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
      childType: 'classTypeName', //单元格类型
      totalType: 'totalNum', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: 1,
      editOldType : ''
    },
    {
      id: '3', //id 
      text: '首饰名称', //头部title文字
      width: '175', //单元格宽
      type: '', //合计类型值
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
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'weight', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'afWeight'
    },
    {
      id: '8', //id 
      text: '金重', //头部title文字
      width: '150', //单元格宽
      type: 'totalGoldWeight', //合计类型值
      unit: '(g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'goldWeight', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'afGoldWeight'
    },
    {
      id: '4', //id 
      text: '主石', //头部title文字
      width: '150', //单元格宽
      type: 'totalMain', //合计类型值
      unit: '(ct、g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'main', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afMain'
    },
    // { 
    // 	id: '5',  //id 
    // 	text: '主石粒数', //头部title文字
    // 	width:'115', //单元格宽
    // 	type:'', //合计类型值
    // 	unit: '', //头部单位补充文字
    // 	footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    // 	totalName : '',//底部合计 提示文字
    // 	childType : 'mainCount', //单元格类型
    // 	totalType : '' , //小计
    //     toFixed : false, //是否进行小数点精确截取
    // 	countCut : 0, //小数点截取位数
    // },
    {
      id: '6', //id 
      text: '副石', //头部title文字
      width: '120', //单元格宽
      type: 'totalDeputy', //合计类型值
      unit: '(ct、g)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'deputy', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afDeputy'
    },
    // { 
    // 	id: '7',  //id 
    // 	text: '副石粒数', //头部title文字
    // 	width:'115', //单元格宽
    // 	type:'', //合计类型值
    // 	unit: '', //头部单位补充文字
    // 	footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    // 	totalName : '',//底部合计 提示文字
    // 	childType : 'deputyCount', //单元格类型
    // 	totalType : '' , //小计
    //     toFixed : false, //是否进行小数点精确截取
    //     countCut : 0 //小数点截取位数
    // },

    {
      id: '9', //id 
      text: '售价', //头部title文字
      width: '120', //单元格宽
      type: 'totalPrice', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'price', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'afPrice'
    },
    {
      id: '10', //id 
      text: '成本', //头部title文字
      width: '120', //单元格宽
      type: 'totalCost', //合计类型值
      unit: '(元)', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'cost', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'afCost'
    },
    // {
    //   id: '14', //id 
    //   text: '单据号', //头部title文字
    //   width: '130', //单元格宽
    //   type: '', //合计类型值
    //   type1: '', //合计类型值
    //   unit: '', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: 'orderNum', //单元格类型
    //   totalType: '', //小计
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0, //小数点截取位数
    //   editOldType : ''
    // },
    {
      id: '12', //id 
      text: '商品属性', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'productClass', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '13', //id 
      text: '商品位置', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'locationName', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '11', //id 
      text: '当前状态', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'status', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    }
  ]
}