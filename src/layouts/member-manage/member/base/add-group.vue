<!-- 新增店铺组合 -->
<template>
  <el-dialog top="7%" :visible.sync="isDialog" class="xj-input-dialog">
    <div class="m-m-add-group-main">
      <div class="p-close-icon" @click="isDialog = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </div>
      <div class="add-group-body">
        <h3>{{titName}}</h3>
        <template v-if="independent">
          <div class="input-wrap">
            <span class="item-label">组合名称</span>
            <input @blur="_operateUpdateShopGroupById({name: name})" placeholder="请输入组合名称" v-model="name">
          </div>
          <div class="shop-list">
            <h5>选择店铺</h5>
            <ul class="list-wrap">
                <el-checkbox-group v-model="checkList">
                    <li v-for="(item, index) in [...nextData, ...showList.shopList]">
                       <el-checkbox @change="amendShop" :label="item.shopId" :class="{active: true}" style="font-size: 14px;">{{item.shopName}}</el-checkbox>
                    </li>
                </el-checkbox-group>
            </ul>
          </div>
        </template>

        <div class="shop-list">
          <h5>会员模板选择</h5>
          <ul class="list-wrap">
              <el-checkbox-group v-model="checkTemplateList">
                  <li v-for="(item, index) in showList.templateList">
                     <el-checkbox @change="amendTemplate" :label="item.templateId" :class="{active: true}" style="font-size: 14px;">{{item.templateName}}</el-checkbox>
                  </li>
              </el-checkbox-group>
          </ul>
        </div>
      </div>
      <div class="xj-btn-list">
        <div class="btn cnacel-btn" @click="close">取消</div>
        <div class="btn" @click="confirm">确定</div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { seekFindShopTemplateList, seekFindShopGroupDetails, seekFindTemplateShopAll, seekFindShopTemplateDetails } from 'Api/commonality/seek'
import { operateAddShopGroup, operateUpdateShopGroupById, operateUpdateShopTemplate } from 'Api/commonality/operate'
export default {
  props: ['independent', 'titName'], // 独立店铺
  data() {
    return {
      templateId: '',
      nextData: [], // 上一级数据
      checkList: [],
      checkTemplateList: [],
      showList: {
        shopList: [],
        templateList: []
      },
      name: '',
      isDialog: false
    }
  },
  methods: {
    open (parm) {
      this.checkList = []
      this.checkTemplateList = []
      this.isDialog = true
      if (parm) {
        this.templateId = parm.groupId
        for (let i of parm.groupShopList) {
          this.checkList.push(i.shopId)
        }

        this.nextData = parm.groupShopList
      }

      if (this.independent) { // 组合
        this._seekFindShopTemplateList()
        if (this.templateId) {
          this._seekFindShopGroupDetails()
        }
      } else { // 独立
        this._seekFindTemplateShopAll()
        if (this.templateId) {
          this._seekFindShopTemplateDetails()
        }
      }
    },
    close () {
      this.checkList = []
      this.name = ''
      this.isDialog = false
    },
    confirm () {
      if (this.independent) { // 新增
        this._operateAddShopGroup()
      } else {
        this.close()
      }
    },
    // 修改店铺
    amendShop(val) {
      if (!this.templateId) {
        return
      }
      this.filterAmend(val, 'shopList', 'shopId')
    },
    amendTemplate (val) {
      if (val.target.checked) {
        this.checkTemplateList = []
        this.checkTemplateList.push(val.target.value)
      }
      if (!this.templateId) {
        return
      }
      this.filterAmend(val, 'templateList', 'templateId')
    },
    filterAmend (val, bigKey, smallKey) {
      let opations = {
        [bigKey]: [
          {
            [smallKey]: val.target.value,
            type: ''
          }
        ]
      }
      if (val.target.checked) { // 新增
        opations[bigKey][0].type = 0
      } else { // 删除
        opations[bigKey][0].type = 1
        // opations = [{
        //   discount: 1
        // }]
      }
      if (this.independent) { // 组合
        this._operateUpdateShopGroupById(opations)
      } else { // 独立
        this._operateUpdateShopTemplate(opations)
      }
      
    },
    // 新增
    _operateAddShopGroup () {
      let opations = {
        name: this.name,
        shopList: [],
        templateList: []
      }
      if (!this.name) {
        this.$message({type: 'error',message: '请输入组合名称'})
        return
      }
      if (!this.checkList.length) {
        this.$message({type: 'error',message: '请选择店铺'})
        return
      }
      for (let i of this.checkList) {
        let datas = {
          shopId: i
        }
        opations.shopList.push(datas)
      }
      for (let i of this.checkTemplateList) {
        let datas = {
          templateId: i
        }
        opations.templateList.push(datas)
      }
      operateAddShopGroup(opations)
        .then(res => {
          if (res.data.state == 200) {
            this.$message({message: '新建成功'})
            this.close()
            this.$emit('update')
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    },
    // 修改
    _operateUpdateShopGroupById (opations) {
      if (!this.templateId) {
        return
      }
      operateUpdateShopGroupById(Object.assign(opations, {templateId: this.templateId}, {type: '0'}))
        .then(res => {
          if (res.data.state == 200) {
            this.$message({message: '修改成功'})
            this.$emit('update')
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    },
    _seekFindShopTemplateList() {
      seekFindShopTemplateList({groupId: this.templateId})
        .then(res => {
          if (res.data.state == 200) {
            this.showList = res.data.data
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    },
    // 组合详情
    _seekFindShopGroupDetails() {
      seekFindShopGroupDetails({groupId: this.templateId})
        .then(res => {
          if (res.data.state == 200) {
            let datas = res.data.data
            this.name = datas.groupName
            for (let i of datas.shopList) {
              this.checkList.push(i.shopId)
            }
            for (let i of datas.templateList) {
              this.checkTemplateList.push(i.templateId)
            }
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    },
    // 独立店铺列表
    _seekFindTemplateShopAll() {
      // seekFindTemplateShopAll()
      //   .then(res => {
      //     if (res.data.state == 200) {
      //       this.showList = res.data.data
      //     } else {
      //       this.$message({type: 'error',message: res.data.msg})
      //     }
      //   })
    },
    // 独立店铺详情
    _seekFindShopTemplateDetails(){
      seekFindShopTemplateDetails({shopId: this.templateId})
        .then(res => {
          if (res.data.state == 200) {
            let datas = res.data.data
            this.showList.templateList = datas
            for (let i of datas) {
              if (i.type == 1) {
                this.checkTemplateList.push(i.templateId)
              }
            }
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    },
    // 独立店铺修改
    _operateUpdateShopTemplate (opations) {
      if (!this.templateId) {
        return
      }
      operateUpdateShopTemplate(Object.assign(opations, {shopId: this.templateId}))
        .then(res => {
          if (res.data.state == 200) {
            this.$message({message: '修改成功'})
            this.$emit('update')
          } else {
            this.$message({type: 'error',message: res.data.msg})
          }
        })
    }
  }
}

</script>
<style lang="scss">
.m-m-add-group-main{
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
.m-m-add-group-main {
  height: 100%;
  width: 700px;
  height: 730px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 30px;
  position: relative;
  .p-close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 20px;
    width: 20px;
    cursor: pointer;
    >i {
      color: #bfcbd9;
    }
  }
  .add-group-body {
    height: 660px;
    overflow: scroll;
    >h3 {
      line-height: 1;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #333;
    }
    .input-wrap {
      width: 300px;
      margin-bottom: 34px;
      .item-label {
        display: inline-block;
        width: 80px;
      }
      input {
        height: 28px;
        background-color: transparent;
        font-size: 14px;
        border-radius: 3px;
        text-indent: 10px;
        border: 1px solid #d6d6d6;
        &:active,
        &:hover,
        &:focus {
          border: 1px solid #2993f8;
          background-color: #f4f9ff;
        }
      }
    }
    .shop-list {
      >h5{
        position: relative;
        font-size: 14px;
        line-height: 22px;
        color: #333;
        font-weight: bold;
        padding-left: 8px;
        color: #2993f8;
        &:before {
          content: "";
          display: inline-block;
          width: 3px;
          height: 16px;
          background: #2993f8;
          position: absolute;
          top: 3px;
          border-radius: 3px;
          left: 0;
        }
      }
      .list-wrap {
        margin: 10px;
        overflow: scroll;
        li {
          height: 40px;
          display: inline-block;
          line-height: 40px;
          text-align: left;
          font-size: 14px;
          cursor: pointer;
          margin-right: 20px;
          // &:hover {
          //   background: #f6f7f8;
          //   color: #3195f5;
          // }
        }
        li.active {
          color: #2993f8;
        }
      }
    }
  }
}

</style>
