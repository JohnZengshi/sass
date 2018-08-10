<!-- 我的跟进 -->
<template>
    <transition name="tp-ani">
        <div class="RP_report_wrapper ui-page-max-width report_table_fixed dc-label-print-main">
        
            <memberInfo ref="memberInfoBox" @closeReturn="closeEditReturn" :shopId="shopId" :memberId="memberId"></memberInfo>

            <div class="Rp_title_container">
                <!--面包屑-->
                <div class="Rp_crumbs">
                    <i class="iconfont icon-lianxiren"></i>
                    <router-link tag="span" to="/work/report/" class="path_crumbs">会员主页</router-link> > <span class="txt">我的跟进</span>
                </div>

                <down-menu class="fr" :isSolid="true" :titleInfo="shopName ? shopName : '店铺名称'" :showList="shopList" :nameKey="'shopName'" @changeData="changeShop" @clearInfo="clearShop"></down-menu>

            </div>
            <table-list ref="tableListBox" @changeMember="changeMember" @compileData="compileData" :shopId="shopId" :currentLocation="'followUp'"></table-list>
        </div>
    </transition>
</template>
<script>
import { seekGetShopListByCo } from 'Api/commonality/seek.js'
import DownMenu from 'base/menu/DownMenu'
import filterHeader from './../base/filter-header'
import memberInfo from '@/layouts/Leaguer/components/memberInfo'
import downMenu from 'base/menu/new-down-menu'
import tableList from './base/table-list'
// import btnHeader from './base/btn-header'
import { productTpyeState, newProductDetailStatus } from 'Api/commonality/status'

export default {
    components: {
        DownMenu,
        filterHeader,
        memberInfo,
        downMenu,
        tableList
        // btnHeader
    },
    data() {
        return {
            shopId: this.$route.query.shopId,
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
                            // this.changeShop(i)
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
            this.memberId = parm.memberId
            setTimeout(() => {
                this.$refs.memberInfoBox.open()
            }, 0)
        },
        changeMember(parm) {
            this.memberId = parm.memberId
            setTimeout(() => {
                this.$refs.memberInfoBox.open()
            }, 0)
        },
        clearShop() {
            this.shopName = ''
            this.shopId = ''
        },
    }
}

</script>
<style lang="scss">


</style>
