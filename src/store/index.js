import Vue from 'vue'
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex)

const state = {
	project:[],
	projectDoop:[],
	projectDoor:[],
	projectInital:[],
	saveDoor:[],
	newUrl: 'https://xymind.net:3000',
	userName:'大哥',
	massageSave:[]
	//projectInital:[],
}

export default new Vuex.Store({
	state,
	mutations,
})
