<template>
  <div class="header">
    <div  class="div">    
      <button  type="">{{hand}}</button>
    </div>
    <div class="one">
       <p @click="go">11111222222</p>
    </div>
      <div class="two">
        <!--<Slider v-model="value" range></Slider>-->
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'test',
    data(){
      return {
          hand:"我是测试的哟",
      }
    },
    methods:{
      test(){
      	
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