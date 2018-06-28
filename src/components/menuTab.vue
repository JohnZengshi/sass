<template>
  <div class="menu-content" ref="menuContent" id="menuContent">
    <div :class="moveLeft.hideStatus?'show-text hide':'show-text show'" :style="'left:' + moveLeft.left + 'px;'">{{moveLeft.text}}</div>
    <div :class="this.moveParam.leftClick?'left-arrow':'left-arrow arrow-gray'" v-if="arrowStatus.show" @click="moveAction('left')">
      <i class="el-icon-arrow-left"></i>
    </div>
    <ul class="menu-tab-box no-radius" :style="'width:'+ulWidth+'px;transform: translateX('+moveParam.moveX+'px)'" v-if="getMenuTabData.length > 0">
      <router-link tag="li":to="item.path" 
        v-for="(item,index) in getMenuTabData"
        @mouseover.native="menuOver(item, $event)"
        @mouseleave.native="mouseLeave(item, $event)"
        @click.native="menuItem(index, $event,item.rootIndex,item.childIndex)" :class="index == curMenu ? 'active' : ''">
          {{item.text}}
          <i @click.stop="delMenu(index,$event,item)" @mouseover.native="closeOver(item, $event)">x</i>
      </router-link>
    </ul>
    <div :class="this.moveParam.rightClick?'right-arrow':'right-arrow arrow-gray'" v-if="arrowStatus.show" @click="moveAction('right')">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
  import bus from '../vuex/event'
  export default {
    data () {
        return {
            getMenuTabData:[],
            curMenu:0,
            curStatus:0, //0是默认，1是已改变
            moveLeft:{
              left:0,
              hideStatus:true,
              text:''
            },
            arrowStatus:{
              show:false,
              left:false,
              right:false
            },
            ulWidth:'',  //页签UL宽度
            boxWidth:'', //容器宽度
            moveParam:{
              moveX:0,     //页签位移量
              leftClick:true, //左箭头点击次数
              rightClick:true, //右箭头点击次数
            }
        }
    },
    created () {
    },
    watch: {
    },
    mounted () {
      this.receive()
      window.onresize = () => {
         this.receive()   
      }
    },
    methods: {
      menuOver(item, evt){
        let left = 210
        this.$set(this.$data,'moveLeft',{
           left : evt.target.getBoundingClientRect().left - left,
           hideStatus : false,
           text:item.text
        })
      },
      mouseLeave(item, evt){
        this.$set(this.$data,'moveLeft',{
           hideStatus : true
        })
      },
      receive(){
        //接受事件
        bus.$on('menuTabDataChange',(data)=>{
          this.getMenuTabData = data
          this.curMenu = data.length - 1
          this.ulWidth = data.length*96
          this.boxWidth = document.getElementById('menuContent').offsetWidth
          document.getElementById('menuContent').style.width = this.boxWidth + 'px'
          //如果页签dom超过父容器则显示箭头
          if(this.ulWidth > this.boxWidth){
            this.arrowStatus.show = true
          }else{
            this.arrowStatus.show = false
          }
        })
        bus.$on('menuTabPath',(data)=>{
          console.log(data)
          console.log(this.getMenuTabData)
          for(let i=0;i<this.getMenuTabData.length;i++){
            if(this.getMenuTabData[i].path == data){
              this.curMenu = i
            }
          }
        })
      },
      delMenu(index, evt,item){
        this.getMenuTabData.splice(index,1)
        if(this.curStatus == 0){
          this.curMenu = this.getMenuTabData.length - 1
        }
        //如果关闭的是最后一个页签要打开倒数第二个页签对应的路由
        if(index == this.getMenuTabData.length && index != 0 && this.getMenuTabData.length != 0){
          console.log(this.getMenuTabData[index-1].path)
          this.$router.push(this.getMenuTabData[index-1].path)
        }
        //如果关闭完全页签就把路由转向首页
        if(index == 0 && this.getMenuTabData.length == 0){
          this.$router.push('/mainIndex')
        }
        this.$set(this.$data,'moveLeft',{
           hideStatus : true
        })
        this.ulWidth = this.getMenuTabData.length*96
        //页签宽度不超过容器则隐藏箭头
        if(this.ulWidth > this.boxWidth){
          this.arrowStatus.show = true
          if(this.moveParam.moveX<0){
            this.moveParam.moveX += 96
          }
        }else{
          this.arrowStatus.show = false
          this.moveParam.moveX = 0
        }
      },
      closeOver(index, evt){
        this.$set(this.$data,'moveLeft',{
           hideStatus : true
        })
      },
      menuItem(index, evt,rootIndex,childIndex){
        this.curMenu = index
        this.curStatus = 1  //如果切换过页签需要改变焦点状态
        if(index == this.getMenuTabData.length - 1){
          this.curStatus = 0  //如果切换的页签是最后一个需要置0
        }
        console.log(this.$router)
        let mainLeftMenu = {}
        mainLeftMenu.rootIndex = rootIndex
        mainLeftMenu.childIndex = childIndex
        console.log(mainLeftMenu)
        bus.$emit('mainLeftMenuData',mainLeftMenu)
      },
      moveAction(type){
        if(type == 'left'){
          if(this.moveParam.moveX < 0){
            this.moveParam.moveX += 96
            this.moveParam.rightClick = true
            if(this.moveParam.moveX > 0){
              this.moveParam.moveX = 0
              this.moveParam.leftClick = false
            }
          }
        }else{
          if(this.boxWidth - this.ulWidth < this.moveParam.moveX){
            this.moveParam.moveX -= 96
            this.moveParam.leftClick = true
            if(this.moveParam.moveX<this.boxWidth - this.ulWidth){
              this.moveParam.moveX = this.boxWidth - this.ulWidth - 40
              this.moveParam.rightClick = false
            }
          }
        }
      }
    },
    updated(){
    }
}
</script>

<style lang="scss" scoped>
.menu-content{
  height: 64px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  padding: 0 20px;
  .show-text{
    position: absolute;
    font-size: 12px;
    background: rgba(0,0,0,.5);
    border-radius: 3px;
    padding:0 10px;
    color: #FFFFFF;
    line-height: 26px;
    top: 2px;
    transition: all .3s;
  }
  .menu-tab-box{
    height: 34px;
    margin-top: 29px;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    display: inline-block;
    overflow: hidden;
    box-sizing: content-box;
    transition: all .3s;
    li{
      display: inline-block;
      float: left;
      width: 96px;
      line-height: 34px;
      border-right: 1px solid #D6D6D6;
      border-top: 1px solid #D6D6D6;
      text-align: center;
      color: #666666;
      font-size: 12px;
      position: relative;
      padding-right: 20px;
      padding-left: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      i{
        font-style: normal;
        color: #D6D6D6;
        font-size: 14px;
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        text-align: center;
        cursor: pointer;
        z-index: 100;
      }
    }
  }
}

.menu-tab-box li:last-child{
  border-left: none;
  border-radius: 0 4px 0 0;
}
.menu-tab-box li:first-child{
  border-left: 1px solid #D6D6D6;
  border-radius: 4px 0 0 0;
}
.menu-tab-box.no-radius{
  border-radius: 0;
}
.menu-tab-box li:hover{
  color: #2993f8;
}
.menu-tab-box li.active{
  color: #2993f8;
}
.hide{
  display: none;
}
.show{
  display: block;
}
.left-arrow{
  width: 20px;
  height: 34px;
  margin-top: 30px;
  line-height: 34px;
  text-align: center;
  border: 1px solid #D6D6D6;
  border-bottom: 0;
  border-right: 0;
  font-size: 12px;
  border-radius: 4px 0 0 0;
  cursor: pointer;
  color: #2993f8;
  position: absolute;
  left: 0;
  bottom: 1px;
  z-index: 1000;
  background: #FFFFFF;
  box-shadow: 3px 1px 3px rgba(0,0,0,.2);
}
.right-arrow{
  width: 20px;
  height: 34px;
  margin-top: 30px;
  line-height: 34px;
  text-align: center;
  border: 1px solid #D6D6D6;
  border-bottom: 0;
  font-size: 12px;
  border-radius: 0 4px 0 0;
  cursor: pointer;
  color: #2993f8;
  position: absolute;
  right: 0;
  bottom: 1px;
  background: #FFFFFF;
  box-shadow: -3px 1px 3px rgba(0,0,0,.2);
  z-index: 1000;
}
.left-arrow.arrow-gray,.right-arrow.arrow-gray{
  color: #D6D6D6;
}
</style>