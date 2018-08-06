
<!-- 积分模板管理 -->
<template>
  <div class="m-m-integral-main">
    <div class="header">
      <p class="side-nav"><i class="iconfont icon-liebiao"></i>积分模板管理</p>
      <div class="xj-btn-defult right-btn" @click="openAdd">
        +积分模板
      </div>
    </div>
    <ul class="integral-body" v-loading="loading">
      <li @click.stop="compile(item, index)" v-for="item in combinationList">
        {{item.templateName}}
        <i @click.stop="del"></i>
      </li>
    </ul>
    <input-popup ref="inputPopupBox" :headTit="'请输入模板名称'" @confirm="confirmAdd"></input-popup>
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
        loading: true,
        shopId: this.$route.query.shopId,
        combinationList: [
          // {
          //   templateId: 'a436606db0974f68a365966a3fbffb25',
          //   templateName: 'templateName'
          // }
        ]
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
          name: parm,
          shopId: this.shopId
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
        seekFindTemplateAll()
          .then(res => {
            if (res.data.state == 200) {
              this.combinationList = res.data.data.dataList
            } else {
              this.$message({type: 'error',message: res.data.msg})
            }
            this.loading = false
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
      margin-top: 15px;
    }
  }
  .integral-body{
    width: 930px;
    margin: 10px 0 0 50px;
    li{
      position: relative;
      display: inline-block;
      height: 44px;
      line-height: 44px;
      margin-right: 40px;
      width: 190px;
      // padding: 0 15px;
      text-align: center;
      font-size: 13px;
      color: #333;
      background-color: #F6F8FA;
      margin: 0 40px 22px 0;
      transition: all 0.3;
      border-radius: 5px;
      i{
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 18px;
        width: 18px;
        opacity: 0;
        background: url(~assets/img/triangle-change-icon.png) no-repeat;
        background-size: 18px 18px;
        transition: all 0.3;
        cursor: pointer;
      }
      &:hover{
        color: #2993f8;
        background-color: #F0F7FF;
        i{
          opacity: 1;
        }
      }
    }
  }
}

</style>