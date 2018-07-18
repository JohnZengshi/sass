import memberManage from './../../layouts/member-manage'
import member from './member.js'
const memberRouter = {
  path: '/memberManage',
  component: memberManage,
  name: "会员管理",
  children: [...member]
}
export default memberRouter