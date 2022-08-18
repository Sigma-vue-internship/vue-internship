<template>
  <div>
    <button @mouseover="autoIncrement">
      🚀 {{ count }} units
    </button>
  </div>
</template>

<script>
import CounterMixin from '../mixins/counter'

export default {
  name: "HoverCounter",
  mixins: [CounterMixin],
  data() {
    return {
      count: 10
    }
  },
  methods: {
    autoIncrement() {
      this.count +=10
    }
  }
}
</script>

<style scoped>
  button {
    padding: 5px;
    background: beige;
  }
</style>
