<template>
    <div class="storage">
      <popup :isShow="isShowAction" :content="popContentText"></popup>
        <div class="main-box">
            <header class="main-box-title">
                <span v-if="isShopName == false">
                  店铺设置
                  <el-select class="shop-select" v-model="shopStorage" placeholder="请选择店铺" @change="getGroupList">
                      <el-option
                      v-for="(item,index) in thisShopList"
                      :label="item.shopName" :key="index"
                      :value="item.shopId">
                      </el-option>
                  </el-select>
                </span>
                <span class="shopNameItem" v-else>
                  <span>{{shopName}}</span>
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                      <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item,index) in thisShopList" :key="index" :command="item.shopId">{{item.shopName}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              <div class="item-title" v-if="flag==0 || flag==1"><input type="text" placeholder="请输入您要调整的大类/成色名称"/><i class="el-icon-search i-search"></i></div>
            </header>
            <div class="main-box-info">
                <div class="noList" v-if="isShopList">
                您没有加入任何店铺
                </div>
                <div v-else>
                    <ul class="aside">
                        <el-menu default-active="0" class="el-menu-vertical-demo" @select="selectItem">
                            <div v-for="(item, index) in catalog" :key="index">
                            <el-menu-item v-if="item.catalogList === ''" :index="index + ''">{{item.name}}</el-menu-item>
                            <el-submenu v-else  :index="index + ''">
                                <template slot="title">{{item.name}}</template>
                                <el-menu-item  v-for="(name, i) in item.catalogList" :index="index + '-' + i" :key="i" @click="test(i)">{{name}}</el-menu-item>
                            </el-submenu>
                            </div>
                        </el-menu>
                    </ul>
                    <div class="main-box-content">
                        <component :is="panel" :shopStorage='shopStorage'></component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import GroupSetting from "./settings/GroupSetting"

import GoldPriceSetting from "./settings/GoldPriceSetting"
import SalesDiscount from "./settings/SalesDiscount"
import PaymentMethod from "./settings/PaymentMethod"
import PreferentialItem from "./settings/PreferentialItem"
import TeamSettings from "./settings/TeamSettings"

import menu from './menu.json'

import popup from './../../template/Popup'
export default {
    data () {
        return {
            catalog: menu.catalog,
            thisShopList: null,
            isEidt: false,
            isShow: true,
            panel: null,
            shopStorage: this.thisShopList, // 店铺
            isShopList: null,
            isShopName: false,
            shopName: '',
            flag: null,
            isShowAction: false,
            popContentText: '这是一个弹框'
        }
    },

    created () {
        this.getShopList(); // 获取店铺列表
    },
    components: {
        GroupSetting,
        GoldPriceSetting,
        SalesDiscount,
        PaymentMethod,
        PreferentialItem,
        TeamSettings,
        popup
    },
    computed: {
        ...mapGetters([
            "repositoryList", // 库位列表
            "productClass", // 产品类别
            "supplierListData", // 供应商列表
            // "userType", // 监听编辑权限
            "applyUserList" // 应用用户列表
        ]),
        productClassPull: function () {
            var productClass = [];
            for (var i = 0; i < this.productClass.length; i++) {
                productClass.push(...this.productClass[i].typeList)
            }
            return productClass;
        }
    },
    mounted () {
      let self = this;
      eventBus.$on('isClose', function (val) {
        self.isShowAction = val;
        console.log(val);
      })
    },
    methods: {
        ...mapActions([
            "workRepositoryList" // 库位列表
        ]),
        handleCommand (command) {

          //console.log(command);
          this.shopStorage = command;
          for (let i = 0; i < this.thisShopList.length; i++) {
            if (this.thisShopList[i].shopId == this.shopStorage) {
              this.shopName = this.thisShopList[i].shopName;
            }
          }
          this.getGroupList();
        },
        changeCss () {
          for (let i = 0; i < this.thisShopList.length; i++) {
            if (this.thisShopList[i].shopId == this.shopStorage) {
                this.shopName = this.thisShopList[i].shopName;
            }
          }
        },
        test (i) {
            //con sole.log(111)
            //console.log(i)
          if (this.shopStorage == null) {
            //alert("若进行操作，请先选择对应的店铺");
            this.popContentText = "若进行操作，请先选择对应的店铺";
            this.isShowAction = true;
            eventBus.$emit('isShow', this.isShowAction);
            this.panel = null;
          } else {
            switch (i) {
              case 0:
                  this.flag = i;
                this.panel = GoldPriceSetting;
                break;
              case 1:
                this.flag = i;
                this.panel = SalesDiscount;
                break;
              case 2:
                this.flag = i;
                this.panel = PaymentMethod;
                break;
              case 4:
                this.flag = i;
                this.panel = PreferentialItem;
                break;
              case 3:
                this.flag = i;
                this.panel = TeamSettings;
                break;
            }
          }

         // console.log(this.panel)
        },
        selectItem (index) {
            if (this.shopStorage == null) {
                //alert("若进行操作，请先选择对应的店铺");
              this.popContentText = "若进行操作，请先选择对应的店铺";
              this.isShowAction = true;
              eventBus.$emit('isShow', this.isShowAction);
              this.panel = null;
            } else {
              switch (index) {
                case '0':
                  this.flag = null;
                  this.panel = GroupSetting;
                  break
              }
            }

        },
        addFun () { // 添加
            this.isEidt = true;
            this.isShow = !this.isEidt;
        },
        finishFun () { // 完成
            this.isEidt = false;
            this.isShow = !this.isEidt;
        },
        seekFun () { // 查询
            this.workProductList({
            })
            this.$store.dispatch('workPopupError', "查询");
        },
        getShopList () {
            var data = {
                "data": {
                    "type": "1",
                    "userId": sessionStorage.getItem("id"),
                    "shopId": this.thisShopId // 店铺ID
                },
                "unit": {
                    "companyId": sessionStorage.getItem("companyId"),
                    "channel": 3,
                    "OS": "web",
                    "ip": "string",
                    "userId": sessionStorage.getItem("id"),
                    "tokenId": sessionStorage.getItem("tokenId")
                }
            }
            var url = INTERFACE_URL_9083 + "/v1/headquarter/showShopList";
            this.$http.post(url, data).then((response) => {
                //console.log("所有店铺");
                console.log(response.data.data.shopList);
                this.thisShopList = response.data.data.shopList;
                if (this.thisShopList[0]) {
                    //console.log(response.data.data.shopList)
                    this.isShopList = false;
                } else {
                    this.isShopList = true;
                }
            }, (response) => {
                console.log(response);
            })
        },
        getGroupList () {
            //console.log(this.shopStorage);
            this.panel = null;
            this.isShopName = true;
            this.changeCss();
            //console.log(this.thisShopList)
        }
    }
}
</script>
<style src="../CompanySetting/CompanySetting.scss" lang="scss" scoped></style>

