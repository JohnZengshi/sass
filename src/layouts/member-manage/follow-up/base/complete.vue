<!-- 完成跟进 -->
<template>
    <div class="n-p-scroll-box f-u-complete-main">
        <div class="p-close-icon" @click="close">
            <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="scroll-body">
            <h3>完成跟进</h3>
            <div class="scroll-box">
              <ul class="user-data" v-if="userData.followId">
                <li>
                  <span class="tit-left">手机号</span>
                  <span>{{userData.phone}}</span>
                </li>
                <li>
                  <span class="tit-right">性别</span>
                  <span>{{userData.sex}}</span>
                </li>
                <li>
                  <span class="tit-left">姓名</span>
                  <span>{{userData.userName}}</span>
                </li>
                <li>
                  <span class="tit-right">计划完成时间</span>
                  <span>{{userData.followTime}}</span>
                </li>
                <li>
                  <span class="tit-left">跟进目的</span>
                  <span>{{userData.followPurpose}}</span>
                </li>
              </ul>
              <div class="item-box">
                  <span class="item-label"><i class="mandatory-icon">*</i>完成方式</span>
                  <ul class="right-wrap xj-btn-list">
                      <li @click="chooseVisitType(item.id)" class="btn-bg" :class="{'actions-bg': item.id == optionsData.visitType}" v-for="item in visitTypeList">{{item.name}}</li>
                  </ul>     
              </div>

              <div class="item-box">
                  <span class="item-label"><i class="mandatory-icon">*</i>跟进记录</span>
                  <div class="record-tit">
                    <textarea placeholder="请输入跟进内容..." maxlength="200" v-model="optionsData.visitResult"></textarea>
                    <span>{{optionsData.visitResult.length}}/200</span>
                  </div>
              </div>
              
              <div class="item-box">
                  <span class="item-label">跟进图片</span>
                  <div class="img-list">
                    <UploadingImg :isMore="true" v-if="optionsData.logoList.length < 6" @cosImg="cosImg" class="img-box" :type="1">
                      <div class="xj-btn-defult">上传图片</div>
                    </UploadingImg>
                    <span>图片最多上传6张</span>
                    <ul class="img-list-box">
                      <li v-for="(item, index) in optionsData.logoList">
                        <img :src="item.resultSrc" alt="">
                        <i @click="delImg(index)" class="iconfont icon-chuyidong"></i>
                      </li>
                    </ul>
                  </div>
              </div>
            </div>
            
        </div>
        <div style="height: 30px;">
          <ul class="xj-btn-list">
            <li class="btn cnacel-btn-c" @click="close">取消</li>
            <li class="btn" @click="_operateFollowComplete">确定</li>
          </ul>
        </div>
    </div>
</template>
<script>
import UploadingImg from 'base/uploading/uploading'
import {operateFollowComplete} from 'Api/commonality/operate'
let dataSource = require('./data.js')
export default {
    components: {
        UploadingImg
    },
    props: ['followList', 'isDialog', 'userData'],
    data() {
        return {
            optionsData: {
              followList: [],
              logoList: [],
              visitType: '',
              visitResult: ''
            },
            visitTypeList: dataSource.visitTypeList
        }
    },
    watch: {
      isDialog () {
        if (!this.isDialog) {
            this.checkedList = []
            this.dataGridStorage = []
        }
      }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        confirm() {
            this.$emit('confirm')
        },
        chooseVisitType (parm) {
          this.optionsData.visitType = parm
        },
        cosImg (parm) {
          let imgList = []
          let canAdd = 6 - this.optionsData.logoList.length // 剩余可以添加的数
          if (parm.length > canAdd) {
            imgList = parm.splice(0, canAdd)
          } else {
            imgList = parm
          }
          for (let i of imgList) {
            this.optionsData.logoList.push({resultSrc: i})
          }
        },
        delImg (index) {
          this.optionsData.logoList.splice(index, 1)
        },
        _operateFollowComplete () {
          if (!this.optionsData.visitType) {
            this.$message({message: '请选择完成方式', type: 'error'})
            return
          }
          if (!this.optionsData.visitResult) {
            this.$message({message: '请填写跟进内容', type: 'error'})
            return
          }
          let followList = []
          if (this.userData.followId ) {
            followList = [
              {
                followId: this.userData.followId
              }
            ]
          } else {
            for (let i of this.followList) {
              followList.push({
                followId: i
              })
            }
          }
          operateFollowComplete(Object.assign({}, this.optionsData, {followList: followList}))
            .then(res => {
              if (res.data.state == 200) {
                this.$emit('close', true)
                this.$message({message: '跟进完成', type: 'success'})
              } else {
                this.$message({message: res.data.msg,type: 'error'})
              }
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            $(".scroll-box").mCustomScrollbar({
                theme: "minimal-dark",
                scrollInertia: 100, //滚动条移动速度，数值越大滚动越慢
            })
            if (this.memberId) {
                this._seekFindMemberDetails()
            }
        })
    }
}

</script>
<style lang="scss" scoped>
.f-u-complete-main {
  .user-data{
    overflow: hidden;
    li{
      width: 50%;
      float: left;
      margin-bottom: 34px;
      span{
        display: inline-block;
        height: 28px;
        line-height: 28px;
      }
      span:nth-child(2){
        margin-left: 20px;
      }
      .tit-left{
        width: 62px;
        text-align: right;
      }
      .tit-right{
        width: 90px;
        text-align: right;
      }
    }
  }
  .item-box {
      margin-bottom: 34px;
      display: flex;
      .item-label {
          display: inline-block;
          vertical-align: top;
          width: 100px;
          height: 28px;
          line-height: 28px;
      }
      .right-wrap {
          position: relative;
          height: 28px;
      }
      .record-tit{
        position: relative;
        width: 500px;
        height: 200px;
        border-radius: 2px;
        border: 1px solid #d6d6d6;
        textarea{
          padding: 10px;
          width: 490px;
          height: 190px;
          color: #333;
          font-size: 14px;
        }
        span{
          position: absolute;
          bottom: 5px;
          right: 7px;
          color: #999;
        }
      }
      .img-list{
        position: relative;
        width: 500px;
        .img-box{
          display: inline-block;
          width: 90px;
          height: 28px;
        }
        span{
          margin-left: 10px;
          color: #999;
          vertical-align: middle;
          font-size: 12px;
        }
        .img-list-box{
          font-size: 0;
          margin-top: 20px;
          width: 500px;
          display: flex;
          flex-wrap: wrap;
          li{
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            margin: 0 30px 30px 0;
            overflow: hidden;
            i{
              opacity: 0;
              position: absolute;
              top: 0;
              right: 0;
              color: red;
              transition: all .5s;
            }
            &:hover{
              i{
                position: absolute;
                top: 0;
                right: 0;
                opacity: 1;
                cursor: pointer;
                font-size: 16px;
              }
            }
            img{
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
              width: 100%;
            }
          }
          li:nth-child(4n){
            margin-right: 0;
          }
        }
      }
  }
}

</style>
