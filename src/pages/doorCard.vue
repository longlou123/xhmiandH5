<template>
	<div class="big_div">
		<div class="center">
			<div class="door_text"></div>
			<div class="door_img"></div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
  
  export default {
    name:'test',
    data(){
      return {
      }
    },
    methods:{
    }
  }

</script>
<style lang="scss" scoped>
html,body{
	width:7.5rem;
	height:13.34rem;
}
.big_div{
	width:7.5rem;
	height:13.34rem;
	.center{
		width:7.5rem;
	    height:13.34rem;
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
			background-image:url(../images/dragon.png);
			background-size:100% 100%;
			margin:0 auto;
		}
	}
}
</style>