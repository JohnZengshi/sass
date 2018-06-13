
module.exports = {
	
	//销售
	sell : [
    	{ 
    		id: '0',  //id 
    		text: '产品类别', //头部title文字
    		width:'15%', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'className', //单元格类型
    		totalType : '',
            toFixed : false,
            countCut : 0
    	},
    	{ 
        id: '2245',  
        text: '件数',
        width:'15%',
        type:'totalNum', 
        unit: '(件)',
        footerUnit: '',
        totalName : '',
        childType : 'num',
        totalType : 'totalNum' ,
        allType : 'totalNum',
        toFixed : false, 
        countCut : 0 
      },
    	{ 
    		id: '4',  
    		text: '件重', 
    		width:'15%',
    		type:'totalWeight', 
    		unit: '(g)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'weight',
    		totalType : 'totalWeight',
        toFixed : false,
        countCut : 3 
    	},
    	
    	{ 
        id: '522',  
        text: '金重',
        width:'15%', 
        type:'totalGoldWeight', 
        unit: '(g)',
        footerUnit: '',
        totalName : '',
        childType : 'goldWeight',
        totalType : 'totalGoldWeight' ,
        toFixed : false,
        countCut : 3
      },
    	{ 
    		id: '7',  
    		text: '标价', 
    		width:'15%', 
    		type:'totalPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'soldPrice',
    		totalType : 'totalSoldPrice' ,
        toFixed : false,
        countCut : 2
    	},
    	{ 
    		id: '127',  
    		text: '实售价', 
    		width:'15%', 
    		type:'totalRealPrice', 
    		unit: '(元)',
    		footerUnit: '',
    		totalName : '',
    		childType : 'realPrice',
    		totalType : 'totalRealPrice' ,
        toFixed : false,
        countCut : 2
    	}
    ],
	
	trade : [
	   // { 
    //     id: '0',  //id 
    //     text: '序号', //头部title文字
    //     width:'12%', //单元格宽
    //     type:'allNum', //合计类型值
    //     unit: '', //头部单位补充文字
    //     footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    //     totalName : '合计',//底部合计 提示文字
    //     childType : '', //单元格类型
    //     totalType : '', //小计
    //     allType : 'allNum',//全计
    //         toFixed : false, //是否进行小数点精确截取
    //         countCut : 0 //小数点截取位数
    //   },
        // { 
        //     id: '100',  
        //     text: '销售类型',
        //     width:'12%', 
        //     type:'', 
        //     unit: '',
        //     footerUnit: '',
        //     totalName : '',
        //     childType : 'className',
        //     totalType : '' ,
        //     allType : '',
        //     toFixed : false,
        //     countCut : 0
        //   },
        { 
            id: '11',  
            text: '回购类型',
            width:'15%', 
            type:'sellTypeName', 
            unit: '',
            footerUnit: '',
            totalName : '',
            childType : 'sellTypeName',
            totalType : '' ,
            allType : '',
            toFixed : false,
            countCut : 0
        },

      { 
        id: '12',  
        text: '产品类别',
        width:'15%', 
        type:'', 
        unit: '',
        footerUnit: '',
        totalName : '',
        childType : 'className',
        totalType : '' ,
        allType : '',
        toFixed : false,
        countCut : 0
      },
      { 
        id: '2245',  
        text: '件数',
        width:'15%',
        type:'totalNum', 
        unit: '(件)',
        footerUnit: '',
        totalName : '',
        childType : 'num',
        totalType : 'totalNum' ,
        allType : 'allNum',
        toFixed : false, 
        countCut : 0 
      },
      { 
        id: '4',  
        text: '件重', 
        width:'15%',
        type:'totalWeight', 
        unit: '(g)',
        footerUnit: '',
        totalName : '',
        childType : 'weight',
        totalType : 'totalWeight',
        allType : 'allWeight',
        toFixed : false,
        countCut : 3 
      },
      
      { 
        id: '522',  
        text: '金重',
        width:'15%', 
        type:'totalGoldWeight', 
        unit: '(g)',
        footerUnit: '',
        totalName : '',
        childType : 'goldWeight',
        totalType : 'totalGoldWeight' ,
        allType : 'allGoldWeight',
        toFixed : false,
        countCut : 3
      },
      { 
        id: '523',  
        text: '标价/原售价',
        width:'15%', 
        type:'totalSoldPrice', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'soldPrice',
        totalType : 'totalSoldPrice',
        allType : 'allSoldPrice',
        toFixed : false,
        countCut : 2
      },
      { 
        id: '6',  
        text: '工费总额',
        width:'15%', 
        type:'totalWage', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'wage',
        totalType : 'totalWage' ,
        allType : 'allWage',
            toFixed : false,
            countCut : 2
      },
      { 
        id: '7',  
        text: '实售价/回购价', 
        width:'15%', 
        type:'totalRealPrice', 
        unit: '(元)',
        footerUnit: '',
        totalName : '',
        childType : 'realPrice',
        totalType : 'totalRealPrice' ,
        allType : 'allBackPrice',
        toFixed : false,
        countCut : 2
      }
    ]
}
