<template>
  <div id="app">
    <div class="container">
      <div class="content__container">
        <div class="todo_form">
          <h1 class="todoTitle">TODO</h1>
          <TodoForm v-model="currentItem" @addItem="addItem"> </TodoForm>
        </div>
        <div class="todo_list">
          <h1 class="todoTitle">Your current todos:</h1>
          <ul class="todoList" v-if="todoList.length">
            <TodoItem
              v-for="(todoItem, index) in todoList"
              :key="'item: ' + index"
              :item="{
                itemLabel: todoItem.itemLabel,
                isItemOpen: todoItem.isOpen,
                itemDescription: todoItem.itemDescription,
              }"
              :itemIndex="index"
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
      item: {},
      currentItem: {
        itemLabel: "",
        itemDescription: "",
      },
    };
  },
  methods: {
    addItem() {
      if (this.currentItem.itemLabel.length) {
        this.item = {
          itemLabel: this.currentItem.itemLabel,
          isOpen: false,
          itemDescription: this.currentItem.itemDescription,
        };
        this.todoList.push(this.item);
        this.item = {};
        this.currentItem.itemLabel = "";
        this.currentItem.itemDescription = "";
      }
      return;
    },

    deleteItem(id) {
      this.todoList = this.todoList.filter((item, i) => i !== id);
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
