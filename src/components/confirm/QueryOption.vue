<template>
    <div class="dialog-w320-h220-hn affirm-delect-main">
        <el-dialog title="选择产品类型" v-model="saveSuccess">
            <div class="body-wrap">
                <slot></slot>
            </div>
            <span slot="footer">
                <a href="javascript: void(0)" class="cancel-btn-w120" @click="close">取 消</a>
                <a href="javascript: void(0)" class="confirm-btn-w120 mr0" @click="affirmFun">确 定</a>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: [
        'isQueryOption'
    ],
    data () {
        return {
            saveSuccess: false
        }
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
            this.$emit('queryOptionFun', false)
        },
        affirmFun () { // 确定删除
            this.$emit('queryOptionFun', true)
        }
    }
}
</script>
<style lang="scss" scoped>
.affirm-delect-main{
    width: 100%;
    height: 100%;
    .body-wrap{
        padding: 0 30px;
        margin-top: 70px;
        text-align: center;
    }
}
</style>