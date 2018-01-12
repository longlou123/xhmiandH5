<template>
	<div class="center">
		<div class="center_box">
			<section >
				<span>使用人 :</span>
				<input type="text"  name="" value="林达浪">
			</section>
			<section>
				<span>类型 :</span>
				<input type="text" name="" value="业主">
			</section>
			<section>
				<span>手机 :</span>
				<input type="text"  name="" value="13838381438">
			</section>
			<section>
				<span>生效日期 :</span>
				<input type="text" name="" value="2017 08-08 14:32">
			</section>
			<section>
				<span>失效日期 :</span>
				<input type="text" name="" value="2017 08-08 16:32">
			</section>
			<section>
				<span>授权门禁 :</span>
				<input type="text"  name="" value="中海华庭">
				<span></span>
				<input type="text"  name="" value="中海华庭东大门">
			</section>
			<section>
				<span>门卡状态 :</span>
				<input type="text" name="" value="失效">
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
			}
		},
		methods:{
			again(){
				this.$router.push({path:"/authorization"})
			}
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
			section{
				margin-bottom:0.7rem;
				span{
					display:inline-block;
					width: 1.5rem;
				}
				input{
				text-align:right;
				margin-left: 1.5rem;
				color:#BBBEC2;
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