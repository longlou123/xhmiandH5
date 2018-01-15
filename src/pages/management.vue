<template>
		<div class="management">
			<div class="visitors"  v-for="(item, index) in doorList" >
				<div class="center_one" >
					<div class="center_two"    @click="getnow(item,index)">
						<span class="text_span" >{{item.name}}</span><span class="guest" v-if="item.type===1">家属</span>
                        <span class="guest"  v-else-if="item.type===2">租客</span><span class="guest" v-else-if="item.type===3">访客</span>
					    <div class="card" :value="item.cardNumber">卡号：{{item.cardNumber}}</div>
					    <div class="time">有效期：{{item.startTime}} 至  {{item.endTime}}</div>
                        <img  class="show_img" src="../images/text.png" alt="" v-show="item.isCancel">
                        <img  class="show_img" src="../images/text.png" alt="" v-show="!showBtnList[index]">
                         
					</div>
                    <div v-show="!item.isCancel">
                      <button class="btn" @click="showModal(item,index)"  v-if="showBtnList[index]" >注销</button>
                    </div>
					
				</div>
                <div class="deletes" >
                <Modal  v-model="modal3" @on-ok="cancellation(modalItem,modalIndex)">
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
        showBtnList:[],
        modifyvue:null,
        detailsList: false,
        value:[],
        doors:[],
        cardNumber:[],
        userData:null,
        status:null,
        modalIndex: null,
        modalItem: null,
        showBtn:true,
        overdue:false
        // showImg:false
      }
    },
    mounted(){
       this.getdata();
    },
    created() {

    },
    methods:{
        showModal(item,index){
            this.modalItem = item;
            this.modalIndex = index;
            this.modal3=true
        },
        cancellation(item,index){
            // console.log('弹出'+index)
            console.log(item)
            var cardN=item.cardNumber.toString();
            this.$post('/ssh/grantCard/cancelGrantCard', {
              cardNumber:cardN
            }).then(res=>{
                console.log(res)
            })
        },
        getnow(d,index){
            this.modifyvue = d ;
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
            granterPhone: "18312583532",
            pageSize:10,
            pageNumber:1
          }).then(res=>{
                    this.doorList = res.result.cardList;
    				saveStore('userData',this.doorList);
    				for(var i=0; i<this.doorList.length; i++){
                        this.doorList[i].startTime=this.doorList[i].startTime.substring(0,10)
                        this.doorList[i].endTime=this.doorList[i].endTime.substring(0,10);
                        console.log(this.doorList[i].endTime.substring(0,10))              
                        if(new Date() > new Date(this.doorList[i].endTime)){
                            this.showBtnList[i] = false;
                        }else{
                            this.showBtnList[i] = true;
                        }
                    //Vue.$set(this.doorList, i, obj);
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
