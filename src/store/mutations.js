import{
	GET_ID,
	PROJECT,
	PROJECTDOOP,
	PROJECTDOOR
	
} from './mutation-types.js'

export default{
	[GET_ID](state,value){
		
	},
	[PROJECT](state,project){
		state.project = project
	},
	[PROJECTDOOP](state,project){
		state.projectDoop = project
	},
	[PROJECTDOOR](state,project){
		state.projectDoor = project
		console.log(state.projectDoor);
	}
}
