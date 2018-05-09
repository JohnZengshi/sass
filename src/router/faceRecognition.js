const FaceRecognition = resolve => require(['../layouts/FaceRecognition'], resolve)
const VisitList = resolve => require(['../layouts/FaceRecognition/VisitList'], resolve)
const EquipmentList = resolve => require(['../layouts/FaceRecognition/EquipmentList'], resolve)
const DataStatement = resolve => require(['../layouts/FaceRecognition/DataStatement'], resolve)
const faceRecognitionRouter = {
    path: '/faceRecognition',
    component: FaceRecognition,
    name: '登录',
    children: [
        {path: 'visitList', component: VisitList},
        {path: 'equipmentList', component: EquipmentList},
        {path: 'DataStatement', component: DataStatement}
    ]
}
export default faceRecognitionRouter