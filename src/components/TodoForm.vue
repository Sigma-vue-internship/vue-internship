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
.form__container {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  .form__input {
    all: unset;
    font-family: cursive;
    border: 2px solid #15d798;
    text-align: left;
    padding: 5px;
    border-radius: 10px;
    width: 50%;
    &:focus {
      border: 2px dashed #15d798;
    }
  }
}
.addTaskBtn {
  margin-left: 10px;
  background: #15d798;
  background: linear-gradient(#15d798, #073763);
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