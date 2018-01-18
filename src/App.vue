<template>
  <div id="app" v-if="parameter">
    		<router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getStore, saveStore } from '@/script/util'
export default {
	name: 'app',
	data() {
		return {
			parameter:true,
		}
	},
	computed: {
		...mapState(['projectInital'])
	},
	created(){
	    this.getAppData();
	    this.setTitle();
	},
	methods: {
	    setTitle(){
	      var title = this.$route.meta.title;
	      //console.log(title)
	      document.setTitle(title);
	    },
    //判断请求是否带参数，参数是否正确
		getAppData(){
			console.log(this.$route.path);
			if(this.$route.path != '/twoDimension'){
				if(this.$route.query.userName&&this.$route.query.projectCode&&this.$route.query.granterPhone){
					saveStore('userName', this.$route.query.userName);
					saveStore('projectCode', this.$route.query.projectCode);
					saveStore('granterPhone', this.$route.query.granterPhone);
				}else{
	        		alert('没参数')
					if(!(getStore('userName')&&getStore('projectCode')&&getStore('granterPhone'))){
						this.parameter = false;
						alert('参数无效');
					}
				}
			}		
		},
		beforeRouteUpdate(to,from,next){
	        let isBack = this.$router.isBack;
	        if( isBack ){
	            this.transitionName = 'slide-right'
	        }else{
	            this.transitionName = 'slide-left'
	        }
	        this.$router.isBack = false;
	    }
	},
	watch: {
		projectInital: function() {
		}
	},
}
</script>

<style lang="scss">
 @import './style/common';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
