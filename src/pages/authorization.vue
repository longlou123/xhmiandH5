<template>	
	<div class="authorization">
		<div class="scoll">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        	<FormItem label="姓名 :" prop="name">
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
        	 <div  @click="show">
             <FormItem label="生效日期 :"  prop="failure">
              <Input v-model="formValidate.failure" placeholder=""  readonly ></Input>
          </FormItem>
           </div>
          <mt-datetime-picker
            v-model="pickerValuer"
            type="date"
            ref="pickers" 
            year-format=" {value} 年"
            month-format=" {value} 月"
            date-format=" {value} 日"
            >
          </mt-datetime-picker>
          <mt-datetime-picker
            v-model="pickerValues"
            type="date"
            ref="picker" 
            year-format=" {value} 年"
            month-format=" {value} 月"
            date-format=" {value} 日"
            >
          </mt-datetime-picker>
          <div  @click="show_box">
            <FormItem label="失效日期 :" prop="effect" >
               <Input v-model="formValidate.effect" placeholder=""  readonly></Input>
          </FormItem>
          </div>  
   		 </Form>
   		<div class="door_stop">
   		 	<div class="text">授权门禁</div>
   		 	<div class="flex">
   		 		<div class="door_box" v-for="(item,index) in saveDoor">
   		 			<span>{{item.dName}}</span>
   		 				<div class="Icon" @click="removeTode(saveDoor)">
   		 					<Icon  type="ios-close"></Icon>
   		 				</div>
   		 	 	 </div>
   		 	 	 	<div class="door_box"  @click="sure">
   		 				<div class="Icon Icons">
   		 					<Icon type="ios-plus-outline"></Icon>
   		 				</div>
   		 	 	 </div>
   		 	</div>  		 	
   		 </div>
		</div>	 
   		 <div class="btn" @click="handleSubmit('formValidate')">
    		<button type="primary" >下一步</button>
    	</div>
	</div>
		 
</template>
<script >
  import { mapState, mapMutations } from 'vuex';
  export default {
    name:'test',
    data(){
      return {
          doorName:[],
          saveDoor:[],//页面展示的数据
      	  formValidate: {
                    name: '',
                    name1: '',
                    name2: '',
                    name3: '',
                    city: '',
                    effect:'',
                    failure:''
                },
          ruleValidate: {
                    name: [
                        { required: true, message: '请填写使用人', trigger: 'blur' }
                    ],
                    name1: [
                        { required: true, message: '请填写手机号', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the type', trigger: 'change' }
                    ],
                    effect:[
                        { required: true, message: '请选择失效时间', trigger: 'change' }
                    ],
                    failure:[
                        { required: true, message: '请选择生效时间', trigger: 'change' }
                    ]

                },
          pickerValuer: '',
          pickerValues:''
      }
    },
    computed:{
      ...mapState(['project','projectDoor'])
    },
    created(){

    },
    mounted(){    
          var d = new Date();
          this.formValidate.failure = d.getFullYear()+"-0"+(d.getMonth()+1)+"-0"+d.getDate();
          if(this.project.length==0){
            this.$post('/ssh/openDoor/getDoorByPhone', {
            projectCode: "123",
            userName:"伍健",
            phone: "18312583532"
          }).then(res=>{
            console.log(res)
            var CC=0;            
            for(var i=0; i<res.result.doorList.length;i++){
            var obj={};   
            obj.dName=res.result.doorList[i].doorName;
            this.doorName[CC]=obj;  
            CC++;           
            } 
            this.saveDoor=this.doorName;            
          }).catch(function (error) {
            console.log(error);
          });
          }      
    },
    watch:{
      pickerValuer(){
          Date.prototype.format = function(fmt) {
                var o = {
                    "M+": this.getMonth() + 1,               //月份 
                    "d+": this.getDate(),                    //日 
                    "h+": this.getHours(),                   //小时 
                    "m+": this.getMinutes(),                 //分 
                    "s+": this.getSeconds(),                 //秒 
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                    "S": this.getMilliseconds()             //毫秒 
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            }
            this.formValidate.failure = this.pickerValuer.format("yyyy-MM-dd");
            // this.failure= this.pickerValue.format("yyyy-MM-dd");
        },
      pickerValues(){
          Date.prototype.format = function(fmt) {
                var o = {
                    "M+": this.getMonth() + 1,               //月份 
                    "d+": this.getDate(),                    //日 
                    "h+": this.getHours(),                   //小时 
                    "m+": this.getMinutes(),                 //分 
                    "s+": this.getSeconds(),                 //秒 
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                    "S": this.getMilliseconds()             //毫秒 
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            }
            this.formValidate.effect= this.pickerValues.format("yyyy-MM-dd");
            console.log("我进来了")
        }
    },
    methods:{
      removeTode(keep) {
      this.saveDoor.splice(keep, 1);
      this.$store.commit('PROJECTDOOR',this.saveDoor);
     },
      show(){
        this.$refs.pickers.open();
      },
      show_box(){
        this.$refs.picker.open();
        // console.log(this.pickerValue);
      },
    	sure(){
    		this.$router.push({path:"/entranceGuard"})
    	},    	
		   handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        // this.$Message.error('Fail!');
                    }
                })
            },
      handleReset (name) {
                this.$refs[name].resetFields();
            },   
          }
        }
</script>
<style lang="scss" scoped>
html,body{
  background-color:#EFf2f5;
}
    .authorization{ 	
      padding-top:0.2rem;
    	.scoll{
    		width: 100%;
    		height: 9.8rem;
    		overflow-y: auto;
    		Form{
    		    width: 90%;
            border-radius:0.15rem;
    		    height: 6rem;
    		    background-color:#ffffff;
    		    margin: 0.2rem 0.3rem 0.2rem 0.4rem;
            padding:0.5rem 0.3rem 0.2rem 0;
    		    box-shadow: 0px -5px 5px #E8EBF4,0px 5px 5px #E8EBF4,0px 5px 5px #E8EBF4,0px 5px 5px #E8EBF4;
    	     }
    	     .door_stop{
              height:5rem;
    		      padding:0rem 0 0 0.4rem;
    		      text-align:left;
    		      .text{
    			     font-size:0.3rem;
    			     margin-bottom:0.2rem;
    		      }
    		      .flex{
                width:100%;
                height:3rem;
    			     display:flex;
    			     justify-content:flex-start;
    			     flex-wrap:wrap;
    		        .door_box{
    			         width: 1.98rem;
    			         height: 1.14rem;
    			         background-color:#ffffff;
    			         line-height: 1.14rem;
    			         text-align:center;
    			         border-radius:0.02rem;
    			         position:relative;
    			         margin-right:0.35rem;
    			         margin-bottom:0.4rem;
    			         box-shadow: 0px -5px 5px #E8EBF4,0px 5px 5px #E8EBF4,0px 5px 5px #E8EBF4,0px 5px 5px #E8EBF4;	
                   border-radius:0.15rem;
                      span{
                          font-size:0.24rem;
                           }
    			           .Icon{
    				              display:inline-block;
    				              position:absolute;
   				                top: -30px;
                          left:1.8rem;
   				                font-size:0.5rem;
   				           .ivu-icon{
   				    			      font-size:0.5rem;
   				               	color:#39f;
   				           	}
    					       }
    						     .Icons{
    								      position:absolute;
   				   					    top: 0;
   				    				    left:0;
   				    				    right:0;
   				    				    bottom:0;
   				    				    font-size:0.5rem;
    							     }
    						      }
    					       }			
    				        }
    			         }
    	             .btn{
			                  position:absolute;
			                  left:0;
			                  right:0;
			                  bottom:0.3rem;
			               button{
				                width: 6.92rem;
				                height: 0.89rem;
				                background-color:#39f;
				                border-radius:0.2rem;
                        font-size:0.36rem;
				                color:#ffffff;
			                }
		                }
                  }
</style>