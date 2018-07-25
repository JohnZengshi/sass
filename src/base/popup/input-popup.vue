<template>
    <el-dialog :visible.sync="addDialog" customClass="addDig">
        <div class="title" slot="title">
            <img src="~static/img/piliang.png">
            <div>添加</div>
        </div>
        <div class="body">
            <input v-model="name" type="text" :placeholder="headTit ? headTit : '请输入'">
        </div>
        <div class="foot" solt="footer">
            <div class="ope-btn" @click="confirm">确定</div>
        </div>
    </el-dialog>
</template>       
<script>
    export default {
        props: ['headTit'],
        data () {
            return {
                addDialog: false,
                name: ''
            }
        },
        methods: {
            open () {
                this.name = ''
                this.addDialog = true
            },
            confirm () {
                this.addDialog = false
                this.$emit('confirm', this.name)
            }
        }
    }
</script>