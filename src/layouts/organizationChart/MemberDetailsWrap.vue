<template>
  <div class="member-details-main" @click.self="operateNum = null">
    <h3>{{userInfo.userName}}详情</h3>
    
    <section class="member-body-wrap">
      <h4 class="title-icon-wrap member-title">
        <i></i>
        <span>个人信息</span>
      </h4>
      <div class="member-body-inner">
        <div class="logo-wrap">
          <!-- <img :src="userInfo.userLogo" alt=""> -->
          <FormatImg :logo="userInfo.userLogo" class="img" :userName="userInfo.userName" :size="120"></FormatImg>
          <p><span>{{userInfo.userName}}</span><i :class="{man: userInfo.sex == '1', woman: userInfo.sex == 2}"></i></p>
        </div>
        <ul class="tit-wrap" @click.stop="flag = null">
          <li>
            <span>电话</span>
            <span>{{userInfo.phone}}</span>
          </li>
          <li>
            <span>邮箱</span>
            <span>{{userInfo.email}}</span>
          </li>
          <li class="set-role-wrap select-w120">
            <span>职位</span>
            <span style="height: 32px;line-height: 32px">{{roleName}}</span>
          </li>
          <li style="margin-bottom: 25px">
            <span>查看成本</span>
            <Switchs v-if="editOrAddRole && operateNum == 2 || Doubleid" :isDelRole="editOrAddRole" :sex="settingUserRole.costFlag" @switchsChange="setCostFlag"></Switchs>
            <span @click.stop="operateNum = 2" v-else style="height: 20px;line-height: 20px">{{settingUserRole.costFlag == 'Y' ? '是' : '否'}}</span>

          </li>

          <li style="margin-bottom: 25px">
            <span>限制登录</span>

            <template v-if="editOrAddRole && operateNum == 5 || Doubleid3">
              <div class="xj-radio-wrap" @click.stop="setPermissions('1')">
                <div class="xj-radio-inner"><i :class="{'actions-radius': permissions == '1'}"></i></div><span>正常</span>
              </div>
              <div class="xj-radio-wrap" @click.stop="setPermissions('2')">
                <div class="xj-radio-inner"><i :class="{'actions-radius': permissions == '2'}"></i></div><span>冻结</span>
              </div> 
            </template>
            <span @click.stop="checkPer()" v-else>{{permissions == '1' ? '正常' : '冻结'}}</span>
            <!-- <Switchs v-if="editOrAddRole && operateNum == 5 || Doubleid" :isDelRole="editOrAddRole" :sex="settingUserRole.permissions" @switchsChange="setPermissions"></Switchs>
            <span @click.stop="operateNum = 5" v-else style="height: 20px;line-height: 20px">{{settingUserRole.permissions == 'Y' ? '正常' : '冻结'}}</span> -->

          </li>
          <!-- <li><span>  </span><span>是否可以编辑 {{editOrAddRole}}是否是双身份（管理员店长）{{Doubleid}}</span></li> -->
          <li v-if="settingUserRole">
            <span>查看时间</span>
            <!-- && settingUserRole.costFlag == 'Y' -->
            <template v-if="editOrAddRole && operateNum == 3">
              <div class="xj-radio-wrap" @click.stop="setTimeRequest('1')">
                <div class="xj-radio-inner"><i :class="{'actions-radius': settingUserRole.timeRange == '1'}"></i></div><span>不限</span>
              </div>
              <div class="xj-radio-wrap" @click.stop="setTimeRequest('2')">
                <div class="xj-radio-inner"><i :class="{'actions-radius': settingUserRole.timeRange == '2'}"></i></div><span>近45天</span>
              </div> 
            </template>
            <span @click.stop="operateNum = 3" v-else>{{settingUserRole.timeRange == '1' ? '不限' : '近45天'}}</span>
          </li>
          <li>
            <span>地址</span>
            <span>{{userInfo.provinceName}}{{userInfo.cityName}}{{userInfo.areaName}}</span>
          </li>
          <li>
            <span>详细地址</span>
            <span>{{userInfo.address}}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="role-list-wrap">
      <h4 class="title-icon-wrap role-title">
        <i></i>
        <span>应用权限</span>
      </h4>
      <ul class="user-role-list">
        <div>
          <li v-if="item" v-for="(item, index) in userRoleDataList" :key="index">
            {{item.applyName}}
            <i class="del-icon"  v-if="item.editable == 'Y' && editOrAddRole" @click.stop="_operateOperateApplyByUserId(item.applyId, index)"></i>
          </li>
          <!-- v-show="roleDataList.length" 加在 i 标签中 -->
          <li class="add-style" v-if="editOrAddRole && roleDataList.length > 0" @click.stop="addBtn">
            <img src="~assets/img/add-bg.png" alt="">
       <!--      <img src="./../../assets/images/3x/add-bg.png" alt=""> -->
          </li>
        </div>
      </ul>
    </section>

    <!-- 店铺查看权限 -->
    <template v-if="!lookShopMan">
    <section v-if="showList && ListShow" class="store-list-wrap">
      <h4 class="title-icon-wrap store-title">
        <i></i>
        <span>查看店铺权限</span>
      </h4>
      <ul class="check-store-list">
        <li v-for="(item,index) in storeData" :key="index"><span>{{item.shopNamem}}</span></li>
      </ul>
    </section>

    <section v-else class="store-list-wrap">
      <h4 class="title-icon-wrap store-title">
        <i></i>
        <span>查看店铺权限</span>
        <el-checkbox v-model="checked" @change="storeCheckAll"><span>全选</span></el-checkbox>
      </h4>
      <el-checkbox-group v-model="checkitemLits" @change="itemCheckend">
        <el-checkbox v-for="(item,index) in checkList" :key="index" :label="item.shopId"><span>{{item.shopNamem}}</span></el-checkbox>
      </el-checkbox-group>
      <!-- <ul class="check-store-list">
        <li class="nodedian" v-for="(item,index) in checkList" :key="index"><el-checkbox v-model="item.status" @change="itemCheckend()" :checked="item.status === 'Y' ? true : false"><span>{{item.shopNamem}}</span></el-checkbox></li>
      </ul> -->
    </section>

    </template>
    
    <a class="del-staff el-icon-delete" v-if="deleteRole" href="javascript: void(0)" @click.stop="delDialog = true"></a>
    <!-- <a class="del-staff" v-if="isDelRole && delDualRole" href="javascript: void(0)" @click="_operatePrivilege">删除员工</a> -->
    <el-dialog :visible.sync="delDialog" customClass="delDig">
      <div class="body">
        <div class="title">
          <img src="./../../../static/img/bohui.png">
          <span>删除确认</span>
        </div>
        <div class="main">
            是否确定删除该成员？
            <div class="btn" @click.stop="_operatePrivilege">确定</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import {operateOperateApplyByUserId, operateLoginPermissions, operateUserSetting, operatePrivilege,addOrdelInspect,lookStore,setShopSee} from 'Api/commonality/operate'
  import {seekUserInfo, seekSettingUserRole, seekGetUserInfo, seekShopInfo} from 'Api/commonality/seek'
  import {statusPosition} from 'Api/commonality/status'
  import Switchs from 'base/switch/Switchs'
  import FormatImg from 'components/template/DefaultHeadFormat.vue'
  export default{
    components: {
      Switchs,
      FormatImg
    },
    props: ['deleteRole', 'editOrAddRole', 'roleDataList', 'userRoleDataList', 'userInfo', 'settingUserRole', 'positionData', 'isCompile', 'isWarden', 'isDelRole', 'isAddRole', 'delStaffRole', 'isUserShopManager', 'isSuperTube','showList','storeAllData','checkAll','lookShopMan','checkID'], // 删除权限, 编辑权限, 添加的权限
    data () {
      return {
        permissions: '',
        //timeRange :'1' 45天  '2' 不限   costFlag:'Y' 开启成本 'N'关闭成本
        Doubleid:false,//这个用于限制是否是  管理员与店长  两个同时拥有的身份
        userPromise:3,
        flag: '',
        isRedact: true,
        delDialog: false,
        radio: 1,
        operateNum: null,
        value1: true,
        //costFlag: false,
        // roleName: '',
        isSetRol: true,
        roleName: '',
        applyDepartmentList: [
          {
            name: '管理员',
            id: '5'
          },
          {
            name: '职员',
            id: '6'
          }
        ],
        ListShow: true,
        // checkShow: false,
        checked: '',
        checkList: [],
        checkitemLits: [],
        valLength:0,
        storeData:[]
      }
    },
    watch: {
      'settingUserRole.costFlag' () {
        // if (this.settingUserRole.costFlag === 'Y') {
        //   this.costFlag = true
        // } else {
        //   this.costFlag = false
        // }
      },
      'operateNum' (val) {
        if (val != 1) {
          //this.getRoleName()
        }
      },
      'userInfo' (val) {
        // console.log('啦啦啦啦啦啦',val)
        this.permissions = val.permissions
        this.operateNum = null
      },
      'positionData' (val) {
        //这里是判断是不是双重身份，管理员和店长，，控制UI 是否可以操作职位
        if(val.roleList.length > 1){
            if(val.roleList[0].role == 2 && val.roleList[1].role == 4){
              this.Doubleid = true;
            }else{
              this.Doubleid = false;
            }
        }else{
            if(val.roleList[0].role == 2){
              this.Doubleid = false;
            }else{
              this.Doubleid = false;
            }
        }
        // if(val.roleList[0].role == 2 && val.roleList[1].role == 4){
        //    this.Doubleid = true;
        // }else{
        //   this.Doubleid = false;
        // }
        this.getRoleName()
      },
      'checkAll' (val) {
        // console.log('99999999999',val)
      },
      'checkID' (val){
        // console.log('11111111111111111111112 begin')
        // console.log(val)
        this.getLookShop()
        this.getCanSeeShop()
        this.getAllCheckList()
        // console.log('11111111111111111111112 end')
      }

    },
    created () {
      this.getRoleName()
      this.checked = this.checkAll
      this.checkList = this.storeAllData
      this.getAllCheckList()
      this.getLookShop()
      this.getCanSeeShop()
      if (!this.permissions) {
        this.permissions = this.userInfo.permissions
      }
    },
    mounted () {
      let _self = this
      $(".user-role-list").mCustomScrollbar({
          theme: "minimal-dark",
          axis: 'y',
          mouseWheel: {
            scrollAmount: 200,
            preventDefault: false,
            normalizeDelta: false
          },
      });
      $('.el-checkbox__input').css('vertical-align','baseline')
      $('.el-checkbox').css({
        "width":"auto",
        "height":"auto",
        "lineHeight":"0",
        "marginLeft":"10px"
      })
      $('.el-checkbox__label').css({
        "fontSize":"12px",
      })
      $('.member-details-main .store-list-wrap .check-store-list .nonedian').css('listStyle','none')
      $('.nonedian span').css({
        "verticalAlign":"top",
        "lineHeight":"20px"
      })
      $('.el-checkbox__label span').css({
        "verticalAlign":"top",
        "fontSize":"12px",
        "lineHeight":"18px"
      })
    },
    updated(){
      $('.el-checkbox__input').css('vertical-align','baseline')
      $('.el-checkbox').css({
        "width":"auto",
        "height":"auto",
        "lineHeight":"0",
        "marginLeft":"10px"
      })
      $('.el-checkbox__label').css({
        "fontSize":"12px",
      })
      // // $('.member-details-main .store-list-wrap .check-store-list li,.nonedian').css('listStyle','none')
      $('.nonedian span').css({
        "verticalAlign":"top",
        "lineHeight":"20px"
      })
      $('.el-checkbox__label span').css({
        "verticalAlign":"top",
        "fontSize":"12px",
        "lineHeight":"18px"
      })
      // $('.el-checkbox-group label:nth-of-type(2)').css("display","none")
    },
    computed: {
      allAddRole () {
        if (this.isSuperTube) { // 当前用户信息为超管,则不存在是否要添加权限，本身就拥有所有权限
          return false
        }
        //this.isDelRole 是判断角色权限 是否可以编辑添加
        if (this.isDelRole || this.isOperate) {
          return true
        }
        return false
      },
      delRole () {
        if (sessionStorage.getItem("id") === this.userInfo.userId) {
          return false
        } else {
          return true
        }
      },
      isOperate () {
        //this.isWarden判断是不是管理员 副管理员
        if (this.isWarden || this.isCompile) {
          return true
        }
        return false
      },
      delDualRole () { // 是公司人员的情况下
        if (this.userInfo.isCompany) { // 是公司的人员
          return true
        } else {
          return !this.isUserShopManager
        }
      }
    },
    methods: {
      ...mapActions([
        'getSeekCompanyInfo'
      ]),
      getRoleName () {
        let names = ''
        let roleList = []
        for (let i of this.positionData.roleList) {
          roleList.push(i.role)
        }
        roleList = [...new Set(roleList)]
        for (let i of roleList) {
          names = `${names}、${statusPosition(i)}`
        }
        // console.log(roleList)
        //return names.slice(1, names.length)
        this.roleName = names.slice(1, names.length)
        // console.log(this.roleName)
      },
      switchsChange (parm) {
        // console.log(parm)
      },
      changeRoleName (parm) {
        if (parm === '5' || parm === '6') {
          let options = {
            dataList: [
              {
                operateType: parm,
                shopId: '',
                userId: this.userInfo.userId
              }
            ]
          }
          operatePrivilege(options)
            .then(res => {
              // console.log(res)
              this.$emit('_seekGetDepUserList')
              if (parm === '5') {
                this.roleName = '管理员'
              } else {
                this.roleName = '职员'
              }
              //this.getRoleName()
            }, res => {
              alert(res.data.msg)
            })
        }
      },
      setRoleName () {
        this.isSetRol = true
      },
      _operateOperateApplyByUserId (applyId, index) {//根据 应用权限ID 删除应用权限
        let options = {
          applyList: [
            {
              operateType: 2,
              applyId: applyId
            }
          ],
          userId: this.userInfo.userId
        }
        operateOperateApplyByUserId(options)
          .then(res => {
            this.$emit('delUserRoleDataList', index)
          })
      },
      setTimeRequest (parm) { // 设置查看时间
        // if (!this.isDelRole) {
        //   return
        // }
        let timeoptions = {
          userId: this.userInfo.userId,
          type: '2',
          timeRequest: this.settingUserRole.timeRange
        }
        if(parm == '1'){
           timeoptions.timeRequest = '0'
        }else{
          //parma='2'
          timeoptions.timeRequest = '1'
        }
        this.settingUserRole.timeRange = parm 
        this._operateUserSetting(timeoptions)
        // 关闭修改编辑
        this.operateNum = null;
      },
      setCostFlag (parm) { // 设置成本
        let flagoptions = {
          userId: this.userInfo.userId,
          type: '1',
          costFlag: '0'
        }
        if (parm === 'Y') {
           flagoptions.costFlag = '1' // 1 代表开启成本 0 代表关闭成本
        }
        this._operateUserSetting(flagoptions)
        // 关闭修改编辑
        this.operateNum = null;
      },
      checkPer() {
        if (!this.permissions) {
          this.permissions = this.userInfo.permissions
        }
        this.operateNum = 5
      },
      setPermissions (parm) { // 设置登录权限
        this.permissions = parm
        let flagoptions = {
          userId: this.userInfo.userId,
          type: parm
        }
        this._operateLoginPermissions(flagoptions)
        // 关闭修改编辑
        this.operateNum = null;
      },
      _operateLoginPermissions (parm) {
        operateLoginPermissions(parm)
          .then(res => {
            this.$message({type:'success',message:'修改成功'});
            if (res.data.state === 200) {
              let option = {
                userId: this.userInfo.userId 
              }
              this._seekUserInfo(option, true)
              this._seekSettingUserRole(option)
              this._seekGetUserInfo(option)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _operateUserSetting (options) { // 用户设置
        operateUserSetting(options)
          .then(res => {
            this.$message({type:'success',message:'修改成功'});
            if (res.data.state === 200) {
              let option = {
                userId: this.userInfo.userId 
              }
              this._seekUserInfo(option, true)
              this._seekSettingUserRole(option)
              this._seekGetUserInfo(option)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _seekUserInfo (options, isCompany) { // 用户信息
        this.$store.dispatch('workOrganizationChange', options.userId)
        seekUserInfo(options)
          .then(res => {
            if (res.data.state === 200) {
              let userInfo = res.data.data
              userInfo.userId = options.userId
              if (isCompany) {
                userInfo.isCompany = isCompany
              } else {
                userInfo.isCompany = false
              }
              this.$emit('_seekUserInfo', userInfo)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _seekSettingUserRole (options) { // 用户数据加载权限
        seekSettingUserRole(options)
          .then(res => {
            if (res.data.state === 200) {
              this.$emit('_seekSettingUserRole', res.data.data)
              if (res.data.data.costFlag === 'Y') {
                this.settingUserRole.costFlag = 'Y'
              } else {
                this.settingUserRole.costFlag = 'N'
              }
              // console.log(this.settingUserRole.costFlag)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _seekGetUserInfo (options) { // 用户职位信息
        seekGetUserInfo(options)
          .then(res => {
            if (res.data.state === 200) {
              this.userPromise = res.data.data.roleList[0].role;
              this.$emit('_seekGetUserInfo', res.data.data)
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
      },
      _operatePrivilege () {
        this.delDialog = false
        //console.log('职员删除', this.positionData.roleList)
        let operateType = '';
        // if (this.userInfo.isCompany) { // 是公司的操作
        // }//operateType字段： 副管理员：1 ， 职员：2，店长：3，店员：4，监察员：6
        // console.log(this.positionData.roleList[0].role)        
        // console.log(this.userInfo.userId)

        switch (this.positionData.roleList[0].role) {
            case '2':
            operateType = '1'
            break;
            case '3':
            operateType = '2'
            break;
            case '4':
            operateType = '3';
            break;
            case '6':
            operateType = '2';
            break;
        }
        console.log(this.positionData.roleList[0].role)

        if(this.positionData.roleList[0].role === '6'){
          let options = {
            operateType: '2',
            userId: this.userInfo.userId
          }
          addOrdelInspect(options).then(res => {
            if (res.data.state === 200) {
              this.$store.dispatch('workPopupError', '删除成功');
              this.$emit('_seekGetDepUserList')
              this.getSeekCompanyInfo();
              // setTimeout(window.location.reload(),500);
            } else {
              this.$store.dispatch('workPopupError', res.data.msg);
            }
          })
        } else {
          
          let options = {
            dataList: [
              {
                operateType: operateType,
                shopId: this.positionData.roleList[0].shopId,
                userId: this.userInfo.userId
              }
            ]
          }
          if (this.positionData.roleList[0].shopId) {
            options.dataList[0].operateType = '4'
          }
          // console.log('请求的参数',options)
          operatePrivilege(options)
            .then(res => {
              if (res.data.state === 200) {
                this.$store.dispatch('workPopupError', '删除成功');
                this.$emit('_seekGetDepUserList')
                this.getSeekCompanyInfo();
                // setTimeout(window.location.reload(),500);
              } else {
                this.$store.dispatch('workPopupError', res.data.msg);
              }
            }, res => {
              alert(res.data.msg)
            })

        }
      },
      addBtn () {
        this.$emit('addBtn')
      },
      
      // 全选方法
      storeCheckAll(val){
        let oldData = this.checkList
        let newListData = []
        if(this.checked){
          for(let i=0;i<oldData.length;i++){
            oldData[i].status = 'N'
            newListData[i] = oldData[i]
          }
          this.checkitemLits = this.getItemArray(newListData)
        }else {
          for(let i=0;i<oldData.length;i++){
            oldData[i].status = 'D'
            newListData[i] = oldData[i]
          }
          this.checkitemLits = this.getItemArray(newListData)
        }
        // console.log('嘿嘿',newListData)

        this.checkList = newListData

        this.getAllChcek(newListData)
        
        // console.log(this.userInfo)
      },
      itemCheckend(val){
        
        let newValArray = val.filter(item => {
          if(item){
            return true
          }
        })
        // 判断是不是全选
        if(this.checkList.length === (newValArray.length)){
          this.checked = true
          this.storeCheckAll()
          // this.storeCheckAll()
        }else {
          this.checked = false
          // 获取选中的店铺
          if(newValArray.length == 0){
            this.storeCheckAll()          
          }else {
            let addnewListData = []
            let delnewListData = []

            let allListData = this.checkList

            for(let i = 0;i<newValArray.length;i++){
              // console.log(newValArray[i])
              allListData.forEach(item => {
                if(item.shopId == newValArray[i]){
                  addnewListData.push(item)
                }else {
                  delnewListData.push(item)
                }
            })

            // console.log(addnewListData)
            // console.log(delnewListData)
          }

          this.getOneCheck(addnewListData,'1')
          this.getOneCheck(delnewListData,'2')
          }
        }

      },
      getItemArray(data){
        let newData =[]
        newData = data.map(item => {
          // console.log(item)
          if(item.status === 'N'){
            return item.shopId
          }
        })
        return newData
      },
      getAllChcek(newListData){ // 全选点击后设置查看店铺
        let options = []
        let optionsObj ={}
        for(let j=0;j<newListData.length;j++){
          optionsObj ={}
          if(newListData[j].status === 'N') {
            optionsObj['operateType'] = '1'
          }else {
            optionsObj['operateType'] = '2'
          }
          optionsObj.shopId = newListData[j].shopId
          optionsObj.userId = this.userInfo.userId

          options.push(optionsObj)
        }
        let dataObj = {
          "dataList" : options
        }
        setShopSee(dataObj).then(res => {
          if(res.data.state !== 200){
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        })
      },
      // getAllnoCheck(){
      //   let data = this.checkList
      //   let options = []
      //   let optionsObj ={}

      //   for(let j = 0;j<data.length;j++){
      //     optionsObj.operateType = '2'
      //     optionsObj.shopId = data[j].shopId
      //     optionsObj.userId = this.userInfo.userId
      //     options.push(optionsObj)
      //   }
      //   console.log(options)
      //   let dataObj = {
      //     "dataList" : options
      //   }
      //   setShopSee(dataObj).then(res => {
      //     if(res.data.state !== 200){
      //       this.$store.dispatch('workPopupError', res.data.msg);
      //     }
      //   })
        
      // },
      getOneCheck(data,type){
        let options = []
        let optionsObj ={}

        for(let j = 0;j<data.length;j++){
          optionsObj.operateType = type
          optionsObj.shopId = data[j].shopId
          optionsObj.userId = this.userInfo.userId
          options.push(optionsObj)
        }

        let dataObj = {
          "dataList" : options
        }

        setShopSee(dataObj).then(res => {
          if(res.data.state !== 200){
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        })
      },
      getAllCheckList(){
        // console.log('调用了')
        if(!this.checkID){
          return
        }
        let options = {
          userId: this.checkID,
          type: '3'
        }

        lookStore(options).then(res => {
          if(res.data.state === 200){
            this.checkList = res.data.data.dataList
            this.checkitemLits = this.getItemArray(this.checkList)
            this.checked = this.getCheckCount(this.checkList)
            // console.log('嘿',this.checkList)
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        })
      },
      getLookShop(){
        if(!this.checkID){
          return
        }
        let options = {
          userId: this.checkID,
          type: '3'
        }
        lookStore(options).then(res => {
          if(res.data.state === 200){
            // this.storeData = res.data.data.dataList
            this.checked = this.getCheckCount(this.storeData)
            // console.log('所有的店铺',this.checked)
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        })
      },
      getCanSeeShop(){
         if(!this.checkID){
          return
        }
        let options = {
          userId: this.checkID,
          type: '1'
        }
        lookStore(options).then(res => {
          if(res.data.state === 200){
            this.storeData = res.data.data.dataList
            // this.checked = this.getCheckCount(this.storeData)
            console.log('所有的店铺',this.storeData)
          } else {
            this.$store.dispatch('workPopupError', res.data.msg);
          }
        })
      },
      getCheckCount(data){
        if(data.length === 0) {
          return false
        }
        let count = 0
        for(let i = 0; i<data.length; i++){
          if(data[i].status === 'N'){
            count++
          }
        }
        if(data.length !== 0 && count === data.length){
          return true
        }

        return false
      }
    }
  }
</script>
<style lang="scss">
.member-details-main {
  .el-dialog__header {
    position: absolute;
    width: 100%;
  }
  .delDig {
    width: 320px;
    height: 300px;
    border-radius:10px;
    .body {
      .title {
        width: 100px;
        height: 80px;
        margin: 24px auto 0;
        text-align: center;
        img {
          width: 46px;
          height: 46px;
        }
        span {
          display: block;
          text-align: center;
          color:#333;
          font-weight: bold;
        }
      }
      .main {
        height: 166px;
        text-align: center;
        .btn {
          width: 150px;
          height: 28px;
          cursor: pointer;
          text-align: center;
          line-height: 28px;
          background:#2993f8;
          color:#fff;
          font-weight: bold;
          border-radius: 4px;
          font-size: 14px;
          margin: 80px auto 0;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~assets/css/color.scss";
.member-details-main{
  position: relative;
  h3{
    font-size: 16px;
    margin: 20px 0 40px 40px;
    color: $font-color-deep;
    font-weight: normal;
  }
  .title-icon-wrap{
    i{
      display: inline-block;
      height: 16px;
      margin: 0 10px 0 0;
      width: 16px;
      //background-color: #ccc;
      background-size: 14px;
    }
    span{
      vertical-align: top;
      font-size: 12px;
      line-height: 20px;
      color: $main-color;
    }
  }
  .member-title{
    margin: 0 0 0 70px;
    background: url('./../../assets/img/personal.png') no-repeat;
  }
  .member-body-wrap{
    overflow: auto;
    width: 100%;
    .member-body-inner{
      margin: 40px 0;
      font-size: 0;
      .logo-wrap, .tit-wrap{
        display: inline-block;
        vertical-align: top;
      }
      .logo-wrap{
        margin-left: 94px;
        height: 100%;
        .img {
          display: block;
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
        img {
          display: block;
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
        p{
          text-align: center;
          font-size: 16px;
          line-height: 16px;
          font-weight: 600;
          color: $font-color-deep;
          margin-top: 20px;
          span{
            vertical-align: middle;
          }
          i{
            vertical-align: middle;
            display: inline-block;
          }
          .man{
            width: 18px;
            height: 18px;
            margin-left: 5px;
            background: url('./../../assets/img/man-icon.png') no-repeat;
            background-size: 18px;
          }
          .woman{
            width: 18px;
            height: 18px;
            margin-left: 5px;
            background: url('./../../assets/img/woman-icon.png') no-repeat;
            background-size: 18px;
          }
        }
      }
      .tit-wrap{
        margin: 2px 0 0 50px;
        li{
          position: relative;
          font-size: 0;
          margin-bottom: 28px;
          span{
            vertical-align: middle;
            font-size: 14px;
            line-height: 14px;
            display: inline-block;
          }
          span:first-child{
            width: 70px;
            margin-right: 34px;
            text-align: right;
            color: $font-color-neutral;
          }
          span:nth-child(2){
            cursor: pointer;
            color: $font-color-deep;
          }
          // input{
          //   border-bottom: 1px solid #ccc;
          // }
          .xj-radio-wrap{
            display: inline-block;
            vertical-align: top;
            // width: 100px;
            color: $font-color-deep;
            cursor: pointer;
            .xj-radio-inner{
              border: 1px solid $main-color;
              height: 14px;
              width: 14px;
              border-radius: 50%;
            }
            span, .xj-radio-inner{
              display: inline-block;
              vertical-align: top;
            }
            span{
              color: $font-color-deep;
              font-size: 14px;
              margin-left: 8px;
              margin-right: 20px;
            }
            i{
              display: block;
              height: 8px;
              width: 8px;
              margin: auto;
              opacity: 0;
              margin-top: 2px;
              border-radius: 5px;
              background: $main-color;
              transition: opacity .5s;
              -moz-transition: opacity .5s;  /* Firefox 4 */
              -webkit-transition: opacity .5s; /* Safari 和 Chrome */
              -o-transition: opacity .5s;  /* Opera */
              cursor: pointer;
            }
            .actions-radius{
              opacity: 1;
              transition: opacity .5s;
              -moz-transition: opacity .5s;  /* Firefox 4 */
              -webkit-transition: opacity .5s; /* Safari 和 Chrome */
              -o-transition: opacity .5s;  /* Opera */
            }
          }
          .triangle-icon{
            display: inline-block;
            vertical-align: middle;
            height: 6px;
            width: 10px;
            background: url('./../../assets/img/triangle-icon.png') no-repeat;
            background-size: 10px 6px;
            margin-left: 5px;
            // float: right;
            // margin: 5px 5px 0 5px;
            cursor: pointer;
          }
          .set-role-name{ // 切换管理员弹窗
            position: absolute;
            top: 22px;
            left: 70px;
            background-color: #fff;
            width: 128px;
            height: 180px;
            border-radius: 5px;
            box-shadow: 0 0 5px #ccc;
            z-index: 300;
          }
        }
        li:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
  .role-list-wrap{
    height: 154px;
    width: 100%;
    overflow: hidden;
    .role-title{
      margin: 0 0 20px 70px;
      background: url('./../../assets/img/power.png') no-repeat;
    }
    ul{
      // padding: 0 25px;
      font-size: 0;
      min-height: 80px;
      max-height: 615px;
      height: 220px;
      overflow: auto;
      margin: 20px 0 0 94px;
      li{
        position: relative;
        display: inline-block;
        font-size: 12px;
        margin: 0 30px 16px 0;
        // width: 21.2%;
        padding: 5px 10px;
        // height: 28px;
        // line-height: 28px;
        text-align: center;
        background-color: #f4f9ff;
        border-radius: 2px;
        color: $font-color-normal;
        vertical-align: top;
        // span{
        //   display: inline-block;
        //   width: 100%;
        //   overflow: hidden;
        //   text-overflow: ellipsis;
        //   white-space: nowrap;
        // }
      }
      // li:nth-child(4n+0) {
      //   margin: 0 0 12px 0;
      // }
      .del-icon{
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 18px;
        width: 18px;
        background: url('./../../assets/img/triangle-change-icon.png') no-repeat;
        background-size: 18px 18px;
      }
      .add-style{
        padding: 0;
        width: 80px;
        height: 28px;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .actions{
        color: blue;
        background-color: #fff;
      }
    }
  }
  .del-staff{
    position: absolute;
    top: 20px;
    right: 20px;
    //font-weight: 600;
    display: block;
    width: 18px;
    height: 18px;
    color: #b1b1b1;
    font-size: 16px;
    //text-align: center;
    cursor: pointer;
  }
  .del-staff:hover {
    color:#ef5151;
  }

  // 店铺查看权限
  .store-list-wrap{
    height: 200px;
    width: 100%;
    overflow: hidden;
    padding-top: 30px;
    .store-title{
        margin: 0 0 20px 70px;
        background: url('./../../assets/img/power.png') no-repeat;
        .check-store-all{
          .el-checkbox{
            width: 50px;
            height: 0;
            line-height: 0;
            margin-left: 10px;
          }
        }

    }
    .check-store-list{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin: 20px 0 0 94px;
      li{
        width: 40%;
        height: 16px;
        margin-bottom: 16px;
        margin-left: 20px;
        font-size: 12px;
        line-height: 16px;
        color: #2993f8;
        list-style: disc;
        span{
          display: inline-block;
          color: #666666;
        }
      }
    }

    
  }
}
.el-checkbox__input{
    vertical-align: baseline;
}
li,.nonedian {
  list-style:none; 
}
.el-checkbox-group{
  margin: 20px 0 0 94px
}
</style>
