import Vue from 'vue'
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex)

const state = {
	project:[],
	projectDoop:[],
	userName:'大哥',
	//projectInital:[],
}

export default new Vuex.Store({
	state,
	mutations,
})
