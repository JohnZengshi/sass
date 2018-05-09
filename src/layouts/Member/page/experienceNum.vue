<template>
  <div class="ex-wrap">
    <div class="main">
      <div class="main-item">
        <input v-model="experienceInfo.phoneNumber" type="text" placeholder="请输入手机号">
      </div>
      <div class="main-item">
        <input v-model="experienceInfo.SMSCode" class="barcode" type="text" placeholder="验证码">
        <el-button v-if="sended" slot="append" class="isSend">已发送({{subsub
          <10? '0'+subsub : subsub}}s)</el-button>
            <span v-else @click="handleRegIconClick" @keyup.enter="ajaxExperienceLogin">发送验证码</span>
      </div>
      <div class="btn" @click="ajaxExperienceLogin">即刻体验</div>
      <p>以模拟数据体验产品，</p>
      <p>身临其境感受云珠宝高效协作的魅力所在</p>
    </div>
  </div>
</template>
<script>
  import { userRegistry, getVcCode, confirmCode } from '../../../Api/auth_v1'
  export default {
    data() {
      return {
        experienceInfo: {
          phoneNumber: '',
          SMSCode: ''
        },
        sended: false,
        subsub: 60,
      }
    },
    methods: {
      handleRegIconClick() {
        console.log(11112)
        let data = {
          phone: this.experienceInfo.phoneNumber,
          type: '06'
        };
        if(!(/^1[34578]\d{9}$/.test(data.phone))) {
          //alert("请正确输入有效手机号.");
          this.$store.dispatch('workPopupError', "请正确输入有效手机号.");
        } else {
          let self = this;
          getVcCode(data).then((res) => {
            console.log(res.data);
            if(res.data.state === 200) {
              self.sended = true;
              window.intersubsub = setInterval(() => {
                --self.subsub;
                if(self.subsub <= 0) {
                  clearInterval(window.intersubsub)
                  self.sended = false;
                  self.subsub = 60;
                }
              }, 1000);
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          });
        }
      },
      ajaxExperienceLogin() {
        if(this.experienceInfo.SMSCode.length < 4 || this.experienceInfo.SMSCode.length >= 5) {
          //alert("请正确输入验证码");
          this.$store.dispatch('workPopupError', "请正确输入验证码");
          return;
        }
        let options = {
          phone: this.experienceInfo.phoneNumber,
          SMSCode: this.experienceInfo.SMSCode,
          type: '03'
        }

        confirmCode(options).then((res) => {
          if(res.data.state == 200) {
            this.$emit('setType', 2)
            this.$emit('phoneNumber', this.experienceInfo.phoneNumber)
            this.$set(this, 'experienceInfo', {
              phoneNumber: '',
              SMSCode: ''
            })
            clearInterval(window.intersubsub)
            this.sended = false;
            this.subsub = 60;
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        }, (res) => {
          this.$store.dispatch('workPopupError', "验证短信码失败");
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .ex-wrap {
    width: 262px;
    background: #fff;
    margin: 0 auto;
    position: relative;
    .logo {
      padding-top: 47px;
      padding-bottom: 62px;
      img {
        display: block;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        border: 1px solid #d8d8d8;
        border-radius: 50%;
      }
    }
    .chose-box {
      background: #fff;
      width: 100%;
      margin-top: 15px;
      ul {
        li {
          height: 65px;
          background: #f1f2f3;
          border-radius: 10px;
          margin-bottom: 35px;
          position: relative;
          cursor: pointer;
          img {
            width: 60px;
            height: 80px;
            position: absolute;
            bottom: 0;
            left: 36px;
          }
          &>span {
            line-height: 64px;
            margin-left: 140px;
            font-size: 17px;
            font-weight: 500;
            color: #333;
          }
        }
      }
      .main-footer {
        width: 60px;
        height: 20px;
        text-align: center;
        margin: 0 auto;
        cursor: pointer;
      }
    }
    .main {
      height: 250px;
      .main-item {
        margin-bottom: 20px;
        position: relative;
        input {
          width: 100%;
          height: 40px;
          border: 1px solid #d6d6d6;
          border-radius: 4px;
          padding-left: 15px;
          font-size: 14px;
        }
        .barcode {
          padding-right: 130px;
        }
        span {
          height: 25px;
          padding: 0 18px;
          display: block;
          color: #2993f8;
          font-size: 14px;
          line-height: 25px;
          position: absolute;
          right: 0;
          top: 7px;
          cursor: pointer;
        }
        .isSend{
          position: absolute;
          border:0 none;
          right:2px;
          top: 3px;
          cursor: default;
          color: #2993f8;
        }
      }
      .btn {
        width: 100%;
        height: 40px;
        background: #2993f8;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 20px;
        margin-top: 15px;
        float: left;
      }
      p {
        text-align: center;
        color: #999;
        font-size: 12px;
      }
    }
  }
</style>