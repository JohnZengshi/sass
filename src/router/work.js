import Work from "./../layouts/Work"
import ApplyIndex from "./../layouts/Work/ApplyIndex.vue"
import storage from "./apply/storage.js"
import sipping from "./apply/sipping.js"
import amend from "./apply/amend.js"
import salesReturn from "./apply/salesReturn.js"
import transferCabinet from "./apply/transferCabinet.js"
import transferStorage from "./apply/transferStorage.js"
import storageReturn from "./apply/storageReturn.js"
import batchAdd from "./apply/batchAdd.js"
import companySetting from "./apply/companySetting.js"
import miniprogram from "./apply/miniprogram.js"
import addminiprogram from "./apply/addminiprogram.js"
import shopSetting from "./apply/shopSetting.js"
import report from "./apply/report"
import sell from "./apply/sell.js"
import serve from "./apply/serve.js"

import label from "./apply/label.js"
import template from './apply/template' // 模板
const work = {
    path: '/work',
    component: Work,
    children: [{
        path: "",
        component: ApplyIndex,
        name: "工作"
    },
    {...storage},
    {...sipping},
    {...amend},
    {...salesReturn},
    {...transferCabinet},
    {...transferStorage},
    {...storageReturn},
    {...batchAdd},
    {...companySetting},
    {...miniprogram},
    {...addminiprogram},
    {...shopSetting},
    {...sell},
    {...serve},
    {...report},
    {...label},
    {...template}]
}
export default work;
