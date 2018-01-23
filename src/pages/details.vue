<template>
	<div class="center">
		<div class="center_box">
			<section>
				<span>使用人 :</span>
				<i>{{name}}</i>
			</section>
			<section>
				<span>类型 :</span>
				<i>{{type}}</i>
			</section>
			<section>
				<span>手机 :</span>
				<i>{{phone}}</i>
			</section>
			<section>
				<span>生效日期 :</span>
				<i>{{startTime}}</i>
			</section>
			<section>
				<span>失效日期 :</span>
				<i>{{endTime}}</i>
			</section>
			<section>
				<span class="door">授权门禁 :</span>
				<i>
					<ul >
					  <li v-for="item in doors">{{item.doorName}}</li>
					</ul>
				</i>
			</section>
			<section>
				<span>门卡状态 :</span>
				<i>{{isCancel}}</i>
			</section>
    		<div class="next_btn">
        		<Button type="primary" @click="again">重新发卡</Button>
        		<Button type="primary"  @click="modal3 = true">删除信息</Button>
    		</div>
    			<Modal  v-model="modal3" @on-ok="delet()" >
        				  <p>删除将会删除账号信息</p>
        				  <p>请确定是否进行删除</p>
    			</Modal>
		</div>
	</div>
</template>
<script >
import Vue from 'vue'
import {getStore,saveStore} from '@/script/util'
	export default {
		// name:"test",
		data(){
			return{
				modal3:false,
				datas:{},
				data:{},
				doors:null,
				newData:{},
				name:null,
				type:null,
				phone:null,
				startTime:null,
				endTime:null,
				isCancel:null,
				num:null,
				door:null,
				cardNumber:null,
			}
		},
		mounted(){
			this.add();
		},
		methods:{
			again(){
        saveStore('userData', this.data);
        console.log(this.num);
        console.log((getStore("userData")));
				this.$router.push({path:"/authorization", query: {
                    value: this.num
                }})

			},
			add() {
			this.num=this.$route.query.value;
			this.data=JSON.parse(getStore("userData"));
			this.name=this.data[this.num].name;
			this.type=this.data[this.num].type
			this.phone=this.data[this.num].phone;
			this.startTime=this.data[this.num].startTime.substring(0,10);
			this.endTime=this.data[this.num].endTime.substring(0,10);
			this.doors= JSON.parse(this.data[this.num].doors)
			this.cardNumber=this.data[this.num].cardNumber
			switch(this.type)
            {
            case 1:
              this.type="家属"
              break;
            case 2:
              this.type="租客"
              break;
            case 3:
              this.type="访客"
            }
			if(this.data[this.num].isCancel || new Date() > new Date(this.data[this.num].endTime)){
				this.isCancel="无效"
			}else{
				this.isCancel="有效"
			}
		},
		delet(){
			 var cardN=this.cardNumber.toString();
			 console.log(cardN)
             this.$post('/ssh/grantCard/deleteGrantCard', {
              cardNumber:cardN
             }).then(res=>{
                if(res.state){
                  this.$router.push({path:"/management"})
                }else{
                  console.log("删除失败");
                }


             }).catch(err=>{
             	console.log("删除失败");
             })
		}
		}
	}
</script>
<style lang="scss" scoped>
	.center{
    height: 100%;
		background-color:#EFF2F5;
		padding-top:0.2rem;
		.center_box{
			width:7.5rem;
			height:auto;
			background-color:#ffffff;
			padding:0.6rem  0 ;
			section {
				margin-bottom: 0.4rem;
				span{
					display: inline-block;
					width: 2.4rem;
					text-align: left;
				}
				.door{
					vertical-align: top;
				}
				i{
					display: inline-block;
					text-align: right;
					width: 3.2rem;
					margin-left: 0.7rem;
					color: darkgrey;
					li{
						color:darkgrey;
					}
				}
				.ivu-icon-share:before{
					font-size: 0.7rem;
				}
			}
		}
		.next_btn{
            // margin-top:0.6rem;
            display:flex;
            justify-content: space-around;
            // margin:0 auto;
            margin-top:1.5rem;
                span{
                     font-size: 0.3rem;
                        color: #fff;
                }
                button{
                	// margin-right:1rem;
                }
            }
		}
</style>
