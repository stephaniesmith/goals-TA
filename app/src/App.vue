<template>
  <div id="app">
    <RouterLink to="/">Home</RouterLink>
    &nbsp;
    <RouterLink to="/auth">signin/signup</RouterLink>

    <h1 v-if="user">Log Out</h1>
    <h1 v-if="!user">Login</h1>

    <RouterView :onUSer="handleUser"/>
  </div>
</template>

<script>
import { checkForToken } from './services/api';

export default {
  name: 'app',
  data() {
    return {
      user: null
    };
  },
  created() {
    this.user = checkForToken();
  },
  methods: {
    handleUser(user) {
      this.user = user;
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
