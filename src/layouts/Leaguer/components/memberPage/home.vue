<template>
    <div class="memberinfo-content">
        <div class="memberinfo-top">
            <!-- 头像 -->
            <div class="member-log">
                <FormatImg :logo="memberInfo.memberLogo" :userName="memberInfo.username" :size="72"></FormatImg>
            </div>
            <!-- 文字内容 -->
            <div class="member-message">
                <div class="item">
                    <span class="item-star item-label">姓名</span>
                    <span>{{memberInfo.username}}</span>
                </div>
                <div class="item">
                    <span class="item-star item-label">电话</span>
                    <span>{{memberInfo.phone}}</span>
                </div>

                <div class="item">
                    <span class="item-label">会员积分</span>
                    <span>500分</span>
                </div>
                <div class="item">
                    <span class="item-label">会员等级</span>
                    <span class="item-level">普通</span>
                </div>

                <div class="item">
                    <span class="item-label">负责人</span>
                    <span>黄小明</span>
                </div>
            </div>
        </div>
        <div class="memberinfo-bottom">
                <!-- 信息 -->
                <div class="item-card">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/xx.png" alt="">信息
                    </div>
                    <p class="item-card-info"><i class="color1">●</i><span class="card-info-label">负责人：</span><span>潘晓婷</span></p>
                    <p class="item-card-info"><i class="color1">●</i><span class="card-info-label">注册时间：</span><span>2018.12.9</span></p>
                </div>
                <!-- 交易 -->
                <div class="item-card" @mousemove="showBtn" @mouseout="hiddenBtn">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/jy.png" alt="">交易
                    </div>
                    <p class="item-card-info"><i class="color2">●</i><span class="card-info-label">交易总额：</span><span>8500元</span></p>
                    <p class="item-card-info"><i class="color2">●</i><span class="card-info-label">交易次数：</span><span>12次</span></p>
                    <div class="btn-group-jy">
                        <div class="btn-kj">快捷开单</div>
                        <div class="btn-kj">关联销售单</div>
                    </div>
                </div>
                <!-- 来访 -->
                <div class="item-card">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/lf.png" alt="">来访
                    </div>
                    <p class="item-card-info"><i class="color3">●</i><span class="card-info-label">来访总数：</span><span>12次</span></p>
                    <p class="item-card-info"><i class="color3">●</i><span class="card-info-label">最近来访：</span><span>2018.12.9</span></p>
                </div>
                <!-- 跟进 -->
                <div class="item-card" @mouseover="showBtnGJ" @mouseout="hiddenBtnGJ">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/gj.png" alt="">跟进
                    </div>
                    <p class="item-card-info"><i class="color4">●</i><span class="card-info-label">跟进总数：</span><span>8次</span></p>
                    <p class="item-card-info"><i class="color4">●</i><span class="card-info-label">最近跟进：</span><span>2018.12.9</span></p>
                    <div class="btn-group-gj">
                        <div class="btn-gj">创建跟进</div>
                    </div>
                </div>
                <!-- 积分 -->
                <div class="item-card" @mouseover="showBtnJF" @mouseout="hiddenBtnJF">
                    <div class="item-card-message">
                        <img class="fl" src="../../../../../static/img/jf.png" alt="">积分
                    </div>
                    <p class="item-card-info"><i class="color5">●</i><span class="card-info-label">积分总数：</span><span>100分</span></p>
                    <p class="item-card-info"></p>
                    <div class="btn-group-jf">
                        <div class="btn-jf">积分修改</div>
                    </div>
                </div>
                
        </div>
    </div>
</template>

<script>
import FormatImg from "components/template/DefaultHeadFormat.vue"

export default {
  data() {
    return {};
  },
  components: {
    FormatImg
  },
  props: ["memberInfo"],
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
    }
  }
};
</script>

