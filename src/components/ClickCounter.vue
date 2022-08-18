<template>
  <span>
    <button @click="autoIncrement">
      🚀 {{ count }} units
    </button>
  </span>
</template>

<script>
import CounterMixin from '../mixins/counter'

export default {
  name: "ClickCounter",
  mixins: [CounterMixin],
}
</script>

<style scoped>
  button {
    padding: 5px;
    background: gold;
    margin-bottom: 50px;
  }
</style>
