<template>
  <div class="task_history">
    <div class="todoList_container">
      <h1 class="todoTitle">Your current todos:</h1>
      <ul class="todoList" v-if="tasks.length">
        <TodoItem
          v-for="todoItem in tasks"
          :key="todoItem.id"
          :item="{
            label: todoItem.label,
            description: todoItem.description,
          }"
          :itemId="todoItem.id"
        />
      </ul>
      <span v-else>There will be your todos</span>
    </div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  components: { TodoItem },
  computed: {
    tasks() {
      return this.$store.getters.getAllTasks;
    },
  },
};
</script>
<style lang="scss" scoped>
.todoList {
  display: block;
  list-style: none;
  margin: 0 auto;
  width: 60%;
}
</style>
