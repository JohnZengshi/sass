<template>
        <div class="wrap">
            <div class="title">跟进</div>
            <div class="block-1">
                <div class="img-block"><img :src="followData.memberLogo"></div>
                <div class="name">{{followData.nickname}}</div>
                <div class="phone">
                    <span>
                        {{followData.phone}}
                    </span>
                </div>
            </div>
            <div class="block-2">
                <div class="info-block1 info-block">
                    <div class="title">
                        负责人
                    </div>
                    <div class="info">
                        <div class="main">{{prinList}}</div>
                        <span v-if="followData.principalList.length > 1">等<em>{{followData.principalList.length}}</em>人</span>
                    </div>
                </div>
                <div class="info-block2 info-block">
                    <div class="title">
                        跟进目的
                    </div>
                    <div class="info">
                        {{getVist(followData)}}
                    </div>
                </div>
                <div class="info-block2 info-block">
                    <div class="title">
                        计划日期
                    </div>
                    <div class="info">
                        {{formatTime(followData.followTime)}}
                    </div>
                </div>
                <div class="info-block2 info-block">
                    <div class="title">
                        跟进状态
                    </div>
                    <div class="info">
                        {{getStatus(followData)}}
                    </div>
                </div>
            </div>
            <div class="block-3">
                <div class="info way">
                    <div class="info-title"><span></span>跟进方式</div>
                    <div class="main"><span>{{getWay(followData)}}</span></div>
                </div>
                <div class="info result">
                    <div class="info-title"><span></span>跟进结果</div>
                    <div class="main">
                        <div class="section">{{followData.visitResult}}</div>
                    </div>
                </div>
                <div class="info picture">
                    <div class="info-title"><span></span>跟进图片</div>
                    <div class="main">
                        <img :src="item.resultSrc" :key="index" v-for="(item, index) in followData.logoList">
                    </div>
                </div>
            </div>
            <div class="btn">
              <span @click="deletefollow" v-if="shopManageRole == true">删除</span>
            </div>
        </div>
</template>

<script>
import {seekGetFollowInfo} from 'Api/commonality/seek'
import {operateFollowOperation} from 'Api/commonality/operate'
import ComplateFollow from './complateFollow'
export default {
    components: {
        ComplateFollow
    },
    props: [
        'shopId',
        'followId',
        'isFllow',
        'followData',
        'prinList',
        'shopManageRole'
    ],
    data () {
        return {
            isCopmeFllow: false,
        }
    },
    created () {
        //this.getFollowInfo()
    },
    mounted () {
    },
    methods: {
        // getFollowInfo() {
        //     let options = {
        //         shopId: this.shopId,
        //         followId: this.followId
        //     }
        //     seekGetFollowInfo(options).then((res) => {
        //         console.log(res)
        //         if (res.data.state == 200) {
        //             this.followData = res.data.data
        //         }
        //     }, (res) => {
        //         console.log(res)
        //     })
        // },
        //删除跟进
        deletefollow () {
          this.$confirm('此操作将永久删除该跟进, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // type: 'warning'
        }).then(() => {
          let options = {
            shopId: this.shopId,
            followId: this.followId,
            operateType: 1
          }
          operateFollowOperation(options).then(res => {
            if (res.data.state == 200) {
              this.$message('删除成功')
              eventBus.$emit('oprationgetFollowAllList', '000')
            }
          }, res => {
            this.$message(res.data.msg)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        },
        complate (val) {
            this.isCopmeFllow = false
        },
        close () {
            this.$emit("closeFollow", "")
        },
        formatTime (time1) { // 格式化时间
            //console.log(this.followData)
            //console.log(time1)
            //console.log(this.receiptsIntroList)
            let year = time1.substring(0, 4)
            let month = time1.substring(4, 6)
            let data = time1.substring(6, 8)
            let hour = time1.substring(8, 10)
            let time = time1.substring(10, 12)
            return year + "-" + month + "-" + data + " " + hour + ":" + time
        },
        getWay (item) {
            switch (item.visitType) {
                case '1':
                    return '面谈'
                case '2':
                    return '电话'
                case '3':
                    return '聊天软件'
                case '4':
                    return '其他'
            }
        },
        getStatus (item) {
            switch (item.status) {
                case '1':
                    return '未完成'
                case '2':
                    return '已超时'
                case '3':
                    return '已完成'
                case '4':
                    return '已暂停'
            }
        },
        getVist (item) {
            switch (item.visitAim) {
                case '1':
                    return '日常拜访'
                case '2':
                    return '促销执行'
                case '3':
                    return '临时拜访'
                case '4':
                    return '其他目的'
                case '5':
                    return '售后跟进'
                case '6':
                    return '生日跟进'
            }
        }
    }
}
</script>

<style lang="scss">
.el-dialog__wrapper {
    overflow: visible;
}
.followResultDig {
    width: 700px;
    height: 790px;
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
    .wrap {
        .title {
            padding-top: 20px;
            font-size: 14px;
            color:#333;
            font-weight: bold;
            margin-bottom: 30px;
        }
        .block-1 {
            width: 640px;
            height: 170px;
            border-radius: 10px;
            background:url('./../../../../static/img/member/follow/background.png') no-repeat center center;
            margin-bottom: 20px;
            padding-top: 25px;
            &> div {
                margin: 0 auto;
            }
            .img-block {
                width: 72px;
                height: 72px;
                margin-bottom: 10px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .name {
                font-size: 14px;
                color:#333;
                font-weight: bold;
                width: 100px;
                text-align: center;
                margin-bottom: 10px;
                height: 14px;
            }
            .phone {
                width: 150px;
                color:#666666;
                font-size: 12px;
                text-align: center;
                height: 14px;
                span {
                    padding-left: 20px;
                    background:url("./../../../../static/img/member/new/phone.png") no-repeat left center;
                }
                img {

                    display: inline-block;;
                }
            }
        }
        .block-2 {
            height: 110px;
            margin-bottom: 20px;
            .info-block {
                width: 152px;
                height: 100%;
                background:#eef7fe;
                border-radius: 6px;
                float: left;
                margin-right: 11px;
                padding: 0 14px;
                .title {
                    font-size: 14px;
                    color:#666666;
                    height: 48px;
                    &>i {
                        float: right;
                        color:#929aaf;
                        cursor: pointer;
                    }
                }
                .info {
                    height: 20px;
                    text-align: center;
                }
            }
            .info-block1 {
                .info {
                    height: 20px;
                    text-align: left;
                    .main {
                        width: 90px;
                        float: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    span {
                        font-size: 12px;
                        color:#999999;
                    }
                }
            }
            .info-block:last-child {
                margin-right: 0;
            }
        }
        .block-3 {
            width: 640px;
            height: 318px;
            background:#f6f7f8;
            border-radius: 6px;
            padding: 24px 30px;
        }
        .btn{
          text-align: center;
          margin-top: 25px;
          >span{
            display: inline-block;
            width: 90px;
            line-height: 28px;
            border:1px solid #d6d6d6;
            border-radius: 4px;
            color:#2993f8;
          }
          >span:hover{
            cursor: pointer;
            color: #fff;
            background-color: #2993f8;
          }
        }
        .info {
            .info-title {
                font-size: 14px;
                line-height: 14px;
                color:#999999;
                margin-bottom: 18px;
                &>span {
                    width: 3px;
                    border-radius: 2px;
                    float: left;
                    height: 14px;
                    background:#2993f8;
                    margin-right: 10px;
                }
            }
        }
        .way {
            margin-bottom: 30px;
            .info-title {
                width: 98px;
                float: left;
                margin-bottom: 0;
            }
            .main {
                &>span {
                    line-height: 14px;
                }
            }
        }
        .result {
            margin-bottom: 30px;
            .main {
                .section {
                    line-height: 14px;
                    height: 60px;
                    padding-left: 10px;
                }
            }
        }
        .picture {
            .main {
                img {
                    width: 54px;
                    height: 54px;
                    border-radius: 4px;
                    margin-right: 20px;
                }
            }
        }
        // .footer {
        //     height: 28px;
        //     .btn-wrap {
        //         height: 100%;
        //         width: 200px;
        //         margin: 0 auto;
        //         .btn {
        //             float: left;
        //             width: 88px;
        //             height: 26px;
        //             text-align: center;
        //             line-height: 26px;
        //             border: 1px solid #2993f8;
        //             color:#fff;
        //             font-weight: bold;
        //             border-radius: 4px;
        //             background: #2993f8;
        //             font-size: 12px;
        //             cursor: pointer;
        //         }
        //         .btn:nth-child(1) {
        //             margin-right: 20px;
        //             border: 1px solid #d6d6d6;
        //             background:#fff;
        //             color:#2993f8;
        //         }
        //     }
        // }
    }
}
</style>
