<template>
  <div id="app">
    <div class="container">
      <h1 class="todoTitle" :style="{ color: titleColor }">TODO</h1>
      <TodoForm v-model="currentItem" @addItem="addItem"></TodoForm>
      <ul class="todoList" v-if="todoList.length">
        <li
          class="todoItem"
          v-for="(todoItem, index) in todoList"
          :key="'li' + index"
        >
          <h2 :class="{ done: todoItem.isDone }" @click="deleteItem(index)">
            {{ todoItem.task }}
          </h2>
          <input type="checkbox" @click="setDone(index)" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TodoForm from "./components/TodoForm/TodoForm.vue";
export default {
  name: "App",
  components: {
    TodoForm,
  },
  data() {
    return {
      todoList: [],
      item: {},
      currentItem: "",
      description: "",
    };
  },
  methods: {
    addItem() {
      if (this.currentItem.length) {
        this.item = {
          task: this.currentItem,
          isDone: false,
          description: this.description,
        };
        this.todoList.push(this.item);
        this.item = {};
        this.currentItem = "";
      }
      return;
    },
    setDone(id) {
      this.todoList[id].isDone = !this.todoList[id].isDone;
    },
    deleteItem(id) {
      this.todoList = this.todoList.filter((item, i) => i !== id);
    },
  },
  computed: {
    titleColor() {
      const doneItemsLength = this.todoList.filter(
        (item) => item.isDone
      ).length;
      const isNotDoneItemsLength = this.todoList.filter(
        (item) => !item.isDone
      ).length;
      if (doneItemsLength === 0 || doneItemsLength < isNotDoneItemsLength)
        return "red";
      if (
        doneItemsLength >= isNotDoneItemsLength &&
        doneItemsLength !== this.todoList.length
      )
        return "yellow";
      return "green";
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
