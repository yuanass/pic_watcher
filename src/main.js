// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import stores from './store'

import routerList from './router/index.js'
import common from './components/common'
import storage from './utils/storage'


// Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(common);
Vue.use(storage);
Vue.prototype.$storage = storage;
const store = new Vuex.Store(stores);

const router = new VueRouter(
  // linkActiveClass: 'active',
  routerList
  // mode: 'history'
)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
