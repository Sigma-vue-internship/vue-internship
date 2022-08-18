<template>
  <div class="item_container">
    <div>
      <h2 @click="callOpenDescription()">
        {{ this.itemProps.itemLabel }}
      </h2>
      <TodoDetails
        v-if="this.itemProps.isItemOpen"
        class="description"
        :isItemOpen="this.itemProps.isItemOpen"
        :itemDescription="this.itemProps.itemDescription"
      />
    </div>
    <div>
      <button class="deleteBtn" @click="callDeleteItem()">Delete</button>
    </div>
  </div>
</template>

<script>
import TodoDetails from "@/components/TodoDetails/TodoDetails.vue";
export default {
  components: {
    TodoDetails,
  },
  props: {
    itemProps: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    callOpenDescription() {
      this.$emit("openDescription", this.itemProps.itemIndex);
    },
    callDeleteItem() {
      this.$emit("deleteItem", this.itemProps.itemIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./todoItem.scss";
</style>