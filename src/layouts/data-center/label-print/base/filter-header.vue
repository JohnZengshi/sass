<template>
  <div class="d-c-filter-header-main">
    <div class="operate-bar-bottom">
      <div class="search">
          <input type="text" v-model="keyword" placeholder="请输入正确的条码号" @keyup.enter="batchAddByOrderNum">
          <div class="search-btn" @click="batchAddByOrderNum">
              <i class="iconfont icon-sousuo"></i>
          </div>
      </div>

      <div class="search-block t-center" @click="openLittleBatch">
        单据搜索
      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="storageLocationWrap"
            :propsList="repositoryList"
            :allName="'全部库位'"
            titleData="库位名称"
            @dataBack="storageLocation"
        ></alone-drop-down-colums>
      </div>

      <div class="search-block">
          <dropDownColums
              ref="shopWrap"
              :propsList="shopDataList"
              :allName="'全部店铺'"
              :keyName="'shopId'"
              titleData="店铺名称"
              @dataBack="dataBack"
          >
          </dropDownColums>
          
      </div>

      <div class="class-btn-wrap">

          <dropDownColums
              ref="productTypeIdWrap"
              :propsList="proList"
              :keyName="'productTypeId'"
              titleData="产品类别"
              @dataBack="dataBack"
          >
          </dropDownColums>

          <dropDownColums
              ref="colourIdWrap"
              :propsList="conditionList"
              :keyName="'colourId'"
              titleData="成色名称"
              @dataBack="dataBack"
          >
          </dropDownColums>

          <dropDownColums
              ref="jeweIdWrap"
              :propsList="jewelList"
              :keyName="'jeweId'"
              titleData="宝石名称"
              @dataBack="dataBack"
          >
          </dropDownColums>

          <dropDownColums
              ref="jewelryIdWrap"
              :propsList="jewelryList"
              :keyName="'jewelryId'"
              titleData="首饰类别"
              @dataBack="dataBack"
          >
          </dropDownColums>

      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="stateWrap"
            :propsList="stateList"
            titleData="当前状态"
            @dataBack="dataBackProductTypeId"
        ></alone-drop-down-colums>
      </div>

      <down-input
        ref="moreWrap"
        class="ml-10"
        @filterData="filterData"
        titleName="更多筛选"
      ></down-input>

    </div>

    <div class="right-btn-wrap">
        <div class="reset-btn" @click="resetData">
          重置
        </div>

        <div class="cost-btn" v-if="isShowCost == 'Y'" :title="tabSwitch?'关闭成本' : '开启成本'" @click="choseMenu" :class="{active: tabSwitch}">
          专列项
        </div>
      
    </div>

    <little-batch ref="littleBatchWrap" @changeOrderId="changeOrderId" :supplierListData="supplierListData"></little-batch>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {getProductTypeList, seekProductClassList, seekGetShopListByCo, showCounterList, seekRepositoryList,seekSettingUserRole} from "Api/commonality/seek"
import dropDownColums from 'base/menu/drop-down-colums'
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
import littleBatch from './little-batch'
import DownMenu from 'base/menu/DownMenu'
import downInput from 'base/menu/down-input'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DropDownMenu from '@/components/template/DropDownMenu'
export default {
  components: {
    dropDownColums,
    DropDownMenu,
    littleBatch,
    DownMenu,
    downInput,
    aloneDropDownColums
  },
  data () {
    return {
      isShowCost: '',
      keyword: '',
      tabSwitch: false,
      repositoryList: [], // 仓库列表
      shopDataList: [],
      filterCondition: {
        keyWord: '',
        newOrderId: '',
        beginPage: '1',
        pageSize: '9999',
        storageId: [],
        shopId: [],
        productTypeId: [],
        colourId: [],
        jeweId: [],
        jewelryId: [], // 首饰类别
        productStatus: [], // 产品状态
        sortList: []
      },
      littleBatch: false,
      isLoading: false,
      proList: [],
      conditionList: [], // 成色列表
      jewelList: [], // 宝石列表
      jewelryList: [], // 首饰列表
      stateList: [
        {
            id: "10",
            name: "在库位"
        },
        {
            id: "11",
            name: "入库中"
        },
        {
            id: "20",
            name: "已退库"
        },
        {
            id: "21",
            name: "退库中"
        },
        {
            id: "30",
            name: "已修改"
        },
        {
            id: "31",
            name: "修改中"
        },
        {
            id: "40",
            name: "已调库"
        },
        {
            id: "41",
            name: "调库中"
        },
        {
            id: "50",
            name: "已发货"
        },
        {
            id: "51",
            name: "发货中"
        },
        {
            id: "52",
            name: "发货审核"
        },
        {
            id: "60",
            name: "已退货"
        },
        {
            id: "61",
            name: "退货中"
        },
        {
            id: "62",
            name: "退货审核"
        },
        {
            id: "70",
            name: "已调柜"
        },
        {
            id: "71",
            name: "调柜中"
        },
        {
            id: "80",
            name: "已销售"
        },
        {
            id: "81",
            name: "销售中"
        },
        {
            id: "90",
            name: "已退货"
        },
        {
            id: "91",
            name: "退货中"
        },
        {
            id: "92",
            name: "已换货"
        },
        {
            id: "93",
            name: "换货中"
        },
        {
            id: "94",
            name: "已回收"
        },
        {
            id: "95",
            name: "回收中"
        },
        {
            id: "100",
            name: "店铺收货"
        },
        {
            id: "101",
            name: "仓库收货"
        }
      ],
      "supplierListData": [
          {
              name: "全部",
              type: ""
          },
          {
              name: "入库单",
              type: "01"
          },
          {
              name: "修改单",
              type: "10"
          },
          {
              name: "退货单",
              type: "04"
          },
          {
              name: "调库单",
              type: "07"
          }
      ],
    }
  },
  created () {
    this.seekProductTypeList()
    this.productClassList(1)
    this.productClassList(2)
    this.productClassList(3)
    this._seekGetShopListByCo()
    this._seekRepositoryList()
    this.settingUserRole()
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
    resetData () {
      this.keyword = ''
      this.$refs.moreWrap.reset()
      this.$refs.stateWrap.reset()
      this.$refs.jewelryIdWrap.reset()
      this.$refs.jeweIdWrap.reset()
      this.$refs.colourIdWrap.reset()
      this.$refs.productTypeIdWrap.reset()
      this.$refs.shopWrap.reset()
      this.$refs.storageLocationWrap.reset()
      this.$emit('resetData')
    },
    batchAddByOrderNum () {
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
    _seekGetShopListByCo() {
      if (this.userPositionInfo.roleList) {
        let options = {
          page: '1',
          pageSize: 9999,
          type: 1 // 1.可查看 2.所属 3.全部
        }

        if (this.computedManageRole || this.officeClerk) { // 管理员 // 职员
          options.type = 3
        } else if (this.shopManageRole) { // 店长
          options.type = 2
        } else if (this.shopRole) { // 店员
          options.type = 1
        } else if (this.isJrole) { // 监察员
          options.type = 2
        }

        seekGetShopListByCo(options)
          .then(res => {
            if (res.data.state == 200) {
              for (let i of res.data.data.shopList) {
                this._showCounterList(i.shopId, i)
              }
              // this.shopDataList.childrenList = 
              // this.productCategory[1].children = res.data.data.repositoryList
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
            }
          })
      } else {
        setTimeout(() => {
          this._seekGetShopListByCo()
        }, 1500)
      }
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
          item.childrenList = res.data.data.counterList
          item.id = item.shopId
          item.name = item.shopName
          for (let j of item.childrenList) {
            j.name = j.counterName
            j.id = j.counterId
          }
          this.shopDataList.push(item)
        })
    },
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
      this.filterCondition[parm.keyName] = parm.samllList
      this.$emit('filterData', this.filterCondition)
    },
    dataBackProductTypeId (parm) { // 产品类别过滤
      this.filterCondition.productStatus = parm.bigList
      this.$emit('filterData', this.filterCondition)
    },
    seekProductTypeList () { // 产品类别列表
      getProductTypeList().then((res) => {
        if (res.data.state == 200) {
          this.isLoading = false
          let datas = res.data.data.list
          for (let i of datas) {
            i.id = i.classesType
            i.name = i.classesName
            i.childrenList = i.typeList
            for (let j of i.childrenList) {
              j.name = j.classesName
              j.id = j.classesId
            }
          }
          this.proList = datas
        }
      })
    },
    productClassList (type) { // 商品大小类列表
        let options = {
            type: type
        }
        seekProductClassList(options).then((res) => {
            if (res.data.state == 200) {
                this.isLoading = false
                let datas =  res.data.data.list
                for (let i of datas) {
                  i.id = i.classesId
                  i.name = i.classesName
                  for (let j of i.childrenList) {
                    j.name = j.classesName
                    j.id = j.classesId
                  }
                }
                if (type == 1) {
                    this.conditionList = datas
                } else if (type == 2) {
                    this.jewelList = datas
                } else {
                    this.jewelryList = datas
                }
            }
        })
    },
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
.d-c-filter-header-main{
  border: 1px solid #fff;
  .operate-bar-bottom {
      height: 28px;
      margin-bottom: 15px;
      padding: 0 20px;
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
          width: 85px;
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
      }
      .t-center{
        text-align: center;
      }
      .class-btn-wrap {
          width: 346px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
          float: left;
          margin-left: 10px;
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
  .right-btn-wrap{
    position: absolute;
    right: 20px;
    bottom: 15px;
  }
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

</style>
