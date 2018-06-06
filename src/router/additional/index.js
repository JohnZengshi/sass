import dataCenter from './../../layouts/data-center'
import labelPrint from './label_print.js'
const additionalRouter = {
  path: '/dataCenter',
  component: dataCenter,
  name: "数据中心",
  children: [...labelPrint]
}
export default additionalRouter