<template>
  <!-- <img class="wx-uploading-img" @click="_seekGetCOSSign" src="" alt=""> -->
  <div class="wx-uploading-main">
    <form ref="uploadForm">
      <input class="wx-uploading-img" multiple="multiple" type="file" @change="changeFile">
    </form>
    <slot></slot>
  </div>
</template>
<script>
import {seekGetCOSSign} from 'Api/commonality/seek'
import {Cos} from 'Api/config'
export default {
  props: ['type'],
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
      for (let i = 0; i < datas.length; i++) {
        this.getCosCloud(datas[i])
      }
    },
    getCosCloud (file) {
      console.log(file)
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
        console.log('successCallBack')
        console.log(result)
        console.log(result.data.source_url)
        if (result.code == 0) {
            debugger
          _self.$emit('cosImg', result.data.source_url)
        }
      }
      var errorCallBack = function (result) {
        console.log('errorCallBack')
        console.log(result)
      }
      var progressCallBack = function (curr, sha1) {
        // var sha1CheckProgress = ((sha1 * 100).toFixed(2) || 100) + '%'
        // var uploadProgress = ((curr || 0) * 100).toFixed(2) + '%'
        // var msg = 'upload progress:' + uploadProgress + '; sha1 check:' + sha1CheckProgress + '.'
        // console.log(msg)
      }
      cos.uploadFile(successCallBack, errorCallBack, progressCallBack, Cos.bucket, this.myFolder.url + file.name, file, 0)
      _self.$refs.uploadForm.reset()
    }
  }
}
</script>
<style lang="scss">
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
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 0;
    z-index: 100;
    padding-left: 50px;
    cursor: pointer;
  }

}
</style>
