<template>
  <div class="header">
    <div @click='test'>{{hand}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {DatetimePicker, Button, Toast} from 'mint-ui';
  export default {
    name:'test',
    data(){
      return {
            hand:"我是测试的哟"
      }
    },
    methods:{
      test(){
        Toast('我是Tip');
      }
    }
  }

</script>
<style scoped>
  .header {
    /*position: fixed;*/
    z-index: 99;
    width: 100%;
    background: #f55947;
    height: 3rem;
    font: {
      size: 1.2rem;
      weight: 100;
    }
  ;
    div {
      text-align: center;
      line-height: 3rem;
      color: #fff;
      font: {
        weight: 300;
      }
    ;
    }
  }

</style>