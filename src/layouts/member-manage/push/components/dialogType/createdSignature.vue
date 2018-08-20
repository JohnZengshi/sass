<template>
    <div class="createdSignature flex flex-v flex-align-center">
        <img class="close-icon" src="../../../../../assets/img/close-preview.png" @click.stop="handleclose" />
        <img class="headerimg" src="static/img/creat.png" />
        <h3>创建/编辑签名</h3>
        <el-input v-model="inputValue"  class="input-w268-h36 mt-33" placeholder="签名名称"></el-input>
        <el-button class="btn-w150-h28 btn-color02 btn-backColor01 btn-noBorder mt-30 " @click="handleconfirm">确定</el-button>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                inputValue:""
            }
        },
        methods:{
            // 取消
            handleclose() {
                this.$emit('cancel', false);
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            // 确定
            handleconfirm(){
                this.$emit('confirm', false, this.inputValue);
                this.inputValue = ""
            },
            
        }
    }

</script>
<style lang="less" scoped>
    .createdSignature {
        position: relative;
        width: 320px;
        height: 255px;
        .headerimg {
            width: 46px;
            height: 46px;
            margin-top: 24px;
        }
        h3 {
            margin-top: 15px;
            font-size: 14px;
            font-weight: bold;
        }
        .close-icon {
            position: absolute;
            top: 13px;
            right: 13px;
            display: inline-block;
            width: 14px;
            height: 14px;
            cursor: pointer;
            z-index: 99999;
        }
    }

</style>
