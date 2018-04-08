<template>
  <transition appear name="fade">
    <div class="container is-widescreen">
      <section>
        <h1 class="title">
          Apply for a new type of account
        </h1/>
        <h2 class='subtitle'>
          We have many to choose from, and are happy to meet your needs
        </h2>
        <b-field class="input-div" label="Select the account type you'd like">
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

                <optgroup label="Loans">
                    <option value="jamie-lannister">Car</option>
                    <option value="tyrion-lannister">School</option>
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
              Show account information and necessary questions.
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>

</template>
<script>
  export default {
    name: 'ApplyForAccount',
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
