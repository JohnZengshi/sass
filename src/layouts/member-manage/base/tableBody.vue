<template>
    <el-table 
        class="el_table_Commones" 
        style="width: 100%"
        :class="[styleClass]" 
        :data="tableData" 
        :show-header="showHeader" 
        border 
        :stripe="true" 
        @selection-change="handleSelectionChange"
        @row-click="rowClick">
        <!-- 开启排序 -->
        <el-table-column label="排序" v-if="isSort" type="index" width="68"></el-table-column>
        <!-- 其他数据 -->
        <template v-for="(item,index) in headerData">
            <el-table-column :label="item.text" :width="item.width?item.width:false">
                <template scope="scope">
                    <!-- 图片 -->
                    <span class="pic" v-if="item.pic">
                        <img :src="scope.row[item.tableValue]" alt="">
                    </span>
                    <!-- icon -->
                    <span class="icon" v-else-if="item.icon">
                        <i></i>
                    </span>
                    <!-- 图片加文本 -->
                    <template v-else-if="item.picAndText">
                        <div class="flex flex-r flex flex-align-center flex-pack-center">
                            <img :src="scope.row[item.picValue]" alt="">
                            <span class="text">{{ scope.row[item.tableValue] }}</span>
                        </div>
                    </template>
                    <!-- 文本 -->
                    <template v-else>
                        <div 
                            class="text"
                            :class="{mouseMove: item.isClick , active : item.isActive && (item.activeRules(scope.row[item.tableValue]))}"
                            @click="item.isClick && clickTd(scope.row)">
                            <!-- 表格内容需要转换 -->
                            <span v-if="item.isChangeVal" >{{item.changeValRules(scope.row[item.tableValue])}}</span>
                            <!-- 表格内容不需要转换 -->
                            <span v-else >{{ scope.row[item.tableValue] }}</span>
                        </div>
                    </template>
                </template>
            </el-table-column>
        </template>
        <!-- 多选模式 -->
        <el-table-column type="selection" width="55" v-if="optional" ></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" v-if="operationConfig.operation">
            <template scope="scope">
                <span style="display:none">{{tableData}}</span> <!-- 要加这个才会更新视图 -->
                <!-- icon类型 -->
                <template v-if="operationConfig.type == 'icon'">
                    <i class="iconfont" @click="operationBack(i,scope)" :class="[i]" v-for="i in scope.row[operationConfig.tableValue]"></i>                    
                </template>
                <!-- 单选模式 -->
                <template v-else-if="operationConfig.type == 'radio'">
                    <el-radio class="square el-radio-nofont" v-model="radio" :label="scope.row"></el-radio>
                </template>
                <!-- 按钮 + icon类型 -->
                <template scope="scope" v-else-if="operationConfig.type == 'btnAndIcon'" v-for="item in scope.row[operationConfig.tableValue]">
                    <el-button v-if="item.type == 'btn'" :class="item.btnStyle" @click="item.btnEvent && operationBack(item,scope)">{{item.btnName}}</el-button>
                    <i v-if="item.type == 'icon'" class="iconfont" @click="operationBack(item,scope)" :class="[item.iconName]"></i>
                </template>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                radio:"",
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
            "operationConfig", //操作配置
            "isRowClick", //是否可以点击单行触发
        ], 
        methods: {
            // 点击操作按钮
            operationBack(item,scope){
                // let iconName = item.iconName;
                // let way = iconName.slice(iconName.indexOf("-")+1)
                this.$emit("operationBack",item,scope)
            },
            // 点击表格内单个元素
            clickTd(val){
                this.$emit("clickTd",val);
            },
            // 多选模式触发
            handleSelectionChange(val){
                // console.log(val)
                this.$emit('selectChange',val);

            },
            // 某一行被点击
            rowClick(row, event, column){
                if(!this.isRowClick) return;
                this.$emit("rowClick",row)
            }
        },
        filters: {

        },
        components: {},
        computed:{
            
        },
        watch:{
            // 单选响应
            "radio"(val){
                this.$emit("chooseChange",val)
            }
        },
        created(){}
    }

</script>
<style lang="less" scoped>
    .pic{
        width: 34px;
        height: 34px;
        >img{
            width: 100%;
            height: 100%;
            display: inline-block;
        }
    }
    .text{
        margin-left: 10px;
    }
</style>

