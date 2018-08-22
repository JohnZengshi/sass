<!-- 会员小方块 -->
<template>
    <div class="m-m-home-page-index-main">
        <div class="decoration">
            跟进
        </div>
        <ul class="center-num-list">
            <li>
                <p>{{followUpData.memberCount}}</p>
                <p>跟进总数</p>
            </li>
            <li>
                <p>{{followUpData.newMember}}</p>
                <p>今日新增</p>
            </li>
            <li>
                <p>{{followUpData.conversion}}</p>
                <p>今日完成</p>
            </li>
            <li>
                <p>{{followUpData.conversion}}</p>
                <p>跟进率</p>
            </li>
                        <li>
                <p>{{followUpData.conversion}}</p>
                <p>超时</p>
            </li>
        </ul>
        <ul class="center-message-list">
            <router-link tag="li" v-for="item in followUpData.dataList"  :to="{path: '/membermanage/followUpList', query: {shopId: filterOption.shopId, followPurpose: item.followPurpose}}">

                <p>{{item.name}}</p>

                <div class="center-btn-item">
                    <span>未完成跟进</span><span>158</span>
                </div>

                <div class="center-btn-item">
                    <span>已完成跟进</span><span>158</span>
                </div>

                <div class="center-btn-item">
                    <span>跟进率</span><span>158</span>
                </div>

            </router-link>
        </ul>
        <ul class="top-btn xj-btn-list">
            <li class="btn" @click="openAdd">+跟进</li>
            <router-link tag="li" :to="{path: '/membermanage/followUpManage', query: {shopId: filterOption.shopId}}" class="btn">跟进管理</router-link>
            <router-link tag="li" class="btn" :to="{path: '/membermanage/followUpList', query: {shopId: filterOption.shopId}}">待完成</router-link>
        </ul>
        
        <!-- 新增跟进 -->
        <add-follow-up ref="addFollowUpBox" v-if="isAddFollowUp" @close="isAddFollowUp = false" :shopId="filterOption.shopId"></add-follow-up>
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
    props: ['filterOption', 'followUpData'],
    data() {
        return {
            isAddFollowUp: false,
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
                    this.isAddFollowUp = true
        setTimeout(() => {
          this.$refs.addFollowUpBox.open()
        }, 0)
        }
    }
}

</script>
<style lang="scss" src="./homePage.scss"></style>
