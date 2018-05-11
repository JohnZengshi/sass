<template>
  <div class="serve-container-bottom-main">
    <p class="user-m-h">售后用户信息</p>
    <div class="bottom-wrap">

      <div class="user-m-inner">
        <textarea v-if="isOperation" maxlength="50" v-model="receiptData.remark" @blur="amendRemark">
          
        </textarea>
        <span v-else>{{receiptData.remark}}</span>
      </div>


      <div class="img-list-wrap">
        <div class="img-inner" v-for="(item, index) in receiptData.dataList">
          <img :src="item.picSrc" alt="">
          <i v-if="isOperation" class="iconfont icon-chuyidong" @click="delImg(item, index)"></i>
        </div>
        
        <UploadingImg v-show="isOperation" v-if="receiptData.dataList ? receiptData.dataList.length < 6 : true" @cosImg="cosImg" :isMore="true" class="img-inner" :type="1">
          <div class="add-img-logo-wrap">
            <i class="iconfont icon-jia3 add-img-logo-icon"></i>
          </div>
        </UploadingImg>
        
      </div>

    </div>
  </div>
</template>
<script>
import UploadingImg from 'base/uploading/uploading'
import {operateUpdateServiceByNum} from 'Api/commonality/operate'
export default{
  props: ['receiptData', 'isOperation'],
  components: {
    UploadingImg
  },
  data () {
    return {

    }
  },
  methods: {
    cosImg (parm) {
      // let datas = parm.splice(0, 6 - receiptData.dataList.length - parm.length)
      let imgList = []
      let canAdd = 6 - this.receiptData.dataList.length // 剩余可以添加的数
      if (parm.length > canAdd) {
        imgList = parm.splice(0, canAdd)
      } else {
        imgList = parm
      }
      let options = {
        dataList: [],
        orderNum: this.$route.query.orderNumber,
        shopId: this.$route.query.shopId
      }
      for (let i of imgList) {
        options.dataList.push(
          {
            operateType: '3',
            objectData: i
          }
        )
      }
      
      this._operateUpdateServiceByNum(options, '新增图片成功')
    },
    delImg (parm) {
      let options = {
        dataList: [
          {
            operateType: '4',
            objectData: parm.picId
          }
        ],
        orderNum: this.$route.query.orderNumber,
        shopId: this.$route.query.shopId
      }
      this._operateUpdateServiceByNum(options, '删除图片成功')
    },
    amendRemark () {
      let options = {
        dataList: [
          {
            operateType: '2',
            objectData: this.receiptData.remark
          }
        ],
        orderNum: this.$route.query.orderNumber,
        shopId: this.$route.query.shopId
      }
      this._operateUpdateServiceByNum(options, '修改备注成功')
      console.log('修改售后备注')
    },
    _operateUpdateServiceByNum (options, tit) {
      operateUpdateServiceByNum(options)
        .then(res => {
          if (res.data.state == 200) {
            this.$message({
              message: tit,
              type: 'success'
            })
            this.$emit('_seekReceiptFWSynopsis')
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    }
  }
}
</script>
<style lang="scss">
.serve-container-bottom-main{
  padding: 0 20px;
  height: 120px;
  .user-m-h{
    position: relative;
    padding-left: 10px;
    font-size: 14px;
    line-height: 14px;
    color: #2993f8;
    &:after{
      content: '';
      height: 14px;
      width: 2px;
      position: absolute;
      left: 0;
      border-radius: 6px;
      background-color: #2993f8;
    }
  }
  .bottom-wrap{
    margin-top: 12px;
  }
  .user-m-inner{
    display: inline-block;
    height: 80px;
    width: 500px;
    border-radius: 5px;
    overflow: hidden;
    padding: 8px 10px;
    background-color: rgb(246,247,249);
    >textarea, span{
      height: 66px;
      font-size: 14px;
      lin-height: 14px;
      width: 480px;
      overflow: hidden;
      background-color: rgb(246,247,249);
    }
  }
  .img-list-wrap{
    display: inline-block;
    width: 700px;
    height: 80px;
    font-size: 0;
    vertical-align: top;
    .img-inner{
      position: relative;
      display: inline-block;
      margin-left: 20px;
      border-radius: 5px;
      overflow: hidden;
      width: 80px;
      height: 80px;
      >img{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 80px;
      }
      >.icon-chuyidong{
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 16px;
        color: red;
        opacity: 0;
        visibility: hidden;
        cursor: pointer;
        transition: all .5s;
      }
      &:hover>.icon-chuyidong{
        opacity: 1;
        visibility: visible;
      }
    }
    .add-img-logo-wrap{
      position: relative;
      display: inline-block;
      width: 80px;
      height: 80px;
      z-index: 300;
      border-radius: 5px;
      border: 2px dashed #ccc;
      .add-img-logo-icon{
        position: absolute;
        font-size: 14px;
        width: 14px;
        height: 14px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        color: #ccc;
        margin: auto;
      }
    }
  }
}
</style>
