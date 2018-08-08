<template>
  <small-popup ref="smallPopupBox" :headTit="'选择产品类别'" :dialogClass="'new-small-popup-dialog'">
    <div class="big-small-class">

      <div class="list-wrap">

        <ul class="left-list">
          <li :class="{'line-actions': checkData.bigClass.id == item.id}" v-for="(item, index) in leftDatas" :key="index" @click="checkBig(item)">{{item.name}}</li>
        </ul>

        <ul class="right-list">
          <li :class="{active: checkData.smallClass.id == item.id}" v-for="(item, index) in rightDatas" :key="index " @click="checkSmall(item)">{{item.name}}</li>
        </ul>

      </div>

      <div class="footer">
        <div class="footer-right">
          <span v-if="checkData.smallClass.id" @click.stop="confirm">下一步</span>
        </div>
      </div>

    </div>  
  </small-popup>
</template>
<script>
import smallPopup from 'base/popup/small-popup'
export default {
  components: {
    smallPopup
  },
  data () {
    return {
      isShowDio: true,
      checkData: {
        bigClass: {
        },
        smallClass: {

        },
      },
      leftDatas: [
        {
          name: '即时跟进',
          id: '001'
        },
        {
          name: '触发跟进',
          id: '002'
        }
      ],
      rightDatas: [
        {
          name: '生日跟进',
          id: '221'
        },
        {
          name: '售后跟进',
          id: '222'
        }
      ]
    }
  },
  methods: {
    open () {
      this.$refs.smallPopupBox.open()
    },
    checkSmall(item) {
      this.checkData.smallClass = item
    },
    checkBig(item) {
      this.checkData.bigClass = item
      // this.productTypeList()
    },
    confirm () {
      this.$emit('confirm', this.checkData)
    }
  }
}
</script>
<style lang="scss">
.big-small-class {
  overflow: hidden;

  .list-wrap {
    width: 320px;
    height: 271px;
    ul{
      li{
        position: relative;
      }
    }
    .btn-wrap {
      width: 180px;
      height: 70px;
      margin: 0 auto;
      i {
        display: block;
        width: 80px;
        height: 30px;
        font-style: normal;
        text-align: center;
        background: #2993f8;
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        border-radius: 4px;
        float: left;
        cursor: pointer;
      }
      i:nth-child(1) {
        margin-right: 20px;
      }
    }
    .left-list {
      width: 108px;
      height: 100%;
      border-right: 1px solid #f1f2f3;
      float: left;
      overflow-x: hidden;
      overflow-y: auto;
      li {
        width: 108px;
        height: 41px;
        border-bottom: 1px solid #f1f2f3;
        line-height: 41px;
        font-size: 14px;
        color: #333;
        text-align: center;
        cursor: pointer;
        .active-block {
          display: none;
        }
      }
      li:hover {
        background: #f6f7f8;
        color: #2993f8;
      }
      li.active {
        .active-block {
          display: block;
          height: 100%;
          float: left;
          width: 3px;
          background: #2993f8;
        }
      }
    }
    .right-list {
      width: 211px;
      height: 100%;
      float: left;
      overflow-x: hidden;
      overflow-y: auto;
      li {
        width: 192px;
        height: 41px;
        line-height: 41px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        margin-left: 19px;
      }
      li:hover {
        background: #f6f7f8;
        color: #2993f8;
      }
      li.active {
        color: #2993f8;
      }
    }
  }

  .footer {
    height: 50px;
    width: 100%;
    float: left;
    border-top: 1px solid #f1f2f3;
    padding-left: 22px;
    padding-right: 22px;
    line-height: 50px;
    padding-top: 0;
    background: #fff;
    .footer-left {
      height: 100%;
      float: left;
      font-size: 14px;
      color: #999999;
      cursor: pointer;
    }
    .footer-right {
      height: 100%;
      float: right;
      span {
        float: left;
        font-size: 14px;
        cursor: pointer;
        color: #333;
      }
      span:nth-child(1) {
        margin-right: 15px;
        color: #999;
      }
    }
  }

  .line-actions{
    color: #2993f8;
    &:before{
      content: "";
      display: inline-block;
      width: 3px;
      height: 100%;
      background: #2993f8;
      position: absolute;
      border-radius: 3px;
      left: 0;
    }
  }
}
</style>