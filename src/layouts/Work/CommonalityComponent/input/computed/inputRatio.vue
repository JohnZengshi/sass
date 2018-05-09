<template>
    <input class="form-input" ref="input" v-bind:value="defaultValue" v-on:input="soldPriceComputed($event.target.value)" v-on:blur="focusComputed($event.target.value)" v-on:focus="focusFun()">
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
  watch: {
      'ratio': function () {
        this.defaultValue = this.ratio;
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
  methods: {
      initValue () { // 初始化输入值
          this.defaultValue = this.ratio || "0.00";
      },
      soldPriceComputed: function (parm) { // 只限制输入字数
          if (parm.indexOf('.') !== -1) {
              this.$refs.input.value = parm.trim().slice(0, parm.indexOf('.') + this.sliceNumber + 1);
              this.$emit('input', this.$refs.input.value);
          } else if (!parm) {
              // this.$emit('input', 0);
          } else if (!/^[.0-9]+$/i.test(parm)) { // 过滤不是数字和小数点的值
              this.$refs.input.value = parm.trim().slice(0, parm.length - 1);
              this.$emit('input', this.$refs.input.value)
          } else if (parm) {
              this.$emit('input', parm);
          }
          this.$emit("computedRatio");
      },
      focusComputed: function (value) { // 离开检测
          if (value) {
              this.$refs.input.value = parseFloat(value).toFixed(this.sliceNumber);
              this.$emit('input', this.$refs.input.value);
          } else {
              this.$refs.input.value = parseFloat(0).toFixed(this.sliceNumber);
              this.$emit('input', this.$refs.input.value);
          }
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
  //   width: 118px;
  // }
  // input {
  //   padding: 10px;
  //   width: 100%;
  //   height: 34px;
  //   text-align: center;
  //   border: none;
  //   outline: none;
  //   background-color: transparent;
  // }
</style>