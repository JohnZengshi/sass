  <template>
    <transition name="tp-ani">
      <div class="data-view">
        <div class="title">
          <i class="iconfont icon-liebiao"></i>款式设置
        </div>
        <div class="tpl-scroll">
          <div class="optionWrap">
            <div class="optionDiv selected">
              <span class="title-name" :class="false ? '' : 'select'">
                               {{patternitem}}
                              <i class="iconfont icon-arrow-down" v-if="patternitem=='首饰类别'"></i>
                              <i class="el-icon-circle-close" @click="clearMore" title="清除" v-else></i>
                            </span>
              <ul ref="firstul" class="firstul">
                <!-- @mouseover="firstclick(item,index)" -->
                <li @click="firstclick(item, index)" @mouseout="firstout" :key="index" :class="patternitem==item ? 'active' :''" v-for="(item, index) in patternList">
                  {{item.classesName}}
                </li>
              </ul>
              <ul ref="nextul" class="nextul">
                <li @click="getPatternitem(item, index)" @mouseover="nextin" @mouseout="nextinOut" :key="index" :class="patternitem==item ? 'active' :''" v-for="(item, index) in patterntype">
                  {{item.classesName}}
                </li>
              </ul>
            </div>
            <span class="spaceMark">|</span>
            <div class="optionDiv selected">
              <span class="title-name" :class="false ? '' : 'select'">
                               {{qualityitem}}
                              <i class="iconfont icon-arrow-down" v-if="qualityitem=='金属成色'"></i>
                              <i class="el-icon-circle-close" @click="clearMore2" title="清除" v-else></i>
                            </span>
              <ul ref="firstul2" class="firstul">
                <!-- @mouseover="firstclick(item,index)" -->
                <li @click="firstclick2(item, index)" @mouseout="firstout2" :key="index" :class="qualityitem==item ? 'active' :''" v-for="(item, index) in qualityList">
                  {{item.classesName}}
                </li>
              </ul>
              <ul ref="nextul2" class="nextul">
                <li @click="getPatternitem2(item, index)" @mouseover="nextin2" @mouseout="nextin2Out" :key="index" :class="qualityitem==item ? 'active' :''" v-for="(item, index) in qualitytype">
                  {{item.classesName}}
                </li>
              </ul>
            </div>
            <span class="spaceMark">|</span>
            <div class="optionDiv selected">
              <span class="title-name" :class="false ? '' : 'select'">
                               {{bijouitem}}
                              <i class="iconfont icon-arrow-down" v-if="bijouitem=='宝石类型'"></i>
                              <i class="el-icon-circle-close" @click="clearMore3" title="清除" v-else></i>
                            </span>
              <ul ref="firstul3" class="firstul">
                <!-- @mouseover="firstclick(item,index)" -->
                <li @click="firstclick3(item, index)" @mouseout="firstout3" :key="index" :class="bijouitem==item ? 'active' :''" v-for="(item, index) in bijouList">
                  {{item.classesName}}
                </li>
              </ul>
              <ul ref="nextul3" class="nextul">
                <li @click="getPatternitem3(item, index)" @mouseover="nextin3"  @mouseout="nextin3Out" :key="index" :class="bijouitem==item ? 'active' :''" v-for="(item, index) in bijoutype">
                  {{item.classesName}}
                </li>
              </ul>
            </div>
            <span class="spaceMark">|</span>
            <div class="optionDiv selected">
              <span class="title-name" :class="false ? '' : 'select'">
                               {{commodityitem}}
                              <i class="iconfont icon-arrow-down" v-if="commodityitem=='销售状态'"></i>
                              <i class="el-icon-circle-close" @click="clearMore4" title="清除" v-else></i>
                            </span>
              <ul ref="firstul4" class="firstul">
                <!-- @mouseover="firstclick(item,index)" -->
                <li @click="firstclick4(item, index)" :key="index" :class="commodityitem==item ? 'active' :''" v-for="(item, index) in commodityList">
                  {{item.commoditype}}
                </li>
              </ul>
            </div>
            <span class="spaceMark">|</span>
            <div class="optionDiv selected">
              <span class="title-name" :class="false ? '' : 'select'">
                               {{integrateitem}}
                              <i class="iconfont icon-arrow-down" v-if="integrateitem=='综合排序'"></i>
                              <i class="el-icon-circle-close" @click="clearMore5" title="清除" v-else></i>
                            </span>
              <ul ref="firstul4" class="firstul">
                <!-- @mouseover="firstclick(item,index)" -->
                <li @click="firstclick5(item, index)" :key="index" :class="integrateitem==item ? 'active' :''" v-for="(item, index) in integratesequence">
                  {{item.integratese}}
                </li>
              </ul>
            </div>
            <div class="optionDiv sell-new-data oper-btn" @click="addminipattern">添加款号</div>
          </div>
        </div>
        <div style="height:600px;width:100%;margin-top:50px;" v-loading="fullLoading" element-loading-text="拼命进行中...">
          <reportdetailtab :allPatternList="allPatternList" :shopid="shopId" @sortList="sortList" @messageBack="messageBack" @lazyloadSend="lazyloadSend"></reportdetailtab>
        </div>
      </div>
    </transition>
  </template>
  <script>
  import reportdetailtab from "./../newDataGrid/reportDetailTab";
  import { mallsClassification, seekProductClassList, seekGetShopListByCo, programGirardUpdate } from 'Api/commonality/seek.js'
  export default {
    props: ['shopId', 'storePrivilege'],
    data() {
      return {
        fullLoading: false,
        patternList: [], //首饰
        patternitem: '首饰类别',
        patternListId: '', //大类
        patternTypeId: '', //小类
        patterntype: [],
        qualityList: [], //成色
        qualityitem: '金属成色',
        qualityListId: '', //大类
        qualityTypeId: '', //小类
        qualitytype: [],
        bijouList: [],
        bijouitem: '宝石类型',
        bijouListId: '', //大类
        bijouTypeId: '', //小类
        bijoutype: [],
        commoditype: '', //商品状态
        commodityList: [{ num: 1, commoditype: '现货' }, { num: 2, commoditype: '预售' }, { num: 3, commoditype: '下架' }],
        commodityitem: "销售状态",
        commodityId: '4',
        integratesequence: [{ num: 1, integratese: "综合排序" }, { num: 2, integratese: "热度排序" }, { num: 3, integratese: "最新排序" }],
        integrateitem: "综合排序",
        integrateId: '1',
        integratetype: "",
        allPatternList: [], //总的列表数据
        page: 1,
        pageSize: 15,
        priceSortBy: '3'
      }
    },
    watch: {
      shopId: function() {},
      // patternitem: function() {
      //   //款号
      //   for (let i = 0; i < this.patternList.length; i++) {
      //     if (this.patternitem === this.patternList[i].classesName) {
      //       this.patternListId = this.patternList[i].classesId;
      //       this.patternTypeId = ''
      //       this.getmallsClassification();
      //       break;
      //     }
      //   }
      //   for (let i = 0; i < this.patterntype.length; i++) {
      //     if (this.patternitem === this.patterntype[i].classesName) {
      //       this.patternTypeId = this.patterntype[i].classesId;
      //       this.getmallsClassification();
      //       break;
      //     }
      //   }
      // },
      // qualityitem: function() {
      //   // 金属成色
      //   for (let i = 0; i < this.qualityList.length; i++) {
      //     if (this.qualityitem === this.qualityList[i].classesName) {
      //       this.qualityListId = this.qualityList[i].classesId;
      //       this.getmallsClassification();
      //       break;
      //     }
      //   }
      //   for (let i = 0; i < this.qualitytype.length; i++) {
      //     if (this.qualityitem === this.qualitytype[i].classesName) {
      //       this.qualityTypeId = this.qualitytype[i].classesId;
      //       this.getmallsClassification();
      //       break;
      //     }
      //   }
      // },
      // bijouitem: function() {
      //   //宝石类型
      //   for (let i = 0; i < this.bijouList.length; i++) {
      //     if (this.bijouitem === this.bijouList[i].classesName) {
      //       this.bijouListId = this.bijouList[i].classesId;
      //       this.getmallsClassification();
      //       break;
      //     }
      //   }
      //   for (let i = 0; i < this.bijoutype.length; i++) {
      //     if (this.bijouitem === this.bijoutype[i].classesName) {
      //       this.bijouTypeId = this.bijoutype[i].classesId;
      //       this.getmallsClassification();
      //       break;
      //     }
      //   }
      // },
      // commodityitem: function() {
      //   for (let i = 0; i < this.commodityList.length; i++) {
      //     if (this.commodityitem === this.commodityList[i].commoditype) {
      //       this.commodityId = this.commodityList[i].num;
      //       this.getmallsClassification();
      //       break;
      //     }
      //   }
      // },
      // integrateitem: function() {
      //   for (let i = 0; i < this.integratesequence.length; i++) {
      //     if (this.integrateitem === this.integratesequence[i].integratese) {
      //       this.integrateId = this.integratesequence[i].num;
      //       this.getmallsClassification();
      //       break;
      //     }
      //   }
      // }
    },
    created() {
      this.getseekProductClassList(3);
      this.getseekProductClassList(1);
      this.getseekProductClassList(2);
      // if (this.shopId) {
      //   this.getmallsClassification()
      // }
      //this.getmallsClassification();
      // this.getList();
    },
    components: {
      reportdetailtab
    },
    mounted () {
      eventBus.$on('xcx-upload-data', (shopId) => {
        this.getmallsClassification(shopId)
      })
    },
     beforeDestroy () {
      eventBus.$off('xcx-upload-data')
     },
    methods: {
      //-----------------操作值   改变ui 部分
      //----------首饰类型操作部分
      firstclick(item, index) {
        // this.$refs.nextul.style.opacity = 1;
        // this.$refs.nextul.style.visibility = 'visible';
        // this.patterntype = this.patternList[index].childrenList;
        // this.patternitem = item.classesName;

        // 新操作
        this.$refs.nextul.style.opacity = 1
        this.$refs.nextul.style.visibility = 'visible'
        this.patterntype = this.patternList[index].childrenList;
        this.patternListId = item.classesId
        this.patternitem = item.classesName
        this.patternTypeId = ''
        this.getmallsClassification()
      },
      nextin () {
        this.$refs.nextul.style.opacity = 1;
        this.$refs.nextul.style.visibility = 'visible';
      },
      nextinOut () {
        this.$refs.nextul.style.opacity = 0;
        this.$refs.nextul.style.visibility = 'hidden';
      },
      firstout() {
        this.$refs.nextul.style.opacity = 0;
        this.$refs.nextul.style.visibility = 'hidden';

      },
      getPatternitem(item, index) {
        this.patternitem = item.classesName;
        this.firstout();
        // 新操作
        this.patternTypeId = item.classesId
        this.getmallsClassification();
      },
      clearMore() {
        this.patternitem = '首饰类别';
        this.patternListId = "";
        this.patternTypeId = "";
        this.getmallsClassification();
      },
      //-------------金属成色操作部分
      firstclick2(item, index) {
        // this.$refs.nextul2.style.opacity = 1;
        // this.$refs.nextul2.style.visibility = 'visible';
        // this.qualitytype = this.qualityList[index].childrenList;
        // this.qualityitem = item.classesName;

        // 新操作
        this.$refs.nextul2.style.opacity = 1;
        this.$refs.nextul2.style.visibility = 'visible';
        this.qualitytype = this.qualityList[index].childrenList;
        this.qualityListId = item.classesId
        this.qualityitem = item.classesName;
        this.qualityTypeId = ''
        this.getmallsClassification();
      },
      getPatternitem2(item, index) {
        console.log('--------irem', item)
        this.qualityTypeId = item.classesId;
        this.qualityitem = item.classesName;
        this.getmallsClassification();
        this.firstout2();
      },
      nextin2() {
        this.$refs.nextul2.style.opacity = 1;
        this.$refs.nextul2.style.visibility = 'visible';
      },
      nextin2Out () {
        this.$refs.nextul2.style.opacity = 0;
        this.$refs.nextul2.style.visibility = 'hidden';
      },
      firstout2() {
        this.$refs.nextul2.style.opacity = 0;
        this.$refs.nextul2.style.visibility = 'hidden';
      },
      clearMore2() {
        this.qualityitem = '金属成色';
        this.qualityListId = "";
        this.qualityTypeId = "";
        this.getmallsClassification();
      },
      //-----------宝石操作部分
      firstclick3(item, index) {
        this.$refs.nextul3.style.opacity = 1;
        this.$refs.nextul3.style.visibility = 'visible';
        this.bijoutype = this.bijouList[index].childrenList;
        this.bijouitem = item.classesName;
        this.bijouListId = item.classesId;
        this.bijouTypeId = ''
        this.getmallsClassification();
      },
      nextin3Out () {
        this.$refs.nextul3.style.opacity = 0;
        this.$refs.nextul3.style.visibility = 'hidden';
      },
      nextin3() {
        this.$refs.nextul3.style.opacity = 1;
        this.$refs.nextul3.style.visibility = 'visible';
      },
      firstout3() {
        this.$refs.nextul3.style.opacity = 0;
        this.$refs.nextul3.style.visibility = 'hidden';
      },
      getPatternitem3(item, index) {
        this.bijouitem = item.classesName;
        this.bijouTypeId = item.classesId;
        this.getmallsClassification();
        this.firstout3();
      },
      clearMore3() {
        this.bijouitem = '宝石类型';
        this.bijouListId = "";
        this.bijouTypeId = "";
        this.getmallsClassification();
      },
      //---------商品状态操作部分
      firstclick4(item, index) {
        this.commodityitem = item.commoditype;
        this.commodityId = item.num
        this.getmallsClassification();
      },
      clearMore4() {
        this.commodityitem = "销售状态";
        this.commodityId = "";
        this.getmallsClassification();
      },
      firstclick5(item, index) {
        this.integrateitem = item.integratese;
        this.integrateId = item.num
        this.getmallsClassification();
      },
      clearMore5() {
        this.integrateitem = "综合排序";
        this.integrateId = "";
        this.getmallsClassification();
      },
      //----------------网络请求部分------
      addminipattern() {
        // 新增的时候  没有款号id   ---stid
        //编辑的时候有，，从列表里跳转过去  stid
        let role = sessionStorage.getItem('miniprogramrole');
        if (role === '店长' || role === "店员") {
          this.$router.push({ path: '/work/addminiprogram', query: { stid: "", spid: sessionStorage.getItem('shopId') } });
        } else {
          this.$message({ type: 'warning', message: '没有权限' });
          return;
        }

      },
      // getList() {
      //   setTimeout(() => {
      //     this.getmallsClassification();
      //   }, 400);
      // },
      lazyloadSend() {
        if (!this.shopId) {
          return
        }
        //懒加载，，靠
        this.pageSize += 15;
        this.getmallsClassification();
      },
      messageBack() {
        this.getmallsClassification();
      },
      getseekProductClassList(intype) {
        this.fullLoading = true;
        //获取选项参数列表
        // 1=成色名称   2=宝石名称   3=首饰类别   4=宝石属性
        let options = { type: intype }
        seekProductClassList(options).then((res) => {
          // console.log('搜索条件参数值:',res);
          if (res.status == 200) {
            if (intype == 1) {
              this.qualityList = res.data.data.list;
            } else if (intype == 2) {
              this.bijouList = res.data.data.list;
            } else if (intype == 3) {
              this.patternList = res.data.data.list;
            }
          }
        }, (err) => {
          //错误
        })
      },
      sortList(val) {
        //console.log(val);
        this.priceSortBy = val;
        if (this.shopId) {
          this.getmallsClassification();
        }
      },
      getmallsClassification(parm) { //列表请求函数
        this.allPatternList = []
        let options = {
          shopId: parm || this.shopId, //店铺ID
          jewelryBigClassId: this.patternListId, //首饰大类
          jewelrySmallClassId: this.patternTypeId, //首饰小类
          colorBigClassId: this.qualityListId, //成色大类
          colorSmallClassId: this.qualityTypeId, //成色小类
          gemBigClassId: this.bijouListId, //宝石大类
          gemSmallClassId: this.bijouTypeId, //宝石小类
          orderBy: this.integrateId || 1, // 综合排序  1 综合排序，2热度排序，3最新排序
          priceSortBy: this.priceSortBy, //价格排序
          sellType: this.commodityId, //销售状态 1 现货，2 预售，3 下架，4 全部
          page: this.page, //当前页
          pageSize: this.pageSize, //每页显示数
        };
        if (this.commodityId == '') {
          options.sellType = '4';
        }
        mallsClassification(options).then((res) => {
          console.log('获取款号列表数据:', res);
          this.fullLoading = false;
          if (res.data.state == 200) {
            this.allPatternList = res.data.data.dataList; //获取所有的数据分页
          } else {
            this.$message({ type: 'warning', message: res.data.msg });
          }
        });
      },

    }
  }

  </script>
  <style lang="scss" scoped>
  .data-view {
    width: 1080px;
    >.title {
      height: 40px;
      color: #999;
      >i {
        margin-right: 5px;
      }
    }
    .tpl-scroll {
      position: relative;
      max-height: 38px; // overflow: hidden;
      // overflow-y: auto;
      padding-right: 40px;
      .optionWrap {
        margin-top: 3px;
        height: 35px;
        float: right;
        margin-right: 5px;
        .optionDiv {
          z-index: 999;
          &.selected {
            &:after {
              content: '';
              border: 6px solid transparent; //border-bottom-color: #fff;
              width: 0;
              height: 0;
              position: absolute;
              top: 38px;
              right: 0px;
              transition: all .3s;
              margin-left: -3px;
            }

            &:hover {
              >.firstul {
                opacity: 1;
                visibility: visible;
                top: 30px;
              }
              &:after {
                top: 18px;
                border-bottom-color: #fff;
              }
            }
          }
          height: 100%;
          position: relative;
          float: left;
          span {
            cursor: pointer;
            font-size: 14px;
            color: #666;
            font-weight: bold;
            line-height: 33px;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 20px;
            min-width: 80px; //overflow: hidden;
            position: relative;
            i {
              position: absolute;
              right: 0px;
              top: 1px;
              margin-left: 8px;
              font-size: 14px;
              transition: .3s all;
              &.el-icon-circle-close {
                transition: 0s all;
                font-size: 14px;
                color: #ccc;
                top: -4px;
                right: -4px;
                &:hover {
                  color: #2993f8;
                }
              }
            }
          }
          .title-name {
            text-align: right;
            display: block;
            height: 30px;
            line-height: 30px; // overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.select {
              color: #333;
            }
          }
          .title-name.active {
            color: #999;
            cursor: not-allowed;
          }
          .nextul {
            overflow: hidden;
            transition: all .4s ease;
            opacity: 0;
            visibility: hidden;
            transition: all .3s;
            background: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            position: absolute;
            letter-spacing: 0;
            ;
            top: 30px;
            right: -153px;
            max-height: 300px;
            overflow: hidden;
            overflow-y: auto;
            li {
              height: 42px;
              line-height: 42px;
              width: 130px;
              font-size: 13px;
              color: #333;
              white-space: nowrap;
              box-sizing: border-box;
              padding-left: 10px;
              border-bottom: 1px solid #f1f2f3;
              border-left: 4px solid transparent;
              cursor: pointer;
              &.active {
                color: #2993f8;
                border-left-color: #2993f8;
              }
            }
            li:hover {
              background: #f6f7f8;
            }
          }
          .firstul {
            overflow: hidden;
            transition: all .4s ease;
            opacity: 0;
            visibility: hidden;
            transition: all .3s;
            background: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            position: absolute;
            letter-spacing: 0;
            ;
            top: 50px;
            right: -20px;
            max-height: 300px;
            overflow: hidden;
            overflow-y: auto;

            li {
              height: 42px;
              line-height: 42px;
              width: 130px;
              font-size: 13px;
              color: #333;
              white-space: nowrap;
              box-sizing: border-box;
              padding-left: 10px;
              border-bottom: 1px solid #f1f2f3;
              border-left: 4px solid transparent;
              cursor: pointer;
              &.active {
                color: #2993f8;
                border-left-color: #2993f8;
              }
            }
            li:hover {
              background: #f6f7f8;
            }
          }
        }
        .spaceMark {
          float: left;
          font-size: 14px;
          color: #999;
          height: 30px;
          line-height: 30px;
          padding: 0 8px;
        }
        .oper-btn {
          margin-left: 20px;
          font-weight: bolder;
          margin-top: 2px; // background:#2993f8;
        }

        .optionDiv:hover .title-name {
          background: #e0ecf7;
          color: #3195f5;
        }
        .optionDiv:hover .el-icon-circle-close {
          color: #2993f8;
        }
        .optionDiv:hover .title-name .icon-arrow-down {
          transform: rotate(180deg);
        }
        .sell-new-data {
          background: #2993f8;
          border-radius: 4px;
          text-align: center;
          width: 90px;
          height: 28px;
          color: #fff;
          font-size: 12px;
          line-height: 28px;
          cursor: pointer;
          &:hover {
            background: #057aea;
          }
          >span {
            min-width: auto;
            color: #fff;
            padding: 0;
          }
        }
      }
    }
  }

  </style>