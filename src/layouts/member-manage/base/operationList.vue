<template>
    <div>
        <i class="iconfont" :class="[i]" v-for="i in operation"></i>
    </div>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        props:["operation"]
    }

</script>
<style lang="less" scoped>


</style>
