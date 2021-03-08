import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import toyApp from '../views/toy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'


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
]

const router = new VueRouter({
  routes
})

export default router
