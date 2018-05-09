<template>
<div class="RP_report_wrapper ui-page-max-width">
	<div class="Rp_title_container">
		<!--面包屑-->
		<div class="Rp_crumbs">
			<i class="iconfont icon-baobiao"></i>
			<router-link tag="span" to="" class="path_crumbs">报表</router-link> 
		</div>
	</div>	
	<div class="rp_chart_level">
		<jk-chart></jk-chart>
		<xs-today-chart></xs-today-chart>
		<kc-chart></kc-chart>
	</div>
	<xs-all-chart></xs-all-chart>	
</div>
</template>
<script>
import JkChart from './charts/jk_ReportChart'
import XsTodayChart from './charts/xs_Today_ReportChart'
import XsAllChart from './charts/xs_All_ReportChart'
import KcChart from './charts/kc_ReportChart'
export default{
	data(){
		return{
		}
	},
	components :{
		JkChart,
		XsTodayChart,
		KcChart,
		XsAllChart
	},
	
	methods:{
		
	}
}
</script>

<style lang="scss" scoped>
.Rp_title_container{
	margin-bottom: 15px;
}
.rp_chart_level{
	display: flex;
	height: 330px;
	margin-bottom: 30px;
}

</style>