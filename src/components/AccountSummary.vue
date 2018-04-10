<template>
  <div>
    <section class='hero' v-if="!is_logged_in">
      <div class='hero-body'>
        <div class='container'>
          <h1 class='title'>
            Oops. Looks like you're not logged in.
          </h1>
          <h2 class='subtitle'>
            Go to the login page to access your account
          </h2>
          <router-link to="/Login" tag="button" class="button is-primary">Login</router-link>
        </div>
      </div>
    </section>

    <div class="big-div-guy" v-if="is_logged_in">
      <div class="card summary-card top-card">
        <header class="card-header card-header-title" style="background-color: #00d1b2; color: white;">
          Checking and Savings Accounts
        </header>
        <div class="card-content">
          <div class="content">
            <b-table class='hero-content' bordered="is_bordered" striped="is_striped" centered :data="checking" :columns="checking_columns"></b-table>
          </div>
        </div>
        <footer class="card-footer">
          <router-link to="/AddTransaction" class="card-footer-item">Deposit</router-link>
          <router-link to="/AddTransaction" href="#" class="card-footer-item">Withdraw</router-link>
          <router-link to="/TransactionHistory" href="#" class="card-footer-item">See History</router-link>
        </footer>
      </div>
      <div class="card summary-card">
        <header class="card-header card-header-title" style="background-color: #00d1b2; color: white;">
          Loans and Credit Cards
        </header>
        <div class="card-content">
          <div class="content">
            <b-table class='hero-content' bordered="is_bordered" striped="is_striped" centered :data="credit" :columns="credit_columns"></b-table>
          </div>
        </div>
        <footer class="card-footer">
          <router-link to="/AddTransaction" class="card-footer-item">Make a Payment</router-link>
          <router-link to="/TransactionHistory" href="#" class="card-footer-item">See History</router-link>
        </footer>
      </div>
      <router-link to="/AddAccount" style="margin-top: 30px"class="button is-primary">Add new account</router-link>
    </div>
  </div>
</template>

<style scoped>
.summary-card{
  width: 75%;
  margin-top: 10px;
}

.top-card{
  border-top: gray;
}

.big-div-guy{
  background-color: tan;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<script>
  export default {
    name: 'AccountSummary',
    data: function(){
      return{
        account_types: [],
        is_striped: true,
        is_bordered: true,
        is_logged_in: false,
        checking: [],
        credit: [],
        checking_columns: [
          {
            field: 'name',
            label: 'Name'
          },
          {
            field: 'available',
            label: 'Available'
          },
          {
            field: 'balance',
            label: 'Total Balance'
          }
        ],
        credit_columns: [
          {
            field: 'name',
            label: 'Name'
          },
          {
            field: 'amountDue',
            label: 'Next Payment'
          },
          {
            field: 'dueDate',
            label: 'Payment Due'
          },
          {
            field: 'available',
            label: 'Available'
          },
          {
            field: 'balance',
            label: 'Total Balance'
          }
        ],
      }
    },
    created() {
      if (sessionStorage.getItem('regal-bank-token') !== null){
        this.fetch_account_types()
        this.fetch_accounts()
        this.fetch_credit()
        this.is_logged_in = true
      }
    },
    methods: {
      fetch_accounts: async function(){
        const response = await fetch('http://localhost:8090/api/getAccountSummary', {
          headers: {
              Accept: 'application/json',
              Authorization: sessionStorage.getItem('regal-bank-token'),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          method: 'POST',
          mode: 'cors'
        }).then(response => response.json())


        for (let key in response){
          if (key.toLowerCase().includes('credit')){
            this.credit.push({
              name: key,
              amountDue: 15,
              dueDate: new Date('2018-5-2').toLocaleDateString("en-US"),
              available: response[key][0].newBalance,
              balance: response[key][0].newBalance
            })
          }else{
            this.checking.push({
              name: key,
              available: response[key][0].newBalance,
              balance: response[key][0].newBalance
            })
          }
        }
        console.log(this.credit)

      },

      fetch_credit: async function(){
        const response = await fetch('http://localhost:8090/api/getUserCredit', {
          headers: {
              Accept: 'application/json',
              Authorization: sessionStorage.getItem('regal-bank-token'),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          method: 'POST',
          mode: 'cors'
        }).then(response => response.json())
      },
      fetch_account_types: async function(){
        this.account_types = await fetch('http://localhost:8090/api/getUserAccounts', {
          headers: {
              Accept: 'application/json',
              Authorization: sessionStorage.getItem('regal-bank-token'),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          method: 'POST',
          mode: 'cors'
        }).then(response => response.json())

      },
    }
  }
</script>
