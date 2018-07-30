<template>
    <div class="m-m-template-shop-main">
        <div class="content-title">
            <i class="iconfont icon-liebiao"></i>
            <span>积分模板</span>
        </div>
        <div class="input-wrap">
            <h5 class="item-label">组合名称</h5>
            <input placeholder="请输入组合名称" v-model="showList.templateName">
        </div>
        <div class="shop-list">
            <h5>选择店铺</h5>
            <ul class="list-wrap">
                <!-- 单店铺 -->
                <el-checkbox-group style="display: inline-block" v-model="checkShopList">
                    <li v-for="(item, index) in shopList.shopList">
                        <el-checkbox :label="item.shopId" style="font-size: 14px;">{{item.shopName}}</el-checkbox>
                    </li>
                </el-checkbox-group>
                <!-- 组合店铺 -->
                <el-checkbox-group style="display: inline-block" v-model="checkShopGroupList">
                    <li v-for="(item, index) in shopList.shopGroupList">
                        <el-checkbox :label="item.groupId" style="font-size: 14px;">{{item.groupName}}</el-checkbox>
                    </li>
                </el-checkbox-group>
            </ul>
            <h5>设置折扣方式</h5>
            <ul class="list-wrap">
                <el-checkbox-group v-model="checkDiscount">
                    <li v-for="(item, index) in discountList">
                        <el-checkbox @change="amendDiscount" :label="item.id" style="font-size: 14px;">{{item.name}}</el-checkbox>
                    </li>
                </el-checkbox-group>
            </ul>
            <h5>
        会员等级默认模板
        <div class="xj-btn-defult right-btn" @click="openGrade">
          +级别
        </div>
      </h5>
            <ul class="grade-list-wrap">
                <li v-for="(item, index) in gradeList">
                    <span class="item-label">{{item.gradeName}}</span>
                    <span>积分达到{{item.startScore}}分，升级为{{item.gradeName}}</span>
                    <i class="iconfont icon-bianji"></i>
                </li>
            </ul>
        </div>
        <!-- 会员积分配置 -->
        <memberSetting></memberSetting>
        <add-grade ref="addGradeBox"></add-grade>
    </div>
</template>
<script>
import addGrade from './add-grade'
import memberSetting from '@/layouts/Work/memberSetting/index'
import { seekFindMemberTemplaetDetails, seekFindShopList } from 'Api/commonality/seek'
import { operateUpdateGrade } from 'Api/commonality/operate'
export default {
    components: {
        addGrade,
        memberSetting
    },
    data() {
        return {
            templateId: this.$route.query.templateId,
            name: '',
            shopList: {
                shopList: [],
                shopGroupList: []
            },
            checkShopList: [],
            checkShopGroupList: [],
            checkRule: [],
            checkDiscount: [],
            ruleList: [{
                    name: '一年内无消费行为',
                    id: '1'
                },
                {
                    name: '一年内无消耗行为',
                    id: '2'
                },
                {
                    name: '一年内无消耗行为',
                    id: '3'
                }
            ],
            discountList: [{
                    name: '折上折',
                    id: '1'
                },
                {
                    name: '最低折扣',
                    id: '2'
                }
            ],
            gradeList: [],
            showList: {
                templateId: 'a436606db0974f68a365966a3fbffb25'
            }
        }
    },
    created() {
        this._seekFindShopList()
        this._seekFindMemberTemplaetDetails()
    },
    methods: {
        openGrade(parm) {
            if (parm.id) {
                this.$refs.addGradeBox.open(parm)
            } else {
                this.$refs.addGradeBox.open()
            }
        },
        delGrade(item, index) {
            let options = {
                gradeId: item.gradeId,
                type: '2' // 删除
            }
            operateUpdateGrade()
                .then(res => {
                    if (res.data.state == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.gradeList.splice(index, 1)
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
        },
        amendShop(val) {
            let opations = []
            if (val.target.checked) { // 新增
                opations = [{
                    type: '0',
                    shopId: val.target.value
                }]
            } else { // 删除
                opations = [{
                    type: '1',
                    shopId: val.target.value
                }]
            }
            this.amendData(opations)
        },
        amendRule(val) {
            let opations = []
            if (val.target.checked) { // 新增
                opations = [{
                    type: '0',
                    shopId: val.target.value
                }]
            } else { // 删除
                opations = [{
                    type: '1',
                    shopId: val.target.value
                }]
            }
            this.amendData(opations)
        },
        amendDiscount(val) {
            let opations = []
            if (val.target.checked) { // 新增
                this.checkDiscount = []
                this.checkDiscount.push(val.target.value)
                opations = [{
                    discount: val.target.value
                }]
            } else {
                opations = [{
                    discount: 0
                }]
            }
            this.amendData(opations)
        },
        amendData(parm) {
            let opations = {
                dataList: parm, // []
                templateId: this.showList.templateId
            }
        },
        /* -------数据源-------- */
        // 店铺列表
        _seekFindShopList() {
            let opations = {
                page: 1,
                pageSize: '0',
                type: '1'
            }
            let datas = {
                shopList: [{
                        shopId: 'shopId',
                        shopName: 'shopName',
                        templateType: 'templateType',
                    },
                    {
                        shopId: 'shopId2',
                        shopName: 'shopName2',
                        templateType: 'templateType2',
                    }
                ],
                shopGroupList: [{
                    groupId: 'groupId',
                    groupName: 'groupName',
                }]
            }
            this.shopList = datas
            seekFindShopList(opations)
                .then(res => {
                    if (res.data.state == 200) {
                        this.shopList = res.data.data.shopList
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
        },
        // 详情
        _seekFindMemberTemplaetDetails() {
            this.checkShopList = []
            this.checkShopGroupList = []
            let options = {
                templateId: this.templateId,
            }
            let datas = {
                templateId: 'templateId',
                templateName: 'templateName',
                discount: '1',
                list: {
                    shopList: [{
                        shopId: 'shopId',
                        shopName: 'shopName',
                    }],
                    groupList: [{
                        groupId: 'groupId',
                        groupName: 'groupName',
                    }]
                },
                gradeList: [{
                        gradeId: 'gradeId',
                        gradeName: 'gradeName',
                        startScore: 'startScore',
                    },
                    {
                        gradeId: 'gradeId',
                        gradeName: 'gradeName',
                        startScore: 'startScore',
                    }
                ]
            }
            for (let i of datas.list.shopList) {
                this.checkShopList.push(i.shopId)
            }
            for (let i of datas.list.groupList) {
                this.checkShopGroupList.push(i.groupId)
            }
            this.checkDiscount.push(datas.discount)
            this.showList = datas
            seekFindMemberTemplaetDetails(options)
                .then(res => {
                    if (res.data.state == 200) {
                        this.showList = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
        },
    }
}

</script>
<style lang="scss">
.m-m-template-shop-main {
    .el-checkbox {
        height: 40px!important;
        line-height: 40px!important;
    }
    .el-checkbox-group .el-checkbox__inner {
        border-radius: 5px!important;
    }
    .el-checkbox-group {
        .el-checkbox__label {
            font-size: 14px!important;
            font-weight: normal;
        }
    }
}

</style>
<style lang="scss" scoped>
.m-m-template-shop-main {
    // height: 200px;
    padding: 15px 0;
    .content-title {
        padding-left: 25px;
        >i {
            color: #2993f8;
        }
    }
    .input-wrap {
        margin: 34px 0;
        padding: 0 40px;
        >.item-label {
            // display: inline-block;
            // width: 80px;
            position: relative;
            font-size: 14px;
            line-height: 22px;
            color: #333;
            font-weight: bold;
            padding-left: 8px;
            color: #333;
            display: inline-block;
            margin-right: 10px;
            &:before {
                content: "";
                display: inline-block;
                width: 3px;
                height: 16px;
                background: #2993f8;
                position: absolute;
                top: 3px;
                border-radius: 3px;
                left: 0;
            }
        }
        input {
            height: 28px;
            background-color: transparent;
            font-size: 14px;
            border-radius: 3px;
            text-indent: 10px;
            width: 170px;
            border: 1px solid #d6d6d6;
            &:active,
            &:hover,
            &:focus {
                border: 1px solid #2993f8;
                background-color: #f4f9ff;
            }
        }
        i {
            transition: all .3s;
            cursor: pointer;
            &:hover {
                color: #2993f8;
            }
        }
        .bianji {
            float: right;
        }
    }
    .shop-list {
        padding: 0 40px;
        >h5 {
            position: relative;
            font-size: 14px;
            line-height: 22px;
            color: #333;
            font-weight: bold;
            padding-left: 8px;
            color: #333;
            &:before {
                content: "";
                display: inline-block;
                width: 3px;
                height: 16px;
                background: #2993f8;
                position: absolute;
                top: 3px;
                border-radius: 3px;
                left: 0;
            }
            >.right-btn {
                float: right;
            }
        }
        .list-wrap {
            margin: 10px;
            font-size: 0; // overflow-y: scroll;
            li {
                height: 40px;
                display: inline-block;
                line-height: 40px;
                text-align: left;
                font-size: 14px;
                cursor: pointer;
                margin-right: 20px; // &:hover {
                //   background: #f6f7f8;
                //   color: #3195f5;
                // }
            }
            li.active {
                color: #2993f8;
            }
        }
        .grade-list-wrap {
            background-color: #f6f7f8;
            margin: 20px 0;
            padding: 25px 20px;
            border-radius: 5px;
            li {
                position: relative;
                font-size: 14px;
                line-height: 14px;
                margin-bottom: 20px;
                padding-left: 8px;
                &:before {
                    content: "";
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    width: 5px;
                    height: 5px;
                    line-height: 14px;
                    border-radius: 50%;
                    background-color: #FDB133;
                }
                i {
                    transition: all .3s;
                    cursor: pointer;
                    &:hover {
                        color: #2993f8;
                    }
                }
                >span {
                    margin-right: 10px;
                    color: #333;
                }
            }
            li:last-child {
                margin-bottom: 0;
            }
        } // .list-wrap {
        //   min-height: 60px;
        //   max-height: 160px;
        //   margin: 20px;
        //   overflow: scroll;
        //   li {
        //     height: 40px;
        //     padding: 0 10px;
        //     display: inline-block;
        //     line-height: 40px;
        //     border: 1px solid #d6d6d6;
        //     text-align: left;
        //     padding-left: 14px;
        //     font-size: 14px;
        //     border-bottom: 1px solid #f1f2f3;
        //     cursor: pointer;
        //     margin-right: 10px;
        //     &:hover {
        //       background: #f6f7f8;
        //       color: #3195f5;
        //     }
        //   }
        //   li.active {
        //     color: #2993f8;
        //   }
        // }
    }
}

</style>
