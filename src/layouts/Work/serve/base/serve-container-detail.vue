<template>
  <div class="serve-container-detail-wrap">

    <div v-if="isOperation" class="del-btn" @click="delGoods(item)"></div>

    <div ref="remarkWrap" v-if="item.remark ? true : isOperation" class="remark-tit" @click="openRemarkDialog(item)" @mouseenter="seekRemark(item)" @mouseleave="remarkOut">
      <i class="iconfont icon-bianjixiugai move-sign"></i>
    </div>

    <p class="server-type-name">{{item.serviceTypeName}}</p>

    <p class="jewelry-name">{{item.jewelryName}}</p>


    <!-- 系统 -->
    <template v-if="item.type == 1 || item.type == 2">
      
      <div class="item-inner">
        <p>条形码</p>
        <p>{{item.barcode}}</p>
      </div>

      <div class="item-inner">
        <p>{{item.classesType == 1 ? '金重' : '件重'}}</p>
        <p>{{item.goldWeight}}</p>
      </div>
  
      <div class="item-inner">
        <p>售价</p>
        <p>{{item.price}}元</p>
      </div>

    </template>


    <!-- 人工 -->
    <template v-if="item.type == 3">

      <div class="item-inner">
        <p>产品类型</p>
        <p>{{item.classesName}}</p>
      </div>

      <div class="item-inner">
        <p>成色名称</p>
        <p>{{item.colorName}}</p>
      </div>
  
      <div class="item-inner">
        <p>首饰名称</p>
        <p>{{item.gemName}}</p>
      </div>
    

      <div class="item-inner">
        <p>宝石名称</p>
        <p>{{item.jewelryName}}</p>
      </div>
    


      <div class="item-inner">
        <p>件重</p>
        <p>{{item.weight}}g</p>
      </div>

    </template>

  </div>
</template>
<script>
import {operateUpdateServiceByNum} from 'Api/commonality/operate'
export default{
  props: ['item', 'isOperation'],
  data () {
    return {
      status: 2,
    }
  },
  methods: {
    delGoods (parm) {
      let options = {
        dataList: [
          {
            operateType: '1',
            productId: parm.productId
          }
        ],
        orderNum: this.$route.query.orderNumber,
        shopId: this.$route.query.shopId
      }
      this._operateUpdateServiceByNum(options, '删除成功')
    },
    openRemarkDialog (item) {
      // if (this.status == 1) {
      //   return
      // }
      if (this.isOperation) {
        this.$emit('openRemarkDialog', item)
      }
    },
    // 鼠标移入
    seekRemark (item) {
      this.isMove = true
      let bounding = this.$refs.remarkWrap.getBoundingClientRect()
      let datas = {
        status: this.status,
        showData: item,
        boundingData: {
          top: bounding.top + bounding.height + 10 + 'px',
          left: bounding.left - 18 + 'px',
          display: 'block'
        }
      }
      this.$emit('setBounding', datas)
    },
    // 鼠标移开后
    remarkOut (e) {
      this.isMove = false
      this.$emit('remarkOut')
    },
    _operateUpdateServiceByNum (options, tit) {
      operateUpdateServiceByNum(options)
        .then(res => {
          if (res.data.state == 200) {
            this.$message({
              message: tit,
              type: 'success'
            })
            this.$emit('_seekProductListByService')
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
.serve-container-detail-wrap{
  margin: 10px 10px 0 20px;
  width: 250px;
  height: 346px;
  background: #fff;
  border-radius: 10px;
  display: inline-block;
  padding: 30px 18px;
  overflow: hidden;
  position: relative;
  background-color: rgb(246, 247, 248);
  .del-btn {
    width: 54px;
    height: 36px;
    position: absolute;
    right: 0px;
    top: 0px;
    opacity: 0;
    transition: all 1s;
    background: url('~static/img/delete_nor.png') no-repeat center center;
    cursor: pointer;
  }
  &:hover{
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
    >.del-btn{
      opacity: 1;
    }
  }
  .del-btn:hover {
    background: url('~static/img/delete_sel.png') no-repeat center center;
  }
  .remark-tit{
    width: 34px;
    height: 26px;
    line-height: 26px;
    position: absolute;
    right: 0px;
    top: 36px;
    border-radius: 20px 0 0 20px;
    background-color: #fff;
    cursor: pointer;
    text-align: center;
    transition: all .3s;
    >i{
      font-size: 16px;
      color: #999;
    }
    &:hover{
      width: 50px;
      i{
        color: #2993f8;
      }
    }
  }
  >.server-type-name{
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;
    background-color: rgb(255, 96, 126);
    border-radius: 5px;
    color: #fff;
    padding: 0 5px;
  }
  >.jewelry-name{
    line-height: 18px;
    font-weight: bold;
    font-size: 18px;
    margin-top: 15px;
    color: #2993f8;
    width: 180px;
    overflow-x:hidden;
    text-overflow: ellipsis;
  }
  >.item-inner{
    font-size: 0;
    margin-top: 30px;
    p{
      font-size: 14px;
      line-height: 14px;
      display: inline-block;
      // overflow:hidden;
      text-overflow: ellipsis;
    }
    >p:first-child{
      min-width: 56px;
      color: #999;
      margin-right: 20px;
      text-align: justify;
      text-align-last: justify;
    }
    >p:last-child{
      color: #333;
    }
  }
}
</style>