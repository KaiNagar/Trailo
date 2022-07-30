import { createRouter, createWebHashHistory } from 'vue-router'

// import loginPage from '../views/login.page.vue'
import boardList from '../views/board.list.vue'
import aboutPage from '../views/about.page.vue'
import dashboardPage from '../views/dashboard.page.vue'

import boardDetails from '../views/board.details.vue'
import cardDetails from '../views/card.details.vue'
import userDetails from '../views/user.details.vue'
import homePage from '../views/home.page.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage,
    },
    {
      path: '/board',
      name: 'boardList',
      component: boardList,
    },
    {
      path: '/board/:boardId',
      name: 'board',
      component: boardDetails,
      children: [
        {
          path: ':groupId/:cardId',
          name: 'card',
          component: cardDetails,
        },
        {
          path:'dashboard',
          name:'dashboard',
          component:dashboardPage
        }
      ],
    },

    {
      path: '/about',
      name: 'about',
      component: aboutPage,
    },
    {
      path: '/user',
      name: 'user',
      component: userDetails,
    },
  ],
})

export default router
