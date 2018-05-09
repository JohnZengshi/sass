import sippingIndex from './../../layouts/Work/Sipping/index.vue'
import sipping from './../../layouts/Work/Sipping/Sipping.vue'
import newSipping from './../../layouts/Work/Sipping/NewSipping.vue'
import detailSippingTable from './../../layouts/Work/Sipping/DetailSippingTable.vue'
import printFH from './../../layouts/Work/CommonalityComponent/formTemplate/dataTable/sendGoods.vue'
const routes = {
    path: 'sipping',
    component: sippingIndex,
    children: [
        {path: "", component: sipping, name: "发货"},
        {path: "newSipping", component: newSipping, name: "新建单据"},
        {path: "printFH", component: printFH},
        {path: "detailSippingTable", component: detailSippingTable}
    ]
}
export default routes;
