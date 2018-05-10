<template>
  <div class="wx-uploading-main">
    <input class="wx-uploading-img" multiple="multiple" type="file" ref="file" @change="changeFile">
    <slot></slot>
  </div>
</template>
<script>
import {seekGetCOSSign} from 'Api/commonality/seek'
import {Cos} from 'Api/config'
export default {
  props: ['type','sceneIndex', 'isMore'], // isMore 是否是多图上传
  data () {
    return {
      myFolder: '',
      sourceUrlList: []
    }
  },
  created () {
    this._seekGetCOSSign()
  },
  methods: {
    _seekGetCOSSign () {
      let options = {
        type: this.type
      }
      seekGetCOSSign(options).then((res) => {
        this.myFolder = res.data.data
      })
    },
    changeFile (e) {
      let datas = e.target.files
      console.log(e.target)
      //loading
      this.$emit('uploading')
      if (this.isMore) {
        this.moreImg(datas)
      } else {
        this.getCosCloud(datas[0])
      }
      // for (let i = 0; i < datas.length; i++) {
      //   this.getCosCloud(datas[i])
      // }
    },
    moreImg (parm) {
      let _self = this

      // 上传图片
      let xjUploadImage = function (file) {
        return new Promise((resolve) => {
          let cos = new CosCloud({
            appid: Cos.appid,
            bucket: Cos.bucket,
            region: Cos.region,
            getAppSign: function (callback) { // 获取签名 必填参数
              callback(_self.myFolder.signStr)
            }
          })
          var successCallBack = function (result) {
            resolve(result.data.source_url)
          }

          var errorCallBack = function (result) {
          }

          var progressCallBack = function (error) {
          }

          let fileName  = file.name.split('.')

          fileName = fileName[0] + Date.now() + '.' + fileName[1]

          cos.uploadFile(successCallBack, errorCallBack, progressCallBack, Cos.bucket, _self.myFolder.url + fileName, file, 0)
        })
      }

      // 接收异步回调
      async function wxUploadImages (options) {
        let datas = []
        for (const item of options) {
          await xjUploadImage(item)
            .then(res => {
              datas.push(res)
            })
        }
        return datas
      }
    wxUploadImages(parm)
      .then(res => {
        if ( _self.$refs.file ) _self.$refs.file.value = ''
        this.$emit('cosImg', res)
      })
    },
    getCosCloud (file) {
      // 初始化逻辑
      var _self = this
      var cos = new CosCloud({
        appid: Cos.appid,
        bucket: Cos.bucket,
        region: Cos.region,
        getAppSign: function (callback) { // 获取签名 必填参数
          callback(_self.myFolder.signStr)
        }
      })
      var successCallBack = function (result) {
        console.log(result, '添加店铺首图result')
        //上传之后，清空input value
        if( _self.$refs.file ) _self.$refs.file.value = ''
        if (result.code == 0) {
          //VR上传图片
          if( _self.sceneIndex >= 0 ){
               
            _self.$emit('cosImg',{
              url : result.data.source_url,
              index : _self.sceneIndex
            })
            
          }else{
            _self.$emit('cosImg', {
              url : result.data.source_url,
              index : _self.sceneIndex
            })
          }
        }
      }
      var errorCallBack = function (result) {
      }
      var progressCallBack = function (error) {
        console.log(error)
      }
      let fileName  = file.name.split('.')
      fileName = fileName[0] + Date.now() + '.' + fileName[1]
      cos.uploadFile(successCallBack, errorCallBack, progressCallBack, Cos.bucket, this.myFolder.url + fileName, file, 0)
    }
  }
}
</script>
<style lang="scss" scoped>
.wx-uploading-main{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  .wx-uploading-img{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    z-index: 1000;
    cursor: pointer;
  }

}
</style>
