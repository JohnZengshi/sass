module.exports = {
	//明细表配置
	detailConfing : [
    	{ 
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'8%', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : '', //单元格类型
    		totalType : '' //小计
    	},
		{ 
    		id: '1',  
    		text: '条码号',
    		width:'12%', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'barcode',
    		totalType : '' 
    	},
    	{ 
    		id: '2',  
    		text: '首饰名称',
    		width:'9%', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'jewelryName',
    		totalType : '' 
    	},
    	{ 
    		id: '3',  
    		text: '总件重', 
    		width:'9%',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'subtotalWeight' 
    	},
		{ 
    		id: '4',  
    		text: '净金重', 
    		width:'9%',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'goldWeight',
    		totalType : 'subtotalWeight' 
    	},
    	{ 
    		id: '5',  
    		text: '证书号',
    		width:'9%',
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'certificateCode',
    		totalType : '' 
    	},
    	{ 
    		id: '6',  
    		text: '主石',
    		width:'9%', 
    		type:'totalMain', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'main',
    		totalType : 'subtotalMain' 
    	},
    	{ 
    		id: '7',  
    		text: '副石',
    		width:'9%', 
    		type:'totalDeputy', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'deputy',
    		totalType : 'subtotalDeputy' 
    	},
    	{ 
    		id: '8',  
    		text: '售价', 
    		width:'9%', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'price',
    		totalType : 'subtotalPrice' 
    	},
    	{ 
    		id: '9',  
    		text: '成本', 
    		width:'9%', 
    		type:'totalCost', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'cost',
    		totalType : 'subtotalCost' 
    	},
		// { 
    	// 	id: '10',  
    	// 	text: '操作', 
    	// 	width:'8%', 
    	// 	type:'', 
    	// 	unit: '',
    	// 	footerUnit: '',
    	// 	totalName : '',
    	// 	childType : 'operate',
    	// 	totalType : ''
    	// }
    ],
	
	//成色大类
	detailBigTypeConfig : [
    	{ 
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'8%', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : '', //单元格类型
    		totalType : '' //小计
    	},
    	{ 
    		id: '1',  
    		text: '产品类别',
    		width:'13%', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'productTypeName',
    		totalType : '' 
    	},
    	{ 
    		id: '2',  
    		text: '首饰名称',
    		width:'12%', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'jewelryName',
    		totalType : '' 
    	},
    	{ 
    		id: '3',  
    		text: '件数',
    		width:'12%',
    		type:'totalNum', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'num',
    		totalType : 'subtotalNum' 
    	},
    	{ 
    		id: '4',  
    		text: '件重', 
    		width:'11%',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'subtotalWeight' 
    	},
    	{ 
    		id: '5',  
    		text: '主石',
    		width:'11%', 
    		type:'totalMain', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'main',
    		totalType : 'subtotalMain' 
    	},
    	{ 
    		id: '6',  
    		text: '副石',
    		width:'11%', 
    		type:'totalDeputy', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'deputy',
    		totalType : 'subtotalDeputy' 
    	},
    	{ 
    		id: '7',  
    		text: '售价', 
    		width:'11%', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'price',
    		totalType : 'subtotalPrice' 
    	},
    	{ 
    		id: '8',  
    		text: '成本', 
    		width:'11%', 
    		type:'totalCost', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'cost',
    		totalType : 'subtotalCost' 
    	}
		
    ],
	
	
	//成色小类
	detailSmallTypeConfig : [
    	{ 
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'8%', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : '', //单元格类型
    		totalType : 'subtotalNum' //小计
    	},
    	{ 
    		id: '1',  
    		text: '产品类别',
    		width:'13%', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'productTypeName',
    		totalType : '' 
    	},
    	{ 
    		id: '2',  
    		text: '首饰名称',
    		width:'12%', 
    		type:'', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'jewelryName',
    		totalType : '' 
    	},
    	{ 
    		id: '3',  
    		text: '件数',
    		width:'11%',
    		type:'totalNum', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'num',
    		totalType : 'subtotalNum' 
    	},
    	{ 
    		id: '4',  
    		text: '件重', 
    		width:'11%',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'subtotalWeight' 
    	},
    	{ 
    		id: '5',  
    		text: '主石',
    		width:'11%', 
    		type:'totalMain', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'main',
    		totalType : 'subtotalMain' 
    	},
    	{ 
    		id: '6',  
    		text: '副石',
    		width:'11%', 
    		type:'totalDeputy', 
    		unit: '',
    		footerUnit: '',
    		totalName : '',
    		childType : 'deputy',
    		totalType : 'subtotalDeputy' 
    	},
    	{ 
    		id: '7',  
    		text: '售价', 
    		width:'11%', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'price',
    		totalType : 'subtotalPrice' 
    	},
    	{ 
    		id: '8',  
    		text: '成本', 
    		width:'11%', 
    		type:'totalCost', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'cost',
    		totalType : 'subtotalCost' 
    	}
    ]
}
