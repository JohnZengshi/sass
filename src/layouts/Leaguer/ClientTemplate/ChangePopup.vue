<template>
    <el-dialog customClass="newPopupDig" title="" v-model="isShow">
        <div slot="title" class="title">
            <img src="~static/img/piliang.png">
        </div>
        <div class="body">
            <div class="classes-block">
                <div class="title">选择添加类型</div>
                <ul class="list">
                    <li v-for="item in showList" @click="getData(item.type)">{{item.name}}</li>
                </ul>
                <div class="footer"></div>
            </div>
        </div>
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
export default {
    props: ['currentShop'],
    data () {
        return {
            "isShow": false,
            "showList": [
                {
                    name: '来访列表',
                    type: '1'
                },
                {
                    name: '会员列表',
                    type: '2'
                }
            ]
        }
    },
    methods: {
        open () {
            this.isShow = true
        },
        close () {
            this.isShow = false
        },
        getData (parm) {
            if (parm == '1') {
                this.$router.push({
                    path: parm == '1' ? '/faceRecognition/visitList' : '/leaguer/newLeaguer',
                    query: {
                        shopId: this.currentShop ? this.currentShop.shopId : '',
                        isAdd: true
                    }
                })
                return
            } else {
                this.$emit('openChoseMember')
            }
            this.close()
        }
    }
}
</script>
<style lang="scss" src="./newPopup.scss"></style>
<style src="assets/css/template/newReceiptPopup.scss" lang="scss" scoped></style>