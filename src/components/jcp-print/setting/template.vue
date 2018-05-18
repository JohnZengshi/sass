<template>
	<div class="print-box" id="zbd-setting-page1" :style="template|PAGE_STYLE">
		<template v-for="component in template.components">
				<component :is="component.type" :context="component"></component>
		</template>
	</div>
</template>
<script>
	import { transformFileURL } from '@/utils/print';
	import { jcpPrint } from "@/tools/jcp-print";
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
			template:{
				type:Object
			}
		},
		data() {
			return {
				pageList: [],
			}
		},
		filters: {
			PAGE_STYLE:(data)=>{
				let {width, height, backgroundImage, rotateDeg} = data;
				return {
					"position":"relative",
					"width":width+"mm", 
					"height":height+"mm", 
			    "background-size": "100% 100%",
			    "background-repeat": "no-repeat",
     			"background-image": "url(" + transformFileURL(backgroundImage) + ")",
					"transform": "rotate(" + rotateDeg + "deg)",
				}
			},
		},
		mounted() {},
		methods: {
			print(template){
				let {width, height, rotateDeg} = template;
				if(rotateDeg == 90 || rotateDeg == 270){
					let w = width;
					width = height;
					height = w;
				}
				let doc = {
					pagePrefix:"zbd-setting-",
					documents: document,
				};
				setTimeout(()=>{
					jcpPrint.printPreviewPaper(doc, width, height);
				})
			},
		}
	}
</script>

<style scoped>
</style>