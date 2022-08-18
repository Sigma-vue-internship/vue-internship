<template>
  <div id="app">
    <div class="container">
      <h1 class="todoTitle" :style="{ color: titleColor }">TODO</h1>
      <form @submit.prevent="addItem">
        <input type="text" v-model="currentItem" />
        <button class="addTaskBtn" type="submit" @keydown.enter="addItem">
          Add task
        </button>
      </form>
      <ul class="todoList" v-if="todoList.length">
        <li
          class="todoItem"
          v-for="(todoItem, index) in todoList"
          :key="'li' + index"
        >
          <h2 :class="{ done: todoItem.isDone }" @click="deleteItem(index)">
            {{ todoItem.task }}
          </h2>
          <input type="checkbox" v-model="todoItem.isDone" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      todoList: [],
      item: {
        task: null,
        isDone: false,
      },
      currentItem: "",
    };
  },
  methods: {
    addItem() {
      if (!this.currentItem.length) return;
      this.item.task = this.currentItem;
      this.todoList.push(this.item);
      this.item = { ...this.item, task: null };
      this.currentItem = "";
    },
    deleteItem(id) {
      this.todoList = this.todoList.filter((item, i) => i !== id);
    },
    countDoneItems() {
      return this.todoList.filter((item) => item.isDone).length;
    },
  },
  computed: {
    titleColor() {
      const doneItemsLength = this.countDoneItems();
      const todoListLength = this.todoList.length;

      if (doneItemsLength < todoListLength / 2) {
        return "red";
      }
      if (
        doneItemsLength >= todoListLength / 2 &&
        doneItemsLength !== todoListLength
      ) {
        return "yellow";
      }
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
