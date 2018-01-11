<template>
	<div class="entranceGuard">
		<div class="entranceGuard_box" >
        <Checkbox v-if="hasData"
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <Checkbox :label="item" v-for="item in dataDoor" :key="item.id"></Checkbox> 
    </CheckboxGroup>
    <div class="next_btn">
        <Button type="primary" shape="circle" :long="true"  @click="nextClick()">确定</Button>
      </div>
	</div>
</template>
<script >
	import { mapState, mapMutations } from 'vuex';
 	export default {
        data () {
            return {
                indeterminate: true,
                checkAll: false,
                checkAllGroup: [],
                dataDoor:[],
                hasData: false,
            }
        },
        computed:{
			...mapState(['project'])
		},
		mounted() {
			this.getProject();
			this.getdata();
						
		},
        methods: {
		    	getProject(){
		    		this.checkAllGroup = this.project
		    	},
		    	getdata(){
				var _this = this;
				this.$post('/ssh/openDoor/getDoorByPhone', {
					projectCode: "123",
					userName: "龙楼",
					phone: "13717135881"
				}).then(res => {
					for(var i=0;i<res.result.doorList.length;i++){
						_this.dataDoor[i] = res.result.doorList[i].doorName;
						//console.log(_this.dataDoor)
					}
					this.hasData = true;
					//console.log(JSON.stringify(this.doorName));
				}).catch(function(error) {
					console.log(error);
				});
			},
            nextClick(){
            		this.$store.commit('PROJECTDOOP',this.checkAllGroup);
            		this.$router.push({path:"/callerInvite"})
            },
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = this.dataDoor;
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === this.dataDoor.length) {
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
        border-radius: 0.2rem;
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
            position: fixed;
            bottom: 0.3rem;
            width: 6.92rem;
            left: 50%;
            transform: translateX(-50%);
                span{
                     font-size: 0.36rem;
                        color: #fff;
                }
            }
	    }
</style>