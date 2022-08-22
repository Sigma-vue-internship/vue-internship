<template>
  <form
    @submit.prevent="formAction()"
    :class="mode === 'add' ? '' : 'item_container'"
  >
    <div
      :class="
        mode === 'add' ? 'form__container' : 'form__container edit__container'
      "
    >
      <form-input placeholder="Title" v-model="formData.label" />
      <p class="form_error" v-if="error.title">{{ error.title }}</p>
      <form-textarea
        v-model="formData.description"
        maxlength="150"
        cols="30"
        rows="5"
        placeholder="Description"
      ></form-textarea>
      <p class="form_error" v-if="error.description">
        {{ error.description }}
      </p>
      <slot name="additionalField"></slot>
      <action-btn
        :class="mode === 'add' ? 'addTaskBtnColor' : 'editTaskBtn'"
        type="submit"
        @keydown.enter="formAction()"
      >
        <slot></slot>
      </action-btn>
    </div>
  </form>
</template>

<script>
import taskFormValidation from "@/mixins/taskFormValidation";
export default {
  props: {
    mode: {
      type: String,
      default: () => "add",
    },
    id: {
      type: Number,
      default: () => 0,
    },
  },
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
    formAction() {
      if (this.mode === "add") {
        const validationResult = this.formValidation(this.formData);
        if (validationResult) return;
        this.$store.dispatch("addTask", this.formData);
        this.formData.label = "";
        this.formData.description = "";
        return;
      }
      const validationResult = this.formValidation(this.formData);
      if (validationResult) return;
      this.$store.dispatch("editTask", this.formData);
      this.$emit("showHideEditForm");
    },
  },
  created() {
    if (this.mode !== "add") {
      this.formData = this.$store.getters.getTaskById(this.id);
    }
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
.editTaskBtn {
  height: 50px;
  align-self: center;
  background: #15d798;
  background: linear-gradient(#15d798, #073763);
}
.addTaskBtnColor {
  background: #15d798;
  background: linear-gradient(#15d798, #073763);
}
.edit__container {
  flex-direction: row;
  align-items: flex-start;
}
</style>