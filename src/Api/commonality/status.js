// 状态
export const productDetailStatus = function (parm) { // 商品列表
    switch (parm) {
        case "1":
            return "入库中";
        case "2":
            return "已入库";
        case "3":
            return "退库中";
        case "4":
            return "已退库";
        case "5":
            return "修改中";
        case "6":
            return "已修改";
        case "7":
            return "调库中";
        case "8":
            return "已调库";
        case "9":
            return "发货中";
        case "10":
            return "已发货";
        case "11":
            return "退货中";
        case "12":
            return "已退货";
        case "13":
            return "调柜中";
        case "14":
            return "已调柜";
        case "15":
            return "销售中";
        case "16":
            return "已销售";
        case "17":
            return "发货审核";
        case "18":
            return "退货审核";
        case "19":
            return "已退换";
        case "20":
            return "退换中";
    }
}
export const newProductDetailStatus = function (parm) { // 商品列表
    switch (parm) {
        case "10":
            return '已入库'
        case "11":
            return '入库中'
        case "20":
            return '已退库'
        case "21":
            return '退库中'
        case "30":
            return '已修改'
        case "31":
            return '修改中'
        case "40,101":
            return '已调库'
        case "41":
            return '调库中'
        case "50,100":
            return '已发货'
        case "51":
            return '发货中'
        case "52":
            return '发货审核'
        case "60":
            return '已退货'
        case "61":
            return '退货中'
        case "62":
            return '退货审核'
        case "70":
            return '已调柜'
        case "71":
            return '调柜中'
        case "80":
            return '已销售'
        case "81":
            return '销售中'
        case "90":
            return '已销退'
        case "91":
            return '销退中'
        case "92":
            return '已换货'
        case "93":
            return '换货中'
        case "94":
            return '已回收'
        case "95":
            return '回收中'
        case "100":
            return '店铺收货'
        case "101":
            return '店铺收货'
    }
}
export const receiptStatus = function (parm) { // 审核状态
    switch (parm) {
        case "1":
            return "待审核";
        case "2":
            return "审核中";
        case "3":
            return "已审核";
    }
}
export const receiptStatusTwo = function (parm) {
    switch (parm) {
        case "1":
            return "未收货";
        case "2":
            return "已收货";
    }
}
export const receiptOptionsName = function (parm) { // 审核操作的按钮名字
    switch (parm) {
        case "1":
            return "提交审核";
        case "2":
            return "审核通过";
        case "3":
            return "撤销审核";
    }
}
export const historyListStatus = function (parm) { // 审核状态
    switch (parm) {
        case "1":
            return "新建单据";
        case "2":
            return "提交审核";
        case "3":
            return "取消审核";
        case "4":
            return "驳回审核";
        case "5":
            return "通过审核";
        case "6":
            return "撤消审核";

    }
}
export const receivedStatus = function (parm) { // 收货情况
    switch (parm) {
        case "1":
            return "未收货";
        case "2":
            return "已收货";
        case "3":
            return "无";
    }
}
export const productTpyeState = function (parm) { // 商品属性
    switch (parm) {
        case "1":
            return "成品";
        case "2":
            return "旧料";
    }
}
export const statusCashStatus = function (parm) { // 收银状态
    switch (parm) {
        case "1":
            return "已收银";
        case "2":
            return "待收银";
    }
}
export const statusReceipts = function (parm1, parm2, parm3) { // 单据总合的显示隐藏
    let totalNum = false;
    let totalWeight = false;
    let totalPrice = false;
    if (parm1 === "0") {
        totalNum = true;
    } else if (!parm1) {
        totalNum = true;
    }
    if (parm2 === "0") {
        totalWeight = true;
    } else if (!parm2) {
        totalWeight = true;
    }
    if (parm3 === "0") {
        totalPrice = true;
    } else if (!parm3) {
        totalPrice = true;
    }
    if (totalNum && totalWeight && totalPrice) {
        return false;
    } else {
        return true;
    }
}
export const statusModuleType = function (parm) { // 模块类型
    switch (parm) {
        case "01":
            return "入库";
        case "02":
            return "退库";
        case "03":
            return "发货";
        case "04":
            return "退货";
        case "05":
            return "销售/回购";
        case "06":
            return "调柜";
        case "07":
            return "调库";
        case "08":
            return "修改";
    }
}
export const statusSucceed = function (parm) {
    switch (parm) {
        case "0":
            return "成功"
        case "1":
            return "异常";
        case "2":
            return "已删除";
    }
}
export const statusPosition = function (parm) {
    switch (parm) {
        case "1":
            return "管理员"
        case "2":
            return "管理员";
        case "3":
            return "职员";
        case "4":
            return "店长";
        case "5":
            return "店员";
        case "6":
            return "监察员";
    }
}