import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Join from '@/components/Join'
import AccountTypes from '@/components/AccountTypes'
import CreditCards from '@/components/CreditCards'
import OnlineBanking from '@/components/OnlineBanking'
import Login from '@/components/Login'
import AccountSummary from '@/components/AccountSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/join',
      name: 'Join',
      component: Join,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/AccountTypes',
      name: 'AccountTypes',
      component: AccountTypes,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/CreditCards',
      name: 'CreditCards',
      component: CreditCards,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/OnlineBanking',
      name: 'OnlineBanking',
      component: OnlineBanking,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/AccountSummary',
      name: 'AccountSummary',
      component: AccountSummary,
      meta: {
        requiresNavbar: true
      }
    }
  ]
})
