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
                    <!-- <span>{{oldMemberInfo.username}}</span> -->
                    <input type="text" :disabled="!isShopMan" maxlength="4" v-model="dataInfo.username" @blur="setUsername">
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
                    <i v-if="isShopMan" @click="isChoseLeader=true" id="iconjia" class="iconfont icon-jia jia"></i>
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
                    <!-- <span>{{ dataInfo.sex == '3' ? '无': dataInfo.sex == '1'? '男':'女' }}</span> -->
                    <el-radio-group v-model="dataInfo.sex" @change="setSex" :disabled="!isShopMan">
                        <el-radio :label="'1'">男</el-radio>
                        <el-radio :label="'2'">女</el-radio>
                    </el-radio-group>
                </div>
                <div class="item">
                    <span class="item-label">生日</span>
                    <!-- <span>{{ _formDataTimeYND(oldMemberInfo.birthday) ? _formDataTimeYND(oldMemberInfo.birthday) : '-'}}</span> -->
                    
                    <!-- 日期控件 -->
                    <el-date-picker
                        v-model="dataInfo.birthday"
                        type="date"
                        placeholder="选择日期"
                        :disabled="!isShopMan"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                        @change="setBirthday">
                    </el-date-picker>
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
                    <input @blur="followCreateSign" :disabled="!isShopMan" v-model="signName" type="text" placeholder="添加标签" maxlength="8" class="bq-add fl" />
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
            .el-date-editor.el-input {
                width: 172px;
                .el-input__icon {
                    display: none;
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
    .memberinfo-content{
        .memberinfo-top{
            width: 100%;
            height: 170px;
            background: #eef7fe;
            border-radius: 10px;
            padding: 40px;
            margin-bottom: 28px;
            display:flex;
            .member-log{
                padding-top: 9px;
                margin-right: 30px;
            }
            .member-message{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                width: 100%;
                .item {
                    width: 48%;
                    height: 30px;
                    line-height: 30px;
                    color:#333;
                    position: relative;
                    input{
                        width: 50%;
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
                    .item-label {
                        display: inline-block;
                        width: 62px;
                        text-align: right;
                        margin-right: 28px;
                        color: #999;
                    }
                    .item-star{
                        &::before{
                            content: '*';
                            display: inline-block;
                            color: red;
                        }
                    }
                    .item-level{
                        display: inline-block;
                        width: 34px;
                        height: 18px;
                        line-height: 18px;
                        font-size: 12px;
                        color: #fff;
                        text-align: center;
                        border-radius: 4px;
                        background: #ffc62e;
                        position: absolute;
                        top: 5px;
                    }
                }
            }
        }
        .memberinfo-bottom{
            display:flex;
            flex-wrap: wrap;
            .item-card{
                width: 200px;
                height: 175px;
                padding: 14px;
                margin-bottom: 20px;
                margin-right: 20px;
                border: 1px solid #dcdfe6;
                border-radius: 10px;
                // box-shadow: 0 0 8px rgba(0,0,0,.2);
                
                &:hover{
                    border: 1px solid #2993f8;
                    box-shadow: 0 0 8px rgba(0,0,0,.2);
                }
                .item-card-message{
                    font-size: 16px;
                    color: #666;
                    font-weight: bold;
                    margin-bottom: 25px;
                    line-height: 26px;
                    img{
                        margin-right: 14px;
                    }
                }
                .item-card-info {
                    margin-bottom: 15px;
                    i{
                        margin-right: 8px;
                    }
                    .card-info-label{
                        color: #999;
                    }
                }
                .btn-group-jy{
                    display: flex;
                    justify-content: space-between;
                    opacity: 0;
                    transition: all .5s;
                    .btn-kj{
                        width: 76px;
                        height: 30px;
                        border: 1px solid #2993f8;
                        border-radius: 5px;
                        color: #2993f8;
                        font-size: 12px;
                        text-align: center;
                        line-height: 28px;
                        box-shadow: 0 0 8px #cccccc;
                        cursor: pointer;
                        &:hover {
                            background: #2993f8;
                            color:#fff;
                        }
                    }
                }
                .btn-group-gj{
                    display: flex;
                    justify-content: center;
                    opacity: 0;
                    transition: all .5s;
                    .btn-gj{
                        width: 76px;
                        height: 30px;
                        border: 1px solid #2993f8;
                        border-radius: 5px;
                        color: #2993f8;
                        font-size: 12px;
                        text-align: center;
                        line-height: 28px;
                        box-shadow: 0 0 8px #cccccc;
                        cursor: pointer;
                        &:hover {
                            background: #2993f8;
                            color:#fff;
                        }
                    }
                }
                .btn-group-jf{
                    display: flex;
                    justify-content: center;
                    opacity: 0;
                    transition: all .5s;
                    margin-top: 48px;
                    .btn-jf{
                        width: 76px;
                        height: 30px;
                        border: 1px solid #2993f8;
                        border-radius: 5px;
                        color: #2993f8;
                        font-size: 12px;
                        text-align: center;
                        line-height: 28px;
                        box-shadow: 0 0 8px #cccccc;
                        cursor: pointer;
                        &:hover {
                            background: #2993f8;
                            color:#fff;
                        }
                    }
                }
                .btn-show{
                    opacity: 1;
                }
                &:nth-of-type(3n){
                    margin-right: 0;
                }
                .color1 {
                    color: #2993f8;
                }
                .color2 {
                    color: #ffa200;
                }
                .color3 {
                    color: #a800ff;
                }
                .color4 {
                    color: #f43ec7;
                }
                .color5 {
                    color: #fd3261;
                }
            }
        }
    }
</style>

<script>
import FormatImg from "components/template/DefaultHeadFormat.vue"
import ChoseLeader from '../choseLeader'
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'
import {operateFollowCreateSign, operateMemberCreate, operateMemberUpdateBy, operateMemberOperation, operateOpIntention} from 'Api/commonality/operate'
import {seekGetUserInfo} from 'Api/commonality/seek'
import * as jurisdictions from 'Api/commonality/jurisdiction'

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
            isShopMan:false,
            // 生日
            birthday:''
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
            let orderList = []
            if(this.dataInfo.orderList.length != 0){
                this.dataInfo.orderList.forEach((item,index) => {
                    orderList[index] = {orderNo:item.orderNum}
                })
            }

            // 生日的时间格式
            // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
                orderList,
                type,
                birthday: this.birthday                
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
            let orderList = []
            if(this.dataInfo.orderList.length != 0){
                this.dataInfo.orderList.forEach((item,index) => {
                    orderList[index] = {orderNo:item.orderNum}
                })
            }

            // 生日的时间格式
            this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
                orderList
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
            console.log('修改积分时候的参数',this.dataInfo)
            let orderList = []
            if(this.dataInfo.orderList.length != 0){
                this.dataInfo.orderList.forEach((item,index) => {
                    orderList[index] = {orderNo:item.orderNum}
                })
            }

            // 生日的时间格式
            // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
                orderList,
                birthday: this.birthday
                
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
            // 生日的时间格式
            // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)
            let orderList = []
            if(this.dataInfo.orderList.length != 0){
                this.dataInfo.orderList.forEach((item,index) => {
                    orderList[index] = {orderNo:item.orderNum}
                })
            }

            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
                birthday: this.birthday,
                orderList
                
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
            let orderList = []
            if(this.dataInfo.orderList.length != 0){
                this.dataInfo.orderList.forEach((item,index) => {
                    orderList[index] = {orderNo:item.orderNum}
                })
            }

            // 生日的时间格式
            // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
                orderList,
                birthday: this.birthday
                
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
            let orderList = []
            if(this.dataInfo.orderList.length != 0){
                this.dataInfo.orderList.forEach((item,index) => {
                    orderList[index] = {orderNo:item.orderNum}
                })
            }

            // 生日的时间格式
            // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
                orderList,
                birthday: this.birthday
                
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
            if(this.dataInfo.signList.length > 9) {
                this.$message({
                    type:'warning',
                    message:'标签上限为十个'
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

                    let orderList = []
                    if(this.dataInfo.orderList.length != 0){
                        this.dataInfo.orderList.forEach((item,index) => {
                            orderList[index] = {orderNo:item.orderNum}
                        })
                    }

                    let optionsdata = Object.assign({},this.dataInfo,{
                        memberId: this.memberId,
                        shopId: this.shopId,
                        orderList,
                        birthday:this.birthday
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
            
            let orderList = []
            if(this.dataInfo.orderList.length != 0){
                this.dataInfo.orderList.forEach((item,index) => {
                orderList[index] = {orderNo:item.orderNum}
            })
            }

            // 生日的时间格式

            let optionsdata = Object.assign({},this.dataInfo,{
                        memberId: this.memberId,
                        shopId: this.shopId,
                        orderList,
                        birthday: this.birthday
                        
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
        // 修改生日
        setBirthday (val){
            let orderList = []
            if(this.dataInfo.orderList.length != 0){
                this.dataInfo.orderList.forEach((item,index) => {
                    orderList[index] = {orderNo:item.orderNum}
                })
            }
            // this.dataInfo.birthday = val
            this.birthday = this.timeFormat(val)

            console.log(this.dataInfo.birthday)
            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
                birthday: this.timeFormat(val),
                orderList
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
        // 格式化日期
        timeFormat (parm) {
        
            if(parm) {
                let year = parm.substring(0, 4)
                let month = parm.substring(5, 7)
                let data = parm.substring(8, 10)
                return year + month + data + '000000'
            }
        },
        // 修改姓名
        setUsername() {

            let orderList = []
            if(this.dataInfo.orderList.length != 0){
                this.dataInfo.orderList.forEach((item,index) => {
                    orderList[index] = {orderNo:item.orderNum}
                })
            }

            // console.log(this.dataInfo)
            // 生日的时间格式
            // this.dataInfo.birthday = this.timeFormat(this.dataInfo.birthday)

            let options = Object.assign({},this.dataInfo,{
                memberId: this.memberId,
                shopId: this.shopId,
                birthday: this.birthday,
                orderList
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
        // 格式化获取的时间
        formatData(parm) {
            
            if(parm) {
                let year = parm.substring(0, 4)
                let month = parm.substring(4, 6)
                let data = parm.substring(6, 8)
                return year + '-' + month + '-' + data
            }
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
            this.dataInfo.birthday = this.formatData(this.dataInfo.birthday)
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
                    
                    // 多重身份判断
                    res.data.data.roleList.forEach(item => {
                        // 判断是不是店长
                        if(item.role == 4) {
                            // 判断是不是这家店
                            if(item.shopId == this.shopId) {
                                this.isShopMan = true
                            }
                        }
                        // 判断是不是店员
                        if(item.role == 5) {
                            if(item.shopId == this.shopId) {
                                 // 判断是不是负责人
                                val.principalList.forEach(fzr => {
                                    if(fzr.userId == sessionStorage.getItem('id')) {
                                        this.isShopMan = true
                                    }
                                })
                            }
                        }
                    })
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

 