<template>
  <div class="ex-wrap">
    <div class="chose-box">
      <ul>
        <li @click="createTaste(3)">
          <img src="./../../../../static/img/sellman.png" />
          <span>我是店员</span>
        </li>
        <li @click="createTaste(1)">
          <img src="./../../../../static/img/boss.png" />
          <span>我是老板</span>
        </li>
        <li @click="createTaste(2)">
          <img src="./../../../../static/img/manage.png" />
          <span>我是店长</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { seekCreateTaste } from '../../../Api/commonality/seek'
  export default {
    data() {
      return {
        
      }
    },
    props: ['phoneNumber'],
    methods: {
      createTaste(type) {
        let options = {
          type: type,
          phone: this.phoneNumber
        }
        seekCreateTaste(options).then((res) => {
          if(res.data.state == 200) {
            sessionStorage.setItem("experience", 'Y');
            sessionStorage.setItem("id", res.data.data.Id);
            sessionStorage.setItem("sig", res.data.data.sig);
            sessionStorage.setItem('tokenId', res.data.data.tokenId);
            sessionStorage.setItem('companyId', res.data.data.companyId);
            // sessionStorage.setItem('userId', res.data.userId);
            //sessionStorage.setItem('companyId', res.data.companyId);
            this.$router.push('/mainIndex');
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        }, (res) => {
          this.$store.dispatch('workPopupError', res.data.msg);
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
      
    }
  }
</style>