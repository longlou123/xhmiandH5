<template>
	<div class="center">
		<div class="content">
			<div class="img">
				<div id="imgBox"></div>
				<!--<img src="../images/8888.jpg" alt="" />-->
			</div>
			<p class="name">{{name}}</p>
			<div class="message">
				<div class="left">
					<p>二维码生成时间:</p>
					<p>二维码有效时间:</p>
					<p></p>
					<p></p>
					<p>有效进出次数：</p>
				</div>
				<div class="right">
					<p>{{createTime}}</p>
					<p>{{startTime}}</p>
					<p>至</p>
					<p>{{endTime}}</p>
					<p>{{useCount}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
	data() {
		return {
			vertical: 'apple',
			btnText: '分享',
			qrcode:null,
			imgBox:null,
			name:null,
			codeData:'',
			startTime:null,
			endTime:null,
			createTime:null,
			useCount:null,
		}
	},
	mounted() {
		this.gitData(this.$route.query.id)
		this.imgBox = document.getElementById("imgBox");
		this.qrcode = new QRCode(this.imgBox, {
			width : 274,
			height :250
		});
	},
	methods: {
		gitData(id) {
			this.$get('/ssh/grantCard/getGrantQRById', {
				"id": id,
			}).then(res => {
				//console.log(res.result);
				this.name = res.result.name;
				this.codeData = res.result.codeData;
				this.qrcode.makeCode(this.codeData);
				this.startTime = res.result.startTime;
				this.endTime = res.result.endTime;
				this.useCount = res.result.useCount
				var date = new Date(res.result.createTime);
				var Y = date.getFullYear();
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
				var D = date.getDate() ;
				var h = date.getHours() ;
				if(h<10){h = "0"+ h;}
				var m = date.getMinutes()
				if(m<10){m = "0"+ m;}
				var s = date.getSeconds();
				if(s<10){s = "0"+ s;}
				this.createTime = Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
			}).catch(function(error) {
				console.log(error);
			});
		},
		makeCode () {


		}

	}
}
</script>

<style lang="scss" scoped>
.center{
	width:100%;
  height: 100%;
    	background-color:#EFf2f5;
    padding-top:0.20rem;
    .content{
    		height: 9.6rem;
    		width: 100%;
    		background-color: white;
    }
    .img{
    		width: 100%;
    		height: 5.8rem;
    		padding: 0.45rem 1rem;
    		#qrcode{
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
   }

</style>
