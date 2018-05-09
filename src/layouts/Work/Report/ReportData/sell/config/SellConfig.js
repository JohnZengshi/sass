
module.exports = {
	
	//明细
	detailConfing : [
	    { 
            id: '01111',  //id 
            text: '序号', //头部title文字
            width:'3%', //单元格宽
            type:'totalNum', //合计类型值
            unit: '', //头部单位补充文字
            footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
            totalName : '合计',//底部合计 提示文字
            childType : '', //单元格类型
            totalType : '', //小计
            toFixed : false,
            countCut : 0
        },
    	{ 
    		id: '0',  //id 
    		text: '产品类别', //头部title文字
    		width:'8%', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'productTypeName', //单元格类型
    		totalType : '',
            toFixed : false,
            countCut: 0,
            sort: '1'
    	},
    	{ 
    		id: '1',  
    		text: '首饰名称',
    		width:'12%', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'jewelryName',
    		totalType : '' ,
            toFixed : false,
            countCut : 0,
            sort: ''
    	},
    	{ 
    		id: '2',  
    		text: '条码号',
    		width:'10%',
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'barcode',
    		totalType : '' ,
            toFixed : false,
            countCut : 0,
            sort: ''
    	},
    	{ 
    		id: '4',  
    		text: '件重', 
    		width:'8%',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'subtotalWeight',
            toFixed : true,
            countCut : 2 ,
            sort: ''
    	},
    	{ 
    		id: '5',  
    		text: '金价',
    		width:'10%', 
    		type:'', 
    		unit: '(g/元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'goldPrice',
    		totalType : 'subtotalMeanGoldPrice' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
            id: '522',  
            text: '金重',
            width:'10%', 
            type:'totalGoldWeight', 
            unit: '(g)',
            footerUnit: '',
            totalName : '',
            childType : 'goldWeight',
            totalType : 'subtotalGoldWeight' ,
            toFixed : true,
            countCut : 3,
            sort: ''
        },
    	{ 
    		id: '6',  
    		text: '工费总额',
    		width:'10%', 
    		type:'totalWage', 
    		unit: '元',
    		footerUnit: '',
    		totalName : '',
    		childType : 'wage',
    		totalType : 'subtotalWage' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '17',  
    		text: '折扣', 
    		width:'8%', 
    		type:'', 
    		unit: '%',
    		footerUnit: '',
    		totalName : '',
    		childType : 'discount',
    		totalType : '' ,
            toFixed : false,
            countCut : 0,
            sort: ''
    	},
    	{ 
    		id: '7',  
    		text: '售价', 
    		width:'10%', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'price',
    		totalType : 'subtotalPrice' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '127',  
    		text: '实售价', 
    		width:'10%', 
    		type:'totalRealPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'realPrice',
    		totalType : 'subtotalRealPrice' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '19',  
    		text: '成本', 
    		width:'8%', 
    		type:'totalCost', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'cost',
    		totalType : 'subtotalCost' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '811',  
    		text: '毛利', 
    		width:'8%', 
    		type:'totalMargin', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'margin',
    		totalType : 'subtotalMargin' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	}
    ],
	
	//智能分类
	capacityClassify : [
	    { 
            id: '0f10',  
            text: '序号',
            width:'3%', 
            type:'totalNum', 
            unit: '',
            footerUnit: '',
            totalName : '合计',
            childType : '',
            totalType : '' ,
            toFixed : false,
            countCut : 0,
            toFixed : false,
            countCut : 0
        },
    	{ 
    		id: '0h',  //id 
    		text: '产品类别', //头部title文字
    		width:'10%', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'productTypeName', //单元格类型
    		totalType : '',
            toFixed : false,
            countCut : 0,
            sort: '1'
    	},
    	{ 
    		id: '13',  
    		text: '首饰名称',
    		width:'12%', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'jewelryName',
    		totalType : '' ,
            toFixed : false,
            countCut : 0,
            sort: ''
    	},
    	{ 
    		id: '23f',  
    		text: '件数',
    		width:'10%',
    		type:'totalNum', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'num',
    		totalType : 'subtotalNum' ,
            toFixed : false,
            countCut : 0,
            sort: ''
    	},
    	{ 
    		id: '4s',  
    		text: '件重', 
    		width:'10%',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'subtotalWeight' ,
            toFixed : true,
            countCut : 3,
            sort: ''
    	},
    	{ 
        id: '234s',  
        text: '金重', 
        width:'10%',
        type:'totalGoldWeight', 
        unit: '(g)',
        footerUnit: '',
        totalName : '',
        childType : 'goldWeight',
        totalType : 'totalGoldWeight' ,
        toFixed : true,
        countCut : 3,
        sort: ''
      },
    	{ 
    		id: '5gh',  
    		text: '金价',
    		width:'10%', 
    		type:'', 
    		unit: '(g/元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'meanGoldPrice',
    		totalType : '' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '656n',  
    		text: '工费总额',
    		width:'10%', 
    		type:'totalWage', 
    		unit: '元',
    		footerUnit: '',
    		totalName : '',
    		childType : 'wage',
    		totalType : 'subtotalWage' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '173',  
    		text: '折扣', 
    		width:'10%', 
    		type:'', 
    		unit: '%',
    		footerUnit: '',
    		totalName : '',
    		childType : 'discount',
    		totalType : '' ,
            toFixed : false,
            countCut : 0,
            sort: ''
    	},
    	{ 
    		id: '7ns',  
    		text: '售价', 
    		width:'10%', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'price',
    		totalType : 'subtotalPrice',
            toFixed : true,
            countCut : 2 ,
            sort: ''
    	},
    	{ 
    		id: '1d7',  
    		text: '实售价', 
    		width:'10%', 
    		type:'totalRealPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'realPrice',
    		totalType : 'subtotalRealPrice' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '135',  
    		text: '退换', 
    		width:'10%', 
    		type:'totalExchange', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'exchange',
    		totalType : 'subtotalExchange' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '1d56',  
    		text: '购买', 
    		width:'10%', 
    		type:'totalBuy', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'buy',
    		totalType : 'subtotalBuy' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '1bh8',  
    		text: '回收', 
    		width:'10%', 
    		type:'totalRecycle', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'recycle',
    		totalType : 'subtotalRecycle' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '24h0',  
    		text: '实收', 
    		width:'10%', 
    		type:'totalActualPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'actualPrice',
    		totalType : 'subtotalActualPrice' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '149',  
    		text: '成本', 
    		width:'10%', 
    		type:'totalCost', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'cost',
    		totalType : 'subtotalCost' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '81s1',  
    		text: '毛利', 
    		width:'10%', 
    		type:'totalMargin', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'margin',
    		totalType : 'subtotalMargin' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	}
    ],
	
	
	//产品分类
	productClassify : [
	     { 
            id: '0kl10',  
            text: '序号',
            width:'3%', 
            type:'totalNum', 
            unit: '',
            footerUnit: '',
            totalName : '合计',
            childType : '',
            totalType : '' ,
            toFixed : false,
            countCut : 0
        },
    	{ 
    		id: '0sdf3',  //id 
    		text: '产品类别', //头部title文字
    		width:'10%', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'productTypeName', //单元格类型
    		totalType : '', //小计
            toFixed : false,
            countCut : 0,
            sort: '1'
    	},
    	
    	{ 
    		id: '21',  
    		text: '件数',
    		width:'10%',
    		type:'totalNum', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'num',
    		totalType : 'subtotalNum' ,
            toFixed : false,
            countCut : 0,
            sort: ''
    	},
    	{ 
    		id: '42',  
    		text: '件重', 
    		width:'10%',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'subtotalWeight' ,
            toFixed : true,
            countCut : 3,
            sort: ''
    	},
    	{ 
			id: '234s',  
			text: '金重', 
			width:'10%',
			type:'totalGoldWeight', 
			unit: '(g)',
			footerUnit: '',
			totalName : '',
			childType : 'goldWeight',
			totalType : 'totalGoldWeight' ,
			toFixed : true,
			countCut : 3,
			sort: ''
		},
    	{ 
    		id: '53',  
    		text: '金价',
    		width:'10%', 
    		type:'', 
    		unit: '(g/元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'meanGoldPrice',
    		totalType : '' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: '63',  
    		text: '工费总额',
    		width:'10%', 
    		type:'totalWage', 
    		unit: '元',
    		footerUnit: '',
    		totalName : '',
    		childType : 'wage',
    		totalType : 'subtotalWage' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: 'f17',  
    		text: '折扣', 
    		width:'10%', 
    		type:'', 
    		unit: '%',
    		footerUnit: '',
    		totalName : '',
    		childType : 'discount',
    		totalType : '' ,
            toFixed : false,
            countCut : 0,
            sort: ''
    	},
    	{ 
    		id: 'f71',  
    		text: '售价', 
    		width:'10%', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'price',
    		totalType : 'subtotalPrice',
            toFixed : true,
            countCut : 2 ,
            sort: ''
    	},
    	{ 
    		id: 'g317',  
    		text: '实售价', 
    		width:'10%', 
    		type:'totalRealPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'realPrice',
    		totalType : 'subtotalRealPrice' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: 'vd15',  
    		text: '退换', 
    		width:'10%', 
    		type:'totalExchange', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'exchange',
    		totalType : 'subtotalExchange' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: 'vs16',  
    		text: '购买', 
    		width:'10%', 
    		type:'totalBuy', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'buy',
    		totalType : 'subtotalBuy' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: 'g318',  
    		text: '回收', 
    		width:'10%', 
    		type:'totalRecycle', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'recycle',
    		totalType : 'subtotalRecycle' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: 'sf20',  
    		text: '实收', 
    		width:'10%', 
    		type:'totalActualPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'actualPrice',
    		totalType : 'subtotalActualPrice',
            toFixed : true,
            countCut : 2 ,
            sort: ''
    	},
    	{ 
    		id: '319',  
    		text: '成本', 
    		width:'10%', 
    		type:'totalCost', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'cost',
    		totalType : 'subtotalCost' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	},
    	{ 
    		id: 'g811',  
    		text: '毛利', 
    		width:'10%', 
    		type:'totalMargin', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'margin',
    		totalType : 'subtotalMargin' ,
            toFixed : true,
            countCut : 2,
            sort: ''
    	}
    ],

  //自定义
  productCustom : [
       { 
            id: '0kl10',  
            text: '序号',
            width:'3%', 
            type:'totalNum', 
            unit: '',
            footerUnit: '',
            totalName : '合计',
            childType : '',
            totalType : '' ,
            toFixed : false,
            countCut : 0
        },
      { 
        id: '0sdf3',  //id 
        text: '产品类别', //头部title文字
        width:'10%', //单元格宽
        type:'', //合计类型值
        unit: '', //头部单位补充文字
        footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
        totalName : '',//底部合计 提示文字
        childType : 'productTypeName', //单元格类型
        totalType : '', //小计
            toFixed : false,
            countCut : 0,
            sort: '1'
      },
      { 
        id: '13',  
        text: '首饰名称',
        width:'12%', 
        type:'', 
        unit: '',
        footerUnit: '',
        totalName : '',
        childType : 'jewelryName',
        totalType : '' ,
            toFixed : false,
            countCut : 0,
            sort: ''
      },
      { 
        id: '21',  
        text: '件数',
        width:'10%',
        type:'totalNum', 
        unit: '',
        footerUnit: '',
        totalName : '',
        childType : 'num',
        totalType : 'subtotalNum' ,
            toFixed : false,
            countCut : 0,
            sort: ''
      },
      { 
        id: '42',  
        text: '件重', 
        width:'10%',
        type:'totalWeight', 
        unit: '(g)',
        footerUnit: '',
        totalName : '',
        childType : 'weight',
        totalType : 'subtotalWeight' ,
            toFixed : true,
            countCut : 3,
            sort: ''
      },
      { 
        id: '234s',  
        text: '净金重', 
        width:'10%',
        type:'totalGoldWeight', 
        unit: '(g)',
        footerUnit: '',
        totalName : '',
        childType : 'goldWeight',
        totalType : 'totalGoldWeight' ,
        toFixed : true,
        countCut : 3,
        sort: ''
      },
      { 
        id: '53',  
        text: '金价',
        width:'10%', 
        type:'', 
        unit: '(g/元)',
        footerUnit: '',
        totalName : '',
        childType : 'meanGoldPrice',
        totalType : '' ,
            toFixed : true,
            countCut : 2,
            sort: ''
      },
      { 
        id: '63',  
        text: '工费总额',
        width:'10%', 
        type:'totalWage', 
        unit: '元',
        footerUnit: '',
        totalName : '',
        childType : 'wage',
        totalType : 'subtotalWage' ,
            toFixed : true,
            countCut : 2,
            sort: ''
      },
      { 
        id: 'f17',  
        text: '折扣', 
        width:'10%', 
        type:'', 
        unit: '%',
        footerUnit: '',
        totalName : '',
        childType : 'discount',
        totalType : '' ,
            toFixed : false,
            countCut : 0,
            sort: ''
      },
      { 
        id: 'f71',  
        text: '售价', 
        width:'10%', 
        type:'totalPrice', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'price',
        totalType : 'subtotalPrice',
            toFixed : true,
            countCut : 2 ,
            sort: ''
      },
      { 
        id: 'g317',  
        text: '实售价', 
        width:'10%', 
        type:'totalRealPrice', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'realPrice',
        totalType : 'subtotalRealPrice' ,
            toFixed : true,
            countCut : 2,
            sort: ''
      },
      { 
        id: 'vd15',  
        text: '退换', 
        width:'10%', 
        type:'totalExchange', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'exchange',
        totalType : 'subtotalExchange' ,
            toFixed : true,
            countCut : 2,
            sort: ''
      },
      { 
        id: 'vs16',  
        text: '购买', 
        width:'10%', 
        type:'totalBuy', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'buy',
        totalType : 'subtotalBuy' ,
            toFixed : true,
            countCut : 2,
            sort: ''
      },
      { 
        id: 'g318',  
        text: '回收', 
        width:'10%', 
        type:'totalRecycle', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'recycle',
        totalType : 'subtotalRecycle' ,
            toFixed : true,
            countCut : 2,
            sort: ''
      },
      { 
        id: 'sf20',  
        text: '实收', 
        width:'10%', 
        type:'totalActualPrice', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'actualPrice',
        totalType : 'subtotalActualPrice',
            toFixed : true,
            countCut : 2 ,
            sort: ''
      },
      { 
        id: '319',  
        text: '成本', 
        width:'10%', 
        type:'totalCost', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'cost',
        totalType : 'subtotalCost' ,
            toFixed : true,
            countCut : 2,
            sort: ''
      },
      {
        id: 'g811',  
        text: '毛利', 
        width:'10%', 
        type:'totalMargin', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'margin',
        totalType : 'subtotalMargin' ,
            toFixed : true,
            countCut : 2,
            sort: ''
      }
    ]
}
