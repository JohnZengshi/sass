import serveIndex from './../../layouts/Work/serve'
import serve from './../../layouts/Work/serve/serve.vue'
import serveReceiptsList from './../../layouts/Work/serve/serveReceiptsList'
// import productList from "./../../layouts/Work/serve/components/ProductList" // 产品列表
const routes = {
    path: 'serve',
    component: serveIndex,
    name: "销售单据",
    children: [
        {path: "", component: serve, name: "销售单据"},
        {
            path: "serveReceiptsList",
            component: serveReceiptsList,
            name: "产品列表"
            // children: [
            //     {path: "", component: productList, name: "产品列表"}
            // ]
        }
    ]
}
export default routes;
