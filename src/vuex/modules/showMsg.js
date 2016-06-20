/**
 * Created by  on 2016/6/17.
 * 全局提示信息状态
 */
import {
    SHOW_MSG,
    HIDE_MSG
} from '../mutation-types'

const state = {
    message:{
        type: '',
        content: '',
        title: ''
    }
}

const mutations = {
    [SHOW_MSG](state , action){
        state.message = {...action}
    },
    [HIDE_MSG](state, action){
        state.message = {
            type: '',
            content: '',
            title: ''
        }
    }
}

export default {
    state,
    mutations
}