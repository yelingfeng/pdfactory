import Vue from 'vue'
import App from './components/App'
import store from './vuex/store'
import "./assets/css/reset.css"
import "./assets/css/zlayout.css"
import 'vue-toastr/dist/vue-toastr.css'

Vue.config.debug = true


window.log = (op) =>{
   return JSON.parse(JSON.stringify(op));
}



new Vue({
   el : "body",
   store,
   components:{
       App
   }
})

