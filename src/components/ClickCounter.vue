<template>
  <div>
    <button @click="autoIncrement">
      Click {{ count }} times
    </button>
  </div>
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
