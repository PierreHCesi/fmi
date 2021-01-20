import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthWrapper from '../views/Home.vue'
import MatchSheetAdmin from '../views/MatchSheetAdmin.vue'
import MatchSheetClient from '../views/MatchSheetClient.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/gestion',
    name: 'MatchSheetAdmin',
    component: MatchSheetAdmin
  },
  {
    path: '/matchsheet',
    name: 'MatchSheetClient',
    component: MatchSheetClient
  },
  {
    path: '/login',
    name: 'AuthWrapper',
    component: AuthWrapper
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
