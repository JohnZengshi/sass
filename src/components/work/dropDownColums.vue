<template>
    <div class="dropColums-wrap">
        <div class="tltle">
            {{titleData}}
            <i class="iconfont icon-xiala"></i>
        </div>
        <div class="list-box">
            <ul class="list-left">
                <li @click="selLeftItem(item, index)" :class="{active: index == leftIndex}" v-for="(item, index) in propsList">{{item.classesName}}</li>
            </ul>
            <ul class="list-right">
                <li @click="selRightItem(item, index)" :class="{active: index == rightIndex}" v-for="(item, index) in rightList">{{item.classesName}}</li>
            </ul>
            <div class="list-footer">
                <span @click="complate">完成</span>
                <span @click="reset">重置</span>
            </div>
        </div>
    </div>
</template>

<script>
import {seekGetReceiptList} from "./../../Api/commonality/seek"
export default {
    data () {
        return {
            rightList: [],
            leftIndex: null,
            rightIndex: null,
            operateId: ''
        }
    },
    props: [
        'propsList',
        'titleData',
        'dataType'
    ],
    watch: {
        leftIndex () {
            this.rightIndex = ''
        }
    },
    mounted () {
        if (this.dataType == 1) {
            //this.rightList = this.propsList[0].typeList
        } else if (this.dataType == 2) {
            //this.rightList = this.propsList[0].childrenList
        } else if (this.dataType == 3) {
            //this.rightList = this.propsList[0].childrenList
        } else {
            //this.rightList = this.propsList[0].childrenList
        }
    },
    methods: {
        selLeftItem (item, index) {
            console.log(item)
            this.leftIndex = index
            if (this.dataType == 1) {
                this.rightList = item.typeList
                this.operateId = item.classesType
            } else {
                this.rightList = item.childrenList
                this.operateId = item.classesId
            }
        },
        selRightItem (item, index) {
            console.log(item)
            this.rightIndex = index
            this.operateId = item.classesId
        },
        complate () {
            this.$emit('dataBack', {opeId: this.operateId, type: this.dataType})
        },
        reset () {
            this.operateId = ''
            this.leftIndex = null
            this.rightIndex = null
            if (this.dataType == 1) {
                //this.rightList = this.propsList[0].typeList
            } else {
                //this.rightList = this.propsList[0].childrenList
            }
        }
    }
}
</script>
<style scoped lang="scss">
.dropColums-wrap {
    width: 78px;
    height: 28px;
    //border: 1px solid #d6d6d6;
    //border-radius: 4px;
    float: left;
    position: relative;
    margin: 0 4px;
    .tltle {
        width: 100%;
        height: 100%;
        line-height: 26px;
        i {
            position: absolute;
            right: 0;
            top: 0;
            line-height: 28px;
        }
    }
    .list-box {
        width: 200px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        z-index: -1;
        opacity: 0;
        background:#fff;
        overflow: hidden;
        left: -50px;
        top: 40px;
        transition: all .3s ease;
        transform: translateX(45px);
        .list-left {
            height: 260px;
            width: 80px;
            float: left;
            border-right: 1px solid #d6d6d6;
            overflow-y: auto;
            li {
                height: 40px;
                width: 100%;
                line-height: 40px;
                text-align: center;
                border-bottom: 1px solid #f1f2f3;
                cursor: pointer;
            }
            li.active {
                color:#2993f8;
            }
        }
        .list-right {
            height: 260px;
            width: 120px;
            float: left;
            overflow-y: auto;
            li {
                height: 40px;
                width: 100%;
                line-height: 40px;
                text-align: center;
                border-bottom: 1px solid #f1f2f3;
                cursor: pointer
            }
            li.active {
                color:#2993f8;
            }
        }
        .list-footer {
            height: 40px;
            width: 100%;
            background:#f6f7f8;
            float: left;
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
            }
            span:nth-child(1) {
                background:#2993f8;
                color:#fff;
                border-radius: 4px;
            }
        }
    }
}
.dropColums-wrap:hover {
    .list-box {
        z-index: 20;
        opacity: 1;
        top: 30px;
    }
    
}
</style>
