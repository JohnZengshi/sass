<template>
    <div class="dropDown-wrap">
        <span class="title-name" :class="optionData.titleInfo == '' ? '' : 'select'">
            {{optionData.titleInfo == '' ? titleName : optionData.titleInfo}}
            <i class="iconfont icon-arrow-down drop-triangle"></i>
            <!-- <i class="el-icon-circle-close" title="清除" @click="clearTitleInfo" v-else></i> -->
        </span>
        <ul class="drop-list">
            <li v-for="(item, index) in propList" @click.stop="itemClick(item, index)">{{getDataType(dataType, item)}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: [
        'titleName',
        'propList',
        'dataType',
        'dataDataType',
        'resetFlag'
    ],
    data () {
        return {
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
    watch: {
        resetFlag (val) {
            // console.log(333)
            if (val == true) {
                // console.log(111)
                this.optionData.titleInfo = ''
            }
        }
    },
    methods: {
        getDataType (type, item) {
            switch (this.dataType) {
                case 'customDia':
                    return item
            }
        },
        itemClick (item, index) {
            this.returnData.operateIndex = index
            switch (this.dataType) {
                case 'customDia':
                    this.optionData.titleInfo = item
                    if (this.dataDataType == '成色名称-计重') {
                        this.customDiaData.type = 1
                        switch (item) {
                            case '不选':
                                this.customDiaData.value = ''
                            break;
                            case '大类':
                                this.customDiaData.value = 1
                            break;
                            case '小类':
                                this.customDiaData.value = 2
                            break;
                        }
                    } else if (this.dataDataType == '宝石名称-计重') {
                        this.customDiaData.type = 2
                        switch (item) {
                            case '不选':
                                this.customDiaData.value = ''
                            break;
                            case '大类':
                                this.customDiaData.value = 1
                            break;
                            case '小类':
                                this.customDiaData.value = 2
                            break;
                        }
                    } else if (this.dataDataType == '首饰类别-计重') {
                        this.customDiaData.type = 3
                        switch (item) {
                            case '大类':
                                this.customDiaData.value = 1
                            break;
                            case '小类':
                                this.customDiaData.value = 2
                            break;
                        }
                    } else if (this.dataDataType == '成色名称-计件') {
                        this.customDiaData.type = 4
                        switch (item) {
                            case '不选':
                                this.customDiaData.value = ''
                            break;
                            case '大类':
                                this.customDiaData.value = 1
                            break;
                            case '小类':
                                this.customDiaData.value = 2
                            break;
                        }
                    } else if (this.dataDataType == '宝石名称-计件') {
                        this.customDiaData.type = 5
                        switch (item) {
                            case '不选':
                                this.customDiaData.value = ''
                            break;
                            case '大类':
                                this.customDiaData.value = 1
                            break;
                            case '小类':
                                this.customDiaData.value = 2
                            break;
                        }
                    } else if (this.dataDataType == '首饰类别-计件') {
                        this.customDiaData.type = 6
                        switch (item) {
                            case '大类':
                                this.customDiaData.value = 1
                            break;
                            case '小类':
                                this.customDiaData.value = 2
                            break;
                        }
                    }
                    this.$emit('infoBack', {type: this.customDiaData.type, value: this.customDiaData.value})
                    break;

            }
            this.$emit("dropReturn", {item: this.returnData, type: this.dataType})
        },
    }
}
</script>

<style lang="scss" scoped>
.dropDown-wrap {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 20px;
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
        >ul{
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
    }
    .title-name {
        &.select{
            color: #333;
        }
        color:#666;
        text-align: right;
        display: block;
        height: 20px;
        font-weight: bold;
        font-size: 14px;
        //line-height: 30px;
        .drop-triangle {
            font-size:12px;
            display: inline-block;
            //transform: scale(120%, 120%) !important;
            transition: all .3s;
            transform-origin: center center;
        }
        .el-icon-circle-close {
            font-size:10px;
            color:#ccc;
            cursor: pointer;
        }
        .el-icon-circle-close:hover {
            color:#2993f8;
        }
    }
    .drop-list {
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
        max-height: 300px;
        overflow: hidden;
        overflow-y: auto;
        li {
            text-align: left;
            height: 42px;
            line-height: 42px;
            width: 130px;
            font-size: 13px;
            color:#333;
            white-space: nowrap;
            box-sizing: border-box;
            padding-left: 10px;
            border-bottom: 1px solid #f1f2f3;
            border-left: 4px solid transparent;
            cursor: pointer;
            &.active{
                color: #2993f8;
                border-left-color: #2993f8;
            }
        }
        li:hover {
            background:#f6f7f8;
        }
    }
}

</style>
