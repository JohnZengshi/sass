<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title"><i class="iconfont icon-liebiao"></i>首饰类别 <span class="add-btn" @click="addBigClass">+类型</span></div>
            <div class="model-content" v-loading="isLoading" element-loading-text="拼命加载中">
                <draggable element="div" v-model="dataList" :options="dragOptionsBig" @end="onEnd">
                    <div class="type-block" v-for="(item, index) in dataList"> <!-- v-for="(item, index) in dataList" -->
                        <div class="item-mask"></div>
                        <div class="item-title" style="cursor: pointer;" @click.stop="operateItem1(item, index)">{{item.classesName}} <span class="add-btn" @click.stop="addDialogAct(item, index, 4)">+分类</span></div>
                        <draggable element="ul" v-model="item.childrenList" :options="dragOptions" class="type-block-main" @end="onEnd1"> 
                                <li class="type-block-item" :bigClass="item.classesId" :attId="element.classesId" @click.stop="operateItem(element, item, index)" v-for="element in item.childrenList" :key="element.classesId"> <!-- v-for="element in item.childrenList" -->
                                    <span>{{element.classesName}}</span>
                                    <!--<i class="handle iconfont icon-bianji" ></i>-->
                                </li>
                                
                        </draggable>
                    </div>
                </draggable>
            </div>
            <div>
                <el-dialog :visible.sync="addDialog" customClass="addDig">
                    <div class="title" slot="title">
                        <img src="./../../../../../static/img/piliang.png">
                        <div>添加首饰类别大类</div>
                    </div>
                    <div class="body">
                        <input v-model="addTypeText" type="text" placeholder="输入首饰类别">
                    </div>
                    <div class="foot" solt="footer">
                        <div class="ope-btn" @click="insertProductType">确定</div>
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="addDialog1" customClass="addDig">
                    <div class="title" slot="title">
                        <img src="./../../../../../static/img/piliang.png">
                        <div>添加首饰类别小类</div>
                    </div>
                    <div class="body1">
                        <div class="body1-wrap">
                            <input class="input1" v-model="addTypeText" type="text" placeholder="输入首饰类别">
                            <!--<el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in option"
                                :key="item"
                                :label="item"
                                :value="item">
                                </el-option>
                            </el-select>-->
                        </div>
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
                        :option="option"
                        @messageBack="msgBack"
                        @delAction="delBack"
                        :bigClass="bigClass"
                    >
                    </big-popup>
                </el-dialog>
                <el-dialog :visible.sync="margeDialog" customClass="margeDig">
                    <marge-popup
                        classType='3'
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
            type: null,
            operateDialog: false,
            item: '',
            isLoading: true,
            value: '',
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
            stockType: 10,
            itemId: '',
            classesName: '',
            classesId: '',
            option: ['无', '990', '999', '999.9', '999.99', '3D']
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
                console.log(this.item)
                this.delBack({item: {classesId: this.item.classesId}, type: 5})
            }
            this.successDialog = false
        },
        margeInfoBack (val) {
            this.margeDialog = val.flag
            this.successDialog = true
            this.productClassList()
        },
        delBack (val) { // 删除项目的返回
            console.log(val)
            this.bigClass = false
            var delType = null
            if (val.type == 2) {
                delType = 1
            } else if (val.type == 5) {
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
                'type': '3'
            }
            operateDelProductClasses(options).then((res) => {
                console.log(res)
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
            console.log(val)
            this.operateDialog = val.status
            this.bigClass = false
            //this.operateProductType(val.operateId, val.operateName)
            if (val.type == 5) { // 小类
                this.operateProductType1(val.operateId, val.operateName)
            } else if (val.type == 2) { // 大类
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
            this.type = 5
            this.stockType = 10
            this.indexFlag = index
            this.bigClass = false
            // eventBus.$emit("updateData", this.item)
            console.log(item)
        },
        operateItem1 (item, index) { // 修改操作
            this.operateDialog = true;
            this.item = item
            this.type = 2
            this.indexFlag = index
            this.bigClass = true
            // eventBus.$emit("updateData", this.item)
            console.log(item)
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
            //console.log(evt.target.getElementsByClassName('item-title')[0].innerText)
            // console.log(evt.item.getElementsByClassName('item-title')[0].innerText)
            console.log(this.dataList)
            // console.log(evt.newIndex)
            // console.log(evt.to)
            // console.log(evt.from)
            console.log(evt.item)
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
            //console.log(22222)
            let choseName = ''
            let attr = evt.item.attributes.attid.nodeValue
            let bigId = evt.item.attributes.bigclass.nodeValue
            for (let k = 0; k < this.dataList.length; k++) {
                for (let p = 0; p < this.dataList[k].childrenList.length; p++) {
                    if (this.dataList[k].childrenList[p].classesId == attr) {
                        choseName = this.dataList[k].classesName
                        //console.log(this.dataList[k])
                        //console.log(this.dataList[k].childrenList[p])
                    }
                }
            }
            //console.log(choseName)
            let bigClassId = ''
            let secondClassId = ''
            for (let i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].classesName == choseName) {
                    console.log(this.dataList[i].childrenList)
                    bigClassId = this.dataList[i].classesId
                    for (let j = 0; j < this.dataList[i].childrenList.length; j++) {
                        if (this.dataList[i].childrenList[j].classesName == evt.item.innerText && this.dataList[i].childrenList[j].classesId != attr) {
                            //console.log(this.dataList[i].childrenList[j].classesName)
                            //console.log(evt.item.innerText)
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
                    type: 4,
                    fromId: firstId,
                    toId: secondId
            }
            this.$confirm('此操作将合并此类下的数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            }).then(() => { 
                seekDataMigration(options).then((res) => {
                    console.log(res)
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
                    console.log(res)
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
                'type': '3'
            }
            operateDelProductClasses(options).then((res) => {
                //console.log(res)
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
            //console.log(item)
            //console.log(this.addDialog1)
            this.addDialog1 = true
            this.indexFlag = index
            this.classesName = this.dataList[this.indexFlag].classesName
            this.classesId = this.dataList[this.indexFlag].classesId
            this.indexType = type
            this.addTyleFlag = 2
        },
        addDialogAct1 () { // type 4 新增
            //console.log(item)
            //console.log(this.addDialog1)
            this.addDialog1 = true
            // this.indexFlag = index
            this.addTyleFlag = 2
        },
        operateProductType (id, data, val) { // 操作按钮
            let optiosn = {
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
                "type": "3" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性    
            }
            operateProductClasses(optiosn).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    // this.dataList = res.data.data.list
                    this.indexFlag = null
                    this.indexType = null
                    this.addDialog = false
                    this.addTypeText = ''
                    this.productClassList()
                }
            }, (res) => {
                console.log(res)
            })    
        },
        operateProductType1 (id, data) { // 操作按钮
            let optiosn = {
                "handleType": '2', // 1 新增大小一起 2 修改（只有类型1 2 3 最高级可以修改）3 新增单独大类 4 新增单独小
                "list": {
                    "childrenList": [
                        {
                        "classesId": id,
                        "classesName": data, // 子级名称
                        "pName": '',
                        "subName": ''
                        }
                    ],
                    "classesName": this.dataList[this.indexFlag].classesName, //item.classesName, // 最高级名
                    "classesId": this.dataList[this.indexFlag].classesId  //item.classesId // 最高级ID
                },
                "type": "3" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
            }
            operateProductClasses(optiosn).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    // this.dataList = res.data.data.list
                    this.indexFlag = null
                    this.indexType = null
                    this.addDialog = false
                    this.addTypeText = ''
                    this.productClassList()
                }
            }, (res) => {
                console.log(res)
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
                    "type": "3" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
                }
                operateProductClasses(optiosn).then((res) => {
                    console.log(res)
                    if (res.data.state == 200) {
                        // this.dataList = res.data.data.list
                        this.indexFlag = null
                        this.indexType = null
                        eventBus.$emit('addBack', {type: "big", classId: res.data.data.classesId})
                        this.addDialog = false
                        this.addTypeText = ''
                        this.productClassList()
                    } else {
                        this.$store.dispatch('workPopupError', res.data.msg);
                    }
                }, (res) => {
                    console.log(res)
                })
            } else {
                this.productClasses(this.indexFlag, this.indexType)
            }
            
        },
        productClasses (index, type) { // 新增商品类别
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
                "type": "3" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
            }
            operateProductClasses(optiosn).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    // this.dataList = res.data.data.list
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
                console.log(res)
            })
        },
        productClassList () { // 商品类别列表
            this.isLoading = true
            let options = {
                "type": "3",
                "userId": sessionStorage.getItem("id")
            }
            seekProductClassList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.dataList = res.data.data.list
                    this.isLoading = false
                }
            }, (res) => {
                console.log(res)
            })
        }
    }
}
</script>
<style lang="scss" src="./../newSetting.scss" scoped></style>
<style lang="scss" src="./../dialogSetting.scss"></style>
<style lang="scss" scoped>

</style>