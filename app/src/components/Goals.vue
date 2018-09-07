<template>
  <div>
    <h1>GOALS!</h1>
    <AddGoal :onAdd="handleAdd"/>
    <GoalList :goals="goals"/>
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
