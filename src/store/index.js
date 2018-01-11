import Vue from 'vue'
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex)

const state = {
	project:[],
	projectDoop:[],
	projectDoor:[],
	newUrl: 'https://xymind.net:3000',
}

export default new Vuex.Store({
	state,
	mutations,
})
