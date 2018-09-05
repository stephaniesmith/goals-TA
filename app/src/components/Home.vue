<template>
  <div>
    <h1 v-if="goals">Goals of all Users</h1>
    <ul>
      <li v-for="goal in goals"
        :key="goal.id"
      >
        {{ goal.goal }}
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

</style>