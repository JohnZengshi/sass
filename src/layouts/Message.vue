<template>
    <div class="message-main">
        <div class="route-list">
            <ul>
                <li @click="toggle(index,tab.view)" v-for="(tab, index) in tabs" :class="{active:active==index}">
                    {{tab.type}}
                </li>
            </ul>
        </div>
        <div class="notice-main">
            <!--<component :is="currentView" @add="add" @cancel="cancel" @back="back"></component>-->
        </div>
    </div>
</template>

<script>
// import notice from './Notice/Notice'
// import chat from './Notice/Chat'
// import newNotice from './Notice/NewNotice'
export default {
    data() {
        return {
            "message": '',
            "targetId": 'selToID',
            "currentView": 'notice',
            "active": 0,
            tabs: [{
                type: '公告',
                view: 'notice'
           }, // {
//                type: '聊天',
//                view: 'chat'
              // }
          ]
        }
    },
    components: {
        //notice,
        //chat,
        //newNotice
    },
    methods: {
        toggle(i, v) {
            this.active = i
            this.currentView = v
        },
        add () {
            this.currentView = 'newNotice'
        },
        cancel () {
            this.currentView = 'notice'
        },
        back () {
          this.currentView = 'notice'
        }
    }
}
</script>

<style lang="scss" scoped>
.message-main {
    width: 1200px;
    margin: 40px auto 0;
    // border: 2px solid red;
    // height: calc(100% - 44px);
    height: 770px;
    .route-list{
        ul{
            height: 44px;
            li{
                display: inline-block;
                width: 120px;
                line-height: 44px;
                text-align: center;
                border-radius: 4px 4px 0 0;
                background: #4fdcca;
                color: #fff;
                margin-right: 3px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                &.active {
                    background: #f6f7f8;
                    color: #999;
                }
            }
        }
    }
    .notice-main{
        height: calc(100% - 44px);
        background: #fff;
    }
}
</style>
