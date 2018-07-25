<!-- 独立店铺 -->
<template>
  <div class="m-m-each-other-main">
    <div class="header">
      <p class="side-nav"><i class="iconfont icon-liebiao"></i>独立店铺</p>
    </div>
    <div class="each-table" v-loading="loading">
      <ul class="header-tit">
        <li>店铺名称</li>
        <li>积分模板</li>
      </ul>
      <div class="scroll-wrap">
        <ul v-for="item in combinationList">
          <li>{{item.shopName}}</li>
          <li>{{item.templateName}}</li>
        </ul> 
      </div>
    </div>
  </div>
</template>
<script>
  import { seekFindTemplateShopAll } from 'Api/commonality/seek'
  export default {
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
        let datas = {
          shopList: [
            {
              shopId: 'shopId',
              shopName: 'shopName',
              templateName: 'templateName',
            }
          ]
        }
        this.combinationList = datas.shopList
        setTimeout(() => {
          this.loading = false
        }, 1000)
        seekFindTemplateShopAll()
          .then(res => {
            if (res.data.state == 200) {

            }
          })
      },
      compile () {

      },
      del () {

      }
    }
  }
</script>
<style lang="scss">
.m-m-each-other-main{
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
  .header{
    padding: 0 15px;
    height: 40px;
    .right-btn{
      float: right;
      width: 80px;
      height: 28px;
      border-radius: 4px;
      color: #2993f8;
      border: 1px solid #2993f8;
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      margin-top: 15px;
      font-weight: bold;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        background: #2993f8;
        color: #fff;
      }
    }
  }
  .each-table{
    margin: 10px 0 0 50px;
    width: 900px;
    border: 1px solid #dedede;
    border-radius: 5px;
    .scroll-wrap{
      height: 200px;
      overflow: scroll;
      >ul{
        border-bottom: 1px solid #f0f2f5;
      }
      >ul:nth-child(2n){
        background-color: #fbfbfb;
      }
    }
    ul{
      font-size: 0;
      li{
        height: 100%;
        font-size: 14px;
        padding: 12px;
        vertical-align: top;
        text-align: center;
        display: inline-block;
      }
      li:nth-child(1){
        width: 100px;
      }
      li:nth-child(2){
        width: 580px;
        word-wrap: break-word; 
        word-break: normal; 
      }
      li:nth-child(3){
        width: 100px;
      }
      li:nth-child(4){
        width: 100px;
        i{
          transition: all .3s;
          cursor: pointer;
          &:hover{
            color: #2993f8;
          } 
        }
        >i:nth-child(2){
          margin-left: 10px; 
        }
      }
    }
    .header-tit{
      height: 40px;
      background-color: #f5f5f5;
      overflow: hidden;
      display: -ms-flexbox;
      display: flex;
      border-bottom: 2px solid #e7e7e7;
    }
  }
}

</style>