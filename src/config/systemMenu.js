
/*
 * 系统菜单配置 
 */
const systemMenu = [
	{
		text: '首页',
		path: '/mainIndex',
		icon: 'shouye', 
		children: []
	},
	{
		text: '消息',
		path: '',
		icon: 'xiaoxi',
		children: [
			{
				text: '系统消息',
				path: '/message',
				icon: 'xiaoxi2',
				children: []
			},
			{
				text: '公告',
				path: '/notice',
				icon: 'gonggao2', 
				children: []
			}
		]
	},
	
	{
		text: '组织架构',
		path: '/organizationChart',
		icon: 'zuzhijiagou', 
		children: []
	},
	
	{
		text: '工作',
		path: '',
		icon: 'gongzuo', 
		children: [
			{
				text: '入库',
				path: '/work/storage',
				icon: 'ruku', 
				children: []
			},
			{
				text: '修改',
				path: '/work/amend',
				icon: 'xiugai', 
				children: []
			},
			{
				text: '退库',
				path: '/work/storageReturn',
				icon: 'tuiku', 
				children: []
			},
			{
				text: '调库',
				path: '/work/transferStorage',
				icon: 'tiaoku', 
				children: []
			},
			{
				text: '发货',
				path: '/work/sipping',
				icon: 'fahuo', 
				children: []
			},
			{
				text: '调柜',
				path: '/work/transferCabinet',
				icon: 'tiaogui', 
				children: []
			},
			{
				text: '退货',
				path: '/work/salesReturn',
				icon: 'tuihuo', 
				children: []
			},
			{
				text: '销售',
				path: '/work/sell',
				icon: 'xiaoshou', 
				children: []
			},
			{
				text: '服务',
				path: '/work/serve',
				icon: 'fuwu', 
				children: []
			}
		]
	},
	
	{
		text: '库存',
		path: '/stockStatement',
		icon: 'kucun', 
		children: []
	},

	{
		text: '报表',
		path: '/work/report/',
		icon: 'baobiao', 
		children: [
			{
				text: '入库',
				path: '/work/report/rkreport',
				icon: 'ruku', 
				children: []
			},
			{
        text: '修改',
        path: '/work/report/xgreport',
        icon: 'xiugai', 
        children: []
      },
			{
				text: '退库',
				path: '/work/report/tkreport',
				icon: 'tuiku', 
				children: []
			},
			{
				text: '调库',
				path: '/work/report/dkreport',
				icon: 'tiaoku', 
				children: []
			},
			{
				text: '发货',
				path: '/work/report/fhreport',
				icon: 'fahuo', 
				children: []
			},
			{
				text: '调柜',
				path: '/work/report/dgreport',
				icon: 'tiaogui', 
				children: []
			},
			{
				text: '退货',
				path: '/work/report/threport',
				icon: 'tuihuo', 
				children: []
			},
			{
				text: '销售',
				path: '/work/report/sellreport',
				icon: 'xiaoshou', 
				children: []
			}
		]
	},
	{
		text: '设置',
		path: '',
		icon: 'shezhi', 
		children: [
			{
				text: '公司设置',
				path: '/work/companySetting',
				icon: 'gongsishezhi', 
				children: []
			},
			{
				text: '店铺设置',
				path: '/work/shopSetting',
				icon: 'dianpu', 
				children: []
			},
			{
				text: '系统设置',
				path: '/work/template/list',
				icon: 'xitong',
				children: []
			},
			{
				text: '打印设置',
				path: '/work/template/list',
				icon: 'moban',
				children: []
			},
			{
			   text: '小程序设置',
			   path: '/work/miniprogram',
			   icon: 'gongsishezhi',
			   children: []
			}
		]
	},
	{
		text: '数据中心',
		path: '',
		icon: 'shuju', 
		children: [
			{
				text: '数据备份',
				path: '/dataCenter',
				icon: 'beifenzaibei09', 
				children: []
			},
			{
				text: '数据导入',
				path: '/jinbaifu',
				icon: 'daoru', 
				children: []
			}
		]
	},
	{
		text: '会员管理',
		path: '',
		// icon: 'huiyuanguanli',
		icon: 'VIP',
		children: [
			{
				text: '会员',
				path: '/leaguer/newLeaguer',
				icon: 'huiyuan1', 
				children: []
			},
			{
				text: '跟进',
				path: '/leaguer/followUp',
				icon: 'genjin', 
				children: []
			},
			{
				text: '短信',
				path: '/leaguer/shortMessage',
				icon: 'duanxin', 
				children: []
			},
			{
				text: '意向顾客',
				path: '/leaguer/intentionClient',
				icon: 'yixiangliebiao1', 
				children: []
			}
		]
	},
	{
		text: '人脸',
		path: '',
		icon: 'renlianshibie1', 
		children: [
			{
				text: '来访用户列表',
				path: '/faceRecognition/visitList',
				icon: 'huiyuan1', 
				children: []
			},
			{
				text: '设备列表',
				path: '/faceRecognition/equipmentList',
				icon: 'genjin', 
				children: []
			},
			{
				text: '数据报表',
				path: '/faceRecognition/DataStatement',
				icon: 'shujudongtai', 
				children: []
			}
		]
	}
]

module.exports = systemMenu
