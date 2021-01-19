import Vue from 'vue'
import AuthWrapper from "./AuthWrapper";
import api from './utils/api'
import router from './router'
import { ModalPlugin } from 'bootstrap-vue'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
Vue.$api = api

Object.defineProperty(Vue.prototype, '$api', {
  get() {
    return api
  }
})

Object.defineProperty(Vue.prototype, '$session', {
  get() {
    return window.sessionStorage
  }
})

Vue.use(ModalPlugin)

const moment = require('moment')
require('moment/locale/fr')
Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  router,
  render: h => h(AuthWrapper)
}).$mount('#app')

