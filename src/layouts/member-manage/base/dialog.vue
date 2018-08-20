<template>
    <el-dialog 
        :modal="modal" 
        class="dialog-w320-hAuto-hn" 
        :class="{delectInvoicesClass: (dialogType == 'Tip'),
        NotelogDialogClass: (dialogType == 'Notelog'),
        inSetModuleDialogClass:(dialogType == 'inSetModule'),
        selectSignatureClass:(dialogType == 'selectSignature'),
        selectSendPresonClass:(dialogType == 'selectSendPreson'),
        signatureManageClass:(dialogType == 'signatureManage'),
        createdSignatureClass:(dialogType == 'createdSignature'),
        rechargeClass:(dialogType == 'recharge'),
        moduleDetailClass:(dialogType == 'moduleDetail')}"
        :before-close="handleclose" 
        :visible="isShowDialog">
        <!-- 提示弹窗 -->
        <template v-if="dialogType == 'Tip'">
            <Tip v-loading="vLoading" :tipMsg="tipMsg" @cancel="handleclose" @confirm="confirmrequest"></Tip>
        </template>
        <!-- 短信日志弹窗 -->
        <template v-else-if="dialogType == 'Notelog'">
            <Notelog :data="data" @cancel="handleclose"></Notelog>
        </template>
        <!-- 插入模板弹窗 -->
        <template v-else-if="dialogType == 'inSetModule'">
            <inSetModule @cancel="handleclose" @confirm="confirmrequest"></inSetModule>
        </template>
        <!-- 选择签名弹窗 -->
        <template v-else-if="dialogType == 'selectSignature'">
            <selectSignature @cancel="handleclose" @confirm="confirmrequest"></selectSignature>
        </template>
        <!-- 选择发送人弹窗 -->
        <template v-else-if="dialogType == 'selectSendPreson'">
            <selectSendPreson @cancel="handleclose" @confirm="confirmrequest"></selectSendPreson>
        </template>
        <!-- 管理签名 -->
        <template v-else-if="dialogType == 'signatureManage'">
            <signatureManage :filterOption="filterOption" @cancel="handleclose"></signatureManage>
        </template>
        <!-- 新增签名弹窗 -->
        <template v-else-if="dialogType == 'createdSignature'">
            <createdSignature @cancel="handleclose"></createdSignature>
        </template>
        <!-- 充值弹窗 -->
        <template v-else-if="dialogType == 'recharge'">
            <recharge :shopId="filterOption.shopId" rechargeclick="false"></recharge>
        </template>
        <!-- 模板详情弹窗 -->
        <template v-else-if="dialogType == 'moduleDetail'">
            <moduleDetail @cancel="handleclose" @confirm="confirmrequest"></moduleDetail>
        </template>
    </el-dialog>
</template>

<script>
    import Tip from "../push/components/dialogType/Tip.vue";
    import Notelog from "../push/components/dialogType/Notelog.vue";
    import inSetModule from "../push/components/dialogType/inSetModule.vue";
    import selectSignature from "../push/components/dialogType/selectSignature.vue";
    import selectSendPreson from "../push/components/dialogType/selectSendPreson.vue";
    import signatureManage from "../push/components/dialogType/signatureManage.vue";
    import createdSignature from "../push/components/dialogType/createdSignature.vue";
    import recharge from "../push/components/dialogType/recharge.vue";
    import moduleDetail from "../push/components/dialogType/moduleDetail.vue";
    export default {
        props: [
            'dialogType', //弹窗类型
            'isShowDialog', //弹窗显示
            'tipMsg', //弹窗提示语
            'modal', //模态框
            'filterOption', //
            'vLoading', //v-loading
            'data' //传递过来的数据
        ],
        components: {
            Tip, //提示弹窗
            Notelog,//短信日志弹窗
            inSetModule,//插入模板弹窗
            selectSignature,//选择签名弹窗
            selectSendPreson,//选择发送人弹窗
            signatureManage,//管理签名弹窗
            createdSignature,//新增签名弹窗
            recharge, //充值弹窗
            moduleDetail,//模板详情弹窗
        },
        watch: {
        },
        data() {
            return {
            }
        },
        created() {},
        computed:{},
        methods: {
            // 取消弹窗
            handleclose() {
                this.$emit('cancel', false);
                // this.$message({
                //     type: 'info',
                //     message: '已取消操作'
                // });
            },
            // 确定弹窗
            confirmrequest(flage,data) {
                //确认
                this.$emit('confirm',flage,data);
                // this.$message({
                //     type: 'info',
                //     message: '确定'
                // });
            },
        }
    }

</script>

<style lang="scss" scoped>
</style>
