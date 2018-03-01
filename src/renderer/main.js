import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import '@/assets/css/application.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

// Selectively cache book data
store.subscribe((mutation, state) => {
  let store = { books: state.library.books }
  localStorage.setItem('store', JSON.stringify(store))
})

/* eslint-disable no-new */
/* eslint-disable key-spacing */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  beforeCreate () {
    this.$store.commit('initialiseStore')
  }
}).$mount('#app')
