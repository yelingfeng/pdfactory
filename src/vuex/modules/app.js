import {
	INIT_GLOBAL_DATA,
	SYNC_COMP_OPTION
} from "../mutation-types"

const state  = {
	globalData : {}
};


const mutations = {
	// 初始化全局Data
	[INIT_GLOBAL_DATA](state,data){
		state.globalData = data;
	},

	[SYNC_COMP_OPTION](state,option){
		console.log(option);
		state.globalData.components.forEach((it) => {
			if(option.id === it.id){
				it = option
			}
		})
	}
};


export default {
	state,
	mutations
}