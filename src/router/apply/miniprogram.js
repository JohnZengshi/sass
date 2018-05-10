// import CompanySettingIndex from './../../layouts/Work/CompanySetting/index.vue'
import miniprogram from './../../layouts/Work/Miniprogram/miniprogram.vue';

import patternset from "./../../layouts/Work/Miniprogram/miniprogramsetting/patternsetting";
import shopdetail from "./../../layouts/Work/Miniprogram/miniprogramsetting/shopdetail";
import kingpricedetail from "./../../layouts/Work/Miniprogram/miniprogramsetting/kingpricedetail";
import uppershelfset from "./../../layouts/Work/Miniprogram/miniprogramsetting/uppershelfsetting";

const routes = {
    path: 'miniprogram',
    component: miniprogram,
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('isSmallProgram') == 'Y') {
        next()
      }
    },
    children: [
        {path: "", component: patternset},
        {path: 'shopdetail', component: shopdetail},
        {path: 'kingpricedetail', component: kingpricedetail},
        {path: 'uppershelfsetting', component: uppershelfset}
    ]
}
export default routes;