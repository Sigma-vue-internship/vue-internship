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
          <input type="checkbox" @click="setDone(index)" />
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
      item: {},
      currentItem: "",
    };
  },
  methods: {
    addItem() {
      if (this.currentItem.length) {
        this.item = {
          task: this.currentItem,
          isDone: false,
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
      if (this.todoList.filter((item) => item.isDone).length === 0)
        return "red";
      if (
        this.todoList.filter((item) => item.isDone).length >=
          this.todoList.filter((item) => !item.isDone).length &&
        this.todoList.filter((item) => item.isDone).length !==
          this.todoList.length
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
