import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import InputDailyScrum from '../views/InputDailyScrum.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'register',
    components: {default: Register},
    
  },
  {
    path: '/login',
    name: 'login',
    components: {default: Login}
  },
  {
    path: '/inputdailyscrum',
    name: 'inputdailyscrum',
    components: {default: InputDailyScrum, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
