import Home from '@/views/Home.vue'
import Settings from '@/views/Settings.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'

import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {path: '/', name: 'home', component: Home},
  {path: '/settings', name: 'settings', component: Settings},
  {path: '/register', name: 'register', component: Register},
  {path: '/login', name: 'login', component: Login},
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
