<template>
	<div>
		<img :style="context.data|IMG_STYLE" :src="context.data.src|IMG_SRC" />
	</div>
</template>

<script>
	import { transformFileURL } from '@/utils/print';
	export default {
		components: {
		},
		props: {
			context:{
				type:Object
			}
		},
		filters: {
			IMG_SRC:(data)=>{
				return transformFileURL(data);
			},
			IMG_STYLE:(data)=>{
				let {top, left, width, height, border, backgroundImage, textAlign, rotateDeg} = data;
				let style = {
					"-webkit-font-smoothing": "antialiased",
					"font-smoothing": "antialiased",
					"position": "absolute",
					"border": (border ? '1px solid #000;' : 'none'),
					"top": top + "mm",
					"left": left + "mm",
					"width":width+"mm", 
					"height":height+"mm",
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