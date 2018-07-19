module.exports = {
  //明细表配置
  detailConfing: [
    {
      id: '1', //id 
      text: '序号', //头部title文字
      width: '100', //单元格宽
      type: 'totalNum', //合计类型值
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
      id: '1', //id 
      text: '头像', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'url', //单元格类型
      totalType: 'totalNum', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '2', //id 
      text: '姓名', //头部title文字
      width: '100', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'classTypeName', //单元格类型
      totalType: 'totalNum', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '3', //id 
      text: '手机号', //头部title文字
      width: '175', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'jewelryName', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '8', //id 
      text: '负责人', //头部title文字
      width: '120', //单元格宽
      type: 'totalWeight', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'weight', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afWeight'
    },
    {
      id: '8', //id 
      text: '会员级别', //头部title文字
      width: '100', //单元格宽
      type: 'totalGoldWeight', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'goldWeight', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afGoldWeight'
    },
    {
      id: '4', //id 
      text: '会员类型', //头部title文字
      width: '150', //单元格宽
      type: 'totalMain', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'main', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afMain'
    },
    {
      id: '6', //id 
      text: '消耗积分', //头部title文字
      width: '120', //单元格宽
      type: 'totalDeputy', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'deputy', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'afDeputy'
    },
    {
      id: '9', //id 
      text: '剩余积分', //头部title文字
      width: '120', //单元格宽
      type: 'totalPrice', //合计类型值
      unit: '', //头部单位补充文字
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
      text: '客单价', //头部title文字
      width: '120', //单元格宽
      type: 'totalCost', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'cost', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'afCost'
    },
    {
      id: '12', //id 
      text: '消费总额', //头部title文字
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
      sort: '',
      editOldType : ''
    },
    {
      id: '13', //id 
      text: '消费次数', //头部title文字
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
      sort: '',
      editOldType : ''
    },
    {
      id: '11', //id 
      text: '注册时间', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'time', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : ''
    },
    {
      id: '11', //id 
      text: '操作', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'del', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    }
  ]
}