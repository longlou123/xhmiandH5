<template>
	<div class="center">
		<RadioGroup v-model="vertical" vertical>	
				<Radio label="apple">
                		<span>中海华庭东大门</span>
                </Radio>		       
        <Radio label="android">
            <span>千灯湖</span>
        </Radio>
    </RadioGroup>
    <div class="next_btn">
        <Button type="primary" shape="circle" :long="true" class="btn" @click="nextClick()">确定</Button>
      </div>
	</div>
</template>
<script >
  export default {
    name:'test',
    data(){
      return {
      	   vertical: 'apple'                
      }
    },
    methods:{
    nextClick(){
    	this.$router.push({path:""})
    }

    }
  }

</script>
<style lang="scss" scoped>
	.center{
    	background-color:#ffffff;
    	.ivu-radio-group{
    		width:100%;
    	}
    	.ivu-radio-group-vertical .ivu-radio-wrapper {
    		height: 0.86rem;
    		line-height: 0.86rem;
   			width:100%;
    		padding: 0 0.5rem;
    		border-bottom:0.01rem solid #E5E7E9;
        }
        .ivu-radio-group-vertical .ivu-radio-wrapper:hover{
        	background-color:#DEE7F0;
        }
    	.ivu-radio-group {
    		display: inline-block;
    		font-size: 12px;
    		vertical-align: middle;
    		float: left;
    		text-align: left;
			}
		.next_btn{
            position: fixed;
            bottom: 0.8rem;
            width: 6.2rem;
            left: 50%;
            transform: translateX(-50%);
                span{
                     font-size: 0.3rem;
                        color: #fff;
                }
             }
	}
</style>