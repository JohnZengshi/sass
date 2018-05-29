<template>
<div class="amend-popup-wrap1" v-if="isbatchamendShow">
    <i class="el-icon-close" @click="hidebatchamend"></i>
    <div class="popup-tittle">
        <img src="./../../../../../static/img/piliang.png">
        <div>批量修改</div>
    </div>
    <div class="amend-tittle"><span></span>修改的内容</div>
    <ul class="amending-select">
        <li class="selectBox">
            <span class="selTittle">大类别</span>
            <el-select 
              class="options" 
              filterable 
              @change="bigClasschange"
              v-model="popup.amendingLargeClass" 
              placeholder="大类别">
                <el-option v-for="item in littleClass"
                :label="item.name"
                :value="item.englishName">
                </el-option>
            </el-select>
            <span class="titleBox1" v-if="popup.isShowBigClass">请选择大类</span>
        </li>
        <li class="selectBox">
            <span class="selTittle">小类别</span>
            <el-select 
              class="options" 
              filterable 
              ref='littleClass' 
              @change="littleClasschange"
              v-model="popup.amendingLittleClass" 
              placeholder="小类别">
                <el-option v-for="item in getLittleClass(littleClass, popup.amendingLargeClass)"
                :label="item.name"
                :value="item.englishName">
                </el-option>
            </el-select>
            <span class="titleBox1" v-if="popup.isShowLittleClass">请选择小类</span>
        </li>
        <li class="selectBox">
            <span class="selTittle">选择/输入</span>
            <div v-if="!getAmendData(popup.amendingLittleClass)" class="input-w200">
                <el-input v-model="popup.amendingData"></el-input>
            </div>
            <el-select class="options" filterable v-else v-model="popup.amendingData">
              <el-option
                  v-for="item in getAmendData(popup.amendingLittleClass)"
                  :label="item.name || item.brandName || item.certificateName || item.classesName"
                  :value="item.name || item.brandName || item.certificateName || item.classesName">
              </el-option>
            </el-select>
            <span class="titleBox1" v-if="popup.isShowData">请选择/输入</span>
        </li>
    </ul>
    <ul class="amending-scope">
        <el-radio-group v-model="popup.amendingPitchOn">
            <li class="all-check">
                <span class="selTel">全选</span>
                <!--<el-radio :label='popup.amendingAllRow'>全选</el-radio>-->
                <el-switch
                v-model="switchType"
                on-text=""
                off-text=""
                @change="switchAct">
                </el-switch>
            </li>
            <li class="li-bottom" v-show="!switchType">
                <!--<el-radio :label='popup.amendingCustomRow'>修改范围</el-radio>-->
                <span class="selTel">修改范围</span>
                <div class="input-s82">
                    <el-input @input.native="selectInput($event,'amendingStartRow')"  @blur="selectRange('sel1')" v-model="popup.amendingStartRow" :disabled='popup.amendingPitchOn === "2"'></el-input>
                </div>
                <span class="m-lr-10 font14 conact">-</span>
                <div class="input-s82">
                    <el-input @input.native="selectInput($event,'amendingEndRow')"  @blur="selectRange('sel2')" v-model="popup.amendingEndRow" :disabled='popup.amendingPitchOn === "2"'></el-input>
                </div>
                <span class="titleBox1" v-if="popup.editRanges">{{popup.blurTitle}}</span>
            </li>
        </el-radio-group>
    </ul>
    <div class="sure-btn" @click="batchAmending">确定</div>
</div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import { 
  downloadTable, 
  seekProductClassList, 
  seekProductPropertyList, 
  seekCertificateList, 
  seekReceiptXGSynopsis, 
  getUpdateGoodsList,
  seekReceiptStatusList 
} from 'Api/commonality/seek'
import {operateUpdateGoods, operateProductBatchUpdate}from 'Api/commonality/operate'
import {readOnly} from 'Api/commonality/filter' // 过滤器
export default{
  
  data(){
    return{
      switchType: true,
      littleClass : {},
      configPullDownData : [],
      
      popup: {
        
        // 大类必填字段
        isShowBigClass : false,
        amendingLargeClass : '', //大类值
        
        // 小类
        isShowLittleClass : false,
        amendingLittleClass : '', //小类值
        
        //选择输入
        amendingData : '',
        amendingAllRow: "2", // 批量修改的全选行数  // 单选框
        amendingPitchOn: "1", // 批量修改的全选或自定义输入 // 单选框汇总
        
        blurTitle: '', //范围错误提示
        
        isShowData : false,
        
        //修改范围
        editRanges :false,
        amendingStartRow : '',
        amendingEndRow : ''
      },
      allFlag: 2,
    }
  },
  
  props:['isbatchamendShow','dataList','orderNum'],
  
  watch:{
    isbatchamendShow: function(val){
    //   console.log(1111, this.isbatchamendShow)
      if (val == false) {
          Object.assign(this.popup, {
                // 大类必填字段
                isShowBigClass : false,
                amendingLargeClass : '', //大类值
                
                // 小类
                isShowLittleClass : false,
                amendingLittleClass : '', //小类值
                
                //选择输入
                amendingData : '',
                amendingAllRow: "2", // 批量修改的全选行数  // 单选框
                amendingPitchOn: "1", // 批量修改的全选或自定义输入 // 单选框汇总
                
                blurTitle: '', //范围错误提示
                
                isShowData : false,
                
                //修改范围
                editRanges :false,
                amendingStartRow : '',
                amendingEndRow : ''
          })
      }
    }
  },
  
  computed: {
    ...mapGetters([
        "littleClassList", // 小类
        "configPullDownDataList" // 配置的下拉数据
    ]),
  },
  methods: {
    
    hidebatchamend(){
      this.$emit('updataBatchamend', false)
    },
    
    littleClasschange(val){
      this.popup.amendingData = ''
    },
    bigClasschange(val){
      this.popup.amendingLittleClass = ''
      this.popup.amendingData = ''
    },
    getConfigInto () { // 初始化一些配置数据
        if (this.littleClassList) { // 初始化小类
            this.littleClass = this.littleClassList;
        }
        if (this.configPullDownDataList) { // 配置下拉数据
            this.configPullDownData = this.configPullDownDataList;
        }
    },
    getLittleClass (littleDatas, currentData) { // 自定义过滤器 小类别
        if (littleDatas && currentData) {
          let arr = littleDatas.filter(function (littleData) {
              return littleData.englishName === currentData; // || littleData.name === currentData
          })
          let data = arr[0].open.filter(x => !readOnly(x.englishName));
          //console.log(data);
          return data;
        }
    },
    getAmendData (amendData) { // 自定义过滤器  得到修改的内容 小类别
//      console.log(99,amendData, this.configPullDownData)
        for (let i in this.configPullDownData) {
            if (i === amendData) {
              return this.configPullDownData[i]
            }
        }
        return false;
    },
    
    // 批量修改
    batchAmending () { 
      
      //大类
      this.$set(this.popup, 'isShowBigClass', this.popup.amendingLargeClass == '')
      //小类
      this.$set(this.popup, 'isShowLittleClass', this.popup.amendingLittleClass == '')
      //选择输入
      this.$set(this.popup, 'isShowData', this.popup.amendingData == '')
      
      // 非全选情况要对修改范围进行验证
         if (!this.switchType){
           if(!this.selectRange('sel1')){
             this.selectRange('sel2')
           }
         }
      let _Arry = []
      if ( 
        !this.popup.isShowBigClass &&
        !this.popup.isShowLittleClass && 
        !this.popup.isShowData) {
        
        // 全选
        if (this.switchType){
        //   this.dataList.forEach(item => {
        //     _Arry.push({
        //      [this.popup.amendingLittleClass] : this.popup.amendingData,
        //     //  productId : item.now.productId
        //     })
        //   })
          _Arry = [{
                 [this.popup.amendingLittleClass] : this.popup.amendingData
            }]
            this.allFlag = 1
          //console.log('全选')
        } else{
            this.allFlag = 2
          if(!this.popup.editRanges){
          	console.log('123123')
            let sRow = parseFloat(this.popup.amendingStartRow)
            let eRow = parseFloat(this.popup.amendingEndRow)
            // this.dataList.forEach((item,i) => {
            //   let loop = i+1
            //   if ( loop >= sRow && loop <= eRow) {
            //     _Arry.push({
            //      [this.popup.amendingLittleClass] : this.popup.amendingData,
            //      productId : item.now.productId
            //     })
            //   }
            // })
            _Arry = [{
                 [this.popup.amendingLittleClass] : this.popup.amendingData
            }]
             console.log(this.popup)
          }
        }
        
        console.log(_Arry.length)
        if(_Arry.length > 0){
           
        //   operateUpdateGoods({
        //     confirmType : 1,
        //     auditorId : '',
        //     orderNum: this.orderNum,
        //     alterList : _Arry
        //   }).then((res) =>{
        //     //console.log(res)
        //     this.$emit('updataApi')
        //     this.$emit('updataBatchamend', false)
        //   }).catch((res) => {
        //     console.log(res)
        //   })
            operateProductBatchUpdate({
                orderNum: this.orderNum,
                beginNum: this.popup.amendingStartRow,
                endNum: this.popup.amendingEndRow,
                allFlag: this.allFlag,
                alterList : _Arry
            }).then((res) => {
                console.log(res)
                this.$emit('updataApi')
                this.$emit('updataBatchamend', false)
            }).catch((res) => {
                console.log(res)
            })
        }
      }
      
    },
    
    //选择范围错误提示
    selectRange (sel) {
      
         if (sel == 'sel1') {
           if (this.popup.amendingStartRow == '' || this.popup.amendingStartRow < 1 || this.popup.amendingStartRow > this.dataList.length ) {
             this.popup.blurTitle = "调整的范围为 1-"+ this.dataList.length+"行"
             this.$set(this.popup, 'editRanges', true)
             return true
           }else{
             this.$set(this.popup, 'editRanges', false)
             return false
           }
         } else {
           if (this.popup.amendingEndRow == '' || this.popup.amendingEndRow > this.dataList.length) {
             this.popup.blurTitle = "调整的范围为 1- "+this.dataList.length+" 行"
             this.$set(this.popup, 'editRanges', true)
           }else{
             this.$set(this.popup, 'editRanges', false)
           }
         }
    },
    
    selectInput(val, type){
      if(this.popup[type]){
        let val = this.popup[type].replace(/[^\d]/g,'')
        this.$set(this.popup, type, val)
      }
    },
    
    switchAct (val) {
        if (val == true) {
            this.allFlag = 1
            this.popup.amendingPitchOn = '2'
            this.$set(this.popup, 'editRanges', false)
        } else {
            this.allFlag = 2
            this.popup.amendingPitchOn = '1'
            this.$set(this.popup, 'editRanges', true)
        }
        console.log(this.popup)
    },
    
    productCertificateList () { // 证书下拉列表
      seekCertificateList().then((response) => {
          if (response.data.state === 200) {
              this.configPullDownData.certifiName = response.data.data.list
          } else {
              console.log(response)
          }
      })
    },
    
    productPropertyList () { // 获取商品属性下拉列表
      var _self = this;
      let requestNumber = 1;
      //console.log(options)
      function cbFunction () {
          let options = {
              type: requestNumber
          }
          seekProductPropertyList(options).then((response) => {
              //console.log('response:', response.data.state)
              if(response.data.state == 100){
                _self.$message({
                  type : 'error',
                  message :response.data.msg
                })
                return
              }
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
              //console.log(_self.configPullDownData)
              if (requestNumber < 5) {
                  cbFunction();
              }
          }, (response) => {
              console.log(response + "获取商品属性下拉列表");
          })
      }
      cbFunction();
    },
    productClassList () { // 获取商品大小类的下拉列表
      var _self = this;
      let requestNumber = 1;
      function cbFunction () {
          let options = {
              type: requestNumber
          }
          seekProductClassList(options).then((response) => {
              //console.log(response)
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
          }, (response) => {
              console.log(response)
          })
      }
       cbFunction();
    },
  },
  
  mounted(){
      console.log(this)
    this.$nextTick(() =>{
      this.getConfigInto()
      this.productCertificateList() // 证书下拉列表
      this.productPropertyList() // 商品属性下拉列表
      this.productClassList() // 获取商品大小类的下拉列表
    })
  }
}
</script>

<style lang="scss">
  
.amend-popup-wrap1{ // 批量修改
    padding:0 24px;
    width: 320px;
    height: 520px;
    background: #fff;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
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
            margin:0 auto;
            border-radius: 50%;
            overflow: hidden;
            margin-top: 24px;
            margin-bottom: 16px;
        }
        div {
            font-weight: bold;
            color:#333;
            font-size: 14px;
        }
        text-align: center;
    }
    .amend-tittle {
        font-size: 14px;
        color:#333;
        margin-bottom: 19px;
        span {
            margin-top: 3px;
            margin-right: 7px;
            display: block;
            width: 3px;
            height: 14px;
            background:#2994f8;
            float: left;
            border-radius: 1px;
        }
    }
    .amending-select {
        .selectBox {
            font-size: 12px;
            color:#333;
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
            
            .titleBox1{
              position: absolute;
              left: 70px;
              bottom: -15px;
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
            color:#333;
            font-size: 12px;
            // background:#000;
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
            }
            .sure-btn {
                width: 150px;
                height: 28px;
                margin: 0 auto;
                background:#2993f8;
                border-radius: 4px;
                font-size: 12px;
                text-align: center;
                line-height: 28px;
                font-weight: bold;
                color:#fff;
                cursor: pointer;
            }
            
            .titleBox1{
              position: absolute;
              left: 70px;
              bottom: -22px;
              color: red;
              font-size: 12px;
            }
        }
        li:nth-child(1) {
            margin-bottom: 30px;
        }
        li.all-check {
            height: 22px;
            &>span {
                height: 22px;
                line-height: 22px;
            }
        }
				li.li-bottom {
					margin-bottom: 12px;
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
</style>