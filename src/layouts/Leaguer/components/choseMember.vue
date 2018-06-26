<template>
    <div class="chose-wrap">
        <div class="title">选择会员</div>
        <div class="menu-list">
            <div class="search">
                <input @keyup.enter="memberAllList()" v-model="keyWord" type="text" placeholder="请输入会员名/手机号">
                <div class="search-btn">
                    <i @click="memberAllList()" class="iconfont icon-sousuo"></i>
                </div>
            </div>
            <div class="drop-block">
                <DropDownMenu
                    titleName="会员类型"
                    dataType="会员类型"
                    :propList="memberTypeList"
                    @dropReturn="dropReturn"
                    @clearInfo="clearInfo"
                >
                </DropDownMenu>
            </div>
            <div class="drop-block">
                <DropDownMenu
                    titleName="会员级别"
                    dataType="会员级别"
                    :propList="memberGradeList"
                    @dropReturn="dropReturn"
                    @clearInfo="clearInfo"
                >
                </DropDownMenu>
            </div>
            <div class="drop-block">
                <DropDownMenu
                    titleName="跟进状态"
                    dataType="跟进状态"
                    :propList="followStatusList"
                    @dropReturn="dropReturn"
                    @clearInfo="clearInfo"
                >
                </DropDownMenu>
            </div>
            <div class="drop-block last">
                <DropDownMenu
                    titleName="购买时间"
                    dataType="购买时间"
                    :propList="buyTimeList"
                    @dropReturn="dropReturn"
                    @clearInfo="clearInfo"
                >
                </DropDownMenu>
            </div>

        </div>
        <div class="member-list">
            <ul>
                <li v-for="(item, index) in dataList" :key="index" v-if="item.operateType != 2">
     <!--                <img :src="item.logo"> -->
                    <div class="member-list-item">
                        <FormatImg :logo="item.logo" @click.native="goAdmin" :userName="item.memberName" :size="40"></FormatImg>
                    </div>

                    <div class="member-list-item">{{item.memberName}}</div>
                    
                    <div class="member-list-item">
                        <span class="type" :class="{typeColor1: item.type == 1, typeColor2: item.type == 2,typeColor3: item.type == 3}">{{getType(item.type, item)}}</span>
                        <span class="level" :class="{lvColor1:item.grade == 1, lvColor2:item.grade == 2, lvColor3:item.grade == 3}">{{getLevel(item.grade)}}</span>
                    </div>
                    <div class="member-list-item">
                        <img src="~static/img/member/new/phone.png" />
                        {{item.phone}}
                    </div>
                    <div class="member-list-item">
                        <el-checkbox-group v-model="checkList" @change="checkChange">
                            <el-checkbox :label="item.memberId"></el-checkbox>
                        </el-checkbox-group>
                    </div>


<!-- 
                    <div class="label">
                        <span class="type" :class="{typeColor1: item.type == 1, typeColor2: item.type == 2,typeColor3: item.type == 3}">{{getType(item.type, item)}}</span>
                        <span class="level" :class="{lvColor1:item.grade == 1, lvColor2:item.grade == 2, lvColor3:item.grade == 3}">{{getLevel(item.grade)}}</span>
                    </div>
                    <div class="phone">
                        <img src="~static/img/member/new/phone.png" />
                        {{item.phone}}
                    </div>
                    <div class="check">
                        <el-checkbox-group v-model="checkList" @change="checkChange">
                            <el-checkbox :label="item.memberId"></el-checkbox>
                        </el-checkbox-group>
                    </div> -->
                </li>
            </ul>
        </div>
        <div class="chose-btn" @click="save" v-if="isAddIntention">保存</div>
        <div class="chose-btn" @click="closeDia" v-else>下一步</div>
    </div>
</template>

<script>
import {seekMemberAllList} from 'Api/commonality/seek'
import {operateOpIntention, operateRelateFaceMember} from 'Api/commonality/operate'
import DropDownMenu from './../../../components/template/DropDownMenu'
import FormatImg from "components/template/DefaultHeadFormat.vue";
export default {
    props: [
        'isAddIntention',
        'isRadio', // 是否单选
        'shopId',
        'isChoseMember',
        'relevanceId'
    ],
    watch: {
        isChoseMember () {
            this.memberAllList()
        }
    },
    components: {
        DropDownMenu,
        FormatImg
    },
    data () {
        return {
            keyWord: '',
            memberType: '',
            memberGrade: '',
            followStatus: '',
            buyTime: '',
            dataList: [],
            checkList: [],
            memberTypeList: [
                {
                    name: '私有',
                    type: 1
                },
                {
                    name: '共有',
                    type: 2
                },
                {
                    name: '公共',
                    type: 3
                },
            ],
            memberGradeList: [
                {
                    name: '普通',
                    type: 1
                },
                {
                    name: '中级',
                    type: 2
                },
                {
                    name: '重要',
                    type: 3
                },
            ],
            followStatusList: [
                {
                    name: '已跟进',
                    type: 1
                },
                {
                    name: '未跟进',
                    type: 2
                },
                {
                    name: '已放弃',
                    type: 3
                },
                {
                    name: '待跟进',
                    type: 4
                },
            ],
            buyTimeList: [
                {
                    name: '今天',
                    type: 1
                },
                {
                    name: '三天以内',
                    type: 2
                },
                {
                    name: '一周以内',
                    type: 3
                },
                {
                    name: '一个月以内',
                    type: 4
                },
                {
                    name: '三个月以内',
                    type: 5
                },
            ]
        }
    },
    created () {
        this.memberAllList()
    },
    mounted () {
        $(".member-list").mCustomScrollbar({
            theme: "minimal-dark",
            axis: "y"
        });
    },
    methods: {
        closeDia () { // 关闭弹窗
            this.$emit("closeChoMember", {list: this.checkList})
            this.checkList = []
        },
        save () {
            if (this.isRadio) {
                this._operateRelateFaceMember()
            } else {
                this._operateOpIntention()
            }
        },
        _operateOpIntention () {
            if (!this.checkList[0]) {
                this.$emit("closeChoMember")
                return
            }
            // 会员id  memberId
            let idList = []
            for (let i of this.checkList) {
                idList.push({
                    id: i
                })
            }
            let options = {
                shopId: this.shopId,
                idList: idList,
                operateType: '1'
            }
            operateOpIntention(options)
                .then(res => {
                    if (res.data.state === 200) {
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        })
                        this.$emit("closeChoMember")
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
        },
        _operateRelateFaceMember () {
            let options = {
                shopId: this.shopId,
                memberId: this.checkList[0],
                otherId: this.relevanceId
            }
            operateRelateFaceMember(options)
                .then(res => {
                    if (res.data.state === 200) {
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        })
                        this.$emit("closeChoMember")
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
        },
        getLevel (level) {
            switch (level) {
                case '1':
                    return "普通"
                case '2':
                    return "中级"
                case '3':
                    return "重要"
            }
        },
        getType (type, item) {
            //console.log(item)
            switch (type) {
                case '1':
                    return '私有'
                case '2':
                    return '共有'
                case '3':
                    return '公共'
            }
        },
        checkChange (val) { // 多选选中的改变
            if (val[1] && this.isRadio) {
                this.checkList = []
                this.checkList[0] = val[1]
            }
        },
        dropReturn (val) {
            console.log(val)
            if (val.type == '店铺') {
                this.shopId = val.item.operateId
                this.shopName = val.item.operateName
            } else if (val.type == '会员类型') {
                this.memberType = val.item.operateId
            } else if (val.type == '会员级别') {
                this.memberGrade = val.item.operateId
            } else if (val.type == '跟进状态') {
                this.followStatus = val.item.operateId
            } else if (val.type == '购买时间') {
                this.buyTime = val.item.operateId
            }
            this.memberAllList()
        },
        clearInfo (val) {
            console.log(val)
            if (val.type == '店铺') {
                this.shopId = ''
                this.shopName = ''
            } else if (val.type == '会员类型') {
                this.memberType = ''
            } else if (val.type == '会员级别') {
                this.memberGrade = ''
            } else if (val.type == '跟进状态') {
                this.followStatus = ''
            } else if (val.type == '购买时间') {
                this.buyTime = ''
            }
            this.memberAllList()
        },
        memberAllList () {
            let options = {
                shopId: this.shopId,
                keyWord: this.keyWord,
                memberType: this.memberType,
                memberGrade: this.memberGrade,
                followStatus: this.followStatus,
                buyTime: this.buyTime,
                intentionFlag: this.isAddIntention ? '0' : ''
            }
            seekMemberAllList(options).then((res) => {
                if (res.data.state == 200) {
                    this.dataList = res.data.data.dataList
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
        }
    }
}
</script>

<style lang="scss">
.choseMemberDig {
    width: 700px;
    height: 730px;
    background:#fff;
    border-radius: 10px;
    .el-dialog__header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .el-dialog__body {
        padding: 0 28px;
    }
}
.chose-wrap {
    .title {
        padding-top: 20px;
        font-size: 14px;
        color:#333;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .menu-list {
        margin-bottom: 24px;
        height: 28px;
        .search {
            width: 190px;
            height: 28px;
            border-radius: 4px;
            float: left;
            position: relative;
            overflow: hidden;
            margin-right: 20px;
            input {
                border-radius: 4px;
                width: 188px;
                height: 28px;
                border: 1px solid #d6d6d6;
                padding-left: 10px;
            }
            .search-btn {
                position: absolute;
                width: 30px;
                height: 28px;
                right: 0;
                top: 0;
                background: #2993f8;
                text-align: center;
                cursor: pointer;
                i {
                    color:#fff;
                    line-height: 28px;
                }
            }
        }
        .drop-block {
            float: left;
            width: 92px;
            height: 28px;
            border-radius: 4px;
            border: 1px solid #d6d6d6;
            text-align: center;
            margin-right: 18px;
        }
        .last {
            margin-right: 0;
        }
    }
    .member-list {
        height: 500px;
        margin-bottom: 60px;
        ul {
            height: 100%;
            li {
                display: flex;
                height: 50px;
                // line-height: 50px;
                .member-list-item{
                    height: 50px;
                    margin-right: 5px;
                    overflow: hidden;
                    float: left;
                }
                .member-list-item:nth-child(1){
                    
                }
                .member-list-item:nth-child(2){
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    width: 100px;
                    text-align: center;
                }
                .member-list-item:nth-child(3){
                    padding-top: 17px;
                    &>span {
                        width: 34px;
                        height: 16px;
                        border-radius: 4px;
                        float: left;
                        font-size: 12px;
                        text-align: center;
                        line-height: 16px;
                        color:#fff;
                    }
                    .type {
                        margin-right: 15px;
                    }
                    .typeColor1 { background:#0078f2;}
                    .typeColor2 { background:#009dff;}
                    .typeColor3 { background:#96d7ff;}
                    .lvColor1 {background:#ffc62e;}
                    .lvColor2 {background:#ffa200;}
                    .lvColor3 {background:#f27200;}
                }
                .member-list-item:nth-child(4){
                    flex: 1;
                    >img {
                        width: 14px;
                        height: 14px;
                        margin-top: 18px;
                        margin-right: 7px;
                        border-radius: 0;
                    }
                }
                // img {
                //     width: 34px;
                //     height: 34px;
                //     float: left;
                //     margin-top: 8px;
                //     margin-left: 20px;
                //     margin-right: 20px;
                //     border-radius: 50%;
                // }
                .name {
                    float: left;
                    margin-right: 20px;
                }
                .label {
                    float: left;
                    width: 85px;
                    padding-top: 17px;
                    &>span {
                        width: 34px;
                        height: 16px;
                        border-radius: 4px;
                        float: left;
                        font-size: 12px;
                        text-align: center;
                        line-height: 16px;
                        color:#fff;
                    }
                    .type {
                        margin-right: 15px;
                    }
                    .typeColor1 { background:#0078f2;}
                    .typeColor2 { background:#009dff;}
                    .typeColor3 { background:#96d7ff;}
                    .lvColor1 {background:#ffc62e;}
                    .lvColor2 {background:#ffa200;}
                    .lvColor3 {background:#f27200;}
                }
                .phone {
                    float: left;
                    img {
                        width: 14px;
                        height: 14px;
                        margin-top: 18px;
                        margin-right: 7px;
                        border-radius: 0;
                    }
                }
                .check {
                    float: right;
                    margin-right: 20px;
                    .el-checkbox-group {
                        .el-checkbox {

                            .el-checkbox__input {
                                .el-checkbox__inner {
                                    border-radius: 4px;
                                }
                            }
                        }
                    }
                }
            }
            &>li:nth-child(even) {
                background:#f4f4f4;
            }
        }
    }
    .chose-btn {
        width: 90px;
        height: 28px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        line-height: 28px;
        background:#2993f8;
        color:#fff;
        margin: 0 auto;
        cursor: pointer;
    }
}
</style>
