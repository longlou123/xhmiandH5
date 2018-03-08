import{
	GET_ID,
	PROJECT,
	PROJECTDOOP,
	PROJECTDOOR,
	PROJECTINITAL,
	SAVEDOOR,
	USERNAME,
	MASSAGESAVE,
	CLEAR_FORM,
  RELOAD_FORM
} from './mutation-types.js'

export default{
	[GET_ID](state,value){

	},
	[PROJECT](state,project){
		state.project = project
	},
	[PROJECTDOOR](state,project1){
		state.projectDoor = project1

	},
	[SAVEDOOR](state,door){
		state.saveDoor=door
		// console.log(state.saveDoor)
	},
	[USERNAME](state,name){
		state.userName = name
	},
	[MASSAGESAVE](state,massage){
		state.massageSave=massage
	},
  [CLEAR_FORM](state){
    state.formValidate = {}
  },
  [RELOAD_FORM](state,data){
    state.formValidate = data
  },
}
