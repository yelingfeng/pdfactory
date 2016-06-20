import {
	INIT_GLOBAL_DATA
} from "../mutation-types"

const state  = {
	globalData : {}
}


const mutations = {
	// 初始化全局Data
	[INIT_GLOBAL_DATA](state,data){
		state.globalData = data;
	}

}


export default {
	state,
	mutations
}