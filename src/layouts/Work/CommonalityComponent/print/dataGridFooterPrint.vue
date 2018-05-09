<template>
<!--表尾-->
<table id="footerxiantiao" class="table-print-wrap">
	<tr>
		<td class="table-print-footer-td" v-for="tab in newtables" :key="tab.id" >
			<div :style="tableCell(Number(tab.width)+106+'')" v-if="tab.id == 0">
				<!-- <p class="total" v-if="tab.totalName !=''" v-text="tab.totalName"></p> -->
				<p>总计</p>
				<!-- <p class="totalNum">{{tab.type =='' ? '' : dataGridStorage[tab.type] }} <i v-if="tab.footerUnit !=''">{{ tab.footerUnit}}</i></p> -->
			</div>
			<div :style="tableCell(tab.width)" v-else-if="tab.id == 2">
				<p class="totalNum">{{lsType}} <i>{{ lsfooterUnit}}</i></p>
			</div>
			<div :style="tableCell(tab.width)" v-else>
				<p class="totalNum">{{tab.type =='' ? '' : dataGridStorage[tab.type] }} <i v-if="tab.footerUnit !=''">{{ tab.footerUnit}}</i></p>
			</div>
			
		</td>
	</tr>

</table>
</template>

<script>
export default{
	props : ['detailDataGridColumn','dataGridStorage','tabCell'],
	data(){
		return{
			newtables:[],
			lsType:'',
			lsfooterUnit:''
		}
	},
	created(){
      this.fixdetail();
	},
	methods:{
		fixdetail(){
		   let newtable = [];
		   for(let i=0;i<this.detailDataGridColumn.length;i++){
			   if(this.detailDataGridColumn[i].id == 0){
				   this.lsType =this.dataGridStorage[this.detailDataGridColumn[i].type];
				   this.lsfooterUnit = this.detailDataGridColumn[i].footerUnit;
			   }
               if(this.detailDataGridColumn[i].id != 1 && this.detailDataGridColumn[i].id != 9){
                    newtable.push(this.detailDataGridColumn[i]);
			   }
		   }
		   console.log(newtable);
		   this.newtables = newtable;
		},
		tableCell( width ){
			let _size = ''
			//console.log(this.dataGridStorage);
			this.$emit('tabCell',{
				width : width,
				res :( res ) =>{
					_size = res
				}
			});
			console.log(_size);
			return _size
		},
	}
}
</script>

<style scoped lang="scss">

	td{
		i{
			font-style:normal;
			font-size: 6pt;
			color: #999;
		}
		
		.totalNum{
			white-space: nowrap;
		}
	}

</style>