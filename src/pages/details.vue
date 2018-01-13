<template>
	<div class="center">
		<div class="center_box">
			  <section>
				<span>使用人 :</span>
				<i>{{name}}</i>
			</section>
			<section>
				<span>类型 :</span>
				<i>{{type}}</i>
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
				<span>授权门禁 :</span>
				<i  v-for="item in doors">{{item.doorName}}</i>
			</section>
			<section>
				<span>门卡状态 :</span>
				<i>{{isCancel}}</i>
			</section>
    		 <div class="next_btn">
        		<Button type="primary" @click="again">重新发卡</Button>
        		<Button type="primary"  @click="modal3 = true">删除信息</Button>
    		</div>
    			<Modal  v-model="modal3" class="modal">
        				  <p>注销将会删除账号信息</p>
        				  <p>请确定是否进行删除</p>
    			</Modal>
		</div>		
	</div>	 
</template>
<script >
import Vue from 'vue'
import {getStore} from '@/script/util'
	export default {
		// name:"test",
		data(){
			return{
				modal3:false,
				datas:{},
				data:{},
				doors:null,
				newData:{},
				name:null,
				type:null,
				phone:null,
				startTime:null,
				endTime:null,
				isCancel:null,
				num:null,
				door:null
			}
		},
		mounted(){
			this.add();
		},
		methods:{
			again(){
				this.$router.push({path:"/authorization"})
			},
			add() {
			// this.datas = this.$route.query.value;
			// console.log();
			// JSON.stringify(this.$route.query.value)
			// this.datas =getStore("userData");
			this.num=this.$route.query.value;
			this.data=JSON.parse(getStore("userData"));
			console.log(this.data);
			this.name=this.data[this.num].name;
			console.log(this.data[this.num].type);
		
			this.phone=this.data[this.num].phone;
			this.startTime=this.data[this.num].startTime;
			this.endTime=this.data[this.num].endTime;
			this.doors= JSON.parse(this.data[this.num].doors)
			console.log(this.data[this.num].isCancel)
			if(this.data[this.num].isCancel){
				this.isCancel="有效"
			}else{
				this.isCancel="失效"
			}
		},
		}
	}
</script>
<style lang="scss" scoped>
	.center{
		background-color:#EFF2F5;
		padding-top:0.2rem;
		.center_box{
			width:7.5rem;
			height:8.76rem;
			background-color:#ffffff;
			padding:0.6rem  0 ;
			section {
				margin-bottom: 0.6rem;
				span{
					display: inline-block;
					width: 2.4rem;
					text-align: left;
				}
				i{
					display: inline-block;
					text-align: right;
					width: 3.2rem;
					margin-left: 0.7rem;
					color: darkgrey;
				}
				.ivu-icon-share:before{
					font-size: 0.7rem;
				}
			}
		}
		.next_btn{
            position: fixed;
            bottom: 0.8rem;
            width: 6.2rem;
            left: 60%;
            transform: translateX(-50%);
            margin-left:-0.2rem;	
                span{
                     font-size: 0.3rem;
                        color: #fff;
                }
                button{
                	margin-right:1rem;
                }
            }
		}
</style>