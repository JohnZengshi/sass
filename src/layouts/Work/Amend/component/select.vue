<template>
<div 
  :title="item[tab.type]"
  v-if="hasfetchData(tab.type)"
  @mouseleave="_mouseEvent($event, fIndex, cIndex)"
  @mousemove="_mouseEvent($event, fIndex, cIndex)"
  @click="selecChange({tr: item ,fIndex: fIndex,td: tab, cIndex: cIndex, event: $event})"
  class="dg-select-container">
  {{item[tab.type]}}
</div>
<div v-else-if="tdData">{{tdData}}</div>
<!--文本编辑-->
<input 
  type="text" 
  @click="dataGridInputEdit($event, item[tab.type])"
  @keypress="dataGridkeyInput($event, item, tab)"
  @focusout="inputFocusout($event, item, tab)"
  class="dg-select-edit-ipt" 
  :title="item[tab.type]"
  v-model="item[tab.type]" v-else />
</template>

<script>
import * as configData from '../dataGrid/config'
import * as fetch from '../dataGrid/fetchData'
export default{
  data(){
    return{
      // 表格下拉数据集
      datagridSelectData : {},
      selectConfig : {},
      selectClassTrIndex : -1,
      selectClassTdIndex : -1,
      
      selectCurActive : false,
      
      // 时间计时器
      mouseEvent : {
        x : -1,
        y : -1
      }
      
    }
  },
  /* @ 数据传递说明
   * item 单元格整条数据  后台返回的
   * tab 单元格配置数据 本地配置的
   * tdData 左边表格固定区域的数据 单独配置的 右边的表格无需配置
   * fIndex 行数
   * cIndex 列数
   * dgDataList 整个表格商品数据列表
   * */
  props: ['item','tab', 'tdData','fIndex','cIndex','dgDataList'],
  
  created(){
    this.selectConfig = fetch.Select
  },
  methods: {
    // 文本框点击
    dataGridInputEdit (evt, text) {
      // 记录当前的数据
      evt.target.setAttribute('temp-data', text == undefined ? '' : text)
      evt.stopPropagation()
    },
    
    // 文本框失去焦点
    inputFocusout (evt, item, tab) {
      let tempData = evt.target.getAttribute('temp-data')
      let itemData = item[tab.type]
      
      // 当input失去焦点时 需要检测下初始数据是否被修改过，如果没有修改 则不需要保存
      if ( tempData && tempData != itemData && (itemData && itemData.length > 0)) {
        this.$emit('updataEditApi', {
          [fg.td.type]: item.classesName,
          productId: productId
        })
      }
    },
    
    // keypress 监听回车
    dataGridkeyInput (evt, item, tab) {
      if (evt.key == 'Enter' && evt.keyCode == 13) {
        evt.target.blur()
      }
    },
    
    // 通过配置信息检测是否需要加载下拉框数据
    hasfetchData (type){
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
    selecChange (fg) {     
      fg.event.stopPropagation()
      
      this.clearTime()
      let tpData = this.datagridSelectData[fg.td.type]
      let coord = fg.event.target.getBoundingClientRect()
      
      this.addSelect(tpData, {
        left : coord.left,
        top : coord.top + coord.height
      }, fg)
      
      this.$emit('updataSelectContainer', {
        selectCur_tr_index : fg.fIndex,
        selectCur_td_index : fg.cIndex
      })
    },
    
    // 纯手工下拉条
    addSelect (item, coord, fg) {
      let elem = document.getElementById('j_datagrid_select')
      
      let events = (item) => {
        let productId = this.dgDataList[fg.fIndex].productId

        // 更新view视图
        this.$set(this.dgDataList[fg.fIndex], fg.td.type, item.classesName)
        this.selectClassTdIndex = -1
        this.elemHide(elem)
        
        this.$emit('updataEditApi', {
          [fg.td.type]: item.classesName,
          productId: productId
        })
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
          selectCur_td_index : -1
        })
      }
    },
    
    // 下拉条定时器
    clearTime (type) {
      if ('boolean' === typeof type ){
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
    }
  }
}
</script>

<style>
</style>