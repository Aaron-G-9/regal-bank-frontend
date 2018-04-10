<template>
  <nav class="navbar is-fixed-top">
    <div class="navbar-brand">
      <!-- navbar items, navbar burger... -->
      <div class="navbar-burger">
        <span>Home</span>
        <span>Account Features</span>
        <span>About</span>
        <span>Help</span>
        <span>Log In</span>
        <span>Join Now</span>
      </div>
    </div>
    <div class="navbar-menu">
      <!-- navbar start, navbar end -->
      <div class="navbar-start">
        <!-- navbar items -->
        <router-link class="navbar-item" to="/">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="Bulma">
        </router-link>
        <router-link class="navbar-item" to="AccountTypes">
          Account Types
        </router-link>
        <router-link class="navbar-item" to="CreditCards">
          Credit Cards
        </router-link>
        <router-link class="navbar-item" to="OnlineBanking">
          Online Banking
        </router-link>
        <a class="navbar-item">
          About
        </a>
        <router-link class="navbar-item" to="Help">
          Help
        </router-link>
      </div>

      <div class="navbar-end">
        <!-- navbar items -->
        <router-link class="navbar-item" to="Login">
          Log In
        </router-link>
        <router-link to="/Join" class="navbar-item">
          Join Now
        </router-link>
        <a onclick="sessionStorage.clear()" class="navbar-item">
          Sign Out
        </a>
      </div>
    </div>
  </nav>
</template>