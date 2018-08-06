module.exports = {
  //明细表配置
  detailConfing: [
    {
      id: '1', //id 
      text: '序号', //头部title文字
      width: '100', //单元格宽
      type: 'totalNum', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: '', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '1', //id 
      text: '头像', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'avatarUrl', //单元格类型
      totalType: 'totalNum', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '2', //id 
      text: '姓名', //头部title文字
      width: '100', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'nickname', //单元格类型
      totalType: 'totalNum', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '3', //id 
      text: '手机号', //头部title文字
      width: '175', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'phone', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '8', //id 
      text: '负责人', //头部title文字
      width: '120', //单元格宽
      type: 'name', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'name', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afWeight'
    },
    {
      id: '8', //id 
      text: '会员级别', //头部title文字
      width: '100', //单元格宽
      type: 'totalGoldWeight', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'grade', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afGoldWeight'
    },
    {
      id: '4', //id 
      text: '会员类型', //头部title文字
      width: '150', //单元格宽
      type: 'totalMain', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'typeName', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afMain'
    },
    {
      id: '6', //id 
      text: '消耗积分', //头部title文字
      width: '120', //单元格宽
      type: 'totalDeputy', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'withScore', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'afDeputy'
    },
    {
      id: '9', //id 
      text: '剩余积分', //头部title文字
      width: '120', //单元格宽
      type: 'totalPrice', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'score', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'afPrice'
    },
    {
      id: '10', //id 
      text: '客单价', //头部title文字
      width: '120', //单元格宽
      type: 'totalCost', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'guestPrice', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : 'afCost'
    },
    {
      id: '12', //id 
      text: '消费总额', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'sumPrice', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : ''
    },
    {
      id: '13', //id 
      text: '消费次数', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'sumSize', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : ''
    },
    {
      id: '11', //id 
      text: '注册时间', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'createTime', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : ''
    },
    {
      id: '11', //id 
      text: '操作', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'del', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    }
  ],
  // 短信管理->即时短信->表格头部,表格内容字段配置
  noteManageHeader01: [
      {
          id: "1",
          text: "模板类型",
          tableValue:"moduleType"
      },
      {
          id: "2",
          text: "短信名称",
          tableValue:"noteName",
          isClick:true, //可点击
      },
      {
          id: "3",
          text: "创建人",
          tableValue:"createdPreson"
      },
      {
          id: "5",
          text: "今日发送",
          tableValue:"todaySend"
      },
      {
          id: "6",
          text: "累计发送",
          tableValue:"totalSend"
      },

  ],
  // 短信管理->触发短信->表格头部,表格内容字段配置
  noteManageHeader02: [
      {
          id: "1",
          text: "短信名称",
          tableValue:"noteName",
          isClick:true, //可点击
      },
      {
          id: "2",
          text: "创建人",
          tableValue:"createdPreson"
      },
      {
          id: "3",
          text: "模板状态",
          tableValue:"moduleState",
          isActive: true, //有活动状态
          isChangeVal:true, //需要装换值
          ChangeVal:[{    //需要装换的值
            "moduleState":true,
            text:"开启"
          },{
            "moduleState":false,
            text:"禁用"  
          }]
      },
      {
          id: "4",
          text: "今日发送",
          tableValue:"todaySend"
      },
      {
          id: "5",
          text: "累计发送",
          tableValue:"totalSend"
      },
    //   {
    //       id: "6",
    //       text: "操作",
    //       operation:true,
    //       operationList:["icon-qidong","icon-bianji","icon-lajitong"]
    //   },

  ],
  // 短信管理->短信日志->表格头部,表格内容字段配置
  noteManageHeader03: [{
          id: "1",
          text: "模板类型",
          tableValue:"moduleType",
          width:92
      },
      {
          id: "2",
          text: "短信名称",
          tableValue:"noteName",
          width:96
      },
      {
          id: "3",
          text: "短信内容",
          tableValue:"noteContent",
          width:482
      },
      {
          id: "4",
          text: "用户姓名",
          tableValue:"userName",
          width:96
      },
      {
          id: "5",
          text: "用户手机",
          tableValue:"userPhone",
          width:106
      },
      {
          id: "6",
          text: "短信剩余",
          tableValue:"noteSurplus",
          width:94
      },
      {
          id: "7",
          text: "发送状态",
          active:true,
          tableValue:"sendState",
          isActive: true, //有活动状态
          isChangeVal:true, //需要装换值
          ChangeVal:[{    //需要装换的值
            "sendState":true,
            text:"发送成功"
          },{
            "sendState":false,
            text:"发送失败"  
          }],
          width:108
          
      },
      {
          id: "8",
          text: "发送时间",
          tableValue:"sendTime",
          width:106
      }

  ],
  // 短信管理->新增短信->隐藏字段,表格内容字段配置
  memberListHeader: [{
          text: "姓名",
          tableValue: "name",
          pic: true,//开启头像
          picValue:"img" //头像字段
      },
      {
          text: "电话",
          tableValue: "phone"
      }
  ],
  noteLogListHeader:[{
      text:"用户名",
      tableValue:"userName",
  },{
      text:"用户手机",
      tableValue:"userPhone",
  },{
      text:"发送时间",
      tableValue:"sendTime",
  }, {
      text: "发送状态",
      tableValue: "sendState",
      isActive: true,
      isChangeVal: true, //需要装换值
      ChangeVal: [{ //需要装换的值
          "sendState": true,
          text: "发送成功"
      }, {
          "sendState": false,
          text: "发送失败"
      }]
  }]

}