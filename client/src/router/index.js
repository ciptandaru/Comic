import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import HomePage from '../views/HomePage.vue'
import FavoritePage from '../views/FavoritePage.vue'
import DetailPage from '../views/DetailPage.vue'
import DonatePage from '../views/DonatePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/edit-profile',
      name: 'edit-profile',
      // component: ProfilePage
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoritePage
    },
    {
      path: '/detail/:slug',
      name: 'detail',
      component: DetailPage
    },
    {
      path: '/donate',
      name: 'donate',
      component: DonatePage
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('access_token') && to.name === 'login'){
    next('/')
  } else if(!localStorage.getItem('access_token') && (to.name === 'home' || to.name === 'favorites')){
    next('/login')
  } else {
    next()
  }
})
export default router
