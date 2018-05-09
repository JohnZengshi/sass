
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
    		totalType : '', //小计
            toFixed : false, 
            countCut : 0 
    	},
    	{ 
    		id: '1',  
    		text: '首饰名称',
    		width:'14%', 
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
    		id: '2',  
    		text: '条码号',
    		width:'11%', 
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
    		width:'11%',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'totalWeight' ,
            toFixed : true, 
            countCut : 2
    	},
    	{ 
    		id: '4',  
    		text: '回购金价',
    		width:'11%',
    		type:'totalbuyGoldPrice', 
    		unit: '(元/g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'buyGoldPrice',
    		totalType : 'totalbuyGoldPrice' ,
            toFixed : true, 
            countCut : 2 
    	},
    	{ 
    		id: '5',  
    		text: '估价',
    		width:'11%', 
    		//type:'totalevaluate', 
            type: 'totalevaluate',
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'evaluate',
    		totalType : 'totalevaluate' ,
            toFixed : true, 
            countCut : 2 
    	},
    	{ 
    		id: '6',  
    		text: '折旧',
    		width:'11%', 
    		type:'totaldeprecition', 
    		unit: '%',
    		footerUnit: '',
    		totalName : '',
    		childType : 'deprecition',
    		totalType : 'totaldeprecition' ,
            toFixed : false, 
            countCut : 0 
    	},
    	{ 
    		id: '7',  
    		text: '工费', 
    		width:'11%', 
    		type:'totalwage', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'wage',
    		totalType : 'totalwage' ,
            toFixed : true, 
            countCut : 2
    	},
    	{ 
            id: '71',  
            text: '回购价', 
            width:'11%', 
            type:'totalbuyBackPrice', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'buyBackPrice',
            totalType : 'totalbuyBackPrice' ,
            toFixed : true, 
            countCut : 2
        }
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
    		totalType : '', //小计
            toFixed : false, 
            countCut : 0 
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
    		totalType : '' ,
            toFixed : false, 
            countCut : 0 
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
    		totalType : '' ,
            toFixed : false, 
            countCut : 0 
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
    		totalType : 'subtotalNum' ,
            toFixed : false, 
            countCut : 0 
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
    		totalType : 'subtotalWeight' ,
            toFixed : true, 
            countCut : 2
    	},
    	{ 
    		id: '5',  
    		text: '回购金价',
    		width:'11%', 
    		type:'totalbuyGoldPrice', 
    		unit: '(元/g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'buyGoldPrice',
    		totalType : 'subtotalbuyGoldPrice' ,
            toFixed : true, 
            countCut : 2 
    	},
    	{ 
    		id: '6',  
    		text: '估价',
    		width:'11%', 
    		type:'totalevaluate', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'evaluate',
    		totalType : 'subtotalevaluate' ,
            toFixed : true, 
            countCut : 2 
    	},
    	{ 
    		id: '7',  
    		text: '平均折旧', 
    		width:'11%', 
    		type:'totaldeprecition', 
    		unit: '%',
    		footerUnit: '',
    		totalName : '',
    		childType : 'deprecition',
    		totalType : 'subtotaldeprecition' ,
            toFixed : false, 
            countCut : 0 
    	},
    	{ 
    		id: '8',  
    		text: '工费', 
    		width:'11%', 
    		type:'totalwage', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'wage',
    		totalType : 'subtotalwage' ,
            toFixed : true, 
            countCut : 2
    	},
    	{ 
            id: '81',  
            text: '回购价', 
            width:'11%', 
            type:'totalbuyBackPrice', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'buyBackPrice',
            totalType : 'subtotalbuyBackPrice' ,
            toFixed : true, 
            countCut : 2
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
            totalType : '', //小计
            toFixed : false, 
            countCut : 0 
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
            totalType : '' ,
            toFixed : false, 
            countCut : 0 
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
            totalType : '' ,
            toFixed : false, 
            countCut : 0 
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
            totalType : 'subtotalNum' ,
            toFixed : false, 
            countCut : 0 
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
            totalType : 'subtotalWeight' ,
            toFixed : true, 
            countCut : 2
        },
        { 
            id: '5',  
            text: '回购金价',
            width:'11%', 
            type:'totalbuyGoldPrice', 
            unit: '(元/g)',
            footerUnit: '',
            totalName : '',
            childType : 'buyGoldPrice',
            totalType : 'subtotalbuyGoldPrice' ,
            toFixed : true, 
            countCut : 2
        },
        { 
            id: '6',  
            text: '估价',
            width:'11%', 
            type:'totalevaluate', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'evaluate',
            totalType : 'subtotalevaluate' ,
            toFixed : true, 
            countCut : 2 
        },
        { 
            id: '7',  
            text: '平均折旧', 
            width:'11%', 
            type:'totaldeprecition', 
            unit: '%',
            footerUnit: '',
            totalName : '',
            childType : 'deprecition',
            totalType : 'subtotaldeprecition' ,
            toFixed : false, 
            countCut : 0 
        },
        { 
            id: '8',  
            text: '工费', 
            width:'11%', 
            type:'totalwage', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'wage',
            totalType : 'subtotalwage' ,
            toFixed : true, 
            countCut : 2
        },
        { 
            id: '81',  
            text: '回购价', 
            width:'11%', 
            type:'totalbuyBackPrice', 
            unit: '(元)',
            footerUnit: '',
            totalName : '',
            childType : 'buyBackPrice',
            totalType : 'subtotalbuyBackPrice' ,
            toFixed : true, 
            countCut : 2 
        }
    ]
}
