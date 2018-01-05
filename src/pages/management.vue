<template>	
		<div class="management">
			<div class="visitors">
				<div class="center_one">
					<div class="center_two" @click="jump">
						<span class="text_span">小五</span><span class="guest">访客</span>
					    <div class="card">卡号：13738381438</div>
					    <div class="time">有效期：2017-10-10至2017-10-11</div>
					</div>
					<button class="btn" @click="modal3 = true">注销</button>
				</div>
			</div>				
					<Modal  v-model="modal3">
        				    <p>注销将会无法使用门卡</p>
        				    <p>请确定是否进行删除</p>
    				</Modal>				
		</div>
</template>
<script >
  export default {
    name:'test',
    data(){
      return {
      	modal3: false,
      }
    },
    methods:{
    	jump(){
    		this.$router.push({path:"/details"});

    	}
    }
  }
</script>
<style lang="scss" scoped>
    .management{
    	width: 7.5rem;
    	height:13.34rem;
    	background-color:#EFf2f5;
    	padding-top:0.2rem;
    	.visitors{
    		width:7.5rem;
    		height:3.5rem;
    		background-color:#ffffff;
    		overflow:hidden;
    		box-shadow: 0px 5px 5px #E8EBF4;
    		.center_one{
    			text-align:left;
    			width:7rem;
    			height:2rem;
    			margin:0 auto;				
    			.center_two{
    				padding:0.3rem 0  0.4rem 0.3rem;
    				border-bottom:0.02rem solid #E0E0E1;
    				.text_span{
    				font-size:0.3rem;
    				color:#36A0FB;
    				padding-right:0.25rem;
    			   	}
    			   	.time{
    			   		font-size:0.3rem;
    			   	}
    			    	.card{
    			    		margin:0.3rem 0;
    			    		font-size:0.3rem;
    			    		}
    			    	.guest{
    						font-size:0.24rem;
    			  			}
    					}
    			
    			.btn{
    				float:right;
    				width:1.4rem;
    				height:0.6rem;
    				color:#ffffff;
    				outline:none;
    				border:none;
    				background-color:#5698FF;
    				border-radius:0.1rem;
    				margin-top:0.12rem;
    				margin-right:0.2rem;
    			}
    		}
    	}
    	.deletes{
    		
    	}   	
    }
	
</style>