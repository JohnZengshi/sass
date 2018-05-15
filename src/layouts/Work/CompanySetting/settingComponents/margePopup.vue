<template>
    <div>
        <div class="title">
            <img src="./../../../../../static/img/piliang.png">
            <div>数据合并</div>
        </div>
        <div class="popup-main">
            <ul class="left-list">
                <li :title="item.classesName" :class="{active: index1 == index}" @click="selectLeftClass(item, index)" v-for="(item, index) in dataList">{{item.classesName}}</li>
                <li class="addBtn" v-if="addBig != 1" @click="addDialogShow(1)"><span>+添加</span></li>
            </ul>
            <ul class="right-list">
                <li :title="item.classesName" :class="{active: classesId == item.classesId}" @click="selectRightClass(item, index)" v-for="(item, index) in rightList">{{item.classesName}}</li>
                <li class="addBtn" @click="addDialogShow(2)"><span>+添加</span></li>
            </ul>
            <div class="footer">
                <div class="btn" @click="dataMigration">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
import {getProductTypeList, seekProductClassList} from './../../../../Api/commonality/seek'
import {seekDataMigration} from './../../../../Api/commonality/operate'
export default {
    data () {
        return {
            index1: 0,
            classesId: '',
            rightList: [],
            dataList: [],
            goldList: [], // 素金类
            JewelleryList: [], // 珠宝
            jewelryList: [], // 首饰
            confirmId: '',
            classesName: '',
            proType: 1,
            toName:''
        }
    },
    props: [
        'classType',
        'startId',
        'startName',
        'addBig',
        'itemId',
        'selType'
    ],
    created () {
        if (this.classType == 5) {
            this.productTypeList()
        } else {
            this.productClassList()
        }   
    },
    mounted () {
        let self = this
        eventBus.$on('addBack', function (val) {
            if (self.classType == 5) {
                self.productTypeList(val)
            } else {
                self.productClassList(val)
            }   
        })
        eventBus.$on("updatalist", function () {
            console.log(23434)
            if (self.classType == 5) {
                self.productTypeList()
            } else {
                self.productClassList()
            } 
        })
    },
    watch:{
        'startId': function (val) {
            console.log(111212)
            if (this.classType == 5) {
                this.productTypeList()
            } else {
                this.productClassList()
            }   
        }
    },
    methods: {
        addDialogShow (type) { // 1 大类 2 小类
            this.$emit("openDialog", {flag: true, type: type, classesName: this.classesName, classesId: this.classesId, proType: this.proType})
        },
        selectRightClass (item, index) { // 选择小类
            console.log(item)
            this.confirmId = item.classesId
            this.classesId = item.classesId
            this.toName = item.classesName
        },
        selectLeftClass (item, index) { // 选择大类
            console.log(item)
            this.classesId = item.classesId
            this.classesName = item.classesName
            if (this.classType == 5) {
                this.rightList = item.typeList
                this.index1 = index
                this.proType = index + 1
            } else {
                this.rightList = item.childrenList
                this.index1 = index
            }
        },
        dataMigration () { // 数据合并
            let opeType = ''
            if (this.classType == 1) {
                opeType = 2
            } else if (this.classType == 2) {
                opeType = 3
            } else if (this.classType == 3) {
                opeType = 4
            } else if (this.classType == 5) {
                opeType = 1
            }
            let options = {
                type: opeType,
                fromId: this.startId,
                toId: this.confirmId
            }
            
            let str = '是否将'+this.startName+'的数据合并至'+this.toName
            this.$confirm(str, '提示', {
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
                        this.confirmId = ''
                        this.classesId = ''
                        this.index1 = ''
                        this.$emit('margeBack', {flag: false})
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
        productClassList (val) { // 大小类列表
            console.log('这个val是什么',val)
            seekProductClassList({type: this.classType}).then((res) => {
                console.log(res)
                if (val) {
                    if (val.type == 'small') {  
                        this.confirmId = val.classesId
                    }
                }

                this.dataList = res.data.data.list
                this.dataList.map((item, index) => {
                    if (item.classesId == this.itemId) {
                        this.index1 = index
                    }
                })
                this.rightList = res.data.data.list[this.index1].childrenList
            }, (res) => {
                console.log(res)
            })
        },
        productTypeList (val) { // 类型列表
            console.log(this.classType)
            getProductTypeList().then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    if (this.selType == 1) {
                        this.index1 = 0
                    } else {
                        this.index1 = 1
                    }
                    this.dataList = res.data.data.list
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        if (res.data.data.list[i].classesType == 1) {
                            //this.proType = 1
                            //this.dataList[i].classesName = '素金'
                            this.rightList = res.data.data.list[i].typeList
                        } else if (res.data.data.list[i].classesType == 2) {
                            //this.proType = 2
                            //this.dataList[i].classesName = '珠宝'
                        } else if (res.data.data.list[i].classesType == 3) {
                            //this.proType = 3
                            //this.dataList[i].classesName = '首饰'
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
<style src="./../dialogSetting.scss"></style>
<style lang="scss" scoped>
.addBtn {
   
    span {
        padding: 3px 6px;
        border-radius: 4px;
        border:1px dashed #ddd;
         
    }
}
</style>


