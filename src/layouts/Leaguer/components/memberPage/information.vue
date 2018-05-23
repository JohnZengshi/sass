<template>
    <div class="memberinfo-content">
        <div class="memberinfo-top">
            <!-- 头像 -->
            <div class="member-log">
                <FormatImg :logo="memberInfo.memberLogo" :userName="memberInfo.username" :size="72"></FormatImg>
            </div>
            <!-- 文字内容 -->
            <div class="member-message">

                <div class="item">
                    <span class="item-star item-label">姓名</span>
                    <span>{{memberInfo.username}}</span>
                </div>

                <div class="item">
                    <span class="item-star item-label">电话</span>
                    <span>{{memberInfo.phone}}</span>
                </div>

                <div class="item">
                    <span class="item-label">会员积分</span>
                    <span>500分</span>
                </div>
                <div class="item" id="memberlevel">
                    <span class="item-label">会员等级</span>
                    <span @click="getLevel(1)" class="item-level1 item-level">普通<i class="iconfont icon-duigou2 duihao" :class="actionType == 1 ? 'action' : ''"></i></span>
                    <span @click="getLevel(2)" class="item-level2 item-level">中级<i class="iconfont icon-duigou2 duihao" :class="actionType == 2 ? 'action' : ''"></i></span>
                    <span @click="getLevel(3)" class="item-level3 item-level">重要<i class="iconfont icon-duigou2 duihao" :class="actionType == 3 ? 'action' : ''"></i></span>
                </div>

                <div class="item" @mouseover="showBtn" @mouseout="hiddenBtn">
                    <span class="item-label">负责人</span>
                    <i id="iconjia" class="iconfont icon-jia jia"></i>
                    <span>黄小明</span>
                </div>
            </div>
        </div>
        <div class="member-edit">
            <h4>基本信息</h4>
            <div class="member-edit-info">
                <div class="item">
                    <span class="item-label">会员编号</span>
                    <span>11011001001010</span>
                </div>
                <div class="item">
                    <span class="item-label">性别</span>
                    <el-radio v-model="radio" label="1">男</el-radio>
                    <el-radio v-model="radio" label="2">女</el-radio>
                </div>
                <div class="item">
                    <span class="item-label">生日</span>
                    <span>2014.4.5</span>
                </div>
                <div class="item">
                    <span class="item-label">微信号</span>
                    <input type="text" value="110">
                </div>
                <div class="item">
                    <span class="item-label">邮箱</span>
                    <input type="text" value="110">
                </div>
            </div>
            <div class="member-edit-bottom">
                <div class="member-edit-bz">
                    <div class="title">备注</div>
                    <el-input
                        type="textarea"
                        :rows="4"
                        :maxlength="50"
                        placeholder="请输入备注"
                        v-model="textarea">
                    </el-input>
                </div>
                <div class="member-edit-bq">
                    <div class="title fl">标签</div>
                    <div class="bq-item fl">
                        标签内容
                    </div>
                    <div class="bq-item fl">
                        标签内容
                    </div>
                    <div class="bq-item fl">
                        标签内容
                    </div>
                    <div class="bq-add fl">
                        添加标签
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回按钮 -->
        <div class="return-btn">
            <el-button style="width:80px" type="primary" size="medium" @click="goBack">返回</el-button>
        </div>
    </div>
</template>

<style lang="scss">
#memberlevel,.item{
    .item-level1{
        left: 98px;
        background: #ffc62e;
        cursor: pointer;
    }
    .item-level2{
        left: 142px;
        background: #ffa200;
        cursor: pointer;
    }
    .item-level3{
        left: 186px;
        background: #ed7000;
        cursor: pointer;
    }
    .duihao{
        position: absolute;
        top: -7px;
        right: -6px;
        color: #ffa200;
        opacity: 0;
    }
    .jia{
        color: #2993f8;
        cursor: pointer;
        display: none;
    }
    .action {
        opacity: 1;
    }
}
.member-edit {
    margin-bottom: 20px;
    h4 {
        padding-left: 8px;
        position: relative;
        margin-bottom: 28px;
        color: #2993f8;
        &::before{
            content: '';
            display: inline-block;
            width: 2px;
            height: 14px;
            background: #2993f8;
            position: absolute;
            top: 3px;
            left: 0;
        }
    }
    .member-edit-info{
        padding: 0 8px;
        display:flex;
        flex-wrap: wrap;
        .item {
            width: 48%;
            margin-bottom: 34px;
            .item-label{
                display: inline-block;
                width: 80px;
            }
            input{
                height: 28px;
                background-color:transparent;
                font-size: 14px;
                border-radius: 3px;
                &:active,
                &:hover,
                &:focus{
                    border: 1px solid #2993f8;
                    background-color: #f4f9ff;
                }
            }
        }
    }
    .member-edit-bottom {
        padding: 0 8px;
        display: flex;
        height: 150px;
        .member-edit-bz {
            width: 50%;
            .title {
                margin-right: 10px;
                display: inline-block;
                position: relative;
                padding-left: 8px;
                color: #2993f8;
                font-size: 14px;
                &::before{
                    content: '';
                    display: inline-block;
                    width: 2px;
                    height: 14px;
                    background: #2993f8;
                    position: absolute;
                    top: 3px;
                    left: 0;
                }
            }
            .el-textarea{
                width: 80%;
                vertical-align: top;
            }
        }
        .member-edit-bq{
            width: 50%;
            // display: flex;
            // flex-wrap: wrap;
            .title {
                height: 26px;
                margin-right: 10px;
                display: inline-block;
                position: relative;
                padding-left: 8px;
                color: #2993f8;
                font-size: 14px;
                &::before{
                    content: '';
                    display: inline-block;
                    width: 2px;
                    height: 14px;
                    background: #2993f8;
                    position: absolute;
                    top: 3px;
                    left: 0;
                }
            }
            .bq-item{
                width: 86px;
                height: 26px;
                margin-right: 14px;
                margin-bottom: 10px;
                background: #2993f8;
                color: #fff;
                text-align: center;
                line-height: 26px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
            }
            .bq-add {
                width: 86px;
                height: 26px;
                background: #fff;
                color: #2993f8;
                text-align: center;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                border-style: dashed;
                cursor: pointer;
            }
        }
    }
}
.return-btn {
    display:flex;
    justify-content: center;
}
</style>

<script>
import FormatImg from "components/template/DefaultHeadFormat.vue";

export default {
    data () {
        return {
            // 判断选中那个等级
            actionType:'',
            radio:'1',
            textarea:'',
        }
    },
    props:['memberInfo'],
    components:{
        FormatImg,
    },
    methods:{
        showBtn(){
            $('#iconjia').show()
        },
        hiddenBtn() {
            $('#iconjia').hide()
        },
        getLevel(type){
            this.actionType = type
        },
        goBack(){
            this.$emit('goBack',true)

        }
    },
    created() {

    },
    mounted() {

    },
}
</script>

 