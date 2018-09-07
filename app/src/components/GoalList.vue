<template>
  <div>
  <h1>GOALSLIST</h1>
    <ul>
      <Goal v-for="goal in goals"
        :key="goal.id"
        :goal="goal"
      />
    </ul>
  </div>
</template>

<script>
import Goal from './Goal';
export default {
  props: ['goals'],
  components: {
    Goal
  }
};
</script>

<style>

</style>
