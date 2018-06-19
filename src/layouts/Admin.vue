<template>
  <div class="admin">
    <div class="admin-main">
      <div class="admin_left_side_nav">
        <div class="admin_left_side_nav_item" @click="navControl(0)" :class="{active: navShowSwitch===0}">
          <img :src="0 === navShowSwitch ? navDataList[0].iconHoverSrc : navDataList[0].iconSrc">
          <span>{{navDataList[0].type}}</span>
        </div>
        <div class="admin_left_side_nav_item" @click="navControl(1)" :class="{active: navShowSwitch===1}">
          <img :src="1 === navShowSwitch ? navDataList[1].iconHoverSrc : navDataList[1].iconSrc">
          <span>{{navDataList[1].type}}</span>
        </div>
        <div class="admin_left_side_nav_item" style="position:relative;" @click="navControl(2)" :class="{active: navShowSwitch===2}">
          <img :src="2 === navShowSwitch ? navDataList[2].iconHoverSrc : navDataList[2].iconSrc">
          <span>{{navDataList[2].type}}</span>
          <div class="shop_out_side" v-if="shopList.length"> <!--v-if="shopList.length"-->
            <div>
              <div v-for="(shop, index) in shopList" class="shop_out_side_item">
                <li :title="shop.shopName" :class="{active:index==outSideIndex}" class="shopList_item" shopList="mainList" @click="propsShopList(shop, index)"><img src="./../../static/img/staffDefaultImg.png"/> {{shop.shopName}}</li>
              </div>
            </div>
          </div>
        </div>
        <div class="admin_left_side_nav_item" @click="navControl(3)" :sended="sended" :class="{active: navShowSwitch===3}">
          <img :src="3 === navShowSwitch ? navDataList[3].iconHoverSrc : navDataList[3].iconSrc">
          <span>{{navDataList[3].type}}</span>
        </div>
      </div>
      <div class="admin_right_side_detail" @click="evt">
        <div class="maskBox" v-if="isMask"></div>
        <AdminMainHeader :currentTitle="currentTitle"></AdminMainHeader>
        <keep-alive><router-view></router-view></keep-alive>

      </div>

    </div>
  </div>
</template>

<script>
  import AdminMainHeader from './Admin/components/AdminMainHeader'
  import {seekGetShopListByCo} from './../Api/commonality/seek'

  export default {
    data () {
      return {
        sended: false,
        navDataList: [
          {type: '个人信息', iconSrc: 'static/img/admin/ic_xinxi_nor.png', iconHoverSrc: 'static/img/admin/ic_xinxi_hover.png'},
          {type: '我的公司', iconSrc: 'static/img/admin/ic_gongsi_nor.png', iconHoverSrc: 'static/img/admin/ic_gongsi_hover.png'},
          {type: '店铺管理', iconSrc: 'static/img/admin/ic_dianpu_nor.png', iconHoverSrc: 'static/img/admin/ic_dianpu_hover.png'},
          {type: '密码设置', iconSrc: 'static/img/admin/ic_mima_nor.png', iconHoverSrc: 'static/img/admin/ic_mima_hover.png'}
        ],
        navShowSwitch: 0,
        isMask: false,
        dropBox: null,
        shopList: [
        ],
        adminRouter: this.$router,
        outSideIndex: 0
      }
    },
    computed: {
      currentTitle: function () {
        return this.navDataList[this.navShowSwitch].type;
      }
    },
    components: {
      AdminMainHeader
    },
    methods: {
      evt (e) {
        eventBus.$emit('PscDropBox', this.dropBox)
      },
      getShopList () {
        let options = {
          "page": 1,
          "pageSize": 5
        }
        //var that = this;
        seekGetShopListByCo(options).then((res) => {
          console.log(res);
          if (res.status === 200) {
            for (let i = 0; i < res.data.data.shopList.length; i++) {
              this.shopList.push(res.data.data.shopList[i]);
            }
            sessionStorage.setItem('defaultShopId', res.data.data.shopList[0].shopId);
//            console.log(this.shopList[0]);
//            console.log(this.shopList[0].shopName);
          }

        }, (res) => {
          console.log(res);
        })
      },
      propsShopList (name, index) {
        eventBus.$emit('getShopList', name);
        //console.log(name);
        this.outSideIndex = index;
      },
//      getShop () {
//        let options = {
//          "unit":"1"
//        }
//        //console.log(this.searchFriend.length);
//        var friendObj = {};
//
//        seekGetShop(options).then((response) => {
//
//        }, (response) => {
//          console.log(response);
//        })
//      },
      navControl (op_value) {
        this.navShowSwitch = op_value;
        switch (op_value) {
          case 0:
            this.isMask = false;
            this.$router.push('/admin/personalInfo');
            break;
          case 1:
            this.isMask = false;
            this.$router.push('/admin/myCompany');
            break;
          case 2:
            if (this.shopList.length <= 0) {
              this.isMask = true;
              break;
            } else {
              this.isMask = false;
              this.$router.push('/admin/shopManage');
            }
            break;
          case 3:
            this.isMask = false;
            this.$router.push('/admin/pawdSetting');
            eventBus.$emit('passwordPage', this.sended);
            break;
          default:
            this.isMask = false;
            this.$router.push('/admin');
            break;
        }

      },
      routeAct () {
        if (this.$route.path == '/admin/personalInfo') {
          this.navShowSwitch = 0;
        } else if (this.$route.path == '/admin/myCompany') {
          this.navShowSwitch = 1;
        } else if (this.$route.path == '/admin/shopManage') {
          this.navShowSwitch = 2;
        } else if (this.$route.path == '/admin/pawdSetting') {
          this.navShowSwitch = 3;
        }
      }
    },
    created () {
      this.getShopList();

    },
    watch: {
      '$route': 'routeAct'

    },
    mounted () {
      $(".shop_out_side").mCustomScrollbar({
          theme: "minimal-dark",
          axis: 'y',
          mouseWheel: {
              scrollAmount: 200,
              preventDefault: false,
              normalizeDelta: false
          },
      });
      //document.getElementsByClassName("admin_left_side_nav_item")[0].setAttribute('class', 'admin_left_side_nav_item active');
      //document.getElementsByClassName("admin_left_side_nav_item")[3].click();
      this.$store.dispatch('getCompInfo');

    }
  }
</script>

<style lang="scss" scoped>
  .admin {
    padding-top: 40px;
    width: 100%;
    height: 100%;
    min-height: 880px;
    overflow: hidden;
    background-color: #f5f8f7;
  .admin-main {
    width: 1200px;
    height: 82%;
    min-height: 700px;
    margin: 0 auto;
    background-color: #ffffff;
    clear: both;
  .admin_left_side_nav {
    width: 20%;
    height: 100%;
    float: left;
  .admin_left_side_nav_item {
    width: 100%;
    height: 110px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    color: #666;
  img {
    width:42px;
    height:42px;
    margin-top: 25px;
  }
  span {
    display:block;
  }
  .shop_out_side {
    z-index: 99;
    position: absolute;
    top:0;
    right: -160px;
    width: 160px;
    height: 220px;
    background-color: #fff;
    border: 1px solid #4fdcca;
    display:none;
  .shop_out_side_item {
    width: 160px;
    height: 55px;
    line-height: 55px;
    color: #999;
    overflow:hidden;
    padding-left:10px;
  .shopList_item.active{
    color: #4fdcca;
    background-color: #f4f5f6;
  }
  .shopList_item {
    width:100%;
    text-align:left;
    padding-right:10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  img {
    width:40px;
    height:40px;
    vertical-align:middle;
    margin: 0 10px 0 0px;
    border-radius:50%;
  }
  }

  }
  .shop_out_side_item:hover {
    color: #4fdcca;
    background-color: #f4f5f6;
  }
  }
  }
    .admin_left_side_nav_item.active {
      background-color: #f0fdfb;
      color: #4fdcca;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 4px;
        height: 110px;
        top: 0;
        left: 0;
        background-color: #4fdcca;
      }
    }
    .admin_left_side_nav_item:hover {
      .shop_out_side {
        display:block;
        overflow-x:hidden;
        overflow-y:auto;
      }
    }
  }
  .admin_right_side_detail {
    width: 80%;
    height: 100%;
    min-height: 660px;
    border-left: 1px solid #cccccc;
    float: right;
    position: relative;
  }
  .maskBox {
    width:100%; height:100%; background:#fff; position: absolute; z-index:120; left:0;
    right:0;
  }
  }
  }
</style>
