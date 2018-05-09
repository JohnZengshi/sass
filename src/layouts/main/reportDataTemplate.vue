<template>
<transition name="tp-ani">
<div class="row-1 row-action" >
    
	<div 
  class="data-block" 
  v-for="j,i in tempData" 
  v-if="dataType == 3 ? (i == 1 || i == 5) : dataType == 1 ? (i == 0 || i == 2 || i == 1 || i == 4) : (i > 0 && i <= 4) "
  :class="j.addClass" 
  v-loading="j.loading">
	  <div class="block-left">
	    <span class="iconfont" :class="'icon-'+ j.icon"></span>
	  </div>
	  <div class="block-right">
	    <div class="block-right-title" v-text="j.title"></div>
	    <div class="block-right-content">
	      <p class="num"><span v-html="unitAct(j.totalNum)"></span><i>{{unitActUnit(j.totalNum)}}</i></p>
	      <div>
	        <p><span v-html="unitAct1(j.totalWeight)" :title="j.totalWeight + 'g'"></span><i>{{unitActUnit1(j.totalWeight)}}</i></p>
	        <p><span v-html="j.totalPrice" :title="j.isUnit ? j.totalPrice + '万元' :j.totalPrice + '元'"></span><i>{{j.isUnit ? '万元' : '元'}}</i></p>
	      </div>
	    </div>
	  </div>
	</div>
	
</div>
</transition>
</template>

<script>
import {seekDataStatistics} from '../../../src/Api/commonality/seek'
const  _assign = require('lodash/assign')
export default {
	data () {
		return {
			tempData: [
        {
          title : '本月入库数据',
          icon : 'kucun',
          addClass : 'return-data',
          totalNum : 0,
          totalWeight : 0,
          totalPrice : 0,
          loading : true,
          isUnit: false
        },
				{
					title : '本月销售数据',
					icon : 'xiaoshou',
					addClass : 'sell-data',
					totalNum : 0,
					totalWeight : 0,
					totalPrice : 0,
          loading : true,
          isUnit: false
				},
				{
					title : '本月发货数据',
					icon : 'fahuo',
					addClass : 'receipt-data',
					totalNum : 0,
					totalWeight : 0,
					totalPrice : 0,
          loading : true,
          isUnit: false
				},
				{
					title : '本月退货数据',
					icon : 'tuihuo',
					addClass : 'return-data',
					totalNum : 0,
					totalWeight : 0,
					totalPrice : 0,
					loading : true,
          type : 3,
          isUnit: false
				},
				{
					title : '库存数据',
					icon : 'kucun',
					addClass : 'stock-data',
					totalNum : 0,
					totalWeight : 0,
					totalPrice : 0,
          loading : true,
          isUnit: false
				},
				{
          title : '本月回购数据',
          icon : 'fahuo',
          addClass : 'receipt-data',
          totalNum : 0,
          totalWeight : 0,
          totalPrice : 0,
          loading : true,
          isUnit: false
        }
			],
			
			beginTime : this.getDate(-((new Date()).getDate()-1)),
			endTime : this.getDate(0,true),
			type : this.getType()
		}
	},
	watch:{
		//店铺ID 
		shopId : function(){
		    if( this.shopId != ''){
    		    this.tempData.forEach((item)=>{
    		       _assign( item , { loading : true })
    		    })
    			if( this.dataType != ''){
              this.send()
          }
			}
		},
		dataType : function(){
		    
		  if( this.dataType != ''){
        this.send()
      }
		  // console.log('watch', this.dataType)
		}
	},
	props: ['dataType','shopId'],
	
	created(){
      console.log('created', this.dataType)
      console.log(this.dataType)
	    if( this.dataType != ''){
        this.send()
      }
      // console.log(this.dataType)
      //  if (this.dataType == 2) {
      //    this.tempData[2].title = "本月收货数据"
      //  } else {
      //    this.tempData[2].title = "本月发货数据"
      //  }
	},
	methods: {
    unitActUnit1 (data) {
        let newData = Number(data)
        if (newData > 999) {
          return 'kg'
        } else {
          return 'g'
        }
      },
      unitActUnit (data) {
        let newData = Number(data)
        if (newData > 9999) {
          return '万件'
        } else {
          return '件'
        }
      },
      unitAct1 (data) {
        let newData = Number(data)
        if (newData > 999) {
          return (newData / 1000).toFixed(2)
        } else {
          return data
        }
      },
	    unitAct (data) {
        let newData = Number(data)
        if (newData > 9999) {
          return (newData / 10000).toFixed(0)
        } else {
          return data
        }
      },
	    getType(){
	       return parseInt(sessionStorage.getItem('companyPosition'))
	    },
		//销售单据数据统计
	    saleDataStatistics () {
	      let options = {
	        searchType: '07',
	        dataType: this.dataType,
	        beginTime: this.beginTime,
	        endTime: this.endTime,
	        shopId: this.shopId
	      }
	      seekDataStatistics(options).then((res) => {
	        let temp = this.tempData[1]
          console.log(res)
	        if( res.body.state === 200){
            if (res.data.data.dataList[0].totalPrice > 10000) {
              res.data.data.dataList[0].totalPrice = (res.data.data.dataList[0].totalPrice / 10000).toFixed(2)
              this.tempData[1].isUnit = true
            } else {
              this.tempData[1].isUnit = false
            }
            //console.log(res.data.data.dataList[0])
            this.stopwatch(function(){
                _assign( temp, res.data.data.dataList[0], { loading :false})
            })
          }else{
              this.stopwatch(function(){
                  _assign( temp, {
                      totalNum : 0,
                      totalWeight : 0,
                      totalPrice : 0,
                      loading: false
                  })
              })
              this.$message({
                  type : 'error',
                  message : '销售数据：' + res.body.msg
              })
          }
	      }, (res) => {
	        console.log(res)
	      })
	    },
	    //入库数据统计
	    rkDataStatistics () {
	      let options = {
	        searchType: '01',
	        dataType: this.dataType,
	        beginTime: this.beginTime,
	        endTime: this.endTime,
	        shopId: this.shopId
	      }
	      seekDataStatistics(options).then((res) => {
	        let temp = this.tempData[0]
          console.log(res)
	        if( res.body.state === 200){
              if (res.data.data.dataList[0].totalPrice > 10000) {
                res.data.data.dataList[0].totalPrice = (res.data.data.dataList[0].totalPrice / 10000).toFixed(2)
                this.tempData[0].isUnit = true
              } else {
                this.tempData[0].isUnit = false
              }
                this.stopwatch(function(){
                   _assign( temp, res.data.data.dataList[0], { loading :false})
                })
            }else{
                this.stopwatch(function(){
                    _assign( temp, {
                        totalNum : 0,
                        totalWeight : 0,
                        totalPrice : 0,
                        loading: false
                    })
                })
                this.$message({
                    type : 'error',
                    message : '入库数据：' + res.body.msg
                })
            }
	      }, (res) => {
	        console.log(res)
	      })
	    },
	    //库存单据数据统计
	    kcDataStatistics () {
	      let options = {
	        searchType: '04',
	        dataType: this.dataType,
	        beginTime: this.getDate(0),
	        endTime: this.getDate(0,true),
	        shopId: this.shopId
	      }
	      seekDataStatistics(options).then((res) => {
	        let temp = this.tempData[4]
	        if( res.body.state === 200){
              if (res.data.data.dataList[0].totalPrice > 10000) {
                res.data.data.dataList[0].totalPrice = (res.data.data.dataList[0].totalPrice / 10000).toFixed(2)
                this.tempData[4].isUnit = true
              } else {
                this.tempData[4].isUnit = false
              }
    	        this.stopwatch(function(){
    	           _assign( temp,res.data.data.dataList[0], { loading :false})
    	        })
	        }else{
	            this.stopwatch(function(){
                    _assign( temp, {
                        totalNum : 0,
                        totalWeight : 0,
                        totalPrice : 0,
                        loading :false
                    })
                })
	            this.$message({
	                type : 'error',
	                message : '库存数据：' + res.body.msg
	            })
	        }
	      }, (res) => {
	        console.log(res)
	      })
	    },
	    //退货单据数据统计
	    thDataStatistics () {
	      let options = {
	        searchType: '03',
	        dataType: this.dataType,
	        beginTime: this.beginTime,
	        endTime: this.endTime,
	        shopId: this.shopId
	      }
	      seekDataStatistics(options).then((res) => {
	      	
	        let temp = this.tempData[3]
	        if( res.body.state === 200){
                if (res.data.data.dataList[0].totalPrice > 10000) {
                  res.data.data.dataList[0].totalPrice = (res.data.data.dataList[0].totalPrice / 10000).toFixed(2)
                  this.tempData[3].isUnit = true
                } else {
                  this.tempData[3].isUnit = false
                }
                this.stopwatch(function(){
                   _assign( temp,res.data.data.dataList[0], { loading :false})
                })
            }else{
                this.stopwatch(function(){
                    _assign( temp, {
                        totalNum : 0,
                        totalWeight : 0,
                        totalPrice : 0,
                        loading :false
                    })
                })
                this.$message({
                    type : 'error',
                    message : '退货数据：' + res.body.msg
                })
            }
	      }, (res) => {
	        console.log(res)
	      })
	    },
	    //发货单据数据统计
	    fhDataStatistics () {
	      let options = {
	        searchType: '02',
	        dataType: this.dataType,
	        beginTime: this.beginTime,
	        endTime: this.endTime,
	        shopId: this.shopId
	      }
	      seekDataStatistics(options).then((res) => {
	        let temp = this.tempData[2]
	        if( res.body.state === 200){
                if (res.data.data.dataList[0].totalPrice > 10000) {
                  res.data.data.dataList[0].totalPrice = (res.data.data.dataList[0].totalPrice / 10000).toFixed(2)
                  this.tempData[2].isUnit = true
                } else {
                  this.tempData[2].isUnit = false
                }
                this.stopwatch(function(){
                   _assign( temp,res.data.data.dataList[0], { loading :false})
                })
            }else{
                this.stopwatch(function(){
                    _assign( temp, {
                        totalNum : 0,
                        totalWeight : 0,
                        totalPrice : 0,
                        loading :false
                    })
                })
                this.$message({
                    type : 'error',
                    message : '发货数据：' + res.body.msg
                })
            }
	        
	      }, (res) => {
	        console.log(res)
	      })
	    },
	    //回购
	    hgDataStatistics () {
          let options = {
            searchType: '06',
            dataType: this.dataType,
            beginTime: this.beginTime,
            endTime: this.endTime,
            shopId: this.shopId
          }
          seekDataStatistics(options).then((res) => {
            let temp = this.tempData[5]
            if( res.body.state === 200){
                if (res.data.data.dataList[0].totalPrice > 10000) {
                  res.data.data.dataList[0].totalPrice = (res.data.data.dataList[0].totalPrice / 10000).toFixed(2)
                  this.tempData[5].isUnit = true
                } else {
                  this.tempData[5].isUnit = false
                }
                this.stopwatch(function(){
                   _assign( temp,res.data.data.dataList[0], { loading :false})
                })
            }else{
                this.stopwatch(function(){
                    _assign( temp, {
                        totalNum : 0,
                        totalWeight : 0,
                        totalPrice : 0,
                        loading :false
                    })
                })
                this.$message({
                    type : 'error',
                    message : '回购数据：' + res.body.msg
                })
            }
            
          }, (res) => {
            console.log(res)
          })
        },
        
	    stopwatch( callBack ){
	    	return setTimeout(()=>{
	    		callBack && callBack()
	    	},100)
	    },
	    
	    getDate( day, type ){
            let taday = new Date() 
            let newDate = new Date()
            newDate.setDate( taday.getDate() + day )
            let Year = newDate.getFullYear()
            let month = newDate.getMonth()+1
            //console.log((new Date()).getDate())
            let Day = newDate.getDate()
            let realTime = type ? '235959' : '000000'
            let newTime = Year +''+ ( month < 10 ? ('0' + month) : month ) + ( Day < 10 ? ('0' + Day ) : Day ) + realTime
            return newTime
        },
        
	    send(){
	        this.saleDataStatistics()
            //店员权限
            if( this.dataType == 3 ){
               this.hgDataStatistics()
            } else if (this.dataType == 1) {
              this.rkDataStatistics()
              this.kcDataStatistics()
              this.fhDataStatistics()
            } else {
              this.kcDataStatistics()
              this.thDataStatistics()
              this.fhDataStatistics()
            }
	    }
	},
	
	mounted(){
    let self = this
			this.timeOut = setTimeout(()=>{
        // console.log(self.dataType)
				if (self.dataType == 2) {
          self.tempData[2].title = '本月收货数据'
        } else {
          self.tempData[2].title = '本月发货数据'
        }
			},300)
	}
	
}

</script>

<style lang="scss" scoped>


 .row-1 {
  height:110px;
  width:1260px;
  margin-bottom:30px;
  display:flex;
  .data-block +.data-block{
    margin-left: 43px;
  }
}
.data-block {
    width:280px;
    height:110px;
    background:#fff;
    border-radius:10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
    overflow: hidden;
    .el-loading-mask{
    	border-radius:10px;
    }
   .block-left{
      height:100%;
      width:56px;
      float:left;
      line-height:110px;
      text-align:center;
      .iconfont {
        font-size:30px;
        color:#fff;
      }
    }
    
    .block-right {
      padding-left:10px;
      width:224px;
      box-sizing: border-box;
      float:left;
      height:100%;
      padding-top:16px;
      .block-right-title {
        color:#999; 
        font-size:14px;
        margin-bottom:13px;
      }
      
      .block-right-content {
        &>p {
          float: left;
          overflow: hidden;
          position: relative;
          width: 90px;
          padding-right: 8px;
          text-align:center;
          &:after{
             content: '';
             display: block;
             position: absolute;
             top: 5px;
             right: 2px;
             height: 20px;
             width: 2px;
             background-color: #95cbff;
          }
          >span{
          	color:#2993f8;
          	display: inline-block;
          	font-size:26px;
          	max-width: 60px;
          	text-align: center;
          	white-space: nowrap;
          	overflow: hidden;
            text-overflow: ellipsis;
          	vertical-align: middle;
          }
          &>i {
            padding-left:3px;
            font-style: normal;
            color:#666;
            height: 20px;
            font-size:14px;
            display:inline-block;
            line-height: 25px;
            vertical-align: middle;
          }
        }
        
        &>div {
          float:left;
          margin-left:10px;
          width: 95px;
          margin-top: -5px;
          overflow:hidden;
          p {
            color:#333;
            display: inline-block;
            font-size:14px;
            width:100%;
            overflow:hidden;
            white-space: nowrap;
            >span{
            	display: inline-block;
            	vertical-align: middle;
            	white-space: nowrap;
            	max-width: 65px;
            	overflow: hidden;
            	text-overflow: ellipsis;
            }
            
            i {
              margin-left: 6px;
              border:none;
              font-style:normal;
              font-size:12px;
              color:#999;
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
        
      }
      
    }
  }

.sell-data {
    .block-left {
      background:#2993f8;
    }
    .block-right {
      .block-right-content {
      	.num{
      		span{color:#2993f8;}
      	}
        p {
          &:after{
             background-color: #95cbff;
          }
          
        }
      }
    }
  }
  .receipt-data {
    .block-left {
      background:#ff607e;
    }
    .block-right {
      .block-right-content {
      	.num{
      		span{color:#ff607e;}
      	}
        p {
          &:after{
             background-color: #ff607e;
          }
        }
      }
    }
  }
  .return-data {
    .block-left {
      background:#ffb549;
    }
    .block-right {
      .block-right-content {
      	.num{
          span{
            color:#ffb549;
          }
      	}
        p {
           &:after{
             background-color: #ffb549;
          }
          
        }
      }
    }
  }
  .stock-data {
    .block-left {
      background:#858bd7;
    }
    .block-right {
      .block-right-content {
      	.num{
      		span{color:#858bd7;}
      	}
        p {
          &:after{
             background-color: #858bd7;
          }
          
        }
      }
    }
  }

    
</style>
<style lang="scss">
.data-block {
    >.el-loading-mask{
    	border-radius:10px;
    }
}
</style>