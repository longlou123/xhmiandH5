<template>
	<div class="authorization">
		<div class="scoll">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        	<FormItem label="姓名 :" prop="name">
            	<Input v-model="formValidate.name" placeholder="访客姓名"></Input>
        	</FormItem>
        	<FormItem label="类型 :" prop="type">
            <Select v-model="formValidate.type" placeholder="请选择访客类型">
                <Option value="1">家属</Option>
                <Option value="2">租客</Option>
                <Option value="3">访客</Option>
            </Select>
        	</FormItem>
        	<FormItem label="手机 :" prop="phone">
            	<Input v-model="formValidate.phone" placeholder=""></Input>
       		 </FormItem>
        	 <div  @click="show">
             <FormItem label="生效日期 :"  prop="startTime">
              <Input v-model="formValidate.startTime" placeholder=""  readonly ></Input>
          </FormItem>
           </div>
          <mt-datetime-picker
            v-model="pickerValuer"
            type="date"
            ref="pickers"
            year-format=" {value} 年"
            month-format=" {value} 月"
            date-format=" {value} 日"
            :startDate="this.time"
            >
          </mt-datetime-picker>
          <mt-datetime-picker
            v-model="pickerValues"
            type="date"
            ref="picker"
            year-format=" {value} 年"
            month-format=" {value} 月"
            date-format=" {value} 日"
            :startDate="this.time"
            >
          </mt-datetime-picker>
          <div  @click="show_box">
            <FormItem label="失效日期 :" prop="endTime" >
               <Input v-model="formValidate.endTime" placeholder=""  readonly></Input>
          </FormItem>
          </div>
   		 </Form>
   		<div class="door_stop">
   		 	<div class="text">授权门禁</div>
   		 	<div class="flex">
          <transition-group name="list" tag="ul">
   		 		<li class="door_box" v-for="(item,index) in saveDoordata" :key="item">
   		 			<span class="">{{item}}</span>
   		 				<div class="Icon" @click="removeTode(index)" >
   		 					<Icon  type="ios-close"></Icon>
   		 				</div>
   		 	 	 </li>
   		 	 	 	<div class="door_box"   v-if="delet" :key="delet">
   		 				<div class="Icon Icons">
                <span  @click="sure">
                  <Icon type="ios-plus-outline"></Icon>
                </span>

   		 				</div>
   		 	 	 </div>
           </transition-group>
   		 	</div>
   		 </div>
		</div>
   		 <div class="btn" @click="handleSubmit('formValidate')">
    		<!-- <button type="primary" >下一步</button> -->
         <Button  type="primary">下一步</Button>
    	</div>
	</div>
</template>
<script >
  import { mapState, mapMutations } from 'vuex';
  import { getStore, saveStore } from '@/script/util'
  export default {
    name:'test',
    data(){
      return {
          delet:false,
          doorName:[],//初始化数据
          saveDoordata:[],//页面展示的数据
          seeproject:[],
          sendData:[],
          time: new Date(),
          pickerValuer: '',
          pickerValues:'',
          num:null,
          detailsData:null,
          ruleValidate: {
              name: [
                  { required: true, message: '请填写使用人', trigger: 'blur' }
              ],
              phone: [
                  {required: true,message: '请输入手机号',trigger: 'blur'},{type: "string", required: true,len: 11,message: '号码输入错误', trigger: 'blur' }
              ],
              type: [
                  { required:true, message: '请选择类型', trigger: 'change' }
              ],
              endTime:[
                  { required: true, message: '请选择失效时间', trigger: 'change' }
              ],
              startTime:[
                  { required: true, message: '请选择生效时间', trigger: 'change' }
              ]
          },
      }
    },
    computed:{
      ...mapState(['saveDoor','projectDoor','formValidate'])
    },
    created(){

    },
    mounted(){
          this.getdata();
          var d = new Date();
          this.formValidate.startTime = d.format("yyyy-MM-dd ");
          // if()
          // this.formValidate.endTime = d.format("yyyy-MM-dd hh:mm");
    },
    watch:{
      pickerValuer(){
          this.formValidate.startTime = this.pickerValuer.format("yyyy-MM-dd ");
            // this.failure= this.pickerValue.format("yyyy-MM-dd");
        },
      pickerValues(){
          this.formValidate.endTime= this.pickerValues.format("yyyy-MM-dd ");
        }
    },
    methods:{
        // 获取query的值
        getQuery(){
          var _this=this;
          _this.num=_this.$route.query.value;
          _this.detailsData=JSON.parse(getStore("userData"));
          _this.formValidate.name=_this.detailsData[_this.num].name;
          _this.formValidate.phone=_this.detailsData[_this.num].phone;
          // _this.formValidate.type=_this.detailsData[_this.num].type;
        },
        getdata(){
            var _this=this;
            var _projectCode = getStore('projectCode');
            var _userName = getStore('userName');
            var _granterPhone = getStore('granterPhone');
            if(_this.$route.query.value){
                this.getQuery();
            } else if(this.$route.query.return) {
                this.$store.commit('RELOAD_FORM', JSON.parse(getStore('choisedDoorList')))
            }
            _this.$post('/ssh/openDoor/getDoorByPhone', {
                projectCode: _projectCode,
                userName: _userName,
                phone: _granterPhone
            }).then(res=>{
              if(res.errorCode === 200){
                for(var i=0; i<res.result.doorList.length;i++){
                    var obj={};
                    obj.doorID=res.result.doorList[i].doorID;
                    obj.doorName = res.result.doorList[i].doorName;
                    _this.doorName[i]=obj;
                    _this.seeproject[i]=res.result.doorList[i].doorName;
                }
                this.$store.commit('PROJECTDOOR',this.doorName);
                if(this.saveDoor.length==0){
                    this.saveDoordata=this.seeproject;
                }else {
                    if (this.saveDoor.length < this.projectDoor.length){
                        this.delet = true;
                    }
                    this.saveDoordata = this.saveDoor;
                }
              }
            }).catch(err=>{
                console.log(err);
            });
        },
        removeTode(index) {

             this.saveDoordata.splice(index, 1)
            // door_box[index].

            this.delet=true;
            this.$store.commit('SAVEDOOR',this.saveDoordata);
            // 储存修改的数据
        },
        show(){
            this.$refs.pickers.open();
        },
        show_box(){
            this.$refs.picker.open();
        },
        sure(){
            if(this.delet){
            	this.$router.push({
            		path: "/entranceGuard"
            	})
            }
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if(this.$route.query.value){
                  //直接授权
                }
                else{
                  if (valid) {
                    for(var i = 0; i < this.saveDoordata.length; i++) {
                        for(var j = 0; j < this.doorName.length; j++) {
                        if(this.saveDoordata[i] == this.doorName[j].doorName) {
                          this.sendData[i]=this.doorName[j];
                        }
                      }
                    }
                    this.formValidate.granterPhone = getStore('granterPhone');
                    this.formValidate.projectCode = getStore('projectCode');
                    this.formValidate.doors = JSON.stringify(this.sendData);
                    if(this.formValidate.startTime.indexOf('00:00:00') == -1){
                      this.formValidate.startTime=this.formValidate.startTime+'00:00:00';
                    }
                    if (this.formValidate.endTime.indexOf('23:59:59') == -1) {
                      this.formValidate.endTime=this.formValidate.endTime+'23:59:59';
                    }
                    this.$store.commit('MASSAGESAVE',this.formValidate);
                    this.$post('/ssh/grantCard/addCard',this.formValidate).then(res => {
                      if(res.errorCode === 200){
                        if (this.formValidate.endTime.indexOf('23:59:59') != -1) {
                          this.formValidate.endTime = this.formValidate.endTime.slice(0, this.formValidate.endTime.indexOf('23:59:59'))
                        }
                        if (this.formValidate.startTime.indexOf('00:00:00') != -1) {
                          this.formValidate.startTime = this.formValidate.startTime.slice(0, this.formValidate.startTime.indexOf('00:00:00'))
                        }
                        saveStore( 'choisedDoorList', this.formValidate);
                        this.$store.commit('CLEAR_FORM');
                        this.$router.push({path: "/activateCard", query: { cardID: res.result.cardId}})
                      }
                    })
                  } else {
                      // this.$Message.error('Fail!');
                  }
                }
            });
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
      height: 100%;
      padding-top:0.2rem;
      // margin-left:7.5rem;
    	.scoll{
    		width: 100%;
    		height: 9rem;
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
    			     display:flex;
    			     justify-content:flex-start;
    			     flex-wrap:wrap;
               .door_box:active{background-color:#999;
                                 border-radius:0.02rem;
                           }
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
                        float: left;
                      span{
                           display: inline-block;
							             width: 100%;
							             overflow:hidden;
							             white-space:nowrap;
							             text-overflow:ellipsis;
							             font-size: 0.24rem;
                            border-radius:0.02rem;
                           }
                      .spns{
                          width:1rem;
                          height:1rem;
                          background:red;
                          position:relative;
                          animation:mymove 5s infinite;
                          -webkit-animation:mymove 5s infinite; /*Safari and Chrome*/

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
                      .ivu-icon-ios-close:active{
                      color:red;
                     }
    						     .Icons{
    								    position:absolute;
   				   					    top: 0;
   				    				    left:0;
   				    				    right:0;
   				    				    bottom:0;
   				    				    font-size:0.5rem;
                          span{
                            padding-top:0.1rem;
                          }
    							     }
    						      }
    					       }
    				        }
    			         }
    	             .btn{
                        margin-top: 0.6rem;
			               Button{
				                width: 6.92rem;
				                height: 0.89rem;
				                border-radius:0.2rem;
                        font-size:0.36rem;
				                color:#ffffff;
			                }
		                }
                  }
  .list-item {
      display: inline-block;
      margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
      transition: all 0.5s;
    }
    .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
    }

</style>
