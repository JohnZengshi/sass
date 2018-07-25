<!-- 积分模板管理 -->
<template>
  <div class="m-m-integral-main">

    <input-popup ref="inputPopupBox" :headTit="'请输入模板名称'" @confirm="confirmAdd"></input-popup>

    <div class="header">
      <p class="side-nav"><i class="iconfont icon-liebiao"></i>会员管理模板</p>
      <div class="right-btn" @click="openAdd" :to="{path: '/memberManage/addTemplate', query: {shopId: shopId}}">
        +模板
      </div>
    </div>
    <div class="each-table" v-loading="loading">
      <ul class="header-tit">
        <li>模板名称</li>
<!--         <li>店铺名称</li> -->
        <li>操作</li>
      </ul>
      <div class="scroll-wrap">
        <ul v-for="(item, index) in combinationList">
          <li>{{item.templateName}}</li>
<!--           <li>{{item.BB}}</li> -->
          <li>
            <i @click="compile(item, index)" class="iconfont icon-bianji"></i>
            <i @click="del(item, index)" class="iconfont icon-lajitong"></i>
          </li>
        </ul> 
      </div>
    </div>
  </div>
</template>
<script>
  import { seekFindTemplateAll } from 'Api/commonality/seek'
  import { operateDeleteMemberTemplaet, operateAddMemberTemplaet } from 'Api/commonality/operate'
  import inputPopup from 'base/popup/input-popup'
  export default {
    components: {
      inputPopup
    },
    data () {
      return {
        loading: false,
        shopId: this.$route.query.shopId,
        combinationList: []
      }
    },
    created () {
      this._seekFindTemplateAll()
    },
    methods: {
      openAdd () {
        this.$refs.inputPopupBox.open()
      },
      confirmAdd (parm) {
        let options = {
          name: parm
        }
        operateAddMemberTemplaet(options)
          .then(res => {
            if (res.data.state == 200) {
              this.$message({
                type: 'success',
                message: '新建成功'
              })
              this._seekFindTemplateAll()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
      },
      _seekFindTemplateAll () {
        this.loading = true
        let datas = {
          templateList: [
            {
              templateId: 'templateId',
              templateName: 'templateName'
            },
            {
              templateId: 'templateId',
              templateName: 'templateName'
            }
          ]
        }
        this.combinationList = datas.templateList
        setTimeout(() => {
          this.loading = false
        }, 1000)
        seekFindTemplateAll()
          .then(res => {
            if (res.data.state == 200) {

            }
          })
      },
      compile (item, index) {
        this.$router.push({
          path: 'addTemplate',
          query: {
            shopId: this.shopId,
            templateId: item.templateId
          }
        })
      },
      del (item, index) {
        this.loading = true
        this.combinationList.splice(index, 1)
        setTimeout(() => {
          this.loading = false
        }, 1000)
        let options = {
          templateId: item.templateId
        }
        operateDeleteMemberTemplaet(options)
          .then(res => {
            if (res.data.state == 200) {

            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
      }
    }
  }
</script>
<style lang="scss">
.m-m-integral-main{
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
        width: 160px;
      }
      li:nth-child(2){
        width: 680px;
        word-wrap: break-word; 
        word-break: normal; 
      }
      li:last-child{
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
  // p{
  //   text-align: center;
  // }
}

</style>