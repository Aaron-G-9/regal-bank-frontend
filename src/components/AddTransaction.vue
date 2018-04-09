<template>
  <transition appear name="fade">
    <div class="container is-widescreen">
      <section>
        <h1 class="title">
          Transfer
        </h1/>
        <b-notification :active.sync="warning_shown" type="is-danger">
          {{alert_message}}
        </b-notification>
        <b-field class="input-div" label="Transfer From:">
            <b-select v-model="from" placeholder="Select an account" icon="account">
                <optgroup label="Checking/Saving Accounts">
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

                <optgroup labjel="Other">
                  <option value="cash">Cash Transfer</option>
                </optgroup>
                

            </b-select>
        </b-field>
        
        <b-field class="input-div" label="Transfer To:">

            <b-select placeholder="Select an account" v-model="to" icon="account">
                <optgroup label="Checking/Saving Accounts">
                  <option
                    v-for="option in accounts"
                    :value="option.accountName"
                    :key="option.accountName">
                    {{ option.accountName }}
                  </option>
                </optgroup>

                <optgroup label="Credit Cards">
                  <option
                    v-for="option in credit"
                    :value="option.name"
                    :key="option.name">
                    {{ option.name }}
                  </option>
                </optgroup>

            </b-select>
        </b-field>

        <b-field class="input-div" label="Amount" >
          <b-input v-model="amount" style="max-width: 250px;"></b-input>
        </b-field>

        <button v-bind:class="{ 'is-loading': is_loading, 'button is-primary': true }" v-on:click="transfer">Transfer</button>

      </section>
    </div>
  </transition>

</template>
<script>
  export default {
    name: 'AddTransaction',
    data: function(){
      return{
        accounts: "",
        amount: 0,
        to: "Select an account",
        from: "Select an account",
        credit: "",
        user_balances: "",
        is_logged_in: false,
        is_loading: false,
        warning_shown: false,
        alert_message: ""
      }
    },
    created() {
      if (sessionStorage.getItem('regal-bank-token') !== null){
        this.fetch_user_balance()
        this.fetch_accounts()
        this.fetch_credit()
        this.is_logged_in = true
      }
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
      fetch_user_balance: async function(){
        this.user_balances = await fetch('http://localhost:8090/api/getCustomerBalances', {
          headers: {
              Accept: 'application/json',
              Authorization: sessionStorage.getItem('regal-bank-token'),
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          method: 'POST',
          mode: 'cors'
        }).then(response => response.json())
        
      },
      transfer: async function(){
        this.is_loading = true

        if (this.from === "cash"){
          //Do stuff

          return
        }

        for(let key in this.user_balances){
          //For accounts
          if (this.from.accountName === key){
            if(this.amount > this.from.maxWithdraw){
              this.alert_message = (
                `Oops, it looks like you're trying to withdraw more than your max withdraw limit.
                  ${this.from.accountName} has a max withdraw limit of \$${this.from.maxWithdraw}.`
              )
              this.warning_shown = true
            }else if(this.user_balances[key] - this.amount < this.minimumBalance){
              this.alert_message = (
                `Oops, it looks like you're trying to withdraw too much!
                  ${this.from.accountName} has a minimum balance \$${this.from.minimumBalance}.`
              )
              this.warning_shown = true
            }else{
              console.log("attempting fetch")
              //Transfer can proceed
              //type, ID, amount
              const data = {
                type: "account",
                id: this.from.accountId,
                amount: this.amount * -1
              }

              const formBody = Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&')

              const response = await fetch('http://localhost:8090/api/addTransaction', {
                body: formBody,
                headers: {
                    Accept: 'application/json',
                    Authorization: sessionStorage.getItem('regal-bank-token'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                method: 'POST',
                mode: 'cors'
              })

              console.log(response)

              
            }
          //Now for credit cards
          }else if (this.from.name === key){
            //Maybe add credit limits?
          }
        }
                

      }
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
