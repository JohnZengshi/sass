<template>
    <transition name="tp-ani">
        <div class="model-wrap">
            <div class="model-title"><i class="iconfont icon-liebiao"></i>宝石属性</div>
            <div class="model-content" v-loading="isLoading" element-loading-text="拼命加载中">
                <div>
                    <div class="type-block" v-for="(item, index) in dataList"> <!-- v-for="(item, index) in dataList" -->
                        <div class="item-mask"></div>
                        <div class="item-title">{{item.classesName}}<span class="add-btn" @click="addDialogAct(item, index, 4)">+分类</span></div>
                        <ul :title="item.classesName" class="type-block-main"> 
                                <li class="type-block-item" @click.stop="operateItem(element, item, index)" v-for="element in item.childrenList" :key="element.classesId"> <!-- v-for="element in item.childrenList" -->
                                    <span>{{element.classesName}}</span>
                                    <!--<i class="handle iconfont icon-bianji" ></i>-->
                                </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <el-dialog :visible.sync="addDialog" customClass="addDig">
                    <div class="title" slot="title">
                        <img src="./../../../../../static/img/piliang.png">
                        <div>添加宝石属性</div>
                    </div>
                    <div class="body">
                        <input v-model="addTypeText" type="text" placeholder="输入宝石属性">
                    </div>
                    <div class="foot" solt="footer">
                        <div class="ope-btn" @click="insertProductType">确定</div>
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="addDialog1" customClass="addDig">
                    <div class="title" slot="title">
                        <img src="./../../../../../static/img/piliang.png">
                        <div>添加宝石属性</div>
                    </div>
                    <div class="body1">
                        <div class="body1-wrap">
                            <input class="input1" v-model="addTypeText" type="text" placeholder="输入宝石属性">
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
                        <div class="ope-btn" @click="insertProductType">确定</div>
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="operateDialog" customClass="operateDig">
                    <big-popup
                        :item='item'
                        :type='type'
                        :option="option"
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
import {seekProductClassList} from './../../../../Api/commonality/seek'
import {operateProductClasses, operateProductClassesOrderBy, operateDelProductClasses} from './../../../../Api/commonality/operate'
import BigPopup from './../settingComponents/bigPopup'
import draggable from 'vuedraggable'
export default {
    data () {
        return {
            type: null,
            operateDialog: false,
            item: '',
            isLoading: true,
            value: '',
            addTyleFlag: null,
            addTypeText: '',
            addDialog1: false,
            addDialog: false,
            dataList: [],
            lastClassId: '',
            indexFlag: null,
            indexType: null,
            orderByList: [],
            stockType: null,
            itemId: '',
            option: ['无', '990', '999', '999.9', '999.99', '3D']
        }
    },
    components: {
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
                disabled: true,
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
                disabled: true,
                ghostClass: 'ghost',
                chosenClass: 'chosen',
                forceFallback: true
                // selectedClass: 'select-active',
                // dragClass: 'select-active'
            };
        },
    },
    methods: {
        delBack (val) { // 删除项目的返回
            console.log(val)
            var delType = null
            if (val.type == 2) {
                delType = 2
            }
            let options = {
                'list': {
                    'childrenList': [
                        {
                            'classesId': val.item.classesId
                        }
                    ],
                    'classesId': val.type == 2 ? '' : this.itemId,
                    'classesName': ''
                },
                'topClasses': delType,
                'type': '4'
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
            this.operateProductType(val.operateId, val.operateName)
        },
        operateItem (element, item, index) { // 修改操作
            this.operateDialog = true;
            this.item = element
            this.itemId = item.classesId
            this.type = 2
            //this.stockType = 8
            this.indexFlag = index
            // eventBus.$emit("updateData", this.item)
            console.log(item)
        },
        operateItem1 (item) { // 修改操作
            this.operateDialog = true;
            this.item = item
            this.type = 2
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
        // onEnd (evt) { // 大类拖动排序
        //     //console.log(evt.target.getElementsByClassName('item-title')[0].innerText)
        //     // console.log(evt.item.getElementsByClassName('item-title')[0].innerText)
        //     //console.log(this.dataList)
        //     // console.log(evt.newIndex)
        //     // console.log(evt.to)
        //     // console.log(evt.from)
        //     //console.log(evt.item)
        //     for (let i = 0; i < this.dataList.length; i++) {
        //         //if (this.dataList[i].classesName == choseName) {
        //         this.orderByList.push({
        //             classesId: this.dataList[i].classesId,
        //             classesName: this.dataList[i].classesName,
        //             orderBy: i + 1
        //         })
        //         //}
        //     }
        //     this.productClassesOrderBy()
        // },
        // onEnd1 (evt) { // 小类拖动排序
        //     console.log(evt)
        //     //let choseName = evt.item.parentNode.parentNode.getElementsByClassName('item-title')[0].innerText
        //     let choseName = evt.from.attributes.title.nodeValue
        //     let bigClassId = ''
        //     for (let i = 0; i < this.dataList.length; i++) {
        //         if (this.dataList[i].classesName == choseName) {
        //             console.log(this.dataList[i].childrenList)
        //             bigClassId = this.dataList[i].classesId
        //             for (let j = 0; j < this.dataList[i].childrenList.length; j++) {
        //                 this.orderByList.push({
        //                     classesId: this.dataList[i].childrenList[j].classesId,
        //                     classesName: this.dataList[i].childrenList[j].classesName,
        //                     orderBy: j + 1
        //                 })
        //             }
        //         }
        //     }
        //     this.productClassesOrderBy1(bigClassId)
        // },
        addDialogAct (item, index, type) { // type 4 新增
            console.log(item)
            console.log(this.addDialog1)
            this.addDialog1 = true
            this.indexFlag = index
            this.indexType = type
            this.addTyleFlag = 2
        },
        operateProductType (id, data) { // 操作按钮
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
                "type": "4" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
            }
            console.log(optiosn)
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
                    "type": "4" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
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
                    "classesName": this.dataList[this.indexFlag].classesName, //item.classesName, // 最高级名
                    "classesId": this.dataList[this.indexFlag].classesId  //item.classesId // 最高级ID
                },
                "type": "4" // 1成色名称 2宝石名称 3首饰类别  4 宝石属性
            }
            operateProductClasses(optiosn).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    // this.dataList = res.data.data.list
                    this.indexFlag = null
                    this.indexType = null
                    this.addDialog1 = false
                    this.addTypeText = ''
                    this.productClassList()
                }
            }, (res) => {
                console.log(res)
            })
        },
        productClassList () { // 商品类别列表
            this.isLoading = true
            let options = {
                "type": "4",
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