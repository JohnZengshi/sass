<template>
  <div class="right-Mast">
    <ul>
      <li @click.stop="pushmessageclick = true" class="messagepush"><i class="iconfont icon-huigou"></i><p>短信</p><p>发送</p></li>
      <li @click.stop="openRecharge" class="messagepush">
        <i class="iconfont icon-tijiaoshenhe"></i>
        <p>充值</p>
        <p class="money">{{Data.messageNum}}</p>
      </li>
      <li @click.stop="signatureclick = true"><i class="iconfont icon-xiaoshou1"></i><span>签名</span></li>
      <li @click.stop="messagetemplateclick = true"><i class="iconfont icon-moban1"></i><span>模板</span></li>
    </ul>
    <!-- 签名 -->
    <el-dialog :visible.sync="signatureclick" top="12%" customClass="signature-bar" :close-on-click-modal="false">
      <signature :shopManageRole="shopManageRole" :shopId = "shopId"></signature>
    </el-dialog>
    <!-- 模板 -->
    <el-dialog :visible.sync="messagetemplateclick" top="12%" customClass="messagetemplate-bar" :close-on-click-modal="false">
      <messagetemplate :shopId = "shopId" :shopManageRole="shopManageRole"></messagetemplate>
    </el-dialog>
    <!-- 充值 -->
    <el-dialog :visible.sync="rechargeclick" top="12%" customClass="recharge-bar" :close-on-click-modal="false">
      <recharge @closePay="closePay" :rechargeclick="rechargeclick" :shopId = "shopId"></recharge>
    </el-dialog>
    <!-- 短信发送 -->
    <el-dialog :visible.sync="pushmessageclick" top="12%" customClass="pushmessage-bar" :close-on-click-modal="false">
      <pushmessage :shopId = "shopId" @getseekSendSMS="oprationgetseekSendSMS" :pushmessageclick="pushmessageclick"></pushmessage>
    </el-dialog>
  </div>
</template>
<script>
import signature from './signature'// 签名
import messagetemplate from './messagetemplate'// 模板
import recharge from './recharge' //充值
import pushmessage from './pushmessage'// 短信发送
import {seekGetSMSAccountInfo} from 'Api/commonality/seek'
export default {
  components: {
    signature,
    messagetemplate,
    recharge,
    pushmessage
  },
  props: ['shopId', 'Data', 'shopManageRole'],
  data () {
    return {
      // isChoseLeader: false,
      signatureclick: false,
      messagetemplateclick: false,
      rechargeclick: false,
      pushmessageclick: false,
      messageNum: ''
    }
  },
  mounted () {
    // this.getSeekGetSMSAccountInfo()
    // setTimeout(()=>{
    //   this.getSeekGetSMSAccountInfo()
    // },500)
    eventBus.$on('open-recharge-bus', (parm) => {
      this.openRecharge()
      // alert('chufale')
    });
  },
  created () {
    console.log(this.Data)
  },
  methods: {
    openRecharge () {
      this.rechargeclick = true
      this.pushmessageclick = false
    },
    // openpushmessage () {
    //   this.pushmessageclick = true
    // },
    closePay () {
      this.rechargeclick = false
    },
    oprationgetseekSendSMS () {
      this.pushmessageclick = false
    },
    oprationtoRecharge () {
      this.rechargeclick = true
    }
  }
}
</script>
<style lang='scss' scoped>
.right-Mast{
  height: 207px;
  width: 52px;
  background-color: #fff;
  >ul{
    .messagepush{
      padding-top: 3px;
      >p{
        height: 20px;
      }
    }
    li{
      height: 25%;
      text-align: center;
      width: 100%;
      height: 52px;
      line-height: 52px;
      .money{
        font-size: 12px;
      }
      p{
        display: none;
        line-height: 15px;
        color: #fff;
        line-height: 26px;
      }
      span{
        display: none;
        line-height: 15px;
        color: #fff;
      }
      i{
        font-style: normal;
        font-size: 25px;
        color: #a5a5a5;
      }
    }
    li:nth-of-type(2){

    }
    li:nth-of-type(3),li:nth-of-type(4){
      span{
        line-height: 52px;
      }
    }
    li:hover{
      background-color: #2993f8;
      // border-radius: 5px;
      &:nth-of-type(1){
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }
      &:nth-of-type(4){
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      i{
        display: none;
      }
      span{
        display: block;
      }
      p{
        display: block;
      }
    }
  }
}
</style>


