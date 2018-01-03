<template>
	<div>
	<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
	<mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
	<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
	<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
	<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
	<!-- <mt-field label="网站" placeholder="请输入网址" type="url" v-model="website"></mt-field> -->
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
<style lang="scss" scoped></style>