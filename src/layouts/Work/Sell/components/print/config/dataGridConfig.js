module.exports = {

	//明细表配置
	detailConfing: [{
			id: '0', //id 
			text: '序号', //头部title文字
			width: '74', //单元格宽
			type: 'totalNum', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '总件数', //底部合计 提示文字
			childType: '', //单元格类型
			totalType: 'subtotalNum' //小计
		},
		{
			id: '1',
			text: '条码号',
			width: '104',
			type: '',
			unit: '',
			footerUnit: '',
			totalName: '',
			childType: 'barcode',
			totalType: ''
		},
		{
			id: '2',
			text: '首饰名称',
			width: '97',
			type: '',
			unit: '',
			footerUnit: '',
			totalName: '',
			childType: 'jewelryName',
			totalType: ''
		},
		{
			id: '3',
			text: '总件重',
			width: '94',
			type: 'totalWeight',
			unit: '(g)',
			footerUnit: '',
			totalName: '总件重',
			childType: 'weight',
			totalType: 'subtotalWeight'
		},
		{
			id: '4',
			text: '净金重',
			width: '86',
			type: 'totalGoldWeight',
			unit: '(g)',
			footerUnit: '',
			totalName: '总净金重',
			childType: 'goldWeight',
			totalType: 'subtotalWeight'
		},
		{
			id: '5',
			text: '证书号',
			width: '97',
			type: '',
			unit: '',
			footerUnit: '',
			totalName: '',
			childType: 'certificateCode',
			totalType: ''
		},
		{
			id: '6',
			text: '主石',
			width: '80',
			type: 'totalMain',
			unit: '',
			footerUnit: '',
			totalName: '总主石数量',
			childType: 'main',
			totalType: 'subtotalMain'
		},
		{
			id: '7',
			text: '副石',
			width: '86',
			type: 'totalDeputy',
			unit: '',
			footerUnit: '',
			totalName: '总副石数量',
			childType: 'deputy',
			totalType: 'subtotalDeputy'
		},
		{
			id: '8',
			text: '售价',
			width: '56',
			type: 'totalPrice',
			unit: '(元)',
			footerUnit: '(元)',
			totalName: '总售价',
			childType: 'price',
			totalType: 'subtotalPrice'
		},
		{
			id: '9',
			text: '成本',
			width: '60',
			type: 'totalCost',
			unit: '(元)',
			footerUnit: '元',
			totalName: '总成本',
			childType: 'cost',
			totalType: 'subtotalCost'
		}
	],

	//成色大类
	detailBigTypeConfig: [{
			id: '0', //id 
			text: '序号', //头部title文字
			width: '74', //单元格宽
			type: '', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '合计', //底部合计 提示文字
			childType: '', //单元格类型
			totalType: 'subtotalNum' //小计
		},
		{
			id: '1',
			text: '产品类别',
			width: '104',
			type: '',
			unit: '',
			footerUnit: '',
			totalName: '',
			childType: 'productTypeName',
			totalType: ''
		},
		{
			id: '2',
			text: '首饰名称',
			width: '100',
			type: '',
			unit: '',
			footerUnit: '',
			totalName: '',
			childType: 'jewelryName',
			totalType: ''
		},
		{
			id: '3',
			text: '件数',
			width: '100',
			type: 'totalNum',
			unit: '',
			footerUnit: '',
			totalName: '总件数',
			childType: 'num',
			totalType: 'subtotalNum'
		},
		{
			id: '4',
			text: '件重',
			width: '100',
			type: 'totalWeight',
			unit: '(g)',
			footerUnit: '',
			totalName: '总件重',
			childType: 'weight',
			totalType: 'subtotalWeight'
		},
		{
			id: '5',
			text: '主石',
			width: '90',
			type: 'totalMain',
			unit: '',
			footerUnit: 'CT',
			totalName: '主石总计',
			childType: 'main',
			totalType: 'subtotalMain'
		},
		{
			id: '6',
			text: '副石',
			width: '97',
			type: 'totalDeputy',
			unit: '',
			footerUnit: 'CT',
			totalName: '副石总计',
			childType: 'deputy',
			totalType: 'subtotalDeputy'
		},
		{
			id: '7',
			text: '售价',
			width: '97',
			type: 'totalPrice',
			unit: '(元)',
			footerUnit: '(元)',
			totalName: '总售价',
			childType: 'price',
			totalType: 'subtotalPrice'
		},
		{
			id: '8',
			text: '成本',
			width: '80',
			type: 'totalCost',
			unit: '(元)',
			footerUnit: '(元)',
			totalName: '总成本',
			childType: 'cost',
			totalType: 'subtotalCost'
		}
	],

	//成色小类
	detailSmallTypeConfig: [{
			id: '0', //id 
			text: '序号', //头部title文字
			width: '74', //单元格宽
			type: '', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '合计', //底部合计 提示文字
			childType: '', //单元格类型
			totalType: 'subtotalNum' //小计
		},
		{
			id: '1',
			text: '产品类别',
			width: '104',
			type: '',
			unit: '',
			footerUnit: '',
			totalName: '',
			childType: 'productTypeName',
			totalType: ''
		},
		{
			id: '2',
			text: '首饰名称',
			width: '100',
			type: '',
			unit: '',
			footerUnit: '',
			totalName: '',
			childType: 'jewelryName',
			totalType: ''
		},
		{
			id: '3',
			text: '件数',
			width: '100',
			type: 'totalNum',
			unit: '',
			footerUnit: '',
			totalName: '总件数',
			childType: 'num',
			totalType: 'subtotalNum'
		},
		{
			id: '4',
			text: '件重',
			width: '100',
			type: 'totalWeight',
			unit: '(g)',
			footerUnit: '',
			totalName: '总件重',
			childType: 'weight',
			totalType: 'subtotalWeight'
		},
		{
			id: '5',
			text: '主石',
			width: '90',
			type: 'totalMain',
			unit: '',
			footerUnit: 'CT',
			totalName: '主石总计',
			childType: 'main',
			totalType: 'subtotalMain'
		},
		{
			id: '6',
			text: '副石',
			width: '97',
			type: 'totalDeputy',
			unit: '',
			footerUnit: 'CT',
			totalName: '副石总计',
			childType: 'deputy',
			totalType: 'subtotalDeputy'
		},
		{
			id: '7',
			text: '售价',
			width: '97',
			type: 'totalPrice',
			unit: '(元)',
			footerUnit: '(元)',
			totalName: '总售价',
			childType: 'price',
			totalType: 'subtotalPrice'
		},
		{
			id: '8',
			text: '成本',
			width: '80',
			type: 'totalCost',
			unit: '(元)',
			footerUnit: '(元)',
			totalName: '总成本',
			childType: 'cost',
			totalType: 'subtotalCost'
		}
	],

	// 销售
	sellTypeConfig: [{
			id: '0', //id 
			text: '序号', //头部title文字
			width: '74', //单元格宽
			type: 'totalNum', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '合计', //底部合计 提示文字
			childType: '', //单元格类型
			totalType: '' //小计
		},
		{
			id: '1', //id 
			text: '条形码', //头部title文字
			width: '104', //单元格宽
			type: '', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'barcode', //单元格类型
			totalType: '' //小计
		},
		{
			id: '2', //id 
			text: '产品类别', //头部title文字
			width: '100', //单元格宽
			type: '', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'productTypeName', //单元格类型
			totalType: '' //小计
		},
		{
			id: '3', //id 
			text: '首饰名称', //头部title文字
			width: '100', //单元格宽
			type: '', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '', //底部合计 提示文字
			childType: 'jewelryName', //单元格类型
			totalType: '' //小计
		},
		{
			id: '8',
			text: '销售类型',
			width: '80',
			type: '',
			unit: '',
			footerUnit: '',
			totalName: '',
			childType: 'sellTpye',
			totalType: ''
		},
		{
			id: '4', //id 
			text: '件重', //头部title文字
			width: '100', //单元格宽
			type: 'totalWeight', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '(克)', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '件重', //底部合计 提示文字
			childType: 'weight', //单元格类型
			totalType: '' //小计
		},
		{
			id: '5', //id 
			text: '金重', //头部title文字
			width: '90', //单元格宽
			type: 'totalGoldWeight', //合计类型值
			unit: '', //头部单位补充文字
			footerUnit: '(克)', //底部单位补充文字 可以为元、万或件等等 抽象单位
			totalName: '净金重', //底部合计 提示文字
			childType: 'goldWeight', //单元格类型
			totalType: '' //小计
		},
		{
			id: '6',
			text: '售价',
			width: '97',
			type: 'totalPrice',
			unit: '(元)',
			footerUnit: '(元)',
			totalName: '总售价',
			childType: 'price',
			totalType: ''
		},
		{
			id: '7',
			text: '成本',
			width: '97',
			type: 'totalCost',
			unit: '(元)',
			footerUnit: '(元)',
			totalName: '总成本',
			childType: 'cost',
			totalType: ''
		}
	]
}