<template>
  <div class="container">
    <div class="content__container">
      <div class="todo_form">
        <h1 class="todoTitle">TODO</h1>
        <TodoForm />
      </div>
    </div>
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm.vue";

export default {
  name: "HomeView",
  components: {
    TodoForm,
  },
};
</script>
