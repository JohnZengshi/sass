import Vue from 'vue'
import router from './../router'
import * as types from './mutation-types.js'
import { getMyGroup } from '../IM/group/'
import { receiptAddOrChecks } from '../Api/commonality/operate'
import {getSelfInfo, getCompanyInfo} from '../Api/user'
import * as seeks from '../Api/commonality/seek.js'
export const getSeekUserInfo = ({commit}, parm) => { // 个人信息
    let  options = {
        "userId": sessionStorage.getItem("id")
    }
    seeks.seekUserInfo(options).then((response) => {
        if (response.data.state === 200) {
            commit(types.SET_USER_INFO, response.data.data);
        } else if (response.data.state === 10000) {
            commit(types.WORK_POPUP_ERROR, response.data.msg);
        }
    }, (response) => {
        commit(types.WORK_POPUP_ERROR, response.data.msg);
    })
}
export const getSeekGetUserInfo = ({commit}, parm) => { // 用户职位信息
    let options = {
        userId: sessionStorage.getItem('id')
    }
    seeks.seekGetUserInfo().then((response) => {
        if (response.data.state === 200) {
            commit(types.SET_USER_POSITION_INFO, response.data.data);
        } else if (response.data.state === 10000) {
            commit(types.WORK_POPUP_ERROR, response.data.msg);
        }
    }, (response) => {
        commit(types.WORK_POPUP_ERROR, response.data.msg);
    })
}
export const getSeekCompanyInfo = ({commit}, parm) => { // 公司详情
    seeks.seekCompanyInfo().then((response) => {
        if (response.data.state === 200) {
            commit(types.SET_USER_COMPANY_INFO, response.data.data);
        } else if (response.data.state === 10000) {
            commit(types.WORK_POPUP_ERROR, response.data.msg);
        }
    }, (response) => {
        commit(types.WORK_POPUP_ERROR, response.data.msg);
    })
}
// 获取用户信息
export const getUserInfo = ({ commit, state }, cb) => {
    let data = {userId: sessionStorage.getItem("id")}
    getSelfInfo(data).then((res) => {
        if (res.data.state === 200) {
            commit(types.SET_USER_INFO_ITEM, res.data.data);
        } else if (response.data.state === 10000) {
            commit(types.WORK_POPUP_ERROR, response.data.msg);
        }
    })
}
// 获取公司信息
export const getCompInfo = ({commit, state}, cb) => {
  let data = {companyId: sessionStorage.getItem("companyId")}
  getCompanyInfo(data).then((res) => {
    if (res.data.state === 200) {
      commit(types.SET_COMP_INFO, res.data.data)
    } else {
      commit(types.WORK_POPUP_ERROR, response.data.msg);
    }
  })
}

/*---------------IM 新-------------*/
// 状态类
export const IMonMsgNotify = ({commit}, parm) => { // 监听新消息时间
    // 获取所有聊天会话
    var sessMap = webim.MsgStore.sessMap();
    for (var i in sessMap) {
        var sess = sessMap[i];
        if (selToID != sess.id()) { // 更新其他聊天对象的未读消息数
        }
    }
    commit(types.IM_ON_MSG_NOTIFY, parm)
}
export const IMCutFriendGroup = ({commit}, parm) => { // 监听切换好友或群
    commit(types.IM_CUT_FRIEND_GROUP, parm)
}
/* IM部分旧 */
// 获取好友列表
export const getFriendList = ({ commit }, cb) => {
  // getMyFriends((parm) => {
  //   // const tokenId = sessionStorage.getItem('tokenId')
  //   // const newArr = []
  //   parm.map((item) => { // 【待修改】
  //     getUserById({id: item.id}).then((res) => {
  //      // res.data.data.friendOperation = "发送消息"
  //       newArr.push(res.data.data)
  //     }, (err) => {
  //     })
  //   })
  //    sessionStorage.setItem("好友列表", JSON.stringify(newArr));
  //   commit(types.SET_FRIEND_LIST, newArr)
  //   if (cb instanceof Function) cb(newArr);
  // })
}

// 获取群组列表
export const getGroupList = ({commit}, cb) => {
  getMyGroup(parm => {
    commit(types.SET_GROUP_LIST, parm)
    if (cb instanceof Function) cb(parm)
  })
}
// 最近联系人
export const getRecentContacts = ({commit, state}, parm) => {
  let recentData = parm
  let pinnedList = state.im.stick
  if (pinnedList.length) {
     for (let j = 0; j < recentData.length; j++) {
      for (let i = 0; i < pinnedList.length; i++) {
          if (recentData[j].id === pinnedList[i]) {
            recentData.unshift(recentData.splice(j, 1)[0])
            break
          }
      }
     }
  }
  commit(types.SET_RECENT_CONTACTS, recentData)
}

// 获取系统消息列表 之后细分通知公告审批等
export const getSysMess = ({commit}, parm) => {
  commit(types.SET_SYS_MESS, parm)
}

// 消息免打扰
export const setDndList = ({commit}, parm) => {
  commit(types.SET_IM_DNDLIST, parm)
}
// 消息置顶
export const setPinnedList = ({commit}, parm) => {
    commit(types.SET_IM_PINNEDLIST, parm)
}

// ********************** work ****************
// ----------状态类---------
export const workPopupAudit = ({commit}, parm) => { // 审核弹窗
    commit(types.WORK_POPUP_AUDIT, parm)
}
export const workPopupAffirm = ({commit}, parm) => { // 审核的确认弹窗
    commit(types.WORK_POPUP_AFFIRM, parm);
}
export const workPopupError = ({commit}, parm) => { // 错误弹窗
    commit(types.WORK_POPUP_ERROR, parm);
}
// 监听编辑权限
export const workUserType = ({commit}, parm) => {
    commit(types.WORK_USER_TYPE, parm)
}
// 审核状态
export const workProductStatus = ({commit}, parm) => {
    commit(types.WORK_PRODUCT_STATUS, parm)
}
// 应用用户列表
export const workApplyUser = ({commit}, parm) => {
    var url = "/v1/apply/userList"
    var data = {
        "data": {
            "type": parm.type, // 1部门2 公司 3 店铺 4 班组成员 5 审核人
            "objId": parm.objId,
            "applyId": sessionStorage.getItem("applyId")//应用ID
        },
        "unit": {
            "channel": 3,
            "OS": "web",
            "userId": sessionStorage.getItem("id"),
            "companyId": sessionStorage.getItem("companyId"),
            "tokenId": sessionStorage.getItem("tokenId")
        }
    }
    // sessionStorage.setItem("kkkkkk", JSON.stringify(data));
    Vue.http.post(url, data).then((response) => {
        if (response.data.state === 200) {
            commit(types.WORK_APPLY_USER, response.data.data)
        } else {
        }
    }, (response) => {
    })
}
// 产品类别（商品类型列表）
export const workProductClass = ({commit}, parm) => {
//  debugger
    seeks.getProductTypeList().then((response) => {
        if (response.data.state === 200) {
//          debugger
            commit(types.WORK_PRODUCT_CLASS, response.data.data.list)
        } else {
            this.$store.dispatch('workPopupError', response.data.msg);
        }
    }, (response) => {
    })
}
// 获取供应商列表
export const workSupplierList = ({commit}, parm) => {
    seeks.seekShowProviderList().then((response) => {
        if (response.data.state === 200) {
            commit(types.WORK_SUPPLIER_LIST, response.data.data.supplierList);
        } else {
            this.$store.dispatch('workPopupError', response.data.msg);
        }
    }, (response) => {
    })
}
// 用户所有部门、店铺权限列表 (计划分销)
export const workApplyDepartement = ({commit}, parm) => {
    var data = {
        "data": {
            "applyId": sessionStorage.getItem("applyId") // 应用id
        },
        "unit": {
            "userId": sessionStorage.getItem("id"),
            "companyId": sessionStorage.getItem("companyId"),
            "channel": "web",
            "OS": "web",
            "tokenId": sessionStorage.getItem("tokenId")
        }
    }
    let url = INTERFACE_URL_9083 + "/v1/apply/getApplyDepShop";
    Vue.http.post(url, data).then((response) => {
        if (response.data.state === 200) {
            commit(types.WORK_APPLY_DEPARTEMENT, response.data.data.dpList)
        } else {
        }
    }, (response) => {
    })
}
// 库位列表
export const workRepositoryList = ({commit}, parm) => { // 待删，防止报错先放着
    seeks.seekRepositoryList().then((response) => {
        if (response.data.state === 200) {
            commit(types.WORK_REPOSITORY_LIST, response.data.data.repositoryList)
        } else {
            this.$store.dispatch('workPopupError', response.data.msg);
        }
    }, (response) => {
    })
}
// 发货多选框（删除）
export const delectSelects = ({commit}, parm) => {
    commit(types.DELECT_SELECTS, parm)
}
// 通过条形码搜索数据
export const seekBarCode = ({commit}, parm) => {
    commit(types.SEEK_BARCODE, parm)
}
// 获取新建带过来的数据（退货）
export const getReturnSelect = ({commit}, parm) => {
    commit(types.GET_RETURN_SELECT, parm)
}
// 获取新建带过来的数据（公共方法）
export const commonality = ({commit}, parm) => {
}

// 商品列表(web)
export const workProductDetail = ({commit}, parm) => {
    seeks.seekProductDetail(parm).then((response) => {
        if (response.data.state === 200) {
            commit(types.WORK_PRODUCT_DETAIL, response.data.data);
            if (parm.routerUrl) {
                router.push(parm.routerUrl)
            }
        } else {
            this.$store.dispatch('workPopupError', response.data.msg);
        }
    }, (err) => {
    })
}
// 删除数据的集合（公共方法）
export const workDelectSelects = ({commit}, parm) => {
    commit(types.WORK_DELECT_SELECTS, parm)
}
// 单据详情
export const workReceiptDetail = ({commit}, parm) => {
    var data = {
        "data": {
            "orderNum": parm.orderNumber || sessionStorage.getItem("orderNumber"), // 单据号
        },
        "unit": {
            "companyId": sessionStorage.getItem("companyId"),
            "channel": 3,
            "OS": "web",
            "ip": "string",
            "userId": sessionStorage.getItem("id"),
            "tokenId": sessionStorage.getItem("tokenId")
        }
    }
    var url = "/v1/myWorkApply/receiptDetail";
    Vue.http.post(url, data).then((response) => {
        if (response.data.state === 200) {
        sessionStorage.setItem("DANJUXIANGQING", JSON.stringify(response.data.data))
            commit(types.WORK_RECEIPT_DETAIL, response.data.data);
        } else {
        }
    }, (response) => {
    })
}
// 单据列表
export const workProductList = ({commit}, parm) => {
    seeks.seekDepartmentList(parm).then((response) => {
        if (response.data.state === 200) {
            commit(types.WORK_PRODUCT_LIST, response.data.data);
            if (parm.routerUrl) {
                router.push(parm.routerUrl)
            }
        } else {
            let arr = []; // 清空单据列表
            commit(types.WORK_PRODUCT_LIST, arr)
            this.$store.dispatch('workPopupError', response.data.msg);
        }
    }, (err) => {
    })
}
// 获取操作部门
export const workDepartmentList = ({commit}, parm) => {
    // let url = "/v1/apply/getApplyDepShop";
    // let data = {
    //     "data": {
    //         "applyId": sessionStorage.getItem("applyId")
    //     },
    //     "unit": {
    //         "userId": sessionStorage.getItem("id"),
    //         "companyId": sessionStorage.getItem("companyId"),
    //         "channel": 3,
    //         "OS": "web",
    //         "tokenId": sessionStorage.getItem("tokenId")
    //     }
    // }
    // Vue.http.post(url, data).then((response) => {
    //     if (response.data.state === 200) {
    //         commit(types.WORK_DEPARTMENT_LIST, response.data.data.dpList);
    //         let onlyDepartment = [];
    //         let onlyShop = [];
    //         response.data.data.dpList.forEach((x,i) => {
    //             if (x.type === "1") {
    //                 onlyDepartment.push(x)
    //             } else {
    //                 onlyShop.push(x)
    //             }
    //         })
    //         commit(types.WORK_ONLY_DEPARTMENT, onlyDepartment); // 只有部门
    //         commit(types.WORK_ONLY_SHOP, onlyShop); // 只有店铺
    //     } else {
    //     }
    // }, (response) => {
    // })
}
// 店铺列表(分销商) 待删，全部为店铺了
export const workShopList = ({commit}, parm) => {
    var url = "/v1/headquarter/showShopList";
    var data = {
        "data": {
            "type": "2",
            "userId": sessionStorage.getItem("id")
        },
        "unit": {
            "companyId": sessionStorage.getItem("companyId"),
            "channel": 3,
            "OS": "web",
            "ip": "string",
            "userId": sessionStorage.getItem("id"),
            "tokenId": sessionStorage.getItem("tokenId")
        }
    }
    Vue.http.post(url, data).then((response) => {
      if (response.data.state === 200) {
        commit(types.WORK_SHOP_LIST, response.data.data.shopList)
      }
    }, (response) => {
    })
}
// 店铺列表
export const getShopListByCo = ({commit}, parm) => {
    var options = {
      "page": "1",
      "pageSize": "9999"
    }
    seeks.seekGetShopListByCo(options).then((response) => {
        if (response.data.state === 200) {
            console.log(response);
            commit(types.WORK_SHOP_LIST_BY_CO, response.data.data.shopList)
        }
    }, (response) => {

    })
}
// 单据新增/提交审核/保存（销售除外）
export const receiptAddOrCheck = ({commit}, parm) => {
    let productIdList = [];
    for (let i = 0; i < parm.productIdList.length; i++) { // 配置商品id列表
        let productIdObject = {};
        productIdObject.productId = parm.productIdList[i]; // 商品ID
        productIdObject.productStatus = parm.productStatus; // 1新增2删除
        productIdList.push(productIdObject);
    }
    let data = parm;
    data.productIdList = productIdList;
    receiptAddOrChecks(data).then((response) => {
        if (response.data.state === 200) {
            commit(types.WORK_POPUP_SAVE, {
                "saveSuccess": true,
                "saveSuccessData": response.data.data
            })
            let data = {
                "applyType": parm.type, // 1 调库 2 退库 3 修改 4 入库 5 收货 6 发货 7 退货 8 调柜（销售除外）
                "objId": response.data.data.orderNum,
                "type": "1" // 1 单据号 2 产品类别ID 3 商品ID列表 4 条码模糊查询 5 条码号
            }
            seeks.seekProductDetail(data).then((response) => {
                if (response.data.state === 200) {
                    commit(types.WORK_PRODUCT_DETAIL, response.data.data);
                }
            }, (response) => {
            })
        } else {
            commit(types.WORK_POPUP_ERROR, response.data.msg);
        }
    }, (response) => {
    })
}
export const workPopupSave = ({commit}, parm) => { // 保存弹窗
    commit(types.WORK_POPUP_SAVE, parm)
}
export const workCounterList = ({commit}, parm) => { // 柜组列表
    seeks.seekShowCounterList(parm).then((response) => {
        commit(types.WORK_COUNTTER_LIST, response.data.data.counterList)
    }, (response) => {
        this.$store.dispatch('workPopupError', response.data.msg);
    })
}
// 销售
export const sellProductListFun = ({commit}, parm) => { // 商品列表-销售
    commit(types.SELL_PRODUCT_LIST, parm);
}
/*弹窗和模糊层*/
export const workModelState = ({commit}, parm) => { // 销售的模糊层
    commit(types.WORK_MODEL_STATE, parm)
}

/*组织架构*/
export const workOrganizationChange = ({commit}, parm) => { // 销售的模糊层/.
    commit(types.SET_ORGANIZATION_CHANGE, parm)
}
