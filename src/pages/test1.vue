<template>
  <div class="header">
    <div  class="div">    
      <button @click='test' type="">{{hand}}</button>
    </div>
    <div class="one">
       <p @click="go">11111</p>
    </div>
      <div class="two">
         <h1>2222244444</h1>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {DatetimePicker, Button, Toast} from 'mint-ui';//引入miti ui功能
  export default {
    name:'test',
    data(){
      return {
          hand:"我是测试的哟"
      }
    },
    methods:{
      test(){
        Toast({
          message: '提示',
          position: 'top',
          duration: 3000
        });
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
    font-size: 0.16rem;
  }
    .div {
      height:0.5rem; 
      text-align: center;
      line-height: 0.5rem;
      color: #000;
      font-size:0.2rem;
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