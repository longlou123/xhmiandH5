<template>	
		<div class="management">
			<div class="visitors"  v-for="(item, index) in doorList" >
				<div class="center_one" >
					<div class="center_two"    @click="getnow(item,index)">
						<span class="text_span" >{{item.name}}</span><span class="guest">{{status}}</span>
					    <div class="card" :value="item.cardNumber">卡号：{{item.cardNumber}}</div>
					    <div class="time">有效期：{{item.startTime}}至{{item.endTime}}</div>
                        <img  class="show_img" src="../images/text.png" alt="" v-show="item.isCancel">
					</div>
					<button class="btn" @click="modal(item,index)">注销</button>
				</div>
                <div class="deletes" >
                <Modal  v-model="modal3" @on-ok="cancellation(item,index)">
                        <p>注销将会无法使用门卡</p>
                        <p>请确定是否进行删除</p>
                </Modal>
            </div>
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
        value:[],
        doors:[],
        cardNumber:[],
        userData:null,
        status:null,
        // showImg:false


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
        modal(item,index){
        this.modal3=true

        },
        cancellation(item,index){
           var cardN=item.cardNumber.toString();
             this.$post('/ssh/grantCard/cancelGrantCard', {
              cardNumber:cardN
             }).then(res=>{
                console.log(res)
             })
        },
        getnow(d,index){
            this.modifyvue = d ;
            console.log(this.modifyvue)
            // saveStore('userData',this.modifyvue);
            this.$router.push({
                path: "/details",
                query: {
                    value: index
                }
            });
            // console.log(JSON.stringify(this.modifyvue));
        },

        success(){
            this.MessageBox.confirm(message, title);
        },
        getdata(){
            var _this=this
           this.$post('/ssh/grantCard/getGrantCardByUser', {
            projectCode: "123",  
            granterPhone: "18320489492",
            pageSize:10,
            pageNumber:1
          }).then(res=>{
                console.log(res)
                this.doorList = res.result.cardList;
				saveStore('userData',this.doorList);
                console.log(this.doorList);
            for(var i=0; i<res.result.cardList.length; i++){
            //    var _this= this;	
				for(var i=0;i<this.doorList.length;i++){
					// this.time.push(new Date(parseInt(this.doorList[i].createTime) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "))  
				    //  this.doorList[i].createTime = this.time[i];
                      if(this.doorList[i].type===1){
                          this.status="家属";
                     }else if(this.doorList[i].type===2){
                         this.status="租客";
                     }else{
                         this.status="访客";
                };
				}
               
                // if(res.result.cardList[i].isCancel){
                //     alert("abc");
                //     obj.isCancel="有效"
                //     this.showImg=false;
                    
                // }else{
                //     alert("def");
                //     obj.isCancel="失效"
                //     this.showImg=true;
                // }
                Vue.set(this.doorList, i, obj);
            }
          }).catch(function (error) {
            // console.log(error);
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
                    position:relative;
    				.text_span{
    				font-size:0.36rem;
    				color:#36A0FB;
    				padding-right:0.25rem;
    			   	}
    			   	.time{
    			   		font-size:0.24rem;
    			   	}
                    .show_img{
                        width:2rem;
                        position:absolute;
                        left:4rem;
                        top:1rem;
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