<template>
      <header class="header-container">
        <div class="main-header">
          <ul class="items-list">
          <router-link class="item" to="/">Home page</router-link>
          <router-link class="item" to="/toy/about">About</router-link>
          <router-link class="item" to="/toy">Toy store</router-link>
          <router-link class="item" to="/toy/dashboard">Dashboard</router-link>
          <router-link class="item" to="/login">Login</router-link>
          </ul>
      <button class="menu-btn" onclick="toggleMenu()">☰</button>
    </div>
  </header>
</template>
<script>
  export default {

    methods: {
    }
  }
</script>
