<template>
	<div class="center">
		<div class="center_box">
			<section>
				<span>姓名 :</span>
				<i>林达浪</i>
			</section>
			<section>
				<span>手机 :</span>
				<i>13838381438</i>
			</section>
			<section>
				<span>生效日期 :</span>
				<i>2017 08-08 14:32</i>
			</section>
			<section>
				<span>失效日期 :</span>
				<i>2017 08-08 16:32</i>
			</section>
			<section>
				<span>有效次数 :</span>
				<i>5</i>
			</section>
			<section>
				<span>授权门禁 :</span>
				<i>中海华庭东大门</i>
				<span></span>
				<i>中海华庭东大门</i>
			</section>
			<section>
				<span>二维码状态 :</span>
				<i>失效</i>
			</section>
			<section>
				<span>二维码生成时间 :</span>
				<i>2017.08.08-10:41</i>
			</section>
			<section>
				<span></span>
				<Icon type="share"></Icon>
			</section>
		</div>
	</div>
</template>
<script>
	export default {
		name: "test",
		data() {
			return {
				input: '',

			}
		},
		methods: {
			again() {
				this.$router.push({
					path: "/"
				})
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
			height:10.06rem;
			background-color: #ffffff;
			padding: 0.6rem 0;
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
					width: 2.76rem;
					margin-left: 0.7rem;
					color: darkgrey;
				}
				.ivu-icon-share:before{
					font-size: 0.7rem;
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