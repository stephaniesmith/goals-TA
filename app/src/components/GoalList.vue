<template>
  <div>
  <h1>GOALSLIST</h1>
    <ul>
      <li v-for="goal in goals"
        :key="goal.id"
      >
      {{goal.goal}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['goals']
};
</script>

<style>

</style>
