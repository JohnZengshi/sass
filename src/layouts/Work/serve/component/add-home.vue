<template>
  <div class="serve-add-home-main">
    <div class="serve-add-c-batch-header">
      <div class="add-c-title" @click.stop.prevent="closeSeek">查找售后商品</div>
      <div class="operate-bar-top">
        <div class="tap">
          <span @click="tabClick('1')" :class="{active: listType == '1'}">用户</span>
          <span @click="tabClick('2')" :class="{active: listType == '2'}">商品</span>
        </div>
        <div class="search">
          <input @click.stop="" @focus="openSeek" v-model="keyWord" @keyup.enter="seekUserData" type="text" :placeholder="listType == '1' ? '姓名/手机号/单据号/条码号' : '姓名/手机号/单据号/条码号'">
          <div class="search-btn" @click="seekUserData">
            <i class="iconfont icon-sousuo"></i>
          </div>
          <ul class="seek-list" v-show="inputSeekState && keyWord">
            <li v-for="item in memberList" @click="_seekAfterProductList(item)">
              <smallFormatImg :logo="item.avatarUrl" class="seek-list-img" :userName="item.keyWord" :size="16"></smallFormatImg>
              <p>
                <span v-for="tit in filterkeyWord(item.keyWord)">{{tit}}</span>
              </p>
            </li>
            <li v-if="!memberList.length" @click="openMemberOrChooseClass(item)">
              <i class="iconfont icon-jia1 seek-add-icon"></i>
              <p>{{listType == '1' ? '无搜索结果，为此创建会员' : '无搜索结果，为此创建商品'}}</p>
            </li>
          </ul>
        </div>
      </div>
      <ul class="operation-btn" @click.stop.prevent="closeSeek">
        <li @click="seekVisitor">
          <p>
            <i class="iconfont icon-chazhaofangke"></i>
          </p>
          <p>查找访客</p>
        </li>
        <li @click="openMemberCreate">
          <p>
            <i class="iconfont icon-tianjiahuiyuan1"></i>
          </p>
          <p>添加会员</p>
        </li>
        <li @click="openChooseClass">
          <p>
            <i class="iconfont icon-tianjiashangpin"></i>
          </p>
          <p>添加商品</p>
        </li>
      </ul>
    </div>
    <div class="serve-add-c-user-message" @click.stop.prevent="closeSeek">
      <template v-if="userData.memberId">
        <div class="user-message-left">
          <FormatImg :logo="userData.avatarUrl" class="user-m-i-img" :userName="userData.memberName" :size="85"></FormatImg>
          <div class="user-m-i-tit">
            <p>
              <span>
                {{userData.memberName}}
                <img class="sex-icon" v-if="userData.sex == 1" src="~assets/img/man-icon.png" alt="">
                <img class="sex-icon" v-if="userData.sex == 2" src="~assets/img/woman-icon.png" alt="">
              </span>
            </p>
            <p>{{userData.phone}}</p>
            <p class="vip-group">{{filterVipGroup(userData.type)}}</p>
          </div>

        </div>
        <ul>
          <li>
            <p>{{userData.totalNum}}</p>
            <p>件数</p>
          </li>
          <li>
            <p>{{userData.totalWeight}}g</p>
            <p>总重</p>
          </li>
          <li>
            <p>{{userData.totalPrice}}元</p>
            <p>售价</p>
          </li>
        </ul>
      </template>
      <div v-else class="no-user-data">
        <div class="no-user-m-i-img"></div>
        <p>暂无用户信息~</p>
      </div>
    </div>
    <user-data-list ref="user_data_list_wrap" :userData="userData" @close="colse"></user-data-list>
    <!-- 新建会员 -->
    <member-create ref="memberCreateWrap" @affirm="affirmCreateMember"></member-create>
    <!-- 添加售后商品 -->
    <choose-class ref="chooseClassWrap" @chooseClassData="chooseClassData"></choose-class>
    <!-- 确认弹窗 -->
    <affirm-popup ref="affirmPopupWrap" :innnerTit="innnerTit" @affirm="affirmNew"></affirm-popup>
    <!-- 动态确认弹窗 -->
    <affirm-popup ref="affirmPopupTwoWrap" :innnerTit="affirmTits" @affirm="openMemberOrChooseClass"></affirm-popup>
    <!-- 关联确认弹窗 -->
    <affirm-popup ref="affirmPopupRelevanceWrap" :innnerTit="'此商品未与用户关联，是否添加?'" @affirm="affirmAdd"></affirm-popup>
  </div>
</template>
<script>
import FormatImg from 'components/template/DefaultHeadFormat.vue'
import smallFormatImg from './DefaultHeadFormat.vue'
import userDataList from '../base/user-data-list.vue'
import chooseClass from '../base/choose-class.vue'
import affirmPopup from '../base/affirm-popup'
import memberCreate from '../base/member-create'
import { seekAfterProductList, seekGetMemberInfoByService } from 'Api/commonality/seek'
export default {
  props: ['userData'],
  components: {
    FormatImg,
    smallFormatImg,
    userDataList,
    chooseClass,
    affirmPopup,
    memberCreate
  },
  data() {
    return {
      inputSeekState: '', // 输入框响应状态
      cacheData: {}, // 缓存用户数据
      innnerTit: '未搜索到任何信息，去手动添加商品？',
      affirmTits: '',
      keyWord: '',
      shopId: this.$route.query.shopId,
      listType: '1',
      currentData: {},
      remarkText: '',
      dialog: false,
      memberList: []
    }
  },
  watch: {
    'keyWord' () {
      this.inputSeekState = ''
      if (this.keyWord) {
        this._seekGetMemberInfoByService(this.keyWord)
      }
    }
  },
  methods: {
    initKey () {
      this.keyWord = ''
    },
    closeSeek () {
      this.inputSeekState = ''
    },
    openSeek () {
      if (this.keyWord) {
        this.inputSeekState = true
      }
    },
    filterkeyWord (parm) {
      let datas = parm.split(this.keyWord)
      datas.splice(1, 0, this.keyWord)
      return datas
    },
    initCheck (parm) {
      this.$refs.user_data_list_wrap.initCheck(parm)
    },
    colse (parm) {
      this.keyWord = ''
      this.$emit('close', parm)
    },
    _seekGetMemberInfoByService(parm) {
      let options = {
        keyWord: parm,
        shopId: this.shopId
      }
      seekGetMemberInfoByService(options)
        .then(res => {
            this.inputSeekState = true
            if (res.data.state == 200) {
              this.memberList = res.data.data.dataList
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
            }
        })
    },
    seekVisitor() {
      this.$emit('seekVisitor', { value: '2', type: '' })
    },
    // 确认新建
    affirmNew() {
      // 用户
      if (this.listType == 1) {
        this.userData = this.cacheData
      } else {
        this.userData.orderList.push(...this.cacheData.orderList)
      }
    },
    // 确认添加或替换
    affirmAdd() {
      this.deWeight(this.cacheData.orderList)
      // console.log('确认添加或替换', this.cacheData.orderList)
      // this.userData.orderList.push(...this.cacheData.orderList)
    },
    deWeight (parm) {
      let hasData = []
      for (let i of this.userData.orderList) {
        for (let j of i.productList) {
          hasData.push(j.productId)
        }
      }
      for (let i of parm) {
        debugger
        let datas = {
          orderNo: i.orderNo,
          orderType: i.orderType,
          productList: []
        }
        for (let j of i.productList) {
          debugger
          if (!hasData.includes(j.productId)) {
            datas.productList.push(j)
          }
        }
        if (datas.productList.length) {
          this.userData.orderList.push(datas)
        }
      }
    },
    seekUserData() {
      if (this.memberList.length == 1) {
        this._seekAfterProductList(this.memberList[0])
      } else {
        if (this.listType == 2) {
          this.affirmTits = '未搜索到任何信息，去手动添加商品？'
        } else {
          this.affirmTits = '未搜索到任何信息，为此创建会员？'
        }
        this.$refs.affirmPopupTwoWrap.open()
      }
    },
    _seekAfterProductList(item) {
      this.inputSeekState = ''
      let options = {
        keyWord: item.keyWord,
        type: item.type,
        shopId: this.shopId
      }

      seekAfterProductList(options)
        .then(res => {
          if (res.data.state == 200) {
            this.cacheData = res.data.data
            for (let i of this.cacheData.orderList) {
              for (let j of i.productList) {
                if (j.serviceTypeId) {
                  j.serviceId = j.serviceTypeId
                }
              }
            }
            // 用户
            if (this.listType == 1) {
              let datas = res.data.data
              this.userData.memberId = datas.memberId,
              this.userData.memberName = datas.memberName,
              this.userData.phone = datas.phone,
              this.userData.type = datas.type,
              this.userData.totalNum = datas.totalNum,
              this.userData.totalWeight = datas.totalWeight,
              this.userData.totalPrice = datas.totalPrice,
              this.userData.avatarUrl = datas.avatarUrl,
              this.userData.sex = datas.sex
              this.deWeight(datas.orderList)
              // this.userData.orderList.push(datas.orderList)
            } else {
              // 如果不是当前用户的
              if (res.data.data.memberId != this.userData.memberId) {
                this.$refs.affirmPopupRelevanceWrap.open()
              } else {
                this.deWeight(res.data.data.orderList)
                // this.userData.orderList.push(...res.data.data.orderList)
              }
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },
    chooseClassData(parm) {
      this.userData.orderList.push(parm)
    },
    openChooseClass() {
      this.$refs.chooseClassWrap.open()
    },
    openMemberOrChooseClass (parm) {
      if (this.listType == '1') {
        this.openMemberCreate()
      } else {
        this.openChooseClass()
      }
    },
    // 打开创建会员
    openMemberCreate() {
      this.$refs.memberCreateWrap.open()
    },
    // 确认创建会员
    affirmCreateMember(parm) {
      debugger
      this.userData.memberId = parm.memberId
      this.userData.memberName = parm.username
      this.userData.phone = parm.phone
      this.userData.avatarUrl = parm.imageUri
      this.userData.orderList = []
      this.userData.sex = parm.sex
      this.userData.type = parm.type
    },
    open(parm) {
      this.dialog = true
      // this.currentData = parm
      // this.remarkText = parm.remarks
    },
    tabClick(parm) {
      this.listType = parm
    },
    // 开启确认
    openAffirm() {
      this.$refs.affirmPopupWrap.open()
    },
    seekSearch() {

    },
    // 会员级别
    filterVipGroup(parm) {
      switch (parm) {
        case '1':
          return '普通'
        case '2':
          return '中级'
        case '3':
          return '重要'
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.serve-add-home-main {
  .serve-add-c-batch-header {
    // overflow: hidden;
    height: 90px;
    .add-c-title {
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }
    .operate-bar-top {
      float: left;
      height: 28px;
      margin-bottom: 16px;
      margin-top: 25px;
      .tap {
        width: 122px;
        height: 28px;
        border-radius: 4px;
        border: 1px solid #2993f8;
        float: left;
        margin-right: 16px;
        span {
          height: 100%;
          width: 60px;
          float: left;
          line-height: 28px;
          text-align: center;
          color: #2993f8;
          font-size: 12px;
          cursor: pointer;
        }
        span.active {
          color: #fff;
          background: #2993f8;
        }
      }
      .search {
        width: 200px;
        height: 28px;
        border-radius: 4px;
        float: left;
        position: relative; // overflow: hidden;
        input {
          border-radius: 4px;
          width: 188px;
          height: 28px;
          border: 1px solid #d6d6d6;
          padding-left: 10px;
          &:hover {
            border: 1px solid #2993f8;
          }
          &:focus {
            border: 1px solid #2993f8;
          }
          &:blur {
            border: 1px solid #ededed;
          }
        }
        .search-btn {
          position: absolute;
          width: 30px;
          height: 28px;
          right: 0;
          top: 0;
          background: #2993f8;
          border-radius: 0 5px 5px 0;
          text-align: center;
          cursor: pointer;
          i {
            color: #fff;
            line-height: 28px;
          }
        }
        >.seek-list {
          width: 200px;
          background: #fff;
          border-radius: 5px;
          position: absolute;
          top: 28px;
          left: 0;
          z-index: 200;
          box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.05);
          li {
            height: 30px;
            width: 200px;
            overflow: hidden;
            font-size: 0;
            cursor: pointer;
            &:hover {
              background: rgb(247, 247, 247);
              color: #2993f8;
              p {
                span{
                  color: #2993f8;
                }
              }
            }
            .seek-list-img {
              float: left;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              cursor: pointer;
              margin: 8px 10px 0 10px;
            }
            .seek-add-icon {
              float: left;
              margin: 8px 10px 0 10px;
              font-size: 14px;
              color: #2993f8;
            }

            p {
              font-size: 12px;
              line-height: 14px;
              float: left;
              height: 30px;
              width: 160px;
              overflow: hidden;
              line-height: 30px;
              color: #333;
              span:nth-child(2){
                color: #ef3636;
              }
            }
          }
        }
      }
    }
    >.operation-btn {
      float: right;
      font-size: 0;
      li {
        vertical-align: top;
        display: inline-block;
        height: 50px;
        // margin-left: 30px;
        margin: 5px 0 0 30px;
        cursor: pointer;
        &:hover{
          >p{
            color: #2993f8;
            >i{
              color: #2993f8;
            }
          }
        }
        p:first-child {
          margin-bottom: 5px;
        }
        p {
          font-size: 12px;
          color: #333;
          text-align: center;
          >i {
            font-size: 26px;
            color: #999;
            // &:hover{
            //   color: #2993f8;
            // }
          }
        }
      }
    }
  }

  .serve-add-c-user-message {
    height: 128px;
    width: 640px;
    border-radius: 5px;
    background-color: #eef7fe;
    margin: 0 auto;
    overflow: hidden;
    .user-message-left{
      display: inline-block;
      float: left;
    }
    .user-m-i-tit {
      display: inline-block;
      vertical-align: top;
      width: 130px;
      overflow: hidden;
      margin-left: 10px;
      p:first-child {
        margin-top: 30px;
      }
      p {
        color: #333;
        margin-bottom: 8px;
        overflow: hidden;
        .sex-icon {
          width: 12px;
          height: 12px;
        }
      }
      .vip-group {
        display: inline-block;
        font-style: normal;
        padding: 2px 5px;
        border-radius: 5px;
        font-size: 14px;
        line-height: 14px;
        color: #fff;
        background-color: rgb(255, 162, 0);
      }
    }
    .no-user-data{
      overflow: hidden;
      .no-user-m-i-img{
        width: 85px;
        height: 85px;
        float: left;
        border-radius: 50%;
        cursor: pointer;
        background-color: #fff;
        margin: 22px 30px 0 36px;
      }
      >p{
        font-size: 14px;
        float: left;
        color: #999;
        height: 128px;
        line-height: 128px;
      }
    }

    .user-m-i-img {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      cursor: pointer;
      margin: 22px 30px 0 36px;
    }
    >ul {
      float: right;
      font-size: 0;
      height: 128px;
      overflow: hidden;
      li {
        display: inline-block;
        height: 128px;
        width: 100px;
        p:first-child {
          margin-top: 44px;
          font-weight: bold;
        }
        p {
          font-size: 12px;
          color: #666;
          margin-bottom: 10px;
        }
      }
    }
  }
}

</style>