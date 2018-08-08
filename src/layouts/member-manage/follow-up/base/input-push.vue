<template>
  <el-dialog :visible.sync="isShowDio" :modal="false" :close-on-click-modal="false" class="xj-input-dialog-bg" element-loading-text="拼命加载中">
    <div class="n-p-scroll-box n-p-scroll-box">
      <div class="p-close-icon" @click="close">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </div>

      <div class="input-push-wrap">
        <h3>添加会员</h3>
        <div class="scroll-box">
          <div class="member-item">
            <span class="item-label">跟进名称</span>
            <input placeholder="请输入" maxlength="6" v-model="addData.name">
          </div>

          <div class="member-item">
            <span class="item-label">选择跟进人</span>
            <div class="right-wrap">
              <div class="select-left">
                <alone-drop-down-colums
                    class="select-box"
                    ref="stateWrap"
                    :propsList="stateList"
                    titleData="选择负者人"
                    @dataBack="dataBackProductTypeId"
                ></alone-drop-down-colums>
                <div class="right-tit">
                  公共
                </div>
              </div>

              <div class="select-right">
                  <alone-drop-down-colums
                      class="select-box"
                      ref="stateBox"
                      :propsList="stateList"
                      titleData="选择负者人"
                      @dataBack="dataBackProductTypeId"
                  ></alone-drop-down-colums>
                  <div class="right-tit">
                    所有
                  </div>
              </div>
            </div>
          </div>

          <div class="member-item">
            <span class="item-label">计划完成时间</span>
            <el-date-picker v-model="addData.maleBirthday" type="date" placeholder="选择日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" @change="setMaleBirthday">
            </el-date-picker>
          </div>

          <div class="member-item">
            <span class="item-label">选择会员</span>
            <div class="right-wrap select-user-box" @click="selectUser">
              <p>100000000000000000000</p>
              <div class="right-tit">
                <i class="iconfont icon-lianxiren"></i>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="xj-btn-list">
        <div class="btn cnacel-btn" @click="close">返回上一级</div>
        <div class="btn" @click="confirm">确定</div>
      </div>
    </div>

  </el-dialog>
</template>
<script>
import aloneDropDownColums from 'base/menu/alone-drop-down-colums'
export default {
  props: ['shopId'],
  components: {
    aloneDropDownColums
  },
  data () {
    return {
      isShopMan: false,
      isShowDio: false,
      addData: {
        name: '',
        maleBirthday: ''
      },
      stateList: [
        {
            id: "10",
            name: "已入库"
        },
        {
            id: "11",
            name: "入库中"
        },
        {
            id: "20",
            name: "已退库"
        },
        {
            id: "21",
            name: "退库中"
        },
        {
            id: "30",
            name: "已修改"
        },
        {
            id: "31",
            name: "修改中"
        },
        {
            id: "40",
            name: "已调库"
        },
        {
            id: "41",
            name: "调库中"
        },
        {
            id: "50",
            name: "已发货"
        },
        {
            id: "51",
            name: "发货中"
        },
        {
            id: "60",
            name: "已退货"
        },
        {
            id: "61",
            name: "退货中"
        },
        {
            id: "70",
            name: "已调柜"
        },
        {
            id: "80",
            name: "已销售"
        },
        {
            id: "81",
            name: "销售中"
        },
        {
            id: "90",
            name: "已销退"
        },
        {
            id: "91",
            name: "销退中"
        },
        {
            id: "92",
            name: "已换货"
        },
        {
            id: "93",
            name: "换货中"
        },
        {
            id: "94",
            name: "已回收"
        },
        {
            id: "95",
            name: "回收中"
        },
      ]
    }
  },
  methods: {
    open () {
      this.isShowDio = true
    },
    close () {
      this.isShowDio = false
      this.$emit('close')
    },
    selectUser () {
      this.$emit('selectUser')
    },
    confirm () {
      this.$router.push({
        path: '/membermanage/followUpList',
        query: {
          shopId: this.shopId
        }  
      })
    },
    setMaleBirthday () {

    },
    dataBackProductTypeId (parm) { // 产品类别过滤
      this.filterCondition.productStatus = parm.bigList
      this.$emit('filterData', this.filterCondition)
    },
  }
}
</script>
<style lang="scss">
// .input-push-wrap{
//   border: 1px solid red;
//   height: 100%;
// }
.input-push-wrap {
  height: 660px;
  >h3 {
    line-height: 1;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
  }
  .scroll-box {
    height: 610px;
    width: 100%;
    white-space: nowrap;
  }

  .member-item {
    margin-bottom: 34px;
    display: flex;
    .item-label {
      display: inline-block;
      vertical-align: top;
      width: 100px;
      height: 36px;
      line-height: 36px;
    }
    .right-wrap {
      flex: 1;
      position: relative;
      height: 36px;
      display: inline-block;
      .show-tit{
        line-height: 36px;
      }
      .new-down-menu-box {
        width: 182px;
      }
      .card-img {
        width: 80px;
        height: 60px;
        position: absolute;
        top: -56px;
        left: 0;
        display: none;
        background: #f6f6f6;
      }
      .uploading-img-box {
        display: inline-block;
        color: #2993f8;
        width: 50px;
        cursor: pointer;
        span {
          text-decoration: underline;
          line-height: 34px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .card:hover+.card-img {
        display: block;
      }
      .click-select-wrap {
        position: absolute;
        opacity: 0;
        top: 50px;
        left: 0px;
        z-index: -1;
        width: 160px;
        height: 200px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all .3s;
        overflow-y: auto;
        &.active {
          z-index: 10;
          top: 30px;
          opacity: 1;
        }
        li {
          line-height: 40px;
          height: 40px;
          margin: 0;
          padding-left: 20px;
          cursor: pointer;
        }
        li:hover {
          background: #f1f2f3;
        }
        li.active {
          color: #2993f8;
        }
      }
      .chose-user-box {
        border-radius: 3px;
        width: 120px;
        padding-left: 10px;
        border: 1px solid #dedede;
        margin: 0;
        .tltle {
          color: #757575!important;
          font-weight: normal;
          font-size: 14px;
        }
        .list-box {
          left: 0;
        }
      }
  
      .select-left, .select-right{
        width: 260px;
        height: 36px;
        border-radius: 3px;
        display: flex;
        .select-box{
          flex: 1;
          .tltle{
            line-height: 36px;
            >i{
              line-height: 36px;
            }
          }
          .list-box{
            left: 0;
          }
        }
        .right-tit{
          width: 40px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          fotn-size: 14px;
          background-color: #f4f5f4;
        }
      }

      .select-left{
        float: left;
        border: 1px solid #d6d6d6;
      }
      .select-right{
        float: right;
        border: 1px solid #d6d6d6;
      }
    }
    .select-user-box{
      border-radius: 3px;
      border: 1px solid #d6d6d6;
      cursor: pointer;
      >p{
       flex: 1;
       width: 458px;
       overflow: hidden;
       float: left;
       height: 36px;
       padding-left: 10px;
       line-height: 36px;
      }
      >.right-tit{
        float: right;
        height: 36px;
        line-height: 36px;
        text-align: center;
        width: 80px;
        >i{
          float: right;
          color: #2993f8;
          margin-right: 5px;
        }
      }
    }
    >input{
      flex: 1;
    }
    input {
      height: 36px;
      background-color: transparent;
      font-size: 14px;
      padding-left: 10px;
      border-radius: 3px;
      border: 1px solid #dedede;
      &:active,
      &:hover,
      &:focus {
        border: 1px solid #2993f8;
        background-color: #f4f9ff;
      }
    }
    .el-date-editor.el-input {
      width: 182px;
      border-radius: 3px; // border: 1px solid #dedede;
      .el-input__icon {
        display: none;
      }
    }
  }
}
</style>