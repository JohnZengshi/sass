// 调柜
import transferCabinetIndex from './../../layouts/Work/TransferCabinet/index.vue'
import transferCabinet from './../../layouts/Work/TransferCabinet/TransferCabinet.vue'
import newTransferCabinet from './../../layouts/Work/TransferCabinet/NewTransferCabinet.vue'
import detailTransferCabinetTable from './../../layouts/Work/TransferCabinet/DetailTransferCabinetTable.vue'
import printDG from './../../layouts/Work/CommonalityComponent/formTemplate/dataTable/Canbiet.vue'
const routes = {
    path: 'transferCabinet',
    component: transferCabinetIndex,
    children: [
        {path: "", component: transferCabinet},
        {path: "newTransferCabinet", component: newTransferCabinet},
        {path: "printDG", component: printDG},
        {path: "detailTransferCabinetTable", component: detailTransferCabinetTable},
    ]
}
export default routes;
