module.exports = {

  //明细
  detailConfing: [
    {
      id: '01111', //id 
      text: '序号', //头部title文字
      width: '50', //单元格宽
      type: 'totalNum', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '合计', //底部合计 提示文字
      childType: '', //单元格类型
      totalType: '', //小计
      toFixed: false,
      countCut: 0
    },
    {
      id: '0', //id 
      text: '产品类别', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'productTypeName', //单元格类型
      totalType: '',
      toFixed: false,
      countCut: 0,
      //sort: '1'
    },
    {
      id: '1',
      text: '首饰名称',
      width: '180',
      type: '',
      unit: '',
      footerUnit: '',
      totalName: '',
      childType: 'jewelryName',
      totalType: '',
      toFixed: false,
      countCut: 0,
      textAlign: 'left'
      //sort: ''
    },
    {
      id: '2',
      text: '条码号',
      width: '120',
      type: '',
      unit: '',
      footerUnit: '',
      totalName: '',
      childType: 'barcode',
      totalType: '',
      toFixed: false,
      countCut: 0,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '4',
      text: '件重',
      width: '120',
      type: 'totalWeight',
      unit: '(g)',
      footerUnit: '',
      totalName: '',
      childType: 'weight',
      totalType: 'subtotalWeight',
      toFixed: false,
      countCut: 3,
      right: true,
      textAlign: 'right'
      //sort: ''
    },
    // {
    //   id: '5',
    //   text: '金价',
    //   width: '75',
    //   type: '',
    //   unit: '(元/g)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'goldPrice',
    //   totalType: 'subtotalMeanGoldPrice',
    //   toFixed: false,
    //   countCut: 2
    // },
    {
      id: '522',
      text: '金重',
      width: '120',
      type: 'totalGoldWeight',
      unit: '(g)',
      footerUnit: '',
      totalName: '',
      childType: 'goldWeight',
      totalType: 'subtotalGoldWeight',
      toFixed: false,
      countCut: 3,
      right: true,
      textAlign: 'right'
      //sort: ''
    },
    // {
    //   id: '17',
    //   text: '折扣',
    //   width: '70',
    //   type: '',
    //   unit: '(%)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'discount',
    //   totalType: '',
    //   toFixed: false,
    //   countCut: 0
    // },
        {
      id: '7',
      text: '售价',
      width: '140',
      type: 'totalSoldPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'price',
      totalType: 'subtotalPrice',
      toFixed: false,
      countCut: 2,
      right: true,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '6',
      text: '工费总额',
      width: '140',
      type: 'totalWage',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'wage',
      totalType: 'subtotalWage',
      toFixed: false,
      countCut: 2,
      right: true,
      textAlign: 'right'
    },
    {
      id: '127',
      text: '实售价',
      width: '140',
      type: 'totalRealPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'realPrice',
      totalType: 'subtotalRealPrice',
      toFixed: false,
      countCut: 2,
      right: true,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '19',
      text: '成本',
      width: '140',
      type: 'totalCost',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'cost',
      totalType: 'subtotalCost',
      toFixed: false,
      countCut: 2,
      right: true,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '811',
      text: '毛利',
      width: '140',
      type: 'totalMargin',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'margin',
      // totalType: 'subtotalMargin',
      totalType: 'margin',
      toFixed: false,
      countCut: 2,
      right: true,
      textAlign: 'right'
      //sort: ''
    }
  ],

  //智能分类
  capacityClassify: [
    //      { 
    //          id: '0f10',  
    //          text: '序号',
    //          width:'30', 
    //          type:'totalNum', 
    //          unit: '',
    //          footerUnit: '',
    //          totalName : '合计',
    //          childType : '',
    //          totalType : '' ,
    //          toFixed : false,
    //          countCut : 0,
    //          toFixed : false,
    //          countCut : 0
    //      },
    {
      id: '0h', //id 
      text: '产品类别', //头部title文字
      width: '130', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'className', //单元格类型
      totalType: '',
      toFixed: false,
      countCut: 0,
      //sort: '1'
    },
    {
      id: '13',
      text: '首饰名称',
      width: '160',
      type: '',
      unit: '',
      footerUnit: '',
      totalName: '',
      childType: 'className',
      totalType: '',
      toFixed: false,
      countCut: 0,
      paddingLeft: '10px',
      textAlign: 'left'
      //sort: ''
    },
    {
      id: '23f',
      text: '件数',
      width: '140',
      type: 'totalNum',
      unit: '',
      footerUnit: '',
      totalName: '',
      childType: 'num',
      totalType: 'totalNum',
      toFixed: false,
      countCut: 0,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '4s',
      text: '件重',
      width: '140',
      type: 'totalWeight',
      unit: '(g)',
      footerUnit: '',
      totalName: '',
      childType: 'weight',
      totalType: 'totalWeight',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '234s',
      text: '金重',
      width: '140',
      type: 'totalGoldWeight',
      unit: '(g)',
      footerUnit: '',
      totalName: '',
      childType: 'goldWeight',
      totalType: 'totalGoldWeight',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    // {
    //   id: '173',
    //   text: '折扣',
    //   width: '70',
    //   type: '',
    //   unit: '(%)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'discount',
    //   // totalType: 'totalDiscount',
    //   totalType: '',
    //   toFixed: false,
    //   countCut: 0
    // },
    // {
    //   id: '5gh2',
    //   text: '金价',
    //   width: '75',
    //   // type: 'totalGoldPrice',
    //   type: '',
    //   unit: '(元/g)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'goldPrice',
    //   totalType: 'totalGoldPrice',
    //   toFixed: false,
    //   countCut: 2
    // },
        {
      id: '7ns',
      text: '售价',
      width: '150',
      type: 'totalSoldPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'soldPrice',
      totalType: 'totalSoldPrice',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '656n',
      text: '工费总额',
      width: '140',
      type: 'totalWage',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'wage',
      totalType: 'totalWage',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
    },
    {
      id: '1d7',
      text: '实售价',
      width: '150',
      type: 'totalRealPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'realPrice',
      totalType: 'totalRealPrice',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    // {
    //   id: '135',
    //   text: '退换',
    //   width: '90',
    //   type: 'totalExchange',
    //   unit: '(元)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'exchange',
    //   totalType: 'totalExchange',
    //   toFixed: false,
    //   countCut: 2
    // },
    // {
    //   id: '1d56',
    //   text: '购买',
    //   width: '80',
    //   type: 'totalBuy',
    //   unit: '(元)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'buy',
    //   totalType: 'totalBuy',
    //   toFixed: false,
    //   countCut: 2
    // },
    // {
    //   id: '1bh8',
    //   text: '回收',
    //   width: '90',
    //   type: 'totalRecycle',
    //   unit: '(元)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'recycle',
    //   totalType: 'totalRecycle',
    //   toFixed: false,
    //   countCut: 2
    // },

    {
      id: 'vs16',
      text: '购买额',
      width: '140',
      type: 'totalBuy',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'buy',
      totalType: 'totalBuy',
      toFixed: true,
      countCut: 2,
      textAlign: 'right'
    },


    {
      id: '24h0',
      text: '实收',
      width: '140',
      type: 'totalActualPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'actualPrice',
      totalType: 'totalActualPrice',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
    },
    {
      id: '149',
      text: '成本',
      width: '140',
      type: 'totalCost',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'cost',
      totalType: 'totalCost',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '81s1',
      text: '毛利',
      width: '140',
      type: 'totalMargin',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'margin',
      totalType: 'margin',
      // totalType: 'totalMargin',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    }
  ],

  //产品分类
  productClassify: [
    // {
    //   id: '0kl10',
    //   text: '序号',
    //   width: '50',
    //   type: 'totalNum',
    //   unit: '',
    //   footerUnit: '',
    //   totalName: '合计',
    //   childType: '',
    //   totalType: '',
    //   toFixed: false,
    //   countCut: 0
    // },
    {
      id: '0sdf3', //id 
      text: '产品类别', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'className', //单元格类型
      totalType: '', //小计
      toFixed: false,
      countCut: 0,
      //sort: '1'
    },
    // {
    //   id: '13',
    //   text: '首饰名称',
    //   width: '150',
    //   type: '',
    //   unit: '',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'className',
    //   totalType: '',
    //   toFixed: false,
    //   countCut: 0,
    //   //sort: ''
    // },
    {
      id: '21',
      text: '件数',
      width: '160',
      type: 'totalNum',
      unit: '',
      footerUnit: '',
      totalName: '',
      childType: 'num',
      totalType: 'totalNum',
      toFixed: false,
      countCut: 0,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '42',
      text: '件重',
      width: '160',
      type: 'totalWeight',
      unit: '(g)',
      footerUnit: '',
      totalName: '',
      childType: 'weight',
      totalType: 'totalWeight',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '234s',
      text: '金重',
      width: '160',
      type: 'totalGoldWeight',
      unit: '(g)',
      footerUnit: '',
      totalName: '',
      childType: 'goldWeight',
      totalType: 'totalGoldWeight',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    // {
    //   id: 'f17',
    //   text: '折扣',
    //   width: '70',
    //   type: '',
    //   unit: '%',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'discount',
    //   totalType: '',
    //   toFixed: false,
    //   countCut: 0
    // },
    // {
    //   id: '53',
    //   text: '金价',
    //   width: '75',
    //   // type: 'totalGoldPrice',
    //   type: '',
    //   unit: '(元/g)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'goldPrice',
    //   totalType: 'totalGoldPrice',
    //   toFixed: false,
    //   countCut: 2,
    //   //sort: ''
    // },
        {
      id: 'f71',
      text: '售价',
      width: '180',
      type: 'totalSoldPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'soldPrice',
      totalType: 'totalSoldPrice',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '63',
      text: '工费总额',
      width: '160',
      type: 'totalWage',
      unit: '元',
      footerUnit: '',
      totalName: '',
      childType: 'wage',
      totalType: 'totalWage',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
    },
    {
      id: 'g317',
      text: '实售价',
      width: '180',
      type: 'totalRealPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'realPrice',
      totalType: 'totalRealPrice',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    // {
    //   id: 'vd15',
    //   text: '退换',
    //   width: '90',
    //   type: 'totalExchange',
    //   unit: '(元)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'exchange',
    //   totalType: 'totalExchange',
    //   toFixed: false,
    //   countCut: 2,
    //   //sort: ''
    // },
    // {
    //   id: 'vs16',
    //   text: '购买',
    //   width: '80',
    //   type: 'totalBuy',
    //   unit: '(元)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'buy',
    //   totalType: 'totalBuy',
    //   toFixed: false,
    //   countCut: 2
    // },
    // {
    //   id: 'g318',
    //   text: '回收',
    //   width: '90',
    //   type: 'totalRecycle',
    //   unit: '(元)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'recycle',
    //   totalType: 'totalRecycle',
    //   toFixed: false,
    //   countCut: 2
    // },
    {
      id: 'vs16',
      text: '购买额',
      width: '180',
      type: 'totalBuy',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'buy',
      totalType: 'totalBuy',
      toFixed: true,
      countCut: 2,
      textAlign: 'right'
    },
    {
      id: 'sf20',
      text: '实收',
      width: '180',
      type: 'totalActualPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'actualPrice',
      totalType: 'totalActualPrice',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
    },
    {
      id: '319',
      text: '成本',
      width: '170',
      type: 'totalCost',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'cost',
      totalType: 'totalCost',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: 'g811',
      text: '毛利',
      width: '170',
      type: 'totalMargin',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'margin',
      totalType: 'margin',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    }
  ],

  //自定义
  productCustom: [
    // {
    //   id: '0kl10',
    //   text: '序号',
    //   width: '50',
    //   type: 'totalNum',
    //   unit: '',
    //   footerUnit: '',
    //   totalName: '合计',
    //   childType: '',
    //   totalType: '',
    //   toFixed: false,
    //   countCut: 0
    // },
    {
      id: '0sdf3', //id 
      text: '产品类别', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'className', //单元格类型
      totalType: '', //小计
      toFixed: false,
      countCut: 0,
      //sort: '1'
    },
    {
      id: '13',
      text: '首饰名称',
      width: '150',
      type: '',
      unit: '',
      footerUnit: '',
      totalName: '',
      childType: 'className',
      totalType: '',
      toFixed: false,
      countCut: 0,
      textAlign: 'left',
      paddingLeft: '10px'
      //sort: ''
    },
    {
      id: '21',
      text: '件数',
      width: '160',
      type: 'totalNum',
      unit: '',
      footerUnit: '',
      totalName: '',
      childType: 'num',
      totalType: 'totalNum',
      toFixed: false,
      countCut: 0,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '42',
      text: '件重',
      width: '160',
      type: 'totalWeight',
      unit: '(g)',
      footerUnit: '',
      totalName: '',
      childType: 'weight',
      totalType: 'totalWeight',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '234s',
      text: '金重',
      width: '160',
      type: 'totalGoldWeight',
      unit: '(g)',
      footerUnit: '',
      totalName: '',
      childType: 'goldWeight',
      totalType: 'totalGoldWeight',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    // {
    //   id: 'f17',
    //   text: '折扣',
    //   width: '70',
    //   type: '',
    //   unit: '(%)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'discount',
    //   totalType: '',
    //   toFixed: false,
    //   countCut: 0
    // },
    // {
    //   id: '53',
    //   text: '金价',
    //   width: '75',
    //   // type: 'totalGoldPrice',
    //   type: '',
    //   unit: '(元/g)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'goldPrice',
    //   totalType: 'totalGoldPrice',
    //   toFixed: false,
    //   countCut: 2
    // },
      {
      id: 'f71',
      text: '售价',
      width: '180',
      type: 'totalSoldPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'soldPrice',
      totalType: 'totalSoldPrice',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: '63',
      text: '工费总额',
      width: '160',
      type: 'totalWage',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'wage',
      totalType: 'totalWage',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
    },
    {
      id: 'g317',
      text: '实售价',
      width: '180',
      type: 'totalRealPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'realPrice',
      totalType: 'totalRealPrice',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    // {
    //   id: 'vd15',
    //   text: '退换',
    //   width: '80',
    //   type: 'totalExchange',
    //   unit: '(元)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'exchange',
    //   totalType: 'totalExchange',
    //   toFixed: false,
    //   countCut: 2,
    //   //sort: ''
    // },
    // {
    //   id: 'vs16',
    //   text: '购买',
    //   width: '80',
    //   type: 'totalBuy',
    //   unit: '(元)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'buy',
    //   totalType: 'totalBuy',
    //   toFixed: false,
    //   countCut: 2
    // },
    // {
    //   id: 'g318',
    //   text: '回收',
    //   width: '80',
    //   type: 'totalRecycle',
    //   unit: '(元)',
    //   footerUnit: '',
    //   totalName: '',
    //   childType: 'recycle',
    //   totalType: 'totalRecycle',
    //   toFixed: false,
    //   countCut: 2
    // },
        {
      id: 'vs16',
      text: '购买额',
      width: '180',
      type: 'totalBuy',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'buy',
      totalType: 'totalBuy',
      toFixed: true,
      countCut: 2,
      textAlign: 'right'
    },
    {
      id: 'sf20',
      text: '实收',
      width: '180',
      type: 'totalActualPrice',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'actualPrice',
      totalType: 'totalActualPrice',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
    },
    {
      id: '319',
      text: '成本',
      width: '140',
      type: 'totalCost',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'cost',
      totalType: 'totalCost',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    },
    {
      id: 'g811',
      text: '毛利',
      width: '140',
      type: 'totalMargin',
      unit: '(元)',
      footerUnit: '',
      totalName: '',
      childType: 'margin',
      totalType: 'margin',
      toFixed: false,
      countCut: 2,
      textAlign: 'right'
      //sort: ''
    }
  ]

}