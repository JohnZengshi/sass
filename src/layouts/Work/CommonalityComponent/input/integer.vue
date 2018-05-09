<template>
    <input class="form-input" v-if="integer" ref="input" v-bind:value="value" v-on:input="updateInteger($event.target.value)" :maxlength="maxLengthSix" v-on:focus="focusFun()" @keyup.enter="keyupEnter">
</template>
<script>
    export default {
        props: ['value', 'integer', 'maxLengthSix', 'littleClassKey', 'pitchLittleClassKey'], // 元素值，纯数字，最大输入值
        created () {
            if (this.integer) {
                let _self = this;
                if (this.pitchLittleClassKey === this.littleClassKey) {
                    setTimeout(function() {
                        _self.focusFun();
                    }, 1 / 60);
                }
            }
        },
        methods: {
            updateInteger: function (value) { // 取整数
                if (!/^[0-9]+$/i.test(value)) {
                    this.$refs.input.value = value.slice(0, value.length - 1);
                    this.$emit('input', this.$refs.input.value);
                } else {
                    this.$refs.input.value = value;
                    this.$emit('input', this.$refs.input.value);
                    this.$emit("valueChangeDetection");
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