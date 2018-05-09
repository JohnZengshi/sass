
module.exports = {
	
	//明细表配置
	detailConfing : [
    	{ 
    		id: '0',  //id 
    		text: '店铺名称', //头部title文字
    		width:'200', //单元格宽
    		type:'', //合计类型值
    		unit: '', //头部单位补充文字
    		footerUnit: '',//底部单位补充文字 可以为元、万或件等等 抽象单位
    		totalName : '合计',//底部合计 提示文字
    		childIconClass : 'shopName',
    		childType : 'shopName', //单元格类型
    		totalType : '' //小计
    	},

    	{ 
    		id: '11',  
    		text: '刷卡',
    		width:'80', 
    		type:'', 
    		unit: '元',
    		footerUnit: '',
    		totalName : '',
    		childIconClass : 'slotCard',
    		childType : 'slotCard',
    		totalType : 'totalSlotCard' 
    	},
    	{ 
    		id: '12',  
    		text: '现金',
    		width:'80', 
    		type:'', 
    		unit: '元',
    		footerUnit: '',
    		totalName : '',
    		childIconClass : 'cash',
    		childType : 'cash',
    		totalType : 'totalCash' 
    	},
    	{ 
    		id: '1',  
    		text: '微信',
    		width:'80', 
    		type:'', 
    		unit: '元',
    		footerUnit: '',
    		totalName : '',
    		childIconClass : 'weixin',
    		childType : 'weixin',
    		totalType : 'totalWeixin' 
    	},
    	{ 
    		id: '2',  
    		text: '支付宝',
    		width:'80',
    		type:'', 
    		unit: '元',
    		footerUnit: '',
    		totalName : '',
    		childIconClass : 'zhifubao',
    		childType : 'zhifubao',
    		totalType : 'totalZhifubao' 
    	},
    	{ 
    		id: '4',  
    		text: '其他', 
    		width:'80',
    		type:'', 
    		unit: '元',
    		footerUnit: '',
    		totalName : '',
    		childIconClass : 'other',
    		childType : 'other',
    		totalType : 'totalOther' 
    	},
    	{ 
    		id: '5',  
    		text: '总计',
    		width:'80', 
    		type:'', 
    		unit: '元',
    		footerUnit: '',
    		totalName : '',
    		childIconClass : '',
    		childType : 'shopTotalMoney',
    		totalType : 'totalMoney' 
    	}
    ]
	
}
