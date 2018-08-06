<template>
    <el-table class="el_table_Commones" :class="[styleClass]" :data="tableData" :show-header="showHeader" border :stripe="true" style="width: 100%">
        <!-- 开启排序 -->
        <el-table-column label="排序" v-if="isSort" type="index" width="68"></el-table-column>
        <!-- 其他数据 -->
        <template v-for="(item,index) in headerData">
            <el-table-column :label="item.text" :width="item.width?item.width:false">
                <template scope="scope">
                    <!-- 图片 -->
                    <span class="pic" v-if="item.pic">
                        <img :src="scope.row[item.picValue]" alt="">
                    </span>
                    <!-- icon -->
                    <span class="icon" v-else-if="item.icon"></span>
                    <!-- 文本 -->
                    <template>
                        <!-- 表格内容需要转换 -->
                        <span 
                            v-if="item.isChangeVal" 
                            class="text" 
                            :class="{active : item.isActive && !(scope.row[item.tableValue])}">{{item.ChangeVal | changeText((item.tableValue),(scope.row[item.tableValue])) }}</span>
                        <!-- 表格内容不需要转换 -->
                        <span 
                            v-else 
                            class="text" 
                            :class="{mouseMove: item.isClick}" 
                            @click="item.isClick && clickTd(scope.row)">{{ scope.row[item.tableValue] }}</span>
                    </template>
                </template>
            </el-table-column>
        </template>
        <!-- 可选择 -->
        <el-table-column type="selection" width="55" v-if="optional"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" v-if="operationConfig.operation">
            <template scope="scope">
                <span style="display:none">{{tableData}}</span> <!-- 要加这个才会更新视图 -->
                <i class="iconfont" @click="operationBack(i,scope.$index)" :class="[i]" v-for="i in scope.row[operationConfig.tableValue]"></i>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: [
            "headerData", //表头数据
            "tableData", //表格数据
            "showHeader", //是否显示表头
            "styleClass", //表格预定样式
            "optional", //可选择的
            "isSort", //是否开启排序
            // "operation", //是否开启操作
            // "operationList", //操作的列表
            "operationConfig" //操作配置
        ], 
        methods: {
            // 点击操作按钮
            operationBack(i,index){
                let way = i.slice(i.indexOf("-")+1)
                this.$emit("operationBack",way,index)
            },
            // 点击表格内单个元素
            clickTd(val){
                this.$emit("clickTd",val);
            }
        },
        filters: {
            changeText:function(val,word,flag){
                // console.log(val,word,flag)
                let res = val.find((v)=>{
                    return v[word] == flag
                })
                return res.text;
            }
        },
        components: {},
        computed:{
            
        },
        watch:{},
        created(){}
    }

</script>
<style lang="less" scoped>
    .text{
        margin-left: 10px;
    }
</style>

