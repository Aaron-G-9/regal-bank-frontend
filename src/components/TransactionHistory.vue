<template>
  <transition appear name="fade">
    <div class="container is-widescreen">
      <section>
        <h1 class="title">
          History
        </h1/>
        <h2 class='subtitle'>
          Please select which account's history you want to view
        </h2>
        <b-field class="input-div" label="View Account History">
            <b-select placeholder="Select an account" icon="account" v-model="selected_account" >
                <optgroup label="Checking Accounts">
                  <option
                    v-for="option in accounts"
                    :value="option"
                    :key="option.accountName">
                    {{ option.accountName }}
                  </option>
                </optgroup>

                <optgroup label="Credit Cards">
                  <option
                    v-for="option in credit"
                    :value="option"
                    :key="option.name">
                    {{ option.name }}
                  </option>
                </optgroup>
            </b-select>
            <button style="margin-top:15px" class="button is-primary" @click="fetch_transactions">See transactions</button>
        </b-field>

      </section>
      <br/>
      <transition name="fade">
        <div v-if="is_account_selected" class="card summary-card top-card">
          <header class="card-header card-header-title" style="background-color: #00d1b2; color: white;">
            {{transaction_title}}
          </header>
          <div class="card-content">
            <div class="content">
              <b-table class='hero-content' bordered="is_bordered" striped="is_striped" centered :data="transaction_list" :columns="transaction_columns"></b-table>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>

</template>
<script>
  export default {
    name: 'TransactionHistory',
    data: function(){
      return{
        is_account_selected: false,
        selected_account: "",
        transaction_list: [],
        account_types: [],
        accounts: [],
        transaction_title: "",
        credit: [],
        transaction_list: [],
        transaction_columns: [
          {
            field: 'transactionTime',
            label: 'Transaction Time'
          },
          {
            field: 'oldBalance',
            label: 'Previous Balance'
          },
          {
            field: 'delta',
            label: 'Transaction Amount'
          },
          {
            field: 'newBalance',
            label: 'Current Balance'
          }
        ],
      }
    },
    created(){
      this.fetch_accounts()
      this.fetch_credit()
    },
    methods: {
      fetch_accounts: async function(){
        this.accounts = await fetch('http://localhost:8090/api/getUserAccounts', {
          headers: {
              Accept: 'application/json',
              Authorization: sessionStorage.getItem('regal-bank-token'),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          method: 'POST',
          mode: 'cors'
        }).then(response => response.json())
      },
      fetch_credit: async function(){
        this.credit = await fetch('http://localhost:8090/api/getUserCredit', {
          headers: {
              Accept: 'application/json',
              Authorization: sessionStorage.getItem('regal-bank-token'),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          method: 'POST',
          mode: 'cors'
        }).then(response => response.json())
      },
      fetch_transactions: async function(){
        if (this.selected_account == ""){
          return
        }
        this.is_account_selected = true
        let type
        let id
        if (this.selected_account.accountId !== undefined){
          this.transaction_title = this.selected_account.accountName
          type = "account"
          id = this.selected_account.accountId
        }else if (this.selected_account.id !== undefined){
          this.transaction_title = this.selected_account.name
          type = "credit"
          id = this.selected_account.id
        }

        let data = {
          type: type,
          id: id,
        }
        const formBody = Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&")

        let response = await fetch('http://localhost:8090/api/transactionHistory', {
          body: formBody,
          headers: {
              Accept: 'application/json',
              Authorization: sessionStorage.getItem('regal-bank-token'),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          method: 'POST',
          mode: 'cors'
        }).then(response => response.json())

        for (let option of response){
          console.log(option)
          const d = new Date(option.transactionTime)
          option.transactionTime = d.toLocaleDateString("en-US")
        }

        this.transaction_list = response
      },

    }
  }

</script>
<style scoped>
.input-div{
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
