// 退库
import StorageReturnIndex from './../../layouts/Work/StorageReturn/index.vue'
import StorageReturn from './../../layouts/Work/StorageReturn/StorageReturn.vue'
import NewStorageReturn from './../../layouts/Work/StorageReturn/NewStorageReturn.vue'
import printTK from './../../layouts/Work/CommonalityComponent/formTemplate/dataTable/outStorage.vue'
const routes = {
    path: 'storageReturn',
    component: StorageReturnIndex,
    children: [
        {path: "", component: StorageReturn},
        {path: "newStorageReturn", component: NewStorageReturn},
        {path: "printTK", component: printTK}
    ]
}
export default routes;
