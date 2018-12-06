import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MyOrders from '@/components/MyOrders'
import Manage from '@/components/Manage'
import CustomerOrders from '@/components/CustomerOrders'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('userId')) {
          next({
            path: '/login'
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/my-orders',
      name: 'MyOrders',
      component: MyOrders,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('userId')) {
          next({
            path: '/login'
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('userId')) {
          next({
            path: '/login'
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/customer-orders',
      name: 'CustomerOrders',
      component: CustomerOrders,
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem('userId')) {
          next({
            path: '/login'
          })
        } else {
          next()
        }
      }
    }
  ]
})
