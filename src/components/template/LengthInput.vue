<template>
    <div class="el-form-item__content">
        <div class="el-input el-input--small el-input-group el-input-group--append">
            <input ref="lengthInput" type="text" placeholder="" autocomplete="off" class="el-input__inner" @blur="blurHandler" @input="inputHandler">
            <div class="el-input-group__append">{{ unit || 'mm'}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['length', 'unit'],
    watch: {
        length() {
            if (this.length != this.$refs.lengthInput.value) {
                this.$refs.lengthInput.value = this.length
            }
        }
    },
    methods: {
        inputHandler(e) {
            debugger
            let value = e.target.value
            if (value && /[^\d.]+/.test(value)) {
                value = /\d+\.?\d?/.test(value) ? Number(value.match(/\d+\.?\d?/)[0]) : ''
            } else {
                if (value) {
                    if (value > 9999) {
                        value = 9999
                    }
                }
            }
            if (value != this.$refs.lengthInput.value) {
                this.$refs.lengthInput.value = value
            }
            this.$emit('change', Number(value || 0))
        },
        blurHandler(e) {
            debugger
            let value = e.target.value
            if (!value) {
                value = 0
                this.$refs.lengthInput.value = value
                this.$emit('change', Number(value))
            }
        }
    },
    mounted() {
        this.$refs.lengthInput.value = this.length
    },
}
</script>
