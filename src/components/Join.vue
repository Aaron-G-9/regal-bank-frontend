<template>
  <div class="container is-widescreen">
    <section>
      <h1 class="title">
        Hello there
      </h1/>
      <h2 class='subtitle'>
        {{subheader_one}}
        <br/> 
        {{subheader_two}}      
      </h2>
      <br/> 
      <router-link to="/AccountSummary" tag="button" class="button is-primary" v-if="third_page">Continue</router-link>
    </section>
    <div class="form-div" v-if="first_page" >
      <form class="form-field">
        <b-field grouped group-multiline position="is-centered" class="login-control">
          <b-field label="First Name" expanded>
            <b-input v-model="first_name"></b-input>
          </b-field>
          <b-field label="Last Name" expanded>
            <b-input v-model="last_name"></b-input>
          </b-field>
        </b-field>

        <b-field position="is-centered" grouped group-multiline class="login-control">
          <b-field label="Street Address" expanded>
            <b-input v-model="street_address"></b-input>
          </b-field>
          <b-field label="Appartment Number">
            <b-input v-model="apartment_number"></b-input>
          </b-field>
          <b-field label="City">
            <b-input v-model="city"></b-input>
          </b-field>
        </b-field>

        <b-field position="is-centered" grouped group-multiline class="login-control">
          <b-field label="Country" expanded>
            <b-select v-model="country" expanded>
              <option value="usa">United States</option>
              <option value="mexico">Mexico</option>
            </b-select>
          </b-field>
          <b-field label="State" expanded>
            <b-select v-model="state" expanded>
              <option 
                v-for="state in states"
                :value="state.name">
                {{state.name}}  
              </option>
            </b-select>
          </b-field>
          <b-field label="Zip Code" expanded>
            <b-input v-model="zip_code"></b-input>
          </b-field>
        </b-field>

        <b-field position="is-centered" grouped group-multiline class="login-control">
          <b-field label="Date of Birth" expanded>
            <b-datepicker
              v-model="date"
              placeholder="Click to select..."
              icon="calendar-today">
            </b-datepicker>
          </b-field>
          <b-field label="Gender" expanded>
            <b-select v-model="gender" expanded>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non Binary</option>
              <option value="na">Prefer not to respond</option>
            </b-select>
          </b-field>
        </b-field>

      </form>
    </div>
    <button v-on:click="personalInfo" class="button is-primary" v-if="first_page">Next Page</button>

<!--  SECOND PAGE   -->

  <transition appear name="fade" mode="out-in">
    <div class="form-div" v-if="second_page && !is_valid_username">
      <form class="form-field">
        <b-field grouped group-multiline position="is-centered" class="login-control">
          <b-field label="Username" >
            <b-input v-model="username"></b-input>
          </b-field>
        </b-field>
        <button v-if="!is_valid_username" v-on:click="check_username" class="button is-primary login-control">Check</button>
      </form>
    </div>

    <div class="form-div" v-if="second_page && is_valid_username">
      <form class="form-field">
        <b-field grouped group-multiline position="is-centered" class="login-control">
          <b-field label="Username" expanded>
            <b-input v-model="username" disabled></b-input>
          </b-field>
          <b-field class="input-field" label="Email">
              <b-input type="email" maxlength="100" v-model="email" ></b-input>
          </b-field>
          <b-field label="Password" expanded>
            <b-input v-model="password"></b-input>
          </b-field>
        </b-field>

        <b-field position="is-centered" grouped group-multiline class="login-control">
          <b-field label="Security Question" expanded>
            <b-input placeholder="Ex: What's your favorite color?" v-model="security_question"></b-input>
          </b-field>
          <b-field label="Answer">
            <b-input placeholder="Ex: green" v-model="security_answer"></b-input>
          </b-field>
        </b-field>

        <b-field position="is-centered" grouped group-multiline class="login-control">
          <b-field label="Telephone" expanded>
            <b-input v-model="phone"></b-input>
          </b-field>
          <b-field label="Annual Income" expanded>
            <b-input type="number" v-model="income"></b-input>
          </b-field>
          <b-field label="Credit Status" expanded>
            <b-select v-model="credit_status" expanded>
              <option value="male">Excellent</option>
              <option value="female">Good</option>
              <option value="non-binary">Bad</option>
            </b-select>
          </b-field>
        </b-field>

        <button v-on:click="account_info" class="button is-primary">Continue</button>
      </form>

      
    </div>
  </transition>
  </div>
</template>

<script>
export default {
  name: "Join",
  data: function(){
    return{
      apartment_number: "",
      city: "",
      credit_status: "",
      country: "",
      date: new Date(),
      email: "",
      first_name: "",
      first_page: true,
      gender: "",
      second_page: false,
      third_page: false,
      last_name: "",
      password: "",
      street_address: "",
      zip_code: "",
      security_question: "",
      security_answer: "",
      phone: "",
      income: 0,
      state: "",
      show_modal: false,
      subheader_one: "We’re so glad you’re ready to join.",
      subheader_two: "This should only take a couple minutes. Let’s start by entering in your personal info",
      states: ["", ""],
      username: "",
      is_valid_username: false,
      if_valid_password: false
    }
  },
  created() {
    this.getStateData()
  },
  methods: {
    getStateData: async function(){
      this.states = await fetch('https://gist.githubusercontent.com/tvpmb/4734703/raw/b54d03154c339ed3047c66fefcece4727dfc931a/US%2520State%2520List')
          .then(response => response.json())
    },
    personalInfo: function(){
      if (this.first_name === null || this.last_name === null || this.street_address === null || this.zip_code === null){
        alert('Please fill out all forms')
      }else{
        this.first_page = false
        this.subheader_one = "Thanks for the info! We're almost done..."
        this.subheader_two = "Now we just need to secure your online account"
        this.second_page = true
      }
    },
    account_info: async function(){
      //this.phone = this.sanitize_phone(this.phone)
      if(this.password === "" || this.security_question === "" || this.security_answer === "" || this.phone === ""){
        alert('Please fill out all forms')
      }else{
        const data = {
          firstName: this.first_name,
          lastName: this.last_name,
          dateOfBirth: this.date,
          streetAddress: this.street_address,
          city: this.city,
          state: this.state,
          country: this.country,
          email: this.email,
          gender: this.gender,
          phone: this.phone,
          creditStatus: this.credit_status,
          username: this.username,
          password: this.password,
          securityQuestion: this.security_question,
          securityAnswer: this.security_answer,
          //security_picture
          annualIncome: this.income,
          zipcode: this.zip_code
        }

        const formBody = Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&')

        const response = await fetch('http://localhost:8090/api/createUser', {
          body: formBody,
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          method: 'POST',
          mode: 'cors'
        })
        
        if (response !== null && response !== "" && response !== undefined){
          let isAdmin = false
          if (this.username === "amgoodfellow" || this.username === "calee"){
            isAdmin = true
          }
          sessionStorage.setItem('regal-bank-admin', isAdmin);
          sessionStorage.setItem('regal-bank-token', response);
          this.first_page = false
          this.second_page = false
          this.third_page = true
          this.subheader_one = "Welcome to the Regal family! I guess you're royalty now ;)"
          this.subheader_two = "Click below to continue to your account summary page"
        }
      }
    },
    check_username: async function(){
      const url = "http://localhost:8090/api/getUserLogin?username=" + this.username
      const is_taken = await fetch(url)
        .then(response => response.json())

      this.is_valid_username = !is_taken
    },
    check_password: function(){
      this.is_valid_password = true
    },
    sanitize_phone: function(phone){
      if (/^[0-9]+$/.test(phone)) {
        return phone.replace(/[^0-9]/g, '')
          .replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
      }
      return ""
    }
  }
}
</script>

<style scoped>
.title {
  margin-top: 10%;
}

.form-div{
  display: flex;
  justify-content: center;
  margin-bottom: 25px
}

.login-control{
  margin-top: 1%;
}

.name-group{
  margin-top: 3%;
}

.form-field{
  width: 70%;
}

</style>
