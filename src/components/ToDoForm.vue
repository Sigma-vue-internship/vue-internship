<template>
  <div :class="{ todoFormEdit: edit }" class="todoForm">
    <input
      type="text"
      placeholder="Title"
      v-model.trim="currentTitle"
    />
    <textarea
      placeholder="Description"
      maxlength="150"
      v-model.trim="currentDescription"
    />
    <button @click="addInfo" class="btn-add"> {{ edit ? "SAVE" : "ADD" }} </button>
  </div>
</template>

<script>
  export default {
    name: "ToDoForm",
    data () {
      return {
        currentTitle: "",
        currentDescription: ""
      }
    },
    props: {
      edit: Boolean,
      itemIndex: Number
    },
    methods: {
      addInfo() {
        const currentItem = {
          title: this.currentTitle,
          description: this.currentDescription,
          done: false,
          clicked: false,
          edit: false
        };
        if(currentItem.title) {
          this.edit ? this.$store.dispatch("editItem", [this.itemIndex, currentItem])
           : this.$store.dispatch("addItem", currentItem);
          this.clearFormState();    
        }
      },
      clearFormState() {
        this.currentTitle="";
        this.currentDescription="";
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";
  .todoForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  input[type=text] {
    @include controlledElement;
    height: 30px;
  }
  textarea {
    @include controlledElement;
    height: 60px;
    resize: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  .btn-add {
    height: 34px;
    width: 50px;
    @include btn-style;
  }
</style>
