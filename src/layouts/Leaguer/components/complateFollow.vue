<template>
    <div class="complate-floolw-wrap">
        <div class="title">
            <img src="./../../../../static/img/member/member.png">
            <div class="name">完成跟进</div>
        </div>
        <div class="follow-way follow-block">
            <div class="follow-title">
                <span></span>拜访方式<i>*</i>
            </div>
            <div class="follow-content">
                <div :class="{active: way == 1}" @click="choseWay(1)" class="follow-item">面谈</div>
                <div :class="{active: way == 2}" @click="choseWay(2)" class="follow-item">电话</div>
                <div :class="{active: way == 3}" @click="choseWay(3)" class="follow-item">聊天软件</div>
                <div :class="{active: way == 4}" @click="choseWay(4)" class="follow-item">其他</div>
            </div>
        </div>
        <div class="follow-result follow-block">
            <div class="follow-title">
                <span></span>拜访结果<i>*</i>
            </div>
            <div class="follow-content">
                <textarea v-model="result"></textarea>
            </div>
        </div>
        <div class="follow-update follow-block">
            <div class="follow-title">
                <span></span>上传照片<i></i>
            </div>
            <div class="follow-content">
                <div v-for="(item, index) in imgList" :key="index" class="image-show">
                    <img :src="item.resultSrc">
                    <i @click="delImg(item, index)" class="iconfont icon-guanbi-copy"></i>
                </div>
                <div v-if="imgList.length < 6" @click="selectFile" class="add-img"></div>
                <input @change="changeFileInput" v-show="false" id="file_input" type="file">
            </div>
        </div>
        <div class="comp-btn" @click="confirm">确定</div>
    </div>
</template>

<script>
import base from 'src/config/base/index'
import baseApi from 'Api/Base/base'
import {operateFollowComplete} from 'Api/commonality/operate'
export default {
    props: [
        'followData',
        'followId',
        'followIdList',
        'isCopmeFllow'
    ],
    data () {
        return {
            way: 1, // 拜访方式
            result: '', // 拜访结果
            imgList: [] // 上传图片列表
        }
    },
    watch: {
        isCopmeFllow (val) {
            if (val == false) {
                this.way = 1
                this.result = ''
                this.imgList = []
            }
        }
    },
    methods: {
        delImg (item, index) {
            this.imgList.splice(index, 1)
        },
        confirm () { // 点击确定
            // console.log(this.followData)
            let options = {}
            if (this.followIdList) {
                // console.log(111)
                // console.log(this.followIdList)
                let arr = []
                this.followIdList.forEach((item, index) => {
                    arr.push({followId: item})
                })
                options = {
                    followList: arr,
                    visitType: this.way,
                    visitResult: this.result,
                    logoList: this.imgList
                }
            } else {
                console.log(222)
                console.log(this.followId)
                options = {
                    followList: [
                        {
                            followId: this.followId
                        }
                    ],
                    visitType: this.way,
                    visitResult: this.result,
                    logoList: this.imgList
                }
            }
            operateFollowComplete(options).then((res) => {
                console.log(res)
                if (res.data.state == 200) {
                    this.$emit("complate")
                } else {
                    this.$message({
                        type: 'warning',
                        message: res.data.msg
                    })
                }
            }, (res) => {
                this.$message({
                    type: 'warning',
                    message: res.data.msg
                })
            })
        },
        choseWay (type) {
            this.way = type
        },
        selectFile (type) {
            //this.updataImgType = type
            document.getElementById("file_input").click();
            //console.log(document.getElementById("file_input").value);
        },
        changeFileInput (ev) {
            console.log(ev.target.files[0])
            let self = this
            let file = ev.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(ev.target.files[0]);
                reader.onload = function (e) {
                //document.getElementById("preview_img").src = this.result;
                self.uploadHandler(file, 1)

                }
            }
        },
        uploadHandler (file) {
            let self = this;
            let extNameList = file.name.split('.');
            let extName = extNameList[extNameList.length - 1]
            let getSignUrl = base.Cos.getSignUrl
            let updateUploadFileURL = base.Cos.updateUploadFileURL
            let myFolder = '/iconHeaded/'
            let appid = base.Cos.appid
            let bucket = base.Cos.bucket
            let region = base.Cos.region
            let userId = sessionStorage.getItem('id')
            let timestamp = new Date().getTime()
            let fileName = userId + '-' + timestamp + '.' + extName
            let cos = new CosCloud({
            appid: appid,
            bucket: bucket,
            region: region,
            getAppSign: function (callback) {
                    baseApi.apiCall({type: '1'}, getSignUrl).then((response) => {
                    //console.log(response.data)
                    let sign = response.data.data.signStr
                    console.log(sign);
                    myFolder = response.data.data.url
                    callback(sign)
                    })
                }
            })
            if (extName == 'png' || extName == 'jpg' || extName == 'jpeg') {
                let successCallBack = function (result) {
                    //console.log(result)
                    //this.dataInfo.cardSrc = result.data.source_url
                    self.imgList.push(
                    {resultSrc: result.data.source_url}
                    )
                    console.log(self.imgList)
                }
                let errorCallBack = function (result) {
                    console.log(result)
                }
                let progressCallBack = function (result) {
                    console.log(result)
                }
                cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + fileName, file, 0) //0表示允许覆盖文件 1表示不允许
                } else {
                this.$store.dispatch('workPopupError', "文件格式必须为 *.jpg / *.png");
                location.reload();
                return
            }
        },
    }
}
</script>

<style lang="scss" >
.compeReDig {
    width: 320px;
    height: 600px;
    background:#fff;
    border-radius: 10px;
    .el-dialog__header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .el-dialog__body {
        padding: 0 28px;
    }
}
.complate-floolw-wrap {
    .title {
        padding-top: 24px;
        img {
            width: 46px;
            height: 46px;
            display: block;
            margin: 0 auto;
            border-radius: 50%;
            margin-bottom: 15px;
        }
        .name {
            width: 70px;
            height: 20px;
            text-align: center;
            margin:0 auto;
            color:#333;
            margin-bottom: 25px;
        }
    }
    .follow-block {
        .follow-title {
            height: 14px;
            font-size: 14px;
            color: #333;
            line-height: 14px;
            margin-bottom: 18px;
            &>span {
                border-radius: 2px;
                height: 14px;
                width: 3px;
                background:#2993f8;
                float: left;
                margin-right: 7px;
            }
            &>i {
                color:#ff2424;
            }
        }
    }
    .follow-way {
        .follow-content {
            height: 28px;
            margin-bottom: 30px;
            .follow-item {
                width: 56px;
                height: 26px;
                border: 1px solid #d6d6d6;
                border-radius: 2px;
                text-align: center;
                line-height: 26px;
                float: left;
                margin-right: 13px;
                color:#999999;
                font-size: 12px;
                cursor: pointer;
            }
            .follow-item.active {
                background:#e9f4fe;
                border: 1px solid #2993f8;
                color:#2993f8;
            }
            .follow-item:last-child {
                margin-right: 0;
            }
        }
    }
    .follow-result {
        .follow-content {
            margin-bottom: 30px;
            height: 74px;
            textarea {
                background:#f6f7f8;
                border-radius: 4px;
                height: 100%;
                width: 100%;
            }
        }
    }
    .follow-update {
        .follow-content {
            height: 154px;
            .image-show {
                width: 54px;
                height: 54px;
                border-radius: 8px;
                float: left;
                margin-right: 16px;
                margin-bottom: 18px;
                // overflow: hidden;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                }
                .iconfont {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    display: none;
                    cursor: pointer;
                }
            }
            .image-show:hover {
                .iconfont {
                    display: block;
                }
            }
            .image-show:nth-child(4n+0) {
                margin-right: 0;
            }
            .add-img {
                width: 54px;
                float: left;
                height: 54px;
                border-radius: 4px;
                background: url('./../../../../static/img/member/follow/add.png') no-repeat center;
                cursor: pointer;
            }
        }
    }
    .comp-btn {
        width: 150px;
        height: 28px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        line-height: 28px;
        background:#2993f8;
        color:#fff;
        margin: 0 auto;
        cursor: pointer;
    }
}
</style>
