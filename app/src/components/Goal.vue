<template>
    <li>
      {{goal.goal}}
      <button :class="{ completed: goal.complete }" @click="handleClick">Click</button>
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

<style scoped>
button {
    background-color: red;
}
.completed {
  background-color: green;
}

</style>
