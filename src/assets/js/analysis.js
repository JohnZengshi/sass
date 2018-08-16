export const getDynamicsType = function (type) {
  switch (type) {
    case '001':
      return '新建了'
    case '002':
      return '修改了'
    case '003':
      return '审核通过了'
    case '005':
      return '删除了'
    case '004':
      return '审批不通过'
    case '011':
      return '收银了'
    case '102':
      return '用户权限'
    case '201':
      return '购买了'
    case '007':
      return '删除'
    case '901':
      return '登录系统'
    case '902':
      return '退出系统'
    case '903':
      return '备份数据'
    case '904':
      return '恢复数据'
  }
  return false
}
export const getDynamicsOrderType = function (type) {
  switch (type) {
    case '01':
      return '入库'
    case '02':
      return '退库'
    case '03':
      return '发货'
    case '04':
      return '退货'
    case '05':
      return '销售'
    case '06':
      return '调柜'
    case '07':
      return '调库'
    // case '08':
    //   return '修改'
    case '10':
      return '修改'
  }
  return ''
}
// 时间类型
export const getTimeType = function (type) {
    switch (type) {
    case '1':
      return '年'
    case '2':
      return '月'
    case '3':
      return '周'
  }
  return ''
}
export const getTriggerRule = function (type) {
  switch (type) {
    case '1':
      return '销售成功'
    case '2':
      return '退货成功'
    case '3':
      return '换货成功'
    case '4':
      return '生日'
    case '5':
      return '结婚纪念日'
    case '6':
      return '圣诞节'
    case '7':
      return '元旦'
  }
  return ''
}
export const getTriggerTime = function (type) {
  switch (type) {
    case '1':
      return '前'
    case '2':
      return '后'
  }
  return ''
}
export const getWeekTime = function (type) {
  switch (type) {
    case '1':
      return '周一'
    case '2':
      return '周二'
    case '3':
      return '周三'
    case '4':
      return '周四'
    case '5':
      return '周五'
    case '6':
      return '周六'
    case '7':
      return '周日'
  }
  return ''
}
// 跟进类型
export const getFollowType = function (type) {
  switch (type) {
    case '1':
      return '即时跟进'
    case '2':
      return '触发跟进'
  }
  return ''
}
// 跟进状态
export const getFollowUpStatus = function (type) {
  switch (type) {
    case '1':
      return '进行中'
    case '2':
      return '已超时'
    case '3':
      return '已完成'
    case '4':
      return '待跟进'
  }
  return ''
}
export const getVisitAimList = function (type) {
  switch (type) {
    case '1':
      return '生日跟进'
    case '2':
      return '售后跟进'
    case '3':
      return '日常跟进'
    case '4':
      return '纪念日跟进'
    case '5':
      return '其他跟进'
  }
  return ''
}
// 001 创建单据
// 002 修改单据
// 003 审批单据-通过
// 004 审批单据-不通过
// 005 删除单据
// 006 单据添加商品
// 007 单据删除商品
// 008 单据添加备注
// 009 单据提交审核
// 010 收货
// 011 收银
// 101 修改用户授权
// 102 删除用户授权
// 201 购买店铺
// 901 登录系统
// 902 退出系统
// 903 备份数据
// 904 恢复数据