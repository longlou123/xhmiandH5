<template>
	<div class="big_div">
		<div class="header"></div>
		<div class="center"></div>
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
.big_div{
	width:100%;
	height:100%;
}
</style>