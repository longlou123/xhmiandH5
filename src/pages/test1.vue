<template>
  <div class="header">
    <div  class="div">    
      <button @click='test' type="">{{hand}}</button>
    </div>
    <div class="one">
       <p @click="go">11111</p>
    </div>
      <div class="two">
         <h1>22222</h1>
      </div>
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
      },
      go(){
        this.$router.push({ path: '/test2'});
      }
    }
  }

</script>
<style lang="scss" scoped>
  .header {
    /*position: fixed;*/
    z-index: 99;
    width: 100%;
    background: #f55947;
    height: 3rem;
    font-size: 16px;
  }
    .div {
      height:50px; 
      text-align: center;
      line-height: 50px;
      color: #000;
      font-size: 16px;
      button{
        background: #fff;
      }
    }
  .one{
    width:1rem;
    height:1rem;
    background:#fff;
  }
  .two{
    width:5rem;
    height:5rem;
    background: #ADFF2F;
  }

</style>