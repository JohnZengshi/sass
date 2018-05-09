import StorageIndex from './../../layouts/Work/Storage/StorageIndex.vue'
import Storage from './../../layouts/Work/Storage/Storage.vue'
import NewStockIn from './../../layouts/Work/Storage/NewStockIn.vue'
import StorageDetails from './../../layouts/Work/Storage/'
import NewGoodsDetail from './../../layouts/Work/Storage/NewGoodsDetail.vue'
import DetailStorage from './../../layouts/Work/Storage/DetailStorage.vue'
import printRK from './../../layouts/Work/CommonalityComponent/formTemplate/dataTable/entryStorage.vue'
const routes = {
    path: 'storage',
    component: StorageIndex,
    children: [
        {path: "", component: Storage, name: "入库"},
        {path: "detail", component: StorageDetails, name: "单据"}, //新单据页面
        {path: "NewStockIn", component: NewStockIn, name: "新建单据"},
        {path: "detailStorage", component: DetailStorage, name: "单据详情"},
        {path: "newGoodsDetail", component: NewGoodsDetail, name: "商品明细"},
        {path: 'printRK', component: printRK}
    ]
}
export default routes;
