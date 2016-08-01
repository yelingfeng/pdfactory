import api from "./../api"
import * as types from './mutation-types'
export const showMsg = ({dispatch}, content,type='error') => {
    dispatch(types.SHOW_MSG, {
    	content:content,
    	type:type
    })
};
export const hideMsg = ({dispatch}) => {
    dispatch(types.HIDE_MSG)
};


export const TestAction = (store,message,type) =>{
	showMsg(store,message,type);
};


// 加载全局模块
export const loadModules = ({dispatch}) => {

	api.initSelectModules({
		moduleId:'2b1fa1a4-11b2-4169-ab37-e0408f8f655a'
	}).then(rep => {
		 let gdata = rep.data;
		 dispatch(types.INIT_GLOBAL_DATA,gdata)
	});
};

export const SyncComponentOption = ({dispatch},option) => {

     dispatch(types.SYNC_COMP_OPTION,option);
};