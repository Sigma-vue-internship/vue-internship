<template>
  <ol v-if="itemHistory.length" class="list">
    <li
      v-for="(item, index) in itemHistory"
      :key="index"
      class="item"
    >
      <span class="caption">Title:</span> {{ item.title }},
      <span class="caption">Description</span>: {{ item.description }}
    </li>
  </ol>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    name: "TaskHistory",
    computed: {
      ...mapGetters({ itemHistory: "getItemHistory" })
    }
  }
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
}
.item {
  align-self: center;
  margin-bottom: 10px;
  font-size: 20px;
}
.caption {
  font-weight: 700;
}
</style>