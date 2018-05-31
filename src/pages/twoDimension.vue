<template>
	<div class="center">
		<div class="content">
			<div class="img">
				<div id="qrcode"></div>
			</div>
			<div>
				<p class="name">{{name}}</p>
			</div>
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
import { MessageBox } from 'mint-ui';
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
	},
	methods: {
		gitData(id) {
			this.$get('/ssh/grantCard/getGrantQRById', {
				"id": id,
			}).then(res => {
        if(res.errorCode === 200){
          this.name = res.result.name;
          this.codeData = res.result.codeData;
          this.qrcode.makeCode(this.codeData);
          this.startTime = res.result.startTime;
          this.endTime = res.result.endTime;
          this.useCount = res.result.useCount==0?'次数不限':res.result.useCount
          this.showQr(this.codeData);
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
        }else{
          MessageBox('提示', res.message);
        }
			}).catch(function(error) {
				console.log(error);
			});
		},
		showQr(data) {
      new QRCode(document.getElementById("qrcode"), {
        text: data, // 内容
        width: 274, // 宽度
        height: 250, // 高度，包含标题高 50px
        colorDark: "#000000", // 深色
        colorLight: "#ffffff", // 浅色
        logo:"static/logo.png", // LOGO
        logoWidth: 40, //
        logoHeight: 30,
        correctLevel: QRCode.CorrectLevel.H // 纠错级别， L, M, Q, H
      });
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
			// border: 0.02rem solid #000000;
		}
  }
    .name{
    	display: inline-block;
    	width:100%;
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
