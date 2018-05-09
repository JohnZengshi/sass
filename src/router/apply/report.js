/**
 * Created by john on 2017/6/16.
 */
import ReportIndex from './../../layouts/Work/Report/ReportIndex.vue'
// import Report from './../../layouts/Work/Report/Report.vue'
import Sell from './../../layouts/Work/Report/ReportData/SellReport.vue'
import DgReport from './../../layouts/Work/Report/ReportData/DgReport.vue'
import DkReport from './../../layouts/Work/Report/ReportData/DkReport.vue'
import TkReport from './../../layouts/Work/Report/ReportData/TkReport.vue'
import ThReport from './../../layouts/Work/Report/ReportData/ThReport.vue'
import FhReport from './../../layouts/Work/Report/ReportData/FhReport.vue'
import XgReport from './../../layouts/Work/Report/ReportData/XgReport.vue'
import RkReport from './../../layouts/Work/Report/ReportData/RkReport.vue'
import ReportIndexPage from './../../layouts/Work/Report/ReportData/ReportIndexPage.vue'
const routes = {
  path: 'report',
  component: ReportIndex,
  //redirect: '/work/report/reportindex',
  children: [
    {path: "", component: ReportIndexPage},
    {path: "sellreport", component: Sell},
    {path: "dgreport", component: DgReport},
    {path: "dkreport", component: DkReport},
    {path: "tkreport", component: TkReport},
    {path: "threport", component: ThReport},
    {path: "fhreport", component: FhReport},
    {path: "rkreport", component: RkReport},
    {path: "xgreport", component: XgReport},
  ]
}
export default routes;
