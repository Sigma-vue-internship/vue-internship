<template>
  <div class="todo">
    <h1 :style="{ color: fontColor }">
      {{ msg }}
    </h1>
    <ToDoForm @addNewItem="addItem($event)" @editCurrentItem="editItem($event)" />
    <ToDoItems
      :items="itemHistory"
      v-if="itemHistory.length"
    >
      <template slot="select" scope="props">
        <input type="checkbox" v-model="props.item.done"/>
      </template>
    </ToDoItems>
  </div>
</template>

<script>
import ToDoForm from './ToDoForm.vue';
import ToDoItems from './ToDoItems.vue';
  export default {
    name: "ToDo",
    props: {
      msg: String
    },
    components: { 
      ToDoForm,
      ToDoItems 
    },
    data() {
      return {
        items: []
      };
    },
    methods: {
      addItem({title, description}) {
        (title) ?
          this.$store.dispatch("addItem", [title, description])
            : false;
      },
      editItem(index) {
        this.$store.dispatch("editItem", index);
      }
    },
    computed: {
      itemHistory() {
        return this.$store.getters.getItemHistory;
      },
      fontColor() {
        const numberOfDone = this.itemHistory.filter(item => item.done).length;
        const numberOfItems = this.itemHistory.length;
        return numberOfDone === 0 && numberOfItems > 0 ? "red"
            : numberOfDone >= numberOfItems / 2 && numberOfDone !== numberOfItems ? "yellow"
              : numberOfDone === numberOfItems && numberOfDone !== 0 ? "green"
                : "rgb(17, 1, 34)";
      }
    }
  }
</script>

<style scoped lang="scss">
 
</style>
