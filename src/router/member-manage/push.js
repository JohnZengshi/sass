// 推送管理
import push from 'layouts/member-manage/push/index'
import noteManage from 'layouts/member-manage/push/page/noteManage'
import createNote from 'layouts/member-manage/push/page/createNote'
import moduleManage from 'layouts/member-manage/push/page/moduleManage'
import createModule from 'layouts/member-manage/push/page/createModule'
const routs = [
    {
        path:'push',
        name:'推送部分',
        component:push,
        children:[{
            path:'noteManage',
            name:'短信管理',
            component:noteManage,
        },
        {
            path:'moduleManage',
            name:'管理模板',
            component:moduleManage,
        },
        {
            path:'createNote',
            name:'新增短信',
            component:createNote,
        },{
            path:'createModule',
            name:'新增短信模板',
            component:createModule,
        }]
    },
    
]
export default routs;