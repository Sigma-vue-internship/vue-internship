<template>
  <div class="todo">
    <h1 :style="{ color: fontColor }">
      {{ msg }}
    </h1>
    <ToDoForm @addNewItem="addItem($event)"/>
    <ToDoItems :listOfItems="items" @deleteItem="removeItem" v-if="items.length">
      <template slot="select">
        <input type="checkbox" v-for="item in items" :key="item.id" v-model="item.done" />
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
    data() {
      return {
        items: []
      };
    },
    methods: {
      addItem({title, description}) {
        (title && description) ? 
          this.items.push({
            title: title,
            description: description,
            done: false,
            clicked: false
          }) : false;
      },
      removeItem(index) {
        this.items.splice(index, 1);
      }
    },
    computed: {
      fontColor() {
          const numberOfDone = this.items.filter(item => item.done).length;
          const numberOfItems = this.items.length;
          return numberOfDone === 0 && numberOfItems > 0 ? "red"
              : numberOfDone >= numberOfItems / 2 && numberOfDone !== numberOfItems ? "yellow"
                : numberOfDone === numberOfItems && numberOfDone !== 0 ? "green"
                  : "rgb(17, 1, 34)";
      }
    },
    components: { ToDoForm, ToDoItems }
}
</script>

<style scoped lang="scss">
 
</style>
