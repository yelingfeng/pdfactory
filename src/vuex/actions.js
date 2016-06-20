import api from "./../api"
import * as types from './mutation-types'
export const showMsg = ({dispatch}, content,type='error') => {
    dispatch(types.SHOW_MSG, {
    	content:content,
    	type:type
    })
}
export const hideMsg = ({dispatch}) => {
    dispatch(types.HIDE_MSG)
}


export const TestAction = (store,message,type) =>{
	showMsg(store,message,type);
}


export const loadModules = ({dispatch}) => {

	api.initSelectModules({
		moduleId:'c4800b3a-f943-4bac-b2bc-fbef3ef52972'
	}).then(rep => {
		 dispatch(types.INIT_GLOBAL_DATA,rep.data.result)
	});
}