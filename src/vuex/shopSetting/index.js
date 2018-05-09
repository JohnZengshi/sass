/*
 * 设置-> 店铺设置专用  @Gavin
 *
 * */

const store = {
    
    state: {
       shopV : 1
    },
    
    mutations: {
        ['WORK_POPUP_AUDIT'] (state, parm) {
            //state.popupAudit = parm
            console.log(state,parm)
        }
    },
    
    gettters:{
      shop : (state) => state.shopV 
    },
    
    actions:{
       fatch({commit},data){
         console.log(arguments) 
       }
    }
}
export default store;



























