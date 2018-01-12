<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getStore, saveStore } from '@/script/util'
export default {
	name: 'app',
	computed: {
		...mapState(['projectInital'])
	},
	mounted(){
		saveStore('test', 'heheda123');
		// alert(getStore('test'));
		// alert(123);
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
