<template>
	<div class="center">
		<div class="center_box">
			  <section>
				<span>使用人 :</span>
				<i>{{data.name}}</i>
			</section>
			<section>
				<span>类型 :</span>
				<i>{{data.type}}</i>
			</section>
			<section>
				<span>手机 :</span>
				<i>{{data.phone}}</i>
			</section>
			<section>
				<span>生效日期 :</span>
				<i>{{data.startTime}}</i>
			</section>
			<section>
				<span>失效日期 :</span>
				<i>{{data.endTime}}</i>
			</section>
			<section>
				<span>授权门禁 :</span>
				<i>中海华庭东大门</i>
				<span></span>
				<i>中海华庭东大门</i>
			</section>
			<section>
				<span>门卡状态 :</span>
				<i>失效</i>
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
		name:"test",
		data(){
			return{
				input:'',
				input1:'',
				input2:'',
				input3:'',
				input4:'',
				input5:'',
				input6:'',
				input7:'',
				modal3:false,
				datas:{},
				data:{}
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
			this.datas =getStore('userData');
			console.log(this.datas)
			this.data=JSON.parse(this.datas);
			console.log(this.data);
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