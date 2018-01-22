<template>
  <div class="header">
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/doorCard">doorCard</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/management">management</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/project">project</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/activateCard">activateCard</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/callerInvite">访客邀请</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/callerNodepad">访客邀请记录</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/twoDimension?id=2">访客邀请二维码</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/authorization">授权门卡</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/details">门卡详情</router-link></Button>
      <a href="tel:18312583532">一键拨打号码</a>
      <a id="send_message" href="sms:10086?body=呵呵这是问号">一键发送短信</a>
  </div>
</template>

<script>
  export default {
    data(){
      return {
          hand:"我是测试的哟",
          isAndroid: false,
          isiOS: false,
      }
    },
    mounted(){
      // this.setMessage();
    },
    methods:{
      test(){

      },
      judgePhone(){
        var u = navigator.userAgent;
        this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        this.iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      },
      setMessage(){
        this.judgePhone();
        var sendMessage = document.getElementById('send_message');
        if(this.isAndroid && !this.iOS){
          sendMessage.href = "sms: 10086?body=我是安卓，百度的网站是www.baidu.com";
        }else if(!this.isAndroid && this.iOS){
          sendMessage.href = "sms: 10086&body=我是iOS，百度的网站是www.baidu.com";
        }else{
        }
      },
      go(){
        this.$router.push({ path: '/'});
      }
    }
  }

</script>
<style lang="scss" scoped>
  .header {
    /*position: fixed;*/
    height: 100%;
    z-index: 99;
    width: 100%;
    // background: #f55947;
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
