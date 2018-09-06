<template>
  <div id="app">
    <RouterLink to="/">Home</RouterLink>
    &nbsp;
    <RouterLink v-if="!user" to="/auth">Login</RouterLink>
    &nbsp;
    <RouterLink v-if="user" to="/goals">My Goals</RouterLink>
    &nbsp;
    <a v-if="user" href="/" @click.prevent="handleSignOut">Log Out</a>

    <RouterView :onUser="handleUser" :user="user"/>
  </div>
</template>

<script>
import { checkForToken, signOut } from './services/api';

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
  watch: {
    type(newType, oldType) {
      if(newType !== oldType) {
        this.error = null;
      }
    }
  },
  methods: {
    handleUser(user) {
      this.user = user;
    },
    handleSignOut() {
      signOut();
      this.user = null;
      this.$router.push('/');
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
  margin-top: 50px;
}
</style>
