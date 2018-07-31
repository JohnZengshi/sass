<template>
    <div class="tab">
        <ul>
            <li :key="index" v-for="(item,index) in list" @click="switchTab(item)" :class="{active : currentIndex == index}">{{item.tabName}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        props:['list'],
        data() {
            return {
                currentIndex: 0,
            }
        },
        methods: {
            switchTab(item) {
                this.currentIndex = item.id;
                this.$emit("switchTab",item)
            }
        }
    }

</script>
<style lang="less" scoped>
    .tab {
        height: 33px;
        ul {
            height: 100%;
            li {
                cursor: pointer;
                float: left;
                width: 82px;
                height: 100%;
                font-size: 12px;
                line-height: 33px;
                padding-left: 12px;
                color: #2993F8;
                font-weight: 600;
                background: url(/static/img/tab-default.png) no-repeat left center;
                &.active {
                    color: #fff;
                    background: url(/static/img/tab-select.png) no-repeat left center;
                }
            }
        }
    }

</style>
