<template>
  <div>
    <h1>GOALS!</h1>
    <GoalList :goals="goals"/>
    <AddGoal :onAdd="handleAdd"/>
  </div>
</template>

<script>
import { getMyGoals, postGoal } from '../services/api';
import GoalList from './GoalList';
import AddGoal from './AddGoal';

export default {
  props: ['user'],
  components: {
    GoalList,
    AddGoal
  },
  data() {
    return {
      goals: null
    };
  },
  created() {
    getMyGoals()
      .then(goals => {
        this.goals = goals;
        console.log(this.goals);
      });
  },
  methods: {
    handleAdd(goal) {
      postGoal(goal)
        .then(goal => {
          this.goals.push(goal);
        });
    }
  }
};
</script>

<style>

</style>
