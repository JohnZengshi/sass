<template>
    <div class="iphone">
        <img src="static/img/member/iphone.png" alt="">
        <div class="content">{{content}}</div>
    </div>
</template>
<script>
    export default {
        props:["content"]
    }

</script>
<style lang="less" scoped>
    .iphone{
        width: 360px;
        height: 730px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .content{
            position: absolute;
            top: 153px;
            left: 38px;
            width: 212px;
            background-color: #F6F6F6;
            border-radius: 7px;
            line-height: 16px;
            font-size: 13px;
            padding: 14px 13px;
        }
    }

</style>
