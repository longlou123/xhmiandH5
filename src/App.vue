<template>
  <div id="app" v-if="parameter">
    <transition name="slide-fade">
      <router-view/>
    </transition>
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
					if(!(getStore('userName')&&getStore('projectCode')&&getStore('granterPhone'))){
						this.parameter = false;
						alert('参数无效');
					}
				}
			}
		},
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
  height: 100%;
}
// .bounce-enter-active {
//   animation: bounce-in 0.5s;
// }
// .bounce-leave-active {
//   animation: bounce-in 0.5s reverse;
// }
// @keyframes bounce-in {
//   0% {
//     transform: scale(0);
//   }
//   50% {
//     transform: scale(1.5);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
