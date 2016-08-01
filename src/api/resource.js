/**
 * Created by  on 2016/4/1.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import {API_ROOT} from '../config'

Vue.use(VueResource);
// HTTP相关
Vue.http.options.crossOrigin = true;
//Vue.http.options.xhr = {withCredentials: true}


//API_ROOT + 'module/selectModule'
const viewURL = API_ROOT +"/db/previewChart";


Vue.http.interceptors.push({
  request (request) {
    return request
  },
  response (response) {
    if(response.status === 500){
    	console.log("服务器加载失败")
    }
    return response
  }
});


// 加载所有模块 初始化方法
export const  initSelectModules = (options) => Vue.http.get(API_ROOT + "/selectModule",options);

// 加载图表数据
export const getChartView = (options) => Vue.http.post(viewURL,options);