<template>
  <div class="auth">
    <h2>{{label}}</h2>
    <button @click="type = isSignUp ? 'singIn' : 'signUp'">
      {{
        isSignUp
          ? "Already a user? Click here to sign in"
          : "New? Click here to sign up"
      }}
    </button>
    <pre>{{error}}</pre>

    <form @submit.prevent="handleSubmit">
      <input v-model="credentials.email" placehoder="email">
      <input v-model="credentials.password" placehoder="password">
      <button>SignIn</button>
    </form>
  </div>
</template>

<script>
import { signIn, signUp } from '../services/api';

export default {
  name: 'Auth',
  props: ['onUser'],
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      type: 'SignIn',
      error: null
    };
  },
  computed: {
    isSignUp() {
      return this.type === 'signUp';
    },
    label() {
      return this.isSignUp ? 'Sign Up' : 'Sign In';
    }
  },
  methods: {
    handleSubmit() {
      this.error = null;
      signIn(this.credentials)
        .then(user => {
          this.onUser(user);
          this.$router.push('/');
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
