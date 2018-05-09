<template>
  <p class="dynamics-time-main">
    <i></i>
    <span>{{NYR}}</span>
    <span>{{SF}}</span>
  </p>
</template>
<script>
  export default {
    props: ['NYR', 'SF']
  }
</script>
<style lang="scss">
@import "~assets/css/color.scss";
.dynamics-time-main{
  margin-left: 20px;
  span{
    margin-left: 10px;
    font-size: 12px;
    color: $font-color-neutral;
  }  
  i{
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
  }
}
</style>