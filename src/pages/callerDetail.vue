<template>
	<transition name="fade">
	<div class="center">
		<div class="center_box">
			<section>
				<span>姓名 :</span>
				<i>{{name}}</i>
			</section>
			<section>
				<span>手机 :</span>
				<i>{{phone}}</i>
			</section>
			<section>
				<span>生效日期 :</span>
				<i>{{startTime}}</i>
			</section>
			<section>
				<span>失效日期 :</span>
				<i>{{endTime}}</i>
			</section>
			<section>
				<span>有效次数 :</span>
				<i>{{useCount}}</i>
			</section>
			<section>
				<span class="door">授权门禁 :</span>
				<i>
					<ul>
						<li class="doorList" v-for="doorname in doors">{{doorname.doorName}}</li>
					</ul>
				</i>
			</section>
			<section>
				<span>二维码状态 :</span>
				<i>{{status}}</i>
			</section>
			<section>
				<span>二维码生成时间 :</span>
				<i>{{createTime}}</i>
			</section>
			<section @click="share">
				<span></span>
				<Icon type="share"></Icon>
			</section>
		</div>
	</div>
	</transition>
</template>
<script>
	import {getStore} from '@/script/util'
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				input: '',
				name:null,
				phone:null,
				startTime:null,
				endTime:null,
				useCount:null,
				data:null,
				status:null,
				createTime:null,
				doors:null,
				num:null,
				Id:null,
				id:null,
				isAndroid: false,
        isiOS: false,
			}
		},
		mounted() {
			this.newData();
		},
		computed: {
			...mapState(['userName'])
		},
		methods: {
			judgePhone(){
		        var u = navigator.userAgent;
		        this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		        this.iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		     },
	      	share() {
	      		this.judgePhone();
	      		if(this.isAndroid && !this.iOS){
	      			jsObj.twoDimensionCode("http://202.105.96.131:3002/sendCard/#/twoDimension?id="+this.id);
	      		}else if(!this.isAndroid && this.iOS){
	      			 window.webkit.messageHandlers.passValue.postMessage("http://202.105.96.131:3002/sendCard/#/twoDimension?id="+this.id);
	      		}else{}
			},
			newData(){
				this.data = JSON.parse(getStore("userData"));
				//console.log(this.data);
				this.num=this.$route.query.value;
				this.id = this.data[this.num].id //要分享的id
				this.name= this.data[this.num].name;
				this.phone = this.data[this.num].phone;
				this.startTime = this.data[this.num].startTime;
				this.endTime =  this.data[this.num].endTime;
				this.useCount = this.data[this.num].useCount;
				this.Id = this.data[this.num].Id;
				this.doors= JSON.parse(this.data[this.num].doors);
				var crea = this.data[this.num].createTime;
				var date = new Date(crea);
				var Y = date.getFullYear();
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
				var D = date.getDate() ;
				var h = date.getHours() ;
				if(h<10){h = "0"+ h;}
				var m = date.getMinutes()
				if(m<10){m = "0"+ m;}
				var s = date.getSeconds();
				if(s<10){s = "0"+ s;}
				this.createTime = Y+'/'+M+'/'+D+' '+h+':'+m+':'+s;
				if(new Date()> new Date(this.data[this.num].endTime)){
					this.status = '无效'
				}else{
					this.status = '有效'
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.center {
		background-color: #EFF2F5;
		padding-top: 0.2rem;
		.center_box {
			width: 7.5rem;
			background-color: #ffffff;
			padding: 0.6rem 0 0 0;
			section {
				margin-bottom: 0.6rem;
				span{
					display: inline-block;
					width: 2.4rem;
					text-align: left;
				}
				.door{
					vertical-align: top;
				}
				i{
					display: inline-block;
					text-align: right;
					width: 3.4rem;
					margin-left: 0.7rem;
					color: darkgrey;
					.doorList{
						color: darkgray;
					}
					span{
						float: left;
					}
				}
				.ivu-icon-share:before{
					font-size: 0.7rem;
				}
				.ivu-icon-share:active{
					color: rgba(211,211,211,0.8);
				}
			}
		}
		.next_btn {
			position: fixed;
			bottom: 0.8rem;
			width: 6.2rem;
			left: 60%;
			transform: translateX(-50%);
			span {
				font-size: 0.3rem;
				color: #fff;
			}
			button {
				margin-right: 1rem;
			}
		}
		.modal {}
	}
</style>
