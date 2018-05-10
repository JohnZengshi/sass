import apiCall from './ApiCall.js'
 // 商品操作（删）
export const delectProductDetail = function (parm) {
    let URL = "/v1/apply/productOperation";
    return apiCall(parm, URL);
}
export const operateAddUserByPhone = function (parm) { // 添加用户-通过手机号
    let URL = "/v1/auth/addUserByPhone";
    return apiCall(parm, URL);
}
export const operateDelJinbaifu = function (parm) {
    let URL = "/v1/import/delJinbaifu";
    return apiCall(parm, URL);
}
export const operateUpdateGoods = function (parm) {
    let URL = "/v1/goods/updateGoods";
    return apiCall(parm, URL);
}
export const operatePrivilege = function (parm) { // 用户权限操作-通过用户ID
    let URL = "/v1/auth/operatePrivilege";
    return apiCall(parm, URL);
}
export const operateAddProvIder = function (parm) { // 2.11供应商新增
    let URL = "/v1/headquarter/addProvider";
    return apiCall(parm, URL);
}
export const operateUpdateCompany = function (parm) { // 公司修改
    let URL = "/v1/order/updateCompany";
    return apiCall(parm, URL);
}
export const operateOperateApplyByUserId = function (parm) { // 应用授权操作
  let URL = "/v1/auth/operateApplyByUserId";
  return apiCall(parm, URL);
}
export const operateUserSetting = function (parm) { // 用户设置
  let URL = "/v1/public/userSetting"
  return apiCall(parm, URL)
}
/* ----------新建单据------- */
export const operateCreateRKReceipt = function (parm) { // 单据操作-新建-入库
    let URL = "/v1/order/createRKReceipt";
    return apiCall(parm, URL);
}
export const operateCreateTKReceipt = function (parm) { // 单据操作-新建-退库
    let URL = "/v1/order/createTKReceipt";
    return apiCall(parm, URL);
}
export const operateCreateDKReceipt = function (parm) { // 5.24单据操作-新建-调库
    let URL = "/v1/order/createDKReceipt";
    return apiCall(parm, URL);
}
export const operateCreateFHReceipt = function (parm) { // 5.25单据操作-新建-发货
    let URL = "/v1/order/createFHReceipt";
    return apiCall(parm, URL);
}
export const operateCreateXGReceipt = function (parm) { // 5.25单据操作-新建-发货
    let URL = "/v1/order/createXGReceipt";
    return apiCall(parm, URL);
}
export const operateCreateTHReceipt = function (parm) { // 5.26单据操作-新建-退货
    let URL = "/v1/order/createTHReceipt";
    return apiCall(parm, URL);
}
export const operateCreateDGReceipt = function (parm) { // 5.28单据操作-新建-调柜
    let URL = "/v1/order/createDGReceipt";
    return apiCall(parm, URL);
}
export const operateAddProductToRKOrder = function (parm) { // 5.49单据操作-入库添加商品
    let URL = "/v1/warehouse/addProductToRKOrder";
    return apiCall(parm, URL);
}
 // 5.26单据操作-新建-销售
export const operateCreateSellOrder = function (parm) {
    let URL = "/v1/sell/createSellOrder";
    return apiCall(parm, URL);
}
// 5.8 单据操作（驳回审核、通过审核、撤销审核）
export const operateReceiptOperation = function (parm) {
    let URL = "/v1/auth/receiptOperation";
    return apiCall(parm, URL)
}
export const operateTakeOrder = function (parm) { // 5.10单据收货
    let URL = "/v1/order/takeOrder";
    return apiCall(parm, URL)
}
export const operateDeleteByOrderNumber = function (parm) { // 5.9单据删除
    let URL = "/v1/order/deleteByOrderNumber";
    return apiCall(parm, URL);
}
export const operateSetBarcodeSetting = function (parm) { //7.7.条码修改
    let URL = "/v1/public/setBarcodeSetting";
    return apiCall(parm, URL);
}
export const shTakeDelivery = function (parm) { // 收货
    let URL = "/v1/apply/shTakeDelivery";
    return apiCall(parm, URL);
}
// 单据新增/提交审核/保存（销售除外）
export const receiptAddOrChecks = function (parm) {
    let URL = "/v1/order/submitAudit";
    return apiCall(parm, URL);
}
export const operateOWhourse = function (parm) {
    let URL = "/v1/warehouse/operateOWhourse";
    return apiCall(parm, URL);
}
export const updateGoods = function (parm) { // 商品修改
    let URL = "/v1/goods/updateGoods";
    return apiCall(parm, URL);
}
export const deleteUpdateGoods = function (parm) {
    let URL = "/v1/goods/deleteUpdateGoods";
    return apiCall(parm, URL);
}
/* 销售 */
export const operateOrderPay = function (parm) { // 单据操作-收银
    let URL = "/v1/sell/orderPay";
    return apiCall(parm, URL)
}
// 5.9单据删除(旧)
export const operateDelReceipt = function (parm) {
    let URL = "/v1/receipt/delReceipt";
    return apiCall(parm, URL);
}
// 5.9 删除单据
export const deleteByOrderNumber = function (parm) {
    let URL = "/v1/order/deleteByOrderNumber";
    return apiCall(parm, URL);
}
// 2.14产品类型、成色名称、宝石名称、首饰名称数据迁移
export const seekDataMigration = function (parm) {
    let URL = "/v1/public/dataMigration";
    return apiCall(parm, URL);
}
// 5.29单据操作/修改
export const operateHandleXGReceipt = function (parm) {
    let URL = "/v1/order/handleXGReceipt";
    return apiCall(parm, URL);
}
// 5.30 提交审核
export const operateSubmitAudit = function (parm) {
    let URL = "/v1/order/submitAudit";
    return apiCall(parm, URL);
}
// 新增销售（扫码）
export const operateAddProductToOrder = function (parm) {
    let URL = "/v1/sell/addProductToOrder";
    return apiCall(parm, URL);
}
// 单据操作-新增退换商品-通过商品条码号
export const operateAddBackProductToOrder = function (parm) {
    let URL = "/v1/sell/addBackProductToOrder";
    return apiCall(parm, URL);
}
// 5.34单据操作-新增退换/回收商品-通过手工输入
export const operateAddBackBuyProductToOrder = function (parm) {
    let URL = "/v1/sell/addBackBuyProductToOrder";
    return apiCall(parm, URL);
}
// 6.50 商品修改-销售
export const operateUpdateSell = function (parm) {
    let URL = "/v1/auth/updateSell"
    return apiCall(parm, URL);
}
// 5.31单据操作-增加/删除商品-通过商品条码号
export const operateProductList = function (parm) {
    let URL = "/v1/order/productList";
    return apiCall(parm, URL);
}
// 5.49单据备注操作
export const operateRemarkOperation = function (parm) {
    let URL = "/v1/order/remarkOperation";
    return apiCall(parm, URL);
}
// 单据操作-增加商品-通过单据号
export const operateCreatReceipt = function (parm) {
    let URL = "/v1/order/creatReceipt";
    return apiCall(parm, URL);
}
// 4.13查找用户 – 所有系统用户
export const operateAllFriend = function (parm) {
  let URL = "/v1/auth/lookupAllFriends";
  return apiCall(parm, URL);
}
//4.6修改密码
export const operateRevisePaw = function (parm) {
  let URL = "/v1/public/revisePaw";
  return apiCall(parm, URL);
}
//13.2文件上传
export const upLoadFile = function (parm) {
  let URL = "/v1/public/uploadFileURL";
  return apiCall(parm, URL);
}
//13.4获取COS签名
export const getSignUrl = function (parm) {
  let URL = "/v1/apply/getCOSSign";
  return apiCall(parm, URL);
}
// 店铺-修改
export const updateShop = function (parm) {
  let URL = "/v1/order/updateShop";
  return apiCall(parm, URL);
}
//6.32金价编辑
export const modifyGoldPrice = function (parm) {
  let URL = "/v1/configurationSetting/modifyGoldPrice";
  return apiCall(parm, URL);
}
//6.35折扣编辑
export const modifyDiscount = function (parm) {
  let URL = "/v1/configurationSetting/modifyDiscount";
  return apiCall(parm, URL);
}
//6.41班组操作
export const modifyClassGroup = function (parm) {
  let URL = "/v1/configurationSetting/modifyClassGroup";
  return apiCall(parm, URL);
}
//2.8库位新增
export const addRepository = function (parm) {
  let URL = "/v1/headquarter/addRepository";
  return apiCall(parm, URL);
}
//6.62库位修改
export const operateStockInfoUpdate = function (parm) {
  let URL = "/v1/public/stockInfoUpdate";
  return apiCall(parm, URL);
}
//6.1	供应商修改
export const operateSupplierInfoUpdate = function (parm) {
  let URL = "/v1/public/supplierInfoUpdate";
  return apiCall(parm, URL);
}
//6.28商品属性修改
export const operateUpdateProductClasses = function (parm) {
  let URL = "/v1/headquarter/updateProductClasses";
  return apiCall(parm, URL);
}
//6.29商品属性新增
export const operateAddProductProperty = function (parm) {
  let URL = "/v1/headquarter/addProductProperty";
  return apiCall(parm, URL);
}
//6.30商品属性删除
export const operateDelProductProperty = function (parm) {
  let URL = "/v1/headquarter/delProductProperty";
  return apiCall(parm, URL);
}
//6.20商品类型修改
export const operateUpdateProductType = function (parm) {
  let URL = "/v1/goods/updateProductType";
  return apiCall(parm, URL);
}
//6.21商品类型删除
export const operateDelProductTypeByList = function (parm) {
  let URL = "/v1/goods/delProductTypeByList";
  return apiCall(parm, URL);
}
// 6.24商品大小类新增/修改
export const operateProductClasses = function (parm) {
  let URL = "/v1/headquarter/operateProductClasses";
  return apiCall(parm, URL);
}
// 6.22商品类型排序
export const operateProductTypeOrderBy = function (parm) {
  let URL = "/v1/goods/productTypeOrderBy";
  return apiCall(parm, URL);
}
// 6.26商品大小类排序
export const operateProductClassesOrderBy = function (parm) {
  let URL = "/v1/headquarter/productClassesOrderBy";
  return apiCall(parm, URL);
}
// 2.9库位操作
export const operateDelRepository = function (parm) {
  let URL = "/v1/headquarter/delRepository";
  return apiCall(parm, URL);
}
// 6.25商品大小类删除
export const operateDelProductClasses = function (parm) {
  let URL = "/v1/headquarter/delProductClasses";
  return apiCall(parm, URL);
}
// 6.32证书新增/修改
export const operateAddHCertificateList = function (parm) {
  let URL = "/v1/headquarter/addHCertificateList";
  return apiCall(parm, URL);
}
// 6.33证书操作
export const operateDelHCertificate = function (parm) {
  let URL = "/v1/headquarter/delHCertificate";
  return apiCall(parm, URL);
}
// 4.14用户修改
export const operateUpdateUser = function (parm) {
  let URL = "/v1/public/updateUser";
  return apiCall(parm, URL);
}
// 11.10 入库报表
export const seekEntryStorage = function (parm) {
  let URL = "/v1/reports/getReportsRK";
  return apiCall(parm, URL);
}
// 11.12 退库报表
export const seekOutStorageReport = function (parm) {
  let URL = "/v1/reports/getReportsTK";
  return apiCall(parm, URL);
}
// 11.17 修改报表
export const seekGetReportsXG = function (parm) {
  let URL = "/v1/reports/getReportsXG";
  return apiCall(parm, URL);
}
// 11.13 发货报表
export const seekSendReport = function (parm) {
  let URL = "/v1/reports/getReportsFH";
  return apiCall(parm, URL);
}
// 11.14 调库报表
export const seekDKReport = function (parm) {
  let URL = "/v1/reports/getReportsDK";
  return apiCall(parm, URL);
}
// 11.15 退货报表
export const seekOutShopReport = function (parm) {
  let URL = "/v1/reports/getReportsTH";
  return apiCall(parm, URL);
}
// 11.16 调柜报表
export const seekDGReport = function (parm) {
  let URL = "/v1/reports/getReportsDG";
  return apiCall(parm, URL);
}

// 11.17 销售报表
export const seekSellList = function (parm) {
  let URL = "/v1/reports/getReportsSellList";
  return apiCall(parm, URL);
}
//11.18WEB报表-销售-回购列表
export const seekBuyBackList = function (parm) {
  let URL = "/v1/reports/getReportsBuybackList";
  return apiCall(parm, URL);
}
//11.19WEB报表-销售-收银列表
export const seekReportsCashList = function (parm) {
  let URL = "/v1/reports/getReportsCashList";
  return apiCall(parm, URL);
}
// 11.20 入库单据打印
export const seekGetStorageData = function (parm) {
  let URL = "/v1/reports/getReportsPrintRK";
  return apiCall(parm, URL);
}
// 11.22退库
export const seekOutStorageData = function (parm) {
  let URL = "/v1/reports/getReportsPrintTK";
  return apiCall(parm, URL);
}
// 11.23 发货
export const seekSendShopData = function (parm) {
  let URL = "/v1/reports/getReportsPrintFH";
  return apiCall(parm, URL);
}
// 2.12供应商操作
export const operateDelProvIder = function (parm) {
  let URL = "/v1/headquarter/delProvider";
  return apiCall(parm, URL);
}
// 11.24 调库
export const seekTransferStorageData = function (parm) {
  let URL = "/v1/reports/getReportsPrintDK";
  return apiCall(parm, URL);
}
// 11.25 退货
export const seekOutShopData = function (parm) {
  let URL = "/v1/reports/getReportsPrintTH";
  return apiCall(parm, URL);
}

// 11.26调柜

export const seekTransDGData = function (parm) {
  let URL = "/v1/reports/getReportsPrintDG";
  return apiCall(parm, URL);
}
// 11.27销售
export const seekSellData = function (parm) {
  let URL = "/v1/reports/getReportsPrintSell";
  return apiCall(parm, URL);
}
// 7.5.切换公司
export const operateSwitchCompany = function (parm) {
  let URL = "/v1/public/switchCompany";
  return apiCall(parm, URL);
}
export const operateGenerateOrder = function (parm) { // 生成定单
  let URL = "/v1/pay/generateOrder";
  return apiCall(parm, URL);
}
export const operateShopBuyPay = function (parm) { // 购买店铺支付
  let URL = "/v1/pay/shopBuyPay";
  return apiCall(parm, URL);
}
//12.28 报表首页-进库
export const seekReportsHomeJK = function (parm) {
  let option = Object.assign({ 
  	type: '1'
  }, parm)
  let URL = "/v1/reports/getWebHomeJK";
  return apiCall(option, URL);
}

//12.29 报表首页-销售
export const seekReportsHomeXS = function (parm) {
  let option = Object.assign({ 
  	type: '1'
  }, parm)
  let URL = "/v1/reports/getWebHomeXS";
  return apiCall(option, URL);
}

//12.30 报表首页-库存
export const seekReportsHomeKC = function (parm) {
  let URL = "/v1/reports/getWebHomeKC";
  return apiCall(parm, URL);
}

//12.31 报表首页-销售统计
export const seekReportsHomePage = function (parm) {
  let URL = "/v1/reports/getWebHomeXSStic";
  return apiCall(parm, URL);
}

export const operateFreeCreateShop = function (parm) { // 购买店铺免费
  let URL = "/v1/pay/freeCreateShop";
  return apiCall(parm, URL);
}
export const operateNoticeCreate = function (parm) { // 10.14公告创建
  let URL = "/v1/notice/noticeCreate";
  return apiCall(parm, URL);
}
export const operateNoticeOperation = function (parm) { // 10.15公告操作
  let URL = "/v1/notice/noticeOperation";
  return apiCall(parm, URL);
}
export const operateNoticeUpdate = function (parm) { // 10.16公告修改
  let URL = "/v1/notice/noticeUpdate";
  return apiCall(parm, URL);
}
export const operateDelMessage = function (parm) { // 18.4消息删除
  let URL = "/v1/public/delMessage";
  return apiCall(parm, URL);
}
export const operateFollowCreateSign = function (parm) { // 创建标签
  let URL = "/v1/member/followCreateSign";
  return apiCall(parm, URL);
}
export const operateMemberCreate = function (parm) { // 创建会员
  let URL = "/v1/member/memberCreate";
  return apiCall(parm, URL);
}
export const operateFollowComplete = function (parm) { // 跟进完成
  let URL = "/v1/member/followComplete";
  return apiCall(parm, URL);
}
export const operateFollowTimingOperation = function (parm) { // 定时跟进操作
  let URL = "/v1/member/followTimingOperation";
  return apiCall(parm, URL);
}
export const operateFollowTimingCreate = function (parm) { // 创建定时跟进
  let URL = "/v1/member/followTimingCreate";
  return apiCall(parm, URL);
}
export const operateFollowOperation = function (parm) { // 跟进操作
  let URL = "/v1/member/followOperation";
  return apiCall(parm, URL);
}
export const operateMemberSalesList = function (parm) { // 会员关联销售单
  let URL = "/v1/member/memberSalesList";
  return apiCall(parm, URL);
}
export const operateFollowCreate = function (parm) { // 创建跟进
  let URL = "/v1/member/followCreate";
  return apiCall(parm, URL);
}
export const operateMemberUpdateBy = function (parm) { // 会员信息修改
  let URL = "/v1/member/memberUpdateBy";
  return apiCall(parm, URL);
}
export const operateMemberOperation = function (parm) { // 会员操作
  let URL = "/v1/member/memberOperation";
  return apiCall(parm, URL);
}
export const operateFollowUpdateBy = function (parm) { // 跟进修改
  let URL = "/v1/member/followUpdateBy";
  return apiCall(parm, URL);
}
export const operateOpIntention = function (parm) { // 意向客户操作
  let URL = "/v1/facepass/opIntention";
  return apiCall(parm, URL);
}
export const operateRelateFaceMember = function (parm) { // 访客关联会员
  let URL = "/v1/facepass/relateFaceMember";
  return apiCall(parm, URL);
}
export const operateUpdateVisitInfo = function (parm) { // 更新顾客信息
  let URL = "/v1/facepass/updateVisitInfo";
  return apiCall(parm, URL);
}
export const operateUpdateFaceUserImage = function (parm) { // 添加更新人脸图片
  let URL = "/v1/facepass/updateFaceUserImage";
  return apiCall(parm, URL);
}
export const operateProductBatchUpdate = function (parm) { // 商品批量修改
  let URL = "/v1/goods/productBatchUpdate";
  return apiCall(parm, URL);
}
export const operateProductTypeDragSord = function (parm) { // 产品类别拖动
  let URL = "/v1/headquarter/productTypeDragSord";
  return apiCall(parm, URL);
}
export const operateSettingShopSeeById = function (parm) { // 设置可查看店铺
  let URL = "/v1/auth/settingShopSeeById";
  return apiCall(parm, URL);
}
export const operateMallsShopImageOperation = function(parm) { // 商城店铺图片操作
    let URL = "/v1/weChat/mallsShopImageOperation";
    return apiCall(parm, URL);
}
export const operateMallsShopInfoUpdate = function(parm) { // 商城店铺信息更新
    let URL = "/v1/weChat/mallsShopInfoUpdate";
    return apiCall(parm, URL);
}
export const operateMallsOtherShopAdd = function(parm) { // 商城分店新增
    let URL = "/v1/weChat/mallsOtherShopAdd";
    return apiCall(parm, URL);
}
export const operateMallsOtherShopOperation = function(parm) { // 商城分店操作
    let URL = "/v1/weChat/mallsOtherShopOperation";
    return apiCall(parm, URL);
}
export const operateMallsOtherShopUpdate = function(parm) { // 商城分店信息更新
    let URL = "/v1/weChat/mallsOtherShopUpdate";
    return apiCall(parm, URL);
}
export const operateServiceOperation = function(parm) { // 服务类型维护
    let URL = "/v1/public/serviceOperation";
    return apiCall(parm, URL);
}
export const operateCreateFWReceipt = function(parm) { // 单据操作-新建-服务
    let URL = "/v1/public/createFWReceipt";
    return apiCall(parm, URL);
}
export const operateAddAfterProduct = function(parm) { // 6.74添加售后单商品
    let URL = "/v1/public/addAfterProduct";
    return apiCall(parm, URL);
}
export const operateUpdateServiceByNum = function(parm) { // 服务单据修改
    let URL = "/v1/public/updateServiceByNum";
    return apiCall(parm, URL);
}
export const operateDelOrderByFW = function(parm) { // 删除服务单据
    let URL = "/v1/public/delOrderByFW";
    return apiCall(parm, URL);
}
export const addOrdelInspect = function(parm) { // 添加或删除监察者
    let URL = "/v1/auth/inspectoRoleOperation";
    return apiCall(parm, URL);
}
export const lookStore = function(parm) { // 查看店铺列表
    let URL = "/v1/auth/getShopRoleList";
    return apiCall(parm, URL);
}
export const setShopSee = function(parm) {
    let URL = "/v1/auth/settingShopSeeById";
    return apiCall(parm, URL);
}
