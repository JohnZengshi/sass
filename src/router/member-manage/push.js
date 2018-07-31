// 推送管理
import push from 'layouts/member-manage/push/index'
import noteManage from 'layouts/member-manage/push/noteManage/noteManage'
import createNote from 'layouts/member-manage/push/noteManage/createNote'
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
            path:'createNote',
            name:'新增短信',
            component:createNote,
        }]
    },
    
]
export default routs;