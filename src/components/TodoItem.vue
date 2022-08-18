<template>
  <div class="item_container">
    <div>
      <h2 @click="showHideDescription">
        {{ item.itemLabel }}
      </h2>
      <TodoDetails
        v-if="isDescriptionShow"
        class="description"
        :itemDescription="item.itemDescription"
      />
    </div>
    <div>
      <button class="deleteBtn" @click="callDeleteItem()">Delete</button>
    </div>
  </div>
</template>

<script>
import TodoDetails from "@/components/TodoDetails.vue";
export default {
  components: {
    TodoDetails,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    itemId: {
      type: Number,
    },
  },
  data() {
    return {
      isDescriptionShow: false,
    };
  },
  methods: {
    showHideDescription() {
      this.isDescriptionShow = !this.isDescriptionShow;
    },
    callDeleteItem() {
      this.$emit("deleteItem", this.itemId);
    },
  },
};
</script>

<style lang="scss" scoped>
.todoItem {
  font-family: cursive;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
}
.deleteBtn {
  margin-left: 10px;
  background: #d75215;
  background: linear-gradient(#d73c15, #360707);
  border-radius: 11px;
  border: 0px;
  transform: scale(1);
  padding: 10px 25px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font: normal bold 15px "Open Sans", sans-serif;
  text-align: center;
  transition: transform cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
  &:hover {
    transform: scale(1.2);
  }
}
</style>