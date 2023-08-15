import { createRouter, createWebHistory } from 'vue-router'
import TempView from '@/views/TempView.vue'
import PooView from '@/views//PooView.vue'
import ListView from '@/views//ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/temp',
      name: 'temp',
      component: TempView
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
    }
  ]
})

export default router
