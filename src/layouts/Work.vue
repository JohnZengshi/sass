<template>
<transition name="tp-ani">
    <div>
        <router-view></router-view>
        <!-- <labelPopup></labelPopup> -->
    </div>
</transition>
</template>

<script>
import {seekMySelfWorkApplyList} from '../../src/Api/commonality/seek'
import labelPopup from '@/layouts/data-center/label-print/popup'
export default {
    components: {
        labelPopup
    },
    data () {
        return {
            indexLocation: true,
            "myWorkApplyList": {
                storageName: false,
                storageReturnName: false,
                transferStorageName: false,
                sippingName: false,
                transferCabinetName: false,
                salesReturnName: false,
                sellName: false
            }
        }
    },
    watch: {
        '$route' () {
            this.judgeRoute();
        }
    },
    created () {
        this.getIcon();
    },
    mounted () {
        this.judgeRoute();
    },
    methods: {
        judgeRoute () { // 判断路由
            let url = window.location.href
            let bool = url.search("report")
            this.indexLocation = false;
            if (this.$route.path === "/work") {
                this.indexLocation = false;
            } else {
                this.indexLocation = true;
            }
            if (bool !== -1) {
                this.indexLocation = false;
            }
        },
        getIcon () { // 获取个人应用
            seekMySelfWorkApplyList().then((response) => {
                if (response.data.state === 200) {
                    var applyLists = [];
                    for (let i = 0; i < response.data.data.classifyList.length; i++) {
                        applyLists.push(...response.data.data.classifyList[i].applyList)
                    }
                    this.getConfigData(applyLists);
                } else {
                  console.log('获取个人应用列表报错信息: ' + response.data.msg);
                  this.$message({
                      type: 'error',
                      message: response.data.msg
                  });
                }
            }, (response) => {
                console.log(response);
            })
        },
        getConfigData (applyLists) {
            for (let i of applyLists) {
                switch (i.applyName) {
                    case "入库":
                        this.myWorkApplyList.storageName = true;
                        break;
                    case "退库":
                        this.myWorkApplyList.storageReturnName = true;
                        break;
                    case "调库":
                        this.myWorkApplyList.transferStorageName = true;
                        break;
                    case "发货":
                        this.myWorkApplyList.sippingName = true;
                        break;
                    case "调柜":
                        this.myWorkApplyList.transferCabinetName = true;
                        break;
                    case "退货":
                        this.myWorkApplyList.salesReturnName = true;
                        break;
                    case "修改":
                        this.myWorkApplyList.amendName = true;
                        break;
                    case "销售":
                        this.myWorkApplyList.sellName = true;
                        break;
                }
            }
        }
    }
}
</script>
<style lang="scss">

@import "~assets/css/template/billsTable.scss";

.work-wrap{
    width: 100%;
    height: 100%;
    // overflow: hidden;
    //background-color: #e0e1e4;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 70px;
    // padding: 0 20px;
    .work-nav{ // 导航
        background-color: #fff;
        height: 70px;
        line-height: 70px;
        font-size: 0;
        min-width: 1300px;
        width: 100%;
        ul{
            width: 1150px;
            height: 70px;
            margin: 0 auto;
            background-color: #fff;
            text-align: center;
            li{
                position: relative;
                height: 70px;
                line-height: 70px;
                width: 80px;
                text-align: center;
                margin-right: 20px;
                // margin-right: 70px;
                display: inline-block;
                font-size: 18px;
                overflow: hidden;
                color: #666;
                font-weight: 600;
                cursor: pointer;
                &:hover{
                    border-bottom: 2px solid #46cebc;
                    color: #46c4b4;
                }
            }
            li:first-child{
                margin-left: 0;
            }
            .router-link-active{
                color: #46c4b4;
                border-bottom: 2px solid #46cebc;
            }
        }
    }
    .work-view{
        width: 100%;
        position: relative;
        height: 100%;
        margin: 0 auto;
    }
}
.work-navigation{ // 导航
    font-size: 14px;
    background-color: transparent;
    position: absolute;
    top: 20px;
    z-index: 1000;
    left: 0;
    margin-left: 20px;
    height: 14px;
    line-height: 14px;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ul{
        font-size: 0;
        li{
            color: #0abfab;
            font-size: 14px;
            height: 14px;
            line-height: 14px;
            display: inline-block;
            cursor:pointer;
        }
        li:last-child{
            color: red;
            i{
                display: none;
            }
        }
    }
}
@media screen and (min-width: 1660px) {
    .work-wrap{
        // padding-bottom: 0;
        .work-nav{
            width: 100%;
        }
    }
}
</style>