<template>
    <!-- 编辑短信发送里面的插入字段下面的组件(多个地方用到) -->
    <div class="main"  v-loading="filterData && filterData.length !=0 ? false : true">
        <div class="filterBottom">
            <ul class="flex flex-r flex-pack-end">
                <template v-for="(item,index) in filterTab">
                    <li :class="{active : (currentTab == item)}" @click="switchTab(item)">
                        {{item}}
                        <span v-if="(index == 0)" class="arrows">
                            <i></i>
                        </span>
                    </li>
                </template>
            </ul>
        </div>
        <div class="filterBox">
            <div class="title">
                <div class="flex flex-r flex-pack-justify">
                    <ul class="flex flex-r" :class="{open : isOpen}">
                        <li v-for="item in filterData" :class="{active : currentChildrenTab == item[itemName]}" @click="switchChildrenTab(item)">
                            {{item[itemName]}}
                            <div class="list" v-if="currentChildrenTab == item[itemName]">
                                <ul class="flex flex-r">
                                    <li @click="clickChildrenItem(i)" v-for="i in item[childrenItemName]">{{i.fieidName}}</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <span class="right flex flex-r flex-align-center flex-pack-center" @click="open">
                        <i class="iconfont icon-sanjiao2" :class="{active : isOpen}"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                isOpen:false,
            }
        },
        props: ["filterTab", "filterData", "childrenItemName", "itemName"],
        asyncComputed:{
            currentChildrenTab:{
                get(){
                    if(this.filterData.length != 0){
                        return this.filterData[0][this.itemName]
                    }else{
                        return ""
                    }
                },
                default(){
                    return ""
                }
            },
            currentTab:{
                get(){
                    if (this.filterTab[0]) {
                        return this.filterTab[0]
                    }else{
                        return ""
                    }
                },
                default(){
                        return ""
                }
            }
        },
        methods:{
            open(){
                this.isOpen = !this.isOpen
            },

            switchTab(item){
                this.currentTab = item;
                this.$emit("switchTab",item);
            },
            // 切换头部字段
            switchChildrenTab(item){
                this.currentChildrenTab = item[this.itemName]
            },
            // 点击子项
            clickChildrenItem(item){
                this.$emit("clickChildrenItem",item);
            }
        }
    }

</script>
<style lang="less" scoped>
.main {
    height: 295px;
    .filterBottom {
        width: 100%;
        border-radius: 0 0 3px 3px;
        background-color: #F5F7FA;
        border: 1px #D6D6D6 solid;
        border-top: none;
        ul {
            padding: 0 13px;
            li {
                position: relative;
                margin-left: 13px;
                height: 37px;
                line-height: 37px;
                font-size: 13px;
                color: #333333;
                cursor: pointer;
                &.active {
                    color: #3195F5;
                }
                .arrows {
                    position: absolute;
                    bottom: -21px;
                    left: 50%;
                    margin-left: -5px;
                    display: block;
                    height: 0;
                    width: 0;
                    font-size: 0;
                    line-height: 0;
                    border-color: transparent transparent #D6D6D6 transparent;
                    border-style: dashed dashed solid dashed;
                    border-width: 10px;
                    z-index: 999;
                    i {
                        position: absolute;
                        top: -9px;
                        *top: -9px;
                        left: -10px;
                        display: block;
                        height: 0;
                        width: 0;
                        font-size: 0;
                        line-height: 0;
                        border-color: transparent transparent #F5F7FA transparent;
                        border-style: dashed dashed solid dashed;
                        border-width: 10px;
                    }
                }
            }
        }
    }
    .filterBox {
        width: 499px; // height: 280px;
        border-radius: 3px;
        border: 1px #D6D6D6 solid;
        position: relative;
        margin-top: 20px;
        .title {
            background-color: #F5F7FA;
            ul {
                // padding: 0px 30px;
                width: 482px;
                flex-wrap: wrap;
                width: -webkit-fill-available; // height: 30px;
                li {
                    font-size: 15px;
                    line-height: 36px;
                    color: #999999;
                    text-align: center;
                    width: 16.6%;
                    cursor: pointer;
                    &.active {
                        color: #3195F5;
                    }
                    .list {
                        width: 497px;
                        height: 200px;
                        left: 0;
                        top: 36px;
                        position: absolute;
                        border: 1px #D6D6D6 solid;
                        border-top: none;
                        ul {
                            flex-wrap: wrap;
                            li {
                                width: 33%; // text-align: center;
                                padding-left: 25px;
                                line-height: 41px;
                                color: #333333;
                                cursor: pointer;
                                &:hover {
                                    color: #3195F5;
                                }
                            }
                        }
                    }
                }
                // &.open {
                //     height: auto;
                // }
            }
            .right {
                width: 17px;
                background-color: #D6D6D6;
                height: auto;
                text-align: center;
                cursor: pointer;
                i {
                    color: #FBFBFB;
                    font-size: 12px;
                    &.active {
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
}
</style>
