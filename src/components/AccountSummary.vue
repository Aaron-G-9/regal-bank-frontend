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

    <div style="background-color: tan; height: 93vh;" v-if="is_logged_in">
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
          <a href="#" class="card-footer-item">Deposit</a>
          <a href="#" class="card-footer-item">Withdraw</a>
          <a href="#" class="card-footer-item">See History</a>
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
          <a href="#" class="card-footer-item">Make a Payment</a>
          <a href="#" class="card-footer-item">Redeem Cashback</a>
          <a href="#" class="card-footer-item">See History</a>
        </footer>
      </div>
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
</style>

<script>
  export default {
    name: 'AccountSummary',
    data: function(){
      return{
        is_striped: true,
        is_bordered: true,
        is_logged_in: false,
        checking: [{name: 'Golden Grizly Checking', available: 504.00, balance: 450.00}, {name: 'Golden Grizly Saving', available: 1504.00, balance: 1000.00}],
        credit: [{name: 'Foxtrot Credit', amountDue: 15.00, dueDate: '12/06/1996', available: 1500.00, balance: 1420.00}, {name: 'Platinum Plus Loan', amountDue: 15.00, dueDate: '12/06/1996', available: 1504.00, balance: 1000.00}],
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
        this.is_logged_in = true
      }
    },
    methods: {

    }
  }
</script>
