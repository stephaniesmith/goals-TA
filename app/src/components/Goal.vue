<template>
    <li>
      {{goal.goal}}
      <button type="button" @click="handleUpdate" :value="goal.id">Click</button>
    </li>
</template>

<script>
export default {
  props: ['goal'],
  methods: {
    handleUpdate() {
      console.log(this.goal);
    }
  }
};
</script>

<style>

</style>
