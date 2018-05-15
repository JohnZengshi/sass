// 权限
 // 删除权限(审核状态，删除权限)
export const jurisdictionDelectOptions = function (parm, isRole) {
    if (parm === "1") { // 待审核的状态
        if (isRole === "Y") { // 后台判断有删除权限
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
// 确认收货(收货状态，收货人)
export const jurisdictionRcvFlag = function (receiptStatus, rcvFlag) {
    if (receiptStatus === "1") { // 未收货
        if (rcvFlag === "Y") { // 收货人
            return true;
        } else {
            return false;
        }
    }
}
 // 提交审核，撤销审核，审核通过权限,发货的话，撤销审核拆分出来(审核状态, 制单人id, 审核人)
export const jurisdictionAuditStateFilter = function (parm, makeId, isCheckOrderMan) {
    let userId = sessionStorage.getItem("id");
    if (parm === "1") { // 待审核的状态  ===》提交审核
        if (makeId === userId) {
            return true;
        } else {
            return false;
        }
    } else { // 通过审核
        if (isCheckOrderMan === "Y") {
            return true;
        } else {
            return false;
        }
    }
}
// 驳回审核(审核状态, 审核人，收货情况) ===》针对发货
export const jurisdictionSippingTurnDownAuditStateFilter = function (parm, isCheckOrderMan, receiptStatus) {
    if (parm === "2") { // 审核状态
        if (isCheckOrderMan === "Y") { // 审核人
            if (receiptStatus !== "2") { // 收货情况
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
// 驳回审核(审核状态, 审核人)
export const jurisdictionTurnDownAuditStateFilter = function (parm, isCheckOrderMan) {
    if (parm === "2") { // 审核状态
        if (isCheckOrderMan === "Y") { // 审核人
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
export const jurisdictionComputedRole = function (parm) { // 公司人
    for (let i of parm) {
        switch (i.role) {
            case "1":
                return true;
            case "2":
                return true;
            case "3":
                return true;
        }
    }
    return false;
}
export const jurisdictionShopRole = function (parm) { // 店铺人
    for (let i of parm) {
        switch (i.role) {
            case "4":
                return true;
            case "5":
                return true;
        }
    }
    return false;
}
export const jurisdictionShopManRole = function (parm) { // 店员
    for (let i of parm) {
        switch (i.role) {
            case "5":
                return true;
        }
    }
    return false;
}
export const jurisdictionShopManageRole = function (parm) { // 店长
    for (let i of parm) {
        switch (i.role) {
            case "4":
                return true;
        }
    }
    return false;
}
export const jurisdictionComputedManageRole = function (parm) { // 公司管理人
    for (let i of parm) {
        switch (i.role) {
            case "1":
                return true;
            case "2":
                return true;
        }
    }
    return false;
}
export const jurisdictionJCY = function (parm) {
    for (let i of parm) {
        switch (i.role) {
            case "6":
                return true;
        }
    }
    return false;
}