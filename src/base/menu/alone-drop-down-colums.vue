<template>
    <div class="alone-drop-down-colums-main">
        <div class="tltle" :class="{actions: isChecked}">
            {{titleData}}
            <i class="iconfont icon-xiala"></i>
        </div>
        <div class="list-box">
            <ul class="list-left">
                <el-checkbox-group v-if="allName" v-model="allChecked" @change="checkedAll">
                    <li  @mouseover="selLeftItem([], 0)">
                        <el-checkbox :indeterminate="filterState" :label="'allId'" :class="{active: allName[0]}" style="font-size: 14px;">{{allName}}</el-checkbox>
                    </li>
                </el-checkbox-group>


                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <li @mouseover="selLeftItem(item, index)" v-for="(item, index) in propsList">
                       <el-checkbox :indeterminate="false" :label="item.id" :style="filterStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
                    </li>
                </el-checkbox-group>

            </ul>
            <div class="list-footer">
                <span @click="complate">完成</span>
                <span @click="reset('Y')">重置</span>
            </div>
        </div>
    </div>
</template>

<script>
import {seekGetReceiptList} from "Api/commonality/seek"
export default {
    data () {
        return {
            isAll: '',
            allChecked: [], // 全部选中
            checkedCities: [], // 大类选中
            smallIdList: [], // 小类选中
            rightList: [],
            leftIndex: null,
            rightIndex: null,
            operateId: '',
            isChecked: false
        }
    },
    props: [
        'propsList',
        'titleData',
        'allName'
    ],
    computed: {
        filterState () {
            if (this.checkedCities.length ?  this.checkedCities.length > this.propsList.length : false) {

            }
        }
    },
    methods: {
        initData (parm) { // 初始化数据
            if (parm) {
                this.checkedCities = parm
                if (parm.length) {
                    this.isChecked = true
                }       
            }
        },
        filterStyle (parm) {
            let datas = ''
            if (this.checkedCities.includes(parm)) {
                datas = {
                    color: '#2993f8'
                }
            }
            return datas
        },
        filterSamllStyle (parm) {
            this.smallIdList.includes(parm)
        },
        checkedAll (parm) {
            if (parm.length) {
                for (let i of this.propsList) {
                    if (!this.checkedCities.includes(i.id)) {
                        this.checkedCities.push(i.id)
                    }
                }
            } else {
                this.checkedCities = []
            }
        },
        handleCheckedCitiesChange (parm) {
        },
        changeSmallId (parm) {
        },
        selLeftItem (item, index) {
            this.rightList = item.childrenList
        },
        selRightItem (item, index) {
            this.rightIndex = index
            this.operateId = item.id
        },
        complate () {
            this.$emit('dataBack', {bigList: this.checkedCities, samllList: this.smallIdList, isAll: this.isAll})
            if (this.checkedCities.length || this.smallIdList.length) {
                this.isChecked = true
            } else {
                this.isChecked = false
            }
        },
        reset (parm) {
            this.checkedCities = []
            this.allChecked = []
            this.isChecked = false
            if (parm == 'Y') {
                this.$emit('dataBack', {bigList: this.checkedCities, samllList: this.smallIdList, isAll: this.isAll})
            }
        }
    }
}
</script>
<style lang="scss">
.alone-drop-down-colums-main{
  .el-checkbox{
    height: 20px!important;
    line-height: 20px!important;
  }
  .el-checkbox-group .el-checkbox__inner{
    border-radius: 5px!important;
  }
  .el-checkbox-group {
    .el-checkbox__label{
        font-size: 14px!important;
        font-weight: normal;
    }
  }
}
</style>
<style lang="scss">
// .checkbox-font {
//     width: 30px;
//     .el-checkbox__input{
//         border-radius: 4px;
//         height: 20px;
//         width: 20px;
//         .el-checkbox__inner{
//             border-radius: 4px;
//         }
        
//     }
//     .el-checkbox__input.is-checked {
//         background-color: #2993f8 !important;
//         border-color: #2993f8 !important;
//         .el-checkbox__inner{
//             background-color: #2993f8 !important;
//             border-color: #2993f8 !important;
//         }
//     }
// }
</style>
<style scoped lang="scss">
.alone-drop-down-colums-main {
    width: 68px;
    height: 28px;
    //border: 1px solid #d6d6d6;
    //border-radius: 4px;
    float: left;
    position: relative;
    margin: 0 4px;
    .tltle {
        width: 100%;
        height: 100%;
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        line-height: 27px;
        cursor: pointer;
        color: #666;
        i {
            position: absolute;
            right: 0;
            top: 0;
            line-height: 28px;
        }
        &.actions{
            color: #2993f8;
        }
    }
    .list-box {
        width: 150px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        z-index: -1;
        opacity: 0;
        background:#fff;
        overflow: hidden;
        left: -40px;
        top: 40px;
        transition: all .3s ease;
        .list-left {
            height: 260px;
            width: 150px;
            float: left;
            border-right: 1px solid #d6d6d6;
            overflow-y: auto;
            li {
                height: 40px;
                width: 100%;
                line-height: 40px;
                text-align: left;
                padding-left: 14px;
                font-size: 14px;
                border-bottom: 1px solid #f1f2f3;
                cursor: pointer;
                &:hover{
                    background:#f6f7f8;
                    color:#3195f5;
                }
            }
            li.active {
                color:#2993f8;
            }
        }
        .list-right {
            height: 260px;
            width: 150px;
            float: left;
            overflow-y: auto;
            li {
                // height: 40px;
                // width: 100%;
                // line-height: 40px;
                // font-size: 14px;
                // padding-left: 14px;
                // text-align: left;
                // border-bottom: 1px solid #f1f2f3;
                // cursor: pointer
                height: 40px;
                width: 100%;
                line-height: 40px;
                text-align: left;
                padding-left: 14px;
                font-size: 14px;
                border-bottom: 1px solid #f1f2f3;
                cursor: pointer;
                &:hover{
                    background:#f6f7f8;
                    color:#3195f5;
                }
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
                float: left;
            }
            span:nth-child(1) {
                background:#2993f8;
                color:#fff;
                border-radius: 4px;
            }
        }
    }
}
.alone-drop-down-colums-main:hover {
    .list-box {
        z-index: 20;
        opacity: 1;
        top: 30px;
    }
    
}
.list-box:hover {
    z-index: 20;
    opacity: 1;
    top: 30px;
}
</style>
