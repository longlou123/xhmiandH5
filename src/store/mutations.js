import{
	GET_ID,
	PROJECT,
	PROJECTDOOP,
	PROJECTDOOR,
	PROJECTINITAL,
	SAVEDOOR,
	USERNAME,
	MASSAGESAVE
	
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
	[PROJECTINITAL](state,project3){
		state.projectInital = project3
	},
	[SAVEDOOR](state,door){
		state.saveDoor=door
		console.log(state.saveDoor)
	},
	[PROJECTDOOP](state,twoproject){	
		state.projectDoop = twoproject
		//console.log(state.projectDoop)
	},
	[USERNAME](state,name){
		state.userName = name
	},
	[MASSAGESAVE](state,massage){
		state.massageSave=massage
	}
//	[PROJECTINITAL](state,project3){
//		state.projectInital = project3
//	}
}
