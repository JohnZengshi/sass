<template>
    <li class="dropDown-wrap">
        <span class="title-name" @click="complate" :class="optionData.titleInfo == '' ? '' : 'select'">
            {{titleName}}
<!--             <i class="iconfont icon-arrow-down drop-triangle" v-if="optionData.titleInfo ==''"></i> -->
           <!--  <i v-if="isClear == undefined ? true : isClear == true ? true : false" class="el-icon-circle-close" title="清除" @click="clearTitleInfo"></i> -->
        </span>
        <div class="select-drop-list">
            <div class="select-drop-list-inner">
                <div class="list-wrap">
                    <ul class="header-tit">
                        <li></li>
                        <li>成色名称</li>
                        <li>宝石名称</li>
                        <li>首饰类别</li>
                    </ul>
                    <ul>
                        <li>计重类</li>
                        <li>
                            <!-- 成色名称-计重 -->
                            <new-down-menu
                                :titleInfo="filterData.wColorId.name"
                                :keyName="'wColorId'"
                                :showList="dialogOptions.conditionList"
                                @changeData="changeClass"
                            ></new-down-menu>
                        </li>
                        <li>
                            <!-- 宝石名称-计重 -->
                            <new-down-menu
                                :titleInfo="filterData.wGemId.name"
                                :keyName="'wGemId'"
                                :showList="dialogOptions.conditionList"
                                @changeData="changeClass"
                            ></new-down-menu>
                        </li>
                        <li>
                            <!-- 首饰类别-计重 -->
                            <new-down-menu
                                :titleInfo="filterData.wJewelryId.name"
                                :keyName="'wJewelryId'"
                                :showList="dialogOptions.jewelryList"
                                @changeData="changeClass"
                            ></new-down-menu>
                        </li>
                    </ul>
                    <ul>
                        <li>计件类</li>
                        <li>
                            <!-- 成色名称-计件 -->
                            <new-down-menu
                                :titleInfo="filterData.nColorId.name"
                                :keyName="'nColorId'"
                                :showList="dialogOptions.conditionList"
                                @changeData="changeClass"
                            ></new-down-menu>
                        </li>
                        <li>
                            <!-- 宝石名称-计件 -->
                            <new-down-menu
                                :titleInfo="filterData.nGemId.name"
                                :keyName="'nGemId'"
                                :showList="dialogOptions.conditionList"
                                @changeData="changeClass"
                            ></new-down-menu>
                        </li>
                        <li>
                            <!-- 首饰类别-计件 -->
                            <new-down-menu
                                :titleInfo="filterData.nJewelryId.name"
                                :keyName="'nJewelryId'"
                                :showList="dialogOptions.jewelryList"
                                @changeData="changeClass"
                            ></new-down-menu>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list-footer">
                <span @click="complate">完成</span>
                <span @click="reset">重置</span>
            </div>
        </div>
    </li>
</template>

<script>
import newDownMenu from 'base/menu/no-border-down-menu'
export default {
    components: {
        newDownMenu
    },
    props: [
        'titleName',
        'isClear'
    ],
    data () {
        return {
            filterData: {
                wColorId: {
                    name: '不选',
                    id: '',
                },
                wGemId: {
                    name: '不选',
                    id: '',
                },
                wJewelryId: {
                    name: '大类',
                    id: '1',
                },
                nColorId: {
                    name: '不选',
                    id: '',
                },
                nGemId: {
                    name: '不选',
                    id: '',
                },
                nJewelryId: {
                    name: '大类',
                    id: '1',
                }
            },
            specialStyle: {
                'overflowX': 'auto', 
                'border': 'none',
                'width': 'auto'
            },
            dialogOptions: {
              conditionList: [
                {
                    name: '不选',
                    id: '',
                },
                {
                    name: '大类',
                    id: '1',
                },
                {
                    name: '小类',
                    id: '2',
                }
              ],
              jewelryList: [
                {
                    name: '大类',
                    id: '1',
                },
                {
                    name: '小类',
                    id: '2',
                }
              ]
            },
            moreChange: {
                beginNum: '', // 开始件数
                endNum: '', // 结束件数
                beginWeight: '', // 开始件重
                endWeight: '', // 结束件重
                beginPrice: '', // 开始售价
                endPrice: '' // 结束售价
            },
            actIndex: null,
            optionData: {
                titleInfo: ''
            },
            returnData: {
                operateId: '',
                operateName: '',
                operateIndex: '',
            },
            customDiaData: {
                type: '',
                value: ''
            }
        }
    },
    methods: {
        changeClass (parm) {
            this.filterData[parm.keyName] = parm.item
        },
        clearTitleInfo () {
            this.optionData.titleInfo = '';
            this.$emit("clearInfo", {type: this.dataType})
            this.actIndex = null
        },
        clearTitletext(){
            this.optionData.titleInfo = '';
            this.$emit("clearTitletext", {type: this.dataType})
            this.actIndex = null
        },
        complate () {
            this.$emit('complate', this.filterData)
        },
        reset () {
            this.filterData = {
                wColorId: {
                    name: '不选',
                    id: '',
                },
                wGemId: {
                    name: '不选',
                    id: '',
                },
                wJewelryId: {
                    name: '大类',
                    id: '1',
                },
                nColorId: {
                    name: '不选',
                    id: '',
                },
                nGemId: {
                    name: '不选',
                    id: '',
                },
                nJewelryId: {
                    name: '大类',
                    id: '1',
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.dropDown-wrap {
    &:after{
        content:'';
        border: 6px solid transparent;
        //border-bottom-color: #fff;
        width: 0;
        height: 0;
        position: absolute;
        top: 38px;
        right:0px;
        z-index: 102;
        transition: all .3s;
        margin-left: -3px;
    }
    &:hover{
        // background:#e0ecf7;
        // color:#3195f5;
        >.select-drop-list{
            opacity: 1;
            visibility: visible;
            top:30px;
        }
        &:after{
            top: 18px;
            border-bottom-color: #fff;
        }
        >.title-name .drop-triangle {
            transform: rotate(180deg);
            //color:#2993f8;
        }
        >.title-name {
            color:#3195f5;
        }
        .title-name .el-icon-circle-close {
            color:#2993f8;
        }
    }
    .title-name {
        text-align: right;
        display: block;
        .drop-triangle {
            font-size:12px;
            display: inline-block;
            transition: all .3s;
            transform-origin: center center;
        }
        .el-icon-circle-close {
            position: absolute;
            top: -4px;
            right: -4px;
            font-size:10px;
            color:#ccc;
            cursor: pointer;
        }
    }
    .select-drop-list {
        opacity: 0;
        visibility: hidden;
        transition: all .3s;
        background:#fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        position: absolute;
        letter-spacing: 0;;
        top: 50px;
        right: -20px;
        z-index: 101;
        height: 300px;
        width: 375px;
        // padding: 20px 30px;
        // overflow-y: auto;
        .select-drop-list-inner{
            height: 260px;
            .list-wrap {
                padding-top: 30px;
                width: 100%;
                height: 180px;
                &>ul {
                    width:100%;
                    height: 60px;
                    &>li {
                        width: 93px;
                        float: left;
                        height: 100%;
                        font-size: 12px;
                        text-align: center;
                    }
                    &>li:nth-child(1) {
                        font-weight: bold;
                        padding-top: 5px;
                        color:#2993f8;
                    }
                    // td:nth-child(1) {
                    //     width: 96px;
                    // }
                }
                &>ul:nth-child(1) {
                    li {
                        font-weight: bold;
                        color:#999999;
                    }
                }
            }



        }
    }

    .down-range-box {
        height: 28px;
        width: 290px;
        border-radius: 4px;
        padding-left: 26px;
        margin: 15px 30px 15px 30px;
        overflow: hidden;
        border: 1px solid #d6d6d6;
        input {
            width: 124px;
            height: 100%;
            float: left;
            text-align: center;
        }
        span {
            float: left;
            margin: 0 4px;
            line-height: 26px;
        }
    }

    .list-footer {
        height: 40px;
        width: 100%;
        background:#f6f7f8;
        span {
            margin-top: 7px;
            font-size: 14px;
            display: block;
            width: 60px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            float: right;
            margin-right: 12px;
            cursor: pointer;
        }
        span:nth-child(2) {
            color:#999999;
            float: left;
        }
        span:nth-child(1) {
            background:#2993f8;
            color:#fff;
            border-radius: 4px;
        }
    }
}

</style>
