<template>
  <form @submit.prevent="emitAddItem()">
    <div class="form__container">
      <input
        class="form__input"
        type="text"
        @input="updateItemInfo()"
        ref="itemLabel"
        placeholder="Title"
      />
      <textarea
        class="form__input"
        @input="updateItemInfo()"
        @keydown.enter="emitAddItem()"
        ref="itemDescription"
        maxlength="150"
        cols="30"
        rows="5"
        placeholder="Description"
      ></textarea>
      <slot name="additionalField"> </slot>
      <button class="addTaskBtn" type="submit" @keydown.enter="emitAddItem()">
        Add task
      </button>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    updateItemInfo() {
      this.$emit("input", {
        itemLabel: this.$refs.itemLabel.value,
        itemDescription: this.$refs.itemDescription.value,
      });
    },
    emitAddItem() {
      this.$emit("addItem");
      this.$refs.itemLabel.value = "";
      this.$refs.itemDescription.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./todoForm.scss";
</style>