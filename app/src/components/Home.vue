<template>
  <div class="home">
    <h1 v-if="goals">Goals of all Users</h1>
    <ul>
      <li v-for="goal in goals"
        :key="goal.id"
      >
        <h2>{{ goal.user }}</h2>
        <p>{{ goal.goal }}</p>
        <h2 v-if="goal.complete">💯 ☑️ 🎉</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import { getGoals } from '../services/api';

export default {
  data() {
    return {
      goals: null
    };
  },
  created() {
    getGoals()
      .then(goals => {
        console.log(goals);
        this.goals = goals;
      });
  }
};
</script>

<style scoped>
  .home {
    margin-top: 30px;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.75em;
  }

  p {
      margin: 20px 0;
  }

  li {
    list-style: none;
    background: gray;
    border-radius: 10px;
    color: white;
    padding: 20px;
    margin: 20px auto;
    width: 50vw;
  }
</style>