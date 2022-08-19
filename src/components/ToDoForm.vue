<template>
  <div class="todoForm">
    <input type="text" placeholder="Title" v-model.trim="currentTitle" />
    <textarea placeholder="Description" maxlength="150" v-model.trim="currentDescription" />
    <button @click="addInfo" class="btn-add">ADD</button>
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
    methods: {
        addInfo () {
          this.$emit('addNewItem', { title: this.currentTitle, description: this.currentDescription });
          this.currentTitle="";
          this.currentDescription="";
        }
    }
  }
</script>

<style scoped lang="scss">
@import "./../styles/variables.scss";

  .todoForm {
    display: flex;
    flex-direction: column;
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
    width: 45px;
    @include btn-style;
  }
</style>
