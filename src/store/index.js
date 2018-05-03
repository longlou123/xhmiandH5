import Vue from 'vue'
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex)

const state = {
	project:[],
	projectDoor:[],
	saveDoor:[],
	userName:'大哥',
	massageSave:[],
  formValidate: {},
  userData:[],
  viewDirection: '',
  authorizationUrl: '',
}

export default new Vuex.Store({
	state,
	mutations,
})
