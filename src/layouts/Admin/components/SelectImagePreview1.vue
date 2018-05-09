<template>
  <div class="select_preview">
    <div class="preview">
      <img :src="currSrc" id="preview_img">
    </div>
    <div class="button" @click="selectFile">{{useType}}</div>
    <input style="display: none;" type="file" id="file_input" @change="changeFileInput" />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['useType', 'userInfo', 'companyInfo', 'shopInfo'],
  computed: {
    currSrc () {
      if (this.useType === '更换头像') {
        return this.currHeadSrc
      } else {
        return this.currLogoSrc
      }
    },
    currHeadSrc () {
          return this.userInfo.userLogo ? this.userInfo.userLogo : 'static/img/userphone.png'
    },
    currLogoSrc () {
      return this.shopInfo.logo ? this.shopInfo.logo : 'static/img/userphone.png'
    }
  },
  created () {
    //console.log(this.shopLogo);
  },
  methods: {
    selectFile () {
      document.getElementById("file_input").click();
      //console.log(document.getElementById("file_input").value);
    },
    changeFileInput (ev) {
      let file = ev.target.files[0];
      if (file) {
        this.$emit('up', file);
        let reader = new FileReader();
        reader.readAsDataURL(ev.target.files[0]);
        reader.onload = function (e) {
          document.getElementById("preview_img").src = this.result;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .select_preview {
    width: 100%;
    text-align: center;
    .preview {
      margin: 0 auto;
      img {
        width: 116px;
        height: 116px;
        border-radius: 50%;
      }
    }
    .button {
      width: 130px;
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      background-color: #83bbf7;
      font-family: MicrosoftYaHei-Bold;
      color: #ffffff;
      font-weight: bold;
      border-radius: 4px;
      margin: 0 auto;
      margin-top: 20px;
      cursor: pointer;
    }
  }
</style>
