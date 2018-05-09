<template>
    <div class="notice-main">
        <component :is="currentView" :noticeId='noticeId' @switch="switchAct"></component>
    </div>
</template>

<script>

import noticeList from './NoticeList'
import addNoticet from './AddNotice'
import editNotice from './EditNotice'
export default {
    data () {
        return {
            currentView: 'noticeList',
            noticeId: ''
        }
    },
    components: {
        noticeList,
        addNoticet,
        editNotice
    },
    methods: {
        switchAct (val) {
            switch (val.type) {
                case 'add':
                    this.noticeId = ''
                    this.currentView = 'addNoticet'
                break;
                case 'edit':
                    this.noticeId = val.id
                    this.currentView = 'editNotice'
                break;
                case 'list':
                    this.noticeId = ''
                    this.currentView = 'noticeList'
                break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.notice-main {
    width: 950px;
    //height: 880px;
    //margin: 0 auto;
    border-radius: 10px;
    background:#fff;
    position: absolute;
    top: 70px;
    bottom: 70px;
    left: 50%;
    margin-left: -475px;
}
</style>
