<template>
  <form @submit.prevent="addItem()">
    <div class="form__container">
      <form-input placeholder="Title" v-model="formData.label" />
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
      <action-btn
        class="addTaskBtnColor"
        type="submit"
        @keydown.enter="addItem()"
      >
        Add task
      </action-btn>
    </div>
  </form>
</template>

<script>
import taskFormValidation from "@/mixins/taskFormValidation";
export default {
  mixins: [taskFormValidation],
  data() {
    return {
      formData: {
        label: "",
        description: "",
      },
    };
  },
  methods: {
    addItem() {
      const validationResult = this.formValidation(this.formData);
      if (validationResult) return;
      this.$store.dispatch("addTask", this.formData);
      this.formData.label = "";
      this.formData.description = "";
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
  .form_error {
    color: rgb(252, 90, 90);
  }
}
.addTaskBtnColor {
  background: #15d798;
  background: linear-gradient(#15d798, #073763);
}
</style>