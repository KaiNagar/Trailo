import { createRouter, createWebHashHistory } from 'vue-router'

import loginPage from '../views/login.page.vue'
import boardList from '../views/board.list.vue'
import aboutPage from '../views/about.page.vue'

import boardDetails from '../views/board.details.vue'
import cardDetails from '../views/card.details.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'boardList',
      component: boardList,
    },
    {
      path: '/login',
      name: 'login',
      component: loginPage,
    },
    {
      path: '/board/:boardId',
      name: 'board',
      component: boardDetails,
    },
    {
      path: '/board/:boardId/:groupId/:cardId',
      name: 'card',
      component: cardDetails,
    },
    {
      path: '/about',
      name: 'about',
      component: aboutPage,
    },
  ],
})

export default router
