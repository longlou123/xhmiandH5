import{
	GET_ID,
	PROJECT,
	PROJECTDOOP,
	PROJECTINITAL,
	USERNAME
	
} from './mutation-types.js'

export default{
	[GET_ID](state,value){
		
	},
	[PROJECT](state,project){
		state.project = project
	},
	[PROJECTDOOP](state,twoproject){
		state.projectDoop = twoproject
	},
	[USERNAME](state,name){
		state.userName = name
	},
//	[PROJECTINITAL](state,project3){
//		state.projectInital = project3
//	}
}
