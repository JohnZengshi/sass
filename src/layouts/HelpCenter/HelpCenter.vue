<template>
    <div class="wrap">
        <div class="title">
            <i class="iconfont icon-bangzhuzhongxin"></i>
            帮助中心
        </div>
        <div class="body">
            <div class="body-title">
                <i class="iconfont icon-liebiao"></i>
                <span @click="pageNum = true">使用帮助</span>
            </div>
            <div class="masonry" v-if="pageNum">
                <div class="column">
                    <div class="item" style="height: 434px">
                        <div class="item-title">
                            <img src="">
                            <div class="font">注册的问题</div>
                        </div>
                        <ul class="item-list">
                            <li @click="goDetail"><span>●</span>如何创建/加入公司？</li>
                            <li><span>●</span>如何创建/加入公司？</li>
                            <li><span>●</span>如何创建/加入公司？</li>
                        </ul>
                    </div>
                    <div class="item" style="height: 378px">
                    </div>
                    <div class="item" style="height: 378px">
                    </div>
                    <div class="item" style="height: 378px">
                    </div>
                    <div class="item" style="height: 378px">
                    </div>
                    <div class="item" style="height: 378px">
                    </div>
                    <div class="item" style="height: 378px">
                    </div>
                </div>
            </div>
            <div v-else class="que-main">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            pageNum: true
        }
    },
    methods: {
        goDetail () {
            this.pageNum = false
        }
    }
}
</script>

<style scoped lang="scss">
.wrap {
    width: 1270px;
    height: 974px;
    margin: 0 auto;
   .title {
       width: 1250px;
       margin: 0 auto;
       height: 40px;
       line-height: 40px;
       margin-bottom: 20px;
   }
   .body {
       width: 1250px;
       height: 718px;
       margin: 0 auto;
       background:#fff;
       border-radius: 10px;
       box-shadow: 0 0 15px rgba(0,0,0,0.1);
       .body-title {
           height: 50px;
           line-height: 50px;
           padding: 0 24px;
           i {
               color:#2993f8;
           }
       }
       .masonry {
            width: 1250px;
            padding: 0 57px;
            height: 668px; 
            overflow-y: auto;
           .column {
               column-count: 3;
                column-gap: 0;
                counter-reset: item-counter;        
                width: 1250px;
                min-height:100px; 
                padding: 10px;
               .item {
                   width:287px;
                   break-inside: avoid;
                    box-sizing: border-box;
                   border: 1px solid #d6d6d6;
                   border-radius: 10px;
                   background:#fff;
                   transition: .2s ease all;
                   margin-bottom: 34px;
                   .item-title {
                       height: 95px;
                       width: 100%;
                       img {

                       }
                       .font {
                           text-align: center;
                           color:#2993f8;
                       }
                   }
                   .item-list {
                       width: 100%;
                       padding:0 27px;
                       li {
                           height: 54px;
                           line-height: 54px;
                           border-bottom: 1px solid #d6d6d6;
                           font-size: 14px;
                           font-weight: bold;
                           color:#333;
                       }
                       li:hover {
                           color:#2993f8;
                           cursor: pointer;
                       }
                   }
               }
               .item:hover {
                   box-shadow: 10px 20px 30px 5px rgba(0,0,0,0.1);
               }
           }
       }
       .que-main {
           width: 1250px;
           padding: 0 57px;
           height: 668px;
           overflow-y: auto;
           background:#fff;
       }
   }
}
</style>
