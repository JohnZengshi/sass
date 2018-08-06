<!-- 新增店铺组合 -->
<template>
  <div class="m-m-sell-discount-main">
<!--     <div v-for="item in productTypeList"> -->
<!--       <h6>{{item.classesName}}</h6> -->
      <div class="product-setting-content">
          <!-- 计重类 begin -->
          <div class="producet-jz" v-for="allItme in showData.list">
              <div class="title">
                  <span>{{allItme.classesName}}</span>
                  <div v-if="!isDisabled" class="xj-btn-defult" @click="jzSetting(allItme.typeList, allItme.classesName)">
                    批量设置
                  </div>
              </div>
              <div class="content">
                  <div class="item-wrap" v-for="(item,index) in allItme.typeList" :key="index">
                      <p class="item-title">{{ item.classesName }}</p>
                      <p class="item-input">
                          <input type="Number" @blur="setConsumeTemplateUpdate(item)" v-model="item.score" :disabled="isDisabled">
                          <span>%</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import { seekGetShopListByCo } from 'Api/commonality/seek'
import { operateAddGrade } from 'Api/commonality/operate'
import memberDialog from '@/layouts/Work/ShopSetting/dialog/tplGoldDialog'
// 获取模板内容
import { templateIntegralDetails,consumeTemplateUpdate } from 'Api/member'
export default {
  props: ['isDialog', 'showData'],
  components: {
    memberDialog
  },
  data() {
    return {
      isDisabled:false,
      templateInfoData: {},
      checkList: [],
      shopList: [],
      name: '',
      // 弹框数据
      dialog: {
          dialogVisible: false,
          dialogSize: 'counter_x_small',
          dialogSlot : '' ,
          addCounterName : '',
          smallDataList :[]
      },
    }
  },
  // watch: {
  //   isDialog () {
  //     this._seekFindPoductList()
  //   }
  // },
  created () {
    this.getIntegralDetails()
  },
  methods: {
    // 批量设置
    jzSetting(parm, addCounterName){
        this.dialog.dialogVisible = true          
        this.add({smallDataList:parm, setjz:'hy',amendN: '销售折扣'}, `${addCounterName}批量设置`)
    },
    add(item, addCounterName){
        this.dialogType(true)
        Object.assign(this.dialog,{
            dialogSlot: 'goldAdd',
            addCounterName: addCounterName
        },item)
        this.$emit('setClass', this.dialog)
    },
    addjj(item) {
        this.dialogType(true)
        Object.assign(this.dialog,{dialogSlot : 'goldAdd',addCounterName : '计件类批量设置'},item)
    },
    closeDialog(parm){
      this.dialog.dialogVisible = parm
    },
    dialogType(type){
      this.dialog.dialogVisible = type 
    },
    // 批量修改
    dialogCallback(data) {
        let options = {
            templateId: this.templateInfoData.templateId,
            dataList: data,
        }
        consumeTemplateUpdate(options).then(res => {
            if(res.data.state === 200) {
                this.getIntegralDetails()
                this.$message({type:'success',message:'修改成功'})
            } else {
                this.$message({type:'error',message:res.data.msg})
            }
        })
    },
    // 修改消费发放
    setConsumeTemplateUpdate(item){
        if(item && item.yuan < 0) {
            item.yuan = 0
        }
        if(item && item.score < 0) {
            item.score = 0
        }

        if (!this.showData.gradeId) {
          return
        }
        
        this.$emit('update', item)
    },
    open (parm) {
      this.checkList = []
      this._seekGetShopListByCo()
    },
    close () {
      this.checkList = []
      this.name = ''
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
    },
    // 模板详情
    getIntegralDetails(){
        let options = {
            templateId: 'e92665e027354bc9ae10298d90ed717e'
        }
        templateIntegralDetails(options).then(res => {
            this.templateInfoData = res.data.data
        })
    },
    _seekGetShopListByCo() {
      let opations = {
        page: 1,
        pageSize: '0',
        type: '1'
      }
      seekGetShopListByCo(opations)
        .then(res => {
          if (res.data.state == 200) {
            this.shopList = res.data.data.shopList
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
    // _seekFindPoductList () {
    //   seekFindPoductList()
    //     .then(res => {
    //       if (res.data.state == 200) {
    //         this.productTypeList = res.data.data
    //       } else {
    //         this.$message({
    //           type: 'error',
    //           message: res.data.msg
    //         })
    //       }
    //     })
    // },
    // _operateAddGrade () {
    //   if (!this.showData.gradeName) {
    //     this.$message({type: 'error',message: '请输入级别名称'})
    //     return
    //   }

    //   if (!this.showData.startScore) {
    //     this.$message({type: 'error',message: '请输入起始积分'})
    //     return
    //   }

    //   if (!this.showData.gradeId) {
    //     this.$message({type: 'error',message: '请选择下一级别'})
    //     return
    //   }

    //   let opations = {
    //     gradeName: this.showData.gradeName,
    //     startScore: this.showData.startScore,
    //     gradeId: this.showData.gradeId,
    //     poductList: []
    //   }
    //   for (let i of this.showData.list) {
    //     opations.poductList.push(...i.typeList)
    //   }
    //   operateAddGrade(opations)
    //     .then(res => {
          
    //     })
    // },
  }
}

</script>
<style lang="scss">
.m-m-sell-discount-main{
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
        font-weight: normal;
    }
  }
}
</style>
<style lang="scss" scoped>
.m-m-sell-discount-main {
  background-color: #F6F8F9;
  position: relative;
  height: 490px;
  overflow-y: scroll;
  >div{
    h5{
      font-size: 16px;
    }
    ul{
      li{
        display: inline-block;
        height: 80px;
      }
    }
  }
  .product-setting-content{
      background: #f6f7f8;
      padding: 26px 30px;
      border-radius: 10px;    
      .producet-jz{
          margin-bottom: 20px;
      }
      .producet-jj{
          // height: 500px;
      }
      // 计件计重公共部分
      .title{
          margin-bottom: 27px;
          color: #333;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
      }
      .content{
          display: flex;
          flex-wrap: wrap;
          .item-wrap{
              width: 165px;
              height: 119px;
              background: #fff;
              border-radius: 10px;
              padding: 23px 23px 20px;
              margin: 0 20px 20px 0;
              .item-title{
                  color: #2993f8;
                  font-size: 16px;
                  margin-bottom: 10px;
                  font-weight: bold;
              }
              .item-input{
                  overflow: hidden;
                  // display:flex;
                  justify-content: space-between;
                  margin-bottom: 12px;
                  input{
                      width: 45px;
                      height: 28px;
                      background-color:transparent;
                      text-align: center;
                      font-size: 14px;
                      border-radius: 3px;
                      transition: all .3s;
                      &:active,
                      &:hover,
                      &:focus{
                          width: 60px;
                          border: 1px solid #2993f8;
                          background-color: #f4f9ff;
                      }
                  }
                  // 移除number的箭头
                  input::-webkit-outer-spin-button,
                  input::-webkit-inner-spin-button {
                      -webkit-appearance: none;
                  }
                  input[type="number"]{
                      -moz-appearance: textfield;
                  }
              }
              .item-message{
                  font-size: 12px;
                  color: #666;
                  display:flex;
                  justify-content: space-between;
              }
          }
      }
  } 
  .member-dialog-box{
    position: absolute;
    top:0;
    left: 0;
    border: 1px solid red;
    background-color: #fff;
    z-index: 1000;
  }
  // .sell-discount-body {
  //   height: 660px;
  //   >h3 {
  //     line-height: 1;
  //     font-size: 16px;
  //     font-weight: 700;
  //     margin-bottom: 20px;
  //     color: #333;
  //   }
  //   .product-list{
  //     border: 1px solid red;
  //   }
  //   .input-wrap {
  //     width: 300px;
  //     margin-bottom: 34px;
  //     .item-label {
  //       display: inline-block;
  //       width: 90px;
  //     }
  //     input {
  //       height: 28px;
  //       background-color: transparent;
  //       font-size: 14px;
  //       border-radius: 3px;
  //       text-indent: 10px;
  //       border: 1px solid #d6d6d6;
  //       &:active,
  //       &:hover,
  //       &:focus {
  //         border: 1px solid #2993f8;
  //         background-color: #f4f9ff;
  //       }
  //     }
  //   }
  //   .shop-list {
  //     .list-wrap {
  //       height: 460px;
  //       margin: 20px;
  //       overflow: scroll;
  //       li {
  //         height: 40px;
  //         padding: 0 10px;
  //         display: inline-block;
  //         line-height: 40px;
  //         border: 1px solid #d6d6d6;
  //         text-align: left;
  //         padding-left: 14px;
  //         font-size: 14px;
  //         border-bottom: 1px solid #f1f2f3;
  //         cursor: pointer;
  //         margin-right: 10px;
  //         &:hover {
  //           background: #f6f7f8;
  //           color: #3195f5;
  //         }
  //       }
  //       li.active {
  //         color: #2993f8;
  //       }
  //     }
  //   }
  // }
}

</style>
