<template>
  <div class="choosesignatureBar">
    <h4>选择签名</h4>
    <div class="signatureBarcon">
      <ul class="scroll">
        <div>
          <li v-for="(item,index) in dataList">
            <span class="signaturetemname">{{item.signName}}</span>
            <span class="signaturestatus" v-if="item.defaultFlag == 'Y'">默认</span>
            <!-- <span class="signaturestatus" v-if="item.defaultFlag == 'N'">非默认</span> -->
            <!-- <el-radio-group v-model="radio"  @change="radioChange(item)">
              <el-radio :label="item.signName">&nbsp;</el-radio>
            </el-radio-group> -->
            <el-radio-group v-model="radio">
              <el-radio :label="item">&nbsp;</el-radio>
            </el-radio-group>
          </li>
        </div>
      </ul>
    </div>
    <div class="signature-btn">
      <span @click.stop="signaturedata">确认</span>
    </div>
  </div>
</template>
<script>
import {seekGetSMSSignatureList} from 'Api/commonality/seek'
export default {
  props: ['shopId'],
  data () {
    return {
      dataList: [],
      pageSize: 12,
      radio: {},
      itemData : {}
    }
  },
  mounted () {
    let _self = this
    $(".scroll").mCustomScrollbar({
        theme: "minimal-dark",
        axis: "y",
        callbacks:{
          onTotalScroll: function(){
            console.log(111)
            _self.pageSize += 12
            _self.getseekGetSMSSignatureList()
          }
        }
    })
  },
  created () {
    this.getseekGetSMSSignatureList()
  },
  methods: {
    // radioChange(item){
    //   console.log(111, item)
    //   this.$set(this,'itemData', item)
    // },
    signaturedata () {
      this.$emit("getsignaturedata", this.radio)
    },
    getseekGetSMSSignatureList () {
      let options = {
        shopId: this.shopId,
        page: 1,
        pageSize: this.pageSize,
        type: 1
      }
      console.log(options)
      seekGetSMSSignatureList(options).then(res => {
        console.log('签名', res)
        this.dataList = res.data.data.dataList
        this.dataList.forEach((item, index) => {
          if (item.defaultFlag == 'Y') {
            this.radio = item
          }
        })
        //this.$emit("getsignaturedata", this.dataList[0].signName)
      }, res => {
        this.$message(res)
      })
    },
  }
}
</script>
<style lang="scss">
.choosesignature-bar {
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
.choosesignatureBar {
  .signatureBarcon{
    margin-top: 29px;
    .scroll{
      height: 550px;
    }
    ul{
      div{
        >li:nth-of-type(odd){
          background-color: #f4f4f4;
        }
        >li{
          position: relative;
          padding-left: 18px;
          line-height: 50px;
          .signaturetemname{
            color: #2993f8;
            margin-right: 21px;
          }
          .signaturestatus{
            display: inline-block;
            width: 50px;
            line-height: 20px;
            text-align: center;
            background-color: #2993f8;
            color: #fff;
            border-radius: 5px;
            // margin-right: 431px;
          }
          .el-radio{
            display: inline-block;
            width: 20px;
            position: absolute;
            right: 20px;
            top: 50%;
            margin-top: -10px;
            .el-checkbox__inner{
              border-radius: 3px;
            }
            .el-checkbox__input.is-checked .el-checkbox__inner{
              background-color: #2993f8;
              border-color: #2993f8;
            }
          }
        }
      }
    }
  }
  .signature-btn{
    margin-top: 60px;
    text-align: center;
    span{
      display: inline-block;
      background-color: #2993f8;
      width: 89px;
      line-height: 27px;
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>


