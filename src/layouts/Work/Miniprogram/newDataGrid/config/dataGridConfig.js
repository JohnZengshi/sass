module.exports = {
	//明细表配置
	detailConfing: [{
			id: '0', //id 
			text: '排序', //头部title文字
			width: '74', //单元格宽
			type: 'xvhao', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: '', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0, //小数点截取位数
		},
		{
			id: '2', //id 
			text: '款号', //头部title文字
			width: '100', //单元格宽
			type: 'totalNum', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'styleNo', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0, //小数点截取位数
			// sort: '1',
		},
		{
			id: '3', //id 
			text: '款号图片', //头部title文字
			width: '100', //单元格宽
			type: '', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'pics', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0, //小数点截取位数
			// sort: '',
		},
		{
			id: '8', //id 
			text: '款名', //头部title文字
			width: '370', //单元格宽
			type: 'totalWeight', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'styleNames', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0, //小数点截取位数
			// sort: ''
		},
		{
			id: '8', //id 
			text: '价格', //头部title文字
			width: '130', //单元格宽
			type: 'totalGoldWeight', //合计类型值
			unit: '(元)', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'lowhighestPrice', //单元格类型
			totalType: '', //小计
			toFixed: true, //是否进行小数点精确截取
			countCut: 3, //小数点截取位数
			sort: '3'
		},
		{
			id: '4', //id 
			text: '现售', //头部title文字
			width: '100', //单元格宽
			type: 'totalMain', //合计类型值
			unit: '(件)', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'repertory', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0, //小数点截取位数
		},
		{
			id: '6', //id 
			text: '销售状态', //头部title文字
			width: '100', //单元格宽
			type: 'totalDeputy', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'sellType', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0 //小数点截取位数
		},
		{
			id: '9', //id 
			text: '操作', //头部title文字
			width: '110', //单元格宽
			type: '', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'moreaction', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0, //小数点截取位数
			sort: ''
		}, {
			id: '10',
			text: '',
			width: "",
			type: '', //合计类型值
			childType: 'styleId', //单元格类型
		}
	]
}