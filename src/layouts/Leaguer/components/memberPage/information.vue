<template>
    <div class="memberinfo-content">
        <div class="memberinfo-top">
            <!-- 头像 -->
            <div class="member-log">
                <FormatImg :logo="oldMemberInfo.memberLogo" :userName="oldMemberInfo.username" :size="88"></FormatImg>
            </div>
            <!-- 文字内容 -->
            <div class="member-message">

                <div class="item">
                    <span class="item-star item-label">姓名</span>
                    <span>{{oldMemberInfo.username}}</span>
                </div>

                <div class="item">
                    <span class="item-star item-label">电话</span>
                    <span>{{oldMemberInfo.phone}}</span>
                </div>

                <div class="item">
                    <span class="item-label">会员积分</span>
                    <span>{{oldMemberInfo.score || 0}}分</span>
                </div>
                <div class="item" id="memberlevel">
                    <span class="item-label">会员等级</span>
                    <span @click="getLevel(1)" class="item-level1 item-level">普通<i class="iconfont icon-duigou2 duihao" :class="actionType == 1 ? 'action' : ''"></i></span>
                    <span @click="getLevel(2)" class="item-level2 item-level">中级<i class="iconfont icon-duigou2 duihao" :class="actionType == 2 ? 'action' : ''"></i></span>
                    <span @click="getLevel(3)" class="item-level3 item-level">重要<i class="iconfont icon-duigou2 duihao" :class="actionType == 3 ? 'action' : ''"></i></span>
                </div>

                <div class="item" @mouseover="showBtn" @mouseout="hiddenBtn">
                    <span class="item-label">负责人</span>
                    <i @click="isChoseLeader=true" id="iconjia" class="iconfont icon-jia jia"></i>
                    <span>{{ leaderStr || '指派' }}</span>
                </div>
            </div>
        </div>
        <div class="member-edit">
            <h4>基本信息</h4>
            <div class="member-edit-info">
                <div class="item">
                    <span class="item-label">会员编号</span>
                    <span>{{ oldMemberInfo.memberNum }}</span>
                </div>
                <div class="item">
                    <span class="item-label">性别</span>
                    <span>{{ dataInfo.sex == '3' ? '无': dataInfo.sex == '1'? '男':'女' }}</span>
                    <!-- <el-radio-group v-model="dataInfo.sex" @change="setSex" :disabled="!isShopMan">
                        <el-radio :label="'1'">男</el-radio>
                        <el-radio :label="'2'">女</el-radio>
                    </el-radio-group> -->
                </div>
                <div class="item">
                    <span class="item-label">生日</span>
                    <span>{{ _formDataTimeYND(oldMemberInfo.birthday) ? _formDataTimeYND(oldMemberInfo.birthday) : '-'}}</span>
                </div>
                <div class="item">
                    <span class="item-label">微信号</span>
                    <input type="text" :disabled="!isShopMan" maxlength="20" v-model="dataInfo.weixin" @blur="setWeixin">
                </div>
                <div class="item">
                    <span class="item-label">邮箱</span>
                    <input type="email" :disabled="!isShopMan" v-model="dataInfo.email" @blur="setEmail">
                </div>
            </div>
            <div class="member-edit-bottom">
                <div class="member-edit-bz">
                    <div class="title">备注</div>
                    <el-input
                        type="textarea"
                        :rows="4"
                        :maxlength="50"
                        :disabled="!isShopMan"
                        placeholder="请输入备注"
                        v-model="dataInfo.remark"
                        @blur="setRemark">
                    </el-input>
                </div>
                <div class="member-edit-bq">
                    <div class="title fl">标签</div>
                    <div class="bq-item fl" v-for="(item,index) in dataInfo.signList" :key="index">
                        <i v-if="isShopMan" @click.stop="delLabel(item, index)" class="iconfont icon-guanbi-copy"></i>
                        {{item.signName}}
                    </div>
                    <input @blur="followCreateSign" :disabled="!isShopMan" v-model="signName" type="text" placeholder="添加标签" maxlength="6" class="bq-add fl" />
                </div>
            </div>
        </div>
        <!-- 返回按钮 -->
        <div class="return-btn">
            <el-button style="width:80px" type="primary" size="medium" @click="goBack">返回</el-button>
        </div>



        <!-- 一切跟着主流走 -->
        <el-dialog :modal="false" :visible.sync="isChoseLeader" top="0%" customClass="choseLeaderDig" :close-on-click-modal="false">
            <ChoseLeader
                :dataInfo="dataInfo"
                :shopId="shopId"
                :addModel="1"
                :isChoseLeader="isChoseLeader"
                @closeChoMember="closeChoLeader"
            ></ChoseLeader>
        </el-dialog>
    </div>
</template>

<style lang="scss">
#memberlevel,.item{
    .item-level1{
        left: 98px;
        background: #ffc62e;
        cursor: pointer;
    }
    .item-level2{
        left: 142px;
        background: #ffa200;
        cursor: pointer;
    }
    .item-level3{
        left: 186px;
        background: #ed7000;
        cursor: pointer;
    }
    .duihao{
        position: absolute;
        top: -7px;
        right: -6px;
        color: #ffa200;
        opacity: 0;
    }
    .jia{
        color: #2993f8;
        cursor: pointer;
        display: none;
    }
    .action {
        opacity: 1;
    }
}
.member-edit {
    margin-bottom: 20px;
    h4 {
        padding-left: 8px;
        position: relative;
        margin-bottom: 28px;
        color: #2993f8;
        &::before{
            content: '';
            display: inline-block;
            width: 2px;
            height: 14px;
            background: #2993f8;
            position: absolute;
            top: 3px;
            left: 0;
        }
    }
    .member-edit-info{
        padding: 0 8px;
        display:flex;
        flex-wrap: wrap;
        .item {
            width: 48%;
            margin-bottom: 34px;
            .item-label{
                display: inline-block;
                width: 80px;
            }
            input{
                height: 28px;
                background-color:transparent;
                font-size: 14px;
                border-radius: 3px;
                &:active,
                &:hover,
                &:focus{
                    border: 1px solid #2993f8;
                    background-color: #f4f9ff;
                }
            }
        }
    }
    .member-edit-bottom {
        padding: 0 8px;
        display: flex;
        height: 150px;
        .member-edit-bz {
            width: 50%;
            .title {
                margin-right: 10px;
                display: inline-block;
                position: relative;
                padding-left: 8px;
                color: #2993f8;
                font-size: 14px;
                &::before{
                    content: '';
                    display: inline-block;
                    width: 2px;
                    height: 14px;
                    background: #2993f8;
                    position: absolute;
                    top: 3px;
                    left: 0;
                }
            }
            .el-textarea{
                width: 80%;
                vertical-align: top;
            }
        }
        .member-edit-bq{
            width: 50%;
            // display: flex;
            // flex-wrap: wrap;
            .title {
                height: 26px;
                margin-right: 10px;
                display: inline-block;
                position: relative;
                padding-left: 8px;
                color: #2993f8;
                font-size: 14px;
                &::before{
                    content: '';
                    display: inline-block;
                    width: 2px;
                    height: 14px;
                    background: #2993f8;
                    position: absolute;
                    top: 3px;
                    left: 0;
                }
            }
            .bq-item{
                // width: 86px;
                padding: 0 10px;
                height: 26px;
                margin-right: 14px;
                margin-bottom: 10px;
                background: #2993f8;
                color: #fff;
                text-align: center;
                line-height: 26px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                position: relative;
                i {
                    position: absolute;
                    top: -8px;
                    right: -4px;
                    font-size: 12px;
                    opacity: 0;
                    transition: all .5s;
                    &:hover {
                        color: #666;
                        opacity: 1;                        
                        cursor: pointer;
                    }
                }
            }
            .bq-add {
                width: 86px;
                height: 26px;
                background: #fff;
                color: #2993f8;
                text-align: center;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                border-style: dashed;
                cursor: pointer;
            }
        }
    }
}
.return-btn {
    display:flex;
    justify-content: center;
}
.menu-list {
    padding-left: 20px;
}
</style>

<script>
import FormatImg from "components/template/DefaultHeadFormat.vue"
import ChoseLeader from '../choseLeader'
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'
import {operateFollowCreateSign, operateMemberCreate, operateMemberUpdateBy, operateMemberOperation, operateOpIntention} from 'Api/commonality/operate'
import {seekGetUserInfo} from 'Api/commonality/seek'


import {mapActions, mapGetters} from 'vuex'

export default {
    data () {
        return {
            // 判断选中那个等级
            actionType:'',
            sex:'3',
            remark:'',
            weixin:'',
            email:'',
            leaderStr:'',
            signName:'',
            // 弹框
            isChoseLeader:false,
            dataInfo: {
                username: '',
                principalFlag: '',
                followTime: '',
                followStatus: '',
                followUserName: '',
                latelyBuyTime: '',
                latelyBuyNum: '',
                latelyBuyPrice: '',
                logo: '',
                memberName: '', // 名称
                memberNum: '',
                phone: '', // 手机号
                cardSrc: '', // 名片地址
                orderList: [
                ],
                principalList: [], // 负责人列表
                birthday: '', // 生日
                email: '', // 邮箱
                wx: '', // 微信号
                industry: '', // 行业
                sex:'',
                provinceId: '',
                provinceName: '',
                cityId: '',
                cityName: '',
                areaId: '',
                areaName: '',
                address: '',
                remark: '',
                createTime: '',
                totalMoney: '',
                signList: [],
            },
            isShopMan:true
        }
    },
    props:['oldMemberInfo','shopId','memberId','memberInfo'],
    components:{
        FormatImg,
        ChoseLeader,
    },
    computed:{
        // ...mapGetters([
        //     "userPositionInfo"
        // ]),
        // isShopMan(){
        //     if(this.userPositionInfo.roleList.length === 1){
        //         if(this.userPositionInfo.roleList[0].role > 3){
        //             return true
        //         } else {
        //             return false
        //         }
        //     } else {
        //         return true
        //     }
        // }
    },
    methods:{
        showBtn(){
            $('#iconjia').show()
        },
        hiddenBtn() {
            $('#iconjia').hide()
        },
        // 修改会员等级
        getLevel(type){
            if(!this.isShopMan){
                return
            }
            this.actionType = type
            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
                type
            })
            operateMemberUpdateBy(options).then(res => {
                console.log(res.data.state)
                if(res.data.state === 200) {
                    this.$message({
                        type: 'success',
                        message: '修改会员等级成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '修改会员等级失败'
                    })
                }
            })
        },
        goBack(){
            this.$emit('goBack',true)

        },
        // 负责人
        getHead(list) {
            if(list){
                if(list.length === 0) {
                    return '指派'
                } else {
                    let newArrr = []
                    list.forEach(item => {
                        newArrr.push(item.username)
                    })
                    if(newArrr.length == 1) {
                        return newArrr[0]
                    } else {
                        return newArrr.join(',')
                    }
                }
            } else {
                return '指派'
            }
        },
        // 格式化时间
        _formDataTimeYND(parm){
            return GetNYR(parm)
        },
        // 获取标签
        getSignList(list) {
            if(list){
                if(list.length === 0) {
                    return []
                } else {
                    let newArrr = list.forEach(item => {
                        return item.signName
                    })
                    return newArrr
                }
            }
        },
        // 关闭负责人的回调
        closeChoLeader(parm) {
            this.dataInfo.principalList = []
            this.isChoseLeader = false

            parm.list.forEach((item, index) => {
                this.dataInfo.principalList.push({userId: item})
            })

            this.leaderStr = parm.nameList.join(',') || '指派'
            
            // 修改负责人
            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
            })
            operateMemberUpdateBy(options).then(res => {
                console.log(res.data.state)
                if(res.data.state === 200) {
                    // this.$message({
                    //     type: 'success',
                    //     message: '修改负责人成功'
                    // })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            })
        },
        // 修改微信号
        setWeixin(){
            // 判断微信号
            if(this.dataInfo.weixin && this.dataInfo.weixin.search(/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/) == -1) {
                this.$message({
                    type: 'warning',
                    message: '请输入正确的微信号'
                })
                return
            }
            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
            })
            operateMemberUpdateBy(options).then(res => {
                if(res.data.state === 200) {

                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            })
        },
        // 修改性别
        setSex(){
            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
            })
            console.log(options)
            operateMemberUpdateBy(options).then(res => {
                console.log(res.data.state)
                if(res.data.state === 200) {

                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
               }
            })
        },
        // 修改邮箱
        setEmail(){
            // 判断邮箱
            if(this.dataInfo.email && this.dataInfo.email.search(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) == -1){
                this.$message({
                    type: 'warning',
                    message: '请输入正确的邮箱'
                })
                return
            }
            
            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
            })
            operateMemberUpdateBy(options).then(res => {
                console.log(res.data.state)
                if(res.data.state === 200) {
                    
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            })
        },
        // 修改备注
        setRemark(){
            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
            })
            operateMemberUpdateBy(options).then(res => {
                console.log(res.data.state)
                if(res.data.state === 200) {
                    // this.$message({
                    //     type: 'success',
                    //     message: '修改备注成功'
                    // })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            })
        },
        // 修改标签
        followCreateSign () { // 创建标签
            // 创建标签判断
            if(this.dataInfo.signList.length > 7) {
                this.$message({
                    type:'warning',
                    message:'标签上限为八个'
                })
                return
            }
            let options = {
                shopId: this.shopId,
                signName: this.signName
            }
            operateFollowCreateSign(options).then((res) => {
                if (res.data.state == 200) {
                    this.dataInfo.signList.push({
                        signName: this.signName,
                        signId: res.data.data.signId
                    })
                    this.signName = ''

                    let optionsdata = Object.assign({},this.dataInfo,{
                        memberId: this.memberId,
                        shopId: this.shopId,
                    })

                    operateMemberUpdateBy(optionsdata).then(res => {
                        if(res.data.state === 200) {
                            // this.$message({
                            //     type: 'success',
                            //     message: '添加标签成功'
                            // })
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })

                }
            }, (res) => {
                console.log(res)
            })
        },
        // 删除标签
        delLabel (item, index) {
            this.dataInfo.signList.splice(index, 1)
            let optionsdata = Object.assign({},this.dataInfo,{
                        memberId: this.memberId,
                        shopId: this.shopId,
                    })

                    operateMemberUpdateBy(optionsdata).then(res => {
                        if(res.data.state === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除标签成功'
                            })
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除标签失败'
                            })
                        }
                    })
        },
        isChoseLeaderbymember(){
            this.$emit("isChoseLeaderbymember",true)
        }
    },
    watch:{
        oldMemberInfo(val) {
            this.dataInfo = Object.assign(this.dataInfo,this.oldMemberInfo)
            this.actionType = this.oldMemberInfo.type
            this.leaderStr = this.getHead(this.dataInfo.principalList)
        },
        memberInfo(val) {
             // 获取用户权限
            let options = {
                userId: sessionStorage.getItem('id')
            }

            seekGetUserInfo(options).then(res => {
                if(res.data.data.roleList.length === 1){
                    if(res.data.data.roleList[0].role == 4){
                        this.isShopMan = true
                    } else if(res.data.data.roleList[0].role == 5){
                        console.log('现在有没有数据',this.memberInfo.principalList)
                        if(this.memberInfo.principalList.length != 0) {
                            this.memberInfo.principalList.forEach(item => {
                                if(item.userId == sessionStorage.getItem('id')) {
                                    this.isShopMan = true
                                }
                            })
                        } else {
                            this.isShopMan = false
                        }
                    }
                } else {
                    this.isShopMan = false
                }
            })
        }

    },
    created() {
        this.dataInfo = Object.assign(this.dataInfo,this.oldMemberInfo)
        // 等级标签
        this.actionType = this.oldMemberInfo.type
        
    },
    mounted() {
        // 初始化的负责人显示
        this.leaderStr = this.getHead(this.dataInfo.principalList)
    },
}
</script>

 