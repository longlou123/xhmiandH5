<template>
	<div class="center">
		<div class="scoll">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
				<FormItem label="姓名 :" prop="name">
					<Input v-model="formValidate.name" placeholder=""></Input>
				</FormItem>
				<FormItem label="类型 :" prop="useCount">
					<Select v-model="formValidate.type" placeholder="请选择">
						<Option value="1">1</Option>
						<Option value="2">2</Option>
						<Option value="3">3</Option>
					</Select>
				</FormItem>
				<FormItem label="手机 :" prop="phone">
					<Input v-model="formValidate.phone" placeholder=""></Input>
				</FormItem>
				<mt-datetime-picker v-model="pickerValue" type="date" ref="picker" year-format=" {value} 年" month-format=" {value} 月" date-format=" {value} 日" :startDate="this.time" @confirm="nowTis">
				</mt-datetime-picker>
				<div @click="starTime_">
					<FormItem label="生效日期 :" prop="startTime" >
						<Input  placeholder="请填写生效时间" v-model="formValidate.star_time" readonly='readonly'></Input>
					</FormItem>
				</div>
				
				<div @click="endTime_">
					<FormItem label="失效日期 :" prop="endTime" ><!--prop="lose"-->
						<Input placeholder="请填写失效时间"  v-model="formValidate.end_time" readonly='readonly'></Input>
					</FormItem>
				</div>		
				 <FormItem label="有效次数 :" prop="useCount">
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
					name: null,
					type: 1,
					phone: '13717135881',
					startTime: '2018-01-11 15:00:00',
					endTime: '2018-01-18 23:59:59',
					useCount: 5,
				},
				add:false,
				projectPage:[],//页面展示数据
				projectInital:[],//初始化数据
				seeproject:[],
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
				sendData:[],
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
			this.getdata();
		},
		methods: {
			getdata() {
				var _this = this;
				this.$post('/ssh/openDoor/getDoorByPhone', {
					projectCode: "123",
					userName: "龙楼",
					phone: "13717135881"
				}).then(res => {
					//console.log(res.result.doorList)
					for(var i=0;i<res.result.doorList.length;i++){
						var list = {};
						list.doorID = res.result.doorList[i].doorID;
						list.doorName = res.result.doorList[i].doorName;
						_this.projectInital[i]=list;
						_this.seeproject[i]=res.result.doorList[i].doorName;
					}
					if(this.project.length == 0) {
						this.projectPage = this.seeproject
						//this.projectPage = JSON.stringify(this.projectInital)
					} else {
						//将从选取门列表页面的数据与保存在vuex的门列表数据对比删除相同的元素
//						for(var i = 0; i < this.projectDoop.length; i++) {
//							for(var j = 0; j < this.project.length; j++) {
//								if(this.projectDoop[i] === this.project[j]) {
//									this.project.splice(j, 1);
//								}
//							}
//						}
						var a = [];
						for(var i = 0; i < this.project.length; i++){
							a[i] = this.project[i];
						}
						var b = [];
						for(var i = 0; i < this.projectDoop.length; i++){
							b[i] = this.projectDoop[i];
						}
						for(var i=0;i<b.length;i++){						
							for(var j=0;j<a.length;j++){
								if(b[i]===a[j]){								
									b.splice(i,1);
								}							
							}
						}											
						//合并两个数组
						for(var i=0;i<b.length;i++){
							this.project.push(b[i])
							}
						//将合并后数组赋给展示数组
						this.projectPage = this.project;					
					}
					if(this.projectPage.length < this.seeproject.length) {
						this.add = true;
					}
					//console.log(JSON.stringify(this.doorName));
				}).catch(function(error) {
					console.log(error);
				});
			},
			Delete(index) {
				this.projectPage.splice(index, 1);
				this.add = true;
				this.$store.commit('PROJECT',this.projectPage);//储存修改的数据
				//将修改过的门列表保存到vuex
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
			starTime_() {
				this.$refs.picker.open();
				this.end = false;
				this.star =true;			 
			},
			endTime_() {
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
						//将当前选中授权的门列表与初始的门列表对比相同的元素
						for(var i = 0; i < this.projectPage.length; i++) {
							//console.log(this.projectPage)
							for(var j = 0; j < this.projectInital.length; j++) {
								if(this.projectPage[i] == this.projectInital[j].doorName) {
									this.sendData[i]=this.projectInital[j];								
								}
							}
						}
						this.formValidate.granterPhone = '18320489492';
						this.formValidate.projectCode = '123';
						this.formValidate.doors = JSON.stringify(this.sendData);
						console.log(this.formValidate)
						this.$post('/ssh/grantCard/grantQREvent',this.formValidate).then(res => {
							console.log(res);
							this.$router.push({path: "/callerDetail"})
						})						
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
							display: inline-block;
							width: 100%;
							overflow:hidden; 
							white-space:nowrap; 
							text-overflow:ellipsis;
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