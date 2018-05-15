<template>
    <!-- 数据加载控件 bengin-->
    <div class="loadControl">
        <p><span @click="LoadOptionsDefault">更多未读取数据</span> <a href="javascript:void(0)" @click="isLoadOptions">切换</a></p>
        <ul v-show="isShow" class="LoadOptions" @click="getNewListData($event)">
            <li class="action" data-index="0">加载10条</li>
            <li data-index="1">加载20条</li>
            <li data-index="2">加载100条</li>
            <li data-index="3">全部加载</li>
        </ul>  
    </div>
    <!-- 数据加载控件 end-->
</template>

<style lang="scss" scoped>
.loadControl{
  position: relative;
  background: #fff1d9;
  text-align: center;
  font-size: 14px;
  color:#e99a1d;
  line-height: 22px;
  a{
    color:#b6b2aa;
    text-decoration: underline;
  }
  span{
      cursor: pointer;
  }
  .LoadOptions{
    // display: none;
    position: absolute;
    top: -170px;
    right: 448px;
    width: 140px;
    height: 168px;
    background: #fff;
    z-index: 998;
    li{
      position: relative;
      width: 100%;
      height: 42px;
      line-height: 42px;
      color:#7a7a7a;
      font-size: 14px;
      border: 1px solid #f1f2f3;
      cursor: pointer;
    }
    .action {
      color:#2993f8;
      &::before{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        background: #2993f8;
      }
    }
  }
}
</style>

<script>
export default {
    data () {
        return {
            isShow: false,
            pageSizeNum: 10
        }
    },
    methods: {
        LoadOptionsDefault(){
             // 更换文字
            $('.loadControl span').html('点击继续加载').css('color','#474747')
            this.$emit('LoadOptionsDefault', this.pageSizeNum)
        },
        isLoadOptions(){
            this.isShow = true
        },
        getNewListData(e){
            console.log('啦啦',e.target.dataset.index)
            $('.LoadOptions li').eq(e.target.dataset.index).addClass('action').siblings().removeClass('action')
            // $('.LoadOptions').css('display','none');
            this.isShow = false

            // 页面加载
            switch (e.target.dataset.index) {
            case '0':
                this.pageSizeNum = 10
                break;
            case '1':
                this.pageSizeNum = 20            
                break;
            case '2':
                this.pageSizeNum = 100            
                break;
            case '3':
                this.pageSizeNum = 9999            
                break;
            default:
                break;
            }
        }
    }
};
</script>

