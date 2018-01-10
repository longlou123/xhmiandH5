<template>
	<div class="entranceGuard">
		<div class="entranceGuard_box" >
        <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <Checkbox label="千灯湖"></Checkbox> 
        <Checkbox label="中海华庭东大门"></Checkbox> 
        <Checkbox label="中海华庭西大门"></Checkbox>     
    </CheckboxGroup>
    <div class="next_btn">
        <Button type="primary" shape="circle" :long="true" class="btn" @click="nextClick()">确定</Button>
      </div>
	</div>
</template>
<script >
 export default {
        data () {
            return {
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['千灯湖', '中海华庭东大门']
            }
        },
        methods: {
            nextClick(){
            this.$router.push({path:"/authorization"})
                },

            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['千灯湖', '中海华庭东大门', '中海华庭西大门'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    }
   



</script>
<style lang="scss" scoped>
	.entranceGuard{
        width: 90%;
        height: 100%;
    	background-color: #ffffff;
        margin: 0rem 0.3rem 0 0.35rem ;
        border-radius: 0.15rem;
        box-shadow: 0px -5px 5px #E8EBF4, 0px 5px 5px #E8EBF4, 0px 5px 5px #E8EBF4, 0px 5px 5px #E8EBF4;
        .entranceGuard_box{
            border-bottom: 1px solid #e9e9e9;
            height:0.86rem;
            margin-top:0.2rem;
            text-align:left;
            line-height: 0.86rem;
        }
        .entranceGuard_box:hover{
            // background-color:#DEE7F0;
            border-radius: 0.1rem;
        }
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
            position:absolute;
            left:0;
            right:0;
            bottom:0.3rem;
            .btn{
                width: 6.92rem;
                height: 0.89rem;   
               span{                       
                    background-color:#39f;
                    border-radius:0.2rem;
                    font-size:0.36rem;
                    color:#ffffff;
                } 
            }
            
            }
	    }
</style>