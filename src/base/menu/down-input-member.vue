<template>
    <div class="dropDown-wrap">
        <span class="title-name" :class="optionData.titleInfo == '' ? '' : 'select'">
            {{titleName}}
            <i class="iconfont icon-arrow-down drop-triangle" v-if="optionData.titleInfo ==''"></i>
            <i v-else-if="isClear == undefined ? true : isClear == true ? true : false" class="el-icon-circle-close" title="清除" @click="clearTitleInfo"></i>
        </span>
        <div class="input-drop-list">
            <h4>注册时间</h4>
            <!-- <div title="件数" class="down-range-box" style="background:url(../../../static/img/batch/number.png) no-repeat 5px center;">
                <input type="text" placeholder="开始时间" v-model="moreChange.startTime">
                <span>-</span>
                <input type="text" placeholder="结束时间" v-model="moreChange.endTime">
            </div> -->
            <div class="report_data">
                    <div class="block until" data-txt="至" style="background:url(../../../static/img/batch/number.png) no-repeat 5px center;">
                        <el-date-picker size="mini" v-model="startTime" @change="getTimeData" type="date" placeholder="选择开始时间"></el-date-picker>
                    </div>
                    <div class="block">
                        <el-date-picker size="mini" v-model="endTime" @change="overTimeDate" type="date" placeholder="选择结束时间"></el-date-picker>
                    </div>
            </div>
            

            <h4>积分范围</h4>
            <div title="积分范围" class="down-range-box" style="background:url(../../../static/img/batch/weight.png) no-repeat 5px center;">
                <input type="text" placeholder="积分值" v-model="moreChange.minScore">
                <span>-</span>
                <input type="text" placeholder="积分值" v-model="moreChange.maxScore">
            </div>
            <h4>交易额范围</h4>
            <div title="交易额范围" class="down-range-box" style="background:url(../../../static/img/batch/price.png) no-repeat 5px center;">
                <input type="text" placeholder="交易额（元）" v-model="moreChange.mixPrice">
                <span>-</span>
                <input type="text" placeholder="交易额（元）" v-model="moreChange.maxPrice">
            </div>
            <div class="list-footer">
                <span @click="complate">完成</span>
                <span @click="reset">重置</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'titleName',
        'isClear'
    ],
    data () {
        return {
            moreChange: {
                startTime: '', // 开始件数
                endTime: '', // 结束件数
                maxScore: '', // 开始件重
                minScore: '', // 结束件重
                maxPrice: '', // 开始售价
                mixPrice: '' // 结束售价
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
            },
            startTime:'',
            endTime:'',
        }
    },
    methods: {
        clearTitleInfo () {
            this.optionData.titleInfo = '';
            //console.log('查看取消类型：'+this.dataType);
            console.log(this.dataType)
            this.$emit("clearInfo", {type: this.dataType})
            this.actIndex = null
        },
        clearTitletext(){
            //只清除掉 第二次选择的  选项，，不再走请求
            this.optionData.titleInfo = '';
            console.log('查看清除类型：'+this.dataType);
            this.$emit("clearTitletext", {type: this.dataType})
            this.actIndex = null
        },
        complate () {
            this.$emit('filterData', this.moreChange)
        },
        getTimeData(val) {
            if(val) {
                let beginTime = val.substr(0, 10).split('-').join("") + "000000"
                this.moreChange.startTime = beginTime
            }
        },
        overTimeDate(val) {
            if(val) {
                let endTime = val.substr(0, 10).split('-').join("") + "235959"
                this.moreChange.endTime = endTime
            }
        },
        reset () {
            this.moreChange.startTime = ''
            this.moreChange.endTime = ''
            this.moreChange.maxScore = ''
            this.moreChange.minScore = ''
            this.moreChange.maxPrice = ''
            this.moreChange.mixPrice = ''
            this.startTime = ''
            this.endTime = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.dropDown-wrap {
    display: inline-block;
    position: relative;
    cursor: pointer;
    border: 1px solid #d6d6d6;
    border-radius: 5px;
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
        >.input-drop-list{
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
        padding: 0 4px;
        &.select{
            //color: #333;
        }
        color:#666;
        text-align: right;
        display: block;
        height: 25px;
        font-size: 14px;
        line-height: 25px;
        .drop-triangle {
            font-size:12px;
            display: inline-block;
            //transform: scale(120%, 120%) !important;
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
        // .el-icon-circle-close:hover {
        //     color:#2993f8;
        // }
    }
    .input-drop-list {
        overflow: hidden;
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
        width: 350px;
        // padding: 20px 30px;
        overflow: hidden;
        // overflow-y: auto;
        >h4{
            margin: 15px 30px 15px 30px;
            font-weight: normal;
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
        margin-top: 24px;
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

<style lang="scss">
.input-drop-list {
    .report_data {
        float: none;
        width: 290px;
        margin-left: 28px;
    }
}
</style>
