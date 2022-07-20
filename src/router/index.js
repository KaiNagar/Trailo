import { createRouter, createWebHashHistory } from 'vue-router'

import loginPage from '../views/login.page.vue'
import homePage from '../views/home.page.vue'
import aboutPage from '../views/about.page.vue'

import boardPage from '../views/board.page.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/login',
      name: 'login',
      component: loginPage,
    },
    {
      path: '/board',
      name: 'board',
      component: boardPage,
    },
    {
      path: '/about',
      name: 'about',
      component: aboutPage,
    },
  ],
})

export default router
