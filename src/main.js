import Vue from 'vue'
import App from './components/App'
import store from './vuex/store'
import "./assets/css/reset.css"
import "./assets/css/zlayout.css"
import 'vue-toastr/dist/vue-toastr.css'
new Vue({
   el : "body",
   store,
   components:{
       App
   }
})

