<template>
	<div class="big_box">
		<div class="center">
			<ul>
				<li>使用人:<input class="ipt1" type="text" name=""></li>
				<li>
					类型:<select>
						<option value ="1">请选择</option>
					</select>
				</li>
				<li>
					手机：<input type="text" name="">
				</li>
				<li>
					生效日期：<input type="text" name="">
				</li>
				<li>
					失效日期：<input type="text" name="">
				</li>
			</ul>
		</div>
	</div>
	
	
</template>
<script >
  import { Field } from 'mint-ui';

  export default {
    name:'test',
    data(){
      return {
      	username:'',
      	email:'',
      	password:'',
      	phone:'',
      	website:''
      }
    },
    methods:{
    

    }
  }

</script>
<style lang="scss" scoped>
   .big_box{
   	width: 7.5rem;
   	height: 13.34rem;
   	background-color:#EFF2F5;
   	padding-top:1.4rem;
   	.center{
		width: 7.5rem;
		height:6rem;
		background-color:#fff;
		ul{
			display:inline-flex;
		}
	}
   }
	
</style>