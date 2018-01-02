<template>	
		<div class="center">
			<div class="visitors">
				<div class="center_one">
					<span class="text_span">小五</span><span class="guest">访客</span>
					<div class="card">卡号：13738381438</div>
					<div class="time">有效期：2017-10-10至2017-10-11</div>
				</div>
			</div>
		</div>
</template>
<script >
  import {DatetimePicker, Button, Toast} from 'mint-ui';//引入miti ui功能
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
    .center{
    	width: 7.5rem;
    	height:13.34rem;
    	background-color:#EFf2f5;
    	padding-top:1.5rem;
    	.visitors{
    		width:7.5rem;
    		height:3.1rem;
    		background-color:#ffffff;
    		.center_one{
    			.text_span{
    				font-size:0.4rem;
    			}
    		}
    	}
    }
	
</style>