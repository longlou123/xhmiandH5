import{
	GET_ID,
	PROJECT,
	PROJECTDOOP
	
} from './mutation-types.js'

export default{
	[GET_ID](state,value){
		
	},
	[PROJECT](state,project){
		state.project = project
	},
	[PROJECTDOOP](state,project){
		state.projectDoop = project
	}
}
