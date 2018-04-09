<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
        <h1 class="title">
          We're always happy to help
        </h1>
        <h2 class="subtitle">
          If you have any questions or complaints, don't hesitate to let us know. We take our service to you very seriously
        </h2>
        </div>
      </div>
      <transition name="fade">
        <b-field label="Employee">
          <b-input :disabled="success" v-model="employee" placeholder="Employee's name" maxlength="200"></b-input>
        </b-field>
      </transition>
      <transition name="fade">
        <b-field label="Message" style="max-width: 800px">
          <b-input :disabled="success" maxlength="200" type="textarea" v-model="message"></b-input>
        </b-field>
      </transition>
      <section class="success">
        <b-message type="is-success" v-if="success">
          Your message has been received!
        </b-message>
      </section>
    </section>
    <a class="button is-primary" @click="submit" v-if="!success">Submit</a>
    </div>
</template>

<script>
  export default {
    name: 'MapCard',
    data: function () {
      return {
        message: "",
        employee: "",
        success: false
      }
    },
    methods: {
      submit: async function () {
        let customer = sessionStorage.getItem('regal-bank-token')
        if (customer === null){
          customer = "anonymous"
        }
        let data = {
          message: this.message,
          employee: this.employee,
          customer: customer
        }
        const formBody = Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&")
        const response = await fetch('http://localhost:8090/api/complaint', {
        body: formBody,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        "Content-Type": "application/x-www-form-urlencoded",
        mode: 'cors'
        })
        const message = await response.json()
        if(message.status === 'success') {
          this.success = true
        }
      }
    }
  }
</script>


<style scoped>
.hero-content {
  width: 100%;
  max-width: 1200px;
}
</style>
