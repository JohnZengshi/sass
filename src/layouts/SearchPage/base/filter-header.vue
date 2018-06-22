<template>
  <div class="d-c-filter-header-main productList">
    <!-- 商品 -->
    <div class="operate-bar-bottom" v-if="panelType === 0">
      <div class="search">
          <input type="text" v-model="keyWord" placeholder="请输入关键字" @keyup.enter="batchAddByOrderNum">
          <div class="search-btn" @click="batchAddByOrderNum">
              <i class="iconfont icon-sousuo"></i>
          </div>
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
          <alone-drop-down-colums
              ref="shopWrap"
              :propsList="shopDataList"
              :allName="'全部店铺'"
              :keyName="'shopId'"
              titleData="店铺名称"
              @dataBack="dataBackShopList"
          >
          </alone-drop-down-colums>
          
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
            ref="productClassWrap"
            :propsList="productClassListConfig"
            titleData="商品属性"
            @dataBack="dataBackProductClass"
        ></alone-drop-down-colums>
      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="productStateWrap"
            :propsList="stateList"
            titleData="商品状态"
            @dataBack="dataBackProductTypeId"
        ></alone-drop-down-colums>
      </div>

      <down-input
        ref="moreWrap"
        class="ml-10"
        @filterData="filterData"
        titleName="更多筛选"
      ></down-input>

      <div class="reset">
        <div class="reset-btn" @click="resetData">
          重置
        </div>
      </div>

    </div>
    <!-- 单据 -->
    <div class="operate-bar-bottom" v-else-if="panelType === 1">

      <div class="search">
          <input type="text" v-model="keyWord" placeholder="请输入关键字" @keyup.enter="batchAddByOrderNum">
          <div class="search-btn" @click="batchAddByOrderNum">
              <i class="iconfont icon-sousuo"></i>
          </div>
      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="storageLocationWrap"
            :propsList="repositoryList"
            :allName="'全部库位'"
            titleData="库位名称"
            @dataBack="dataBackRepositoryList"
        ></alone-drop-down-colums>
      </div>

      <div class="search-block">
          <alone-drop-down-colums
              ref="shopWrap"
              :propsList="shopDataList"
              :allName="'全部店铺'"
              :keyName="'shopId'"
              titleData="店铺名称"
              @dataBack="dataBackShopidList"
          >
          </alone-drop-down-colums>
          
      </div>
      
      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="peopleTypeWrap"
            :propsList="userTypeListConfig"
            titleData="人员类型"
            @dataBack="dataBackUserTypeList"
        ></alone-drop-down-colums>
      </div>

      <div class="search-block">
          <dropDownColums
              ref="peopleWrap"
              :propsList="selectPersonnelConfig"
              :keyName="'operatorList'"
              titleData="选择人员"
              @dataBack="dataBackOperatorList"
          >
          </dropDownColums>
          
      </div>

      <div class="itemType">
          <alone-drop-down-colums 
            ref="stateWrap"
            :propsList="orderTypeListConfig"
            titleData="单据类型"
            @dataBack="dataBackOrderTypeList"
          ></alone-drop-down-colums>
          <span class="divider">丨</span>
          <div class="input_box">
            <input class="input_box_before" @blur="rangeOfScreening" v-model="orderBegin" type="text" name="" id="" placeholder="单据号范围">
            <span>至</span>
            <input class="input_box_end" @blur="rangeOfScreening" v-model="orderEnd" type="text" name="" id="" placeholder="单据号范围">
          </div>
      </div>
      
      <div class="report_data">
            <div class="block until" data-txt="至">
              <el-date-picker size="mini" v-model="beginTime" @change="getTimeData" type="date" placeholder="选择开始时间" :picker-options="pickerOptions1"></el-date-picker>
            </div>
            <div class="block">
              <el-date-picker size="mini" v-model="endTime" @change="overTimeDate" type="date" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
            </div>
      </div>

      <div class="reset">
        <div class="reset-btn" @click="resetData">
          重置
        </div>
      </div>

    </div>
    <!-- 会员 -->
    <div class="operate-bar-bottom" v-else-if="panelType === 2">
      <div class="search">
          <input type="text" v-model="keyWord" placeholder="请输入关键字" @keyup.enter="batchAddByOrderNum">
          <div class="search-btn" @click="batchAddByOrderNum">
              <i class="iconfont icon-sousuo"></i>
          </div>
      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="storageLocationWrap"
            :propsList="shopDataList"
            :allName="'全部'"
            titleData="店铺名称"
            @dataBack="dataBackShopidList"
        ></alone-drop-down-colums>
      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="shoppeopleWrap"
            :propsList="storePersonnel"
            :allName="'全部'"
            titleData="店铺人员"
            @dataBack="dataBackShopidPeopleList"
        ></alone-drop-down-colums>
      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="memberTypeWrap"
            :propsList="memberTypeConfig"
            titleData="会员类型"
            @dataBack="dataBackmembermemberType"
        ></alone-drop-down-colums>
      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="memberTypeGradeWrap"
            :propsList="gradeListConfig"
            titleData="会员级别"
            @dataBack="dataBackGrade"
        ></alone-drop-down-colums>
      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="memberFollowWrap"
            :propsList="followTypeListConfig"
            titleData="跟进状态"
            @dataBack="dataBackFollowType"
        ></alone-drop-down-colums>
      </div>

      <div class="search-block t-center">
        <alone-drop-down-colums 
            ref="memberOriginWrap"
            :propsList="memberOriginListConfig"
            titleData="会员来源"
            @dataBack="dataBackMemberOrigin"
        ></alone-drop-down-colums>
      </div>

      <downInputMember
        ref="moreWrap"
        class="ml-10"
        @filterData="filterData"
        titleName="更多筛选"
      ></downInputMember>

      <div class="reset">
        <div class="reset-btn" @click="resetData">
          重置
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {getProductTypeList, seekProductClassList, seekGetShopListByCo, showCounterList, seekRepositoryList,seekSettingUserRole,seekGetDepUserList,seekGetShopUserList} from "Api/commonality/seek"
import dropDownColums from 'base/menu/drop-down-colums'
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
import littleBatch from './little-batch'
import DownMenu from 'base/menu/DownMenu'
import downInput from 'base/menu/down-input'
import downInputMember from 'base/menu/down-input-member'
import * as jurisdictions from 'Api/commonality/jurisdiction'
import DropDownMenu from '@/components/template/DropDownMenu'
export default {
  props:['panelType','serchKey'],
  components: {
    dropDownColums,
    DropDownMenu,
    littleBatch,
    DownMenu,
    downInput,
    aloneDropDownColums,
    downInputMember
  },
  data () {
    return {
      isShowCost: '',
      keyWord: this.serchKey,
      tabSwitch: false,
      repositoryList: [], // 仓库列表
      shopDataList: [],
      filterCondition: {
        keyWord: '',
        // newOrderId: '',
        // page: '1',
        // pageSize: '30',
        // storageId: [],
        // shopId: [],
        // productTypeId: [],
        // colourId: [],
        // jeweId: [],
        // jewelryId: [], // 首饰类别
        // productStatus: [], // 产品状态
        // sortList: []
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
            name: "已销退"
        },
        {
            id: "91",
            name: "销退中"
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
        // {
        //     id: "100",
        //     name: "店铺收货"
        // },
        // {
        //     id: "101",
        //     name: "仓库收货"
        // }
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
            name: "退库单",
            type: "01"
          },
          {
            name: "发货单",
            type: "03"
          },
          {
            name: "退货单",
            type: "04"
          },
          {
            name: "销售单",
            type: "04"
          },
          {
            name: "调柜单",
            type: "06"
          },
          {
            name: "调库单",
            type: "07"
          },
          {
            name: "修改单",
            type: "10"
          },
          {
            name: "服务单",
            type: "11"
          }
      ],
      beginTime:'',
      endTime:'',
      pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
      },
      // 商品状态
      "productClassListConfig":[
        {
          isDefault:'N',
          name: '成品',
          id: '1'
        },
        {
          isDefault:'N',
          name: '旧料',
          id: '2'
        }
      ],
      // 人员类型
      "userTypeListConfig": [
        {
          id: '1',
          name: '接待人'
        },
        {
          id: '2',
          name: '制单人'
        },
        {
          id: '3',
          name: '审核人'
        },
        {
          id: '4',
          name: '销售人'
        },
        {
          id: '5',
          name: '收货人'
        },
        {
          id: '6',
          name: '收银人'
        },
      ],
      // 选择人员
      selectPersonnelConfig: [],
      // 单据类型
      "orderTypeListConfig":[
        {
          id: '01',
          name: '入库'
        },
        {
          id: '02',
          name: '退库'
        },
        {
          id: '03',
          name: '发货'
        },
        {
          id: '04',
          name: '退货'
        },
        {
          id: '05',
          name: '销售/回购'
        },
        {
          id: '06',
          name: '调柜'
        },
        {
          id: '07',
          name: '调库'
        },
        {
          id: '10',
          name: '修改'
        },
        {
          id: '11',
          name: '服务'
        },
      ],
      // 单据起始结束时间
      orderBegin: '',
      orderEnd:'',

      // 店铺人员列表
      storePersonnel: [],
      // 会员类型
      "memberTypeConfig":[
        {
          id: '1',
          name: '私有'
        },
        {
          id: '2',
          name: '共有'
        },
        {
          id: '3',
          name: '公共'
        },
      ],
      // 会员级别
      "gradeListConfig":[
        {
          id:'1',
          name: '普通'
        },
        {
          id:'2',
          name: '中级'
        },
        {
          id:'3',
          name: '重要'
        },
      ],
      // 跟进状态
      "followTypeListConfig":[
        {
          id: '1',
          name: '待跟进'
        },
        {
          id: '2',
          name: '已跟进'
        },
        {
          id: '3',
          name: '未跟进'
        },
        {
          id: '4',
          name: '已放弃'
        },
        
      ],
      // 会员来源
      "memberOriginListConfig": [
        {
          id: '1',
          name: '小程序'
        },
        {
          id: '2',
          name: '人工'
        }
      ]
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
    this.getOperatorList()

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
      this.keyWord = ''
      if(this.panelType == 0) {
        this.$refs.storageLocationWrap.reset()
        this.$refs.shopWrap.reset()
        this.$refs.moreWrap.reset()
        this.$refs.jewelryIdWrap.reset()
        this.$refs.jeweIdWrap.reset()
        this.$refs.colourIdWrap.reset()
        this.$refs.productTypeIdWrap.reset()
        this.$refs.productClassWrap.reset()
        this.$refs.productStateWrap.reset()
      }      
      if(this.panelType == 1) {
        this.$refs.storageLocationWrap.reset()
        this.$refs.shopWrap.reset()
        this.$refs.peopleTypeWrap.reset()
        this.$refs.peopleWrap.reset()
        this.$refs.stateWrap.reset()

        this.orderBegin = ''
        this.orderEnd = ''

        this.beginTime = ''
        this.endTime = ''

        this.filterCondition['startTime'] = ''
        this.filterCondition['endTime'] = ''

        this.filterCondition['orderBegin'] = ''
        this.filterCondition['orderEnd'] = ''
      }
      if(this.panelType == 2) {
        this.$refs.storageLocationWrap.reset()
        this.$refs.shoppeopleWrap.reset()
        this.$refs.memberTypeWrap.reset()
        this.$refs.memberTypeGradeWrap.reset()
        this.$refs.memberFollowWrap.reset()
        this.$refs.memberOriginWrap.reset()
        this.$refs.moreWrap.reset()
      }
      this.$emit('resetData')

      console.log('重置')
    },
    batchAddByOrderNum () {
      if (!this.keyWord) {
        this.$message({
          message: '请输入关键字',
          type: 'warning'
        })
        return
      }
      let options = {
        keyWord: this.keyWord
      }
      this.$emit('seekProduct', options)
    },
    storageLocation (parm) {
      if(this.panelType === 0) {
        this.filterCondition.storageList = this.conversionData(parm.bigList,'storageId')
        this.$emit('filterData', this.filterCondition)
      }
      
      if(this.panelType === 1) {
        this.filterCondition.repositoryList = this.conversionData(parm.bigList,'repositoryId')
        this.$emit('filterData', this.filterCondition)
      }
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

              let dpData = {
                  id: '2',
                  name:'店铺人员',
                  childrenList: [],
                }

              // 获取店铺人员
              res.data.data.shopList.forEach(item => {
                
                let shopData = {
                  page: 1,
                  pageSize: 9999,
                  shopId:item.shopId
                }
                
                seekGetShopUserList(shopData).then(res => {
                  if(res.data.state == 200) {
                    console.log('看看看这里的数据',res.data)
                    res.data.data.shopUserList.forEach(i => {
                      let option = {}                      
                      option.id = i.userId
                      option.name = i.userName
                      dpData.childrenList.push(option)
                      this.storePersonnel.push(option)
                    })
                  }
                })
              })

              this.selectPersonnelConfig.push(dpData)
              
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

          console.log('看看店铺传过去的数据',this.shopDataList)
          
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
      // 字符串的 截取 因为 知道 字段不会出现Id
      let len = parm.keyName.length
      let key = parm.keyName.slice(0,len-2) + 'List'
      
      this.filterCondition[key] = this.conversionData(parm.samllList,parm.keyName)
      this.$emit('filterData', this.filterCondition)
    },
    // 店铺id
    dataBackShopList (parm) {
      this.filterCondition.shopList = this.conversionData(parm.bigList,'shopId')
      this.$emit('filterData', this.filterCondition)
    },
    dataBackProductTypeId (parm) { // 产品类别过滤
      this.filterCondition.productStatusList = this.conversionData(parm.bigList,'productStatusList')
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
    getTimeData(val) {
      console.log(val)
      if(val) {
        let beginTime = val.substr(0, 10).split('-').join("") + "000000"
        this.filterCondition['startTime'] = beginTime
        this.$emit('filterData', this.filterCondition)
      }
    },
    overTimeDate(val) {
      console.log(val) 
      if(val) {
        let endTime = val.substr(0, 10).split('-').join("") + "235959"
        this.filterCondition['endTime'] = endTime
        this.$emit('filterData', this.filterCondition)
      }
    },

    // 商品状态过滤
    dataBackProductClass (parm) {
      this.filterCondition.productClassList  = this.conversionData(parm.bigList,'productClass')
      this.$emit('filterData', this.filterCondition)
    },
    // 获取人员列表
    getOperatorList() {
      let options = {
          page: '1',
          pageSize: "9999"
        }
        seekGetDepUserList(options)
          .then(res =>{
            if (res.data.state === 200) {
              console.log(res.data.data.userList)
              let data = res.data.data.userList
              let gsData = {
                id: '1',
                name:'公司人员',
                childrenList: [],
              }
              
              data.forEach(item => {
                let option = {}
                if(item.role <= 3) {
                  option.id = item.userId
                  option.name = item.userName
                  gsData.childrenList.push(option)
                } else {
                  
                }
              })
              this.selectPersonnelConfig.push(gsData)

            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
    },
    // 单据范围筛选
    rangeOfScreening () {
      this.filterCondition['orderBegin'] = this.orderBegin
      this.filterCondition['orderEnd'] = this.orderEnd
      this.$emit('filterData', this.filterCondition)
    },
    // 单据的时间筛选
    timeToScreen () {
      this.filterCondition['startTime'] = this.beginTime
      this.filterCondition['endTime'] = this.endTime
      this.$emit('filterData', this.filterCondition)
    },
    // 会员类型的筛选
    dataBackmembermemberType(parm) {
      this.filterCondition.memberTypeList = this.conversionData(parm.bigList,'memberType')
      this.$emit('filterData', this.filterCondition)
    },
    // 会员级别的筛选
    dataBackGrade(parm) {
      this.filterCondition.gradeList = this.conversionData(parm.bigList,'grade')
      this.$emit('filterData', this.filterCondition)
    },
    // 跟进状态
    dataBackFollowType(parm) {
      this.filterCondition.followTypeList = this.conversionData(parm.bigList,'followType')
      this.$emit('filterData', this.filterCondition)
    },
    // 会员来源
    dataBackMemberOrigin(parm) {
      this.filterCondition.memberOriginList = this.conversionData(parm.bigList,'memberOrigin')
      this.$emit('filterData', this.filterCondition)
    },
    // 人员类型
    dataBackUserTypeList(parm) {
      this.filterCondition.userTypeList = this.conversionData(parm.bigList,'userType')
      this.$emit('filterData', this.filterCondition)      
    },
    // 店铺id
    dataBackShopidList(parm) {
      this.filterCondition.shopIdList = this.conversionData(parm.bigList,'shopId')
      this.$emit('filterData', this.filterCondition)  
    },
    // 库位id
    dataBackRepositoryList(parm) {
      this.filterCondition.repositoryList = this.conversionData(parm.bigList,'repositoryId')
      this.$emit('filterData', this.filterCondition)  
    },
    // 选择人员
    dataBackOperatorList(parm) {
      this.filterCondition.operatorList = this.conversionData(parm.samllList,'operatorId')
      this.$emit('filterData', this.filterCondition)  
    },
    // 单据类型
    dataBackOrderTypeList(parm) {
      this.filterCondition.orderTypeList = this.conversionData(parm.bigList,'orderType')
      this.$emit('filterData', this.filterCondition)
    },
    // 店铺人员
    dataBackShopidPeopleList(parm) {
      this.filterCondition.operatorList = this.conversionData(parm.bigList,'operatorId')
      this.$emit('filterData', this.filterCondition)
    },

    // 把数组转成数组对象
    conversionData(data=[],key) {
      let newData = []
      data.forEach(item => {
        let option = {}
        option[key] = item
        newData.push(option)
      })
      return newData
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
.d-c-filter-header-main.productList{
  border: 1px solid #fff;
  .operate-bar-bottom {
      height: 28px;
      margin-bottom: 15px;
      padding: 0 18px;
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
          font-weight: bold;
          line-height: 28px;
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
              height: 28px;
              &:hover {
                  color:#666;
                  background:#fff;
              }
              .title-name {
                  height: 28px;
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
              line-height: 28px;
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
  .reset{
    float: right;
  }
  .reset-btn{
    float: left;
    border: 1px solid #d6d6d6;
    color: #666;
    height: 28px;
    width: 60px;
    color: #2993f8;
    text-align: center;
    border-radius: 5px;
    line-height: 28px;
    font-size: 12px;
    cursor: pointer;
  }
  .cost-btn{
    float: left;
    font-size: 12px;
    display: block;
    margin-left: 10px;
    width: 52px;
    height: 28px;
    text-align: center;
    line-height: 28px;
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
.itemType {
  float: left;

  width: 302px;
  height: 28px;

  margin-left: 10px;

  border: 1px solid #d6d6d6;
  border-radius: 4px;

  position: relative;
  .dropColums-wrap {
    width: 90px;
    .tltle {
      margin-left: 12px;
    }
  }
  .divider {
    position: absolute;
    top: 3px;
    left: 90px;
    color: #d6d6d6;
  }
  .input_box {
    float: left;
    width: 200px;
    height: 28px;
    .input_box_before {
      width: 88px;
      height: 28px;
      padding: 0 7px;
      background: transparent;
      
    }
    .input_box_end {
      width: 88px;
      height: 28px;
      padding: 0 7px;
      background: transparent;
      
    }
  }
}
.report_data {
  float: left;

  width: 198px;
  height: 28px;

  margin-left: 10px;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  
  background-color: #fff;

  vertical-align: middle;
  overflow: hidden;

  .block {
    float: left;
    width: 50%;
    margin-top: 2px;
    position: relative;
    margin-left: 0 !important;
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      padding: 0;
      text-align: center;
      color: #2993f8;
      background-color: transparent;
      font-weight: bold;
      letter-spacing: -1px;
    }
    .el-input__icon {
      display: none;
    }
  }
  .block.until {
    &::after {
      content: attr(data-txt);
      position: absolute;
      right: -6px;
      top: 2px;
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
