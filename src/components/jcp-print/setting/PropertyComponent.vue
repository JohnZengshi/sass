<template>
	<div :style="context.data|BASE_STYLE">
		<!--条形码-->
		<template v-if="context.data.propertyCode=='charCode' || context.data.propertyCode=='orderNum'">
			<img class='jatools-coder' :style="context.data|IMG_STYLE" :src="'http://127.0.0.1:31227/api?type=coder&code='+context.data.sample+'&style=type:code128;autofit:true;show-text:false;&width=130&height=80'" >
		</template>
		<template v-else>
			<!--前缀-->
			<span :style="context.data.valueStyle|SPAN_STYLE">{{context.data.prefix}}</span>
			<!--内容-->
			<span :style="context.data.valueStyle|SPAN_STYLE">{{context.data?context.data.sample:""}}</span>
			<!--后缀-->
			<span :style="context.data.valueStyle|SPAN_STYLE">{{context.data.suffix}}</span>
		</template>
	</div>
</template>

<script>
	import ContainerComponent from "./ContainerComponent"
	import ImageComponent from "./ImageComponent"
	import ItemListComponent from "./ItemListComponent"
	import LineComponent from "./LineComponent"
	import PropertyComponent from "./PropertyComponent"
	import TextComponent from "./TextComponent"
	
	export default {
		components: {
			ContainerComponent,
			ImageComponent,
			ItemListComponent,
			LineComponent,
			PropertyComponent,
			TextComponent
		},
		props: {
			context:{
				type:Object
			}
		},
		filters: {
			IMG_STYLE:(data)=>{
				let {top, left, width, height, rotateDeg} = data;
				return {
					"width":width+"mm", 
					"height":height+"mm", 
				};
			},
			SPAN_STYLE:(data)=>{
				let {isBold, isItalic, isUnderline, fontFamily, fontSize, color} = data;
				return {
					"display": "inline-block",
					"vertical-align": "middle",
					"letter-spacing": "0px",
					"color": color,
					"text-decoration": (isUnderline ? 'underline' : 'none'),
					"font-size": fontSize + "px",
					"font-family": fontFamily,
					"font-style": (isItalic ? 'italic' : 'normal'),
					"font-weight": (isBold ? 'bold' : 'normal'),
				};
			},
			BASE_STYLE:(data)=>{
				let {top, left, width, height, border, backgroundImage, textAlign, rotateDeg} = data;
				let style = {
					"-webkit-font-smoothing": "antialiased",
					"font-smoothing": "antialiased",
					"position": "absolute",
					"white-space": "nowrap",
					"border": (border ? '1px solid #000;' : 'none'),
					"top": top + "mm",
					"left": left + "mm",
				}
				switch(rotateDeg) {
					case 90:
						style["transform"] = "rotate(" + rotateDeg + "deg) translateY(-" + height + "mm)";
						style["transform-origin"] = "0px 0px 0px"; 
						break;
					case 180:
						style["transform"] = "rotate(" + rotateDeg + "deg) translate(-" + width + "mm, -" + height + "mm)";
						style["transform-origin"] = "0px 0px 0px";
						break;
					case 270:
						style["transform"] =  "rotate(" + rotateDeg + "deg) translateX(-" + width + "mm)";
						style["transform-origin"] =  "0px 0px 0px";
						break;
					default:
						break;
				}
				return style;
			},
		},
	}
</script>
<style>
</style>