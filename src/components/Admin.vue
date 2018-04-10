<template>
  <div v-if="is_admin">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
        <h1 class="title">
          Regal Timesheets
        </h1>
        <h2 class="subtitle">
          Keeping track of all your employees
        </h2>
        </div>
      </div>
    </section>
      <b-field v-if="!displaying_info" class="select-field" label="Select an employee" expanded>
        <b-select placeholder="Select an Employee" icon="account" v-model="person">
          <option
            v-for="person in employees"
            :value="person"
            :key="person">
            {{ person }}
          </option>
        </b-select>
        <button style="margin-top: 20px" class="button is-primary" @click="select">Select</button>
      </b-field>
      <transition name="fade" v-else>
        <section class="card-section">
          <div class="card summary-card top-card" style="width: 80%">
            <header class="card-header card-header-title" style="background-color: #00d1b2; color: white;">
              {{person}}
            </header>
            <div class="card-content">
              <h2>Personal Info</h2>
              <div class="content">
                <b-table class='hero-content' bordered="is_bordered" striped="is_striped" centered :data="employee_info" :columns="employee_columns"></b-table>
              </div>
              <h2>Recent Timesheet</h2>
              <div class="content">
                <b-table class='hero-content' bordered="is_bordered" striped="is_striped" centered :data="timesheet" :columns="timesheet_columns"></b-table>
              </div>
            </div>
            <footer class="card-footer">
              <a @click="punch('clock-in')" class="card-footer-item">Punch In</a>
              <a @click="punch('clock-out')" class="card-footer-item">Punch Out</a>
            </footer>
          </div>
        </section>
      </transition>
      <section class="success">
        <b-message type="is-success" v-if="success">
          Your message has been received!
        </b-message>
      </section>
    </div>
    <div v-else>
      You must be an Administrator to view this page
    </div>
</template>

<script>
  export default {
    name: 'Admin',
    data: function () {
      return {
        message: "",
        person: "",
        employee_id: "",
        employees: [],
        employee_info: [],
        is_admin: sessionStorage.getItem("regal-bank-admin"),
        displaying_info: false,
        success: false,
        timesheet: [],
        employee_columns: [
          {
            field: 'dateOfBirth',
            label: 'Birthday'
          },
          {
            field: 'street',
            label: 'Street Address'
          },
          {
            field: 'city',
            label: 'City'
          },
          {
            field: 'phone',
            label: 'Phone'
          },
          {
            field: 'title',
            label: 'Title'
          },
          {
            field: 'salary',
            label: 'Salary'
          }
        ],
        timesheet_columns: [
          {
            field: 'timestamp',
            label: 'Punch Time'
          },
          {
            field: 'punchType',
            label: 'Punch Type'
          },
        ],
      }
    },
    created(){
      this.fetch_employees()
    },
    methods: {
      fetch_employees: async function () {
        this.employees = await fetch('http://localhost:8090/api/getEmployees', {
        headers: {
          Accept: "application/json",
          Authorization: sessionStorage.getItem('regal-bank-token'),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "Content-Type": "application/x-www-form-urlencoded",
        mode: 'cors'
        }).then(response => response.json())
      },
      select: async function(){
        for (const key in this.employees){
          if (this.employees[key] === this.person){
            this.employee_id = key
          }
        }

        let data = {
          id: this.employee_id
        }

        const formBody = Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&")

        const request = await fetch('http://localhost:8090/api/getEmployeeInfo', {
        body: formBody,
        headers: {
          Accept: "application/json",
          Authorization: sessionStorage.getItem('regal-bank-token'),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "Content-Type": "application/x-www-form-urlencoded",
        method: 'POST',
        mode: 'cors'
        }).then(response => response.json())

        this.timesheet = await fetch('http://localhost:8090/api/getPunchInfo', {
        body: formBody,
        headers: {
          Accept: "application/json",
          Authorization: sessionStorage.getItem('regal-bank-token'),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "Content-Type": "application/x-www-form-urlencoded",
        method: 'POST',
        mode: 'cors'
        }).then(response => response.json())

        this.employee_info.push(request)

        this.displaying_info = true
      },
      punch: async function(text){
        let data = {
          id: this.employee_id,
          type: text
        }

        const formBody = Object.keys(data)
          .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
          .join("&")

        this.message = await fetch('http://localhost:8090/api/punch', {
        body: formBody,
        headers: {
          Accept: "application/json",
          Authorization: sessionStorage.getItem('regal-bank-token'),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        "Content-Type": "application/x-www-form-urlencoded",
        method: 'POST',
        mode: 'cors'
        }).then(response => response.json())

        if (this.message != ""){
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

.select-field{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-section{
  display: flex;
  justify-content: center;
}
</style>
