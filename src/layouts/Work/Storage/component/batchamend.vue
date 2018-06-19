<template>
  <div class="amend-popup-wrap1" v-if="isbatchamendShow">
    <i class="el-icon-close" @click="hidebatchamend"></i>
    <div class="popup-tittle">
      <img src="./../../../../../static/img/piliang.png">
      <div>批量修改</div>
    </div>
    <div class="amend-tittle">
      <span></span>修改的内容</div>
    <ul class="amending-select">
      <li class="selectBox flex flex-r">
        <span class="selTittle">选择内容</span>
        <!-- --------------------------------修改前 -->
        <!-- <el-select class="options" filterable @change="bigClasschange" v-model="popup.amendingLargeClass" placeholder="大类别">
          <el-option v-for="item in littleClass" :label="item.name" :value="item.englishName">
          </el-option>
        </el-select> -->
        <!-- -------------------------------- -->
        <el-cascader expand-trigger="hover" :options="littleClass" :props="props" v-model="selectValue" popper-class="multiSelectBox"
          :clearable="true" @change="selectChange">
        </el-cascader>
        <span class="titleBox1" v-if="popup.isShowBigClass">请选择内容</span>
      </li>
      <!-- --------------------------------修改前 -->
      <!-- <li class="selectBox">
        <span class="selTittle">小类别</span>
        <el-select class="options" filterable ref='littleClass' @change="littleClasschange" v-model="popup.amendingLittleClass" placeholder="小类别">
          <el-option v-for="item in getLittleClass(littleClass, popup.amendingLargeClass)" :label="item.name" :value="item.englishName">
          </el-option>
        </el-select>
        <span class="titleBox1" v-if="popup.isShowLittleClass">请选择小类</span>
      </li> -->
      <!-- -------------------------------- -->
      <li class="selectBox">
        <span class="selTittle">选择/输入</span>
        <!-- --------------------------------修改前 -->
        <!-- 输入框 -->
        <!-- <div v-if="!getAmendData(popup.amendingLittleClass)" class="input-w200">
          <el-input v-model="popup.amendingData"></el-input>
        </div> -->
        <!-- 选择框 -->
        <!-- <el-select v-else class="options" filterable v-model="popup.amendingData">
          <el-option v-for="item in getAmendData(popup.amendingLittleClass)" :label="item.name || item.brandName || item.certificateName || item.classesName"
            :value="item.name || item.brandName || item.certificateName || item.classesName">
          </el-option>
        </el-select> -->
        <!-- --------------------------- -->
        <!-- 输入框 -->
        <!-- <div v-show="selectOrInput == 'input'" class="input-w200">
          <el-input v-model="popup.amendingData"></el-input>
        </div> -->
        <!-- ------------------------------修改前 -->
        <div v-show="selectOrInput == 'input'" class="input-w200">
          <el-input v-model="amendingData"></el-input>
        </div>
        <!-- 选择框 -->
        <el-select v-show="selectOrInput == 'select'" class="options" filterable v-model="amendingData">
          <el-option v-for="item in selval" :value="item.name || item.brandName || item.certificateName || item.classesName">
          </el-option>
        </el-select>
        <span class="titleBox1" v-if="popup.isShowData">请选择/输入</span>
      </li>
    </ul>
    <ul class="amending-scope">
      <el-radio-group v-model="popup.amendingPitchOn">
        <li class="li-bottom">
          <!--<el-radio :label='popup.amendingCustomRow'>修改范围</el-radio>-->
          <span class="selTel">修改范围</span>
          <div class="input-s82">
            <el-input @input.native="selectInput($event,'amendingStartRow')" @blur="selectRange('sel1')" v-model="popup.amendingStartRow"
              :disabled='popup.amendingPitchOn === "2" || switchType'></el-input>
          </div>
          <span class="m-lr-10 font14 conact">-</span>
          <div class="input-s82">
            <el-input @input.native="selectInput($event,'amendingEndRow')" @blur="selectRange('sel2')" v-model="popup.amendingEndRow"
              :disabled='popup.amendingPitchOn === "2" || switchType'></el-input>
          </div>
          <span class="titleBox1" v-if="popup.editRanges">{{popup.blurTitle}}</span>
        </li>
        <li class="all-check">
          <span class="selTel">全选</span>
          <!--<el-radio :label='popup.amendingAllRow'>全选</el-radio>-->
          <el-switch v-model="switchType" on-text="" off-text="" @change="switchAct">
          </el-switch>
        </li>
      </el-radio-group>
    </ul>
    <div class="sure-btn" @click="batchAmending">确定</div>
  </div>
</template>
<script>
  import {
    mapActions,
    mapGetters,
    mapState
  } from 'vuex'
  import {
    downloadTable,
    seekProductClassList,
    seekProductPropertyList,
    seekCertificateList,
    seekReceiptXGSynopsis,
    getUpdateGoodsList,
    seekReceiptStatusList
  } from 'Api/commonality/seek'
  import {
    operateUpdateGoods,
    operateProductBatchUpdate
  } from 'Api/commonality/operate'
  import {
    readOnly
  } from 'Api/commonality/filter' // 过滤器
  export default {

    data() {
      return {
        switchType: true,
        littleClass: [],
        configPullDownData: [],

        popup: {

          // 大类必填字段
          isShowBigClass: false,
          amendingLargeClass: '', //大类值

          // 小类
          isShowLittleClass: false,
          amendingLittleClass: '', //小类值

          //选择输入
          amendingData: '',
          amendingAllRow: "2", // 批量修改的全选行数  // 单选框
          amendingPitchOn: "1", // 批量修改的全选或自定义输入 // 单选框汇总

          blurTitle: '', //范围错误提示

          isShowData: false,

          //修改范围
          editRanges: false,
          amendingStartRow: '',
          amendingEndRow: ''
        },
        allFlag: 2,
        props: {
          value: "englishName",
          label: "name",
          children: "open"
        },
        // 选择内容框中选中的值
        selectValue: [],
        // ------------------------------
        // 输入框或选择框
        selectOrInput: "input",
        // 选择框可选的值
        selval: [],
        // 选择框或输入框中的值
        amendingData: "",
      }
    },

    props: ['isbatchamendShow', 'dataList', 'orderNum'],

    watch: {
      isbatchamendShow: (val) => {
        // if (val == false) {
        //   Object.assign(this.popup, {
        //     // 大类必填字段
        //     isShowBigClass: false,
        //     amendingLargeClass: '', //大类值

        //     // 小类
        //     isShowLittleClass: false,
        //     amendingLittleClass: '', //小类值

        //     //选择输入
        //     amendingData: '',
        //     amendingAllRow: "2", // 批量修改的全选行数  // 单选框
        //     amendingPitchOn: "1", // 批量修改的全选或自定义输入 // 单选框汇总

        //     blurTitle: '', //范围错误提示

        //     isShowData: false,

        //     //修改范围
        //     editRanges: false,
        //     amendingStartRow: '',
        //     amendingEndRow: ''
        //   })
        // }
      }
    },

    computed: {
      ...mapGetters([
        "littleClassList", // 小类
        "configPullDownDataList" // 配置的下拉数据
      ]),
    },
    methods: {
      // 关闭弹窗
      hidebatchamend() {
        this.$emit('updataBatchamend', false);
        this.resetPopupData();
      },

      littleClasschange(val) {
        this.popup.amendingData = ''
      },
      bigClasschange(val) {
        this.popup.amendingLittleClass = null;
        this.popup.amendingData = ''
      },
      getConfigInto() { // 初始化一些配置数据
        if (this.littleClassList) { // 初始化小类
          this.littleClass = this.littleClassList;
        }
        if (this.configPullDownDataList) { // 配置下拉数据
          this.configPullDownData = this.configPullDownDataList;
        }
        console.log(this.littleClass)
      },
      getLittleClass(littleDatas, currentData) { // 自定义过滤器 小类别
        if (littleDatas && currentData) {
          let arr = littleDatas.filter(function (littleData) {
            return littleData.englishName === currentData; // || littleData.name === currentData
          })
          let data = arr[0].open.filter(x => !readOnly(x.englishName));
          console.log(data)
          return data;
        }
      },
      getAmendData(amendData) { // 自定义过滤器  得到修改的内容 小类别
        for (let i in this.configPullDownData) {
          if (i === amendData) {
            return this.configPullDownData[i]
          }
        }
        return false;
      },

      // 批量修改
      batchAmending() {
        //   <!-- --------------------------------修改前 -->
        //大类
        // this.$set(this.popup, 'isShowBigClass', this.popup.amendingLargeClass == '')
        //小类
        // this.$set(this.popup, 'isShowLittleClass', this.popup.amendingLittleClass == '')
        //选择输入
        // this.$set(this.popup, 'isShowData', this.popup.amendingData == '')
        // <!-- -------------------------------- -->

        // 非全选情况要对修改范围进行验证
        if (!this.switchType) {
          if (!this.selectRange('sel1')) {
            this.selectRange('sel2')
          }
        }

        let _Arry = []
        if (!this.popup.isShowBigClass &&
          !this.popup.isShowLittleClass &&
          !this.popup.isShowData) {
          // 全选
          if (this.switchType) {
            this.allFlag = 1
            _Arry = [{
              // <!-- --------------------------------修改前 -->
              //   [this.popup.amendingLittleClass]: this.popup.amendingData,
              [this.selectValue[this.selectValue.length - 1]]: this.amendingData,
            }]
          } else {
            this.allFlag = 2
            if (!this.popup.editRanges) {
              let sRow = parseFloat(this.popup.amendingStartRow)
              let eRow = parseFloat(this.popup.amendingEndRow)
              //   _Arry = [{
              //     [this.popup.amendingLittleClass]: this.popup.amendingData
              //   }]
              _Arry = [{
                // <!-- --------------------------------修改前 -->
                // [this.popup.amendingLittleClass]: this.popup.amendingData
                [this.selectValue[this.selectValue.length - 1]]: this.amendingData,
              }]
            }
          }

          if (_Arry.length > 0) {
            console.log(_Arry)
            operateProductBatchUpdate({
              orderNum: this.orderNum,
              beginNum: this.popup.amendingStartRow,
              endNum: this.popup.amendingEndRow,
              allFlag: this.allFlag,
              alterList: _Arry
            }).then((res) => {
              this.$emit('updataApi')
              this.$emit('updataBatchamend', false)
            }).catch((res) => {})
          }
        }

        this.resetPopupData();
      },

      //选择范围错误提示
      selectRange(sel) {

        if (sel == 'sel1') {
          if (this.popup.amendingStartRow == '' || this.popup.amendingStartRow < 1 || this.popup.amendingStartRow >
            this.dataList.length) {
            this.popup.blurTitle = "调整的范围为 1-" + this.dataList.length + "行"
            this.$set(this.popup, 'editRanges', true)
            return true
          } else {
            this.$set(this.popup, 'editRanges', false)
            return false
          }
        } else {
          if (this.popup.amendingEndRow == '' || this.popup.amendingEndRow > this.dataList.length) {
            this.popup.blurTitle = "调整的范围为 1- " + this.dataList.length + " 行"
            this.$set(this.popup, 'editRanges', true)
          } else {
            this.$set(this.popup, 'editRanges', false)
          }
        }
      },

      selectInput(val, type) {
        if (this.popup[type]) {
          let val = this.popup[type].replace(/[^\d]/g, '')
          this.$set(this.popup, type, val)
        }
      },

      switchAct(val) {
        if (val == true) {
          this.popup.amendingPitchOn = '2'
          this.$set(this.popup, 'editRanges', false)
        } else {
          this.popup.amendingPitchOn = '1'
          this.$set(this.popup, 'editRanges', true)
        }
      },

      productCertificateList() { // 证书下拉列表
        seekCertificateList().then((response) => {
          if (response.data.state === 200) {
            this.configPullDownData.certifiName = response.data.data.list
          } else {}
        })
      },

      productPropertyList() { // 获取商品属性下拉列表
        var _self = this;
        let requestNumber = 1;

        function cbFunction() {
          let options = {
            type: requestNumber
          }
          seekProductPropertyList(options).then((response) => {
            var pullDowndata = [];
            for (let i = 0; i < response.data.data.list.length; i++) {
              pullDowndata.push(response.data.data.list[i])
            }
            switch (requestNumber) {
              case 1: // 金含量
                _self.configPullDownData.partGold = pullDowndata;
                break;
              case 2: // 品牌
                _self.configPullDownData.brand = pullDowndata;
                break;
              case 3: // 金属颜色
                _self.configPullDownData.goldColor = pullDowndata;
                break;
              case 4: // 配件名称
                _self.configPullDownData.partName = pullDowndata;
                break;
            }
            requestNumber += 1;
            if (requestNumber < 5) {
              cbFunction();
            }
          }, (response) => {})
        }
        cbFunction();
      },
      productClassList() { // 获取商品大小类的下拉列表
        var _self = this;
        let requestNumber = 1;

        function cbFunction() {
          let options = {
            type: requestNumber
          }
          seekProductClassList(options).then((response) => {
            var pullDowndata = [];
            for (let i = 0; i < response.data.data.list.length; i++) {
              for (let j = 0; j < response.data.data.list[i].childrenList.length; j++) {
                pullDowndata.push(response.data.data.list[i].childrenList[j])
              }
            }
            switch (requestNumber) {
              case 1: // 成色名称
                _self.configPullDownData.metalColor = pullDowndata;
                break;
              case 2: // 宝石名称
                _self.configPullDownData.gemName = pullDowndata; // 宝石名称
                _self.configPullDownData.mainName = pullDowndata; // 主石
                _self.configPullDownData.deputyName = pullDowndata; // 副石
                break;
              case 3: // 首饰类别
                _self.configPullDownData.jewelryName = pullDowndata;
                break;
              case 4: // 商品属性
                for (let i = 0; i < response.data.data.list.length; i++) {
                  switch (response.data.data.list[i].classesName) { // 少一个规格没弄
                    case "规格": // 主副石
                      _self.configPullDownData.stand = response.data.data.list[i].childrenList;
                      _self.configPullDownData.deputyStand = response.data.data.list[i].childrenList;
                      break;
                    case "宝石规格": // 主副石
                      _self.configPullDownData.stand = response.data.data.list[i].childrenList;
                      _self.configPullDownData.deputyStand = response.data.data.list[i].childrenList;
                      break;
                    case "形状":
                      _self.configPullDownData.shape = response.data.data.list[i].childrenList;
                      break;
                    case "颜色":
                      _self.configPullDownData.color = response.data.data.list[i].childrenList;
                      break;
                    case "净度":
                      _self.configPullDownData.neatNess = response.data.data.list[i].childrenList;
                      break;
                    case "切工":
                      _self.configPullDownData.blackout = response.data.data.list[i].childrenList;
                      break;
                    case "抛光":
                      _self.configPullDownData.polishing = response.data.data.list[i].childrenList;
                      break;
                    case "对称":
                      _self.configPullDownData.symmetry = response.data.data.list[i].childrenList;
                      break;
                    case "荧光":
                      _self.configPullDownData.fluorescent = response.data.data.list[i].childrenList;
                      break;
                  }
                }
                break;
            }
            requestNumber += 1;
            if (requestNumber < 5) {
              cbFunction();
            }
          }, (response) => {})
        }
        cbFunction();
      },
      selectChange() {
        // console.log(this.littleClass)
        // console.log(this.selectValue[this.selectValue.length - 1])
        let haoName = this.selectValue[this.selectValue.length - 1];
        if (this.configPullDownData[haoName]) {
          if (this.configPullDownData[haoName].length == 0) {
            console.log("输入值")
            this.selectOrInput = "input"
          } else {
            console.log("可选择")
            console.log(this.configPullDownData[haoName])
            this.selectOrInput = "select";
            this.selval = this.configPullDownData[haoName];
            this.amendingData = "";
          }
        } else {
          console.log("输入值")
          this.selectOrInput = "input"
        }

      },
      //   初始化弹窗的值
      resetPopupData() {
        this.selectOrInput = "input";
        this.selectValue = [];
        this.selval = [];
        this.amendingData = "";
      }

    },

    mounted() {
      this.$nextTick(() => {
        this.getConfigInto()
        this.productCertificateList() // 证书下拉列表
        this.productPropertyList() // 商品属性下拉列表
        this.productClassList() // 获取商品大小类的下拉列表
      })
    }
  }

</script>
<style lang="scss">
  .amend-popup-wrap1 {
    // 批量修改
    padding: 0 24px;
    width: 320px;
    height: 520px;
    background: #fff;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    margin-left: -160px;
    margin-top: -250px;
    z-index: 200;
    .el-icon-close {
      position: absolute;
      right: 8px;
      top: 8px;
      font-size: 12px;
      cursor: pointer;
    }
    .popup-tittle {
      margin-bottom: 30px;
      img {
        width: 46px;
        height: 46px;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        margin-top: 24px;
        margin-bottom: 16px;
      }
      div {
        font-weight: bold;
        color: #333;
        font-size: 14px;
      }
      text-align: center;
    }
    .amend-tittle {
      font-size: 14px;
      color: #333;
      margin-bottom: 19px;
      span {
        margin-top: 3px;
        margin-right: 7px;
        display: block;
        width: 3px;
        height: 14px;
        background: #2994f8;
        float: left;
        border-radius: 1px;
      }
    }
    .amending-select {
      .selectBox {
        font-size: 12px;
        color: #333;
        height: 36px;
        margin-bottom: 24px;
        position: relative;
        .selTittle {
          width: 66px;
          height: 36px;
          display: block;
          float: left;
          line-height: 36px;
        }
        .options {
          width: 206px;
          .el-input {
            border: none;
          }
        }
        .input-w200 {
          height: 36px;
          .el-input {
            height: 36px;
            .el-input__inner {
              height: 36px;
            }
          }
        }
        .titleBox1 {
          position: absolute;
          left: 70px;
          bottom: -22px;
          color: red;
        }
      }
    }
    .amending-scope {
      .selTel {
        width: 66px;
        height: 36px;
        display: block;
        float: left;
        line-height: 36px;
        color: #333;
        font-size: 12px; // background:#000;
      }
      li {
        height: 36px;
        position: relative;
        .input-s82 {
          width: 82px;
          height: 36px;
          float: left;
        }
        .conact {
          float: left;
          line-height: 36px;
        }
        .titleBox1 {
          position: absolute;
          left: 70px;
          bottom: -17px;
          color: red;
          font-size: 12px;
        }
      } // li:nth-child(1) {
      //   margin-bottom: 30px;
      // }
      li.all-check {
        height: 22px;
        &>span {
          height: 22px;
          line-height: 22px;
        }
      }
      li.li-bottom {
        margin-bottom: 35px;
      }
    }
    .sure-btn {
      position: absolute;
      width: 150px;
      height: 28px;
      bottom: 15px;
      left: 90px;
      background: #2993f8;
      border-radius: 4px;
      font-size: 12px;
      text-align: center;
      line-height: 28px;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
    }
  }

  .multiSelectBox {
    // left: 760px !important;
    transform: translateX(160px);
    border-radius: 10px;
    border: none;
    height: 380px;
    overflow: hidden;
    ul {
      width: 120px;
      height: 100%;
      padding: 0;
      &:first-of-type {
        li {
          &:hover {}
        }
      }
      li {
        line-height: 42px;
        height: 42px;
        padding-top: 0;
        padding-bottom: 0;
        .el-cascader-menu__item.is-active {
          color: #48576a !important;
          background-color: #e4e8f1 !important;
        }
        .el-cascader-menu__item.is-active:hover {
          background-color: #e4e8f1 !important;
        }
      }
    }
  }

  .el-cascader-menu__item {
    text-align: center;
    &.is-active {
      color: #2993F8;
      background-color: #e4e8f1 !important;
      &::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        width: 3px;
        height: 100%;
        background-color: #2993F8;
      }
    }
  }

</style>
<style lang="scss" scoped>
  .flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }

  .flex-v {
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .flex-r {
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }

  .flex-1 {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

  .flex-align-center {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .flex-pack-center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .flex-pack-justify {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

</style>
