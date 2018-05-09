import ShopSettingIndex from './../../layouts/Work/ShopSetting'

import goldset from './../../layouts/Work/ShopSetting/shop/tplGoldprice'
import sell from './../../layouts/Work/ShopSetting/shop/tplSell'
import receipt from './../../layouts/Work/ShopSetting/shop/tplReceipt'
import group from './../../layouts/Work/ShopSetting/shop/tplGroup'
const routes = {
    path: 'shopSetting',
    component: ShopSettingIndex,
    children: [
        {path: "", component: goldset},
        {path: "sell", component: sell},
        {path: "receipt", component: receipt},
        {path: "group", component: group},
    ]
}
export default routes;
