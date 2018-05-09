
const Leaguer = resolve => require(['../layouts/Leaguer'], resolve)
const NewLeaguer = resolve => require(['../layouts/Leaguer/NewLeaguer'], resolve)
const FollowUp = resolve => require(['../layouts/Leaguer/FollowUp'], resolve)
const ShortMessage = resolve => require(['../layouts/Leaguer/ShortMessage'], resolve)
const IntentionClient = resolve => require(['../layouts/Leaguer/IntentionClient'], resolve)
const leaguer = {
    path: '/leaguer',
    component: Leaguer,
    name: '登录',
    redirect: '/leaguer/newLeaguer',
    children: [
        {path: 'newLeaguer', component: NewLeaguer},
        {path: 'followUp', component: FollowUp},
        {path: 'shortMessage', component: ShortMessage},
        {path: 'intentionClient', component: IntentionClient}
    ]
}
export default leaguer