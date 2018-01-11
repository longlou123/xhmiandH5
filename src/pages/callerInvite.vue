<template>
	<div class="center">
		<div class="scoll">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
				<FormItem label="姓名 :" prop="name">
					<Input v-model="formValidate.name" placeholder=""></Input>
				</FormItem>
				<FormItem label="类型 :" prop="type">
					<Select v-model="formValidate.type" placeholder="请选择">
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				<FormItem label="手机 :" prop="phone">
					<Input v-model="formValidate.phone" placeholder=""></Input>
				</FormItem>
				<mt-datetime-picker v-model="pickerValue" type="date" ref="picker" year-format=" {value} 年" month-format=" {value} 月" date-format=" {value} 日" :startDate="this.time" @confirm="nowTis">
				</mt-datetime-picker>
				<div @click="starTime">
					<FormItem label="生效日期 :" prop="star_time" >
						<Input  placeholder="请填写生效时间" v-model="formValidate.star_time" readonly='readonly'></Input>
					</FormItem>
				</div>
				
				<div @click="endTime">
					<FormItem label="失效日期 :" prop="end_time" ><!--prop="lose"-->
						<Input placeholder="请填写失效时间"  v-model="formValidate.end_time" readonly='readonly'></Input>
					</FormItem>
				</div>		
				 <FormItem label="有效次数 :" prop="data">
					<Select v-model="formValidate.data" placeholder="请选择">
						<Option value="one">1次</Option>
						<Option value="two">2次</Option>
						<Option value="three">3次</Option>
						<Option value="four">4次</Option>
						<Option value="fift">5次</Option>
					</Select>
				</FormItem>
			</Form>
			<div class="door_stop">
				<div class="text">授权门禁:</div>
				<div class="flex">
					<ul class="door_box" v-for='(name,index) in projectPage'>
						<li>
							<span>{{name}}</span>
							<div class="detele" @click="Delete(index)">
								<Icon type="ios-close"></Icon>
							</div>
						</li>
						
					</ul>
					<div class="door_box" v-if='add'>
   		 				<div class="Icon ">
   		 					<span @click="sure">
   		 						<Icon type="ios-plus-outline" class='Icons'></Icon>
   		 					</span>
   		 				</div>
   		 	 	 	</div>
				</div>
			</div>
		</div>
		<div class="btn" @click="handleSubmit('formValidate')">
			<button type="primary" shape="circle" :long="true">确定邀请</button>
		</div>
	</div>

</template>
<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		name: 'test',
		data() {
			return {
				formValidate: {
					name: '',
					type:'',
					phone: '',
					star_time: '',
					end_time: '',
					data:''
				},
				add:false,
				projectPage:[],//页面展示数据
				projectInital:['中海华庭东大门','中海华庭东小门','中海华庭东中门','中海华庭东地门','中海华庭东天门'],//初始化数据
				ruleValidate: {
					name: [{
						required: true,
						message: '请填写使用人',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
					phone: [{
						required: true,
						message: '请填写手机号',
						trigger: 'blur'
					}],
					star_time: [{
						required: true,
						message: '请填写生效时间',
						trigger: 'change'
					}],
					end_time: [{
						required: true,
						message: '请填写失效时间',
						trigger: 'change'
					}],
					data: [{
						required: true,
						message: '请选择有效次数',
						trigger: 'change'
					}],
				},
				pickerValue: new Date(),
				time: new Date(),
				star:true,
				end:false,
				index:0,
			}
		},
		watch:{
		//数据变化时
		
		},
		computed:{
			...mapState(['project','projectDoop'])
		},
		created() {

		},
		mounted() {
			//console.log(this.projectInital)
			 this.$store.commit('PROJECTINITAL',this.projectInital);//
			if(this.project.length == 0){
				this.projectPage = this.projectInital
			}else{
				for(var i=0;i<this.projectDoop.length;i++){
					for(var j=0;j<this.project.length;j++){
						if(this.projectDoop[i]===this.project[j]){
							this.project.splice(j,1);
						}					
					}					
				}
				for(var i = 0; i <this.projectDoop.length; i++){
				  this.project.push(this.projectDoop[i]);
				}
				this.projectPage = this.project
			}
			if(this.projectPage.length<this.projectInital.length){
				this.add = true;
			}
		},
		methods: {
			Delete(index){
				 this.projectPage.splice(index,1);
				 this.add = true;
				 this.$store.commit('PROJECT',this.projectPage);//储存修改的数据
			},
			nowTis(){
				if(this.star){
					var Year = this.pickerValue.getFullYear();
					var Month = this.pickerValue.getMonth()+1;
					var Date = this.pickerValue.getDate();
					this.formValidate.star_time = Year+'-'+Month+'-'+Date;
				}
				if(this.end){
					var Year = this.pickerValue.getFullYear();
					var Month = this.pickerValue.getMonth()+1;
					var Date = this.pickerValue.getDate();
					this.formValidate.end_time = Year+'-'+Month+'-'+Date;
				}		
			},
			starTime() {
				this.$refs.picker.open();
				this.end = false;
				this.star =true;			 
			},
			endTime() {
				this.$refs.picker.open();
				this.star =false;
				this.end = true;
			},
			sure() {
				if(this.add){
					this.$router.push({
						path: "/doorEmpower"
					})
				}				
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						//this.$Message.success('Success!');
						//console.log(this.formValidate)
						this.$router.push({path: "/callerDetail"})
					} else {
						// this.$Message.error('Fail!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			}

		}
	}
</script>
<style lang="scss" scoped>
	// @import './style/common.scss'
	.center {
		background-color: #EFf2f5;
		padding-top: 0.2rem;
		.scoll {
			width: 100%;
			height: 9.8rem;
			overflow-y: auto;
			Form {
				width: 7.5rem;
				width: 90%;
				border-radius:0.15rem;
				background-color: #ffffff;
				margin: 0.2rem 0.3rem 0.2rem 0.4rem;
            		padding:0.5rem 0.3rem 0.2rem 0;
				box-shadow: 0px -5px 5px #E8EBF4,0px 5px 5px #E8EBF4,0px 5px 5px #E8EBF4,0px 5px 5px #E8EBF4;
			}
			.door_stop {
				margin: 0 0.3rem;
				text-align: left;
				.text {
					font-size: 0.3rem;
					margin: 0.15rem 0;
				}
				.flex {
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					.door_box {
						width: 1.98rem;
						height: 1.14rem;
						background-color: #ffffff;
						line-height: 1.14rem;
						text-align: center;
						border-radius: 0.02rem;
						position: relative;
						margin: 0.2rem 0.15rem;
						box-shadow: 5px 5px 5px #E8EBF4;
						border-radius: 0.1rem;
						span {
							font-size: 0.24rem;
						}
						.Icon {						
							font-size: 0.5rem;
							.Icons {
								font-size: 0.5rem;
								color: #5698FF;
							}
						}
						.detele{
							display: inline-block;
							position: absolute;
							top: -30px;
							left: 1.7rem;
							font-size: 0.5rem;
							.ivu-icon {
								font-size: 0.5rem;
								color: #5698FF;							
							}
						}
					}
				}
			}
		}
		.btn {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0.3rem;
			button {
				width: 6.9rem;
				height: 0.89rem;
				background-color: #39f;
				border-radius: 0.2rem;
				font-size:0.36rem;
				color: #ffffff;
			}
		}
	}
</style>