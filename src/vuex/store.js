import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
import showMsg from "./modules/showMsg"
import app from "./modules/app.js"

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
Vue.config.debug = debug

export default new Vuex.Store({
  modules: {
    showMsg,
    app
  },
  strict: debug,
  middlewares
})
