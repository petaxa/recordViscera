import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/homeView.vue'
import Login from '@/views/user/loginView.vue'
import Register from '@/views/user/registerView.vue'
import TempView from '@/views/record/TempView.vue'
import PooView from '@/views/record/PooView.vue'
import ListView from '@/views/list/ListView.vue'
import ListPooView from '@/views/list/ListPooView.vue'
import ListTempView from '@/views/list/ListTempView.vue'
import ListPooCntView from '@/views/list/ListPooCntView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/temp',
      name: 'temp',
      component: TempView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/poo',
      name: 'poo',
      component: PooView
    },
    {
      path: '/list',
      name: 'list',
      component: ListView
    },
    {
      path: '/listPoo',
      name: 'listPoo',
      component: ListPooView
    },
    {
      path: '/listTemp',
      name: 'listTemp',
      component: ListTempView
    },
    {
      path: '/listPooCnt',
      name: 'listPooCnt',
      component: ListPooCntView
    },
  ]
})

export default router
