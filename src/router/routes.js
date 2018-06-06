const Main = resolve => require(['../layouts/Main'], resolve) // 首页
// const message = resolve => require(['../layouts/Message'], resolve) // 即时通讯
const OrganizationChart = resolve => require(['../layouts/organizationChart/OrganizationChart'], resolve) // 组织架构
const StockStatement = resolve => require(['../layouts/stock/StockStatement'], resolve)
const jinbaifu = resolve => require(['../layouts/jinbaifu/index'], resolve)
const text = resolve => require(['../layouts/text/text'], resolve)


import member from './member' // 登录注册
import additional from './additional' // 数据中心

import IM from './IM' // 通讯录
import Message from './../layouts/Message/Message' // 通讯录
import admin from './admin' // 我的(个人中心)
import work from './work' // 工作
import leaguer from './leaguer' // 会员
import faceRecognitionRouter from './faceRecognition' // 人脸识别
import MainIndex from './../layouts/Main_Index'
import Notice from './../layouts/Notice/index'
import DataCenter from './../layouts/DataCenter'
import HelpCenter from './../layouts/HelpCenter/HelpCenter'
import BillSearch from './../layouts/SearchPage/BillSearch'
import GoodsSearch from './../layouts/SearchPage/GoodsSearch'
import Inventory from './../layouts/Inventory/Inventory'
/*
  分为 Main 和 member 两部分
  Main 为项目主内容
  member 为用户登录内容
*/
const routes = [{
  path: '/',
  name: 'Index',
  component: Main,
  children: [
  {
    path: '',
    redirect: 'mainIndex'
  },
  {
    path: 'message',
    component: Message,
    name: 'Message'
  },
  {
    path: 'notice',
    component: Notice,
    name: 'Notice'
  },
  {
    path: 'mainIndex',
    component: MainIndex,
    name: 'MainIndex'
  },
  {
    path: 'goodsSearch',
    component: GoodsSearch,
    name: 'GoodsSearch'
  },
  {
    path: 'inventory',
    component: Inventory,
    name: 'Inventory'
  },
  {
    path: 'billSearch',
    component: BillSearch,
    name: 'BillSearch'
  },
  {
    path: 'helpCenter',
    component: HelpCenter,
    name: 'HelpCenter'
  },
  {
    path: 'dataCenter',
    component: DataCenter,
    name: 'DataCenter'
  },
  {
    path: 'organizationChart',
    component: OrganizationChart,
    name: '组织架构'
  },
  {
    path: 'jinbaifu',
    component: jinbaifu,
    name: '金百福'
  },
  {
    path: 'text',
    component: text,
    name: 'text'
  },
  {
    path: 'stockStatement',
    component: StockStatement,
    name: '库存'
  },
  {...additional},
  {...admin},
  {...leaguer},
  {...faceRecognitionRouter},
  {...work}]
}]
routes.push(member)
export default routes