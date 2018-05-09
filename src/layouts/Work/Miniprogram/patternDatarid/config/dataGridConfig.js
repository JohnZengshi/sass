module.exports = {
	//明细表配置
	detailConfing : [{
			id: '0', //id 
			text: '排序', //头部title文字
			width: '44', //单元格宽
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
			text: '条码号', //头部title文字
			width: '74', //单元格宽
			type: 'totalNum', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'barcode', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0, //小数点截取位数
		},
		{
			id: '3', //id 
			text: '商品名称', //头部title文字
			width: '204', //单元格宽
			type: '', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'jewelryName', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0, //小数点截取位数
		},
		{
			id: '8', //id 
			text: '重量', //头部title文字
			width: '74', //单元格宽
			type: 'totalWeight', //合计类型值
			unit: 'g', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'weightUnit', //单元格类型
			totalType: '', //小计
			toFixed: true, //是否进行小数点精确截取
			countCut: 3, //小数点截取位数
		},
		{
			id: '8', //id 
			text: '金额', //头部title文字
			width: '74', //单元格宽
			type: 'totalGoldWeight', //合计类型值
			unit: '(元)', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'price', //单元格类型
			totalType: '', //小计
			toFixed: true, //是否进行小数点精确截取
			countCut: 3, //小数点截取位数
		},
		{
			id: '6', //id 
			text: '商品状态', //头部title文字
			width: '74', //单元格宽
			type: 'totalDeputy', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'sellStatus', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0 //小数点截取位数
		},
		{
			id: '9', //id 
			text: '操作', //头部title文字
			width: '50', //单元格宽
			type: '', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'deleteshop', //单元格类型
			totalType: '', //小计
			toFixed: false, //是否进行小数点精确截取
			countCut: 0, //小数点截取位数
		}
	]
}