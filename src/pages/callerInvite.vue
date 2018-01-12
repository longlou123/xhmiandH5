<template>
	<div class="center">
		<div class="scoll">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<FormItem label="姓名:" prop="name">
					<Input v-model="formValidate.name" placeholder=""></Input>
				</FormItem>
				<FormItem label="类型 :" prop="city">
					<Select v-model="formValidate.city" placeholder="请选择">
						<Option value="beijing">请选择</Option>
						<Option value="shanghai">London</Option>
						<Option value="shenzhen">Sydney</Option>
					</Select>
				</FormItem>
				<FormItem label="手机 :" prop="name1">
					<Input v-model="formValidate.name1" placeholder=""></Input>
				</FormItem>
				<FormItem label="生效日期 :" prop="name2">
					<Input v-model="formValidate.name2" placeholder=""></Input>
				</FormItem>
				<FormItem label="失效日期 :" prop="name3">
					<Input v-model="formValidate.name3" placeholder=""></Input>
				</FormItem>
				<FormItem label="有效次数 :" prop="name4">
					<Input v-model="formValidate.name4" placeholder=""></Input>
				</FormItem>
			</Form>
			<div class="door_stop">
				<div class="text">授权门禁</div>
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
		data() {
			return {
				formValidate: {
					name: '',
					name1: '',
					name2: '',
					name3: '',
					name4: '',
					city: '',
				},
				ruleValidate: {
					name: [{
						required: true,
						message: '请填写使用人',
						trigger: 'blur'
					}],
					name1: [{
						required: true,
						message: '请填写手机号',
						trigger: 'blur'
					}],
					name2: [{
						required: true,
						message: '请填写生效日期',
						trigger: 'blur'
					}],
					name3: [{
						required: true,
						message: '请填写失效日期',
						trigger: 'blur'
					}],
					name4: [{
						required: true,
						message: '请填写失效次数',
						trigger: 'blur'
					}],
					city: [{
						required: true,
						message: 'Please select the type',
						trigger: 'change'
					}],
				}
			}
		},
		methods: {
			sure() {
				this.$router.push({
					path: "/project"
				})
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$Message.success('Success!');
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
		width: 7.5rem;
		height: 13.34rem;
		background-color: #EFf2f5;
		padding-top: 0.3rem;
		.scoll {
			width: 100%;
			height: 9.9rem;
			overflow-y: scroll;
			Form {
				width: 7.5rem;
				height: 7.2rem;
				background-color: #ffffff;
				padding-top: 0.5rem;
				padding-right: 0.78rem;
				padding: 0.5rem 0.78rem 0.45rem 0.3rem;
				box-shadow: 0px 5px 5px #E8EBF4;		
			}
			.door_stop {
				padding: 0.3rem 0 0 0.5rem;
				text-align: left;
				overflow-y: auto;
				.text {
					font-size: 0.32rem;
					margin-bottom: 0.3rem;
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
						border-radius: 0.08rem;
						position: relative;
						margin-right: 0.3rem;
						margin-bottom: 0.4rem;
						box-shadow: 5px 5px 5px #E8EBF4;
						.Icon {
							display: inline-block;
							position: absolute;
							top: -30px;
							right: 0;
							font-size: 0.5rem;
							.ivu-icon {
								font-size: 0.5rem;
								color: #5698FF;
							}
						}
						.Icons {
							position: absolute;
							top: 0;
							left: 0rem;
							right: 0;
							bottom: 0;
							font-size: 0.5rem;
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
				color: white;
				width: 6rem;
				height: 0.8rem;
				background-color: #5698FF;
				border-radius: 0.08rem;
			}
		}
	}
</style>