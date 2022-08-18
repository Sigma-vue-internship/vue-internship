<template>
  <div id="app">
    <div class="container">
      <div class="content__container">
        <div class="todo_form">
          <h1 class="todoTitle">TODO</h1>
          <TodoForm @addItem="addItem"> </TodoForm>
        </div>
        <div class="todo_list">
          <h1 class="todoTitle">Your current todos:</h1>
          <ul class="todoList" v-if="todoList.length">
            <TodoItem
              v-for="todoItem in todoList"
              :key="todoItem.id"
              :item="{
                label: todoItem.label,
                description: todoItem.description,
              }"
              :itemId="todoItem.id"
              @deleteItem="deleteItem"
            />
          </ul>
          <span v-else>There will be your todos</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm.vue";
import TodoItem from "./components/TodoItem.vue";
export default {
  name: "App",
  components: {
    TodoForm,
    TodoItem,
  },
  data() {
    return {
      todoList: [],
      item: {
        itemId: null,
        label: "",
        description: "",
      },
    };
  },

  methods: {
    addItem(formData) {
      if (formData.title.length && formData.description.length) {
        this.item = {
          id: Date.now(),
          label: formData.title,
          description: formData.description,
        };
        this.todoList.push(this.item);
        this.item = { id: null, label: "", description: "" };
      }
    },

    deleteItem(id) {
      this.todoList = this.todoList.filter((item) => item.id !== id);
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import "./styles/index.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
