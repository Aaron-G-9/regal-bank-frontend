<template>
  <div id="app">
     <Navbar v-if="$route.meta.requiresNavbar"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import AccountTypes from '@/components/AccountTypes'
import CreditCards from '@/components/CreditCards'
import OnlineBanking from '@/components/OnlineBanking'
import Login from '@/components/Login'
import AccountSummary from '@/components/AccountSummary'
import AddTransaction from '@/components/AddTransaction'
import TransactionHistory from '@/components/TransactionHistory'
import ApplyForAccount from '@/components/ApplyForAccount'
import Help from '@/components/Help'
import Admin from '@/components/Admin'

export default {
  name: 'App',
  components: {
    Navbar,
    AccountTypes,
    CreditCards,
    OnlineBanking,
    Login,
    AccountTypes,
    AddTransaction,
    TransactionHistory,
    ApplyForAccount,
    Help,
    Admin
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
