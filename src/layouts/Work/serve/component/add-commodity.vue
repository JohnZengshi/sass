<template>
   <!-- 备注弹窗 -->
    <el-dialog :visible.sync="dialog" top="10%" customClass="serveAddCommodityDig">
        <div class="remark-body">
          <!-- 添加售后首页 -->
          <add-home ref="addHomeWrap" v-show="currentLocation.value == 1" @close="close" @seekVisitor="seekVisitor" :userData="userData"></add-home>
          <!-- 访客列表 -->
          <visitor-list v-show="currentLocation.value == 2" @affirmMemberCreate="affirmMemberCreate" @goBack="closeVisitor"></visitor-list>
        </div>
    </el-dialog>
</template>
<script>
import { operateUpdateSell } from 'Api/commonality/operate'
import addHome from './add-home.vue'
import visitorList from './visitor-list.vue'
export default {
    components: {
      addHome,
      visitorList
    },
    props: ['receiptData', 'productData'],
    data () {
      return {
        currentLocation: {
          value: '1', // 当前位置
          type: '' // 是否需要直接关闭
        },
        userData: {
          memberId: '',
          memberName:  '',
          phone:  '',
          type: '',
          totalNum:  '',
          totalWeight:  '',
          totalPrice:  '',
          avatarUrl: '',
          sex: '',
          orderList: [
            // {
            //   orderNo: 100,
            //   orderType: '1', // 1系统添加 2.手工添加
            //   isSeek: 'Y', // 是二次查询出来的，手动插入
            //   productList: [
            //     {
            //       productId: 200,
            //       productName: 100,
            //       barcode: 100,
            //       weight: 100,
            //       goldWeight: 100,
            //       price: 100,
            //       productType: 100,
            //       serviceTypeId: '',
            //       serviceTypeName: ''
            //     },
            //     {
            //       productId: 100,
            //       productName: 100,
            //       barcode: 100,
            //       weight: 100,
            //       goldWeight: 100,
            //       price: 100,
            //       productType: 100,
            //       serviceTypeId: '',
            //       serviceTypeName: ''
            //     }
            //   ]
            // },
            // {
            //   orderNo: 100,
            //   orderType: '2', // 1系统添加 2.手工添加
            //   productList: [
            //     {
            //       productId: 200,
            //       productName: 100,
            //       barcode: 100,
            //       weight: 100,
            //       goldWeight: 100,
            //       price: 100,
            //       productType: 100,
            //       serviceTypeId: '',
            //       serviceTypeName: ''
            //     },
            //     {
            //       productId: 100,
            //       productName: 100,
            //       barcode: 100,
            //       weight: 100,
            //       goldWeight: 100,
            //       price: 100,
            //       productType: 100,
            //       serviceTypeId: '',
            //       serviceTypeName: ''
            //     }
            //   ]
            // }
          ]
        },
        dialog: false
      }
    },
    watch: {
      dialog () {
        if (!this.dialog) {
          setTimeout(() => {
            this.currentLocation = {
              value: '1', // 当前位置
              type: '' // 是否需要直接关闭
            }
          }, 300)
        }
      }
    },
    methods: {
        // 访问列表创建会员成功
        affirmMemberCreate (parm) {
         this.currentLocation = {
            value: '1', // 当前位置
            type: '' // 是否需要直接关闭
          }
          this.$refs.addHomeWrap.affirmCreateMember(parm)
        },
        // 每次打开时，都初始化一下数据
        initData () {
          this.userData.memberId = this.receiptData.vipId
          this.userData.memberName = this.receiptData.vipName
          this.userData.phone = this.receiptData.vipPhone
          this.userData.type = this.receiptData.vipGroup
          this.userData.totalNum = this.receiptData.totalNum
          this.userData.totalWeight = this.receiptData.totalWeight
          this.userData.totalPrice = this.receiptData.totalPrice
          this.userData.avatarUrl = this.receiptData.vipLogo
          this.userData.sex = this.receiptData.vipSex
          let productDatas = []
          for (let i of JSON.parse(JSON.stringify(this.productData))) {
            let objData = {
              orderNo: '',
              orderType: i.type,
              productList: [i]
            }
            for (let i of objData.productList) {
              i.serviceId = i.serviceTypeId
              i.orderType = i.type
            }
            productDatas.push(objData)
          }
          this.userData.orderList = productDatas
          setTimeout(() => {
            this.$refs.addHomeWrap.initCheck(productDatas)
            if (this.$refs.addHomeWrap) {
              this.$refs.addHomeWrap.initKey()
            }
          }, 100)
        },
        seekVisitor (parm) {
          this.currentLocation = parm
        },
        open (parm) {
          console.log('打开弹窗的时候传值', parm)
          this.initData()
          this.dialog = true
          this.currentLocation = parm
        },
        close (parm) {
          console.log('AAAAAAAAAA')
          this.dialog = false
          this.$emit('updataApi')
        },
        closeVisitor () {
          if (this.currentLocation.type != 'Y') {
            this.currentLocation = {
              value: '1', // 当前位置
              type: '' // 是否需要直接关闭
            }
          } else {
            this.$emit('updataApi')
            this.dialog = false
          }
        },
        tabClick (parm) {
          this.listType = parm
        },
        seekSearch () {

        },
        // 会员级别
        filterVipGroup (parm) {
          switch (parm) {
            case '1':
              return '初级'
            case '2':
              return '中级'
            case '3':
              return '高级'
          }
        }
    }
}
</script>
<style lang="scss">
.serveAddCommodityDig {
    width: 700px;
    height: 800px;
    border-radius: 10px;
    .el-dialog__header {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 2;
    }
    .remark-body {
        position: absolute;
        padding: 0 30px;
        left: 0;
        top: 24px;
        width: 100%;
    }
}
</style>