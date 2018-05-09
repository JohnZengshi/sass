// 调库
import transferStorageIndex from './../../layouts/Work/TransferStorage/index.vue'
import transferStorage from './../../layouts/Work/TransferStorage/TransferStorage.vue'
import newTransferStorage from './../../layouts/Work/TransferStorage/NewTransferStorage.vue'
import detailTransferStorageTable from './../../layouts/Work/TransferStorage/DetailTransferStorageTable.vue'
import printDK from './../../layouts/Work/CommonalityComponent/formTemplate/dataTable/transfer.vue'
const routes = {
    path: 'transferStorage',
    component: transferStorageIndex,
    children: [
        {path: "", component: transferStorage},
        {path: "newTransferStorage", component: newTransferStorage},
        {path: "printDK", component: printDK},
        {path: "detailTransferStorageTable", component: detailTransferStorageTable}
    ]
}
export default routes;
