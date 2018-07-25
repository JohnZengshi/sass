// 查询接口
// import Vue from 'vue'
import apiCall from './ApiCall.js'

export const seekGetUserInfo = function (parm) { // 用户职位信息
    if (parm) {
        let URL = "/v1/auth/getUserInfo";
        return apiCall(parm, URL);
    } else {
        let options = {
            "userId": sessionStorage.getItem("id")
        }
        let URL = "/v1/auth/getUserInfo";
        return apiCall(options, URL);
    }
}
export const seekCompanyInfo = function (parm) { // 公司详情
    let options = {
        "companyId": sessionStorage.getItem("companyId")
    }
    let URL = "/v1/public/companyInfo";
    return apiCall(options, URL);
}
export const seekProductDetail = function (parm) { // 商品列表 // 带废除
    let productIdList = [];
    if (parm.productIdList) { // 商品ID列表
        for (let i of parm.productIdList) {
            let productId = {};
            productId.productId = i;
            productIdList.push(productId);
            productId = null;
        }
    }
    let data = {
        "depShopType": parm.depShopType || "",
        "objId": parm.objId || "", // 单据id
        "obj2Id": parm.obj2Id, // (type=5 and applyType=8)时为柜组id
        "page": parm.page || "1",
        // "page": "2",
        "pageSize": parm.pageSize || "30",
        "sellType": "", // 销售类型1 销售 2 退换  3 截金 4 回收 5 兑换 6 典当
        "applyType": parm.applyType || "", // 当前应用类型：1 调库 2 退库 3 修改 4 入库 5 收货 6 发货 7 退货 8 调柜（销售除外）
        "type": parm.type, // 操作类型 1 单据号 2 产品类别ID 3 商品ID列表 4 模糊查询 5 条码号
        "productIdList": productIdList || "", // 商品ID列表
        "productId": ""
    }
    let URL = "/v1/goods/getGoodsInfoList";
    return apiCall(data, URL);
}
export const seekGetCOSSign = function (parm) { // 获取cos签名
    let url = '/v1/apply/getCOSSign'
    return apiCall(parm, url);
}
export const seekNewGoodsInfoList = function (parm) { // 商品列表（入库）
    let URL = "/v1/goods/newGoodsInfoList";
    return apiCall(parm, URL);
}
export const seekMySelfWorkApplyList = function (parm) { // 获取应用
    let URL = "/v1/myWorkApply/mySelfWorkApplyList";
    return apiCall(parm, URL);
}
export const seekSettingUserRole = function (parm) {
    let URL = "/v1/public/settingUserRole";
    return apiCall(parm, URL);
}
export const seekUserRoleList = function (parm) { //4.1	用户角色列表
    let URL = "/v1/public/userRoleList";
    return apiCall(parm, URL);
}
export const seekGoodsList = function (parm) { // 商品列表
    let URL = "/v1/order/goodsList"
    return apiCall(parm, URL);
}
export const seekShowCounterList = function (parm) { // 柜组列表
    let URL = "/v1/headquarter/showCounterList"
    return apiCall(parm, URL);
}
export const createCompany = function (parm) { // 创建公司
    let URL = "/v1/public/companyCreate"
    return apiCall(parm, URL);
}
export const seekAddCounter = function (parm) { // 新增柜组
    let URL = "/v1/headquarter/addCounter"
    return apiCall(parm, URL);
}

export const seekDeleCounter = function (parm) { // 删除柜组
    let URL = "/v1/headquarter/deleCounter"
    return apiCall(parm, URL);
}

export const seekCounterInfoUpdate = function (parm) { // 柜组修改
    let URL = "/v1/public/counterInfoUpdate"
    return apiCall(parm, URL);
}
export const seekGetBarcodeSetting = function (parm) { // 7.6.条码数据
    let URL = "/v1/public/getBarcodeSetting"
    return apiCall(parm, URL);
}

export const seekDepartmentList = function (parm) { // 单据列表
    let data = {
        "orderByType": "", // 1 时间 2 库位（发货、退货等） 3 商品属性 4 制单人 5 柜组（调入、销售等） 6 部门 7 分销商 8 收货人 9 单据类型 10 销售员 11 产品类别
        "page": parm.page || "1", // 当前页
        "pageSize": parm.pageSize || "30", // 每页显示数
        "type": parm.type, // 模块类型：1 调库 2 退库 3 修改 4 入库 5 收货 6 发货 7 退货 8 调柜9 销售/回购
        "showView": parm.showView, // 显示列表：1 显示列表 2 编辑列表 3 查询结果 4 可收货列表
        "operationUnit": parm.operationUnit, // 操作单位 1 部门 2 店铺
        "operationUnitId": parm.operationUnitId, // 操作单位ID
        "queryData": {
            "startTime": parm.startTime, // 开始时间
            "endTime": parm.endTime, // 结束时间
            "orderNumber": parm.orderNumber, // 单号
            "auditorIdList": [ // 审核人ID列表
                {
                    "auditorId": ""
                }
            ],
            "classesIdList": [
                {
                    "classesId": parm.classesId || "" // 产品类别ID
                }
            ],
            "handleDeptIdList": [ // 操作部门ID列表(店铺应用用到)
                {
                    "handleDeptId": parm.handleDeptId || ""
                }
            ],
            "makeUserIdList": [ // 制单人ID列表
                {
                    "makeUserId": ""
                }
            ],
            "supplierIdList": [ // 供应商ID列表
                {
                    "supplierId": parm.supplierId || ""
                }
            ],
            "shopIdList": [ // 分销商ID列表
                {
                    "shopId": parm.shopId || ""
                }
            ],
            "warehouseIdList": [ // 库位ID（入库等）列表
                {
                    "warehouseId": parm.warehouseId || ""
                }
            ]
        }
    }
    let URL = "/v1/submodule/showSubmoduleData";
    return apiCall(data, URL);
}
export const receiptHistoryList = function (parm) { // 单据历史记录
    let data = {
        "orderId": parm // 店铺ID
    }
    let URL = "/v1/myWorkApply/receiptHistoryList"
    return apiCall(data, URL);
}
export const downloadTable = function (parm) { // 模板下载
    // let data = {
    //   "type": "2", // 1 URL 2 文件 3 视频
    //   "infoType": "1" // 1 入库模板下载地址
    // }
    let URL = "/v1/public/getResourcesUrl"
    return apiCall(parm, URL);
}
export const sellBackRandomOneAdminList = function (opt) {
    let URL = '/v1/public/sellBackRandomOneAdminList';
    return apiCall(opt, URL);//获取 联系我们  数据
}
export const seekStockData = function (parm) { // 21.7库存数据
    let URL = "/v1/stock/stockData";
    return apiCall(parm, URL);
}
export const seekStockExport = function (parm) { // 2018-05-29库存导出
    let URL = "/v1/export/exportExcelByInventory";
    return apiCall(parm, URL);
}
export const seekProductClassList = function (parm) { // 获取商品大小类的下拉列表
    let URL = "/v1/headquarter/showProductClassesList";
    return apiCall(parm, URL);
}
export const seekProductPropertyList = function (parm) { // 获取商品属性下拉列表
    let URL = "/v1/headquarter/showProductPropertyList";
    return apiCall(parm, URL);
}
export const seekCertificateList = function (parm) { // 证书下拉列表
    let data = null;
    let URL = "/v1/headquarter/showhCertificateList"
    return apiCall(data, URL)
}
export const seekRepositoryList = function (parm) { // 库位列表
    let data = null;
    let URL = "/v1/headquarter/showRepositoryList"
    return apiCall(data, URL);
}
export const getProductTypeList = function (parm) { // 商品类型列表
    let data = {
        "type": 1
    }
    let URL = "/v1/goods/getProductTypeList";
    return apiCall(data, URL);
}
export const seekShowProviderList = function (parm) { // 供应商列表
    let data = {};
    let URL = "/v1/headquarter/showProviderList";
    return apiCall(data, URL);
}
export const seekGetPrintLabelByOrder = function (parm) { //2.13获取标签数据（by 单号/条码号/关键字）
    let URL = "/v1/print/getPrintLabelByOrder";
    return apiCall(parm, URL);
}
export const getUpdateGoodsList = function (parm) { // 商品修改列表
    let URL = "/v1/goods/getUpdateGoodsList";
    return apiCall(parm, URL);
}
export const getProductStatusLogList = function (parm) { // 商品修改列表
    let URL = "/v1/apply/productStatusLogList";
    return apiCall(parm, URL);
}
export const seekGetShopListByCo = function (parm) { // 8.2店铺列表
    parm.pageSize = 9999
    let URL = "/v1/auth/getShopListById";
    return apiCall(parm, URL);
}
export const seekReceiptRemark = function (parm) { // 单据备注
    let URL = "/v1/auth/receiptRemark";
    return apiCall(parm, URL);
}
export const seekDiary = function (parm) { // 导入日志
    let URL = "/v1/import/getImportLog";
    return apiCall(parm, URL);
}
/* --------单据列表------- */
export const seekGetReceiptList = function (parm) { // 单据列表-批量新增
    let URL = "/v1/order/getReceiptList";
    return apiCall(parm, URL);
}
export const seekInsertProductType = function (parm) { // 单据列表-批量新增
    let URL = "/v1/goods/insertProductType";
    return apiCall(parm, URL);
}
export const seekInStorageList = function (parm) { // 单据列表-入库
    let URL = "/v1/order/inStorageList";
    return apiCall(parm, URL);
}
export const seekModifyList = function (parm) { // 单据列表-修改
    let URL = "/v1/order/modifyList";
    return apiCall(parm, URL);
}
export const seekOutStorageList = function (parm) { // 5.15单据列表-退库
    let URL = "/v1/order/outStorageList";
    return apiCall(parm, URL);
}
export const seekTuneStorageList = function (parm) { // 5.16单据列表-调库
    let URL = "/v1/order/tuneStorageList";
    return apiCall(parm, URL);
}
export const seekSendStorageList = function (parm) { // 5.17单据列表-发货
    let URL = "/v1/order/sendStorageList";
    return apiCall(parm, URL);
}
export const seekOutCargoList = function (parm) { // 5.18单据列表-退货
    let URL = "/v1/order/outCargoList";
    return apiCall(parm, URL);
}
export const seekTuneCounterList = function (parm) { // 5.19单据列表-调柜
    let URL = "/v1/order/tuneCounterList";
    return apiCall(parm, URL);
}
export const seekGoodsSellOrder = function (parm) { // 5.21单据列表 - 销售
    let URL = "/v1/order/goodsSellOrder";
    return apiCall(parm, URL);
}
/* --------单据简介------- */
export const seekReceiptRKSynopsis = function (parm) { // 5.38单据简介-入库
    let URL = "/v1/sell/receiptRKSynopsis";
    return apiCall(parm, URL);
}
export const seekReceiptXGSynopsis = function (parm) { // 5.38单据简介-入库
    let URL = "/v1/order/receiptXGSynopsis";
    return apiCall(parm, URL);
}
export const seekReceiptTKSynopsis = function (parm) { // 5.39单据简介-退库
    let URL = "/v1/order/receiptTKSynopsis";
    return apiCall(parm, URL);
}
export const seekReceiptFHSynopsis = function (parm) { // 5.40单据简介-发货
    let URL = "/v1/order/receiptFHSynopsis";
    return apiCall(parm, URL);
}
export const seekReceiptStatusList = function (parm) { // 5.53单据状态列表
    let URL = "/v1/order/receiptStatusList";
    return apiCall(parm, URL);
}
export const seekReceiptDKSynopsis = function (parm) { // 单据简介-调库
    let URL = "/v1/order/receiptDKSynopsis";
    return apiCall(parm, URL);
}
export const seekReceiptTHSynopsis = function (parm) { // 单据简介-退货
    let URL = "/v1/order/receiptTHSynopsis";
    return apiCall(parm, URL);
}
export const seekSellReceiptsIntro = function (parm) { // 单据简介-销售
    let URL = "/v1/sell/getOrderInfo";
    return apiCall(parm, URL);
}
export const seekReceiptDGSynopsis = function (parm) { // 单据简介-调柜
    let URL = "/v1/order/receiptDGSynopsis";
    return apiCall(parm, URL);
}
// 销售
export const seekSellProductList = function (parm) { // 商品列表-销售
    let URL = "/v1/order/goodsSellList";
    return apiCall(parm, URL);
}
export const seekSellcollectMoney = function (parm) { // 收银信息
    let URL = "/v1/sell/getOrderPayInfo";
    return apiCall(parm, URL);
}
export const seekSellProductDetail = function (parm) { // 商品明细 - 销售6.47
    let URL = "/v1/order/getGoodsListByBarcode"
    return apiCall(parm, URL);
}
export const seekAddProductToOrder = function (parm) { // 5.33单据操作-新增销售商品
    let URL = "/v1/sell/addProductToOrder";
    return apiCall(parm, URL);
}
export const seekGetProductByBarcode = function (parm) { // 6.51商品查询-条形码
    let URL = "/v1/public/getProductByBarcode";
    return apiCall(parm, URL);
}
export const seekGetNoticeList = function (parm) { // 9.1公告列表
    let URL = "/v1/notice/getNoticeList";
    return apiCall(parm, URL);
}
export const seekGetNoticeInfo = function (parm) { // 9.4公告详情
    let URL = "/v1/notice/getNoticeInfo";
    return apiCall(parm, URL);
}

export const seekUserInfo = function (parm) { // 用户（好友）列表
    let URL = "/v1/public/userInfo";
    return apiCall(parm, URL);
}

export const seekGetUserList = function (parm) { // 4.11用户（好友）列表
    let URL = "/v1/auth/userList";
    return apiCall(parm, URL);
}
export const seekAllFriend = function (parm) { // 4.13查找用户 – 所有系统用户
    let URL = "/v1/auth/lookupAllFriends";
    return apiCall(parm, URL);
}
export const seekGetUserApply = function (parm) { // 查找用户 – 所有系统用户
    let URL = "/v1/auth/getUserApply";
    return apiCall(parm, URL);
}
export const seekUserDirectories = function (parm) { // 4.9通讯录
    let URL = "/v1/auth/userDirectories";
    return apiCall(parm, URL);
}
export const seekMemberList = function (parm) { // 成员列表
    let URL = "/v1/public/memberList";
    return apiCall(parm, URL);
}
export const seekCreateTaste = function (parm) { // 成员列表
    let URL = "/v1/taste/createTaste";
    return apiCall(parm, URL);
}
export const seekShopInfo = function (parm) { //8.4店铺详情
    let URL = "/v1/public/shopInfo";
    return apiCall(parm, URL);
}
export const seekGoldPrice = function (parm) { //6.31金价列表
    let URL = "/v1/configurationSetting/newGetGoodsInfo";
    return apiCall(parm, URL);
}
export const seekGetDiscount = function (parm) { //6.34折扣列表
    let URL = "/v1/configurationSetting/newDiscountInfo";
    return apiCall(parm, URL);
}
export const seekGetClassGroup = function (parm) { //6.39班组列表
    let URL = "/v1/configurationSetting/getClassGroup";
    return apiCall(parm, URL);
}
export const seekGetNewClassGroup = function (parm) { //6.40班组列表
    let URL = "/v1/configurationSetting/getNewClassGroup";
    return apiCall(parm, URL);
}
export const seekGetShopUserList = function (parm) { //10.6店铺员工
    let URL = "/v1/auth/getShopUserList";
    return apiCall(parm, URL);
}
export const seekGetUserClassGroup = function (parm) { //56.用户班组信息
    let URL = "/v1/configurationSetting/getUserClassGroup";
    return apiCall(parm, URL);
}
export const seekGetDepUserList = function (parm) { //10.4.总部成员列表
    let URL = "/v1/auth/getDepUserList";
    return apiCall(parm, URL);
}
export const seekGetStatisticalSummary = function (parm) { //11.9WEB报表-汇总
    let URL = "/v1/reports/getReportsSummary";
    return apiCall(parm, URL);
}
export const seekPermissionList = function (parm) { //11.12.功能权限列表
    let URL = "/v1/order/permissionList";
    return apiCall(parm, URL);
}
export const seekSearchReceipt = function (parm) { //5.53单据搜索
    let URL = "/v1/order/searchReceipt";
    return apiCall(parm, URL);
}
export const seekSearchProduct = function (parm) { //6.55商品搜索
    let URL = "/v1/order/searchProduct";
    return apiCall(parm, URL);
}
export const seekShowhCertificateList = function (parm) { //6.31证书列表
    let URL = "/v1/headquarter/showhCertificateList";
    return apiCall(parm, URL);
}
export const seekBatchAddByOrderNum = function (parm) { //5.60批量添加-单据列表
    let URL = "/v1/order/batchAddByOrderNum";
    return apiCall(parm, URL);
}
export const seekBatchAllByOrderNum = function (parm) { // 批量添加
    let URL = "/v1/order/batchAllByOrderNum";
    return apiCall(parm, URL);
}
export const seekBatchAddByProductList = function (parm) { //5.61批量添加-商品列表
    let URL = "/v1/order/batchAddByProductList";
    return apiCall(parm, URL);
}
//************************************** WEB首页 *********************************************************
export const seekDataStatistics = function (parm) { //5.55单据数据统计
    let URL = "/v1/order/dataStatistics";
    return apiCall(parm, URL);
}
export const seekSalesStatistics = function (parm) { //5.56销量统计
    let URL = "/v1/order/salesStatistics";
    return apiCall(parm, URL);
}
export const seekSalesTrend = function (parm) { //5.57销量走势
    let URL = "/v1/order/salesTrend";
    return apiCall(parm, URL);
}
export const seekPendingOrder = function (parm) { //5.58待处理单据
    let URL = "/v1/order/pendingOrder";
    return apiCall(parm, URL);
}
export const seekCompanyList = function (parm) { //7.4.公司列表
    let URL = "/v1/public/companyList";
    return apiCall(parm, URL);
}
//************************************** WEB数据中心 *********************************************************
export const seekBackup = function (parm) { //17.1备份接口
    let URL = "/v1/backups/backups";
    return apiCall(parm, URL);
}
export const seekRestore = function (parm) { //17.2还原接口
    let URL = "/v1/backups/restore";
    return apiCall(parm, URL);
}
export const seekListlog = function (parm) { //17.4备份列表
    let URL = "/v1/backups/listlog";
    return apiCall(parm, URL);
}
export const seekOperate = function (parm) { //17.4备份操作
    let URL = "/v1/backups/operate";
    return apiCall(parm, URL);
}
export const seekGetBackupsStatus = function (parm) { //17.6备份开启状态
    let URL = "/v1/backups/getBackupsStatus";
    return apiCall(parm, URL);
}
export const seekUpload = function (parm) { //17.6备份开启状态
    let URL = "/v1/backups/upload";
    return apiCall(parm, URL);
}
export const seekGetAddress = function (parm) { // 获取省市区
    let URL = '/v1/public/getAddress'
    return apiCall(parm, URL);
}
export const seekOrderQueries = function (parm) { // 查询订单
    let URL = '/v1/pay/orderQueries'
    return apiCall(parm, URL);
}
export const seekDynamic = function (parm) { // 动态
    let URL = '/v1/public/dynamic'
    return apiCall(parm, URL);
}
export const seekOrderPayStatus = function (parm) { // 动态
    let URL = '/v1/pay/orderPayStatus'
    return apiCall(parm, URL);
}
export const seekFinishedData = function (parm) { // 成品
    let URL = '/v1/stock/finishedData'
    return apiCall(parm, URL);
}
export const seekOldMaterial = function (parm) { // 旧料
    let URL = '/v1/stock/oldMaterial'
    return apiCall(parm, URL);
}
export const seekStockTrend = function (parm) { // 库存走势
    let URL = '/v1/stock/stockTrend'
    return apiCall(parm, URL);
}
export const seekStatisticalIndex = function (parm) { // 库存走势
    let URL = '/v1/stock/statisticalIndex'
    return apiCall(parm, URL);
}

export const seekGetEndMoneySetting = function (parm) { // 尾数列表
    let URL = '/v1/configurationSetting/getEndMoneySetting'
    return apiCall(parm, URL);
}

export const seekSetEndMoney = function (parm) { // 尾数设置
    let URL = '/v1/configurationSetting/setEndMoney'
    return apiCall(parm, URL);
}

export const seekGetSetting = function (parm) { // 收款方式 回购设置列表
    let URL = '/v1/configurationSetting/getSetting'
    return apiCall(parm, URL);
}
//************************************** 库存新 *********************************************************
export const seekStockProductList = function (parm) { // 21.8库存列表
    let URL = '/v1/stock/stockProductList'
    return apiCall(parm, URL);
}
//************************************** 短信套餐 *********************************************************
export const seekGetMoneyList = function (parm) { // 21.8库存列表
    let URL = '/v1/public/getMoneyList'
    return apiCall(parm, URL);
}
export const seekGetImportSetting = function (parm) { // 5.63获取智能配置信息
    let URL = '/v1/import/getImportSetting'
    return apiCall(parm, URL);
}
export const seekAddImportSetting = function (parm) { // 5.64添加智能配置
    let URL = '/v1/import/addImportSetting'
    return apiCall(parm, URL);
}
export const seekAmendImportSetting = function (parm) { // 5.68修改智能配置
    let URL = '/v1/import/updateImportSetting'
    return apiCall(parm, URL);
}
export const seekDelImportSetting = function (parm) { // 5.65删除智能配置
    let URL = '/v1/import/delImportSetting'
    return apiCall(parm, URL);
}
export const seekRukuAutoUpload = function (parm) { // 5.62智能入库导入
    let URL = '/b1/rukuAutoUpload'
    return apiCall(parm, URL);
}
//************************************** 商品明细 *********************************************************
export const seekCommodityDetails = function (parm) { // 5.62智能入库导入
    let URL = '/v1/goods/commodityDetails'
    return apiCall(parm, URL);
}
//************************************** web公告 *********************************************************
export const seekNoticeList = function (parm) { // 10.12公告列表
    let URL = '/v1/notice/noticeList'
    return apiCall(parm, URL);
}
export const seekNoticeDetails = function (parm) { // 10.13公告详情
    let URL = '/v1/notice/noticeDetails'
    return apiCall(parm, URL);
}
//************************************** web消息 *********************************************************
export const seekMessageList = function (parm) { // 18.3消息列表
    let URL = '/v1/public/messageList'
    return apiCall(parm, URL);
}
export const seekSystemMessageList = function (parm) { // 18.2系统消息-列表
    let URL = '/v1/public/systemMessageList'
    return apiCall(parm, URL);
}
export const seekUnreadCount = function (parm) { // 18.1未读统计
    let URL = '/v1/public/unreadCount'
    return apiCall(parm, URL);
}

export const seekCashierStatistics = function (parm) { // 12.52 收银统计
    let URL = '/v1/reports/cashierStatistics'
    return apiCall(parm, URL);
}
//************************************** 会员系统 *********************************************************
export const seekMemberAllList = function (parm) { //会员列表
    let URL = '/v1/member/memberAllList'
    return apiCall(parm, URL);
}
export const seekGetMemberInfo = function (parm) { //会员信息
    let URL = '/v1/member/getMemberInfo'
    return apiCall(parm, URL);
}
export const seekFollowSignList = function (parm) { // 标签列表
    let URL = '/v1/member/followSignList'
    return apiCall(parm, URL);
}
export const seekGetMemberFollowList = function (parm) { // 会员跟进列表
    let URL = '/v1/member/getMemberFollowList'
    return apiCall(parm, URL);
}
export const seekLatelyBuyRecord = function (parm) { // 购买记录
    let URL = '/v1/member/latelyBuyRecord'
    return apiCall(parm, URL);
}
export const seekGetFollowAllList = function (parm) { // 跟进列表
    let URL = '/v1/member/getFollowAllList'
    return apiCall(parm, URL);
}
export const seekGetFollowInfo = function (parm) { // 跟进明细
    let URL = '/v1/member/getFollowInfo'
    return apiCall(parm, URL);
}
export const seekUnfinishedFollowNum = function (parm) { // 历史未完成
    let URL = '/v1/member/unfinishedFollowNum'
    return apiCall(parm, URL);
}
export const seekMemberTotalNum = function (parm) { // 会员总数
    let URL = '/v1/member/memberTotalNum'
    return apiCall(parm, URL);
}
//************************************** 短信 *********************************************************
export const seekGetSMSLog = function (parm) { // 短信日志表
    let URL = '/v1/member/getSMSLog'
    return apiCall(parm, URL);
}
export const seekGetSMSSignatureList = function (parm) { // 短信签名列表
    let URL = '/v1/member/getSMSSignatureList'
    return apiCall(parm, URL);
}
export const seekFollowTimingList = function (parm) { // 定时跟进列表
    let URL = '/v1/member/followTimingList'
    return apiCall(parm, URL);
}
export const seekMessageOperation = function (parm) { // 短信签名列表
    let URL = '/v1/member/messageOperation'
    return apiCall(parm, URL);
}
export const seekGetSignList = function (parm) { // 短信模板列表
    let URL = '/v1/member/getSignList'
    return apiCall(parm, URL);
}
export const seekSignOperation = function (parm) { // 短信模板创建/修改/删除
    let URL = '/v1/member/signOperation'
    return apiCall(parm, URL);
}
export const seekSendSMS = function (parm) { // 发送短信
    let URL = '/v1/member/sendSMS'
    return apiCall(parm, URL);
}
export const seekChargePay = function (parm) { // 充值支付
    let URL = '/v1/pay/chargePay'
    return apiCall(parm, URL);
}
export const seekGetSMSAccountInfo = function (parm) { // 账户信息
    let URL = '/v1/member/getSMSAccountInfo'
    return apiCall(parm, URL);
}
export const seekListIntention = function (parm) { // 意向列表
    let URL = '/v1/facepass/listIntention'
    return apiCall(parm, URL);
}
export const seekListVisitor = function (parm) { // 来访用户列表
    let URL = '/v1/facepass/listVisitor'
    return apiCall(parm, URL);
}
export const seekListDevice = function (parm) { // 设备列表
    let URL = '/v1/facepass/listDevice'
    return apiCall(parm, URL);
}
export const seekInfoVisitor = function (parm) { // 查看顾客详情
    let URL = '/v1/facepass/infoVisitor'
    return apiCall(parm, URL);
}
export const seekGetVisitLog = function (parm) { // 历史到店记录
    let URL = '/v1/facepass/getVisitLog'
    return apiCall(parm, URL);
}
export const seekFaceUserImageList = function (parm) { // 获取用户的人脸图片列表
    let URL = '/v1/facepass/faceUserImageList'
    return apiCall(parm, URL);
}
export const seekGetFaceByShop = function (parm) {
    let URL = '/v1/facepass/getFaceByShop'
    return apiCall(parm, URL);
}
export const seekOneProductStatus = function (parm) { // 商品状态查询
    let URL = '/v1/public/oneProductStatus'
    return apiCall(parm, URL);
}
export const seekReportHours = function (parm) { // 日流量图
    let URL = '/v1/facepass/reportHours'
    return apiCall(parm, URL);
}
export const seekReportAges = function (parm) { // 访客年龄段图
    let URL = '/v1/facepass/reportAges'
    return apiCall(parm, URL);
}
export const seekReportSex = function (parm) { // 访客男女比例图
    let URL = '/v1/facepass/reportSex'
    return apiCall(parm, URL);
}
export const seekReportVisit = function (parm) { // 会员访店图
    let URL = '/v1/facepass/reportVisit'
    return apiCall(parm, URL);
}

export const mallsClassification = function (parm) {
    //款式设置---列表
    let URL = "/v1/weChat/mallsClassification";
    return apiCall(parm, URL);
}

export const programGirardInfo = function (parm) {
    // 款式 明细--编辑的时候进去用这个接口获取数据
    let URL = "/v1/weChat/programGirardInfo";
    return apiCall(parm, URL);
}
export const programProductAdd = function (parm) {
    //新增 款号
    let URL = "/v1/weChat/programProductAdd";
    return apiCall(parm, URL);
}
export const programGirardImageHandler = function (parm) {
    //款式 图片操作
    let URL = "/v1/weChat/programGirardImageHandler";
    return apiCall(parm, URL);
}
export const programGirardUpdate = function (parm) {
    //款式更新-删除-修改
    let URL = "/v1/weChat/programGirardUpdate";
    return apiCall(parm, URL);
}
export const programProductGirardList = function (parm) {
    //款式--关联商品列表
    let URL = "/v1/weChat/programProductGirardList";
    return apiCall(parm, URL);
}
export const programGirardProductHandler = function (parm) {
    //款式---添加商品  删除 或新增
    let URL = "/v1/weChat/programGirardProductHandler";
    return apiCall(parm, URL);
}

export const mallsShopInfo = function (parm) {
    //获取店铺信息
    let URL = "/v1/weChat/mallsShopInfo";
    return apiCall(parm, URL);
}
export const mallsShopImageOperation = function (parm) {
    //商城店铺图片 操作
    let URL = "/v1/weChat/mallsShopImageOperation";
    return apiCall(parm, URL);
}
export const mallsShopInfoUpdate = function (parm) {
    //商城店铺信息更新---
    let URL = "/v1/weChat/mallsShopInfoUpdate";
    return apiCall(parm, URL);
}
export const mallsOtherShopAdd = function (parm) {
    //商城分店 新增
    let URL = "/v1/weChat/mallsOtherShopAdd";
    return apiCall(parm, URL);
}
export const mallsOtherShopOperation = function (parm) {
    //商城分店操作
    let URL = "/v1/weChat/mallsOtherShopOperation";
    return apiCall(parm, URL);
}
export const mallsOtherShopUpdate = function (parm) {
    //商城分店信息更新
    let URL = "/v1/weChat/mallsOtherShopUpdate";
    return apiCall(parm, URL);
}

export const settingHandler = function (parm) {
    //金价设置 开关
    let URL = "/v1/weChat/settingHandler";
    return apiCall(parm, URL);
}
export const goldPriceEnableInfo = function (parm) {
    //获取金价开关状态
    let URL = "/v1/weChat/goldPriceEnableInfo";
    return apiCall(parm, URL);
}
export const shelvesGroupInfo = function (parm) {
    //获取柜组信息状态
    let URL = "/v1/weChat/shelvesGroupInfo";
    return apiCall(parm, URL);
}
export const seekGetShopRoleList = function (parm) {
    //获取柜组信息状态
    let URL = "/v1/auth/getShopRoleList";
    return apiCall(parm, URL);
}
export const seekCreateQRCode = function (parm) {
    //获取柜组信息状态
    let URL = "/v1/web/createQRCode";
    return apiCall(parm, URL);
}
export const seekSmallProgramShopList = function (parm) {
    let URL = "/v1/weChat/smallProgramShopList";
    return apiCall(parm, URL);
}

export const seekGetServiceTypeList = function (parm) { // 服务售后类型
    let URL = "/v1/public/getServiceTypeList";
    return apiCall(parm, URL);
}

export const seekGetMemberInfoByService = function (parm) { // 获取会员全称
    let URL = "/v1/public/getMemberInfoByService";
    return apiCall(parm, URL);
}

export const seekAfterProductList = function (parm) { // 售后商品列表
    let URL = "/v1/public/afterProductList";
    return apiCall(parm, URL);
}
export const seekServiceAfterList = function (parm) { // 5.73
    let URL = "/v1/public/serviceAfterList";
    return apiCall(parm, URL);
}
export const seekReceiptFWSynopsis = function (parm) { // 单据简介-服务
    let URL = "/v1/public/receiptFWSynopsis";
    return apiCall(parm, URL);
}
export const seekProductListByService = function (parm) { // 商品列表-服务模块
    let URL = "/v1/public/productListByService";
    return apiCall(parm, URL);
}
export const seekGetServiceStatusList = function (parm) { // 服务单据状态列表
    let URL = "/v1/public/getServiceStatusList";
    return apiCall(parm, URL);
}
export const seekGetMemberInfoByPhone = function (parm) { // 根据手机号查询会员信息
    let URL = "/v1/public/getMemberInfoByPhone";
    return apiCall(parm, URL);
}
export const seekGetReportsComprehensive = function (parm) { // 报表-进销存汇总
    let URL = "/v1/reports/getReportsComprehensive";
    return apiCall(parm, URL);
}
export const showCounterList = function (parm) { // 柜组列表
    let URL = "/v1/headquarter/showCounterList"
    return apiCall(parm, URL);
}
export const seekGetPrintLabelList = function (parm) { // 标签打印
    let URL = "/v1/print/getPrintLabelList"
    return apiCall(parm, URL);
}
export const getIdentifyingCode = function (parm) { // 验证码获取
    let URL = "/v1/public/getIdentifyingCode"
    return apiCall(parm, URL);
}
export const updateIdentifyingCode = function (parm) { // 验证码更新
    let URL = "/v1/public/updateIdentifyingCode"
    return apiCall(parm, URL);
}
export const identifyingCode = function (parm) { // 验证码验证
    let URL = "/v1/public/identifyingCode"
    return apiCall(parm, URL);
}
// 11.20 入库单据打印
export const seekGetReportsPrintRK = function (parm) {
  let URL = "/v1/reports/getReportsPrintRK";
  return apiCall(parm, URL);
}

export const seekGetReportsPrintXG = function (parm) {
  let URL = "/v1/reports/getReportsPrintXG";
  return apiCall(parm, URL);
}

