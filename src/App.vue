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
	mounted(){
		this.getAppData();
	},
	methods: {
		getAppData(){
			if(this.$route.query.userName&&this.$route.query.projectCode&&this.$route.query.granterPhone){
				saveStore('userName', this.$route.query.userName);
				saveStore('projectCode', this.$route.query.projectCode);
				saveStore('granterPhone', this.$route.query.granterPhone);

			}else{
				if(!(getStore('userName')&&getStore('projectCode')&&getStore('granterPhone'))){
					this.parameter = false;
					alert('参数无效');
				}
			}
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
