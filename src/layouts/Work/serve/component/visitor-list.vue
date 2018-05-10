<template>
  <div class="verse-visitor-list-main">
    <div class="serve-add-c-batch-header">

      <div class="add-c-title">来访用户列表</div>

      <div class="operate-bar-top">
        <div class="date-w81-14">
          <el-date-picker
            format
            v-model="beginTime"
            type="date"
            placeholder="选择日期"
            @change="dateChange"
          >
          </el-date-picker>
        </div>
      </div>

    </div>
    <div class="visit-table-wrap">
      <div>
        <ul>
          <li v-for="(item, index) in visitData" @click="checkData(item)">
            <div class="img-wrap">
              <img :src="item.imageUri" alt="">
              <p class="time-tit">{{_GetSF(item.imageTime)}}</p>
            </div>
            <i v-show="item.count == 1" class="sign-tit">NEW</i>
            <img v-if="item.sex == '男'" class="xj-sex-icon" src="~assets/img/man-icon.png" alt="">
            <img v-if="item.sex == '女'" class="xj-sex-icon woman-icon" src="~assets/img/woman-icon.png" alt="">
            <img v-if="item.vipFlag == 1" class="vip-icon" src="~assets/img/vip.png" alt="">
            <p class="bottom-tit">
              <span>本次接待人：</span>
              <span>{{item.receiver ? item.receiver : '无'}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <div class="btn" @click="_goBack">返回</div>
    </div>
    <!-- 添加会员 -->
    <member-create ref="memberCreateWrap" @affirm="affirmMemberCreate" :currentData="currentData"></member-create>
  </div>
</template>
<script>
import {GetSF} from 'assets/js/getTime'
import {seekListVisitor} from 'Api/commonality/seek'
import memberCreate from '../base/member-create'

var moment = require('moment');
export default{
  components: {
    memberCreate
  },
  data () {
    return {
      page: 1,
      currentData: {},
      visitData: [],
      beginTime: new Date()
    }
  },
  mounted () {
    this.dateChange()
    let _self = this
    $(".visit-table-wrap").mCustomScrollbar({
      theme: "minimal-dark",
      axis: 'y',
      mouseWheel: {
        scrollAmount: 200,
        preventDefault: false,
        normalizeDelta: false,
        scrollInertia : 0
      },
      callbacks: {
        onTotalScroll: function () {
          _self.$emit('_seekList')
        }
      }
    })
  },
  methods: {
    affirmMemberCreate (parm) {
      this.$emit('affirmMemberCreate', parm)
      // this._goBack()
    },
    _GetSF (parm) {
      return GetSF(parm)
    },
    dateChange (val) {
      this.page = 1
      this._seekList()
    },
    timeFormat (parm, timeType = '000000') {
        let year = parm.substring(0, 4)
        let month = parm.substring(5, 7)
        let data = parm.substring(8, 10)
        return year + month + data + timeType
    },
    checkData (parm) {
      this.currentData = parm
      if (parm.memberId) {

      } else {
        this.$refs.memberCreateWrap.open()
      }
    },

    _seekList () {
      if (this.visitData.length == this.totalNum && this.visitData.length > 0) {
        return
      }
      let options = {
        beginTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD')),
        endTime: this.timeFormat(moment(this.beginTime).format('YYYY-MM-DD'), '235959'),
        shopId: this.$route.query.shopId,
        page: this.page,
        pageSize: 60
      }
      this.page += 1
      seekListVisitor(options)
        .then(res => {
          if (res.data.state == 200) {
              this.totalNum = res.data.data.totalNum
              this.visitData.push(...res.data.data.dataList)
          } else {
              this.$message({
                  message: res.data.msg,
                  type: 'warning'
              });
          }
        })
    },
    _goBack () {
      this.$emit('goBack')
    }
  }
}
</script>
<style lang="scss" scoped>
.verse-visitor-list-main{
  .serve-add-c-batch-header {
    overflow: hidden;
    .add-c-title {
        color:#333;
        font-size: 16px;
        font-weight: bold;
    }
    .operate-bar-top {
        float: left;
        height: 28px;
        margin-bottom: 16px;
        margin-top: 25px;

        background-color: #fff;
        border: 1px solid #d6d6d6;
        border-radius: 4px;
        margin-right: 16px;
        // margin-left: 16px;
        font-size: 14px;
    }
  }
  .visit-table-wrap{
    height: 620px;
    >div{
      ul{
        font-size: 0;
        li{
          position: relative;
          display: inline-block;
          vertical-align: top;
          width: 170px;
          height: 260px;
          background-color: #f5f8f7;
          margin: 20px;
          border-radius: 5px;
          cursor: pointer;
          &:hover{
            transition: all .3s;
            box-shadow: 0 0 15px #dedede;
          }
          .img-wrap{
            position: relative;
            width: 146px;
            height: 180px;
            border-radius: 6px;
            overflow: hidden;
            margin: 12px 12px 0 12px;
            background-color: #2993f8;
            &.check-actions{
              border: 4px solid #2993f8;
              .xj-check-icon{
                background-color: #2993f8;
                i{
                  color: #fff;
                }
              }
            }
            // border: 4px solid #2993f8;
            img{
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
            }
            >.time-tit{
              position: absolute;
              bottom: 4px;
              right: 4px;
              font-size: 14px;
              color: #fff;
              text-shadow: 1px 1px 3px #000;
            }
            .xj-check-icon{
              position: absolute;
              top: 0;
              left: 0;
              width: 25px;
              height: 25px;
              line-height: 23px;
              background-color: #fff;
              border-radius: 0 0 22px 0;
              z-index: 10;
              text-align: center;
              >i{
                font-size: 14px;
                color: #2993f8;
              }
            }
          }

          >.sign-tit{
            position: absolute;
            top: 5px;
            left: 10px;
            display: block;
            width: 38px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #fff;
            background-color: rgb(254, 85, 119);
            border-radius: 5px;
            // text-shadow: 1px 1px 3px #000;
          }

          .xj-sex-icon{
            position: absolute;
            top: 5px;
            right: 5px;
            width: 19px;
            // font-size: 14px;
            color: #ccc;
          }
          .woman-icon{
            transform: rotate(180deg);
            -ms-transform: rotate(180deg);   /* IE 9 */
            -moz-transform: rotate(180deg);  /* Firefox */
            -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
            -o-transform: rotate(180deg);  /* Opera */
          }
          .vip-icon{
            display: block;
            width: 30px;
            margin: 4px auto;
          }
          .bottom-tit{
            position: absolute;
            bottom: 10px;
            width: 100%;
            text-align: center;
            span{
              font-size: 14px;
              color: #999;
            }
            span:last-child{
              color: #333;
            }
          }
        }
      }
    }
  }
  .footer {
    margin-top: 20px;
    .btn {
      width: 100px;
      height: 28px;
      border-radius: 4px;
      color: #2993f8;
      cursor: pointer;
      // background:#2993f8;
      // color:#fff;
      border: 1px solid #d6d6d6;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      line-height: 28px;
      margin: 0 auto;
    }
  }
}
</style>