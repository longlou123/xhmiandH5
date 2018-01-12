<template>
	<div class="center">
		<ul class="list_ul">
			<li><p>徐柳飞</p><i class="time">12.12.12-12:12</i><span @click="sure"><Icon  type="chevron-right"></Icon></span></li>
			<li><p>徐飞飞</p><i class="time">12.12.13-12:12</i><span @click="sure"><Icon  type="chevron-right"></Icon></span></li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			vertical: 'apple'

		}
	},
	methods: {
		sure() {	
			alert(222)
			this.$router.push({path: ""})
		}
	}
}
</script>

<style lang="scss" scoped>
.center{
	width:7.5rem;
    	height: 13.34rem;
    	background-color:#EFf2f5;
    	padding-top:0.28rem;
    	.list_ul{
    		
    		li{
    			position: relative;
    			padding: 0 0.4rem;
    			height: 1.16rem;
    			width: 100%;
    			text-align: left;
    			border-bottom: 0.02rem solid lightgray;
    			p{
    				height: 0.62rem;
    				line-height: 0.62rem;
    				z-index: 1;
    			}
    			.time{
	    			color: darkgray;
	    			font-size: 0.24rem;
	    		}
	    		span{
    				display: inline-block;
	    			width: 0.6rem;
	    			height: 0.6rem;
	    			position: absolute;
	    			right: 5%;
	    			top: 25%;
	    			text-align: center;
	    			.ivu-icon-chevron-right{		    			
		    			font-size: 24px;
		    			z-index: 9999;		    		
		    		} 
	    		}  		
    		}  		  		 		
    	}
 	}

</style>