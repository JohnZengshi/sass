<!-- 提示弹窗 -->
<template>
    <div class="tip flex flex-v flex-align-center">
        <img class="close-icon" src="../../../../../assets/img/close-preview.png" @click.stop="handleclose" />
        <img class="headerimg" src="static/img/message/5.png" />
        <h3>提示</h3>
        <span class="tipMsg">{{tipMsg}}</span>
        <div class="bottomButton flex flex-r flex-pack-justify">
            <div class="clost-div" @click.stop="handleclose">取&nbsp;消</div>
            <div class="mybtn-div" @click.stop="confirmrequest">确&nbsp;定</div>
        </div>
    </div>
</template>
<script>
    export default {
        props:["tipMsg"],
        methods: {
            // 取消
            handleclose() {
                this.$emit('cancel', false);
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            },
            // 确定
            confirmrequest() {
                this.$emit('confirm', false);
                this.$message({
                    type: 'info',
                    message: '确定'
                });
            },
        }
    }

</script>
<style lang="less" scoped>
.tip {
    z-index: 9999;
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
    .tipMsg {
        margin-top: 43px;
        font-size: 14px;
    }
    .bottomButton {
        width: 200px;
        margin-top: 41px;
        .mybtn-div {
            border: 1px solid #2993f8;
            width: 90px;
            height: 28px;
            border-radius: 5px;
            line-height: 28px;
            text-align: center;
            font-size: 12px;
            color: #fff;
            font-weight: bold;
            background-color: #2993f8;
            box-sizing: border-box;
            cursor: pointer;
        }
        .clost-div {
            border: 1px solid #bdbdbd;
            width: 90px;
            height: 28px;
            border-radius: 5px;
            line-height: 28px;
            text-align: center;
            font-size: 12px;
            color: #2993F8;
            font-weight: bold;
            background-color: #FFF;
            box-sizing: border-box;
            cursor: pointer;
        }
    }
    
}
</style>
