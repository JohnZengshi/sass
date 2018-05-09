// 弹窗
import * as types from "./../mutation-types.js"
const store = {
    state: {
        popupAudit: false, // 审核弹窗
        errorCode: "", // 错误提示弹窗
        saveSuccess: false, // 保存弹窗
        saveSuccessData: null, // 保存弹窗数据
        affirmAudit: false, // 审核的确认弹窗
        modelState: false // 销售的模糊层
    },
    mutations: {
        [types.WORK_POPUP_AUDIT] (state, parm) { // 审核弹窗
            state.popupAudit = parm
        },
        [types.WORK_POPUP_ERROR] (state, parm) { // 错误提示弹窗
            // alert(parm);
            state.errorCode = parm
        },
        [types.WORK_POPUP_SAVE] (state, parm) { // 保存弹窗
            state.saveSuccess = parm.saveSuccess;
            state.saveSuccessData = parm.saveSuccessData;
        },
        [types.WORK_POPUP_AFFIRM] (state, parm) { // 审核的确认弹窗
            state.affirmAudit = parm
        },
        [types.WORK_MODEL_STATE] (state, parm) { // 销售的模糊层
            state.modelState = parm
        }
    }
}
export default store;
