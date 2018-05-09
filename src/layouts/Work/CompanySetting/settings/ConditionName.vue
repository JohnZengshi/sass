<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title"><i class="iconfont icon-liebiao"></i>成色名称 <span class="add-btn" @click="addBigClass">+类型</span></div>
            <div class="model-content" v-loading="isLoading" element-loading-text="拼命加载中">
                <draggable element="div" v-model="dataList" :options="dragOptionsBig" @end="onEnd">
                    <div class="type-block" v-for="(item, index) in dataList"> <!-- v-for="(item, index) in dataList" -->
                        <div class="item-mask"></div>
                        <div class="item-title" style="cursor: pointer;" @click.stop="operateItem1(item)">{{item.classesName}} <span class="add-btn" @click.stop="addDialogAct(item, index, 4)">+分类</span></div>
                        <draggable element="ul" v-model="item.childrenList" :options="dragOptions" class="type-block-main" @end="onEnd1"> 
                                <li class="type-block-item" :bigClass="item.classesId" :attId="element.classesId"  @click="operateItem(element, item, index)" v-for="element in item.childrenList" :key="element.classesId"> <!-- v-for="element in item.childrenList" -->
                                    <span>{{element.classesName}}</span>
                                    <!--<i class="handle iconfont icon-bianji"></i>-->
                                </li>
                        </draggable>
                    </div>
                </draggable>
            </div>
            <div>
                <el-dialog :visible.sync="addDialog" customClass="addDig">
                    <div class="title" slot="title">
                        <img src="./../../../../../static/img/piliang.png">
                        <div>添加成色大类</div>
                    </div>
                    <div class="body">
                        <input v-model="addTypeText" type="text" placeholder="输入成色名称">
                    </div>
                    <div class="foot" solt="footer">
                        <div class="ope-btn" @click="insertProductType">确定</div>
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="addDialog1" customClass="addDig">
                    <div class="title" slot="title">
                        <img src="./../../../../../static/img/piliang.png">
                        <div>添加成色小类</div>
                    </div>
                    <div class="body1">
                        <div class="body1-wrap">
                            <input v-model="addTypeText" type="text" placeholder="输入成色名称">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option-group
                                    v-for="group in options3"
                                    :key="group.label"
                                    :label="group.label"
                                >
                                    <el-option
                                    v-for="item in group.option"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </div>
                        <p class="explain">
                            标识只做产品分类使用，打印标签和质保单时不出现。（注：标识并不是含金量）
                        </p>
                    </div>
                    <div class="foot" solt="footer">
                        <div class="ope-btn" @click="productClasses(1, 4)">确定</div>
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="operateDialog" customClass="operateDig">
                    <big-popup
                        :item='item'
                        :type='type'
                        isMerge='1'
                        :stockType='stockType'
                        :option="options3[0].option"
                        @messageBack="msgBack"
                        @delAction="delBack"
                        :bigClass="bigClass"
                    >
                    </big-popup>
                </el-dialog>  
                <el-dialog :visible.sync="margeDialog" customClass="margeDig">
                    <marge-popup
                        classType='1'
                        :startId='startId'
                        :itemId='itemId'
                        @margeBack="margeInfoBack"
                        @openDialog="openDialog"
                    >
                    </marge-popup>
                </el-dialog>
                <el-dialog :visible.sync="successDialog" customClass="successDig">
                    <div class=" title" slot="title">
                        <img src="./../../../../assets/img/success.png">
                        <div>合并成功</div>
                    </div>
                    <div class="body">
                        <input type="checkbox" v-model="checked"/>合并后是否删除原类别?
                        <div class="btn" @click="confirmBtn">确定</div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </transition>
</template>
<script>
import {seekProductClassList} from './../../../../Api/commonality/seek'
import {operateProductClasses, operateProductClassesOrderBy, operateDelProductClasses, seekDataMigration} from './../../../../Api/commonality/operate'
import BigPopup from './../settingComponents/bigPopup'
import MargePopup from './../settingComponents/margePopup'

import draggable from 'vuedraggable'
export default {
    data () {
        return {
            checked:false,
            successDialog: false,
            startId: '', // 交换的id
            margeDialog: false,
            isLoading: true,
            type: null,
            operateDialog: false,
            item: '',
            isLoading: true,
            value: '无(标识)',
            addTyleFlag: null,
            addTypeText: '',
            addDialog1: false,
            addDialog: false,
            bigClass: false,
            dataList: [],
            lastClassId: '',
            indexFlag: null,
            indexType: null,
            orderByList: [],
            itemId: '',
            stockType: 8,
            classesName: '',
            classesId: '',
            options3: [{label: '选择标识', option: ['无', '990', '999', '999.9', '999.99', '3D']}]
        }
    },
    components: {
        MargePopup,
        BigPopup,  // 操作弹框
        draggable //拖动插件
    },
    created () {
        this.productClassList()
    },
    mounted () {
        $(".model-content").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            scrollInertia: 500,
        })
    },
    computed: {
        dragOptionsBig () { // 大类拖动配置
            return  {
                animation: 150,
                group: 'goldGroupBig',
                // handle: ".handle",
                ghostClass: 'bigGhost',
                chosenClass: 'chosenBig',
                forceFallback: true,
                scroll: true,
                // selectedClass: 'select-active',
                // dragClass: 'select-active'
            };
        },
        dragOptions () { // 小类拖动配置
            return  {
                animation: 150,
                group: 'goldGroup',
                // handle: ".handle",
                ghostClass: 'ghost',
                chosenClass: 'chosen',
                forceFallback: true
                // selectedClass: 'select-active',
                // dragClass: 'select-active'
            };
        },
    },
    methods: {
        openDialog (val) {
            this.classesName = val.classesName
            this.classesId = val.classesId
            if (val.type == 1) {
                this.addBigClass()
            } else {
                this.addDialogAct1 (this.item, this.indexFlag, 4)
            }
        },
        confirmBtn () { // 合并成功后的事件
            if (this.checked == true) {
                this.delBack({item: {classesId: this.item.classesId}, type: 3})
            }
            this.successDialog = false
        },
        margeInfoBack (val) {
            this.margeDialog = val.flag
            this.successDialog = true
            this.productClassList()
        },
        delBack (val) { // 删除项目的返回
            this.bigClass = false
            var delType = null
            if (val.type == 2) {
                delType = 1
            } else if (val.type == 3) {
                delType = 2
            }
            let options = {
                'list': {
                    'childrenList': [
                        {
                            'classesId': val.item.classesId
                        }
                    ],
                    'classesId': val.type == 2 ? val.item.classesId : this.itemId,
                    'classesName': ''
                },
                'topClasses': delType,
                'type': '1'
            }
            operateDelProductClasses(options).then((res) => {
                if (res.data.state == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.operateDialog = false
                    this.productClassList()
                    this.checked = false
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        msgBack (val) { // 弹框返回的信息
            this.operateDialog = val.status
            this.bigClass = false
            if (val.pName != '' && val.subName != '' || val.pName != '' && val.subName != '无') {
                this.addTypeText = val.pName
                this.value = val.subName
                // if (this.bigClass == true) {
                //     this.addTypeText = val.operateName
                // }
                this.litleProductClasses(2, val.operateId, val.operateName)
            } else {
                this.operateProductType(val.operateId, val.operateName, val)
            }
            if (val.type == 10) {
                this.margeDialog = true
                this.startId = val.operateId
            }
        },
        operateItem (element, item, index) { // 修改操作
            this.operateDialog = true;
            this.item = element
            this.itemId = item.classesId
            this.type = 3
            this.stockType = 8
            this.indexFlag = index
            this.bigClass = false
            // eventBus.$emit("updateData", this.item)
        },
        operateItem1 (item) { // 修改操作
            this.operateDialog = true;
            this.item = item
            this.type = 2
            this.bigClass = true
            // eventBus.$emit("updateData", this.item)
        },
        addBigClass () { // 新增成色大类
            this.addDialog = true
            this.addTyleFlag = 1
            
        },
        productClassesOrderBy () { // 大类排序
            let options = {
                type: '1',
                childrenList: this.orderByList
            }
            operateProductClassesOrderBy(options).then((res) => {
                if (res.data.state == 200) {
                    this.orderByList = []
                    // this.$message({
                    //     type: 'success',
                    //     message: '操作成功!'
                    // })
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        productClassesOrderBy1 (bigClassId) { // 小类排序
            let options = {
                type: '2',
                classesId: bigClassId,
                childrenList: this.orderByList
            }
            operateProductClassesOrderBy(options).then((res) => {
                if (res.data.state == 200) {
                    this.orderByList = []
                    // this.$message({
                    //     type: 'success',
                    //     message: '操作成功!'
                    // })
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        productClassesOrderBy2 (bigClassId, oldId, smallId) { // 小类排序
            let options = {
                type: '3',
                classesId: bigClassId,
                oldClassId: oldId,
                smallClassId: smallId,
                childrenList: this.orderByList
            }
            operateProductClassesOrderBy(options).then((res) => {
                if (res.data.state == 200) {
                    this.orderByList = []
                    // this.$message({
                    //     type: 'success',
                    //     message: '操作成功!'
                    // })
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        onEnd (evt) { // 大类拖动排序
            for (let i = 0; i < this.dataList.length; i++) {
                //if (this.dataList[i].classesName == choseName) {
                this.orderByList.push({
                    classesId: this.dataList[i].classesId,
                    classesName: this.dataList[i].classesName,
                    orderBy: i + 1
                })
                //}
            }
            this.productClassesOrderBy()
        },
        onEnd1 (evt) { // 小类拖动排序
            let choseName = ''
            let attr = evt.item.attributes.attid.nodeValue // 当前小类id
            let bigId = evt.item.attributes.bigclass.nodeValue // 大类id
            for (let k = 0; k < this.dataList.length; k++) {
                for (let p = 0; p < this.dataList[k].childrenList.length; p++) {
                    if (this.dataList[k].childrenList[p].classesId == attr) {
                        choseName = this.dataList[k].classesName
                    }
                }
            }
            let bigClassId = ''
            let secondClassId = ''
            for (let i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].classesName == choseName) {
                    bigClassId = this.dataList[i].classesId
                    for (let j = 0; j < this.dataList[i].childrenList.length; j++) {
                        if (this.dataList[i].childrenList[j].classesName == evt.item.innerText && this.dataList[i].childrenList[j].classesId != attr) {
                            secondClassId = this.dataList[i].childrenList[j].classesId
                            this.dataMigration(attr, secondClassId)
                        } else {
                            this.orderByList.push({
                                classesId: this.dataList[i].childrenList[j].classesId,
                                classesName: this.dataList[i].childrenList[j].classesName,
                                orderBy: j + 1
                            })
                        } 
                    }
                }
            }
            if (bigClassId == bigId) {
                this.productClassesOrderBy1(bigClassId)
            } else {
                this.productClassesOrderBy2(bigClassId, bigId, attr)
            }
            
        },
        dataMigration (firstId, secondId) { // 数据合并
            let options = {
                    type: 2,
                    fromId: firstId,
                    toId: secondId
            }
            this.$confirm('此操作将合并此类下的数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(() => { 
                seekDataMigration(options).then((res) => {
                    if (res.data.state == 200) {
                        this.$message({
                            type: 'success',
                            message: '数据合并成功!'
                        })
                        this.deleteLittleClass(firstId)
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                }, (res) => {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
            
        },
        deleteLittleClass (id) {
            let options = {
                'list': {
                    'childrenList': [
                        {
                            'classesId': id
                        }
                    ],
                    'classesId': '',
                    'classesName': ''
                },
                'topClasses': 2,
                'type': '1'
            }
            operateDelProductClasses(options).then((res) => {
                if (res.data.state == 200) {
                    this.productClassList()
                } else {
                }
            }, (res) => {
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        addDialogAct (item, index, type) { // type 4 新增
            this.indexFlag = index
            //this.item = item
            this.classesName = this.dataList[index].classesName
            this.classesId = this.dataList[index].classesId
            this.indexType = type
            this.addDialog1 = true
            this.addTyleFlag = 2
        },
        addDialogAct1 () { // type 4 新增
            this.addDialog1 = true
            // this.indexFlag = index
            this.addTyleFlag = 2
        },
        operateProductType (id, data, val) { // 操作按钮
            let optiosn = {
                // "handleType": '2', // 1 新增大小一起 2 修改（只有类型1 2 3 最高级可以修改）3 新增单独大类 4 新增单独小
                // "list": {
                //     "classesName": data, //item.classesName, // 最高级名
                //     "classesId": id  //item.classesId // 最高级ID
                // },
                // "type": "1" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
                "handleType": '2', // 1 新增大小一起 2 修改（只有类型1 2 3 最高级可以修改）3 新增单独大类 4 新增单独小
                "list": {
                    "childrenList": [
                        {
                        "classesId": id,
                        "classesName": data, // 子级名称
                        "pName": val.pName,
                        "subName": val.subName
                        }
                    ],
                    "classesName": '', //item.classesName, // 最高级名
                    "classesId": ''  //item.classesId // 最高级ID
                },
                "type": "1" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
            }
            operateProductClasses(optiosn).then((res) => {
                if (res.data.state == 200) {
                    // this.dataList = res.data.data.list
                    this.indexFlag = null
                    this.indexType = null
                    this.addDialog = false
                    this.addTypeText = ''
                    this.productClassList()
                }
            }, (res) => {
            })    
        },
        insertProductType () { // 确定操作
            if (this.addTyleFlag == 1) {
                let optiosn = {
                    "handleType": '3', // 1 新增大小一起 2 修改（只有类型1 2 3 最高级可以修改）3 新增单独大类 4 新增单独小
                    "list": {
                        "classesName": this.addTypeText, //item.classesName, // 最高级名
                        "classesId": ''  //item.classesId // 最高级ID
                    },
                    "type": "1" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
                }
                operateProductClasses(optiosn).then((res) => {
                    if (res.data.state == 200) {
                        // this.dataList = res.data.data.list
                        this.indexFlag = null
                        this.indexType = null
                        this.addDialog = false
                        eventBus.$emit('addBack', {type: "big", classId: res.data.data.classesId})
                        this.addTypeText = ''
                        this.productClassList()
                    } else {
                        this.$store.dispatch('workPopupError', res.data.msg);
                    }
                }, (res) => {
                })
            } else {
                this.productClasses(this.indexFlag, this.indexType)
            }
            
        },
        productClasses (index, type) { // 新增商品类别
            if (this.value == '无' || this.value == '无(标识)') {
                this.value = ''
            } else if (this.value == undefined) {
                this.value = ''
            } 
            let optiosn = {
                "handleType": type, // 1 新增大小一起 2 修改（只有类型1 2 3 最高级可以修改）3 新增单独大类 4 新增单独小
                "list": {
                    "childrenList": [
                        {
                        "classesName": this.addTypeText + this.value, // 子级名称
                        "pName": this.addTypeText,
                        "subName": this.value
                        }
                    ],
                    "classesName": this.classesName, //item.classesName, // 最高级名
                    "classesId": this.classesId  //item.classesId // 最高级ID
                },
                "type": "1" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
            }
            operateProductClasses(optiosn).then((res) => {
                if (res.data.state == 200) {
                    this.indexFlag = null
                    this.indexType = null
                    this.addDialog1 = false
                    eventBus.$emit('addBack', {type: "small", classId: res.data.data.classesId})
                    this.addTypeText = ''
                    this.productClassList()
                } else {
                    this.$store.dispatch('workPopupError', res.data.msg);
                }
            }, (res) => {
            })
        },
        litleProductClasses (type, id, data) { // 新增商品类别
            if (this.value == '无') {
                this.value = ''
            }
            let options = {
                "handleType": type, // 1 新增大小一起 2 修改（只有类型1 2 3 最高级可以修改）3 新增单独大类 4 新增单独小
                "list": {
                    "childrenList": [
                        {
                        "classesId": id,
                        "classesName": data, // 子级名称
                        "pName": this.addTypeText,
                        "subName": this.value
                        }
                    ],
                    "classesName": this.classesName, //item.classesName, // 最高级名
                    "classesId": this.classesId  //item.classesId // 最高级ID
                },
                "type": "1" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
            }
            operateProductClasses(options).then((res) => {
                if (res.data.state == 200) {
                    // this.dataList = res.data.data.list
                    this.indexFlag = null
                    this.indexType = null
                    this.addDialog1 = false
                    this.addTypeText = ''
                    this.productClassList()
                } else {
                    this.$store.dispatch('workPopupError', res.data.msg);
                }
            }, (res) => {
            })
        },
        productClassList () { // 商品类别列表
            this.isLoading = true
            let options = {
                "type": "1",
                "userId": sessionStorage.getItem("id")
            }
            seekProductClassList(options).then((res) => {
                if (res.data.state == 200) {
                    this.dataList = res.data.data.list
                    this.isLoading = false
                }
            }, (res) => {
            })
        }
    }
}
</script>
<style lang="scss" src="./../newSetting.scss" scoped></style>
<style lang="scss" src="./../dialogSetting.scss"></style>
<style lang="scss" scoped>

</style>