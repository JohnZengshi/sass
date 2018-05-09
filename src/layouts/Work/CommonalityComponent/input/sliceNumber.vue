<template>
    <input class="form-input" v-if="sliceNumber" ref="input" v-bind:value="value" :maxlength="maxLengthSix" v-on:input="updateValue($event.target.value)" v-on:blur="formatValue($event.target.value)" v-on:focus="focusFun()" @keyup.enter="keyupEnter">
</template>
<script>
    export default {
        props: ['value', 'sliceNumber', 'maxLengthSix', 'littleClassKey', 'pitchLittleClassKey'], // 元素值，小数，最大输入值
        created () {
            if (this.sliceNumber) {
                let _self = this;
                if (this.pitchLittleClassKey === this.littleClassKey) {
                    setTimeout(function() {
                        _self.focusFun();
                    }, 1 / 60);
                }
            }
        },
        methods: {
            updateValue: function (value) { // 取小数
                if (value.indexOf('.') !== -1) {
                    this.$refs.input.value = value.trim().slice(0, value.indexOf('.') + this.sliceNumber + 1);
                    this.$emit('input', this.$refs.input.value);
                } else if (!value) {
                    this.$emit('input', "");
                } else if (!/^[.0-9]+$/i.test(value)) { // 过滤不是数字和小数点的值
                    this.$refs.input.value = value.trim().slice(0, value.length - 1);
                    this.$emit('input', this.$refs.input.value)
                } else if (value) {
                    this.$refs.input.value = value;
                    this.$emit('input', value);
                }
                this.$emit("valueChangeDetection")
            },
            formatValue: function (value) { // 取小数
                if (value) {
                    this.$refs.input.value = parseFloat(value).toFixed(this.sliceNumber);
                    this.$emit('input', this.$refs.input.value);
                } else {
                    this.$refs.input.value = parseFloat(0).toFixed(this.sliceNumber);
                    this.$emit('input', this.$refs.input.value);
                }
                if (value) {
                    if (this.littleClassKey === "goldCost") {
                        if (Number(this.$refs.input.value) < 1) {
                            this.$refs.input.value = (this.$refs.input.value * 100).toFixed(2);
                            this.$emit('input', this.$refs.input.value);
                        }
                    }
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