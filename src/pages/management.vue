<template>	
		<div class="management">
			<div class="visitors"  @click="getnow(item,index)" v-for="(item, index) in doorList" >
				<div class="center_one" >
					<div class="center_two"   >
						<span class="text_span" >{{item.name}}</span><span class="guest">{{item.type}}</span>
					    <div class="card">卡号：{{item.doorList}}</div>
					    <div class="time">有效期：{{item.startTime}}至{{item.endTime}}</div>
					</div>
					<button class="btn" @click="modal3 = true">注销</button>
				</div>
			</div>			
            <div class="deletes" >
                <Modal  v-model="modal3">
                        <p>注销将会无法使用门卡</p>
                        <p>请确定是否进行删除</p>
                </Modal>
            </div>										
	    </div>
</template>
<script >
import Vue from 'vue'
import {saveStore} from '@/script/util'
  export default {
    data(){
      return {
      	modal3: false,
        doorList:[],
        modifyvue:null,
        detailsList: false,
        value:[]

      }
    },
    mounted(){
       this.getdata();
    },
    created() {
        
    },
    methods:{
    	// jump(){
    	// 	this.$router.push({path:"/details"});
    	// },
        getnow(d,index){   
            this.modifyvue = d;
            saveStore('userData',this.modifyvue);
            this.$router.push({
                path: "/details",
                query: {
                    value: index
                }
            });
            console.log(JSON.stringify(this.modifyvue));
        },

        success(){
            this.MessageBox.confirm(message, title);
        },
        getdata(){
            var _this=this
           this.$post('/ssh/grantCard/getGrantCardByUser', {
            projectCode: "123",  
            granterPhone: "18320489492",
            pageSize:3,
            pageNumber:1
          }).then(res=>{
            for(var i=0; i<res.result.cardList.length; i++){
                var obj={};
                obj.cardNumber=res.result.cardList[i].cardNumber;
                obj.granterPhone=res.result.cardList[i].endTime;
                obj.name=res.result.cardList[i].name;
                obj.type=res.result.cardList[i].type;
                obj.phone=res.result.cardList[i].phone;
                obj.startTime=res.result.cardList[i].startTime;
                obj.endTime=res.result.cardList[i].endTime;
                obj.isCancel=res.result.cardList[i].isCancel;
                if(res.result.cardList[i].type===1){
                    obj.type="家属";
                }else if(res.result.cardList[i].type===2){
                    obj.type="租客";
                }else{
                    obj.type="访客";
                }
                _this.doorList[i] = obj;
                Vue.set(_this.doorList, i, obj);
            }
            
          }).catch(function (error) {
            console.log(error);
          });
      }    
    }
  }
</script>
<style lang="scss" scoped>
    .management{
    	width: 7.5rem;
    	height:13.34rem;
    	background-color:#EFf2f5;
    	padding-top:0.2rem;
    	.visitors{
    		height:3.5rem;
    		background-color:#ffffff;
    		overflow:hidden;
    		box-shadow: 0px 5px 5px #E8EBF4;
            margin:0  0.3rem;
            margin-bottom:0.4rem;
            border-radius:0.15rem;
            box-shadow: 0px -5px 5px #E8EBF4,0px 5px 5px #E8EBF4,0px 5px 5px #E8EBF4,0px 5px 5px #E8EBF4;  
    		.center_one{
    			text-align:left;
    			width:7rem;
    			height:2rem;
    			margin:0 auto;				
    			.center_two{
    				padding:0.3rem 0  0.4rem 0.3rem;
    				border-bottom:0.02rem solid #E0E0E1;
    				.text_span{
    				font-size:0.36rem;
    				color:#36A0FB;
    				padding-right:0.25rem;
    			   	}
    			   	.time{
    			   		font-size:0.24rem;
    			   	}
    			    .card{
    			    		margin:0.3rem 0;
    			    		font-size:0.24rem;
    			    		}
    			    .guest{
    						font-size:0.24rem;
    			  			}
    					}
                    .ivu-btn-primary{
                        background-color:red!important;
                    }         			
    			.btn{
    				float:right;
    				width:1.4rem;
    				height:0.6rem;
    				color:#ffffff;
    				outline:none;
    				border:none;
    				background-color:#5698FF;
    				border-radius:0.2rem;
    				margin-top:0.15rem;
    				margin-right:0.2rem;
    			}
    		}
    	}		
    }

      
	
</style>