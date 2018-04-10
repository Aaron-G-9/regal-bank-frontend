import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Join from '@/components/Join'
import Help from '@/components/Help'
import AccountTypes from '@/components/AccountTypes'
import CreditCards from '@/components/CreditCards'
import OnlineBanking from '@/components/OnlineBanking'
import Login from '@/components/Login'
import AccountSummary from '@/components/AccountSummary'
import AddTransaction from '@/components/AddTransaction'
import TransactionHistory from '@/components/TransactionHistory'
import ApplyForAccount from '@/components/ApplyForAccount'
import Admin from '@/components/Admin'

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
    },
    {
      path: '/Help',
      name: 'Help',
      component: Help,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/AddTransaction',
      name: 'AddTransaction',
      component: AddTransaction,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/TransactionHistory',
      name: 'TransactionHistory',
      component: TransactionHistory,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/ApplyForAccount',
      name: 'ApplyForAccount',
      component: ApplyForAccount,
      meta: {
        requiresNavbar: true
      }
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresNavbar: true
      }
    }
  ]
})
