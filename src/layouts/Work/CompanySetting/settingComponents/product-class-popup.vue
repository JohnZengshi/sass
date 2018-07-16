<template>
    <div class="product-class-popup-mian">
        <div class="title">
            <img src="~static/img/piliang.png">
            <div>编辑</div>
        </div>
        <div class="ope-body">

            <div class="input-block-left">

                <div class="input-block-title">
                    <i></i>
                    <span>修改的内容</span>
                </div>
                <div class="body1-wrap" v-if="type == 3">
                    <input :maxlength="maxlength ? maxlength : ''" v-model="addTypeText" type="text" placeholder="输入名称">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in option"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <input :maxlength="maxlength ? maxlength : ''" v-else type="text" v-model="operateName">

                <div class="input-block-title">
                    <i></i>
                    <span>成品备注</span>
                </div>
                <div class="body1-wrap" v-if="type == 3">
                    <input :maxlength="maxlength ? maxlength : ''" v-model="addTypeText" type="text" placeholder="输入名称">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in option"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div v-else class="textarea-wrap">
                    <textarea maxlength="50" type="text" v-model="finishedName"></textarea>
                    <span>{{finishedName.length}}/50</span>
                </div>

                <div class="input-block-title">
                    <i></i>
                    <span>旧料备注</span>
                </div>
                <div class="body1-wrap" v-if="type == 3">
                    <input :maxlength="maxlength ? maxlength : ''" v-model="addTypeText" type="text" placeholder="输入名称">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in option"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div v-else class="textarea-wrap">
                    <textarea maxlength="50" type="text" v-model="oldName"></textarea>
                    <span>{{oldName.length}}/50</span>
                </div>

            </div>

            <div id="chart-div" class="product-class-chart" ref="refsEcharts"></div>

            <ul class="p-c-btn-list">

                <li v-if="isMerge == 1 && type == 2 && bigClass == false && isAllowMerge|| isMerge == 1 && type == 3 && bigClass == false && isAllowMerge|| isMerge == 1 && type == 5 && bigClass == false && isAllowMerge"  @click="openMargePopup">
                    数据合并
                </li>

                <li @click="closeDialog">
                    保存
                </li>

                <li @click="delGoods">
                    删除
                </li>

            </ul>
            <!-- <div class="btn-block">
                <div v-if="type == '1'" class="radio1"><el-radio v-model="radio" label="1">设为默认仓库</el-radio></div>
                <div class="ok-btn" @click="closeDialog">确定</div>
                <div @click="openMargePopup" class="marge" v-if="isMerge == 1 && type == 2 && bigClass == false && isAllowMerge|| isMerge == 1 && type == 3 && bigClass == false && isAllowMerge|| isMerge == 1 && type == 5 && bigClass == false && isAllowMerge">数据合并</div>
            </div>
            <div class="del-btn" @click="delGoods"></div> -->
        </div>
    </div>
</template>
<script>
import Echarts from 'echarts';
import {seekStockData} from './../../../../Api/commonality/seek'
export default {
    data () {
        return {
            finishedName: '',
            oldName: '',
            radio: false,
            operateName: '',
            operateId: '',
            value: '',
            addTypeText: '',
            stockData1: [], // 库存数据
            isAllowMerge: true
        }
    },
    props: [
        'item',
        'type',
        'option',
        'stockType',
        'isMerge',
        'isDefault', // 是否默认
        'bigClass',
        'maxlength'
    ],
    watch: {
        'item': function (newVal) {
            this.operateName = newVal.repositoryName || newVal.classesName
            this.operateId = newVal.repositoryId || newVal.classesId
            this.addTypeText = newVal.pName
            this.value = newVal.subName
            this.stockData()
            // console.log(11111)
            // console.log(this.item)
        },
        'isDefault': function (newVal) {
            if (newVal == 'Y') {
                this.radio = '1'
            } else {
                this.radio = false
            }
        },
        'option': function (newVal) {
        }

    },
    created () {

    },
    mounted () {
        let self = this
        setTimeout(() => {
            //console.log(222)
            self.stockData()
        }, 10)
        this.operateName = this.item.repositoryName || this.item.classesName
        this.operateId = this.item.repositoryId || this.item.classesId
        this.addTypeText = this.item.pName
        this.value = this.item.subName
        console.log(this.item)
        // eventBus.$on("updateData", function (val) {
        //     self.operateName = val.repositoryName || val.classesName
        //     self.operateId = val.repositoryId || val.classesId
        //     self.addTypeText = val.pName
        //     self.value = val.subName
        //     self.stockData()
        //     console.log(333)
        // })
    },
    methods: {
        openMargePopup () {
            this.$emit("messageBack", {
                type: 10,
                status: false,
                operateName: this.operateName,
                operateId: this.operateId,
                pName: this.item.pName == undefined ? '' : this.item.pName,
                subName: this.item.subName == undefined ? '' : this.item.subName
                })
            eventBus.$emit("updatalist", 1)
        },
        echartInit (myChart) {
            
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}"
                },
                title: {
                    text: Number(this.stockData1.finishNum) + Number(this.stockData1.oldNum),
                    subtext: '件',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontSize: 16,
                        color: '#333',
                        fontWeight:'bold'
                    }
                },
                series: [{
                    name: '商品',
                    type: 'pie',
                    radius: ['55%', '70%'],
                    label: {
                        normal: {
                            // position: 'center',
                            show: true,
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 10,
                            length2: 6
                        }
                    },
                    data: [{
                        value: this.stockData1.finishNum,
                        name: '成品',
                        label: {
                            normal: {
                                formatter: '{b}',
                                textStyle: {
                                    fontSize: 16,
                                    color: '#2b4fd5'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(43, 77, 210, 1)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(53, 25, 108, 1)'
                                }]),
                                borderColor: 'rgba(255,255,255,1)',
                            },
                        },
                    },{
                        value: this.stockData1.oldNum,
                        name: '旧料',
                        label: {
                            normal: {
                                formatter: '{b}',
                                textStyle: {
                                    fontSize: 16,
                                    color: '#ff8d43'
                                }
                            }
                        },

                        itemStyle: {
                            normal: {
                                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255, 200, 88, 1)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(255, 144, 68, 1)'
                                }]),
                                borderColor: 'rgba(255,255,255,1)',

                            },
                        },
                        //hoverAnimation: false
                    }]
                }]
            };
            myChart.setOption(option);
        },
        stockData (myChart, option) {
            let options = {
                dataList: [
                    {
                        type: this.stockType,
                        id: this.item.repositoryId || this.item.classesId
                    }
                ]
            }
            if (!this.stockType) {
                return
            }
            //console.log(options)
            seekStockData(options).then((res) => {
                console.log(res)
                this.stockData1 = res.data.data.dataList[0]
                //console.log(this.stockData1)
                if (res.data.data.dataList[0].finishNum == 0 && res.data.data.dataList[0].oldNum == 0) {
                    this.isAllowMerge = false
                } else {
                    this.isAllowMerge = true
                }
                var myChart
                if (myChart != null && myChart != "" && myChart != undefined) {
                    myChart.dispose()
                }
                myChart = Echarts.init(this.$refs.refsEcharts)
                this.echartInit(myChart)
            }, (res) => {
                console.log(res)
            })
        },
        delGoods () { // 删除小类
            this.$emit('delAction', {item:this.item, type: this.type})
        },
        closeDialog () {
            if (this.addTypeText == undefined) {
                console.log("undefined啦~")
            } else {
                if (this.value == '无') {
                    this.value = ''
                } else if (this.addTypeText == '' && this.value == '') {

                } else {
                    this.operateName = this.addTypeText + this.value + ""
                }
            }
            //console.log(this.operateName)
            if (this.operateName == '' && this.addTypeText == undefined && this.value == undefined) {
                this.$store.dispatch('workPopupError', '参数不可为空')
            } else {
                this.$emit("messageBack", {type: this.type, status: false, pName: this.addTypeText, subName: this.value, operateName: this.operateName, operateId: this.operateId, radio: this.radio})
                this.operateName = ''
                this.addTypeText = '' 
                this.radio = false
                this.value = ''
            }
            //eventBus.$emit("closeBigPopup", {type: this.type, status: false, operateName: this.operateName, operateId: this.operateId})
            
        }
    }
}
</script>
<style src="./../dialogSetting.scss"></style>
<style lang="scss" scoped>
.product-class-popup-mian {
    width: 100%;
    // height: 100%;
    position: absolute;
    top: 41px;
    left: 0;
    bottom: 0;
}
</style>
