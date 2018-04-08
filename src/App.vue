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

export default {
  name: 'App',
  components: {
    Navbar,
    AccountTypes,
    CreditCards,
    OnlineBanking,
    Login,
    AccountTypes
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
