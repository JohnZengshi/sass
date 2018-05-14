<template>
<div class="audit-popup" v-if="popupShow">
    <i class="el-icon-close" @click="close"></i>
    <div class="audit-tittle">
        <img src="~static/img/copy.png">
        <div>添加会员</div>
    </div>
    <div class="audit-text">
      <ul class="serve-member-create-input-wrap">

        <li class="selectBox">
          <span class="selTittle">联系号码</span>
          <div class="input-w180">
            <el-input v-model="phone" placeholder="请输入联系号码"></el-input>
          </div>
        </li>

        <li class="selectBox">
          <span class="selTittle">姓名</span>
          <div class="input-w180">
            <el-input v-model="username" placeholder="请输入姓名"></el-input>
          </div>
        </li>

         <li class="selectBox">
          <span class="selTittle">性别</span>
          <div class="input-w180">
            <el-checkbox-group v-model="sex" @change="handleCheckedCitiesChange">

              <div class="sex-check mr30">
                <el-checkbox :label="'2'">女</el-checkbox>
              </div>

              <div class="sex-check">
                <el-checkbox :label="'1'">男</el-checkbox>
              </div>

            </el-checkbox-group>
          </div>
        </li>

      </ul>
    </div>
    <div class="audit-btn" @click="_operateMemberCreate">确定</div>
</div>
</template>

<script>
import {operateRelateFaceMember, operateMemberCreate} from 'Api/commonality/operate'
export default{
  props: ['currentData'],
  data() {
    return {
      username: '',
      phone: '',
      sex: ['2'],
      textareaData : '',
      popupShow : false,
      isTextarea : true
    }
  },
  
  methods: {
    handleCheckedCitiesChange () {
      if (this.sex.length == 2) {
        setTimeout(() => {
          this.sex.splice(0, 1)
        }, 0)
      }
    },

    open () {
      this.sex = []
      this.popupShow = true
      setTimeout(() => {
        if (this.currentData) {
          if (this.currentData.sex == '男') {
            this.sex.push('1')
          } else {
            this.sex.push('2')
          }
        } else {
          this.sex = ['2']
        }
      }, 0)
    },

    _operateMemberCreate () {

      if (!this.username) {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
        return
      }

      if (!this.phone) {
        this.$message({
          message: '请输入号码',
          type: 'warning'
        })
        return
      }

      let options = {
        shopId: this.$route.query.shopId,
        username: this.username,
        phone: this.phone,
        type: '1',
        sex: this.sex[0]
      }
      if (this.currentData) {
        options.avatarUrl = this.currentData.imageUri
        options.principalList = [
          {
            userId: sessionStorage.getItem('id')
            // userId: this.currentData.id,
            // avatarUrl: this.currentData.imageUri
          }
        ]
      }
      operateMemberCreate(options)
        .then((res) => {
          if (res.data.state == 200) {
            let datas = {
              username: this.username,
              phone: this.phone,
              type: '1',
              memberId: res.data.data.memberId,
              imageUri: '',
              sex: this.sex[0]
            }
            if (this.currentData) {
              datas.imageUri = this.currentData.imageUri
              this.successCallback(res.data.data, datas)
            } else {
              this.popupShow = false
              this.$emit('affirm', datas)
              this.initData()
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },
    
    successCallback (parm, datas) {
        // this.successCallback = false
        let options = {
            shopId: this.$route.query.shopId,
            memberId: parm.memberId,
            otherId: this.currentData.id
        }
        operateRelateFaceMember(options)
            .then((res)=> {
                if (res.data.state == 200) {
                  this.popupShow = false
                  this.$emit('affirm', datas)
                  this.initData()
                    // this.isAddLeaguer = false
                    // this.$message({
                    //     message: '关联成功',
                    //     type: 'success'
                    // })
                    // this.$refs.clientDetailIndexWrap._seekList()
                    // this.$emit('successOperationIntention')
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    })
                }
            })
            
    },

    initData () {
      this.username = ''
      this.phone = ''
      this.sex = ['2']
    },
    close () {
      this.popupShow = false
      this.initData()
    }
  }
}
</script>
<style lang="scss">
.serve-member-create-input-wrap{
  .el-checkbox{
    vertical-align: top;
    height: 20px!important;
    line-height: 20px!important;
  }
  .el-checkbox__inner{
    border-radius: 2px!important;
  }
  .el-checkbox__label{
    font-size: 14px!important;
  }
}
</style>
<style lang="scss" scoped>
.audit-popup { // 审核弹窗
    width: 320px;
    //height: 400px;
    background:#fff;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -160px;
    z-index: 200;
    box-shadow: 0 0 10px 10px rgba(0,0,0,0.1);
    &>i {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #bfcbd9;
        cursor: pointer;
    }
    .audit-tittle {
        width: 130px;
        height: 130px;
        margin: 0 auto;
        text-align: center;
        box-sizing: border-box;
        padding-top: 24px;
        img {
            height: 46px;
            width: 46px;
            margin-bottom: 15px;
            border-radius: 50%;
        }
        &>div {
            font-size: 12px;
            color:#333;
            font-weight: bold;
        }
    }
    .audit-text {
        margin:0 auto;
        width: 260px;
        height: 180px;
        // textarea {
        //   width: 260px;
        //   height: 180px;
        //   background: #f6f7f8;
        //   box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1) inset;
        //   border-radius: 4px;
        //   padding: 10px;
        //   font-size: 14px;
        //   color: #666;
        // }
        .serve-member-create-input-wrap{
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
            .input-w180 {
              vertical-align: top;
              width: 180px;
              display: inline-block;
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
              bottom: -15px;
              color: red;
            }
            .sex-check {
              height: 36px;
              padding-top: 8px;
              font-size: 14px;
              float: left;
            }
            .mr30{
              margin-right: 30px;
            }
          }
        }
    }
    
    .text {
        margin:0 auto;
        width: 260px;
        input {
          width: 260px;
          height: 40px;
          background: #f6f7f8;
          box-shadow: 0 0 5px 2px rgba(0,0,0,0.1) inset;
          border-radius: 4px;
          padding: 10px;
          font-size: 14px;
          color: #666;
        }
    }
    .audit-btn {
        width: 150px;
        height: 28px;
        background:#2993f8;
        text-align: center;
        line-height: 28px;
        color:#fff;
        font-weight:bold;
        border-radius: 4px;
        margin: 30px auto;
        cursor: pointer;
    }
}
</style>