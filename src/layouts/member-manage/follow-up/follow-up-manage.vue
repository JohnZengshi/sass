<!-- 跟进管理 -->
<template>
    <list-box :headline="'跟进管理'"></list-box>
</template>
<script>
import listBox from './base/list-box'
export default {
    components: {
        listBox
    },
    data() {
        return {
            shopId: this.$route.query.shopId
        }
    },
    methods: {

    }
}

</script>
<style lang="scss">


</style>
