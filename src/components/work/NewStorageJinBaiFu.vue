<template>
    <el-dialog class="dialog-w500-h650-hn new-Jin-Bai-Fu" @close="closeCb" title="" v-model="isShow">
        <!-- 库位列表 -->
        <div class="list">
    <!--         <p class="popTitle"> -->
            <div class="jbf-header-wrap">
                <img src="~assets/img/copy.png">
                <p>
                  选择导入位置
                </p>   
            </div>
<!--                 <span>选择导入位置</span> -->
<!--             </p> -->
            <div class="choose-wrap">
                <p>选择仓库</p>
                <ul>
                    <li :class="{actions: item.repositoryId == newDatas.repositoryId}" v-for="item in repositoryList" @click="getRepositoryId(item.repositoryId)">
                        {{item.repositoryName}}
                       <!--  <input type="file" name="file" @change="uploadingOne($event, item.repositoryId, 1)"/> -->
                    </li>
                </ul>
            </div>

            <div class="choose-wrap">
                <p>选择店铺</p>
                <ul>
                    <li v-for="item in shopListByCo" :class="{actions: item.shopId == newDatas.shopId}" @click="getShopId(item.shopId)">
                        {{item.shopName}}
                        <!-- <input type="file" name="file" @change="uploadingOne($event, item.shopId, 2)"/> -->
                    </li>
                </ul>
            </div>

            <div class="jbf-bottom-wrap">
                <input type="text">
                <p>
                    选择文件
                    <input type="file" name="file" @change="uploadingOne($event)"/>
                </p>
                <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
            </div>
            <div v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="拼命进行中..."></div>
        </div>
    </el-dialog>
</template>
<script>
import {mapGetters, mapActions} from "vuex"
// import {operateCreateFHReceipt} from './../../Api/commonality/operate'
export default {
    data () {
        return {
            "productTypeList": null,
            "productTypeListSmall": null,
            "transform": true,
            "fourBig": false,
            "bigStyle": {},
            "viewBig": 2,
            "chooseData": {
                "childIndex": 1,
                "chooseBig": "",
                "chooseSmall": ""
            },
            "cutData": {
                "one": true,
                "two": false,
                "three": false,
                "four": false
            },
            "newDatas": { // 新增数据(其它页面也用到的)
                "shopId": "", // 店铺ID
                "repositoryId": "" // 库位ID
            },
            "isShow": false,
            "fullscreenLoading": false
        }
    },
    props: [
        'newPopup'
    ],
    watch: {
        'newPopup': function () {
            console.log(this.newPopup)
            if (this.newPopup === true) {
                this.isShow = this.newPopup;
            }
        }
    },
    created () {
        this.workRepositoryList();
        this.workSupplierList();
        this.getShopListByCo();
        this.isShow = this.newPopup;
    },
    computed: {
        ...mapGetters([
            "shopListByCo", // 店铺列表
            "repositoryList", // 库位列表
            "supplierListData" // 供应商
        ])
    },
    methods: {
        ...mapActions([
            "workRepositoryList", // 库位列表
            "getShopListByCo", // 店铺列表
            "workSupplierList" // 供应商
        ]),
        getRepositoryId (parm) { // 绑定库位Id
            this.newDatas.shopId = ''
            this.newDatas.repositoryId = parm;
        },
        getShopId (parm) {
            this.newDatas.repositoryId = ''
            this.newDatas.shopId = parm;
        },
        uploadingOne (e, type) {
            this.fullscreenLoading = true;
            var files = e.currentTarget.files[0];
            var fileData = new FormData();
            fileData.append("excelFile", files);
            let data = {
                "data": {
                    "type": 1,
                    "storageId": this.newDatas.repositoryId,
                    "shopId": this.newDatas.shopId
                },
                "unit": {
                    "companyId": sessionStorage.getItem("companyId"),
                    "channel": 3,
                    "OS": "web",
                    "ip": "string",
                    "userId": sessionStorage.getItem("id"),
                    "tokenId": sessionStorage.getItem("tokenId")
                }
            }
            // if (type === 1) {
            //     data.data.storageId = this.newDatas.repositoryId;
            // } else {
            //     data.data.shopId = this.newDatas.shopId;
            // }
            fileData.append("data", JSON.stringify(data));
            // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:9097/yunzhubao-bat' : ''
            // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:8082/yunzhubao-bat' : ''
            var url = INTERFACE_URL_9097 + "/b1/jinbaifuUpload"
            console.log('请求地址', url)
            this.$http.post(url, fileData).then((response) => {
                this.fullscreenLoading = false;
                if (response.data.state === 200) {
                    this.$store.dispatch('workPopupError', "导入成功")
                    this.closeCb();
                } else {
                    this.$store.dispatch('workPopupError', response.data.msg)
                }
            }, (response) => {
                this.$store.dispatch('workPopupError', response.data.msg)
            })
        },
        closeCb () {
            this.$emit("closePopup", false)
        }
    }
}
</script>
<style lang="scss">
.new-Jin-Bai-Fu {
    .el-dialog--small{
        .el-dialog__header{
            border-bottom: none;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
        }
    }
}
</style>
<style lang="scss" scoped>
.new-Jin-Bai-Fu{
    .popTitle{ // 弹窗标题
        height: 70px;
        line-height: 70px;
        text-align: center;
        background: #f6f7f8;
        border-radius: 4px 4px 0 0;
        .prePage{ // 上一页
            position: absolute;
            left: 10px;
        }
        .skip{ // 跳过
            position: absolute;
            right: 10px;
        }
    }
    .jbf-header-wrap{
        margin: 20px 0;
        text-align: center;
        // border: 1px solid red;
        p{
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          color: #333;
          margin-top: 10px;
        }
    }
    .list{
        .choose-wrap{
            height: 230px;
            overflow: auto;
            p{
                padding-left: 20px;
            }
            ul{
                display: inline-block;
                padding: 20px;
                li{
                    position: relative;
                    display: inline-block;
                    width: 100px;
                    height: 36px;
                    line-height: 36px;               
                    background: #f6f7f8;
                    // border: 1px solid #2993f8;
                    color: #333;
                    cursor: pointer;
                    text-align: center;
                    border-radius: 3px;
                    margin: 0 20px 10px 0;
                    input{
                        position: absolute;
                        width: 100px;
                        height: 36px;
                        top: 0;
                        left: 0;
                        opacity: 0; 
                    }
                }
                li:hover{
                    background: #2993f8;
                    color: #fff;
                }
                .actions{
                    background: #2993f8;
                    color: #fff;
                }
                .on{
                    color: #fff;
                    background-color: #2993f8;
                }
            }
        }
    }
    .jbf-bottom-wrap{
        padding: 0 20px;
        >input{
            width: 100%;
            height: 30px;
            border: 1px solid #666;
            border-radius: 5px;
        }
        p{
            position: relative;
            font-size: 12px;
            color: #333;
            border: 1px solid red;
            input{
                position: absolute;
                width: 100px;
                height: 36px;
                top: 0;
                left: 0;
                opacity: 0; 
            }
        }
    }
}
</style>
