<template>
    <div class="xj-time-box">
      <div class="time-inner">
        <div class="block until">
            <el-date-picker size="mini" v-model="optionData.beginTime"  type="date" placeholder="选择开始时间" :picker-options="pickerOptions1"></el-date-picker>
        </div>
        <span class="center-tit">至</span>
        <div class="block">
            <el-date-picker size="mini" v-model="optionData.endTime" type="date" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
        </div>
      </div>
    </div>
</template>
<script>
  import moment from 'moment'
  import {formattingEndTime, formattingTime} from 'assets/js/getTime'
  import {getMonthStart} from 'assets/js/getTime'
  export default{
    props: ['isMonth'],
    data () {
      return {
        optionData: {
          beginTime: this.isMonth ? getMonthStart() : new Date(),
          endTime: new Date()
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    mounted() {
      this.changeDate()
      // this.optionData.beginTime = moment().startOf("month").format("YYYY-MM-DD") + " 00:00:00"
      // this.optionData.endTime = moment().format("YYYY-MM-DD") + " 23:59:59"
    },
    methods: {
      changeDate () {
        this.$emit('change', {
          beginTime: formattingTime(this.optionData.beginTime),
          endTime: formattingEndTime(this.optionData.endTime)
        })
      }
    }
  }
</script>