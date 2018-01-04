<template>	
		<div class="center">
			<div class="visitors">
				<div class="center_one">
					<div class="center_two" @click="jump">
						<span class="text_span">小五</span><span class="guest">访客</span>
					    <div class="card">卡号：13738381438</div>
					    <div class="time">有效期：2017-10-10至2017-10-11</div>
					</div>
					<button class="btn" @click="show_yes">注销</button>
				</div>
			</div>
				<div class="delete" v-show="show">
					<div>注销将会无法使用门卡</div>
					<div class="delete_text">请确定是否进行删除</div>
					<div class="btn_box">
						<button class="btn1">取消</button>
						<div class="bar"></div>
					    <button class="btn2" >确定</button>	
					</div>	
				</div>
		</div>
</template>
<script >
  export default {
    name:'test',
    data(){
      return {
      	show:false,
      }
    },
    methods:{
    	show_yes(){
    		this.show=true;
    	},
    	jump(){
    		this.$router.push({path:"/details"});

    	}
    }
  }
</script>
<style lang="scss" scoped>
    .center{
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
    	.delete{
    		padding:0.2rem 0.5rem;
    		width: 4.48rem;
    		height:1.94rem;
    		background-color:#ffffff;
    		margin:auto auto;
    		box-shadow: 0px 5px 5px #E8EBF4;
    		div{
    			font-size:0.32rem;
    		    color:#8DB9FE;
    		}
    		.delete_text{
    			padding-bottom:0.2rem;
    			border-bottom:0.02rem solid #EFF1F4;
    		}
    		.btn_box{
    			margin-top:0.05rem;
    			display:flex;
    			justify-content: space-around;
    			button{
    			background-color:transparent;
    			font-size:0.32rem;
    			color:#C0C0C1;			
    		}
    		}
    		.bar{
    			display:inline-block;
    			width:0.02rem;
    			height:0.5rem;
    			background-color:#EFF1F4;
    		}
    	}   	
    }
	
</style>