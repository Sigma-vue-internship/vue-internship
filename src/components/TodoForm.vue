<template>
  <form @submit.prevent="emitAddItem()">
    <div class="form__container">
      <input
        class="form__input"
        type="text"
        placeholder="Title"
        v-model="formData.title"
      />
      <p class="form_error" v-if="error.title">{{ error.title }}</p>
      <textarea
        class="form__input"
        v-model="formData.description"
        maxlength="150"
        cols="30"
        rows="5"
        placeholder="Description"
      ></textarea>
      <p class="form_error" v-if="error.description">
        {{ error.description }}
      </p>
      <slot name="additionalField"> </slot>
      <button class="addTaskBtn" type="submit" @keydown.enter="emitAddItem()">
        Add task
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: "",
        description: "",
      },
      error: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    emitAddItem() {
      this.formValidation();
      this.$emit("addItem", this.formData);
      this.formData.title = "";
      this.formData.description = "";
    },
    formValidation() {
      if (!this.formData.title.length)
        return (this.error.title = "Please write a title");

      if (!this.formData.description.length)
        return (this.error.description = "Please write a description");

      this.error.title = "";
      this.error.description = "";
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
  .form_error {
    color: rgb(252, 90, 90);
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