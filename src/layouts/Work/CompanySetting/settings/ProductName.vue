<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title"><i class="iconfont icon-liebiao"></i>产品类别</div>
            <div class="model-content" v-loading="isLoading" element-loading-text="拼命加载中">
                <div>
                    <div class="type-block">
                        <div class="item-title">计重类 <span class="add-btn" @click="addDialogAct(1)">+分类</span></div>
                        <draggable element="ul" :options="dragOptions" @end="onEnd"  @choose="onChoose" @move="onMove" v-model="goldList" class="type-block-main">
                                <li class="type-block-item" :attId="element.classesId" @click.stop="operateItem(element, 1)" v-for="element in goldList" :key="element.classesId">
                                    <span>{{element.classesName}}</span>
                                    <!--<i class="handle iconfont icon-bianji" ></i>-->
                                </li>
                                
                        </draggable>
                    </div>
                    <div class="type-block">
                        <div class="item-title">计件类<span class="add-btn" @click="addDialogAct(2)">+分类</span></div>
                        <draggable element="ul" :options="dragOptions" @end="onEnd"  @choose="onChoose" @move="onMove" v-model="JewelleryList" class="type-block-main">
                                <li class="type-block-item" :attId="element.classesId" @click.stop="operateItem(element, 2)" v-for="element in JewelleryList" :key="element.classesId">
                                    <span>{{element.classesName}}</span>
                                    <!--<i class="handle iconfont icon-bianji" @click.stop="operateItem(element)"></i>-->
                                </li>
                                
                        </draggable>
                    </div>
                    <!--<div class="type-block">
                        <div class="item-title">饰品类<span class="add-btn" @click="addDialogAct(3)">+分类</span></div>
                        <draggable element="ul" :options="dragOptions2" @end="onEnd"  @choose="onChoose" @move="onMove" v-model="jewelryList" class="type-block-main">
                                <li class="type-block-item" @click.stop="operateItem(element)" v-for="element in jewelryList" :key="element.classesId">
                                    <span>{{element.classesName}}</span>
                                </li>              
                        </draggable>
                    </div>-->
                </div>
            </div>
            <div>
<!--                 <el-dialog :visible.sync="addDialog" customClass="addDig">
                    <div class="title" slot="title">
                        <img src="./../../../../../static/img/piliang.png">
                        <div>添加产品小类</div>
                    </div>
                    <div class="body">
                        <input v-model="addTypeText" type="text" placeholder="输入产品类别">
                    </div>
                    <div class="foot" solt="footer">
                        <div class="ope-btn" @click="insertProductType">确定</div>
                    </div>
                </el-dialog> -->
                
                <el-dialog :visible.sync="operateDialog" customClass="product-class-dig-main">
                    <product-class-popup
                        v-if="operateDialog"
                        :item='item'
                        type="2"  
                        isMerge='1'
                        :stockType='stockType'
                        @messageBack="msgBack"
                        @delAction="delBack"
                        :bigClass="bigClass"
                    >
                    </product-class-popup>
                </el-dialog>
                
                <el-dialog :visible.sync="operateDialog" customClass="operateDig">
                    <big-popup
                        v-if="operateDialog"
                        :item='item'
                        type="2"  
                        isMerge='1'
                        :stockType='stockType'
                        @messageBack="msgBack"
                        @delAction="delBack"
                        :bigClass="bigClass"
                    >
                    </big-popup>
                </el-dialog>
                <el-dialog :visible.sync="margeDialog" customClass="margeDig">
                    <marge-popup
                        classType='5'
                        :startId='startId'
                        :startName="startName"
                        @margeBack="margeInfoBack"
                        @openDialog="openDialog"
                        :selType="selType"
                        addBig="1"
                    >
                    </marge-popup>
                </el-dialog>
                <el-dialog :visible.sync="successDialog" customClass="successDig">
                    <div class=" title" slot="title">
                        <img src="./../../../../assets/img/success.png">
                        <div>合并成功</div>
                    </div>
                    <div class="body">
                        <input type="checkbox" v-model="checked" />合并后是否删除原类别?
                        <div class="btn" @click="confirmBtn">确定</div>
                    </div>
                </el-dialog>
            </div>
        </div>
    </transition>
</template>
<script>
import {getProductTypeList, seekInsertProductType} from './../../../../Api/commonality/seek'
import {operateProductTypeOrderBy, operateDelProductTypeByList, operateUpdateProductType, operateProductTypeDragSord, operateAddClassesRemark} from './../../../../Api/commonality/operate'

import BigPopup from './../settingComponents/bigPopup'
import productClassPopup from './../settingComponents/product-class-popup'
import MargePopup from './../settingComponents/margePopup'

import draggable from 'vuedraggable'
export default {
    data () {
        return {
            checked:false,
            successDialog: false,
            startId: '', // 交换的id
            startName: '', // 交换的id的名字
            margeDialog: false,
            isLoading: true,
            selType: '',
            item: '',  // 弹框数据
            type: null,
            operateDialog: false, // 操作弹窗
            addType: null,
            addTypeText: '', // 商品类型名
            addDialog: false,
            isDragging: false,
            bigClass: false,
            typeList: [],
            goldList: [], // 素金类
            JewelleryList: [], // 珠宝
            jewelryList: [], // 首饰
            orderByList: [],
            stockType: 7,
            classesName: '',
            classesId: '',
            classListType: ''
        }
    },
    components: {
        BigPopup,  // 操作弹框
        MargePopup,
        draggable, //拖动插件
        productClassPopup
    },
    computed: {
        dragOptions () {
            return  {
                animation: 150,
                group: 'goldGroup',
                // handle: ".handle",
                ghostClass: 'ghost',
                chosenClass: 'chosen',
                forceFallback: true,
                scroll: true
                // selectedClass: 'select-active',
                // dragClass: 'select-active'
            };
        },
        dragOptions1 () {
            return  {
                animation: 150,
                group: 'jewelleryGroup',
                // handle: ".handle",
                ghostClass: 'ghost',
                forceFallback: true,
                scroll: true
                
                // selectedClass: 'select-active'
            };
        },
        dragOptions2 () {
            return  {
                animation: 150,
                group: 'jewelryGroup',
                // handle: ".handle",
                ghostClass: 'ghost',
                forceFallback: true,
                scroll: true
                // selectedClass: 'select-active'
            };
        },
    },
    created () {
        this.productTypeList() // 商品类型列表
    },
    mounted () {
        $(".model-content").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            scrollInertia: 500,
        })
        eventBus.$on("closeBigPopup", function (val) {
            console.log(val)
            self.operateDialog = val.status
            if (val.type == '2') {
                // self.stockInfoUpdate(val.operateId, val.operateName)
            }
        })
    },
    watch: {
        isDragging (newValue) {
            if (newValue){
                this.delayedDragging= true
                return
            }
            this.$nextTick( () =>{
                this.delayedDragging =false
            })
        },
    },
    methods: {
        openDialog (val) {
            console.log(val)
            if (val.type == 1) {
                this.addBigClass()
            } else {
                this.addDialogAct (val.proType)
            }
        },
        confirmBtn () { // 合并成功后的事件
            if (this.checked == true) {
                console.log(this.item)
                let obj = {
                    item: {
                        classesId: this.item.classesId
                    }
                }
                this.delBack(obj)
            }
            this.successDialog = false
        },
        margeInfoBack (val) { // 合并成功后的回调
            this.margeDialog = val.flag
            this.successDialog = true
            this.productTypeList() // 商品类型列表
        },
        delBack (val) { // 删除项目的返回
            console.log(val)
            let options = {
                type: "1",
                list: [
                    {
                        classesId: val.item.classesId
                    }
                ]
            }
            operateDelProductTypeByList(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.operateDialog = false
                    this.checked = false
                    this.productTypeList()
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
            this.updateProductType(val.operateId, val.operateName)
            this._operateAddClassesRemark(val)
            if (val.type == 10) {
                this.margeDialog = true
                this.startId = val.operateId
                this.startName = val.operateName
            }
        },
        operateItem (item, type) { // 修改操作
            this.operateDialog = true;
            this.item = item
            this.stockType = 7
            this.type = 2
            this.selType = type
            this.bigClass = false
            // eventBus.$emit("updateData", this.item)
            console.log(item)
        },
        updateProductType (id, data) { // 商品类型修改
            let options = {
                productTypeId: id,
                operateType: '1',
                objectData: data
            }
            operateUpdateProductType(options).then((res) => {
                if (res.data.state == 200) {
                    // this.$message({
                    //     type: 'success',
                    //     message: '操作成功!'
                    // })
                    this.productTypeList()
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
        },
        _operateAddClassesRemark (parm) {
            operateAddClassesRemark(parm)
                .then(res => {
                    if (res.data.state == 200) {

                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
        },
        productTypeDragSord(type, id, list) { // 跨类排序操作
            let options = {
                productTypeId: id,
                classesType: type,
                childrenList: list
            }
            operateProductTypeDragSord(options).then((res) => {
                console.log(res)
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
                console.log(res)
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        productTypeOrderBy (type) { // 排序操作
            let options = {
                classesType: type,
                list: this.orderByList
            }
            operateProductTypeOrderBy(options).then((res) => {
                console.log(res)
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
                console.log(res)
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        onChoose (evt) {
        },
        onEnd(evt) {
            // console.log(evt)
            let drapText = evt.target.parentNode.getElementsByClassName('item-title')[0].innerText.slice(0, 3)
            let attr = evt.item.attributes.attid.nodeValue // 当前小类id
            let sameFlag = false
            let preType = ''
            let byList = []
            // console.log(drapText)
            if (drapText == '计重类') {
                this.JewelleryList.forEach((item, index) => {
                    // console.log(item)
                    if (item.classesId == attr) {
                        // console.log(true)
                        sameFlag = true
                    }
                })
                if (sameFlag) {
                    preType = 2
                    for (let i = 0; i < this.JewelleryList.length; i++) {
                        byList.push({
                            productTypeId: this.JewelleryList[i].classesId,
                            classesName: this.JewelleryList[i].classesName,
                            orderBy: i + 1
                        })
                    }
                } else {
                    this.classListType = 1
                    for (let i = 0; i < this.goldList.length; i++) {
                        this.orderByList.push({
                            classesId: this.goldList[i].classesId,
                            classesName: this.goldList[i].classesName,
                            orderBy: i + 1
                        })
                    }
                }
                
            } else if (drapText == '计件类') {
                // this.classListType = 2
                // for (let i = 0; i < this.JewelleryList.length; i++) {
                //     this.orderByList.push({
                //         classesId: this.JewelleryList[i].classesId,
                //         classesName: this.JewelleryList[i].classesName,
                //         orderBy: i + 1 
                //     })
                // }
                this.goldList.forEach((item, index) => {
                    // console.log(item)
                    if (item.classesId == attr) {
                        // console.log(true)
                        sameFlag = true
                    }
                })
                if (sameFlag) {
                    preType = 1
                    for (let i = 0; i < this.goldList.length; i++) {
                        byList.push({
                            productTypeId: this.goldList[i].classesId,
                            classesName: this.goldList[i].classesName,
                            orderBy: i + 1
                        })
                    }
                } else {
                    this.classListType = 2
                    for (let i = 0; i < this.JewelleryList.length; i++) {
                        this.orderByList.push({
                            classesId: this.JewelleryList[i].classesId,
                            classesName: this.JewelleryList[i].classesName,
                            orderBy: i + 1
                        })
                    }
                }
            }
            //console.log(this.classListType)
            if (sameFlag) {
                this.productTypeDragSord(preType, attr, byList)
            } else {
                this.productTypeOrderBy(this.classListType)
            }
            
        },
        onMove ({relatedContext, draggedContext}) {
            // const relatedElement = relatedContext.element;
            // const draggedElement = draggedContext.element;
            // return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        },
        addDialogAct (type) {
            this.addDialog = true
            this.addType = type
        },
        insertProductType () { // 新增产品类型
            //console.log(this.addType)
            let options = {
                "type": "",//显示类型：1 产品类型 
                "list": [
                {
                    "classesType": this.addType,//1 素金类2 珠宝类3 饰品类
                    "classesId": "",//类型ID
                    "classesName": this.addTypeText//名称
                }]
            }
            seekInsertProductType(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.addDialog = false
                    this.addType = null
                    this.addTypeText = ''
                    eventBus.$emit('addBack', {type: "small", classId: res.data.data.classesId})
                    this.productTypeList()
                } else {
                    this.$store.dispatch('workPopupError', res.data.msg);
                }
            }, (res) => {
                console.log(res)
            })
        },
        productTypeList () { // 产品类型列表
            this.isLoading = true
            getProductTypeList({type: '1'}).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.isLoading = false
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        if (res.data.data.list[i].classesType == 1) {
                            this.goldList = res.data.data.list[i].typeList
                        } else if (res.data.data.list[i].classesType == 2) {
                            this.JewelleryList = res.data.data.list[i].typeList
                        } else if (res.data.data.list[i].classesType == 3) {
                            this.jewelryList = res.data.data.list[i].typeList
                        }
                    }
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