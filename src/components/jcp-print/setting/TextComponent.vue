<template>
	<div :style="context.data|BASE_STYLE">
		<span :style="context.data|SPAN_STYLE">{{context.data.content}}</span>
	</div>
</template>

<script>
	export default {
		components: {
		},
		props: {
			context:{
				type:Object
			}
		},
		filters: {
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