<template>
  <div class="content">
    <div class="content-tit">
      签名
    </div>
    <div class="content-con">
      <ul class="scroll">
        <div>
          <li v-for="(item,index) in dataList" @click.stop="eltercreatemessageshow(item,index)" :key="index">
            <span class="templatename">{{item.signName}}</span>
            <span class="templatetime">{{_GetNYR(item.createTime)}}</span>
            <span class="templatestatus" v-if="item.defaultFlag == 'Y'"><i class="maybe">默认</i></span>
            <span class="disstemplatestatus" v-if="item.defaultFlag == 'N'">
              <i class="dissmaybe">设为默认</i>
              <i class="setmaybe" @click.stop="deletetemplate(item, 4)">设为默认</i>
              <!-- <i class="iconfont icon-lajitong" @click.stop="deletetemplate(item, 3)"></i> -->
            </span>
            <i class="iconfont icon-lajitong" @click.stop="deletetemplate(item, 3)" v-if="item.isRoleCreate=='Y' || shopManageRole"></i>
            <!-- <i class="iconfont icon-lajitong" @click.stop="deletetemplate(item, 3)" v-if="item.isRoleCreate == 'N'"></i> -->
          </li>
        </div>
      </ul>
    </div>
    <div class="content-btn" @click.stop="createsignature(true)"><span>创建签名</span></div>
    <div class="eltercreatemessage" v-if="hidden">
      <div class="top">
        <i class="iconfont icon-chuyidong" @click.stop="createsignature(false)"></i>
      </div>
      <div class="innerimg">
        <img src="../../../../static/img/creat.png" alt="">
      </div>
      <div class="innerlogo">
        <span>修改签名</span>
      </div>
      <div class="innerinfo">
        <input type="text" v-model="elterList.signName" placeholder="签名名称(3-6个字符)">
      </div>
      <div class="div-btn">
        <span @click.stop="eltermessage">确定</span>
      </div>
    </div>
    <div class="createmessage" v-if="isshow">
      <div class="top">
        <i class="iconfont icon-chuyidong" @click.stop="createsignature(false)"></i>
      </div>
      <div class="innerimg">
        <img src="../../../../static/img/creat.png" alt="">
      </div>
      <div class="innerlogo">
        <span>创建签名</span>
      </div>
      <div class="innerinfo">
        <input type="text" v-model="remark" placeholder="签名名称(3-6个字符)">
      </div>
      <div class="div-btn">
        <span @click.stop="createmessage">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
import {GetNYR} from 'assets/js/getTime'
import {seekGetSMSSignatureList, seekMessageOperation} from 'Api/commonality/seek'
export default {
  props: ['shopId', 'shopManageRole'],
  data () {
    return {
      dataList: [],
      elterList: {},
      pageSize: 11,
      remark: '',
      isshow: false,
      hidden: false
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
            _self.pageSize += 11
            _self.getseekGetSMSSignatureList()
          }
        }
    });

  },
  created () {
    this.getseekGetSMSSignatureList()
  },
  methods: {
    _GetNYR (parm) {
      return GetNYR(parm)
    },
    //签名列表
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
      }, res => {
        this.$message(res)
      })
    },
    //设为默认值，删除
    deletetemplate (params, type) {
      console.log(params)
      console.log(params.signId)
      if (type == 3) {
        this.$confirm('此操作将永久删除该签名, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.getseekSignOperation(params, type)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      } else {
        this.getseekSignOperation(params, type)
      }
      // this.getseekGetSMSSignatureList()
    },
    getseekSignOperation (params, type) {
      let options = {
        shopId: this.shopId,
        singId: params.signId,
        operateType: type,
        signName: '',
        remark: ''
      }
      seekMessageOperation(options).then(res => {
        console.log('删除', res)
        if (type == 4) {
          if (res.data.state == 200) {
            this.getseekGetSMSSignatureList()
            // this.$message('删除成功')
          }
        }
        if (type == 3) {
          if (res.data.state == 200) {
            this.getseekGetSMSSignatureList()
            this.$message('删除成功')
          }
        }
      }, res => {
        this.$message(res)
      })
    },
    //创建签名
    createmessage () {
      // if (param.status == 1) {
      //   this.$message('审核成功')
      //   this.getseekGetSMSSignatureList()
      // }
      // if (param.status == 3) {
      //   this.$message('审核中')
      // }
      // if (param.status == 2) {
      //   this.$message('未通过')
      // }
      if (this.remark.length < 3) {
        this.$message('请输入3-6个字符')
        return
      }
      if (this.remark.length > 6) {
        this.$message('请输入3-6个字符')
        return
      }
      let doubel = []
      for (let i of this.dataList) {
        // console.log('去重',i.signName)
        doubel.push(i.signName)
      }
      for (let j of doubel) {
        if (this.remark == j) {
          this.$message('不能重复添加')
          return
        }
      }
      console.log('去重',doubel)

      this.createseekSignOperation()

      this.isshow = false
      this.hidden = false
      // this.isshow = false
    },
    createseekSignOperation () {
      let options = {
        shopId: this.shopId,
        singId: '',
        operateType: 1,
        signName: this.remark,
        remark: ''
      }
      seekMessageOperation(options).then(res => {
        console.log('删除', res)
        if (res.data.state == 200) {
          this.getseekGetSMSSignatureList()
        }
      }, res => {
        this.$message(res)
      })
    },
    createsignature (param) {
      this.remark = ''
      this.isshow = param
      this.hidden = param
    },
    eltercreatemessageshow (params,index) {
      if (params.isRoleCreate == 'N') {
        return
      }
      this.hidden = true
      this.elterList =params
      console.log(this.elterList)
    },
    //修改
    eltermessage () {
      if (this.elterList.signName.length < 3) {
        this.$message('请输入3-6个字符')
        return
      }
      if (this.elterList.signName.length > 6) {
        this.$message('请输入3-6个字符')
        return
      }
      this.eltermessageOperation()
      this.hidden = false
    },
    eltermessageOperation () {
      let options = {
        shopId: this.shopId,
        singId: this.elterList.signId,
        operateType: 2,
        signName: this.elterList.signName,
        remark: ''
      }
      seekMessageOperation(options).then(res => {
        console.log('修改', res)
      }, res => {
        this.$message(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 
</style>

<style lang="scss" scoped>
.signature-bar {
  width: 700px;
  height: 730px;
  background:#fff;
  border-radius: 10px;
  .el-dialog__header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .el-dialog__headerbtn{
        width: 16px;
        height: 16px;
        cursor: pointer;
 }
  }
  .el-dialog__body {
      padding: 0 28px;
  }
}
.content{
  position: relative;
  height: 730px;
  padding: {
    top: 20px;
    left: 30px;
  }
  .content-tit{
    font-size: 13px;
    font-weight: bold;
  }
  .content-con{
    margin-top: 32px;
    >ul{
      &.scroll{
        height: 550px;
      }
      li:hover{
        cursor: pointer;
      }
      li:hover{
        &:nth-of-type(odd){
          background-color: rgba($color: #000, $alpha: 0.1);
        }
        background-color: rgba($color: #000, $alpha: 0.1);
      }
      // li:nth-of-type(even){
      //   &:hover{
      //     background-color: rgba($color: #000000, $alpha: 0.3);
      //   }
      // }
      li{
        position: relative;
        padding-left: 20px;
        height: 53px;
        line-height: 53px;
        &:nth-of-type(odd){
          background-color: #f4f4f4;
        }
        .templatename{
          margin-right: 40px;
          color: #2993f8;
          display: inline-block;
          width: 100px;
        }
        .templatetime{
          display: inline-block;
          width: 374px;
        }
        .icon-lajitong{
          z-index: 1200;
          position: absolute;
          right: 12px;
          // display: none;
        }
        .templatestatus,.disstemplatestatus{
          position: absolute;
          // right: 20px;
          right: 35px;
          top: 50%;
          width: 61px;
          text-align: center;
          margin-top: -10px;
          i{
            font-style: normal;
          }
          display: inline-block;
          background-color: #2993f8;
          height: 20px;
          line-height: 20px;
          border-radius: 5px;
          color: #fff;
          font-size: 12px;
          //   padding: {
          //   right: 10px;
          //   left: 10px;
          // }
          margin-right: 12px;
        }
        .disstemplatestatus{
          background-color: #e9f4f1;
          color: #2993f8;
          .setmaybe{
            display: none;
          }
        }
        .disstemplatestatus:hover{
          .dissmaybe{
            display: none;
          }
          .setmaybe{
            display: block;
            background-color: #e9f4f1;
            border:1px solid #2993f8;
            color: #2993f8;
            border-radius: 5px;
          }
        }
        .icon-lajitong:hover{
          cursor: pointer;
        }
      }
      // >li:hover{
      //   .icon-lajitong{
      //     display: block;
      //   }
      // }
    }
  }
  .content-btn{
    position: absolute;
    bottom: 30px;
    left: -10px;
    width: 100%;
    text-align: center;
    span{
      display: inline-block;
      line-height: 30px;
      width: 90px;
      height: 30px;
      background-color: #2993f8;
      color: #fff;
      border-radius: 5px;
    }
    span:hover{
      cursor: pointer;
      background-color: #e9f4f1;
      border:1px solid #2993f8;
      color: #2993f8;
      border-radius: 5px;
    }
  }
  .eltercreatemessage{
    width: 323px;
    height: 257px;
    background-color: #fff;
    position: fixed;
    right: 50%;
    top: 50%;
    margin-top: -140px;
    margin-right: -161px;
    box-shadow: 0px 0px 15px #888888;
    border-radius: 10px;
    >.top{
      padding-right: 13px;
      padding-left: 13px;
      vertical-align: bottom;
      padding-top: 15px;
      height: 25px;
      .icon-chuyidong{
        color: #ccc;
        float: right;
      }
    }
    >.innerimg{
      height: 46px;
      position: relative;
      width: 100%;
      img{
        position: absolute;
        left: 50%;
        margin-left: -23px;
        display: inline-block;
        width: 46px;
        height: 46px;
        background-color: red;
        border-radius: 50%;
      }
    }
    >.innerlogo{
      text-align: center;
      margin-top: 13px;
      span{
        display: block;
        font-weight: 700;
      }
    }
    >.innerinfo{
      text-align: center;
      input{
        width: 270px;
        height: 40px;
        padding-left: 30px;
        background-color: #f6f7f8;
        margin-top: 35px;
      }
    }
    >.div-btn{
      text-align: center;
      >span{
        display: inline-block;
        width: 150px;
        line-height: 27px;
        background-color: #2993f8;
        border-radius: 5px;
        color: #fff;
        margin-top: 30px;
      }
    }
    >.div-btn:hover{
      cursor: pointer;
    }
  }
  .createmessage{
    width: 323px;
    height: 257px;
    background-color: #fff;
    position: fixed;
    right: 50%;
    top: 50%;
    margin-top: -140px;
    margin-right: -161px;
    box-shadow: 0px 0px 15px #888888;
    border-radius: 10px;
    >.top{
      padding-right: 13px;
      padding-left: 13px;
      vertical-align: bottom;
      padding-top: 15px;
      height: 25px;
      .icon-chuyidong{
        color: #ccc;
        float: right;
      }
    }
    >.innerimg{
      height: 46px;
      position: relative;
      width: 100%;
      img{
        position: absolute;
        left: 50%;
        margin-left: -23px;
        display: inline-block;
        width: 46px;
        height: 46px;
        background-color: red;
        border-radius: 50%;
      }
    }
    >.innerlogo{
      text-align: center;
      margin-top: 13px;
      span{
        display: block;
        font-weight: 700;
      }
    }
    >.innerinfo{
      text-align: center;
      input{
        width: 270px;
        height: 40px;
        padding-left: 30px;
        background-color: #f6f7f8;
        margin-top: 35px;
      }
    }
    >.div-btn{
      text-align: center;
      >span{
        display: inline-block;
        width: 150px;
        line-height: 27px;
        background-color: #2993f8;
        border-radius: 5px;
        color: #fff;
        margin-top: 30px;
      }
    }
    >.div-btn:hover{
      cursor: pointer;
    }
  }
}
</style>
