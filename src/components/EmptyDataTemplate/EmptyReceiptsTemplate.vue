<template>
    <div class="empty-receipts-template" :class="{'empty-receipts-template-h226': !isAddRole, 'empty-receipts-template-h316': isAddRole}">
<!--         <img src="../../../static/img/space-page.png" alt=""> -->
        <img src="./../../../static/img/no-data.png" alt="">
        <!-- <p>暂无单据</p> -->
        <a v-if="isAddRole" href="javascript: void(0)" @click="emptyAddReceipt">去创建单据</a>
    </div>
</template>
<script>
    export default {
        props: ['isAddRole'],
        methods: {
            emptyAddReceipt () {
                this.$emit("emptyAddReceipt")
            }
        }
    }
</script>
<style lang="scss" scoped>
.empty-receipts-template-h226{
    height: 290px;
}
.empty-receipts-template-h316{
    height: 316px;
}
.empty-receipts-template{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    // height: 316px;
    // min-height: 226px;
    width: 300px;
    font-size: 0;
    img{
        width: 300px;
        height: 290px;
    }
    p{
        text-align: center;
        margin-top: 20px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #666;
    }
    a{
        position: absolute;
        display: block;
        bottom: 10px;
        width: 120px;
        margin-left: 90px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #666;
        text-align: center;
        font-weight: bold;
        border-radius: 4px;
        color: #fff;
        background-color: #2993f8;
        cursor: pointer;
        &:hover{
            background-color: #2993f8;
        }
    }
}
</style>