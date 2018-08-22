import {GetNYR,GetSF} from "assets/js/getTime";
module.exports = {
  //会员列表
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
      smallImg: true, // 小图
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
      width: '150', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'createTime', //单元格类型
      totalType: '', //小计
      line: true, // 单行显示
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
      childType: 'compile', //单元格类型
      del: true,
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    }
  ],
  //跟进列表
  followUpConfing: [
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
      id: '222', //id 
      text: '头像', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'avatarUrl', //单元格类型
      smallImg: true, // 小图
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
      childType: 'userName', //单元格类型
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
      childType: 'principalName', //单元格类型
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
      childType: 'memberGrade', //单元格类型
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
      childType: 'memberType', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afMain'
    },
    {
      id: '6', //id 
      text: '跟进目的', //头部title文字
      width: '120', //单元格宽
      type: 'totalDeputy', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followPurpose', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afDeputy'
    },
    {
      id: '9', //id 
      text: '跟进状态', //头部title文字
      width: '120', //单元格宽
      type: 'totalPrice', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followStatus', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afPrice'
    },
    {
      id: '10', //id 
      text: '跟进类型', //头部title文字
      width: '120', //单元格宽
      type: 'totalCost', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followType', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afCost'
    },
    {
      id: '12', //id 
      text: '跟进时间', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followTime', //单元格类型
      nyr: true, // 时间只显示年月日
      totalType: '', //小计
      line: true, // 单行显示
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : ''
    },
    {
      id: '13', //id 
      text: '操作', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'compile', //单元格类型
      compile: true,
      del: true,
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    }
  ],
  // 选择会员
  chooseUserConfig: [
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
      id: '222', //id 
      text: '头像', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'avatarUrl', //单元格类型
      smallImg: true, // 小图
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
      childType: 'userName', //单元格类型
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
      childType: 'principalName', //单元格类型
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
      childType: 'memberGrade', //单元格类型
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
      childType: 'memberType', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afMain'
    },
    {
      id: '6', //id 
      text: '跟进目的', //头部title文字
      width: '120', //单元格宽
      type: 'totalDeputy', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followPurpose', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afDeputy'
    },
    {
      id: '9', //id 
      text: '跟进状态', //头部title文字
      width: '120', //单元格宽
      type: 'totalPrice', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followStatus', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afPrice'
    },
    {
      id: '10', //id 
      text: '跟进类型', //头部title文字
      width: '120', //单元格宽
      type: 'totalCost', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followType', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afCost'
    },
    {
      id: '12', //id 
      text: '跟进时间', //头部title文字
      width: '150', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followTime', //单元格类型
      nyr: true, // 时间只显示年月日
      totalType: '', //小计
      line: true, // 单行显示
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      sort: '',
      editOldType : ''
    },
    {
      id: '13', //id 
      text: '操作', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'compile', //单元格类型
      compile: true,
      del: true,
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '13', //id 
      text: '操作', //头部title文字
      width: '120', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'compile', //单元格类型
      checkedId: 'followId',
      checked: true, // 选中按钮
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    }
  ],
  //短信管理->即时短信->表格头部,表格内容字段配置
  noteManageHeader01: 
          [{
              id: "1",
              text: "模板类型",
              tableValue: "templateTypeName"
          },
          {
              id: "2",
              text: "短信名称",
              tableValue: "templateName",
              isClick: true, //可点击
          },
          {
              id: "3",
              text: "创建人",
              tableValue: "nickname"
          },
          {
              id: "4",
              text: "发送条数",
              tableValue: "countSize"
          },
          {
              id: "7",
              text: "发送人数",
              tableValue: "countPhone"
          },
          //   {
          //       id: "5",
          //       text: "今日发送",
          //       tableValue: "todaySend"
          //   },
          {
              id: "5",
              text: "发送时间",
              tableValue: "createTime",
              isChangeVal: true, //需要装换值
              changeValRules: (val) => {
                  //   console.log(val)
                  return `${GetNYR(val)}${" "}${GetSF(val)}`;
              },
          },
          {
              id: "6",
              text: "累计发送",
              tableValue: "count"
          },

      ],
  //短信管理->触发短信->表格头部,表格内容字段配置
  noteManageHeader02: 
      [{
          id: "1",
          text: "类型名称",
          tableValue: "templateTypeName",
          isClick: true, //可点击
      }, {
          id: "1",
          text: "短信名称",
          tableValue: "templateName",
          isClick: true, //可点击
      },
      {
          id: "2",
          text: "创建人",
          tableValue: "nickname"
      },
      {
          id: "3",
          text: "短信状态",
          tableValue: "status",
          isActive: true, //有活动状态
          activeRules: (val) => {
              if (val == "禁用") {
                  return true
              } else {
                  return false
              }
          },
          // isChangeVal: true, //需要装换值
          // changeValRules: (val) => {
          //     if (val) {
          //         return "开启"
          //     } else {
          //         return "禁用"
          //     }
          // },
      },
      {
          id: "4",
          text: "今日发送",
          tableValue: "countSize"
      },
      {
          id: "5",
          text: "累计发送",
          tableValue: "count"
      },
      //   {
      //       id: "6",
      //       text: "操作",
      //       operation:true,
      //       operationList:["icon-qidong","icon-bianji","icon-lajitong"]
      //   },

  ],
  //短信管理->短信日志->表格头部,表格内容字段配置
  noteManageHeader03: [
    {
          id: "1",
          text: "模板类型",
          tableValue: "templateTypeName",
          width: 136
      },
      {
          id: "2",
          text: "短信名称",
          tableValue: "templateName",
          width: 102
      },
      {
          id: "3",
          text: "短信内容",
          tableValue: "content",
          width: 480
      },
      //   {
      //       id: "4",
      //       text: "用户姓名",
      //       tableValue: "userName",
      //       width: 96
      //   },
      {
          id: "5",
          text: "发送条数",
          tableValue: "countSize",
          isActive: true,
          activeRules: (val) => {
              if (val && val.indexOf("+")) {
                  return true
              } else if (val && val.indexOf("-")) {
                  return false
              }
          },
          width: 133
      },
      //   {
      //       id: "5",
      //       text: "用户手机",
      //       tableValue: "userPhone",
      //       width: 106
      //   },
      {
          id: "6",
          text: "短信剩余",
          tableValue: "remainingSize",
          width: 133
      },
      {
          id: "7",
          text: "发送状态",
          tableValue: "status",
          isActive: true, //有活动状态
          activeRules: (val) => {
              return !val
          },
          // isChangeVal: true, //需要装换值
          // changeValRules: (val) => {
          //     if (val) {
          //         return "发送成功"
          //     } else {
          //         return "发送失败"
          //     }
          // },
          width: 121

      },
      {
          id: "8",
          text: "发送时间",
          tableValue: "createTime",
          width: 143,
          isChangeVal: true, //需要装换值
          changeValRules: (val) => {
              //   console.log(val)
              return `${GetNYR(val)}${" "}${GetSF(val)}`;
          },
      }

  ],
  //短信日志
  noteLogListHeader: [{
      text: "用户名",
      tableValue: "userName",
  }, {
      text: "用户手机",
      tableValue: "userPhone",
  }, {
      text: "发送时间",
      tableValue: "sendTime",
  }, {
      text: "发送状态",
      tableValue: "sendState",
      isActive: true,
      activeRules: (val) => {
          return !val
      },
      // isChangeVal: true, //需要装换值
      // changeValRules: (val) => {
      //     if (val) {
      //         return "发送成功"
      //     } else {
      //         return "发送失败"
      //     }
      // },
  }],
  //模板列表插入模板
  moduleLsitHeader: [{
      text: "模板名称",
      tableValue: "templateName",
      width: 100,
  }, {
      text: "模板内容",
      tableValue: "content",
      width: 449,
  }],
  //短信管理->新增短信->发送人列表
  sendPresonListHeader: [{
      text: "头像",
      tableValue: "headPortrait",
      pic: true,
      width: 98,
  }, {
      text: "姓名",
      tableValue: "memberName",
      width: 79,
  }, {
      text: "手机号",
      tableValue: "phone",
      picAndText: true,
      picValue: "phoneImg"
  }],
  //模板管理->列表
  moduleListHeader: [{
      text: "模板类型",
      tableValue: "templateTypeName",
      width: 192,
  }, {
      text: "模板名称",
      tableValue: "templateName",
      width: 94,
  }, {
      text: "模板内容",
      tableValue: "content",
      width: 579
  }, {
      text: "创建人",
      tableValue: "nickname",
      width: 90
  }, {
      text: "创建时间",
      tableValue: "createTime",
      width: 180,
      isChangeVal: true, //需要装换值
      changeValRules: (val) => {
          // console.log(val)
          return `${GetNYR(val)}${" "}${GetSF(val)}`;
      },
  }],
  //管理签名
  signatureListHeader: [{
      text: "签名内容",
      tableValue: "signName"
  }, {
      text: "创建人",
      tableValue: "userName"
  }, {
      text: "创建时间",
      tableValue: "createTime",
      isChangeVal: true, //需要装换值
      changeValRules: (val) => {
          return `${GetNYR(val)}${" "}${GetSF(val)}`;
      },
  }],
  //跟进管理
  followUpManageConfig: [
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
      id: '2', //id 
      text: '跟进目的', //头部title文字
      width: '210', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followPurpose', //单元格类型
      totalType: 'totalNum', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '3', //id 
      text: '跟进名称', //头部title文字
      width: '210', //单元格宽
      type: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followName', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    },
    {
      id: '8', //id 
      text: '创建人', //头部title文字
      width: '210', //单元格宽
      type: 'name', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'createName', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afWeight'
    },
    // {
    //   id: '8', //id 
    //   text: '负责人', //头部title文字
    //   width: '210', //单元格宽
    //   type: 'name', //合计类型值
    //   unit: '', //头部单位补充文字
    //   footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
    //   totalName: '', //底部合计 提示文字
    //   childType: 'principalName', //单元格类型
    //   totalType: '', //小计
    //   toFixed: false, //是否进行小数点精确截取
    //   countCut: 0, //小数点截取位数
    //   editOldType : 'afWeight'
    // },
    {
      id: '8', //id 
      text: '跟进状态', //头部title文字
      width: '210', //单元格宽
      type: 'totalGoldWeight', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'followStatus', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afGoldWeight'
    },
    {
      id: '4', //id 
      text: '跟进人数', //头部title文字
      width: '210', //单元格宽
      type: 'totalMain', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'memberNum', //单元格类型
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : 'afMain'
    },
    {
      id: '13', //id 
      text: '操作', //头部title文字
      width: '200', //单元格宽
      type: '', //合计类型值
      type1: '', //合计类型值
      unit: '', //头部单位补充文字
      footerUnit: '', //底部单位补充文字 可以为元、万或件等等 抽象单位
      totalName: '', //底部合计 提示文字
      childType: 'compile', //单元格类型
      compile: true,
      del: true,
      totalType: '', //小计
      toFixed: false, //是否进行小数点精确截取
      countCut: 0, //小数点截取位数
      editOldType : ''
    }
  ],
}