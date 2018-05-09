<template>
  <div class="item-box">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <th>产品大类</th>
          <th>产品类别</th>
          <th>默认折扣</th>
          <th>最低折扣</th>
        </tr>
        <tr v-for="(item, index) in tableData">
          <td><span>{{item.searchType}}</span></td>
          <td @click="changeInfo(item, 4, index)"><input v-focus="flag" v-if="toEditing === 4 && ind == index" type="text" @blur="blurAndUp(index)" v-model="className" onfocus="this.select()"/><span v-else>{{item.className}}</span></td>
          <td @click="changeInfo(item, 5, index)"><input v-focus="flag" v-if="toEditing === 5 && ind == index" type="text" @blur="blurAndUp(index)" v-model="defaultDiscount" onfocus="this.select()"/><span v-else>{{item.defaultDiscount}}</span>%</td>
          <td @click="changeInfo(item, 6, index)"><input v-focus="flag" v-if="toEditing === 6 && ind == index" type="text" @blur="blurAndUp(index)" v-model="lowestDiscount" onfocus="this.select()"/><span v-else>{{item.lowestDiscount}}</span>%</td>
        </tr>
      </table>
  </div>
</template>

<script>
  import {seekGetDiscount} from './../../../../Api/commonality/seek'
  import {modifyDiscount} from './../../../../Api/commonality/operate'
  export default {
    data () {
      return {
        toEditing: 0,
        tableData: [],
        classesId: '',
        className: '',
        defaultDiscount: 0,
        lowestDiscount: 0,
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
      blurAndUp (index) {
        this.toEditing = 0;
        let options = {
          "updateList": [{
            "classesId": this.classesId,
            "defaultDiscount": this.defaultDiscount,
            "lowestDiscount": this.lowestDiscount,
          }]
        }
        console.log(options);
        modifyDiscount(options).then((res) => {
          if (res.data.state == 200) {
          for (let i in this.tableData[index]) {
              console.log(i);
            if (i == "defaultDiscount") {
              this.tableData[index].defaultDiscount = this.defaultDiscount;
            } else if (i == "lowestDiscount") {
              this.tableData[index].lowestDiscount = this.lowestDiscount;
            } else if (i == "className") {
              this.tableData[index].className = this.className;
            }
          }
          console.log(this.tableData);
        }
        }, (res) => {
          console.log(res.state);
        })
      },
      changeInfo (item, num, index) {
        //console.log(item);
        //console.log(item.smallClassId);
        for (let i in this.tableData[index]) {
          if (i == "defaultDiscount") {
            this.defaultDiscount = this.tableData[index].defaultDiscount;
          } else if (i == "lowestDiscount") {
            this.lowestDiscount = this.tableData[index].lowestDiscount;
          } else if (i == "className") {
            this.className = this.tableData[index].className;
          }
        }
        this.classesId = item.classId;
        this.toEditing = num;
        this.ind = index;
        //console.log(index);
      },
      getDiscount () {
        let option = {
            "searchType": 1
        }
        seekGetDiscount(option).then((res) => {
          console.log(res);
          let arr = [];
          for (let i = 0; i < res.data.data.length; i++) {
            var searchType = ''
            searchType = res.data.data[i].searchType;
            //console.log(res.data.data[i].smallDataList.length);
            for (let j = 0; j < res.data.data[i].smallDataList.length; j++) {
              //console.log(j);
              var obj = {};
              if (j == 0) {
                if (searchType == "2") {
                  obj.searchType = "珠宝";
                } else if (searchType == "3") {
                  obj.searchType = "饰品";
                }
                obj.className = res.data.data[i].smallDataList[j].className;
                obj.defaultDiscount = res.data.data[i].smallDataList[j].defaultDiscount;
                obj.lowestDiscount = res.data.data[i].smallDataList[j].lowestDiscount;
                obj.classId = res.data.data[i].smallDataList[j].classId;

              } else {
                obj.searchType = '';
                obj.className = res.data.data[i].smallDataList[j].className;
                obj.defaultDiscount = res.data.data[i].smallDataList[j].defaultDiscount;
                obj.lowestDiscount = res.data.data[i].smallDataList[j].lowestDiscount;
                obj.classId = res.data.data[i].smallDataList[j].classId;
              }

              arr.push(obj);
              //console.log(obj);
            }
          }
          this.tableData = arr;
          console.log(this.tableData);
        }, (res) => {
          console.log(res);
        })
      }
    },
    mounted () {
      this.getDiscount();
    }
  }
</script>
<style lang="scss" scoped>
  .item-box{
  }
  .item-title{
    height:50px;

  }
  .item-box{
  table{
    width:90%; border-radius: 4px; overflow: hidden; box-shadow:0 5px 20px rgba(0,0,0,0.3);
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
