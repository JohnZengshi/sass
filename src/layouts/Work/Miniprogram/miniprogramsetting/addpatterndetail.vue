<template>
    <div class="shop-container-tpl">
        
        <div class="sp-title"> 
            <div class="sp_crumbs">
                <i class="iconfont icon-dianpu"></i> 
                <span class="txt">小程序设置>款式管理><span style="color:#2993f8;">新增款号</span></span>
            </div>
            <div class="sell-new-data savecli" @click="savePatternDetail">
                保存
            </div>
            <div class="sell-new-data gobackcli" @click="comfirmgoback">
                返回上一页
            </div>
        </div>
        <!-- 左边表单区域 -->
        <div class="left-container">
            <div class="main-container">
                <div class="title headertitle">
                    <i class="iconfont icon-liebiao"></i>基本信息
                </div>
                <div class="container">
                    <div class="formdiv">
                        <i>*</i>
                        <span>款号</span>
                        <div> <input v-model="formpattern.styleNo" placeholder="最多可输入12个字符" maxlength="12"/></div>
                       
                    </div>
                    <div class="formdiv">
                        <i>*</i>
                        <span style="position:absolute;top:0;">款名</span>
                        <div style="margin-left:154px;"> <textarea v-model="formpattern.styleName" style="margin-top:5px;margin-left:8px;" placeholder="最多可输入50个字符" maxlength="50"></textarea></div>
                       
                    </div>
                    <div class="formdiv" >
                        <i>*</i>
                        <span>首饰大类</span>
                        <div style="border:0"> 
                            <el-select v-model="formpattern.jewelryId" placeholder="请选择" size="small" style="width:240px;">
                                    <el-option v-for="(item,index) in patternList" :key="index" :label="item.classesName" :value="item.classesId"></el-option>
                                    
                                </el-select>
                        </div>
                       
                    </div>
                    <div class="formdiv" v-if="selltype >= 0">
                        <i>*</i>
                        <span>款式状态</span>
                        <div style="border:0"> <span>{{selltypeArray[selltype]}}</span></div>
                       
                    </div>
                    <div class="formdiv">
                        <i>*</i>
                        <span>设置库存状态</span>
                        <div style="border:0"> <el-radio-group v-model="formpattern.status" size="small">
                                <el-radio :label="99" size="small">库存空预售</el-radio>
                                <el-radio :label="98" size="small">库存空下架</el-radio>
                                <el-radio :label="97" size="small">下架</el-radio>
                            </el-radio-group></div>
                    </div>
                </div>

                <div class="title muswitchimg">
                    <!--  -->
                    <i class="iconfont icon-liebiao"></i><i class="validt">*</i>轮播图：<div  @click="checkFile(1)">上传轮播图</div><span>最多上传5张图片</span>
                </div>
                <div class="container">
                    <custhumbnail class="mycusthumbnail" @deletePic="deletePic" :switchimgList="switchimgList"  id="thumbnail" >
                    </custhumbnail>
                    <input style="display: none;" ref="fileOne" type="file" id="file_input" @change="changeFileInput"/>
                </div>

                  <div class="title muswitchimg">
                    <i class="iconfont icon-liebiao"></i><i class="validt">*</i>款号图片：<div  @click="checkFile(2)">上传轮播图</div><span>最多上传20张图片</span>
                </div>
                <div  class="container">
                     <custhumbnail class="mycusthumbnail" @deletePic="deletePic" :switchimgList="patternswitchlist"  id="thumbnail" >
                      </custhumbnail>
                    <input style="display: none;" ref="fileTwo" type="file" id="file_input" @change="changeFileInput"/>
                    
                </div>

                <div class="title muswitchimg">
                    <i class="iconfont icon-liebiao"></i><i class="validt">*</i>商品视频：<div  @click="checkFile(3)">上传视频</div><span>仅可上传一个视频，最多50M</span>
                    <input style="display: none;" ref="fileThree" type="file" id="file_input" @change="changeFileInput"/>
                </div>
                <div  class="container">
                    <div class="myprogress">
                        <span>{{patternvedio}}</span>
                        <el-progress class="pro" :percentage="vedioprogress" v-if="vedioprogress != 0 && vedioprogress != 100"></el-progress>
   <!--                      <span class="successspan" v-if="patternvedio">上传成功<i class="iconfont icon-guanbi-copy" @click="chearVedioURi"></i></span> -->
                        <span class="successspan" v-if="patternvedio"><i class="iconfont icon-guanbi-copy" @click="chearVedioURi"></i></span>
                    </div>
                </div>

            </div>
            
        </div>

         <!-- 右边表格区域 -->
         <div class="right-container">
            <div class="main-container">
                <div class="title searchtitle">
                    <i class="iconfont icon-liebiao"></i>关联商品
                    <div><input v-model="barcode" placeholder="输入/扫描条码号" @keyup.enter="addNewGoodOperate"/></div>
                </div>
                <div class="container">
                    <patternreport 
                                  :patternDataList="tieinList" 
                                  @deletePatternitem="deleteNewGoodOperate"
                                  :shopId="queryshopid"
                                  @lazyloadSend="lazyloadSend"
                                  :styleId="styleId != ''?styleId:querystyleId"
                                  ></patternreport>
                </div>
            </div>
        </div>

    <backdialog :isVisible="isVisible" @comfirmgoback="comfirmgoback" @goback="goback"></backdialog>
    </div>
</template>
<script>
import patternreport from "./../patternDatarid/reportDetailTab";
import base from './../../../../config/base/index'
import baseApi from 'Api/Base/base'
import custhumbnail from './../upload/custhumbnail';
import {seekProductClassList,
        programProductGirardList,
        programGirardProductHandler,
        programProductAdd,
        programGirardUpdate,
        programGirardImageHandler,
        programGirardInfo
        } from 'Api/commonality/seek.js'
import backdialog from "./../backdialog"
export default{
    data(){
        return{
          queryshopid:sessionStorage.getItem('shopId'),
          querystyleId:this.$route.query.stid,
          isVisible:false,
          styleId:'',//如果是新增的，那么用这个ID
          radio2:3,
          dialogImageUrl: '',
          dialogVisible: false,
          switchimgList:[],// 5张轮播图
          updataImgType:null,
          patternswitchlist:[],//20张轮播图
          patternvedio:'',//传一个视频路径过去
          selltypeArray:['现货','预售','下架'],
          selltype:-1,
          formpattern:{
              shopId:sessionStorage.getItem('shopId'),//店铺ID
              styleNo:'',//款号
              styleName:'',//款名
              jewelryId:'',//首饰大类
              status:99//库存状态设置
          },
          barcode:'',//条码号
          patternList:[],//首饰大类
          vedioprogress:0,
          dideswitchList:[],//待删除5张轮播图
          didePatternList:[],//待删除20张轮播图
          didevedioId:'',//待删除视频ID
          layswitchList:[],//缓存5张轮播图
          laypatternList:[],//缓存20张轮播图
          layvedioId:'',//缓存视频ID
          layvedioURL:'',//缓存视频路径,
          tieinList:[],//关联商品集合
          isSavedetail:false,//判断是否操作保存按钮
          page:1,
          pageSize:15,
        }
    },created(){
        this.getseekProductClassList(3);
        this.getPatternDetailList();//获取明细
        this.getprogramProductGirardList();//关联商品列表
    },methods:{
        comfirmgoback(){
            // window.onpopstate = () => {  
            //   console.log('监听到？');
            // } 
            if(this.isSavedetail==false){
               this.isVisible = !this.isVisible;
               return;
            }
            // if(this.tieinList.length<=0 && this.styleId != ''){
            //     this.$message({type:'warning',message:'请先关联商品'});
            //     return;
            // }
            this.$router.go(-1);
        },
        goback(){
            this.isVisible = false;
            this.$router.go(-1);
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      deletePic(val){
          //删除轮播图
          for(let i=0;i<this.layswitchList.length;i++){
               if(val===this.layswitchList[i].logoSrc) {
                    let layswitchObj = {
                        operateType:1,
                        picId:this.layswitchList[i].logoId
                    }
                    this.dideswitchList.push(layswitchObj);
                    //this.layswitchList.splice(i,1);//如果删了一次，为了减少下一次循环次数，把数据存好之后，就删掉原集合中的数据
                    break;
               }
          }
          for(let i=0;i<this.laypatternList.length;i++){
              if(val===this.laypatternList[i].logoSrc){
                   let laypatternObj = {
                       operateType:1,
                       picId:this.laypatternList[i].logoId
                   }
                   this.didePatternList.push(laypatternObj);
                   //this.laypatternList.splice(i,1);
                   break;
              }
          }
          for(let i=0;i<this.switchimgList.length;i++){
             if(val === this.switchimgList[i]){
                 this.switchimgList.splice(i,1);
                 return;
             }
          }
          for(let i=0;i<this.patternswitchlist.length;i++){
              if(val === this.patternswitchlist[i]){
                 this.patternswitchlist.splice(i,1);
                 return;
             }
          }
      },
      chearVedioURi(){
          if(this.patternvedio === this.layvedioURL){
              this.didevedioId = this.layvedioId;
          }
          this.patternvedio = "";
          this.vedioprogress = 0;
      },
      savePatternitem(){
        //新增款号基本信息 ，不包括图片
         let options = {
              shopId:sessionStorage.getItem('shopId'),//店铺ID
              styleNo:this.formpattern.styleNo,//款号
              styleName:this.formpattern.styleName,//款名
              jewelryId:this.formpattern.jewelryId,//首饰大类
              status:''//库存状态设置
         }
         if(this.formpattern.status == 99){
             options.status = 1;
         }
         else if(this.formpattern.status == 98){
             options.status = 2;
         }
         else if(this.formpattern.status == 97){
             options.status = 3;
         }
         programProductAdd(options).then((res)=>{
           if(res.data.state == 200){
               this.styleId = res.data.data.styleId;
               this.savePatternpic();//款式基本数据返回，说明有款式ID了，再保存图片和关联商品
           } else {
              this.$message({type:'warning',message: res.data.msg});
           }
         })
      },
      updataPatternitem(){
         //修改 款号基本信息--不包括图片
         let PatternList = [
             {updateType:1,updateData:this.formpattern.styleNo},
             {updateType:2,updateData:this.formpattern.styleName},
             {updateType:3,updateData:this.formpattern.jewelryId},
         ];
         let statusObj = {updateType:4,updateData:""};
         if(this.formpattern.status == 99){
             statusObj.updateData = 1;
         }
         else if(this.formpattern.status == 98){
             statusObj.updateData = 2;
         }
         else if(this.formpattern.status == 97){
             statusObj.updateData = 3;
         }
         PatternList.push(statusObj);
         let options = {
             shopId:sessionStorage.getItem('shopId'),
             styleId:this.$route.query.stid,//如果是 编辑进来，这个位置会有值
             dataList:PatternList
         }
        programGirardUpdate(options).then((res)=>{
           // console.log('修改款式基本信息:',res);
        })
      },
      savePatternpic(){
        //保存图片
        let patternPicList = [];
        //  this.layswitchList.length  this.laypatternList
        if(this.$route.query.stid != '' && this.$route.query.stid != null){
            for(let i=0;i<this.switchimgList.length;i++){
            //循环保存 5张轮播图
                let isfalse = false;
                for(let j=0;j<this.layswitchList.length;j++){
                    if(this.layswitchList[j].logoSrc === this.switchimgList[i]){
                        isfalse = true;
                        break;
                        
                    }
                }
                if(!isfalse){
                    let fivepic = {operateType:2,picId:this.switchimgList[i]};
                    patternPicList.push(fivepic);
                }
            }
             //循环保存20张图-------这部分代码 可优化成  公共函数加以调用--
            for(let i=0;i<this.patternswitchlist.length;i++){
                let isfalse = false;
                for(let j=0;j<this.laypatternList.length;j++){
                    if(this.patternswitchlist[i] === this.laypatternList[j].logoSrc){
                        //说明页面上的这条数据 是旧的
                        isfalse = true;
                        break;
                    }
                }
                if(!isfalse){
                    let twitypic = {operateType:3,picId:this.patternswitchlist[i]};
                    patternPicList.push(twitypic);
                }
            }
        }else{
            for(let i=0;i<this.switchimgList.length;i++){
                //循环保存 5张轮播图
                let fivepic = {operateType:2,picId:this.switchimgList[i]};
                patternPicList.push(fivepic);
            }
            for(let i=0;i<this.patternswitchlist.length;i++){
                let twitypic = {operateType:3,picId:this.patternswitchlist[i]};
                patternPicList.push(twitypic);
            }
        }
        let vediourl = {operateType:4,picId:this.patternvedio};//视频
            patternPicList.push(vediourl);  
        //注：picId  新增的时候是传 url,修改删除的时候是传图片ID，后台这么说的，跟前端没关系，跟后台说了，后台不改
        let options ={
            shopId:sessionStorage.getItem('shopId'),//店铺ID
            styleId:this.styleId,//如果是新增。会先拿到款号ID
            dataList:patternPicList
        } 
        if(this.$route.query.stid != '' && this.$route.query.stid != null){
            options.styleId = this.$route.query.stid;//如果是编辑，会存在路由值
        }
        //这个位置 为了区分屏蔽 保存和编辑 只上传最新数据。。后台有BUG，后台返回编辑数据 会给到删除的数据。所以直接找后台改
        // 然后 编辑的时候   后台也会生成一条新款号数据，这个BUG  也要后台改
        //console.log('编辑保存或新增保存图片参数:',options);
        programGirardImageHandler(options).then((res)=>{
            if(res.data.state == 200){
                if(this.tieinList.length<=0 && this.styleId != ''){
                    this.$message({type:'success',message:'保存成功'});
                    return;
                }
                this.$message({type:'success',message:'保存成功'});
                this.$router.go(-1);
            }
        })
      },
      updataPatternPic(){
        //删除图片
        let patternPicList = [];
        for(let i=0;i<this.dideswitchList.length;i++){
            patternPicList.push(this.dideswitchList[i]);
        }
        for(let i=0;i<this.didePatternList.length;i++){
           patternPicList.push(this.didePatternList[i]);
        }
        if(this.didevedioId!='' && this.didevedioId != null){
            let vediourl = {operateType:5,picId:this.didevedioId};
            patternPicList.push(vediourl);
        }
        //注：picId  新增的时候是传 url,修改删除的时候是传图片ID，后台这么说的，跟前端没关系，跟后台说了，后台不改
        let options ={
             shopId:sessionStorage.getItem('shopId'),//店铺ID
             styleId:this.$route.query.stid,//如果是删除。会传款号ID过来
             dataList:patternPicList
        }
        programGirardImageHandler(options).then((res)=>{
            console.log("删除图片：",res);
            if(res.data.state==200){
               this.savePatternpic();//，再保存图片
            }
        })
      },
      savePatternDetail(){
        //总保存
         let role = sessionStorage.getItem('miniprogramrole');
          if(role !='店长' && role !="店员"){
               this.$message({type:'warning',message:'没有权限'});
               return;
          }
        if(this.formpattern.styleNo == '' || this.formpattern.styleNo == null){
            this.$message({type:'warning',message:'请输入款号'});
            return;
        }
        if(this.formpattern.styleName == '' || this.formpattern.styleName == null){
            this.$message({type:'warning',message:'请输入款名'});
            return;
        }
        if(this.formpattern.jewelryId == '' || this.formpattern.jewelryId == null){
            this.$message({type:'warning',message:'请输入首饰大类'});
            return;
        }
        if(this.switchimgList.length <= 0 ){
            this.$message({type:'warning',message:'请先上传轮播图'});
            return;
        }
        if(this.patternswitchlist.length <= 0){
            this.$message({type:'warning',message:'请先上传款号轮播图'});
            return;
        }
        if(!this.patternvedio){
           this.$message({type:'warning',message:'请先上传视频'});
            return;
        }
        //  if(this.styleId != null || this.$route.query.stid != ''){
        //      this.addNewGoodOperate();//假如 这两个ID 都有值，证明是点击
        //  }else{
        // if(this.styleId==''){
           
        // }
        if(this.$route.query.stid != '' && this.$route.query.stid != null){

            this.updataPatternitem();//修改基本信息
  
            this.updataPatternPic();//删除图片
            //this.savePatternpic();//，再保存图片
        }else{
           if(this.styleId != ''){

                if(this.tieinList.length<=0 && this.styleId != ''){
                    this.$message({type:'success',message:'保存成功'});
                    return;
                }
                // else{
                //     this.updataPatternitem();//修改基本信息
                //     this.updataPatternPic();//删除图片
                // } 
                this.$message({type:'success',message:'保存成功'});
                this.$router.go(-1);
           }else{
  
               this.savePatternitem();//新增的时候，，这个值肯定没有，保存完了编辑，或者原本就是编辑页面，走修改
            }
        } 
        this.isSavedetail = true;
                // if(this.$route.query.stid == '' || this.$route.query.stid == null){
                // this.savePatternitem();//保存基本信息 ----必须要先等基本信息返回了，才能执行 图片操作和关联操作
                // }else{
                // this.updataPatternitem();//修改基本信息
                // this.updataPatternPic();//删除图片，再保存图片
                // }

        //  }
      },
      fixSwitchimglist(switchlist){
          for(let i=0;i<switchlist.length;i++){
               this.switchimgList.push(switchlist[i].logoSrc);
          }
      },
      fixPatternimgList(patternList){
          for(let i=0;i<patternList.length;i++){
              if(i<= 20){//避免后台数据给一堆，这边 直接不要那些数据，只留下20条就好
                 this.patternswitchlist.push(patternList[i].logoSrc);
              }
          }
      },
       // ****************************  上传开始  *****************************************
        checkFile (type) {
            this.updataImgType = type
            document.getElementById("file_input").click();
        },
        changeFileInput (ev) {
            let self = this
            let file = ev.target.files[0];
            if (file) {   
                let reader = new FileReader();
                reader.readAsDataURL(ev.target.files[0]);
                reader.onload = function (e) {
                   // console.log('上传参数:',e);
                if (self.updataImgType == 1) {
                    if(self.switchimgList.length>=5){
                         self.$message({type:'info',message:"最多只可上传5张照片"});
                         return;
                    }
                    document.getElementById("thumbnail").src = this.result;
                    self.uploadHandler(file, 1);
                } else if(self.updataImgType == 2){
                     if(self.patternswitchlist.length>=20){
                         self.$message({type:'info',message:"最多只可上传20张照片"});
                         return;
                    }
                    document.getElementById("thumbnail").src = this.result;
                    self.uploadHandler(file, 1);
                }else{
                    if(self.patternvedio != '' && self.patternvedio != null){
                          self.$message({type:'info',message:"最多只可上传1个视频"});
                          return;
                    }
                    document.getElementById("thumbnail").src = this.result;
                    self.uploadHandler(file, 1);
                }
                
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
                //console.log('获取上传结果:',result);
                if ( self.$refs.fileOne ) self.$refs.fileOne.value = ''
                if ( self.$refs.fileTwo ) self.$refs.fileTwo.value = ''
                if ( self.$refs.fileThree ) self.$refs.fileThree.value = ''
                if (result.code === 0) {
                    if(self.updataImgType==1){
                       self.switchimgList.push(result.data.source_url);
                    }else if(self.updataImgType==2){
                        self.patternswitchlist.push(result.data.source_url);   
                    }else{
                        self.patternvedio = result.data.source_url;
                    }
                    
                // let data = {
                //     type: type,
                //     objId: userId,
                //     url: result.data.source_url
                // }
                // baseApi.apiCall(data, updateUploadFileURL).then((response) => {
                //     if (response.data.state === 200) {
                //     //self.$store.dispatch('getUserInfo');
                //     }
                // })
                }
            }
            let errorCallBack = function (result) {
                //console.log('上传失败',result);
            }
            let progressCallBack = function (result) {
                //console.log('上传进度',result* 100 );
                if(self.updataImgType != 1 && self.updataImgType != 2){
                     self.vedioprogress = result*100 ;
                }
            }
            cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + fileName, file, 1) //0表示允许覆盖文件 1表示不允许
        },
        // ****************************  上传 结束 *****************************************
        getseekProductClassList(intype){
        //获取选项参数列表
        // 1=成色名称   2=宝石名称   3=首饰类别   4=宝石属性
       // console.log('获取款号ID：',this.$route.query.stid);
        let options = {type:intype}
        seekProductClassList(options).then((res)=>{
               // console.log(res.data.data.list);
               if(res.status == 200){
                this.patternList =res.data.data.list;
               }
        },(err)=>{
          //错误
        });
      },
      getPatternDetailList(){
          if(this.$route.query.stid != '' && this.$route.query.stid != null){
            let options = {
              shopId:sessionStorage.getItem('shopId'),
              styleId:this.$route.query.stid
            }
            programGirardInfo(options).then((res)=>{
                console.log('获取编辑明细数据:',res);
                if(res.status == 200){
                   //this.switchimgList = [];//5张轮播图
                   this.layswitchList = res.data.data.dataList;
                   this.fixSwitchimglist(res.data.data.dataList);
                   //this.patternswitchlist = [];//20张轮播图
                   this.laypatternList = res.data.data.styleDataList;
                   this.fixPatternimgList(res.data.data.styleDataList);
                   this.patternvedio = res.data.data.url;//视频路径
                   this.layvedioURL = res.data.data.url;
                   this.layvedioId = res.data.data.videoId;
                   this.formpattern.styleNo = res.data.data.girard;//款号
                   this.formpattern.styleName = res.data.data.styleName;//款名
                   this.formpattern.jewelryId = res.data.data.jewelryId;//首饰大类
                   //this.formpattern.status = Number(res.data.data.stockStatus);//库存状态
                   if(res.data.data.stockStatus == '1'){
                       this.formpattern.status  = 99;
                   }else if(res.data.data.stockStatus == '2'){
                        this.formpattern.status  = 98;
                   }else if(res.data.data.stockStatus == '3'){
                       this.formpattern.status  = 97;
                   }
                   //console.log('款式状态:',res.data.data.sellType);
                   if(res.data.data.sellType!=null && res.data.data.sellType !=''){
                        this.selltype = Number(res.data.data.sellType)-1;//款式状态
                   }
                  
                }
            });
        }
          
      },
      addNewGoodOperate(){
          //通过 商品ID  添加商品到 列表中
          //发一个请求到后台。成功了 重新刷新列表
          let role = sessionStorage.getItem('miniprogramrole');
          if(role !='店长' && role !="店员"){
               this.$message({type:'warning',message:'没有权限'});
               return;
          }
          let options ={
              shopId:sessionStorage.getItem('shopId'),
              styleId:'',
              operateType:2,// 1 删除  2新增
              barcode:this.barcode//商品条码号
          }
          if(this.styleId != '' && this.styleId != null){
             options.styleId = this.styleId;//新增商品必定是在有ID 之后
          }else if(this.$route.query.stid != '' && this.$route.query.stid != null){
             options.styleId = this.$route.query.stid;
          }else{
              this.$message({type:'warning',message:'请先保存款号基本信息'});
              return;
          }
           //console.log('获取关联商品列表查看款号ID：',this.styleId);
          programGirardProductHandler(options).then((res)=>{
             // console.log('获取是否添加成功商品到款号下',res);
              if(res.data.state == 200){
                  this.getprogramProductGirardList();
              }else{
                  this.$message({type:'warning',message:res.data.msg});
              }
          },(err)=>{
              //错误
          })
      },
      deleteNewGoodOperate(val){
         this.getprogramProductGirardList();
      },
      lazyloadSend(){
         this.pageSize += 15;
         this.getprogramProductGirardList();
      },
      getprogramProductGirardList(){
          //关联商品列表--请求
          let options = {
              shopId:sessionStorage.getItem('shopId'),//店铺ID
              styleId:'',//款号ID
              sellStatus:4,//3全部 2已售 1在售
              page:this.page,//当前页
              pageSize:this.pageSize//每页显示数量
          }
           if(this.styleId != '' && this.styleId != null){
             options.styleId = this.styleId;//商品列表必定是在有ID 之后，所以这里只有两种情况
          }else{
             options.styleId = this.$route.query.stid;
          }
          programProductGirardList(options).then((res)=>{
              //console.log('获取关联商品列表数据',res);
              if(res.data.state == 200){
                 this.tieinList = res.data.data.dataList;
              }
          },(err)=>{
              //错误
          })
      }
    },
    components:{
       patternreport,
       custhumbnail,
       backdialog
    }
 }
</script>
<style>
.el-radio__inner{
 width: 14px;
 height: 14px;
}
.el-radio__label{
    color: #333;
}
.el-select-dropdown .el-select-dropdown__item.hover{
    color: #2993f8 !important;
}
</style>
<style lang="scss" scoped>
.shop-container-tpl{
  width: 1250px;
  margin: 0 auto 30px auto;
  position: relative;
  >.sp-title{
    position: relative;
    height: 90px;
    color: #333;
    padding-top: 40px;
    >.sp_crumbs{
      float: left;
      >.txt{
        font-size: 16px;
        color: #333;
        font-weight: bold;
      }
      >i{color: #2993f8; font-size: 20px; margin-right: 3px;}
    }
    .sell-new-data {
        background:#2993f8;
        border-radius: 4px;
        text-align: center;
        width: 90px;
        height: 28px;
        color:#fff;
        font-size: 12px;
        line-height: 28px;
        cursor: pointer;
        &:hover{
            background:#057aea;
        }
        >span{
            min-width: auto;
            color: #fff;
            padding: 0;
        }
    }
    .savecli{
       position: absolute;
       right: 100px;
    }
    .gobackcli{
       position: absolute;
       right: 0px;
    }
    >.selected_dropdown{
      float: right;
      width: 160px;
      max-width: 200px;
      border-radius: 3px;
      background-color: #fff;
      border:1px solid #eee;
      >.el-dropdown-link{
        text-align: center;
        max-width: 200px;
        width: 100%;
      }
    }
  }
}

.left-container{
   min-height: 730px;
   position: absolute;
   left: 0;
   .main-container{
     background-color: #fff;
     height: 730px;
     overflow-y: auto;
     overflow-x: hidden;
     box-shadow: 0px 0 15px #e2e2e2;
     border-radius: 10px;
     position: relative;
     >.title{
        line-height: 50px;
        padding: 0 15px 0 25px;
        >i{
           margin-right: 5px;
           color: #2993f8;
        }
        >.add{
          color: #2993f8;
          float: right;
          &:hover{
             color: #036acc;
          }
        }
     }
     >.headertitle{
         width: 430px;
         position: fixed;
         border-radius: 10px;
         background-color: #fff;
         z-index: 2;
     }
     >.muswitchimg{
         >.validt{
            font-size: 16px;
            color: red;
         }
         >div{
            display: inline-block;
            background:#2993f8;
            border-radius: 4px;
            text-align: center;
            // width: 90px;
            padding: 0 8px;
            height: 28px;
            color:#fff;
            font-size: 12px;
            line-height: 28px;
            cursor: pointer;
         }
         >span{
             font-size: 12px;
             margin-left: 10px;
             color: #999;
         }
     }
   }
   
   .main-container{
     width: 450px;
     float: left;
     >.container{
    //    display: flex;
       justify-content: space-between;
       margin-top: 50px;
       margin-bottom: 28px;
       position: relative;
       .myprogress{
           margin-top: -50px;
           margin-left: 50px;
           width: 100%;
           height: 30px;
           >span{
               display: inline-block;
               width: 200px;
               color: #999;
               overflow: hidden;
               font-size: 14px;
               white-space: nowrap;
               text-overflow: ellipsis;
           }
           >.pro{
               float: right;
               margin-right: 40px;
               width: 170px;
           }
           >.successspan{
               display: block;
                float: right;
                margin-top: -5px;
               margin-right: 40px;
               width: 95px;
               i{
                   margin-left: 5px;
                   cursor: pointer;
               }
           }
       }
       .mycusthumbnail{
           margin-top: -50px;
           margin-left: 50px;
       }
       .formdiv{
           width: 450px;
           margin-top: 30px;
           margin-bottom: 30px;
           display: block;
           position: relative;
           i{
           position: absolute;
           left: 33px;
           top: 10px;
           font-size: 18px;
           color: red;
          }
          span{
              display: inline-block;
              width: 100px;
              margin-left: 50px;
              color: #999;
              font-size: 14px;
          }
          >div{
              display: inline-block;
              border-radius: 2px;
              line-height: 28px;
              border: 1px solid #e0e0e0;
              >span{
                  margin-left: 2px;
              }
          }
          input{
              width: 230px;
              height: 28px;
              font-size: 14px;
              margin-left: 8px;
          }
          textarea{
              width:230px;height:76px;resize:none;
          }
          
       }
       
     }
   }
}



.right-container{
    min-height: 730px;
    position: absolute;
    right: 0;
   .main-container{
     background-color: #fff;
     // height: 100%;
     height: 730px;
     box-shadow: 0px 0 15px #e2e2e2;
     border-radius: 10px;
     
     >.title{
        height: 50px;
        line-height: 50px;
        padding: 0 15px 0 25px;
        >i{
           margin-right: 5px;
           color: #2993f8;
        }
        >.add{
          color: #2993f8;
          float: right;
          &:hover{
             color: #036acc;
          }
        }
     }
     >.searchtitle{
         >div{
             width: 200px;
            height: 28px;
            line-height: 24px;
            text-align: center;
            border-radius: 15px;
            position: absolute;
            top: 10px;
            right: 30px;
            border: 1px solid #e0e0e0;
            input{
                width: 190px;
                height: 25px;
                text-align: center;
                font-size: 12px;
                border-radius: 15px;
            }
         }
     }
   }
   
   .main-container{
     width: 780px;
     float: left;
     
     >.container{
        height: 620px;
        margin-top: 60px;
       display: flex;
       justify-content: space-between;
       margin-top: 50px;
     }
   }
}
</style>