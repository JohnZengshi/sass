<template>
  <div class="dialog-w214-h214-hn affirm-delect-main">
    <el-dialog title="选择产品类型" v-model="saveSuccess">
      <i class="close-icon" @click="close"></i>
      <div class="body-wrap">
        <img src="./../../assets/img/add-staff-icon.png" alt="">
        <ul>
          <li>
            <span>姓名</span>
            <input type="text" v-model="userName">
          </li>
          <li>
            <span>电话</span>
            <input type="text" v-model="phoneNo">
          </li>
        </ul>
      </div>
      <span slot="footer">
        <a href="javascript: void(0)" class="confirm-btn" @click="_operateAddUserByPhone">确 定</a>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import {operateAddUserByPhone, addOrdelInspect} from 'Api/commonality/operate'
export default {
  props: [
    'isQueryOption',
    'operateType',
    'shopId',
    'isInspector',
  ],
  data () {
    return {
      userName: '',
      phoneNo: '',
      saveSuccess: false
    }
  },
  created () {
    this.saveSuccess = this.isQueryOption
  },
  watch: {
    'isQueryOption': function () {
      this.saveSuccess = this.isQueryOption;
    },
    'saveSuccess': function () {
      if (!this.saveSuccess) {
        this.close()
      }
    }
  },
  methods: {
    close () {
      this.$emit('queryOptionFun')
    },
    ...mapActions([
      'getSeekCompanyInfo',
      'getSeekGetUserInfo'
    ]),
    _operateAddUserByPhone () {
      if (this.phoneNo.length !== 11) {
        this.$store.dispatch('workPopupError', '请输入正确的手机号码');
        return
      }
      if (!this.phoneNo) {
        this.$store.dispatch('workPopupError', '请输入电话');
        return
      }
      if (!this.userName) {
        this.$store.dispatch('workPopupError', '请输入姓名');
        return
      }

      if(this.isInspector) {
        let options = {
        operateType: '1',
        phoneNo: this.phoneNo,
        name: this.userName,
        userId: ''
        }
        addOrdelInspect(options).then(res => {
          if(res.data.state === 200){
            console.log(res.data);
            this.$store.dispatch('workPopupError', '成功');
            this.$emit('queryOptionFun', true)
          }else {
            this.$store.dispatch('workPopupError', res.data.msg);            
          }
        }) 
      } else {
        let options = {
          operateType: this.operateType,
          phoneNo: this.phoneNo,
          name: this.userName,
          shopId: this.shopId
        }
  
        operateAddUserByPhone(options)
          .then(res=> {
            if (res.data.state === 200) {
              this.getSeekCompanyInfo()
              this.getSeekGetUserInfo() // 职位信息
              this.$store.dispatch('workPopupError', '成功');
              this.$emit('queryOptionFun', true)
              if (this.shopId) {
                eventBus.$emit('queryOptionFun', {shopId: this.shopId})
              }
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
        })
      }

    },

  }
}
</script>
<style lang="scss" scoped>
@import "~assets/css/color.scss";
.affirm-delect-main{
  width: 100%;
  height: 100%;
  .close-icon{
    position: absolute;
    top: 10px;
    right: 10px;
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('./../../assets/img/close-preview.png') no-repeat;
    background-size: 16px;
    cursor: pointer;
  }
  .body-wrap{
    // padding: 0 30px;
    margin-top: 16px;
    text-align: center;
    font-size: 0;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    ul{
      margin-top: 16px;
      padding: 0 22px;
      li{
        height: 24px;
        margin-top: 16px;
        font-size: 0;
        span{
          display: inline-block;
          margin-right: 20px;
          font-size: 14px;
          color: $font-color-neutral;
        }
        input{
          display: inline-block;
          width: 120px;
          height: 24px;
          font-size: 14px;
          text-align: left;
          // color: $font-color-normal;
          // border-bottom: 1px solid #ccc;
          font-size: 14px;
          background-color: #f2f3f4;
          border-radius: 2px;
          color: $font-color-deep;
        }
      }
    }
  }
  .confirm-btn{
    display: inline-block;
    width: 150px;
    height: 28px;
    line-height: 28px;
    font-weight: 600;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    background-color: $main-color;
  }
}
</style>