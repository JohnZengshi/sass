<template>
<!--表头-->
<div>
<div class="dg_bd-fixed" :style="'width:'+ fixedFullSize +'px'">
  <div 
      class="template" 
      v-for="item,k in dgDataList" 
      :index="resetIndex(k)" 
      :class="{move: activeClassIndex == k , add: item.now.productId == '', selectOn : activeSelectOn == k }"
      @click="datagridClick(item.now, k)"
      @mousemove="datagridHover(k, $event)" 
      @mouseleave="datagridHover(k,$event)"
      :data-index="addIndex()">
      
      <!--修改前-->
      <div class="dg_tr now">
        <template v-for="f,i in fixedData">
          <!--新增商品-->
          <div 
              class="dg_td" 
              v-if="item.now.productId == ''"
              :class="f.type == 'barcode' ? 'l-td' :''"
              :style="'width:'+ f.width +'px'"
              >
            <input 
              type="text" 
              class="dg-select-edit-ipt" 
              title="输入条码号后按回车" 
              placeholder="请输入条码号" 
              @keyup="addGoods($event,item, k)"
              v-if="f.type == 'barcode'"/>
            <template v-else>{{getTxt(item.now, f, true)}}</template>
          </div>
          
          <!--商品-->
          <div 
              class="dg_td" 
              v-else
              :class="f.type == 'barcode' ? 'l-td' :''"
              :style="'width:'+ f.width +'px'"
              v-html="getTxt(item.now, f, true)"></div>
        </template>
      </div>
      
      <!--修改后-->
      <div class="dg_tr old">
        <div 
            class="dg_td" 
            :style="'width:'+ f.width +'px'"
            v-for="f,i in fixedData">
            <!--下拉框编辑-->
            <template v-if="synopsiData.checkType == '1'">
              <div 
                :title="item.old[f.type]"
                v-if="hasfetchData(f.type)"
                @mouseleave="_mouseEvent($event, k, i)"
                @mousemove="_mouseEvent($event, k, i)"
                :class="{active:selectContainer.fixedfIndex == k && selectContainer.fixedcIndex == i, isicon:isShowIcon(item.old[f.type]), classType: f.text = '产品类别'}"
                @click="selecChange({tr: item.old ,fIndex: k,td: f, cIndex: i, event: $event, indexType : 'fixed'})"
                class="dg-select-container">
                {{item.old[f.type]}}
                <i 
                      v-if="isShowIcon(item.old[f.type])" 
                      @click="griditemClear($event, item.old, f, k)"
                      class="el-icon-circle-close" title="清除"></i>
              </div>
              <template v-else>
                <!-- <div class="txt" v-if="f.type == 'barcode'">修改后</div> -->
                <template>{{getTxt(item.old, f, false)}}</template>
              </template>
            </template>
            
            <template v-else>
              <!-- <div  class="txt" v-if="f.type == 'barcode'">修改后</div> -->
              <template>{{getTxt(item.old, f, false)}}</template>
            </template>
        </div>
      </div>
  </div>
</div>

<!--右边动态表格区-->
<div class="dg_bd-container">
    <div 
      class="template" 
      :class="{move: activeClassIndex == k , add: item.now.productId == '', selectOn : activeSelectOn == k }"
      @mousemove="datagridHover(k, $event)" 
      @mouseleave="datagridHover(k,$event)"
      @click="datagridClick(item.now, k)"
      v-for="item,k in dgDataList" >
      <!--修改前-->
      <div class="dg_tr now">
        <div 
            class="dg_td" 
            :style="'width:'+ f.width +'px'"
            v-for="f,i in smallDataList">{{item.now[f.type]}}</div>
      </div>
      <!--修改后-->
      <div class="dg_tr old">
          <div 
              class="dg_td"
              :style="'width:'+ f.width +'px'"
              v-for="f,i in smallDataList">
              <!--下拉框编辑-->
              <template v-if="synopsiData.checkType == '1'">
                <div 
                  :title="item.old[f.type]"
                  v-if="hasfetchData(f.type)"
                  :class="{active:selectContainer.selectfIndex == k && selectContainer.selectcIndex == i, isicon:isShowIcon(item.old[f.type])}"
                  @mouseleave="_mouseEvent($event, k, i)"
                  @mousemove="_mouseEvent($event, k, i)"
                  @click="selecChange({tr: item.old ,fIndex: k,td: f, cIndex: i, event: $event, indexType : 'select'})"
                  class="dg-select-container">
                  <!-- && f.type != 'jewelryName' -->
                    <i 
                      v-if="isShowIcon(item.old[f.type]) "
                      @click="griditemClear($event, item.old, f, k)"
                      class="el-icon-circle-close" title="清除"></i>
                    {{item.old[f.type]}}
                </div>
                <input 
                  type="text" 
                  @mousemove="inputMousemove($event,item.old, f)"
                  @focusin="dataGridInputEdit($event, item.old[f.type])"
                  @keypress="dataGridkeyInput($event, item.old, f)"
                  @input="inputChange(item.old, f)"
                  @focusout="inputFocusout($event,item, f, k)"
                  class="dg-select-edit-ipt" 
                  :title="item.old[f.type]"
                  v-model="item.old[f.type]" v-else />
            </template>
            <template v-else>{{item.old[f.type]}}</template>
          </div>
         
      </div>
      
      <div class="dg_td operate">
       <i class="detail iconfont icon-xiangqing2"  title="查看详情" @click="gotoDetails(item)"></i>
       <i class="del iconfont icon-lajitong" v-if="synopsiData.checkType == '1' && isUser==synopsiData.makeOrderManId"  title="删除" @click="deletegoods(item)"></i>
      </div>
    </div>
    <div class="no-data" v-if="dgDataList.length == 0 "></div>
</div> 
</div>     
</template>

<script>
// 序号 index
let applyIndex = 0
import * as configData from './config'
import * as fetch from './fetchData'
import {fixedData} from './config'
import {seekProductClassList} from 'Api/commonality/seek'
export default{
  data(){
    return{
    	isUser:sessionStorage.id,
      fixedData: fixedData,
      // 表格下拉数据集
      datagridSelectData : {},
      selectConfig : {},
      activeSelectOn : -1,
      
      // 时间计时器
      mouseEvent : {
        x : -1,
        y : -1
      }
    }
  },
  props:['fixedFullSize','dgDataList','activeClassIndex','synopsiData','selectContainer','smallDataList','orderNum','seekFlag', 'seekBarcode'],
  created(){
    this.selectConfig = fetch.Select
    let options = {
          type: 4
      }
      //获取主石/副石规格
      seekProductClassList(options).then((response) => {
            let stand = response.data.data.list[0].childrenList
            this.datagridSelectData.stand = stand
            this.datagridSelectData.deputyStand = stand
      }, (response) => {
          console.log(response)
      })
  },
  watch: {
    seekFlag (val) {
      if (val) {
        this.addGoods(this.seekBarcode)
      }
    }
  },
  methods: {
    //重置index
    resetIndex( index ){
     if( index == 0 ) applyIndex = 0
    },
    //
    addIndex(){
     applyIndex++
    },
    getIndex(){
      // this.$emit('getIndex',applyIndex)
      return applyIndex
    },
    updataSelectContainer (data) {
      this.$emit('updataSelectContainer', {
        fixedfIndex : data.selectCur_tr_index,
        fixedcIndex : data.selectCur_td_index
      })
    },
    
    // 单元格鼠标滑过index值更新
    datagridHover(index, evt){
      if (evt.type == 'mouseleave') {
        this.$emit('updateActiveIndex',-1)
      } else {
        this.$emit('updateActiveIndex',index)
      }
    },
    // 监听表格被选中 用于复制操作
    datagridClick (item, index){
      // 过滤空数据
      if(item.barcode == '') return
      if(this.activeSelectOn == index) {
        this.$emit('updateActiveSelectOn',{
          item : {},
          index: -1
        })
        this.activeSelectOn = -1
      } else {
        this.$emit('updateActiveSelectOn',{
          item : item,
          index: index
        })
        this.activeSelectOn = index
      }
    },
    
    getTxt (item, tab, type) {
      if (tab.id == '01'){
        return type ? this.getIndex() : ''
      }else if (item[tab.type] == null || item[tab.type] == '') {
        return '-'
      }else {
        return item[tab.type]
      }
    },
    // 新增商品
    addGoods (value) {
      console.log(111)
      let val = value
        if (val.length > 7) {
          fetch.deleteGoods({
            operate : 1,
            orderNum : this.orderNum,
            productList: [
              {barcode: value}
            ]
          }, (res) => {
            if (res.data.state == 200) {             
              // 更新商品列表
              this.$emit('updataApi')
              //this.$emit('updataAdd', false)
              this.$message({
                  message: '商品添加成功',
                  type: 'success'
              });
            }else {
              this.$message({
                type : 'error',
                message :res.data.msg
              })
              // evt.target.select()
            }
          })
        }
        //console.log(evt.target.value, fetch.deleteGoods)
    },
    // 新增商品
    // addGoods (evt, item, index) {
    //   let val = evt.target.value
    //   if (evt.key == 'Enter' && evt.keyCode == 13) {
    //     if (val.length > 7) {
    //       fetch.deleteGoods({
    //         operate : 1,
    //         orderNum : this.orderNum,
    //         productList: [
    //           {barcode: evt.target.value}
    //         ]
    //       }, (res) => {
    //         if (res.data.state == 200) {             
    //           // 更新商品列表
    //           this.$emit('updataApi')
    //           //this.$emit('updataAdd', false)
    //         }else {
    //           this.$message({
    //             type : 'error',
    //             message :res.data.msg
    //           })
    //           evt.target.select()
    //         }
    //       })
    //     }
    //     //console.log(evt.target.value, fetch.deleteGoods)
    //   }
    // },
    
    isShowIcon (txt){
      return txt != '' && txt != null && txt != undefined
    },
    // 清除表格下拉的选择
    griditemClear(evt, item, tab, fIndex) {
      this.$set(item, tab.type, '')
      evt.stopPropagation()
      this.$emit('updataEditApi', {
        [tab.type] : '',
        productId: item.productId
      })
    },
    toNum (str) {
      return isNaN(parseFloat(str)) ? 0 : parseFloat(str)
    },
    // 鼠标经过状态
    inputMousemove(evt, item, tab){
      // 修改标价->售价时，如果成本为空值 则对售价input设置为只读
//    if(tab.type == 'soldPrice'){
//      if(isNaN(parseFloat(item['costPrice']))){
//        evt.target.setAttribute('readonly',true)
//        evt.target.setAttribute('title','请确保成本不能为0或者空')
//      }else {
//        evt.target.removeAttribute('readonly')
//        evt.target.removeAttribute('title','')
//      }
//    }
    },
    // 文本框点击
    dataGridInputEdit (evt, text) {
      // 记录当前的数据
      evt.target.setAttribute('temp-data', text == undefined ? '' : text)
      evt.stopPropagation()
    },
    
    // 文本框失去焦点
    inputFocusout (evt, item, tab, fIndex) {
    	console.log(this.dgDataList)
      let itemData = item.old[tab.type]
      let tempData = evt.target.getAttribute('temp-data')  //拿到原始的数据
      let productId = item.now.productId
      
      //console.log(item, tab.type, itemData, tempData)
      // 当input失去焦点时 需要检测下初始数据是否被修改过，如果没有修改 则不需要保存
      if ( tempData != itemData && (itemData != undefined || tempData.length != 0)) {
        let tempArray = [{
          [tab.type]: itemData,
          productId: productId
        }]
        
//      // 在修改成本跟倍率时 需要把售价传给后台
        if (tab.type == 'costPrice' || tab.type == 'ratio') {
          tempArray.push({
            soldPrice : item.old['soldPrice'],
            productId: productId
          })
        }
        
        // 修改售价 需要把倍率传给后台
        if (tab.type == 'soldPrice') {
          tempArray.push({
            ratio : item.old['ratio'],
            productId: productId
          })
        }
//      
				/*
				 * 下面只限制小数位数
				 */
        // 修改配件数、计价方式 、单价需要同步更新配件额字段
        if (tab.type == 'partCount' || tab.type === 'calcMethod' || tab.type === 'partPrice') {

        	this.dgDataList[fIndex].old[tab.type] = tab.type == 'partCount' ? this.toNum(this.dgDataList[fIndex].old[tab.type]) : this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
        	tempArray[0][tab.type] = tab.type == 'partCount' ? this.toNum(this.dgDataList[fIndex].old[tab.type]) : this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
          tempArray.push({
            price : item.old['price'],
            productId: productId
          })
        }
        
        // 修改配件额  同步更新单价字段
        if (tab.type == 'price') {
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
          tempArray.push({
            partPrice : item.old['partPrice'],
            productId: productId
          })
        }
        
        // 修改总件重 同步更新净金重
        if(tab.type === 'totalWeight'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
          tempArray.push({
            netWeight : item.old['netWeight'],
            productId: productId
          })
        }
        
        // 修改含配金重 同步更新净金重 
        if(tab.type === 'heavyCode'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
          tempArray.push({
            netWeight : item.old['netWeight'],
            productId: productId
          })
        }
        
        /*
        * 1、修改金耗同步更新金料额
        * 2、修改金价同步更新金料额
        * 3、修改净金重同步更新金料额
        */
        if(tab.type === 'goldCost' || tab.type === 'goldPrice'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
          tempArray.push({
            goldE : item.old['goldE'],
            productId: productId
          })
        }
        
        // 修改金料额同步更新金价
        if(tab.type === 'goldE'){ 
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
          tempArray.push({
            goldPrice : item.old['goldPrice'],
            productId: productId
          })
        }
        
        // 修改净金重 同步更新含配金重、总件重
        if(tab.type === 'netWeight'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
        	console.log(tempArray)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
        	
          tempArray.push({
            heavyCode : item.old['heavyCode'],
            productId: productId
          })
          tempArray.push({
            totalWeight : item['totalWeight'],
            productId: productId
          })
          tempArray.push({
            goldE : item.old['goldE'],
            productId: productId
          })
        }
        
        /*
        * 1、修改进货工费同步更新进货工费额
        * 2、修改进货工费方式同步更新进货工费额
        */
        if(tab.type === 'inFee' || tab.type === 'inMethod'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
          tempArray.push({
            inMoney : item.old['inMoney'],
            productId: productId
          })
        }
        
        // 修改进货工费额同步更新进货工费
        if(tab.type === 'inMoney'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
          tempArray.push({
            inFee : item.old['inFee'],
            productId: productId
          })
        }
        
        /*
        * 1、修改副石粒数同步更新副石额 
        * 2、修改副石重同步更新副石额
        * 3、修改副石单价同步更新副石额
        * 4、修改副石计价方式同步更新副石额 
        */
        if(tab.type === 'deputyCount' 
          || tab.type === 'deputyWeight'
          || tab.type === 'deputyUnitPrice'
          || tab.type === 'deputyCalcMethod'
        ){
        	this.dgDataList[fIndex].old[tab.type] = tab.type == 'deputyCount' ? this.toNum(this.dgDataList[fIndex].old[tab.type]) : this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
        	tempArray[0][tab.type] = tab.type == 'deputyCount' ? this.toNum(this.dgDataList[fIndex].old[tab.type]) : this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
          tempArray.push({
            deputyPrice : item.old['deputyPrice'],
            productId: productId
          })
        }
        
        // 修改副石重同步更新总件重
        if(tab.type === 'deputyWeight'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
          tempArray.push({
            totalWeight : item.old['totalWeight'],
            productId: productId
          })
        }
        
        // 修改副石重同步更新副石单价
        if(tab.type === 'deputyPrice'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
          tempArray.push({
            deputyUnitPrice : item.old['deputyUnitPrice'],
            productId: productId
          })
        }
        
        /*
        * 1、修改主石粒数同步更新主石额
        * 2、修改主石重同步更新主石额
        * 3、修改主石单价同步更新主石额
        * 4、修改计价方式同步更新主石额
        */
        if(tab.type === 'count'
          || tab.type === 'mainWeight'
          || tab.type === 'unitPrice'
          || tab.type === 'mainCalcMethod'
        ){
        	this.dgDataList[fIndex].old[tab.type] = tab.type == 'count' ? this.toNum(this.dgDataList[fIndex].old[tab.type]) : this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
        	tempArray[0][tab.type] = tab.type == 'count' ? this.toNum(this.dgDataList[fIndex].old[tab.type]) : this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(2)
          tempArray.push({
            mainPrice : item.old['mainPrice'],
            productId: productId
          })
        }
        
        //修改主石重同步更新总件重
        if(tab.type === 'mainWeight'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
          tempArray.push({
            totalWeight : item.old['totalWeight'],
            productId: productId
          })
        }
        
        //修改主石额同步更新主石单价
        if(tab.type === 'mainPrice'){
        	this.dgDataList[fIndex].old[tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
        	tempArray[0][tab.type] = this.toNum(this.dgDataList[fIndex].old[tab.type]).toFixed(3)
          tempArray.push({
            unitPrice : item.old['unitPrice'],
            productId: productId
          })
        }
				console.log(tempArray)
        this.$emit('updataEditApi', tempArray)
      }
    },
    
    // input方法
    inputChange(item, tab){
      return
      let price = isNaN(parseFloat(item[tab.type])) ? 0 : parseFloat(item[tab.type]).toFixed(2)
      // 修改成本， 同步计算售价
      if (tab.type === 'costPrice'){
        Object.assign(item, {
          soldPrice : (isNaN(parseFloat(item['ratio'])) ? 0 : parseFloat(item['ratio'])) * price
        })
      }
      // 修改倍率，同步计算售价
      if(tab.type === 'ratio'){
        Object.assign(item, {
          soldPrice : (isNaN(parseFloat(item['costPrice'])) ? 0 : parseFloat(item['costPrice'])) * price
        })
      }
      // 修改售价，同步计算倍率
      if(tab.type === 'soldPrice'){
        Object.assign(item, {
          ratio : price / (isNaN(parseFloat(item['costPrice'])) ? 0 : parseFloat(item['costPrice']))
        })
      }
      /*#配件： 需求说明
       * 1、修改配件数，影响配件额
       * 2、修改配件重，影响含配金重，影响重件重
       * 3、修改单价，影响配件额
       * 4、修改计价方式，影响配件额
       * 5、修改配件额，影响单价
       * 配件额的计算方法有2种：
       * 一、计价方式为计重：配件重*单价
       * 二、计价方式为计件：配件数*单价
       * 三、以上2种没有选择，默认为计重
       * */
      // 先拿到计价方式 
      let priceType = (item['calcMethod'] == null || item['calcMethod'] == '') ? '计重' : item['calcMethod']
      
  	  // 修改配件数
  	  if(tab.type === 'partCount'){
        if (priceType == '计件') {
          Object.assign(item, {
            price : (this.toNum(item['partPrice']) * price).toFixed(2)
          })
        }
  	    // Object.assign(item, {
        //   price : ((priceType == '计件' ? this.toNum(item['partPrice']) : this.toNum(item['partWeight'])) * price).toFixed(2)
        // })
  	  }
  	  
  	  // 计价方式 
  	  if(tab.type === 'calcMethod'){
        console.log(priceType)
        console.log(tab.type)
  	    Object.assign(item, {
          price : ((priceType == '计件' ? this.toNum(item['partCount']) : this.toNum(item['partWeight'])) * this.toNum(item['partPrice'])).toFixed(2)
        })
  	  }
  	  
  	  // 修改单价
  	  if(tab.type === 'partPrice'){
        Object.assign(item, {
          price : ((priceType == '计件' ? this.toNum(item['partCount']) : this.toNum(item['partWeight'])) * this.toNum(item['partPrice'])).toFixed(2)
        })
      }
  	  // 修改配件重
  	  if(tab.type === 'partWeight'){
  	    Object.assign(item, {
          totalWeight : ( this.toNum(item['netWeight']) + this.toNum(item['mainWeight']) + this.toNum(item['deputyWeight']) + this.toNum(item['partWeight'])).toFixed(3)
        })
        Object.assign(item, {
          heavyCode : (this.toNum(item['netWeight']) + this.toNum(item['partWeight'])).toFixed(3)
        })
        Object.assign(item, {
          price : ((priceType == '计件' ? this.toNum(item['partCount']) : this.toNum(item['partWeight'])) * this.toNum(item['partPrice'])).toFixed(2)
        })
  	  }
  	  // 修改配件额
  	  if(tab.type === 'price'){
        Object.assign(item, {
          partPrice : (price / (priceType == '计件' ? this.toNum(item['partCount']) : this.toNum(item['partWeight'])) ).toFixed(2)
        })
      }
      /*#工费 需求说明
       * 1、销售工费   计重、计件，为空时默认计重
       * 2、进货工费， 精确2位小数位，6位以内  修改进货工费，影响进货工费额
       * 3、进货工费方式， 计重、计件，为空时默认计重   修改进货工费方式，影响进货工费额
       * 4、进货工费额    计算方法有：
                        1、进货工费方式为计重：净金重*进货工费；
                        2、进货工费方式为计件：1*进货工费（直接不计算，读取进货工费）
                以用户输入为准，精确2位小数位，如无则按计算公式计算
                修改进货工费额，影响进货工费
       * */
      let soldMethodType = (item['soldMethod'] == null || item['soldMethod'] == '') ? '计重' : item['soldMethod']
      let inMethodType = (item['inMethod'] == null || item['inMethod'] == '') ? '计重' : item['inMethod']
      // 销售工费
      if(tab.type === 'soldFee'){
      }
      // 进货工费
      if(tab.type === 'inFee'){
        console.log(111)
        Object.assign(item, {
          inMoney : ( inMethodType == '计件' ? this.toNum(item['inFee']) : this.toNum(item['inFee']) * this.toNum(item['netWeight'])).toFixed(2)
        })
      }
      // 进货工费方式
      if(tab.type === 'inMethod'){
        Object.assign(item, {
          inMoney : (inMethodType == '计件' ? this.toNum(item['inFee']): this.toNum(item['inFee']) * this.toNum(item['netWeight'])).toFixed(2)
        })
      }
      // 进货工费额
      if(tab.type === 'inMoney'){
        Object.assign(item, {
          inFee : (inMethodType == '计件' ? this.toNum(item['inMoney']) : this.toNum(item['inMoney']) / this.toNum(item['netWeight'])).toFixed(2)
        })
      }
      /*#副石 需求说明
       * 1、副石粒数   整数，无小数，限12个字，  修改副石粒数，影响副石额
       * 2、副石重 ， 精确3位小数位，12位以内    修改副石重，影响副石额
       * 3、副石单价   精确2位小数位，12位以内   修改副石单价，影响副石额
       * 计价方式
       * 4、副石额  计算方法有：                 修改副石额，影响副石单价
            1、计价方式为计重：副石重*副石单价；
            2、计价方式为计件：副石粒数*副石单价
       * */
      // console.log(item['old']['deputyCalcMethod'])
      let deputyCalcMethodType = (item['deputyCalcMethod'] == null || item['deputyCalcMethod'] == '') ? '计重' : item['deputyCalcMethod']
      // 副石粒数
      if(tab.type === 'deputyCount'){
        if (deputyCalcMethodType == '计件') {
          Object.assign(item, {
            deputyPrice : (this.toNum(item['deputyCount']) * this.toNum(item['deputyUnitPrice'])).toFixed(2)
          })
        } 
      }
      // 副石重
      if(tab.type === 'deputyWeight'){
        if (deputyCalcMethodType == '计重') {
          Object.assign(item, {
            deputyPrice : (this.toNum(item['deputyWeight']) * this.toNum(item['deputyUnitPrice'])).toFixed(3)
          })
          Object.assign(item, {
            totalWeight : ( this.toNum(item['netWeight']) + this.toNum(item['mainWeight']) + this.toNum(item['deputyWeight']) + this.toNum(item['partWeight'])).toFixed(3)
          })
        } 
      }
      // 副石单价
      if(tab.type === 'deputyUnitPrice'){
        Object.assign(item, {
          deputyPrice : (deputyCalcMethodType == '计件' ? this.toNum(item['deputyCount']) * this.toNum(item['deputyUnitPrice']) : this.toNum(item['deputyWeight']) * this.toNum(item['deputyUnitPrice'])).toFixed(2)
        })
      }
      // 计价方式
      if(tab.type === 'deputyCalcMethod'){
        Object.assign(item, {
          deputyPrice : (deputyCalcMethodType == '计件' ? this.toNum(item['deputyCount']) * this.toNum(item['deputyUnitPrice']) : this.toNum(item['deputyWeight']) * this.toNum(item['deputyUnitPrice'])).toFixed(2)
        })
      }
      // 副石额 
      if(tab.type === 'deputyPrice'){
        Object.assign(item, {
          deputyUnitPrice : (deputyCalcMethodType == '计件' ? this.toNum(item['deputyPrice']) / this.toNum(item['deputyCount']) : this.toNum(item['deputyPrice']) / this.toNum(item['deputyWeight'])).toFixed(2)
        })
      }
      /*#主石 需求说明
       * 主石粒数   整数，无小数，限12个字，  修改主石粒数，影响主石额
       * 主石重 ， 精确3位小数位，12位以内    修改主石重，影响主石额
       * 主石单价   精确2位小数位，12位以内   修改主石单价，影响主石额
       * 计价方式
       * 4、主石额  计算方法有：                 修改主石额，影响主石单价
            1、计价方式为计重：主石重*主石单价；
            2、计价方式为计件：主石粒数*主石单价
       * */
      let mainCalcMethodType = (item['mainCalcMethod'] == null || item['mainCalcMethod'] == '') ? '计重' : item['mainCalcMethod']
      // 主石粒数
      if(tab.type === 'count'){
        if (mainCalcMethodType == '计件') {
          Object.assign(item, {
            mainPrice : (this.toNum(item['count']) * this.toNum(item['unitPrice'])).toFixed(2)
          })
        } 
      }
      // 主石重
      if(tab.type === 'mainWeight'){
        if (mainCalcMethodType == '计重') {
          Object.assign(item, {
            mainPrice : (this.toNum(item['mainWeight']) * this.toNum(item['unitPrice'])).toFixed(2)
          })
          Object.assign(item, {
            totalWeight : ( this.toNum(item['netWeight']) + this.toNum(item['mainWeight']) + this.toNum(item['deputyWeight']) + this.toNum(item['partWeight'])).toFixed(3)
          })
        } 
      }
      // 主石单价
      if(tab.type === 'unitPrice'){
        Object.assign(item, {
          mainPrice : (mainCalcMethodType == '计件' ? this.toNum(item['count']) * this.toNum(item['unitPrice']) : this.toNum(item['mainWeight']) * this.toNum(item['unitPrice'])).toFixed(2)
        })
      }
      // 计价方式
      if(tab.type === 'mainCalcMethod'){
        Object.assign(item, {
          mainPrice : (mainCalcMethodType == '计件' ? this.toNum(item['count']) * this.toNum(item['unitPrice']) : this.toNum(item['mainWeight']) * this.toNum(item['unitPrice'])).toFixed(2)
        })
      }
      // 4、主石额 
      if(tab.type === 'mainPrice'){
        Object.assign(item, {
          unitPrice : (mainCalcMethodType == '计件' ? this.toNum(item['mainPrice']) / this.toNum(item['count']) : this.toNum(item['mainPrice']) / this.toNum(item['mainWeight'])).toFixed(2)
        })
      }
      /*#重量 需求说明
       * 总件重   净金重+主石重+副石重+配件重，  修改总件重，影响净金重
       * 净金重 ， 精确3位小数位   修改净金重，影响总件重，影响含配金重
       * 含配金重    净金重g+配件重g   以用户输入为准，精确3位小数位，如无则按计算公式计算  修改含配金重，影响净金重
       * 金耗   精确1位小数位    修改金耗，影响金料额
       * 金价   精确2位小数位    修改金价，影响金料额
       * 金料额   净金重*（1+金耗%）*金价  修改金料额，影响金价
       * */
      // 总件重 
      if(tab.type === 'totalWeight'){
        Object.assign(item, {
          netWeight : ( this.toNum(item['totalWeight']) - (this.toNum(item['mainWeight']) + this.toNum(item['deputyWeight']) + this.toNum(item['partWeight']))).toFixed(3)
        })
        console.log(this.dgDataList)
      }
      // 净金重 
      if(tab.type === 'netWeight'){
        Object.assign(item, {
          heavyCode : (this.toNum(item['netWeight']) + this.toNum(item['partWeight'])).toFixed(3)
        })
        Object.assign(item, {
          totalWeight : ( this.toNum(item['netWeight']) + this.toNum(item['mainWeight']) + this.toNum(item['deputyWeight']) + this.toNum(item['partWeight'])).toFixed(3)
        })
        Object.assign(item, {
          goldE : (this.toNum(item['netWeight']) * (1 + (this.toNum(item['goldCost'])/ 100)) * this.toNum(item['goldPrice'])).toFixed(3)
        })
      }
      // 含配金重 
      if(tab.type === 'heavyCode'){
        Object.assign(item, {
          netWeight : (this.toNum(item['heavyCode']) - this.toNum(item['partWeight'])).toFixed(3)
        })
      }
      // 金耗 
      if(tab.type === 'goldCost'){
        Object.assign(item, {
          goldE : (this.toNum(item['netWeight']) * (1 + (this.toNum(item['goldCost'])/ 100)) * this.toNum(item['goldPrice'])).toFixed(3)
        })
      }
      // 金价 
      if(tab.type === 'goldPrice'){
        Object.assign(item, {
          goldE : (this.toNum(item['netWeight']) * (1 + (this.toNum(item['goldCost'])/ 100)) * this.toNum(item['goldPrice'])).toFixed(3)
        })
      }
      // 金料额
      if(tab.type === 'goldE'){
        Object.assign(item, {
          goldPrice : (this.toNum(item['goldE']) / (1 + (this.toNum(item['goldCost'])/ 100))).toFixed(2)
        })
      }
    },
    
    // keypress 监听回车
    dataGridkeyInput (evt, item, tab) {
      if (evt.key == 'Enter' && evt.keyCode == 13) {
        evt.target.blur()
      }
    },
    
    // 删除商品
    deletegoods (item) {
      this.$confirm('此操作将删除选中商品, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        if(item.now.barcode == ''){
          this.$emit('updataApi')
          return
        }
        fetch.deleteGoods({
          operate : '2',
          orderNum : this.orderNum,
          productList : [{barcode : item.now.barcode}]
        }, (res) => {
          if (res.data.state == 200 ){
            this.$message({
              type: 'success',
              message :'删除成功'
            })
            this.$emit('updataApi')
          }else{
            this.$message({
              message : res.data.msg
            })
          }
        })
      }).catch(() => {
                   
      })
    },
    
    // 通过配置信息检测是否需要加载下拉框数据
    hasfetchData(type){
      for (let action in this.selectConfig) {
        let config = this.selectConfig[action]
        if ( type == action && this.datagridSelectData[config.resData] == undefined) {
          if(config.datalist && config.datalist.length > 0){
            Object.assign(this.datagridSelectData, {
              [config.resData] : config.datalist
            })
            return
          }
          // 创建空数组 便于存放后面请求回来的数据
          Object.assign(this.datagridSelectData, {
            [config.resData] : []
          })
          // 对重定向的处理
          if (config.resDataRedirect == undefined) {
            // 拿到对应的请求接口
            if (fetch[config.fetchType]) {
              this.fetchData(fetch[config.fetchType], config)
            }
          } else {
            // 
            if (this.datagridSelectData[config.resDataRedirect]) { 
              this.$set(this.datagridSelectData, config.resData, this.datagridSelectData[config.resDataRedirect])
            } else {
              // 重定向失败 再次fetch数据
              if (fetch[config.fetchType]) {
                this.fetchData(fetch[config.fetchType], config)
              }
            }
          }
        }
      }
      return Object.keys(this.selectConfig).includes(type)
    },
    // 
    fetchData (fetch, config) {
      if (config.localStorage && localStorage[config.localStorage]) {
        let tempData = JSON.parse(decodeURIComponent(localStorage[config.localStorage])).filter(f => f.classesName == config.classesName )
        this.$set(this.datagridSelectData, config.resData, tempData[0].childrenList)
      } else if( typeof fetch === 'function') {
        fetch(config, (res) => {
          // 回调方法
          let resArray = res
          let rpData = []
          if (resArray.length > 0) {
            //拿到childrenList列表里面的数据
            if (config.isResolveChildren) {
              resArray.filter( f => f.childrenList ? rpData.push(...f.childrenList && f.childrenList.filter(j => j)) : '' )
            }
            // 根据对应的字段名进行存储
           if (rpData.length > 0) {
              this.$set(this.datagridSelectData, config.resData, rpData)
            } else {
              this.$set(this.datagridSelectData, config.resData, resArray)
            }
          }
          
        })
      }
    },
    
    //下拉选择 点击事件
    selecChange(fg) {     
    	console.log(fg)
      fg.event.stopPropagation()
      this.clearTime()
      let tpData = this.datagridSelectData[fg.td.type]
      let coord = fg.event.target.getBoundingClientRect()
      
      this.addSelect(tpData, {
        left : coord.left,
        top : coord.top + coord.height
      }, fg)
      
      this.$emit('updataSelectContainer', {
        [fg.indexType + 'fIndex'] : fg.fIndex,
        [fg.indexType + 'cIndex'] : fg.cIndex
      })
    },
    
    // 纯手工下拉条
    addSelect(item, coord, fg){
      let elem = document.getElementById('j_datagrid_select')
      let events = (item) => {
        let productId = this.dgDataList[fg.fIndex].now.productId
        // 更新view视图
        this.$set(this.dgDataList[fg.fIndex].old, fg.td.type, item.classesName)
        this.selectClassTdIndex = -1
        this.elemHide(elem)
        //productTypeId
        let tempJSON = {
          [fg.td.type]: item.classesName,
          productId: productId
        }
        if (fg.td.type == 'productClasses'){
          tempJSON = Object.assign({}, tempJSON, {
            productTypeId : item.classesId
          })
          this.$set(this.dgDataList[fg.fIndex].old, 'productTypeId' , item.classesId)
        }
        this.$emit('updataEditApi', tempJSON)
      }
      if (!elem) {
        // 下拉框生成
        elem = document.createElement('div')
        elem.id = 'j_datagrid_select'
        elem.addEventListener('mouseleave', this._mouseEvent ,false)
        elem.addEventListener('mousemove', this._mouseEvent ,false)
        elem.className = 'datagrid-select-container'
        document.body.appendChild(elem)
      } else {
        elem.innerHTML = ''
      }
      //item
      if (elem && item.length > 0) {
        // 下拉列表生成
        item.forEach((j) => {
          let el = document.createElement('div')
          el.innerHTML = j.classesName || ''
          // 二级菜单
          if (j.typeList && j.typeList.length > 0){
            el.className = 'item'
            elem.className = 'datagrid-select-container'
            let childItem = document.createElement('div')
            childItem.className = 'child-item'
            
            j.typeList.forEach(f =>{
              let child = document.createElement('div')
              child.className = 'item '+ (f.classesName == fg.tr[fg.td.type] ? 'active' : '')
              child.innerHTML = f.classesName || ''
              child.setAttribute('title', j.classesName)
              childItem.appendChild(child)
              child.addEventListener('click',() => {events(f)} , false)
            })
            el.appendChild(childItem)
          }else {
            el.className = 'item '+ (j.classesName == fg.tr[fg.td.type] ? 'active' : '')
            el.addEventListener('click',() => {events(j)} , false)
            el.setAttribute('title', j.classesName)
            elem.className = 'datagrid-select-container overflow'
          }
          elem.appendChild(el)
        })
        elem.style.cssText = 'left:'+ coord.left +'px;top:'+ coord.top +'px;'
      }else{
        this.elemHide(elem)
      }
    },
    // 隐藏下拉条
    elemHide (elem) {
      if (elem){
        elem.style.cssText = 'left:0px; top:0px; display: none;'
        this.$emit('updataSelectContainer', {
          selectCur_tr_index : -1,
          selectCur_td_index : -1,
          fixedfIndex : -1,
          fixedcIndex : -1
        })
      }
    },
    
    // 下拉条定时器
    clearTime(type) {
      if('boolean' === typeof type ){
        this.intervalGap = type
      }else{
        this.intervalGap = true
      }
      if (window.intervalGap) {
       clearTimeout(window.intervalGap)
       window.intervalGap = null
      }
    },
    
    // 下拉条事件监听
    _mouseEvent (evt, fIndex, cIndex) {
      let elem = document.getElementById('j_datagrid_select')
      switch (evt.type) {
        case 'mousemove':
         if(fIndex != undefined){
           if(this.mouseEvent.x != fIndex || this.mouseEvent.y != cIndex){
             this.elemHide(elem)
           }
         }
         this.clearTime()
        break;
        case 'mouseleave':
          this.clearTime(false)
          window.intervalGap = setTimeout( () => {
            if (elem && !this.intervalGap) {
             this.elemHide(elem)
             this.clearTime()
            }
          }, 300)
        break;
      }
      this.mouseEvent.x = fIndex
      this.mouseEvent.y = cIndex
    },
    
    // 查看详情
    gotoDetails (item) {
      this.$router.push({path: '/inventory', query: {text: '单据详情', barcode: item.now.barcode, productId: item.now.productId}})
    }
  
  }
}
</script>

<style lang="scss" scoped>
/* 左边固定表格区  */
.dg_bd-fixed{
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    
    .dg_tr{
      display: flex;
      transition: all .3s;
      height: 30px;
      >.dg_td{
        text-align: center;
        font-size: 13px;
        color: #333;
        line-height: 30px;
        word-wrap: break-word;
        word-break:break-all;
        &.l-td{
          text-align: center;
          >.dg-select-edit-ipt{
            background-color: #fff;
            border:1px solid #2993f8;
          }
        }
        >.txt{
          color: #999;
          text-align: left;
        }
      }
      &.old{
        .dg-select-edit-ipt,.dg_td{ color: #2993f8;}
      }
    }
    
    >.template{
      padding: 5px 0;
      &:nth-child(even){
        background-color: #d8ecfe;
      }
      &:nth-child(odd){
       background-color: #f1f8fe;
      }
      
      &.move{
        background-color: #b2d8fc;
      }
      
      &.add{
        animation:add 1.5s ease-in-out .3s;
      }
      &.selectOn{
        background-color: #fff0d7!important;
      } 
    }
}


/* 右边动态表格区  */
.dg_bd-container{
   
   .dg_tr{
    display: flex;
    transition: all .3s;
    height: 30px;
    position: relative;
    >.dg_td{
      text-align: center;
      font-size: 13px;
      color: #333;
      display: flex;
      justify-content:center;
      align-items: center;
      word-wrap: break-word;
      word-break:break-all;
    }
    &.old{
      .dg-select-edit-ipt,.dg_td{ color: #2993f8;}
    }
  }
  
  >.template{
    padding: 5px 0;
    position:relative;
    &:nth-child(even){
      background-color: #f4f4f4;
    }
    &.move{
      background-color: #e9e9e9;
      >.operate{
        visibility: visible;
        opacity: 1;
      }
    }
    
    &.selectOn{
      background-color: #fff0d7!important;
    }
    
    &.add{
      animation:add 1.5s ease-in-out .3s;
    }
    
    >.operate{
      position: absolute;
      right: 0;
      width: 60px;
      top: 0;
      height: 70px;
      background-color: rgba(0,0,0,.5);
      font-weight: normal;
      transition: all .4s;
      visibility: hidden;
      opacity: 0;
      display: flex;
      justify-content:center;
      align-items: center;
      >i{
       color: #fff; 
       cursor: pointer;
       margin-right: 5px;
       transition: all .2s;
       vertical-align: middle;
       &.del{
         font-size: 15px;
       }
       &:hover{
        color: #2993f8;
       }
      }
    }
  }
}

.no-data{
    height: 400px;
    background: url('./../../../../../static/img/space-page.png') 250px center no-repeat;
    opacity: 0.3;
  }
</style>