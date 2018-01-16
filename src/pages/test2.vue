<template>
	<div id="app">
	    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :max-distance="150"
	                 @top-status-change="handleTopChange" ref="loadmore">	
	        <ul class="scroll-wrapper">
	            <li v-for="item in list" @click="itemClick(item)">{{ item }}</li>
	        </ul>
	        <span v-show="topStatus === 'loading'">Loading...</span>
	        <span v-show="topStatus === 'drop'">释放更新</span>
	    </mt-loadmore>
	</div>
</template>

<script>
	export default {
		data(){
      		return {
      			list: [],
	            allLoaded: false,
	            topStatus: ''
      		}
      },
      created: function () {
            var i =0, len=20;
            for (; i< len; i++){
                this.list.push('demo' + i);
            }
        },
      methods: {
            loadTop: function () {  // 刷新数据的操作
                var self = this;
                setTimeout(function () {
                    self.list.splice(0, self.list.length);
                    var i =0, len=20;
                    for (; i< len; i++){
                        self.list.push('demo' + i);
                    }
                    self.$refs.loadmore.onTopLoaded();
                }, 2000);
            },
            loadBottom: function () { // 加载更多数据的操作
                //load data

                //this.allLoaded = true;// 若数据已全部获取完毕
                var self = this;
                setTimeout(function () {
                    var i =0; 
                    var len = 10;
                    for (; i< len; i++){
                        self.list.push('dddd' + i);
                    }
                    self.$refs.loadmore.onBottomLoaded();
                }, 2000);

            },
            handleTopChange: function (status) {
                this.topStatus = status;
            },
            itemClick: function (data) {
                console.log('item click, msg : ' + data);
            }
        }
	}
</script>

<style lang="scss" scoped>
	*{
	    margin: 0;
	    padding: 0;
	}
	html, body{
	    height: 100%;
	}
	
	#app{
	    height: 100%;
	    overflow: scroll;
	}
	.scroll-wrapper{
	    margin: 0;
	    padding: 0;
	    list-style: none;
	
	}
	.scroll-wrapper li{
	    line-height: 120px;
	    font-size: 60px;
	    text-align: center;
	}
</style>