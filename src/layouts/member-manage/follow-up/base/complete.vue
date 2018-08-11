<!-- 完成跟进 -->
<template>
    <div class="n-p-scroll-box f-u-complete-main">
        <div class="p-close-icon" @click="close">
            <i class="el-dialog__close el-icon el-icon-close"></i>
        </div>
        <div class="scroll-body">
            <h3>完成跟进</h3>
            <div class="item-box">
                <span class="item-label"><i class="mandatory-icon">*</i>完成方式</span>
                <ul class="right-wrap xj-btn-list">
                    <li @click="chooseVisitType(item.type)" class="btn-bg" :class="{'actions-bg': item.type == optionsData.visitType}" v-for="item in visitTypeList">{{item.name}}</li>
                </ul>     
            </div>

            <div class="item-box">
                <span class="item-label">跟进记录</span>
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
        <div class="xj-btn-list">
            <div class="btn cnacel-btn-c" @click="close">返回上一级</div>
            <div class="btn" @click="_operateFollowComplete">确定</div>
        </div>
    </div>
</template>
<script>
import UploadingImg from 'base/uploading/uploading'
import {operateFollowComplete} from 'Api/commonality/operate'
export default {
    components: {
        UploadingImg
    },
    props: ['followList', 'isDialog'],
    data() {
        return {
            optionsData: {
              followList: [],
              logoList: [],
              visitType: '1',
              visitResult: 'optionsData'
            },
            visitTypeList: [
              {
                    name: '电话',
                    type: '2'
                },
                {
                    name: '拜访',
                    type: '1'
                },
                {
                    name: '聊天软件',
                    type: '3'
                },
                {
                    name: '其他',
                    type: '4'
                },
            ]
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
          debugger
          let imgList = []
          let canAdd = 6 - this.optionsData.logoList.length // 剩余可以添加的数
          if (parm.length > canAdd) {
            imgList = parm.splice(0, canAdd)
          } else {
            imgList = parm
          }
          debugger
          for (let i of imgList) {
            this.optionsData.logoList.push({resultSrc: i})
          }
        },
        delImg (index) {
          this.optionsData.logoList.splice(index, 1)
        },
        _operateFollowComplete () {
          if (!this.optionsData.visitType) {
            this.$message({message: '请填写完成方式', type: 'error'})
          }
          operateFollowComplete(Object.assing({}, this.optionsData, {followList: this.followList}))
            .then(res => {
              if (res.data.state == 200) {
                this.$emit('close')
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
