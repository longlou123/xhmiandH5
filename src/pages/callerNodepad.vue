<template>
    <div class="wrap">
      <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :max-distance="150"
                    ref="loadmore" :auto-fill="false" @bottom-status-change="handleTopChange">
        <div class="center">
          <ul class="list_ul" v-for="(data,index) in userData">
            <li @click="sure(index)"><p>{{data.name}}</p><i class="time" >{{data.createTime}}</i><span><Icon  type="chevron-right"></Icon></span></li>
          </ul>
        </div>
      </mt-loadmore>
    </div>
</template>

<script>
	import {getStore,saveStore} from '@/script/util'
	import {Loadmore} from 'mint-ui';
export default {
	data() {
		return {
			vertical: 'apple',
			userData:null,
			time:[],
			transformTime:null,
			projectCode:'',
			granterPhone:'',
			allLoaded: false,
	        topStatus: '',
	        page:1,
	        dataList:null,
	        scrollMode:"touch"

		}
	},
	mounted() {
		 this.getData();
		 this.active();
	},
	watch:{
		//数据变化时

	},
	methods: {
		active(){
			document.body.addEventListener('touchstart', function () { });
		},
		loadBottom() { // 加载更多数据的操作
                //load data
                //this.allLoaded = true;// 若数据已全部获取完毕
             var _this = this;
             setTimeout(function () {
                	if(_this.dataList<10){
                		console.log('无数据更新')
                	}else{
                		 _this.page = Number(_this.page) +1;
                		 _this.getData();
                	}
                    _this.$refs.loadmore.onBottomLoaded();
               }, 1000);
            },
        handleTopChange(status) {
            this.topStatus = status;
        },
		getData() {
			var _this = this;
			_this.projectCode = getStore('projectCode');
			var userName = getStore('userName');
			_this.granterPhone = getStore('granterPhone');
			this.$get('/ssh/grantCard/getGrantQRByUser', {
				"projectCode": _this.projectCode,
				"pageSize": "11",
				"granterPhone": _this.granterPhone,
				"pageNumber":_this.page
			}).then(res => {
				_this.dataList = res.result.cardList.length;
				if(this.page==1){
					this.userData =res.result.cardList
				}else{
					this.userData =this.userData.concat(res.result.cardList);
				}
				saveStore('userData',this.userData);
				for(var i=0;i<this.userData.length;i++){
					var date = new Date(_this.userData[i].createTime);
					var Y = date.getFullYear();
					var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
					var D = date.getDate() ;
					var h = date.getHours() ;
					if(h<10){h = "0"+ h;}
					var m = date.getMinutes()
					if(m<10){m = "0"+ m;}
					var s = date.getSeconds();
					if(s<10){s = "0"+ s;}
					_this.transformTime = Y+'/'+M+'/'+D+' '+h+':'+m+':'+s;
					_this.time.push(_this.transformTime)
				    _this.userData[i].createTime = _this.time[i];
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
.wrap{
  height: 100%;
}
.center{
	width:7.5rem;
  height: 100%;
    	background-color:#EFf2f5;
    	padding-top:0.28rem;
    	.list_ul{

    		li{
    			position: relative;
    			padding: 0 0.4rem;
    			height: 1.3rem;
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
    	.list_ul :active{
    		background: 	rgba(211,211,211,0.8);
    	}
 }

</style>
