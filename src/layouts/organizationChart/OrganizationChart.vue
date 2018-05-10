<template>
<transition name="tp-ani">
  <div class="organization-chart-main">
    <!-- <CompanyEdit
      :isWarden='isWarden'
      :shopDataList="shopDataList">
    </CompanyEdit> -->
    <section class="body-wrap">
    
      <div class="body-left-wrap">
        
        <DepUserList
          :updatas="updatas"
          class="member-list-main"
          :isSuperTube="isSuperTube"
          :isShopManager="isShopManager"
          :isShopMan="isShopMan"
          :headquarterTotal="headquarterTotal"
          :administratorList="administratorList"
          :inspectorList="inspectorList"
          :clerkList="clerkList"
          :shopDataList="shopDataList"
          :isWarden='isWarden'
          :isCompile="isCompile"
          @updateuserpromise="_updateuserpromise"
          @seekCompanyData="seekCompanyData"
          @_seekUserInfo="_seekUserInfo"
          @_seekSettingUserRole="_seekSettingUserRole"
          @_seekGetUserInfo="_seekGetUserInfo"
          @_seekShopInfo="_seekShopInfo"
          @_seekGetDepUserList="updataList"
          @getStoreList="getStoreList"
          @getRoleShowList="getRoleShowList"
          @getStoreAllList="getStoreAllList"
          @OrganizShopMan="OrganizShopMan"
        ></DepUserList>

        <CompanyDetail
          v-if="isSeekCompany"
          :isWarden="isWarden"
          :isCompile="isCompile"
          :shopDataInfo="shopDataInfo"
          :userInfo="userDataInfo"
          :settingUserRole="settingUserRole"
          @_seekUserInfo="_seekUserInfo"
          @_seekSettingUserRole="_seekSettingUserRole"
          @_seekGetUserInfo="_seekGetUserInfo"
          :userRoleDataList="userRoleDataList"
          :positionData="positionData"
          :isStoreManager="isStoreManager"
          class="member-details-wrap"
          @delUserRoleDataList="delUserRoleDataList"
          @addBtn="addBtn"
          @updataCompanyInfo="updataCompanyInfo"
        >
        </CompanyDetail>

        <template v-else>

          <MemberDetailsWrap
            v-if="isTemplate"
            :deleteRole="deleteRole"
            :editOrAddRole="editOrAddRole"
            :isSuperTube="isSuperTube"
            :updatas="updatas"
            :delStaffRole="delStaffRole"
            :isDelRole="isDelRole"
            :isWarden='isWarden'
            :isCompile="isCompile"
            :userInfo="userDataInfo"
            :isAddRole="isAddRole"
            :settingUserRole="settingUserRole"
            :userRoleDataList="userRoleDataList"
            :positionData="positionData"
            :isUserShopManager="isUserShopManager"
            :roleDataList="roleDataList"
            :storeData="storeData"
            :storeAllData="storeAllData"
            :showList="showList"
            :checkAll="checkAll"
            :lookShopMan="lookShopMan"
            :checkID="checkID"
            class="member-details-wrap"
            @delUserRoleDataList="delUserRoleDataList"
            @addBtn="addBtn"
            @_seekGetDepUserList="updataList"
          ></MemberDetailsWrap>

          <ShopDetails
            v-else
            :isWarden="isWarden"
            :isShopMan="isShopMan"
            :isCompile="isCompile"
            :shopDataInfo="shopDataInfo"
            :initShopInfo="initShopInfo"
            :userInfo="userDataInfo"
            :settingUserRole="settingUserRole"
            :userRoleDataList="userRoleDataList"
            :positionData="positionData"
            :isStoreManager="isStoreManager"
            class="member-details-wrap"
            @delUserRoleDataList="delUserRoleDataList"
            @addBtn="addBtn"
            @updateShopInfo="updateShopInfo"
            @updateInte="_seekShopInfo"
          ></ShopDetails>

        </template>

      </div>

      <DynamicsList class="body-right-wrap" :showList="dynamicList"></DynamicsList>
    </section>
    <AddRolePopup
      :userDataInfo="userDataInfo"
      :roleDataList="roleDataList"
      :userRoleDataList="userRoleDataList"
      :isQueryOption="isQueryOption"
      @queryOptionFun="queryOptionFun"
      ></AddRolePopup>
      <BuySussecc v-if="buySussecc"></BuySussecc>
  </div>
</transition>
</template>
<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'
import {seekGetDepUserList, seekGetShopListByCo, seekMemberList, seekGetUserApply, seekDynamic} from 'Api/commonality/seek'
import { lookStore } from 'Api/commonality/operate'
// import {seekGetUserInfo} from '../../src/Api/commonality/seek'
import {seekGetUserInfo} from '../../../src/Api/commonality/seek'
import {GetDateStr} from 'assets/js/getTime'
import {getRole} from 'assets/js/role'
import CompanyEdit from './CompanyEdit'
import DepUserList from './DepUserList'
import MemberDetailsWrap from './MemberDetailsWrap'
import AddRolePopup from './AddRolePopup'
import DynamicsList from './DynamicsList'
import ShopDetails from './ShopDetails'
import BuySussecc from './BuySussecc'
import CompanyDetail from './CompanyDetail'

  export default{
    components: {
      CompanyEdit,
      DepUserList,
      AddRolePopup,
      MemberDetailsWrap,
      DynamicsList,
      ShopDetails,
      BuySussecc,
      CompanyDetail
    },
    data () {
      return {
        userInfoData: {},
        dynamicList: [], // 动态
        updatas: false,
        buySussecc: false,
        headquarterTotal: '', // 总部人数
        isCompile: false, // 编辑状态
        isSeekCompany: true, // 查看公司状态
        isTemplate: true,
        isQueryOption: false, // 弹窗
        openAdministrator: false, // 管理员开关
        administratorList: [], // 管理员列表
        inspectorList:[], // 检查员列表
        clerkList: [], // 职员列表
        shopDataList: [], // 店铺列表
        roleDataList: [], // 权限列表
        userRoleDataList: [], // 用户当前权限列表
        AddRolePopup: true,
        settingUserRole: { // 用户数据加载权限
          timeRange: '1',
          costFlag: 'Y'
        },
        shopDataInfo: "", // 店铺信息
        // 操作用户的用户信息

        // 被操作的用户信息
        initShopInfo: '', // 原店铺数据
        userDataInfo: '', // 被操作的用户基本信息
        positionData: {}, // 被操作职位信息-->权限列表

        storeData:[],
        storeAllData:[],
        // headquartersShow:false
        showList: false,
        checkAll: false,
        lookShopMan: false,
        checkID:''
      }
    },
    computed: {
      ...mapGetters([
        'userPositionInfo'
      ]),
      deleteRole () { // 新删除权限
        // if (!this.isCompile) {
        //   return false
        // }
        let userPositionInfo = this.userPositionInfo.roleList // 操作者
        let positionData = this.positionData.roleList // 被操作者

        console.log('权限1',userPositionInfo)
        console.log('权限2',positionData)

        if (userPositionInfo && positionData) { // 操作者和被操作者都拿到
          if (this.userDataInfo) {
            if (this.userDataInfo.isCompany) { // 双重身份的情况下的---公司人员

              let A = this.filterCompanyRole(userPositionInfo)
              let B = this.filterCompanyRole(positionData)

              console.log('A',A)
              console.log('B',B)

              switch (B) {
                case '1': // 超管
                  return false;
                case '2': // 副管
                  if (A === '1') {
                    return true
                  }
                  return false
                case '3': // 职员
                  if (A === '1' || A === '2') {
                    return true
                  }
                  return false
                case '6': // 监察员
                  if(A === '1' || A === '2'){
                    return true
                  }
                  return false
              }
            } else { // 双重身份的情况下的---店铺人员
              let A = this.filterShopRole(userPositionInfo)
              let B = this.filterShopRole(positionData)

              let A2 = this.filterCompanyRole(userPositionInfo) // 改需求，管理员的情况下
              let A3 = this.filterShopRoleTwo(userPositionInfo) // 改需求，看是否是某个店长
              let B2 = this.filterShopRoleTwo(positionData) // 改需求，看是否是某个店长
              console.log(userPositionInfo)
              console.log(A)
              console.log(B)
              switch (B) {
                case '4': // 店长
                  return false;
                case '5': // 店员
                  console.log(11111111)
                  console.log(A2)
                  if (A == '4' && A.shopId ===  B.shopId ) {
                    console.log(A.shopId)
                    console.log(B.shopId)
                    return true
                  }
                  if (A2 === '1' || A2 === '2') { // 改需求，管理层都可以操作
                    return false
                  } 
                  return false
              }
            } 
          }
        }
        return false
      },
      editOrAddRole () { // 新 编辑和添加权限
        // if (!this.isCompile) {
        //   return false
        // }
        // console.log('双重身份的情况下的---公司人员', this.userDataInfo)
        // console.log(this.userPositionInfo.roleList)
        let userPositionInfo = this.userPositionInfo.roleList // 操作者
        let positionData = this.positionData.roleList // 被操作者
        if (userPositionInfo && positionData) { // 操作者和被操作者都拿到
          if (this.userDataInfo) {
            if (this.userDataInfo.isCompany) { // 双重身份的情况下的---公司人员
              let A = this.filterCompanyRole(userPositionInfo)
              let B = this.filterCompanyRole(positionData)
              let A1 = this.filterShopRole(userPositionInfo)
              let B1 = this.filterShopRole(positionData)
              // console.log("被操作者:"+B);
              // console.log('操作者A：'+A+"---操作者A1："+A1);
              switch (B) {
                case '1': // 超管
                  if(A== '2' || A1=="4"){
                      return true;
                  }
                  return false;
                  // if (A1 == '4' || A1 == '5') {
                  //   return true
                  // } else {
                  //   return false;
                  // }
                case '2': // 副管
                  if (A == '1') {
                    return true
                  }
                  if (A1 == '4' || A1 == '5') {
                    return true
                  }
                  return false
                case '3': // 职员
                  if (A == '1' || A == '2') {
                    return true
                  }
                  return false
              }
            } else { // 双重身份的情况下的---店铺人员
              // console.log('来到了撒谎从userPositionInfo', userPositionInfo)
              // console.log('来到了撒谎从positionData', positionData)
              let A = this.filterShopRole(userPositionInfo)
              let B = this.filterShopRole(positionData)

              let A2 = this.filterCompanyRole(userPositionInfo) // 改需求，管理员的情况下
              let A3 = this.filterShopRoleTwo(userPositionInfo) // 改需求，看是否是某个店长
              let B2 = this.filterShopRoleTwo(positionData) // 改需求，看是否是某个店长

              // console.log('看被操作者是啥A3', A3)
              // console.log('看被操作者是啥B2', B2)
              // console.log('看被操作者是啥A', A)

              switch (B) {
                case '4': // 店长
                  // return true
                  if (A2 == '1' || A2 == '2') {
                    return true
                  }
                  return false
                case '5': // 店员
                  if (A2 == '1' || A2 == '2') { // 改需求，管理层都可以操作
                    return true
                  }
                  if (A == '4' && A3.shopId ==  B2.shopId ) {
                    return true
                  }
                  return false
              }
            } 
          }
        }
        return false
      },
      isAddRole () { // 添加权限 // 管理员
        if (this.userDataInfo) {
          if (this.userDataInfo.userId === sessionStorage.id) {
            return false
          }
        }
        if (this.isSuperTube) {
          return true
        }
      },
      delStaffRole () { // 删除职员
        if (this.positionData.roleList) {
          if (this.isSuperTube && !getRole('1', this.positionData.roleList)) {
            return true
          }
          if (this.isWarden && getRole('3', this.positionData.roleList)) {
            return true
          }
        }
        return false
      },
      delShopStaffRole () { // 删除店员
        if (this.positionData.roleList) {
          if (this.isShopManager && getRole('5', this.positionData.roleList)) {
            return true
          } 
        }
        return false
      },
      isDelRole () { // 删除
        if (this.isShopManager && getRole('5', this.positionData.roleList)) { // 操作是店长，被操作是店员
          return this.delShopStaffRole
        }

        if (this.isWarden || getRole('3', this.positionData.roleList)) { // 操作的用户是副管理员，被操作的用户是职员
          return this.delStaffRole
        }
        if (this.isWarden && getRole('4', this.positionData.roleList)) { // 操作是管理员，被操作是店长
          return this.delShopStaffRole
        }
        // if (getRole('2', this.positionData.roleList) || getRole('3', this.positionData.roleList)) { // 操作的用户是副管理员，被操作的用户是职员
        //   return this.delStaffRole
        // }
        // if (getRole('2', this.userPositionInfo.roleList) || getRole('3', this.positionData.roleList)) { // 操作的用户是副管理员，被操作的用户是职员
        //   return this.delStaffRole
        // }

        return false
      },
      isSuperTube () { // 超级管理员
        if (this.userPositionInfo.roleList) {
          return getRole('1', this.userPositionInfo.roleList)
        }
        return false
      },
      isWarden () { // 管理员或副管理员
        if (this.userPositionInfo.roleList) {
          console.log(this.userPositionInfo.roleList)
          for (let i of this.userPositionInfo.roleList) {
            if (i.role === '1' || i.role === '2') {
              return true
            }
          }
        }
        return false
      },
      isShopMan () { // 店长
        if (this.userPositionInfo.roleList) {
          for (let i of this.userPositionInfo.roleList) {
            if (i.role === '4') {
              return true
            }
          }   
        }
        return false
      },
      isUserShopManager () { // 被操作的用户是店长
        if (this.positionData.roleList) {
          return getRole('4', this.positionData.roleList)
        }
        return false
      },
      isShopManager () { // 店长
        if (this.userPositionInfo.roleList) {
          return getRole('4', this.userPositionInfo.roleList)
        }
        return false
      },
      isStoreManager () { // 店员
        if (this.userPositionInfo.roleList) {
          for (let i of this.userPositionInfo.roleList) {
            if (i.role === '4') {
              return true
            }
          }   
        }
        return false
      },
      getRoleUsr(){
        let userPositionInfo = this.userPositionInfo.roleList // 操作者
        console.log('重新操作')
        // 遍历操作者权限
        for (let index = 0; index < userPositionInfo.length; index++) {
          if(userPositionInfo[index].role === '1' || userPositionInfo[index].role === '2'){
            sessionStorage.setItem('guanliyuan',true)
          }else {
            sessionStorage.setItem('guanliyuan','')            
          }
          if(userPositionInfo[index].role === '1' || userPositionInfo[index].role === '2' || userPositionInfo[index].role === '3' || userPositionInfo[index].role === '6'){
            // this.headquartersShow = true
            sessionStorage.setItem('headquartersShow',true)
            return;
          }
        }
        sessionStorage.setItem('headquartersShow',false)        
      }
    },
    created () {
      this._seekGetDepUserList()
      this._seekGetShopListByCo()
      this.successTit()
      this._seekDynamic(sessionStorage.id)
      console.log(this.$route)
      if (this.$route.query.isRefresh == true) {
        location.reload()
      }
      this.getRoleUsr()

      // 初始话店铺列表
      // this.seekStoreList()
    },
    methods: {
      updataCompanyInfo () { // 更新公司列表信息
        this._seekGetDepUserList()
      },
      updateShopInfo () { // 更新店铺列表信息
        this._seekGetShopListByCo()
      },
      seekCompanyData () {
        this.isSeekCompany = true
        // console.log('查看公司信息')
      },
      filterCompanyRole (parm) { // 提取公司角色
        // console.log('好的好的好的好的', parm)
        for (let i of parm) {
          switch (i.role) {
            case '1':
              return '1';
            case '2':
              return '2'
            case '3':
              return '3'
            case '6':
              return '6'
          }
        }
      },
      filterShopRole (parm) { // 提取店铺角色
        // console.log('好的好的好的好的2', parm)
        for (let i of parm) {
          switch (i.role) {
            case '4':
              return '4';
            case '5':
              return '5'
          }
        }
      },
      filterShopRoleTwo (parm) { // 提取店铺角色 --> 改需求
        // console.log('好的好的好的好的2', parm)
        for (let i of parm) {
          switch (i.role) {
            case '4':
              return {
                role: '4',
                shopId: i.shopId
              }
            case '5':
              return {
                role: '5',
                shopId: i.shopId
              }
          }
        }
      },
      successTit () {
        var callBackHash = location.hash
        var isSuccessNum = callBackHash.indexOf('is_success')
        if (isSuccessNum !== -1) {
          var isSuccess = callBackHash.slice(isSuccessNum + 11, isSuccessNum + 12)
          if (isSuccess === 'T') {
            var outTradeNoNum = callBackHash.indexOf('out_trade_no')
            var outTradeNoMinutes  = location.hash.slice(outTradeNoNum + 23, outTradeNoNum + 25)
            var outTradeNoHours  = location.hash.slice(outTradeNoNum + 21, outTradeNoNum + 23)
            var newTime = new Date()
            var newMinutes = newTime.getMinutes()
            var newHours = newTime.getHours()
            if (outTradeNoHours - newHours === 0) {
              if (newMinutes - outTradeNoMinutes < 2) {
                 this.buySussecc = true
              }
            }
          }
        }
      },
      updataList () {
        this._seekGetDepUserList()
        this._seekGetShopListByCo()
      },
      setCompile () {
        this.isCompile = !this.isCompile
      },
      _seekUserInfo (parm) {
        this.userDataInfo = parm
        this._seekGetUserApply(this.userDataInfo.userId, '1')
        this._seekGetUserApply(this.userDataInfo.userId)
        this._seekDynamic(this.userDataInfo.userId)
      },
      _seekSettingUserRole (parm) {
        this.settingUserRole = parm
      },
      _seekGetUserInfo (parm) {
        this.isSeekCompany = false
        this.isTemplate = true
        this.positionData = parm
      },
      _seekShopInfo (parm) {
        this.isSeekCompany = false
        this.isTemplate = false
        this.shopDataInfo = parm;
        //修改数据的时候，，这个位置 parm 为空 ，，需要加判断
        if(parm != null && parm != '' && parm != undefined){
            this.initShopInfo = JSON.parse(JSON.stringify(parm))
        }
        // this.initShopInfo = parm
      },
      addBtn () {
        this.isQueryOption = true
      },
      delUserRoleDataList (index) {
        this.userRoleDataList.splice(index, 1)
        this._seekGetUserApply(this.userDataInfo.userId, '1')
        // this._seekGetUserApply(this.userDataInfo.userId)
      },
      queryOptionFun (parm) {
        this.isQueryOption = parm
        this._seekGetUserApply(this.userDataInfo.userId, '1')
        this._seekGetUserApply(this.userDataInfo.userId);
        this.userRoleList();
        eventBus.$emit("updateRoleList")
      },
      _seekGetUserApply (parm, type) {//获取到应用权限列表及权限状态
        let options = {
          type: type,
          userId: parm,
          page: 1,
          pageSize: '999'
        }
        seekGetUserApply(options)
          .then(res => {
            console.log('修改权限完成后的返回:',res);
            if (res.data.state === 200) {
              this.userRoleList();
              if (type === '1') {
                this.roleDataList = res.data.data.applyList
              } else {
                this.userRoleDataList = res.data.data.applyList
              }
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _updateuserpromise(){
         this.userRoleList();
      },
       userRoleList () {
            let options = {
                userId: sessionStorage.getItem('id')
            }
            //console.log('获取角色ID：',options);
            seekGetUserInfo(options).then((res) => {
                //this.$router.push({path: '/member/login'})
                //console.log('修改完之后刷新本地登录角色数据:',res);
                this.userInfoData = res.data.data
                for (let i = 0; i < this.userInfoData.roleList.length; i++) {
                if (this.userInfoData.roleList[i].role == 1 || this.userInfoData.roleList[i].role == 2 || this.userInfoData.roleList[i].role == 3) {
                    this.userType = 1 // 公司职员
                    //this.dataType = 1
                    this.isCompany = true
                    if (this.userInfoData.roleList[i].role == 1) {
                    sessionStorage.setItem('companyPosition', '1') // 超管
                    } else if (this.userInfoData.roleList[i].role == 2) {
                    sessionStorage.setItem('companyPosition', '2') // 管理
                    } else if (this.userInfoData.roleList[i].role == 3) {
                    sessionStorage.setItem('companyPosition', '3') // 职员
                    }
                } else if (this.userInfoData.roleList[i].role == 4) {
                    this.userType = 2 // 店长
                    //this.dataType = 2
                    this.shopLength = this.userInfoData.roleList.length
                    this.shopList = this.userInfoData.roleList
                    this.shopId = this.userInfoData.roleList[0].shopId
                    this.isShop = true
                    sessionStorage.setItem('companyPosition', '4') // 店长
                } else if (this.userInfoData.roleList[i].role == 5) {
                    this.userType = 3 // 店员
                    //this.dataType = 3
                    this.isShop = true
                    sessionStorage.setItem('companyPosition', '5') // 店员
                }
                }
                if (this.isShop == true && this.isCompany == true) {
                this.multipleIdentities = true
                sessionStorage.setItem('multipleIdentities', 'Y')
                } else {
                sessionStorage.setItem('multipleIdentities', 'N')
                }
                sessionStorage.setItem('userType', this.userType)
                
                if (sessionStorage.getItem('userType') == 2) {
                this.shopManage = true
                }
            }, (res) => {
            })
        },
      _seekGetDepUserList () {
        this.updatas = true
        let options = {
          page: '1',
          pageSize: "9999"
        }
        seekGetDepUserList(options)
          .then(res =>{
            if (res.data.state === 200) {
              this.updatas = false
              this.clerkList = []
              this.headquarterTotal = res.data.data.total
              this.administratorList = []
              this.inspectorList = []
              for (let j of res.data.data.userList) {
                if (j.role === "3") {
                  this.clerkList.push(j)
                } else if(j.role === "4"){
                  this.inspectorList.push(j)
                } else {
                  this.administratorList.push(j)
                }
              }
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _seekGetShopListByCo () {
        let options = {
          page: '1',
          pageSize: "9999"
        }
        seekGetShopListByCo(options)
          .then(res => {
            if (res.data.state === 200) {
              this.shopDataList = res.data.data.shopList
              let _self = this
              res.data.data.shopList.forEach(function (element, index) {
                _self._seekMemberList(element.shopId, index)
              })
            } else {
              this.$store.dispatch('workPopupError', res.data.msg)
            }
          })
      },
      _seekMemberList (shopId, index) {
        let options = {
          type: 2,
          shopId: shopId
        }
        seekMemberList(options)
          .then(res => {
            if (res.data.state === 200) {
              let storeManager = []
              let shopAssistant = []
              for (let j of res.data.data.dataList) {
                if (j.role === "店长") {
                  storeManager.push(j)
                } else {
                  shopAssistant.push(j)
                }
              }
              Vue.set(this.shopDataList[index], 'storeManager', storeManager)
              Vue.set(this.shopDataList[index], 'shopAssistant', shopAssistant)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _seekDynamic (parm) { // 动态
        let options = {
          type: 3,
          companyId: sessionStorage.companyId,
          shopId: '',
          userId: parm,
          page: '1',
          pageSize: '9999',
          startTime: GetDateStr(-2),
          endTime: GetDateStr(0)
        }
        seekDynamic(options)
          .then(res => {
            if (res.data.state === 200) {
              this.dynamicList = res.data.data.dateList
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      getStoreList(parm){
        let options = {
          userId: parm,
          type: '1'
        }

        lookStore(options).then(res => {
          if(res.data.state === 200){
            console.log(res.data.data.dataList)
            this.storeData = res.data.data.dataList
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        })
      },
      getStoreAllList(parm){
        this.checkID = parm
        let options = {
          userId: parm,
          type: '3'
        }

        console.log('123321123',options)

        lookStore(options).then(res => {
          if(res.data.state === 200){
            console.log('66666666666666',res.data.data.dataList)
            this.storeAllData = res.data.data.dataList
            this.checkAll = this.checekAllRole(res.data.data.dataList)
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        })

      },
      seekStoreList(){
        let options = {
          userId: sessionStorage.getItem('id'),
          type: '1'
        }
        console.log(options)
        lookStore(options).then(res => {
          if(res.data.state === 200){
            console.log('初始化请求啦',res.data.data.dataList)
            this.storeData = res.data.data.dataList
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        })
      },
      getRoleShowList(parm){
        if(sessionStorage.getItem('guanliyuan') === 'true'){
          if(parm == '1' || parm == '2'){
            this.showList = true
          } else {
            this.showList = false
          }
        } else {
            this.showList = true          
        }
      },
      checekAllRole(data){
        console.log('checkAll',data)
        let count = 0
        for(let i = 0;i<data.length;i++){
          if(data[i].status === 'N'){
            count++
          }
        }
        if(count === data.length){
          return true
        } else {
          return false
        }
      },
      OrganizShopMan(val){
        console.log('OrganizShopMan',val)
        this.lookShopMan = val
      }
    },
    mounted(){
    },
    updated(){
    }
  }
</script>
<style lang="scss" scoped>
@import "~assets/css/color.scss";
.organization-chart-main{
  width: 1250px;
  margin: 70px auto 0 auto;
  box-sizing: border-box;
  .body-wrap{
    width: 100%;
    // height: 620px;
    // height: 740px;
    height: 900px;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 0;
    .body-left-wrap, .body-right-wrap{
      vertical-align: top;
    }
    .body-left-wrap{ 
      position: relative;
      display: inline-block;
      height: 100%;
      width: 970px;
      border-radius: 5px;
      margin-right: 20px;
      background-color: #fff;
      box-shadow: $BS-1;
      .body-option-icon{
        position: absolute;
        right: 20px;
        top: 20px;
        height: 14px;
        width: 14px;
        background: url('./../../assets/img/option-icon.png') no-repeat;
        background-size: 14px;
        cursor: pointer;
        z-index: 300;
      }
      .member-list-main{
        display: inline-block;
        vertical-align: top;
        width: 232px;
        height: 100%;
        //overflow-y: auto;
        //overflow-x: auto;
        background-color: #fbfbfb;
      }
      .member-details-wrap{
        display: inline-block;
        width: 738px;
        height: 100%;
        box-shadow: -1px 0 3px 1px rgba(0,0,0,0.04);
      }
    }
    .body-right-wrap{
      display: inline-block;
      height: 100%;
      width: 260px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 0 10px #ccc;
    }
  }
}
</style>