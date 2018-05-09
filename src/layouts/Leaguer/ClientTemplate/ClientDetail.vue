<template>
    <div>
        <el-dialog v-model="addLeaguer" top="12%" customClass="clientDetailDig" @close="close">
            <clientDetailIndex
                ref="clientDetailIndexWrap"
                v-show="currentLocation"
                :currentSeekData="currentSeekData"
                :shopId="shopId"
                @relevanceMember="relevanceMember"
                @openHistory="openHistory"
                @close="close"
                @openEditReturn="openEditReturn"
                @successOperationIntention="successOperationIntention"
                @openAddLeaguer="openAddLeaguer"
            ></clientDetailIndex>
            <historyList
                ref="historyListWrap"
                v-show="!currentLocation"
                @closeHistory="closeHistory"
                @seekCurrentDetail="seekCurrentDetail"
                :currentSeekData="currentSeekData"
                :shopId="shopId"
            ></historyList>
        </el-dialog>

        <!-- 新增会员 -->
        <addLeaguerDig
            :addLeaguer="isAddLeaguer"
            :shopId="shopId"
            :shopManageRole="shopManageRole"
            :shopRole="shopRole"
            :shopManRole="shopManRole"
            :isFace="true"
            @closeReturn="closeReturn"
            @successCallback="successCallback"
        >
        </addLeaguerDig>

    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import ClientDetailIndex from './ClientDetailIndex'
import addLeaguerDig from './../components/addLeaguerDig'
import historyList from './HistoryList'
import {operateRelateFaceMember, operateCreateSellOrder} from 'Api/commonality/operate'
export default {
    // isMember--区分是否是会员详情进来的，做返回区分
    props: ['currentSeekData', 'shopId', 'isMember'],
    components: {
        ClientDetailIndex,
        historyList,
        addLeaguerDig
    },
    data () {
        return {
            relevanceId: '',
            isAddLeaguer: false,
            currentLocation: true,
            addLeaguer: false,
            clickDetail: {}
        }
    },
    watch: {
        'currentSeekData' () {
            setTimeout(() => {
                if (this.$refs.clientDetailIndexWrap) {
                    this.$refs.clientDetailIndexWrap._seekList()
                }
            }, 100)
            // this.$refs.clientDetailIndexWrap._seekList()
        }
    },
    computed: {
        ...mapGetters([
            "userPositionInfo" // 职位信息
        ]),
        shopRole: function () { // 店员
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
            }
        },
        shopManRole: function () { // 店员
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopManRole(this.userPositionInfo.roleList)
            }
        },
        shopManageRole: function () { // 店长
            if (this.userPositionInfo.roleList) {
                return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
            }
        }
    },
    methods: {
        successCallback (parm) {
            this.successCallback = false
            let options = {
                shopId: this.shopId,
                memberId: parm.memberId,
                otherId: this.relevanceId
            }
            operateRelateFaceMember(options)
                .then((res)=> {
                    if (res.data.state == 200) {
                        this.isAddLeaguer = false
                        this.$message({
                            message: '关联成功',
                            type: 'success'
                        })
                        this.$refs.clientDetailIndexWrap._seekList()
                        this.$emit('successOperationIntention')
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning'
                        })
                    }
                })
                
        },
        openAddLeaguer (parm) {
            this.relevanceId = parm
            this.isAddLeaguer = true
        },
        closeReturn () {
            this.isAddLeaguer = false
        },
        open () {
            this.addLeaguer = true
            // 不是会员进来
            if (!this.isMember) {
                if (this.$refs.clientDetailIndexWrap) {
                    this.$refs.clientDetailIndexWrap._seekList()
                }
            } else {
                this.currentLocation = false
            }
        },
        successOperationIntention () {
            this.close()
            this.$emit('successOperationIntention')
        },
        close () {
            this.addLeaguer = false
            if (!this.isMember) {
                this.currentLocation = true
            }
        },
        openHistory (parm) {
            this.currentLocation = false
            this.$refs.historyListWrap._seekList(parm)
        },
        relevanceMember (parm) {
            this.closeHistory()
            this.$emit('relevanceMember', parm)
        },
        closeHistory () {
            if (this.isMember) {
                this.close()
                this.$emit('openMemberDetail')
            } else {
                this.currentLocation = true
            }
        },
        seekCurrentDetail (parm) {
            this.currentLocation = true
            this.$refs.clientDetailIndexWrap._seekList(parm)
        },
        openEditReturn () {
            this.addLeaguer = false
            this.$emit('openEditReturn')
        }
    }
}
</script>
<style lang="scss">
.clientDetailDig {
    position: relative;
    width: 700px;
    height: 730px;
    border-radius: 10px;
    .el-dialog__body{
        padding: 0;
    }
}
</style>

