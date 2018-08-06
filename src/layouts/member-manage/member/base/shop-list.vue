<!-- 独立店铺 -->
<template>
  <div class="m-m-shop-list-main">
    <div class="header">
      <p class="side-nav"><i class="iconfont icon-liebiao"></i>独立店铺</p>
    </div>
    <div class="m-m-shop-list" v-loading="loading">
      <div class="each-table" :class="{'ml-40': index == 1}" v-for="(items, index) in combinationList">
        <ul class="header-tit">
          <li>店铺名称</li>
          <li>积分模板</li>
          <li>操作</li>
        </ul>
        <div class="scroll-wrap">
          <ul v-for="item in items">
            <li>{{item.shopName}}</li>
            <li>{{item.templateName}}</li>
            <li>
              <i @click="compile" class="iconfont icon-bianji"></i>
            </li>
          </ul>

          <ul class="no-ul" v-if="items.length < 4" v-for="(item, index) in (4 - items.length)">
            <li></li>
            <li></li>
            <li></li>
          </ul>

        </div>
      </div>
    </div>
    <add-group ref="addGroupBox"></add-group>
  </div>
</template>
<script>
  import { seekFindTemplateShopAll } from 'Api/commonality/seek'
  import addGroup from './add-group'
  export default {
    components: {
      addGroup
    },
    data () {
      return {
        loading: false,
        combinationList: []
      }
    },
    created () {
      this._seekFindTemplateShopAll()
    },
    methods: {
      _seekFindTemplateShopAll () {
        this.loading = true
        seekFindTemplateShopAll()
          .then(res => {
            if (res.data.state == 200) {
              let datas = res.data.data.dataList
              this.combinationList = [datas.slice(0, parseInt(datas.length / 2)), datas.slice(parseInt(datas.length / 2), datas.length)]
            } else {
              this.$message({type: 'error',message: res.data.msg})
            }
            this.loading = false
          })
      },
      compile (parm) {
        this.$refs.addGroupBox.open(parm)
      }
    }
  }
</script>
<style lang="scss">
.m-m-shop-list-main{
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
  .header{
    padding: 0 15px;
    height: 50px;
  }
  .m-m-shop-list{
    font-size: 0;
    min-height: 200px;
    margin: 10px 0 0 50px;
    .each-table{
      display: inline-block;
      width: 510px;
      border: 1px solid #dedede;
      border-radius: 5px;
      .scroll-wrap{
        height: 200px;
        overflow-y: scroll;
        >ul{
          border-bottom: 1px solid #f0f2f5;
        }
        >ul:nth-child(2n){
          background-color: #fbfbfb;
        }
      }
      ul{
        font-size: 0;
        min-height: 50px;
        li{
          height: 100%;
          width: 166px;
          font-size: 14px;
          padding: 15px;
          vertical-align: top;
          text-align: center;
          display: inline-block;
          i{
            transition: all .3s;
            cursor: pointer;
            &:hover{
              color: #2993f8;
            } 
          }
        }
        li:nth-child(1){
        }
        li:nth-child(2){
          word-wrap: break-word; 
          word-break: normal; 
        }
      }
      .no-ul{
        height: 50px;
      }
      .header-tit{
        height:50px;
        background-color: #f5f5f5;
        overflow: hidden;
        display: -ms-flexbox;
        display: flex;
        border-bottom: 2px solid #e7e7e7;
      }
    }
    .ml-40{
      margin-left: 40px;
    }
  }
}

</style>