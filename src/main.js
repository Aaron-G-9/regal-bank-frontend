// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import router from './router'
//import VueLazyLoad from 'vue-lazyload'
import VueClazyLoad from 'vue-clazy-load'

Vue.config.productionTip = false
Vue.use(Buefy)
//Vue.use(VueLazyLoad)
Vue.use(VueClazyLoad)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
