<template>
	<div class="center">
		<ul class="list_ul" v-for="(data,index) in userData">
			<li><p>{{data.name}}</p><i class="time" >{{data.createTime}}</i><span @click="sure(index)"><Icon  type="chevron-right"></Icon></span></li>
		</ul>
	</div>
</template>

<script>
	import {saveStore} from '@/script/util'
export default {
	data() {
		return {
			vertical: 'apple',
			userData:null,
			time:[]
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			this.$get('/ssh/grantCard/getGrantQRByUser', {
				"projectCode": "123",
				"pageSize": "20",
				"granterPhone": "18320489492",
				"pageNumber":'1'
			}).then(res => {
				//console.log(res.result);
				var _this= this;
				this.userData = res.result.cardList;
				saveStore('userData',this.userData);
				for(var i=0;i<this.userData.length;i++){
					_this.time.push(new Date(parseInt(_this.userData[i].createTime) * 1).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "))  
				     this.userData[i].createTime = _this.time[i];
				}
			}).catch(function(error) {
				console.log(error);
			});
		},
		sure(num	) {
			var _this = this
			this.$router.push({path: "/callerDetail", query: {value: num}});
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
    	.list_ul{
    		
    		li{
    			position: relative;
    			padding: 0 0.4rem;
    			height: 1.16rem;
    			width: 100%;
    			text-align: left;
    			border-bottom: 0.02rem solid lightgray;
    			p{
    				height: 0.62rem;
    				line-height: 0.62rem;
    				z-index: 1;
    			}
    			.time{
	    			color: darkgray;
	    			font-size: 0.24rem;
	    		}
	    		span{
    				display: inline-block;
	    			width: 0.6rem;
	    			height: 0.6rem;
	    			position: absolute;
	    			right: 5%;
	    			top: 25%;
	    			text-align: center;
	    			.ivu-icon-chevron-right{		    			
		    			font-size: 24px;
		    			z-index: 9999;		    		
		    		} 
	    		}  		
    		}  		  		 		
    	}
 	}

</style>