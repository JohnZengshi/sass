<template>
    <input class="form-input" v-if="pureNumber" ref="input" v-bind:value="value" v-on:input="updatePureNumber($event.target.value)" :maxlength="maxLengthSix" v-on:blur="formatValue($event.target.value)" v-on:focus="focusFun()" @keyup.enter="keyupEnter">
</template>
<script>
    export default {
        props: ['value', 'pureNumber', 'maxLengthSix', 'pitchLittleClassKey'], // 元素值，纯数字，最大输入值
        created () {
            let _self = this;
            if (this.pitchLittleClassKey === "barcode") {
                setTimeout(function() {
                    _self.focusFun();
                }, 1 / 60);
            }
        },
        methods: {
            updatePureNumber: function (value) { // 纯数
                if (!/^[0-9]+$/i.test(value)) {
                    this.$refs.input.value = value.slice(0, value.length - 1);
                    this.$emit('input', this.$refs.input.value);
                } else {
                    this.$refs.input.value = value;
                    this.$emit('input', this.$refs.input.value);
                }
            },
            formatValue: function (value) { // 焦点结束
                if (value) {
                    let Nums = value.toString();
                    var endNum = Nums.padStart(8, "0");
                    this.$refs.input.value = endNum;
                    this.$emit('input', this.$refs.input.value);
                } else {
                    this.$refs.input.value = null;
                    this.$emit('input', null);
                }
            },
            focusFun () {
                this.$refs.input.select();
            },
            keyupEnter () {
                this.$emit("nextPitchOn")
            }
        }
    }
</script>