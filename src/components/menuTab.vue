<template>
	<div class="menu-content">
		<div :class="moveLeft.hideStatus?'show-text hide':'show-text show'" :style="'left:' + moveLeft.left + 'px;'">{{moveLeft.text}}</div>
		<ul class="menu-tab-box" v-if="getMenuTabData.length > 0">
			<router-link tag="li":to="item.path" 
        v-for="(item,index) in getMenuTabData"
        @mouseover.native="menuOver(item, $event)"
        @mouseleave.native="mouseLeave(item, $event)"
        @click.native="menuItem(index, $event)" :class="index == curMenu ? 'active' : ''">
        	{{item.text}}
          <i @click.stop="delMenu(index,$event,item)">x</i>
      </router-link>
		</ul>
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
            }
        }
    },
    created () {
    },
    watch: {
    },
    mounted () {
    	this.receive()
    },
    methods: {
    	menuOver(item, evt){
    		let left = 190
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
    		})
    		bus.$on('menuTabPath',(data)=>{
    			console.log(data)
    		})
    	},
    	delMenu(index, evt,item){
    		console.log(item)
    		console.log(index)
    		console.log(this.getMenuTabData)
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
    	},
    	menuItem(index, evt){
    		this.curMenu = index
    		this.curStatus = 1  //如果切换过页签需要改变焦点状态
    		if(index == this.getMenuTabData.length - 1){
    			this.curStatus = 0  //如果切换的页签是最后一个需要置0
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
		margin-top: 30px;
		border: 1px solid #D6D6D6;
		border-bottom: none;
		border-radius: 5px 5px 0 0;
		display: inline-block;
		overflow: hidden;
		li{
			display: inline-block;
			float: left;
			width: 96px;
			line-height: 34px;
			border-right: 1px solid #D6D6D6;
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
			}
		}
		&:last-child{
			border-right: none;
		}
	}
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
</style>