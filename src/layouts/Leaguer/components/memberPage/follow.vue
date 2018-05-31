<template>
    <div class="memberinfo-content">
        <div class="trading-top-num">
            <div class="num-item num-item-lf">
                <p class="num">{{ followData.totalFollow }}</p>
                <p class="label">跟进记录（次）</p>
            </div>
        </div>
        <div class="follow-list">
            <div class="list-item clearfix" v-for="(item,index) in followData.dataList" :key="index">
                <div class="item-line fl">
                    <span class="fl">跟进人</span>
                    <span class="fr">{{item.followName || '指派'}}</span>
                </div>
                <div class="item-line fr" v-if="item.followStatus">
                    <span class="fl">跟进状态</span>
                    <span class="fr">{{getFollowStatus(item.followStatus)}}</span>
                </div>
                <div class="item-line fl" v-if="item.visitAim">
                    <span class="fl">跟进目的</span>
                    <span class="fr">{{getFollowPurpose(item.visitAim)}}</span>
                </div>
                <div class="item-line fr" v-if="item.followTime">
                    <span class="fl">跟进时间</span>
                    <span class="fr">{{_GetNYR(item.followTime)}}</span>
                </div>
                <div class="item-line fl" v-if="item.followType">
                    <span class="fl">跟进方式</span>
                    <span class="fr">{{getFollowType(item.followType)}}</span>
                </div>
                <div class="item-results fl" v-if="item.followResult">
                    <span class="label">跟进结果</span>
                    <span class="info">{{item.followResult}}</span>
                </div>
                <div class="item-img fl" v-if="item.followPicList.length != 0">
                    <img :src="f.picUrl" v-for="(f, i) in item.followPicList" :key="i" />
                </div>
                <div class="create-time">
                    <div class="font-wrap">创建时间{{_GetNYR(item.followCreateTime)}}</div>
                </div>
            </div>
        </div>
        <div class="return-btn-group">
            <div class="btn" @click="goBack">返回</div>
            <div v-if="isShopMan" class="btn" @click="isChoseLeader = true">创建跟进</div>
        </div>
        
        <!-- 创建跟进 -->
        <el-dialog :visible.sync="isChoseLeader" top="0" customClass="choseLeaderDig" :modal="false" :close-on-click-modal="false">
            <ChoseLeader
                :shopId="shopId"
                :isFollowPage="true"
                :isFollowClear="true"
                :isChoseLeader="isChoseLeader"
                @closeChoMember="closeChoLeader"                
                @returnBack="returnBack"
            ></ChoseLeader>
        </el-dialog>

    </div>
</template>

<style lang="scss">
.follow-list {
    width: 100%;
    height: 500px;
    overflow-y: scroll;
    margin-bottom: 20px;
    .list-item {
        padding: 20px;
        background: #f6f7f8;
        border-radius: 10px;
        margin-bottom: 20px;
        position: relative;
        .item-line {
            width: 48%;
            height: 50px;
            line-height: 50px;
        }
        .item-results {
            width: 100%;
            height: 50px;
            margin: 15px 0;
            .label {
                display: inline-block;
                width: 19%;
                vertical-align: top;
                
            }
            .info {
                display: inline-block;
                width: 80%;
                height: 50px;
            }
        }
        .item-img {
            width: 100%;
            height: 54px;
            margin-bottom: 30px;
            &>img {
                width: 54px;
                height: 54px;
                margin-right: 20px;
                border-radius: 4px;
            }
        }
        .create-time {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 163px;
            height: 23px;
            line-height: 23px;
            background:url('../../../../../static/img/member/new/time-bg.png') no-repeat left center;
            .font-wrap {
                color:#fff;
                text-align: center;
            }
        }
    }
}

</style>

<script>
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'
import ChoseLeader from '../choseLeader'
import {operateFollowCreateSign, operateMemberCreate, operateMemberUpdateBy, operateMemberOperation, operateOpIntention,operateFollowCreate} from 'Api/commonality/operate'
import {mapActions, mapGetters} from 'vuex'


export default {
    data () {
        return {
            isChoseLeader:false,
            isChoseMember:'',

            leaderIdList:[],
            followAim:[],
            today:'',
            memberIdList:[],
            leaderIdList:[],
        }
    },
    props:['followData','oldMemberInfo','shopId','memberId'],
    components:{
        ChoseLeader
    },
    computed:{
        ...mapGetters([
            "userPositionInfo"
        ]),
        isShopMan(){
            if(this.userPositionInfo.roleList.length === 1){
                if(this.userPositionInfo.roleList[0].role > 3){
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
        }
    },
    methods: {
        goBack() {
            this.$emit('goBack',true)
        },
        getFollowStatus(parm) {
            switch (parm) {
                case '1':
                    return '未完成'
                    break;
                case '2':
                    return '已超时'
                    break;
                case '3':
                    return '已完成'
                    break;
                case '4':
                    return '已暂停'
                    break;
                default:
                    break;
            }
        },
        getFollowPurpose(parm) {
            switch (parm) {
                case "1":
                    return '日常拜访'
                    break;
                case "2":
                    return '促销执行'
                    break;
                case "3":
                    return '临时拜访'
                    break;
                case "4":
                    return '其它目的'
                    break;
                case "5":
                    return '售后跟进'
                    break;
                case "6":
                    return '生日跟进'
                    break;
                default:
                    break;
            }
        },
        _GetNYR(parm){
            return GetNYR(parm)
        },
        getFollowType(type) {
            switch (type) {
                case "1":
                    return '面谈'
                    break;
                case "2":
                    return '电话'
                    break;
                case "3":
                    return '聊天软件'
                    break;
                case "4":
                    return '其它'
                    break;
                default:
                    break;
            }
        },
        // 创建跟进
        returnBack () {
            this.isChoseLeader = false
        },
        createdGJ () {
            this.isChoseLeader = true
        },
        closeChoLeader (val) {

            this.leaderIdList = val.list
            this.followAim = val.followAim

            this.isChoseLeader = false

            this.getDate1(0, 1)
        },
        getDate1( day, type  ){
                let _date = new Date()
                _date.setDate( _date.getDate() + day )
                //年
                let Year = _date.getFullYear()
                //月
                let month = this.formatDate(_date.getMonth()+1)

                let month1 = this.formatDate(_date.getMonth())
                //天
                let Day = this.formatDate(_date.getDate())
                //天
                let Day1 = this.formatDate(_date.getDate()-1)
                //时
                let hours = this.formatDate(_date.getHours())
                //分
                let mins = this.formatDate(_date.getMinutes())
                //秒
                let seconds = this.formatDate(_date.getSeconds())

                let timestamp = Year + month +  Day
                let currentData = new Date()

                if (month1 == '01' || month1 == '03' ||month1 == '05' || month1 == '07' || month1 == '08' || month1 ==  '10' || month1 == '12') {
                    if (Day1 == '00') {
                        Day1 = '31'
                    }
                } else if (month1 == '02') {
                    if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
                        if (Day1 == '00') {
                            Day1 = '29'
                        }
                    } else {
                        if (Day1 == '00') {
                            Day1 = '28'
                        }
                    }
                } else {
                    if (Day1 == '00') {
                        Day1 = '30'
                    }
                }
                if( type == 'end' ){
                    if( Year < currentData.getFullYear() ||
                    month < currentData.getMonth()+1 ||
                    Day < currentData.getDate()
                    ){
                    hours = '23'
                    mins = seconds = '59'
                    }
                }else if( type == 'start'){
                hours = mins = seconds = '00'
                }
                //console.log(Day)
                //this.endTime = Year +'-'+ month +'-'+ Day
                //this.startTime = Year +'-'+ month +'-'+ (Day- (Day-1))
                //console.log(Year +'-'+ month +'-'+ Day)
                this.today = Year + month + Day + '000000'
                //console.log('日期',this.today)
                this.followCreate()
        },
        formatDate( d ){
        return d < 10 ? ('0' + d ) : d + ''
        },
        followCreate () {
            let mebList = []
            let leaList = []
            mebList.push({memberId: this.memberId})
            this.leaderIdList.forEach((item) => {
                leaList.push({principalId: item})
            })
            let options = {
            shopId: this.shopId,
            visitAim: this.followAim,
            followTime: this.today,
            memberList: mebList,
            status: 1,
            principalList: leaList
            }
            operateFollowCreate(options).then((res) => {
            if (res.data.state == 200) {
                this.$emit("getData",true)
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
    }
}
</script>
