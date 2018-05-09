import sellIndex from './../../layouts/Work/Sell/index.vue'
import sell from './../../layouts/Work/Sell/Sell.vue'
import sellReceiptsList from './../../layouts/Work/Sell/SellReceiptsList'
import productList from "./../../layouts/Work/Sell/components/ProductList" // 产品列表
import printXS from './../../layouts/Work/CommonalityComponent/formTemplate/dataTable/sellData.vue'
const routes = {
    path: 'sell',
    component: sellIndex,
    name: "销售单据",
    children: [
        {path: "", component: sell, name: "销售单据"},
        {
            path: "sellReceiptsList",
            component: sellReceiptsList,
            name: "产品列表",
            children: [
                {path: "", component: productList, name: "产品列表"}
            ]
        },
        {path: "printXS", component: printXS}
    ]
}
export default routes;
