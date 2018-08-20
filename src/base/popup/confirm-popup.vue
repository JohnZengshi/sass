<template>
    <small-popup ref="smallPopupBox" :headTit="headTit" :dialogClass="'new-small-popup-comfirm-dialog'">
        <div class="confirm-popup-body-box">
            <p>{{hint}}</p>
            <ul class="xj-btn-list">
               <li class="btn cnacel-btn" @click="close">取消</li> 
               <li class="btn" @click="comfirm">确定</li> 
            </ul>
        </div>
    </small-popup>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
import smallPopup from './small-popup'
export default {
    props: ['currentShop', 'headTit', 'hint'],
    components: {
        smallPopup
    },
    methods: {
        open () {
            this.$refs.smallPopupBox.open()
        },
        close () {
            this.$refs.smallPopupBox.close()
            this.$emit('close')
        },
        comfirm () {
            this.$refs.smallPopupBox.close()
            this.$emit('comfirm')
        }
    }
}
</script>
<style lang="scss">
.confirm-popup-body-box{
    p{
        height: 66px;
        text-align: center;
    }
}
</style>
<!-- <style lang="scss" src="./newPopup.scss"></style>
<style src="assets/css/template/newReceiptPopup.scss" lang="scss" scoped></style> -->