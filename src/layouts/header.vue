<template>
<transition name="tp-ani">
  <header class="app-header not-print">
      
      <h1 class="logo">
          <img class="companyLogo" v-if='companyInfo' :src="companyInfo ? companyInfo.logo : ''">
          <span class="company-name-now" v-if='companyInfo'>{{companyInfo.companyName}}</span>
          <!--公司切换-->
          <el-dropdown @command="switchCompany" trigger="click" v-if="companyList1.length>1">
            <span class="el-dropdown-link"><i class="iconfont icon-icon_qiehuangongsi"></i></span>
            
                <el-dropdown-menu slot="dropdown"  class="layout-drop-item">
                  <div class="header-layout">
                      <el-dropdown-item
                          :class="changeActive == index"
                          :command="{item:item,index:index}"
                          v-for="(item, index) in companyList1" :key="index">
                          {{item.companyName}}
                      </el-dropdown-item>
                  </div>
                      <el-dropdown-item v-if="isAllowCreate" @click.native="createComp"><i class="iconfont icon-jia2 icon-create-company"></i>创建公司</el-dropdown-item>
                      
                </el-dropdown-menu>
          </el-dropdown>
          
      </h1>

      <div class="page-side">
          <div class="menuTabs">
              <!--<menutabs></menutabs>-->
          </div>
          <div class="button">
              <!-- 搜索模块 begin  -->
              <div class="search" ref="mysearch">
                  <!-- <div class="drop-search">单据<i class="el-icon-caret-bottom"></i></div> -->
                  <!-- <el-dropdown class="drop-search" @command="searchType">
                      <span class="el-dropdown-link">
                          {{searchTypeText}}<i class="iconfont icon-xiala"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown" class="layout-drop-item search-drop-item">
                          <el-dropdown-item command="单据">单据</el-dropdown-item>
                          <el-dropdown-item command="商品">商品</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown> -->
                  <input type="text" @focus="changesearchborder(1)" @blur="changesearchborder(2)" @keyup="watchCloseIcon" @keyup.enter="goSearchPage" v-model="searchText" placeholder="请输入关键字..." />
                  <i v-if="iconShow" class="iconfont icon-sousuo" @click="goSearchPage" title="搜索"></i>
                  <i v-else class="iconfont el-icon-circle-cross" @click="closeIcon" title="清除"></i>
                  <!-- 搜索的列表 begin -->
                  <div v-if="isSearch" class="searchList">
                    <!-- 商品 -->
                    <div class="commodity">
                        <h1>商品</h1>
                        <div class="commodityList">
                          <div class="commodityItem">未匹配到相关商品信息，查看<span>所有商品</span></div>
                          <div class="commodityItem">
                            <span class="gno">999888777444555</span><span class="gnn">千足银来宝手镯</span><span class="slocation fr">库位01</span>
                          </div>
                          <div class="commodityItem">
                            <i style="font-size: 1em; position: static;" class="iconfont icon-sousuo"></i><span class="more">更多商品</span><span class="more_num">(16)</span>
                          </div>
                        </div>
                    </div>
                    <!-- 单据 -->
                    <div class="receipts">
                        <h1>单据</h1>
                        <div class="receiptsList">
                          <div class="receiptsItem">未匹配到相关单据信息，查看<span>所有单据</span></div>
                          <div class="receiptsItem">
                            <span class="gno">RK20180609123456</span><span class="state">入库</span><span class="slocation fr">李发财</span>
                          </div>
                          <div class="receiptsItem">
                            <i style="font-size: 1em; position: static;" class="iconfont icon-sousuo"></i><span class="more">更多单据</span><span class="more_num">(16)</span>
                          </div>
                        </div>
                    </div>
                    <!-- 会员 -->
                    <div class="members">
                        <h1>会员</h1>
                        <div class="membersList">
                          <div class="membersItem">未匹配到相关会员信息，查看<span>所有会员</span></div>
                          <div class="membersItem">
                            <span class="gno">12345678901</span><span class="gnn">潘晓婷</span><span class="slocation fr">四季如春珠宝店</span>
                          </div>
                          <div class="membersItem">
                            <i style="font-size: 1em; position: static;" class="iconfont icon-sousuo"></i><span class="more">更多会员</span><span class="more_num">(16)</span>
                          </div>
                        </div>
                    </div>

                  </div>
                  <!-- 搜索的列表 end -->

              </div>
              <!-- 搜索模块 end  -->
              <div class="info" @click="unreadNoticeNum = 0">
                <el-badge :value="unreadNoticeNum" :hidden="unreadNoticeNum == 0" class="item" title="公告">
                  <router-link class="iconfont icon-tixing" tag="i" to="/notice"></router-link>
                </el-badge>
              </div>
              <div class="msg">
                <!-- <i class="iconfont icon-xinxiang" title="消息"></i> -->
                  <el-badge :value="unreadSystemMessageNum" :hidden="unreadSystemMessageNum == 0" class="item" title="消息">
                      <router-link class="iconfont icon-xinxiang" tag="i" to="/message"></router-link>
                  </el-badge>
              </div>
          </div>
          <div class="user-info">
              <!-- <img @click="goAdmin" v-if="userInfo" class="user-img" :src="userInfo.userLogo"> -->
              <FormatImg :logo="userInfo.userLogo" @click.native="goAdmin" class="img" :userName="userInfo.userName || userInfo.phone" :size="40"></FormatImg>
              <div v-if="userInfo" class="userInfo_silder">欢迎您！
                  <el-dropdown @command="selectMenu">
                      <span class="el-dropdown-link">
                          {{userInfo.userName || userInfo.phone}}<i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown" class="layout-drop-item">
                          <!--<el-dropdown-item command="a">个人信息</el-dropdown-item>-->
                          <!--<el-dropdown-item command="b">我的公司</el-dropdown-item>
                          <el-dropdown-item command="c">店铺管理</el-dropdown-item>-->
                          <!--<el-dropdown-item command="d">修改密码</el-dropdown-item>-->
                          <el-dropdown-item command="e">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </div>
          </div>
      </div>

      <!-- 点击了搜索列表后的弹窗 -->
      <el-dialog top="7%" :modal-append-to-body="false" :visible.sync="ListDetails" customClass="ruleOption serachList">
        <!-- tab栏 -->
        <div class="tab-list">
          <ul>
            <li @click="tabAction(index)" v-for="(item, index) in tabList" :key="index" :class="{active: actIndex == index}">
              <div>{{item}}</div>
            </li>
          </ul>
			  </div>
        <!-- tab栏切换的内容 -->
        <div class="page-wrap">
				  <component :is="panel" :panelType="panelType"></component>
			  </div>
      </el-dialog>
  </header>
</transition>
</template>

<script>
import {
  seekMySelfWorkApplyList,
  seekPermissionList,
  seekCompanyList,
  seekUnreadCount
} from "../../src/Api/commonality/seek";
import {
  operateSwitchCompany,
  operateLogout
} from "../../src/Api/commonality/operate";
import FormatImg from "components/template/DefaultHeadFormat.vue";
import menutabs from "components/menuTab.vue";
let skinConfig = require("./skinConfig");

import ProductList from './SearchPage/ProductList'
import DocumentsList from './SearchPage/DocumentsList'
import memberList from './SearchPage/memberList'

export default {
  data() {
    return {
      skinConf: [],
      searchText: "",
      searchTypeText: "商品",
      companyList1: [],
      changeActive: -1,
      iconShow: true,
      num: 1,
      skinIndex: 0,
      smallUrl: "",
      unreadSystemMessageNum: "", // 未读系统消息
      unreadNoticeNum: "", // 未读公告

      isSearch: false, // 搜索列表
      ListDetails: true, // 列表弹框      
      tabList: [
        '商品',
        '单据',
        '会员'	
      ],
      panel: ProductList,// 对应的页面
      actIndex:'0', // 对应选中的参数
      panelType: 0,
    };
  },
  components: {
    FormatImg,
    menutabs, //加载头部页签组件
    ProductList,
    DocumentsList,
    memberList
  },
  props: ["companyInfo", "userInfo", "isAllowCreate"],

  created() {
    this.companyList(); // 公司列表
    this.skinConf = skinConfig.skinList;
    this.unreadCount();
  },
  mounted() {
    let body = document.getElementById("body");
    // let aShield = document.getElementsByClassName('skin-shield')
    //let aShield = document.getElementsByClassName('skin-shield')
    if (localStorage.getItem("bgUrl")) {
      let obj = JSON.parse(localStorage.getItem("bgUrl"));
      body.style.background = obj.url;
      this.skinIndex = obj.index;
      if (obj.flag == "custom") {
        $("#body").addClass("body-shield");
        //this.$refs.switch_skin.style.background = obj.url
      } else if (obj.flag == "static") {
        $("#body").removeClass("body-shield");
        //this.$refs.switch_skin.style.background = "#f5f8f7"
      }
    }
  },
  watch: {
    companyInfo: function() {
      if (this.companyInfo.companyName) {
        localStorage.setItem("companyInfo", JSON.stringify(this.companyInfo));
      }
    },
    $route: function() {
      this.unreadCount();
    }
  },
  methods: {
    changesearchborder(val) {
      if (val == 1) {
        this.$refs.mysearch.style.border = "1px solid #2993f8";
        this.isSearch = true;
      } else {
        this.$refs.mysearch.style.border = "1px solid #fff";
        this.isSearch = false;
      }
    },
    unreadCount() {
      seekUnreadCount().then(
        res => {
          this.unreadSystemMessageNum = res.data.data.unreadSystemMessageNum;
          this.unreadNoticeNum = res.data.data.unreadNoticeNum;
        },
        res => {}
      );
    },
    closeIcon() {
      this.searchText = "";
      this.iconShow = true;
    },
    watchCloseIcon() {
      console.log("键盘弹起的时候调用");
      if (this.searchText != "") {
        this.iconShow = false;
      } else {
        this.iconShow = true;
      }
    },
    createComp() {
      this.$emit("messageBack", { flag: true, type: 2 });
    },
    companyList() {
      seekCompanyList().then(
        res => {
          this.companyList1 = res.data.data.dataList;
        },
        res => {}
      );
    },
    switchCompany(command) {
      // 切换公司
      let options = {
        companyId: command.item.companyId
      };
      this.changeActive = command.index;

      operateSwitchCompany(options).then(
        res => {
          this.$router.push({ path: "/mainIndex" });
          sessionStorage.setItem("companyId", command.item.companyId);
          location.reload();
        },
        res => {}
      );
    },
    goSearchPage() {
      // 去搜索页面
      if (this.searchTypeText == "单据") {
        this.$router.push({
          path: "/billSearch",
          query: { text: this.searchText }
        });
      } else if (this.searchTypeText == "商品") {
        this.$router.push({
          path: "/goodsSearch",
          query: { text: this.searchText }
        });
      }
    },
    searchType(command) {
      //单击搜索类型切换
      this.searchTypeText = command;
    },
    //selectMenu
    selectMenu(command) {
      if (command == "a") {
        this.$router.push({ path: "/admin/personalInfo" });
      } else if (command == "b") {
        this.$router.push({ path: "/admin/myCompany" });
      } else if (command == "c") {
        this.$router.push({ path: "/admin/shopManage" });
      } else if (command == "d") {
        this.$router.push({ path: "/admin/pawdSetting" });
      } else if (command == "e") {
        operateLogout().then(res => {
          if (res.data.state == 200) {
            this.$router.push({ path: "/member/login" });
            let body = document.getElementById("body");
            body.style.background = "#f5f8f7";
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
      }
    },

    goAdmin() {
      //this.$router.push({path: '/admin'})
      this.$emit("goPersonalInfo", { flag: true });
    },
    // tab栏切换
    tabAction(index) {
        console.log(index)
        this.actIndex = index + ''
        this.panelType = index        
				switch(index) {
          case 0:
            this.panel = ProductList
						break;
          case 1:
            this.panel = DocumentsList
						break;
          case 2:
            this.panel = memberList
						break;
				}
		},
    
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu__item {
  .icon-create-company {
    margin-right: 4px;
    color: #999;
    float: left;
    margin-top: 1px;
    font-size: 15px;
  }

  &:hover {
    .icon-create-company {
      color: #2993f8;
    }
  }
}
.app-header {
  position: fixed;
  color: #2993f8;
  left: 0;
  top: 0;
  height: 64px;
  width: 100%;
  padding-left: 190px;
  background-color: #fff;
  border-bottom: 1px solid #edf0ef;
  z-index: 1002;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  display: flex;

  .logo {
    height: 59px;
    position: absolute;
    left: 20px;
    top: 5px;
    z-index: 10;

    .companyLogo {
      width: 35px;
      height: 35px;
      border-radius: 4px;
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
      margin-top: 6px;
    }
    .company-name-now {
      display: inline-block;
      height: 35px;
      line-height: 35px;
      font-size: 18px;
      font-weight: 600;
    }
    .change-company {
      display: inline-block;
      margin-right: 10px;
      width: 20px;
      height: 20px;
      font-weight: bold;
      color: #2993f8;
      cursor: pointer;
    }

    .icon-icon_qiehuangongsi {
      //color: #2993f8;
      cursor: pointer;
      font-size: 20px;
    }
  }

  .page-side {
    position: relative;
    z-index: 1;
    height: 64px;
    padding-right: 50px;
    display: flex;
    justify-content: flex-end;
    flex: 1;

    .button {
      margin-top: 16px;
      display: inline-block;
      float: right;

      .search {
        float: left;
        width: 320px;
        height: 32px;
        background: #f1f2f3;
        border-radius: 4px;
        position: relative;
        border: 1px solid #fff;
        input {
          width: 210px;
          height: 32px;
          font-size: 14px;
          font-weight: bold;
          padding: 4px 0 4px 0;
          background-color: transparent;
        }
        input::-webkit-input-placeholder {
          color: #d6d6d6;
          font-weight: bold;
        }
        input::placeholder,
        input::-moz-placeholder {
          color: #d6d6d6;
          font-weight: bold;
        }
        .drop-search {
          width: 75px;
          height: 32px;
          line-height: 32px;
          position: relative;
          &:after {
            content: "";
            background: #d6d6d6;
            width: 1px;
            height: 14px;
            position: absolute;
            right: 0;
            top: 9px;
          }
          .el-dropdown-link {
            display: inline-block;
            width: 75px;
            text-align: right;
            position: relative;
            padding-right: 22px;
            cursor: pointer;
            color: #2993f8;
            > .iconfont {
              color: #2993f8;
              font-size: 22px;
              position: absolute;
              right: 0;
              top: 2px;
            }
          }
        }
        .iconfont {
          position: absolute;
          right: 10px;
          top: 6px;
          font-size: 18px;
          color: #666;
          transition: all 0.3s;
          cursor: pointer;
          &:hover {
            color: #2993f8;
          }
        }
      }
      .search:hover {
        border: 1px solid #2993f8;
      }
      .search:focus {
        border: 1px solid #2993f8;
      }
      .info {
        float: left;
        min-width: 30px;
        height: 32px;
        margin-left: 24px;
        .item {
          display: block;
          margin-top: 3px;
          i {
            cursor: pointer;
            font-size: 23px;
            font-weight: bold;
            color: #333;
            &:hover {
              color: #2993f8;
            }
          }
        }
      }
      .msg {
        float: left;
        font-size: 24px;
        color: #686868;
        margin-left: 24px;
        .item {
          display: block;
          margin-top: 3px;
          i {
            cursor: pointer;
            font-size: 23px;
            font-weight: bold;
            color: #333;
            &:hover {
              color: #2993f8;
            }
          }
        }
      }
    }

    .user-info {
      height: 100%;
      float: right;
      min-width: 230px;
      line-height: 64px;
      .userInfo_silder {
        min-width: 130px;
        height: 40px;
        line-height: 40px;
        float: right;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        margin: 12px 15px 0 12px;
        .el-dropdown-link {
          cursor: pointer;
          > i {
            font-size: 9px;
            color: #999;
          }
          &:hover {
            color: #2993f8;
            i {
              color: #2993f8;
            }
          }
        }
      }
      .img {
        width: 40px;
        height: 40px;
        float: right;
        margin: 10px 0;
        border-radius: 50%;
        cursor: pointer;
      }
      img {
        width: 40px;
        height: 40px;
        float: right;
        margin: 10px 0;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
  .switch-skin {
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    color: #737373;
    padding: 2px 4px;
    //line-height: 20px;
    border-radius: 10px;
    border: 1px solid #d6d6d6;
    font-weight: normal;
    cursor: pointer;
    position: absolute;
    z-index: 5;
    top: 20px;
    right: 40px;
    ul {
      opacity: 0;
      visibility: hidden;
      position: absolute;
      width: 160px;
      height: 150px;
      background: #fff;
      transition: all 0.3s ease;
      left: -55px;
      top: 42px;
      border-radius: 4px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      li {
        width: 100%;
        height: 50px;
        padding-top: 8px;
        padding-left: 5px;
        img {
          width: 60px;
          height: 34px;
          float: left;
          margin-right: 27px;
          border-radius: 4px;
        }
        span {
          float: left;
          display: block;
          font-size: 14px;
          color: #333;
          line-height: 34px;
        }
      }
      li:hover {
        background: #f6f7f8;
        span {
          color: #2993f8;
        }
      }
      li.active {
        span {
          color: #2993f8;
        }
      }
    }
  }
  .switch-skin:hover {
    color: #2993f8;
    ul {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>

<style lang="scss">
.item {
  .is-fixed {
    top: 4px;
    right: 18px;
    line-height: 15px;
  }
}

.header-layout {
  max-height: 300px;
  //overflow: auto;
}
.menuTabs {
  flex: 1;
  padding: 0 40px;
  position: relative;
}
</style>

<style lang="scss" scoped>
.searchList {
  position: absolute;
  top: 32px;
  left: 0;

  width: 420px;
  // height: 500px;
  padding: 20px;

  border: 1px solid #d6d6d6;
  border-radius: 4px;
  background: #fff;

  .commodity,
  .receipts,
  .members {
    & > h1 {
      width: 100%;
      height: 24px;
      padding-bottom: 10px;

      font-size: 14px;
      font-weight: bold;
      color: #666;

      border-bottom: 1px solid #eee;
    }
    .commodityList,
    .receiptsList,
    .membersList {
      width: 100%;
      margin-bottom: 20px;
      .commodityItem,
      .receiptsItem,
      .membersItem {
        width: 100%;
        height: 42px;

        font-size: 14px;
        color: #999;
        line-height: 42px;

        span {
          color: #2993f8;
          cursor: pointer;
        }
        .gno {
          color: #333;
        }
        .state {
          display: inline-block;

          width: 40px;
          height: 20px;
          margin: 0 10px;

          font-size: 12px;
          color: #999;
          text-align: center;
          line-height: 20px;

          background: #eee;
          border-radius: 4px;
        }
        .gnn {
          margin: 0 10px;
          color: #333;
        }
        .slocation {
          color: #999;
        }
        .more {
          margin: 0 10px;

          font-size: 14px;
          color: #333;
        }
        .more_num {
          color: #999;
        }
      }
    }
  }

  .receipts {
  }
  .members {
    .membersList {
      margin-bottom: 0;
    }
  }
}
</style>

<style lang="scss">
.serachList.ruleOption .el-dialog__header .el-dialog__headerbtn {
  margin-top: 16px;
  margin-right: 16px;
}
.serachList .el-dialog__body {
  padding-top: 50px;
  padding-left: 0;
  padding-right: 0;
  .tab-list {
    position: absolute;
    top: 10px;
    left: 20px;
  }
}
.serachList .el-dialog__body .page-wrap {
  height: auto;
  overflow-y: visible;
}
</style>
 