// 会员管理
import memberList from './../../layouts/member-manage/member/member-list'
import jt from './../../layouts/member-manage/member/jt'
import interflow from './../../layouts/member-manage/member/interflow'
import compileTemplate from './../../layouts/member-manage/member/compile-template'
import addTemplate from './../../layouts/member-manage/member/add-template'
import discount from './../../layouts/member-manage/member/discount'

const routes = [
    {
      path: "memberList",
      name: "会员列表",
      component: memberList
    },
    {
      path: "jt",
      name: "截图",
      component: jt
    },
    {
      path: "interflow",
      name: "会员互通",
      component: interflow
    },
    {
      path: "compileTemplate",
      name: "编辑模板",
      component: compileTemplate
    },
    {
      path: "addTemplate",
      name: "新增模板",
      component: addTemplate
    },
    {
      path: "discount",
      name: "销售折扣",
      component: discount
    }
]
export default routes;