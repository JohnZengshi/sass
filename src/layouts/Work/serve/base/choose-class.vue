<template>
<div class="audit-popup" v-if="popupShow">
    <i class="el-icon-close" @click="close"></i>
    <div class="audit-tittle">
        <img src="~static/img/copy.png">
        <a href="http://192.168.100.109:8080/yunzhubao/v1/export/exportExcelByBusinss?content=https%3A%2F%2Fws.yunzhubao.com%3A9093%2Fyunzhubao-bat%2Fv1%2Fweb%2Flogined%3Foperate%3D001%26key%3D1525400614877%26sessionId%3Dsession-380d5853-0152-40a9-bc29-6157bb4db9a8">
        <div>添加售后商品</div>
        </a>
    </div>
    <p class="serve-member-create-input-h">商品信息</p>
    <div class="serve-audit-text">
      <ul class="serve-member-create-input-wrap">

        <li class="selectBox">
          <span class="selTittle">产品类别</span>
          <div class="input-w180">
          <Cascade :propList="productCategory" :subclassKey="'typeList'" titleName="产品类别"
          @clear="callVaueClasses"
          @dropReturn="changeVaueClasses">
          </Cascade>
            <!-- <el-input v-model="phone" placeholder="请输入联系号码"></el-input> -->
          </div>
        </li>

        <li class="selectBox">
          <span class="selTittle">成色大类</span>
          <Cascade :propList="productClassListOne" :subclassKey="'childrenList'" titleName="成色大类"
          @clear="clearVaueColor"
          @dropReturn="changeVaueColor">
          </Cascade>
        </li>

        <li class="selectBox">
          <span class="selTittle">宝石名称</span>
          <Cascade :propList="productClassListTwo" :subclassKey="'childrenList'" titleName="宝石名称"
          @clear="clearVaueGem"
          @dropReturn="changeVaueGem">
          </Cascade>
        </li>

        <li class="selectBox">
          <span class="selTittle">首饰类别</span>
          <Cascade :propList="productClassListThree" :subclassKey="'childrenList'" titleName="首饰类别" @clear="crearVaueJewelry" @dropReturn="changeVaueJewelry">
          </Cascade>
        </li>

        <li class="selectBox">
          <span class="selTittle">{{newData.classesType == 1 ? '金重' : '件重'}}</span>
          <div class="input-w180">
            <el-input @blur="formatW" v-model="newData.newWeight" placeholder="请输入重量，默认单位g"></el-input>
          </div>
        </li>

      </ul>
    </div>
    <div class="audit-btn" @click="_operateMemberCreate">确定</div>
</div>
</template>

<script>
import {operateMemberCreate} from 'Api/commonality/operate'
import {getProductTypeList, seekProductClassList} from 'Api/commonality/seek'
import Cascade from './Cascade'
export default{
  components: {
    Cascade,
  },
  props: ['currentData'],
  data() {
    return {
      username: '',
      phone: '',
      textareaData : '',
      popupShow : false,
      isTextarea : true,
      //产品类别
      productCategory: [],
      productClassListOne: [], // 成色名称
      productClassListTwo: [], // 宝石名称
      productClassListThree: [], // 首饰类别
      newData: {
        classesType: '1', // 默认计件
        serviceId: '',
        serviceTypeName: '',
        serviceTypeId: '',
        serviceTypeName: '',
        serviceTypeName: '',
        serviceId: '',
        type: '3',
        productId: '',
        // productType: '1',
        productName: '',
        serviceId: '',
        classesId: '',
        classesName: '',
        jewelryId: '',
        jewelryName: '',
        colorId: '',
        colorName: '',
        gemId: '',
        gemIdName: '',
        newWeight: ''
      }
    }
  },
  
  methods: {

    initData () {
        this.newData.serviceTypeName = ''
        this.newData.serviceId = ''
        this.newData.productId = ''
        this.newData.productName = ''
        this.newData.classesId = ''
        this.newData.classesName = ''
        this.newData.jewelryId = ''
        this.newData.jewelryName = ''
        this.newData.colorId = ''
        this.newData.colorName = ''
        this.newData.gemId = ''
        this.newData.gemIdName = ''
        this.newData.newWeight = ''
    },

    // 格式化成三位小数
    formatW () {
      this.newData.newWeight = Number(this.newData.newWeight).toFixed(3)
    },

    open () {
      this.getProductClass()
      this.popupShow = true
    },

    getProductClass () {
      this._getProductTypeList()
      // 成色名称
      this._seekProductClassList('1')
      // 宝石名称
      this._seekProductClassList('2')
      // 首饰类别
      this._seekProductClassList('3')
    },

    _operateMemberCreate () {

      if (!this.newData.classesId) {
        this.$message({
          message: '请选择产品类别',
          type: 'warning'
        })
        return
      }

      if (!this.newData.jewelryId) {
        this.$message({
          message: '请选择首饰名称',
          type: 'warning'
        })
        return
      }

      if (!this.newData.colorId && !this.newData.gemId) {
        this.$message({
          message: '请选择成色名称或宝石名称',
          type: 'warning'
        })
        return
      }

      // if (!this.newData.gemId) {
      //   this.$message({
      //     message: '请选择宝石名称',
      //     type: 'warning'
      //   })
      //   return
      // }

      if (!this.newData.newWeight) {
        this.$message({
          message: '请填写金重/件重',
          type: 'warning'
        })
        return
      }

      debugger
      this.newData.productName = `${this.newData.classesName}-${this.newData.jewelryName}-${this.newData.colorName}-${this.newData.gemIdName}`

      this.newData.productId = 'tProductId' + new Date().getTime()

      let datas = JSON.parse(JSON.stringify(this.newData))

      if (this.newData.classesType == '1') {
        datas.goldWeight = this.newData.newWeight
        this.newData.classesType = '2'
      } else {
        datas.weight = this.newData.newWeight
        this.newData.classesType = '1'
      }

      this.$emit('chooseClassData', {
              orderNo: '',
              orderType: '3', // 1本人商品 2.他人商品3.手工
              productList: [
                datas
              ]
          })
      this.close()
    },
    
    close () {
      this.initData()
      this.popupShow = false
    },

    //产品类别
    _getProductTypeList() {
      getProductTypeList().then((res) => {
        let productCategory = res.data.data.list
        if(productCategory.length > 0) {
          let tempCategory = [];
          productCategory.forEach((item) => {

            switch(Number(item.classesType)) {
              case 1:
                //item.classesName = '素金类';
                item.classesId = item.classesType
                tempCategory.push(item);
                break;
              case 2:
                //item.classesName = '珠宝类'
                item.classesId = item.classesType
                tempCategory.push(item)
                break;
              case 3:
                //item.classesName = '饰品类'
                item.classesId = item.classesType
                tempCategory.push(item)
                break;
            }
          })
          this.productCategory = tempCategory
        }
      }, (res) => {
      })
    },

    // 商品大小类列表
    _seekProductClassList (parm) {
      let options = {
        type: parm
      }
      seekProductClassList(options)
        .then(res => {
          if (res.data.state == 200) {
            switch (parm) {
              case '1':
                this.productClassListOne = res.data.data.list
                return
              case '2':
                this.productClassListTwo = res.data.data.list
                return
              case '3':
                this.productClassListThree = res.data.data.list
                return
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },

    //产品类别
    callProductCategory(res) {
      // if(res.length == 0) {
      //   this.printSelectDate.productType = ''
      //   this.dataGridOptions.productTypeId = ''
      //   this.send()
      //   return
      // }
    },

    changeVaueService (val) {
      this.newData.serviceId = val.item.operateId
      this.newData.serviceName = val.item.operateName
    },

    changeVaueClasses (val) {
      console.log(val)
      this.newData.classesType = val.type
      this.newData.classesId = val.item.operateId
      this.newData.classesName = val.item.operateName
    },

    callVaueClasses () {
      this.newData.classesId = ''
      this.newData.classesName = ''
    },

    changeVaueJewelry (val) {
      this.newData.jewelryId = val.item.operateId
      this.newData.jewelryName = val.item.operateName
    },

    crearVaueJewelry () {
      this.newData.jewelryId = ''
      this.newData.jewelryName = ''
    },

    changeVaueColor (val) {
      this.newData.colorId = val.item.operateId
      this.newData.colorName = val.item.operateName
    },

    clearVaueColor () {
      this.newData.colorId = ''
      this.newData.colorName = ''
    },

    changeVaueGem (val) {
      this.newData.gemId = val.item.operateId
      this.newData.gemIdName = val.item.operateName
    },

    clearVaueGem () {
      this.newData.gemId = ''
      this.newData.gemIdName = ''
    },

    changeVaue(val) {
      console.log('看拿到的是', val)
        // this.dataGridOptions.productTypeId = val.item.operateId
        // this.printSelectDate.productType = val.item.operateName
        this.currentPage = 1
    },
  }
}
</script>
<style lang="scss">
.serve-member-create-input-wrap{
  .el-checkbox{
    vertical-align: top;
    height: 20px!important;
    line-height: 20px!important;
  }
  .el-checkbox__inner{
    border-radius: 2px!important;
  }
  .el-checkbox__label{
    font-size: 14px!important;
  }
}
</style>
<style lang="scss" scoped>
.audit-popup { // 审核弹窗
    width: 320px;
    //height: 400px;
    background:#fff;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -300px;
    margin-left: -160px;
    z-index: 200;
    box-shadow: 0 0 10px 10px rgba(0,0,0,0.1);
    &>i {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #bfcbd9;
        cursor: pointer;
    }
    .audit-tittle {
        width: 130px;
        height: 130px;
        margin: 0 auto;
        text-align: center;
        box-sizing: border-box;
        padding-top: 24px;
        img {
            height: 46px;
            width: 46px;
            margin-bottom: 15px;
            border-radius: 50%;
        }
        &>div {
            font-size: 12px;
            color:#333;
            font-weight: bold;
        }
    }
    .serve-member-create-input-h{
      position: relative;
      padding-left: 10px;
      font-size: 14px;
      line-height: 14px;
      color: #2993f8;
      margin: 0 0 20px 30px;
      &:after{
        content: '';
        height: 14px;
        width: 2px;
        position: absolute;
        left: 0;
        border-radius: 6px;
        background-color: #2993f8;
      }
    }
    .serve-audit-text {
        margin:0 auto;
        width: 260px;
        // height: 180px;
        // textarea {
        //   width: 260px;
        //   height: 180px;
        //   background: #f6f7f8;
        //   box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1) inset;
        //   border-radius: 4px;
        //   padding: 10px;
        //   font-size: 14px;
        //   color: #666;
        // }
        .serve-member-create-input-wrap{
          .selectBox {
            font-size: 12px;
            color: #333;
            height: 36px;
            margin-bottom: 24px;
            position: relative;
            .selTittle {
              width: 66px;
              height: 36px;
              display: block;
              float: left;
              line-height: 36px;
            }
            .input-w180 {
              vertical-align: top;
              height: 36px;
              width: 180px;
              display: inline-block;
              .el-input {
                height: 36px;
                .el-input__inner {
                  height: 36px;
                }
              }
            }
            .titleBox1 {
              position: absolute;
              left: 70px;
              bottom: -15px;
              color: red;
            }
            .sex-check {
              height: 36px;
              padding-top: 8px;
              font-size: 14px;
              float: left;
            }
            .mr30{
              margin-right: 30px;
            }
          }
        }
    }
    
    .text {
        margin:0 auto;
        width: 260px;
        input {
          width: 260px;
          height: 40px;
          background: #f6f7f8;
          box-shadow: 0 0 5px 2px rgba(0,0,0,0.1) inset;
          border-radius: 4px;
          padding: 10px;
          font-size: 14px;
          color: #666;
        }
    }
    .audit-btn {
        width: 150px;
        height: 28px;
        background:#2993f8;
        text-align: center;
        line-height: 28px;
        color:#fff;
        font-weight:bold;
        border-radius: 4px;
        margin: 30px auto;
        cursor: pointer;
    }
}
</style>