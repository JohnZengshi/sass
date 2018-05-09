<template>
    <div class="aim-wrap">
        <div class="title">
            <img src="./../../../../static/img/piliang.png" />
            <div class="name">跟进目的</div>
        </div>
        <ul class="list">
            <li @click="tabIndex(item, index)" :class="{active: actIndex == index}" v-for="(item, index) in aimList" :key="index">
                {{item.name}}
                <!-- <span v-if="index == 0" class="label">默认</span> -->
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            actIndex: 0,
            aimValue: '1',
            aimList: [
                {
                    name: '日常拜访',
                    value: 1
                },
                {
                    name: '促销执行',
                    value: 2
                },
                {
                    name: '临时拜访',
                    value: 3
                },
                {
                    name: '其他目的',
                    value: 4
                },
                {
                    name: '售后跟进',
                    value: 5
                },
                {
                    name: '生日跟进',
                    value: 6
                },
            ]
        }
    },
    methods: {
        tabIndex (item, index) {
            this.actIndex = index
            this.aimValue = item.value
            this.$emit("closeAim", this.aimValue)
        }
    }
}
</script>

<style lang="scss">
.visitAimDig {
    width: 320px;
    height: 450px;
    background:#fff;
    border-radius: 10px;
    padding: 0 20px;
    .el-dialog__header {
        padding: 0;
        // height: 0;
        width: 280px;
        overflow: hidden;
        position: absolute;
        top: 10px;
        left: 20px;
    }
    .el-dialog__body {
        padding: 0;
    }
    .aim-wrap {
        padding-top: 24px;
        .title {
            width: 66px;
            margin: 0 auto;
            margin-bottom: 30px;
            padding: 0;
            img {
                width: 46px;
                height: 46px;
                margin: 10px 0 10px 10px;
                // margin-bottom: 10px;
            }
            .name {
                width: 100%;
                text-align: center;
                color:#333;
                font-weight: bold;
            }
        }
        .list {
            
            li {
                height: 42px;
                color:#666666;
                line-height: 42px;
                padding-left: 50px;
                cursor: pointer;
                .label {
                    width: 30px;
                    height: 14px;
                    display: inline-block;
                    background:#2993f8;
                    color:#fff;
                    border-radius: 4px;
                    font-size: 12px;
                    text-align: center;
                    line-height: 14px;
                    margin-top: 10px;
                    margin-left: 15px;
                }
            }
            li.active {
                color:#2993f8;
            }
        }
    }
}
</style>
