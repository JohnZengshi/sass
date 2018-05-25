<template>
    <div class="memberinfo-content">
        <div class="memberinfo-top">
            <!-- 头像 -->
            <div class="member-log">
                <FormatImg :logo="memberInfo.avatarUrl" :userName="memberInfo.memberName" :size="72"></FormatImg>
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
                        <div v-if="isShopMan" class="btn-kj">快捷开单</div>
                        <div v-if="isShopMan" class="btn-kj">关联销售单</div>
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
                        <div v-if="isShopMan" class="btn-gj">创建跟进</div>
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
                        <div v-if="isShopMan" class="btn-jf">积分修改</div>
                    </div>
                </div>
                
        </div>
    </div>
</template>

<style lang="scss">
#color-zj{
    background: #ffa200;
}
#color-zy{
    background: #ed7000;
}
</style>


<script>
import FormatImg from "components/template/DefaultHeadFormat.vue"
import {GetNYR, GetSF, GetChineseNYR} from 'assets/js/getTime'

import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
        informationFlag:false,
    };
  },
  components: {
    FormatImg,
  },
  props: ["memberInfo"],
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
  }
};
</script>

