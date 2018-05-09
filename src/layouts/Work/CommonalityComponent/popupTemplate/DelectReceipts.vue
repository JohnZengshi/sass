<template>
    <div class="dialog-w320-h220-hn affirm-delect-main">
        <el-dialog title="选择产品类型" v-model="saveSuccess">
            <ul class="body-wrap">
                <li>删除后该单据将从系统消失，确定删除么？</li>
<!--                 <li v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命进行中..."></li> -->
            </ul>
            <span slot="footer">
                <a href="javascript: void(0)" class="cancel-btn-w120" @click="close">取消</a>
                <a href="javascript: void(0)" class="confirm-btn-w120 mr0" @click="batchDelect">确定</a>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {operateDeleteByOrderNumber} from './../../../../Api/commonality/operate'
export default {
    props: [
        'delPopup', // 弹窗
        'receiptsOrderNum' // 单号
    ],
    data () {
        return {
            saveSuccess: false
            // fullscreenLoading: false
        }
    },
    watch: {
        'delPopup': function () {
            this.saveSuccess = this.delPopup;
        },
        'saveSuccess': function () {
            if (!this.saveSuccess) {
                this.close()
            }
        }
    },
    methods: {
        close () {
            var states = {
                type: "1", // 取消
                name: false
            }
            this.$emit('delectReceiptsState', states)
        },
        batchDelect () { // 确定删除
            var options = {
                "orderNum": this.receiptsOrderNum
            }
            // this.fullscreenLoading = true;
            operateDeleteByOrderNumber(options).then((response) => {
                // this.fullscreenLoading = false;
                if (response.data.state === 200) {
                    var states = {
                        type: "2", // 删除成功
                        name: false
                    }
                    this.$emit('delectReceiptsState', states)
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg);
                }
            }, (response) => {
                console.log(response);
            })
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
        margin-top: 60px;
        li{
            font-size: 14px;
            line-height: 30px;
            color: #333;
            text-align: center;
        }
    }
}
</style>