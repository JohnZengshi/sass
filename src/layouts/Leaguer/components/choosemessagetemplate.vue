<template>
<div class="choosemessagetemplateBar">
    <h4>选择模板</h4>
    <div class="signatureBarcon">
      <ul class="scroll">
        <div>
          <li v-for="item in dataList">
            <span class="signaturetemname">{{item.templateName}}</span>
            <span class="signaturestatus">{{item.templateConten}}</span>
            <el-radio-group v-model="radio">
              <el-radio :label="item">&nbsp;</el-radio>
            </el-radio-group>
          </li>
        </div>
      </ul>
    </div>
    <div class="signature-btn">
      <span @click.stop="meaasgetemp">确认</span>
    </div>
  </div>
</template>
<script>
import {seekGetSignList} from 'Api/commonality/seek'
export default {
  props: ['shopId'],
  data () {
    return {
      radio: '',
      pageSize: 12,
      dataList: []
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
            _self.getseekGetSignList()
          }
        }
    })
  },
  created () {
    this.getseekGetSignList()
  },
  methods: {
    meaasgetemp () {
      this.$emit('getmeaasgetemp', {templateConten: this.radio.templateConten})
    },
    getseekGetSignList () {
      let options = {
        shopId: this.shopId,
        page: 1,
        pageSize: this.pageSize
      }
      seekGetSignList(options).then(res => {
        console.log('24.5	短信模板列表', res)
        this.dataList = res.data.data.dataList
      }, res => {
        this.$message(res.data.msg)
      })
    }
  }
}
</script>
<style lang="scss">
.choosemessagetemplate-bar {
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
.choosemessagetemplateBar {
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
            // margin-right: 21px;
            width: 100px;
            display: inline-block;
          }
          .signaturestatus{
            display: inline-block;
            width: 300px;
            line-height: 20px;
            // text-align: center;
            border-radius: 5px;
            // margin-right: 170px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: inline-block;
            width: 423px;
            line-height: 50px;
            vertical-align: middle;
          }
          .el-radio{
            display: inline-block;
            position: absolute;
            right: 20px;
            top: 50%;
            margin-top: -10px;
            width: 20px;
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


