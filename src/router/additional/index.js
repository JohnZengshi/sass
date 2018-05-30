import dataCenter from './../../layouts/data-center'
import lablePrint from './lable_print.js'
const additionalRouter = {
  path: '/dataCenter',
  component: dataCenter,
  name: "数据中心",
  children: [...lablePrint]
}
export default additionalRouter