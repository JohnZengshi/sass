<template>
	<hr :style="context.data|Line_STYLE">
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
			Line_STYLE:(data)=>{
				let {top, left, width, height, color, rotateDeg} = data;
				let style = {
					"-webkit-font-smoothing": "antialiased",
					"font-smoothing": "antialiased",
					"position": "absolute",
					"border": "0.5px solid "+color,
					"top": top + "mm",
					"left": left + "mm",
					"width": width + "mm",
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
		}
	}
</script>
<style>
</style>