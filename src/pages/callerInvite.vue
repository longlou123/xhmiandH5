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
					<div class="door_box">
						<span>中海华庭东大门</span>
						<div class="Icon">
							<Icon type="ios-close"></Icon>
						</div>
					</div>
					<div class="door_box">
						<span>中海华庭东大门</span>
						<div class="Icon">
							<Icon type="ios-close"></Icon>
						</div>
					</div>
					<div class="door_box">
						<span>中海华庭东大门</span>
						<div class="Icon">
							<Icon type="ios-close"></Icon>
						</div>
					</div>
					<div class="door_box">
						<span>中海华庭东大门</span>
						<div class="Icon">
							<Icon type="ios-close"></Icon>
						</div>
					</div>
					<div class="door_box">
						<span>中海华庭东大门</span>
						<div class="Icon">
							<Icon type="ios-close"></Icon>
						</div>
					</div>
					<div class="door_box">
						<span>中海华庭东大门</span>
						<div class="Icon">
							<Icon type="ios-close"></Icon>
						</div>
					</div>
					<div class="door_box">
						<span>中海华庭东大门</span>
						<div class="Icon">
							<Icon type="ios-close"></Icon>
						</div>
					</div>
					<div class="door_box" @click="sure">
						<div class="Icon Icons">
							<Icon type="ios-plus-outline"></Icon>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="btn" @click="handleSubmit('formValidate')">
			<button type="primary">下一步</button>
		</div>
	</div>

</template>
<script>
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
				ruleValidate: {
					name: [{
						required: true,
						message: '请填写使用人',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'blur'
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
				//star_time:null,
				//end_time:null,
				time: new Date(),
				star:true,
				end:false,
			}
		},
		mounted() {},
		methods: {
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
				this.$router.push({
					path: "/doorEmpower"
				})
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						//this.$Message.success('Success!');
						//console.log(this.formValidate)
						this.$router.push({path: "/twoDimension"})
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
				width: 100%;
				background-color: #ffffff;
				padding: 0.5rem;
				padding-bottom: 0.1rem;
				box-shadow: 0px 5px 5px #E8EBF4;
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
						.Icons {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							font-size: 0.3rem;
						}
					}
				}
			}
		}
		.btn {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0.9rem;
			button {
				width: 6rem;
				height: 0.8rem;
				background-color: #5698FF;
				border-radius: 0.08rem;
				color: #ffffff;
			}
		}
	}
</style>