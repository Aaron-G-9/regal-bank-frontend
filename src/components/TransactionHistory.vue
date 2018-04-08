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
            <b-select placeholder="Select an account" icon="account" @input="select_account" v-model="selected_account" >
                <optgroup label="Checking Accounts">
                    <option value="flint">Totally Gold Checking</option>
                    <option value="silver">Premium Checking</option>
                </optgroup>

                <optgroup label="Savings Accounts">
                    <option value="heisenberg">Grizzly Saver</option>
                </optgroup>

                <optgroup label="Credit Cards">
                    <option value="jamie-lannister">Alpha</option>
                    <option value="tyrion-lannister">Foxtrot</option>
                </optgroup>

            </b-select>
        </b-field>

      </section>
      <br/>
      <transition name="fade">
        <div v-if="is_account_selected" class="card summary-card top-card">
          <header class="card-header card-header-title" style="background-color: #00d1b2; color: white;">
            {{selected_account}}
          </header>
          <div class="card-content">
            <div class="content">
              <b-table class='hero-content' bordered="is_bordered" striped="is_striped" centered :data="checking" :columns="checking_columns"></b-table>
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
      }
    },
    methods: {
      select_account: function(value){
        this.is_account_selected = true
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
