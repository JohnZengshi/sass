<template>
    <el-dialog customClass="faceNewPopupDig" title="" v-model="isShow">
        <div slot="title" class="title">
            <img src="~static/img/piliang.png">
            <div>未开通功能提示</div>
        </div>
        <div class="body">
            <p>你未开通人脸识别功能，请联系客服</p>
            <p><span>0755-82328918</span>进行开通</p>
            <a href="javascript: void(0)" @click="close">确定</a>
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
    mounted () {
        eventBus.$on('open-face-popup', () => {
            this.open()
        })
    },
    methods: {
        open () {
            this.isShow = true
        },
        close () {
            this.isShow = false
        }
    }
}
</script>
<style lang="scss" src="./newPopup.scss"></style>
<style src="assets/css/template/newReceiptPopup.scss" lang="scss" scoped></style>