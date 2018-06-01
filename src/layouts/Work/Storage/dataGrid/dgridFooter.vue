<template>
	<!--表尾-->
	<div class="dg-footer">
		<span v-for="k in footerData" :style="'width:'+k.width+'px'">{{newSynopsiData[k.total]}}</span>
	</div>
</template>

<script>
	import { fixedData } from './config'
	import { seekReceiptRKSynopsis, seekNewGoodsInfoList } from 'Api/commonality/seek'
	export default {
		name: 'footer',
		data() {
			return {
				footerData: fixedData,
				synopsiData: {},
				newSynopsiData:{}
			}
		},
		props: ['smallDataList', 'orderNum', 'isRefreshFooter', 'allSynopsiData'],
		watch: {
			smallDataList: function() {
				let tpData = []

				// 更新数据并对数组进行合并
				if(this.smallDataList.length > 0) {
					tpData.push(...fixedData, ...this.smallDataList)
					this.$set(this, 'footerData', tpData)
				}
			},
			isRefreshFooter(o, n) {
				this.fetchFootData()
//				this.fetchNewFootData()
				console.log(this.allSynopsiData)
			}
		},
		methods: {
			// 获取表尾合计数据
			fetchFootData() {
				seekReceiptRKSynopsis({
					orderNum: this.orderNum
				}).then((res) => {
					this.synopsiData = res.data.data
					this.$emit('setSynopsiData', this.synopsiData)
				})
			},
			fetchNewFootData() {
				seekNewGoodsInfoList({
				 	orderNum: this.orderNum,
				 	page: 1,
				 	pageSize: 1
				 }).then((res) => {
				 	if(res.data && res.data.data) {
				 		this.newSynopsiData = res.data.data;
				 	}
				 }, (res) => {

				 })
			}
		},

		mounted() {
			this.$nextTick(() => {
				this.fetchFootData()
//				this.fetchNewFootData()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.dg-footer {
		background-color: #2993f8;
		color: #fff;
		height: 40px;
		line-height: 40px;
		border-radius: 0 0 10px 10px;
		>span {
			float: left;
			text-align: center;
			line-height: 40px;
			font-size: 14px;
			height: 40px;
		}
	}
</style>