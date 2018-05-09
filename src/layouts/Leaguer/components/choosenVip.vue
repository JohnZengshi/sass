<template>
  <div class="choosenVipBar">
    <h4>选择会员</h4>
    <div class="topnav">
      <div class="billsnum">
        <input type="text" v-model="keyWord" placeholder="编号/手机号/会员名" @keyup.enter="getkeyWord(keyWord)">
        <span @click.stop="getkeyWord(keyWord)"><i class="iconfont icon-sousuo"></i></span>
      </div>
      <el-select v-model="value" placeholder="请选择" @change="getValue">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="valueone" placeholder="请选择" @change="getValueGrade">
        <el-option
          v-for="item in optionsone"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="valuetwo" placeholder="请选择" class="optionstwo" @change="getStatus">
        <el-option
          v-for="item in optionstwo"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="valuethree" placeholder="请选择" class="optionsthree" @change="getTime">
        <el-option
          v-for="item in optionsthree"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="contentBox">
      <ul class="Scroll">
        <div class="scrool">
          <li v-for="(item,index) in dataList" v-if="item.operateType != 2" :key="index">
            <span class="logBox">
              <img :src="item.logo" alt="">
            </span>
            <span class="vipname">{{item.memberName}}</span>
            <span class="viptype" v-if="item.type == 1" style="backgroundColor:#0078f2">私有</span>
            <span class="viptype" v-if="item.type == 2" style="backgroundColor:#009dff">共有</span>
            <span class="viptype" v-if="item.type == 3" style="backgroundColor:#96d7ff">公共</span>
            <span class="viprank" v-if="item.grade == 1" style="backgroundColor:#ffc62e">普通</span>
            <span class="viprank" v-if="item.grade == 2" style="backgroundColor:#ffa200">中级</span>
            <span class="viprank" v-if="item.grade == 3" style="backgroundColor:#f27200">重要</span>
            <span class="telepnum"><i class="iconfont icon-dingshigenjin"></i>{{item.phone}}</span>
            <el-checkbox-group v-model="checkList">
              <el-checkbox :label="item"></el-checkbox>
            </el-checkbox-group>
          </li>
        </div>
      </ul>
    </div>
    <div class="choosenVipBar-btn">
      <span  @click="closeDia">确认</span>
      <el-checkbox v-model="checkAll" @change="changAllAct"></el-checkbox>
    </div>
  </div>
</template>
<script>
import {seekMemberAllList} from 'Api/commonality/seek'
export default {
  props: ['shopId', 'choosenVipclick'],
  data () {
    return {
      dataList: [],
      checkList: [],
      checkAll: false,
      options: [{
          value: '',
          label: '全部'
        },{
          value: '1',
          label: '私有'
        }, {
          value: '2',
          label: '共有'
        }, {
          value: '3',
          label: '公共'
        }],
      value: '',
      optionsone: [{
          value: '',
          label: '全部'
        },{
          value: '1',
          label: '普通'
        }, {
          value: '2',
          label: '中级'
        }, {
          value: '3',
          label: '重要'
        }],
      valueone: '',
      optionstwo: [{
          value: '',
          label: '全部'
        },{
          value: '1',
          label: '<1个月'
        }, {
          value: '2',
          label: '从未跟进过'
        }, {
          value: '3',
          label: '>6个月'
        }, {
          value: '4',
          label: '1~6个月'
        }],
      valuetwo: '',
      optionsthree: [{
          value: '',
          label: '全部'
        },{
          value: '1',
          label: '今天'
        }, {
          value: '2',
          label: '3天以内'
        }, {
          value: '3',
          label: '1周以内'
        }, {
          value: '4',
          label: '>一个月'
        }, {
          value: '5',
          label: '<3个月'
        }],
      valuethree: '',
      memberType: '',
      memberGrade: '',
      keyWord: '',
      followStatus: '',
      buyTime: ''
    }
  },
  created () {
    this.getseekMemberAllList()
  },
  watch: {
    choosenVipclick (val) {
      if (val == false) {
        this.checkList = []
      }
    }
  },
  mounted () {
     $(".Scroll").mCustomScrollbar({
        theme: "minimal-dark",
        axis: "y",
        // callbacks:{
        //   onTotalScroll: function(){
        //     console.log(111)
        //     _self.pageSize += 12
        //     _self.getSeekGetSMSLog()
        //   }
        // }
    })
  },
  methods: {
    changAllAct (val) {
      // console.log(this.dataList)
      // console.log(this.checkAll)
      if (this.checkAll == true) {
        this.checkList = []
        this.dataList.forEach((item, index) => {
          this.checkList.push(item)
        })
      } else {
        this.checkList = []
      }
    },
    closeDia () { // 关闭弹窗
      this.$emit("closeChoMember", {list: this.checkList})
    },
    getValue (val) {
      this.memberType = val
      // this.keyWord = ''
      // this.memberGrade = ''
      // this.followStatus = ''
      // this.buyTime = ''
      console.log(val)
      this.getseekMemberAllList()
    },
    getValueGrade (val) {
      this.memberGrade = val
      // this.memberType = ''
      // this.keyWord = ''
      // this.followStatus = ''
      // this.buyTime = ''
      console.log(val)
      this.getseekMemberAllList()
    },
    getkeyWord (val) {
      this.keyWord = val
      // this.memberGrade = ''
      // this.memberType = ''
      // this.followStatus = ''
      // this.buyTime = ''
      console.log(val)
      this.getseekMemberAllList()
    },
    getStatus (val) {
      this.followStatus = val
      // this.memberGrade = ''
      // this.memberType = ''
      // this.keyWord = ''
      // this.buyTime = ''
      console.log(val)
      this.getseekMemberAllList()
    },
    getTime (val) {
      this.followStatus = ''
      this.memberGrade = ''
      this.memberType = ''
      this.keyWord = ''
      this.buyTime = val
      console.log(val)
      this.getseekMemberAllList()
    },
    getseekMemberAllList () {
      let options = {
        shopId: this.shopId,
        memberType: this.memberType,
        memberGrade: this.memberGrade,
        lastUpdateTime: '',
        keyWord: this.keyWord,
        followStatus: this.followStatus,
        buyTime: this.buyTime
      }
      seekMemberAllList(options).then(res => {
        console.log('会员列表', res.data.data.dataList)
        this.dataList = res.data.data.dataList
        // console.log('会员列表1', this.dataList)
      }, res => {
        this.$message(res.data.msg)
      })
    }
  }
}
</script>
<style lang="scss">
.choosenVip-bar {
  width: 700px;
  height: 731px;
  background:#fff;
  border-radius: 10px;
  .el-dialog__header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
  }
  .el-dialog__body {
      padding: 0 28px;
  }
}
.choosenVipBar{
  >.topnav{
    margin-top: 30px;
    .billsnum{
      vertical-align: top;
      width: 189px;
      height: 28px;
      display: inline-block;
      border:1px solid #ddd;
      margin-right: 17px;
      border-radius: 3px;
      >input{
        padding-left: 10px;
        width: 155px;
        height: 100%;
        float: left;
      }
      >span{
        display: inline-block;
        width: 31px;
        height: 100%;
        background-color: #2993f8;
        float: right;
        border-radius: 3px;
        text-align: center;
        .icon-sousuo{
          color: #fff;
          font-size: 12px;
          line-height: 28px;
        }
      }
    }
    .optionstwo{
      width: 120px !important;
    }
    .optionsthree{
      width: 100px !important;
    }
    .el-select{
      width: 81px;
      margin-right: 10px;
      >input{
        font-size: 12px;
      }
      .el-input__inner{
        background-color: #fff;
        border:1px solid #ddd;
        padding: {
          top: 0;
          bottom: 0;
        }
        height: 28px;
      }
    }
  }
  .contentBox{
    margin-top: 23px;
    >ul{
      height: 500px;
      .scrool{
        li:nth-of-type(even){
          background-color: #f4f4f4;
        }
        li{
          position: relative;
          line-height: 50px;
          padding: {
            left: 23px;
          }
          >span{
            display: inline-block;
            vertical-align: middle;
          }
          .logBox{
            >img{
              width: 36px;
              height: 36px;
            }
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 14px;
            // background-color: red;
          }
          .vipname{
            // margin-right: 27px;
            display: inline-block;
            width: 66px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: inline-block;
            vertical-align: middle;
          }
          .viptype{
            margin-right: 15px;
            line-height: 16px;
            display: inline-block;
            font-size: 12px;
            color: #fff;
            padding: {
              top: 2px;
              bottom: 2px;
              left: 5px;
              right: 5px;
              border-radius: 2px;
            }
          }
          .viprank{
            margin-right: 50px;
            line-height: 16px;
            display: inline-block;
            font-size: 12px;
            color: #fff;
            border-radius: 2px;
            padding: {
              top: 2px;
              bottom: 2px;
              left: 5px;
              right: 5px;
            }
          }
          .telepnum{
            margin-right: 218px;
            .icon-dingshigenjin{
              color: #2993f8;
              margin-right: 8px;
            }
          }
          .el-checkbox-group{
            position: absolute;
            right: 20px;
          }
          .el-checkbox{
            display: inline-block;
            width: 20px;
            .el-checkbox__inner{
              border-radius: 3px;
            }
            .el-checkbox__input.is-checked .el-checkbox__inner{
              background-color: #2993f8;
              border-color: #2993f8;
            }
          }
          .el-checkbox-group{
            display: inline-block;
          }
        }
      }
    }
  }
  .choosenVipBar-btn{
    margin-top: 60px;
    text-align: center;
    &>span{
      display: inline-block;
      background-color: #2993f8;
      width: 89px;
      line-height: 27px;
      color: #fff;
      border-radius: 5px;
    }
    .el-checkbox {
      width: 60px;
      height: 27px;
      line-height: 27px;
      float: right;
      // .el-checkbox__label {
      //   font-size: 14px;
      // }
      .el-checkbox__input {
        .el-checkbox__inner {
          border-radius: 4px;
        }
      }
      .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color: #2993f8;
        border-color: #2993f8;
      }
    }
  }
  .choosenVipBar-btn:hover{
    cursor: pointer;
  }
}
</style>


