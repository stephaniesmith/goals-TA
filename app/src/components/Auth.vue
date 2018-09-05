<template>
  <div class="auth">
    <form @submit.prevent="handleSubmit">
      <input v-model="credentials.email" placehoder="email">
      <input v-model="credentials.password" placehoder="password">
      <button>SignIn</button>
    </form>
  </div>
</template>

<script>
import { signIn } from '../services/api';

export default {
  name: 'Auth',
  props: ['onUser'],
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    handleSubmit() {
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
