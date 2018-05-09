    
module.exports = {
	
	//明细表配置
	detailConfing : [
    	{ 
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'30', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '总件数',//底部合计 提示文字
    		childType : '', //单元格类型
    		totalType : 'subtotalNum' , //小计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
    	},
    	{ 
    		id: '1',  
    		text: '首饰名称',
    		width:'120', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'jewelryName',
    		totalType : '',
            toFixed : false,
            countCut : 0 
    	},
    	{ 
    		id: '2',  
    		text: '条码号',
    		width:'80', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'barcode',
    		totalType : '' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '3',  
    		text: '件重', 
    		width:'70',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'subtotalWeight' ,
            toFixed : true,
            countCut : 2
    	},
    	{ 
    		id: '4',  
    		text: '证书号',
    		width:'80',
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'certificateCode',
    		totalType : '' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '5',  
    		text: '主石',
    		width:'80', 
    		type:'totalMain', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'main',
    		totalType : 'subtotalMain' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '6',  
    		text: '副石',
    		width:'80', 
    		type:'totalDeputy', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'deputy',
    		totalType : 'subtotalDeputy' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '7',  
    		text: '售价', 
    		width:'80', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'price',
    		totalType : 'subtotalPrice' ,
            toFixed : true,
            countCut : 2
    	},
    	{ 
    		id: '8',  
    		text: '成本', 
    		width:'80', 
    		type:'totalCost', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'cost',
    		totalType : 'subtotalCost' ,
            toFixed : true,
            countCut : 2
    	}
    ],
	
	//成色大类
	detailBigTypeConfig : [
    	{ 
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'30', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '合计',//底部合计 提示文字
    		childType : '', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
    	},
    	{ 
    		id: '1',  
    		text: '产品类别',
    		width:'30', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'productTypeName',
    		totalType : '' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '2',  
    		text: '首饰名称',
    		width:'120', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'jewelryName',
    		totalType : '' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '3',  
    		text: '件数',
    		width:'50',
    		type:'totalNum', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'num',
    		totalType : 'subtotalNum' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '4',  
    		text: '件重', 
    		width:'80',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'subtotalWeight',
            toFixed : true,
            countCut : 2 
    	},
    	{ 
    		id: '5',  
    		text: '主石',
    		width:'80', 
    		type:'totalMain', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'main',
    		totalType : 'subtotalMain' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '6',  
    		text: '副石',
    		width:'80', 
    		type:'totalDeputy', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'deputy',
    		totalType : 'subtotalDeputy',
            toFixed : false,
            countCut : 0 
    	},
    	{ 
    		id: '7',  
    		text: '售价', 
    		width:'80', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'price',
    		totalType : 'subtotalPrice' ,
            toFixed : true,
            countCut : 2
    	},
    	{ 
    		id: '8',  
    		text: '成本', 
    		width:'80', 
    		type:'totalCost', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'cost',
    		totalType : 'subtotalCost' ,
            toFixed : true,
            countCut : 2
    	}
    ],
	
	
	//成色小类
	detailSmallTypeConfig : [
    	{ 
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'30', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '合计',//底部合计 提示文字
    		childType : '', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
    	},
    	{ 
    		id: '1',  
    		text: '产品类别',
    		width:'30', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'productTypeName',
    		totalType : '' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '2',  
    		text: '首饰名称',
    		width:'120', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'jewelryName',
    		totalType : '' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '3',  
    		text: '件数',
    		width:'50',
    		type:'totalNum', 
    		unit: '',
    		footerUnit: '',
    		totalName : '总件数',
    		childType : 'num',
    		totalType : 'subtotalNum' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '4',  
    		text: '件重', 
    		width:'80',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'subtotalWeight' ,
            toFixed : true,
            countCut : 2
    	},
    	{ 
    		id: '5',  
    		text: '主石',
    		width:'80', 
    		type:'totalMain', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'main',
    		totalType : 'subtotalMain' ,
            toFixed : false,
            countCut : 0
    	},
    	{ 
    		id: '6',  
    		text: '副石',
    		width:'80', 
    		type:'totalDeputy', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'deputy',
    		totalType : 'subtotalDeputy',
            toFixed : false,
            countCut : 0 
    	},
    	{ 
    		id: '7',  
    		text: '售价', 
    		width:'80', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'price',
    		totalType : 'subtotalPrice' ,
            toFixed : true,
            countCut : 2
    	},
    	{ 
    		id: '8',  
    		text: '成本', 
    		width:'80', 
    		type:'totalCost', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'cost',
    		totalType : 'subtotalCost' ,
            toFixed : true,
            countCut : 2
    	}
    ]
}
