<template>
  <div class="data-wrap">
    <div class="data-head">
      <div class="head-left"><i class="iconfont icon-beifen"></i>数据备份
        <el-switch
          v-model="openSave"
          on-text=""
          off-text="" 
          :width="switchWidth" 
          class="data_backup-switch" 
          @change="operate"
          :title="switchTitle"
          >
        </el-switch>
      </div>
      <div class="head-right">
        <span class="info">
          <i class="iconfont icon-infomation"></i>信息说明
          <div class="infoDiag" style="z-index: 200;">
            <div class="infoDiag-tittle"><i class="iconfont icon-infomation"></i>数据备份信息说明</div>
            <div class="infoDiag-content">
              <p>数据备份如开启后，每天晚上间24点系统会自动对当前公司所有数据进行备份，备份会保留最新的10次数据</p>
              <p>管理员可下载或恢复某一次数据</p>
              <p><span>注意：</span>数据恢复后，现有的当前公司数据将会被覆盖且操作不可退回，请谨慎操作。</p>
            </div>
          </div>
        </span>
        <span @click="selectFile"><i class="iconfont icon-shangchuan1"></i>上传</span>
        <input style="display: none;" type="file" id="file_input" @change.prevent="changeFileInput" />
      </div>
    </div>
    <div class="data-table">
      <table cellpadding="0" cellspacing="0" border='0'>
        <tr class="table-title">
          <th><div class="item fileName">文件名</div></th>
          <th><div class="item fileSize">文件大小</div></th>
          <th><div class="item fileType">类型</div></th>
          <th><div class="item fileState">状态</div></th>
          <th><div class="item fileOperate">操作</div></th>
          <th><div class="item fileRecover">恢复时间</div></th>
        </tr>
        <tr class="table-cont" v-for="(item, index) in dataList">
          <td>{{item.filename}}</td>
          <td>{{item.fileSize}}</td>
          <td>{{item.backType == '0' ? '逻辑备份' : '逻辑备份'}}</td>
          <td>{{item.status == '1' ? '成功' : item.status == '0' ? "进行中" : "失败"}}</td>
          <td style="width: 120px;"><a class="line-btn" :href="item.url" download="zip">下载</a><span @click="recovery(item.id)" class="line-btn">恢复</span></td>
          <td class="time">{{item.recoverTime}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import {seekListlog, seekOperate, seekGetBackupsStatus} from '../../src/Api/commonality/seek'
export default {
  data () {
    return {
      openSave: false,
      switchTitle: '',
      dataList: [],
      switchWidth: 30,
      operationType: '01' //备份操作类型
    }
  },
  created () {
    this.getBackupsStatus()
    this.listlog()
  },
  mounted () {
    $(".data-table").mCustomScrollbar({
        theme: "minimal-dark",
        axis: 'y',
        mouseWheel: {
            scrollAmount: 200,
            preventDefault: false,
            normalizeDelta: false
        },
    });
  },
  methods: {
    selectFile () {
      document.getElementById("file_input").click();
      //console.log(document.getElementById("file_input").value);
    },
    changeFileInput (ev) {
      console.log(222222)
      let self = this
      let file = ev.target.files[0];
      console.log(file)
      let fileData = new FormData(); // 创建表单数据对象(本地上传服务器文件对象)
      fileData.append("backupsFile", file); // 将文件对象append进去
      let extNameList = file.name.split('.');
      let extName = extNameList[extNameList.length - 1]
      console.log(extName)
      let data = {
          "data": {

          },
          "unit": {
              "companyId": sessionStorage.getItem("companyId"),
              "channel": 3,
              "OS": "web",
              "ip": "string",
              "userId": sessionStorage.getItem("id"),
              "tokenId": sessionStorage.getItem("tokenId")
          }
      }
      fileData.append("data", JSON.stringify(data)); // 用户id
      console.log(fileData)
      if (extName == 'sql') {
        // this.uploadHandler(file)
        // let serverHost = process.env.NODE_ENV === 'development' ? 'http://192.168.100.110:9097/yunzhubao-bat' : 'http://upload.yunzhubao.com:8082/yunzhubao-bat'
        // let serverHost = 'http://192.168.100.110:9097/yunzhubao-bat'
        let url = INTERFACE_URL_9097 + '/b1/backupsUpload'
        // let url = "http://192.168.100.110:9097/yunzhubao-bat/b1/backupsUpload" // 'http://192.168.100.110:9097/yunzhubao-bat' || 'http://upload.yunzhubao.com:8082/yunzhubao-bat'
        this.$http.post(url, fileData).then((response) => {
            if (response.data.state === 200) {
                console.log(response)
                console.log(11111)
                this.$alert('文件上传成功', '上传', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `上传成功`
                    });
                  }
                });
                self.listlog()
            } else {
                this.$store.dispatch('workPopupError', response.data.msg)
            }
        }, (response) => {
            this.$store.dispatch('workPopupError', response.data.msg)
        })
      } else {
        this.$alert('请选择正确格式的文件', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      }
    },
    // 上传头像
    // uploadHandler (file) {
    //   let self = this;
    //   let extNameList = file.name.split('.');
    //   let extName = extNameList[extNameList.length - 1]
    //   console.log(extName)
    //   let getSignUrl = base.Cos.getSignUrl
    //   // let updateUploadFileURL = base.Cos.updateUploadFileURL
    //   let myFolder = '/iconCompany/'
    //   let appid = base.Cos.appid
    //   let bucket = base.Cos.bucket
    //   let region = base.Cos.region
    //   // let userId = sessionStorage.getItem('id')
    //   let timestamp = new Date().getTime()
    //   let fileName = timestamp + '.' + extName
    //   let cos = new CosCloud({
    //     appid: appid,
    //     bucket: bucket,
    //     region: region,
    //     getAppSign: function (callback) {
    //       baseApi.apiCall({type: '2'}, getSignUrl).then((response) => {
    //         console.log(response.data)
    //         let sign = response.data.signStr
    //         console.log(sign)
    //         myFolder = response.data.url
    //         console.log()
    //         callback(sign)
    //       })
    //     }
    //   })
    //   if (extName == 'png' || extName == 'jpg') {
    //     let successCallBack = function (result) {
    //     // console.log(result)
    //       if (result.code === 0) {
    //         self.pictureUrl = result.data.source_url
    //         self.newadverData.advImg = result.data.source_url
    //         console.log(self.pictureUrl)
    //       }
    //     }
    //     let errorCallBack = function (result) {
    //       console.log(result)
    //     }
    //     let progressCallBack = function (result) {
    //       console.log(result)
    //     }
    //     cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + fileName, file, 1) //0表示允许覆盖文件 1表示不允许
    //   } else {
    //     this.$store.dispatch('workPopupError', "文件格式必须为 *.jpg / *.png");
    //     return
    //   }
    // },
    // 检查备份状态
    getBackupsStatus () {
      seekGetBackupsStatus().then((res) => {
        console.log(res)
        if (res.data.data.backStatus == '1') {
          this.openSave = true
          this.switchTitle="关闭数据备份"
        } else {
          this.openSave = false
          this.switchTitle="开启数据备份"
        }
      }, (res) => {
        console.log(res)
      })
    },
    // 恢复备份文件
    recovery (id) {
      let self = this
      this.$confirm('此操作将还原文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '还原成功!'
          });
          let options = {
            operationType: '03',
            backId: id
          }
          seekOperate(options).then((res) => {
            console.log(res)
            self.listlog()
          }, (res) => {
            console.log(res)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
    },
    // 备份操作
    operate (val) {
      console.log(val)
      if (val == true) {
        this.operationType = '01'
      } else if (val == false) {
        this.operationType = '02'
      }
      console.log(this.operationType)
      let options = {
        operationType: this.operationType
      }
      seekOperate(options).then((res) => {
        console.log(res)
        this.getBackupsStatus()
      }, (res) => {
        console.log(res)
      })
    },
    // 备份数据列表
    listlog () {
      seekListlog().then((res) => {
        console.log(res.data.data)
        this.dataList = res.data.data.dataList
        console.log(this.dataList)
        for (let i = 0; i < this.dataList.length; i++) {
            console.log(typeof this.dataList[i].recoverTime)
            if (typeof this.dataList[i].recoverTime == 'number') {
              console.log(11111111)
              let year = this.dataList[i].recoverTime.toString().substring(0, 4)
              let month = this.dataList[i].recoverTime.toString().substring(4, 6)
              let data = this.dataList[i].recoverTime.toString().substring(6, 8)
              let hour = this.dataList[i].recoverTime.toString().substring(8, 10)
              let time = this.dataList[i].recoverTime.toString().substring(10, 12)
              this.dataList[i].recoverTime = year + "-" + month + "-" + data + " " + hour + ":" + time
            }
        }
        console.log(this.dataList)
      }, (res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .data-wrap {
    margin:40px auto 0;
    width: 1250px;
    height:610px;
    .data-head {
      height:20px;
      width:100%;
      color: #000;
      margin-bottom: 17px;
      .head-left {
        float:left;
        font-weight:bold;
        font-size:16px;
        color:#333;
        i {
          color:#2993f8;
          font-size: 24px;
          margin-right: 10px;
          float: left;
          font-weight: normal;
        }
      }
      .head-right {
        float:right;
        position: relative;
        font-size: 12px;
        span {
          float: left;
          color:#2993f8;
          cursor:pointer;
          i.iconfont{
          	font-size:16px;
          	margin-right:5px;
          	color:#2993f8;
          }
        }
        span:nth-child(1) {
          margin-right:30px;
          position:relative;
          .infoDiag {
            position: absolute;
            left:-180px;
            top:38px;
            width:300px;
            height:200px;
            background:#fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s;
            
            .infoDiag-tittle {
              font-size: 14px;
              color:#333;
              height: 52px;
              box-sizing: border-box;
              padding-left: 15px;
              padding-top: 14px;
              .el-icon-information {
                color:#2993f8;
              }
            }
            .infoDiag-content {
              padding:0 28px;
              p {
                background: url("./../../src/assets/img/indent.jpg") no-repeat left 3px;
                font-size: 12px;
                color:#959595;
                margin-bottom: 20px;
                padding-left: 11px;
                span {
                  color:#ff5a51;
                  margin: 0;
                }
              }
            }
            
            &:after{
            	content: '';
            	display: block;
            	height: 0;
            	width: 0;
            	position: absolute;
            	top:-20px;
            	right:65px;
            	border: 10px solid transparent;
    					border-bottom-color: #fff;
            }
          }
        }
        .info:hover .infoDiag{
          opacity: 1;
          visibility: visible;
        }
        
      }
    }
    .data-table {
      width:1250px;
      height: 740px;
      border-radius: 10px;
      background:#fff;
      overflow: hidden;
      box-shadow: 0 0 25px rgba(0,0,0,0.1);
      table {
        width:100%;
        tr:nth-child(odd) {
          background:#fbfbfb;
        }
        tr {
          th {
            height: 60px;
            font-size:14px;
            color:#666;
            background:#f5f5f5;
          }
          td {
          	
            font-size:14px;
            color:#333;
            text-align:center;
            .line-btn {
              text-decoration: underline;
              display:block;
              width:50%;
              color:#2993f8;
              float:left;
              height: 100%;
              cursor:pointer;
              
            }
            
            &.time{
            	color: #999;
            }
          }
        }
        .table-title {
          height:60px;
          .fileName{ width:310px;}
          .fileSize{ width:205px;}
          .fileType{ width:205px;}
          .fileState{ width:180px;}
          .fileOperate{ width:120px;}
          .fileRecover{ width:160px;}
        }
        .table-cont {
          height:50px;
        }
      }
    }
  }
</style>
<style lang="scss">
.data_backup-switch{
		margin-left: 7px;
    max-width: 30px;
    
    .el-switch__core{
        max-width: 30px;
        width: 30px;
        height: 18px;
        border:1px solid #bfc0c0;
        background-color: #fff;
        box-shadow: 2px 5px 12px #d4d8d8;
        .el-switch__button{
            top: -2px;
            box-shadow: 5px 0px 7px #d7dada;
        }
    }
    .el-switch__label{
        display: none;
    }
    
  &.is-checked{
     .el-switch__core{
         border:1px solid #41619c;
         background-color: #689bfa;
         .el-switch__button{
            box-shadow:none;
        }
     } 
  }
  
}
</style>

