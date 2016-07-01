import Vue from 'vue'
import App from './components/App'
import store from './vuex/store'
import "./assets/css/reset.css"
import "./assets/css/zlayout.css"
import 'vue-toastr/dist/vue-toastr.css'
<<<<<<< HEAD
import "./assets/vendor/range/css/ion.rangeSlider.css"
import "./assets/vendor/range/css/ion.rangeSlider.skinHTML5.css"
import "./assets/vendor/range/css/normalize.css"
=======

Vue.config.debug = true



>>>>>>> 2478b67338341ec6f70ab6c50946332bfe2e4afb
new Vue({
   el : "body",
   store,
   components:{
       App
   }
})

