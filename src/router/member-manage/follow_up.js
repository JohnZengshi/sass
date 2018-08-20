// 跟进管理
import followUpList from './../../layouts/member-manage/follow-up/follow-up-list.vue'
import followUpManage from './../../layouts/member-manage/follow-up/follow-up-manage.vue'

const routes = [
  {
    path: "followUpList",
    name: "我的推送",
    component: followUpList
  },
  {
    path: "followUpManage",
    name: "跟进管理",
    component: followUpManage
  },
  
]
export default routes;