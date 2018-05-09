<template>
  <div class="item-box">
    <table cellpadding="0" cellspacing="0">
      <tr>
        <th>大类</th>
        <th>成色名称</th>
        <th>今日金价</th>
        <th>销售底价</th>
        <th>兑换价</th>
        <th>回购价</th>
      </tr>
      <tr v-for="(item, index) in tableData" >
        <td><span>{{item.bigName}}</span></td>
        <td><span>{{item.smallClassName}}</span></td>
        <td @click="changeInfo(item, 3, index)"><input v-focus="flag" v-if="toEditing === 3 && ind == index" type="text" @blur="blurAndUp(item, 2, index)" v-model="dayPrice" onfocus="this.select()"/><span  v-else>{{item.dayPrice}}</span>元/g</td>
        <td @click="changeInfo(item, 4, index)"><input v-focus="flag" v-if="toEditing === 4 && ind == index" type="text" @blur="blurAndUp(item, 3, index)" v-model="lowestPrice" onfocus="this.select()"/><span v-else>{{item.lowestPrice}}</span>元/g</td>
        <td @click="changeInfo(item, 5, index)"><input v-focus="flag" v-if="toEditing === 5 && ind == index" type="text" @blur="blurAndUp(item, 4, index)" v-model="recyclePrice" onfocus="this.select()"/><span v-else>{{item.recyclePrice}}</span>元/g</td>
        <td @click="changeInfo(item, 6, index)"><input v-focus="flag" v-if="toEditing === 6 && ind == index" type="text" @blur="blurAndUp(item, 5, index)" v-model="exchangePrice" onfocus="this.select()"/><span v-else>{{item.exchangePrice}}</span>元/g</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {seekGoldPrice} from './../../../../Api/commonality/seek'
  import {modifyGoldPrice} from './../../../../Api/commonality/operate'
  export default {
      data () {
          return {
              classesId: '',
              dayPrice: 0,
              lowestPrice: 0,
              recyclePrice: 0,
              exchangePrice: 0,
              tableData: [],
              toEditing: 0,
              ind: null,
              flag: true
          }
      },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    },
    methods: {
          blurAndUp (item, num, index, name) {
            this.toEditing = 0;
            let options = {
              "updateList": [{
                "classesId": this.classesId,
                "dayPrice": this.dayPrice,
                "lowestPrice": this.lowestPrice,
                "recyclePrice": this.recyclePrice,
                "exchangePrice": this.exchangePrice
              }]
            }
            //console.log(options);
            modifyGoldPrice(options).then((res) => {
//                this.getGoldPrice();
              if (res.data.state == 200) {
                    for (let i in this.tableData[index]) {
                        if (i == "dayPrice") {
                          this.tableData[index].dayPrice = this.dayPrice;
                        } else if (i == "lowestPrice") {
                          this.tableData[index].lowestPrice = this.lowestPrice;
                        } else if (i == "recyclePrice") {
                          this.tableData[index].recyclePrice = this.recyclePrice;
                        } else if (i == "exchangePrice") {
                          this.tableData[index].exchangePrice = this.exchangePrice;
                        }
                    }
                //console.log(this.tableData);
              }
            }, (res) => {
                console.log(res.state);
            })
          },
          changeInfo (item, num, index) {
            //console.log(item);
            //console.log(item.smallClassId);
            for (let i in this.tableData[index]) {
              if (i == "dayPrice") {
                this.dayPrice = this.tableData[index].dayPrice;
              } else if (i == "lowestPrice") {
                this.lowestPrice = this.tableData[index].lowestPrice;
              } else if (i == "recyclePrice") {
                this.recyclePrice = this.tableData[index].recyclePrice;
              } else if (i == "exchangePrice") {
                this.exchangePrice = this.tableData[index].exchangePrice;
              }
            }
            this.classesId = item.smallClassId;
            this.toEditing = num;
            this.ind = index;
            //console.log(index);
          },
          tableRowClassName(row, index) {
            if (index === 1) {
              return 'info-row';
            } else if (index === 3) {
              return 'positive-row';
            }
            return '';
          },
          getGoldPrice () {
              let data = {
              }
              seekGoldPrice(data).then((res) => {
                  console.log(res);
                  console.log(res.data.data);
                  this.tableData = res.data.data;
                  let arr = [];
                  for (let i = 0; i < res.data.data.length; i++) {
                    var bigName = ''
                    bigName = res.data.data[i].bigClassName;
                    //console.log(res.data.data[i].smallDataList.length);
                    for (let j = 0; j < res.data.data[i].smallDataList.length; j++) {
                          //console.log(j);
                        var obj = {};
                        if (j == 0) {
                          obj.bigName = bigName;
                          obj.dayPrice = res.data.data[i].smallDataList[j].dayPrice;
                          obj.exchangePrice = res.data.data[i].smallDataList[j].exchangePrice;
                          obj.lowestPrice = res.data.data[i].smallDataList[j].lowestPrice;
                          obj.recyclePrice = res.data.data[i].smallDataList[j].recyclePrice;
                          obj.smallClassId = res.data.data[i].smallDataList[j].smallClassId;
                          obj.smallClassName = res.data.data[i].smallDataList[j].smallClassName;
                        } else {
                          obj.bigName = '';
                          obj.dayPrice = res.data.data[i].smallDataList[j].dayPrice;
                          obj.exchangePrice = res.data.data[i].smallDataList[j].exchangePrice;
                          obj.lowestPrice = res.data.data[i].smallDataList[j].lowestPrice;
                          obj.recyclePrice = res.data.data[i].smallDataList[j].recyclePrice;
                          obj.smallClassId = res.data.data[i].smallDataList[j].smallClassId;
                          obj.smallClassName = res.data.data[i].smallDataList[j].smallClassName;
                        }

                        arr.push(obj);
                      //console.log(obj);
                    }
                  }
                  this.tableData = arr;
                  this.tableData1 = arr;
                  //console.log(this.tableData);
              }, (res) => {
                  console.log(res);
              })
          },
          rowSpan () {

          }
    },
    mounted () {
      this.getGoldPrice();
    }
  }
</script>
<style lang="scss" scoped>
  .item-box{
    padding-bottom:20px;
  }
  .item-title{
    height:50px;

  }
  .item-title input {
    width:300px; border:2px #4fdcca  solid;
    background:#fff url("./../../../../assets/img/commonality/seek.png") no-repeat 10px center; padding-left:35px;
    height:40px; border-radius: 4px; margin:10px; margin-left:40px;
  }
  .el-table th>.cell {
    text-align: center;
  }
.item-box{
  table{
    width:90%;  border-radius: 4px; overflow: hidden; box-shadow:0 5px 20px rgba(0,0,0,0.3);
   padding:0; margin-top:20px; margin-left:20px;
  }
  table tr{width:100%; display: flex;}
  table tr:nth-child(odd) {background:#f6f7f8;}
  table tr:hover{background:#d2ecff;}
  table tr td:nth-child(1) {color:#4fdcca;}
  table tr th {flex:1; height:50px; background:#e6e6e6; line-height:50px; color:#666; font-size:16px; font-weight: bold;}
  table tr td {flex:1; text-align: center; height:50px; line-height:50px; font-size:14px; }
  table tr td input{  width:40px; height:30px; border:none; border-bottom:3px solid #4fdcca; padding-left:2px;
    background: #c1ddfb;}
  }
</style>
