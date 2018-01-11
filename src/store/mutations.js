import{
	GET_ID,
	PROJECT,
	PROJECTDOOP,
	PROJECTDOOR,
	PROJECTINITAL,
	SAVEDOOR
} from './mutation-types.js'

export default{
	[GET_ID](state,value){
		
	},
	[PROJECT](state,proxxxx){
		state.project = proxxxx
	},
	[PROJECTDOOR](state,project1){
		state.projectDoor = project1
	},
	[PROJECTDOOP](state,two){
		state.projectDoop = two
	},
	[PROJECTINITAL](state,project3){
		state.projectInital = project3
	},
	[SAVEDOOR](state,door){
		state.saveDoor=door
		console.log(state.saveDoor);
	}

}
