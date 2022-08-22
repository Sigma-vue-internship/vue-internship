<template>
  <ul class="list">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      class="item"
    >
       <button
        @click="changeClick(item)"
        class="element"
        :class="{ cross: item.done }"
      >
        {{ item.title }}
      </button>
      <ToDoDetails v-if="item.clicked && item.description" :item="item" />
      <slot name="select" :item="item" />
      <button @click="editItem(index)" class="btn-edit">
        Edit
      </button>
      <button @click="deleteItem(index)" class="btn-remove">X</button>
    </li>
  </ul>
</template>

<script>
import ToDoDetails from './ToDoDetails.vue';
  export default {
    name: "ToDoItems",
    props: {
      items: Array
    },
    components: {
      ToDoDetails
    },
    data() {
      return{
        item: Object
      }
    },
    methods: {
      deleteItem(index) {
        this.$store.dispatch("removeItem", index);
      },
      editItem(index) {
        this.$store.dispatch("editItem", index);
    },
      changeClick(item) {
        this.$store.dispatch("changeClick", (item.clicked=!item.clicked));
      }
    }
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
  .btn-edit {
    width: 50px;
    height: 30px;
    margin-right: 10px;
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
