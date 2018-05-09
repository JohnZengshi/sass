<template>
<!--     <div> -->
        <el-dialog class="dialog-w320-h220-hn affirm-delect-main" title="选择产品类型" v-model="saveSuccess">
            <div class="logo">
                <img src="./../../../static/img/piliang.png">
            </div>
            <ul class="body-wrap">
                <li>{{errorCode}}</li>
            </ul>
            <span slot="footer">
                <a href="javascript: void(0)" class="confirm-btn-w120 mr0" @click.stop="affirmFun">确 定</a>
            </span>
        </el-dialog>
<!--     </div> -->
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            saveSuccess: true
        }
    },
    watch: {
        'saveSuccess': function () {
            if (!this.saveSuccess) {
                this.affirmFun()
            }
        }
    },
    computed: {
        ...mapGetters([
            "errorCode"
        ])
    },
    methods: {
        affirmFun () { // 确定删除
            this.$store.dispatch('workPopupError', "")
        }
    }
}
</script>
<style lang="scss" scoped>
.affirm-delect-main{
    width: 100%;
    height: 100%;
    z-index: 10002!important;
    .logo {
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        img {
            display: block;
            margin: 0 auto;
        }
    }
    .body-wrap{
        padding: 0 30px;
        margin-top: 90px;
        li{
            font-size: 14px;
            line-height: 30px;
            color: #333;
            text-align: center;
        }
    }
}
</style>