<template>
	<div class="center">
		<div class="scoll">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
				<FormItem label="姓名 :" prop="name">
					<Input v-model="formValidate.name" placeholder=""></Input>
				</FormItem>
				<FormItem label="类型 :" prop="type">
					<Select v-model="formValidate.type" placeholder="请选择">
						<Option value="1">1</Option>
						<Option value="2">2</Option>
						<Option value="3">3</Option>
					</Select>
				</FormItem>
				<FormItem label="手机 :" prop="phone">
					<Input v-model="formValidate.phone" placeholder=""></Input>
				</FormItem>
				<div @click="starTime_">
					<FormItem label="生效日期 :" prop="startTime" >
						<Input  placeholder="请填写生效时间" v-model="formValidate.startTime" readonly='readonly'></Input>
					</FormItem>
				</div>
				<mt-datetime-picker  v-model="selectTimeStar" type="datetime" ref="pickerSrtar"
					year-format=" {value} 年"
					month-format=" {value} 月"
					 date-format=" {value} 日"
					 hour-format=" {value}时"
					 minute-format="{value}分"
					 :startDate="this.time">
				</mt-datetime-picker>
				<div @click="endTime_">
					<FormItem label="失效日期 :" prop="endTime" ><!--prop="lose"-->
						<Input placeholder="请填写失效时间"  v-model="formValidate.endTime" readonly='readonly'></Input>
					</FormItem>
				</div>
				<mt-datetime-picker v-model="selectTimeEnd" type="datetime" ref="pickerEnd"
					year-format=" {value} 年"
					month-format=" {value} 月"
					 date-format=" {value} 日"
					 hour-format=" {value}时"
					 minute-format="{value}分"
					 :startDate="this.time" >
				</mt-datetime-picker>
				 <FormItem label="有效次数 :" prop="useCount">
					<Select v-model="formValidate.useCount" placeholder="请选择">
						<Option value="1">1次</Option>
						<Option value="2">2次</Option>
						<Option value="3">3次</Option>
						<Option value="4">4次</Option>
						<Option value="5">5次</Option>
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
	import {saveStore} from '@/script/util'
	import { mapState, mapMutations } from 'vuex';
	export default {
		name: 'test',
		data() {
			return {
				formValidate: {
					name: null,
					type: null,
					phone: '',
					startTime: null,
					endTime: null,
					useCount: null,
				},
				add:false,
				projectPage:[],//页面展示数据
				projectInital:[],//初始化存储全部数据
				projectDoor:[],//存储门列表数据
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
					startTime: [{
						required: true,
						message: '请填写生效时间',
						trigger: 'change'
					}],
					endTime: [{
						required: true,
						message: '请填写失效时间',
						trigger: 'change'
					}],
					useCount: [{
						required: true,
						message: '请选择有效次数',
						trigger: 'change'
					}],
				},
				selectTimeStar:new Date() ,
				selectTimeEnd:new Date() ,
				time: new Date(), //选择生效的最早起始时间
				index:0,
				sendData:[], //发送后台的数据
			}
		},
		watch:{
		//数据变化时
		selectTimeStar:function(){
			this.starTime_();
		},
		selectTimeEnd:function(){
			this.endTime_();
		}

		},
		computed:{
			...mapState(['project'])
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
						_this.projectDoor[i]=res.result.doorList[i].doorName;
					}
					if(this.project.length == 0) {
						this.projectPage = this.projectDoor
						//this.projectPage = JSON.stringify(this.projectInital)
					} else {
						this.projectPage = this.project;
						if(this.projectPage.length < this.projectDoor.length) {
							this.add = true;
						}
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
			starTime_() {
				this.$refs.pickerSrtar.open();
					var Year = this.selectTimeStar.getFullYear();
					var Month = this.selectTimeStar.getMonth()+1;
					if(Month<10){Month = '0'+Month;}
					var Date = this.selectTimeStar.getDate();
					var hour = this.selectTimeStar.getHours();
					if(hour<10){hour = '0'+hour;}
					var minute = this.selectTimeStar.getMinutes();
					if(minute<10){minute = '0'+minute;}
					this.formValidate.startTime = Year+'-'+Month+'-'+Date+' '+hour+':'+minute;
			},
			endTime_() {
				this.$refs.pickerEnd.open();
					var Year = this.selectTimeEnd.getFullYear();
					var Month = this.selectTimeEnd.getMonth()+1;
					if(Month<10){Month = '0'+Month;}
					var Date = this.selectTimeEnd.getDate();
					var hour = this.selectTimeEnd.getHours();
					if(hour<10){
						hour = '0'+hour;
					}
					var minute = this.selectTimeEnd.getMinutes();
					if(minute<10){
						minute = '0'+minute;
					}
					this.formValidate.endTime = Year+'-'+Month+'-'+Date+' '+hour+':'+minute;
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
							this.saveData();
						})
					} else {
						// this.$Message.error('Fail!');
					}
				})
			},
			saveData(){
				this.$get('/ssh/grantCard/getGrantQRByUser', {
					"projectCode": "123",    //项目id
					"pageSize": "2",
					"granterPhone": "18320489492",  //使用人的手机号
					"pageNumber":'1'
				}).then(res => {
					this.userData = res.result.cardList;
					saveStore('userData',this.userData);
					this.$router.push({path: "/callerDetail",query: {value: 0}})
				}).catch(function(error) {
					console.log(error);
				});
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
