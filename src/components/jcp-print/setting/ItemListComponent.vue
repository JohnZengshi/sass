<template>
	<div>
		<template v-for="children in context.data.children">
			<component :is="children.type" :context="children"></component>
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
	}
</script>
<style>
</style>