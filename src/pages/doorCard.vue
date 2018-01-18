<template>
  <transition name="fade">
	<div class="big_div">
		<div class="center">
			<div class="door_text"></div>
			<img class="door_img" src="../images/dragon.png">
		   </div>
	</div>
   </transition>
</template>
<script>
  export default {
    name:'test',
    data() {
      return {
      }
    },
    methods:{
    }
  }
</script>
<style lang="scss" scoped>
.big_div{
	.center{
			background-color:#EFf2f5;
	    padding-top:2.3rem;
		.door_text{
			width:2.96rem;
			height:0.29rem;
			background-image:url(../images/text.png);
			background-size:100% 100%;
			margin:0 auto;
			margin-bottom:0.5rem;
		}
		.door_img{
			width:1.76rem;
			height:1.19rem;
			background-size:100% 100%;
			margin:0 auto;
		}
	}
}
</style>
