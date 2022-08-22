<template>
  <ul v-if="itemHistory.length">
    <li v-for="(item, index) in itemHistory" :key="index" class="item">
        {{ item.title }}  
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    name: "TaskHistory",
    methods: {
    },
    computed: {
      ...mapGetters({ itemHistory: "getItemHistory" })
    }
  }
</script>

<style scoped lang="scss">
</style>