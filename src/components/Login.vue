<template>
<div>
  <section class='hero'>
    <div class='hero-body'>
      <div class='container'>
        <h1 class='title'>
          {{title}}
        </h1>
        <h2 class='subtitle'>
          {{subtitle}}
        </h2>
      </div>
    </div>
  </section>
  <div class="container login-container">
        <transition name="in-out">
          <div>
            <form class="username-section" v-if="!is_valid_username && !login_success">
              <b-field label="Username">
                  <b-input maxlength="100" v-model="username" id="username-input"></b-input>
              </b-field>
              <button v-on:click="query" class="button is-primary">Fetch</button>
            </form>
            <form class="login-section" v-if="is_valid_username && !login_success">
              <div class="two-elements" >
                <b-field class="input-field" label="Email">
                    <b-input type="email" maxlength="100" v-model="email" ></b-input>
                </b-field>
                <b-field class="input-field" label="Password">
                    <b-input maxlength="100" type="password" v-model="password" ></b-input>
                </b-field>
              </div>
              <b-field class="input-field" v-bind:label="security_question">
                  <b-input maxlength="100" v-model="answer" ></b-input>
              </b-field>
              <button v-on:click="login" class="button is-primary">Login</button>
            </form>
            <router-link to="/AccountSummary" tag="button" class="button is-primary" v-if="login_success">Continue</router-link>
          </div>
        </transition>
  </div>
</div>
</template>

<style >
.login-container {
  display: flex;
  justify-content: center;
}

.username-section {
  max-width: 482px;
}

.login-section {
  max-width: 1200px;
}

.two-elements{
  display: flex;
}

.input-field{
  margin-left: 5px;
  margin-right: 5px;
}

#username-input {
  max-width: 300px;
}
</style>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      username: "",
      input_type: "is-danger",
      title: "Welcome Back!",
      subtitle: "Enter your username so we can fetch your specific security questsions",
      is_valid_username: false,
      security_question: "",
      email: "",
      password: "",
      answer: "",
      token: null,
      login_success: false
    };
  },
  methods: {
    query: async function (event) {
      try {
        const url = "http://localhost:8090/api/getUserLogin?username=" + this.username
        this.is_valid_username = await fetch(url)
          .then(response => response.json())
        
        if (this.is_valid_username === true){
          this.get_user_question()
          this.subtitle = "Alright, we grabbed your security questions. Please fill out the following forms"
        }else{
          this.subtitle = "Oops, we don't have that username on file. Try again"
          this.username = ""
        }
      } catch (error) {
        console.log(error)
      }
    },
    get_user_question: async function () {
      const url = "http://localhost:8090/api/getSecurityQuestion?username=" + this.username
      const response = await fetch(url)
        .then(response => response.json())
      this.security_question = response[0]
    },
    login: async function (){
      const url = "http://localhost:8090/api/authenticate"

      const response = await fetch(url, {
        body: 'username=' + this.username + '&password=' + this.password +  '&email=' + this.email + '&answer='+ this.answer,
         headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
        method: 'POST',
        mode: 'cors'
      })

      this.token = await response.text();

      if (this.token === "Invalid"){
        this.subtitle = "The credentials you entered were incorrect. Please try again."
        this.title = "Oops - that's not good..."
        this.email = ""
        this.password = ""
        this.answer = ""
        this.login_success = false
      }else{
        this.subtitle = "Everything looks good. Click on the button below to continue to your account summary page"
        this.title = "Success!"
        sessionStorage.setItem('regal-bank-token', this.token);
        this.login_success = true
      }
    }
  }
}
</script>
