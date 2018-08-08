import memberManage from './../../layouts/member-manage'
import homePage from './../../layouts/member-manage/home-page'
import member from './member.js'
import followUp from './follow_up.js'
const memberRouter = {
  path: '/memberManage',
  component: memberManage,
  name: "会员管理",
  children: [
    {
      path: '',
      component: homePage,
      name: "会员首页",
    },
    ...member,
    ...followUp]
}
export default memberRouter