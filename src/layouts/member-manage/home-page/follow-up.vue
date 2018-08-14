<!-- 会员小方块 -->
<template>
    <div class="m-m-home-page-member-main">
        <div class="decoration">
            推送
        </div>
        <ul class="center-num-list">
            <li>
                <p>{{memberList.memberCount}}</p>
                <p>会员总数</p>
            </li>
            <li>
                <p>{{memberList.newMember}}</p>
                <p>今日新增</p>
            </li>
            <li>
                <p>{{memberList.conversion}}</p>
                <p>今日转换</p>
            </li>
        </ul>
        <ul class="center-btn-list">
            <li v-for="item in memberList.gradeList">
                <p>{{item.gradeName}}</p>
                <span>{{item.countGrade}}</span>
                <span>位</span>
            </li>
        </ul>
        <ul class="top-btn xj-btn-list">
            <li class="btn" @click="openAdd">+跟进</li>
            <router-link tag="li" :to="{path: '/membermanage/followUpManage', query: {shopId: filterOption.shopId}}" class="btn">跟进管理</router-link>
            <router-link tag="li" class="btn" :to="{path: '/memberManage/compileTemplate', query: {shopId: filterOption.shopId}}">待完成</router-link>
        </ul>
        
        <!-- 新增跟进 -->
        <add-follow-up ref="addFollowUpBox" :shopId="filterOption.shopId"></add-follow-up>
    </div>
</template>
<script>
import bigSmallClass from 'base/popup/big-small-class.vue'
import addFollowUp from './../follow-up/add-follow-up'

export default {
    components: {
        bigSmallClass,
        addFollowUp
    },
    props: ['filterOption', 'memberList'],
    data() {
        return {
            centerBtnList: [{
                    name: '会员总数',
                    value: '1000',
                    id: ''
                },
                {
                    name: '今日新增',
                    value: '1000',
                    id: ''
                },
                {
                    name: '今日转化',
                    value: '1000',
                    id: ''
                },
            ]
        }
    },
    methods: {
        openAdd() {
            this.$refs.addFollowUpBox.open()
        }
    }
}

</script>
<style lang="scss" scoped>
.m-m-home-page-member-main {
    position: relative;
    background-color: #fff;
    font-size: 0;
    overflow: hidden;
    margin: 0 30px;
    border-bottom: 1px solid #d6d6d6;
    .decoration {
        position: absolute;
        top: 30px;
        left: 0;
        font-size: 12px;
        line-height: 25px;
        color: #333;
        font-weight: bold;
        padding-left: 8px;
        &:before {
            content: "";
            display: inline-block;
            width: 3px;
            height: 16px;
            background: #2993f8;
            position: absolute;
            top: 3px;
            border-radius: 3px;
            left: 0;
        }
    }
    .member-list-btn {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 20px;
        height: 26px;
        line-height: 26px;
        font-size: 26px;
        cursor: pointer;
        margin: auto 0;
        &:hover {
            color: #2993f8;
        }
    }
    .center-num-list {
        font-size: 0; // width: 900px;
        // height: 200px;
        margin: 90px 0 0 110px;
        vertical-align: top;
        margin-bottom: 30px; // text-align: center;
        li {
            vertical-align: center;
            display: inline-block; // padding: 15px;
            width: 206px;
            font-size: 22px; // margin-right: 150px;
            p {
                text-align: center;
            }
            p:nth-child(1) {
                color: #333;
                font-size: 30px;
                margin-bottom: 5px;
                font-weight: bold;
            }
            p:nth-child(2) {
                color: #666;
                font-size: 14px;
            }
        }
        li:nth-child(1) {
            p:nth-child(1) {
                color: #2993f8;
            }
        }
    }
    .center-btn-list {
        font-size: 0;
        vertical-align: top;
        li {
            display: inline-block;
            font-size: 22px;
            margin-right: 40px;
            min-width: 115px;
            height: 94px;
            text-align: center;
            border: 1px solid #d6d6d6;
            border-radius: 5px; // background: url('~assets/img/member/member-box-four.png') no-repeat;
            background-size: 213px 86px;
            margin-bottom: 30px;
            p {
                color: #333;
                text-align: left;
                font-size: 14px;
                margin: 10px 0 20px 10px;
            }
            span {
                color: #333;
                font-weight: bold;
            }
            span:nth-child(2) {
                font-size: 20px;
            }
            span:nth-child(3) {
                font-size: 14px;
                color: #999;
            }
        }
    }
    .grade-list {
        display: inline-block;
        font-size: 0;
        margin: 20px 0 0 30px;
        border: 1px solid red;
        li {
            border: 1px solid red;
            padding: 10px 15px;
            font-size: 22px;
        }
    }
    .top-btn {
        position: absolute;
        top: 30px;
        right: 30px;
    }
}

</style>
