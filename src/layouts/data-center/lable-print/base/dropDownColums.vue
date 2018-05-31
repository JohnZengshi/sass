<template>
    <div class="dropColums-wrap">
        <div class="tltle">
            {{titleData}}
            <i class="iconfont icon-xiala"></i>
        </div>
        <div class="list-box">
            <ul class="list-left">
                
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <li @mouseover="selLeftItem(item, index)" :class="{active: index == leftIndex}" v-for="(item, index) in propsList">
                       <el-checkbox :label="item.classesType" :style="filterStyle(item.classesType)" :class="{active: true}" style="font-size: 14px;">{{item.classesName}}</el-checkbox>
                    </li>
                </el-checkbox-group>

            </ul>
            <ul class="list-right">
                <el-checkbox-group v-model="smallIdList" @change="changeSmallId">
                    <li v-for="(item, index) in rightList">
                       <el-checkbox :label="item.classesId" :style="filterSamllStyle(item.classesId)" :class="{active: true}" style="font-size: 14px;">{{item.classesName}}</el-checkbox>
                    </li>
                </el-checkbox-group>  
                <!-- <li @click="selRightItem(item, index)" :class="{active: item.classesId == operateId}" v-for="(item, index) in rightList">{{item.classesName}}</li> -->
            </ul>
            <div class="list-footer">
                <span @click="complate">完成</span>
                <span @click="reset">重置</span>
            </div>
        </div>
    </div>
</template>

<script>
import {seekGetReceiptList} from "Api/commonality/seek"
export default {
    data () {
        return {
            checkedCities: [], // 大类选中
            smallIdList: [], // 小类选中
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
    watch: {
        checkedCities (newValue, oldValue) {
            // 新增
            if (newValue.length > oldValue.length) {
                for (let i of this.propsList) {
                    if (i.classesType == newValue.slice(newValue.length - 1, newValue.length)[0]) {
                        for (let j of i.typeList) {
                            if (!this.smallIdList.includes(j.classesId)) {
                                this.smallIdList.push(j.classesId)
                            }
                        }
                    }
                }
            } else if (newValue.length < oldValue.length){ // 删除
                for (let i of this.propsList) {
                    console.log('玄幻值', i)
                    if (i.classesType == oldValue.slice(oldValue.length -1, oldValue.length)[0]) {
                        console.log('进来值', i.classesType, oldValue.slice(oldValue.length -1, oldValue.length)[0])
                        for (let j of i.typeList) {
                            this.smallIdList.forEach((currentValue,index,arr) => {
                                if (currentValue == j.classesId) {
                                    this.smallIdList.splice(index, index+1)
                                }
                            })
                        }
                    }
                }
            }
            // else { // 删除
            //     for (let i of this.propsList) {
            //         if (i.classesType == oldValue.splice(newValue.length, newValue.length + 1)) {
            //             for (let j of i.typeList) {
            //                 let newData = this.smallIdList.filter((currentValue,index,arr) => {
            //                     return currentValue != j.classesId
            //                 })
            //                 this.smallIdList = newData
            //             }
            //         }
            //     }
            // }
        }
    },
    methods: {
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
        handleCheckedCitiesChange (parm) {
            console.log('选择的大类', parm)
        },
        changeSmallId (parm) {
            console.log('选择小类', parm)
        },
        selLeftItem (item, index) {
            if (this.dataType == 1) {
                this.rightList = item.typeList
            } else {
                this.rightList = item.childrenList
            }
        },
        selRightItem (item, index) {
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
<style lang="scss">
.dropColums-wrap{
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
        font-size: 14px;
        line-height: 26px;
        i {
            position: absolute;
            right: 0;
            top: 0;
            line-height: 28px;
        }
    }
    .list-box {
        width: 300px;
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
                height: 40px;
                width: 100%;
                line-height: 40px;
                font-size: 14px;
                padding-left: 14px;
                text-align: left;
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
.list-box:hover {
    z-index: 20;
    opacity: 1;
    top: 30px;
}
</style>
