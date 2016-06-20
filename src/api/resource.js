/**
 * Created by  on 2016/4/1.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import {API_ROOT} from '../config'

Vue.use(VueResource);
// HTTP相关
Vue.http.options.crossOrigin = true 
Vue.http.options.xhr = {withCredentials: true}



Vue.http.interceptors.push({
  request (request) {

    return request
  },
  response (response) {
  
    if(response.status === 500){
    	alert("服务器加载失败")
    }
    return response
  }
})




// 加载所有模块 初始化方法
export const  initSelectModules = (options) => Vue.http.get(API_ROOT + 'module/selectModule',options)
