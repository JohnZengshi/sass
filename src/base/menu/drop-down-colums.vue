<template>
    <div class="drop-down-colums-main">
        <div class="tltle" :class="{actions: isChecked}">
            {{titleData}}<i class="iconfont icon-xiala"></i>
        </div>
        <div class="list-box">
            <ul class="list-left" v-if="propsList.length">
                <el-checkbox-group v-if="allName" v-model="allChecked" @change="checkedAll">
                    <li  @mouseover="selLeftItem([], 0)">
                        <el-checkbox :indeterminate="false" :label="'allId'" :class="{active: allName[0]}" style="font-size: 14px;">{{allName}}</el-checkbox>
                    </li>
                </el-checkbox-group>


                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <li @mouseover="selLeftItem(item, index)" v-for="(item, index) in propsList">
                       <el-checkbox :indeterminate="filterIndeterminate(item.childrenList, smallIdList)" :label="item.id" :style="filterStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
                    </li>
                </el-checkbox-group>

            </ul>
            <ul class="list-right">
                <el-checkbox-group v-model="smallIdList" @change="changeSmallId">
                    <li v-for="(item, index) in rightList">
                       <el-checkbox :label="item.id" :style="filterSamllStyle(item.id)" :class="{active: true}" style="font-size: 14px;">{{item.name}}</el-checkbox>
                    </li>
                </el-checkbox-group>  
                <!-- <li @click="selRightItem(item, index)" :class="{active: item.id == operateId}" v-for="(item, index) in rightList">{{item.name}}</li> -->
            </ul>
            <div class="list-footer">
                <span @click="complate">完成</span>
                <span @click="resetData">重置</span>
            </div>
        </div>
    </div>
</template>

<script>
import {seekGetReceiptList} from "Api/commonality/seek"
export default {
    data () {
        return {
            isChecked: false, // 选中
            isAll: '',
            allChecked: [], // 全部选中
            checkedCities: [], // 大类选中
            smallIdList: [], // 小类选中
            rightList: [],
            leftIndex: null,
            rightIndex: null,
            operateId: '',
            // 下拉框收回和打开
            dropDowmopen:false
        }
    },
    props: [
        'propsList',
        'titleData',
        'allName',
        'keyName'
    ],
    watch: {
        checkedCities (newValue, oldValue) {
            // 新增
            if (newValue.length > oldValue.length) {
                for (let i of this.propsList) {
                    if (i.id == newValue.slice(newValue.length - 1, newValue.length)[0]) {
                        for (let j of i.childrenList) {
                            if (!this.smallIdList.includes(j.id)) {
                                this.smallIdList.push(j.id)
                            }
                        }
                    }
                }
            } else if (newValue.length < oldValue.length){ // 删除
                let amendValue = ''
                for (let k of oldValue) {
                    if (!newValue.includes(k)) {
                        amendValue = k
                    }
                }
                for (let i of this.propsList) {
                    if (i.id == amendValue) {
                        for (let j of i.childrenList) {
                            this.smallIdList.forEach((currentValue,index,arr) => {
                                if (currentValue == j.id) {
                                    this.smallIdList.splice(index, index+1)
                                }
                            })
                        }
                    }
                }
            }
        },
        smallIdList (newValue, oldValue) {
            if (newValue.length < oldValue.length) { // 减小了一个值
                for (let i of this.propsList) {
                    for (let j of i.childrenList) {
                        // 删除
                        if (!newValue.includes(j.id)) {
                            this.checkedCities.forEach((currentValue,index,arr) => {
                                if (currentValue == i.id) {
                                    this.checkedCities.splice(index, index+1)
                                    return
                                }
                            })
                            continue
                        }
                    }
                } 
            } else if (newValue.length > oldValue.length) { // 新增一个值
                for (let i of this.propsList) {
                    let isHas = true

                    for (let j of i.childrenList) {
                        // 删除
                        if (!newValue.includes(j.id)) {
                            isHas = false
                        }
                    }

                    if (this.checkedCities.includes(i.id)) {
                        continue
                    } else {
                        if (isHas) {
                           this.checkedCities.push(i.id) 
                        }
                    }
                }

            }
        }
    },
    methods: {
        initData (parm) {
            if (parm) {
                this.smallIdList = parm
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
        filterIndeterminate (current, checkeList) {
            let currentDatas = []
            let currentCheckeList = []

            for (let i of current) {
                currentDatas.push(i.id)
            }

            for (let i of checkeList) {
                if (currentDatas.includes(i)) {
                    currentCheckeList.push(i)
                }
            }

            if (currentDatas.length == currentCheckeList.length) {
                return false
            } else if (currentCheckeList.length) {
                return true
            }

        },
        checkedAll (parm) {
            if (parm.length) {
                for (let i of this.propsList) {
                    if (!this.checkedCities.includes(i.id)) {
                        this.checkedCities.push(i.id)
                    }
                    for (let j of i.childrenList) {
                        
                        if (!this.smallIdList.includes(j.id)) {
                            this.smallIdList.push(j.id)
                        }
                    }
                }
            } else {
                this.checkedCities = []
                this.smallIdList = []
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
            this.$emit('dataBack', {bigList: this.checkedCities, samllList: this.smallIdList, isAll: this.isAll, keyName: this.keyName})
            if (this.checkedCities.length || this.smallIdList.length) {
                this.isChecked = true
            } else {
                this.isChecked = false
            }
        },
        resetData () {
            this.isChecked = false
            this.checkedCities = []
            this.smallIdList = []
            this.allChecked = []
            this.$emit('dataBack', {bigList: this.checkedCities, samllList: this.smallIdList, isAll: this.isAll, keyName: this.keyName})
        },
        reset () {
            this.isChecked = false
            this.checkedCities = []
            this.smallIdList = []
            this.allChecked = []
        }
    }
}
</script>
<style lang="scss">
.drop-down-colums-main{
  .el-checkbox{
    height: 40px!important;
    line-height: 40px!important;
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
<style scoped lang="scss">
.drop-down-colums-main {
    // width: 78px;
    // height: 22px;
    //border: 1px solid #d6d6d6;
    //border-radius: 4px;
    padding: 7px 0;
    float: left;
    position: relative;
    margin: 0 4px;
    .tltle {
        width: 100%;
        height: 100%;
        font-size: 12px;
        font-weight: bold;
        line-height: 12px;
        cursor: pointer;
        color: #666;
        >i {
            line-height: 12px;
            font-size: 12px;
            // position: absolute;
            // right: 0;
            // top: 0;
            // line-height: 28px;
        }
        &.actions{
            color: #2993f8;
        }
    }
    .list-box {
        width: 300px;
        height: 300px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        position: absolute;
        // 下拉框隐藏
        z-index: -1;
        opacity: 0;
        top: 40px;

        background:#fff;
        overflow: hidden;
        left: -120px;
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
    &:hover{
        .list-box {
            z-index: 1000;
            opacity: 1;
            top: 30px;
        }
    }
}
</style>
