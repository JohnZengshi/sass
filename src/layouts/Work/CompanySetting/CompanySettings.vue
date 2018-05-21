<template>
    <div class="setting-wrap">
        <div class="setting-tittle">
            <h2><i class="iconfont icon-gongsishezhi"></i>公司设置</h2>
        </div>
        <div class="setting-main">
            <div class="main-left">
                <div class="main-left-title">
                    <h3><i class="iconfont icon-liebiao"></i>商品设置</h3>
                </div>
                <el-menu class="main-left-menu" @select="selectItem">
                    
                    <el-menu-item :class="{active: actIndex == index}" class="main-left-menu-item" :index="index + ''" v-for="(item, index) in catalog" :key="index">
                        <span :class="{active: actIndex == index}" class="active-bar"></span>
                        {{item.name}}
                    </el-menu-item>
                </el-menu>
                <div class="main-left-content">
                    <component :is="panel"></component>
                </div>
            </div>
            <div class="main-right">
                <!-- 供应商设置 begin -->
                <!-- 供应商设置 end -->
                <div class="supplier-setting">
                    <div class="supplier-setting-title">
                        <h4><i class="iconfont icon-liebiao"></i>供应商设置</h4>
                        <span @click="addDialogAct(1)">+供应商</span>
                    </div>
                    <div class="supplier-list">
                        <ul>
                            <li v-for="(item, index) in supplierList" @click="supplierAct(item)" :key="index"><i>●</i>{{item.supplierName}}</li>
                        </ul>
                    </div>
                </div>
                <div class="storage-setting">
                    <div class="storage-setting-title">
                        <h4><i class="iconfont icon-liebiao"></i>库位设置</h4>
                        <span @click="addDialogAct(2)">+库位</span>
                    </div>
                    <div class="storage-list">
                        <ul>
                            <li @click="openOperateDia(item)" v-for="(item, index) in repositoryList" :key="index"><i>●</i>{{item.repositoryName}}<span class="default-flag iconfont icon-duigou" v-if="item.isDefault == 'Y'"></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <el-dialog :visible.sync="addDialog" customClass="addDig">
                <div class="title" slot="title">
                    <img src="./../../../../static/img/piliang.png">
                    <div>添加</div>
                </div>
                <div class="body">
                    <input v-if="newPopupType == 1" v-model="supplierName" type="text" placeholder="输入供应商名称">
                    <input v-if="newPopupType == 2" v-model="repositoryName" type="text" placeholder="输入库位名称">
                </div>
                <div class="foot" solt="footer">
                    <div class="ope-btn" @click="selectMethods()">确定</div>
                </div>
            </el-dialog>
            <el-dialog :visible.sync="supplierAddDialog" customClass="addDig">
                <div class="title" slot="title">
                    <img src="./../../../../static/img/piliang.png">
                    <div>修改</div>
                </div>
                <div class="body">
                    <input v-model="supplierName" type="text" placeholder="输入供应商名称">
                </div>
                <div class="foot" solt="footer">
                    <div class="ope-btn" @click="supplierInfoUpdate()">确定</div>
                    <div class="del-btn" @click="delSupplier"></div>
                </div>
            </el-dialog>

            <el-dialog :visible.sync="operateDialog" customClass="operateDig">
                <big-popup
                    :item='item'
                    :type="1"
                    :stockType='stockType'
                    :isDefault='isDefault'
                    @messageBack="msgBack"
                    @delAction="delBack"
                >
                </big-popup>
            </el-dialog>       
        </div>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {seekShowProviderList} from './../../../Api/commonality/seek'

import {operateAddProvIder, operateDelProvIder, addRepository, operateStockInfoUpdate, operateDelRepository, operateSupplierInfoUpdate} from './../../../Api/commonality/operate'
import ProductName from "./settings/ProductName"
import GemName from "./settings/GemName"
import ConditionName from "./settings/ConditionName"
import JewelryType from "./settings/JewelryType"
import GemAttribute from "./settings/GemAttribute"
import GoldContent from "./settings/GoldContent"
import PartsName from "./settings/PartsName"
import BrandList from "./settings/BrandList"
import MetalColor from "./settings/MetalColor"
import Certificate from "./settings/Certificate"
import BarCodeManage from './settings/BarCodeManage'
import ServeManage from './settings/ServeManage'
import menu from './menu.json'

import BigPopup from './settingComponents/bigPopup'

import draggable from 'vuedraggable'
export default {
    data () {
        return {
            supplierAddDialog: false,
            supplierId: '',
            item: '',  // 弹框数据
            operateDialog: false,
            newPopupType: null,
            addTypeText: '', 
            supplierName: '', // 供应商名
            repositoryName: '', // 库位名
            addDialog: false,
            panel: ProductName,
            catalog: menu.catalog,
            actIndex: 0,
            supplierList: [], // 供应商列表
            stockType: null, // 库存类型
            isDefault: ''
            
        }
    },
    created () {
        this.workRepositoryList(); // 库位列表
        this.workProductClass(); // 产品类别
        this.showProviderList() // 供应商列表
    },
    mounted () {
        let self = this
        $(".storage-list").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            scrollInertia: 500,
        })
        $(".supplier-list").mCustomScrollbar({
            theme: "minimal-dark",
            autoHideScrollbar: true,
            scrollInertia: 500,
        })
        // eventBus.$on("closeBigPopup", function (val) {
        //     console.log(val)
        //     if (val.type == '1') {
        //         self.stockInfoUpdate(val.operateId, val.operateName)
        //     }
        //     self.operateDialog = val.status
        // })
    },
    components: {
        ProductName,
        GemName,
        ConditionName,
        JewelryType,
        GemAttribute,
        GoldContent,
        PartsName,
        BrandList,
        MetalColor,
        Certificate,
        BarCodeManage,
        ServeManage,
        BigPopup,  // 操作弹框
        draggable //拖动插件
    },
    computed: {
        ...mapGetters([
            "repositoryList", // 库位列表
            "productClass", // 产品类别
            // "supplierListData", // 供应商列表
            // "userType", // 监听编辑权限
            "applyUserList" // 应用用户列表
        ]),
        productClassPull: function () {
            var productClass = [];
            for (var i = 0; i < this.productClass.length; i++) {
                productClass.push(...this.productClass[i].typeList)
            }
            return productClass;
        },
        companyId () {
            return sessionStorage.getItem('companyId')
        }
    },
    methods: {
        ...mapActions([
            "workProductClass", // 产品类别
            "workRepositoryList" // 库位列表
        ]),
        delSupplier () { // 删除供应商
            let options = {
                handleType: '1',
                supplierList: [
                    {
                        supplierId: this.supplierId
                    }
                ]
            }
            console.log(options)
            operateDelProvIder(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.supplierAddDialog = false
                    this.workRepositoryList(); // 库位列表
                    this.workProductClass(); // 产品类别
                    this.showProviderList() // 供应商列表
                    this.supplierName = ''
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
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
        supplierAct (item) { // 供应商修改事件
            console.log(item)
            this.supplierAddDialog = true
            this.item = item
            this.supplierName = item.supplierName
            this.supplierId = item.supplierId
        },
        supplierInfoUpdate () { // 供应商修改
            let options = {
                id: this.supplierId,
                dataList: [
                    {
                        type: '1',
                        data: this.supplierName
                    }
                ]
            }
            operateSupplierInfoUpdate(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.supplierAddDialog = false
                    this.workRepositoryList(); // 库位列表
                    this.workProductClass(); // 产品类别
                    this.showProviderList() // 供应商列表
                    this.supplierName = ''
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
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
        delBack (val) {
            console.log(val)
            let options = {
                handleType: "1",
                repositoryIdList: [
                    {
                        repositoryId: val.item.repositoryId
                    }
                ]
            }
            operateDelRepository(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.operateDialog = false
                    this.workRepositoryList(); // 库位列表
                    this.workProductClass(); // 产品类别
                    this.showProviderList() // 供应商列表
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
            this.stockInfoUpdate(val.operateId, val.operateName)
            if (val.radio == '1') {
                let options = {
                    handleType: "2",
                    repositoryIdList: [
                        {
                            repositoryId: val.operateId
                        }
                    ]
                }
                operateDelRepository(options).then((res) => {
                    console.log(res)
                    if (res.data.state == 200) {
                        // this.$message({
                        //     type: 'success',
                        //     message: '删除成功!'
                        // })
                        this.operateDialog = false
                        this.workRepositoryList(); // 库位列表
                        this.workProductClass(); // 产品类别
                        this.showProviderList() // 供应商列表
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
            }
        },
        openOperateDia (item) { // 修改弹窗
            console.log(item)
            this.isDefault = item.isDefault
            console.log(this.isDefault)
            this.operateDialog = true;
            this.item = item
            this.stockType = 1
        },
        selectMethods () {
            if (this.newPopupType == 1) {
                this. addProvIder()
            } else if (this.newPopupType == 2) {
                this.repository()
            }
        },
        addProvIder () { // 新增供应商
            let options = {
                supplierName: this.supplierName
            }
            operateAddProvIder(options).then((res) => {
                //console.log(res)
                if (res.data.state == 200) {
                    this.addDialog = false
                    this.newPopupType = null
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.supplierName = ''
                    this.workRepositoryList(); // 库位列表
                    this.workProductClass(); // 产品类别
                    this.showProviderList() // 供应商列表
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                // console.log(res)
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        stockInfoUpdate (id, data) { // 库位修改
            let options = {
                id: id,
                dataList: [{
                    type: '1',
                    data: data
                }]
            }
            operateStockInfoUpdate(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.$message({
                        type: 'success',
                        message: '信息修改成功!'
                    })
                    this.workRepositoryList(); // 库位列表
                    this.workProductClass(); // 产品类别
                    this.showProviderList() // 供应商列表
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                // console.log(res)
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        repository () { // 新增库位
            let options = {
                repositoryName: this.repositoryName
            }
            addRepository(options).then((res) => {
                if (res.data.state == 200) {
                    this.addDialog = false
                    this.newPopupType = null
                    this.repositoryName = ''
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.workRepositoryList(); // 库位列表
                    this.workProductClass(); // 产品类别
                    this.showProviderList() // 供应商列表
                } else {
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                this.$message({
                    type: 'success',
                    message: res.data.msg
                })
            })
        },
        addDialogAct (type) { // 新建方式
            // console.log(this.repositoryList)
            this.addDialog = true
            if (type == 1) {
                this.newPopupType = 1
            } else {
                this.newPopupType = 2
            }
        },
        showProviderList () {
            seekShowProviderList().then((res) => {
                // console.log(res)
                if (res.data.state == 200) {
                   this.supplierList = res.data.data.supplierList
                }
            }, (res) => {
                console.log(res)
            })
        },
        selectItem (index) {
            this.actIndex = index + ''
            // console.log(this.repositoryList)
            switch (index) {
                case '0':
                    this.panel = ProductName
                    break
                case '1':
                    this.panel = ConditionName
                    break
                case '2':
                    this.panel = GoldContent
                    break
                case '3':
                    this.panel = GemName
                    break
                case '4':
                    this.panel = JewelryType
                    break
                case '5':
                    this.panel = BrandList
                    break
                case '6':
                    this.panel = MetalColor
                    break
                case '7':
                    this.panel = Certificate
                    break
                case '8':
                    this.panel = GemAttribute 
                    break
                case '9':
                    this.panel = PartsName
                    break
                case '10':
                    this.panel = BarCodeManage
                    break
                case '11':
                    this.panel = ServeManage
                    break
            }
        },
    }
}
</script>
<style lang="scss" src="./dialogSetting.scss"></style>
<style lang="scss" scoped>
.del-btn {
    cursor: pointer;
    height: 36px;
    width: 36px;
    background: url('./../../../../static/img/nor.png') no-repeat center center;
    position: absolute;
    right: 10px;
    bottom: 10px;
}
.del-btn:hover {
    background: url('./../../../../static/img/sel.png') no-repeat center center;
}
.setting-wrap {
    width: 1250px;
    margin:0 auto;
    // height: 860px;
    padding-top: 40px;
    padding-bottom: 70px;
    .setting-tittle {
        width: 1250px;
        height: 46px;
        h2 {
            font-size: 16px;
            i {
                color:#2993f8;
                font-size: 22px;
                margin-right: 15px;
            }
        }
    }
    .setting-main {
        width: 1250px;
        height: 740px;
        .main-left {
            width: 930px;
            height: 740px;
            float: left;
            background:#fff;
            border-radius: 10px;
            box-shadow: 0px 0 15px #e2e2e2;
            // box-shadow: 0 0 20px 2px rgba(0,0,0,0.1);
            position: relative;
            .main-left-title {
                height: 72px;
                box-sizing: border-box;
                padding: 20px 17px;
                h3 {
                    font-size: 16px;
                   font-weight: normal;
                }
                i {
                    font-size: 16px;
                    margin-right: 20px;
                    color: #2993f8;
                }
            }
            .main-left-menu {
                position: absolute;
                left: 0;
                top: 68px;
                bottom: 0;
                width: 158px;
                border-bottom-left-radius: 10px;
                border-right: 1px solid #f1f2f3;
                background:#fff;
                .main-left-menu-item {
                    text-align: center;
                    font-size: 14px;
                    color: #999;
                    font-weight: bold;
                    position: relative;
                    .active-bar {
                        position: absolute;
                        height:100%;
                        width: 4px;
                        left: 0;
                        top: 0;
                        background:#2993f8;
                        display: none;
                    }
                    .active-bar.active {
                        display: block;
                    }
                }
                .main-left-menu-item.active {
                    color: #2993f8;
                }
                    
            }
            .main-left-content {
                position: absolute;
                left: 159px;
                top: 72px;
                bottom: 0;
                width: 771px;
            }
        }
        .main-right {
            width: 300px;
            height: 740px;
            float: right;
            &>div {
                box-shadow: 0 0 20px 2px rgba(0,0,0,0.1);
                background:#fff;
                border-radius: 10px;
            }
            .supplier-setting {
                width: 300px;
                height: 370px;
                margin-bottom: 20px;
                box-shadow: 0px 0 15px #ddd;
                .supplier-setting-title {
                    height: 50px;
                    width: 100%;
                    padding: 0 16px;
                    h4 {
                        float: left;
                        font-weight: normal;
                        line-height: 50px;
                        height: 50px;
                        .iconfont {
                            margin-right: 13px;
                            color: #2993f8;
                        }
                    }
                    span {
                        float: right;
                        line-height: 50px;
                        font-size: 14px;
                        color:#2993f8;
                        cursor: pointer;
                    }
                }
                .supplier-list {
                    height: 350px;
                    width: 100%;
                    ul {
                        width: 100%;
                        li {
                            height: 42px;
                            line-height: 42px;
                            padding-left: 30px;
                            color:#666;
                            font-size: 14px;
                            cursor: pointer;
                            i {
                                font-style: normal;
                                margin-right: 20px;
                                color: #2993f8;
                            }
                        }
                        li:nth-child(1n+0) i{
                            color:#f7b73b;
                        }
                        li:nth-child(2n+0) i{
                            color:#ef8641;
                        }
                        li:nth-child(3n+0) i{
                            color:#cd5867;
                        }
                        li:hover {
                            background:#f1f2f3;
                        }
                    }
                }
            }
            .storage-setting {
                width: 300px;
                height: 350px;
                box-shadow: 0px 0 15px #ddd;
                .storage-setting-title {
                    height: 50px;
                    width: 100%;
                    padding: 0 16px;
                    h4 {
                        float: left;
                        font-weight: normal;
                        line-height: 50px;
                        height: 50px;
                        .iconfont {
                            margin-right: 13px;
                            color: #2993f8;
                        }
                    }
                    span {
                        float: right;
                        line-height: 50px;
                        font-size: 14px;
                        color:#2993f8;
                        cursor: pointer;
                    }
                }
                .storage-list {
                    height: 340px;
                    width: 100%;
                    ul {
                        width: 100%;
                        li {
                            height: 42px;
                            line-height: 42px;
                            padding-left: 30px;
                            color:#666;
                            font-size: 14px;
                            position: relative;
                            cursor: pointer;
                            i {
                                font-style: normal;
                                margin-right: 20px;
                            }
                            .default-flag {
                                position: absolute;
                                right: 16px;
                                top: 0;
                                color: #2993f8;
                            }
                        }
                        li:nth-child(1n+0) i{
                            color:#f7b73b;
                        }
                        li:nth-child(2n+0) i{
                            color:#ef8641;
                        }
                        li:nth-child(3n+0) i{
                            color:#cd5867;
                        }
                        li:hover {
                            background:#f1f2f3;
                        }
                    }
                }
            }
        }
    }
}
</style>


