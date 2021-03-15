import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import toyApp from '../views/toy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'
import dashboard from '../views/dashboard.vue'
import about from '../views/about.vue'
import loginSignup from '../views/account-manager'
import reviewApp from '../views/review-app'
import userDetails from '../views/user-details'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/toy',
    name: 'toyApp',
    component: toyApp
  },
  {
    path: '/toy/:toyId/details',
    name: 'toyDetails',
    component: toyDetails
  },
  {
    path: '/toy/:toyId/edit',
    name: 'toyEdit',
    component: toyEdit
  },
  {
    path: '/toy/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/toy/about',
    name: 'about',
    component: about
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/review',
    name: 'review',
    component: reviewApp
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
