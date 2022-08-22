<template>
  <div class="container">
    <div class="content__container">
      <div class="todo_form">
        <h1 class="todoTitle">TODO</h1>
        <TodoForm :mode="'add'">Add task</TodoForm>
      </div>
      <div class="todo_list">
        <h1 class="todoTitle">Your current todos:</h1>
        <ul class="todoList" v-if="tasks.length">
          <TodoItem
            v-for="todoItem in tasks"
            :key="todoItem.id"
            :showMode="'preview'"
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
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm.vue";
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "HomeView",
  components: {
    TodoForm,
    TodoItem,
  },
  computed: {
    tasks() {
      return this.$store.getters.getAllTasks;
    },
  },
};
</script>
<style lang="scss" scoped>
.todoTitle {
  font-family: cursive;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
}
.item_container {
  display: flex;
  justify-content: space-between;
}

.todoList {
  list-style: none;
}
.todo_form {
  flex-basis: 60%;
}
.container {
  margin: 0 auto;
  text-align: center;
}
.content__container {
  display: flex;
  justify-content: space-evenly;
}
</style>
