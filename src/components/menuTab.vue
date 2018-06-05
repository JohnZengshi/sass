<template>
	<div class="menu-content">
		<div class="show-text">用户来访列表</div>
		<div class="menu-tab-box">
			<a href="#" @click="showMenu">
				首页
				<i>x</i>
			</a>
			<a href="#">
				首页
				<i>x</i>
			</a>
			<a href="#">
				首页
				<i>x</i>
			</a>
			<!--<router-link tag="a":to="item.path" 
        v-for="api in applyLists"  
        @click.native="systemItem(i, b, menu)">
          <i>x</i>
      </router-link>-->
		</div>
	</div>
</template>

<script>
	export default {
    data () {
        return {
            
        }
    },
    created () {
    },
    watch: {
    },
    mounted () {
    },
    methods: {
    	showMenu(){
    		console.log(this.topMenuTabData)
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
	}
	.menu-tab-box{
		height: 34px;
		margin-top: 30px;
		border: 1px solid #D6D6D6;
		border-bottom: none;
		border-radius: 5px 5px 0 0;
		display: inline-block;
		overflow: hidden;
		a{
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
			i{
				font-style: normal;
				color: #D6D6D6;
				font-size: 14px;
				position: absolute;
				right: 0;
				top: 0;
				width: 20px;
				text-align: center;
			}
		}
		&:last-child{
			border-right: none;
		}
	}
}

</style>