<template>
    <div class="signClass">
        <template v-if="title == '入库'">
            <div>
                <span class="person">制单人：__________</span>
            </div>
            <div>
                <span class="person">审核人：__________</span>
            </div>
        </template>
        <template v-else-if="title == '修改'">
            <div>
                <span class="person">制单人：__________</span>
            </div>
            <div>
                <span class="person">审核人：__________</span>
            </div>
        </template>
        <template v-else-if="title == '退库'">
            <div>
                <span class="person">制单人：__________</span>
            </div>
            <div>
                <span class="person">审核人：__________</span>
            </div>
        </template>
        <template v-else-if="title == '调库'">
            <div>
                <span class="person">制单人：__________</span>
            </div>
            <div>
                <span class="person">收货人：__________</span>
            </div>
        </template>
        <template v-else-if="title == '发货'">
            <div>
                <span class="person">制单人：__________</span>
            </div>
            <div>
                <span class="person">审核人：__________</span>
            </div>
            <div>
                <span class="person">收货人：__________</span>
            </div>
        </template>
        <template v-else-if="title == '调柜'">
            <div>
                <span class="person">制单人：__________</span>
            </div>
        </template>
        <template v-else-if="title == '退货'">
            <div>
                <span class="person">制单人：__________</span>
            </div>
            <div>
                <span class="person">审核人：__________</span>
            </div>
            <div>
                <span class="person">收货人：__________</span>
            </div>  
        </template>
        <template v-else-if="title == '销售'">
            <div>
                <span class="person">制单人：__________</span>
            </div>
            <div>
                <span class="person">销售员：__________</span>
            </div>
            <div>
                <span class="person">收银员：__________</span>
            </div>
        </template>
    </div>
</template>
<script>
  export default {
      props:["title"]
  }

</script>
<style lang="less" scoped>
    .signClass{
        float: right;
        padding: 10px 10px 10px 10px;
        >div{
            margin: 0 10px;
            position: relative;
            display: inline;
            span{

            }
        }
    }

</style>
