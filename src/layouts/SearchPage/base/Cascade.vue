<template>
    <div class="dropDown-wrap1">
        <span class="title-name" :class="optionData.titleInfo == '' ? '' : 'select'">
            {{optionData.titleInfo == '' ? titleName : optionData.titleInfo}}
            <i class="iconfont icon-arrow-down drop-triangle" v-if="optionData.titleInfo ==''"></i>
            <i class="el-icon-circle-close" title="清除" @click="clearTitleInfo" v-else></i>
        </span>
        <ul class="drop-list">
            <li v-if="item.classesType != '3' ? computedRole : true" @click.stop="changeDigItem(item)" @mouseover="tabData(item, index)" v-for="(item, index) in propList" >
                {{getDataType(dataType, item)}}
                <i class="el-icon-caret-right" v-if="index"></i>
                <ul class="drop-list-right" v-if="index">
                    <li v-for="(it, index) in rightListData" @click.stop="itemClick(it, index, item.classesType)">
                        {{it.repositoryName || it.shopName}}
                    </li>
                </ul>
            </li> 
            
        </ul>
        
    </div>
</template>

<script>
export default {
    props: [
        'titleName',
        'propList',
        'dataType',
        'subclassKey',
        'computedRole'
    ],
    data () {
        return {
            rightListData: '',
            optionData: {
                titleInfo: ''
            },
            returnData: {
                operateId: '',
                operateName: '',
                operateIndex: '',
            }
        }
    },
    methods: {
        tabData (item, index) { // 切换数据
        //console.log(item)
            // if (this.subclassKey) {

            // }typeList
            this.rightListData = item.children
        },
        getDataType (type, item) {
            //console.log(item)
            return item.classesName
        },
        changeDigItem (item) {
            this.optionData.titleInfo = item.classesName
            this.returnData.operateId = ''
            this.returnData.operateName = ''
            this.$emit("dropReturn", {
                item: {},
                type: item.classesType
            })
        },
        itemClick (item, index, classesType) {
            this.returnData.operateIndex = index
            //console.log(item)
            // this.optionData.titleInfo = item.classesName
            // this.returnData.operateId = item.classesId
            // this.returnData.operateName = item.classesName
            if (classesType == '2') {
                this.optionData.titleInfo = item.repositoryName
                this.returnData.operateId = item.repositoryId
                this.returnData.operateName = item.repositoryName
            } else if (classesType == '3') {
                this.optionData.titleInfo = item.shopName
                this.returnData.operateId = item.shopId
                this.returnData.operateName = item.shopName
            }
            this.$emit("dropReturn", {
                item: this.returnData,
                type: classesType
            })
        },
        clearTitleInfo () {
            this.optionData.titleInfo = ''
            this.$emit("clear", this.optionData.titleInfo)
        }
    }
}
</script>
<style scoped>
@-moz-document url-prefix(){
    .drop-list li{
        position: relative;
    }
    .drop-list li i{
        position: absolute;
        top: 0;
        right: 0;
    }
} 
</style>
<style lang="scss" scoped>
.dropDown-wrap1 {
    display: inline-block;
    position: relative;
    cursor: pointer;
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
        background:#e0ecf7;
        color:#3195f5;
        >.drop-list{
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
            // width: 180px;
            color: #3195f5;
            text-align: center;
        }
        .title-name .el-icon-circle-close {
            color:#2993f8;
        }
    }
    .title-name {
        &.select{
            color: #333;
        }
        color:#666;
        display: block;
        text-align: center;
        height: 30px;
        // width: 180px;
        // font-weight: bold;
        font-size: 14px;
        padding:0 8px;
        line-height: 30px;
        background-color: #f6f7f8;
        .drop-triangle {
            font-size:12px;
            float: right;
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
    .drop-list {
        // border: 1px solid red;
        //overflow: hidden;
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
        z-index: 20;
        width: 160px;
        // height: 200px;
        // overflow: hidden;
        // overflow-y: auto;
        li {
            //position: relative;
            text-align: left;
            height: 42px;
            line-height: 42px;
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
            
            i {
                float: right;
                color:#666;
                line-height: 42px;
                margin-right: 10px;
            }
        }
        li:hover {
            background:#f6f7f8;
            
        }
        &>li:hover>.drop-list-right {
            opacity: 1;
            visibility: visible;
        }
    }
    .drop-list-right {
        overflow: hidden;
        opacity: 0;
        height: 200px;
        visibility: hidden;
        transition: all .3s;
        background:#fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        position: absolute;
        letter-spacing: 0;;
        top: 0;
        right: -160px;
        z-index: 20;
        width: 160px;
        max-height: 300px;
        overflow: hidden;
        overflow-y: auto;
        li {
            position: relative;
            text-align: left;
            height: 42px;
            line-height: 42px;
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
