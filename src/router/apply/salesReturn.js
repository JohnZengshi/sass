import salesReturnIndex from './../../layouts/Work/SalesReturn/index.vue'
import salesReturn from './../../layouts/Work/SalesReturn/SalesReturn.vue'
import newSalesReturn from './../../layouts/Work/SalesReturn/NewSalesReturn.vue'
import printTH from './../../layouts/Work/CommonalityComponent/formTemplate/dataTable/outGoods.vue'
const routes = {
    path: 'salesReturn',
    component: salesReturnIndex,
    children: [
        {path: "", component: salesReturn},
        {path: "newSalesReturn", component: newSalesReturn},
        {path: "printTH", component: printTH}
    ]
}
export default routes;
