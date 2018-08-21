<!-- 我的跟进 -->
<template>
    <transition name="tp-ani">
        <div class="RP_report_wrapper ui-page-max-width report_table_fixed dc-label-print-main">
        
            <!-- 会员信息 -->
<!--             <memberInfo ref="memberInfoBox" @closeReturn="closeEditReturn" :shopId="shopId" :memberId="memberId"></memberInfo> -->

            <!-- 完成跟进和批量完成的切换 -->
            <cut-popup v-if="headline == '我的跟进'" ref="cutPopupBox"></cut-popup>
            
            <!-- 编辑跟进 -->
            <add-follow-up v-if="headline == '跟进管理'" ref="addFollowUpBox" :shopId="shopId"></add-follow-up>

            <div class="Rp_title_container">
                <!--面包屑-->
                <div class="Rp_crumbs">
                    <i class="iconfont icon-lianxiren"></i>
                    <router-link tag="span" to="/membermanage" class="path_crumbs">会员主页</router-link> > <span class="txt">{{headline}}</span>
                </div>
                <router-link tag="div" class="xj-btn-defult fr" to="/membermanage">返回上一页</router-link>

                <down-menu class="fr mr-10" :isSolid="true" :titleInfo="shopName ? shopName : '店铺名称'" :showList="shopList" :nameKey="'shopName'" @changeData="changeShop" @clearInfo="clearShop"></down-menu>

            </div>
            <table-list ref="tableListBox" @changeMember="changeMember" @compileData="compileData" :shopId="shopId" :currentLocation="'followUp'" :headline="headline"></table-list>
        </div>
    </transition>
</template>
<script>
import { seekGetShopListByCo } from 'Api/commonality/seek.js'
import DownMenu from 'base/menu/DownMenu'
import memberInfo from '@/layouts/Leaguer/components/memberInfo'
import downMenu from 'base/menu/new-down-menu'
import tableList from './table-list'
import cutPopup from './cut-popup'
import addFollowUp from './../add-follow-up'
// import btnHeader from './base/btn-header'
import { productTpyeState, newProductDetailStatus } from 'Api/commonality/status'

export default {
    props: ['headline'],
    components: {
        DownMenu,
        memberInfo,
        downMenu,
        tableList,
        cutPopup,
        addFollowUp
        // btnHeader
    },
    data() {
        return {
            shopId: this.$route.query.shopId,
            followPurpose: this.$route.query.followPurpose,
            shopName: '',
            memberId: '',
            shopList: []
        }
    },
    created() {
        this._seekGetShopListByCo()
    },
    methods: {
        _seekGetShopListByCo() { // 店铺列表
            let options = {
                page: 1,
                pageSize: 0,
                type: 1,
            };
            seekGetShopListByCo(options).then((res) => {
                if (res.data.state == 200) {
                    this.shopList = res.data.data.shopList
                    for (let i of res.data.data.shopList) {
                        if (i.shopId == this.shopId) {
                            this.shopId = i.shopId
                            this.shopName = i.shopName
                            return
                        }
                    }
                } else {
                    this.$message({ type: 'error', message: res.data.msg })
                }
            });
        },
        changeShop(parm) {
            this.shopId = parm.shopId
            this.shopName = parm.shopName
            setTimeout(() => {
                this.$refs.tableListBox.filterData({shopId: parm.shopId, init: true})
            }, 0)
        },
        closeEditReturn() {

        },
        // 编辑数据
        compileData (parm) {
            this.memberId = parm.data.memberId
            setTimeout(() => {
                if (this.$refs.addFollowUpBox) {
                    this.$refs.addFollowUpBox.open({'followId': parm.data.followId})   
                }
                // 完成跟进
                if (this.$refs.cutPopupBox) {
                    this.$refs.cutPopupBox.open({index: 'complete', followId: parm.data.followId, item:parm.data })   
                }
            }, 0)
            // setTimeout(() => {
            //     this.$refs.memberInfoBox.open()
            // }, 0)
        },
        changeMember(parm) {
            // this.memberId = parm.memberId
            // setTimeout(() => {
            //     // 会员信息
            //     // if (this.$refs.memberInfoBox) {
            //     //     this.$refs.memberInfoBox.open()
            //     // }
            //     // 我的跟进，编辑状态
            //     // if (this.$refs.cutPopupBox) {
            //     //     this.$refs.cutPopupBox.open({index: 'chooseUser', 'followId': parm.followId})  
            //     // }
            // }, 0)
        },
        clearShop() {
            this.shopName = ''
            this.shopId = ''
        },
    }
}

</script>
