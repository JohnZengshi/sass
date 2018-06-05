<template>
    <div class="memberinfo-content">
        <div class="trading-top-num">
            <div class="num-item num-item-lf">
                <p class="num">{{integralData.score}}</p>
                <p class="label">积分总数</p>
            </div>
        </div>
        <div class="integral-list">
            <div class="integral-item item-header" v-if="integralData.dataList.length != 0">
                <span>积分类型</span>
                <span>积分明细</span>
                <span>时间</span>
            </div>
            <div class="integral-item" v-for="(item,index) in integralData.dataList" :key="index" v-if="item.score">
                <i v-if="item.remark" class="el-icon-edit icon-color" :title="item.remark"></i>
                <span>{{getLabel(item.type)}}</span>
                <span>{{item.score}}</span>
                <span>{{_GetNYR(item.date)}}</span>
            </div>
        </div>
        <div class="return-btn-group">
            <div class="btn" @click="goBack">返回</div>
            <div class="btn" v-if="isShopMan" @click="Integral = true">修改积分</div>
        </div>

        <!-- 积分修改弹窗 -->
        <el-dialog
            :visible.sync="Integral"
            customClass="visitAimDig modify"
            top="10%"
            :modal="false"
            @close="handleClose"
            :close-on-click-modal="false">
            <!-- 头部 -->
            <div class="aim-wrap">
                <div class="title">
                    <img src="../../../../../static/img/piliang.png" />
                    <div class="name">修改积分</div>
                </div>
                <!-- 目前积分 -->
                <p class="line1">目前积分  <span>{{integralData.score}}</span></p>
                <!-- 选择规则 -->
                <p style="margin-bottom: 10px;">选择规则</p>
                <el-radio-group class="line1" v-model="incordec">
                    <el-radio :label="1">增加积分</el-radio>
                    <el-radio :label="2">减少积分</el-radio>
                </el-radio-group>
                <!-- 变动积分数 -->
                <p style="margin-bottom: 10px;">变动积分数</p>
                <el-input type="number" @blur="showJF" v-model="bs" placeholder="请输入内容" class="line1"></el-input>
                <!-- 备注信息 -->
                <p style="margin-bottom: 10px;">备注信息</p>
                <el-input
                    class="line1"
                    type="textarea"
                    :rows="2"
                    :maxlength="50"
                    placeholder="请输入内容"
                    v-model="remark">
                </el-input>
                <p class="btn-line">
                    <el-button class="btn-wrap" type="primary" @click="modifyBtn">确定</el-button>
                </p>
            </div>
        </el-dialog>
    </div>
</template>

<style lang="scss">
.integral-list {
    width: 100%;
    height: 460px;
    margin-bottom: 40px;
    overflow-y: scroll;
    .integral-item {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        text-align: center;
        line-height: 50px;
        position: relative;
        span {
            display: inline-block;
            width: 30%;
        }
        &:nth-child(odd) {
            background: #fff;
        }
        &:nth-child(even) {
            background: #f4f4f4;
        }
    }
    .item-header {
        color: #999;
    }
    .icon-color {
        position: absolute;
        left: 52px;
        color: #666;
        line-height: 50px;
        &:hover {
            color: #2993f8;
        }
    }
}
.modify {
    height: 600px;
   .aim-wrap {
        padding-top: 24px;
        .title {
            width: 66px;
            margin: 0 auto;
            margin-bottom: 30px;
            padding: 0;
            img {
                width: 46px;
                height: 46px;
                margin: 10px 0 10px 10px;
                // margin-bottom: 10px;
            }
            .name {
                width: 100%;
                text-align: center;
                color:#333;
                font-weight: bold;
            }
        }
        .list {
            
            li {
                height: 42px;
                color:#666666;
                line-height: 42px;
                padding-left: 50px;
                cursor: pointer;
                .label {
                    width: 30px;
                    height: 14px;
                    display: inline-block;
                    background:#2993f8;
                    color:#fff;
                    border-radius: 4px;
                    font-size: 12px;
                    text-align: center;
                    line-height: 14px;
                    margin-top: 10px;
                    margin-left: 15px;
                }
            }
            li.active {
                color:#2993f8;
            }
        }
        .line1{
            width: 100%;   
            height: 50px;
            line-height: 50px;
            color: #666666;
            font-size: 14px;
            margin-bottom: 20px;
            span {
                color: #2993f8
            }
        }
        .btn-line {
            display: flex;
            justify-content: center;
        }
    }
}
</style>

<script>
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'
import { memberIntegralUpdate } from 'Api/member'

import {mapActions, mapGetters} from 'vuex'
import {seekGetUserInfo} from 'Api/commonality/seek'


export default {
    data () {
        return {
            informationFlag:false,
            Integral:false,
            incordec:1,
            remark:'',
            score:0,
            bs:'',
            isShopMan: true
        }
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
    props:['integralData','oldMemberInfo','memberInfo','shopId','memberId'],
    methods: {
        goBack() {
            this.$emit('goBack',true)
        },
        _GetNYR(data) {
            return GetNYR(data)
        },
        getLabel(type){
            switch (type) {
                case '1':
                    return '单次签到'
                    break;
                case '2':
                    return '连续签到'
                    break;
                case '3':
                    return '到店消费'
                    break;
                case '4':
                    return '消费抵现'
                    break;
                case '5':
                    return '人工修改'
                    break;
                case '6':
                    return '生日福利'
                    break;
                case '7':
                    return '注册福利'
                    break;
                default:
                    break;
            }
        },
        handleClose(){
            this.Integral = false
            this.score = this.memberInfo.score
            this.bs = ''
            this.remark = '' 
        },
        showJF() {
            this.score = this.memberInfo.score || 0
            let score = parseInt(this.score) || 0
            let bs = parseInt(this.bs) || 0

            switch (this.incordec) {
                case 1:
                    this.score=score+bs
                    break;
                case 2:
                    this.score=score-bs
                    if(this.score<0){
                        this.score = 0
                    }
                    break;
                default:
                    break;
            }
        },
        modifyBtn(){
            if(!this.remark) {
                this.$message({
                    type:'error',
                    message:'请输入备注内容'
                })
                return
            }
            
            // 计算会员积分
            let options = {
                remark: this.remark,
                shopId: this.shopId,
                memberId: this.memberId,
                score: this.score
            }
            // 修改会员积分
            memberIntegralUpdate(options).then(res => {
                console.log(res)
                if(res.data.state == 200){
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                    this.$emit("getData")                    
                    this.Integral = false
                }else {
                    this.$message({
                        type:'error',
                        message: res.data.msg
                    })
                    this.$emit("goback",true)
                    
                }
            })
        },
    },
    watch:{
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
    }
}
</script>

