<template>
    <div class="memberinfo-content">
        <div class="memberinfo-top">
            <!-- 头像 -->
            <div class="member-log">
                <FormatImg :logo="memberInfo.avatarUrl" :userName="memberInfo.memberName" :size="88"></FormatImg>
            </div>
            <!-- 文字内容 -->
            <div class="member-message">
                <div class="item">
                    <span class="item-star item-label">姓名</span>
                    <span>{{ memberInfo.memberName ? memberInfo.memberName : '-'  }}</span>
                </div>
                <div class="item">
                    <span class="item-star item-label">电话</span>
                    <span>{{ memberInfo.phone ? memberInfo.phone : '-' }}</span>
                </div>

                <div class="item">
                    <span class="item-label">会员积分</span>
                    <span>{{ memberInfo.score ? memberInfo.score+'分' : '-'}}</span>
                </div>
                <div class="item">
                    <span class="item-label">会员等级</span>
                    <span class="item-level" v-if="memberInfo.grade ==  1">普通</span>
                    <span id="color-zj" class="item-level" v-if="memberInfo.grade == 2">中级</span>
                    <span id="color-zy" class="item-level" v-if="memberInfo.grade == 3">重要</span>
                </div>

                <div class="item">
                    <span class="item-label">负责人</span>
                    <span>{{ getHead(memberInfo.principalList) }}</span>
                </div>
            </div>
        </div>
        <div class="memberinfo-bottom">
                <!-- 信息 -->
                <div class="item-card" @click="pageShow(1)">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/xx.png" alt="">信息
                    </div>
                    <p class="item-card-info"><i class="color1">●</i><span class="card-info-label">负责人：</span><span>{{ getHead(memberInfo.principalList) }}</span></p>
                    <p class="item-card-info"><i class="color1">●</i><span class="card-info-label">注册时间：</span><span>{{ _formDataTimeYND(memberInfo.registerTime) ? _formDataTimeYND(memberInfo.registerTime) : '-'  }}</span></p>
                </div>
                <!-- 交易 -->
                <div class="item-card" @click="pageShow(2)" @mousemove="showBtn" @mouseout="hiddenBtn">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/jy.png" alt="">交易
                    </div>
                    <p class="item-card-info"><i class="color2">●</i><span class="card-info-label">交易总额：</span><span>{{ memberInfo.totalPrice ? memberInfo.totalPrice+'元' : '-' }}</span></p>
                    <p class="item-card-info"><i class="color2">●</i><span class="card-info-label">交易次数：</span><span>{{ memberInfo.totalNum != 0 ? memberInfo.totalNum+'次' : '-' }}</span></p>
                    <div class="btn-group-jy">
                        <div v-if="isShopMan" class="btn-kj" @click="openSales">快捷开单</div>
                        <div v-if="isShopMan" class="btn-kj" @click.stop="relevanceSales">关联销售单</div>
                    </div>
                </div>
                <!-- 来访 -->
                <div class="item-card" @click="pageShow(3)">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/lf.png" alt="">来访
                    </div>
                    <p class="item-card-info"><i class="color3">●</i><span class="card-info-label">来访总数：</span><span>{{ memberInfo.visitNum != 0 ? memberInfo.visitNum+'次' : '-' }}</span></p>
                    <p class="item-card-info"><i class="color3">●</i><span class="card-info-label">最近来访：</span><span>{{ _formDataTimeYND(memberInfo.visitTime) ? _formDataTimeYND(memberInfo.visitTime) : '-' }}</span></p>
                </div>
                <!-- 跟进 -->
                <div class="item-card" @click="pageShow(4)" @mouseover="showBtnGJ" @mouseout="hiddenBtnGJ">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/gj.png" alt="">跟进
                    </div>
                    <p class="item-card-info"><i class="color4">●</i><span class="card-info-label">跟进总数：</span><span>{{ memberInfo.followNum != 0 ? memberInfo.followNum+'次' : '-' }}</span></p>
                    <p class="item-card-info"><i class="color4">●</i><span class="card-info-label">最近跟进：</span><span>{{ _formDataTimeYND(memberInfo.followTime) ? _formDataTimeYND(memberInfo.followTime) : '-' }}</span></p>
                    <div class="btn-group-gj">
                        <div v-if="isShopMan" class="btn-gj" @click.stop="isChoseLeader = true">创建跟进</div>
                    </div>
                </div>
                <!-- 积分 -->
                <div class="item-card" @click="pageShow(5)" @mouseover="showBtnJF" @mouseout="hiddenBtnJF">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/jf.png" alt="">积分
                    </div>
                    <p class="item-card-info"><i class="color5">●</i><span class="card-info-label">积分总数：</span><span>{{ memberInfo.score ? memberInfo.score+'分' : '-'}}</span></p>
                    <p class="item-card-info"></p>
                    <div class="btn-group-jf">
                        <div v-if="isShopMan" class="btn-jf" @click.stop="Integral = true">积分修改</div>
                    </div>
                </div>
                
        </div>

        <!-- 关联销售单 -->
        <sellOrderList
            :shopId="shopId"
            :saveSuccess="saveSuccess"
            :oldMemberInfo="oldMemberInfo"
            @closeOrderList="closeOrderList"
            @closeOnly="closeOnly"
            isEdit="1"
        ></sellOrderList>
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
                <p class="line1">目前积分  <span>{{score}}</span></p>
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

        <!-- 选择负责人弹窗 -->
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
#color-zj{
    background: #ffa200;
}
#color-zy{
    background: #ed7000;
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
import FormatImg from "components/template/DefaultHeadFormat.vue"
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'
import SellOrderList from '../sellOrderList'
import {operateFollowCreateSign, operateMemberCreate, operateMemberUpdateBy, operateMemberOperation, operateOpIntention,operateFollowCreate} from 'Api/commonality/operate'
import { memberIntegralUpdate,memberBuyIntegral } from 'Api/member'

import {mapActions, mapGetters} from 'vuex'
import ChoseLeader from '../choseLeader'

export default {
  data() {
    return {
        informationFlag:false,
        saveSuccess:false,
        Integral:false,
        incordec:1,
        remark:'',
        score:0,
        bs:'',
        isChoseLeader:false,
        isChoseMember:'',

        leaderIdList:[],
        followAim:[],
        today:'',
        memberIdList:[],
        leaderIdList:[],

    };
  },
  components: {
    FormatImg,
    SellOrderList,
    ChoseLeader,
  },
  props: ["memberInfo",'shopId','memberId','oldMemberInfo'],
  watch:{
    'memberInfo'(val) {
        if(val) {
            this.score = this.memberInfo.score || 0
        }
    }
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
    },
  },
  methods: {
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
                this.$emit("goBack",true)                
                this.$message({
                    type:'success',
                    message:'修改成功'
                })
                this.Integral = false
            }else {
                this.$message({
                    type:'error',
                    message: res.data.msg
                })
                this.$emit("goBack",true)
                
            }
        })
    },
    closeOrderList (val) { // 选择单据结束的回调
        this.saveSuccess = false
        if(val.length == 0){
            return
        }
        // 关联销售单
        let orderList = []
        let dataList = []

        // orderList = this.oldMemberInfo.orderList || []

        // 优化 把自己有的销售单给剔除
        console.log('老的关联列表',this.oldMemberInfo.orderList)
        console.log('老的关联列表',val)

        val.forEach((item, index) => {
            orderList[index] = {orderNo: item}
            dataList[index] = {orderNum: item}
        })
        if(dataList.length !=0 ) {
            this.setMemberBuyIntegral(dataList)
        }
        console.log('我的orderList',orderList)
        
        let options = Object.assign({},this.oldMemberInfo,{
            memberId:this.memberId,
            shopId:this.shopId,
            orderList:orderList
        })
        console.log('关联的参数',options)
        // return
        operateMemberUpdateBy(options).then(res => {
            console.log('关联成功',res)
            if(res.data.state === 200) {
                this.$emit("goBack",true)                
                this.$message({
                    type: 'success',
                    message: '关联销售单成功'
                })
            } else {
                this.$message({
                    type: 'error',
                    message: '关联销售单失败'
                })
            }
        })

    },
    closeOnly () {
        this.saveSuccess = false
    },
    relevanceSales() {
        this.saveSuccess = true
    },
    // 显示按钮
    showBtn() {
      $(".btn-group-jy").addClass("btn-show");
    },
    hiddenBtn() {
      $(".btn-group-jy").removeClass("btn-show");
    },
    showBtnGJ() {
      $(".btn-group-gj").addClass("btn-show");
    },
    hiddenBtnGJ() {
      $(".btn-group-gj").removeClass("btn-show");
    },
    showBtnJF() {
      $(".btn-group-jf").addClass("btn-show");
    },
    hiddenBtnJF() {
      $(".btn-group-jf").removeClass("btn-show");
    },
    // 显示个人信息编辑
    pageShow(type){
        switch (type) {
            case 1:
                this.$emit('infomationShow',true)
                break;
            case 2:
                this.$emit('tradingShow',true)
                break;
            case 3:
                this.$emit('visitingShow',true)
                break;
            case 4:
                this.$emit('followShow',true)
                break;
            case 5:
                this.$emit('integralShow',true)
                break;
            default:
                break;
        }
    },
    // 获取负责人
    getHead(list) {
        if(list){
            if(list.length === 0) {
                return '指派'
            } else {
                let newArrr = []
                list.forEach(item => {
                     newArrr.push(item.userName)
                })
                if(newArrr.length == 1) {
                    return newArrr[0]
                } else {
                    return newArrr.join(',')
                }
            }
        }
    },
    // 格式化时间
    _formDataTimeYND(parm){
        return GetNYR(parm)
    },
    // 快捷开单
    openSales(){
        this.$router.push({path:'/work/sell'})        
    },
    // 创建跟进
    returnBack () {
        this.isChoseLeader = false
    },
    createdGJ () {
        this.isChoseLeader = true
    },
    closeChoLeader (val) {
        console.log(val)

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
               this.$emit("goBack",true)
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
    // 加积分操作
    setMemberBuyIntegral (dataList) {
        let options = {
			memberId:this.memberId,
			dataList,
			shopId:this.shopId,
			operateType:'1'
        }
        memberBuyIntegral(options).then(res => {
			if(res.data.state == 200){
				console.log('成功')
			} else {
				this.$message({
					type:'error',
					message:res.data.msg
				})
			}
		})
        
    }
  },
  created() {
      this.score = this.memberInfo.score || 0
  }
};
</script>

