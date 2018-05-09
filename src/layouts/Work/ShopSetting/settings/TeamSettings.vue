<template>
  <div class="team-box">
    <popup :isShow="isShowAction" :content="popContentText"></popup>
    <div class="team-contant">
      <div class="addTeam" v-if="isAddTeam">
        <div class="addTeam_title">新增班组</div>
        <div class="search"><input type="text" v-model="classesName"/></div>
        <span class="btn">
          <el-button type="primary" @click="addTeamBtn">确定</el-button>
          <el-button @click="addTeam">取消</el-button>
        </span>
      </div>
      <div class="addBox" v-if="isAdd">
        <div class="search"><input type="text" /></div>
        <!--<el-transfer v-model="value" :data="shopUserList"></el-transfer>-->
        <div class="trans">
          <ul class="list1">
            <li class="li-title"><span>店员</span></li>
            <li v-for="(mem, index) in shopUserList"><input type="checkbox" @click="selectMember(index)" :checked="mem.isCheck"/><span><img :src="mem.userLogo"/></span><span>{{mem.userName}}</span></li>
          </ul>
          <ul class="list2">
            <li class="li-title"><span>店员</span></li>
            <li  v-for="(member, index) in newtshopUserListRight" v-if="member.isCheck"><span><img :src="member.userLogo"/></span><span>{{member.userName}}</span></li>
          </ul>
        </div>
        <span class="btn">
          <el-button type="primary" @click="addFun">确定</el-button>
          <el-button @click="addFunction">取消</el-button>
        </span>

      </div>
      <div class="team-title">班组设置<span><el-button type="primary" @click="edit">{{editBtn}}</el-button><el-button  @click="addTeam">新增</el-button></span></div>
      <div class="team-main">
        <div class="team-group" v-for="(team, index) in teamList">
          <div class="team-group-title">{{team.groupName}}<span v-if="isEdit"><el-button @click="delGroup(index)" type="primary" class="delGroupO">删除</el-button></span></div>
          <ul class="team-group-co">
            <li class="team-item" v-for="(member, inde) in team.groupMemberDataList"><img :src="member.userLogo"/>{{member.userName}}<i class="el-icon-plus i-close" v-if="isEdit" @click="closeBtn(inde,index)"></i></li>
            <li class="team-last" v-if="isEdit">
              <div class="addLi" @click="addFunction(index)">
                <i class="el-icon-plus i-add"></i>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
  import {seekGetNewClassGroup, seekGetShopUserList, seekGetUserClassGroup} from './../../../../Api/commonality/seek'
  import {modifyClassGroup} from './../../../../Api/commonality/operate'
  import popup from './../../../template/Popup'
  export default {
    props: [
      'shopStorage'
    ],
    data () {
      return {
          isEdit: false,
          isAdd: false,
          isAddTeam: false,
          teamList: [],
          shopUserList: [],
          shopUserListRight: [],
          value: [],
          handleType: 0,
          classesName: '',
          teamIndex: 0,
          newtshopUserListRight: [],
          editBtn: '编辑',
          isDelSure: false,
          isShowAction: false,
          popContentText: '这是一个弹框',
          memberI: null,
          memberId: '',
          memberName: '',
          memberClassName: '',
          memberClassId: ''
          //isCheck: false,
      }
    },
    computed: {

    },
    components: {
      popup
    },
    methods: {
      open2(index) {
          this.$confirm('此操作将永久删除该班组, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          let options = {
            "handleType": 4,
            "shopId": this.shopStorage,
            "classGropuData": {
              "classesName": this.teamList[index].groupName, //班组名
              "classesId": this.teamList[index].groupId, //班组ID
            }
          }
          //console.log(options)
          modifyClassGroup(options).then((res) => {
            console.log(res);
            this.getNewClassGroup();
          }, (res) => {
            console.log(res.state);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delGroup (index) {
        this.open2(index);

      },
//      removeBtn (member) {
//          console.log(member);
//        console.log(this.shopUserListRight);
//        for (let i = 0; i < this.shopUserListRight.length; i++) {
//            if (this.shopUserListRight[i].userId == member.userId) {
//              this.shopUserListRight.splice(i, 1);
//            }
//        }
//      },
      selectMember (index) {
        var inde = this.shopUserList[index].isCheck;
        this.shopUserList[index].isCheck = !inde;
        if (this.shopUserList[index].isCheck == true) {
          let option = {
            'userId': this.shopUserList[index].userId
          }
          let self = this;
          console.log(option)
          seekGetUserClassGroup(option).then((res) => {
            console.log(res);
            if (res.data.state == 200) {
              if (res.data.data.groupId) {
                //console.log(11111)
                this.$confirm(this.shopUserList[index].userName + '已经是班组成员,确定要将他/她调整到当前班组吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                }).then(() => {
                  //console.log(this.teamList);
                  //console.log(index);
                  //console.log(self.shopUserList[index])
                  self.memberId = this.shopUserList[index].userId;
                  self.memberName = this.shopUserList[index].userName;
                  self.memberClassName = res.data.data.groupName;
                  self.memberClassId = res.data.data.groupId;
//                  console.log(self.memberId)
//                  console.log(self.memberName)
//                  console.log(self.memberClassName)
//                  console.log(self.memberClassId)
                  let options = {
                    "handleType": 5,
                    "shopId": self.shopStorage,
                    "classGropuData": {
                      "classesName": self.memberClassName, //班组名
                      "classesId": self.memberClassId, //班组ID
                      "memberList": [{
                        "userId": self.memberId, //员工ID
                        "userName": self.memberName//员工名称
                      } ]
                    }
                  }
                  console.log(options);
                  modifyClassGroup(options).then((res1) => {
                    console.log(res1);
                    self.shopUserListRight.push(self.shopUserList[index]);
                    this.newtshopUserListRight = [...new Set(this.shopUserListRight)];
                    this.getNewClassGroup();
                    this.$message({
                      type: 'success',
                      message: '调整成功!'
                    });
                  }, (res1) => {
                    console.log(res1.state);
                  })

                }).catch(() => {
                  self.shopUserList[index].isCheck = false;
                  this.$message({
                    type: 'info',
                    message: '已取消调整'
                  });
                });
              } else {
                //console.log(222222222)
                self.shopUserListRight.push(self.shopUserList[index]);
                this.newtshopUserListRight = [...new Set(this.shopUserListRight)];
              }
            }

          }, (res) => {
            console.log(res);
          })
//          for (let i = 0; i < this.teamList.length; i++) {
//            for (let j = 0; j < this.teamList[i].groupMemberDataList.length; j++) {
//              if (this.shopUserList[index].userId == this.teamList[i].groupMemberDataList[j].userId) {

//              } else {
//                this.shopUserListRight.push(this.shopUserList[index]);
//                return
//              }
//            }
//          }
        } else if (this.shopUserList[index].isCheck == false) {
            for (let k = 0; k < this.shopUserListRight.length; k++) {
                if (this.shopUserListRight[k].userId == this.shopUserList[index].userId) {
                    this.shopUserListRight.splice(k, 1);
                }
            }
          this.newtshopUserListRight = [...new Set(this.shopUserListRight)];
        }
//         console.log(this.shopUserListRight);
//         console.log(this.newtshopUserListRight);
//         console.log(this.memberI);
        //console.log(this.shopUserList.isCheck, index, inde);
        //Vue.set(this.shopUserList.isCheck, index, inde)
      },
      addFunction (index) {
        this.shopUserListRight = [];
        console.log(this.teamList)

        this.isAdd = !this.isAdd;
        this.teamIndex = index;
        //console.log(index);
        for (let i = 0; i < this.shopUserList.length; i++) {
          this.shopUserList[i].isCheck = false;
        }
      },
      addFun () {

        this.isAdd = !this.isAdd;
        //console.log(this.teamIndex);
        for (let i = 0; i < this.shopUserListRight.length; i++) {
          if (this.shopUserListRight[i].isCheck == true) {
            let options = {
              "handleType": 3,
              "shopId": this.shopStorage,
              "classGropuData": {
                "classesName": this.teamList[this.teamIndex].groupName, //班组名
                "classesId": this.teamList[this.teamIndex].groupId, //班组ID
                "memberList": [{
                  "userId": this.shopUserListRight[i].userId, //员工ID
                  "userName": this.shopUserListRight[i].userName//员工名称
                } ]
              }
            }
            //console.log(options)
            modifyClassGroup(options).then((res) => {
              console.log(res);
              this.getNewClassGroup();
            }, (res) => {
              console.log(res.state);
            })
          }
//          let options = {
//            "handleType": 3,
//            "shopId": self.shopStorage,
//            "classGropuData": {
//              "classesName": self.teamList[self.teamIndex].groupName, //班组名
//              "classesId": self.teamList[self.teamIndex].groupId, //班组ID
//              "memberList": [{
//                "userId": self.memberId, //员工ID
//                "userName": self.memberName//员工名称
//              } ]
//            }
//          }
//          modifyClassGroup(options).then((res2) => {
//            console.log(res2);
//            self.shopUserListRight.push(self.shopUserList[index]);
//            this.newtshopUserListRight = [...new Set(this.shopUserListRight)];
//            this.getNewClassGroup();
//          }, (res2) => {
//            console.log(res2.state);
//          })
        }
      },
      addTeamBtn() {
        this.handleType = 2;
        this.isAddTeam = !this.isAddTeam;
        this.modifyClassGroup();
        this.getNewClassGroup();
      },
      addTeam () {
        this.isAddTeam = !this.isAddTeam;
      },
      closeBtn (memberIndex, groupIndex) {
        console.log(memberIndex);
        console.log(groupIndex);
        for (let i = 0; i < this.teamList.length; i++) {
            if (i == groupIndex) {
              for (let j = 0; j < this.teamList[i].groupMemberDataList.length; j++) {
                if (j == memberIndex) {
                  let options = {
                    "handleType": 5,
                    "shopId": this.shopStorage,
                    "classGropuData": {
                      "classesName": this.teamList[groupIndex].groupName, //班组名
                      "classesId": this.teamList[groupIndex].groupId, //班组ID
                      "memberList": [{
                        "userId": this.teamList[groupIndex].groupMemberDataList[memberIndex].userId, //员工ID
                        "userName": this.teamList[groupIndex].groupMemberDataList[memberIndex].userName//员工名称
                      } ]
                    }
                  }
                  console.log(options)
                  modifyClassGroup(options).then((res) => {
                    console.log(res);
                    this.getNewClassGroup();
                  }, (res) => {
                    console.log(res.state);
                  })
                }

              }
            }

        }
      },
      edit () {
          this.isEdit = !this.isEdit;
          //console.log(this.isEdit)
        if (this.isEdit == false) {
          this.editBtn = '编辑'
//          this.$refs.editBt.type = 'primary'
        } else if (this.isEdit == true) {
          this.editBtn = '完成'
        }
      },
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      getNewClassGroup () {
          //console.log(this.shopStorage);
        let options = {
            "shopId": this.shopStorage
        }
          seekGetNewClassGroup(options).then((res) => {
            this.teamList = res.data.data;
            console.log(this.teamList);
          }, (res) => {
            console.log(res.state);
          })
      },
      modifyClassGroup () {
        let options = {
          "handleType": 2,
          "shopId": this.shopStorage,
          "classGropuData": {
              "classesName": this.classesName, //班组名
              "classesId": "" //班组ID
          }
        }
        //console.log(options)
        modifyClassGroup(options).then((res) => {
          console.log(res);
          this.getNewClassGroup();
        }, (res) => {
            console.log(res.state);
        })
      },
      getShopUserList () {
          let options = {
              "page": '1',
              "pageSize": "100",
              "shopId": this.shopStorage
          }
          seekGetShopUserList(options).then((res) => {
            //console.log(res);
            this.shopUserList = res.data.data.shopUserList;
           for (let i = 0; i < this.shopUserList.length; i++) {
             this.shopUserList[i].key = i;
             this.shopUserList[i].label = this.shopUserList[i].userName;
             this.shopUserList[i].isCheck = false;
           }
            console.log(this.shopUserList);
          }, (res) => {

        })
      }
    },
    mounted () {
      this.getNewClassGroup();
      this.getShopUserList();
      //console.log(this.data);
      let self = this;
      eventBus.$on('isClose', function (val, val1) {
        self.isShowAction = val;
        //console.log(val);
        //console.log(val1);
        this.isDelSure = val1;
      })
    }
  }
</script>
<style lang="scss" scoped>
   .el-transfer .el-transfer-panel{width:196px !important;}
   .trans{
     width:458px; background:#fff; height:270px; margin-top:10px;
     li{
       height:40px; line-height:40px;
       input { float:left; margin-top:15px; margin-left:10px;}
       span{
         img{width:30px; height:30px; margin-top:5px; float:left; margin-left:10px; margin-right:10px;}
       }
     }
     .li-title{
      color:#c9c9c9; font-size:14px;
       span{font-size:16px; color:#333; font-weight: bold;margin-left:10px;}
     }
     .list1{
       width:228px; float:left; height:100%; overflow-y:auto;
     }
     .list2{
       width:224px; border: 2px solid #4fdcca; float:left; height:100%; overflow-y:auto;
     .li-title{cursor: default;}
       li {cursor: pointer;}
     }
   }
   .addTeam{width:400px; height:150px; background:#f6f7f8;box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
     position:absolute; left:180px; top:100px; z-index:120; padding-left:10px; padding-right:10px;
     .addTeam_title{font-size:16px; color:#4fdcca; font-weight:bold; height:40px; line-height:40px;}
     .search{
       width:380px;  height:45px;
       input{width:100%;
         border: 2px #4fdcca solid;
         padding-left: 35px;
         height: 40px;
         border-radius: 4px;

       }
     }
     .btn{float:right; margin-top:10px;}
   }
   .addBox{
     width:508px; height:400px; background:#f6f7f8;box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
     position:absolute; left:150px; top:100px; z-index:120; padding-left:25px; padding-right:25px;
     .search{
       width:458px;  height:45px;
       input{width:100%;
         border: 2px #4fdcca solid;
         padding-left: 35px;
         height: 40px;
         border-radius: 4px;

       }
     }
   .btn{float:right; margin-top:20px;}

   }
   .team-box{
     width: 800px;
     box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
     border-radius: 4px;
     margin: 20px auto;
   }
   .team-title{
     height:50px; text-align: center; line-height: 50px;
     background:#ddd;
     width:100%;
     span{
       float: right; margin-right:20px;
     }
   }

   .team-contant{
     width:100%;
   }
   .team-item{
     width:50px; height:80px; box-sizing: content-box;  display:block; padding-bottom:10px;
     position:relative; margin-left:5px; margin-right:5px; float:left; text-align:center;
     font-size:14px; color:#333; text-overflow: ellipsis; overflow:hidden; padding-left:10px; padding-right:10px;
     padding-top:10px;
     img {
       display: block; border-radius: 50%; width:40px; height:40px; margin:0 auto;
     }

   }
   .team-last{height:80px;width:50px; float: left; padding:0 10px; box-sizing: content-box; padding-top:10px;
     margin-left:5px; margin-right:5px;}
   .team-item:hover i.i-close{color:#333;}
   .team-main{
     padding:20px;
   }
   .team-group{
     width:100%; background:#f6f7f8; border:1px solid #ddd; margin-bottom:20px; clear: both; overflow: hidden;
   }
   .team-group-title{
      height:50px; background:#fff; border-bottom:1px solid #ddd; line-height:50px; padding-left:20px;
       .wrapper{
         float:right; margin-right:20px;
       }
       .delGroupO{
         float:right; margin-top:5px; margin-right:10px;
       }
    }
   .addLi{
     text-align: center; cursor: pointer;
     border: 1px solid #00c0ab;
     border-radius: 50%;
     width:50px; height:50px; display:inline-block; line-height:50px;
     margin-top:10px;
   }
   i.i-add{
     color: #00c0ab;
   }
   i.i-close{
     cursor: pointer;
     position: absolute;
     top: 1px;
     right: 5px;
     width:4px;
     height:4px;
     transform: rotate(45deg);
     color:#999;
   }


</style>
