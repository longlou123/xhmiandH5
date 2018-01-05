<template>
  <div class="header">
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="doorCard">doorCard</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="management">management</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="project">project</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="management">management</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="activateCard">activateCard</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="callerNodepad">访客邀请记录</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="projectEmpower">访客邀请授权项目</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="doorEmpower">访客邀请授权门禁</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="twoDimension">访客邀请二维码</router-link></Button>

      
      
      
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
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
    // background: #f55947;
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