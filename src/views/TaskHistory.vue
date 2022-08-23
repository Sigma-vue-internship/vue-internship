<template>
  <ul v-if="itemHistory.length" class="list">
    <li
      v-for="(item, index) in itemHistory"
      :key="index"
      class="item"
    >
    <div class="topContent">
      <button class="info">Title: {{ item.title }}</button>
      <button class="info">Description: {{ item.description }}</button>
      <button @click="editItem(item, index)" class="btn-edit">
        {{ item.edit ? "Cancel" : "Edit" }}
      </button>
    </div>
    <div class="bottomContent" v-if="item.edit===true">
      <ToDoForm
        :edit="edit"
        :itemIndex="itemIndex"
        class="data"
      />
    </div>
    </li>
  </ul>
  <h1 v-else>Your ToDoList is empty</h1>
</template>

<script>
import { mapGetters } from "vuex";
import ToDoForm from "../components/ToDoForm.vue";
  export default {
    name: "TaskHistory",
    components: {
      ToDoForm
    },
    props: {
      items: Array
    },
    data() {
      return { 
        edit: true,
        itemIndex: 0
      }
    },
    methods: {
      editItem(item, index) {
        this.itemIndex = index;
        item.edit = !item.edit;
        this.$emit('editCurrentItem', item);
      },
    },
    computed: {
      ...mapGetters({ itemHistory: "getItemHistory" })
    }
  }
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
  .list {
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }
  .item {
    align-self: center;
    margin-bottom: 10px;
    font-size: 20px;
  }
  .topContent {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .bottomContent {
    margin-top: 20px;
  }
  .info {
    font-weight: 700;
    height: 30px;
    width: 210px;
    background: rgb(222, 210, 233);
    border: 1px solid $darkFontColor;
    border-radius: 2px;
    margin-right: 10px;
  }
  .data {
    display: flex;
    flex-direction: column;
  }
.btn-edit {
    width: 65px;
    height: 30px;
    @include btn-style;
  }
  h1 {
    color: red;
  }
</style>