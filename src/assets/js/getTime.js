export const GetDateStr = function(AddDayCount) { // 获取某天的时间值
  var today = new Date();
  today.setDate(today.getDate() + AddDayCount); // 获取AddDayCount天后的日期
  var y = today.getFullYear();
  var m = today.getMonth() + 1; // 获取当前月份的日期
  var d = today.getDate();
  return `${y}-${m}-${d}`;
}

export const GetDateYR = function(AddDayCount) { // 获取某天的时间值
  var today = new Date();
  today.setDate(today.getDate() + AddDayCount); // 获取AddDayCount天后的日期
  var y = today.getFullYear();
  var m = today.getMonth() + 1; // 获取当前月份的日期
  var d = today.getDate();
  return `${m}-${d}`;
}

export const stringTime = function(AddDayCount) {
  var today = new Date();
  today.setDate(today.getDate() + AddDayCount); // 获取AddDayCount天后的日期
  var N = today.getFullYear();
  var Y = today.getMonth() + 1; //获取当前月份的日期
  var R = today.getDate();
  var S = today.getHours();
  var F = today.getMinutes();
  var M = today.getSeconds();
  if (Y.toString().length == 1) {
    Y = `0${Y}`
  }
  if (S.toString().length == 1) {
    S = `0${S}`
  }
  if (R.toString().length == 1) {
    R = `0${R}`
  }
  if (F.toString().length == 1) {
    F = `0${F}`
  }
  if (M.toString().length == 1) {
    M = `0${M}`
  }
  return `${N}${Y}${R}${S}${F}${M}`;
}

export const GetNYR = function(AddDayCount) {
  if (AddDayCount) {
    return `${AddDayCount.slice(0, 4)}-${AddDayCount.slice(4, 6)}-${AddDayCount.slice(6, 8)}`
  }
}

export const GetChineseNYR = function(AddDayCount) {
  if (AddDayCount) {
    return `${AddDayCount.slice(0, 4)}年${AddDayCount.slice(4, 6)}月${AddDayCount.slice(6, 8)}日`
  }
}

export const GetSF = function(AddDayCount) {
  if (AddDayCount) {
    return `${AddDayCount.slice(8, 10)}:${AddDayCount.slice(10, 12)}`
  }
}

export const GetMonth = function() { // 获取上个月的开始和结束
  var lastMonthDate = new Date(); //上月日期
  var nowYear = lastMonthDate.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0;

  var lastMonth = lastMonthDate.getMonth();

  //格式化日期：yyyy-MM-dd
  function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
  }

  //获得某月的天数
  function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }

  //获得上月开始时间
  function getLastMonthStartDate() {
    var lastMonthStartDate = new Date(nowYear, lastMonth - 1, 1);
    return formatDate(lastMonthStartDate);
  }

  //获得上月结束时间
  function getLastMonthEndDate() {
    var lastMonthEndDate = new Date(nowYear, lastMonth - 1, getMonthDays(lastMonth - 1));
    return formatDate(lastMonthEndDate);
  }

  let timeData = {
    startTime: getLastMonthStartDate(),
    endTime: getLastMonthEndDate()
  }
  return timeData
}

export const GetNewMonth = function() { // 获取当个月的开始和结束
  var today = new Date();
  today.setDate(today.getDate() + 0); // 获取AddDayCount天后的日期
  var N = today.getFullYear();
  var Y = today.getMonth() + 1; //获取当前月份的日期
  var R = today.getDate();
  var S = today.getHours();
  var F = today.getMinutes();
  var M = today.getSeconds();

  if (Y.toString().length == 1) {
    Y = `0${Y}`
  }

  if (S.toString().length == 1) {
    S = `0${S}`
  }

  if (R.toString().length == 1) {
    R = `0${R}`
  }

  if (F.toString().length == 1) {
    F = `0${F}`
  }

  if (M.toString().length == 1) {
    M = `0${M}`
  }

  let timeData = {
    startTime: `${N}${Y}01000000`,
    endTime: `${N}${Y}${R}${S}${F}${M}`,
    newD: Y
  }
  return timeData
}

export const getMonthStart = function(AddDayCount) { // 获得本月的开始日期
  let now = new Date()
  let nowMonth = now.getMonth()
  let nowYear = now.getYear()
  nowYear += (nowYear < 2000) ? 1900 : 0
  return new Date(nowYear, nowMonth, 1)
}

export const formattingXjTime = function(parm) { // 格式化西金的时间--到日
  if (parm) {
    let year = parm.substring(0, 4)
    let month = parm.substring(5, 7)
    let data = parm.substring(8, 10)
    return year + month + data + '000000'
  }
}

export const formattingTime = function(parm) { // 格式化时间开始
  if (!parm) {
    return ''
  }
  var N = parm.getFullYear()
  var Y = parm.getMonth() + 1 // 获取当前月份的日期
  var R = parm.getDate()
  if (Y.toString().length == 1) {
    Y = `0${Y}`
  }
  if (R.toString().length == 1) {
    R = `0${R}`
  }
  return `${N}${Y}${R}000000`
}

export const xjEndTime = function(parm) { // 格式化时间结束
  if (!parm) {
    return ''
  }
  var N = parm.getFullYear()
  var Y = parm.getMonth() + 1 // 获取当前月份的日期
  var R = parm.getDate()
  if (Y.toString().length == 1) {
    Y = `0${Y}`
  }
  if (R.toString().length == 1) {
    R = `0${R}`
  }
  return `${N}${Y}${R}235959`
}

export const formattingEndTime = function(parm) { // 当日结束时间
  if (!parm) {
    return ''
  }
  var N = parm.getFullYear()
  var Y = parm.getMonth() + 1 // 获取当前月份的日期
  var R = parm.getDate()
  if (Y.toString().length == 1) {
    Y = `0${Y}`
  }
  if (R.toString().length == 1) {
    R = `0${R}`
  }
  return `${N}${Y}${R}235959`
}
// 装换20180814000000格式为new date时间
export const restoreTime = function(parm) {
  if (parm) {
    // let year = parm.substring(0, 4)
    // let month = parm.substring(5, 7)
    // let data = parm.substring(8, 10)
    // let today = new Date()
    // today.setFullYear(year)
    // today.setMonth(month)
    // today.setDate(data)

    var year = parm.substring(0, 4)
    var month = parm.substring(4, 6)
    var data = parm.substring(6, 8)
    var d = new Date()
    d.setFullYear(year,Number(month) -1,data)
    return d
  }
  return ''
}