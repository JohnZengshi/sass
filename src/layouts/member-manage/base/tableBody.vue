<template>
    <el-table :class="[styleClass]" :data="tableData" :show-header="showHeader" border :stripe="true" style="width: 100%">
        <template v-for="(item,index) in headerData">
            <el-table-column :label="item.text" v-if="item.operation">
                <template scope="scope">
                    <i class="iconfont" :class="[i]" v-for="i in item.operationList"></i>
                </template>
            </el-table-column>
            <el-table-column :label="item.text" v-else>
                <template scope="scope">
                    <span class="pic" v-if="item.pic">
                        <img :src="scope.row[item.picValue]" alt="">
                    </span>
                    <span class="icon" v-else-if="item.icon">

                    </span>
                    <span class="text" style="margin-left: 10px" :class="{active : (item.active)}">{{ scope.row[item.value] }}</span>
                </template>
            </el-table-column>
        </template>
        <el-table-column type="selection" width="55" v-if="optional">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: [
            "headerData", //表头数据
            "tableData", //表格数据
            "showHeader", //是否显示表头
            "styleClass", //表格预定样式
            "optional", //可选择的
        ], 
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
        filters: {},
        components: {}
    }

</script>
