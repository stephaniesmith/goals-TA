<template>
  <form @submit.prevent="handleSubmit">
    <input>
    <button>Submit</button>
  </form>
</template>

<script>

export default {
  props: ['onAdd'],
  data() {
    return {
      goal: ''
    };
  },
  methods: {
    handleSubmit() {
      console.log('goal', this.goal);
    }
  }
};
</script>

<style>

</style>
