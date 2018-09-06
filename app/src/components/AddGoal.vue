<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="goal.goal" placeholder="Write a goal">
    <button>Submit</button>
  </form>
</template>

<script>
const initGoal = () => {
  return {
    goal: ''
  };
};

export default {
  props: ['onAdd'],
  data() {
    return {
      goal: initGoal()
    };
  },
  methods: {
    handleSubmit() {
      this.onAdd(this.goal);
      this.goal = initGoal();
    }
  }
};
</script>

<style>

</style>
