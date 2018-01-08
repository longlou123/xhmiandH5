<template>
	<div class="center">
		<RadioGroup v-model="vertical" vertical>	
			<Radio label="apple">
            		<span>中海华庭</span>
            </Radio>		       
	        <Radio label="android">
	            <span>千灯湖</span>
	        </Radio>
    </RadioGroup>
    <div class="btn"  @click="sure">
    		<button >确定</button>
    </div>
	</div>
	 
</template>
<script >
  export default {
    data(){
      return {
      	   vertical: 'apple'
                
        }
    },
    methods:{
	    sure(){
	    		this.$router.push({path:"doorEmpower"})
	    }
     }
  }

</script>
<style lang="scss" scoped>
	.center{
		width:7.5rem;
	    	height: 13.34rem;
	    	background-color:#EFf2f5;
	    	padding-top:0.28rem;
	    	.ivu-radio-group{
	    		width:100%;
	    	}
		.btn{
			position:absolute;
			left:0;
			right:0;
			bottom:1.3rem;
			button{
				width: 6rem;
				height: 0.8rem;
				background-color:#5698FF;
				border-radius:0.08rem;
			}
		}
	}
</style>