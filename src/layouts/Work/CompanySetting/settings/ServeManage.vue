<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title"><i class="iconfont icon-liebiao"></i>服务类型</div>
            <div class="model-content" >
                <div v-loading="isLoading" element-loading-text="拼命加载中">
                    <div class="type-block">
                        <div class="item-title">售后类<span class="add-btn" @click="addDialogAct()">+售后小类</span></div>
                        <ul class="type-block-main">
                            <li class="type-block-item" @click.stop="operateItem(element)" v-for="element in showData.dataList" :key="element.serviceTypeId">
                                <span>{{element.serviceTypeName}}</span>
                                <!--<i class="handle iconfont icon-bianji" ></i>-->
                            </li>  
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <el-dialog :visible.sync="addDialog" customClass="addDig">
                    <div class="title" slot="title">
                        <img src="~static/img/piliang.png">
                        <div>添加售后小类</div>
                    </div>
                    <div class="body">
                        <input v-model="addTypeText" maxlength="6" type="text" placeholder="输入售后小类">
                    </div>
                    <div class="foot" solt="footer">
                        <div class="ope-btn" @click="insertProductType">确定</div>
                    </div>
                </el-dialog>

                <el-dialog :visible.sync="operateDialog" customClass="operateDig">
                    <big-popup
                        :item='item'
                        type="2"
                        :stockType='stockType'
                        :maxlength="6"
                        @messageBack="msgBack"
                        @delAction="delBack"
                    >
                    </big-popup>
                </el-dialog> 
            </div>
        </div>
    </transition>
</template>
<script>
import {seekGetServiceTypeList} from './../../../../Api/commonality/seek'
import {operateProductClasses, operateServiceOperation, operateAddProductProperty, operateDelProductProperty} from './../../../../Api/commonality/operate'

import BigPopup from './../settingComponents/bigPopup'

import draggable from 'vuedraggable'
export default {
    data () {
        return {
            isLoading: true,
            item: '',
            operateDialog: false,
            addTypeText: '',
            addDialog: false,
            showData: {
                bigServiceId: '',
                bigserviceName: '',
                dataList: []
            },
            lastClassId: '',
            indexFlag: null,
            indexType: null,
            stockType: null
        }
    },
    components: {
        BigPopup,  // 操作弹框
        draggable //拖动插件
    },
    created () {
        this.productPropertyList()
    },
    mounted () {
        let self = this
        $(".model-content").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            scrollInertia: 500,
        })
        // eventBus.$on("closeBigPopup", function (val) {
        //     console.log(val)
        //     self.operateDialog = val.status
        //     if (val.type == '2') {
        //         self._operateServiceOperation(val.operateId, val.operateName)
        //     }
        // })
    },
    computed: {
        // dragOptions () { // 小类拖动配置
        //     return  {
        //         animation: 150,
        //         group: 'goldGroup',
        //         // handle: ".handle",
        //         ghostClass: 'ghost',
        //         chosenClass: 'chosen',
        //         forceFallback: true
        //         // selectedClass: 'select-active',
        //         // dragClass: 'select-active'
        //     };
        // },
    },
    methods: {
        delBack (val) { // 删除项目的返回
            let options = {
                dataList: [
                    {
                        id: val.item.classesId,
                        operateType: '2',
                        type: '2',
                        parentId: this.showData.bigServiceId
                    }
                ]
            }
            operateServiceOperation(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.operateDialog = false
                    this.productPropertyList()
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
            this._operateServiceOperation(val.operateId, val.operateName)
        },
        operateItem (item) { // 修改操作
            this.operateDialog = true;
            this.item = {
                classesName: item.serviceTypeName,
                classesId: item.serviceTypeId
            }
            // eventBus.$emit("updateData", this.item)
            // console.log(item)
        },
        onChoose (evt) {
            console.log(evt)
             //父元素中的元素索引
             //console.log(evt.target.parentNode.parentNode)
             // evt.target.parentNode.parentNode.style.backgroundColor = '#f6f7f8'
        },
        onMove (evt) {
            // console.log('onMove',arguments)
            // evt.target.style.color = 'red'
        },
        addDialogAct (item, index, type) { // type 4 新增
            console.log(item)
            this.addDialog = true
        },
        // addProductProperty () { // 商品属性添加
        //     let options = {
        //         type: '1',
        //         list: [
        //             {
        //                 classesName: this.addTypeText
        //             }
        //         ]
        //     }
        //     operateAddProductProperty(options).then((res) => {
        //         console.log(res)
        //         if (res.data.state == 200) {
        //             this.addDialog = false
        //             this.addTypeText = ''
        //             this.productPropertyList()
        //         } else {

        //         }
        //     }, () => {
        //         console.log(res)
        //     })
        // },
        _operateServiceOperation (id, data) { // 服务类型维护
            this.isLoading = true
            let options = {
                dataList: [
                    {
                        id: id,
                        operateType: '3',
                        data: data,
                        type: '2',
                        parentId: this.showData.bigServiceId
                    }
                ]
            }
            operateServiceOperation(options).then((res) => {
                if (res.data.state == 200) {
                    this.isLoading = false
                    this.addTypeText = ''
                    this.productPropertyList()
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
            }, (res) => {
                console.log(res)
            })
        },
        insertProductType () { // 确定操作
            let options = {
                dataList: [
                    {
                        operateType: '1',
                        data: this.addTypeText,
                        type: '2',
                        parentId: this.showData.bigServiceId
                    }
                ]
            }
            operateServiceOperation(options).then((res) => {
                if (res.data.state == 200) {
                    this.addTypeText = ''
                    this.addDialog = false
                    this.productPropertyList()
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
            }, (res) => {
                console.log(res)
            })
        },
        productPropertyList () {
            this.isLoading = true
            seekGetServiceTypeList().then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.isLoading = false
                    this.showData = res.data.data.classesList[0]
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