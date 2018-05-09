module.exports = {
    //明细表配置
	detailConfing: [
        {
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'80', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : '', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0, //小数点截取位数
        },
        {
    		id: '2',  //id 
    		text: '条码号', //头部title文字
    		width:'150', //单元格宽
    		type:'totalNum', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'barcode', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: 1,
        },
        { 
    		id: '3',  //id 
    		text: '首饰名称', //头部title文字
    		width:'155', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'jewelryName', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: '',
		},
		{ 
    		id: '8',  //id 
    		text: '件重', //头部title文字
    		width:'120', //单元格宽
    		type:'totalWeight', //合计类型值
    		unit: '(g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'weight', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
		},
		{ 
    		id: '8',  //id 
    		text: '金重', //头部title文字
    		width:'120', //单元格宽
    		type:'totalGoldWeight', //合计类型值
    		unit: '(g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'goldWeight', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
        },
        { 
    		id: '4',  //id 
    		text: '主石', //头部title文字
    		width:'120', //单元格宽
    		type:'totalMain', //合计类型值
    		unit: '(ct、g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'main', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
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
    		id: '6',  //id 
    		text: '副石', //头部title文字
    		width:'120', //单元格宽
    		type:'totalDeputy', //合计类型值
    		unit: '(ct、g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'deputy', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
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
    		id: '9',  //id 
    		text: '售价', //头部title文字
    		width:'120', //单元格宽
    		type:'totalPrice', //合计类型值
    		unit: '(元)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'price', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
        },
        { 
    		id: '10',  //id 
    		text: '成本', //头部title文字
    		width:'120', //单元格宽
    		type:'totalCost', //合计类型值
    		unit: '(元)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'cost', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
    	},
	],
	//智能列表
	intelligentConfing: [
		{
    		id: '1',  //id 
    		text: '位置名称', //头部title文字
    		width:'130', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'whereName', //单元格类型
			totalType : '' , //小计
			totalType0 : '' , //小计1
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        {
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'80', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : '', //单元格类型
			totalType : '' , //小计
			totalType0 : '' , //小计1
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
		},
		{
    		id: '2',  //id 
    		text: '产品类别', //头部title文字
    		width:'150', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'className', //单元格类型
			totalType : '' , //小计
			totalType0 : '' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: '1'
        },
        
        { 
    		id: '3',  //id 
    		text: '首饰名称', //头部title文字
    		width:'150', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'className', //单元格类型
			totalType : '' , //小计
			totalType0 : '' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
		},
		{
    		id: '2',  //id 
    		text: '件数', //头部title文字
    		width:'120', //单元格宽
    		type:'totalNum', //合计类型值
    		unit: '(件)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'num', //单元格类型
    		totalType : 'totalNum1' , //小计
    		totalType0 : 'totalNum0' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
		},
		{
    		id: '3',  //id 
    		text: '件重', //头部title文字
    		width:'120', //单元格宽
    		type:'totalWeight', //合计类型值
    		unit: '(g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'weight', //单元格类型
    		totalType : 'totalWeight1' , //小计
    		totalType0 : 'totalWeight0' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
		},
		{
    		id: '3',  //id 
    		text: '金重', //头部title文字
    		width:'120', //单元格宽
    		type:'totalGoldWeight', //合计类型值
    		unit: '(g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'goldWeight', //单元格类型
    		totalType : 'goldWeight' , //小计
    		totalType0 : 'totalGoldWeight0' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
        },
        { 
    		id: '4',  //id 
    		text: '主石', //头部title文字
    		width:'130', //单元格宽
    		type:'totalMain', //合计类型值
    		unit: '(ct、g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'main', //单元格类型
			totalType : 'totalMain1' , //小计
			totalType0 : 'totalMain0' , //小计1
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        { 
    		id: '6',  //id 
    		text: '副石', //头部title文字
    		width:'130', //单元格宽
    		type:'totalDeputy', //合计类型值
    		unit: '(ct、g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'deputy', //单元格类型
			totalType : 'totalDeputy1' , //小计
			totalType0 : 'totalDeputy0' , //小计1
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        { 
    		id: '9',  //id 
    		text: '售价', //头部title文字
    		width:'120', //单元格宽
    		type:'totalPrice', //合计类型值
    		unit: '(元)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'price', //单元格类型
			totalType : 'totalPrice1' , //小计
			totalType0 : 'totalPrice0' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
        },
        { 
    		id: '10',  //id 
    		text: '成本', //头部title文字
    		width:'120', //单元格宽
    		type:'totalCost', //合计类型值
    		unit: '(元)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'cost', //单元格类型
			totalType : 'totalCost1' , //小计
			totalType0 : 'totalCost0' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
    	},
	],
	//产品分类
	produceConfing: [
		{
    		id: '1',  //id 
    		text: '位置名称', //头部title文字
    		width:'150', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'whereName', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        {
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'80', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : '', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
		},
		{
    		id: '2',  //id 
    		text: '产品类别', //头部title文字
    		width:'150', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'className', //单元格类型
    		totalType : '' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: '1',
        },
		{
    		id: '2',  //id 
    		text: '件数', //头部title文字
    		width:'120', //单元格宽
    		type:'totalNum', //合计类型值
    		unit: '(件)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'totalNum1', //单元格类型
    		totalType : 'totalNum0' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: '',
		},
		{ 
    		id: '8',  //id 
    		text: '件重', //头部title文字
    		width:'150', //单元格宽
    		type:'totalWeight', //合计类型值
    		unit: '(g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'totalWeight1', //单元格类型
    		totalType : 'totalWeight0' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: '',
		},
		{
    		id: '3',  //id 
    		text: '金重', //头部title文字
    		width:'120', //单元格宽
    		type:'totalGoldWeight', //合计类型值
    		unit: '(g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'goldWeight', //单元格类型
    		totalType : 'totalGoldWeight1' , //小计
    		totalType0 : 'totalGoldWeight0' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
        },
        { 
    		id: '4',  //id 
    		text: '主石', //头部title文字
    		width:'150', //单元格宽
    		type:'totalMain', //合计类型值
    		unit: '(ct、g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'totalMain1', //单元格类型
    		totalType : 'totalMain0' , //小计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        { 
    		id: '6',  //id 
    		text: '副石', //头部title文字
    		width:'150', //单元格宽
    		type:'totalDeputy', //合计类型值
    		unit: '(ct、g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'totalDeputy1', //单元格类型
    		totalType : 'totalDeputy0' , //小计
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        
        { 
    		id: '9',  //id 
    		text: '售价', //头部title文字
    		width:'150', //单元格宽
    		type:'totalPrice', //合计类型值
    		unit: '(元)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'totalPrice1', //单元格类型
    		totalType : 'totalPrice0' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
        },
        { 
    		id: '10',  //id 
    		text: '成本', //头部title文字
    		width:'150', //单元格宽
    		type:'totalCost', //合计类型值
    		unit: '(元)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'totalCost1', //单元格类型
    		totalType : 'totalCost0' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
    	},
	],
	//自定义分类
	customConfing: [
		{
    		id: '1',  //id 
    		text: '位置名称', //头部title文字
    		width:'150', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'whereName', //单元格类型
			totalType : '' , //小计
			totalType0 : '' , //小计1
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        {
    		id: '0',  //id 
    		text: '序号', //头部title文字
    		width:'80', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : '', //单元格类型
			totalType : '' , //小计
			totalType0 : '' , //小计1
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
		},
		{
    		id: '2',  //id 
    		text: '产品类别', //头部title文字
    		width:'150', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'className', //单元格类型
			totalType : '' , //小计
			totalType0 : '' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: '1'
		},
		{
    		id: '2',  //id 
    		text: '首饰名称', //头部title文字
    		width:'150', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'className', //单元格类型
			totalType : '' , //小计
			totalType0 : '' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
        },
		{
    		id: '2',  //id 
    		text: '件数', //头部title文字
    		width:'120', //单元格宽
    		type:'totalNum', //合计类型值
    		unit: '(件)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'num', //单元格类型
			totalType : 'totalNum1' , //小计
			totalType0 : 'totalNum0' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
		},
		{ 
    		id: '8',  //id 
    		text: '件重', //头部title文字
    		width:'150', //单元格宽
    		type:'totalWeight', //合计类型值
    		unit: '(g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'weight', //单元格类型
			totalType : 'totalWeight1' , //小计
			totalType0 : 'totalWeight0' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
		},
		{
    		id: '3',  //id 
    		text: '金重', //头部title文字
    		width:'120', //单元格宽
    		type:'totalGoldWeight', //合计类型值
    		unit: '(g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'goldWeight', //单元格类型
    		totalType : 'totalGoldWeight1' , //小计
    		totalType0 : 'totalGoldWeight0' , //小计
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
        },
        { 
    		id: '4',  //id 
    		text: '主石', //头部title文字
    		width:'150', //单元格宽
    		type:'totalMain', //合计类型值
    		unit: '(ct、g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'main', //单元格类型
			totalType : 'totalMain1' , //小计
			totalType0 : 'totalMain0' , //小计1
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        { 
    		id: '6',  //id 
    		text: '副石', //头部title文字
    		width:'150', //单元格宽
    		type:'totalDeputy', //合计类型值
    		unit: '(ct、g)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'deputy', //单元格类型
			totalType : 'totalDeputy1' , //小计
			totalType0 : 'totalDeputy0' , //小计1
            toFixed : false, //是否进行小数点精确截取
            countCut : 0 //小数点截取位数
        },
        
        { 
    		id: '9',  //id 
    		text: '售价', //头部title文字
    		width:'150', //单元格宽
    		type:'totalPrice', //合计类型值
    		unit: '(元)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'price', //单元格类型
			totalType : 'totalPrice1' , //小计
			totalType0 : 'totalPrice0' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
        },
        { 
    		id: '10',  //id 
    		text: '成本', //头部title文字
    		width:'150', //单元格宽
    		type:'totalCost', //合计类型值
    		unit: '(元)', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '',//底部合计 提示文字
    		childType : 'cost', //单元格类型
			totalType : 'totalCost1' , //小计
			totalType0 : 'totalCost0' , //小计1
            toFixed : false, //是否进行小数点精确截取
			countCut : 0, //小数点截取位数
			sort: ''
    	},
    ]
}