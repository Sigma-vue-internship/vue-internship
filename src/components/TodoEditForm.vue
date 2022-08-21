<template>
  <form @submit.prevent="editTask()" class="item_container">
    <div class="form__container">
      <input
        class="form__input"
        type="text"
        placeholder="Title"
        v-model="editFormData.label"
      />
      <p class="form_error" v-if="error.title">{{ error.title }}</p>
      <textarea
        class="form__input"
        v-model="editFormData.description"
        maxlength="150"
        cols="30"
        rows="5"
        placeholder="Description"
      ></textarea>
      <p class="form_error" v-if="error.description">
        {{ error.description }}
      </p>
    </div>
    <action-btn class="editTaskBtn" type="submit" @keydown.enter="editTask()">
      Apply
    </action-btn>
  </form>
</template>

<script>
import taskFormValidation from "@/mixins/taskFormValidation";
export default {
  mixins: [taskFormValidation],
  props: ["id", "title", "description"],
  data() {
    return {
      editFormData: {
        id: this.id,
        label: this.title,
        description: this.description,
      },
    };
  },
  methods: {
    editTask() {
      const validationResult = this.formValidation(this.editFormData);
      if (validationResult) return;
      this.$store.dispatch("editTask", this.editFormData);
      this.$emit("showHideEditForm");
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
.editTaskBtn {
  height: 50px;
  align-self: center;
  background: #15d798;
  background: linear-gradient(#15d798, #073763);
}
</style>