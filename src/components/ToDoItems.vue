<template>
  <ul class="list">
    <li v-for="(item, index) in listOfItems" :key="item.id" class="item">
      <button @click="item.clicked=!item.clicked" class="element" :class="{ cross: item.done }">
        {{ item.title }}
      </button>
      <ToDoDetails v-if="item.clicked && item.description" :element="item" />
      <slot name="select" />
      <button @click="delItem(index)" class="btn-remove">X</button>
    </li>
  </ul>
</template>

<script>
import ToDoDetails from './ToDoDetails.vue';
  export default {
    name: "ToDoItems",
    props: ["listOfItems"],
    data() {
      return {
        item: ""
      };
    },
    methods: {
      delItem() {
        this.$emit("deleteItem", this.item);
      }
    },
    components: { ToDoDetails }
  }
</script>

<style scoped lang="scss">
@import "./../styles/variables.scss";

  .list {
    list-style-type: none;
    padding: 0;
    position: relative;
  }
  .btn-remove {
    width: 30px;
    height: 30px;
    @include btn-style;
  }
  input[type=checkbox] {
    height: 31px;
    width: 45px;
    margin: 0;
  }
  .item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    margin-bottom: 5px;
  }
  .cross {
    text-decoration: line-through;
  }
  .element {
    @include infoElement;
  }
</style>
