<template>
  <transition appear name="fade">
    <div class="container is-widescreen">
      <section>
        <h1 class="title">
          Add Account
        </h1/>
        <b-field class="input-div" label="Select Account Type">
            <b-select v-model="selected_option" placeholder="Select an account" icon="account">
              <option
                v-for="option in accountOptions"
                :value="option"
                :key="option">
                {{ option }}
              </option>
            </b-select>
            <button style="margin-top:30px" class="button is-primary" @click="addAccount">Add Account</button>
            <b-message style="margin-top:70px" type="is-success" v-if="success">
              Account Added!
            </b-message>
        </b-field>
      </section>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AddAccount",
  data: function() {
    return {
      accountOptions: [],
      selected_option: "",
      success: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: async function() {
      try {
        this.accountOptions = await fetch(
          "http://localhost:8090/api/addAccountOptions"
        ).then(response => response.json());

      } catch (err) {
        console.error(err);
      }
    },
    addAccount: async function(){
      const data = {
        name: this.selected_option
      }

      const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')

      const response = await fetch('http://localhost:8090/api/addAccount', {
        body: formBody,
        headers: {
            Accept: 'application/json',
            Authorization: sessionStorage.getItem('regal-bank-token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        method: 'POST',
        mode: 'cors'
      }).then(response => response.text())

      if (response == "Success"){
        this.success = true
      }


    }
  }
};
</script>

<style scoped>
.hero-content {
  width: 100%;
  max-width: 1200px;
}
.input-div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>