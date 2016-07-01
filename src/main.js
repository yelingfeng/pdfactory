import Vue from 'vue'
import App from './components/App'
import store from './vuex/store'
import "./assets/css/reset.css"
import "./assets/css/zlayout.css"
import 'vue-toastr/dist/vue-toastr.css'
import "./assets/vendor/range/css/ion.rangeSlider.css"
import "./assets/vendor/range/css/ion.rangeSlider.skinHTML5.css"
import "./assets/vendor/range/css/normalize.css"
new Vue({
   el : "body",
   store,
   components:{
       App
   }
})

