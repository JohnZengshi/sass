<template>
  <div class="time-main">
      <div class="new-report-data">
        <div class="block until" data-txt="至">
          <el-date-picker class="mydatepicker" size="mini" type="date" @change="changeDate" v-model="optionData.beginTime" placeholder="选择开始时间" :picker-options="pickerOptions1"></el-date-picker>
        </div>
        <div class="block">
          <el-date-picker class="mydatepicker" size="mini" type="date" @change="changeDate" v-model="optionData.endTime" placeholder="选择结束时间" :picker-options="pickerOptions1"></el-date-picker>
        </div>
      </div>

    </div>
</template>
<script>
  import moment from 'moment'
  import {formattingEndTime, formattingTime} from 'assets/js/getTime'
  export default{
    data () {
      return {
        optionData: {
          beginTime: new Date(),
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