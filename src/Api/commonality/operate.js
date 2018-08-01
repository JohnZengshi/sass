import apiCall from './ApiCall.js'
export default class Axios {
  constructor (url, options) {
    this.options = options
    this.url = url
  }
  apiCall () {
    return new Promise((resolve, reject) => {
      apiCall( this.options, this.url).then((res) => {
        if (res.data.state == 200105) {
          reject(res)
        } else {
          resolve(res)
        }
      })
    })
  }
}
 // 商品操作（删）
export const delectProductDetail = function (parm) {
    let url = "/v1/apply/productOperation";
    return new Axios(url, parm).apiCall();
}
export const operateAddUserByPhone = function (parm) { // 添加用户-通过手机号
    let url = "/v1/auth/addUserByPhone";
    return new Axios(url, parm).apiCall();
}
export const operateDelJinbaifu = function (parm) {
    let url = "/v1/import/delJinbaifu";
    return new Axios(url, parm).apiCall();
}
export const operateUpdateGoods = function (parm) {
  let url = "/v1/goods/updateGoods";
  return new Axios(url, parm).apiCall();
}
export const operatePrivilege = function (parm) { // 用户权限操作-通过用户ID
    let url = "/v1/auth/operatePrivilege";
    return new Axios(url, parm).apiCall();
}
export const operateAddProvIder = function (parm) { // 2.11供应商新增
    let url = "/v1/headquarter/addProvider";
    return new Axios(url, parm).apiCall();
}
export const operateUpdateCompany = function (parm) { // 公司修改
    let url = "/v1/order/updateCompany";
    return new Axios(url, parm).apiCall();
}
export const operateOperateApplyByUserId = function (parm) { // 应用授权操作
  let url = "/v1/auth/operateApplyByUserId";
  return new Axios(url, parm).apiCall();
}
export const operateUserSetting = function (parm) { // 用户设置
  let url = "/v1/public/userSetting"
  return new Axios(url, parm).apiCall();
}
/* ----------新建单据------- */
export const operateCreateRKReceipt = function (parm) { // 单据操作-新建-入库
    let url = "/v1/order/createRKReceipt";
    return new Axios(url, parm).apiCall();
}
export const operateCreateTKReceipt = function (parm) { // 单据操作-新建-退库
    let url = "/v1/order/createTKReceipt";
    return new Axios(url, parm).apiCall();
}
export const operateCreateDKReceipt = function (parm) { // 5.24单据操作-新建-调库
    let url = "/v1/order/createDKReceipt";
    return new Axios(url, parm).apiCall();
}
export const operateCreateFHReceipt = function (parm) { // 5.25单据操作-新建-发货
    let url = "/v1/order/createFHReceipt";
    return new Axios(url, parm).apiCall();
}
export const operateCreateXGReceipt = function (parm) { // 5.25单据操作-新建-发货
    let url = "/v1/order/createXGReceipt";
    return new Axios(url, parm).apiCall();
}
export const operateCreateTHReceipt = function (parm) { // 5.26单据操作-新建-退货
    let url = "/v1/order/createTHReceipt";
    return new Axios(url, parm).apiCall();
}
export const operateCreateDGReceipt = function (parm) { // 5.28单据操作-新建-调柜
    let url = "/v1/order/createDGReceipt";
    return new Axios(url, parm).apiCall();
}
export const operateAddProductToRKOrder = function (parm) { // 5.49单据操作-入库添加商品
    let url = "/v1/warehouse/addProductToRKOrder";
    return new Axios(url, parm).apiCall();
}
 // 5.26单据操作-新建-销售
export const operateCreateSellOrder = function (parm) {
    let url = "/v1/sell/createSellOrder";
    return new Axios(url, parm).apiCall();
}
// 5.8 单据操作（驳回审核、通过审核、撤销审核）
export const operateReceiptOperation = function (parm) {
    let url = "/v1/auth/receiptOperation";
    return new Axios(url, parm).apiCall();
}
export const operateTakeOrder = function (parm) { // 5.10单据收货
    let url = "/v1/order/takeOrder";
    return new Axios(url, parm).apiCall();
}
export const operateDeleteByOrderNumber = function (parm) { // 5.9单据删除
    let url = "/v1/order/deleteByOrderNumber";
    return new Axios(url, parm).apiCall();
}
export const operateSetBarcodeSetting = function (parm) { //7.7.条码修改
    let url = "/v1/public/setBarcodeSetting";
    return new Axios(url, parm).apiCall();
}
export const shTakeDelivery = function (parm) { // 收货
    let url = "/v1/apply/shTakeDelivery";
    return new Axios(url, parm).apiCall();
}
// 单据新增/提交审核/保存（销售除外）
export const receiptAddOrChecks = function (parm) {
    let url = "/v1/order/submitAudit";
    return new Axios(url, parm).apiCall();
}
export const operateOWhourse = function (parm) {
    let url = "/v1/warehouse/operateOWhourse";
    return new Axios(url, parm).apiCall();
}
export const updateGoods = function (parm) { // 商品修改
  let url = "/v1/goods/updateGoods";
  return new Axios(url, parm).apiCall();
}
export const deleteUpdateGoods = function (parm) {
    let url = "/v1/goods/deleteUpdateGoods";
    return new Axios(url, parm).apiCall();
}
/* 销售 */
export const operateOrderPay = function (parm) { // 单据操作-收银
    let url = "/v1/sell/orderPay";
    return new Axios(url, parm).apiCall();
}
// 5.9单据删除(旧)
export const operateDelReceipt = function (parm) {
    let url = "/v1/receipt/delReceipt";
    return new Axios(url, parm).apiCall();
}
// 5.9 删除单据
export const deleteByOrderNumber = function (parm) {
    let url = "/v1/order/deleteByOrderNumber";
    return new Axios(url, parm).apiCall();
}
// 2.14产品类型、成色名称、宝石名称、首饰名称数据迁移
export const seekDataMigration = function (parm) {
    let url = "/v1/public/dataMigration";
    return new Axios(url, parm).apiCall();
}
// 5.29单据操作/修改
export const operateHandleXGReceipt = function (parm) {
    let url = "/v1/order/handleXGReceipt";
    return new Axios(url, parm).apiCall();
}
// 5.30 提交审核
export const operateSubmitAudit = function (parm) {
    let url = "/v1/order/submitAudit";
    return new Axios(url, parm).apiCall();
}
// 新增销售（扫码）
export const operateAddProductToOrder = function (parm) {
    let url = "/v1/sell/addProductToOrder";
    return new Axios(url, parm).apiCall();
}
// 单据操作-新增退换商品-通过商品条码号
export const operateAddBackProductToOrder = function (parm) {
    let url = "/v1/sell/addBackProductToOrder";
    return new Axios(url, parm).apiCall();
}
// 5.34单据操作-新增退换/回收商品-通过手工输入
export const operateAddBackBuyProductToOrder = function (parm) {
    let url = "/v1/sell/addBackBuyProductToOrder";
    return new Axios(url, parm).apiCall();
}
// 6.50 商品修改-销售
export const operateUpdateSell = function (parm) {
    let url = "/v1/auth/updateSell"
    return new Axios(url, parm).apiCall();
}
// 5.31单据操作-增加/删除商品-通过商品条码号
export const operateProductList = function (parm) {
    let url = "/v1/order/productList";
    return new Axios(url, parm).apiCall();
}
// 5.49单据备注操作
export const operateRemarkOperation = function (parm) {
    let url = "/v1/order/remarkOperation";
    return new Axios(url, parm).apiCall();
}
// 单据操作-增加商品-通过单据号
export const operateCreatReceipt = function (parm) {
    let url = "/v1/order/creatReceipt";
    return new Axios(url, parm).apiCall();
}
// 4.13查找用户 – 所有系统用户
export const operateAllFriend = function (parm) {
  let url = "/v1/auth/lookupAllFriends";
  return new Axios(url, parm).apiCall();
}
//4.6修改密码
export const operateRevisePaw = function (parm) {
  let url = "/v1/public/revisePaw";
  return new Axios(url, parm).apiCall();
}
//13.2文件上传
export const upLoadFile = function (parm) {
  let url = "/v1/public/uploadFileURL";
  return new Axios(url, parm).apiCall();
}
//13.4获取COS签名
export const getSignUrl = function (parm) {
  let url = "/v1/apply/getCOSSign";
  return new Axios(url, parm).apiCall();
}
// 店铺-修改
export const updateShop = function (parm) {
  let url = "/v1/order/updateShop";
  return new Axios(url, parm).apiCall();
}
//6.32金价编辑
export const modifyGoldPrice = function (parm) {
  let url = "/v1/configurationSetting/modifyGoldPrice";
  return new Axios(url, parm).apiCall();
}
//6.35折扣编辑
export const modifyDiscount = function (parm) {
  let url = "/v1/configurationSetting/modifyDiscount";
  return new Axios(url, parm).apiCall();
}
//6.41班组操作
export const modifyClassGroup = function (parm) {
  let url = "/v1/configurationSetting/modifyClassGroup";
  return new Axios(url, parm).apiCall();
}
//2.8库位新增
export const addRepository = function (parm) {
  let url = "/v1/headquarter/addRepository";
  return new Axios(url, parm).apiCall();
}
//6.62库位修改
export const operateStockInfoUpdate = function (parm) {
  let url = "/v1/public/stockInfoUpdate";
  return new Axios(url, parm).apiCall();
}
//6.1	供应商修改
export const operateSupplierInfoUpdate = function (parm) {
  let url = "/v1/public/supplierInfoUpdate";
  return new Axios(url, parm).apiCall();
}
//6.28商品属性修改
export const operateUpdateProductClasses = function (parm) {
  let url = "/v1/headquarter/updateProductClasses";
  return new Axios(url, parm).apiCall();
}
//6.29商品属性新增
export const operateAddProductProperty = function (parm) {
  let url = "/v1/headquarter/addProductProperty";
  return new Axios(url, parm).apiCall();
}
//6.30商品属性删除
export const operateDelProductProperty = function (parm) {
  let url = "/v1/headquarter/delProductProperty";
  return new Axios(url, parm).apiCall();
}
//6.20商品类型修改
export const operateUpdateProductType = function (parm) {
  let url = "/v1/goods/updateProductType";
  return new Axios(url, parm).apiCall();
}
//6.21商品类型删除
export const operateDelProductTypeByList = function (parm) {
  let url = "/v1/goods/delProductTypeByList";
  return new Axios(url, parm).apiCall();
}
// 6.24商品大小类新增/修改
export const operateProductClasses = function (parm) {
  let url = "/v1/headquarter/operateProductClasses";
  return new Axios(url, parm).apiCall();
}
// 6.22商品类型排序
export const operateProductTypeOrderBy = function (parm) {
  let url = "/v1/goods/productTypeOrderBy";
  return new Axios(url, parm).apiCall();
}
// 6.26商品大小类排序
export const operateProductClassesOrderBy = function (parm) {
  let url = "/v1/headquarter/productClassesOrderBy";
  return new Axios(url, parm).apiCall();
}
// 2.9库位操作
export const operateDelRepository = function (parm) {
  let url = "/v1/headquarter/delRepository";
  return new Axios(url, parm).apiCall();
}
// 6.25商品大小类删除
export const operateDelProductClasses = function (parm) {
  let url = "/v1/headquarter/delProductClasses";
  return new Axios(url, parm).apiCall();
}
// 6.32证书新增/修改
export const operateAddHCertificateList = function (parm) {
  let url = "/v1/headquarter/addHCertificateList";
  return new Axios(url, parm).apiCall();
}
// 6.33证书操作
export const operateDelHCertificate = function (parm) {
  let url = "/v1/headquarter/delHCertificate";
  return new Axios(url, parm).apiCall();
}
// 4.14用户修改
export const operateUpdateUser = function (parm) {
  let url = "/v1/public/updateUser";
  return new Axios(url, parm).apiCall();
}
// 11.10 入库报表
export const seekEntryStorage = function (parm) {
  let url = "/v1/reports/getReportsRK";
  return new Axios(url, parm).apiCall();
}
// 11.12 退库报表
export const seekOutStorageReport = function (parm) {
  let url = "/v1/reports/getReportsTK";
  return new Axios(url, parm).apiCall();
}
// 11.17 修改报表
export const seekGetReportsXG = function (parm) {
  let url = "/v1/reports/getReportsXG";
  return new Axios(url, parm).apiCall();
}
// 11.13 发货报表
export const seekSendReport = function (parm) {
  let url = "/v1/reports/getReportsFH";
  return new Axios(url, parm).apiCall();
}
// 11.14 调库报表
export const seekDKReport = function (parm) {
  let url = "/v1/reports/getReportsDK";
  return new Axios(url, parm).apiCall();
}
// 11.15 退货报表
export const seekOutShopReport = function (parm) {
  let url = "/v1/reports/getReportsTH";
  return new Axios(url, parm).apiCall();
}
// 11.16 调柜报表
export const seekDGReport = function (parm) {
  let url = "/v1/reports/getReportsDG";
  return new Axios(url, parm).apiCall();
}

// 11.17 销售报表
export const seekSellList = function (parm) {
  let url = "/v1/reports/getReportsSellList";
  return new Axios(url, parm).apiCall();
}
//11.18WEB报表-销售-回购列表
export const seekBuyBackList = function (parm) {
  let url = "/v1/reports/getReportsBuybackList";
  return new Axios(url, parm).apiCall();
}
//11.19WEB报表-销售-收银列表
export const seekReportsCashList = function (parm) {
  let url = "/v1/reports/getReportsCashList";
  return new Axios(url, parm).apiCall();
}
// 11.20 入库单据打印
export const seekGetStorageData = function (parm) {
  let url = "/v1/reports/getReportsPrintRK";
  return new Axios(url, parm).apiCall();
}
// 11.22退库
export const seekOutStorageData = function (parm) {
  let url = "/v1/reports/getReportsPrintTK";
  return new Axios(url, parm).apiCall();
}
// 11.23 发货
export const seekSendShopData = function (parm) {
  let url = "/v1/reports/getReportsPrintFH";
  return new Axios(url, parm).apiCall();
}
// 2.12供应商操作
export const operateDelProvIder = function (parm) {
  let url = "/v1/headquarter/delProvider";
  return new Axios(url, parm).apiCall();
}
// 11.24 调库
export const seekTransferStorageData = function (parm) {
  let url = "/v1/reports/getReportsPrintDK";
  return new Axios(url, parm).apiCall();
}
// 11.25 退货
export const seekOutShopData = function (parm) {
  let url = "/v1/reports/getReportsPrintTH";
  return new Axios(url, parm).apiCall();
}

// 11.26调柜

export const seekTransDGData = function (parm) {
  let url = "/v1/reports/getReportsPrintDG";
  return new Axios(url, parm).apiCall();
}
// 11.27销售
export const seekSellData = function (parm) {
  let url = "/v1/reports/getReportsPrintSell";
  return new Axios(url, parm).apiCall();
}
// 7.5.切换公司
export const operateSwitchCompany = function (parm) {
  let url = "/v1/public/switchCompany";
  return new Axios(url, parm).apiCall();
}
export const operateGenerateOrder = function (parm) { // 生成定单
  let url = "/v1/pay/generateOrder";
  return new Axios(url, parm).apiCall();
}
export const operateShopBuyPay = function (parm) { // 购买店铺支付
  let url = "/v1/pay/shopBuyPay";
  return new Axios(url, parm).apiCall();
}
//12.28 报表首页-进库
export const seekReportsHomeJK = function (parm) {
  let option = Object.assign({ 
  	type: '1'
  }, parm)
  let url = "/v1/reports/getWebHomeJK";
  return new Axios(url, parm).apiCall();
}

//12.29 报表首页-销售
export const seekReportsHomeXS = function (parm) {
  let option = Object.assign({ 
  	type: '1'
  }, parm)
  let url = "/v1/reports/getWebHomeXS";
  return new Axios(url, parm).apiCall();
}

//12.30 报表首页-库存
export const seekReportsHomeKC = function (parm) {
  let url = "/v1/reports/getWebHomeKC";
  return new Axios(url, parm).apiCall();
}

//12.31 报表首页-销售统计
export const seekReportsHomePage = function (parm) {
  let url = "/v1/reports/getWebHomeXSStic";
  return new Axios(url, parm).apiCall();
}

export const operateFreeCreateShop = function (parm) { // 购买店铺免费
  let url = "/v1/pay/freeCreateShop";
  return new Axios(url, parm).apiCall();
}
export const operateNoticeCreate = function (parm) { // 10.14公告创建
  let url = "/v1/notice/noticeCreate";
  return new Axios(url, parm).apiCall();
}
export const operateNoticeOperation = function (parm) { // 10.15公告操作
  let url = "/v1/notice/noticeOperation";
  return new Axios(url, parm).apiCall();
}
export const operateNoticeUpdate = function (parm) { // 10.16公告修改
  let url = "/v1/notice/noticeUpdate";
  return new Axios(url, parm).apiCall();
}
export const operateDelMessage = function (parm) { // 18.4消息删除
  let url = "/v1/public/delMessage";
  return new Axios(url, parm).apiCall();
}
export const operateFollowCreateSign = function (parm) { // 创建标签
  let url = "/v1/member/followCreateSign";
  return new Axios(url, parm).apiCall();
}
export const operateMemberCreate = function (parm) { // 创建会员
  let url = "/v1/member/memberCreate";
  return new Axios(url, parm).apiCall();
}
export const operateFollowComplete = function (parm) { // 跟进完成
  let url = "/v1/member/followComplete";
  return new Axios(url, parm).apiCall();
}
export const operateFollowTimingOperation = function (parm) { // 定时跟进操作
  let url = "/v1/member/followTimingOperation";
  return new Axios(url, parm).apiCall();
}
export const operateFollowTimingCreate = function (parm) { // 创建定时跟进
  let url = "/v1/member/followTimingCreate";
  return new Axios(url, parm).apiCall();
}
export const operateFollowOperation = function (parm) { // 跟进操作
  let url = "/v1/member/followOperation";
  return new Axios(url, parm).apiCall();
}
export const operateMemberSalesList = function (parm) { // 会员关联销售单
  let url = "/v1/member/memberSalesList";
  return new Axios(url, parm).apiCall();
}
export const operateFollowCreate = function (parm) { // 创建跟进
  let url = "/v1/member/followCreate";
  return new Axios(url, parm).apiCall();
}
export const operateMemberUpdateBy = function (parm) { // 会员信息修改
  let url = "/v1/member/memberUpdateBy";
  return new Axios(url, parm).apiCall();
}
export const operateMemberOperation = function (parm) { // 会员操作
  let url = "/v1/member/memberOperation";
  return new Axios(url, parm).apiCall();
}
export const operateFollowUpdateBy = function (parm) { // 跟进修改
  let url = "/v1/member/followUpdateBy";
  return new Axios(url, parm).apiCall();
}
export const operateOpIntention = function (parm) { // 意向客户操作
  let url = "/v1/facepass/opIntention";
  return new Axios(url, parm).apiCall();
}
export const operateRelateFaceMember = function (parm) { // 访客关联会员
  let url = "/v1/facepass/relateFaceMember";
  return new Axios(url, parm).apiCall();
}
export const operateUpdateVisitInfo = function (parm) { // 更新顾客信息
  let url = "/v1/facepass/updateVisitInfo";
  return new Axios(url, parm).apiCall();
}
export const operateUpdateFaceUserImage = function (parm) { // 添加更新人脸图片
  let url = "/v1/facepass/updateFaceUserImage";
  return new Axios(url, parm).apiCall();
}
export const operateProductBatchUpdate = function (parm) { // 商品批量修改
  let url = "/v1/goods/productBatchUpdate";
  return new Axios(url, parm).apiCall();
}
export const operateProductTypeDragSord = function (parm) { // 产品类别拖动
  let url = "/v1/headquarter/productTypeDragSord";
  return new Axios(url, parm).apiCall();
}
export const operateSettingShopSeeById = function (parm) { // 设置可查看店铺
  let url = "/v1/auth/settingShopSeeById";
  return new Axios(url, parm).apiCall();
}
export const operateMallsShopImageOperation = function(parm) { // 商城店铺图片操作
    let url = "/v1/weChat/mallsShopImageOperation";
    return new Axios(url, parm).apiCall();
}
export const operateMallsShopInfoUpdate = function(parm) { // 商城店铺信息更新
    let url = "/v1/weChat/mallsShopInfoUpdate";
    return new Axios(url, parm).apiCall();
}
export const operateMallsOtherShopAdd = function(parm) { // 商城分店新增
    let url = "/v1/weChat/mallsOtherShopAdd";
    return new Axios(url, parm).apiCall();
}
export const operateMallsOtherShopOperation = function(parm) { // 商城分店操作
    let url = "/v1/weChat/mallsOtherShopOperation";
    return new Axios(url, parm).apiCall();
}
export const operateMallsOtherShopUpdate = function(parm) { // 商城分店信息更新
    let url = "/v1/weChat/mallsOtherShopUpdate";
    return new Axios(url, parm).apiCall();
}
export const operateServiceOperation = function(parm) { // 服务类型维护
    let url = "/v1/public/serviceOperation";
    return new Axios(url, parm).apiCall();
}
export const operateCreateFWReceipt = function(parm) { // 单据操作-新建-服务
    let url = "/v1/public/createFWReceipt";
    return new Axios(url, parm).apiCall();
}
export const operateAddAfterProduct = function(parm) { // 6.74添加售后单商品
    let url = "/v1/public/addAfterProduct";
    return new Axios(url, parm).apiCall();
}
export const operateUpdateServiceByNum = function(parm) { // 服务单据修改
    let url = "/v1/public/updateServiceByNum";
    return new Axios(url, parm).apiCall();
}
export const operateDelOrderByFW = function(parm) { // 删除服务单据
    let url = "/v1/public/delOrderByFW";
    return new Axios(url, parm).apiCall();
}
export const addOrdelInspect = function(parm) { // 添加或删除监察者
    let url = "/v1/auth/inspectoRoleOperation";
    return new Axios(url, parm).apiCall();
}
export const lookStore = function(parm) { // 查看店铺列表
    let url = "/v1/auth/getShopRoleList";
    return new Axios(url, parm).apiCall();
}
export const setShopSee = function(parm) {
    let url = "/v1/auth/settingShopSeeById";
    return new Axios(url, parm).apiCall();
}
export const operateLogout = function(parm) {
    let url = "/v1/auth/logout";
    return new Axios(url, parm).apiCall();
}
export const operateAddClassesRemark = function(parm) {
    let url = "/v1/headquarter/addClassesRemark";
    return new Axios(url, parm).apiCall();
}
export const operateAddMember = function(parm) {
    let url = "/v1/member/addMember";
    return new Axios(url, parm).apiCall();
}
export const operateDeleteMemberTemplaet = function(parm) {
    let url = "/v1/member/deleteMemberTemplaet";
    return new Axios(url, parm).apiCall();
}
//新增管理会员模板
export const operateAddMemberTemplaet = function(parm) {
    let url = "/v1/member/addMemberTemplaet";
    return new Axios(url, parm).apiCall();
}
//修改等级或删除
export const operateUpdateGrade = function (parm) {
  let URL = "/v1/groupTemplate/updateGrade";
  return apiCall(parm, URL);
}
// 添加会员等级
export const operateAddGrade = function (parm) {
  let URL = "/v1/groupTemplate/addGrade";
  return apiCall(parm, URL);
}
export const operateMemberCreatee = function (parm) {
  let URL = "/v1/groupTemplate/memberCreate";
  return apiCall(parm, URL);
}
