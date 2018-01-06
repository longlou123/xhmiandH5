<template>
	<div class="center">
		<div class="content">
			<div class="img">
				<img src="../images/8888.jpg" alt="" />
			</div>
			<p class="name">big楼</p>
			<div class="message">
				<div class="left">
					<p>二维码生成时间:</p>
					<p>二维码有效时间:</p>
					<p></p>
					<p></p>
					<p>有效进出次数：</p>
					<p>剩余进出次数：</p>
				</div>
				<div class="right">
					<p>2017.07.01--11：11</p>
					<p>2017.07.01--11：11</p>
					<p>至</p>
					<p>2017.07.02--11：11</p>
					<p>5次</p>
					<p>5次</p>
				</div>
				<div class="next_btn">
			        <Button type="primary" :long="true" class="btn" @click="nextClick()">{{btnText}}</Button>
			    </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			vertical: 'apple',
			btnText: '下一步',

		}
	},
	methods: {
		sure() {	
			this.$router.push({path: ""})
		},
		nextClick(){
	    
	    },
	}
}
</script>

<style lang="scss" scoped>
.center{
	width:100%;
    	background-color:#EFf2f5;
    padding-top:0.20rem;
    .content{
    		height: 10rem;
    		width: 100%;
    		background-color: white;
    }
    .img{
    		width: 100%;
    		height: 5.8rem;
    		padding: 0.45rem 1rem;
    		img{
    			width: 100%;
    			height: 4.8rem;
    			border: 0.02rem solid #000000;
    		}
    }
    .name{
    	font-size: 0.38rem;
    }
    .message{   		
    		    height: 3.4rem;
    		    width: 100%;
    		    margin: 0.1rem 0;
    		p{
    			height: 0.55rem;
    			width: 100%;
    			color: darkgrey;
    		}
    		.left{
    			width: 50%;
    			height: 3.4rem;
    			display: inline-block;
    		}
    		.right{
    			width: 50%;
    			height: 3.4rem;
    			display: inline-block;
    		}
    }
    .next_btn{
            position: fixed;
            bottom: 0.8rem;
            width: 6.2rem;
            left: 50%;
            transform: translateX(-50%);
       }
   }

</style>