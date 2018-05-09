<template>
   <!--  <div> -->
        <input class="form-input" ref="input" v-bind:value="defaultValue" v-on:input="soldPriceComputed($event.target.value)" v-on:blur="focusComputed($event.target.value)" v-on:focus="focusFun()">
   <!--  </div> -->
</template>
<script>
export default {
  props: ['costPrice', 'ratio', 'soldPrice', 'littleClassKey', 'pitchLittleClassKey'], // 成本，倍率，售价
  mounted () {
      this.initValue();
  },
  data () {
      return {
          sliceNumber: 2,
          defaultValue: 0
      }
  },
  created () {
    let _self = this;
    if (this.pitchLittleClassKey === this.littleClassKey) {
        setTimeout(function() {
            _self.focusFun();
        }, 1 / 60);
    }
  },
  watch: {
      'soldPrice' () {
          this.defaultValue = this.soldPrice;
      },
      'costPrice' () {
          this.defaultValue = (this.costPrice * this.ratio).toFixed(2);
      }
  },
  methods: {
      initValue () { // 初始化输入值
          this.defaultValue = this.soldPrice || "0.00";
      },
      soldPriceComputed: function (value) { // 只限制输入字数
        // console.log("成本输入检测");
          if (value.indexOf('.') !== -1) {
              this.$refs.input.value = value.trim().slice(0, value.indexOf('.') + this.sliceNumber + 1);
              this.$emit('input', this.$refs.input.value);
          } else if (!value) {
              this.$emit('input', "");
          } else if (!/^[.0-9]+$/i.test(value)) { // 过滤不是数字和小数点的值
              this.$refs.input.value = value.trim().slice(0, value.length - 1);
              this.$emit('input', this.$refs.input.value)
          } else if (value) {
              this.$emit('input', value);
          }
          this.$emit("computedSoldPrice");
      },
      focusComputed: function (value) { // 离开检测
          if (value) {
              this.$refs.input.value = parseFloat(value).toFixed(2).toString();
          } else {
              this.$refs.input.value = parseFloat(0).toFixed(2).toString();
          }
          let val = Number(this.$refs.input.value || 0);
          this.$emit('input', val.toFixed(2));
      },
      selectAll: function (event) { // Workaround for Safari bug
          setTimeout(function () {
              event.target.select()
          }, 0)
      },
      focusFun () {
          this.$refs.input.select();
      }
  }
}
</script>
<style lang="scss" scoped>
  // div{
  //   width: 90px;
  //   height: 40px;
  //   font-size: 12px;
  //   letter-spacing: 0px;
  //   text-align: center;
  //   border: none;
  //   outline: none;
  //   background-color: transparent;
  // }
  input {
    width: 90px;
    height: 40px;
    font-size: 12px;
    letter-spacing: 0px;
    text-align: center;
    border: none;
    outline: none;
    background-color: transparent;
    // padding: 10px;
    // width: 100%;
    // height: 34px;
    // text-align: center;
    // border: none;
    // outline: none;
    // background-color: transparent;
  }
</style>