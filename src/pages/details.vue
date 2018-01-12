<template>
	 <Form :model="formLeft" label-position="left" :label-width="100">
        <FormItem label="Title">
            <Input v-model="formLeft.input1"></Input>
        </FormItem>
        <FormItem label="Title name">
            <Input v-model="formLeft.input2"></Input>
        </FormItem>
        <FormItem label="Aligned title">
            <Input v-model="formLeft.input3"></Input>
        </FormItem>
    </Form>
</template>
<script >
	export default {
		name:"test",
		data(){
			return{
				 formLeft: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
			}
		},
		methods:{
		}
	}
</script>
<style lang="scss" scoped>
	
</style>