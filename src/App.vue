<template>
  <div id="app" v-if="parameter">
    <transition :name="transitionName">
    <!-- <transition name="go"> -->
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
			parameter: true,
      transitionName: 'back',
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
		},
//     '$route' (to, from) {
// 　　　　let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
// 　　　　　　if(isBack) {
// 　　　　　　　　this.transitionName = 'go'
//               alert('go')
// 　　　　　　} else {
// 　　　　　　   this.transitionName = 'back'
//               alert('back')
// 　　　　　}
// 　　　　　this.$router.isBack = false
// 　　},

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
/*// 卡片动画属性*/
//
/* 开始过渡阶段,动画出去阶段 */
.back-enter-active,.back-leave-active{
  transition: all 0.3s ease-out;
}
/* 进入开始 */
.back-enter{
  transform: translateX(8rem);
  opacity: 0.3;
}
/* 出去终点 */
.back-leave-active{
  transform: translateX(8rem);
  opacity: 0.3;
}

.go-enter-active,.go-leave-active{
  transition: all 0.3s ease-out;
}
/* 进入开始 */
.go-enter{
  transform: translateX(-8rem);
  opacity: 0.3;
}
/* 出去终点 */
.go-leave-active{
  transform: translateX(-8rem);
  opacity: 0.3;
}


</style>
