<template>
    <li>
      {{goal.goal}}
      <button type="button" @click="handleClick" :value="goal.id">Click</button>
    </li>
</template>

<script>
export default {
  props: ['goal'],
  methods: {
    handleClick() {
      this.goal.complete = !this.goal.complete ? true : false;
      console.log(this.goal);
    }
  }
};
</script>

<style>

</style>
