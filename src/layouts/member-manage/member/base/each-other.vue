<!-- 会员汇通 -->
<template>
  <div class="m-m-each-other-main">
    <div class="header">
      <p class="side-nav"><i class="iconfont icon-liebiao"></i>会员互通</p>
      <div class="xj-btn-defult right-btn" @click="openAdd">
        +店铺组合
      </div>
    </div>
    <div class="each-table" v-loading="loading">
      <ul class="header-tit">
        <li>组合名称</li>
        <li>店铺名称</li>
        <li>应用模板</li>
        <li>操作</li>
      </ul>
      <div class="scroll-wrap">
        <ul v-for="(item, index) in combinationList">
          <li>{{item.groupName}}</li>
          <li>{{item.shopName}}</li>
          <li>{{item.groupName}}</li>
          <li>
            <i @click="compile(item.groupId)" class="iconfont icon-bianji"></i>
            <i @click="del(item.groupId, index)" class="iconfont icon-lajitong"></i>
          </li>
        </ul>

        <template v-if="combinationList.length < 4">
          <ul v-for="(item, index) in (4 - combinationList.length)">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </template>

      </div>
    </div>

    <add-group ref="addGroupBox" @update="update" :independent="true" :titName="'新增店铺组合'"></add-group>

  </div>
</template>
<script>
  import addGroup from './add-group'
  import {seekFindTemplateGroupAll} from 'Api/commonality/seek.js'
  import {operateUpdateShopGroupById} from 'Api/commonality/operate.js'
  export default {
    components: {
      addGroup
    },
    data () {
      return {
        loading: true,
        combinationList: []
      }
    },
    created () {
      this._seekFindTemplateGroupAll()
    },
    methods: {
      _seekFindTemplateGroupAll () {
        this.loading = true
        seekFindTemplateGroupAll()
          .then(res => {
            if (res.data.state == 200) {
              let datas = res.data.data
              for (let i of datas) {
                let shopName = ''
                for (let j of i.groupShopList) {
                  shopName += shopName ? '、' + j.shopName : j.shopName
                }
                i.shopName = shopName
              }
              this.combinationList = datas
            } else {
              this.$message({type: 'error',message: res.data.msg})
            }
            this.loading = false
          })
      },
      openAdd () {
        this.$refs.addGroupBox.open()
      },
      compile (parm) {
        this.$refs.addGroupBox.open(parm)
      },
      update () {
        this.$emit('update')
        this._seekFindTemplateGroupAll()
      },
      del (item, index) {
        operateUpdateShopGroupById({templateId: item, type: '1'})
          .then(res => {
            if (res.data.state == 200) {
              this.$message({message: '删除'})
              this.combinationList.splice(index, 1)
              this.update()
            } else {
              this.$message({type: 'error',message: res.data.msg})
            }
          })
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
    height: 50px;
    >.right-btn{
      float: right;
      margin-top: 15px;
      // width: 80px;
      // height: 28px;
      // border-radius: 4px;
      // color: #2993f8;
      // border: 1px solid #2993f8;
      // text-align: center;
      // line-height: 28px;
      // font-size: 14px;
      // margin-top: 15px;
      // font-weight: bold;
      // cursor: pointer;
      // transition: all .3s;
      // &:hover {
      //   background: #2993f8;
      //   color: #fff;
      // }
    }
  }
  .each-table{
    margin: 10px 0 0 50px;
    width: 1060px;
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
        font-size: 14px;
        padding: 15px;
        vertical-align: top;
        text-align: center;
        display: inline-block;
      }
      li:nth-child(1){
        width: 190px;
      }
      li:nth-child(2){
        width: 480px;
        word-wrap: break-word; 
        word-break: normal; 
      }
      li:nth-child(3){
        width: 190px;
      }
      li:nth-child(4){
        width: 190px;
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
      height: 50px;
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