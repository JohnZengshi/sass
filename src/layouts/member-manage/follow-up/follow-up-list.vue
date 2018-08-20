<!-- 我的跟进 -->
<template>
    <list-box :headline="'我的跟进'"></list-box>
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
