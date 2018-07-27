<template>
  <div class="messagetemplatebar">
    <h4>
      模板
    </h4>
    <div class="content-con">
      <ul class="scroll">
        <div>
          <li @click.stop="amendmessage(item, index)" v-for="(item,index) in dataList">
            <span class="templatenamemes">{{item.templateName}}</span>
            <span class="templateConten">{{item.templateConten}}</span>
            <span class="templatetimemes">{{_GetNYR(item.createTime)}}</span>
            <span class="createUserName">{{item.createUserName}}</span>
            <!-- <i class="iconfont icon-lajitong" @click.stop="deleteseekSignOperation(item, 3)" v-if="item.isRoleCreate=='Y'||item.userRole == '1'"></i> -->
            <i class="iconfont icon-lajitong" @click.stop="deleteseekSignOperation(item, 3)" v-if="item.isRoleCreate=='Y'||shopManageRole == true"></i>
          </li>
        </div>
      </ul>
    </div>
    <div class="content-btn" @click.stop="createsignature(true)"><span>创建模板</span></div>
    <div class="eltermessage" v-if="iseye">
      <div class="top">
        <i class="iconfont icon-chuyidong" @click.stop="createsignature(false)"></i>
      </div>
      <div class="innerimg">
        <img src="../../../../static/img/creat.png" alt="">
      </div>
      <div class="innerlogo">
        <span>修改模板</span>
      </div>
      <div class="innerinfo">
        <input maxlength="6" type="text" v-model="eltermessageList.templateName" placeholder="模板名称(3-6个字符)">
      </div>
      <div class="innerinfomessage">
        <p>模板内容</p>
        <textarea placeholder="请输入模板内容" v-model="eltermessageList.templateConten"></textarea>
      </div>
      <div class="div-btn">
        <span @click.stop="eltermes()">确定</span>
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
        <span>创建模板</span>
      </div>
      <div class="innerinfo">
        <input maxlength="12" type="text" placeholder="模板名称(1-12个字符)" v-model="templateName">
      </div>
      <div class="innerinfomessage">
        <p>模板内容</p>
        <textarea placeholder="请输入模板内容" v-model="content"></textarea>
      </div>
      <div class="div-btn">
        <span @click.stop="createmessage">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
import {seekGetSignList, seekSignOperation} from 'Api/commonality/seek'
import {GetNYR} from 'assets/js/getTime'
export default {
  props: ['shopId', 'shopManageRole'],
  data () {
    return {
      isshow: false,
      pageSize: 11,
      dataList: [],
      content: '',
      templateName: '',
      // messageList: {},
      eltermessageList: {},
      iseye: false
    }
  },
  created () {
    this.getseekGetSignList()
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
            _self.getseekGetSignList()
          }
        }
    })
  },
  methods: {
    returnAct () {
      this.templateName = ''
      return
    },
    _GetNYR (parm) {
      return GetNYR(parm)
    },
    //修改
    amendmessage (params, index) {
      if (params.isRoleCreate=='N') {
        return
      }
      this.messageList = params
      this.eltermessageList = params
      this.iseye = true
    },
    //创建
    createsignature (param) {
      this.isshow = param
      this.iseye = param
      this.templateName = ''
      this.content = ''
    },
    //短信模板列表
    getseekGetSignList () {
      let options = {
        shopId: this.shopId,
        page: 1,
        pageSize: this.pageSize
      }
      seekGetSignList(options).then(res => {
        console.log('模板', res)
        this.dataList = res.data.data.dataList
      }, res => {
        this.$message(res)
      })
    },
    // 短信模板创建/修改/删除
    createmessage () {
      // this.$message('确定')
      // this.templateName = ''
      // this.content = ''
      let re = /^\s+|\s+$/g
      if (re.test(this.templateName)) {
        // console.log(111)
        this.templateName = this.templateName.replace(/^\s+|\s+$/g, '')
        // console.log(this.templateName)
      } else {
        // console.log(222)
      }
      if (this.templateName == '') {
        this.$message('请输入合法字符')
        return
      }
      if(this.content == ''){
          this.$message('请输入内容')
          return
        }
      if (this.templateName.length < 1) {
        this.$message('请输入3-6个字符')
        return
      }
      if (this.templateName.length > 12) {
        this.$message('请输入3-6个字符')
        return
      }
      if (this.content.length < 1) {
        this.$message('请输入1-140个字符')
        return
      }
      if (this.content.length > 140) {
        this.$message('请输入1-140个字符')
        return
      }
      this.getseekSignOperation()
      this.isshow = false
      this.iseye = false
    },
    getseekSignOperation () {
      let options = {
        shopId: this.shopId,
        templateId: '',
        operateType: 1,
        templateName: this.templateName,
        content: this.content
      }
      seekSignOperation(options).then(res => {
        console.log('创建模板', res)
        if (res.data.state == 200) {
          this.getseekGetSignList()
        } else {
          this.$message(res.data.msg)
        }
      }, res => {
        this.$message(res.data.msg)
      })
    },
    // 短信模板删除
    deleteseekSignOperation (item,type) {
      // this.getseekGetSignList()
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.operateseekSignOperation(item,type)
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
      
      // if (options.type == 3) {
      //   this.$message('删除成功')
      // }
    },
    operateseekSignOperation (item,type) {
      let options = {
        shopId: this.shopId,
        templateId: item.templateId,
        operateType: type,
        templateName: '',
        content: ''
      }
      seekSignOperation(options).then(res => {
        console.log('操作', res)
        if (type == 3) {
          if (res.data.state == 200) {
            this.$message('删除成功')
            this.getseekGetSignList()
          }
        }
      }, res => {
        this.$message(res)
      })
    },
    // 短信模板修改
    eltermes () {
      if (this.eltermessageList.templateName.length < 3) {
        this.$message('请输入3-6个字符')
        return
      }
      if (this.eltermessageList.templateName.length > 6) {
        this.$message('请输入3-6个字符')
        return
      }
      console.log(this.eltermessageList)
      this.elterseekSignOperation()
      this.iseye = false
    },
    elterseekSignOperation () {
      let options = {
        shopId: this.shopId,
        templateId: this.eltermessageList.templateId,
        operateType: 2,
        templateName: this.eltermessageList.templateName,
        content: this.messageList.templateConten
      }
      seekSignOperation(options).then(res => {
        console.log('操作', res)
        this.getseekGetSignList()
      }, res => {
        this.$message(res)
      })
    }
  }
}
</script>
<style lang="scss">
.messagetemplate-bar {
  width: 700px;
  height: 730px;
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
.messagetemplatebar{
  position: relative;
  height: 730px;
  padding: {
    top: 20px;
    // left: 30px;
  }
  .h4{
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
      // li:nth-of-type(even){
      //   &:hover{
      //     background-color: rgba($color: #000000, $alpha: 0.3);
      //   }
      // }
      li:hover{
        &:nth-of-type(odd){
          background-color: rgba($color: #000, $alpha: 0.1);
        }
        background-color: rgba($color: #000, $alpha: 0.1);
      }
      li{
        position: relative;
        &:nth-of-type(odd){
          background-color: #f4f4f4;
        }
        padding-left: 20px;
        height: 53px;
        line-height: 53px;
        .templatenamemes{
          color: #2993f8;
          display: inline-block;
          // width: 90px;
          min-width: 170px;
        }
        .templateConten{
          width: 277px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          vertical-align: middle;
        }
        .createUserName{
          margin-left: 10px;
        }
        .icon-lajitong{
          z-index: 1201;
          position: absolute;
          right: 12px;
          // display: none;
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
  }
  .createmessage{
    width: 323px;
    height: 482px;
    background-color: #fff;
    position: fixed;
    // right: -353px;
    right: 50%;
    top: 50%;
    margin-top: -241px;
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
      .icon-chuyidong:hover{
        cursor: pointer;
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
    >.innerinfomessage{
      margin-top: 15px;
      padding-left: 30px;
      >p{
        color: #333;
      }
      >textarea{
        margin-top: 10px;
        padding: {
          top: 20px;
          left: 18px;
        }
        width: 270px;
        height: 180px;
        resize: none;
        background-color: #f6f7f8;
      }
    }
    .div-btn{
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
    .div-btn:hover{
      cursor: pointer;
    }
  }
  .eltermessage{
    width: 323px;
    height: 482px;
    background-color: #fff;
    position: fixed;
    // right: -353px;
    // bottom: 0;
    right: 50%;
    top: 50%;
    margin-top: -241px;
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
      .icon-chuyidong:hover{
        cursor: pointer;
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
    >.innerinfomessage{
      margin-top: 15px;
      padding-left: 30px;
      >p{
        color: #333;
      }
      >textarea{
        margin-top: 10px;
        padding: {
          top: 20px;
          left: 18px;
        }
        width: 270px;
        height: 180px;
        resize: none;
        background-color: #f6f7f8;
      }
    }
    .div-btn{
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
    .div-btn:hover{
      cursor: pointer;
    }
  }
}
</style>


