<template>
  <div class="m-m-filter-header-main">
    <div class="operate-bar-bottom">
      <div class="search">
          <input type="text" v-model="keyword" placeholder="手机号/姓名" @keyup.enter="batchAddByOrderNum">
          <div class="search-btn" @click="batchAddByOrderNum">
              <i class="iconfont icon-sousuo"></i>
          </div>
      </div>

      <div v-if="false" class="xj-btn-defult ml-10" @click="isSenior = !isSenior">
        {{isSenior ? '取消高级搜索' : '高级搜索'}}
      </div>

      <DownMenu
          class="w-110 ml-10"
          ref="memberRankBox"
          :isSolid="true"
          :titleInfo="memberRank.name ? memberRank.name : '会员级别'"
          :showList="memberRankList"
          :nameKey="'name'"
          @changeData="changeMemberRank"
          @clearInfo="clearMemberRank"
      ></DownMenu>

      <DownMenu
          class="w-110 ml-10"
          ref="memberClassBox"
          :isSolid="true"
          :titleInfo="memberClass.name ? memberClass.name : '会员类型'"
          :showList="memberClassList"
          :nameKey="'name'"
          @changeData="changeMemberClass"
          @clearInfo="clearMemberClass"
      ></DownMenu>

      <DownMenu
          class="w-110 ml-10"
          ref="memberClassBox"
          :isSolid="true"
          :titleInfo="user.username ? user.username : '负责人'"
          :showList="userList"
          :nameKey="'username'"
          @changeData="changeUser"
          @clearInfo="clearUser"
      ></DownMenu>


    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import {getProductTypeList, seekProductClassList, seekGetShopListByCo, showCounterList, seekRepositoryList,seekSettingUserRole} from "Api/commonality/seek"
import {seekMemberList} from "Api/commonality/seek"
import dropDownColums from 'base/menu/drop-down-colums'
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
import DownMenu from 'base/menu/new-down-menu'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DropDownMenu from '@/components/template/DropDownMenu'
import combinationDropDownColums from 'base/menu/combination-drop-down-colums'
import cutBg from "base/cut/cut-bg";
export default {
  components: {
    dropDownColums,
    DropDownMenu,
    DownMenu,
    aloneDropDownColums,
    combinationDropDownColums,
    cutBg
  },
  props: ['shopId'],
  data () {
    return {
      isSenior: false,
      memberRank: { // 会员级别
        name: '',
        type: ''
      },
      memberClass: {
        name: '',
        type: ''
      },
      user: {

      },
      memberRankList: [
        {
          name: '普通',
          type: '1'
        },
        {
          name: '中级',
          type: '2'
        },
        {
          name: '高级',
          type: '3'
        }
      ],
      memberClassList: [
        {
          name: '共有',
          type: '1'
        },
        {
          name: '私有',
          type: '2'
        },
        {
          name: '公共',
          type: '3'
        }
      ],
      userList: [],
      madeUpList: [
          {
              name: '成品',
              id: '1'
          },
          {
              name: '旧料',
              id: '2'
          }
      ],
      isShowCost: '',
      keyword: '',
      tabSwitch: false,
      repositoryList: [], // 仓库列表
      shopDataList: [],
      filterCondition: {
        productClassList: [
          {
            productClass: '1'
          }
        ],
        keyWord: '',
        newOrderId: '',
        // page: '1',
        // pageSize: '30',
        storageId: [],
        productTypeId: [],
        colourId: [],
        jeweId: [],
        jewelryId: [], // 首饰类别
        productStatus: [], // 产品状态
        sortList: []
      },
      littleBatch: false,
      isLoading: false,
    }
  },
  created () {
    // this._seekRepositoryList()
    // this.settingUserRole()
    this._seekMemberList()
  },
  computed: {
    ...mapGetters([
      "userPositionInfo" // 职位信息
    ]),
    shopRole: function() { // 店员
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionShopRole(this.userPositionInfo.roleList);
      }
    },
    computedRole: function() { // 公司
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionComputedRole(this.userPositionInfo.roleList)
      }
    },
    computedManageRole: function() { // 公司
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionComputedManageRole(this.userPositionInfo.roleList)
      }
    },
    officeClerk() { // 职员
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionOfficeClerk(this.userPositionInfo.roleList)
      }
    },
    shopManageRole() { // 店长
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionShopManageRole(this.userPositionInfo.roleList)
      }
    },
    isJrole: function() { // 判断是不是监察员
      if (this.userPositionInfo.roleList) {
        return jurisdictions.jurisdictionJCY(this.userPositionInfo.roleList);
      }
    }
  },
  methods: {
    changeMemberRank (parm) {
      this.memberRank = parm
      this.$emit('filterData', this.filterCondition)
    },
    clearMemberRank () {
      this.memberRank = {}
      this.$emit('filterData', this.filterCondition)
    },
    changeMemberClass (parm) {
      this.memberClass = parm
      this.$emit('filterData', this.filterCondition)
    },
    clearMemberClass () {
      this.memberClass = {}
      this.$emit('filterData', this.filterCondition)
    },
    changeUser (parm) {
      this.user = parm
      this.$emit('filterData', this.filterCondition)
    },
    clearUser () {
      this.user = {}
      this.$emit('filterData', this.filterCondition)
    },
    _seekMemberList () {
        let options = {
          type: '2',
          shopId: this.shopId,
        }
        seekMemberList(options)
          .then(res => {
            if (res.data.state == 200) {
              this.userList = res.data.data.dataList
            }
          })
    },
    combinationHeaderComplate (parm) {
      this.filterCondition = Object.assign(this.filterCondition, parm)
      this.$emit('filterData', this.filterCondition)
    },
    choseMenu () {
      this.tabSwitch = !this.tabSwitch
      this.$emit('reportSwitch', this.tabSwitch)
    },
    settingUserRole () { // 用户查看成本权限
      let options = {
        userId: sessionStorage.getItem('id')
      }
      seekSettingUserRole(options).then((res) => {
        if (res.data.state == 200) {
          this.isShowCost = res.data.data.costFlag
        }
      })
    },
    batchAddByOrderNum () {
      if (!this.keyword) {
        this.$message({
          message: '请输入正确的条码号',
          type: 'warning'
        })
        return
      }
      let options = {
        keyword: this.keyword
      }
      this.$emit('seekProduct', options)
    },
    storageLocation (parm) {
      this.filterCondition.storageId = parm.bigList
      this.$emit('filterData', this.filterCondition)
    },
    filterData (parm) {
      this.$emit('filterData', Object.assign(this.filterCondition, parm))
    },
    _seekRepositoryList () {
      seekRepositoryList()
        .then(res => {
          if (res.data.state == 200) {
            let datas = res.data.data.repositoryList
            for (let i of datas) {
              i.id = i.repositoryId
              i.name = i.repositoryName
            }
            this.repositoryList = datas
          } else {
            this.$message({
                message: res.data.msg,
                type: 'warning'
            })
          }
        })
    },
    _showCounterList (parm, item) {
      let options = {
        shopId: parm
      }
      showCounterList(options)
        .then(res => {
          if (res.data.state == 200) {
            item.childrenList = res.data.data.counterList
            item.id = item.shopId
            item.name = item.shopName
            for (let j of item.childrenList) {
              j.name = j.counterName
              j.id = j.counterId
            }
            this.shopDataList.push(item)
          } else {
            this.$message({
              type: "info",
              message: res.data.msg
            })
          }
        })
    },
    // initShowCounterList (parm) {
    //   let options = {
    //     shopId: parm
    //   }
    //   showCounterList(options)
    //     .then(res => {
    //       let datas = []
    //       for (let i of res.data.data.counterList) {
    //         datas.push(j.counterId)
    //       }
    //       this.$refs.shopWrap.initData(datas)
    //     })
    // },
    changeStateData () {

    },
    clearState () {

    },
    changeOrderId (parm) {
      this.filterCondition.newOrderId = parm
      this.$emit('filterData', this.filterCondition)
    },
    openLittleBatch () {
      this.$refs.littleBatchWrap.open()
    },
    changeShopData () {

    },
    dataBack (parm) {
      debugger
      this.filterCondition[parm.keyName] = parm.samllList
      this.$emit('filterData', this.filterCondition)
    },
    dataBackProductTypeId (parm) { // 产品类别过滤
      this.filterCondition.productStatus = parm.bigList
      this.$emit('filterData', this.filterCondition)
    }
  }
}
</script>
<style lang="scss">
.batch-main .batch-page-one .operate-bar-bottom .batch-time-wrap:hover{
    border: 1px solid #2993f8 !important;
}
.batch-main .batch-page-one .operate-bar-bottom .batch-time-wrap:focus{
    border: 1px solid #2993f8 !important;
}
.m-m-filter-header-main{
  position: absolute;
  right: 0;
  right: 20px;
  .operate-bar-bottom {
      height: 28px;
      margin-top: 11px;
      font-size: 0;
      // margin-bottom: 15px;
      .search {
          width: 190px;
          height: 28px;
          border-radius: 4px;
          float: left;
          position: relative;
          overflow: hidden;
          margin-bottom: 16px;
         
          input {
              border-radius: 4px;
              width: 188px;
              height: 28px;
              border: 1px solid #d6d6d6;
              padding-left: 10px;
               &:hover{
              border:1px solid #2993f8;
              }
              &:focus{
                     border:1px solid #2993f8;
              }
              &:blur{
                     border:1px solid #ededed;
              }
          }
          
          .search-btn {
              position: absolute;
              width: 30px;
              height: 28px;
              right: 0;
              top: 0;
              background: #2993f8;
              text-align: center;
              cursor: pointer;
              i {
                  color:#fff;
                  line-height: 28px;
              }
          }
      }
      .search-block {
          // width: 85px;
          min-width: 70px;
          width: auto;
          height: 28px;
          margin-left: 10px;
          border: 1px solid #d6d6d6;
          border-radius: 4px;
          color:#333;
          font-size: 12px;
          line-height: 26px;
          float: left;
          cursor: pointer;
          text-align: left;
          &.actions{
              color: #2993f8;
          }
      }
      .t-center{
        text-align: center;
        color: #666;
        font-weight: bold;
        font-size: 12px;
      }
      .class-btn-wrap {
          // width: 346px;
          // height: 28px;
          // border-radius: 4px;
          // border: 1px solid #d6d6d6;
          // float: left;
          // margin-left: 10px;
      }
      .drop-block {
          width: 90px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
          float: left;
          margin-right: 16px;
          text-align: center;
          .title-name {
              display: block;
              width: 100%;
              height: 100%;
          }
          .dropDown-wrap {
              height: 26px;
              &:hover {
                  color:#666;
                  background:#fff;
              }
              .title-name {
                  height: 26px;
              }
          }
      }
      .range-box {
          float: left;
          margin-left: 10px;
          width: 168px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
          padding-left: 20px;
          input {
              width: 65px;
              height: 100%;
              float: left;
              text-align: center;
          }
          span {
              float: left;
              margin: 0 4px;
              line-height: 26px;
          }
      }
  }
  .table-main {
      width: 100%;
      height: 440px;
      overflow-y: auto;
      ul {
          li {
              width: 100%;
              height: 44px;
              padding-right:20px; 
              &:hover{
                  background-color: #ededed;
              }
              .list {
                  //line-height: 44px;
                  height: 44px;
                  div {
                      margin-top: 13px;
                      float: left;
                      height: 14px;
                      text-align: center;
                      line-height: 14px;
                  }
                  
              }
              .left-list {
                  float: left;
                  div:nth-child(1) {
                      min-width: 30px;
                  }
                  div:nth-child(2) {
                      min-width: 120px;
                  }
                  div:nth-child(3) {
                      min-width: 160px;
                  }
                  div:nth-child(4) {
                      min-width: 74px;
                      border-right: 1px solid #d6d6d6;
                  }
                  div:nth-child(5) {
                      min-width: 95px;
                  }
                  div:nth-child(6) {
                     // width: 30px;
                  }
              }
              .right-list {
                  float: right;
                  div:nth-child(1) {
                      width: 80px;
                  }
                  div:nth-child(2) {
                      width: 102px;
                      border-left: 1px solid #d6d6d6;
                      //border-right: 1px solid #d6d6d6;
                  }
                  div:nth-child(3) {
                      width: 18px;
                      height: 18px;
                      margin: 0;
                      line-height: 44px;
                      margin-left: 70px;
                  }
              }

          }
      }
  }
  // .right-btn-wrap{
  //   position: absolute;
  //   right: 20px;
  //   bottom: 15px;
  // }
  .reset-btn{
    float: left;
    border: 1px solid #d6d6d6;
    color: #666;
    height: 26px;
    width: 60px;
    color: #2993f8;
    text-align: center;
    border-radius: 5px;
    line-height: 26px;
    font-size: 12px;
    cursor: pointer;
  }
  .cost-btn{
    float: left;
    font-size: 12px;
    display: block;
    margin-left: 10px;
    width: 52px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    color: #2993f8;
    background: #e0ecf7;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #2993f8;
    &.active {
      color: #fff;
      background: #2993f8;
    }
  }


  .ml-10{
    margin-left: 10px;
  }
}
.w-110{
  width: 100px!important;
}
</style>
