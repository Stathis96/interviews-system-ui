import { createRouter, createWebHistory } from 'vue-router'
import { authService } from '../boot/auth'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.path === '/login') {
    authService.handleLoginRedirect()
      .then(() => {
        next('/')
      })
      .catch(error => {
        console.log(error)
        next('/')
      })
  } else if (to.path === '/logout') {
    authService.handleLogoutRedirect()
      .then(() => {
        next('/')
      })
      .catch(error => {
        console.log(error)
        next('/:catchAll(.*)*')
      })
  } else {
    authService.getProfile().then(async (response) => {
      console.log('res from router is', response)
      localStorage.setItem('user', response as string)
      await authService.getAccessToken()
        .then(token => {
          localStorage.setItem('token', token as string)
        })
    })
      .catch(err => console.log('err', err))
    next()
  }
})

export default router
