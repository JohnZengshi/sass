<template>
    <input class="form-input" ref="input" v-bind:value="value" v-on:input="updatePureNumber($event.target.value)" :maxlength="maxLengthSix" v-on:focus="focusFun()" @keyup.enter="keyupEnter">
</template>
<script>
    export default {
        props: ['value', 'maxLengthSix', 'littleClassKey', 'pitchLittleClassKey'], // 元素值，纯数字，最大输入值
        created () {
            if (this.maxLengthSix) {
                let _self = this;
                if (this.pitchLittleClassKey === this.littleClassKey) {
                    setTimeout(function() {
                        _self.focusFun();
                    }, 1 / 60);
                }
            }
        },
        methods: {
            updatePureNumber: function (value) { // 纯数
                this.$emit('input', value);
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