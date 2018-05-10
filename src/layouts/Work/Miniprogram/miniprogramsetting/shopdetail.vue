<template>
<transition name="tp-ani">
  <div class="data-view">
    <div class="title">
      <i class="iconfont icon-liebiao"></i>店铺信息
      <div class="headersave" @click="allSave">保存</div>
    </div>
    <div class="tpl-scroll"  v-loading="fullLoading" element-loading-text="拼命进行中...">
         <div class="shopindexd">
            <span class="verticalbar">|</span><i>*</i>
            <span class="tiptitle">店铺首图：</span>
            
              <div class="buttondiv">
                <uploading :type="imgType" @cosImg="addShopPic">
                上传店铺首图
                </uploading>
              </div>
             <span class="cluecls">&nbsp;&nbsp;建议上传750*562px的图片，仅可上传1张</span>
         </div>
         <div class="shopcontainer">
            <imgShow class="mycusthumbnail" @deleteImg="deleteShopPic" :imgSrc="mallsShopInfoLise.shopPic"  id="thumbnail" >
            </imgShow>
            <div class="custhum" v-if="!mallsShopInfoLise.shopPic">
                缩略图
            </div>
         </div>

          <div class="shopindexd">
             <span class="verticalbar">|</span><i>*</i>
             <span class="tiptitle">店铺信息：</span>
         </div>
         <div class="shopcontainer">
           <div class="allspace textar" style="margin-bottom:20px;">
               <textarea v-model="mallsShopInfoLise.shopInfo"  placeholder="请输入店铺信息，最多200字符" maxlength="200" style="height:85px;width:785px;margin-left:10px;margin-top:10px;"></textarea>
           </div>
         </div>

        <div class="shopindexd">
          <span class="verticalbar">|</span>
          <span class="tiptitle">门店照片<span>（选填）</span>：</span>

          <div class="buttondiv">
            <uploading :type="imgType" :isMore="true" @cosImg="addShopListImg">
              上传门店照片
            </uploading>
          </div>

          <span class="cluecls">&nbsp;&nbsp;建议上传不少于3张250*180尺寸的图片，系统上限20张</span>
        </div>

          <div class="shopcontainer">

            <template v-for="(item, index) in mallsShopInfoLise.shopList">
              <imgShow class="mycusthumbnail" @deleteImg="deleteShopListImg" :index="index" :imgSrc="item.logoSrc" :id="item.logoId"></imgShow>
            </template>

            <div class="custhum" v-if="!mallsShopInfoLise.shopList.length">
              缩略图
            </div>
            
<!--                 <custhumbnail class="mycusthumbnail" @deletePic="deletePic" :switchimgList="shopStorePic"  id="thumbnail" >
                </custhumbnail> -->
<!--                 <input style="display: none;" type="file" id="file_input" @change="changeFileInput"/> -->
          </div>

          <div class="shopindexd">
             <span class="verticalbar">|</span><i>*</i>
             <span class="tiptitle">联系我们：</span>
         </div>
         <div  class="shopcontainer">
               <div class="allspace callus">
                   <label>联系电话</label>
                   <div><input v-model="mallsShopInfoLise.phone" placeholder="请输入联系电话" maxlength="12" /></div>
                   
               </div>
               <div class="allspace callus" style="margin-bottom:20px;">
                   <label>店铺地址</label>
                   <div><input v-model="mallsShopInfoLise.address" placeholder="请输入店铺地址" maxlength="30" /></div>
                   
               </div>
         </div>


         <div class="shopindexd">
            <span class="verticalbar">|</span><i>*</i>
            <span class="tiptitle">店铺尾图：</span>

            <div class="buttondiv">
              <uploading :type="imgType" @cosImg="addLastPic">
                上传店铺尾图
              </uploading>
            </div>

            <span class="cluecls">建议上传698*524px的图片，仅可上传一张</span>
         </div>
         <div class="shopcontainer">
            <imgShow class="mycusthumbnail" @deleteImg="deleteLastPic" :imgSrc="mallsShopInfoLise.lastPic"  id="thumbnail" >
            </imgShow>
            <div class="custhum" v-if="!mallsShopInfoLise.lastPic">
                缩略图
            </div>
         </div>

          <div class="shopindexd">
              <span class="verticalbar">|</span>
              <span class="tiptitle">分店信息<span>（选填）</span>：</span>
              <div class="buttondiv" vi-f="mallsShopInfoLise.otherShopList.length < 5" @click="addOtherShopList">+分店</div>
          </div>

          <div class="storemodel" v-for="(item,index) in mallsShopInfoLise.otherShopList" :key="index">
               <div class="shopindexd" style="margin-top:10px;">
<!--                     <span class="verticalbar">|</span>
                    <span class="tiptitle">分店信息<span>（选填）</span>：</span> -->
                    <i class="iconfont icon-shanchu1 mydel" @click="_operateMallsOtherShopOperation(item.otherId, index)"></i>
                </div>
                <div class="shopcontainer">
                    <div class="allspace callus">
                        <label>分店名称</label>
                        <div><input  v-model="item.otherName" placeholder="请输入分店名称" maxlength="11" /></div>
                    </div>
                    <div class="allspace callus">
                        <label>分店电话</label>
                        <div><input v-model="item.otherPhone"  placeholder="请输入分店电话" maxlength="12" /></div>
                    </div>
                    <div class="allspace storeaddress" style="margin-bottom:20px;">
                        <label>店铺地址</label>
                        <!-- item.otherAddress -->
                        <div><textarea style="" v-model="item.otherAddress" placeholder="请输入店铺地址,最多30个字符" maxlength="30" /></div>
                    </div>
                    <div class="storepic">
                      <span class="tiptitle">分店照片：</span>
                      
                      <div class="buttondiv">
                        <uploading :type="imgType" :sceneIndex="index" @cosImg="addOtherShopImg">
                          上传分店照片
                        </uploading>
                      </div>

                      <span class="cluecls">&nbsp;&nbsp;建议上传698*524px的图片，仅可上传一张</span>
                    </div>
                    <div>
                      <imgShow class="mycusthumbnail" @deleteImg="deleteOtherShopList(item)" :imgSrc="item.otherPic"  id="thumbnail" >
                      </imgShow>
                      <div class="custhum" v-if="!item.otherPic">
                          缩略图
                      </div>
                    </div>
                </div>
          </div>
    </div>
  </div>
</transition>
</template>

<script>
import imgShow from './../base/imgShow'
import uploading from 'base/uploading/uploading'
import base from './../../../../config/base/index'
import baseApi from 'Api/Base/base'
import custhumbnail from './../upload/cusshopthumbnail';
import {operateMallsShopImageOperation, operateMallsShopInfoUpdate, operateMallsOtherShopAdd, operateMallsOtherShopOperation, operateMallsOtherShopUpdate} from 'Api/commonality/operate'
import {
  mallsShopInfo,//获取店铺信息
  mallsShopImageOperation,//商城店铺图片 操作
  mallsShopInfoUpdate,//商城店铺信息更新---
  mallsOtherShopAdd,//商城分店 新增
  mallsOtherShopOperation, //商城分店操作
  mallsOtherShopUpdate//商城分店信息更新
  } from './../../../../Api/commonality/seek'
export default {
    data(){
      return{
        // -------新--------
        fullLoading: false,
        oldData: {}, // 旧数据
        request: 0,
        mallsShopInfoLise: {
          shopPic: '',
          shopPicId: '',
          shopInfo: '',
          shopList: [],
          phone: '',
          lastPic: '',
          lastPicId: '',
          address: '',
          otherShopList: []
        },
        imgType: '2', // 图片地址

        // -------旧--------
        //  picTip:'',//用户操作的是店铺图片
        //  textTip:'',//用户操作的是店铺基本信息
        //  storeTip:'',//用户操作的是 分店
        // localotherShopList:[],//操作 新增分店 空数组 用来放剩下部分的 分店数据。与defaultstore一起合并成 othershoplist传到后台
         shopFirstPic:[],//店铺首图
         shopStorePic:[],//门店照片 ，，可以不传，传至少3张，最多 20张
         shopEndPic:[],//店铺尾图
         shopPic:'',//接口 店铺首图
         shopPicId:'',//接口 店铺首图ID
         shopInfo:'',//接口店铺信息
         phone:'',//接口 店铺电话
         address:'',//接口 店铺地址
         shopList:[],//接口 门店照片--logoSrc 照片地址 logoId 照片ID
         lastPic:'',//接口  店铺尾图
         lastPicId:'',//接口 店铺尾图ID
         otherShopList:[],//接口 分店集合数据--otherName  otherAddress otherPhone otherPic otherId
         defaultstore:{
           otherName:'',
           otherAddress:'',
           otherPhone:'',
           otherPic:[],
           otherId:''
         },// 默认 分店第一条数据，，其他数据放 另一个集合，传值到后台，把两个合并起来
         localotherShopList:[],//用来放剩下部分的 分店数据。与defaultstore一起合并成 othershoplist传到后台
         updataImgType:0,
         storeindex:0,
         bideShopFirstPic:[],//待删除的 店铺首图
         bideShopStorePic:[],//待删除的 门店照片
         bideShopEndPic:[],//待删除的 店铺尾图
       }
    },
    components:{
      imgShow,
      uploading,
      custhumbnail
    },
    // props :['shopId','storePrivilege'],
    props: ['shopId'],
    created(){
      // this.getmallsShopInfo();
      if (this.shopId) {
        this.seekMallsShopInfo(this.shopId)
      }
    },
    mounted () {
      eventBus.$on('xcx-upload-data', (shopId) => {
        this.seekMallsShopInfo(shopId)
      })
    },
         beforeDestroy () {
      eventBus.$off('xcx-upload-data')
     },
    watch: {
      'request' () {
        console.log('this.request', this.request)
        if (this.request == 0) {
          this.$message({type:'success', message:"修改成功"})
          this.seekMallsShopInfo(this.shopId)
        }
      }
    },
    methods:{
      /*------------------------新----------------------------*/
      deleteOtherShopList (item) {
        item.otherPic = ''
      },
      // 总保存
      allSave () {
        // 过滤必填
        if(!this.mallsShopInfoLise.shopPic){
           this.$message({type:'warning', message:'至少上传1张店铺首图'});
           return;
        }

        if(!this.mallsShopInfoLise.shopInfo){
            this.$message({type:'warning', message:'请输入店铺信息!'});
           return;
        }

        // if(!this.mallsShopInfoLise.phone || this.mallsShopInfoLise.phone.length != 11){
        //   this.$message({type:'warning', message:'请输入联系电话!'});
        //   return;
        // }
        if (this.mallsShopInfoLise.shopList.length) {
          if(this.mallsShopInfoLise.shopList.length < 3) {
            this.$message({type:'warning', message:'门店照片不可少于三张!'});
            return;
          }
        }
        

        if(!this.mallsShopInfoLise.phone){
          this.$message({type:'warning', message:'请输入联系电话!'});
          return;
        }


        if(!this.mallsShopInfoLise.address){
          this.$message({type:'warning', message:'请输入店铺地址'});
           return;
        }

        if(!this.mallsShopInfoLise.lastPic){
          this.$message({type:'warning', message:'至少上传1张店铺尾图'});
          return;
        }

        let amendRecord = []
        // 提取有修改过的数据集合 新增和修改
        for (let i of this.mallsShopInfoLise.otherShopList) {
          if (i.otherName || i.otherAddress || i.otherPhone || i.otherPic) {
            amendRecord.push(i)
          }
        }
        
        console.log('当前记录的amendRecord', amendRecord)
        for (let i of amendRecord) {
          if (!i.otherName) {
            this.$message({
              message: '请填写分店名称',
              type: 'warning'
            });
            return
          }
          if (!i.otherAddress) {
            this.$message({
              message: '请填写分店地址',
              type: 'warning'
            });
            return
          }
          if (!i.otherPhone) {
            this.$message({
              message: '请填写分店联系电话',
              type: 'warning'
            });
            return
          }
          // if (i.otherPhone.length != 11) {
          //   this.$message({
          //     message: '分店联系电话格式不对',
          //     type: 'warning'
          //   });
          //   return
          // }
          
          if (!i.otherPic) {
            this.$message({
              message: '请上传分店照片',
              type: 'warning'
            });
            return
          }
        }

        // 提取商城店铺图片操作
        let amendMallsShopImage = this.filterMallsShopImageOperation()

        // 提取修改值商城店铺信息更新
        let amendMallsShopInfoUpdate = this.filterMallsShopInfoUpdate()

        // 提取分店数据新增
        let addOtherShopList = this.addFilterOtherShopList()

        // 提取分店数据删除
        let delOtherShopList = this.delFilterAddOtherShopList()

        // 提取分店数据更改
        let amendOtherShopList = this.amendFilterOtherShopList()

        // 全部请求成功回调
        this.request = amendMallsShopImage.length ? 1 : 0 + amendMallsShopInfoUpdate.length ? 1 : 0 + addOtherShopList.length ? 1 : 0 + amendOtherShopList.length ? 1 : 0

        if (this.request == 0) {
          this.$message({
              message: '保存成功',
              type: 'success'
            });
        }

        if (amendMallsShopImage.length) {
          this._operateMallsShopImageOperation(amendMallsShopImage)
        }

        if (amendMallsShopInfoUpdate.length) {
          this._operateMallsShopInfoUpdate(amendMallsShopInfoUpdate)
        }

        if (addOtherShopList.length) {
          this._operateMallsOtherShopAdd(addOtherShopList)
        }

        if (amendOtherShopList.length) {
          this._operateMallsOtherShopUpdate(amendOtherShopList)
        }

      },

      // 提取分店数据新增
      addFilterOtherShopList () {
        let datas = []
        for (let i of this.mallsShopInfoLise.otherShopList) {
          if (!i.otherId) {
            let isHas = false
            let objD = {
              shopId: this.shopId,
              otherShopName: i.otherName,
              otherShopAddress: i.otherAddress,
              otherShopPhone: i.otherPhone,
              otherShopPic: i.otherPic
            }
            if (i.otherName) {
              isHas = true
            }
            if (i.otherAddress) {
              isHas = true
            }
            if (i.otherPhone) {
              isHas = true
            }
            if (i.otherPic) {
              isHas = true
            }
            if (isHas) {
              datas.push(objD)
            }
          }
        }
        return datas
      },

      // 提取分店数据删除
      delFilterAddOtherShopList () {
        let datas = []
        // let allData = []
        // for (let i of this.oldData.otherShopList) {
        //   allData.push(i.otherId)
        // }
        // // 提取删除值集合
        // debugger
        // for (let i of this.mallsShopInfoLise.otherShopList) {
        //   if (!allData.includes(i.otherId)) {
        //     let delObj = {
        //       otherShopId: i.otherId,
        //       operateType: 1
        //     }
        //     datas.push(delObj)
        //   }
        // }
        return datas
      },

      // 提取分店数据更改
      amendFilterOtherShopList () {
        let options = []
        for (let i of this.mallsShopInfoLise.otherShopList) {
          for (let j of this.oldData.otherShopList) {
            if (i.otherId == j.otherId) {

              // 1.分店名称
              if (i.otherName != j.otherName) {
                let objD = {
                  otherShopId: i.otherId,
                  updateType: '1',
                  updataData: i.otherName
                }
                options.push(objD)
              }

              // 2.分店地址
              if (i.otherAddress != j.otherAddress) {
                let objD = {
                  otherShopId: i.otherId,
                  updateType: '2',
                  updataData: i.otherAddress
                }
                options.push(objD)
              }

              // 3.联系电话
              if (i.otherPhone != j.otherPhone) {
                let objD = {
                  otherShopId: i.otherId,
                  updateType: '3',
                  updataData: i.otherPhone
                }
                options.push(objD)
              }

              // 4.图片
              if (i.otherPic != j.otherPic) {
                let objD = {
                  otherShopId: i.otherId,
                  updateType: '4',
                  updataData: i.otherPic
                }
                options.push(objD)
              }

            }
            
          }
        }
        return options
      },


      // 提取商城店铺图片操作
      filterMallsShopImageOperation () {
        let options = []
        // 店铺首图
        options.push(...this.fliterOneAmendImg(this.oldData.shopPicId, this.oldData.shopPic, this.mallsShopInfoLise.shopPic, 1, 2))
        // 店铺尾图
        options.push(...this.fliterOneAmendImg(this.oldData.lastPicId, this.oldData.lastPic, this.mallsShopInfoLise.lastPic, 3, 4))
        // 门店照片
        // if (this.mallsShopInfoLise.shopList.length != this.oldData.shopList.length) {
          options.push(...this.filterAmendImg(this.mallsShopInfoLise.shopList, this.oldData.shopList))
        // }
        return options
      },

      // 提取单图修改 id， 旧图，新图, 新增类型，删除类型
      fliterOneAmendImg (id, oldUrl, newUrl, addNum, delNum) {
        let datas = []
        if (id) { // 存在修改和新增
          if (oldUrl != newUrl) {
            datas.push({
              picId: id,
              operateType: delNum
            })
            datas.push({
              url: newUrl,
              operateType: addNum
            })
          }
        } else if (newUrl) { // 单纯新增
          datas.push({
            url: newUrl,
            operateType: addNum
          })
        }
        return datas
      },

      // 多图提取修改和新增 当前值，旧值
      filterAmendImg (currentData, oldData) {
        // 新增数据
        let newData = []
        // 删除数据
        let delData = []
        // 修改后的后台值
        let amendData = []
        // 提取新增和修改后的后台的值
        if (currentData) {
          for (let j of currentData) {
            if (j.logoId) {
              amendData.push(j.logoId)
            } else {
              let addObj = {
                url: j.logoSrc,
                operateType: '5'
              }
              newData.push(addObj)
            }
          }
        }
        // 提取删除值集合
        for (let i of oldData) {
          if (!amendData.includes(i.logoId)) {
            let delObj = {
              picId: i.logoId,
              operateType: '6'
            }
            delData.push(delObj)
          }
        }
        return [...newData,...delData]
      },

      // 商城店铺图片操作
      _operateMallsShopImageOperation (parm) {
        let options = {
          shopId: this.shopId,
          dataList: parm
        }
        operateMallsShopImageOperation(options)
          .then(res => {
            if (res.data.state == 200) {
              this.request -= 1
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          })
      },

      // 商城店铺信息更新
      _operateMallsShopInfoUpdate (parm) {
        let options = {
          shopId: this.shopId,
          dataList: parm
        }
        operateMallsShopInfoUpdate(options)
          .then(res => {
            if (res.data.state == 200) {
              this.request -= 1
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          })
      },

      // 商城店铺分店新增
      _operateMallsOtherShopAdd (parm) {
        let options = {
          shopId: this.shopId,
          dataList: parm
        }
        operateMallsOtherShopAdd(options)
          .then(res => {
            if (res.data.state == 200) {
              this.request -= 1
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          })
      },

      // 删除分店
      _operateMallsOtherShopOperation (otherShopId, Index) {
        if (!otherShopId) {
          this.mallsShopInfoLise.otherShopList.splice(Index, 1)
          return
        }
        let options = {
          shopId: this.shopId,
          otherShopId: otherShopId,
          operateType: '1'
        }
        operateMallsOtherShopOperation(options)
          .then(res => {
            if (res.data.state == 200) {
              this.mallsShopInfoLise.otherShopList.splice(Index, 1)
              this.$message({
                message: '删除成功',
                type: 'warning'
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          })
      },

      // 商城店铺分店更新
      _operateMallsOtherShopUpdate (parm) {
        let options = {
          shopId: this.shopId,
          dataList: parm
        }
        operateMallsOtherShopUpdate(options)
          .then(res => {
            if (res.data.state == 200) {
              this.request -= 1
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }

          })
      },

      // 提取修改值商城店铺信息更新
      filterMallsShopInfoUpdate () {
        let options = []
        // 店铺信息
        if (this.mallsShopInfoLise.shopInfo != this.oldData.shopInfo) {
          options.push({
            updateType: 1,
            updataData: this.mallsShopInfoLise.shopInfo
          })
        }

        // 联系号码
        if (this.mallsShopInfoLise.phone != this.oldData.phone) {
          options.push({
            updateType: 2,
            updataData: this.mallsShopInfoLise.phone
          })
        }

        // 店铺地址
        if (this.mallsShopInfoLise.address != this.oldData.address) {
          options.push({
            updateType: 3,
            updataData: this.mallsShopInfoLise.address
          })
        }

        return options
      },

      // 删除店铺首图
      deleteShopPic (parm) {
        this.mallsShopInfoLise.shopPic = ''
      },


      // 删除门店照片
      deleteShopListImg (parm) {
        this.mallsShopInfoLise.shopList.splice(parm.index, 1)
      },

      // 删除店铺尾图
      deleteLastPic (parm) {
        this.mallsShopInfoLise.lastPic = ''
      },


      // 添加店铺首图
      addShopPic (parm) {
        this.mallsShopInfoLise.shopPic = parm.url
      },

      // 添加门店图片
      addShopListImg (parm) {
        console.log('添加门店图片', parm)
        let datas = []
        for (let i of parm) {
          let objData = {
            logoSrc: i,
            logoId: ''
          }
          datas.push(objData)
        }
        this.mallsShopInfoLise.shopList.push(...datas)
      },

      // 添加店铺尾图
      addLastPic (parm) {
        this.mallsShopInfoLise.lastPic = parm.url
      },

      // 添加分店店铺图片
      addOtherShopImg (parm) {
        this.$set(this.mallsShopInfoLise.otherShopList[parm.index], 'otherPic', parm.url)
      },

      // 商城店铺信息
      seekMallsShopInfo(parm){
        let options = {
          shopId: parm
        }
         //先获取店铺 历史记录数据 然后将数据装进 本地字段中
        mallsShopInfo(options)
          .then((res)=>{
            console.log('获取到店铺里所有数据：',res);
            if (res.data.state == 200) {
              this.mallsShopInfoLise = res.data.data
              this.oldData = JSON.parse(JSON.stringify(res.data.data))
              console.log('旧数据', this.oldData)
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              });
            }
          })
      },

      // 添加分店
      addOtherShopList () {
        this.mallsShopInfoLise.otherShopList.push({
          shopId: '',
          otherShopName: '',
          otherShopAddress: '',
          otherShopPhone: '',
          otherShopPic: ''
        })
      },

      // 删除分店数据
      deleteStroeoneof(otherid, Index){
        console.log('删除分店')
        this.mallsShopInfoLise.otherShopList.splice(Index, 1)
        // let options = {
        //     shopId:sessionStorage.getItem('miniprogram'),
        //     otherShopId:otherid,
        //     operateType:1
        // }
        // mallsOtherShopOperation(options).then((res)=>{
        //     if(res.status == 200){
        //          this.$message({type:'success',message:"删除成功"});
        //         for(let i=0;i<this.localotherShopList.length;i++){
        //             if(otherid == this.localotherShopList[i].otherId){
        //                 this.localotherShopList.splice(i,1);
        //                 return;
        //             }
        //         }
        //     }else{
        //          this.$message({type:'success',message:"删除失败"});
        //     }
        // })
      },

      /*------------------------旧----------------------------*/
      //-----------------操作值   改变ui 部分
      addStoreModel(){
        //添加新分店
        let model = {otherName:'',otherAddress:'',otherPhone:'',otherPic:[],otherId:''}
        this.localotherShopList.push(model);
      },
      deletePic(val){
          //console.log(val);
            if(this.shopPic === val){
                //删除后台数据库中店铺首图
                let obj={};
                obj.url=this.shopPic;
                obj.operateType = 2;
                obj.picId = this.shopPicId;
                this.bideShopFirstPic.push(obj);
            }
            if(this.lastPic === val){
                //删除后台数据库中  店铺尾图
                let obj={};
                obj.url=this.lastPic;
                obj.operateType = 4;
                obj.picId = this.lastPicId;
                this.bideShopEndPic.push(obj);
            }
            for(let i=0;i<this.shopList.length;i++){
              //删除后台数据库中  店铺照片
                 if(val === this.shopList[i].logoSrc){
                    let obj={};
                    obj.url=this.shopList[i].logoSrc;
                    obj.operateType = 6;
                    obj.picId = this.shopList[i].logoId;
                    this.bideShopStorePic.push(obj);
                 }
            }
           for(let i=0;i<this.shopFirstPic.length;i++){
              if(val === this.shopFirstPic[i]){
                   this.shopFirstPic.splice(i,1);
                   return;
              }
           }
          for(let i=0;i<this.shopStorePic.length;i++){
              if(val === this.shopStorePic[i]){
                  this.shopStorePic.splice(i,1);
                  return;
              }
          }
          for(let i=0;i<this.shopEndPic.length;i++){
              if(val === this.shopEndPic[i]){
                  this.shopEndPic.splice(i,1);
                  return;
              }
          }
          for(let i=0;i<this.defaultstore.otherPic.length;i++){
              if(val === this.defaultstore.otherPic[i]){
                  this.defaultstore.otherPic.splice(i,1);
                  return;
              }
          }
         // console.log(this.localotherShopList);
          for(let i=0;i<this.localotherShopList.length;i++){
              if(val === this.localotherShopList[i].otherPic[0]){
                  this.localotherShopList[i].otherPic.splice(i,1);
                  return;
              }
          }
      },
      fixStoreList(storeList){//每次 进入这个页面 提取分店的第一条数据单独放
         // 将集合中的 第一条数据 提取出来，方便操作
          for(let i=0;i<storeList.length;i++){
              if(i==0){
                this.defaultstore.otherName = storeList[i].otherName;
                this.defaultstore.otherAddress = storeList[i].otherAddress;
                this.defaultstore.otherPhone = storeList[i].otherPhone;
                if(storeList[i].otherPic != null && storeList[i].otherPic != ''){
                   this.defaultstore.otherPic.push(storeList[i].otherPic);
                }
                this.defaultstore.otherId = storeList[i].otherId;
              }else{
                  
                  if(storeList[i].otherPic == null || storeList[i].otherPic == ''){
                     storeList[i].otherPic = [];
                  }
                  let tempobj = {
                      otherName:storeList[i].otherName,
                      otherAddress:storeList[i].otherAddress,
                      otherPhone:storeList[i].otherPhone,otherPic:[],otherId:storeList[i].otherId
                  }
                  let temparr = [];
                  temparr.push(storeList[i].otherPic);
                  tempobj.otherPic = temparr;
                // this.localotherShopList.push(storeList[i]);
               // console.log('获取添加的分店照片:',tempobj);
                 this.localotherShopList.push(tempobj);
              }
          }
      },
      //----------------网络请求部分------
       getmallsShopInfo(){
         //先获取店铺 历史记录数据 然后将数据装进 本地字段中
         let options= {shopId:sessionStorage.getItem('miniprogram')};
         mallsShopInfo(options).then((res)=>{
           //console.log('获取到店铺里所有数据：',res);
            if(res.status == 200){
                if(res.data.data.shopPic != '' && res.data.data.shopPic != null){
                   this.shopFirstPic.push(res.data.data.shopPic);//将 首图装进本地
                }
               if(res.data.data.lastPic != '' && res.data.data.lastPic != null){
                   this.shopEndPic.push(res.data.data.lastPic);//将 尾图 装进本地
               }
               let myshoplist = res.data.data.shopList;
               //后台 给一个默认空数据，如果再有问题，也是这条空数据引起的。
                // if(myshoplist[0].logoSrc != null && myshoplist[0].logoSrc != ''){}
               for(let i=0;i<myshoplist.length;i++){
                       this.shopStorePic.push(myshoplist[i].logoSrc);//将 门店照片装进本地
                    }
              
               
               this.shopList = res.data.data.shopList;//用来删除门店照片，存进去
               this.shopPic = res.data.data.shopPic;
               this.shopPicId = res.data.data.shopPicId;
               this.lastPic = res.data.data.lastPic;
               this.lastPicId = res.data.data.lastPicId;

               this.shopInfo = res.data.data.shopInfo;//
               this.phone = res.data.data.phone;
               this.address = res.data.data.address;
               
               this.fixStoreList(res.data.data.otherShopList);//复制到函数，，将第一条数据提取出来
               //this.otherShopList = res.data.data.otherShopList;//分店集合
            }
             this.fullLoading = false;
         },(err)=>{
           //错误
         })
       },
       commandStoreinf(){
          //整合分店数据 成一个集合
          let allstoreListadd = [];
          let allstoreListupdate = [];
          if(this.defaultstore.otherId != '' && this.defaultstore.otherId != null){
             //说明是 修改
                if(this.defaultstore.otherName == '' && this.defaultstore.otherAddress == '' && this.defaultstore.otherPhone=="" && this.defaultstore.otherPic.length<=0){
                    //要么一个不填   要么全部都要填
                }else{
                    let datalist = [];
                    if(this.defaultstore.otherName !='' && this.defaultstore.otherName !=null && 
                       this.defaultstore.otherAddress!=''&& this.defaultstore.otherAddress!=null && 
                       this.defaultstore.otherPhone != '' && this.defaultstore.otherPhone != null &&
                       this.defaultstore.otherPic[0] != '' && this.defaultstore.otherPic[0] != null){
                            let name =  {otherShopId:this.defaultstore.otherId,updateType:1,updataData:this.defaultstore.otherName};
                            let address ={otherShopId:this.defaultstore.otherId,updateType:2,updataData:this.defaultstore.otherAddress};
                            let phone = {otherShopId:this.defaultstore.otherId,updateType:3,updataData:this.defaultstore.otherPhone};
                            let pic = {otherShopId:this.defaultstore.otherId,updateType:4,updataData:this.defaultstore.otherPic[0]};
                            datalist.push(name);
                            datalist.push(address);
                            datalist.push(phone);
                            datalist.push(pic);
                    }else{
                          console.log('AAAAAA111')
                        this.$message({type:'warning',message:"请完善分店信息"});
                        return;
                    }
                    
                    let options1 = { ///默认分店数据修改
                        shopId:sessionStorage.getItem('miniprogram'),
                        dataList:datalist
                    };
                    this.updatemallsOtherShopUpdate(options1);//修改分店数据
                    // 修改里面 可能会存在新增的数据
                    for(let i = 0;i<this.localotherShopList.length;i++){
                        if(this.localotherShopList[i].otherId != '' && this.localotherShopList[i].otherId  != null){
                            //说明是修改的数据
                            let datalist = [];
                            if(this.localotherShopList[i].otherName != null && this.localotherShopList[i].otherName != "" &&
                            this.localotherShopList[i].otherAddress != null && this.localotherShopList[i].otherAddress != "" &&
                            this.localotherShopList[i].otherPhone != null && this.localotherShopList[i].otherPhone != "" &&
                            this.localotherShopList[i].otherPic.length >0 ){
                                let name =  {otherShopId:this.localotherShopList[i].otherId,updateType:1,updataData:this.localotherShopList[i].otherName};
                                let address = {otherShopId:this.localotherShopList[i].otherId,updateType:2,updataData:this.localotherShopList[i].otherAddress};
                                let phone = {otherShopId:this.localotherShopList[i].otherId,updateType:3,updataData:this.localotherShopList[i].otherPhone};
                                let pic = {otherShopId:this.localotherShopList[i].otherId,updateType:4,updataData:this.localotherShopList[i].otherPic[0]};
                                datalist.push(name); 
                                datalist.push(address); 
                                datalist.push(phone); 
                                datalist.push(pic); 
                            }else{
                                  console.log('AAAAAA222')
                                this.$message({type:'warning',message:"请完善分店信息"});
                                return;
                            }
                            let options2 = {
                                shopId:sessionStorage.getItem('miniprogram'),
                                dataList:datalist
                            }
                            this.updatemallsOtherShopUpdate(options2);//修改分店数据
                        }else{
                            //说明是新增的数据
                            let lcoallistobj = {};
                            lcoallistobj.shopId = sessionStorage.getItem('miniprogram');
                            if(this.localotherShopList[i].otherName != null &&  this.localotherShopList[i].otherName != '' &&
                            this.localotherShopList[i].otherAddress != null &&  this.localotherShopList[i].otherAddress != '' &&
                            this.localotherShopList[i].otherPhone != null &&  this.localotherShopList[i].otherPhone != '' &&
                            this.localotherShopList[i].otherPic.length > 0){
                                  lcoallistobj.otherShopName = this.localotherShopList[i].otherName;
                                  lcoallistobj.otherShopAddress = this.localotherShopList[i].otherAddress;
                                  lcoallistobj.otherShopPhone = this.localotherShopList[i].otherPhone;
                                   lcoallistobj.otherShopPic = this.localotherShopList[i].otherPic[0];
                            }else{
                                  console.log('AAAAAA333')
                                this.$message({type:'warning',message:"请完善分店信息"});
                                return;
                            } 
                            allstoreListadd.push(lcoallistobj);
                        }
                    }
                    //console.log('分店基本信息参数：',allstoreListadd);
                    this.additonMallsOtherShopAdd(allstoreListadd);//编辑的时候存在新增的数据，，则调用 新增接口
                }    
          }else{
              //说明是 新增 ---如果this.defaultstore.otherId 是空的，，说明后面所有的数据 都是新增的。
              if(this.defaultstore.otherName == "" && this.defaultstore.otherAddress == "" && this.defaultstore.otherPhone != "" && this.defaultstore.otherPic.length <= 0){
                   //要么一个不填，填一个就必须填全部
              }else{
                    let stroeobj = {};
                    stroeobj.shopId = sessionStorage.getItem('miniprogram');
                    if(this.defaultstore.otherName != "" && this.defaultstore.otherName != null && 
                      this.defaultstore.otherAddress != "" && this.defaultstore.otherAddress != null
                     && this.defaultstore.otherPhone != "" && this.defaultstore.otherPhone != null && 
                      this.defaultstore.otherPic.length > 0){
                           stroeobj.otherShopName = this.defaultstore.otherName;
                           stroeobj.otherShopAddress = this.defaultstore.otherAddress;
                           stroeobj.otherShopPhone = this.defaultstore.otherPhone;
                           stroeobj.otherShopPic = this.defaultstore.otherPic[0];
                    }else{
                        console.log('AAAAAA444')
                        this.$message({type:'warning',message:"请完善分店信息"});
                        return;
                    }
                    allstoreListadd.push(stroeobj);
                    if(this.localotherShopList.length > 0){//只要点击 添加分店了，就必须填写
                        for(let i=0;i<this.localotherShopList.length;i++){
                            let lcoallistobj = {};
                            lcoallistobj.shopId = sessionStorage.getItem('miniprogram');
                            if(this.localotherShopList[i].otherName != null &&  this.localotherShopList[i].otherName != '' &&
                              this.localotherShopList[i].otherAddress != null &&  this.localotherShopList[i].otherAddress != '' &&
                               this.localotherShopList[i].otherPhone != null &&  this.localotherShopList[i].otherPhone != '' && 
                               this.localotherShopList[i].otherPic.length > 0){
                                   lcoallistobj.otherShopName = this.localotherShopList[i].otherName;
                                   lcoallistobj.otherShopAddress = this.localotherShopList[i].otherAddress;
                                   lcoallistobj.otherShopPhone = this.localotherShopList[i].otherPhone;
                                   lcoallistobj.otherShopPic = this.localotherShopList[i].otherPic[0];
                            }else{
                                  console.log('AAAAAA555')
                                 this.$message({type:'warning',message:"请完善分店信息"});
                                return;
                            }
                            allstoreListadd.push(lcoallistobj);
                        }
                    }
                this.additonMallsOtherShopAdd(allstoreListadd);
              }
          }
       },
       updatemallsOtherShopUpdate(options){
          //修改分店
          mallsOtherShopUpdate(options).then((res)=>{
             // console.log('修改分店数据:',res);
          },(err)=>{
              //错误
          })
       },
       additonMallsOtherShopAdd(allstoreList){
          //新增分店
          let options = {dataList:allstoreList}
          mallsOtherShopAdd(options).then((res)=>{
             // console.log('新增分店数据:',res);
          },(err)=>{
              //错误
          })
       },
       delShopImage(){
           //删除 图片
           let Arrayobj = [];
           if(this.bideShopFirstPic.length>0){
             Arrayobj.push(this.bideShopFirstPic[0]);
           }
           if(this.bideShopEndPic.length>0 ){
             Arrayobj.push(this.bideShopEndPic[0]);
           }
           if(this.bideShopStorePic.length>0){
              for(let i=0;i<this.bideShopStorePic.length;i++){
                  Arrayobj.push(this.bideShopStorePic[i]);
                }
           }
           // console.log('删除参数:',Arrayobj);
            this.delMallsShopImageOperation(Arrayobj);
       },
       addShopImage(){
          //新增  1 首图增 3 尾图增 5 门照增
          let Arrayobj = [];
          for(let i=0;i<this.shopFirstPic.length;i++){
              let obj = {};
              obj.url = this.shopFirstPic[i];
              obj.operateType = 1;//首图
              Arrayobj.push(obj);
          }
          if(this.shopList.length>0){
              for(let i=0;i<this.shopStorePic.length;i++){
                  let isEquality = false;
                  for(let j=0;j<this.shopList.length;j++){
                     if(this.shopStorePic[i] === this.shopList[j].logoSrc){
                         isEquality = true;
                         break;
                     }
                  }
                  if(!isEquality){
                        let obj = {};
                        obj.url = this.shopStorePic[i];
                        obj.operateType = 5;//门店照片
                        Arrayobj.push(obj);
                  }
              }
          }else{
              for(let i=0;i<this.shopStorePic.length;i++){
                let obj = {};
                obj.url = this.shopStorePic[i];
                obj.operateType = 5;//门店照片
                Arrayobj.push(obj);
              }
          }
          
          for(let i=0;i<this.shopEndPic.length;i++){
              let obj = {};
              obj.url = this.shopEndPic[i];
              obj.operateType = 3;//尾图
              Arrayobj.push(obj);
          }
         // console.log('新增参数:',Arrayobj);
          this.addMallsShopImageOperation(Arrayobj);
       },
       saveShopinf(){
          //整合店铺基本信息数据
          let shopdetailList = [ 
              {updateType:1,updataData:this.shopInfo},
              {updateType:2,updataData:this.phone},
              {updateType:3,updataData:this.address}];
              //console.log('店铺基本信息参数：',shopdetailList);
           this.saveMallsShopInfoUpdate(shopdetailList);
       },
       delMallsShopImageOperation(Arrayobj){
           //删除或新增 店铺 首图 尾图 门店照片
           let options = {
             shopId:sessionStorage.getItem('miniprogram'),
             dataList:Arrayobj
           }
           //console.log('店铺照片删除请求参数：',options);
           mallsShopImageOperation(options).then((res)=>{
             //console.log('新增删除店铺图片:',res);
                this.addShopImage();
           },(err)=>{
             //新增 或修改图片 错误
           })
       },
       addMallsShopImageOperation(Arrayobj){
           //删除或新增 店铺 首图 尾图 门店照片
           let options = {
             shopId:sessionStorage.getItem('miniprogram'),
             dataList:Arrayobj
           }
           //console.log('店铺照片新增请求参数：',options);
           mallsShopImageOperation(options).then((res)=>{
               this.fullLoading = false;
             //console.log('新增删除店铺图片:',res);
           },(err)=>{
             //新增 或修改图片 错误
           })
       },
       saveMallsShopInfoUpdate(shopdetaillist){
           //修改店铺基本信息 
           let options = {
               shopId:sessionStorage.getItem('miniprogram'),
               dataList:shopdetaillist
           };
          mallsShopInfoUpdate(options).then((res)=>{
              if(res.data.state == 200){
                 this.$message({type:'success',message:'修改成功'});
              }
              // console.log('同接口新增和修改店铺信息：',res);
          },(err)=>{
              //错误
          })
       },
       saveShopDetail(){
         //保存
            let role = sessionStorage.getItem('miniprogramrole');
            if(role !='店长' && role !="店员"){
                this.$message({type:'warning',message:'没有权限'});
                return;
            }
           if(this.shopFirstPic.length<=0){
             this.$message({type:'warning',message:'至少上传1张店铺首图'});
             return;
          }
          if(this.shopStorePic.length < 3 && this.shopStorePic.length > 0){
             this.$message({type:'warning',message:'建议上传不少于三张250*180尺寸的图片，系统上限20张'});
             return;
          }
          if(this.shopEndPic.length <= 0){
             this.$message({type:'warning',message:'至少上传1张店铺尾图'});
             return;
          }
          if(this.shopInfo == ''){
              this.$message({type:'warning',message:'请输入店铺信息!'});
             return;
          }
          if(this.phone == '' || this.phone.replace(/\s+/g,"") == '' ){
              this.$message({type:'warning',message:'请输入电话号码!'});
             return;
          }
          let myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
      　　if (!myreg.test(this.phone)) {
             this.$message({type:'warning',message:'请输入正确的手机号格式!'}); 
          　　return; 
      　　} 
          if(this.address == '' || this.address.replace(/\s+/g,"") == ''){
             this.$message({type:'warning',message:'请输入店铺地址!'});
             return;
          }
          if(this.defaultstore.otherName == '' && 
                this.defaultstore.otherAddress == '' && 
                this.defaultstore.otherPhone=="" && 
                this.defaultstore.otherPic.length<=0){
                    //要么一个不填   要么全部都要填
            }else{
                if(this.defaultstore.otherName !='' && this.defaultstore.otherName !=null && 
                    this.defaultstore.otherAddress!=''&& this.defaultstore.otherAddress!=null && 
                    this.defaultstore.otherPhone != '' && this.defaultstore.otherPhone != null &&
                    this.defaultstore.otherPic[0] != '' && this.defaultstore.otherPic[0] != null){
                         let myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
                    　　if (!myreg.test(this.defaultstore.otherPhone)) {
                            this.$message({type:'warning',message:'请输入正确的手机号格式!'}); 
                        　　return; 
                    　　} 
                }else{
                    // this.$message({type:'warning',message:"请完善分店信息"});
                    return;
                }
            }
          for(let i = 0;i<this.localotherShopList.length;i++){
                if(this.localotherShopList[i].otherName != null &&  this.localotherShopList[i].otherName != '' &&
                this.localotherShopList[i].otherAddress != null &&  this.localotherShopList[i].otherAddress != '' &&
                this.localotherShopList[i].otherPhone != null &&  this.localotherShopList[i].otherPhone != '' &&
                this.localotherShopList[i].otherPic.length > 0){
                         let myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
                    　　if (!myreg.test(this.localotherShopList[i].otherPhone)) {
                            this.$message({type:'warning',message:'请输入正确的手机号格式!'}); 
                        　　return; 
                    　　} 
                }else{
                    this.$message({type:'warning',message:"请完善分店信息"});
                    return;
                }       
            }  
          this.fullLoading = true;
          //this.addShopImage();//组装 店铺所有图片数据
          this.delShopImage();// 组装 店铺所有待删除数据
          this.saveShopinf();// 组装 店铺 基本信息 3条
          this.commandStoreinf();//组装分店数据保存
       },
       deleteStroedefault(otherid){
          //删除分店默认数据
          let _this = this;
          let options = {
              shopId:sessionStorage.getItem('miniprogram'),
              otherShopId:otherid,
              operateType:1
          }
          mallsOtherShopOperation(options).then((res)=>{
              if(res.status == 200){
                   _this.$message({type:'success',message:"删除成功"});
                   _this.defaultstore.otherName = '';
                   _this.defaultstore.otherAddress = '';
                   _this.defaultstore.otherPhone = '';
                   _this.defaultstore.otherPic = [];
              }else{
                   _this.$message({type:'success',message:"删除失败"});
              }
          })
       },
       // deleteStroeoneof(otherid){
       //    //删除分店数据
       //    let _this = this;
       //    let options = {
       //        shopId:sessionStorage.getItem('miniprogram'),
       //        otherShopId:otherid,
       //        operateType:1
       //    }
       //    mallsOtherShopOperation(options).then((res)=>{
       //        if(res.status == 200){
       //             _this.$message({type:'success',message:"删除成功"});
       //            for(let i=0;i<_this.localotherShopList.length;i++){
       //                if(otherid == _this.localotherShopList[i].otherId){
       //                    _this.localotherShopList.splice(i,1);
       //                    return;
       //                }
       //            }
       //        }else{
       //             _this.$message({type:'success',message:"删除失败"});
       //        }
       //    })
       // },
       // ****************************  上传开始  *****************************************
        checkFile (type) {
            this.updataImgType = type
            document.getElementById("file_input").click();
        },
        storecheckFile(index){
             //上传分店数据
             this.updataImgType = 0;
             this.storeindex = index;
             document.getElementById("file_input").click();
        },
        changeFileInput (ev) {
            let self = this
            let file = ev.target.files[0];
            if (file) {   
                let reader = new FileReader();
                reader.readAsDataURL(ev.target.files[0]);
                reader.onload = function (e) {
                    //console.log('上传参数:',e);
                if (self.updataImgType == 99999) {
                    if(self.shopFirstPic.length>=1){
                         self.$message({type:'info',message:"仅可上传1张照片"});
                         return;
                    }
                    // document.getElementById("thumbnail").src = this.result;
                    // self.uploadHandler(file, 1);
                } else if(self.updataImgType == 99998){
                     if(self.shopStorePic.length>=20){
                         self.$message({type:'info',message:"最多只可上传20张照片"});
                         return;
                    }
                    // document.getElementById("thumbnail").src = this.result;
                    // self.uploadHandler(file, 1);
                }else if(self.updataImgType == 99997){
                    if(self.shopEndPic.length>=1){
                          self.$message({type:'info',message:"仅可上传1张照片"});
                          return;
                    }
                    // document.getElementById("thumbnail").src = this.result;
                    // self.uploadHandler(file, 1);
                }else if(self.updataImgType == 99996){//默认 分店
                     if(self.defaultstore.otherPic.length >=1){
                         self.$message({type:'info',message:"仅可上传1张照片"});
                          return;
                     }
                }else{
                  //分店数组中
                  if(self.localotherShopList[self.storeindex].otherPic.length>=1){
                        self.$message({type:'info',message:"仅可上传1张照片"});
                        return;
                  }
                  // document.getElementById("thumbnail").src = this.result;
                  // self.uploadHandler(file, 1);
                  
                    }
                 document.getElementById("thumbnail").src = this.result;
                  self.uploadHandler(file, 1);
                }
            }
        },
        uploadHandler (file, type) {
            let self = this;
            let extNameList = file.name.split('.');
            let extName = extNameList[extNameList.length - 1]
            let getSignUrl = base.Cos.getSignUrl
            let updateUploadFileURL = base.Cos.updateUploadFileURL
            let myFolder = '/iconHeaded/'
            let appid = base.Cos.appid
            let bucket = base.Cos.bucket
            let region = base.Cos.region
            let userId = sessionStorage.getItem('id')
            let timestamp = new Date().getTime()
            let fileName = userId + '-' + timestamp + '.' + extName
            let cos = new CosCloud({
                appid: appid,
                bucket: bucket,
                region: region,
            getAppSign: function (callback) {
                baseApi.apiCall({type: '1'}, getSignUrl).then((response) => {
                let sign = response.data.data.signStr
                myFolder = response.data.data.url
                callback(sign)
                })
            }
            })
            // if (extName == 'png' || extName == 'jpg' || extName == 'JPEG' || extName == 'jpeg') {
            let successCallBack = function (result) {
               // console.log('获取上传结果:',result);
                if (result.code === 0) {
                    if(self.updataImgType==99999){
                       self.shopFirstPic.push(result.data.source_url);
                    }else if(self.updataImgType==99998){
                        self.shopStorePic.push(result.data.source_url);   
                    }else if(self.updataImgType==99997){
                        self.shopEndPic.push(result.data.source_url);
                    }else if(self.updataImgType==99996){
                        self.defaultstore.otherPic.push(result.data.source_url);
                    }else{
                      self.localotherShopList[self.storeindex].otherPic.push(result.data.source_url);
                    }
                    
                let data = {
                    type: type,
                    objId: userId,
                    url: result.data.source_url
                }
                baseApi.apiCall(data, updateUploadFileURL).then((response) => {
                    if (response.data.state === 200) {
                    //self.$store.dispatch('getUserInfo');
                    }
                })
                }
            }
            let errorCallBack = function (result) {
                //console.log('上传失败',result);
            }
            let progressCallBack = function (result) {
            }
            cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + fileName, file, 1) //0表示允许覆盖文件 1表示不允许
            // } else {
            //     this.$store.dispatch('workPopupError', "文件格式必须为 *.jpg / *.png / *.jpeg");
            //     location.reload();
            //     return
            // }
        },
        // ****************************  上传 结束 *****************************************
    }
}
</script>

<style lang="scss" scoped>
  .data-view {
    width: 1080px;
    position: relative;
    .custhum{
        display: inline-block;
        width:150px;height:150px;border:1px dashed #c0ccda;border-radius:5px;text-align: center;
        background-color: #f5fefa;
        font-size: 18px;
        color: #999;
        line-height: 148px;
        cursor: pointer;
        margin-top: 20px;
    margin-left: 10px;
    margin-bottom: 15px;
        &:hover{
            border:1px dashed #2993f8;
        }         
    }
    >.title {
      height: 40px;
      color: #999;
      >i {
        margin-right: 5px;
      }
      >.headersave{
          position: absolute;
          right: 20px;
          top: 0;
          width: 100px;
          height: 30px;
          border-radius: 5px;
          background: #2993f8;
          color: #fff;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
      }
    }
    .tpl-scroll {
      position: relative;
      max-height: 650px;
      overflow: hidden;
      overflow-y: auto;
      padding-right: 40px;
        .storemodel{
          margin: 10px 0;
            padding: 10px;
           height: 450px;
           background-color: #f1f2f3;
           input{
             background-color: #f1f2f3;
           }
           textarea{
              background-color: #f1f2f3;
           }
           .mydel{
              float: right;
              color: #999;
              margin-right: 10px;
              margin-top: 5px;
           }
        }
        .shopindexd{
           >.verticalbar{
             font-size: 16px;
             color: #2993f8;
             font-weight: bold;
           }
           .buttondiv{
            display: inline-block;
            background:#2993f8;
            border-radius: 4px;
            text-align: center;
            width: 90px;
            height: 28px;
            color:#fff;
            font-size: 12px;
            line-height: 28px;
            cursor: pointer;
            vertical-align: bottom;
           }
           >i{
             color: red;
             font-size: 16px;
           }
           >.tiptitle{
             // font-weight: bold;
             >span{
               font-size: 14px;
               color: #999;
               font-family: '"微软雅黑", tahoma;';
               font-weight: 500;
             }
           }
           >.cluecls{
             font-size: 12px;
             color: #999;
           }
        }
        .shopcontainer{
            .mydel{
                float: right;
            }
            .mycusthumbnail{
              margin-top: 20px;
              margin-left: 10px;
              margin-bottom: 15px;
            }
            .allspace{
              margin-left:10px;margin-top:20px;margin-bottom:10px;
            }
            .textar{
              height:100px;width:800px;border:1px solid #e0e0e0;
            }
            .storeaddress{
               >label{
                display: inline-block;
                color: #999;
                font-size: 14px;
                float: left;
              }
              >div{
                display: inline-block;
                margin-left:14px;
                margin-top:-8px;
                height: 55px;
                width: 745px;
                border: 1px solid #e0e0e0;
                >textarea{
                     height:45px;width:735px;
                     margin-top:8px;
                     margin-left:8px;
                }
              }
            }
            .storepic{
               >.buttondiv{
                display: inline-block;
                background:#2993f8;
                border-radius: 4px;
                text-align: center;
                width: 90px;
                height: 28px;
                color:#fff;
                font-size: 12px;
                line-height: 28px;
                cursor: pointer;
              }
              >.tiptitle{
                // font-weight: bold;
                >span{
                  font-size: 14px;
                  color: #999;
                  font-weight: 500;
                }
              }
              >.cluecls{
                font-size: 12px;
                color: #999;
              }
            }
            .callus{
              >label{
                display: inline;
                color: #999;
                font-size: 14px;
              }
              >div{
                margin-left: 10px;
                display: inline-block;
                width: 400px;
                height: 33px;
                line-height: 30px;
                border:1px solid #e0e0e0;
                input{
                  width: 390px;
                  height: 30px;
                  margin-left: 8px;
                  line-height: 30px;
                }
              }
            }
        }
    }
   
  }

</style>